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
  // Match any incorrectly injected closing tag
  // e.g. <img ... / width="100" height="100"> -> <img ... width="100" height="100" />
  // We need to move the / to the very end before the >
  const brokenImgRegex = /<img([^>]*?)\/\s*(width="[^"]+"\s*height="[^"]+"\s*(?:loading="lazy")?)\s*>/gi;
  
  const fixedContent = content.replace(brokenImgRegex, '<img$1 $2 />');
  
  // also fix if loading="lazy" is mixed in
  const brokenImgRegex2 = /<img([^>]*?)\/\s*(loading="lazy")\s*>/gi;
  const fixedContent2 = fixedContent.replace(brokenImgRegex2, '<img$1 $2 />');

  // and another variant just in case
  const brokenImgRegex3 = /<img([^>]*?)\/\s*([^>]+)>/gi;
  const fixedContent3 = fixedContent2.replace(brokenImgRegex3, '<img$1 $2 />');

  if (content !== fixedContent3) {
    writeFileSync(file, fixedContent3, 'utf8');
    console.log(`Fixed syntax in ${file.replace(SRC_DIR, '')}`);
    changedCount++;
  }
}

console.log(`Fixed syntax in ${changedCount} files.`);
