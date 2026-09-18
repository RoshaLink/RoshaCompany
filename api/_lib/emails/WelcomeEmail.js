// @ts-nocheck -- see tsconfig.api.json's compilerOptions comment: variadic
// React.createElement(...) children don't type-check cleanly under `strict`
// without JSX, for reasons unrelated to actual runtime correctness.
import * as React from 'react';
import { Button, Column, Img, Row, Section, Text } from '@react-email/components';
import EmailLayout from './EmailLayout.js';
import EmailFooter from './EmailFooter.js';
import { colors, fonts, logo, radii } from './brand.js';

const h = React.createElement;

const FEATURES = [
  {
    title: 'Book your kickoff call',
    body: 'Pick a time that works and meet the team leading your project.',
  },
  {
    title: 'Meet your project team',
    body: 'Get introduced to the designers and engineers behind your build.',
  },
  {
    title: 'Track progress in real time',
    body: 'Follow every milestone from a shared project dashboard.',
  },
];

/**
 * Sent on newsletter sign-up (`api/newsletter.js`) — the only "someone gave
 * us their email to hear more from us" moment this site currently has, there
 * being no user-account system to trigger a literal post-signup email from.
 * Matches the approved "Onboarding Email" mockup 1:1.
 */
export default function WelcomeEmail({ firstName = 'there', ctaHref = 'https://roshalink.com' }) {
  return h(
    EmailLayout,
    { previewText: "Welcome to RoshaLink — let's build something great", width: 600 },
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
        'Welcome'
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
        'Welcome ',
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
          'aboard'
        ),
        `, ${firstName}!`
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
        "Thanks for choosing RoshaLink. We're excited to partner with you on your next digital project."
      )
    ),
    // Feature blocks
    h(
      Section,
      { key: 'features', style: { padding: '4px 32px 8px' } },
      FEATURES.map((feature, index) =>
        h(
          Row,
          {
            key: feature.title,
            style: {
              border: `1px solid ${colors.border}`,
              borderRadius: radii.md,
              marginBottom: index < FEATURES.length - 1 ? '16px' : 0,
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
              { style: { margin: '0 0 4px', fontFamily: fonts.headline, fontWeight: 700, fontSize: '15px', color: colors.text } },
              feature.title
            ),
            h(
              Text,
              { style: { margin: 0, fontFamily: fonts.body, fontSize: '14px', lineHeight: '1.65', color: colors.textMuted } },
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
        'Get Started'
      )
    ),
    h(EmailFooter, {
      key: 'footer',
      variant: 'full',
      links: [
        { label: 'Privacy Policy', href: 'https://roshalink.com/en/privacy' },
        { label: 'Contact', href: 'https://roshalink.com/en/contact' },
        // No unsubscribe endpoint exists yet (api/newsletter.js has no
        // opt-out route) — placeholder, same as Footer.jsx's own ToS/
        // Security links, until one is built. Required before real sends.
        { label: 'Unsubscribe', href: '#' },
      ],
    })
  );
}

/** Sample data for the react-email dev preview — matches the approved mockup's own default props. */
WelcomeEmail.PreviewProps = {
  firstName: 'Sam',
};
