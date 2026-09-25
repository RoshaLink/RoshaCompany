# AGENTS.md

Source of truth for AI coding agents working on this repository. Everything
below was read out of the codebase; where something could not be verified it is
listed under "Open questions" rather than guessed.

## Project overview

Marketing website for **RoshaLink**, a small Swedish digital agency (`index.html`
title: "RoshaLink — Strategic Design & Tech Agency"). It is a React single-page
app — home, about, services, portfolio, contact and privacy-policy pages —
translated into four locales (Swedish, English, Farsi, Arabic, with RTL support),
aimed at prospective business clients. Three serverless functions back it: an
OpenAI-powered chat assistant ("Rosha") that answers visitor questions from a
curated fact sheet, a lead endpoint that emails enquiries via Resend, and a
newsletter endpoint. The site's job is to convert visitors into leads; the
chat widget and three lead forms all feed the same endpoint. All outbound
email (the internal lead alert, the visitor's confirmation, the newsletter
welcome email) is built from react-email templates in `api/_lib/emails/` and
sent through Resend — see the API section below. `api/lead.js` and
`api/newsletter.js` *also* forward every submission to an external MongoDB
backend (`BACKEND_API_URL`, defaulting to `https://roshacompany-backend.onrender.com`)
that is not part of this repo — see "Backend forwarding" in the API section;
this means a submission can return `200 ok` from persisting to that backend
alone even when the Resend email send fails, which is easy to mistake for the
email pipeline working.

## Tech stack

From `package.json` (versions are the declared ranges):

