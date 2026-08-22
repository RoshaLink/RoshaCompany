import { describe, it, expect } from 'vitest'
import i18n from './i18n.js'

// The four locales in src/i18n.js are hand-maintained side by side, with no
// tooling keeping them aligned. The realistic failure is adding a string to
// one locale and forgetting the other three: the UI then silently falls back
// to Swedish for those visitors, which nobody notices until a native speaker
// complains. These tests make that a build failure instead.
const LOCALES = ['sv', 'en', 'fa', 'ar']
const REFERENCE = 'sv'

/** Flatten a nested translation object to dotted key paths. */
function flatten(obj, prefix = '') {
  return Object.entries(obj).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key
    return value && typeof value === 'object' && !Array.isArray(value)
      ? flatten(value, path)
      : [path]
  })
}

function keysFor(locale) {
  const bundle = i18n.getResourceBundle(locale, 'translation')
  expect(bundle, `locale "${locale}" has no translation bundle`).toBeTruthy()
  return flatten(bundle)
}

describe('i18n resources', () => {
  it('defines every expected locale', () => {
    for (const locale of LOCALES) {
      expect(i18n.getResourceBundle(locale, 'translation')).toBeTruthy()
    }
  })

  it.each(LOCALES.filter((l) => l !== REFERENCE))(
    'locale "%s" has exactly the same keys as the reference locale',
    (locale) => {
      const reference = new Set(keysFor(REFERENCE))
      const actual = new Set(keysFor(locale))

      const missing = [...reference].filter((k) => !actual.has(k)).sort()
      const extra = [...actual].filter((k) => !reference.has(k)).sort()

      expect(
        missing,
        `"${locale}" is missing ${missing.length} key(s) present in "${REFERENCE}"`
      ).toEqual([])
      expect(
        extra,
        `"${locale}" has ${extra.length} key(s) not present in "${REFERENCE}"`
      ).toEqual([])
    }
  )

  // Note: empty strings are allowed on purpose. Several titles are split into
  // titlePrefix / titleGradient / titleSuffix, and a language whose phrasing
  // ends at the gradient span legitimately has an empty suffix. What is never
  // legitimate is a non-string leaking in, which renders as "[object Object]"
  // or "undefined" in the UI rather than failing loudly.
  it.each(LOCALES)('locale "%s" has string values at every leaf', (locale) => {
    const bundle = i18n.getResourceBundle(locale, 'translation')
    const nonStrings = []

    const walk = (obj, prefix = '') => {
      for (const [key, value] of Object.entries(obj)) {
        const path = prefix ? `${prefix}.${key}` : key
        if (value && typeof value === 'object') walk(value, path)
        else if (typeof value !== 'string') nonStrings.push(`${path} (${typeof value})`)
      }
    }
    walk(bundle)

    expect(
      nonStrings,
      `"${locale}" has non-string values at: ${nonStrings.join(', ')}`
    ).toEqual([])
  })
})
