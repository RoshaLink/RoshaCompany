/**
 * The two newsletter emails, shared by `api/newsletter.js` (confirmation) and
 * `api/confirm-subscription.js` (welcome). Both are best-effort: they log and
 * return false instead of throwing.
 */
import * as React from 'react';
import WelcomeEmail from './emails/WelcomeEmail.js';
import ConfirmSubscriptionEmail from './emails/ConfirmSubscriptionEmail.js';
import { renderEmail } from './emails/render.js';
import { sendViaResend, UPSTREAM_TIMEOUT_MS } from './emails/sendEmail.js';
import { emailCopy } from './emails/i18n.js';
import { CONFIRM_LINK_TTL_DAYS, confirmUrl, unsubscribeUrl } from './emailLinks.js';

async function send(tag, message) {
  try {
    const response = await sendViaResend(message, AbortSignal.timeout(UPSTREAM_TIMEOUT_MS));
    if (response.ok) return true;
    const detail = await response.text();
    console.error(`[${tag}] resend_error`, response.status, detail.slice(0, 500));
  } catch (err) {
    console.error(`[${tag}] send_error`, err instanceof Error ? err.message : err);
  }
  return false;
}

/** Double opt-in step 1. */
export async function sendSubscribeConfirmation(email, lang) {
  const url = confirmUrl(email, lang);
  if (!url) {
    console.error('[newsletter] EMAIL_LINK_SECRET is not set — confirmation email not sent');
    return false;
  }
  const { subscribeConfirm: strings } = emailCopy(lang);
  const { html, text } = await renderEmail(
    React.createElement(ConfirmSubscriptionEmail, { confirmUrl: url, lang, ttlDays: CONFIRM_LINK_TTL_DAYS })
  );
  return send('newsletter', { to: email, subject: strings.subject, html, text, replyTo: process.env.LEAD_TO_EMAIL });
}

/**
 * Sent after confirmation. Refuses to send without a working unsubscribe
 * link: Gmail and Yahoo expect one-click unsubscribe (RFC 8058
 * List-Unsubscribe headers) on newsletter mail and push it toward spam
 * without it.
 */
export async function sendWelcomeEmail(email, lang) {
  const unsubscribe = unsubscribeUrl(email, lang);
  if (!unsubscribe) {
    console.error('[confirm-subscription] EMAIL_LINK_SECRET is not set — welcome email not sent');
    return false;
  }
  const { welcome: strings } = emailCopy(lang);
  const { html, text } = await renderEmail(React.createElement(WelcomeEmail, { lang, unsubscribeUrl: unsubscribe }));
  return send('confirm-subscription', {
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
  });
}
