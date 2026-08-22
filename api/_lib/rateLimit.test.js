import { describe, it, expect, afterEach, vi } from 'vitest'
import { rateLimit } from './rateLimit.js'

// `hits` is a module-level Map shared by every call to rateLimit(), so tests
// use a unique IP per test (via a counter) instead of resetting module state.
// That keeps tests independent without reaching into the module's internals.
let ipCounter = 0
function freshIp() {
  ipCounter += 1
  return `203.0.113.${ipCounter}`
}

describe('rateLimit', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('allows requests while under the limit', () => {
    const ip = freshIp()
    expect(rateLimit(ip, { limit: 3 }).ok).toBe(true)
    expect(rateLimit(ip, { limit: 3 }).ok).toBe(true)
    expect(rateLimit(ip, { limit: 3 }).ok).toBe(true)
  })

  it('blocks once the limit is reached, with a positive retryAfter', () => {
    const ip = freshIp()
    rateLimit(ip, { limit: 2 })
    rateLimit(ip, { limit: 2 })

    const third = rateLimit(ip, { limit: 2 })
    expect(third.ok).toBe(false)
    expect(third.retryAfter).toBeGreaterThan(0)
  })

  it('does not let one IP affect another', () => {
    const ipA = freshIp()
    const ipB = freshIp()

    rateLimit(ipA, { limit: 1 })
    const blockedA = rateLimit(ipA, { limit: 1 })
    const okB = rateLimit(ipB, { limit: 1 })

    expect(blockedA.ok).toBe(false)
    expect(okB.ok).toBe(true)
  })

  it('allows requests again once the window has passed', () => {
    vi.useFakeTimers()
    const ip = freshIp()

    rateLimit(ip, { limit: 1, windowMs: 1000 })
    expect(rateLimit(ip, { limit: 1, windowMs: 1000 }).ok).toBe(false)

    vi.advanceTimersByTime(1001)

    expect(rateLimit(ip, { limit: 1, windowMs: 1000 }).ok).toBe(true)
  })

  it('only counts requests inside the current window', () => {
    vi.useFakeTimers()
    const ip = freshIp()

    rateLimit(ip, { limit: 2, windowMs: 1000 })
    vi.advanceTimersByTime(1001) // first request is now outside the window
    rateLimit(ip, { limit: 2, windowMs: 1000 })

    // Only the second request is "recent" — a third should still be allowed.
    expect(rateLimit(ip, { limit: 2, windowMs: 1000 }).ok).toBe(true)
  })
})
