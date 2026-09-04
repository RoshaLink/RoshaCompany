import { readdirSync, statSync, existsSync, unlinkSync } from 'fs';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(__dirname, '..', 'src', 'assets');
const FORCE = process.argv.includes('--force');

function findImages(dir, results = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      findImages(full, results);
    } else {
      const ext = extname(entry).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        results.push(full);
      }
    }
  }
  return results;
}

const images = findImages(ASSETS_DIR);
let totalSaved = 0;

console.log(`Found ${images.length} images to optimize...`);

async function processImages() {
  for (const imgPath of images) {
    const ext = extname(imgPath).toLowerCase();
    const webpPath = imgPath.replace(new RegExp(`${ext}$`, 'i'), '.webp');
    const label = imgPath.replace(ASSETS_DIR, '').replace(/\\/g, '/');
    const srcSize = statSync(imgPath).size;

    if (existsSync(webpPath) && !FORCE) {
      console.log(`⏭️  SKIP ${label} (WebP exists)`);
      continue;
    }

    try {
      await sharp(imgPath)
        .webp({ quality: 80, effort: 4 })
        .toFile(webpPath);

      const webpSize = statSync(webpPath).size;
      const saved = srcSize - webpSize;
      const pct = Math.round((saved / srcSize) * 100);
      totalSaved += saved;
      
      console.log(`✅ CONVERTED ${label}`);
      console.log(`   ${(srcSize/1024/1024).toFixed(2)} MB → ${(webpSize/1024/1024).toFixed(2)} MB (-${pct}%)`);
      
      // Optionally delete the original to force using WebP everywhere
      // unlinkSync(imgPath);
    } catch (err) {
      console.error(`❌ ERROR on ${label}:`, err.message);
    }
  }
  console.log(`\n🎉 Total saved: ${(totalSaved/1024/1024).toFixed(2)} MB`);
}

processImages();
