import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname, extname, resolve } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

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

async function run() {
  for (const file of files) {
    let content = readFileSync(file, 'utf8');
    
    // Find all imports of images
    const importRegex = /import\s+([a-zA-Z0-9_]+)\s+from\s+['"](.+?\.(png|jpe?g|webp))['"]/gi;
    let match;
    const imports = {};
    while ((match = importRegex.exec(content)) !== null) {
      imports[match[1]] = resolve(dirname(file), match[2]);
    }

    if (Object.keys(imports).length === 0) continue;

    // Process each image tag in the file
    // Look for <img ... src={varName} ... /> or <img ... src="path" ... />
    const imgRegex = /<img([^>]+)>/gi;
    let modified = false;
    
    const newContent = await asyncReplace(content, imgRegex, async (imgTag, attrs) => {
      // Find src variable
      const srcMatch = attrs.match(/src=\{([a-zA-Z0-9_]+)\}/);
      if (srcMatch && imports[srcMatch[1]]) {
        const imgPath = imports[srcMatch[1]];
        try {
          const metadata = await sharp(imgPath).metadata();
          let newAttrs = attrs;
          
          // Add width if missing
          if (!newAttrs.includes('width=')) {
            newAttrs += ` width="${metadata.width}"`;
          }
          // Add height if missing
          if (!newAttrs.includes('height=')) {
            newAttrs += ` height="${metadata.height}"`;
          }
          // Add loading="lazy" if missing and not a hero/navbar image
          if (!newAttrs.includes('loading=') && !file.toLowerCase().includes('hero') && !file.toLowerCase().includes('navbar')) {
            newAttrs += ` loading="lazy"`;
          }
          
          modified = true;
          return `<img${newAttrs}>`;
        } catch (e) {
          console.error(`Error reading ${imgPath}`, e.message);
        }
      }
      return imgTag;
    });

    if (modified && content !== newContent) {
      writeFileSync(file, newContent, 'utf8');
      console.log(`Updated dimensions in ${file.replace(SRC_DIR, '')}`);
    }
  }
}

// Helper for async regex replace
async function asyncReplace(str, regex, asyncFn) {
  const promises = [];
  str.replace(regex, (match, ...args) => {
    promises.push(asyncFn(match, ...args));
    return match;
  });
  const data = await Promise.all(promises);
  return str.replace(regex, () => data.shift());
}

run();
