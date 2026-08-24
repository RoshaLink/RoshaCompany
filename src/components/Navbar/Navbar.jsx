import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Sparkles, Home, Globe, Briefcase, Layers, Users, Mail, ChevronDown } from 'lucide-react';
import { MenuBar } from '../ui/glow-menu';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

const SwedenFlag = () => (
  <svg className="w-4 h-3 rounded-[2px] shadow-sm shrink-0 overflow-hidden inline-block" viewBox="0 0 16 10" fill="none">
    <rect width="16" height="10" fill="#006AA7" />
    <rect x="5" width="2" height="10" fill="#FECC00" />
    <rect y="4" width="16" height="2" fill="#FECC00" />
  </svg>
);

const UkFlag = () => (
  <svg className="w-4 h-3 rounded-[2px] shadow-sm shrink-0 overflow-hidden inline-block" viewBox="0 0 60 30" fill="none">
    <rect width="60" height="30" fill="#012169" />
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="8" />
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
    <path d="M30,0 V30 M0,15 H60" stroke="#FFFFFF" strokeWidth="10" />
    <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
  </svg>
);

const IranFlag = () => (
  <svg className="w-4 h-3 rounded-[2px] shadow-sm shrink-0 overflow-hidden inline-block" viewBox="0 0 16 10" fill="none">
    <rect width="16" height="3.33" y="0" fill="#239F40" />
    <rect width="16" height="3.33" y="3.33" fill="#FFFFFF" />
    <rect width="16" height="3.34" y="6.66" fill="#DA0000" />
    <circle cx="8" cy="5" r="1.1" fill="#DA0000" />
  </svg>
);

const ArabicFlag = () => (
  <svg className="w-4 h-3 rounded-[2px] shadow-sm shrink-0 overflow-hidden inline-block" viewBox="0 0 16 10" fill="none">
    <rect width="16" height="3.33" y="0" fill="#007A3D" />
    <rect width="16" height="3.33" y="3.33" fill="#FFFFFF" />
    <rect width="16" height="3.34" y="6.66" fill="#000000" />
    <rect width="4" height="10" x="0" y="0" fill="#CE1126" />
  </svg>
);

const LANGUAGES = [
  { code: 'sv', label: 'Svenska', Flag: SwedenFlag },
  { code: 'en', label: 'English', Flag: UkFlag },
  { code: 'fa', label: 'فارسی', Flag: IranFlag },
  { code: 'ar', label: 'العربية', Flag: ArabicFlag },
];

