import puppeteer from 'puppeteer';
import express from 'express';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = resolve(__dirname, '../dist');
const PORT = 54321;

const languages = ['en', 'sv', 'fa', 'ar'];
const pages = ['', '/about', '/services', '/portfolio', '/contact', '/privacy'];

const routes = ['/'];
languages.forEach(lang => {
  pages.forEach(page => {
    routes.push(`/${lang}${page}`);
  });
});

async function run() {
  console.log('Starting Express server for prerendering...');
  const app = express();
  
  // Serve static files from dist
  app.use(express.static(DIST_DIR));
  
  // Fallback to index.html for client-side routing
  app.use((req, res) => {
    res.sendFile(join(DIST_DIR, 'index.html'));
  });

  const server = app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`);
    
    console.log('Launching Puppeteer...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Set a large viewport
    await page.setViewport({ width: 1440, height: 1080 });

    for (const route of routes) {
      console.log(`Prerendering ${route}...`);
      
      try {
        // networkidle0 waits until there are no network connections for at least 500ms.
        // If there are videos polling, it might hang, so we use a timeout and networkidle2.
        await page.goto(`http://localhost:${PORT}${route}`, { 
          waitUntil: 'networkidle2',
          timeout: 15000 
        });
        
        // Wait a tiny bit extra to ensure React has fully rendered and any initial useEffects have fired
        await new Promise(r => setTimeout(r, 1000));
        
        // Remove scripts from the rendered HTML? 
        // No, we need scripts for hydration, but we should make sure we grab the full document HTML.
        let html = await page.evaluate(() => {
          return document.documentElement.outerHTML;
        });
        
        // Strip out the localhost:PORT absolute URLs injected by Vite during runtime
        html = html.replace(new RegExp(`http://localhost:${PORT}`, 'g'), '');
        
        // Add DOCTYPE since outerHTML doesn't include it
        const finalHtml = `<!DOCTYPE html>\n${html}`;
        
        // Determine file path
        const filePath = route === '/' 
          ? join(DIST_DIR, 'index.html')
          : join(DIST_DIR, route, 'index.html');
          
        // Ensure directory exists
        const dir = dirname(filePath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        
        fs.writeFileSync(filePath, finalHtml, 'utf8');
        console.log(`✅ Saved ${route}`);
      } catch (err) {
        console.error(`❌ Failed to prerender ${route}:`, err.message);
      }
    }
    
    console.log('Closing browser and server...');
    await browser.close();
    server.close();
    console.log('Prerendering complete!');
  });
}

run();
