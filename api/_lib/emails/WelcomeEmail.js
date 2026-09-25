// @ts-nocheck -- see tsconfig.api.json's compilerOptions comment: variadic
// React.createElement(...) children don't type-check cleanly under `strict`
// without JSX, for reasons unrelated to actual runtime correctness.
import * as React from 'react';
import { Button, Column, Img, Row, Section, Text } from '@react-email/components';
import EmailLayout from './EmailLayout.js';
import EmailFooter from './EmailFooter.js';
import { colors, fonts, footerLinksFor, logo, radii } from './brand.js';
import { dirFor, emailCopy, isRtl, resolveLocale } from './i18n.js';

const h = React.createElement;

/**
 * Sent on newsletter sign-up (`api/newsletter.js`) — the only "someone gave
 * us their email to hear more from us" moment this site currently has, there
 * being no user-account system to trigger a literal post-signup email from.
 * Matches the approved "Onboarding Email" mockup 1:1, localized per the
 * site's four supported locales (see i18n.js) — `lang` is whatever the
 * subscriber's site language was, already captured on the newsletter form.
 * @param {{ firstName?: string, ctaHref?: string, lang?: string, unsubscribeUrl?: string }} props
 */
export default function WelcomeEmail({ firstName, ctaHref = 'https://roshalink.com', lang, unsubscribeUrl }) {
  const locale = resolveLocale(lang);
  const dir = dirFor(locale);
  const rtl = isRtl(locale);
  const { common, welcome: strings } = emailCopy(lang);
  const headline = strings.headline(firstName);
  const links = footerLinksFor(locale);

  return h(
    EmailLayout,
    { previewText: strings.previewText, width: 600, lang: locale, dir },
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
    // Hero
    h(
      Section,
      { key: 'hero', style: { padding: '40px 32px 36px', textAlign: 'center' } },
      h(
        Text,
        {
          key: 'badge',
          style: {
            display: 'inline-block',
            margin: '0 0 14px',
            fontFamily: fonts.mono,
            fontSize: '11px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: colors.primary,
            backgroundColor: colors.badgeBg,
            borderRadius: radii.full,
            padding: '4px 12px',
          },
        },
        strings.badge
      ),
      h(
        Text,
        {
          key: 'headline',
          style: {
            margin: '0 0 14px',
            fontFamily: fonts.headline,
            fontWeight: 800,
            letterSpacing: '-0.01em',
            fontSize: '32px',
            lineHeight: '1.25',
            color: colors.text,
          },
        },
        headline.before,
        h(
          'span',
          {
            style: {
              background: `linear-gradient(90deg, ${colors.primary}, ${colors.tertiary})`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
            },
          },
          headline.highlight
        ),
        headline.after
      ),
      h(
        Text,
        {
          key: 'subtext',
          style: {
            margin: '0 auto',
            maxWidth: '440px',
            fontFamily: fonts.body,
            fontSize: '16px',
            lineHeight: '1.7',
            color: colors.textMuted,
          },
        },
        strings.subtitle
      )
    ),
    // Feature blocks
    h(
      Section,
      { key: 'features', style: { padding: '4px 32px 8px' } },
      strings.features.map((feature, index) =>
        h(
          Row,
          {
            key: feature.title,
            dir: rtl ? 'rtl' : undefined,
            style: {
              border: `1px solid ${colors.border}`,
              borderRadius: radii.md,
              marginBottom: index < strings.features.length - 1 ? '16px' : 0,
            },
          },
          h(
            Column,
            { style: { width: '66px', verticalAlign: 'top', padding: '20px 0 20px 22px' } },
            h(
              'div',
              {
                style: {
                  width: '34px',
                  height: '34px',
                  borderRadius: radii.full,
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                  color: colors.surface,
                  fontFamily: fonts.headline,
                  fontWeight: 700,
                  fontSize: '15px',
                  textAlign: 'center',
                  lineHeight: '34px',
                },
              },
              index + 1
            )
          ),
          h(
            Column,
            { style: { verticalAlign: 'top', padding: '20px 22px 20px 0' } },
            h(
              Text,
              {
                style: {
                  margin: '0 0 4px',
                  fontFamily: fonts.headline,
                  fontWeight: 700,
                  fontSize: '15px',
                  color: colors.text,
                  textAlign: rtl ? 'right' : 'left',
                },
              },
              feature.title
            ),
            h(
              Text,
              {
                style: {
                  margin: 0,
                  fontFamily: fonts.body,
                  fontSize: '14px',
                  lineHeight: '1.65',
                  color: colors.textMuted,
                  textAlign: rtl ? 'right' : 'left',
                },
              },
              feature.body
            )
          )
        )
      )
    ),
    // CTA
    h(
      Section,
      { key: 'cta', style: { padding: '28px 32px 44px', textAlign: 'center' } },
      h(
        Button,
        {
          href: ctaHref,
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
        strings.cta
      )
    ),
    h(EmailFooter, {
      key: 'footer',
      variant: 'full',
      tagline: common.tagline,
      copyright: common.copyright(new Date().getFullYear()),
      links: [
        { label: common.footerPrivacy, href: links.privacyPolicy },
        { label: common.footerContact, href: links.contact },
        // Signed per-recipient link built by api/_lib/unsubscribe.js; the
        // same URL also goes in the List-Unsubscribe header (api/newsletter.js).
        { label: common.footerUnsubscribe, href: unsubscribeUrl },
      ],
    })
  );
}

/** Sample data for the react-email dev preview. */
WelcomeEmail.PreviewProps = {
  lang: 'en',
  unsubscribeUrl: 'https://roshalink.com/api/unsubscribe?e=sam%40example.com&t=preview&lang=en',
};
