/**
 * Signed newsletter unsubscribe links.
 *
 * The link carries the subscriber's email plus an HMAC of it, so
 * `api/unsubscribe.js` can trust the email without a database lookup, and
 * nobody can unsubscribe an address they merely know by editing the URL.
 * A dedicated secret (not RESEND_API_KEY) so rotating the API key doesn't
 * break every unsubscribe link already sitting in people's inboxes.
 */
import { createHmac, timingSafeEqual } from 'node:crypto';
import { SITE_URL } from './emails/brand.js';
import { resolveLocale } from './emails/i18n.js';

function normalize(email) {
  return String(email || '').trim().toLowerCase();
}

function sign(email, secret) {
  return createHmac('sha256', secret).update(normalize(email)).digest('base64url');
}

/** Absolute unsubscribe URL for `email`, or null when UNSUBSCRIBE_SECRET is unset. */
export function unsubscribeUrl(email, lang) {
  const secret = process.env.UNSUBSCRIBE_SECRET;
  if (!secret) return null;
  const params = new URLSearchParams({ e: normalize(email), t: sign(email, secret), lang: resolveLocale(lang) });
  return `${SITE_URL}/api/unsubscribe?${params}`;
}

/** True only when `token` is the valid signature for `email`. */
export function verifyUnsubscribeToken(email, token) {
  const secret = process.env.UNSUBSCRIBE_SECRET;
  if (!secret || !email || typeof token !== 'string' || !token) return false;
  const expected = Buffer.from(sign(email, secret));
  const given = Buffer.from(token);
  return expected.length === given.length && timingSafeEqual(expected, given);
}
