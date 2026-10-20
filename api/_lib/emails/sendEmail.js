/** Shared Resend sender, used by api/lead.js and api/newsletter.js. */
const RESEND_URL = 'https://api.resend.com/emails';
const UPSTREAM_TIMEOUT_MS = 15_000;
const SENDER_NAME = 'RoshaLink';

/**
 * `LEAD_FROM_EMAIL` is a bare address; inboxes show a bare address as the
 * sender name, which looks less trustworthy than a brand name. A value that
 * already carries its own display name (`Name <addr>`) is left alone.
 */
function fromAddress() {
  const address = process.env.LEAD_FROM_EMAIL || 'onboarding@resend.dev';
  return address.includes('<') ? address : `${SENDER_NAME} <${address}>`;
}

/**
 * POST one message to Resend. Rejects on network failure only — an HTTP error
 * status still resolves, so callers must check `response.ok` themselves.
 * @param {{ to: string, subject: string, html: string, text: string, replyTo?: string, headers?: Record<string, string> }} message
 * @param {AbortSignal} [signal]
 */
export function sendViaResend({ to, subject, html, text, replyTo, headers }, signal) {
  return fetch(RESEND_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: fromAddress(),
      to: [to],
      ...(replyTo ? { reply_to: replyTo } : {}),
      ...(headers ? { headers } : {}),
      subject,
      html,
      text,
    }),
    signal,
  });
}

export { UPSTREAM_TIMEOUT_MS };
