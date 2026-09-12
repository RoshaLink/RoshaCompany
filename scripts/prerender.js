process.env.NODE_ENV = 'production';

import { createServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = resolve(__dirname, '../dist');

const languages = ['sv', 'en', 'fa', 'ar'];
const pages = [
  '',
  '/about',
  '/services',
  '/services/discovery',
  '/services/web-architecture',
  '/services/cloud-backend',
  '/services/ai-automation',
  '/services/mobile-apps',
  '/services/seo-performance',
  '/portfolio',
  '/contact',
  '/privacy',
];

const routes = ['/'];
languages.forEach(lang => {
  pages.forEach(page => {
    routes.push(`/${lang}${page}`);
  });
});

async function runPrerender() {
  const templatePath = join(DIST_DIR, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('dist/index.html not found. Run vite build first.');
    return;
  }
  const template = fs.readFileSync(templatePath, 'utf8');

  console.log(`Starting Vite SSR static site generation for ${routes.length} routes...`);
  const startTime = Date.now();

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    mode: 'production',
    logLevel: 'error',
  });

  try {
    const { default: i18n } = await vite.ssrLoadModule('/src/i18n.js');
    const { default: App } = await vite.ssrLoadModule('/src/App.jsx');
    const { ThemeProvider } = await vite.ssrLoadModule('/src/context/ThemeContext.jsx');

    let successCount = 0;

    for (const route of routes) {
      const parts = route.split('/').filter(Boolean);
      const lang = languages.includes(parts[0]) ? parts[0] : 'sv';
      const isRtl = ['fa', 'ar'].includes(lang);

      if (i18n.language !== lang) {
        await i18n.changeLanguage(lang);
      }

      const appHtml = renderToString(
        React.createElement(
          MemoryRouter,
          { initialEntries: [route] },
          React.createElement(
            ThemeProvider,
            null,
            React.createElement(App)
          )
        )
      );

      let finalHtml = template.replace(
        '<div id="root"></div>',
        `<div id="root">${appHtml}</div>`
      );

      finalHtml = finalHtml.replace(
        /<html[^>]*>/,
        `<html lang="${lang}" dir="${isRtl ? 'rtl' : 'ltr'}">`
      );

      const filePath = route === '/'
        ? join(DIST_DIR, 'index.html')
        : join(DIST_DIR, route.replace(/^\//, ''), 'index.html');

      const fileDir = dirname(filePath);
      if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir, { recursive: true });
      }

      fs.writeFileSync(filePath, finalHtml, 'utf8');
      successCount++;
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`✅ Successfully prerendered ${successCount}/${routes.length} routes in ${duration}s!`);
  } catch (err) {
    console.error('Prerender error:', err);
    process.exitCode = 1;
  } finally {
    await vite.close();
  }
}

runPrerender();
