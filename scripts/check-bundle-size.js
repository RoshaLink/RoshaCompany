#!/usr/bin/env node
/**
 * Fails the build when the shipped JavaScript or CSS grows past its budget.
 *
 * Measured gzipped, because that is what visitors actually download — raw
 * byte counts swing on things (minifier settings, long class strings) that
 * barely move transfer size.
 *
 * The budgets are set a little above today's real numbers, so this catches a
 * step change (a heavyweight dependency added without noticing) rather than
 * nagging about normal drift. When a bump is genuinely justified, raise the
 * number here in the same PR that causes it — that way the increase is a
 * visible, reviewed line in the diff instead of something nobody sees.
 *
 * Note this deliberately covers code only, not the images and videos in
 * dist/assets. Those dominate total page weight here (there is a ~9.8 MB mp4)
 * and belong in a separate conversation about media optimisation; mixing them
 * in would make the budget meaningless for catching JS regressions.
 */

import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { gzipSync } from 'node:zlib'

const ASSETS_DIR = 'dist/assets'

const BUDGETS_KB = {
  js: 310,
  css: 65,
}

if (!existsSync(ASSETS_DIR)) {
  console.error(`No ${ASSETS_DIR} directory. Run \`npm run build\` first.`)
  process.exit(1)
}

const totals = { js: 0, css: 0 }
const files = { js: [], css: [] }

for (const name of readdirSync(ASSETS_DIR)) {
  const kind = name.endsWith('.js') ? 'js' : name.endsWith('.css') ? 'css' : null
  if (!kind) continue

  const gzipped = gzipSync(readFileSync(join(ASSETS_DIR, name))).length
  totals[kind] += gzipped
  files[kind].push({ name, kb: gzipped / 1024 })
}

const kb = (bytes) => bytes / 1024
let failed = false

for (const [kind, budgetKb] of Object.entries(BUDGETS_KB)) {
  const actualKb = kb(totals[kind])
  const pct = ((actualKb / budgetKb) * 100).toFixed(0)
  const label = kind.toUpperCase().padEnd(3)

  if (actualKb > budgetKb) {
    failed = true
    console.error(
      `✗ ${label} ${actualKb.toFixed(1)} KB gzipped exceeds the ${budgetKb} KB budget (${pct}%)`
    )
    for (const f of files[kind].sort((a, b) => b.kb - a.kb)) {
      console.error(`      ${f.kb.toFixed(1).padStart(7)} KB  ${f.name}`)
    }
  } else {
    console.log(`✓ ${label} ${actualKb.toFixed(1)} KB gzipped, budget ${budgetKb} KB (${pct}%)`)
  }
}

if (failed) {
  console.error(
    '\nIf this growth is intentional, raise the matching budget in ' +
      'scripts/check-bundle-size.js as part of this change.'
  )
  process.exit(1)
}
