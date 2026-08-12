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

  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <section className="relative w-full py-16 lg:py-24 bg-gradient-to-b from-white via-green-50/70 to-white overflow-hidden select-none">

      {/* Background ambient lighting effects */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-green-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full px-6 lg:px-12 xl:px-20 2xl:px-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-center">

          {/* Image Side (Rosha Analyzing Business Graphic with Floating Cards) */}
          <div className={`order-1 lg:col-span-5 relative flex justify-center ${isRTL ? 'lg:justify-end lg:order-last' : 'lg:justify-start lg:order-first'}`}>
            <div className="relative w-full max-w-[540px] group">

              {/* Glow backdrop behind image */}
              <div className="absolute -inset-4 bg-gradient-to-r from-green-300/40 to-emerald-400/40 rounded-3xl blur-2xl group-hover:opacity-100 transition duration-500" />

              {/* Image Frame Card */}
              <div className="relative rounded-3xl overflow-hidden bg-white/70 backdrop-blur-xl border border-slate-200/80 shadow-[0_20px_50px_rgba(16,185,129,0.12)] p-4 sm:p-6 transition-all duration-300 group-hover:border-emerald-300">
                <img
                  src={roshaAnalysisImage}
                  alt="RoshaLink Analyzing Business"
                  className="w-full h-auto object-contain rounded-2xl transform group-hover:scale-[1.02] transition-transform duration-500"
                />

                {/* Floating Glassmorphic Stat Pill #1 (Top Corner) */}
                <div className={`absolute top-8 ${isRTL ? 'left-6' : 'right-6'} hidden sm:flex items-center gap-2.5 p-3 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-lg animate-bounce-slow`}>
                  <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-md">
                    100%
                  </div>
                  <span className="text-xs font-bold text-slate-800">
                    {isArabic ? 'تطوير مخصص' : isRTL ? 'توسعه اختصاصی' : 'Custom Built'}
                  </span>
                </div>

                {/* Floating Glassmorphic Stat Pill #2 (Bottom Corner) */}
                <div className={`absolute bottom-8 ${isRTL ? 'right-6' : 'left-6'} hidden sm:flex items-center gap-2.5 p-3 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-lg`}>
                  <div className="w-8 h-8 rounded-xl bg-sky-500 text-white flex items-center justify-center text-xs font-bold shadow-md">
                    🚀
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-900 leading-tight">
                      {isArabic ? 'تحليل ونمو الأعمال' : isRTL ? 'تحلیل و رشد کسب‌وکار' : 'Business Growth'}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {isArabic ? 'مواقع وتطبيقات هاتف' : isRTL ? 'وب‌سایت و اپلیکیشن' : 'Web & Mobile App'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className={`order-2 lg:col-span-7 space-y-5 lg:space-y-6 w-full max-w-2xl xl:max-w-3xl ${isRTL ? 'text-right lg:order-first lg:mr-auto lg:pl-6 xl:pl-10' : 'text-left lg:order-last lg:ml-auto lg:pr-6 xl:pr-10'}`}>

            {/* Headline */}
            <h2 className="uppercase text-[1.1rem] min-[360px]:text-xl min-[400px]:text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black font-headline-xl text-slate-900 leading-snug sm:leading-tight tracking-tight text-balance break-words">
              <span className="block mb-1">{t('customSolution.titlePrefix')}</span>
              <span className="uppercase emerald-text-shine mb-1 break-words">
                {t('customSolution.titleGradient')}
              </span>
              <span className="block">{t('customSolution.titleSuffix')}</span>
            </h2>

            {/* Subtitle */}
            <p className="text-slate-600 text-sm sm:text-base lg:text-lg xl:text-xl font-body-lg leading-relaxed text-pretty max-w-xl lg:max-w-2xl">
              {t('customSolution.subtitle')}
            </p>

            {/* Action Buttons */}
            <div className={`pt-6 lg:pt-8 flex flex-nowrap sm:flex-wrap items-stretch justify-center sm:justify-start gap-2 sm:gap-4 ${isRTL ? 'justify-start' : 'justify-start'}`}>
              <button
                onClick={onOpenGetStarted}
                className="flex-1 sm:flex-none bg-gradient-to-r from-emerald-500 via-teal-600 to-sky-600 hover:from-emerald-600 hover:to-sky-700 text-white font-bold font-label-md px-2 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-4 rounded-xl sm:rounded-full shadow-[0_4px_20px_rgba(16,185,129,0.4)] transition-all duration-300 flex items-center justify-center space-x-1 sm:space-x-2.5 rtl:space-x-reverse active:scale-95 cursor-pointer border border-emerald-400/40 text-[10px] xs:text-[11px] sm:text-base lg:text-lg hover:shadow-[0_6px_25px_rgba(16,185,129,0.6)] text-center leading-tight"
              >
                <span>{t('customSolution.getStartedBtn')}</span>

              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex-1 sm:flex-none bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold font-label-md text-[10px] xs:text-[11px] sm:text-base lg:text-lg py-3 px-2 sm:py-4 sm:px-7 lg:px-9 lg:py-4 rounded-xl sm:rounded-full cursor-pointer transition-all duration-300 hover:border-emerald-500 shadow-sm hover:shadow-md text-center leading-tight flex items-center justify-center"
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
