import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import roshaSalesImage from '../../assets/Rosha/IncreasSaleAndSeo/RoshaIncrasesSales.png';
import FeaturesModal from './FeaturesModal';
import './SalesAndSeoShowcase.css';

export default function SalesAndSeoShowcase({ onOpenGetStarted }) {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());
  const isArabic = (i18n.language || '').toLowerCase() === 'ar';

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative w-full py-16 lg:py-24 bg-gradient-to-b from-white via-emerald-50/30 to-white overflow-hidden select-none">

      {/* Background ambient lighting effects */}
      <div className={`absolute top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-300/20 rounded-full blur-3xl pointer-events-none z-0 ${isRTL ? 'left-10' : 'right-10'}`} />
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-teal-200/20 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="w-full px-6 lg:px-12 xl:px-20 2xl:px-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-center">

          {/* Content Side */}
          <div className={`order-2 lg:col-span-7 flex flex-col justify-center xl:pr-12 2xl:pr-16 rtl:xl:pl-12 rtl:2xl:pl-16 rtl:xl:pr-0 rtl:2xl:pr-0 ${isRTL ? 'lg:items-start lg:order-first' : 'lg:items-end lg:order-last'}`}>
            <div className={`w-full max-w-2xl xl:max-w-[720px] 2xl:max-w-[800px] space-y-5 lg:space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>

              {/* Headline */}
              <h2 className="text-[1.1rem] min-[360px]:text-xl min-[400px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black font-headline-xl text-slate-900 tracking-tight leading-relaxed lg:leading-[1.6] text-balance pb-2 py-1 break-words">
                {t('salesAndSeo.titlePrefix')}{' '}
                <span className="uppercase emerald-text-shine break-words">
                  {t('salesAndSeo.titleGradient')}
                </span>{' '}
                {t('salesAndSeo.titleSuffix')}
              </h2>

              {/* Subtitle */}
              <p className="text-slate-600 text-sm sm:text-base lg:text-xl xl:text-2xl font-body-lg leading-relaxed mt-4 text-pretty max-w-3xl">
                {t('salesAndSeo.subtitle')}
              </p>
              {/* Action Buttons */}
              <div className={`pt-6 lg:pt-8 flex flex-nowrap sm:flex-wrap items-stretch justify-center sm:justify-start gap-2 sm:gap-4 ${isRTL ? 'justify-start' : 'justify-start'}`}>
                <button
                  onClick={onOpenGetStarted}
                  className="flex-1 sm:flex-none bg-gradient-to-r from-emerald-500 via-teal-600 to-sky-600 hover:from-emerald-600 hover:to-sky-700 text-white font-bold font-label-md px-2 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-4 rounded-xl sm:rounded-full shadow-[0_4px_20px_rgba(16,185,129,0.4)] transition-all duration-300 flex items-center justify-center space-x-1 sm:space-x-2.5 rtl:space-x-reverse active:scale-95 cursor-pointer border border-emerald-400/40 text-[10px] xs:text-[11px] sm:text-base lg:text-lg hover:shadow-[0_6px_25px_rgba(16,185,129,0.6)] text-center leading-tight"
                >
                  <span>{t('salesAndSeo.boostBtn')}</span>

                </button>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex-1 sm:flex-none bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold font-label-md text-[10px] xs:text-[11px] sm:text-base lg:text-lg py-3 px-2 sm:py-4 sm:px-7 lg:px-9 lg:py-4 rounded-xl sm:rounded-full cursor-pointer transition-all duration-300 hover:border-emerald-500 shadow-sm hover:shadow-md text-center leading-tight flex items-center justify-center"
                >
                  <span>{t('salesAndSeo.exploreBtn')}</span>
                </button>
              </div>

            </div>

          </div>

          {/* Image Side (Rosha Increases Sales & SEO Graphic) */}
          <div className={`order-1 lg:col-span-5 relative flex justify-center ${isRTL ? 'lg:justify-end lg:order-last' : 'lg:justify-start lg:order-first'}`}>
            <div className="relative w-full max-w-[540px] lg:max-w-[560px] xl:max-w-[680px] group">

              {/* Outer Glow Ring behind card */}
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400/20 via-teal-500/20 to-sky-500/20 rounded-3xl blur-2xl group-hover:opacity-100 transition duration-500" />

              {/* Glassmorphic Frame Card */}
              <div className="relative rounded-3xl overflow-hidden bg-white/70 backdrop-blur-xl border border-slate-200/80 shadow-[0_20px_50px_rgba(16,185,129,0.12)] p-4 sm:p-6 transition-all duration-300 group-hover:border-emerald-300">
                <img
                  src={roshaSalesImage}
                  alt="RoshaLink Increases Sales and SEO"
                  className="w-full h-auto object-contain rounded-2xl transform group-hover:scale-[1.02] transition-transform duration-500"
                />

                {/* Floating Glassmorphic Stat Pill #1 (Sales Growth) */}
                <div className={`absolute top-8 ${isRTL ? 'right-6' : 'left-6'} hidden sm:flex items-center gap-2.5 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-lg`}>
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center text-xs font-black shadow-md">
                    +350%
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-900 leading-tight">
                      {isArabic ? 'نمو المبيعات' : isRTL ? 'افزایش فروش' : 'Sales Growth'}
                    </div>
                    <div className="text-[10px] text-emerald-600 font-semibold">
                      {isArabic ? 'معدل تحويل عالٍ' : isRTL ? 'نرخ تبدیل بالا' : 'High CRO Rate'}
                    </div>
                  </div>
                </div>

                {/* Floating Glassmorphic Stat Pill #2 (Google #1 Ranking) */}
                <div className={`absolute bottom-8 ${isRTL ? 'left-6' : 'right-6'} hidden sm:flex items-center gap-2.5 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-lg`}>
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center text-xs font-black shadow-md">
                    #1
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-900 leading-tight">
                      {isArabic ? 'المرتبة الأولى في جوجل' : isRTL ? 'رتبه اول گوگل' : 'Google #1 Rank'}
                    </div>
                    <div className="text-[10px] text-sky-600 font-semibold">
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
