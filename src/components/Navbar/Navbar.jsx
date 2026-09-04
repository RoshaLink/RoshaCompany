import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Home, Globe, Briefcase, Layers, Users, Mail, ChevronDown } from 'lucide-react';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import { useTheme } from '../../context/ThemeContext';
import { MenuBar } from '../ui/glow-menu';
import CurvedMobileMenu from '../ui/curved-menu';
import logoImg from '../../assets/Logo/RoshaLink_logo.webp';
import './Navbar.css';

// ponytail: the desktop pill/flip animation below is copy-pasted from
// ../ui/glow-menu's MenuBar (rather than reusing MenuBar directly) because
// this pass is scoped to Navbar.jsx/.css only -- MenuBar's internal <button>
// can't become a real <Link> without editing glow-menu.jsx. If MenuBar ever
// grows an `as`/`linkComponent` prop, drop this local copy and go back to
// <MenuBar items={glowMenuItems} .../>.
const glowMenuItemVariants = { initial: { rotateX: 0, opacity: 1 }, hover: { rotateX: -90, opacity: 0 } };
const glowMenuBackVariants = { initial: { rotateX: 90, opacity: 0 }, hover: { rotateX: 0, opacity: 1 } };
const glowMenuGlowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: 'spring', stiffness: 300, damping: 25 },
    },
  },
};
const glowMenuNavGlowVariants = { initial: { opacity: 0 }, hover: { opacity: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } } };
const glowMenuTransition = { type: 'spring', stiffness: 100, damping: 20, duration: 0.5 };

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

export default function Navbar({ activePage, setActivePage, onOpenGetStarted, onLanguageChange }) {
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
    if (onLanguageChange) {
      onLanguageChange(langCode);
    }
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

  // Navigation items for both desktop glow bar and mobile curved menu
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

  // Mobile navigation list (pure typography & numbering, without icons)
  const mobileNavItems = glowMenuItems.map(item => ({
    id: item.id,
    label: item.label,
    href: item.href,
  }));

  return (
    <>
      <header
        dir="ltr"
        className={`navbar-header ${isVisible ? 'navbar-header-visible' : 'navbar-header-hidden'}`}
      >
        <nav className="navbar-container" aria-label="Main Navigation">
          <div className="navbar-wrapper">

            {/* Brand Logo - Rosha Head Icon */}
            <div
              onClick={() => setActivePage('home')}
              className="navbar-logo"
            >
              <div className="navbar-logo-icon">
                <img src={logoImg} alt="RoshaLink Logo" className="navbar-logo-img" width="705" height="433" />
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
                  type="button"
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
                          type="button"
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`navbar-lang-option ${i18n.language === lang.code ? 'active' : ''}`}
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
                type="button"
                onClick={onOpenGetStarted}
                className="navbar-cta-btn"
              >
                <span>{t('nav.getStarted')}</span>
              </button>
            </div>

            {/* Mobile / Tablet Hamburger & Quick Switchers Toggle */}
            <div className="navbar-mobile-toggle">
              <div className="navbar-theme-wrapper">
                <ThemeSwitch 
                  isDark={isDark} 
                  onToggle={toggleTheme} 
                />
              </div>

              {/* Quick Language Cycle Button */}
              <button
                type="button"
                onClick={() => {
                  const nextLang = i18n.language === 'sv' ? 'en' : i18n.language === 'en' ? 'fa' : i18n.language === 'fa' ? 'ar' : 'sv';
                  handleLanguageChange(nextLang);
                }}
                className="px-2.5 py-1.5 min-h-11 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
                aria-label="Switch language"
              >
                <CurrentFlag /> <span>{currentLang.code.toUpperCase()}</span>
              </button>

              {/* High-End Animated Hamburger Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="navbar-hamburger-btn"
                aria-label={mobileMenuOpen ? (t('nav.closeMenu') || 'Close menu') : (t('nav.openMenu') || 'Open menu')}
                aria-expanded={mobileMenuOpen}
              >
                <div className="hamburger-icon-wrapper">
                  <span className={`hamburger-bar hamburger-bar-top ${mobileMenuOpen ? 'open' : ''}`} />
                  <span className={`hamburger-bar hamburger-bar-mid ${mobileMenuOpen ? 'open' : ''}`} />
                  <span className={`hamburger-bar hamburger-bar-bot ${mobileMenuOpen ? 'open' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* High-End Curved Mobile & Tablet Editorial Drawer Menu */}
      <CurvedMobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={mobileNavItems}
        activeItem={activePage}
        onItemClick={(id) => {
          setActivePage(id);
          setMobileMenuOpen(false);
        }}
        languages={LANGUAGES}
        currentLangCode={i18n.language}
        onLanguageChange={handleLanguageChange}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenGetStarted={onOpenGetStarted}
        isRtl={['fa', 'ar'].includes(i18n.language)}
        t={t}
      />
    </>
  );
}

