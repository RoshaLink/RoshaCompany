import React, { useEffect } from 'react';
import {
  BASE_URL,
  SUPPORTED_LANGS,
  DEFAULT_LANG,
  LOCALE_MAP,
  EXTENDED_HREFLANG,
  GEO,
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
    // ── 1. Document title ──────────────────────────────────────────────────
    document.title = meta.title;

    // ── 2. HTML element attributes ─────────────────────────────────────────
    const htmlEl = document.documentElement;
    htmlEl.setAttribute('lang', currentLang);
    htmlEl.setAttribute('dir', isRTL ? 'rtl' : 'ltr');

    // ── Helpers ────────────────────────────────────────────────────────────
    /** Upsert a <meta> by name or property attribute */
    const setMetaTag = (nameOrProp, key, value) => {
      let tag = document.querySelector(`meta[${nameOrProp}="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(nameOrProp, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', value);
    };

    /** Upsert a <link> tag, scoped by rel + optional extra attrs as selector */
    const setLinkTag = (rel, href, extraAttrs = {}) => {
      // Build a specific selector so each hreflang variant has its own element.
      let selector = `link[rel="${rel}"]`;
      if (extraAttrs.hreflang) selector += `[hreflang="${extraAttrs.hreflang}"]`;
      let link = document.querySelector(selector);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
      Object.entries(extraAttrs).forEach(([k, v]) => link.setAttribute(k, v));
    };

    /** Upsert an og:locale:alternate meta, keyed by data-locale to allow multiple */
    const setAlternateLocaleTag = (locale, value) => {
      let tag = document.querySelector(`meta[property="og:locale:alternate"][data-locale="${locale}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', 'og:locale:alternate');
        tag.setAttribute('data-locale', locale);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', value);
    };

    // ── 3. Standard meta tags ──────────────────────────────────────────────
    setMetaTag('name', 'description', meta.description);
    setMetaTag('name', 'keywords', meta.keywords);
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMetaTag('name', 'author', 'RoshaLink Digital Agency');

    // ── 4. Geo-targeting meta tags (per page / per language) ───────────────
    // These are already in index.html as static fallback; here we reinforce
    // them dynamically so they always match the currently-rendered page.
    setMetaTag('name', 'geo.region',    GEO.region);
    setMetaTag('name', 'geo.placename', GEO.placename);
    setMetaTag('name', 'geo.position',  `${GEO.latitude};${GEO.longitude}`);
    setMetaTag('name', 'ICBM',          `${GEO.latitude}, ${GEO.longitude}`);

    // ── 5. Open Graph ──────────────────────────────────────────────────────
    setMetaTag('property', 'og:site_name',   'RoshaLink');
    setMetaTag('property', 'og:type',        'website');
    setMetaTag('property', 'og:url',         canonicalUrl);
    setMetaTag('property', 'og:title',       meta.title);
    setMetaTag('property', 'og:description', meta.description);
    setMetaTag('property', 'og:image',       `${BASE_URL}${meta.ogImage}`);
    setMetaTag('property', 'og:image:width',  '1200');
    setMetaTag('property', 'og:image:height', '630');
    setMetaTag('property', 'og:image:type',   'image/jpeg');
    // Provide an accessible alt text for OG image in the current language
    const ogImageAlts = {
      sv: 'RoshaLink — Ledande Digitalbyrå i Stockholm',
      en: 'RoshaLink — Digital Agency in Stockholm',
      fa: 'روشالینک — آژانس دیجیتال در استکهلم',
      ar: 'روشا لينك — وكالة رقمية في ستوكهولم',
    };
    setMetaTag('property', 'og:image:alt', ogImageAlts[currentLang] || ogImageAlts.en);
    setMetaTag('property', 'og:locale', LOCALE_MAP[currentLang] || 'sv_SE');

    // Alternate OG locales
    SUPPORTED_LANGS.filter((l) => l !== currentLang).forEach((altLang) => {
      setAlternateLocaleTag(altLang, LOCALE_MAP[altLang] || 'en_US');
    });

    // ── 6. Twitter Card ────────────────────────────────────────────────────
    setMetaTag('name', 'twitter:card',        'summary_large_image');
    setMetaTag('name', 'twitter:title',       meta.title);
    setMetaTag('name', 'twitter:description', meta.description);
    setMetaTag('name', 'twitter:image',       `${BASE_URL}${meta.ogImage}`);
    setMetaTag('name', 'twitter:image:alt',   ogImageAlts[currentLang] || ogImageAlts.en);
    // TODO: add twitter:site once the handle is confirmed, e.g.:
    // setMetaTag('name', 'twitter:site', '@roshalink');

    // ── 7. Canonical ───────────────────────────────────────────────────────
    setLinkTag('canonical', canonicalUrl);

    // ── 8. Core hreflang matrix (sv / en / fa / ar + x-default) ───────────
    SUPPORTED_LANGS.forEach((l) => {
      setLinkTag('alternate', `${BASE_URL}/${l}${pagePath}`, { hreflang: l });
    });
    // x-default → Swedish primary market
    setLinkTag('alternate', `${BASE_URL}/sv${pagePath}`, { hreflang: 'x-default' });

    // ── 9. Extended hreflang (Nordic + regional variants) ─────────────────
    // Maps nb/da/sv-SE/sv-FI etc. to the nearest supported locale URL.
    // Import EXTENDED_HREFLANG from seoConfig — each entry { hreflang, lang }
    // where lang is a SUPPORTED_LANGS key.
    EXTENDED_HREFLANG.forEach(({ hreflang, lang: targetLang }) => {
      setLinkTag('alternate', `${BASE_URL}/${targetLang}${pagePath}`, { hreflang });
    });

  }, [page, currentLang, meta, canonicalUrl, isRTL, pagePath]);

  return <JsonLdSchema page={page} lang={currentLang} />;
};