- React 19.2 + React DOM 19.2, `react-router-dom` 7.18 (BrowserRouter, client-side routing)
- Vite 8.1 with `@vitejs/plugin-react` 6.0; ESM only (`"type": "module"`)
- **Tailwind 3.4 compiles at build time via PostCSS** (`tailwind.config.js`,
  `@tailwind base/components/utilities` in `src/index.css`, `postcss` plugins
  wired inline in `vite.config.js`'s `css.postcss` — no standalone
  `postcss.config.js` file). Previously loaded from Tailwind's Play CDN
  (`cdn.tailwindcss.com`) in `index.html`; that render-blocking JIT-in-browser
  setup has been removed (was tracked as issue #17 — now resolved). A Tailwind
  class on an element (e.g. `RoshaChatWidget`'s root) is still invisible to
  plain CSS selectors from outside that file unless the element also carries a
  real, non-Tailwind class name to hook onto — utility classes are still
  purged/hashed at build time, same reasoning as before, just no longer via CDN.
- `framer-motion` 12.43 for animation (used in ~10 components), `lucide-react` 1.27
  for icons (~35 files), `react-icons` in one file (`ui/circular-testimonials.jsx`)
- `i18next` 26 + `react-i18next` 17; all strings live in `src/i18n.js`
- `class-variance-authority`, `clsx`, `tailwind-merge`, `@radix-ui/react-slot` —
  shadcn-style primitives in `src/components/ui/`
- `@react-email/components` + `@react-email/render` build and render the
  transactional emails in `api/_lib/emails/`; `react-email` (the CLI) and
  `@react-email/ui` are devDependencies for `npx react-email dev` local
  previews only — neither ships to `api/` at runtime or to the browser bundle.
- Vitest 4 + Testing Library + jsdom + `axe-core` for tests
- ESLint 10 flat config; TypeScript 7 used **only** to typecheck `api/` from JSDoc
- Node 22 in CI; Vercel for hosting and serverless functions

## SEO & Multilingual Routing Architecture

- **Primary Domain:** `https://roshalink.com`
- **Supported Locales:** `sv` (Swedish - Primary Scandinavian market & `x-default`), `en` (English), `fa` (Farsi), `ar` (Arabic).
- **URL Routing Strategy:** Standard language prefix (`/:lang`, `/:lang/about`, `/:lang/services`, `/:lang/portfolio`, `/:lang/contact`, `/:lang/privacy`).
- **Dynamic Meta Management:** `SEOHead.jsx` injects localized `<title>`, `<meta name="description">`, `<meta name="keywords">`, `<link rel="canonical">`, `<link rel="alternate" hreflang="...">` matrix, Open Graph, and Twitter Cards.
- **Structured Data:** `JsonLdSchema.jsx` injects `Organization`, `ProfessionalService`, `Service`, `FAQPage`, and `BreadcrumbList` schemas.
- **Crawling Directives:** `public/sitemap.xml` (all 24 multilingual URLs indexed with `xhtml:link`), `public/robots.txt`, and `public/manifest.json`.

## Project structure

```
public/
  sitemap.xml           Multilingual XML Sitemap with alternate hreflang tags
  robots.txt            Search engine crawler directives
  manifest.json         PWA & mobile SEO manifest
  RoshaLink_logo.png    Email-safe PNG logo (Outlook's WebP support is unreliable);
  RoshaLink_logo_sm.png generated from the .webp originals, referenced by full
                        production URL (https://roshalink.com/...) from the
                        email templates below — email clients can't resolve
                        relative paths.
api/                    Vercel serverless functions (Node, ESM). One route per file.
  chat.js               POST /api/chat        — proxies OpenAI, never exposes the key
  lead.js               POST /api/lead        — sends the enquiry emails via Resend
  newsletter.js         POST /api/newsletter  — double opt-in step 1: emails a "confirm your subscription" link
  confirm-subscription.js GET/POST /api/confirm-subscription — step 2: subscribes, sends welcome email; returns HTML
  unsubscribe.js        GET/POST /api/unsubscribe — signed one-click unsubscribe; returns HTML, not JSON
  _lib/                 Underscore prefix = not a route. Server-only shared code.
    emailLinks.js       HMAC-signed confirm + unsubscribe URLs (EMAIL_LINK_SECRET)
    newsletterEmails.js sends the confirmation and welcome emails
    htmlPage.js         the small branded HTML pages the two link routes render
    resendContacts.js   newsletter list as Resend contacts (needs a Full access key)
    emails/             react-email templates + shared brand tokens (see API section)
src/
  config/
    seoConfig.js        Multilingual SEO metadata matrix (SV, EN, FA, AR)
  components/
    SEO/
      SEOHead.jsx       Dynamic Head & Meta tag injector with Hreflang matrix
      JsonLdSchema.jsx  Structured JSON-LD schema (Organization, Service, FAQ)
  main.jsx              StrictMode > BrowserRouter > ThemeProvider > App
  App.jsx               Multilingual route table (/:lang), shared layout, global modal + chat widget
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
| `npx react-email dev --dir api/_lib/emails` | Local browser preview of the three email templates, with hot reload. Not in `package.json` scripts since it's a one-off design tool, not part of any workflow other components depend on. |

CI (`.github/workflows/ci.yml`, on PRs to `main` and pushes to `main`) runs
build → test → typecheck → size as **blocking** gates, then lint,
`npm audit --audit-level=high` and the AGENTS.md freshness check as
`continue-on-error: true` (report-only, each with a comment explaining what has
to clear before it blocks).

The freshness check (`scripts/check-agents-doc.js`, PR-only) fails when a PR
edits a file this document describes — `package.json`, `.env.example`,
`vercel.json`, the configs, `ci.yml`, `src/App.jsx`, a handler under `api/` —
without editing `AGENTS.md`. It verifies the doc was revisited, not that it is
right. Update this file in the same PR; if it is genuinely still accurate, put
`[agents-doc-ok]` in the PR title to say so deliberately.

## Environment variables

Copy `.env.example` → `.env.local` (gitignored). Also set every one of these in
the Vercel dashboard for Production, Preview **and** Development.

| Variable | Purpose |
| --- | --- |
| `OPENAI_API_KEY` | Auth for the chat completions call in `api/chat.js` |
| `OPENAI_MODEL` | Model id answering visitors; falls back to `DEFAULT_MODEL` in `api/chat.js` |
| `ALLOWED_ORIGINS` | Optional comma-separated origin allowlist; check is skipped when unset |
| `RESEND_API_KEY` | Auth for every Resend call — `api/lead.js` (notification + confirmation), `api/newsletter.js` (contact + welcome email), `api/unsubscribe.js` (contact update). **Must be a Full access key**: a "Sending access" key sends email fine but every contacts call fails with 401 `restricted_api_key`, which silently breaks the subscriber list and makes every unsubscribe attempt show an error page. Unset means no email of any kind goes out; the affected handler still succeeds (lead saves to the backend / subscription still returns 200), it just skips the send. |
| `EMAIL_LINK_SECRET` | HMAC key for the signed confirm and unsubscribe links in `api/_lib/emailLinks.js`. Use a different random value per environment. Unset → **no newsletter email is sent at all** (logged as `EMAIL_LINK_SECRET is not set`): no confirmation link can be built, and a welcome email without a working unsubscribe hurts deliverability and breaks GDPR/CAN-SPAM. Changing it invalidates every link already in inboxes. |
| `RESEND_NEWSLETTER_SEGMENT_ID` | Optional. Resend segment new subscribers are added to — the segment a Broadcast targets. Unset → contacts are created with no segment. |
| `LEAD_TO_EMAIL` | Destination inbox for lead notifications; also used as the `reply_to` on the visitor's confirmation email |
| `LEAD_FROM_EMAIL` | Sender address for **all** outbound email (lead notification, contact confirmation, newsletter welcome), not lead-specific despite the name; must be on a domain verified in Resend — **the exact hostname**, not just a domain whose parent is verified. `roshalink.com` being verified does **not** cover `leads@send.roshalink.com`: Resend treats a subdomain as a separate domain needing its own DNS records and verification. Sending from an address on an unverified (sub)domain fails with a 403 `validation_error`, logged as `[lead] resend_error` / `[newsletter] resend_error` — confirm which exact hostname shows "Verified" on the Resend dashboard's Domains page before assuming this var is correct. |
| `BACKEND_API_URL` | Optional override for the external lead/newsletter persistence backend (see "Backend forwarding" below); defaults to `https://roshacompany-backend.onrender.com` outside test environments. Not in `.env.example` — undocumented until this entry. |

## API

`chat`, `lead` and `newsletter` are `POST`-only and return JSON with a coded `error` string
(`method_not_allowed`, `forbidden`, `rate_limited`, `bad_request`, `too_long`,
`upstream_error`, `timeout`, `server_error`). Every handler follows the same
order: method check → `originAllowed` → `rateLimit` → env check → `readJsonBody`
→ field validation → upstream call with `AbortController` timeout → `send()`.

- `POST /api/chat` — body `{ message, history[], lang }`. Caps: 1000 chars per
  message, 12 history entries, 400 output tokens, 25 s upstream timeout, 12
  requests/min/IP. `system` roles in client history are dropped.
- `POST /api/lead` — body `{ name, email, company?, service?, budget?, message?, lang?, source }`
  where `source` is `get-started` | `contact` | `chat`. 5 requests/min/IP.
  Requires `name` and an email-or-phone-shaped `email` (validated by
  `looksLikeEmailOrPhone`, not a strict email check — `source: 'chat'` may
  only have a phone number). On success it sends up to two emails via Resend:
  always a `LeadNotificationEmail` to `LEAD_TO_EMAIL` (the branded replacement
  for what used to be a bare, unstyled `<table>`), and — only when `source`
  is `get-started` or `contact` **and** `email` is actually email-shaped, not
  a phone number — a best-effort `ContactConfirmationEmail` back to the
  submitter. The confirmation send is fire-and-forget: its failure is logged
  (`[lead] confirmation_email_error`) and swallowed, never turned into an
  error response, since the notification email (the part the team actually
  depends on) already succeeded by that point. `source: 'chat'` never gets a
  confirmation — a chat-captured contact may only be a phone number, and
  "here's a copy of your chat" doesn't fit the "thanks for your form
  submission" framing. **The notification send is not fire-and-forget** in
  the same way: a Resend failure there only gets swallowed into a `200`
  response if the backend forward (below) already succeeded; if both fail,
  the handler returns `502`/`504`/`500`.
- **Newsletter = double opt-in.** Nobody is added to the list until they click
  a link sent to the address they typed. This keeps typos, bots and other
  people's addresses off the list, which is the single biggest deliverability
  and GDPR win for a sign-up form.
  - `POST /api/newsletter` — body `{ email, lang? }`. 5 requests/min/IP (the
    only brake on using the form to flood someone with confirmation emails).
    Looks the address up in Resend contacts: already subscribed → sends
    nothing; otherwise sends a localized `ConfirmSubscriptionEmail` with a
    signed, **7-day** `confirmUrl` (`api/_lib/emailLinks.js`). It writes
    nothing to Resend and no longer forwards to the MongoDB backend. The
    response is `200 { success, message: 'Confirmation email sent' }` in
    every case, so the endpoint can't be used to check who is subscribed. A
    failed lookup (`[newsletter] contact_lookup_error`) still sends the
    confirmation.
  - `GET|POST /api/confirm-subscription?e=&ts=&t=&lang=` — HTML, like
    unsubscribe. `ts` is the issue time and is covered by the signature, so an
    expired link can't be extended by editing it; an expired link → 410 page,
    a bad one → 400. **GET only shows a "Confirm" button** — Microsoft Safe
    Links and similar scanners open every link, and a subscribing GET would
    record consent nobody gave. POST upserts the Resend contact (new → created
    in `RESEND_NEWSLETTER_SEGMENT_ID`; previously unsubscribed →
    re-subscribed), then — unless it was already subscribed — sends the
    `WelcomeEmail` and forwards `{ email, lang }` to the backend, so the
    backend only ever sees confirmed subscribers. A contacts failure here is
    shown to the visitor (502 page), since subscribing is the whole point of
    the request; a welcome-email failure is only logged.
  - The welcome email carries RFC 8058 one-click `List-Unsubscribe` /
    `List-Unsubscribe-Post` headers, the same signed link in its footer, and
    `reply_to: LEAD_TO_EMAIL`. The confirmation email has no unsubscribe link
    on purpose: the recipient isn't subscribed to anything yet, and its copy
    says ignoring it is enough.
  - Confirm and unsubscribe tokens are HMACs over `purpose + email (+ ts)`,
    so one kind can never be replayed as the other.
  - There is no user-account system in this codebase, so a confirmed
    newsletter subscription is the closest real substitute for "on signup".
- `GET|POST /api/unsubscribe?e=&t=&lang=` — the one route that returns
  **HTML**, since it is opened from an email in a browser. `t` is an
  HMAC-SHA256 of the lower-cased email (`api/_lib/emailLinks.js`); a
  mismatch → 400 page. **GET only shows a confirmation page with a button —
  it never unsubscribes**, because corporate mail scanners and link
  previewers fetch every URL in an email and would otherwise unsubscribe
  people who never clicked. POST (the button, or Gmail/Yahoo's one-click
  POST with body `List-Unsubscribe=One-Click`) PATCHes the Resend contact to
  `unsubscribed: true`; a 404 contact counts as done. No `originAllowed`
  check and no body parsing: one-click POSTs come from the mail provider's
  servers, and the signed query string is the whole authorization. Pages are
  localized via `emailCopy(lang).unsubscribe` in `api/_lib/emails/i18n.js`,
  sent with `Referrer-Policy: no-referrer` (the URL carries the token), a
  locked-down CSP and `X-Robots-Tag: noindex`. 30 requests/min/IP — kept
  generous because Gmail's one-click POSTs can share a Google IP.
- **Sender identity**: `sendViaResend()` wraps a bare `LEAD_FROM_EMAIL` as
  `RoshaLink <address>` for every email (a brand display name instead of a
  raw address); a value already containing `<` is used as-is.

### Backend forwarding (`api/lead.js`, `api/newsletter.js`)

Both handlers forward the submission to an external, non-Vercel MongoDB
backend (`BACKEND_API_URL`, defaulting to `https://roshacompany-backend.onrender.com`
when unset and not in a test environment) *in addition to* the Resend send —
this is not mentioned anywhere else in this document and is easy to miss when
reasoning about "does this endpoint work." Concretely, in `api/lead.js`:
`savedToBackend` (from that forward) and `resendSent` (from the notification
email) are each tracked independently, and the handler returns `200 { ok:
true }` if **either** succeeds — so a request can report success to the
visitor while every outbound email silently failed, as long as the backend
save went through. `api/newsletter.js` doesn't even gate its `200` response
on the backend forward's outcome — a `fetch` failure there is only logged
(`[newsletter] failed to persist to backend`), never checked. When debugging
"the form says it worked but no email arrived," check the server logs for
`resend_error`/`confirmation_email_error`/`welcome_email_error`, not just the
HTTP status the browser got back.

`vite.config.js`'s dev server used to proxy `/api/lead` and `/api/newsletter`
to `http://127.0.0.1:5000` — a leftover from before this backend-forwarding
logic existed, pointing at a local backend service that isn't part of this
repo and was never running, so every local form submission failed outright
with `ECONNREFUSED` (silently, since the vite proxy only logs a `console.warn`).
Fixed by routing both through the same `devApiPlugin` that already served
`/api/chat` (`API_ROUTES` in `vite.config.js` now lists all three), which
also removed a dead `/api/leads` (plural) proxy entry that no frontend code
ever called. **If `npm run dev` throws `ECONNREFUSED` on a fetch to
`127.0.0.1:5000` again, it means a new route was added under `api/` without
also adding it to `API_ROUTES`** — the fallback behavior for an unlisted
route is Vite's SPA history fallback (returns `index.html`), not a proxy, so
that specific error would mean the stale proxy config crept back in, not a
new bug.

### Email templates (`api/_lib/emails/`)

Three react-email components — `WelcomeEmail.js`, `LeadNotificationEmail.js`,
`ContactConfirmationEmail.js` — built from three approved design mockups and
kept in sync with the live site's own design tokens (`src/index.css`'s
`--color-*`/`--font-*`/`--radius-*` custom properties), not reimplemented from
memory. `brand.js` is the single source of truth for colors/fonts/logo URLs/
footer copy so the three templates can't drift from each other or from the
site; `EmailLayout.js`, `EmailFooter.js` and `FieldRow.js` are the shared
structural pieces all three compose.

- **`React.createElement`, never JSX syntax, in anything under `api/`.**
  These files were originally written as `.jsx` with normal JSX markup; it
  worked in every local check (`npm test`, `npm run build`, `npm run
  typecheck`) because Vite/Vitest transform JSX automatically — and then
  500'd every request in production, because Vercel deploys `api/` as raw ESM
  source with **no bundling or JSX transform at all**. Node's native ESM
  loader has no `.jsx` handling and throws `ERR_UNKNOWN_FILE_EXTENSION` the
  instant the file is imported, before any of the handler's own try/catch
  runs. The fix was rewriting every file in `api/_lib/emails/` with
  `React.createElement(...)` (aliased to `h` for brevity) and renaming them
  to plain `.js` — verified by importing the actual files with a raw
  `node -e "import(...)"`, the same way Vercel's runtime does, not just
  through Vitest. **Never reintroduce a `.jsx` file anywhere under `api/`,
  and never trust a local test/build pass alone as proof a serverless
  function change works — it doesn't exercise Vercel's actual unbundled
  runtime.** Each of these files also carries a `// @ts-nocheck`, needed
  because `@types/react`'s `createElement` overloads don't resolve variadic
  children cleanly under `strict` without
  JSX — see that file's own comment for why this is a type-checker quirk,
  not a runtime bug.
- **Table layout, not flexbox.** `FieldRow.js` (a label/value line — "Name:
  Jane Doe") renders a `<table>`/`<tr>`/`<td>` via `@react-email/components`'
  `Row`/`Column`, not a flex `<div>`. Outlook desktop's Word rendering engine
  ignores `display: flex` entirely; a `<table>` is the only layout primitive
  every major email client supports.
- **Hand-written plain-text bodies for table-based templates.** react-email's
  `render(el, {plainText: true})` (html-to-text under the hood) inserts no
  separator between adjacent table cells, so a template built from `FieldRow`s
  would come out as `NameJane Doe` in the plain-text fallback. `LeadNotificationEmail`'s
  and `ContactConfirmationEmail`'s text bodies are built by hand in `api/lead.js`
  (`notificationText()`, `confirmationText()`) instead. `WelcomeEmail` has no
  such rows (just flowing paragraphs), so its text body is safely auto-derived
  via the same `render(..., {plainText:true})` call (see `renderEmail()` in
  `render.js`).
- **PNG logo, hosted, not the site's `.webp`.** Email `<img>` tags need an
  absolute, publicly reachable URL (`brand.js`'s `SITE_URL` + `/RoshaLink_logo(_sm)?.png`)
  — a relative path or the site's `.webp` (`public/RoshaLink_logo.webp`) either
  won't resolve or won't render reliably in Outlook desktop.
- **`PreviewProps`** on each default export supplies the sample data
  `npx react-email dev` renders with; without it the preview shows literal
  `undefined`s, since none of the real props have hardcoded defaults (they're
  always supplied by the caller in `api/lead.js`/`api/newsletter.js`).
- **Localized per the visitor's site language, via `i18n.js`.**
  `WelcomeEmail` and `ContactConfirmationEmail` take a `lang` prop and render
  in `sv`/`en`/`fa`/`ar` (the site's own four locales) — subject line, body
  copy, and the `<Html dir>`/RTL layout all follow it. `lang` is whatever the
  visitor's site language already was when they submitted the form/newsletter
  (the same value the site was already sending to `api/lead.js`/
  `api/newsletter.js` and storing, just not using yet before this).
  `resolveLocale()` normalizes it (`'en-US'` → `en`, case-insensitive) and
  falls back to `sv`, matching the site's own `i18n.language || 'sv'`
  convention. `LeadNotificationEmail` (the internal, team-facing alert) is
  **not** localized on purpose — always English, regardless of `lang` —
  since it's read by the RoshaLink team, not the visitor.
  - RTL (`fa`/`ar`) mirrors the layout rather than just swapping text: a
    `dir="rtl"` `<table>` (`FieldRow.js`, the `WelcomeEmail` feature rows)
    visually reverses column order on its own — label/number ends up on the
    right, matching that direction's reading start — so the only extra work
    is flipping that row's own remaining text-align. `welcome.headline` in
    `i18n.js` is a function returning `{ before, highlight, after }` rather
    than a fixed template, because a natural Farsi/Arabic greeting puts the
    visitor's name *before* the highlighted word ("Sam عزیز، خوش آمدید")
    where English/Swedish put it after ("Welcome aboard, Sam!") — forcing
    one word order across languages reads as broken grammar, not just
    unlocalized.
  - **Known screenshot-tooling gotcha, not a rendering bug:** capturing an
    RTL (`dir="rtl"`) page with Puppeteer's `page.screenshot({ fullPage:
    true })` produces a horizontal-scroll-origin artifact — the whole card
    renders shoved against the right edge with blank space on the left —
    because Chromium anchors `scrollLeft: 0` at the right edge for RTL
    documents and full-page capture doesn't compensate. Confirmed by an
    isolated plain-viewport screenshot rendering correctly. When verifying
    an RTL template visually, size the viewport to the actual content
    height first and take a normal (non-`fullPage`) screenshot instead.
  - The translations in `i18n.js` are original authored copy (not pulled
    from `src/i18n.js`, whose `contactPage`/`footer` keys are UI copy for
    the SPA, not transactional-email copy) and were not reviewed by a native
    Farsi/Arabic speaker — worth a native-speaker pass before this is fully
    trusted for real customer-facing sends, same caution as `COMPANY_FACTS`.

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
  key drift, and leaf values must be strings. Easy to miss for text that doesn't
  look like copy — a feature list, a secondary footer link, a reviewer's job
  title. This branch found and fixed three components with a hardcoded-English
  (or hardcoded-Swedish) string sitting inside an otherwise fully translated
  block; when a string bundles a translatable phrase with a proper noun that has
  no natural form in every locale (a job title + company name, etc.), split them
  into separate keys rather than concatenating one translated and one hardcoded
  piece — see `testimonials.roles.rN` / `testimonials.orgs.oN` in
  `TestimonialsColumn.jsx`.
- Interactive controls keep a 44×44px minimum hit area regardless of their
  visual size — grow the invisible box via `min-height`/`min-width` (or a
  `flex` + `min-h-11` wrapper for Tailwind-only components) rather than
  enlarging the element itself. Icon-only controls need both `aria-label`
  (accessible name) and `title` (visible tooltip) — neither alone covers both
  screen-reader and mouse/touch users. Dense, adjacent controls where a 44px
  hit area would overlap a neighbor (pagination dots, etc.) are an accepted,
  documented exception — see the comment on `.hero-dot` in `minimalist-hero.css`.
- Visually-hidden but AT-visible text (a `<label>` for an icon-only field, etc.)
  uses the `.sr-only` utility in `index.css`, not `display: none` or a
  zero-size element.
- A fractional/partial rating (anything that isn't a flat 5-star) renders
  through `src/components/StarRating/`, which clips a filled star over an
  outline one — don't hand-roll `Array(5).fill(<Star/>)`.
- `RoshaChatWidget` is `position: fixed` at the bottom-right of every page and
  can visually cover other fixed/bottom-of-viewport controls (confirmed: it
  covered the footer newsletter button at some scroll positions). Its root div
  carries a real `rosha-chat-widget-root` class specifically so other
  components can target it, since the rest of its className is CDN-JIT'd
  Tailwind (see the Tailwind CDN note above) and not selectable from outside
  that file. `Footer.jsx`'s `IntersectionObserver` + `html.footer-form-visible`
  fade is the reference pattern for resolving a collision with it.
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
- **Always** give interactive controls a 44×44px minimum hit area — see
  Conventions.
- **Always** raise the matching budget in `scripts/check-bundle-size.js` in the
  same PR when a change legitimately grows the bundle.
- **Always** run `npm run build` before `npm run size` — it reads `dist/assets`.
- **Always** put a new email design token (a color, font, radius, the logo
  URL) in `api/_lib/emails/brand.js`, never inline/duplicated across
  `WelcomeEmail.js`/`LeadNotificationEmail.js`/`ContactConfirmationEmail.js`.
- **Never** lay out an email template with `display: flex` — see "Email
  templates" in the API section; Outlook desktop does not render it.
- **Never** write a `.jsx` file (or use JSX syntax at all) anywhere under
  `api/`. Vercel deploys serverless functions as raw, unbundled ESM — Node's
  native loader throws `ERR_UNKNOWN_FILE_EXTENSION` on `.jsx` and has no JSX
  transform for JSX syntax in a `.js` file either. Use
  `React.createElement(...)` (see any file in `api/_lib/emails/`). This
  shipped broken once already — see "Email templates" in the API section.
- **Always** update this file in the same PR as a change it describes; CI flags
  the ones it can detect, but it cannot tell whether the prose is still true.
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
6. The subscriber list lives in two places: Resend contacts (source of truth
   for Broadcasts and unsubscribes) and the external MongoDB backend (sent
   each newly confirmed subscriber by `api/confirm-subscription.js`), which
   never hears about unsubscribes. Fine while newsletters go out through
   Resend Broadcasts; if they ever go out from the backend's list instead, it
   needs to read unsubscribe state from Resend first.
7. The welcome email promises a newsletter "once a quarter", matching the
   site footer's "Get quarterly strategic insights". Someone has to actually
   send one each quarter (Resend → Broadcasts → the "Newsletter" segment), or
   the promise — and engagement, which inbox providers track — lapses.
8. The rewritten welcome email and the new confirmation/subscribe-page copy
   in `fa`/`ar` are original translations, not yet reviewed by a native
   speaker.

## Recent Branch Updates & Improvements

- **Newsletter: double opt-in, unsubscribe, deliverability**
  (`api/newsletter.js`, `api/confirm-subscription.js`, `api/unsubscribe.js`,
  `api/_lib/emailLinks.js`, `api/_lib/resendContacts.js`):
  - Double opt-in: sign-up sends a "confirm your subscription" email; only
    the confirm click adds the Resend contact (in the "Newsletter" segment),
    sends the welcome email, and forwards to the MongoDB backend. The site
    footer's success message now says "check your inbox".
  - Real signed one-click unsubscribe replaces the welcome email's
    `href="#"` placeholder, plus RFC 8058 `List-Unsubscribe` headers (which
    Gmail and Yahoo expect on newsletter mail).
  - Welcome email rewritten for newsletter subscribers (it was client-
    onboarding copy: "Book your kickoff call"); no more "there" greeting in
    every language ("Välkommen ombord, there!", "there عزیز").
  - RTL fix across the visitor-facing templates: letter-spaced monospace
    labels (badges, taglines, the echoed message) split Farsi/Arabic letters
    apart, and the numbered feature rows had their padding on the wrong side.
    RTL now uses the body font with no letter-spacing, and mirrored padding.
  - All email now comes from "RoshaLink <address>" instead of a bare
    address; the welcome email's replies go to `LEAD_TO_EMAIL`.
  - DNS for roshalink.com (outside this repo): Resend and Namecheap Private
    Email are both DKIM-signed; DMARC set to `p=none` with reports to
    support@roshalink.com on 2026-09-25, planned move to `p=quarantine`
    after ~2 weeks of clean reports.
- **Local dev email pipeline was broken end-to-end; fixed and verified live**:
  - `vite.config.js` proxied `/api/lead`/`/api/newsletter` to a nonexistent
    `127.0.0.1:5000` backend instead of the in-process `devApiPlugin` — every
    local Contact/Get-Started/newsletter submission failed with
    `ECONNREFUSED`. Fixed by adding both routes to `API_ROUTES` and removing
    the dead proxy config (including an unused `/api/leads` plural entry).
    See "Backend forwarding" in the API section.
  - `api/newsletter.js`'s `sendWelcomeEmail()` never checked `response.ok` on
    the Resend call, so a failed welcome email produced zero log output.
    Fixed to check and log `[newsletter] resend_error`, matching the pattern
    `api/lead.js` already used.
  - Root-caused a Resend 403 (`The send.roshalink.com domain is not
    verified`): `LEAD_FROM_EMAIL` was `leads@send.roshalink.com`, but only
    the parent `roshalink.com` was verified in Resend — a subdomain needs its
    own separate verification even under a verified parent. Fixed by
    switching `LEAD_FROM_EMAIL` to `leads@roshalink.com` in `.env.local` (the
    same change needs making in the Vercel dashboard for Production/Preview/
    Development, followed by a redeploy, before real traffic hits this).
  - Verified via real submissions against the running dev server (both
    through the actual Contact page UI and direct `curl` calls to `/api/lead`
    and `/api/newsletter`) that both the lead notification + confirmation
    emails and the newsletter welcome email now send with no `resend_error`
    in the logs. `npm test` (72 tests across `lead.test.js`,
    `newsletter.test.js`, `chat.test.js`) still passes unchanged.
- **Transactional Email System (`api/_lib/emails/`)**:
  - Replaced `api/lead.js`'s bare, unstyled `<table>` internal notification
    with a branded `LeadNotificationEmail` react-email component matching the
    site's own design tokens.
  - Added `ContactConfirmationEmail`, sent best-effort to the enquiry
    submitter for `get-started`/`contact` sources with a real email address.
  - Added `WelcomeEmail`, sent best-effort from `api/newsletter.js` on
    subscribe (the closest real equivalent to "on signup" — this site has no
    user-account system).
  - Converted the site's `.webp` logo to PNG (`public/RoshaLink_logo(_sm)?.png`)
    for Outlook-safe email rendering, hosted at an absolute URL.
  - All three templates share one token file (`brand.js`) and layout/footer/
    field-row components, verified against the approved design mockups via
    `npx react-email dev` + a headless-browser screenshot comparison.
  - **Hotfix**: the templates originally shipped as `.jsx` and 500'd every
    `/api/lead` and `/api/newsletter` request in production —
    `ERR_UNKNOWN_FILE_EXTENSION`, since Vercel deploys `api/` unbundled and
    Node's loader has no JSX transform. All local checks (tests, build,
    typecheck) had passed because Vite/Vitest transform JSX automatically,
    which none of them caught. Rewrote every file in `api/_lib/emails/` with
    `React.createElement` and plain `.js`, this time verified with a raw
    `node -e "import(...)"` matching Vercel's actual runtime. See "Email
    templates" in the API section and the new Always/Never rule.
  - **Localization**: `WelcomeEmail` and `ContactConfirmationEmail` now
    render in the visitor's own site language (`sv`/`en`/`fa`/`ar`, via a
    new `lang` prop + `i18n.js`) instead of always English — subject line,
    body copy, and RTL layout (`dir="rtl"`, mirrored field rows and feature
    blocks for Farsi/Arabic) all follow it. `LeadNotificationEmail` stays
    English-only on purpose (team-facing, not visitor-facing). Verified
    across all four locales with the same raw-Node-import + headless-
    screenshot method as the JSX hotfix above — see "Email templates" for
    a RTL-screenshot gotcha (`fullPage: true` on a `dir="rtl"` page) found
    and worked around along the way.
  - **Pre-merge double-check**: beyond the unit tests in `i18n.test.js`,
    `lead.test.js` and `newsletter.test.js`, this change was additionally
    verified by importing the real `api/lead.js`/`api/newsletter.js`
    handlers with a stubbed `fetch`/`req`/`res` (no test framework) and
    driving them end-to-end for `lang` in `sv`/`en`/`fa`/`ar`/undefined/
    `en-US`/an unsupported code — confirming the Resend payload actually
    sent per case (subject, `dir`, body text), that the internal
    notification's subject/body genuinely never changes with `lang` (the
    only diff is the literal language-code value in its informational
    "Site Language" field), and that all 8 locale × template renders look
    correct as screenshots. This handler-level, framework-free replay is
    the technique to reach for again on any future change to these three
    routes, alongside the raw-Node-import check the JSX hotfix already
    established — it catches payload-shape and copy regressions that
    mocked-fetch unit tests can miss.
- **Portfolio Page**:
  - Aligned project card action buttons and "Learn More" feature sub-menus to the bottom across all cards regardless of text length.
  - Styled expanded card feature items with solid sky-blue background in Light Mode with Dark Mode support.
  - Enhanced interactive live preview modal with background scroll lock; removed redundant "Open Live" button and mockup URL indicator.
  - Applied the `.sky-blue-text-shine` animated gradient wave to both the hero headline and bottom CTA banner title.
  - Added a responsive public case-studies notice header above the project grid with full i18n support across 4 locales (`sv`, `en`, `fa`, `ar`).
  - Added HogWard Café live production case study (`https://roshalink.github.io/HogWard_Cafe/`) with full i18n translation and interactive live browser preview.
  - Added Royal Beauty live production case study (`https://roshalink.github.io/royalbeauty/`), a beauty/aesthetic clinic platform, with full i18n translation and interactive live browser preview. Deployed from the sibling `royalbeauty` repo via a new GitHub Actions → GitHub Pages workflow (Next.js static export).
  - Enforced `uppercase` styling on titles for English and Swedish.
- **Services Page**:
  - Enforced `uppercase` styling on all section titles across English and Swedish locales (Hero Headline, Capabilities, Tech Matrix, Delivery Process, Comparison, FAQ, Bottom CTA).
  - Converted delivery process tabs (`ServicesDeliveryProcess`) to a 1-column vertical layout on mobile screens (`<= 840px`) to prevent text truncation in all languages.
  - Increased mobile margin spacing on process tabs to prevent 3D card deck overlapping the 4th step button.
- **About Page**:
  - Streamlined the bottom CTA section by removing mascot imagery and centering the layout.
  - Standardized `uppercase` styling on all section titles across English and Swedish locales (Awards, Team Showcase, Perspectives Bento, Mission, How It Works, CTA).
  - Resolved `RollingTextList` hover text clipping on RTL/Farsi by adding negative margin bounding-box compensation and inline padding to `.rolling-title-box`.
  - Removed solid card background frames, overlays, and box borders from `RollingTextList` image reveals, making 3D assets float cleanly with a soft drop-shadow.
- **HomePage (`HomePage.css`, `HomePage.jsx`)**:
  - Implemented continuous blueprint dot-grid background (`radial-gradient(rgba(15, 23, 42, 0.08) 1px, transparent 1px)`) spanning the entire HomePage container in Light Mode.
  - Made section background layers translucent so the seamless dot pattern flows through all showcases and sections.
  - Reordered `WhoWeAre` (5-member team showcase slider) to the 4th position on the HomePage (directly after `SearchVisibilityShowcase`).
  - Redesigned `MobileAppModal` to match the modern 3x2 card grid aesthetic of `CustomWebSolutionModal`.
  - Standardized all team member names (`Morteza`, `Bella`, `Sam`, `Mina`, `Milad`) in English across all locales including Farsi.
- **Hero Section (`HeroSection`)**:
  - Resolved mobile layout collapsing bug where `.hero-video-panel` collapsed to 0 width/height on screens `< 1024px`.
  - Configured fully responsive 16:9 framed video container on top on mobile/tablet viewports (`order: 1`), with text and CTA buttons underneath (`order: 2`), and side-by-side on desktop.
- **Get Started Modal (`GetStartedModal`)**:
  - Implemented high-contrast, solid dark/black text styling in Light Mode and clean illuminated white/slate styling in Dark Mode (`html.dark`).
  - Simplified form fields to: Name, Email / Phone Number, and Project Overview. Removed badge, estimated budget, and focus dropdowns as requested.
  - Added full translation coverage across all 4 locales (`sv`, `en`, `fa`, `ar`) with RTL support.
  - Added responsive design down to small mobile viewports with `overflow-x: hidden`, 44px minimum hit targets, and `font-size: 16px` on inputs to prevent iOS auto-zoom.
  - Added background body scroll lock when modal is open and keyboard `Escape` key close handling.
- **Typography & Subtext Standardization (`src/index.css`, `ServicesPage`, `AboutPage`, `BrandsWeWorkWith`)**:
  - Integrated `Vazirmatn` font token fallback across `--font-body`, `--font-headline`, `--font-grotesk`, and `--font-mono`.
  - Added global RTL typography rules ensuring crisp, weighted Vazirmatn rendering across all Persian and Arabic text without thin fallback glitching.
  - Standardized subtitle and subtext sizing, line heights (`1.65`–`1.75`), max widths (`48rem`), and colors (`var(--color-slate-600)` / `var(--color-slate-400)`) across `ServicesPage`, `AboutPage` (Awards, Team Showcase, Perspectives Bento, Mission Rolling List, Methodology, CTA), and HomePage showcase components.
- **Contact Page (`ContactPage.jsx`, `ContactPage.css`, `src/i18n.js`)**:
  - Standardized continuous blueprint dot-grid pattern in Light and Dark Mode.
  - Standardized hero title (`.contact-hero-title`) with `uppercase` in English/Swedish and `.sky-blue-text-shine` gradient wave.
  - Standardized hero subtitle sizing, line heights, and typography tokens.
  - Added complete, dedicated `contactPage` translation tree across all 4 locales (`sv`, `en`, `fa`, `ar`) with 100% key parity and RTL layout support.
  - Polished high-contrast Light/Dark mode glassmorphism across form cards and interactive 3-step process card with vibrant blue navigation buttons in Light Mode and clean text-only layout (removed redundant icon boxes and time badge pills).

