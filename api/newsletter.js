import { rateLimit } from './_lib/rateLimit.js';
import { readJsonBody, clientIp, send, originAllowed } from './_lib/http.js';
import { getContactStatus } from './_lib/resendContacts.js';
import { sendSubscribeConfirmation } from './_lib/newsletterEmails.js';

const MAX_EMAIL_CHARS = 254;

function looksLikeEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function clean(value, maxChars) {
  if (typeof value !== 'string') return '';
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, maxChars);
}

/**
 * Double opt-in, step 1: this only emails a "confirm your subscription" link.
 * Nothing is added to the Resend list or forwarded to the backend until the
 * address owner clicks it (`api/confirm-subscription.js`). That keeps typos,
 * bots and other people's addresses off the list — the biggest single
 * deliverability and GDPR win for a sign-up form.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'method_not_allowed' });
  if (!originAllowed(req)) return send(res, 403, { error: 'forbidden' });

  // Also the only brake on someone using the form to flood a victim's inbox
  // with confirmation emails; per-IP and per-instance (see rateLimit.js).
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

  if (process.env.RESEND_API_KEY) {
    let status = 'none';
    try {
      status = await getContactStatus(email);
    } catch (err) {
      // Unknown status: sending a confirmation is the safe default.
      console.error('[newsletter] contact_lookup_error', err instanceof Error ? err.message : err);
    }
    // Already-subscribed addresses get no email. The response below is the
    // same either way, so the endpoint can't be used to probe who's subscribed.
    if (status !== 'subscribed') {
      await sendSubscribeConfirmation(email, lang);
    }
  }

  return send(res, 200, {
    success: true,
    message: 'Confirmation email sent',
    data: { email, lang },
  });
}
