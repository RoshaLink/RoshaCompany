import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import axe from 'axe-core'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import './i18n.js'

// A smoke-level accessibility gate, not a full audit. It runs the subset of
// axe rules that are reliable in jsdom and unambiguous when they fire:
// missing alt text, unlabelled controls, and broken landmark/heading
// structure. Colour-contrast is deliberately excluded — jsdom does not
// compute layout or resolve CSS backgrounds, so axe cannot evaluate it here
// and reports "incomplete" rather than a real result. Contrast needs a real
// browser (Playwright/Lighthouse) to check properly.
const RULES = [
  'image-alt',
  'input-image-alt',
  'area-alt',
  'button-name',
  'link-name',
  'label',
  'form-field-multiple-labels',
  'aria-allowed-attr',
  'aria-required-attr',
  'aria-required-children',
  'aria-required-parent',
  'aria-valid-attr-value',
  'aria-valid-attr',
  'aria-roles',
  'duplicate-id-aria',
  'html-has-lang',
  'list',
  'listitem',
  'definition-list',
  'dlitem',
]

async function analyse(container) {
  const results = await axe.run(container, {
    runOnly: { type: 'rule', values: RULES },
    // Rules that need a real layout engine produce noise in jsdom.
    resultTypes: ['violations'],
    // The portfolio pages embed <iframe>s. axe tries to postMessage into each
    // frame to audit it, which jsdom cannot service ("Respondable target must
    // be a frame in the current window"). Auditing embedded third-party video
    // players is not this test's job anyway.
    iframes: false,
  })
  return results.violations
}

/** Render a readable summary so a failure says what to fix and where. */
function describeViolations(violations) {
  return violations
    .map((v) => {
      const targets = v.nodes.map((n) => n.target.join(' ')).slice(0, 5).join('\n      ')
      return `  [${v.id}] ${v.help}\n    ${v.helpUrl}\n    nodes:\n      ${targets}`
    })
    .join('\n')
}

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
  vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, json: async () => ({}) })))
  // axe checks <html lang>; jsdom's default document has none, and in the real
  // app it is set in index.html rather than by React.
  document.documentElement.lang = 'en'
})

describe('accessibility', () => {
  it.each(['/', '/about', '/services', '/portfolio', '/contact'])(
    'page %s has no critical accessibility violations',
    async (path) => {
      const { container } = renderAt(path)
      const violations = await analyse(container)

      expect(
        violations,
        violations.length ? `\n${describeViolations(violations)}\n` : ''
      ).toEqual([])
    },
    20_000
  )
})
