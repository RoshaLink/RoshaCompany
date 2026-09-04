import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import './Breadcrumb.css';

/**
 * Visible "Home > Current Page" trail matching the BreadcrumbList JSON-LD
 * emitted by src/components/SEO/JsonLdSchema.jsx. Reuses the existing
 * nav.* i18n keys for labels - no new translation keys added.
 *
 * @param {{ page: 'about' | 'services' | 'portfolio' | 'contact' }} props
 */
export default function Breadcrumb({ page }) {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());
  const homeLabel = t('nav.home');
  const homeHref = `/${i18n.language}`;

  return (
    <nav aria-label="Breadcrumb" className={`breadcrumb-nav ${isRTL ? 'is-rtl' : 'is-ltr'}`}>
      <ol className="breadcrumb-list">
        <li className="breadcrumb-item">
          <Link to={homeHref} className="breadcrumb-link" title={homeLabel} aria-label={homeLabel}>
            {homeLabel}
          </Link>
        </li>
        <li className="breadcrumb-separator" aria-hidden="true">
          <ChevronRight className={`breadcrumb-chevron ${isRTL ? 'is-flipped' : ''}`} />
        </li>
        <li className="breadcrumb-item breadcrumb-current" aria-current="page">
          {t(`nav.${page}`)}
        </li>
      </ol>
    </nav>
  );
}
