import { rateLimit } from './_lib/rateLimit.js';
import { readJsonBody, clientIp, send, originAllowed } from './_lib/http.js';
import LeadNotificationEmail from './_lib/emails/LeadNotificationEmail.js';
import ContactConfirmationEmail from './_lib/emails/ContactConfirmationEmail.js';
import { renderHtml } from './_lib/emails/render.js';
import { sendViaResend, UPSTREAM_TIMEOUT_MS } from './_lib/emails/sendEmail.js';
import { emailCopy } from './_lib/emails/i18n.js';

const MAX_FIELD_CHARS = 200;
const MAX_MESSAGE_CHARS = 4000;

const SOURCES = {
  'get-started': 'Get Started modal',
  contact: 'Contact page form',
  chat: 'Rosha chat widget',
};

// A confirmation email only makes sense for the two form-shaped sources — a
// chat-captured contact may only be a phone number, and "here's a copy of
// your chat" doesn't fit the "thanks for your submission" framing anyway.
const CONFIRMABLE_SOURCES = new Set(['get-started', 'contact']);

/**
 * Plain-text fallback for LeadNotificationEmail. Written by hand rather than
 * auto-derived from the HTML: html-to-text (the library behind react-email's
 * `render(el, {plainText:true})`) doesn't insert any separator between
 * adjacent table cells, so the label/value rows in that template (see
 * FieldRow.js) would come out as "NameJane Doe" with no space or line break.
 */
function notificationText(lead) {
  const rows = [
    ['Name', lead.name],
    ['Email / Phone', lead.email],
    ['Company / role', lead.company],
    ['Primary focus', lead.service],
    ['Budget', lead.budget],
    ['Source', SOURCES[lead.source] || lead.source],
    ['Site language', lead.lang],
  ].filter(([, value]) => value);

  return (
    rows.map(([label, value]) => `${label}: ${value}`).join('\n') +
    `\n\nMessage:\n${lead.message || '(none)'}`
  );
}

/**
 * Plain-text fallback for ContactConfirmationEmail — same reasoning as
 * notificationText(), localized to match the HTML version (see i18n.js).
 */
function confirmationText({ firstName, name, email, service, message, lang }) {
  const { confirmation: strings } = emailCopy(lang);
  const rows = [
    [strings.fieldName, name],
    [strings.fieldEmail, email],
    [strings.fieldService, service],
  ].filter(([, value]) => value);

  return (
    `${strings.headline(firstName)}\n\n` +
    `${strings.subtitle}\n\n` +
    `${strings.yourSubmission}:\n` +
    rows.map(([label, value]) => `${label}: ${value}`).join('\n') +
    (message ? `\n${strings.fieldMessage}: ${message}` : '')
  );
}

/** Strip control characters and cap length before putting text in an email. */
function clean(value, maxChars) {
  if (typeof value !== 'string') return '';
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\x00-\x1F\x7F]/g, ' ').trim().slice(0, maxChars);
}

/** "Sep 18, 2026 · 14:32 CET", for the notification email's header timestamp. */
function formatTimestamp(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Stockholm',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZoneName: 'short',
  }).formatToParts(date);
  const get = (type) => parts.find((p) => p.type === type)?.value || '';
  return `${get('month')} ${get('day')}, ${get('year')} · ${get('hour')}:${get('minute')} ${get('timeZoneName')}`;
}

function looksLikeEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function looksLikeEmailOrPhone(value) {
  if (typeof value !== 'string') return false;
  const val = value.trim();
  if (looksLikeEmail(val)) return true;
  return /^[\d\s+\-()]{6,25}$/.test(val) && val.replace(/\D/g, '').length >= 5;
}

/**
 * Best-effort confirmation to the person who submitted the form. Never
 * throws: a failure here must not turn an already-successful lead capture
 * into an error response for the visitor.
 */
