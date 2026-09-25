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

describe('newsletter handler — welcome email', () => {
  beforeEach(() => {
    vi.stubEnv('UNSUBSCRIBE_SECRET', 'test-secret');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('does not call Resend when RESEND_API_KEY is not configured', async () => {
    const fetchSpy = mockResend();

    const res = makeRes();
    await handler(makeReq({ body: { email: 'subscriber@domain.com' } }), res);

    expect(res.statusCode).toBe(200);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('sends a welcome email to the new subscriber when RESEND_API_KEY is configured', async () => {
    vi.stubEnv('RESEND_API_KEY', 'test-key');
    const fetchSpy = mockResend();

    const res = makeRes();
    await handler(makeReq({ body: { email: 'subscriber@domain.com', lang: 'en' } }), res);

    expect(res.statusCode).toBe(200);
    const sent = sentEmail(fetchSpy);
    expect(sent.to).toEqual(['subscriber@domain.com']);
    expect(sent.subject).toContain('RoshaLink');
    expect(sent.html).toContain('Welcome');
  });

  it('defaults to Swedish when no lang is given', async () => {
    vi.stubEnv('RESEND_API_KEY', 'test-key');
    const fetchSpy = mockResend();

    const res = makeRes();
    await handler(makeReq({ body: { email: 'subscriber@domain.com' } }), res);

    expect(res.statusCode).toBe(200);
    expect(sentEmail(fetchSpy).html).toContain('Välkommen');
  });

  it.each([
    ['fa', 'خوش آمدید'],
    ['ar', 'أهلاً بك'],
  ])('localizes the welcome email for lang %j', async (lang, expectedSubstring) => {
    vi.stubEnv('RESEND_API_KEY', 'test-key');
    const fetchSpy = mockResend();

    const res = makeRes();
    await handler(makeReq({ body: { email: 'subscriber@domain.com', lang } }), res);

    const sent = sentEmail(fetchSpy);
    expect(sent.html).toContain(expectedSubstring);
    // Farsi/Arabic are RTL — the document direction must flip too.
    expect(sent.html).toContain('dir="rtl"');
  });

  it.each(['sv', 'en', 'fa', 'ar'])('never greets a nameless subscriber as "there" (%s)', async (lang) => {
    vi.stubEnv('RESEND_API_KEY', 'test-key');
    const fetchSpy = mockResend();

    await handler(makeReq({ body: { email: 'subscriber@domain.com', lang } }), makeRes());

    const sent = sentEmail(fetchSpy);
    expect(sent.html).not.toMatch(/\bthere\b/);
    expect(sent.text).not.toMatch(/\bthere\b/);
  });

  it('adds one-click List-Unsubscribe headers and a real unsubscribe link', async () => {
    vi.stubEnv('RESEND_API_KEY', 'test-key');
    const fetchSpy = mockResend();

    await handler(makeReq({ body: { email: 'subscriber@domain.com', lang: 'en' } }), makeRes());

    const sent = sentEmail(fetchSpy);
    const header = sent.headers['List-Unsubscribe'];
    expect(header).toMatch(/^<https:\/\/roshalink\.com\/api\/unsubscribe\?e=subscriber%40domain\.com&t=[\w-]+&lang=en>$/);
    expect(sent.headers['List-Unsubscribe-Post']).toBe('List-Unsubscribe=One-Click');
    const link = header.slice(1, -1).replace(/&/g, '&amp;');
    expect(sent.html).toContain(`href="${link}"`);
    expect(sent.html).not.toContain('href="#"');
  });

  it('sends from a "RoshaLink" display name and sets reply-to to the team inbox', async () => {
    vi.stubEnv('RESEND_API_KEY', 'test-key');
    vi.stubEnv('LEAD_FROM_EMAIL', 'leads@roshalink.com');
    vi.stubEnv('LEAD_TO_EMAIL', 'support@roshalink.com');
    const fetchSpy = mockResend();

    await handler(makeReq({ body: { email: 'subscriber@domain.com' } }), makeRes());

    const sent = sentEmail(fetchSpy);
    expect(sent.from).toBe('RoshaLink <leads@roshalink.com>');
    expect(sent.reply_to).toBe('support@roshalink.com');
  });

  it('does not send a welcome email when UNSUBSCRIBE_SECRET is missing', async () => {
    vi.stubEnv('RESEND_API_KEY', 'test-key');
    vi.stubEnv('UNSUBSCRIBE_SECRET', '');
    const fetchSpy = mockResend();

    const res = makeRes();
    await handler(makeReq({ body: { email: 'subscriber@domain.com' } }), res);

    expect(res.statusCode).toBe(200);
    expect(callsTo(fetchSpy, EMAILS_URL)).toHaveLength(0);
  });

  it('still returns 200 when the welcome email send fails', async () => {
    vi.stubEnv('RESEND_API_KEY', 'test-key');
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new Error('resend down');
      })
    );

    const res = makeRes();
    await handler(makeReq({ body: { email: 'subscriber@domain.com' } }), res);

    expect(res.statusCode).toBe(200);
    expect(res.payload.success).toBe(true);
  });
});

describe('newsletter handler — Resend contacts', () => {
  beforeEach(() => {
    vi.stubEnv('RESEND_API_KEY', 'test-key');
    vi.stubEnv('UNSUBSCRIBE_SECRET', 'test-secret');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('creates a contact for a new subscriber, in the newsletter segment when configured', async () => {
    vi.stubEnv('RESEND_NEWSLETTER_SEGMENT_ID', 'seg_123');
    const fetchSpy = mockResend();

    await handler(makeReq({ body: { email: 'new@domain.com' } }), makeRes());

    const create = callsTo(fetchSpy, CONTACTS_URL).find(([, init]) => init.method === 'POST');
    expect(JSON.parse(create[1].body)).toEqual({
      email: 'new@domain.com',
      unsubscribed: false,
      segments: [{ id: 'seg_123' }],
    });
    expect(callsTo(fetchSpy, EMAILS_URL)).toHaveLength(1);
  });

  it('skips the welcome email for someone already subscribed, with an identical response', async () => {
    const fetchSpy = mockResend({ contact: { email: 'old@domain.com', unsubscribed: false } });

    const res = makeRes();
    await handler(makeReq({ body: { email: 'old@domain.com' } }), res);

    expect(res.statusCode).toBe(200);
    expect(res.payload.success).toBe(true);
    expect(callsTo(fetchSpy, EMAILS_URL)).toHaveLength(0);
  });

  it('re-subscribes a previously unsubscribed contact and welcomes them again', async () => {
    const fetchSpy = mockResend({ contact: { email: 'back@domain.com', unsubscribed: true } });

    await handler(makeReq({ body: { email: 'back@domain.com' } }), makeRes());

    const patch = callsTo(fetchSpy, CONTACTS_URL).find(([, init]) => init.method === 'PATCH');
    expect(JSON.parse(patch[1].body)).toEqual({ unsubscribed: false });
    expect(callsTo(fetchSpy, EMAILS_URL)).toHaveLength(1);
  });

  it('still sends the welcome email when the key cannot manage contacts', async () => {
    const fetchSpy = mockResend({ contactsStatus: 401 });
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const res = makeRes();
    await handler(makeReq({ body: { email: 'subscriber@domain.com' } }), res);

    expect(res.statusCode).toBe(200);
    expect(callsTo(fetchSpy, EMAILS_URL)).toHaveLength(1);
    expect(errorSpy).toHaveBeenCalledWith('[newsletter] contact_sync_error', expect.stringContaining('401'));
    errorSpy.mockRestore();
  });
});
