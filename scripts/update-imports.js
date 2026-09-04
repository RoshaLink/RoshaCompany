import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC_DIR = join(__dirname, '..', 'src');

function findJsFiles(dir, results = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      findJsFiles(full, results);
    } else {
      if (['.js', '.jsx'].includes(extname(entry))) {
        results.push(full);
      }
    }
  }
  return results;
}

const files = findJsFiles(SRC_DIR);
let changedCount = 0;

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  // Regex to match imports from assets with .png, .jpg, .jpeg
  const updated = content.replace(/(import\s+.*?from\s+['"].*?assets\/.*?)\.(png|jpe?g)(['"])/gi, '$1.webp$3');
  
  if (content !== updated) {
    writeFileSync(file, updated, 'utf8');
    console.log(`Updated ${file.replace(SRC_DIR, '')}`);
    changedCount++;
  }
}

console.log(`Updated imports in ${changedCount} files.`);
