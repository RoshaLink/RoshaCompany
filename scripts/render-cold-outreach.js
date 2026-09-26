/**
 * One-off tool: renders ColdOutreachEmail.js with the recipient details in
 * scripts/cold-outreach.local.js to a standalone HTML file you open in a
 * browser and copy-paste from. Not in package.json's scripts — a manual
 * design tool, same reasoning as `npx react-email dev` (see AGENTS.md).
 *
 * Usage:
 *   cp scripts/cold-outreach.example.js scripts/cold-outreach.local.js
 *   # edit scripts/cold-outreach.local.js for the specific recipient
 *   node scripts/render-cold-outreach.js
 */
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import * as React from 'react';
import { renderHtml } from '../api/_lib/emails/render.js';
import ColdOutreachEmail from '../api/_lib/emails/ColdOutreachEmail.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const propsPath = path.join(__dirname, 'cold-outreach.local.js');
const outPath = path.join(__dirname, 'cold-outreach.local.html');

let props;
try {
  ({ default: props } = await import(pathToFileURL(propsPath).href));
} catch {
  console.error(
    `Missing ${propsPath}.\nCopy scripts/cold-outreach.example.js to scripts/cold-outreach.local.js and fill in the recipient's details first.`
  );
  process.exit(1);
}

const html = await renderHtml(React.createElement(ColdOutreachEmail, props));
await writeFile(outPath, html, 'utf8');
console.log(`Wrote ${outPath}`);
console.log('Open it in a browser, select all the rendered content, copy, and paste into your mail client\'s compose window (HTML mode, not plain text).');
