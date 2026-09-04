import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
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
import LazySection from '../../components/ui/LazySection';
import roshaConnectImage from '../../assets/Rosha/ConnectWthUS/RoshaConnectWithUs.webp';
import './HomePage.css';

export default function HomePage({ onOpenGetStarted, setActivePage }) {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());
  const rtlClass = isRTL ? 'is-rtl' : 'is-ltr';

  return (
    <div className="homepage-container">

      {/* 1. Above-the-fold HeroSection (Immediate render for fastest LCP) */}
      <HeroSection
        setActivePage={setActivePage}
        onOpenGetStarted={onOpenGetStarted}
      />

      {/* 2. Above-the-fold Brands We Work With Component */}
      <BrandsWeWorkWith
        onOpenGetStarted={onOpenGetStarted}
        setActivePage={setActivePage}
      />

      {/* 3. Search Visibility & SEO Showcase */}
      <LazySection minHeight="450px">
        <SearchVisibilityShowcase
          onOpenGetStarted={onOpenGetStarted}
          setActivePage={setActivePage}
        />
      </LazySection>

      {/* 4. Who We Are 5-Member Team Component */}
      <LazySection minHeight="500px">
        <WhoWeAre
          setActivePage={setActivePage}
          onOpenGetStarted={onOpenGetStarted}
        />
      </LazySection>

      {/* 5. Multilingual Support & Connect With Us Showcase */}
      <LazySection minHeight="450px">
        <ConnectWithUsShowcase
          onOpenGetStarted={onOpenGetStarted}
          setActivePage={setActivePage}
        />
      </LazySection>

      {/* 6. Increase Sales & Google SEO Showcase */}
      <LazySection minHeight="450px">
        <SalesAndSeoShowcase
          onOpenGetStarted={onOpenGetStarted}
          setActivePage={setActivePage}
        />
      </LazySection>

      {/* 7. Strategic Business Analysis & Architecture Showcase */}
      <LazySection minHeight="450px">
        <BusinessAnalysisShowcase
          onOpenGetStarted={onOpenGetStarted}
          setActivePage={setActivePage}
        />
      </LazySection>

      {/* 8. Custom Tailor-Made Website & App Development Showcase */}
      <LazySection minHeight="450px">
        <CustomWebSolutionShowcase
          onOpenGetStarted={onOpenGetStarted}
          setActivePage={setActivePage}
        />
      </LazySection>

      {/* 9. Mobile App Development Showcase */}
      <LazySection minHeight="450px">
        <MobileAppShowcase
          onOpenGetStarted={onOpenGetStarted}
          setActivePage={setActivePage}
        />
      </LazySection>

      {/* 10. Testimonials Column Marquee */}
      <LazySection minHeight="380px">
        <TestimonialsColumn />
      </LazySection>

      {/* 11. Bottom CTA Banner */}
      <LazySection minHeight="350px">
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
                      width="1536"
                      height="1024"
                      loading="lazy"
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
      </LazySection>

    </div>
  );
}
