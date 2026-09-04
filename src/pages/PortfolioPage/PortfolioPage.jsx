import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, X, Monitor, Smartphone, Tablet } from 'lucide-react';
import HeroSectionPortfolio from '../../components/HeroSectionPortfolio/HeroSectionPortfolio';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import './PortfolioPage.css';

export default function PortfolioPage({ onOpenGetStarted }) {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());
  const [activePreview, setActivePreview] = useState(null);
  const [deviceMode, setDeviceMode] = useState('desktop');

  useEffect(() => {
    if (activePreview) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activePreview]);

  const projects = [
    {
      id: "perspolis-restaurant",
      translationKey: "perspolisProject",
      title: "Perspolis Restaurant Platform",
      category: "Food & Hospitality Web App",
      desc: "Comprehensive digital web application for Perspolis Restaurant featuring interactive digital menus, online table reservation system, multi-language UI, and sleek responsive design.",
      img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
      metrics: "Live Production App",
      liveUrl: "https://roshalink.github.io/PerspolisResturant/",
      isFeatured: true,
      features: [
        "Interactive Digital Menu & Customization",
        "Table Reservation & Booking Management",
        "Responsive Multi-Language UI Engine"
      ]
    },
    {
      id: "ffstech",
      translationKey: "ffstechProject",
      title: "FFSTECH Integrated Infrastructure Platform",
      category: "Building Systems & Enterprise Tech",
      desc: "High-performance digital enterprise application engineered for FFSTECH, featuring mission-critical building infrastructure management, intelligent fire & safety systems, smart access control, and low-voltage system architecture.",
      img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop",
      metrics: "Live Production App",
      liveUrl: "https://morinocode.github.io/FFSTECH/",
      isFeatured: true,
      features: [
        "Fire & Life Safety Ecosystems",
        "Smart Access Control & IP Surveillance",
        "Integrated AV & Communication Backbone"
      ]
    },
    {
      id: "dentist-clinic",
      translationKey: "dentistProject",
      title: "Tandläkaren – Dental Clinic Platform",
      category: "Dental & Healthcare Web App",
      desc: "Comprehensive digital healthcare web application engineered for Dental Clinics, featuring online patient appointment booking, interactive treatment overview, patient portal, and responsive multi-language design.",
      img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop",
      metrics: "Live Production App",
      liveUrl: "https://roshalink.github.io/Dentist/",
      isFeatured: true,
      features: [
        "Online Patient Appointment Booking",
        "Interactive Dental Care & Services",
        "Patient Portal & Fast Responsive UI"
      ]
    },
    {
      id: "shirazi-associates",
      translationKey: "shiraziProject",
      title: "Shirazi Associates – Legal & Advisory Platform",
      category: "Legal & Immigration Advisory Platform",
      desc: "High-end digital legal platform engineered for Shirazi Associates, specializing in corporate law, immigration advisory, online consultation scheduling, and a responsive multi-language portal.",
      img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop",
      metrics: "Live Production App",
      liveUrl: "https://roshalink.github.io/shirazi-associates/",
      isFeatured: true,
      features: [
        "Online Consultation Booking & Legal Advisory",
        "Corporate Law & Visa Immigration Services",
        "Secure Case Handling & Multi-Language UX"
      ]
    },
    {
      id: "pars-law-firm",
      translationKey: "parsLawProject",
      title: "Pars Law Firm – Premium Legal Practice",
      category: "Law Practice & Legal Services Web App",
      desc: "Comprehensive digital enterprise web application crafted for Pars Law Firm, featuring client consultation scheduling, practice area overview, client case submission, and rapid responsive UI.",
      img: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1200&auto=format&fit=crop",
      metrics: "Live Production App",
      liveUrl: "https://roshalink.github.io/pars-law-firm/",
      isFeatured: true,
      features: [
        "Client Appointment Booking & Consultation",
        "Comprehensive Legal Practice Areas",
        "Rapid Performance & Trust-Building UX"
      ]
    },
    {
      id: "hogward-cafe",
      translationKey: "hogwardCafeProject",
      title: "HogWard Café & Restaurant",
      category: "Café & Hospitality Dining Platform",
      desc: "An enchanting and modern digital web application for HogWard Café featuring an interactive digital menu, themed beverage showcase, online table reservation, and sleek responsive design.",
      img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop",
      metrics: "Live Production App",
      liveUrl: "https://roshalink.github.io/HogWard_Cafe/",
      isFeatured: true,
      features: [
        "Interactive Digital Menu & Specialty Drinks",
        "Online Table Booking & Event System",
        "Multi-Language & Lightning-Fast UI"
      ]
    },
    {
      id: "aurora-clinic",
      translationKey: "auroraClinicProject",
      title: "Aurora – Beauty & Laser Clinic Stockholm",
      category: "Beauty & Laser Clinic Web App",
      desc: "State-of-the-art digital web application for Aurora Beauty & Laser Clinic in Stockholm, featuring treatment service catalog, online consultation booking, multilingual support, and responsive patient UI.",
      img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop",
      metrics: "Live Production App",
      liveUrl: "https://roshalink.github.io/ClincZibaei/",
      isFeatured: true,
      features: [
        "Advanced Laser Hair Removal & Skincare Catalog",
        "Online Consultation & Treatment Booking",
        "Multilingual Patient UI & Fast Mobile UX"
      ]
    },
    {
      id: "iran-supermarket",
      translationKey: "iranSupermarketProject",
      title: "Iran Supermarket – Persian Grocery Berlin",
      category: "Food & Persian Grocery Platform",
      desc: "Comprehensive digital platform for Iran Supermarket in Berlin, presenting traditional Persian delicacies, bakery & fresh pastries, halal butchery, fresh herbs, and an intuitive product catalog.",
      img: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=1200&auto=format&fit=crop",
      metrics: "Live Production App",
      liveUrl: "https://roshalink.github.io/IranSuperMarket/",
      isFeatured: true,
      features: [
        "Fresh Persian Delicacies, Spices & Halal Butchery",
        "Interactive Category & Product Showcase",
        "Multilingual UI & High-Speed Mobile Accessibility"
      ]
    },
    {
      id: "bilbazar",
      translationKey: "bilbazarProject",
      title: "BilBazar – Automotive Marketplace Sweden",
      category: "Automotive Marketplace & Car Sales",
      desc: "Dynamic automotive marketplace platform engineered for the Swedish market, offering smart vehicle filtering, verified car listings, direct dealer & private seller communication, and inspection guarantees.",
      img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
      metrics: "Live Production App",
      liveUrl: "https://roshalink.github.io/bilbazar/",
      isFeatured: true,
      features: [
        "Smart Vehicle Search & Multi-Criteria Filtering",
        "Verified Listings, History & Inspection Overview",
        "Direct Buyer-Seller Chat & Responsive Design"
      ]
    }
  ];

  return (
    <div className="portfolio-page-wrapper">

      <Breadcrumb page="portfolio" />

      {/* Integrated Standalone HeroSectionPortfolio Component */}
      <HeroSectionPortfolio
        onOpenGetStarted={onOpenGetStarted}
      />

      {/* Projects Grid Section with Intro Notice Header */}
      <section className="portfolio-grid-section">
        <div className="portfolio-grid-container">

          {/* Section Notice & Showcase Intro Header */}
          <div className="portfolio-showcase-header">
            <h2 className="portfolio-showcase-title">
              {t('portfolioHero.showcaseNoticeTitlePrefix')}
              {t('portfolioHero.showcaseNoticeTitleGradient') && (
                <span className="sky-blue-text-shine">
                  {t('portfolioHero.showcaseNoticeTitleGradient')}
                </span>
              )}
              {t('portfolioHero.showcaseNoticeTitleSuffix')}
            </h2>

            <p className="portfolio-showcase-desc">
              {t('portfolioHero.showcaseNoticeDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 xl:gap-12 2xl:gap-14">
            {projects.map((p, i) => (
              <ProjectCard
                key={p.id || i}
                project={p}
                onPreview={setActivePreview}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="portfolio-cta-container">
        <div className="portfolio-cta-card space-y-6">
          <h2 className="portfolio-cta-title">
            {t('portfolioHero.ctaTitlePrefix') || t('portfolioHero.ctaTitle')}
            {t('portfolioHero.ctaTitleGradient') && (
              <span className="sky-blue-text-shine">
                {t('portfolioHero.ctaTitleGradient')}
              </span>
            )}
            {t('portfolioHero.ctaTitleSuffix')}
          </h2>
          <p className="portfolio-cta-subtitle">
            {t('portfolioHero.ctaSubtitle')}
          </p>
          <div className="flex justify-center pt-2">
            <button
              onClick={onOpenGetStarted}
              className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm sm:text-base px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl shadow-lg hover:shadow-sky-500/30 flex items-center gap-2.5 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>{t('portfolioHero.ctaBtn')}</span>
              <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <div className="flex justify-center pt-4">
            <Link
              to={`/${i18n.language}/services`}
              className="portfolio-cta-secondary-link"
            >
              <span>{t('portfolioHero.servicesLink', 'Explore the capabilities behind these builds')}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </div>
        </div>
      </section>

      {/* FULLSCREEN INTERACTIVE BROWSER MOCKUP MODAL */}
      {activePreview && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in cursor-pointer"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActivePreview(null);
          }}
        >
          <div 
            className="bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl w-full max-w-7xl h-[92vh] flex flex-col overflow-hidden cursor-default"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Browser Header Bar */}
            <div className="bg-slate-800 px-4 sm:px-5 py-3 border-b border-slate-700 flex items-center justify-between gap-4 shrink-0">

              {/* Traffic Lights & Site URL/Title */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActivePreview(null)}
                    className="w-3.5 h-3.5 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors flex items-center justify-center group cursor-pointer"
                    title="Close Modal"
                  >
                    <X className="w-2.5 h-2.5 text-rose-950 opacity-0 group-hover:opacity-100" />
                  </button>
                  <span className="w-3.5 h-3.5 rounded-full bg-amber-500 opacity-80" />
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 opacity-80" />
                </div>
              </div>

              {/* Viewport Device Mode Switcher & Open Live / Close Button */}
              <div className="flex items-center gap-2.5">
                <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl p-0.5">
                  <button
                    onClick={() => setDeviceMode('desktop')}
                    className={`p-2 rounded-lg transition-colors cursor-pointer ${deviceMode === 'desktop' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'}`}
                    title="Desktop Mode (100%)"
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeviceMode('tablet')}
                    className={`p-2 rounded-lg transition-colors cursor-pointer ${deviceMode === 'tablet' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'}`}
                    title="Tablet Mode (768px)"
                  >
                    <Tablet className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeviceMode('mobile')}
                    className={`p-2 rounded-lg transition-colors cursor-pointer ${deviceMode === 'mobile' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'}`}
                    title="Mobile Mode (380px)"
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => setActivePreview(null)}
                  className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Close Preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

            </div>

            {/* Modal Iframe Viewport Container */}
            <div className="flex-1 bg-slate-950 flex items-center justify-center p-2 sm:p-4 overflow-hidden relative">
              <div
                className={`h-full transition-all duration-300 relative rounded-2xl overflow-hidden bg-white shadow-2xl border border-slate-800 flex flex-col ${
                  deviceMode === 'mobile' ? 'w-[380px] max-w-full' : deviceMode === 'tablet' ? 'w-[768px] max-w-full' : 'w-full'
                }`}
              >
                {activePreview.liveUrl ? (
                  <iframe
                    src={activePreview.liveUrl}
                    title={activePreview.title}
                    className="w-full h-full border-0 bg-white flex-1"
                    allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                ) : (
                  <div className="w-full h-full overflow-y-auto">
                    <img
                      src={activePreview.img}
                      alt={activePreview.title}
                      className="w-full h-auto object-top"
                    />
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
