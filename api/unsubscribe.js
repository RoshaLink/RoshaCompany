import { rateLimit } from './_lib/rateLimit.js';
import { clientIp } from './_lib/http.js';
import { verifyUnsubscribeToken } from './_lib/unsubscribe.js';
import { markUnsubscribed } from './_lib/resendContacts.js';
import { dirFor, emailCopy } from './_lib/emails/i18n.js';
import { colors, logo, SITE_URL } from './_lib/emails/brand.js';

/**
 * GET  /api/unsubscribe?e=&t=&lang=  → confirmation page with a button.
 * POST /api/unsubscribe?e=&t=&lang=  → unsubscribes, shows a "done" page.
 *
 * Unlike the other routes this returns HTML, not JSON: it's opened directly
 * from an email in a browser.
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

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

/**
 * @param {import('node:http').ServerResponse} res
 * @param {number} status
 * @param {{ locale: string, title: string, heading: string, body: string, form?: { action: string, label: string } }} page
 */
function renderPage(res, status, { locale, title, heading, body, form }) {
  const dir = dirFor(locale);
  const formHtml = form
    ? `<form method="post" action="${escapeHtml(form.action)}"><button type="submit">${escapeHtml(form.label)}</button></form>`
    : '';
  const html = `<!doctype html>
<html lang="${locale}" dir="${dir}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<meta name="referrer" content="no-referrer">
<title>${escapeHtml(title)}</title>
<style>
  body { margin: 0; background: ${colors.background}; color: ${colors.text}; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Tahoma, sans-serif; }
  main { max-width: 480px; margin: 64px auto; padding: 40px 32px; background: ${colors.surface}; border: 1px solid ${colors.border}; border-radius: 16px; text-align: center; }
  img { height: 44px; width: auto; }
  h1 { font-size: 24px; margin: 24px 0 12px; }
  p { color: ${colors.textMuted}; line-height: 1.65; margin: 0 0 24px; overflow-wrap: anywhere; }
  button { min-height: 44px; padding: 12px 28px; border: 0; border-radius: 8px; background: ${colors.buttonBg}; color: #fff; font-size: 15px; font-weight: 600; cursor: pointer; }
  a { display: inline-block; min-height: 44px; line-height: 44px; color: ${colors.primary}; }
  @media (max-width: 520px) { main { margin: 24px 16px; padding: 32px 20px; } }
</style>
</head>
<body>
<main>
  <img src="${logo.full}" alt="RoshaLink">
  <h1>${escapeHtml(heading)}</h1>
  <p>${escapeHtml(body)}</p>
  ${formHtml}
  ${form ? '' : `<a href="${SITE_URL}/${locale}">${escapeHtml(emailCopy(locale).unsubscribe.backToSite)}</a>`}
</main>
</body>
</html>`;

  res.statusCode = status;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex');
  // The URL carries a token; keep it out of Referer headers.
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader(
    'Content-Security-Policy',
    `default-src 'none'; style-src 'unsafe-inline'; img-src ${SITE_URL}; form-action 'self'; base-uri 'none'; frame-ancestors 'none'`
  );
  res.end(html);
}

export default async function handler(req, res) {
  const url = new URL(req.url || '/', 'http://localhost');
  const email = (url.searchParams.get('e') || '').trim().toLowerCase();
  const token = url.searchParams.get('t') || '';
  const { locale, unsubscribe: strings } = emailCopy(url.searchParams.get('lang'));
  const base = { locale, title: strings.pageTitle };

  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return renderPage(res, 405, { ...base, heading: strings.errorHeading, body: strings.errorBody });
  }

  // Generous: Gmail's one-click POSTs can arrive from a shared Google IP.
  const { ok: withinLimit, retryAfter } = rateLimit(`unsubscribe:${clientIp(req)}`, { limit: 30 });
  if (!withinLimit) {
    res.setHeader('Retry-After', String(retryAfter));
    return renderPage(res, 429, { ...base, heading: strings.errorHeading, body: strings.errorBody });
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
    return renderPage(res, 500, { ...base, heading: strings.errorHeading, body: strings.errorBody });
  }

  try {
    await markUnsubscribed(email);
  } catch (err) {
    console.error('[unsubscribe] resend_error', err instanceof Error ? err.message : err);
    return renderPage(res, 502, { ...base, heading: strings.errorHeading, body: strings.errorBody });
  }

  return renderPage(res, 200, { ...base, heading: strings.doneHeading, body: strings.doneBody });
}
