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
    <section className="relative w-full py-12 lg:py-20 overflow-hidden bg-white text-slate-900 select-none">
      
      {/* Desktop Background Video Container */}
      <div className={`hidden lg:flex absolute inset-0 w-full h-full overflow-hidden z-0 bg-white items-center ${isRTL ? 'justify-end lg:pl-12 xl:pl-24' : 'justify-start lg:pl-12 xl:pl-24'}`}>
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

      <div className="max-w-[1280px] mx-auto w-full px-4 sm:px-8 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Mobile/Tablet Video View */}
          <div className="block lg:hidden w-full max-w-[480px] mx-auto flex justify-center">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto max-h-[380px] object-contain rounded-2xl shadow-md border border-slate-200"
            >
              <source src={videoSource} type="video/mp4" />
            </video>
          </div>

          {/* Text Content */}
          <div className={`lg:col-span-6 lg:col-start-7 space-y-4 sm:space-y-6 ${isRTL ? 'text-right' : 'text-left lg:text-right'}`}>
            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] xl:text-[35px] font-black font-headline-xl text-slate-900 leading-snug sm:leading-tight tracking-tight">
              <span className="block mb-1">{t('businessAnalysis.titlePrefix')}</span>
              <span className="inline-block uppercase text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-700 to-indigo-700 mb-1">
                {t('businessAnalysis.titleGradient')}
              </span>
              <span className="block">{t('businessAnalysis.titleSuffix')}</span>
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-base font-body-lg text-slate-700 font-medium leading-relaxed">
              {t('businessAnalysis.subtitle')}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
