import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Sparkles, Lightbulb, Layers, TrendingUp, Zap, ShieldCheck, Users, X } from 'lucide-react';
import diaraPortfolioImage from '../../assets/Diara/Portfolio/DiaraPotfolio.jpeg';
import './HeroSectionPortfolio.css';

export default function HeroSectionPortfolio({ onOpenGetStarted, setActivePage }) {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());
  const [pillarsModalOpen, setPillarsModalOpen] = useState(false);

  const pillars = [
    {
      icon: Lightbulb,
      title: t('portfolioHero.feature1Title'),
      desc: t('portfolioHero.feature1Desc'),
      color: "from-amber-500 to-orange-600"
    },
    {
      icon: Layers,
      title: t('portfolioHero.feature2Title'),
      desc: t('portfolioHero.feature2Desc'),
      color: "from-sky-500 to-indigo-600"
    },
    {
      icon: TrendingUp,
      title: t('portfolioHero.feature3Title'),
      desc: t('portfolioHero.feature3Desc'),
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: Zap,
      title: t('portfolioHero.feature4Title'),
      desc: t('portfolioHero.feature4Desc'),
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: ShieldCheck,
      title: t('portfolioHero.feature5Title'),
      desc: t('portfolioHero.feature5Desc'),
      color: "from-rose-500 to-red-600"
    },
    {
      icon: Users,
      title: t('portfolioHero.feature6Title'),
      desc: t('portfolioHero.feature6Desc'),
      color: "from-cyan-500 to-blue-600"
    }
  ];

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
            <h1 className="portfolio-hero-title font-black leading-tight tracking-tight">
              <span className="block mb-1">{t('portfolioHero.titlePrefix')}</span>
              <span className="sky-blue-text-shine uppercase mb-1">
                {t('portfolioHero.titleGradient')}
              </span>
              <span className="block">{t('portfolioHero.titleSuffix')}</span>
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

              {/* Secondary White Button: 6 Pillars Modal Trigger */}
              <button
                onClick={() => setPillarsModalOpen(true)}
                className="flex-1 sm:flex-initial bg-white dark:bg-white text-black dark:text-black border border-slate-200 dark:border-slate-300 font-bold text-xs sm:text-base px-3.5 py-3 sm:px-8 sm:py-4 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5 hover:bg-slate-50 dark:hover:bg-slate-100 flex items-center justify-center text-center"
              >
                <span>{t('portfolioHero.viewPillarsBtn', { defaultValue: 'Hur vi kan hjälpa dig' })}</span>
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
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* STRATEGIC PILLARS GLASSMORPHIC MODAL */}
      {pillarsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in select-text">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4 shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
              <div className="space-y-1 text-left rtl:text-right">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {t('portfolioHero.modalTitle')}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
                  {t('portfolioHero.modalSubtitle')}
                </p>
              </div>

              <button
                onClick={() => setPillarsModalOpen(false)}
                className="p-2.5 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Close Modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body: 6 Pillars Grid */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {pillars.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div 
                      key={index} 
                      className={`p-5 rounded-2xl bg-slate-50/90 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/70 hover:border-sky-500/50 dark:hover:border-sky-500/50 hover:shadow-xl transition-all duration-300 flex items-start gap-4 group ${isRTL ? 'text-right' : 'text-left'}`}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 sm:p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-wrap items-center justify-between gap-4 shrink-0">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                6/6 Core Digital Pillars
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setPillarsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {t('portfolioHero.modalClose', { defaultValue: 'Stäng' })}
                </button>
                <button
                  onClick={() => {
                    setPillarsModalOpen(false);
                    onOpenGetStarted && onOpenGetStarted();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold shadow-md hover:shadow-sky-500/30 transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>{t('portfolioHero.buildBtn')}</span>
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
