import { describe, it, expect } from 'vitest';
import { dirFor, emailCopy, isRtl, resolveLocale } from './i18n.js';

describe('resolveLocale', () => {
  it.each(['sv', 'en', 'fa', 'ar'])('accepts a supported locale %j as-is', (lang) => {
    expect(resolveLocale(lang)).toBe(lang);
  });

  it('is case-insensitive', () => {
    expect(resolveLocale('EN')).toBe('en');
  });

  it('strips a region suffix', () => {
    expect(resolveLocale('en-US')).toBe('en');
    expect(resolveLocale('fa-IR')).toBe('fa');
  });

  it.each([undefined, null, '', 'xx', 'de', 123])('falls back to Swedish for %j', (lang) => {
    expect(resolveLocale(lang)).toBe('sv');
  });
});

describe('isRtl / dirFor', () => {
  it.each(['fa', 'ar'])('%j is RTL', (locale) => {
    expect(isRtl(locale)).toBe(true);
    expect(dirFor(locale)).toBe('rtl');
  });

  it.each(['sv', 'en'])('%j is LTR', (locale) => {
    expect(isRtl(locale)).toBe(false);
    expect(dirFor(locale)).toBe('ltr');
  });
});

describe('emailCopy', () => {
  it.each(['sv', 'en', 'fa', 'ar'])('returns fully-populated strings for %j', (lang) => {
    const { locale, common, welcome, confirmation } = emailCopy(lang);
    expect(locale).toBe(lang);

    // Every key that isn't a function must be a non-empty string; every
    // function must return a non-empty string when called.
    for (const group of [common, welcome, confirmation]) {
      for (const [key, value] of Object.entries(group)) {
        if (typeof value === 'function') {
          expect(value('Sam'), `${lang}.${key}('Sam')`).toBeTruthy();
        } else if (Array.isArray(value)) {
          expect(value.length, `${lang}.${key}`).toBeGreaterThan(0);
        } else {
          expect(value, `${lang}.${key}`).toBeTruthy();
        }
      }
    }
  });

  it("welcome.headline returns a {before, highlight, after} triplet", () => {
    const { welcome } = emailCopy('en');
    const headline = welcome.headline('Sam');
    expect(headline).toHaveProperty('before');
    expect(headline).toHaveProperty('highlight');
    expect(headline).toHaveProperty('after');
    expect(`${headline.before}${headline.highlight}${headline.after}`).toContain('Sam');
  });

  it('falls back to Swedish strings for an unsupported lang', () => {
    expect(emailCopy('xx').locale).toBe('sv');
    expect(emailCopy(undefined).locale).toBe('sv');
  });
});
