import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ExternalLink, Lock, X, ShieldCheck, Monitor, Smartphone, Tablet, MousePointer } from 'lucide-react';
import HeroSectionPortfolio from '../../components/HeroSectionPortfolio/HeroSectionPortfolio';
import ProjectCard from '../../components/ProjectCard/ProjectCard';

export default function PortfolioPage({ onOpenGetStarted }) {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());
  const [activePreview, setActivePreview] = useState(null);
  const [deviceMode, setDeviceMode] = useState('desktop');

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
    }
  ];

  return (
    <div className="relative min-h-screen bg-white text-slate-900 transition-colors duration-300 pb-20 overflow-hidden">
      
      {/* Integrated Standalone HeroSectionPortfolio Component */}
      <HeroSectionPortfolio
        onOpenGetStarted={onOpenGetStarted}
      />

      {/* Projects Grid Section (Pure White Background) */}
      <section className="w-full bg-white text-slate-900 py-12 px-4 md:px-12">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <section className="px-4 md:px-12 max-w-[1280px] mx-auto pt-16">
        <div className="glass-card rounded-3xl p-10 md:p-14 text-center space-y-6 border border-sky-300 bg-gradient-to-r from-sky-50/80 via-white to-indigo-50/80 shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t('portfolioHero.ctaTitle')}
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {t('portfolioHero.ctaSubtitle')}
          </p>
          <div className="flex justify-center pt-2">
            <button
              onClick={onOpenGetStarted}
              className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-base px-9 py-4 rounded-xl transition-all shadow-[0_4px_25px_rgba(56,189,248,0.4)] flex items-center gap-3 cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>{t('portfolioHero.ctaBtn')}</span>
              <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </section>

      {/* FULLSCREEN INTERACTIVE BROWSER MOCKUP MODAL */}
      {activePreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl w-full max-w-6xl h-[92vh] flex flex-col overflow-hidden">
            
            {/* Browser Header Bar */}
            <div className="bg-slate-800 px-4 sm:px-5 py-3 border-b border-slate-700 flex items-center justify-between gap-4 shrink-0">
              
              {/* Traffic Lights */}
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

              {/* Viewport Device Mode Switcher & Close Button */}
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl p-0.5">
                  <button 
                    onClick={() => setDeviceMode('desktop')} 
                    className={`p-2 rounded-lg transition-colors ${deviceMode === 'desktop' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'}`}
                    title="Desktop Mode (100%)"
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setDeviceMode('tablet')} 
                    className={`p-2 rounded-lg transition-colors ${deviceMode === 'tablet' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'}`}
                    title="Tablet Mode (768px)"
                  >
                    <Tablet className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setDeviceMode('mobile')} 
                    className={`p-2 rounded-lg transition-colors ${deviceMode === 'mobile' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'}`}
                    title="Mobile Mode (380px)"
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                </div>

                <button 
                  onClick={() => setActivePreview(null)}
                  className="text-slate-400 hover:text-white p-1 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Close Preview"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

            </div>

            {/* Modal Iframe Viewport Container */}
            <div className="flex-1 bg-slate-950 flex items-center justify-center p-2 sm:p-4 overflow-hidden relative">
              <div 
                className={`h-full transition-all duration-300 relative rounded-2xl overflow-hidden bg-white shadow-2xl border border-slate-800 ${
                  deviceMode === 'mobile' ? 'w-[380px] max-w-full' : deviceMode === 'tablet' ? 'w-[768px] max-w-full' : 'w-full'
                }`}
              >
                {activePreview.liveUrl ? (
                  <iframe 
                    src={activePreview.liveUrl} 
                    title={activePreview.title}
                    className="w-full h-full border-0 select-none bg-white"
                  />
                ) : (
                  <img 
                    src={activePreview.img} 
                    alt={activePreview.title}
                    className="w-full h-auto object-top select-none"
                  />
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
