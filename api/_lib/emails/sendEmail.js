/** Shared Resend sender, used by api/lead.js and api/newsletter.js. */
const RESEND_URL = 'https://api.resend.com/emails';
const UPSTREAM_TIMEOUT_MS = 15_000;

/**
 * POST one message to Resend. Rejects on network failure; the caller decides how to respond to that.
 * @param {{ to: string, subject: string, html: string, text: string, replyTo?: string }} message
 * @param {AbortSignal} [signal]
 */
export function sendViaResend({ to, subject, html, text, replyTo }, signal) {
  return fetch(RESEND_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL || 'onboarding@resend.dev',
      to: [to],
      ...(replyTo ? { reply_to: replyTo } : {}),
      subject,
      html,
      text,
    }),
    signal,
  });
}

export { UPSTREAM_TIMEOUT_MS };
