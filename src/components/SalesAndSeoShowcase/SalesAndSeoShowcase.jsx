import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Check } from 'lucide-react';
import roshaSalesImage from '../../assets/Rosha/IncreasSaleAndSeo/RoshaIncrasesSales.webp';
import FeaturesModal from './FeaturesModal';
import './SalesAndSeoShowcase.css';

export default function SalesAndSeoShowcase({ onOpenGetStarted }) {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());
  const isArabic = (i18n.language || '').toLowerCase() === 'ar';
  const rtlClass = isRTL ? 'is-rtl' : 'is-ltr';

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="sales-section">

      {/* Background ambient lighting effects */}
      <div className={`sales-glow-1 ${rtlClass}`} />
      <div className="sales-glow-2" />

      <div className="sales-container">
        <div className="sales-grid">

          {/* Content Side */}
          <div className={`sales-content-col ${rtlClass}`}>
            <div className={`sales-content-inner ${rtlClass}`}>

              {/* Headline */}
              <h2 className="sales-title">
                {t('salesAndSeo.titlePrefix')}{' '}
                <span className="uppercase emerald-text-shine break-words">
                  {t('salesAndSeo.titleGradient')}
                </span>{' '}
                {t('salesAndSeo.titleSuffix')}
              </h2>

              {/* Subtitle */}
              <p className="sales-subtitle">
                {t('salesAndSeo.subtitle')}
              </p>
              {/* Action Buttons */}
              <div className="sales-action">
                <button
                  onClick={onOpenGetStarted}
                  className="sales-btn-primary"
                >
                  <span>{t('salesAndSeo.boostBtn')}</span>
                </button>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="sales-btn-secondary"
                >
                  <span>{t('salesAndSeo.exploreBtn')}</span>
                </button>
              </div>

            </div>

          </div>

          {/* Image Side (Rosha Increases Sales & SEO Graphic) */}
          <div className={`sales-image-col ${rtlClass}`}>
            <div className="sales-image-card-wrapper group">

              {/* Outer Glow Ring behind card */}
              <div className="sales-image-glow" />

              {/* Glassmorphic Frame Card */}
              <div className="sales-image-frame">
                <img
                  src={roshaSalesImage}
                  alt="RoshaLink Increases Sales and SEO"
                  className="sales-img"
                 width="1536" height="1024" loading="lazy" />

                {/* Floating Glassmorphic Stat Pill #1 (Sales Growth) */}
                <div className={`sales-stat-pill sales-stat-pill-1 ${rtlClass}`}>
                  <div className="sales-stat-icon-1">
                    <Check className="w-4 h-4 text-white stroke-[3]" />
                  </div>
                  <div>
                    <div className="sales-stat-text-title">
                      {isArabic ? 'نمو المبيعات' : isRTL ? 'افزایش فروش' : 'Sales Growth'}
                    </div>
                    <div className="sales-stat-text-sub1">
                      {isArabic ? 'معدل تحويل عالٍ' : isRTL ? 'نرخ تبدیل بالا' : 'High CRO Rate'}
                    </div>
                  </div>
                </div>

                {/* Floating Glassmorphic Stat Pill #2 (Google #1 Ranking) */}
                <div className={`sales-stat-pill sales-stat-pill-2 ${rtlClass}`}>
                  <div className="sales-stat-icon-2">
                    #1
                  </div>
                  <div>
                    <div className="sales-stat-text-title">
                      {isArabic ? 'المرتبة الأولى في جوجل' : isRTL ? 'رتبه اول گوگل' : 'Google #1 Rank'}
                    </div>
                    <div className="sales-stat-text-sub2">
                      {isArabic ? 'ظهور كامل' : isRTL ? 'دیدپذیری کامل' : 'Top Visibility'}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Modal */}
      <FeaturesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
