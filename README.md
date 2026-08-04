# RoshaLink website

React 19 + Vite single-page app, with two small serverless functions that run
on Vercel alongside the static build.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values, see below
npm run dev                  # http://localhost:5173
```

`npm run dev` serves both the site and the API routes in `api/`. There is a
small dev-only plugin in `vite.config.js` that mounts the real handler files,
so local behaviour matches production. You do not need `vercel dev` for
day-to-day work (though it is worth running once before a first deploy as a
fidelity check).

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server, site + API |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built site (API routes are **not** available) |
| `npm run lint` | ESLint |

## Environment variables

Copy `.env.example` to `.env.local` and fill it in. Every variable is also
needed in the Vercel dashboard under **Settings → Environment Variables**, set
for **Production, Preview and Development** — forgetting Preview produces a
Preview-only 500 that looks like a code bug.

| Variable | Purpose |
| --- | --- |
| `OPENAI_API_KEY` | Powers the Rosha chat assistant. Mark as Sensitive in Vercel. |
| `OPENAI_MODEL` | Which model answers visitors. Defaults to a mini-tier model. |
| `ALLOWED_ORIGINS` | Optional. Comma-separated origins allowed to call the API. |
| `RESEND_API_KEY` | Sends lead notification emails. |
| `LEAD_TO_EMAIL` | Where lead emails are delivered. |
| `LEAD_FROM_EMAIL` | Sender address; must be a domain verified in Resend. |

Two things that catch people out:

- **Never prefix these with `VITE_`.** Vite inlines any `VITE_*` variable into
  the browser bundle, which would publish the API key to every visitor.
- **Vercel binds env vars at deploy time.** Changing one in the dashboard has
  no effect until you redeploy.

## The Rosha chat assistant

The widget lives in `src/components/DiaraChatWidget/` and is backed by
`api/chat.js`, which calls OpenAI server-side so the key never reaches the
browser. Rosha replies in whatever language the visitor writes in, not only
the four the site UI is translated into.

### Changing what Rosha knows

Edit **`api/_lib/companyFacts.js`**. That file is the assistant's entire
knowledge of the company, written as plain text with editing instructions at
the top. If a fact is not in that file, Rosha says she doesn't have it and
offers to put the visitor in touch — that is deliberate, and it is what stops
her inventing answers.

The file also carries an explicit "never state" list: certifications, client
names, performance numbers, prices, timelines, and contact details. Marketing
copy that reads as aspirational in a page banner becomes a direct factual
claim when a chatbot says it to a customer, so anything added there should be
something the company would stand behind in writing.

To change how Rosha *behaves* rather than what she knows, edit
`api/_lib/systemPrompt.js`.

### Before going live

1. Have a human read `api/_lib/companyFacts.js` end to end and confirm every
   line is accurate.
2. **Set a monthly budget cap and email alert on the OpenAI account.** The
   in-process rate limiter in `api/_lib/rateLimit.js` stops runaway loops and
   casual spam, but it cannot survive cold starts or span instances — the
   account-level cap is the only backstop that cannot be bypassed.
3. Confirm the current model id at
   <https://platform.openai.com/docs/models> and set `OPENAI_MODEL`. Prefer
   the mini tier over nano: nano's quality drop shows up exactly where this
   bot is least tolerant, in persuasive copy and non-English replies.
4. Note that Vercel preview deployments are publicly reachable and run against
   whatever key is configured. Consider a separate lower-limit key for Preview,
   or enable deployment protection.

## Lead capture

`api/lead.js` emails enquiries via Resend. Three entry points feed it, tagged
by a `source` field so you can tell them apart: the Get Started modal, the
Contact page form, and the chat widget's call to action.

Both forms previously showed a success screen without sending anything
anywhere. They now only show success once the server has accepted the lead,
and surface an error otherwise.
