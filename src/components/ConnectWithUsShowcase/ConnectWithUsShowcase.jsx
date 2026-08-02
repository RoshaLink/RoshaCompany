import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Globe2, PhoneCall } from 'lucide-react';
import diaraConnectImage from '../../assets/Diara/ConnectWthUS/DiaraGivingLike.png';
import iranFlagLogo from '../../assets/Diara/logos/Iran.png';
import './ConnectWithUsShowcase.css';

const SwedenFlag = () => (
  <svg className="w-6 h-4 rounded-[3px] shadow-sm shrink-0 overflow-hidden inline-block" viewBox="0 0 16 10" fill="none">
    <rect width="16" height="10" fill="#006AA7" />
    <rect x="5" width="2" height="10" fill="#FECC00" />
    <rect y="4" width="16" height="2" fill="#FECC00" />
  </svg>
);

const UkFlag = () => (
  <svg className="w-6 h-4 rounded-[3px] shadow-sm shrink-0 overflow-hidden inline-block" viewBox="0 0 60 30" fill="none">
    <rect width="60" height="30" fill="#012169" />
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="8" />
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
    <path d="M30,0 V30 M0,15 H60" stroke="#FFFFFF" strokeWidth="10" />
    <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
  </svg>
);

const IranFlag = () => (
  <img src={iranFlagLogo} alt="Iran Flag" className="w-6 h-4 rounded-[3px] shadow-sm shrink-0 object-cover inline-block" />
);

const ArabicFlag = () => (
  <svg className="w-6 h-4 rounded-[3px] shadow-sm shrink-0 overflow-hidden inline-block" viewBox="0 0 16 10" fill="none">
    <rect width="16" height="3.33" y="0" fill="#007A3D" />
    <rect width="16" height="3.33" y="3.33" fill="#FFFFFF" />
    <rect width="16" height="3.34" y="6.66" fill="#000000" />
    <rect width="4" height="10" x="0" y="0" fill="#CE1126" />
  </svg>
);

export default function ConnectWithUsShowcase({ onOpenGetStarted, setActivePage }) {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());

  const languagesList = [
    {
      FlagComponent: SwedenFlag,
      title: t('connectWithUs.langSvTitle'),
      desc: t('connectWithUs.langSvDesc'),
    },
    {
      FlagComponent: UkFlag,
      title: t('connectWithUs.langEnTitle'),
      desc: t('connectWithUs.langEnDesc'),
    },
    {
      FlagComponent: IranFlag,
      title: t('connectWithUs.langFaTitle'),
      desc: t('connectWithUs.langFaDesc'),
    },
    {
      FlagComponent: ArabicFlag,
      title: t('connectWithUs.langArTitle'),
      desc: t('connectWithUs.langArDesc'),
    }
  ];

  return (
    <section className="relative w-full py-16 lg:py-24 bg-gradient-to-b from-white via-sky-50/40 to-white text-slate-900 overflow-hidden select-none">

      {/* Background glowing blurred radial orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-300/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-indigo-300/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Image Side (Diara Connect With Us Character Graphic) */}
          <div className={`lg:col-span-6 relative flex justify-center ${isRTL ? 'lg:order-last' : 'lg:order-first'}`}>
            <div className="relative w-full max-w-[520px] group">

              {/* Outer Glow Ring behind card */}
              <div className="absolute -inset-4 bg-gradient-to-r from-sky-400/20 to-blue-500/20 rounded-3xl blur-2xl group-hover:opacity-100 transition duration-500" />

              {/* Glassmorphic Frame */}
              <div className="relative rounded-3xl overflow-hidden bg-white/70 backdrop-blur-xl border border-slate-200/80 shadow-[0_20px_50px_rgba(56,189,248,0.15)] p-4 sm:p-6 transition-all duration-300 group-hover:border-sky-300">
                <img
                  src={diaraConnectImage}
                  alt="Diara Connect With Us"
                  className="w-full h-auto object-contain rounded-2xl transform group-hover:scale-[1.02] transition-transform duration-500"
                />

                {/* Bottom Floating Language Flags Pill */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 rounded-full bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl">
                  <span className="text-xs font-bold text-slate-600">Supported:</span>
                  <div className="flex items-center gap-2">
                    <SwedenFlag />
                    <UkFlag />
                    <IranFlag />
                    <ArabicFlag />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className={`lg:col-span-6 space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] xl:text-[35px] font-black font-headline-xl text-slate-900 leading-snug sm:leading-tight tracking-tight">
              <span className="block mb-1">{t('connectWithUs.titlePrefix')}</span>
              <span className="inline-block uppercase text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 mb-1">
                {t('connectWithUs.titleGradient')}
              </span>
              <span className="block">{t('connectWithUs.titleSuffix')}</span>
            </h2>

            {/* Subtitle */}
            <p className="text-slate-600 text-sm sm:text-base font-body-lg leading-relaxed">
              {t('connectWithUs.subtitle')}
            </p>

            {/* 3 Languages Support Cards Grid */}
            <div className="space-y-3 pt-1">
              {languagesList.map((lang, idx) => {
                const Flag = lang.FlagComponent;
                return (
                  <div
                    key={idx}
                    className="group/lang p-3.5 rounded-2xl bg-white/80 hover:bg-white backdrop-blur-md border border-slate-200/90 hover:border-sky-400/60 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3.5"
                  >
                    <div className="shrink-0 p-2 rounded-xl bg-slate-100/90 group-hover/lang:scale-105 transition-transform flex items-center justify-center">
                      <Flag />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">
                        {lang.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                        {lang.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className={`pt-3 flex flex-wrap items-center gap-4 ${isRTL ? 'justify-start' : 'justify-start'}`}>
              <button
                onClick={() => setActivePage ? setActivePage('contact') : null}
                className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold font-label-md px-7 py-3.5 rounded-full shadow-[0_4px_25px_rgba(56,189,248,0.4)] transition-all duration-300 flex items-center justify-center space-x-2.5 rtl:space-x-reverse active:scale-95 cursor-pointer text-xs sm:text-sm border border-sky-400/40 hover:shadow-[0_6px_30px_rgba(56,189,248,0.6)]"
              >
                <PhoneCall className="w-4 h-4 text-white" />
                <span>{t('connectWithUs.contactBtn')}</span>
              </button>

              <button
                onClick={onOpenGetStarted}
                className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold font-label-md text-xs sm:text-sm py-3.5 px-6 rounded-full cursor-pointer transition-all duration-300 hover:border-sky-500 shadow-sm hover:shadow-md flex items-center space-x-2 rtl:space-x-reverse"
              >
                <span>{t('connectWithUs.bookCallBtn')}</span>
                <ArrowRight className="w-4 h-4 text-slate-600 rtl:rotate-180" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
