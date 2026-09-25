import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { CONFIRM_LINK_TTL_DAYS, checkConfirmToken, confirmUrl, unsubscribeUrl, verifyUnsubscribeToken } from './emailLinks.js';

const DAY_MS = 24 * 60 * 60 * 1000;
const params = (url) => new URL(url).searchParams;

beforeEach(() => {
  vi.stubEnv('EMAIL_LINK_SECRET', 'test-secret');
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('unsubscribe tokens', () => {
  it('accepts the token it issued and nothing else', () => {
    const token = params(unsubscribeUrl('a@b.com', 'en')).get('t');
    expect(verifyUnsubscribeToken('a@b.com', token)).toBe(true);
    expect(verifyUnsubscribeToken('A@B.com ', token)).toBe(true);
    expect(verifyUnsubscribeToken('someone-else@b.com', token)).toBe(false);
    expect(verifyUnsubscribeToken('a@b.com', `${token}x`)).toBe(false);
    expect(verifyUnsubscribeToken('a@b.com', '')).toBe(false);
  });

  it('issues no link and accepts no token without a secret', () => {
    const token = params(unsubscribeUrl('a@b.com', 'en')).get('t');
    vi.stubEnv('EMAIL_LINK_SECRET', '');
    expect(unsubscribeUrl('a@b.com', 'en')).toBeNull();
    expect(verifyUnsubscribeToken('a@b.com', token)).toBe(false);
  });
});

describe('confirm tokens', () => {
  const now = Date.UTC(2026, 8, 25);

  it('is valid right away and until the TTL runs out, then expired', () => {
    const p = params(confirmUrl('a@b.com', 'sv', now));
    const check = (at) => checkConfirmToken('a@b.com', p.get('ts'), p.get('t'), at);
    expect(check(now)).toBe('valid');
    expect(check(now + CONFIRM_LINK_TTL_DAYS * DAY_MS - 1000)).toBe('valid');
    expect(check(now + CONFIRM_LINK_TTL_DAYS * DAY_MS + 1000)).toBe('expired');
  });

  it('rejects an edited timestamp (can not extend an expired link)', () => {
    const p = params(confirmUrl('a@b.com', 'sv', now));
    const later = String(Number(p.get('ts')) + 30 * 24 * 60 * 60);
    expect(checkConfirmToken('a@b.com', later, p.get('t'), now + 30 * DAY_MS)).toBe('invalid');
  });

  it('rejects another address, a garbage timestamp, and a future timestamp', () => {
    const p = params(confirmUrl('a@b.com', 'sv', now));
    expect(checkConfirmToken('x@b.com', p.get('ts'), p.get('t'), now)).toBe('invalid');
    expect(checkConfirmToken('a@b.com', 'abc', p.get('t'), now)).toBe('invalid');
    expect(checkConfirmToken('a@b.com', p.get('ts'), p.get('t'), now - DAY_MS)).toBe('invalid');
  });

  it('keeps the two link types separate (an unsubscribe token cannot confirm)', () => {
    const unsubToken = params(unsubscribeUrl('a@b.com', 'en')).get('t');
    const p = params(confirmUrl('a@b.com', 'en', now));
    expect(checkConfirmToken('a@b.com', p.get('ts'), unsubToken, now)).toBe('invalid');
    expect(verifyUnsubscribeToken('a@b.com', p.get('t'))).toBe(false);
  });
});
