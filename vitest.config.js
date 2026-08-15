import { defineConfig } from 'vitest/config'

// Deliberately separate from vite.config.js rather than merged into it.
// vite.config.js mounts a dev-only plugin that wires up process.env and the
// real api/ handlers for `vite dev`; none of that belongs in a test run, and
// keeping this file standalone means test config can't accidentally pick up
// or interfere with that plugin (vitest prefers vitest.config.js over
// vite.config.js when both exist, so this takes over cleanly).
export default defineConfig({
  test: {
    environment: 'node',
    include: ['**/*.test.js'],
    exclude: ['**/node_modules/**', '**/dist/**'],
  },
})
