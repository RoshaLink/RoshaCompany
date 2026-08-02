import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Smartphone, Share2, BellRing } from 'lucide-react';
import mobileVideoSource from '../../assets/Diara/holdingMobile/DiaraHoldingMobile.mp4';
import appleLogo from '../../assets/Diara/logos/apple.png';
import googleLogo from '../../assets/Diara/logos/google.png';
import './MobileAppShowcase.css';

export default function MobileAppShowcase({ onOpenGetStarted, setActivePage }) {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());

  const features = [
    {
      icon: Smartphone,
      title: t('mobileApp.feature1Title'),
      desc: t('mobileApp.feature1Desc'),
      color: "from-sky-500 to-indigo-600"
    },
    {
      icon: Share2,
      title: t('mobileApp.feature2Title'),
      desc: t('mobileApp.feature2Desc'),
      color: "from-indigo-600 to-purple-600"
    },
    {
      icon: BellRing,
      title: t('mobileApp.feature3Title'),
      desc: t('mobileApp.feature3Desc'),
      color: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <section className="relative w-full py-16 lg:py-24 bg-gradient-to-b from-white via-indigo-50/40 to-white overflow-hidden select-none">

      {/* Background ambient lighting effects */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Video Side (Diara Holding Mobile Video Graphic with App Store Floating Badges) */}
          <div className={`lg:col-span-6 relative flex justify-center ${isRTL ? 'lg:order-last' : 'lg:order-last'}`}>
            <div className="relative w-full max-w-[520px] group">

              {/* Glow backdrop behind video card */}
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-400/20 to-sky-600/20 rounded-3xl blur-2xl group-hover:opacity-100 transition duration-500" />

              {/* Glassmorphic Frame Card */}
              <div className="relative rounded-3xl overflow-hidden bg-white/70 backdrop-blur-xl border border-slate-200/80 shadow-[0_20px_50px_rgba(99,102,241,0.15)] p-4 sm:p-6 transition-all duration-300 group-hover:border-indigo-300">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto max-h-[500px] object-contain rounded-2xl transform group-hover:scale-[1.02] transition-transform duration-500"
                >
                  <source src={mobileVideoSource} type="video/mp4" />
                </video>

                {/* Floating Glassmorphic Stat Pill #1 (Apple App Store Badge) */}
                <div className={`absolute top-8 ${isRTL ? 'left-6' : 'right-6'} hidden sm:flex items-center gap-2.5 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-lg`}>
                  <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center p-1.5 shadow-md">
                    <img src={appleLogo} alt="Apple App Store" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-900 leading-tight">
                      Apple App Store
                    </div>
                    <div className="text-[10px] text-indigo-600 font-semibold">
                      iOS Verified & Live
                    </div>
                  </div>
                </div>

                {/* Floating Glassmorphic Stat Pill #2 (Google Play Store Badge) */}
                <div className={`absolute bottom-8 ${isRTL ? 'right-6' : 'left-6'} hidden sm:flex items-center gap-2.5 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-lg`}>
                  <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center p-1.5 shadow-md">
                    <img src={googleLogo} alt="Google Play Store" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-900 leading-tight">
                      Google Play Store
                    </div>
                    <div className="text-[10px] text-emerald-600 font-semibold">
                      Android Published
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className={`lg:col-span-6 space-y-6 ${isRTL ? 'text-right lg:order-first' : 'text-left lg:order-first'}`}>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] xl:text-[36px] font-black font-headline-xl text-slate-900 leading-snug sm:leading-tight tracking-tight">
              <span className="block mb-1">{t('mobileApp.titlePrefix')}</span>
              <span className="inline-block uppercase text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-sky-600 to-purple-600 mb-1">
                {t('mobileApp.titleGradient')}
              </span>
              {t('mobileApp.titleSuffix') && <span className="block">{t('mobileApp.titleSuffix')}</span>}
            </h2>

            {/* Subtitle */}
            <p className="text-slate-600 text-sm sm:text-base font-body-lg leading-relaxed">
              {t('mobileApp.subtitle')}
            </p>

            {/* Features List */}
            <div className="space-y-4 pt-2">
              {features.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-4 group/item">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${item.color} text-white shadow-md shadow-indigo-500/15 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform`}>
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
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-500 hover:from-indigo-700 hover:to-sky-600 text-white font-bold font-label-md px-7 py-3.5 rounded-full shadow-[0_4px_25px_rgba(99,102,241,0.4)] transition-all duration-300 flex items-center justify-center space-x-2.5 rtl:space-x-reverse active:scale-95 cursor-pointer text-xs sm:text-sm border border-indigo-400/40 hover:shadow-[0_6px_30px_rgba(99,102,241,0.6)]"
              >
                <span>{t('mobileApp.buildBtn')}</span>
                <ArrowRight className="w-4 h-4 text-white rtl:rotate-180" />
              </button>

              <button
                onClick={() => setActivePage ? setActivePage('services') : null}
                className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold font-label-md text-xs sm:text-sm py-3.5 px-6 rounded-full cursor-pointer transition-all duration-300 hover:border-indigo-500 shadow-sm hover:shadow-md"
              >
                <span>{t('mobileApp.exploreBtn')}</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
