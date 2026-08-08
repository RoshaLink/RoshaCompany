import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// The serverless functions in `api/` are executed by Vercel in production.
// `vite dev` knows nothing about them, so without this plugin a POST to
// /api/chat during local development falls through to the SPA fallback and
// returns index.html — which surfaces as the baffling
// "Unexpected token '<', "<!doctype "... is not valid JSON".
//
// This mounts the real handler files (not a reimplementation) so local
// behaviour matches production, and `ssrLoadModule` gives them HMR: edit the
// system prompt and the next request picks it up without a restart.
//
// `apply: 'serve'` means this never runs during `vite build`, so it is
// structurally impossible for any of it — or the API key — to reach `dist/`.
const API_ROUTES = ['/api/chat', '/api/lead']

function devApiPlugin(env) {
  return {
    name: 'dev-api',
    apply: 'serve',
    configureServer(server) {
      // Make unprefixed vars visible to the handlers, which read process.env.
      // This only affects the dev server process; nothing is exposed to the
      // browser (that would require a VITE_ prefix or `define`).
      Object.assign(process.env, env)

      for (const route of API_ROUTES) {
        server.middlewares.use(route, async (req, res, next) => {
          try {
            const { default: handler } = await server.ssrLoadModule(`${route}.js`)
            await handler(req, res)
          } catch (err) {
            server.config.logger.error(`[dev-api] ${route} failed: ${err.stack || err}`)
            if (res.headersSent) {
              next(err)
              return
            }
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'server_error' }))
          }
        })
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // The empty prefix is required. Vite's default is 'VITE_', so without it
  // OPENAI_API_KEY is silently not loaded and every chat request 500s.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), devApiPlugin(env)],
  }
})
