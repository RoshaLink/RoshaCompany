import * as React from 'react';
import { Img, Link, Section, Text } from '@react-email/components';
import EmailLayout from './EmailLayout.jsx';
import EmailFooter from './EmailFooter.jsx';
import FieldRow from './FieldRow.jsx';
import { colors, fonts, logo, radii } from './brand.js';

/**
 * Sent to the enquiry submitter — a real address, unlike LeadNotificationEmail
 * — from api/lead.js, for the 'contact' and 'get-started' sources only (a
 * chat-widget-captured contact may only be a phone number, and "read your own
 * chat back as an email" doesn't fit that flow the way it does a form
 * submission). Matches the approved "Contact Form Confirmation" mockup 1:1.
 */
export default function ContactConfirmationEmail({ firstName, name, email, service, message, ctaHref = 'https://roshalink.com/en/portfolio' }) {
  return (
    <EmailLayout previewText="Thanks for reaching out — here's a copy of what you sent us" width={600}>
      {/* Header */}
      <Section style={{ padding: '24px 32px', textAlign: 'center', borderBottom: `1px solid ${colors.border}` }}>
        <Img src={logo.full} width={140} height={86} alt="RoshaLink logo" style={{ margin: '0 auto', height: '50px', width: 'auto' }} />
      </Section>

      {/* Confirmation hero */}
      <Section style={{ padding: '36px 32px 8px', textAlign: 'center' }}>
        <table role="presentation" align="center" style={{ margin: '0 auto 18px' }}>
          <tbody>
            <tr>
              <td
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: radii.full,
                  backgroundColor: colors.successBg,
                  textAlign: 'center',
                  verticalAlign: 'middle',
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ verticalAlign: 'middle' }}>
                  <path d="M5 13l4 4L19 7" stroke={colors.success} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </td>
            </tr>
          </tbody>
        </table>

        <Text
          style={{
            margin: '0 0 18px',
            fontFamily: fonts.headline,
            fontWeight: 700,
            letterSpacing: '-0.01em',
            fontSize: '26px',
            lineHeight: '1.3',
            color: colors.text,
          }}
        >
          Thanks for reaching out, {firstName}!
        </Text>

        <Text
          style={{
            margin: '0 auto',
            maxWidth: '440px',
            fontFamily: fonts.body,
            fontSize: '15px',
            lineHeight: '1.7',
            color: colors.textMuted,
          }}
        >
          We&apos;ve received your enquiry and our team will be in touch within 1 business day.
        </Text>
      </Section>

      {/* Submission summary */}
      <Section style={{ padding: '8px 32px' }}>
        <div style={{ backgroundColor: colors.background, border: `1px solid ${colors.border}`, borderRadius: radii.md, padding: '20px 22px' }}>
          <Text
            style={{
              margin: '0 0 14px',
              fontFamily: fonts.body,
              fontWeight: 600,
              fontSize: '12px',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: colors.textMuted,
            }}
          >
            Your submission
          </Text>

          <FieldRow label="Name" value={name} spacing="10px" />
          <FieldRow label="Email" value={email} spacing="10px" />
          <FieldRow label="Service" value={service} spacing="10px" />

          {message ? (
            <div style={{ marginTop: '6px' }}>
              <div style={{ fontFamily: fonts.body, fontSize: '13px', color: colors.textMuted, marginBottom: '6px' }}>Message</div>
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontSize: '12px',
                  lineHeight: '1.6',
                  color: colors.textMuted,
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {message}
              </div>
            </div>
          ) : null}
        </div>
      </Section>

      {/* Secondary CTA */}
      <Section style={{ padding: '24px 32px 40px', textAlign: 'center' }}>
        <Link
          href={ctaHref}
          style={{
            display: 'inline-block',
            backgroundColor: 'transparent',
            color: colors.primary,
            fontFamily: fonts.body,
            fontWeight: 600,
            fontSize: '14px',
            borderRadius: radii.sm,
            border: `1.5px solid rgba(2,132,199,0.6)`,
            padding: '11px 30px',
          }}
        >
          Explore Our Work
        </Link>
      </Section>

      <EmailFooter
        variant="full"
        links={[
          { label: 'Privacy Policy', href: 'https://roshalink.com/en/privacy' },
          { label: 'Contact', href: 'https://roshalink.com/en/contact' },
          { label: 'Website', href: 'https://roshalink.com' },
        ]}
      />
    </EmailLayout>
  );
}

/** Sample data for the react-email dev preview — matches the approved mockup's own default props. */
ContactConfirmationEmail.PreviewProps = {
  firstName: 'Sam',
  name: 'Sam Razavi',
  email: 'sam@example.com',
  service: 'Website Redesign',
  message: 'We are looking to modernize our site and need a partner who can handle design and development end to end.',
};
