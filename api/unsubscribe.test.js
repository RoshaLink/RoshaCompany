import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import handler from './unsubscribe.js';
import { unsubscribeUrl, verifyUnsubscribeToken } from './_lib/unsubscribe.js';

let ipCounter = 0;
function makeReq({ method = 'GET', url }) {
  ipCounter += 1;
  return { method, url, headers: { 'x-forwarded-for': `198.51.210.${ipCounter}` } };
}

function makeRes() {
  return {
    statusCode: 0,
    headers: {},
    body: '',
    setHeader(key, value) {
      this.headers[key] = value;
    },
    end(raw) {
      this.body = raw;
    },
  };
}

/** Path + query of a freshly signed link, as the browser would request it. */
function signedPath(email, lang = 'en') {
  const url = new URL(unsubscribeUrl(email, lang));
  return `${url.pathname}${url.search}`;
}

function mockContacts(status = 200) {
  const spy = vi.fn(async () => ({ ok: status >= 200 && status < 300, status, text: async () => '' }));
  vi.stubGlobal('fetch', spy);
  return spy;
}

beforeEach(() => {
  vi.stubEnv('UNSUBSCRIBE_SECRET', 'test-secret');
  vi.stubEnv('RESEND_API_KEY', 'test-key');
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('unsubscribe tokens', () => {
  it('accepts the token it issued and nothing else', () => {
    const token = new URL(unsubscribeUrl('a@b.com', 'en')).searchParams.get('t');
    expect(verifyUnsubscribeToken('a@b.com', token)).toBe(true);
    expect(verifyUnsubscribeToken('A@B.com ', token)).toBe(true);
    expect(verifyUnsubscribeToken('someone-else@b.com', token)).toBe(false);
    expect(verifyUnsubscribeToken('a@b.com', `${token}x`)).toBe(false);
    expect(verifyUnsubscribeToken('a@b.com', '')).toBe(false);
  });

  it('issues no link and accepts no token without a secret', () => {
    const token = new URL(unsubscribeUrl('a@b.com', 'en')).searchParams.get('t');
    vi.stubEnv('UNSUBSCRIBE_SECRET', '');
    expect(unsubscribeUrl('a@b.com', 'en')).toBeNull();
    expect(verifyUnsubscribeToken('a@b.com', token)).toBe(false);
  });
});

describe('GET /api/unsubscribe', () => {
  it('shows a confirmation page and does NOT unsubscribe (link scanners fetch GETs)', async () => {
    const fetchSpy = mockContacts();
    const res = makeRes();
    await handler(makeReq({ url: signedPath('a@b.com') }), res);

    expect(res.statusCode).toBe(200);
    expect(res.headers['Content-Type']).toContain('text/html');
    expect(res.body).toContain('<form method="post"');
    expect(res.body).toContain('a@b.com');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('rejects a tampered link with 400', async () => {
    const fetchSpy = mockContacts();
    const res = makeRes();
    await handler(makeReq({ url: signedPath('a@b.com').replace('a%40b.com', 'victim%40b.com') }), res);

    expect(res.statusCode).toBe(400);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it.each([
    ['sv', 'Avsluta prenumerationen?', 'ltr'],
    ['fa', 'اشتراک خود را لغو می‌کنید؟', 'rtl'],
    ['ar', 'هل تريد إلغاء الاشتراك؟', 'rtl'],
  ])('renders the page in %s', async (lang, heading, dir) => {
    const res = makeRes();
    await handler(makeReq({ url: signedPath('a@b.com', lang) }), res);

    expect(res.body).toContain(heading);
    expect(res.body).toContain(`dir="${dir}"`);
  });

  it('escapes the email address in the page', async () => {
    const res = makeRes();
    await handler(makeReq({ url: signedPath('"><script>x</script>@b.com') }), res);

    expect(res.body).not.toContain('<script>x</script>');
  });
});

describe('POST /api/unsubscribe', () => {
  it('marks the contact unsubscribed in Resend (one-click and confirm button)', async () => {
    const fetchSpy = mockContacts();
    const res = makeRes();
    await handler(makeReq({ method: 'POST', url: signedPath('a@b.com') }), res);

    expect(res.statusCode).toBe(200);
    expect(res.body).toContain('You&#39;re unsubscribed');
    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe('https://api.resend.com/contacts/a%40b.com');
    expect(init.method).toBe('PATCH');
    expect(JSON.parse(init.body)).toEqual({ unsubscribed: true });
  });

  it('treats an address that was never a contact as unsubscribed', async () => {
    mockContacts(404);
    const res = makeRes();
    await handler(makeReq({ method: 'POST', url: signedPath('a@b.com') }), res);

    expect(res.statusCode).toBe(200);
  });

  it('shows an error page when Resend fails', async () => {
    mockContacts(500);
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const res = makeRes();
    await handler(makeReq({ method: 'POST', url: signedPath('a@b.com') }), res);

    expect(res.statusCode).toBe(502);
    expect(res.body).toContain('Something went wrong');
    errorSpy.mockRestore();
  });

  it('refuses a POST with a bad token', async () => {
    const fetchSpy = mockContacts();
    const res = makeRes();
    await handler(makeReq({ method: 'POST', url: '/api/unsubscribe?e=a%40b.com&t=forged' }), res);

    expect(res.statusCode).toBe(400);
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
