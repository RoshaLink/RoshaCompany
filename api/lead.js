import { rateLimit } from './_lib/rateLimit.js';
import { readJsonBody, clientIp, send, originAllowed } from './_lib/http.js';

const RESEND_URL = 'https://api.resend.com/emails';
const UPSTREAM_TIMEOUT_MS = 15_000;

const MAX_FIELD_CHARS = 200;
const MAX_MESSAGE_CHARS = 4000;

const SOURCES = {
  'get-started': 'Get Started modal',
  contact: 'Contact page form',
  chat: 'Rosha chat widget',
};

/** Strip control characters and cap length before putting text in an email. */
function clean(value, maxChars) {
  if (typeof value !== 'string') return '';
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, maxChars);
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function looksLikeEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function renderEmail(lead) {
  const rows = [
    ['Name', lead.name],
    ['Email', lead.email],
    ['Company / role', lead.company],
    ['Primary focus', lead.service],
    ['Budget', lead.budget],
    ['Source', SOURCES[lead.source] || lead.source],
    ['Site language', lead.lang],
  ].filter(([, value]) => value);

  const html = `
    <h2>New enquiry from the RoshaLink website</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="border:1px solid #ddd"><strong>${escapeHtml(label)}</strong></td>` +
            `<td style="border:1px solid #ddd">${escapeHtml(value)}</td></tr>`
        )
        .join('')}
    </table>
    <h3>Message</h3>
    <p style="white-space:pre-wrap">${escapeHtml(lead.message || '(none)')}</p>
  `;

  const text =
    rows.map(([label, value]) => `${label}: ${value}`).join('\n') +
    `\n\nMessage:\n${lead.message || '(none)'}`;

  return { html, text };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'method_not_allowed' });
  if (!originAllowed(req)) return send(res, 403, { error: 'forbidden' });

  // Tighter than the chat limit — nobody legitimately submits 5 briefs a minute.
  const { ok: withinLimit, retryAfter } = rateLimit(`lead:${clientIp(req)}`, { limit: 5 });
  if (!withinLimit) {
    res.setHeader('Retry-After', String(retryAfter));
    return send(res, 429, { error: 'rate_limited', retryAfter });
  }

  const { RESEND_API_KEY, LEAD_TO_EMAIL } = process.env;
  if (!RESEND_API_KEY || !LEAD_TO_EMAIL) {
    console.error('[lead] RESEND_API_KEY or LEAD_TO_EMAIL is not set');
    return send(res, 500, { error: 'server_error' });
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    return send(res, 400, { error: 'bad_request' });
  }

  const lead = {
    name: clean(body?.name, MAX_FIELD_CHARS),
    email: clean(body?.email, MAX_FIELD_CHARS),
    company: clean(body?.company, MAX_FIELD_CHARS),
    service: clean(body?.service, MAX_FIELD_CHARS),
    budget: clean(body?.budget, MAX_FIELD_CHARS),
    lang: clean(body?.lang, 8),
    source: clean(body?.source, 40) || 'unknown',
    message: clean(body?.message, MAX_MESSAGE_CHARS),
  };

  if (!lead.name || !looksLikeEmail(lead.email)) {
    return send(res, 400, { error: 'bad_request' });
  }

  const { html, text } = renderEmail(lead);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const response = await fetch(RESEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: process.env.LEAD_FROM_EMAIL || 'onboarding@resend.dev',
        to: [LEAD_TO_EMAIL],
        // So hitting Reply in the inbox goes to the prospect, not to Resend.
        reply_to: lead.email,
        subject: `New enquiry from ${lead.name}${lead.company ? ` (${lead.company})` : ''}`,
        html,
        text,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error('[lead] resend_error', response.status, detail.slice(0, 500));
      return send(res, 502, { error: 'upstream_error' });
    }

    return send(res, 200, { ok: true });
  } catch (err) {
    // `instanceof Error` before reading .name: a throw of a non-Error value
    // would otherwise crash the catch block itself and turn a handled timeout
    // into an unhandled rejection.
    if (err instanceof Error && err.name === 'AbortError') {
      console.error('[lead] upstream timeout');
      return send(res, 504, { error: 'timeout' });
    }
    console.error('[lead] handler_error', err);
    return send(res, 500, { error: 'server_error' });
  } finally {
    clearTimeout(timer);
  }
}