export default function Navbar({ activePage, setActivePage, onOpenGetStarted }) {
  const { isDark, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const currentLang = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];
  const CurrentFlag = currentLang.Flag;

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setLangMenuOpen(false);
    const isRtl = ['fa', 'ar'].includes(langCode);
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = langCode;
  };

  useEffect(() => {
    const isRtl = ['fa', 'ar'].includes(i18n.language);
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language || 'sv';
  }, [i18n.language]);

  // Handle scroll to hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Scrolling down
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true); // Scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const glowMenuItems = [
    {
      id: 'home',
      label: t('nav.home'),
      icon: Home,
      href: '#',
      gradient: "radial-gradient(circle, rgba(56,189,248,0.2) 0%, rgba(2,132,199,0.08) 50%, rgba(255,255,255,0) 100%)",
      iconColor: "text-sky-600",
    },
    {
      id: 'portfolio',
      label: t('nav.portfolio'),
      icon: Briefcase,
      href: '#',
      gradient: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(129,140,248,0.08) 50%, rgba(255,255,255,0) 100%)",
      iconColor: "text-indigo-600",
    },
    {
      id: 'services',
      label: t('nav.services'),
      icon: Layers,
      href: '#',
      gradient: "radial-gradient(circle, rgba(14,165,233,0.2) 0%, rgba(56,189,248,0.08) 50%, rgba(255,255,255,0) 100%)",
      iconColor: "text-sky-500",
    },
    {
      id: 'about',
      label: t('nav.about'),
      icon: Users,
      href: '#',
      gradient: "radial-gradient(circle, rgba(168,85,247,0.2) 0%, rgba(192,132,252,0.08) 50%, rgba(255,255,255,0) 100%)",
      iconColor: "text-purple-600",
    },
    {
      id: 'contact',
      label: t('nav.contact'),
      icon: Mail,
      href: '#',
      gradient: "radial-gradient(circle, rgba(245,158,11,0.2) 0%, rgba(251,191,36,0.08) 50%, rgba(255,255,255,0) 100%)",
      iconColor: "text-amber-600",
    },
  ];

  return (
    <header
      dir="ltr"
      className={`navbar-header ${isVisible ? 'navbar-header-visible' : 'navbar-header-hidden'
        }`}
    >
      <nav className="navbar-container">
        <div className="navbar-wrapper">

          {/* Brand Logo - Rosha Head Icon */}
          <div
            onClick={() => setActivePage('home')}
            className="navbar-logo"
          >
            <div className="navbar-logo-icon">
              <svg
                className="w-full h-full text-[#0ea5e9]"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Rosha Head Outer Frame */}
                <rect x="2" y="2" width="28" height="28" rx="8" stroke="currentColor" strokeWidth="3" />
                {/* Left Eye */}
                <rect x="10.5" y="10" width="3" height="12" rx="1.5" fill="currentColor" />
                {/* Right Eye */}
                <rect x="18.5" y="10" width="3" height="12" rx="1.5" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* Desktop 3D Glow Menu Bar */}
          <div className="hidden lg:block">
            <MenuBar
              items={glowMenuItems}
              activeItem={activePage}
              onItemClick={(labelOrId) => {
                const matched = glowMenuItems.find(
                  item => item.id === labelOrId || item.label.toLowerCase() === labelOrId.toLowerCase()
                );
                if (matched) {
                  setActivePage(matched.id);
                } else {
                  setActivePage(labelOrId);
                }
              }}
            />
          </div>

          {/* Language Switcher & CTA Button */}
          <div className="navbar-actions">
            <ThemeSwitch isDark={isDark} onToggle={toggleTheme} size="12px" />

            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="navbar-lang-btn"
              >
                <CurrentFlag />
                <span>{currentLang.label}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {langMenuOpen && (
                <div className="navbar-lang-dropdown animate-in fade-in-0 slide-in-from-top-2 duration-150">
                  {LANGUAGES.map((lang) => {
                    const OptionFlag = lang.Flag;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`navbar-lang-option ${i18n.language === lang.code ? 'active' : ''
                          }`}
                      >
                        <OptionFlag />
                        <span>{lang.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* CTA Button */}
            <button
              onClick={onOpenGetStarted}
              className="navbar-cta-btn"
            >
              <span>{t('nav.getStarted')}</span>
            </button>
          </div>

          {/* Mobile Hamburger & Lang Switcher Toggle */}
          <div className="navbar-mobile-toggle">
            <div className="navbar-theme-wrapper">
              <ThemeSwitch 
                isDark={isDark} 
                onToggle={toggleTheme} 
              />
            </div>
            <button
              onClick={() => {
                const nextLang = i18n.language === 'sv' ? 'en' : i18n.language === 'en' ? 'fa' : i18n.language === 'fa' ? 'ar' : 'sv';
                handleLanguageChange(nextLang);
              }}
              // min-h-11 (44px touch-target minimum; the visible pill was
              // ~30px from py-1.5 + text-xs alone).
              className="px-2.5 py-1.5 min-h-11 rounded-full bg-white/80 border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-1.5"
            >
              <CurrentFlag /> <span>{currentLang.code.toUpperCase()}</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              // min-h-11 min-w-11 (44px touch-target minimum; p-2 around a
              // 20px icon alone was 36px square).
              className="text-slate-800 p-2 min-h-11 min-w-11 flex items-center justify-center rounded-full bg-white/80 hover:bg-slate-200 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-sky-600" /> : <Menu className="w-5 h-5 text-slate-800" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="navbar-mobile-drawer animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-3 font-label-md">
              {glowMenuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left rtl:text-right py-2 px-3 rounded-xl transition-colors flex items-center space-x-3 rtl:space-x-reverse ${activePage === item.id
                    ? 'bg-sky-50 text-sky-600 font-bold border-l-2 rtl:border-r-2 rtl:border-l-0 border-sky-500'
                    : 'text-slate-700 hover:bg-slate-100'
                    }`}
                >
                  <item.icon className={`w-4 h-4 ${item.iconColor}`} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between px-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </span>
              <ThemeSwitch isDark={isDark} onToggle={toggleTheme} size="12px" />
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGetStarted();
              }}
              className="navbar-cta-btn w-full justify-center"
            >
              <span>{t('nav.getStarted')}</span>
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
