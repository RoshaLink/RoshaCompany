import React, { useEffect } from 'react';
import {
  BASE_URL,
  SUPPORTED_LANGS,
  DEFAULT_LANG,
  LOCALE_MAP,
  getSeoMetadata,
} from '../../config/seoConfig';
import { JsonLdSchema } from './JsonLdSchema';

export const SEOHead = ({ page = 'home', lang = DEFAULT_LANG }) => {
  const currentLang = SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;
  const meta = getSeoMetadata(page, currentLang);
  const isRTL = ['fa', 'ar'].includes(currentLang);

  const pagePath = page === 'home' ? '' : `/${page}`;
  const canonicalUrl = `${BASE_URL}/${currentLang}${pagePath}`;

  useEffect(() => {
    // 1. Update Document Title
    document.title = meta.title;

    // 2. Update HTML attributes
    const htmlEl = document.documentElement;
    htmlEl.setAttribute('lang', currentLang);
    htmlEl.setAttribute('dir', isRTL ? 'rtl' : 'ltr');

    // 3. Helper to update or create meta tags
    const setMetaTag = (nameOrProp, key, value) => {
      let tag = document.querySelector(`meta[${nameOrProp}="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(nameOrProp, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', value);
    };

    // Helper to update or create link tags
    const setLinkTag = (rel, href, extraAttrs = {}) => {
      let selector = `link[rel="${rel}"]`;
      if (extraAttrs.hreflang) {
        selector += `[hreflang="${extraAttrs.hreflang}"]`;
      }
      let link = document.querySelector(selector);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
      Object.entries(extraAttrs).forEach(([k, v]) => link.setAttribute(k, v));
    };

    // Standard Meta Tags
    setMetaTag('name', 'description', meta.description);
    setMetaTag('name', 'keywords', meta.keywords);
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMetaTag('name', 'author', 'RoshaLink Digital Agency');

    // Open Graph Meta Tags
    setMetaTag('property', 'og:site_name', 'RoshaLink');
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:title', meta.title);
    setMetaTag('property', 'og:description', meta.description);
    setMetaTag('property', 'og:image', `${BASE_URL}/og-image.jpg`);
    setMetaTag('property', 'og:locale', LOCALE_MAP[currentLang] || 'sv_SE');

    // Alternate Open Graph Locales
    SUPPORTED_LANGS.filter((l) => l !== currentLang).forEach((altLang) => {
      setMetaTag('property', `og:locale:alternate`, LOCALE_MAP[altLang] || 'en_US');
    });

    // Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', meta.title);
    setMetaTag('name', 'twitter:description', meta.description);
    setMetaTag('name', 'twitter:image', `${BASE_URL}/og-image.jpg`);

    // Canonical Tag
    setLinkTag('canonical', canonicalUrl);

    // Hreflang Tags Matrix
    SUPPORTED_LANGS.forEach((l) => {
      setLinkTag('alternate', `${BASE_URL}/${l}${pagePath}`, { hreflang: l });
    });
    // x-default points to Swedish primary market (or English fallback)
    setLinkTag('alternate', `${BASE_URL}/sv${pagePath}`, { hreflang: 'x-default' });
  }, [page, currentLang, meta, canonicalUrl, isRTL, pagePath]);

  return <JsonLdSchema page={page} lang={currentLang} />;
};
