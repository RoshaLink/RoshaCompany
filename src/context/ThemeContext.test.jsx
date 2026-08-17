import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider, useTheme } from './ThemeContext.jsx'

// A minimal consumer: renders the current theme and a button to flip it, so
// the tests assert against the context's public surface rather than any
// particular component's markup.
function ThemeProbe() {
  const { isDark, toggleTheme } = useTheme()
  return (
    <button onClick={toggleTheme}>{isDark ? 'dark' : 'light'}</button>
  )
}

function renderProbe() {
  return render(
    <ThemeProvider>
      <ThemeProbe />
    </ThemeProvider>
  )
}

describe('ThemeProvider', () => {
  it('defaults to light when nothing is stored', () => {
    renderProbe()
    expect(screen.getByRole('button')).toHaveTextContent('light')
    expect(document.documentElement).not.toHaveClass('dark')
    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
  })

  it('restores dark mode from localStorage', () => {
    localStorage.setItem('theme', 'dark')
    renderProbe()
    expect(screen.getByRole('button')).toHaveTextContent('dark')
    expect(document.documentElement).toHaveClass('dark')
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
  })

  it('restores light mode from localStorage', () => {
    localStorage.setItem('theme', 'light')
    renderProbe()
    expect(screen.getByRole('button')).toHaveTextContent('light')
  })

  it('toggles to dark: updates state, <html>, and localStorage', async () => {
    const user = userEvent.setup()
    renderProbe()

    await user.click(screen.getByRole('button'))

    expect(screen.getByRole('button')).toHaveTextContent('dark')
    expect(document.documentElement).toHaveClass('dark')
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('toggles back to light and removes the dark class', async () => {
    const user = userEvent.setup()
    localStorage.setItem('theme', 'dark')
    renderProbe()

    await user.click(screen.getByRole('button'))

    expect(screen.getByRole('button')).toHaveTextContent('light')
    expect(document.documentElement).not.toHaveClass('dark')
    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
    expect(localStorage.getItem('theme')).toBe('light')
  })
})

describe('useTheme', () => {
  it('throws a helpful error when used outside a ThemeProvider', () => {
    // React logs the error boundary trace to console.error; silence it so the
    // test output stays readable while still asserting the throw.
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<ThemeProbe />)).toThrow(/must be used within a ThemeProvider/)
    spy.mockRestore()
  })
})
