import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import handler from './newsletter.js';

let ipCounter = 0;
function makeReq({ method = 'POST', body = {}, headers = {} } = {}) {
  ipCounter += 1;
  return {
    method,
    headers: { 'x-forwarded-for': `198.51.200.${ipCounter}`, ...headers },
    body,
  };
}

function makeRes() {
  return {
    statusCode: 0,
    headers: {},
    payload: undefined,
    setHeader(key, value) {
      this.headers[key] = value;
    },
    end(raw) {
      this.payload = JSON.parse(raw);
    },
  };
}

const EMAILS_URL = 'https://api.resend.com/emails';
const CONTACTS_URL = 'https://api.resend.com/contacts';

/**
 * Fake Resend: `contact` is what GET /contacts/{email} finds (null → 404).
 * `contactsStatus` overrides every contacts call, e.g. 401 for a
 * "Sending access" key.
 */
function mockResend({ contact = null, contactsStatus } = {}) {
  const spy = vi.fn(async (url, init = {}) => {
    const reply = (status, json = {}) => ({
      ok: status >= 200 && status < 300,
      status,
      json: async () => json,
      text: async () => JSON.stringify(json),
    });
    if (url.startsWith(CONTACTS_URL)) {
      if (contactsStatus) return reply(contactsStatus, { message: 'nope' });
      if (init.method === 'GET') return contact ? reply(200, contact) : reply(404, { message: 'not found' });
      return reply(200, { id: 'c_1' });
    }
    return reply(200, { id: 'e_1' });
  });
  vi.stubGlobal('fetch', spy);
  return spy;
}

const callsTo = (spy, prefix) => spy.mock.calls.filter(([url]) => url.startsWith(prefix));
const sentEmail = (spy) => JSON.parse(callsTo(spy, EMAILS_URL)[0][1].body);

describe('newsletter handler — validation and gates', () => {
  it('rejects non-POST methods with 405', async () => {
    const res = makeRes();
    await handler(makeReq({ method: 'GET' }), res);
    expect(res.statusCode).toBe(405);
    expect(res.payload.error).toBe('method_not_allowed');
  });

  it('rejects invalid email with 400', async () => {
    const res = makeRes();
    await handler(makeReq({ body: { email: 'invalid-email' } }), res);
    expect(res.statusCode).toBe(400);
    expect(res.payload.error).toBe('invalid_email');
  });

  it('rejects honeypot bot trap submission with 400', async () => {
    const res = makeRes();
    await handler(makeReq({ body: { email: 'valid@domain.com', hp_field: 'http://spam.com' } }), res);
    expect(res.statusCode).toBe(400);
    expect(res.payload.error).toBe('invalid_submission');
  });

  it('accepts valid email and returns 200', async () => {
    const res = makeRes();
    await handler(makeReq({ body: { email: 'subscriber@domain.com', lang: 'fa' } }), res);
    expect(res.statusCode).toBe(200);
    expect(res.payload.success).toBe(true);
    expect(res.payload.data.email).toBe('subscriber@domain.com');
  });
});

