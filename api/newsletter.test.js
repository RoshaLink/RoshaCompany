import { describe, it, expect, afterEach, vi } from 'vitest';
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

describe('newsletter handler — welcome email', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('does not call Resend when RESEND_API_KEY is not configured', async () => {
    const fetchSpy = vi.fn(async () => ({ ok: true, status: 200, text: async () => '' }));
    vi.stubGlobal('fetch', fetchSpy);

    const res = makeRes();
    await handler(makeReq({ body: { email: 'subscriber@domain.com' } }), res);

    expect(res.statusCode).toBe(200);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('sends a welcome email to the new subscriber when RESEND_API_KEY is configured', async () => {
    vi.stubEnv('RESEND_API_KEY', 'test-key');
    const fetchSpy = vi.fn(async () => ({ ok: true, status: 200, text: async () => '' }));
    vi.stubGlobal('fetch', fetchSpy);

    const res = makeRes();
    await handler(makeReq({ body: { email: 'subscriber@domain.com', lang: 'en' } }), res);

    expect(res.statusCode).toBe(200);
    const resendCall = fetchSpy.mock.calls.find(([url]) => url === 'https://api.resend.com/emails');
    expect(resendCall).toBeTruthy();
    const sent = JSON.parse(resendCall[1].body);
    expect(sent.to).toEqual(['subscriber@domain.com']);
    expect(sent.subject).toContain('RoshaLink');
    expect(sent.html).toContain('Welcome');
  });

  it('defaults to Swedish when no lang is given', async () => {
    vi.stubEnv('RESEND_API_KEY', 'test-key');
    const fetchSpy = vi.fn(async () => ({ ok: true, status: 200, text: async () => '' }));
    vi.stubGlobal('fetch', fetchSpy);

    const res = makeRes();
    await handler(makeReq({ body: { email: 'subscriber@domain.com' } }), res);

    expect(res.statusCode).toBe(200);
    const resendCall = fetchSpy.mock.calls.find(([url]) => url === 'https://api.resend.com/emails');
    const sent = JSON.parse(resendCall[1].body);
    expect(sent.html).toContain('Välkommen');
  });

  it.each([
    ['fa', 'خوش آمدید'],
    ['ar', 'أهلاً بك'],
  ])('localizes the welcome email for lang %j', async (lang, expectedSubstring) => {
    vi.stubEnv('RESEND_API_KEY', 'test-key');
    const fetchSpy = vi.fn(async () => ({ ok: true, status: 200, text: async () => '' }));
    vi.stubGlobal('fetch', fetchSpy);

    const res = makeRes();
    await handler(makeReq({ body: { email: 'subscriber@domain.com', lang } }), res);

    const resendCall = fetchSpy.mock.calls.find(([url]) => url === 'https://api.resend.com/emails');
    const sent = JSON.parse(resendCall[1].body);
    expect(sent.html).toContain(expectedSubstring);
    // Farsi/Arabic are RTL — the document direction must flip too.
    expect(sent.html).toContain('dir="rtl"');
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
