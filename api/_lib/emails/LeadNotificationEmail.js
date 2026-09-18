// @ts-nocheck -- see tsconfig.api.json's compilerOptions comment: variadic
// React.createElement(...) children don't type-check cleanly under `strict`
// without JSX, for reasons unrelated to actual runtime correctness.
import * as React from 'react';
import { Button, Column, Img, Row, Section, Text } from '@react-email/components';
import EmailLayout from './EmailLayout.js';
import EmailFooter from './EmailFooter.js';
import FieldRow from './FieldRow.js';
import { colors, fonts, logo, radii } from './brand.js';

const h = React.createElement;

/** Matches api/lead.js's SOURCES map + api/_lib/chatLeadCapture.js's chat source. */
const SOURCE_META = {
  contact: { label: 'Contact Page Form', color: colors.primary, background: colors.badgeBg },
  'get-started': { label: 'Get Started Modal', color: colors.tertiary, background: '#e0e7ff' },
  chat: { label: 'Rosha Chat Widget', color: colors.success, background: colors.successBg },
};

/**
 * The internal "new enquiry" alert sent to LEAD_TO_EMAIL from api/lead.js —
 * a branded replacement for that file's old bare-`<table>` renderEmail().
 * Matches the approved "New Lead Notification (Internal)" mockup 1:1.
 */
export default function LeadNotificationEmail({
  name,
  email,
  company,
  service,
  budget,
  lang,
  source,
  message,
  timestamp,
  replyToEmail,
}) {
  const meta = SOURCE_META[source] || { label: source || 'Website', color: colors.primary, background: colors.badgeBg };
  const headline = company ? `New enquiry from ${name} (${company})` : `New enquiry from ${name}`;

  return h(
    EmailLayout,
    { previewText: headline, width: 560, radius: radii.md, shadow: '0 1px 3px rgba(0,0,0,0.1)' },
    // Header
    h(
      Section,
      { key: 'header', style: { padding: '20px 24px', borderBottom: `1px solid ${colors.border}` } },
      h(
        Row,
        null,
        h(Column, null, h(Img, { src: logo.small, width: 140, height: 86, alt: 'RoshaLink', style: { height: '36px', width: 'auto' } })),
        h(
          Column,
          { style: { textAlign: 'right' } },
          timestamp ? h('span', { style: { fontFamily: fonts.mono, fontSize: '12px', color: colors.textMuted } }, timestamp) : null
        )
      )
    ),
    // Body
    h(
      Section,
      { key: 'body', style: { padding: '24px' } },
      h(
        Text,
        {
          key: 'badge',
          style: {
            display: 'inline-block',
            margin: '0 0 22px',
            fontFamily: fonts.body,
            fontWeight: 700,
            fontSize: '11px',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: meta.color,
            backgroundColor: meta.background,
            borderRadius: radii.full,
            padding: '4px 14px',
          },
        },
        meta.label
      ),
      h(
        Text,
        {
          key: 'headline',
          style: { margin: '0 0 22px', fontFamily: fonts.headline, fontWeight: 700, fontSize: '19px', lineHeight: '1.4', color: colors.text },
        },
        headline
      ),
      h(
        'div',
        {
          key: 'fields',
          style: { backgroundColor: colors.background, border: `1px solid ${colors.border}`, borderRadius: radii.sm, padding: '20px', marginBottom: '22px' },
        },
        h(FieldRow, { label: 'Name', value: name }),
        h(FieldRow, { label: 'Email / Phone', value: email, mono: true }),
        h(FieldRow, { label: 'Company / Role', value: company }),
        h(FieldRow, { label: 'Primary Focus', value: service }),
        h(FieldRow, { label: 'Budget', value: budget }),
        h(FieldRow, { label: 'Site Language', value: lang, mono: true, muted: true, spacing: '0' })
      ),
      h(
        Text,
        {
          key: 'message-label',
          style: { margin: '0 0 8px', fontFamily: fonts.body, fontWeight: 600, fontSize: '12px', letterSpacing: '0.04em', textTransform: 'uppercase', color: colors.textMuted },
        },
        'Message'
      ),
      h(
        'div',
        {
          key: 'message',
          style: {
            backgroundColor: colors.background,
            border: `1px solid ${colors.border}`,
            borderRadius: radii.sm,
            padding: '18px 20px',
            fontFamily: fonts.body,
            fontSize: '13px',
            lineHeight: '1.6',
            color: colors.text,
            whiteSpace: 'pre-line',
          },
        },
        message || '(none)'
      ),
      replyToEmail
        ? h(
            'div',
            { key: 'cta', style: { textAlign: 'center', paddingTop: '24px' } },
            h(
              Button,
              {
                href: `mailto:${replyToEmail}`,
                style: {
                  backgroundColor: colors.buttonBg,
                  color: colors.surface,
                  fontFamily: fonts.body,
                  fontWeight: 700,
                  fontSize: '14px',
                  borderRadius: radii.sm,
                  padding: '12px 28px',
                },
              },
              `Reply to ${name}`
            )
          )
        : null
    ),
    h(EmailFooter, {
      key: 'footer',
      variant: 'compact',
      iconSize: 22,
      note: 'This lead was submitted through roshalink.com. Automated notification — do not reply to this address directly unless a sender email was provided above.',
    })
  );
}

/** Sample data for the react-email dev preview — matches the approved mockup's own default props. */
LeadNotificationEmail.PreviewProps = {
  name: 'Anna Berg',
  email: 'anna.berg@nordicretail.se',
  company: 'Nordic Retail AB — Marketing Lead',
  service: 'Website Redesign',
  budget: '100,000–250,000 SEK',
  lang: 'sv',
  source: 'contact',
  message: "We're looking to relaunch our e-commerce site before Q1. Would love to discuss timelines and scope.",
  timestamp: 'Sep 18, 2026 · 14:32 CET',
  replyToEmail: 'anna.berg@nordicretail.se',
};
