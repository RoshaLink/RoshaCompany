import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GetStartedModal from './GetStartedModal.jsx'
import '../../i18n.js'

function mockFetch(response = { ok: true }) {
  const fn = vi.fn(async () => ({ ok: response.ok, status: response.ok ? 200 : 500 }))
  vi.stubGlobal('fetch', fn)
  return fn
}

/** The parsed body of the most recent /api/lead call. */
function submittedBody(fetchMock) {
  return JSON.parse(fetchMock.mock.calls.at(-1)[1].body)
}

async function fillRequiredFields(user) {
  await user.type(screen.getByPlaceholderText('Jane Doe'), 'Jane Doe')
  await user.type(screen.getByPlaceholderText('jane@company.com'), 'jane@company.com')
}

beforeEach(() => {
  mockFetch()
})

describe('GetStartedModal', () => {
  it('renders nothing when closed', () => {
    const { container } = render(<GetStartedModal isOpen={false} onClose={() => {}} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('submits the lead to /api/lead with the expected body', async () => {
    const user = userEvent.setup()
    const fetchMock = mockFetch()
    render(<GetStartedModal isOpen onClose={() => {}} />)

    await fillRequiredFields(user)
    await user.click(screen.getByRole('button', { name: /request|start|submit|skicka|begär/i }))

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))

    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('/api/lead')
    expect(init.method).toBe('POST')

    const body = submittedBody(fetchMock)
    expect(body).toMatchObject({
      source: 'get-started',
      name: 'Jane Doe',
      email: 'jane@company.com',
    })
    // Defaults from the two <select>s must be sent, not left undefined.
    expect(body.budget).toBeTruthy()
    expect(body.service).toBeTruthy()
    expect(body.lang).toBeTruthy()
  })

  it('shows the success screen only after the server accepts', async () => {
    const user = userEvent.setup()
    mockFetch({ ok: true })
    render(<GetStartedModal isOpen onClose={() => {}} />)

    await fillRequiredFields(user)
    await user.click(screen.getByRole('button', { name: /request|start|submit|skicka|begär/i }))

    await waitFor(() =>
      expect(screen.getByRole('button', { name: /done|klar|klart/i })).toBeInTheDocument()
    )
  })

  it('shows an error and no success screen when the server rejects', async () => {
    const user = userEvent.setup()
    mockFetch({ ok: false })
    render(<GetStartedModal isOpen onClose={() => {}} />)

    await fillRequiredFields(user)
    await user.click(screen.getByRole('button', { name: /request|start|submit|skicka|begär/i }))

    await waitFor(() =>
      expect(screen.queryByRole('button', { name: /done|klar|klart/i })).not.toBeInTheDocument()
    )
    // The form is still on screen so the visitor can retry.
    expect(screen.getByPlaceholderText('jane@company.com')).toBeInTheDocument()
  })

  it('shows an error when the request throws', async () => {
    const user = userEvent.setup()
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new Error('offline')
      })
    )
    render(<GetStartedModal isOpen onClose={() => {}} />)

    await fillRequiredFields(user)
    await user.click(screen.getByRole('button', { name: /request|start|submit|skicka|begär/i }))

    await waitFor(() =>
      expect(screen.queryByRole('button', { name: /done|klar|klart/i })).not.toBeInTheDocument()
    )
    expect(screen.getByPlaceholderText('jane@company.com')).toBeInTheDocument()
  })

  it('does not submit when required fields are empty', async () => {
    const user = userEvent.setup()
    const fetchMock = mockFetch()
    render(<GetStartedModal isOpen onClose={() => {}} />)

    await user.click(screen.getByRole('button', { name: /request|start|submit|skicka|begär/i }))

    expect(fetchMock).not.toHaveBeenCalled()
  })

  // Guards against client/server validation drift: anything the form lets
  // through must also satisfy looksLikeEmail() in api/lead.js, otherwise the
  // visitor sees a generic failure after a form that appeared to accept them.
  it.each(['not-an-email', 'missing@domain', 'no-at-sign.com'])(
    'blocks submission for invalid email %j',
    async (email) => {
      const user = userEvent.setup()
      const fetchMock = mockFetch()
      render(<GetStartedModal isOpen onClose={() => {}} />)

      await user.type(screen.getByPlaceholderText('Jane Doe'), 'Jane Doe')
      await user.type(screen.getByPlaceholderText('jane@company.com'), email)
      await user.click(
        screen.getByRole('button', { name: /request|start|submit|skicka|begär/i })
      )

      expect(fetchMock).not.toHaveBeenCalled()
    }
  )

  it('calls onClose when the close button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<GetStartedModal isOpen onClose={onClose} />)

    await user.click(screen.getByRole('button', { name: /close modal/i }))
    expect(onClose).toHaveBeenCalled()
  })
})
