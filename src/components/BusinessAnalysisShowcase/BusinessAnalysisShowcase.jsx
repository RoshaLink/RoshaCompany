import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import videoMp4 from '../../assets/Rosha/HoldingLaptop/RoshaHoldingLaptop.mp4';
import videoWebm from '../../assets/Rosha/HoldingLaptop/RoshaHoldingLaptop.webm';
import LazyVideo from '../ui/LazyVideo';
import BusinessAnalysisModal from './BusinessAnalysisModal';
import './BusinessAnalysisShowcase.css';

export default function BusinessAnalysisShowcase({ onOpenGetStarted, setActivePage }) {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());
  const rtlClass = isRTL ? 'is-rtl' : 'is-ltr';

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="business-section">

      {/* Sky Blue Ambient Glow Orb */}
      <div className={`business-glow-1 ${rtlClass}`} />

      <div className="business-container">
        <div className="business-grid">

          {/* Content Side */}
          <div className={`business-content-col ${rtlClass}`}>

            {/* Headline */}
            <h2 className="business-title">
              {t('businessAnalysis.titlePrefix')}{' '}
              <span className="uppercase blue-text-shine break-words">
                {t('businessAnalysis.titleGradient')}
              </span>{' '}
              {t('businessAnalysis.titleSuffix')}
            </h2>

            {/* Subtitle */}
            <p className="business-subtitle">
              {t('businessAnalysis.subtitle')}
            </p>

            {/* Action Buttons */}
            <div className="business-action">
              <button
                onClick={onOpenGetStarted}
                className="business-btn-primary"
              >
                <span>{t('businessAnalysis.button')}</span>
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="business-btn-secondary"
              >
                <span>{t('businessAnalysis.exploreBtn')}</span>
              </button>
            </div>

          </div>

          {/* Video Side (Blue Glassmorphic Border Card Frame) */}
          <div className={`business-video-col ${rtlClass}`}>
            <div className="business-video-card-wrapper group">

              {/* Outer Glow Ring */}
              <div className="business-video-glow" />

              {/* Glassmorphic Frame Card */}
              <div className="business-video-frame">
                <LazyVideo
                  webm={videoWebm}
                  mp4={videoMp4}
                  className="business-video"
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Modal */}
      <BusinessAnalysisModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
