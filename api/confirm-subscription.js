import { rateLimit } from './_lib/rateLimit.js';
import { clientIp } from './_lib/http.js';
import { renderPage } from './_lib/htmlPage.js';
import { CONFIRM_LINK_TTL_DAYS, checkConfirmToken } from './_lib/emailLinks.js';
import { upsertNewsletterContact } from './_lib/resendContacts.js';
import { sendWelcomeEmail } from './_lib/newsletterEmails.js';
import { UPSTREAM_TIMEOUT_MS } from './_lib/emails/sendEmail.js';
import { emailCopy } from './_lib/emails/i18n.js';

/**
 * Double opt-in, step 2 — the link in the "confirm your subscription" email.
 *
 * GET  /api/confirm-subscription?e=&ts=&t=&lang= → page with a confirm button.
 * POST (same URL)                                → subscribes, sends the
 *                                                  welcome email, "done" page.
 *
 * Returns HTML, like api/unsubscribe.js. GET deliberately does not subscribe:
 * corporate mail scanners (e.g. Microsoft Safe Links) open every link in an
 * email, and a GET that subscribed would record consent nobody gave — the
 * exact thing double opt-in exists to prove.
 */

/**
 * Keep the external MongoDB backend's list in step with confirmed
 * subscribers only. Best-effort: Resend is the list newsletters go out from.
 */
async function forwardToBackend(email, lang, req) {
  const isTest = process.env.NODE_ENV === 'test' || Boolean(process.env.VITEST);
  const backendUrl = process.env.BACKEND_API_URL || (!isTest ? 'https://roshacompany-backend.onrender.com' : null);
  if (!backendUrl) return;
  try {
    await fetch(`${backendUrl}/api/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': clientIp(req) },
      body: JSON.stringify({ email, lang }),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
  } catch (err) {
    console.error('[confirm-subscription] failed to persist to backend:', err instanceof Error ? err.message : err);
  }
}

export default async function handler(req, res) {
  const url = new URL(req.url || '/', 'http://localhost');
  const email = (url.searchParams.get('e') || '').trim().toLowerCase();
  const { locale, subscribePage: strings } = emailCopy(url.searchParams.get('lang'));
  const base = { locale, title: strings.pageTitle, backLabel: strings.backToSite };
  const errorPage = { ...base, heading: strings.errorHeading, body: strings.errorBody };

  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return renderPage(res, 405, errorPage);
  }

  const { ok: withinLimit, retryAfter } = rateLimit(`confirm:${clientIp(req)}`, { limit: 30 });
  if (!withinLimit) {
    res.setHeader('Retry-After', String(retryAfter));
    return renderPage(res, 429, errorPage);
  }

  const check = checkConfirmToken(email, url.searchParams.get('ts'), url.searchParams.get('t') || '');
  if (check === 'expired') {
    return renderPage(res, 410, { ...base, heading: strings.expiredHeading, body: strings.expiredBody(CONFIRM_LINK_TTL_DAYS) });
  }
  if (check !== 'valid') {
    return renderPage(res, 400, { ...base, heading: strings.invalidHeading, body: strings.invalidBody });
  }

  if (req.method === 'GET') {
    return renderPage(res, 200, {
      ...base,
      heading: strings.confirmHeading,
      body: strings.confirmBody(email),
      form: { action: `/api/confirm-subscription?${url.searchParams}`, label: strings.confirmButton },
    });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('[confirm-subscription] RESEND_API_KEY is not set');
    return renderPage(res, 500, errorPage);
  }

  // Unlike the welcome email, this is the whole point of the request, so a
  // failure is shown to the visitor rather than swallowed.
  let status;
  try {
    status = await upsertNewsletterContact(email);
  } catch (err) {
    console.error('[confirm-subscription] contact_error', err instanceof Error ? err.message : err);
    return renderPage(res, 502, errorPage);
  }

  const lang = locale;
  // A second click on the same link (or an old link after re-subscribing)
  // shouldn't send a second welcome email.
  if (status !== 'already_subscribed') {
    await sendWelcomeEmail(email, lang);
    await forwardToBackend(email, lang, req);
  }

  return renderPage(res, 200, { ...base, heading: strings.doneHeading, body: strings.doneBody });
}