describe('newsletter handler — double opt-in confirmation email', () => {
  beforeEach(() => {
    vi.stubEnv('RESEND_API_KEY', 'test-key');
    vi.stubEnv('EMAIL_LINK_SECRET', 'test-secret');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('does not call Resend at all when RESEND_API_KEY is not configured', async () => {
    vi.stubEnv('RESEND_API_KEY', '');
    const fetchSpy = mockResend();

    const res = makeRes();
    await handler(makeReq({ body: { email: 'subscriber@domain.com' } }), res);

    expect(res.statusCode).toBe(200);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('sends only a confirmation email — nothing is added to the list yet', async () => {
    const fetchSpy = mockResend();

    const res = makeRes();
    await handler(makeReq({ body: { email: 'subscriber@domain.com', lang: 'en' } }), res);

    expect(res.statusCode).toBe(200);
    const writes = callsTo(fetchSpy, CONTACTS_URL).filter(([, init]) => init.method !== 'GET');
    expect(writes).toHaveLength(0);
    const sent = sentEmail(fetchSpy);
    expect(sent.to).toEqual(['subscriber@domain.com']);
    expect(sent.subject).toBe('Confirm your subscription to RoshaLink Insights');
    expect(sent.html).toMatch(/href="https:\/\/roshalink\.com\/api\/confirm-subscription\?e=subscriber%40domain\.com&amp;ts=\d+&amp;t=[\w-]+&amp;lang=en"/);
    // A newsletter-type unsubscribe header makes no sense before they've subscribed.
    expect(sent.headers).toBeUndefined();
  });

  it.each([
    ['sv', 'Bekräfta din prenumeration', 'ltr'],
    ['fa', 'عضویت خود را تأیید کنید', 'rtl'],
    ['ar', 'أكّد اشتراكك', 'rtl'],
  ])('localizes the confirmation email for %s', async (lang, heading, dir) => {
    const fetchSpy = mockResend();

    await handler(makeReq({ body: { email: 'subscriber@domain.com', lang } }), makeRes());

    const sent = sentEmail(fetchSpy);
    expect(sent.html).toContain(heading);
    expect(sent.html).toContain(`dir="${dir}"`);
  });

  it('defaults to Swedish when no lang is given', async () => {
    const fetchSpy = mockResend();

    await handler(makeReq({ body: { email: 'subscriber@domain.com' } }), makeRes());

    expect(sentEmail(fetchSpy).subject).toContain('Bekräfta');
  });

  it('sends from a "RoshaLink" display name and sets reply-to to the team inbox', async () => {
    vi.stubEnv('LEAD_FROM_EMAIL', 'leads@roshalink.com');
    vi.stubEnv('LEAD_TO_EMAIL', 'support@roshalink.com');
    const fetchSpy = mockResend();

    await handler(makeReq({ body: { email: 'subscriber@domain.com' } }), makeRes());

    const sent = sentEmail(fetchSpy);
    expect(sent.from).toBe('RoshaLink <leads@roshalink.com>');
    expect(sent.reply_to).toBe('support@roshalink.com');
  });

  it('sends nothing to someone already subscribed, with an identical response', async () => {
    const fetchSpy = mockResend({ contact: { email: 'old@domain.com', unsubscribed: false } });

    const res = makeRes();
    await handler(makeReq({ body: { email: 'old@domain.com' } }), res);

    expect(res.statusCode).toBe(200);
    expect(res.payload).toEqual({ success: true, message: 'Confirmation email sent', data: { email: 'old@domain.com', lang: 'sv' } });
    expect(callsTo(fetchSpy, EMAILS_URL)).toHaveLength(0);
  });

  it('asks a previously unsubscribed contact to confirm again', async () => {
    const fetchSpy = mockResend({ contact: { email: 'back@domain.com', unsubscribed: true } });

    await handler(makeReq({ body: { email: 'back@domain.com' } }), makeRes());

    expect(callsTo(fetchSpy, EMAILS_URL)).toHaveLength(1);
  });

  it('still sends the confirmation when the contact lookup fails', async () => {
    const fetchSpy = mockResend({ contactsStatus: 401 });
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const res = makeRes();
    await handler(makeReq({ body: { email: 'subscriber@domain.com' } }), res);

    expect(res.statusCode).toBe(200);
    expect(callsTo(fetchSpy, EMAILS_URL)).toHaveLength(1);
    expect(errorSpy).toHaveBeenCalledWith('[newsletter] contact_lookup_error', expect.stringContaining('401'));
    errorSpy.mockRestore();
  });

  it('does not send when EMAIL_LINK_SECRET is missing', async () => {
    vi.stubEnv('EMAIL_LINK_SECRET', '');
    const fetchSpy = mockResend();
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const res = makeRes();
    await handler(makeReq({ body: { email: 'subscriber@domain.com' } }), res);

    expect(res.statusCode).toBe(200);
    expect(callsTo(fetchSpy, EMAILS_URL)).toHaveLength(0);
    errorSpy.mockRestore();
  });

  it('still returns 200 when sending fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new Error('resend down');
      })
    );
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const res = makeRes();
    await handler(makeReq({ body: { email: 'subscriber@domain.com' } }), res);

    expect(res.statusCode).toBe(200);
    expect(res.payload.success).toBe(true);
    errorSpy.mockRestore();
  });
});
