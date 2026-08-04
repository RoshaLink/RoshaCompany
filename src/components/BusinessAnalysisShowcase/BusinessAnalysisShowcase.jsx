import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, CheckCircle2, ArrowRight, Laptop, BarChart3 } from 'lucide-react';
import videoSource from '../../assets/Rosha/HoldingLaptop/RoshaHoldingLaptop.mp4';
import './BusinessAnalysisShowcase.css';

export default function BusinessAnalysisShowcase({ onOpenGetStarted, setActivePage }) {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());

  const bullets = [
    t('businessAnalysis.bullet1'),
    t('businessAnalysis.bullet2'),
    t('businessAnalysis.bullet3'),
  ];

  return (
    <section className="relative w-full min-h-[580px] md:min-h-[660px] overflow-hidden bg-white text-slate-900 my-8 flex items-center select-none">

      {/* Full Background Video - Aligned to Left */}
      <div className={`absolute inset-0 w-full h-full overflow-hidden z-0 bg-white flex items-center ${isRTL ? 'justify-end lg:pl-12 xl:pl-24' : 'justify-start lg:pl-12 xl:pl-24'}`}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full max-h-[85vh] lg:max-h-[95vh] lg:max-w-[65%] xl:max-w-[60%] object-contain object-left"
        >
          <source src={videoSource} type="video/mp4" />
        </video>
      </div>



      {/* Content Area - Overlay Text (Positioned to the right) */}
      <div className="relative z-10 max-w-[1280px] mx-auto w-full px-4 sm:px-8 md:px-12 py-12 flex items-center pointer-events-none">
        <div className="w-full max-w-[380px] sm:max-w-[460px] md:max-w-[540px] lg:max-w-[580px] space-y-4 md:space-y-6 pointer-events-auto text-right mr-0 ml-auto pr-0 sm:pr-2">


          {/* Headline */}
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] xl:text-[35px] font-black font-headline-xl text-slate-900 leading-snug sm:leading-tight tracking-tight drop-shadow-[0_2px_12px_rgba(255,255,255,0.95)]">
            <span className="block mb-1">{t('businessAnalysis.titlePrefix')}</span>
            <span className="inline-block uppercase text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-700 to-indigo-700 mb-1">
              {t('businessAnalysis.titleGradient')}
            </span>
            <span className="block">{t('businessAnalysis.titleSuffix')}</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm md:text-base font-body-lg text-slate-800 font-semibold leading-relaxed drop-shadow-[0_1px_8px_rgba(255,255,255,0.95)]">
            {t('businessAnalysis.subtitle')}
          </p>



        </div>
      </div>
    </section>
  );
}
