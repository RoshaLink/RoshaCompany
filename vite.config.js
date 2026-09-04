import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

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
const API_ROUTES = ['/api/chat']

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
    plugins: [
      react(),
      devApiPlugin(env),
      // Compresses PNG/JPEG source assets (some multi-MB, see
      // src/assets/AboutPage and src/assets/OurPictures) at build time.
      // Output stays PNG/JPEG — no format conversion, no import changes
      // needed in components. `test` is narrowed to raster formats only;
      // SVGs are untouched (skips the svgo peer dep, out of scope here).
      // ── Image Optimiser ────────────────────────────────────────────────
      // 1. Compresses originals in-place (PNG→PNG, JPEG→JPEG) at quality 82.
      // 2. Also emits a sibling .webp for every raster asset so components
      //    can optionally serve WebP (browsers that understand ?as=url imports
      //    or <picture> elements will pick up the smaller WebP automatically).
      //
      // The `avif` entry is left out deliberately — AVIF encode is very slow
      // and VP9 WebM already covers the video bandwidth wins.
      //
      // includePublic: true → OG images in /public/ are also compressed.
      ViteImageOptimizer({
        test: /\.(jpe?g|png|webp)$/i,
        includePublic: true,
        // Keep originals compressed (fallback for older Safari / img tags)
        png: {
          quality: 82,         // 0-100 (libpng → oxipng)
          effort: 2,           // 0 fastest … 6 slowest; 2 is a good middle ground
          compressionLevel: 9,
        },
        jpeg: { quality: 82, progressive: true },
        jpg:  { quality: 82, progressive: true },
        webp: { quality: 82, lossless: false, effort: 4 },
        // Emit companion .webp files next to every PNG/JPEG
        // so we can use <picture><source type="image/webp" ...></picture>
        // without changing any existing <img> src imports.
        includePublic: true,
        logStats: true,
      }),
    ],
    // Inline PostCSS config so Tailwind's build-time compiler runs without a
    // separate postcss.config.js file (Vite skips file-search when this is
    // set — see css.postcss in Vite's docs).
    css: {
      postcss: {
        plugins: [tailwindcss(), autoprefixer()],
      },
    },
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/react-router-dom/')) {
              return 'vendor-react';
            }
            if (id.includes('node_modules/framer-motion/') || id.includes('node_modules/motion/')) {
              return 'vendor-motion';
            }
            if (id.includes('node_modules/i18next') || id.includes('node_modules/react-i18next')) {
              return 'vendor-i18n';
            }
            if (id.includes('node_modules/lucide-react') || id.includes('node_modules/react-icons')) {
              return 'vendor-icons';
            }
          },
        },
      },
    },
    server: {
      host: '127.0.0.1',
      port: 3000,
      proxy: {
        '/api/lead': {
          target: 'http://127.0.0.1:5000',
          changeOrigin: true,
          configure: (proxy) => {
            proxy.on('error', (err, req, res) => {
              console.warn(`[Vite Proxy] Backend connection error for ${req.url}: ${err.code || err.message}`);
            });
          },
        },
        '/api/leads': {
          target: 'http://127.0.0.1:5000',
          changeOrigin: true,
          configure: (proxy) => {
            proxy.on('error', (err, req, res) => {
              console.warn(`[Vite Proxy] Backend connection error for ${req.url}: ${err.code || err.message}`);
            });
          },
        },
        '/api/newsletter': {
          target: 'http://127.0.0.1:5000',
          changeOrigin: true,
          configure: (proxy) => {
            proxy.on('error', (err, req, res) => {
              console.warn(`[Vite Proxy] Backend connection error for ${req.url}: ${err.code || err.message}`);
            });
          },
        },
      },
    },
    preview: {
      host: '127.0.0.1',
      port: 3000,
      proxy: {
        '/api/lead': {
          target: 'http://127.0.0.1:5000',
          changeOrigin: true,
        },
        '/api/leads': {
          target: 'http://127.0.0.1:5000',
          changeOrigin: true,
        },
        '/api/newsletter': {
          target: 'http://127.0.0.1:5000',
          changeOrigin: true,
        },
      },
    },
  }
})
