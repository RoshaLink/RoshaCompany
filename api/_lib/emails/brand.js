/**
 * Shared design tokens for the react-email templates in this folder.
 *
 * Single source of truth so WelcomeEmail, LeadNotificationEmail and
 * ContactConfirmationEmail never drift from each other. Values are pulled
 * from two places, in this priority order:
 *   1. The CSS custom properties in `src/index.css` (`--color-*`, `--font-*`,
 *      `--radius-*`) — the same tokens the live site is built from.
 *   2. The exact inline styles in the approved design mockups (exported from
 *      the design tool as Main.dc.html / Notification.dc.html /
 *      Confirmation.dc.html), for values the site's CSS doesn't define
 *      (per-template spacing, the mono font's Google Fonts name, etc).
 *
 * One intentional deviation from `--font-mono` (`'Geist'`): the mockups load
 * `'Geist Mono'` from Google Fonts instead. Plain "Geist" isn't a Google
 * Fonts family, so it can't be `@import`-ed into an email the way the site's
 * bundled font can be self-hosted — "Geist Mono" is the closest real
 * monospace family in the same type system, and is what every mockup was
 * actually built and approved against.
 */

export const SITE_URL = 'https://roshalink.com';

export const colors = {
  primary: '#0284c7',
  primaryHover: '#0369a1',
  secondary: '#38bdf8',
  tertiary: '#6366f1',
  buttonBg: '#0ea5e9',
  background: '#f8fafc',
  surface: '#ffffff',
  border: '#e2e8f0',
  text: '#0f172a',
  textMuted: '#475569',
  divider: '#cbd5e1',
  footerBg: '#f1f5f9',
  success: '#10b981',
  successBg: '#d1fae5',
  badgeBg: '#e0f2fe',
};

export const fonts = {
  headline: "'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  body: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  mono: "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
};

export const radii = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  full: '9999px',
};

/** Logo assets. PNG, not the site's .webp — Outlook desktop's WebP support is unreliable in email. */
export const logo = {
  // Full mark, used at header size (~50px tall) — src/assets & public/RoshaLink_logo.webp origin.
  full: `${SITE_URL}/RoshaLink_logo.png`,
  // Pre-sized small mark for compact footer lockups, matching Navbar/Footer's own use of the _sm asset.
  small: `${SITE_URL}/RoshaLink_logo_sm.png`,
  fullWidth: 705,
  fullHeight: 433,
  smallWidth: 140,
  smallHeight: 86,
};

/**
 * Google Fonts stylesheet shared by all three templates (Outlook ignores it
 * and falls back). Vazirmatn covers the Farsi/Arabic locales, matching
 * src/index.css's own RTL font-stack fallback.
 */
export const GOOGLE_FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=Inter:wght@400;500;600&family=Geist+Mono:wght@500&family=Vazirmatn:wght@400;500;600;700&display=swap';

/** Locale-prefixed footer links, matching the site's own `/:lang/...` route table (src/App.jsx). */
export function footerLinksFor(locale) {
  return {
    privacyPolicy: `${SITE_URL}/${locale}/privacy`,
    contact: `${SITE_URL}/${locale}/contact`,
    website: SITE_URL,
  };
}

export const tagline = 'Strategic Design & Tech Agency';
export const copyrightLine = `© ${new Date().getFullYear()} RoshaLink. All rights reserved.`;
