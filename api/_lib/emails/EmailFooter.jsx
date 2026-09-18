import * as React from 'react';
import { Img, Link, Section, Text } from '@react-email/components';
import { colors, copyrightLine, fonts, logo, tagline } from './brand.js';

/**
 * Shared footer used by all three templates. Two variants match the two
 * approved mockup footers:
 *  - "full"    (Welcome, Contact Confirmation): icon+wordmark, tagline, a row
 *              of links, copyright line.
 *  - "compact" (Lead Notification): icon+wordmark plus a single note line —
 *              an internal ops email has no tagline/links to show.
 * @param {{ variant?: 'full' | 'compact', links?: Array<{ label: string, href: string }>, note?: string, iconSize?: number }} props
 */
export default function EmailFooter({ variant = 'full', links = [], note, iconSize = 28 }) {
  return (
    <Section style={{ padding: '32px', backgroundColor: colors.footerBg, textAlign: 'center' }}>
      <Img
        src={logo.small}
        width={iconSize}
        height={Math.round((iconSize * logo.smallHeight) / logo.smallWidth)}
        alt=""
        style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}
      />
      <Text
        style={{
          display: 'inline-block',
          verticalAlign: 'middle',
          margin: 0,
          fontFamily: fonts.headline,
          fontWeight: 700,
          fontSize: '15px',
        }}
      >
        <span style={{ color: colors.text }}>ROSHA</span>
        <span style={{ color: colors.primary }}>LINK</span>
      </Text>

      {variant === 'full' ? (
        <>
          <Text
            style={{
              margin: '10px 0 0',
              fontFamily: fonts.mono,
              fontSize: '10px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: colors.textMuted,
            }}
          >
            {tagline}
          </Text>

          {links.length > 0 && (
            <Text style={{ margin: '10px 0 0', fontSize: '12px' }}>
              {links.map((item, index) => (
                <React.Fragment key={item.href}>
                  {index > 0 && (
                    <span style={{ color: colors.divider, margin: '0 10px' }}>|</span>
                  )}
                  <Link
                    href={item.href}
                    style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.textMuted }}
                  >
                    {item.label}
                  </Link>
                </React.Fragment>
              ))}
            </Text>
          )}

          <Text style={{ margin: '10px 0 0', fontFamily: fonts.body, fontSize: '12px', color: colors.textMuted }}>
            {copyrightLine}
          </Text>
        </>
      ) : (
        <Text
          style={{
            margin: '10px auto 0',
            maxWidth: '460px',
            fontFamily: fonts.body,
            fontSize: '12px',
            lineHeight: '1.6',
            color: colors.textMuted,
          }}
        >
          {note}
        </Text>
      )}
    </Section>
  );
}
