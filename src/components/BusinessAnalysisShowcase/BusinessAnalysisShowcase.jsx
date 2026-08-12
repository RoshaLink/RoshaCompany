import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import videoSource from '../../assets/Rosha/HoldingLaptop/RoshaHoldingLaptop.mp4';
import BusinessAnalysisModal from './BusinessAnalysisModal';
import './BusinessAnalysisShowcase.css';

export default function BusinessAnalysisShowcase({ onOpenGetStarted, setActivePage }) {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative w-full py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-white via-sky-50/40 to-white text-slate-900 select-none">

      {/* Sky Blue Ambient Glow Orb */}
      <div className={`absolute top-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-sky-300/25 rounded-full blur-3xl pointer-events-none z-0 ${isRTL ? 'left-4' : 'right-4'}`} />

      <div className="w-full px-6 lg:px-12 xl:px-20 2xl:px-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-center">

          {/* Content Side */}
          <div className={`order-2 lg:col-span-7 space-y-5 lg:space-y-6 ${isRTL ? 'text-right lg:order-last' : 'text-left lg:order-first'}`}>

            {/* Headline */}
            <h2 className="uppercase text-[1.1rem] min-[360px]:text-xl min-[400px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black font-headline-xl text-slate-900 tracking-tight leading-relaxed lg:leading-[1.5] text-balance py-1 break-words">
              {t('businessAnalysis.titlePrefix')}{' '}
              <span className="uppercase blue-text-shine break-words">
                {t('businessAnalysis.titleGradient')}
              </span>{' '}
              {t('businessAnalysis.titleSuffix')}
            </h2>

            {/* Subtitle */}
            <p className="text-slate-600 text-sm sm:text-base lg:text-xl xl:text-2xl font-body-lg leading-relaxed mt-4 text-pretty max-w-3xl">
              {t('businessAnalysis.subtitle')}
            </p>

            {/* Action Buttons */}
            <div className={`pt-6 lg:pt-8 flex flex-nowrap sm:flex-wrap items-stretch justify-center sm:justify-start gap-2 sm:gap-4 ${isRTL ? 'justify-start' : 'justify-start'}`}>
              <button
                onClick={onOpenGetStarted}
                className="flex-1 sm:flex-none bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold font-label-md px-2 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-4 rounded-xl sm:rounded-full shadow-[0_4px_20px_rgba(56,189,248,0.4)] transition-all duration-300 flex items-center justify-center space-x-1 sm:space-x-2.5 rtl:space-x-reverse active:scale-95 cursor-pointer border border-sky-400/40 text-[10px] xs:text-[11px] sm:text-base lg:text-lg hover:shadow-[0_6px_25px_rgba(56,189,248,0.6)] text-center leading-tight"
              >
                <span>{t('businessAnalysis.button')}</span>

              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex-1 sm:flex-none bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold font-label-md text-[10px] xs:text-[11px] sm:text-base lg:text-lg py-3 px-2 sm:py-4 sm:px-7 lg:px-9 lg:py-4 rounded-xl sm:rounded-full cursor-pointer transition-all duration-300 hover:border-sky-500 shadow-sm hover:shadow-md text-center leading-tight flex items-center justify-center"
              >
                <span>{t('businessAnalysis.exploreBtn')}</span>
              </button>
            </div>

          </div>

          {/* Video Side (Blue Glassmorphic Border Card Frame) */}
          <div className={`order-1 lg:col-span-5 relative flex justify-center ${isRTL ? 'lg:justify-start lg:order-first' : 'lg:justify-end lg:order-last'}`}>
            <div className="relative w-full max-w-[480px] lg:max-w-[560px] xl:max-w-[600px] group">

              {/* Outer Glow Ring */}
              <div className="absolute -inset-3 bg-gradient-to-r from-sky-400/20 to-blue-500/20 rounded-3xl blur-2xl group-hover:opacity-100 transition duration-500" />

              {/* Glassmorphic Frame Card */}
              <div className="relative rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl border-2 border-sky-400/60 shadow-[0_20px_50px_rgba(56,189,248,0.2)] p-3 sm:p-4 lg:p-6 transition-all duration-300 group-hover:border-sky-500 flex items-center justify-center">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto max-h-[380px] lg:max-h-[460px] xl:max-h-[520px] object-contain rounded-2xl"
                >
                  <source src={videoSource} type="video/mp4" />
                </video>
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
