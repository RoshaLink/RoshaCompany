import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import './curved-menu.css';

const MENU_SLIDE_LTR = {
  initial: { x: 'calc(100% + 100px)' },
  enter: {
    x: '0%',
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    x: 'calc(100% + 100px)',
    transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
  },
};

const MENU_SLIDE_RTL = {
  initial: { x: 'calc(-100% - 100px)' },
  enter: {
    x: '0%',
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    x: 'calc(-100% - 100px)',
    transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
  },
};

const NAV_CONTAINER_VARIANTS = {
  initial: {},
  enter: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const NAV_ITEM_VARIANTS_LTR = {
  initial: { opacity: 0, x: 50 },
  enter: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
  },
  exit: {
    opacity: 0,
    x: 30,
    transition: { duration: 0.3, ease: [0.7, 0, 0.84, 0] },
  },
};

const NAV_ITEM_VARIANTS_RTL = {
  initial: { opacity: 0, x: -50 },
  enter: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: { duration: 0.3, ease: [0.7, 0, 0.84, 0] },
  },
};

/**
 * Animated SVG Curve creating a dynamic fluid membrane edge for the sliding drawer
 */
function DynamicCurve({ isRtl, isDark }) {
  const [height, setHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 800
  );

  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fillColor = isDark ? '#0b1326' : '#ffffff';

  if (isRtl) {
    // Curve positioned on the right edge of the RTL drawer (left side of screen)
    const initialPath = `M0 0 L0 ${height} L0 ${height} Q100 ${height / 2} 0 0`;
    const targetPath = `M0 0 L0 ${height} L0 ${height} Q-100 ${height / 2} 0 0`;

    const curveVariants = {
      initial: { d: initialPath },
      enter: {
        d: targetPath,
        transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
      },
      exit: {
        d: initialPath,
        transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
      },
    };

    return (
      <svg
        className="absolute top-0 -right-[99px] w-[100px] stroke-none h-full pointer-events-none hidden sm:block"
        style={{ fill: fillColor }}
        aria-hidden="true"
      >
        <motion.path
          variants={curveVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        />
      </svg>
    );
  }

  // Curve positioned on the left edge of the LTR drawer (right side of screen)
  const initialPath = `M100 0 L200 0 L200 ${height} L100 ${height} Q-100 ${height / 2} 100 0`;
  const targetPath = `M100 0 L200 0 L200 ${height} L100 ${height} Q100 ${height / 2} 100 0`;

  const curveVariants = {
    initial: { d: initialPath },
    enter: {
      d: targetPath,
      transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <svg
      className="absolute top-0 -left-[99px] w-[100px] stroke-none h-full pointer-events-none hidden sm:block"
      style={{ fill: fillColor }}
      aria-hidden="true"
    >
      <motion.path
        variants={curveVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      />
    </svg>
  );
}

/**
 * Editorial Numbered Nav Link (Strictly No Icons)
 */
function EditorialNavLink({
  index,
  item,
  isActive,
  onClick,
  isRtl,
}) {
  const itemVariants = isRtl ? NAV_ITEM_VARIANTS_RTL : NAV_ITEM_VARIANTS_LTR;
  const numString = String(index + 1).padStart(2, '0');

  return (
    <motion.button
      type="button"
      variants={itemVariants}
      onClick={() => onClick(item.id)}
      className={`curved-nav-link group ${isActive ? 'active' : ''}`}
      whileHover={{ x: isRtl ? -8 : 8 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <div className="flex items-baseline">
        <span className="curved-nav-link-number">{numString}.</span>
        <span className="curved-nav-link-text">{item.label}</span>
      </div>

      {isActive && (
        <motion.span
          layoutId="activeNavIndicator"
          className="curved-nav-active-dot"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </motion.button>
  );
}

/**
 * Curved Editorial Navigation Menu Component
 */
export default function CurvedMobileMenu({
  isOpen,
  onClose,
  navItems = [],
  activeItem = 'home',
  onItemClick,
  languages = [],
  currentLangCode = 'sv',
  onLanguageChange,
  isDark = false,
  onToggleTheme,
  onOpenGetStarted,
  isRtl = false,
}) {
  const { t } = useTranslation();

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const slideVariants = isRtl ? MENU_SLIDE_RTL : MENU_SLIDE_LTR;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            className="curved-menu-backdrop"
            aria-hidden="true"
          />

          {/* Sliding Curved Drawer Panel */}
          <motion.div
            variants={slideVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className={`curved-menu-drawer ${isRtl ? 'is-rtl' : 'is-ltr'}`}
            role="dialog"
            aria-modal="true"
            aria-label={t('nav.navigation') || 'Navigation'}
          >
            {/* Top Header Section */}
            <div className="curved-menu-header">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                <span className="text-xs uppercase tracking-widest font-mono font-semibold text-slate-600 dark:text-slate-400">
                  {t('nav.navigation') || 'Navigation'}
                </span>
              </div>

              {/* Close Button with High-Contrast Adaptive Light/Dark Theme */}
              <button
                type="button"
                onClick={onClose}
                aria-label={t('nav.closeMenu') || 'Close menu'}
                className="curved-menu-close-btn"
              >
                <svg
                  className="w-4 h-4 stroke-[2.5]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Links Area (Typography & Numbers, No Icons) */}
            <div className="flex-1 py-4 px-6 sm:px-10 flex flex-col justify-center">
              <motion.nav
                variants={NAV_CONTAINER_VARIANTS}
                initial="initial"
                animate="enter"
                exit="exit"
                className="flex flex-col"
                aria-label="Mobile Main Navigation"
              >
                {navItems.map((item, idx) => (
                  <EditorialNavLink
                    key={item.id}
                    index={idx}
                    item={item}
                    isActive={activeItem === item.id}
                    onClick={(id) => {
                      onItemClick(id);
                      onClose();
                    }}
                    isRtl={isRtl}
                  />
                ))}
              </motion.nav>
            </div>

            {/* Bottom Footer Section: Language Switcher, Theme Toggle, CTA */}
            <div className="curved-menu-footer">
              {/* Language Selection Pills */}
              {languages.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                    Language
                  </span>
                  <div className="curved-lang-container">
                    {languages.map((lang) => {
                      const isSelected = lang.code === currentLangCode;
                      const OptionFlag = lang.Flag;
                      return (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => {
                            onLanguageChange(lang.code);
                          }}
                          className={`curved-lang-btn ${isSelected ? 'active' : ''}`}
                        >
                          <OptionFlag />
                          <span>{lang.code.toUpperCase()}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Theme Toggle Row */}
              <div className="flex items-center justify-between py-1">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 font-mono">
                  {isDark ? (t('nav.darkMode') || 'Dark Mode') : (t('nav.lightMode') || 'Light Mode')}
                </span>
                <ThemeSwitch isDark={isDark} onToggle={onToggleTheme} size="13px" />
              </div>

              {/* Call to Action Button */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onOpenGetStarted) onOpenGetStarted();
                }}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-sky-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer border-none"
              >
                <span>{t('nav.getStarted') || 'Get Started'}</span>
                <span className="text-base rtl:rotate-180">→</span>
              </button>

              {/* Brand Watermark Tagline */}
              <div className="text-center pt-1">
                <p className="text-[11px] font-mono tracking-widest text-slate-500 dark:text-slate-400 uppercase">
                  RoshaLink • {t('nav.tagline') || 'Bespoke Digital Architecture'}
                </p>
              </div>
            </div>

            {/* Dynamic Bezier SVG Membrane Curve */}
            <DynamicCurve isRtl={isRtl} isDark={isDark} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
