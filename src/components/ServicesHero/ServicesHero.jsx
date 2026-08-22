import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ArrowUpRight, Cpu } from 'lucide-react';
import roshaWithComputerImage from '../../assets/Rosha/WorkingWithComputer/RoshaWithBlueComputer.jpg';
import './ServicesHero.css';

export default function ServicesHero({ onOpenGetStarted }) {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());

  return (
    <section className="services-hero-section">
      {/* Background Ambient Lighting Glows */}
      <div className="services-hero-glow-1" />
      <div className="services-hero-glow-2" />

      <div className="services-hero-container">
        <div className={`services-hero-flex-wrapper ${isRTL ? 'is-rtl' : ''}`}>

          {/* Content Side (Headline, Subtitle & Action Buttons) */}
          <div className={`services-hero-content-side ${isRTL ? 'text-right' : 'text-left'}`}>

            {/* Main Headline (2 Lines: Top text white/dark, Bottom text gradient) */}
            <h1 className="services-hero-title">
              <span className="services-hero-title-top">
                {t('servicesPage.hero.titlePrefix')}
              </span>
              <span className="services-hero-title-bottom services-hero-gradient-text">
                {t('servicesPage.hero.titleGradient')}
              </span>
              {t('servicesPage.hero.titleSuffix') && (
                <span className="services-hero-title-suffix">
                  {t('servicesPage.hero.titleSuffix')}
                </span>
              )}
            </h1>

            {/* Subtext via i18n */}
            <p className="services-hero-subtitle">
              {t('servicesPage.hero.subtitle')}
            </p>

            {/* CTA Action Buttons Side-by-Side */}
            <div className={`services-hero-actions ${isRTL ? 'is-rtl' : 'is-ltr'}`}>
              <button
                type="button"
                onClick={onOpenGetStarted}
                className="services-btn-primary"
              >
                <span>{t('servicesPage.hero.primaryCta')}</span>
                <ArrowRight className={`services-btn-icon ${isRTL ? 'rotate-180' : ''}`} />
              </button>

              <a href="#core-capabilities" className="services-btn-secondary">
                <span>{t('servicesPage.hero.secondaryCta')}</span>
                <ArrowUpRight className="services-btn-icon" />
              </a>
            </div>

          </div>

          {/* Image Side (Rosha With Blue Computer with Glassmorphic Card Frame) */}
          <div className="services-hero-image-side">
            <div className="services-hero-image-wrapper group">
              {/* Outer Ambient Glow Ring behind Image Card */}
              <div className="services-hero-image-glow" />

              {/* Glassmorphic Frame Card */}
              <div className="services-hero-card-frame">
                <img
                  src={roshaWithComputerImage}
                  alt="Rosha Digital Architecture & Software Development"
                  className="services-hero-img"
                  loading="eager"
                />

                {/* Floating Glassmorphic Pill with i18n */}
                <div className={`services-hero-floating-pill ${isRTL ? 'is-rtl' : 'is-ltr'}`}>
                  <div className="services-hero-pill-icon-box">
                    <Cpu className="services-hero-pill-icon" />
                  </div>
                  <div className="services-hero-pill-text">
                    <div className="services-hero-pill-title">
                      {t('servicesPage.hero.floatingPillTitle')}
                    </div>
                    <div className="services-hero-pill-subtitle">
                      {t('servicesPage.hero.floatingPillSubtitle')}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
