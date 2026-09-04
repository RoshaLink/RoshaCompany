import { rateLimit } from './_lib/rateLimit.js';
import { readJsonBody, clientIp, send, originAllowed } from './_lib/http.js';

const MAX_EMAIL_CHARS = 254;

function looksLikeEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function clean(value, maxChars) {
  if (typeof value !== 'string') return '';
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, maxChars);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'method_not_allowed' });
  if (!originAllowed(req)) return send(res, 403, { error: 'forbidden' });

  // Rate limiting: 5 subscriptions per 15 minutes per IP
  const { ok: withinLimit, retryAfter } = rateLimit(`newsletter:${clientIp(req)}`, { limit: 5 });
  if (!withinLimit) {
    res.setHeader('Retry-After', String(retryAfter));
    return send(res, 429, { error: 'rate_limited', retryAfter });
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    return send(res, 400, { error: 'bad_request' });
  }

  // Honeypot anti-bot check
  const honeypot = body?.hp_field || body?.website_url;
  if (honeypot && String(honeypot).trim().length > 0) {
    return send(res, 400, { error: 'invalid_submission' });
  }

  const email = clean(body?.email, MAX_EMAIL_CHARS).toLowerCase();
  const lang = clean(body?.lang, 10) || 'sv';

  if (!email || !looksLikeEmail(email)) {
    return send(res, 400, { error: 'invalid_email' });
  }

  return send(res, 200, {
    success: true,
    message: 'Subscribed successfully',
    data: { email, lang },
  });
}
