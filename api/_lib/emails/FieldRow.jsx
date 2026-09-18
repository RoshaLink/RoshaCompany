import * as React from 'react';
import { Column, Row } from '@react-email/components';
import { colors, fonts } from './brand.js';

/**
 * One label/value line inside a field-list box (used by both
 * LeadNotificationEmail and ContactConfirmationEmail). A table row, not a
 * flex row — Outlook desktop's Word rendering engine ignores `display: flex`
 * entirely, and a `<table>` is also what turns "Name" + "Jane Doe" into two
 * separated cells instead of one glued "NameJane Doe" run in the plain-text
 * fallback.
 */
export default function FieldRow({ label, value, mono = false, muted = false, spacing = '12px' }) {
  if (!value) return null;
  return (
    <Row style={{ marginBottom: spacing }}>
      <Column style={{ fontFamily: fonts.body, fontSize: '13px', color: colors.textMuted }}>{label}</Column>
      <Column
        align="right"
        style={{
          fontFamily: mono ? fonts.mono : fonts.body,
          fontWeight: mono ? 400 : 500,
          fontSize: mono ? '12px' : '13px',
          color: muted ? colors.textMuted : colors.text,
          textAlign: 'right',
        }}
      >
        {value}
      </Column>
    </Row>
  );
}
