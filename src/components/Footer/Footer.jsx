import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, Globe, Share2, MessageSquare, ArrowUpRight } from 'lucide-react';
import './Footer.css';

export default function Footer({ setActivePage }) {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-100 border-t border-slate-200 pt-16 pb-12 px-4 md:px-12 relative overflow-hidden">
      <div className="ambient-glow-purple -bottom-40 -left-40 opacity-30 pointer-events-none" />
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 relative z-10">
        
        {/* Brand & Overview */}
        <div className="md:col-span-4 space-y-4">
          <div 
            onClick={() => setActivePage('home')}
            className="group flex items-center space-x-2.5 rtl:space-x-reverse font-bold text-xl text-slate-900 cursor-pointer select-none"
          >
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 border-2 border-sky-500 flex items-center justify-center p-1 shadow-[0_0_12px_rgba(56,189,248,0.3)] group-hover:scale-105 transition-transform">
              <svg 
                className="w-full h-full text-sky-500" 
                viewBox="0 0 32 32" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="2" y="2" width="28" height="28" rx="8" stroke="currentColor" strokeWidth="3" />
                <rect x="10.5" y="10" width="3" height="12" rx="1.5" fill="currentColor" />
                <rect x="18.5" y="10" width="3" height="12" rx="1.5" fill="currentColor" />
              </svg>
            </div>
            <span className="font-headline-md font-extrabold text-2xl tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
              RoshaLink
            </span>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
            {t('footer.description')}
          </p>
          <div className="flex space-x-3 rtl:space-x-reverse pt-2">
            <a href="#" className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-sky-600 hover:border-sky-400 transition-colors" title="Global Network">
              <Globe className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-sky-600 hover:border-sky-400 transition-colors" title="Share">
              <Share2 className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-sky-600 hover:border-sky-400 transition-colors" title="Community">
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-2 space-y-3 font-label-md">
          <h4 className="text-slate-900 font-bold text-xs uppercase tracking-widest text-sky-600">{t('footer.navigation')}</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><button onClick={() => setActivePage('home')} className="hover:text-sky-600 transition-colors cursor-pointer">{t('nav.home')}</button></li>
            <li><button onClick={() => setActivePage('portfolio')} className="hover:text-sky-600 transition-colors cursor-pointer">{t('nav.portfolio')}</button></li>
            <li><button onClick={() => setActivePage('services')} className="hover:text-sky-600 transition-colors cursor-pointer">{t('nav.services')}</button></li>
            <li><button onClick={() => setActivePage('about')} className="hover:text-sky-600 transition-colors cursor-pointer">{t('nav.about')}</button></li>
            <li><button onClick={() => setActivePage('contact')} className="hover:text-sky-600 transition-colors cursor-pointer">{t('nav.contact')}</button></li>
          </ul>
        </div>

        {/* Capabilities */}
        <div className="md:col-span-3 space-y-3 font-label-md">
          <h4 className="text-slate-900 font-bold text-xs uppercase tracking-widest text-indigo-600">{t('footer.capabilities')}</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="hover:text-slate-900 transition-colors cursor-pointer flex items-center space-x-1"><span>Strategic Design</span></li>
            <li className="hover:text-slate-900 transition-colors cursor-pointer flex items-center space-x-1"><span>Product Development</span></li>
            <li className="hover:text-slate-900 transition-colors cursor-pointer flex items-center space-x-1"><span>Cloud & Architecture</span></li>
            <li className="hover:text-slate-900 transition-colors cursor-pointer flex items-center space-x-1"><span>AI & Business Intelligence</span></li>
            <li className="hover:text-slate-900 transition-colors cursor-pointer flex items-center space-x-1"><span>Design Systems</span></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-slate-900 font-bold text-xs uppercase tracking-widest text-sky-600">{t('footer.stayUpdated')}</h4>
          <p className="text-xs text-slate-600">{t('footer.newsletterSub')}</p>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
            <div className="relative">
              <input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 transition-colors shadow-sm"
              />
              <button 
                type="submit" 
                className="absolute right-1 rtl:left-1 rtl:right-auto top-1 bottom-1 bg-sky-500 hover:bg-sky-600 text-white px-3 rounded text-xs font-semibold transition-colors flex items-center cursor-pointer shadow-sm"
              >
                <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </button>
            </div>
          </form>
        </div>

      </div>

      <div className="max-w-[1280px] mx-auto border-t border-slate-200 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 space-y-2 sm:space-y-0">
        <div>{t('footer.rights')}</div>
        <div className="flex space-x-6 rtl:space-x-reverse">
          <button onClick={() => setActivePage('privacy')} className="hover:text-sky-600 transition-colors cursor-pointer">{t('footer.privacyPolicy', 'Privacy Policy')}</button>
          <a href="#" className="hover:text-sky-600 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-sky-600 transition-colors">Security Specification</a>
        </div>
      </div>
    </footer>
  );
}
