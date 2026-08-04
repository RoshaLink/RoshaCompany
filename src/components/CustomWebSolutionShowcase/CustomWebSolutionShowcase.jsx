import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, BarChart3, Layout, Rocket, Sparkles } from 'lucide-react';
import roshaAnalysisImage from '../../assets/Rosha/AnalyisYourBusiness/RoshaAnalyisYourBusiness.png';
import './CustomWebSolutionShowcase.css';

export default function CustomWebSolutionShowcase({ onOpenGetStarted, setActivePage }) {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());
  const isArabic = (i18n.language || '').toLowerCase() === 'ar';

  const features = [
    {
      icon: BarChart3,
      title: t('customSolution.feature1Title'),
      desc: t('customSolution.feature1Desc'),
      color: "from-sky-500 to-blue-600"
    },
    {
      icon: Layout,
      title: t('customSolution.feature2Title'),
      desc: t('customSolution.feature2Desc'),
      color: "from-blue-600 to-indigo-600"
    },
    {
      icon: Rocket,
      title: t('customSolution.feature3Title'),
      desc: t('customSolution.feature3Desc'),
      color: "from-indigo-500 to-purple-600"
    }
  ];

  return (
    <section className="relative w-full py-16 lg:py-24 bg-gradient-to-b from-white via-sky-50/40 to-white overflow-hidden select-none">

      {/* Background ambient lighting effects */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Image Side (Rosha Analyzing Business Graphic with Floating Cards) */}
          <div className={`lg:col-span-6 relative flex justify-center ${isRTL ? 'lg:order-last' : 'lg:order-first'}`}>
            <div className="relative w-full max-w-[540px] group">

              {/* Glow backdrop behind image */}
              <div className="absolute -inset-4 bg-gradient-to-r from-sky-400/20 to-blue-600/20 rounded-3xl blur-2xl group-hover:opacity-100 transition duration-500" />

              {/* Image Frame Card */}
              <div className="relative rounded-3xl overflow-hidden bg-white/70 backdrop-blur-xl border border-slate-200/80 shadow-[0_20px_50px_rgba(14,165,233,0.12)] p-4 sm:p-6 transition-all duration-300 group-hover:border-sky-300">
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
          <div className={`lg:col-span-6 space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] xl:text-[36px] font-black font-headline-xl text-slate-900 leading-snug sm:leading-tight tracking-tight">
              <span className="block mb-1">{t('customSolution.titlePrefix')}</span>
              <span className="inline-block uppercase text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 mb-1">
                {t('customSolution.titleGradient')}
              </span>
              <span className="block">{t('customSolution.titleSuffix')}</span>
            </h2>

            {/* Subtitle */}
            <p className="text-slate-600 text-sm sm:text-base font-body-lg leading-relaxed">
              {t('customSolution.subtitle')}
            </p>

            {/* Features List */}
            <div className="space-y-4 pt-2">
              {features.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-4 group/item">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${item.color} text-white shadow-md shadow-sky-500/15 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform`}>
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
                className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold font-label-md px-7 py-3.5 rounded-full shadow-[0_4px_25px_rgba(56,189,248,0.4)] transition-all duration-300 flex items-center justify-center space-x-2.5 rtl:space-x-reverse active:scale-95 cursor-pointer text-xs sm:text-sm border border-sky-400/40 hover:shadow-[0_6px_30px_rgba(56,189,248,0.6)]"
              >
                <span>{t('customSolution.getStartedBtn')}</span>
                <ArrowRight className="w-4 h-4 text-white rtl:rotate-180" />
              </button>

              <button
                onClick={() => setActivePage ? setActivePage('services') : null}
                className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold font-label-md text-xs sm:text-sm py-3.5 px-6 rounded-full cursor-pointer transition-all duration-300 hover:border-sky-500 shadow-sm hover:shadow-md"
              >
                <span>{t('customSolution.exploreBtn')}</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
