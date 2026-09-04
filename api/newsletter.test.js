import { describe, it, expect } from 'vitest';
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
