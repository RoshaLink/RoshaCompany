import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import handler from './lead.js'

// Each test uses a unique IP so the module-level rate-limit Map in
// _lib/rateLimit.js doesn't carry state between tests.
let ipCounter = 0
function makeReq({ method = 'POST', body = {}, headers = {} } = {}) {
  ipCounter += 1
  return {
    method,
    headers: { 'x-forwarded-for': `198.51.100.${ipCounter}`, ...headers },
    body,
  }
}

function makeRes() {
  return {
    statusCode: 0,
    headers: {},
    payload: undefined,
    setHeader(key, value) {
      this.headers[key] = value
    },
    end(raw) {
      this.payload = JSON.parse(raw)
    },
  }
}

/** A minimal lead that passes validation, for tests that care about one field. */
const validLead = {
  name: 'Jane Doe',
  email: 'jane@company.com',
  message: 'We need a new site.',
}

/** The last body passed to the mocked fetch, parsed. */
function lastFetchBody() {
  const [, init] = globalThis.fetch.mock.calls.at(-1)
  return JSON.parse(init.body)
}

beforeEach(() => {
  vi.stubEnv('RESEND_API_KEY', 'test-key')
  vi.stubEnv('LEAD_TO_EMAIL', 'leads@roshalink.com')
  vi.stubEnv('ALLOWED_ORIGINS', '')
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => ({ ok: true, status: 200, text: async () => '' }))
  )
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('lead handler — request gates', () => {
  it('rejects non-POST methods', async () => {
    const res = makeRes()
    await handler(makeReq({ method: 'GET' }), res)

    expect(res.statusCode).toBe(405)
    expect(res.payload).toEqual({ error: 'method_not_allowed' })
    expect(globalThis.fetch).not.toHaveBeenCalled()
  })

  it('rejects a disallowed origin', async () => {
    vi.stubEnv('ALLOWED_ORIGINS', 'https://roshalink.com')
    const res = makeRes()
    await handler(
      makeReq({ body: validLead, headers: { origin: 'https://evil.example.com' } }),
      res
    )

    expect(res.statusCode).toBe(403)
    expect(res.payload).toEqual({ error: 'forbidden' })
    expect(globalThis.fetch).not.toHaveBeenCalled()
  })

  it('rate limits after 5 submissions from one IP, with a Retry-After header', async () => {
    const ip = '198.51.100.200'
    const send = () => {
      const res = makeRes()
      return handler(
        { method: 'POST', headers: { 'x-forwarded-for': ip }, body: validLead },
        res
      ).then(() => res)
    }

    for (let i = 0; i < 5; i += 1) {
      const res = await send()
      expect(res.statusCode).toBe(200)
    }

    const blocked = await send()
    expect(blocked.statusCode).toBe(429)
    expect(blocked.payload.error).toBe('rate_limited')
    expect(Number(blocked.headers['Retry-After'])).toBeGreaterThan(0)
  })

  it('500s when RESEND_API_KEY is missing, without calling Resend', async () => {
    vi.stubEnv('RESEND_API_KEY', '')
    const res = makeRes()
    await handler(makeReq({ body: validLead }), res)

    expect(res.statusCode).toBe(500)
    expect(res.payload).toEqual({ error: 'server_error' })
    expect(globalThis.fetch).not.toHaveBeenCalled()
  })

  it('500s when LEAD_TO_EMAIL is missing', async () => {
    vi.stubEnv('LEAD_TO_EMAIL', '')
    const res = makeRes()
    await handler(makeReq({ body: validLead }), res)

    expect(res.statusCode).toBe(500)
    expect(globalThis.fetch).not.toHaveBeenCalled()
  })

  it('succeeds via backend forwarding when BACKEND_API_URL is configured, even without RESEND_API_KEY', async () => {
    vi.stubEnv('RESEND_API_KEY', '')
    vi.stubEnv('LEAD_TO_EMAIL', '')
    vi.stubEnv('BACKEND_API_URL', 'https://mock-backend.com')
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url) => {
        if (url === 'https://mock-backend.com/api/lead') {
          return { ok: true, status: 201, json: async () => ({ success: true }) }
        }
        return { ok: false, status: 404 }
      })
    )

    const res = makeRes()
    await handler(makeReq({ body: validLead }), res)

    expect(res.statusCode).toBe(200)
    expect(res.payload).toEqual({ ok: true })
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://mock-backend.com/api/lead',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
      })
    )
  })
})

