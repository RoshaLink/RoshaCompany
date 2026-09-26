// @ts-nocheck -- see tsconfig.api.json's compilerOptions comment: variadic
// React.createElement(...) children don't type-check cleanly under `strict`
// without JSX, for reasons unrelated to actual runtime correctness.
import * as React from 'react';
import { Img, Link, Section, Text } from '@react-email/components';
import { colors, copyrightLine, fonts, logo, tagline as defaultTagline } from './brand.js';

const h = React.createElement;

/**
 * Shared footer used by all three templates. Two variants match the two
 * approved mockup footers:
 *  - "full"    (Welcome, Contact Confirmation): icon+wordmark, tagline, a row
 *              of links, copyright line. `tagline`/`copyright` are passed in
 *              already localized (see i18n.js's `common` strings) — this
 *              component itself knows nothing about locale.
 *  - "compact" (Lead Notification, never localized): icon+wordmark plus a
 *              single note line — an internal ops email has no tagline/
 *              links to show.
 * `rtl` swaps the tagline's letter-spaced monospace for the body font: both
 * split apart the joined letters of a Farsi/Arabic tagline. A link item's own
 * `dir` (e.g. `'ltr'` on a phone number) overrides the page direction for
 * just that label — matching Footer.jsx's `<span dir="ltr">` around the same
 * phone number, so digits don't get reordered inside an RTL footer.
 * @param {{ variant?: 'full' | 'compact', links?: Array<{ label: string, href: string, dir?: 'ltr' | 'rtl' }>, note?: string, iconSize?: number, tagline?: string, copyright?: string, rtl?: boolean }} props
 */
export default function EmailFooter({ variant = 'full', links = [], note, iconSize = 28, tagline = defaultTagline, copyright = copyrightLine, rtl = false }) {
  const wordmark = [
    h(
      Img,
      {
        key: 'icon',
        src: logo.small,
        width: iconSize,
        height: Math.round((iconSize * logo.smallHeight) / logo.smallWidth),
        alt: '',
        style: { display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' },
      }
    ),
    h(
      Text,
      {
        key: 'text',
        style: {
          display: 'inline-block',
          verticalAlign: 'middle',
          margin: 0,
          fontFamily: fonts.headline,
          fontWeight: 700,
          fontSize: '15px',
        },
      },
      h('span', { key: 'rosha', style: { color: colors.text } }, 'ROSHA'),
      h('span', { key: 'link', style: { color: colors.primary } }, 'LINK')
    ),
  ];

  const rest =
    variant === 'full'
      ? [
          h(
            Text,
            {
              key: 'tagline',
              style: {
                margin: '10px 0 0',
                fontFamily: rtl ? fonts.body : fonts.mono,
                fontSize: '10px',
                letterSpacing: rtl ? 'normal' : '0.08em',
                textTransform: 'uppercase',
                color: colors.textMuted,
              },
            },
            tagline
          ),
          links.length > 0
            ? h(
                Text,
                { key: 'links', style: { margin: '10px 0 0', fontSize: '12px' } },
                links.map((item, index) =>
                  h(
                    React.Fragment,
                    { key: item.href },
                    index > 0 ? h('span', { style: { color: colors.divider, margin: '0 10px' } }, '|') : null,
                    h(
                      Link,
                      { href: item.href, style: { fontFamily: fonts.body, fontSize: '12px', color: colors.textMuted } },
                      item.dir ? h('span', { dir: item.dir }, item.label) : item.label
                    )
                  )
                )
              )
            : null,
          h(
            Text,
            {
              key: 'copyright',
              style: { margin: '10px 0 0', fontFamily: fonts.body, fontSize: '12px', color: colors.textMuted },
            },
            copyright
          ),
        ]
      : [
          h(
            Text,
            {
              key: 'note',
              style: {
                margin: '10px auto 0',
                maxWidth: '460px',
                fontFamily: fonts.body,
                fontSize: '12px',
                lineHeight: '1.6',
                color: colors.textMuted,
              },
            },
            note
          ),
        ];

  return h(
    Section,
    { style: { padding: '32px', backgroundColor: colors.footerBg, textAlign: 'center' } },
    wordmark,
    rest
  );
}
