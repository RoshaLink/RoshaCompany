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
  const rtlClass = isRTL ? 'is-rtl' : 'is-ltr';

  return (
    <div className="homepage-container">

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

      {/* Integrated Who We Are 5-Member Team Component (Position 4) */}
      <WhoWeAre
        setActivePage={setActivePage}
        onOpenGetStarted={onOpenGetStarted}
      />

      {/* Multilingual Support & Connect With Us Showcase Component (Position 5) */}
      <ConnectWithUsShowcase
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

      {/* Integrated Testimonials Column Marquee */}
      <TestimonialsColumn />

      {/* Bottom CTA Banner with RoshaConnectWithUs Image */}
      <section className="cta-section">
        <div className="cta-card">
          <div className="ambient-glow-cyan cta-glow" />

          <div className="cta-grid">

            {/* Rosha Image side */}
            <div className={`cta-image-col ${rtlClass}`}>
              <div className="cta-image-wrapper">
                <div className="cta-image-backdrop" />
                <div className="cta-image-inner">
                  <img
                    src={roshaConnectImage}
                    alt="Connect With RoshaLink"
                    className="cta-image"
                  />
                </div>
              </div>
            </div>

            {/* Text & CTA side */}
            <div className={`cta-text-col ${rtlClass}`}>
              <h2 className="cta-title">
                {t('ctaBanner.title')}
              </h2>
              <p className="cta-subtitle">
                {t('ctaBanner.subtitle')}
              </p>
              <div className="cta-action">
                <button
                  onClick={onOpenGetStarted}
                  className="cta-button"
                >
                  <span>{t('ctaBanner.button')}</span>
                  <ArrowRight className="cta-button-icon" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
