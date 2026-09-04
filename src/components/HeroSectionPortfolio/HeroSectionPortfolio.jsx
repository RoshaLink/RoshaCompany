import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import diaraPortfolioImage from '../../assets/Diara/Portfolio/DiaraPotfolio.webp';
import PortfolioServicesModal from './PortfolioServicesModal';
import './HeroSectionPortfolio.css';

export default function HeroSectionPortfolio({ onOpenGetStarted, setActivePage }) {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());
  const [pillarsModalOpen, setPillarsModalOpen] = useState(false);

  return (
    <section className="portfolio-hero-section">
      {/* Background ambient lighting effects */}
      <div className="portfolio-hero-glow-1" />
      <div className="portfolio-hero-glow-2" />

      <div className="portfolio-hero-container">
        <div className={`portfolio-hero-flex-wrapper ${isRTL ? 'is-rtl' : ''}`}>

          {/* Content Side (Headline, Subtitle & Action Buttons) */}
          <div className={`portfolio-hero-content-side space-y-6 lg:space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>

            {/* Headline */}
            <h1 className="portfolio-hero-title font-extrabold leading-tight tracking-tight">
              <span>{t('portfolioHero.titlePrefix')}</span>{' '}
              <span className="sky-blue-text-shine uppercase">
                {t('portfolioHero.titleGradient')}
              </span>{' '}
              <span>{t('portfolioHero.titleSuffix')}</span>
            </h1>

            {/* Subtitle / Description */}
            <p className="portfolio-hero-subtitle leading-relaxed">
              {t('portfolioHero.subtitle')}
            </p>

            {/* Action Buttons Side-by-Side */}
            <div className="pt-2 flex flex-row items-center gap-2.5 sm:gap-4 w-full max-w-xl">

              {/* Primary Action Button */}
              <button
                onClick={onOpenGetStarted}
                className="flex-1 sm:flex-initial bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs sm:text-base px-3.5 py-3 sm:px-8 sm:py-4 rounded-xl shadow-lg hover:shadow-sky-500/30 flex items-center justify-center gap-1.5 sm:gap-2.5 transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>{t('portfolioHero.buildBtn')}</span>
                <ArrowRight className={`w-3.5 h-3.5 sm:w-5 sm:h-5 shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
              </button>

              {/* Secondary White Button: Services Modal Trigger */}
              <button
                onClick={() => setPillarsModalOpen(true)}
                className="flex-1 sm:flex-initial bg-white dark:bg-white text-black dark:text-black border border-slate-200 dark:border-slate-300 font-bold text-xs sm:text-base px-3.5 py-3 sm:px-8 sm:py-4 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5 hover:bg-slate-50 dark:hover:bg-slate-100 flex items-center justify-center text-center"
              >
                <span>{t('portfolioHero.viewPillarsBtn')}</span>
              </button>

            </div>

          </div>

          {/* Image Side (DiaraPortfolio Image with Glassmorphic Badge & Floating Accents) */}
          <div className="portfolio-hero-image-side">
            <div className="relative w-full max-w-[540px] xl:max-w-[660px] 2xl:max-w-[760px] group">

              {/* Ambient Glow backdrop behind image */}
              <div className="absolute -inset-4 bg-gradient-to-r from-sky-400/20 via-indigo-500/20 to-purple-500/20 rounded-3xl blur-2xl group-hover:opacity-100 transition duration-500" />

              {/* Glassmorphic Frame Card */}
              <div className="portfolio-hero-card-frame">
                <img
                  src={diaraPortfolioImage}
                  alt="Diara Portfolio Showcase"
                  className="w-full h-auto max-h-[520px] xl:max-h-[620px] 2xl:max-h-[720px] object-cover rounded-2xl transform group-hover:scale-[1.02] transition-transform duration-500"
                 width="1376" height="768" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Services / 6 Pillars Modal Component */}
      <PortfolioServicesModal
        isOpen={pillarsModalOpen}
        onClose={() => setPillarsModalOpen(false)}
      />
    </section>
  );
}
