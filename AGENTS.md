# AGENTS.md

Source of truth for AI coding agents working on this repository. Everything
below was read out of the codebase; where something could not be verified it is
listed under "Open questions" rather than guessed.

## Project overview

Marketing website for **RoshaLink**, a small Swedish digital agency (`index.html`
title: "RoshaLink — Strategic Design & Tech Agency"). It is a React single-page
app — home, about, services, portfolio, contact and privacy-policy pages —
translated into four locales (Swedish, English, Farsi, Arabic, with RTL support),
aimed at prospective business clients. Two serverless functions back it: an
OpenAI-powered chat assistant ("Rosha") that answers visitor questions from a
curated fact sheet, and a lead endpoint that emails enquiries via Resend. The
site's job is to convert visitors into leads; the chat widget and three lead
forms all feed the same endpoint.

## Tech stack

From `package.json` (versions are the declared ranges):

- React 19.2 + React DOM 19.2, `react-router-dom` 7.18 (BrowserRouter, client-side routing)
- Vite 8.1 with `@vitejs/plugin-react` 6.0; ESM only (`"type": "module"`)
- **Tailwind is loaded from the CDN in `index.html`**, not as a build dependency —
  theme tokens (colors, fonts, radii) are configured in the inline `tailwind.config`
  script there. There is no `tailwind.config.js` and no PostCSS step.
- `framer-motion` 12.43 for animation (used in ~10 components), `lucide-react` 1.27
  for icons (~35 files), `react-icons` in one file (`ui/circular-testimonials.jsx`)
- `i18next` 26 + `react-i18next` 17; all strings live in `src/i18n.js`
- `class-variance-authority`, `clsx`, `tailwind-merge`, `@radix-ui/react-slot` —
  shadcn-style primitives in `src/components/ui/`
- Vitest 4 + Testing Library + jsdom + `axe-core` for tests
- ESLint 10 flat config; TypeScript 7 used **only** to typecheck `api/` from JSDoc
- Node 22 in CI; Vercel for hosting and serverless functions

## Project structure

```
api/                    Vercel serverless functions (Node, ESM). One route per file.
  chat.js               POST /api/chat  — proxies OpenAI, never exposes the key
  lead.js               POST /api/lead  — sends the enquiry email via Resend
  _lib/                 Underscore prefix = not a route. Server-only shared code.
    http.js             readJsonBody / clientIp / send / originAllowed
    rateLimit.js        in-memory per-IP limiter (see its header comment)
    systemPrompt.js     how Rosha behaves
    companyFacts.js     what Rosha knows — edit this to change her answers
src/
  main.jsx              StrictMode > BrowserRouter > ThemeProvider > App
  App.jsx               route table, shared layout, global modal + chat widget
  i18n.js               all four locales inline in one resources object
  index.css / App.css   CSS variables, .glass-card etc., html.dark overrides
  components/<Name>/    one folder per component: Name.jsx + Name.css (+ tests)
  components/ui/        lower-case shadcn-style primitives (button.jsx, testimonial.jsx…)
  context/ThemeContext.jsx  dark mode, persisted to localStorage
  lib/utils.js          cn() = twMerge(clsx(...))
  pages/<Name>Page/     one folder per route
  test/setup.js         jsdom polyfills + cleanup (client project only)
scripts/check-bundle-size.js  gzipped JS/CSS budget gate
public/                 static assets served at /
```

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server on `http://127.0.0.1:3000`, serving the site **and** the `api/` handlers via the `devApiPlugin` in `vite.config.js` |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serves the built site; API routes are **not** available |
| `npm test` | Vitest, two projects: `server` (node, `api/**/*.test.js`) and `client` (jsdom, `src/**/*.test.{js,jsx}`) |
| `npm run typecheck` | `tsc -p tsconfig.api.json` — JSDoc type-check of `api/` only, `noEmit` |
| `npm run size` | Bundle budget check; needs `npm run build` first |
| `npm run lint` | ESLint over the repo |

CI (`.github/workflows/ci.yml`, on PRs to `main` and pushes to `main`) runs
build → test → typecheck → size as **blocking** gates, then lint and
`npm audit --audit-level=high` as `continue-on-error: true` (report-only, with
comments explaining the backlog that has to clear before they block).

## Environment variables

Copy `.env.example` → `.env.local` (gitignored). Also set every one of these in
the Vercel dashboard for Production, Preview **and** Development.

| Variable | Purpose |
| --- | --- |
| `OPENAI_API_KEY` | Auth for the chat completions call in `api/chat.js` |
| `OPENAI_MODEL` | Model id answering visitors; falls back to `DEFAULT_MODEL` in `api/chat.js` |
| `ALLOWED_ORIGINS` | Optional comma-separated origin allowlist; check is skipped when unset |
| `RESEND_API_KEY` | Auth for the Resend email send in `api/lead.js` |
| `LEAD_TO_EMAIL` | Destination inbox for lead notifications |
| `LEAD_FROM_EMAIL` | Sender address; must be a Resend-verified domain |

## API

