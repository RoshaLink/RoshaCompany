#!/usr/bin/env node
/**
 * scripts/optimize-videos.js
 *
 * Converts all MP4 files in src/assets/ to WebM (VP9 + Opus) alongside the
 * original MP4, so HeroSection and other video components can serve WebM to
 * browsers that support it (all modern ones) and fall back to MP4.
 *
 * Usage:
 *   node scripts/optimize-videos.js             # convert all
 *   node scripts/optimize-videos.js --force      # re-convert even if WebM exists
 *
 * Prerequisites: ffmpeg must be on PATH.
 *
 * Strategy:
 *   - VP9 (libvpx-vp9) + Opus audio → .webm
 *   - CRF 33 gives ~50–70% smaller files vs MP4 at same perceived quality
 *   - 2-pass encoding for best quality/size (pass 1 is fast, no output)
 *   - Original .mp4 files are NOT modified — they stay as fallback
 */

import { execSync, spawnSync } from 'child_process';
import { readdirSync, statSync, existsSync } from 'fs';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(__dirname, '..', 'src', 'assets');
const FORCE = process.argv.includes('--force');

// VP9 encoding settings
// CRF 33 = good quality, ~50-65% smaller than source MP4
// -b:v 0 = pure CRF (no target bitrate cap, lets VP9 use CRF properly)
// -tile-columns 2 -frame-parallel 1 = threading for faster encode
const VP9_OPTS = [
  '-c:v', 'libvpx-vp9',
  '-crf', '33',
  '-b:v', '0',
  '-tile-columns', '2',
  '-frame-parallel', '1',
  '-auto-alt-ref', '1',
  '-lag-in-frames', '25',
  '-c:a', 'libopus',
  '-b:a', '64k',
  '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2', // ensure even dimensions
];

/** Recursively find all .mp4 files under dir */
function findMp4s(dir, results = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      findMp4s(full, results);
    } else if (extname(entry).toLowerCase() === '.mp4') {
      results.push(full);
    }
  }
  return results;
}

function formatMB(bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + ' MB';
}

const mp4s = findMp4s(ASSETS_DIR);

if (mp4s.length === 0) {
  console.log('No MP4 files found under src/assets/');
  process.exit(0);
}

console.log(`\n🎬 Found ${mp4s.length} MP4 file(s) to process\n`);

let totalSavedBytes = 0;
let converted = 0;
let skipped = 0;

for (const mp4Path of mp4s) {
  const webmPath = mp4Path.replace(/\.mp4$/i, '.webm');
  const label = mp4Path.replace(ASSETS_DIR, '').replace(/\\/g, '/');
  const srcSize = statSync(mp4Path).size;

  if (existsSync(webmPath) && !FORCE) {
    const webmSize = statSync(webmPath).size;
    console.log(`⏭️  SKIP  ${label}`);
    console.log(`         WebM already exists (${formatMB(webmSize)} vs ${formatMB(srcSize)} MP4)\n`);
    skipped++;
    continue;
  }

  console.log(`🔄 Converting ${label} (${formatMB(srcSize)})`);

  // 2-pass VP9 — pass 1 (no output, generates stats file)
  const pass1 = spawnSync('ffmpeg', [
    '-y',
    '-i', mp4Path,
    ...VP9_OPTS,
    '-pass', '1',
    '-an',           // no audio in pass 1
    '-f', 'null',
    process.platform === 'win32' ? 'NUL' : '/dev/null',
  ], { stdio: 'pipe' });

  if (pass1.status !== 0) {
    console.error(`❌ Pass 1 failed for ${label}`);
    console.error(pass1.stderr?.toString().slice(-500));
    continue;
  }

  // Pass 2 — actual encode
  const pass2 = spawnSync('ffmpeg', [
    '-y',
    '-i', mp4Path,
    ...VP9_OPTS,
    '-pass', '2',
    webmPath,
  ], { stdio: 'pipe' });

  if (pass2.status !== 0) {
    console.error(`❌ Pass 2 failed for ${label}`);
    console.error(pass2.stderr?.toString().slice(-500));
    continue;
  }

  const webmSize = statSync(webmPath).size;
  const saved = srcSize - webmSize;
  const pct = Math.round((saved / srcSize) * 100);
  totalSavedBytes += saved;
  converted++;

  console.log(`✅ Done   ${label}`);
  console.log(`         ${formatMB(srcSize)} → ${formatMB(webmSize)} (-${pct}%)\n`);
}

// Clean up ffmpeg 2-pass stats files
try {
  execSync('del /f /q ffmpeg2pass-0.log ffmpeg2pass-0.log.mbtree 2>nul', { shell: 'cmd.exe', stdio: 'pipe' });
} catch { /* ignore */ }

console.log('═══════════════════════════════════════════════');
console.log(`✅ Converted: ${converted}  ⏭️  Skipped: ${skipped}`);
if (converted > 0) {
  console.log(`💰 Total saved: ${formatMB(totalSavedBytes)}`);
}
console.log('\n📝 Next step: update your video <source> elements to serve WebM first:');
console.log('   <source src={videoWebm} type="video/webm" />');
console.log('   <source src={videoMp4}  type="video/mp4"  />   ← fallback');
