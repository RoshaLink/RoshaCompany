/**
 * Signed links sent in newsletter emails: "confirm your subscription" and
 * "unsubscribe".
 *
 * Each link carries the subscriber's email plus an HMAC of it, so the routes
 * can trust the email without a database lookup, and nobody can confirm or
 * unsubscribe an address they merely know by editing the URL. The HMAC input
 * starts with the link's purpose, so an unsubscribe token can never be
 * replayed as a confirm token or vice versa.
 *
 * EMAIL_LINK_SECRET is its own secret (not RESEND_API_KEY) so rotating the API
 * key doesn't break every link already sitting in people's inboxes. Rotating
 * this secret does.
 */
import { createHmac, timingSafeEqual } from 'node:crypto';
import { SITE_URL } from './emails/brand.js';
import { resolveLocale } from './emails/i18n.js';

export const CONFIRM_LINK_TTL_DAYS = 7;
const CONFIRM_LINK_TTL_S = CONFIRM_LINK_TTL_DAYS * 24 * 60 * 60;
// Tolerates a little clock drift between serverless instances.
const MAX_CLOCK_SKEW_S = 5 * 60;

function normalize(email) {
  return String(email || '').trim().toLowerCase();
}

function sign(secret, purpose, email, extra = '') {
  return createHmac('sha256', secret).update(`${purpose}\n${normalize(email)}\n${extra}`).digest('base64url');
}

function safeEqual(a, b) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

function secret() {
  return process.env.EMAIL_LINK_SECRET || '';
}

/** Absolute unsubscribe URL for `email`, or null when EMAIL_LINK_SECRET is unset. */
export function unsubscribeUrl(email, lang) {
  if (!secret()) return null;
  const params = new URLSearchParams({ e: normalize(email), t: sign(secret(), 'unsubscribe', email), lang: resolveLocale(lang) });
  return `${SITE_URL}/api/unsubscribe?${params}`;
}

/** True only when `token` is the valid unsubscribe signature for `email`. */
export function verifyUnsubscribeToken(email, token) {
  if (!secret() || !email || typeof token !== 'string' || !token) return false;
  return safeEqual(sign(secret(), 'unsubscribe', email), token);
}

/**
 * Absolute "confirm your subscription" URL, or null when EMAIL_LINK_SECRET is
 * unset. Unlike unsubscribe links these expire: a confirmation is consent
 * given now, not whenever an old email happens to be clicked.
 */
export function confirmUrl(email, lang, nowMs = Date.now()) {
  if (!secret()) return null;
  const ts = String(Math.floor(nowMs / 1000));
  const params = new URLSearchParams({ e: normalize(email), ts, t: sign(secret(), 'confirm', email, ts), lang: resolveLocale(lang) });
  return `${SITE_URL}/api/confirm-subscription?${params}`;
}

/** @returns {'valid' | 'expired' | 'invalid'} */
export function checkConfirmToken(email, ts, token, nowMs = Date.now()) {
  if (!secret() || !email || typeof token !== 'string' || !token || !/^\d{1,12}$/.test(String(ts))) return 'invalid';
  if (!safeEqual(sign(secret(), 'confirm', email, String(ts)), token)) return 'invalid';
  const age = Math.floor(nowMs / 1000) - Number(ts);
  if (age < -MAX_CLOCK_SKEW_S) return 'invalid';
  return age > CONFIRM_LINK_TTL_S ? 'expired' : 'valid';
}