describe('lead handler — validation', () => {
  it('rejects a missing name', async () => {
    const res = makeRes()
    await handler(makeReq({ body: { ...validLead, name: '' } }), res)

    expect(res.statusCode).toBe(400)
    expect(res.payload).toEqual({ error: 'bad_request' })
    expect(globalThis.fetch).not.toHaveBeenCalled()
  })

  it.each(['not-an-email', 'missing@domain', 'no-at-sign.com', 'spaces @x.com', ''])(
    'rejects invalid email %j',
    async (email) => {
      const res = makeRes()
      await handler(makeReq({ body: { ...validLead, email } }), res)

      expect(res.statusCode).toBe(400)
      expect(globalThis.fetch).not.toHaveBeenCalled()
    }
  )

  it.each(['jane@company.com', 'a.b+tag@sub.example.co.uk'])(
    'accepts valid email %j',
    async (email) => {
      const res = makeRes()
      await handler(makeReq({ body: { ...validLead, email } }), res)

      expect(res.statusCode).toBe(200)
    }
  )

  it('rejects a body that is not valid JSON', async () => {
    const res = makeRes()
    // A string body is JSON.parse'd by readJsonBody; invalid JSON must 400
    // rather than throw an unhandled error.
    await handler(makeReq({ body: '{not json' }), res)

    expect(res.statusCode).toBe(400)
    expect(res.payload).toEqual({ error: 'bad_request' })
  })
})

describe('lead handler — outgoing email', () => {
  it('posts to Resend with the expected envelope', async () => {
    const res = makeRes()
    await handler(
      makeReq({ body: { ...validLead, company: 'Acme', source: 'contact' } }),
      res
    )

    expect(res.statusCode).toBe(200)
    expect(res.payload).toEqual({ ok: true })

    const [url, init] = globalThis.fetch.mock.calls.at(-1)
    expect(url).toBe('https://api.resend.com/emails')
    expect(init.method).toBe('POST')
    expect(init.headers.Authorization).toBe('Bearer test-key')

    const sent = JSON.parse(init.body)
    expect(sent.to).toEqual(['leads@roshalink.com'])
    // Reply must go to the prospect, not to Resend.
    expect(sent.reply_to).toBe('jane@company.com')
    expect(sent.subject).toContain('Jane Doe')
    expect(sent.subject).toContain('Acme')
  })

  it('maps a known source to its human-readable label', async () => {
    const res = makeRes()
    await handler(makeReq({ body: { ...validLead, source: 'get-started' } }), res)

    expect(lastFetchBody().text).toContain('Get Started modal')
  })

  it('escapes HTML in user-supplied fields', async () => {
    const res = makeRes()
    await handler(
      makeReq({
        body: {
          ...validLead,
          name: 'Jane <script>alert(1)</script>',
          message: 'a < b & c > d',
        },
      }),
      res
    )

    const { html } = lastFetchBody()
    expect(html).not.toContain('<script>')
    expect(html).toContain('&lt;script&gt;')
    expect(html).toContain('&amp;')
  })

  it('strips control characters and caps field length', async () => {
    const res = makeRes()
    await handler(
      makeReq({
        body: {
          ...validLead,
          name: 'Jane\u0000\u0007 Doe',
          message: 'x'.repeat(5000),
        },
      }),
      res
    )

    const sent = lastFetchBody()
    // Newlines are the intended row separator in the text body, so only the
    // field values themselves should be free of control characters.
    const nameRow = sent.text.split('\n').find((line) => line.startsWith('Name:'))
    // eslint-disable-next-line no-control-regex
    expect(nameRow).not.toMatch(/[\u0000-\u001F\u007F]/)
    expect(nameRow).toContain('Jane')
    expect(nameRow).toContain('Doe')
    // message is capped at MAX_MESSAGE_CHARS (4000)
    expect(sent.text).toContain('x'.repeat(4000))
    expect(sent.text).not.toContain('x'.repeat(4001))
  })

  it('502s when Resend rejects the request', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({ ok: false, status: 422, text: async () => 'domain not verified' }))
    )
    const res = makeRes()
    await handler(makeReq({ body: validLead }), res)

    expect(res.statusCode).toBe(502)
    expect(res.payload).toEqual({ error: 'upstream_error' })
    // Upstream detail must not leak to the browser.
    expect(JSON.stringify(res.payload)).not.toContain('domain not verified')
  })

  it('504s when the upstream call aborts', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        const err = new Error('aborted')
        err.name = 'AbortError'
        throw err
      })
    )
    const res = makeRes()
    await handler(makeReq({ body: validLead }), res)

    expect(res.statusCode).toBe(504)
    expect(res.payload).toEqual({ error: 'timeout' })
  })

  it('500s on an unexpected network error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new Error('ECONNRESET')
      })
    )
    const res = makeRes()
    await handler(makeReq({ body: validLead }), res)

    expect(res.statusCode).toBe(500)
    expect(res.payload).toEqual({ error: 'server_error' })
  })
})
