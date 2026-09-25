/**
 * Newsletter subscriber list, kept as Resend contacts so Resend Broadcasts
 * can send to it and skip anyone marked `unsubscribed`.
 *
 * Needs a **Full access** Resend API key: a "Sending access" key can only
 * send emails and gets rejected by the contacts endpoints.
 */
import { UPSTREAM_TIMEOUT_MS } from './emails/sendEmail.js';

const CONTACTS_URL = 'https://api.resend.com/contacts';

function request(method, path, body) {
  return fetch(`${CONTACTS_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
  });
}

async function fail(action, response) {
  const detail = await response.text().catch(() => '');
  throw new Error(`${action} failed: ${response.status} ${detail.slice(0, 300)}`);
}

/**
 * Add `email` to the newsletter list, or re-subscribe it.
 * @returns {Promise<'created' | 'resubscribed' | 'already_subscribed'>}
 */
export async function upsertNewsletterContact(email) {
  const path = `/${encodeURIComponent(email)}`;
  const existing = await request('GET', path);

  if (existing.ok) {
    const contact = /** @type {{ unsubscribed?: boolean }} */ (await existing.json());
    if (!contact.unsubscribed) return 'already_subscribed';
    const updated = await request('PATCH', path, { unsubscribed: false });
    if (!updated.ok) await fail('resubscribe', updated);
    return 'resubscribed';
  }
  if (existing.status !== 404) await fail('lookup', existing);

  const segmentId = process.env.RESEND_NEWSLETTER_SEGMENT_ID;
  const created = await request('POST', '', {
    email,
    unsubscribed: false,
    ...(segmentId ? { segments: [{ id: segmentId }] } : {}),
  });
  if (!created.ok) await fail('create', created);
  return 'created';
}

/** Mark `email` unsubscribed. An address that was never a contact counts as done. */
export async function markUnsubscribed(email) {
  const response = await request('PATCH', `/${encodeURIComponent(email)}`, { unsubscribed: true });
  if (!response.ok && response.status !== 404) await fail('unsubscribe', response);
}
