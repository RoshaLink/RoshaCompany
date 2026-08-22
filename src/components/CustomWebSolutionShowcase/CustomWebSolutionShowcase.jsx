import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, BarChart3, Layout, Rocket, Sparkles } from 'lucide-react';
import roshaAnalysisImage from '../../assets/Rosha/AnalyisYourBusiness/RoshaAnalyisYourBusiness.png';
import CustomWebSolutionModal from './CustomWebSolutionModal';
import './CustomWebSolutionShowcase.css';

export default function CustomWebSolutionShowcase({ onOpenGetStarted, setActivePage }) {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());
  const isArabic = (i18n.language || '').toLowerCase() === 'ar';
  const rtlClass = isRTL ? 'is-rtl' : 'is-ltr';

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="custom-section">

      {/* Background ambient lighting effects */}
      <div className="custom-glow-1" />
      <div className="custom-glow-2" />

      <div className="custom-container">
        <div className="custom-grid">

          {/* Image Side (Rosha Analyzing Business Graphic with Floating Cards) */}
          <div className={`custom-image-col ${rtlClass}`}>
            <div className="custom-image-card-wrapper group">

              {/* Glow backdrop behind image */}
              <div className="custom-image-glow" />

              {/* Image Frame Card */}
              <div className="custom-image-frame">
                <img
                  src={roshaAnalysisImage}
                  alt="RoshaLink Analyzing Business"
                  className="custom-img"
                />

                {/* Floating Glassmorphic Stat Pill #1 (Top Corner) */}
                <div className={`custom-stat-pill custom-stat-pill-1 animate-bounce-slow ${rtlClass}`}>
                  <div className="custom-stat-icon-1">
                    100%
                  </div>
                  <span className="custom-stat-text-1">
                    {isArabic ? 'تطوير مخصص' : isRTL ? 'توسعه اختصاصی' : 'Custom Built'}
                  </span>
                </div>

                {/* Floating Glassmorphic Stat Pill #2 (Bottom Corner) */}
                <div className={`custom-stat-pill custom-stat-pill-2 ${rtlClass}`}>
                  <div className="custom-stat-icon-2">
                    🚀
                  </div>
                  <div>
                    <div className="custom-stat-title-2">
                      {isArabic ? 'تحليل ونمو الأعمال' : isRTL ? 'تحلیل و رشد کسب‌وکار' : 'Business Growth'}
                    </div>
                    <div className="custom-stat-sub-2">
                      {isArabic ? 'مواقع وتطبيقات هاتف' : isRTL ? 'وب‌سایت و اپلیکیشن' : 'Web & Mobile App'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className={`custom-content-col ${rtlClass}`}>

            {/* Headline */}
            <h2 className="custom-title">
              <span className="custom-title-line">{t('customSolution.titlePrefix')}</span>
              <span className="emerald-text-shine custom-title-line break-words">
                {t('customSolution.titleGradient')}
              </span>
              <span className="block">{t('customSolution.titleSuffix')}</span>
            </h2>

            {/* Subtitle */}
            <p className="custom-subtitle">
              {t('customSolution.subtitle')}
            </p>

            {/* Action Buttons */}
            <div className="custom-action">
              <button
                onClick={onOpenGetStarted}
                className="custom-btn-primary"
              >
                <span>{t('customSolution.getStartedBtn')}</span>
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="custom-btn-secondary"
              >
                <span>{t('customSolution.exploreBtn')}</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Modal */}
      <CustomWebSolutionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </section>
  );
}
