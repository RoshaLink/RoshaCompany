import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import mobileVideoSource from '../../assets/Rosha/holdingMobile/RoshaHoldingMobile.mp4';
import appleLogo from '../../assets/Rosha/logos/apple.png';
import googleLogo from '../../assets/Rosha/logos/google.png';
import MobileAppModal from './MobileAppModal';
import './MobileAppShowcase.css';

export default function MobileAppShowcase({ onOpenGetStarted, setActivePage }) {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative w-full py-16 lg:py-24 bg-gradient-to-b from-white via-indigo-50/40 to-white overflow-hidden select-none">

      {/* Background ambient lighting effects */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full px-6 lg:px-12 xl:px-20 2xl:px-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-center">

          {/* Video Side (Rosha Holding Mobile Video Graphic with App Store Floating Badges) */}
          <div className={`order-1 lg:col-span-5 relative flex justify-center ${isRTL ? 'lg:justify-end lg:order-last' : 'lg:justify-end lg:order-last'}`}>
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
          <div className={`order-2 lg:col-span-7 space-y-5 lg:space-y-6 ${isRTL ? 'text-right lg:order-first' : 'text-left lg:order-first'}`}>

            {/* Headline */}
            <h2 className="uppercase text-[1.1rem] min-[360px]:text-xl min-[400px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black font-headline-xl text-slate-900 leading-snug sm:leading-tight tracking-tight text-balance break-words">
              <span className="block mb-1">{t('mobileApp.titlePrefix')}</span>
              <span className="uppercase text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-sky-600 to-purple-600 mb-1 break-words">
                {t('mobileApp.titleGradient')}
              </span>
              <span className="block">{t('mobileApp.titleSuffix')}</span>
            </h2>

            {/* Subtitle */}
            <p className="text-slate-600 text-sm sm:text-base lg:text-xl xl:text-2xl font-body-lg leading-relaxed mt-4 text-pretty max-w-3xl">
              {t('mobileApp.subtitle')}
            </p>

            {/* Action Buttons */}
            <div className={`pt-6 lg:pt-8 flex flex-nowrap sm:flex-wrap items-stretch justify-center sm:justify-start gap-2 sm:gap-4 ${isRTL ? 'justify-start' : 'justify-start'}`}>
              <button
                onClick={onOpenGetStarted}
                className="flex-1 sm:flex-none bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-500 hover:from-indigo-700 hover:to-sky-600 text-white font-bold font-label-md px-2 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-4 rounded-xl sm:rounded-full shadow-[0_4px_20px_rgba(99,102,241,0.4)] transition-all duration-300 flex items-center justify-center space-x-1 sm:space-x-2.5 rtl:space-x-reverse active:scale-95 cursor-pointer border border-indigo-400/40 text-[10px] xs:text-[11px] sm:text-base lg:text-lg hover:shadow-[0_6px_25px_rgba(99,102,241,0.6)] text-center leading-tight"
              >
                <span>{t('mobileApp.buildBtn')}</span>

              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex-1 sm:flex-none bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold font-label-md text-[10px] xs:text-[11px] sm:text-base lg:text-lg py-3 px-2 sm:py-4 sm:px-7 lg:px-9 lg:py-4 rounded-xl sm:rounded-full cursor-pointer transition-all duration-300 hover:border-indigo-500 shadow-sm hover:shadow-md text-center leading-tight flex items-center justify-center"
              >
                <span>{t('mobileApp.exploreBtn')}</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Modal */}
      <MobileAppModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
