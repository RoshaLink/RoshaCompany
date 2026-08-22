import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import videoSource from '../../assets/Rosha/YourWebsiteHere/RoshaYourWebsiteHere.mp4';
import './SearchVisibilityShowcase.css';

export default function SearchVisibilityShowcase({ onOpenGetStarted, setActivePage }) {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());
  const rtlClass = isRTL ? 'is-rtl' : 'is-ltr';

  return (
    <section className="search-visibility-wrapper">

      {/* Sky Blue Ambient Glow Orbs */}
      <div className={`search-glow-1 ${rtlClass}`} />
      <div className="search-glow-2" />

      <div className="search-container">
        <div className="search-grid">

          {/* Content Side */}
          <div className={`search-content-col ${rtlClass}`}>

            {/* Headline */}
            <h2 className="search-visibility-title">
              {t('searchVisibility.titlePrefix')}{' '}
              <span className="blue-text-shine">
                {t('searchVisibility.titleGradient')}
              </span>{' '}
              {t('searchVisibility.titleSuffix')}
            </h2>

            {/* Subtitle */}
            <p className="search-visibility-subtitle">
              {t('searchVisibility.subtitle')}
            </p>

            {/* CTA Button */}
            <div className="search-action">
              <button
                onClick={onOpenGetStarted}
                className="search-btn-primary"
              >
                <span>{t('searchVisibility.button')}</span>
              </button>
            </div>

          </div>

          {/* Video Side (Blue Glassmorphic Border Card Frame) */}
          <div className="search-video-col">
            <div className="search-video-card-wrapper">

              {/* Outer Glow Ring */}
              <div className="search-video-glow" />

              {/* Glassmorphic Frame Card */}
              <div className="search-video-frame">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="search-video"
                >
                  <source src={videoSource} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