async function sendConfirmationEmail(lead) {
  try {
    const firstName = lead.name.split(' ')[0];
    const { confirmation: strings } = emailCopy(lead.lang);
    const html = await renderHtml(
      ContactConfirmationEmail({
        firstName,
        name: lead.name,
        email: lead.email,
        service: lead.service,
        message: lead.message,
        lang: lead.lang,
      })
    );
    await sendViaResend({
      to: lead.email,
      replyTo: process.env.LEAD_TO_EMAIL,
      subject: strings.subject,
      html,
      text: confirmationText({ firstName, name: lead.name, email: lead.email, service: lead.service, message: lead.message, lang: lead.lang }),
    });
  } catch (err) {
    console.error('[lead] confirmation_email_error', err instanceof Error ? err.message : err);
  }
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

  const { RESEND_API_KEY, LEAD_TO_EMAIL, BACKEND_API_URL } = process.env;
  const isTest = process.env.NODE_ENV === 'test' || Boolean(process.env.VITEST);
  const backendUrl = BACKEND_API_URL || (!isTest ? 'https://roshacompany-backend.onrender.com' : null);

  // In test environment or when no backend is defined, require Resend credentials
  if (!backendUrl && (!RESEND_API_KEY || !LEAD_TO_EMAIL)) {
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

  if (!lead.name || !looksLikeEmailOrPhone(lead.email)) {
    return send(res, 400, { error: 'bad_request' });
  }

  // 1. Forward lead to MongoDB backend
  let savedToBackend = false;
  if (backendUrl) {
    try {
      const backendRes = await fetch(`${backendUrl}/api/lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': clientIp(req),
        },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      });

      if (backendRes.ok) {
        savedToBackend = true;
      } else {
        console.error('[lead] backend returned error status:', backendRes.status);
      }
    } catch (err) {
      console.error('[lead] error forwarding to backend:', err instanceof Error ? err.message : err);
    }
  }

  // 2. Dispatch the internal notification email via Resend if credentials are configured
  let resendSent = false;
  if (RESEND_API_KEY && LEAD_TO_EMAIL) {
    const html = await renderHtml(
      LeadNotificationEmail({
        name: lead.name,
        email: lead.email,
        company: lead.company,
        service: lead.service,
        budget: lead.budget,
        lang: lead.lang,
        source: lead.source,
        message: lead.message,
        timestamp: formatTimestamp(),
        // So hitting Reply in the inbox goes to the prospect when an email was provided.
        replyToEmail: looksLikeEmail(lead.email) ? lead.email : undefined,
      })
    );
    const text = notificationText(lead);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

    try {
      const response = await sendViaResend(
        {
          to: LEAD_TO_EMAIL,
          replyTo: looksLikeEmail(lead.email) ? lead.email : undefined,
          subject: `New enquiry from ${lead.name}${lead.company ? ` (${lead.company})` : ''}`,
          html,
          text,
        },
        controller.signal
      );

      if (!response.ok) {
        const detail = await response.text();
        console.error('[lead] resend_error', response.status, detail.slice(0, 500));
        if (!savedToBackend) {
          return send(res, 502, { error: 'upstream_error' });
        }
      } else {
        resendSent = true;
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        console.error('[lead] upstream timeout');
        if (!savedToBackend) {
          return send(res, 504, { error: 'timeout' });
        }
      } else {
        console.error('[lead] handler_error', err);
        if (!savedToBackend) {
          return send(res, 500, { error: 'server_error' });
        }
      }
    } finally {
      clearTimeout(timer);
    }

    // 3. Best-effort confirmation to the submitter — only for the two form
    // sources, and only when they gave a real email (source 'chat' may only
    // have a phone number; the internal notification above already went out
    // either way, so a failure here is logged and swallowed, never returned).
    if (resendSent && CONFIRMABLE_SOURCES.has(lead.source) && looksLikeEmail(lead.email)) {
      await sendConfirmationEmail(lead);
    }
  }

  if (savedToBackend || resendSent) {
    return send(res, 200, { ok: true });
  }

  return send(res, 500, { error: 'server_error' });
}
