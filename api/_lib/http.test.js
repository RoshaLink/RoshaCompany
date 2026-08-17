import { describe, it, expect, afterEach, vi } from 'vitest'
import { readJsonBody, clientIp, send, originAllowed } from './http.js'

// Minimal async-iterable stand-in for a Node request stream: yields the given
// chunks, matching how readJsonBody consumes `req` with `for await`.
function streamReq(chunks) {
  return {
    async *[Symbol.asyncIterator]() {
      for (const chunk of chunks) yield chunk
    },
  }
}

describe('readJsonBody', () => {
  it('returns req.body directly when already parsed to an object', async () => {
    const body = await readJsonBody({ body: { hello: 'world' } })
    expect(body).toEqual({ hello: 'world' })
  })

  it('parses req.body when it is a JSON string', async () => {
    const body = await readJsonBody({ body: '{"hello":"world"}' })
    expect(body).toEqual({ hello: 'world' })
  })

  it('treats an empty string body as an empty object', async () => {
    const body = await readJsonBody({ body: '' })
    expect(body).toEqual({})
  })

  it('reads and parses JSON from a request stream when req.body is absent', async () => {
    const req = streamReq(['{"hello":', '"world"}'])
    const body = await readJsonBody(req)
    expect(body).toEqual({ hello: 'world' })
  })

  it('treats an empty stream as an empty object', async () => {
    const body = await readJsonBody(streamReq([]))
    expect(body).toEqual({})
  })

  it('rejects a stream body over the size limit', async () => {
    const oversized = 'a'.repeat(64 * 1024 + 1)
    await expect(readJsonBody(streamReq([oversized]))).rejects.toThrow('payload_too_large')
  })
})

describe('clientIp', () => {
  it('uses the first entry of x-forwarded-for', () => {
    const req = { headers: { 'x-forwarded-for': '1.2.3.4, 5.6.7.8' } }
    expect(clientIp(req)).toBe('1.2.3.4')
  })

  it('trims whitespace around the first entry', () => {
    const req = { headers: { 'x-forwarded-for': '  1.2.3.4  , 5.6.7.8' } }
    expect(clientIp(req)).toBe('1.2.3.4')
  })

  it('falls back to x-real-ip when x-forwarded-for is absent', () => {
    const req = { headers: { 'x-real-ip': '9.9.9.9' } }
    expect(clientIp(req)).toBe('9.9.9.9')
  })

  it('falls back to "unknown" when neither header is present', () => {
    expect(clientIp({ headers: {} })).toBe('unknown')
  })
})

describe('send', () => {
  it('writes status, headers, and a JSON-serialised body', () => {
    const res = {
      statusCode: 0,
      setHeader: vi.fn(),
      end: vi.fn(),
    }

    send(res, 201, { ok: true })

    expect(res.statusCode).toBe(201)
    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json; charset=utf-8')
    expect(res.setHeader).toHaveBeenCalledWith('Cache-Control', 'no-store')
    expect(res.end).toHaveBeenCalledWith(JSON.stringify({ ok: true }))
  })
})

describe('originAllowed', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('allows any origin when ALLOWED_ORIGINS is unset', () => {
    vi.stubEnv('ALLOWED_ORIGINS', '')
    const req = { headers: { origin: 'https://evil.example.com' } }
    expect(originAllowed(req)).toBe(true)
  })

  it('allows requests with no Origin header even when a list is configured', () => {
    vi.stubEnv('ALLOWED_ORIGINS', 'https://roshalink.com')
    expect(originAllowed({ headers: {} })).toBe(true)
  })

  it('allows an origin present in the list', () => {
    vi.stubEnv('ALLOWED_ORIGINS', 'https://roshalink.com, https://www.roshalink.com')
    const req = { headers: { origin: 'https://www.roshalink.com' } }
    expect(originAllowed(req)).toBe(true)
  })

  it('rejects an origin not present in the list', () => {
    vi.stubEnv('ALLOWED_ORIGINS', 'https://roshalink.com')
    const req = { headers: { origin: 'https://evil.example.com' } }
    expect(originAllowed(req)).toBe(false)
  })
})
