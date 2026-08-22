#!/usr/bin/env node
/**
 * Flags a pull request that changes something AGENTS.md documents without
 * touching AGENTS.md.
 *
 * AGENTS.md is the file coding agents read before doing anything in this repo.
 * A stale one is worse than no file at all: an agent trusts it and confidently
 * does the wrong thing. It goes stale quietly, because nothing about editing
 * package.json forces anyone to remember that a version number is also written
 * down in a markdown file.
 *
 * BE CLEAR ABOUT WHAT THIS IS AND IS NOT.
 *
 * It checks that AGENTS.md was *revisited*, not that it is *correct*. A
 * whitespace edit satisfies it. That is on purpose — verifying the prose
 * against the code needs a human or a model, and neither belongs in a check
 * that has to run on every PR for free. What this catches is the realistic
 * failure: forgetting the file exists.
 *
 * Reads the PR's changed files on stdin, one path per line.
 *
 * Set AGENTS_DOC_OK (or put [agents-doc-ok] in the PR title) to skip, for the
 * genuine case where a watched file changed in a way the doc does not cover.
 */

import { readFileSync } from 'node:fs'

const DOC = 'AGENTS.md'

/**
 * Each entry is a file AGENTS.md makes a claim about, paired with the claim.
 * The reason is printed on a hit, so the message says what to go and re-read
 * rather than just naming a file.
 */
const WATCHED = [
  [/^package\.json$/, 'the "Tech stack" versions and the "Commands" table'],
  [/^\.env\.example$/, 'the "Environment variables" table'],
  [/^vercel\.json$/, 'the "Deployment" section and the SPA rewrite'],
  [/^vite\.config\.js$/, 'the dev-server URL in "Commands"'],
  [/^vitest\.config\.js$/, 'how `npm test` splits into the server and client projects'],
  [/^eslint\.config\.js$/, 'the lint setup described in "Tech stack"'],
  [/^tsconfig\.api\.json$/, 'what `npm run typecheck` covers'],
  [/^\.github\/workflows\/ci\.yml$/, 'which CI gates block a merge'],
  [/^scripts\/check-bundle-size\.js$/, 'the bundle-budget rule in "Always / never"'],
  [/^src\/App\.jsx$/, 'the client route list in "API"'],
  // Handlers and their shared helpers only — a change to api/foo.test.js says
  // nothing about the documented request shape, limits or error codes.
  [/^api\/(?!.*\.test\.js$).*\.js$/, 'the "API" section: routes, caps and error codes'],
]

const changed = readFileSync(0, 'utf8')
  .split('\n')
  .map((line) => line.trim())
  .filter(Boolean)

if (changed.includes(DOC)) {
  console.log(`✓ ${DOC} was updated in this change`)
  process.exit(0)
}

const skip = process.env.AGENTS_DOC_OK || /\[agents-doc-ok\]/i.test(process.env.PR_TITLE || '')

const hits = []
for (const path of changed) {
  for (const [pattern, reason] of WATCHED) {
    if (pattern.test(path)) hits.push({ path, reason })
  }
}

if (hits.length === 0) {
  console.log(`✓ nothing this change touches is described in ${DOC}`)
  process.exit(0)
}

if (skip) {
  console.log(`✓ ${DOC} check skipped by request, despite ${hits.length} watched file(s)`)
  process.exit(0)
}

console.error(`✗ ${DOC} was not updated, but this change touches files it describes:\n`)
for (const { path, reason } of hits) {
  console.error(`      ${path}\n        → re-read ${reason}`)
}
console.error(
  `\nUpdate ${DOC} in this PR if any of the above is now wrong. If the doc is ` +
    `still accurate,\nadd [agents-doc-ok] to the PR title to say so deliberately.`
)
process.exit(1)
