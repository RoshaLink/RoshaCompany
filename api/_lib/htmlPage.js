/**
 * The small branded HTML pages that `api/unsubscribe.js` and
 * `api/confirm-subscription.js` show in the browser after someone clicks a
 * link in an email. Deliberately dependency-free plain HTML: these load
 * outside the React app.
 */
import { dirFor } from './emails/i18n.js';
import { colors, logo, SITE_URL } from './emails/brand.js';

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

/**
 * @param {import('node:http').ServerResponse} res
 * @param {number} status
 * @param {{ locale: string, title: string, heading: string, body: string, backLabel: string, form?: { action: string, label: string } }} page
 */
export function renderPage(res, status, { locale, title, heading, body, backLabel, form }) {
  const action = form
    ? `<form method="post" action="${escapeHtml(form.action)}"><button type="submit">${escapeHtml(form.label)}</button></form>`
    : `<a href="${SITE_URL}/${locale}">${escapeHtml(backLabel)}</a>`;
  const html = `<!doctype html>
<html lang="${locale}" dir="${dirFor(locale)}">
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
  ${action}
</main>
</body>
</html>`;

  res.statusCode = status;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex');
  // The URL carries a signed token; keep it out of Referer headers.
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader(
    'Content-Security-Policy',
    `default-src 'none'; style-src 'unsafe-inline'; img-src ${SITE_URL}; form-action 'self'; base-uri 'none'; frame-ancestors 'none'`
  );
  res.end(html);
}
