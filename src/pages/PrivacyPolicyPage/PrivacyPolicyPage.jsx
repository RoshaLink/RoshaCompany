import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Lock, Zap, BookOpen } from 'lucide-react';
import PrivacyShortVersion from './PrivacyShortVersion';
import PrivacyFullVersion from './PrivacyFullVersion';
import { shortVersion } from './privacyShortData';
import { fullVersion } from './privacyFullData';
import './PrivacyPolicyPage.css';

export default function PrivacyPolicyPage() {
  const { i18n } = useTranslation();
  
  // Determine active language from global i18n setting
  const getActiveLang = () => {
    const lang = i18n.language ? i18n.language.toLowerCase() : 'sv';
    if (lang.startsWith('sv')) return 'sv';
    if (lang.startsWith('fa')) return 'fa';
    if (lang.startsWith('ar')) return 'ar';
    return 'en';
  };

  const selectedLang = getActiveLang();
  const [viewMode, setViewMode] = useState('full'); // 'short' | 'full'

  const isRTL = selectedLang === 'fa' || selectedLang === 'ar';

  const currentFull = fullVersion[selectedLang] || fullVersion.sv;
  const currentShort = shortVersion[selectedLang] || shortVersion.sv;

  return (
    <div className={`privacy-policy-container ${isRTL ? 'rtl' : 'ltr'}`}>
      
      {/* Header Banner */}
      <section className="privacy-header-section">
        <div className="ambient-glow-cyan privacy-header-glow" />
        <div className="privacy-header-inner">
          
          <div className="privacy-badge">
            <ShieldCheck className="privacy-badge-icon" />
            <span>{currentFull.badge}</span>
          </div>

          <h1 className="privacy-main-title">
            {viewMode === 'short' ? currentShort.title : currentFull.title}
          </h1>

          <p className="privacy-subtitle">
            {currentFull.subtitle}
          </p>

          <div className="privacy-updated-tag">
            {currentFull.updated}
          </div>

          {/* Mode Control Bar */}
          <div className="privacy-control-bar">
            
            {/* View Version Toggle (Short vs Full) */}
            <div className="privacy-toggle-group">
              <button
                onClick={() => setViewMode('short')}
                className={`privacy-toggle-btn ${viewMode === 'short' ? 'active-short' : ''}`}
              >
                <Zap className="privacy-btn-icon-amber" />
                <span>Short Version (Quick Read)</span>
              </button>
              <button
                onClick={() => setViewMode('full')}
                className={`privacy-toggle-btn ${viewMode === 'full' ? 'active-full' : ''}`}
              >
                <BookOpen className="privacy-btn-icon" />
                <span>Full Legal Policy</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Main Content Render */}
      <section className="privacy-content-section">
        {viewMode === 'short' ? (
          <PrivacyShortVersion points={currentShort.points} />
        ) : (
          <PrivacyFullVersion sections={currentFull.sections} />
        )}
      </section>

      {/* Footer DPO Banner */}
      <section className="privacy-dpo-section">
        <div className="privacy-dpo-banner">
          <div className="privacy-dpo-info">
            <div className="privacy-dpo-badge">
              <Lock className="privacy-dpo-icon" />
              <span>Data Protection Officer (DPO)</span>
            </div>
            <h3 className="privacy-dpo-title">Questions about GDPR or data privacy?</h3>
            <p className="privacy-dpo-text">
              Our privacy engineering team normally responds within 24 hours. Reach out directly at privacy@roshalink.com.
            </p>
          </div>
          <a
            href="mailto:privacy@roshalink.com"
            className="privacy-dpo-btn"
          >
            Contact DPO
          </a>
        </div>
      </section>

    </div>
  );
}
