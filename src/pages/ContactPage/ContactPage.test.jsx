import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactPage from './ContactPage.jsx'
import i18n from '../../i18n.js'

function mockFetch({ ok = true } = {}) {
  const fn = vi.fn(async () => ({ ok, status: ok ? 200 : 500 }))
  vi.stubGlobal('fetch', fn)
  return fn
}

const SUBMIT = /submit brief/i

async function fillRequiredFields(user, { email = 'john@company.com' } = {}) {
  await user.type(screen.getByPlaceholderText('John Doe'), 'John Doe')
  await user.type(screen.getByPlaceholderText('john@company.com'), email)
  await user.type(screen.getByPlaceholderText(/describe your project goals/i), 'A new site.')
}

beforeEach(() => {
  i18n.changeLanguage('en')
  mockFetch()
})

describe('ContactPage form', () => {
  it('submits to /api/lead with source "contact"', async () => {
    const user = userEvent.setup()
    const fetchMock = mockFetch()
    render(<ContactPage />)

    await fillRequiredFields(user)
    await user.click(screen.getByRole('button', { name: SUBMIT }))

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))

    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('/api/lead')
    expect(init.method).toBe('POST')
    expect(init.headers['Content-Type']).toBe('application/json')

    expect(JSON.parse(init.body)).toMatchObject({
      source: 'contact',
      name: 'John Doe',
      email: 'john@company.com',
      message: 'A new site.',
    })
  })

  it('shows a confirmation only after the server accepts', async () => {
    const user = userEvent.setup()
    mockFetch({ ok: true })
    render(<ContactPage />)

    await fillRequiredFields(user)
    await user.click(screen.getByRole('button', { name: SUBMIT }))

    // The form is replaced by a confirmation once the lead is accepted.
    await waitFor(() =>
      expect(screen.queryByRole('button', { name: SUBMIT })).not.toBeInTheDocument()
    )
  })

  it('keeps the form visible when the server rejects the lead', async () => {
    const user = userEvent.setup()
    mockFetch({ ok: false })
    render(<ContactPage />)

    await fillRequiredFields(user)
    await user.click(screen.getByRole('button', { name: SUBMIT }))

    // Still on the form so the visitor can retry, rather than being shown a
    // false confirmation for a lead that was never delivered.
    await waitFor(() =>
      expect(screen.getByRole('button', { name: SUBMIT })).toBeInTheDocument()
    )
  })

  it('keeps the form visible when the request throws', async () => {
    const user = userEvent.setup()
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new Error('offline')
      })
    )
    render(<ContactPage />)

    await fillRequiredFields(user)
    await user.click(screen.getByRole('button', { name: SUBMIT }))

    await waitFor(() =>
      expect(screen.getByRole('button', { name: SUBMIT })).toBeInTheDocument()
    )
  })

  it('does not submit with empty required fields', async () => {
    const user = userEvent.setup()
    const fetchMock = mockFetch()
    render(<ContactPage />)

    await user.click(screen.getByRole('button', { name: SUBMIT }))

    expect(fetchMock).not.toHaveBeenCalled()
  })

  // Same client/server drift guard as the Get Started modal.
  it.each(['not-an-email', 'missing@domain', 'no-at-sign.com'])(
    'blocks submission for invalid email %j',
    async (email) => {
      const user = userEvent.setup()
      const fetchMock = mockFetch()
      render(<ContactPage />)

      await fillRequiredFields(user, { email })
      await user.click(screen.getByRole('button', { name: SUBMIT }))

      expect(fetchMock).not.toHaveBeenCalled()
    }
  )
})
