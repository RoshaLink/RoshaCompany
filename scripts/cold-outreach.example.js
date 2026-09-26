/**
 * Copy this file to scripts/cold-outreach.local.js (gitignored — never
 * committed) and fill in real details for ONE specific recipient. Then run:
 *
 *   node scripts/render-cold-outreach.js
 *
 * It writes scripts/cold-outreach.local.html. Open that file directly in a
 * browser tab (double-click it, or drag it in), select all of the rendered
 * email content, copy it, then paste into a new compose window in your mail
 * client (Namecheap Private Email or any other webmail/desktop client).
 *
 * Before pasting: make sure that compose window is in HTML / rich-text mode,
 * not plain text — plain-text mode strips all formatting on paste. Most
 * webmail UIs (including Namecheap Private Email's) have a toggle for this
 * near the compose toolbar, sometimes labelled "HTML", "Aa", or a format icon.
 *
 * The rendered file has no Subject line of its own — write one by hand, or
 * reuse the gist of `observation` below.
 *
 * `lang` picks which of the four locales (sv/en/fa/ar) the surrounding copy
 * (intro, focus areas, CTA button, sign-off, footer) renders in — see
 * `coldOutreach` in api/_lib/emails/i18n.js. `observation` is never looked up
 * by locale, though — always write it by hand, in whichever language you're
 * sending in.
 */
export default {
  recipientName: 'Alex',
  companyName: 'Acme Co',
  // The one field that MUST be genuinely specific to this recipient — write
  // it in the same language as `lang` below.
  observation:
    'Write one genuine, specific sentence about what you noticed on their site or in their business here.',
  senderName: 'Sam',
  senderRole: 'RoshaLink',
  // Optional override — omit to use the locale's generic defaults in i18n.js.
  // focusAreas: [{ title: '...', body: '...' }],
  // ctaHref: 'https://roshalink.com/en/contact', // defaults to the locale's own contact page
  // ctaLabel: 'Book a free discovery call',       // defaults to the locale's own CTA copy
  lang: 'en', // 'sv' | 'en' | 'fa' | 'ar'
};
