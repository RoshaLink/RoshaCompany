import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Sparkles, Lightbulb, Layers, TrendingUp } from 'lucide-react';
import diaraPortfolioImage from '../../assets/Diara/Portfolio/DiaraPotfolio.jpeg';

export default function HeroSectionPortfolio({ onOpenGetStarted, setActivePage }) {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());

  const features = [
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
    }
  ];

  return (
    <section className="relative w-full pt-28 pb-16 lg:pt-36 lg:pb-24 bg-white overflow-hidden select-none">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-sky-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Image Side (DiaraPortfolio Image with Glassmorphic Badge & Floating Accents) */}
          <div className={`lg:col-span-6 relative flex justify-center ${isRTL ? 'lg:order-last' : 'lg:order-last'}`}>
            <div className="relative w-full max-w-[540px] group">

              {/* Ambient Glow backdrop behind image */}
              <div className="absolute -inset-4 bg-gradient-to-r from-sky-400/20 via-indigo-500/20 to-purple-500/20 rounded-3xl blur-2xl group-hover:opacity-100 transition duration-500" />

              {/* Glassmorphic Frame Card */}
              <div className="relative rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl border border-slate-200/90 shadow-[0_20px_50px_rgba(56,189,248,0.15)] p-3 sm:p-5 transition-all duration-300 group-hover:border-sky-300">
                <img
                  src={diaraPortfolioImage}
                  alt="Diara Portfolio Showcase"
                  className="w-full h-auto max-h-[520px] object-cover rounded-2xl transform group-hover:scale-[1.02] transition-transform duration-500"
                />

                {/* Floating Glassmorphic Pill */}
                <div className={`absolute bottom-6 ${isRTL ? 'right-6' : 'left-6'} flex items-center gap-3 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl`}>
                  <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold shadow-md">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 leading-tight">
                      {t('portfolioHero.pillTitle')}
                    </div>
                    <div className="text-[11px] text-sky-600 font-semibold">
                      {t('portfolioHero.pillSubtitle')}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className={`lg:col-span-6 space-y-6 ${isRTL ? 'text-right lg:order-first' : 'text-left lg:order-first'}`}>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[38px] xl:text-[44px] font-black text-slate-900 leading-tight tracking-tight">
              <span className="block mb-1">{t('portfolioHero.titlePrefix')}</span>
              <span className="inline-block uppercase text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 mb-1">
                {t('portfolioHero.titleGradient')}
              </span>
              <span className="block">{t('portfolioHero.titleSuffix')}</span>
            </h1>

            {/* Subtitle / Description */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {t('portfolioHero.subtitle')}
            </p>

            {/* Features Bullet List */}
            <div className="space-y-4 pt-2">
              {features.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className={`flex items-start gap-4 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:shadow-md transition-all ${isRTL ? 'flex-row' : 'flex-row'}`}>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shrink-0 shadow-md`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="text-sm font-extrabold text-slate-900">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className={`pt-4 flex flex-wrap items-center gap-4 ${isRTL ? 'justify-start' : 'justify-start'}`}>
              <button
                onClick={onOpenGetStarted}
                className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm px-7 py-3.5 rounded-xl shadow-lg hover:shadow-sky-500/30 flex items-center gap-2 transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>{t('portfolioHero.buildBtn')}</span>
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
