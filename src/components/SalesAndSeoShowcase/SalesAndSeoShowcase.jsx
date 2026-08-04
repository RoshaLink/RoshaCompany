import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, TrendingUp, Search, Zap } from 'lucide-react';
import roshaSalesImage from '../../assets/Rosha/IncreasSaleAndSeo/RoshaIncrasesSales.png';
import './SalesAndSeoShowcase.css';

export default function SalesAndSeoShowcase({ onOpenGetStarted, setActivePage }) {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());
  const isArabic = (i18n.language || '').toLowerCase() === 'ar';

  const highlights = [
    {
      icon: TrendingUp,
      title: t('salesAndSeo.highlight1Title'),
      desc: t('salesAndSeo.highlight1Desc'),
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: Search,
      title: t('salesAndSeo.highlight2Title'),
      desc: t('salesAndSeo.highlight2Desc'),
      color: "from-sky-500 to-blue-600"
    },
    {
      icon: Zap,
      title: t('salesAndSeo.highlight3Title'),
      desc: t('salesAndSeo.highlight3Desc'),
      color: "from-amber-500 to-orange-600"
    }
  ];

  return (
    <section className="relative w-full py-16 lg:py-24 bg-gradient-to-b from-white via-emerald-50/30 to-white overflow-hidden select-none">

      {/* Background ambient lighting effects */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Content Side */}
          <div className={`lg:col-span-6 space-y-6 ${isRTL ? 'text-right lg:order-first' : 'text-left lg:order-last'}`}>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] xl:text-[35px] font-black font-headline-xl text-slate-900 leading-snug sm:leading-tight tracking-tight">
              <span className="block mb-1">{t('salesAndSeo.titlePrefix')}</span>
              <span className="inline-block uppercase text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 mb-1">
                {t('salesAndSeo.titleGradient')}
              </span>
              <span className="block">{t('salesAndSeo.titleSuffix')}</span>
            </h2>

            {/* Subtitle */}
            <p className="text-slate-600 text-sm sm:text-base font-body-lg leading-relaxed">
              {t('salesAndSeo.subtitle')}
            </p>

            {/* Highlights List */}
            <div className="space-y-4 pt-2">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-4 group/item">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${item.color} text-white shadow-md shadow-emerald-500/15 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
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
                className="bg-gradient-to-r from-emerald-500 via-teal-600 to-sky-600 hover:from-emerald-600 hover:to-sky-700 text-white font-bold font-label-md px-7 py-3.5 rounded-full shadow-[0_4px_25px_rgba(16,185,129,0.4)] transition-all duration-300 flex items-center justify-center space-x-2.5 rtl:space-x-reverse active:scale-95 cursor-pointer text-xs sm:text-sm border border-emerald-400/40 hover:shadow-[0_6px_30px_rgba(16,185,129,0.6)]"
              >
                <span>{t('salesAndSeo.boostBtn')}</span>
                <ArrowRight className="w-4 h-4 text-white rtl:rotate-180" />
              </button>

              <button
                onClick={() => setActivePage ? setActivePage('services') : null}
                className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold font-label-md text-xs sm:text-sm py-3.5 px-6 rounded-full cursor-pointer transition-all duration-300 hover:border-emerald-500 shadow-sm hover:shadow-md"
              >
                <span>{t('salesAndSeo.exploreBtn')}</span>
              </button>
            </div>

          </div>

          {/* Image Side (Rosha Increases Sales & SEO Graphic) */}
          <div className={`lg:col-span-6 relative flex justify-center ${isRTL ? 'lg:order-last' : 'lg:order-first'}`}>
            <div className="relative w-full max-w-[540px] group">

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
    </section>
  );
}
