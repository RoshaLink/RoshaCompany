// @ts-nocheck -- see tsconfig.api.json's compilerOptions comment: variadic
// React.createElement(...) children don't type-check cleanly under `strict`
// without JSX, for reasons unrelated to actual runtime correctness.
import * as React from 'react';
import { Button, Img, Link, Section, Text } from '@react-email/components';
import EmailLayout from './EmailLayout.js';
import EmailFooter from './EmailFooter.js';
import { colors, fonts, footerLinksFor, logo, radii } from './brand.js';
import { dirFor, emailCopy, isRtl, resolveLocale } from './i18n.js';

const h = React.createElement;

/**
 * Double opt-in step 1: sent by `api/newsletter.js` when someone signs up.
 * Nothing is added to the list until the button is clicked. It has no
 * unsubscribe link on purpose — the recipient isn't subscribed to anything,
 * and the copy tells them that ignoring it is enough.
 * @param {{ confirmUrl: string, lang?: string, ttlDays: number }} props
 */
export default function ConfirmSubscriptionEmail({ confirmUrl, lang, ttlDays }) {
  const locale = resolveLocale(lang);
  const dir = dirFor(locale);
  const rtl = isRtl(locale);
  const { common, subscribeConfirm: strings } = emailCopy(lang);
  const links = footerLinksFor(locale);
  const small = { fontFamily: fonts.body, fontSize: '13px', lineHeight: '1.6', color: colors.textMuted };

  return h(
    EmailLayout,
    { previewText: strings.previewText, width: 600, lang: locale, dir },
    h(
      Section,
      { key: 'header', style: { padding: '28px 32px', textAlign: 'center', borderBottom: `1px solid ${colors.border}` } },
      h(Img, { src: logo.full, width: 140, height: 86, alt: 'RoshaLink Logo', style: { margin: '0 auto', height: '50px', width: 'auto' } })
    ),
    h(
      Section,
      { key: 'body', style: { padding: '40px 32px 36px', textAlign: 'center' } },
      h(
        Text,
        {
          key: 'badge',
          style: {
            display: 'inline-block',
            margin: '0 0 14px',
            // Monospace can't join Farsi/Arabic letters; use the body font there.
            fontFamily: rtl ? fonts.body : fonts.mono,
            fontSize: '11px',
            // Letter-spacing splits apart the joined letters of Farsi/Arabic.
            letterSpacing: rtl ? 'normal' : '0.08em',
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
          key: 'heading',
          style: { margin: '0 0 14px', fontFamily: fonts.headline, fontWeight: 800, fontSize: '28px', lineHeight: '1.25', color: colors.text },
        },
        strings.heading
      ),
      h(
        Text,
        {
          key: 'text',
          style: { margin: '0 auto 28px', maxWidth: '440px', fontFamily: fonts.body, fontSize: '16px', lineHeight: '1.7', color: colors.textMuted },
        },
        strings.body
      ),
      h(
        Button,
        {
          key: 'button',
          href: confirmUrl,
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
        strings.button
      ),
      h(Text, { key: 'expiry', style: { ...small, margin: '16px 0 0' } }, strings.expiry(ttlDays)),
      h(Text, { key: 'fallback', style: { ...small, margin: '24px auto 4px', maxWidth: '460px' } }, strings.fallbackLabel),
      h(
        Text,
        { key: 'url', style: { ...small, margin: '0 auto', maxWidth: '460px', wordBreak: 'break-all' } },
        h(Link, { href: confirmUrl, style: { color: colors.primary } }, confirmUrl)
      ),
      h(Text, { key: 'ignore', style: { ...small, margin: '24px auto 0', maxWidth: '460px' } }, strings.ignore)
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
      ],
    })
  );
}

/** Sample data for the react-email dev preview. */
ConfirmSubscriptionEmail.PreviewProps = {
  lang: 'en',
  ttlDays: 7,
  confirmUrl: 'https://roshalink.com/api/confirm-subscription?e=sam%40example.com&ts=0&t=preview&lang=en',
};
