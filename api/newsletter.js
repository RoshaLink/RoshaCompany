import { rateLimit } from './_lib/rateLimit.js';
import { readJsonBody, clientIp, send, originAllowed } from './_lib/http.js';
import WelcomeEmail from './_lib/emails/WelcomeEmail.js';
import { renderEmail } from './_lib/emails/render.js';
import { sendViaResend, UPSTREAM_TIMEOUT_MS } from './_lib/emails/sendEmail.js';
import { emailCopy } from './_lib/emails/i18n.js';
import { unsubscribeUrl } from './_lib/unsubscribe.js';
import { upsertNewsletterContact } from './_lib/resendContacts.js';

const MAX_EMAIL_CHARS = 254;

/**
 * Best-effort welcome email for a new subscriber. Never throws: a failure
 * here must not turn an already-successful subscription into an error
 * response for the visitor.
 *
 * There's no user-account system on this site to trigger a literal
 * "on signup" email from — a newsletter subscription is the only "someone
 * gave us their email to hear from us" moment that exists, so it's the
 * closest real equivalent.
 *
 * Refuses to send without a working unsubscribe link: Gmail and Yahoo expect
 * one-click unsubscribe (RFC 8058 List-Unsubscribe headers) on anything
 * newsletter-shaped, and push mail without it toward spam.
 */
async function sendWelcomeEmail(email, lang) {
  if (!process.env.RESEND_API_KEY) return;
  const unsubscribe = unsubscribeUrl(email, lang);
  if (!unsubscribe) {
    console.error('[newsletter] UNSUBSCRIBE_SECRET is not set — welcome email not sent');
    return;
  }
  try {
    const { welcome: strings } = emailCopy(lang);
    const { html, text } = await renderEmail(WelcomeEmail({ lang, unsubscribeUrl: unsubscribe }));
    const response = await sendViaResend(
      {
        to: email,
        // Replies land with a person instead of bouncing off a no-reply sender.
        replyTo: process.env.LEAD_TO_EMAIL,
        subject: strings.subject,
        html,
        text,
        headers: {
          'List-Unsubscribe': `<${unsubscribe}>`,
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
        },
      },
      AbortSignal.timeout(UPSTREAM_TIMEOUT_MS)
    );
    if (!response.ok) {
      const detail = await response.text();
      console.error('[newsletter] resend_error', response.status, detail.slice(0, 500));
    }
  } catch (err) {
    console.error('[newsletter] welcome_email_error', err instanceof Error ? err.message : err);
  }
}

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

  const { BACKEND_API_URL } = process.env;
  const isTest = process.env.NODE_ENV === 'test' || Boolean(process.env.VITEST);
  const backendUrl = BACKEND_API_URL || (!isTest ? 'https://roshacompany-backend.onrender.com' : null);

  if (backendUrl) {
    try {
      await fetch(`${backendUrl}/api/newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': clientIp(req),
        },
        body: JSON.stringify({ email, lang }),
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      });
    } catch (err) {
      console.error('[newsletter] failed to persist to backend:', err instanceof Error ? err.message : err);
    }
  }

  // Resend contacts are the list Broadcasts send to. A failure here (e.g. a
  // "Sending access" key, which can't touch contacts) is logged and doesn't
  // block the welcome email.
  /** @type {Awaited<ReturnType<typeof upsertNewsletterContact>> | null} */
  let contactStatus = null;
  if (process.env.RESEND_API_KEY) {
    try {
      contactStatus = await upsertNewsletterContact(email);
    } catch (err) {
      console.error('[newsletter] contact_sync_error', err instanceof Error ? err.message : err);
    }
  }

  // Someone re-submitting the form shouldn't get a second welcome email.
  // The visitor-facing response stays identical either way, so the endpoint
  // can't be used to probe which addresses are subscribed.
  if (contactStatus !== 'already_subscribed') {
    await sendWelcomeEmail(email, lang);
  }

  return send(res, 200, {
    success: true,
    message: 'Subscribed successfully',
    data: { email, lang },
  });
}
