import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// Deliberately separate from vite.config.js rather than merged into it.
// vite.config.js mounts a dev-only plugin that wires up process.env and the
// real api/ handlers for `vite dev`; none of that belongs in a test run, and
// keeping this file standalone means test config can't accidentally pick up
// or interfere with that plugin (vitest prefers vitest.config.js over
// vite.config.js when both exist, so this takes over cleanly).
//
// Two projects, because the two halves of this codebase need different
// globals. The serverless handlers in api/ are pure Node and must not be
// handed a fake DOM — if they ever start depending on one, that is a bug we
// want the test run to surface rather than hide. The React components need
// jsdom and Testing Library's cleanup between tests.
export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'server',
          environment: 'node',
          include: ['api/**/*.test.js'],
        },
      },
      {
        plugins: [react()],
        test: {
          name: 'client',
          environment: 'jsdom',
          include: ['src/**/*.test.{js,jsx}'],
          setupFiles: ['./src/test/setup.js'],
        },
      },
    ],
  },
})
