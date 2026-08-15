import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Lock, Zap, BookOpen, CheckCircle2, FileText, Server, Scale, KeyRound, Eye, Mail, Clock, RefreshCw, Globe } from 'lucide-react';
import './PrivacyPolicyPage.css';

const ICON_MAP = {
  ShieldCheck,
  FileText,
  CheckCircle2,
  Scale,
  Server,
  Globe,
  Clock,
  KeyRound,
  Eye,
  Lock,
  Mail,
  RefreshCw
};

export default function PrivacyPolicyPage() {
  const { t, i18n } = useTranslation();
  const [viewMode, setViewMode] = useState('full'); // 'short' | 'full'

  const activeLang = i18n.language ? i18n.language.toLowerCase() : 'sv';
  const isRTL = activeLang.startsWith('fa') || activeLang.startsWith('ar');

  const shortTitle = t('privacyPolicy.shortTitle');
  const shortPoints = t('privacyPolicy.shortPoints', { returnObjects: true }) || [];

  const fullBadge = t('privacyPolicy.badge');
  const fullTitle = t('privacyPolicy.fullTitle');
  const fullUpdated = t('privacyPolicy.updated');
  const fullSubtitle = t('privacyPolicy.subtitle');
  const fullSections = t('privacyPolicy.fullSections', { returnObjects: true }) || [];

  return (
    <div className={`privacy-policy-container ${isRTL ? 'rtl' : 'ltr'}`}>
      
      {/* Header Banner */}
      <section className="privacy-header-section">
        <div className="ambient-glow-cyan privacy-header-glow" />
        <div className="privacy-header-inner">
          
          <div className="privacy-badge">
            <ShieldCheck className="privacy-badge-icon" />
            <span>{fullBadge}</span>
          </div>

          <h1 className="privacy-main-title">
            {viewMode === 'short' ? shortTitle : fullTitle}
          </h1>

          <p className="privacy-subtitle font-body-md">
            {fullSubtitle}
          </p>

          <div className="privacy-updated-tag">
            {fullUpdated}
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
          <div className="privacy-short-grid">
            {Array.isArray(shortPoints) && shortPoints.map((pt, i) => (
              <div key={i} className="privacy-short-card">
                <div className="privacy-short-card-header">
                  <CheckCircle2 className="privacy-icon-green" />
                  <span>{pt.title}</span>
                </div>
                <p className="privacy-short-card-desc">
                  {pt.desc}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="privacy-full-list">
            {Array.isArray(fullSections) && fullSections.map((section, idx) => {
              const IconComponent = typeof section.icon === 'string' ? ICON_MAP[section.icon] : section.icon;
              return (
                <div key={idx} className="privacy-full-card">
                  <div className="privacy-full-card-inner">
                    {IconComponent && (
                      <div className="privacy-full-card-icon-box">
                        <IconComponent className="privacy-card-icon" />
                      </div>
                    )}

                    <div className="privacy-full-card-content">
                      <h2 className="privacy-full-card-title">
                        {section.title}
                      </h2>
                      <div className="privacy-full-card-text">
                        {section.text}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