Both routes are `POST`-only and return JSON with a coded `error` string
(`method_not_allowed`, `forbidden`, `rate_limited`, `bad_request`, `too_long`,
`upstream_error`, `timeout`, `server_error`). Every handler follows the same
order: method check → `originAllowed` → `rateLimit` → env check → `readJsonBody`
→ field validation → upstream call with `AbortController` timeout → `send()`.

- `POST /api/chat` — body `{ message, history[], lang }`. Caps: 1000 chars per
  message, 12 history entries, 400 output tokens, 25 s upstream timeout, 12
  requests/min/IP. `system` roles in client history are dropped.
- `POST /api/lead` — body `{ name, email, company?, service?, budget?, message?, lang?, source }`
  where `source` is `get-started` | `contact` | `chat`. 5 requests/min/IP.
  Requires `name` and an email-shaped `email`.

Client routes (`src/App.jsx`): `/`, `/home`, `/about`, `/services`, `/portfolio`,
`/contact`, `/privacy`, `/privacy-policy`, and `*` → home. `vercel.json` rewrites
everything except `/api/*` to `/index.html` so deep links work.

## Conventions

- Components: `export default function Name({ props })`, PascalCase folder and
  file, colocated `Name.css` imported at the top of the JSX file. Tests sit next
  to the file they test as `Name.test.jsx`.
- `src/components/ui/` is the exception: lower-case kebab file names, named
  exports, `cva` variants and `cn()` for class merging, `React.forwardRef` +
  `displayName` (see `ui/button.jsx`).
- Styling is hybrid: Tailwind utility classes inline in JSX for layout, the
  colocated CSS file (plus CSS variables in `index.css`) for bespoke visuals.
  Dark mode is a `.dark` class + `data-theme` attribute on `<html>`, set by
  `ThemeContext`; write dark styles as `html.dark <selector>`.
- User-visible text goes through `useTranslation()` / `t('some.key')`. Add the key
  to **all four** locales in `src/i18n.js` — `src/i18n.test.js` fails the build on
  key drift, and leaf values must be strings.
- RTL: `Navbar.jsx` sets `document.documentElement.dir`/`lang` on language change.
  Components handle it with an `is-rtl` / `is-ltr` class or Tailwind `rtl:` variants.
- Form submits: `isSubmitting` guard, `error` boolean, success state set **only**
  after `res.ok`, `finally` resets the submitting flag (`GetStartedModal.jsx`,
  `ContactPage.jsx`).
- Server errors: log the upstream detail with a `[route]` prefix, return a
  generic coded error to the browser. Check `err instanceof Error` before reading
  `err.name`.
- Non-obvious decisions are explained in a comment at the point of the decision;
  match that density when touching these files.

## Always / never

- **Never** prefix an API key or server secret with `VITE_` — Vite inlines
  `VITE_*` into the browser bundle. Server config is read via `process.env` inside
  `api/` only.
- **Never** import anything from `api/_lib/` into `src/` — that code is kept out of
  `src/` precisely so it can never ship to the browser.
- **Never** commit `.env` / `.env.local`; only `.env.example` is tracked.
- **Never** put a backtick or `${` inside the `COMPANY_FACTS` template literal in
  `api/_lib/companyFacts.js`, and never add a fact the company would not stand
  behind in writing (it also carries an explicit "never state" list).
- **Always** add new translation keys to `sv`, `en`, `fa` and `ar` together.
- **Always** raise the matching budget in `scripts/check-bundle-size.js` in the
  same PR when a change legitimately grows the bundle.
- **Always** run `npm run build` before `npm run size` — it reads `dist/assets`.
- Use `module`-style ESM everywhere (`import`/`export`); `module.exports` fails at
  runtime on Vercel, not at build time.
- Vercel binds env vars at deploy time: changing one in the dashboard needs a redeploy.

## Deployment

Vercel. `vercel.json` sets the SPA rewrite and a 30 s `maxDuration` for
`api/*.js`. Preview deployments are publicly reachable and run against whatever
key is configured — see the README's "Before going live" list (OpenAI budget cap,
model id check, deployment protection). The in-memory rate limiter does not
survive cold starts or span instances, so an account-level spend cap is the only
real backstop. `npm run preview` does not serve `api/`, so exercise API changes
through `npm run dev`.

## Open questions (not inferred — please confirm)

1. `README.md` says `npm run dev` runs on `http://localhost:5173`, but
   `vite.config.js` pins `host: 127.0.0.1, port: 3000`. Which is correct — should
   the README be updated?
2. `motion` (12.43) is a dependency but nothing in `src/` imports it; all
   animation uses `framer-motion`. Can it be dropped?
3. `react-icons` is used in exactly one file while everything else uses
   `lucide-react`. Is standardising on `lucide-react` wanted?
4. No deploy step exists in CI — is deployment handled by Vercel's Git
   integration, and which branch maps to production? The custom domain
   (roshalink.com appears in content) isn't configured anywhere in the repo.
5. Lint and `npm audit` are report-only in CI. Is clearing that backlog (the
   ~83 lint errors and the Vite major upgrade) planned work an agent should pick up?
