// @ts-nocheck -- see tsconfig.api.json's compilerOptions comment: variadic
// React.createElement(...) children don't type-check cleanly under `strict`
// without JSX, for reasons unrelated to actual runtime correctness.
import * as React from 'react';
import { Img, Link, Section, Text } from '@react-email/components';
import EmailLayout from './EmailLayout.js';
import EmailFooter from './EmailFooter.js';
import FieldRow from './FieldRow.js';
import { SITE_URL, colors, fonts, footerLinksFor, logo, radii } from './brand.js';
import { dirFor, emailCopy, isRtl, resolveLocale } from './i18n.js';

const h = React.createElement;

/**
 * Sent to the enquiry submitter — a real address, unlike LeadNotificationEmail
 * — from api/lead.js, for the 'contact' and 'get-started' sources only (a
 * chat-widget-captured contact may only be a phone number, and "read your own
 * chat back as an email" doesn't fit that flow the way it does a form
 * submission). Matches the approved "Contact Form Confirmation" mockup 1:1,
 * localized per the site's four supported locales (see i18n.js) — `lang` is
 * whatever the submitter's site language was when they filled out the form.
 * @param {{ firstName: string, name?: string, email?: string, service?: string, message?: string, lang?: string, ctaHref?: string }} props
 */
export default function ContactConfirmationEmail({ firstName, name, email, service, message, lang, ctaHref }) {
  const locale = resolveLocale(lang);
  const dir = dirFor(locale);
  const rtl = isRtl(locale);
  const { common, confirmation: strings } = emailCopy(lang);
  const links = footerLinksFor(locale);
  const resolvedCtaHref = ctaHref || `${SITE_URL}/${locale}/portfolio`;

  return h(
    EmailLayout,
    { previewText: strings.previewText, width: 600, lang: locale, dir },
    // Header
    h(
      Section,
      { key: 'header', style: { padding: '24px 32px', textAlign: 'center', borderBottom: `1px solid ${colors.border}` } },
      h(Img, { src: logo.full, width: 140, height: 86, alt: 'RoshaLink logo', style: { margin: '0 auto', height: '50px', width: 'auto' } })
    ),
    // Confirmation hero
    h(
      Section,
      { key: 'hero', style: { padding: '36px 32px 8px', textAlign: 'center' } },
      h(
        'table',
        { role: 'presentation', align: 'center', style: { margin: '0 auto 18px' } },
        h(
          'tbody',
          null,
          h(
            'tr',
            null,
            h(
              'td',
              {
                style: {
                  width: '60px',
                  height: '60px',
                  borderRadius: radii.full,
                  backgroundColor: colors.successBg,
                  textAlign: 'center',
                  verticalAlign: 'middle',
                },
              },
              h(
                'svg',
                { width: '26', height: '26', viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', 'aria-hidden': 'true', style: { verticalAlign: 'middle' } },
                h('path', { d: 'M5 13l4 4L19 7', stroke: colors.success, strokeWidth: '3', strokeLinecap: 'round', strokeLinejoin: 'round' })
              )
            )
          )
        )
      ),
      h(
        Text,
        {
          key: 'headline',
          style: { margin: '0 0 18px', fontFamily: fonts.headline, fontWeight: 700, letterSpacing: '-0.01em', fontSize: '26px', lineHeight: '1.3', color: colors.text },
        },
        strings.headline(firstName)
      ),
      h(
        Text,
        {
          key: 'subtext',
          style: { margin: '0 auto', maxWidth: '440px', fontFamily: fonts.body, fontSize: '15px', lineHeight: '1.7', color: colors.textMuted },
        },
        strings.subtitle
      )
    ),
    // Submission summary
    h(
      Section,
      { key: 'summary', style: { padding: '8px 32px' } },
      h(
        'div',
        { style: { backgroundColor: colors.background, border: `1px solid ${colors.border}`, borderRadius: radii.md, padding: '20px 22px' } },
        h(
          Text,
          {
            key: 'label',
            style: {
              margin: '0 0 14px',
              fontFamily: fonts.body,
              fontWeight: 600,
              fontSize: '12px',
              // Letter-spacing splits apart the joined letters of Farsi/Arabic.
              letterSpacing: rtl ? 'normal' : '0.04em',
              textTransform: 'uppercase',
              color: colors.textMuted,
              textAlign: rtl ? 'right' : 'left',
            },
          },
          strings.yourSubmission
        ),
        h(FieldRow, { key: 'name', label: strings.fieldName, value: name, spacing: '10px', rtl }),
        h(FieldRow, { key: 'email', label: strings.fieldEmail, value: email, spacing: '10px', rtl }),
        h(FieldRow, { key: 'service', label: strings.fieldService, value: service, spacing: '10px', rtl }),
        message
          ? h(
              'div',
              { key: 'message', style: { marginTop: '6px' } },
              h(
                'div',
                { style: { fontFamily: fonts.body, fontSize: '13px', color: colors.textMuted, marginBottom: '6px', textAlign: rtl ? 'right' : 'left' } },
                strings.fieldMessage
              ),
              h(
                'div',
                {
                  style: {
                    // Monospace can't join Farsi/Arabic letters.
                    fontFamily: rtl ? fonts.body : fonts.mono,
                    fontSize: '12px',
                    lineHeight: '1.6',
                    color: colors.textMuted,
                    textAlign: rtl ? 'right' : 'left',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  },
                },
                message
              )
            )
          : null
      )
    ),
    // Secondary CTA
    h(
      Section,
      { key: 'cta', style: { padding: '24px 32px 40px', textAlign: 'center' } },
      h(
        Link,
        {
          href: resolvedCtaHref,
          style: {
            display: 'inline-block',
            backgroundColor: 'transparent',
            color: colors.primary,
            fontFamily: fonts.body,
            fontWeight: 600,
            fontSize: '14px',
            borderRadius: radii.sm,
            border: '1.5px solid rgba(2,132,199,0.6)',
            padding: '11px 30px',
          },
        },
        strings.cta
      )
    ),
    h(EmailFooter, {
      key: 'footer',
      variant: 'full',
      rtl,
      tagline: common.tagline,
      copyright: common.copyright(new Date().getFullYear()),
      links: [
        { label: common.footerPrivacy, href: links.privacyPolicy },
        { label: common.footerContact, href: links.contact },
        { label: common.footerWebsite, href: links.website },
      ],
    })
  );
}

/** Sample data for the react-email dev preview — matches the approved mockup's own default props. */
ContactConfirmationEmail.PreviewProps = {
  firstName: 'Sam',
  name: 'Sam Razavi',
  email: 'sam@example.com',
  service: 'Website Redesign',
  message: 'We are looking to modernize our site and need a partner who can handle design and development end to end.',
  lang: 'en',
};
