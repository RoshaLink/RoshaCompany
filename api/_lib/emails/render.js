/**
 * Renders react-email template elements for sending via Resend.
 */
import { render } from '@react-email/render';

/** HTML string for a template element. */
export function renderHtml(element) {
  return render(element);
}

/**
 * `{ html, text }`, with the text version auto-derived from the HTML.
 *
 * Only safe for templates that are flowing paragraphs/headings/buttons —
 * html-to-text (which powers the `plainText` option) doesn't insert any
 * separator between adjacent table cells, so a template built from
 * label/value table rows (see FieldRow.js) needs its own hand-written text
 * body instead of this helper (see LeadNotificationEmail's and
 * ContactConfirmationEmail's send sites in api/lead.js).
 */
export async function renderEmail(element) {
  const [html, text] = await Promise.all([
    render(element),
    render(element, { plainText: true }),
  ]);
  return { html, text };
}
