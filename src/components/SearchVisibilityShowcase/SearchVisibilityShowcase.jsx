import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import videoSource from '../../assets/Diara/YourWebsiteHere/DiaraYourWebsiteHere.mp4';
import './SearchVisibilityShowcase.css';

export default function SearchVisibilityShowcase({ onOpenGetStarted, setActivePage }) {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());

  return (
    <section className="relative w-full py-14 lg:py-20 overflow-hidden bg-gradient-to-b from-white via-sky-50/40 to-white text-slate-900 select-none">

      {/* Sky Blue Ambient Glow Orbs */}
      <div className={`absolute top-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-sky-300/30 rounded-full blur-3xl pointer-events-none z-0 ${isRTL ? 'right-4' : 'left-4'}`} />
      <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Content Side */}
          <div className={`lg:col-span-6 space-y-5 ${isRTL ? 'text-right lg:order-first' : 'text-left lg:order-first'}`}>

            {/* Headline */}
            <h2 className="search-visibility-title text-3xl sm:text-4xl lg:text-5xl font-black font-headline-xl text-slate-900 tracking-tight">
              {t('searchVisibility.titlePrefix')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600">
                {t('searchVisibility.titleGradient')}
              </span>{' '}
              {t('searchVisibility.titleSuffix')}
            </h2>

            {/* Subtitle */}
            <p className="search-visibility-subtitle text-slate-600 text-sm sm:text-base font-body-lg leading-relaxed">
              {t('searchVisibility.subtitle')}
            </p>

            {/* CTA Button */}
            <div className={`pt-2 flex flex-wrap items-center gap-3 ${isRTL ? 'justify-start' : 'justify-start'}`}>
              <button
                onClick={onOpenGetStarted}
                className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold font-label-md px-7 py-3.5 rounded-full shadow-[0_4px_25px_rgba(56,189,248,0.5)] transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse active:scale-95 cursor-pointer border border-sky-400/40 text-xs sm:text-sm"
              >
                <span>{t('searchVisibility.button')}</span>
                <ArrowRight className="w-4 h-4 text-white rtl:rotate-180" />
              </button>
            </div>

          </div>

          {/* Video Side (Blue Glassmorphic Border Card Frame) */}
          <div className={`lg:col-span-6 relative flex justify-center ${isRTL ? 'lg:order-last' : 'lg:order-last'}`}>
            <div className="relative w-full max-w-[480px] group">

              {/* Outer Glow Ring */}
              <div className="absolute -inset-3 bg-gradient-to-r from-sky-400/20 to-blue-500/20 rounded-3xl blur-2xl group-hover:opacity-100 transition duration-500" />

              {/* Glassmorphic Frame Card */}
              <div className="relative rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl border-2 border-sky-400/60 shadow-[0_20px_50px_rgba(56,189,248,0.2)] p-3 sm:p-4 transition-all duration-300 group-hover:border-sky-500 flex items-center justify-center">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto max-h-[400px] object-contain rounded-2xl"
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
