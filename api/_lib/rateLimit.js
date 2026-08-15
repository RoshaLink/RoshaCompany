/**
 * A deliberately simple in-memory rate limiter.
 *
 * BE CLEAR ABOUT WHAT THIS IS AND IS NOT.
 *
 * The Map below lives in the memory of a single serverless instance. It is
 * destroyed on every cold start and is NOT shared between concurrent
 * instances. If Vercel runs five instances under load, the real ceiling is
 * five times the configured limit, and anyone rotating IP addresses walks
 * straight through it.
 *
 * So this is NOT cost control. What it does stop is the realistic failure
 * mode for a small site: a runaway `useEffect` loop, a visitor holding down
 * Send, or a naive single-IP script. That covers the overwhelming majority of
 * real incidents, for zero dependencies and zero cost.
 *
 * Actual spend protection is layered elsewhere:
 *   1. this limiter
 *   2. hard input caps in the handlers (a huge prompt is the expensive
 *      attack, not many small ones)
 *   3. a monthly budget cap set on the OpenAI account itself — the only
 *      backstop that cannot be bypassed by anything in this codebase
 *
 * TODO: if the site starts getting real traffic, swap the body of this module
 * for Upstash Redis (@upstash/ratelimit) to get a sliding window shared
 * across all instances. The call sites do not need to change — only this file.
 */

const hits = new Map(); // ip -> number[] of request timestamps
const MAX_TRACKED_IPS = 1000;

/**
 * @param   {string} ip
 * @param   {{limit?: number, windowMs?: number}} [options]
 * @returns {{ok: boolean, retryAfter?: number}} retryAfter is in seconds
 */
export function rateLimit(ip, { limit = 12, windowMs = 60_000 } = {}) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    hits.set(ip, recent);
    const retryAfter = Math.max(1, Math.ceil((windowMs - (now - recent[0])) / 1000));
    return { ok: false, retryAfter };
  }

  recent.push(now);
  hits.set(ip, recent);

  // Keep the Map from growing without bound on a long-lived instance.
  if (hits.size > MAX_TRACKED_IPS) {
    for (const [key, timestamps] of hits) {
      if (!timestamps.some((t) => now - t < windowMs)) hits.delete(key);
    }
  }

  return { ok: true };
}
