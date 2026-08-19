import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// Unmount anything rendered in the previous test. Without this, every test
// after the first one queries a document containing every earlier render,
// and `getByRole` starts failing with "found multiple elements".
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  localStorage.clear()
  // ThemeProvider writes to <html>; reset it so theme tests don't leak state.
  document.documentElement.className = ''
  document.documentElement.removeAttribute('data-theme')
})

// jsdom implements neither of these, and components call them on mount
// (ScrollToTop in App.jsx, and framer-motion's viewport triggers). Without
// stubs the render throws before any assertion runs.
window.scrollTo = () => {}

if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })
}

if (!globalThis.IntersectionObserver) {
  globalThis.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return []
    }
  }
}

if (!globalThis.ResizeObserver) {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}

// jsdom ships no media playback: HTMLMediaElement.play() is a stub returning
// undefined, so HeroSection's `videoRef.current.play().catch(...)` throws
// "Cannot read properties of undefined (reading 'catch')" and takes the whole
// render down. Real browsers return a Promise here.
window.HTMLMediaElement.prototype.play = () => Promise.resolve()
window.HTMLMediaElement.prototype.pause = () => {}
window.HTMLMediaElement.prototype.load = () => {}
