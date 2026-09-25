import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import handler from './confirm-subscription.js';
import { CONFIRM_LINK_TTL_DAYS, confirmUrl } from './_lib/emailLinks.js';

let ipCounter = 0;
function makeReq({ method = 'GET', url }) {
  ipCounter += 1;
  return { method, url, headers: { 'x-forwarded-for': `198.51.220.${ipCounter}` } };
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

const EMAILS_URL = 'https://api.resend.com/emails';
const CONTACTS_URL = 'https://api.resend.com/contacts';

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
const welcomeEmail = (spy) => JSON.parse(callsTo(spy, EMAILS_URL)[0][1].body);

function signedPath(email, lang = 'en', nowMs = Date.now()) {
  const url = new URL(confirmUrl(email, lang, nowMs));
  return `${url.pathname}${url.search}`;
}

beforeEach(() => {
  vi.stubEnv('EMAIL_LINK_SECRET', 'test-secret');
  vi.stubEnv('RESEND_API_KEY', 'test-key');
  vi.stubEnv('RESEND_NEWSLETTER_SEGMENT_ID', 'seg_123');
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('GET /api/confirm-subscription', () => {
  it('shows a confirm button and does NOT subscribe (mail scanners fetch GETs)', async () => {
    const fetchSpy = mockResend();
    const res = makeRes();
    await handler(makeReq({ url: signedPath('a@b.com') }), res);

    expect(res.statusCode).toBe(200);
    expect(res.body).toContain('<form method="post" action="/api/confirm-subscription?');
    expect(res.body).toContain('a@b.com');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('shows an "expired" page for an old link', async () => {
    const old = Date.now() - (CONFIRM_LINK_TTL_DAYS + 1) * 24 * 60 * 60 * 1000;
    const res = makeRes();
    await handler(makeReq({ url: signedPath('a@b.com', 'en', old) }), res);

    expect(res.statusCode).toBe(410);
    expect(res.body).toContain('This link has expired');
  });

  it('rejects a tampered link', async () => {
    const res = makeRes();
    await handler(makeReq({ url: signedPath('a@b.com').replace('a%40b.com', 'victim%40b.com') }), res);

    expect(res.statusCode).toBe(400);
  });

  it.each([
    ['sv', 'Bekräfta din prenumeration', 'ltr'],
    ['fa', 'عضویت خود را تأیید کنید', 'rtl'],
  ])('renders in %s', async (lang, heading, dir) => {
    const res = makeRes();
    await handler(makeReq({ url: signedPath('a@b.com', lang) }), res);

    expect(res.body).toContain(heading);
    expect(res.body).toContain(`dir="${dir}"`);
  });
});

describe('POST /api/confirm-subscription', () => {
  it('adds the contact to the newsletter segment and shows the done page', async () => {
    const fetchSpy = mockResend();
    const res = makeRes();
    await handler(makeReq({ method: 'POST', url: signedPath('a@b.com') }), res);

    expect(res.statusCode).toBe(200);
    expect(res.body).toContain('You&#39;re subscribed!');
    const create = callsTo(fetchSpy, CONTACTS_URL).find(([, init]) => init.method === 'POST');
    expect(JSON.parse(create[1].body)).toEqual({ email: 'a@b.com', unsubscribed: false, segments: [{ id: 'seg_123' }] });
  });

  it('sends the welcome email with one-click unsubscribe headers and a matching footer link', async () => {
    vi.stubEnv('LEAD_FROM_EMAIL', 'leads@roshalink.com');
    vi.stubEnv('LEAD_TO_EMAIL', 'support@roshalink.com');
    const fetchSpy = mockResend();
    await handler(makeReq({ method: 'POST', url: signedPath('a@b.com', 'en') }), makeRes());

    const sent = welcomeEmail(fetchSpy);
    expect(sent.to).toEqual(['a@b.com']);
    expect(sent.subject).toBe("You're subscribed to RoshaLink Insights");
    expect(sent.from).toBe('RoshaLink <leads@roshalink.com>');
    expect(sent.reply_to).toBe('support@roshalink.com');
    const header = sent.headers['List-Unsubscribe'];
    expect(header).toMatch(/^<https:\/\/roshalink\.com\/api\/unsubscribe\?e=a%40b\.com&t=[\w-]+&lang=en>$/);
    expect(sent.headers['List-Unsubscribe-Post']).toBe('List-Unsubscribe=One-Click');
    expect(sent.html).toContain(`href="${header.slice(1, -1).replace(/&/g, '&amp;')}"`);
    expect(sent.html).toContain('href="https://roshalink.com/en/portfolio"');
    expect(sent.html).not.toContain('href="#"');
  });

  it.each([
    ['sv', 'Du prenumererar nu på RoshaLink Insights', 'Nu är du '],
    ['fa', 'عضویت شما در خبرنامه روشالینک تأیید شد', 'به جمع ما '],
    ['ar', 'تم تأكيد اشتراكك في نشرة روشالينك', 'معنا الآن'],
  ])('localizes the welcome email for %s', async (lang, subject, headlinePart) => {
    const fetchSpy = mockResend();
    await handler(makeReq({ method: 'POST', url: signedPath('a@b.com', lang) }), makeRes());

    const sent = welcomeEmail(fetchSpy);
    expect(sent.subject).toBe(subject);
    expect(sent.html).toContain(headlinePart);
    expect(sent.text).not.toMatch(/\bthere\b/);
  });

  it('does not send a second welcome email to someone already subscribed', async () => {
    const fetchSpy = mockResend({ contact: { email: 'a@b.com', unsubscribed: false } });
    const res = makeRes();
    await handler(makeReq({ method: 'POST', url: signedPath('a@b.com') }), res);

    expect(res.statusCode).toBe(200);
    expect(callsTo(fetchSpy, EMAILS_URL)).toHaveLength(0);
  });

  it('shows an error page (and sends nothing) when the contact cannot be saved', async () => {
    const fetchSpy = mockResend({ contactsStatus: 500 });
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const res = makeRes();
    await handler(makeReq({ method: 'POST', url: signedPath('a@b.com') }), res);

    expect(res.statusCode).toBe(502);
    expect(callsTo(fetchSpy, EMAILS_URL)).toHaveLength(0);
    errorSpy.mockRestore();
  });

  it('refuses an expired link on POST too', async () => {
    const fetchSpy = mockResend();
    const old = Date.now() - (CONFIRM_LINK_TTL_DAYS + 1) * 24 * 60 * 60 * 1000;
    const res = makeRes();
    await handler(makeReq({ method: 'POST', url: signedPath('a@b.com', 'en', old) }), res);

    expect(res.statusCode).toBe(410);
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
