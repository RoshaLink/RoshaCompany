import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import './i18n.js'

// Mirrors the provider stack in main.jsx, minus StrictMode (which double-
// invokes render and makes failures harder to read) and with MemoryRouter so
// each test can start at an arbitrary route.
function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </MemoryRouter>
  )
}

beforeEach(() => {
  // The chat widget fires a request when opened; no test here opens it, but
  // stub fetch so an accidental call can never reach the network.
  vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, json: async () => ({}) })))
})

describe('routing', () => {
  it.each([
    ['/', 'home'],
    ['/home', 'home'],
    ['/about', 'about'],
    ['/services', 'services'],
    ['/portfolio', 'portfolio'],
    ['/contact', 'contact'],
  ])('renders %s without crashing', (path) => {
    expect(() => renderAt(path)).not.toThrow()
    // Every page renders inside the shared layout. There are two <nav>
    // landmarks by design (the top bar and the floating mobile bar).
    expect(screen.getAllByRole('navigation').length).toBeGreaterThan(0)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('falls back to the home page for an unknown route', () => {
    renderAt('/this-route-does-not-exist')
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('renders the contact form on /contact', () => {
    renderAt('/contact')
    const main = screen.getByRole('main')
    expect(
      within(main).getByRole('button', { name: /(submit strategic brief|skicka)/i })
    ).toBeInTheDocument()
    expect(within(main).getByPlaceholderText(/(john@company\.com|johan@foretag\.se)/i)).toBeInTheDocument()
  })

  it('does not render the contact form on other routes', () => {
    renderAt('/about')
    expect(
      screen.queryByRole('button', { name: /(submit strategic brief|skicka)/i })
    ).not.toBeInTheDocument()
  })
})
