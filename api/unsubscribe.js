import { rateLimit } from './_lib/rateLimit.js';
import { clientIp } from './_lib/http.js';
import { renderPage } from './_lib/htmlPage.js';
import { verifyUnsubscribeToken } from './_lib/emailLinks.js';
import { markUnsubscribed } from './_lib/resendContacts.js';
import { emailCopy } from './_lib/emails/i18n.js';

/**
 * GET  /api/unsubscribe?e=&t=&lang=  → confirmation page with a button.
 * POST /api/unsubscribe?e=&t=&lang=  → unsubscribes, shows a "done" page.
 *
 * Unlike the JSON routes this returns HTML: it's opened directly from an
 * email in a browser.
 *
 * GET deliberately does NOT unsubscribe. Corporate mail scanners and link
 * previewers fetch every URL in an email; if GET acted, those bots would
 * silently unsubscribe people who never clicked.
 *
 * POST is also what Gmail/Yahoo send for one-click unsubscribe (RFC 8058,
 * body `List-Unsubscribe=One-Click`). The signed token in the query string is
 * the only authorization needed, so the body isn't read, and there's no
 * `originAllowed` check — those POSTs come from the mail provider's servers,
 * not from roshalink.com.
 */
export default async function handler(req, res) {
  const url = new URL(req.url || '/', 'http://localhost');
  const email = (url.searchParams.get('e') || '').trim().toLowerCase();
  const token = url.searchParams.get('t') || '';
  const { locale, unsubscribe: strings } = emailCopy(url.searchParams.get('lang'));
  const base = { locale, title: strings.pageTitle, backLabel: strings.backToSite };
  const errorPage = { ...base, heading: strings.errorHeading, body: strings.errorBody };

  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return renderPage(res, 405, errorPage);
  }

  // Generous: Gmail's one-click POSTs can arrive from a shared Google IP.
  const { ok: withinLimit, retryAfter } = rateLimit(`unsubscribe:${clientIp(req)}`, { limit: 30 });
  if (!withinLimit) {
    res.setHeader('Retry-After', String(retryAfter));
    return renderPage(res, 429, errorPage);
  }

  if (!verifyUnsubscribeToken(email, token)) {
    return renderPage(res, 400, { ...base, heading: strings.invalidHeading, body: strings.invalidBody });
  }

  if (req.method === 'GET') {
    return renderPage(res, 200, {
      ...base,
      heading: strings.confirmHeading,
      body: strings.confirmBody(email),
      form: { action: `/api/unsubscribe?${url.searchParams}`, label: strings.confirmButton },
    });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('[unsubscribe] RESEND_API_KEY is not set');
    return renderPage(res, 500, errorPage);
  }

  try {
    await markUnsubscribed(email);
  } catch (err) {
    console.error('[unsubscribe] resend_error', err instanceof Error ? err.message : err);
    return renderPage(res, 502, errorPage);
  }

  return renderPage(res, 200, { ...base, heading: strings.doneHeading, body: strings.doneBody });
}
