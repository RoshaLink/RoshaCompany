import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Compass, Code2, Cpu, Cloud } from 'lucide-react';
import HeroSection from '../../components/herosection/HeroSection';
import BrandsWeWorkWith from '../../components/BrandsWeWorkWith/BrandsWeWorkWith';
import SearchVisibilityShowcase from '../../components/SearchVisibilityShowcase/SearchVisibilityShowcase';
import SalesAndSeoShowcase from '../../components/SalesAndSeoShowcase/SalesAndSeoShowcase';
import BusinessAnalysisShowcase from '../../components/BusinessAnalysisShowcase/BusinessAnalysisShowcase';
import CustomWebSolutionShowcase from '../../components/CustomWebSolutionShowcase/CustomWebSolutionShowcase';
import MobileAppShowcase from '../../components/MobileAppShowcase/MobileAppShowcase';
import ConnectWithUsShowcase from '../../components/ConnectWithUsShowcase/ConnectWithUsShowcase';
import WhoWeAre from '../../components/WhoWeAre/WhoWeAre';
import TestimonialsColumn from '../../components/TestimonialsColumn/TestimonialsColumn';
import roshaConnectImage from '../../assets/Rosha/ConnectWthUS/RoshaConnectWithUs.png';
import './HomePage.css';

export default function HomePage({ onOpenGetStarted, setActivePage }) {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());


  return (
    <div className="space-y-24 pb-20 bg-white">

      {/* Integrated HeroSection Component */}
      <HeroSection
        setActivePage={setActivePage}
        onOpenGetStarted={onOpenGetStarted}
      />

      {/* Integrated Brands We Work With Component */}
      <BrandsWeWorkWith
        onOpenGetStarted={onOpenGetStarted}
        setActivePage={setActivePage}
      />

      {/* Search Visibility & SEO Showcase Component (Above ShowFeatures) */}
      <SearchVisibilityShowcase
        onOpenGetStarted={onOpenGetStarted}
        setActivePage={setActivePage}
      />

      {/* Increase Sales & Google SEO Showcase Component */}
      <SalesAndSeoShowcase
        onOpenGetStarted={onOpenGetStarted}
        setActivePage={setActivePage}
      />

      {/* Strategic Business Analysis & Tailor-Made Software Showcase Component */}
      <BusinessAnalysisShowcase
        onOpenGetStarted={onOpenGetStarted}
        setActivePage={setActivePage}
      />

      {/* Custom Tailor-Made Website & App Development Showcase Component */}
      <CustomWebSolutionShowcase
        onOpenGetStarted={onOpenGetStarted}
        setActivePage={setActivePage}
      />

      {/* Mobile App Development & App Store / Google Play Publishing Component */}
      <MobileAppShowcase
        onOpenGetStarted={onOpenGetStarted}
        setActivePage={setActivePage}
      />

      {/* Multilingual Support & Connect With Us Showcase Component */}
      <ConnectWithUsShowcase
        onOpenGetStarted={onOpenGetStarted}
        setActivePage={setActivePage}
      />

      {/* Integrated Who We Are 5-Member Team Component */}
      <WhoWeAre
        setActivePage={setActivePage}
        onOpenGetStarted={onOpenGetStarted}
      />


      {/* Integrated Testimonials Column Marquee */}
      <TestimonialsColumn />

      {/* Bottom CTA Banner with RoshaConnectWithUs Image */}
      <section className="px-4 md:px-12 max-w-[1280px] mx-auto">
        <div className="rounded-3xl p-8 sm:p-12 md:p-14 border border-sky-200/80 bg-gradient-to-br from-white via-sky-50/60 to-blue-50/40 shadow-xl relative overflow-hidden">
          <div className="ambient-glow-cyan -top-20 left-1/2 -translate-x-1/2 opacity-40 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

            {/* Rosha Image side */}
            <div className={`lg:col-span-5 flex justify-center ${isRTL ? 'lg:order-last' : 'lg:order-first'}`}>
              <div className="relative group max-w-[320px] w-full">
                <div className="absolute -inset-3 bg-gradient-to-r from-sky-400/20 to-blue-500/20 rounded-3xl blur-xl group-hover:opacity-100 transition duration-500" />
                <div className="relative rounded-2xl overflow-hidden bg-white/80 backdrop-blur-md border border-slate-200/80 p-4 shadow-md">
                  <img
                    src={roshaConnectImage}
                    alt="Connect With RoshaLink"
                    className="w-full h-auto object-contain rounded-xl transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Text & CTA side */}
            <div className={`lg:col-span-7 space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              <h2 className="text-2xl sm:text-4xl md:text-4xl lg:text-[42px] font-black font-headline-xl text-slate-900 leading-tight tracking-tight">
                {t('ctaBanner.title')}
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                {t('ctaBanner.subtitle')}
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenGetStarted}
                  className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-label-md font-bold text-sm sm:text-base px-8 py-4 rounded-full transition-all duration-300 shadow-[0_6px_25px_rgba(56,189,248,0.4)] hover:shadow-[0_8px_30px_rgba(56,189,248,0.6)] flex items-center space-x-2.5 rtl:space-x-reverse active:scale-95 cursor-pointer border border-sky-400/30"
                >
                  <span>{t('ctaBanner.button')}</span>
                  <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
