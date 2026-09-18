import * as React from 'react';
import { Body, Container, Head, Html, Preview } from '@react-email/components';
import { GOOGLE_FONTS_HREF, colors, fonts } from './brand.js';

/**
 * Shared outer shell for all three templates: the light `#f8fafc` canvas plus
 * the centered white card (border, radius, shadow), matching the approved
 * mockups' two-div structure (outer padded canvas > inner bordered card).
 */
export default function EmailLayout({
  previewText,
  width = 600,
  radius = '16px',
  shadow = '0 10px 30px rgba(15,23,42,0.04)',
  children,
}) {
  return (
    <Html lang="en">
      <Head>
        <link rel="stylesheet" href={GOOGLE_FONTS_HREF} />
      </Head>
      {previewText ? <Preview>{previewText}</Preview> : null}
      <Body
        style={{
          margin: 0,
          backgroundColor: colors.background,
          fontFamily: fonts.body,
          padding: '40px 16px',
        }}
      >
        <Container
          style={{
            width,
            maxWidth: '100%',
            backgroundColor: colors.surface,
            border: `1px solid ${colors.border}`,
            borderRadius: radius,
            boxShadow: shadow,
            overflow: 'hidden',
          }}
        >
          {children}
        </Container>
      </Body>
    </Html>
  );
}
