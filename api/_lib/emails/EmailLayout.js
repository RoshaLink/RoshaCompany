// @ts-nocheck -- see tsconfig.api.json's compilerOptions comment: variadic
// React.createElement(...) children don't type-check cleanly under `strict`
// without JSX, for reasons unrelated to actual runtime correctness.
import * as React from 'react';
import { Body, Container, Head, Html, Preview } from '@react-email/components';
import { GOOGLE_FONTS_HREF, colors, fonts } from './brand.js';

const h = React.createElement;

/**
 * Shared outer shell for all three templates: the light `#f8fafc` canvas plus
 * the centered white card (border, radius, shadow), matching the approved
 * mockups' two-div structure (outer padded canvas > inner bordered card).
 *
 * Plain `React.createElement` calls, not JSX: this file is imported directly
 * by the api/ serverless functions, which Vercel deploys as raw ESM source —
 * Node's native loader has no JSX transform and throws
 * `ERR_UNKNOWN_FILE_EXTENSION` on a `.jsx` file the moment it's required.
 */
export default function EmailLayout({
  previewText,
  width = 600,
  radius = '16px',
  shadow = '0 10px 30px rgba(15,23,42,0.04)',
  lang = 'en',
  dir = 'ltr',
  children,
}) {
  const htmlChildren = [
    h(Head, { key: 'head' }, h('link', { rel: 'stylesheet', href: GOOGLE_FONTS_HREF })),
  ];
  if (previewText) htmlChildren.push(h(Preview, { key: 'preview' }, previewText));
  htmlChildren.push(
    h(
      Body,
      {
        key: 'body',
        dir,
        style: {
          margin: 0,
          backgroundColor: colors.background,
          fontFamily: fonts.body,
          padding: '40px 16px',
        },
      },
      h(
        Container,
        {
          style: {
            width,
            maxWidth: '100%',
            backgroundColor: colors.surface,
            border: `1px solid ${colors.border}`,
            borderRadius: radius,
            boxShadow: shadow,
            overflow: 'hidden',
          },
        },
        children
      )
    )
  );

  return h(Html, { lang, dir }, htmlChildren);
}
