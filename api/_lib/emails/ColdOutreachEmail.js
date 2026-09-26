// @ts-nocheck -- see tsconfig.api.json's compilerOptions comment: variadic
// React.createElement(...) children don't type-check cleanly under `strict`
// without JSX, for reasons unrelated to actual runtime correctness.
import * as React from 'react';
import { Button, Column, Img, Row, Section, Text } from '@react-email/components';
import EmailLayout from './EmailLayout.js';
import EmailFooter from './EmailFooter.js';
import { SITE_URL, colors, fonts, footerLinksFor, logo, phone, radii } from './brand.js';
import { dirFor, emailCopy, isRtl, resolveLocale } from './i18n.js';

const h = React.createElement;

/**
 * NOT sent by any api/ route — there is no cold-outreach handler and no list
 * of recipients anywhere in this codebase on purpose. This is a design-only
 * template for the "preview in the browser, copy the rendered HTML, paste
 * into a one-off compose window, send by hand" workflow: run
 * `npx react-email dev --dir api/_lib/emails`, open "ColdOutreachEmail" in
 * the sidebar (or `node scripts/render-cold-outreach.js`), edit the props
 * for one specific recipient, then copy the rendered HTML. See AGENTS.md's
 * "Cold outreach template" note for why it deliberately has no send path.
 *
 * Localized per the site's four locales via `i18n.js`'s `coldOutreach`
 * section, same mechanism as WelcomeEmail/ContactConfirmationEmail — except
 * `observation` (the one thing that MUST be genuinely written per-recipient)
 * is always a plain prop, never looked up by locale, since it's bespoke to
 * whichever specific person and language you're writing to.
 *
 * Copy is intentionally plain and personal (no gradient headline, no
 * subscriber-style badge) — it should read as a specific note from a
 * specific person, not a campaign blast.
 * @param {{
 *   recipientName: string,
 *   companyName?: string,
 *   observation: string,
 *   senderName?: string,
 *   senderRole?: string,
 *   focusAreas?: Array<{ title: string, body: string }>,
 *   ctaHref?: string,
 *   ctaLabel?: string,
 *   lang?: string,
 * }} props
 */
export default function ColdOutreachEmail({
  recipientName,
  companyName,
  observation,
  senderName = 'Sam',
  senderRole = 'RoshaLink',
  focusAreas,
  ctaHref,
  ctaLabel,
  lang = 'en',
}) {
  const locale = resolveLocale(lang);
  const dir = dirFor(locale);
  const rtl = isRtl(locale);
  const { common, coldOutreach: strings } = emailCopy(lang);
  const links = footerLinksFor(locale);
  const resolvedFocusAreas = focusAreas || strings.focusAreas;
  const resolvedCtaHref = ctaHref || `${SITE_URL}/${locale}/contact`;
  const resolvedCtaLabel = ctaLabel || strings.ctaLabel;
  const senderFirstName = senderName.split(' ')[0];

  return h(
    EmailLayout,
    { previewText: strings.previewText(companyName), width: 600, lang: locale, dir },
    // Header
    h(
      Section,
      { key: 'header', style: { padding: '28px 32px', textAlign: 'center', borderBottom: `1px solid ${colors.border}` } },
      h(Img, {
        src: logo.full,
        width: 140,
        height: 86,
        alt: 'RoshaLink Logo',
        style: { margin: '0 auto', height: '50px', width: 'auto' },
      })
    ),
    // Hero — plain greeting + the personalized hook, no marketing badge/gradient
    h(
      Section,
      { key: 'hero', style: { padding: '40px 32px 8px', textAlign: rtl ? 'right' : 'left' } },
      h(
        Text,
        {
          key: 'greeting',
          style: { margin: '0 0 16px', fontFamily: fonts.headline, fontWeight: 700, fontSize: '22px', lineHeight: '1.35', color: colors.text },
        },
        strings.greeting(recipientName)
      ),
      h(
        Text,
        {
          key: 'observation',
          style: { margin: '0 0 16px', fontFamily: fonts.body, fontSize: '15px', lineHeight: '1.7', color: colors.text },
        },
        observation
      ),
      h(
        Text,
        {
          key: 'intro',
          style: { margin: 0, fontFamily: fonts.body, fontSize: '15px', lineHeight: '1.7', color: colors.textMuted },
        },
        strings.intro
      )
    ),
    // Focus areas — short, non-numbered so it doesn't read as a feature list
    h(
      Section,
      { key: 'focus', style: { padding: '20px 32px 4px' } },
      resolvedFocusAreas.map((area, index) =>
        h(
          Row,
          {
            key: area.title,
            dir: rtl ? 'rtl' : undefined,
            style: {
              borderTop: index === 0 ? `1px solid ${colors.border}` : 'none',
              borderBottom: `1px solid ${colors.border}`,
              padding: '14px 0',
            },
          },
          h(
            Column,
            { style: { verticalAlign: 'top', textAlign: rtl ? 'right' : 'left' } },
            h(
              Text,
              { style: { margin: '0 0 2px', fontFamily: fonts.headline, fontWeight: 700, fontSize: '14px', color: colors.text } },
              area.title
            ),
            h(
              Text,
              { style: { margin: 0, fontFamily: fonts.body, fontSize: '13px', lineHeight: '1.6', color: colors.textMuted } },
              area.body
            )
          )
        )
      )
    ),
    // CTA — a real question, not a hard sell
    h(
      Section,
      { key: 'cta', style: { padding: '28px 32px 8px', textAlign: rtl ? 'right' : 'left' } },
      h(
        Text,
        { style: { margin: '0 0 20px', fontFamily: fonts.body, fontSize: '15px', lineHeight: '1.7', color: colors.text } },
        strings.ctaIntro(companyName)
      ),
      h(
        Button,
        {
          href: resolvedCtaHref,
          style: {
            backgroundColor: colors.buttonBg,
            color: colors.surface,
            fontFamily: fonts.body,
            fontWeight: 600,
            fontSize: '15px',
            borderRadius: radii.sm,
            padding: '12px 32px',
          },
        },
        resolvedCtaLabel
      ),
      h(
        Text,
        {
          style: { margin: '24px 0 0', fontFamily: fonts.body, fontSize: '14px', lineHeight: '1.65', color: colors.textMuted },
        },
        strings.replyNote(senderFirstName)
      ),
      h(
        Text,
        {
          style: { margin: '20px 0 0', fontFamily: fonts.body, fontSize: '15px', lineHeight: '1.6', color: colors.text },
        },
        strings.signOff,
        h('br'),
        senderName,
        h('br'),
        senderRole
      )
    ),
    h(EmailFooter, {
      key: 'footer',
      variant: 'full',
      rtl,
      tagline: strings.footerTagline,
      copyright: common.copyright(new Date().getFullYear()),
      links: [
        { label: common.footerContact, href: links.contact },
        { label: phone.display, href: phone.href, dir: 'ltr' },
        { label: common.footerWebsite, href: links.website },
      ],
    })
  );
}

/** Sample data for the react-email dev preview — replace every field with real, per-recipient copy before actually sending. */
ColdOutreachEmail.PreviewProps = {
  recipientName: 'Alex',
  companyName: 'Acme Co',
  observation:
    "I was looking at Acme Co's site and noticed the checkout flow asks for account creation before showing shipping cost — that's a common spot where people drop off.",
  senderName: 'Sam',
  senderRole: 'RoshaLink',
  lang: 'en',
};
