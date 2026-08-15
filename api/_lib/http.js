/**
 * Small request/response helpers shared by the serverless functions in `api/`.
 *
 * Files under `api/` that start with `_` are not turned into routes by Vercel,
 * but are still bundled when imported. That is why shared server-only code
 * lives here rather than in `src/lib/` — keeping it physically out of `src/`
 * means it can never be imported by a component and shipped to the browser.
 *
 * Everything here is ESM: package.json sets `"type": "module"`, so
 * `module.exports` would fail at runtime on Vercel (not at build time).
 */

const MAX_BODY_BYTES = 64 * 1024;

/**
 * Read and parse a JSON request body.
 *
 * The `req.body` check is load-bearing. Vercel's Node runtime usually parses
 * the body and consumes the stream before the handler runs, so reading the
 * stream unconditionally yields an empty string and every request 400s — while
 * working perfectly against the local Vite dev middleware, which does not
 * pre-parse. Handling both shapes is what lets the same file run under both.
 */
export async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return req.body ? JSON.parse(req.body) : {};

  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > MAX_BODY_BYTES) throw new Error('payload_too_large');
  }
  return raw ? JSON.parse(raw) : {};
}

/**
 * Best-effort client IP, used only as a rate-limit key.
 * Vercel's edge sets `x-forwarded-for`; downstream proxies append to it, so the
 * first entry is the original client.
 */
export function clientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers['x-real-ip'] || 'unknown';
}

/** Send a JSON response. Works under both the Vercel runtime and plain Node. */
export function send(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
}

/**
 * Reject requests from origins we don't recognise.
 *
 * This is a speed bump against other sites embedding our endpoint, not a
 * security control: `Origin` is absent on curl and trivially spoofable. A
 * missing Origin is allowed on purpose so command-line testing still works.
 * No-ops entirely when ALLOWED_ORIGINS is unset (i.e. local development).
 */
export function originAllowed(req) {
  const allowed = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  if (allowed.length === 0) return true;

  const origin = req.headers.origin;
  if (!origin) return true;

  return allowed.includes(origin);
}
