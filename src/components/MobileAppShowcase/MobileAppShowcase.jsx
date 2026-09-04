import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import mobileVideoMp4 from '../../assets/Rosha/holdingMobile/RoshaHoldingMobile.mp4';
import mobileVideoWebm from '../../assets/Rosha/holdingMobile/RoshaHoldingMobile.webm';
import LazyVideo from '../ui/LazyVideo';
import appleLogo from '../../assets/Rosha/logos/apple.webp';
import googleLogo from '../../assets/Rosha/logos/google.webp';
import MobileAppModal from './MobileAppModal';
import './MobileAppShowcase.css';

export default function MobileAppShowcase({ onOpenGetStarted, setActivePage }) {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());
  const rtlClass = isRTL ? 'is-rtl' : 'is-ltr';
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="mobile-section">

      {/* Background ambient lighting effects */}
      <div className="mobile-glow-1" />
      <div className="mobile-glow-2" />

      <div className="mobile-container">
        <div className="mobile-grid">

          {/* Video Side (Rosha Holding Mobile Video Graphic with App Store Floating Badges) */}
          <div className={`mobile-video-col ${rtlClass}`}>
            <div className="mobile-video-card-wrapper group">

              {/* Glow backdrop behind video card */}
              <div className="mobile-video-glow" />

              {/* Glassmorphic Frame Card */}
              <div className="mobile-video-frame">
                <LazyVideo
                  webm={mobileVideoWebm}
                  mp4={mobileVideoMp4}
                  className="mobile-video"
                />

                {/* Floating Glassmorphic Stat Pill #1 (Apple App Store Badge) */}
                <div className={`mobile-stat-pill mobile-stat-pill-1 ${rtlClass}`}>
                  <div className="mobile-stat-icon">
                    <img src={appleLogo} alt="Apple App Store" className="mobile-stat-img" width="36" height="36"  loading="lazy" />
                  </div>
                  <div>
                    <div className="mobile-stat-title">
                      Apple App Store
                    </div>
                    <div className="mobile-stat-sub-apple">
                      iOS Verified & Live
                    </div>
                  </div>
                </div>

                {/* Floating Glassmorphic Stat Pill #2 (Google Play Store Badge) */}
                <div className={`mobile-stat-pill mobile-stat-pill-2 ${rtlClass}`}>
                  <div className="mobile-stat-icon">
                    <img src={googleLogo} alt="Google Play Store" className="mobile-stat-img" width="36" height="36"  loading="lazy" />
                  </div>
                  <div>
                    <div className="mobile-stat-title">
                      Google Play Store
                    </div>
                    <div className="mobile-stat-sub-google">
                      Android Published
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className={`mobile-content-col ${rtlClass}`}>

            {/* Headline */}
            <h2 className="mobile-title">
              <span className="mobile-title-line">{t('mobileApp.titlePrefix')}</span>
              <span className="indigo-text-shine mobile-title-line break-words">
                {t('mobileApp.titleGradient')}
              </span>
              <span className="block">{t('mobileApp.titleSuffix')}</span>
            </h2>

            {/* Subtitle */}
            <p className="mobile-subtitle">
              {t('mobileApp.subtitle')}
            </p>

            {/* Action Buttons */}
            <div className="mobile-action">
              <button
                onClick={onOpenGetStarted}
                className="mobile-btn-primary"
              >
                <span>{t('mobileApp.buildBtn')}</span>
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="mobile-btn-secondary"
              >
                <span>{t('mobileApp.exploreBtn')}</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Modal */}
      <MobileAppModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
