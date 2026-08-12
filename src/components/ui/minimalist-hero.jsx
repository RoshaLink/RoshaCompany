import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './minimalist-hero.css';

export const MinimalistHero = ({
  teamMembers,
  currentIndex,
  onPrev,
  onNext,
  onSelectIndex,
  onOpenGetStarted,
  className,
}) => {
  const { t } = useTranslation();
  const currentMember = teamMembers[currentIndex] || teamMembers[0];
  const theme = currentMember.theme || "sky";

  return (
    <div
      className={`hero-section hero-theme-${theme} ${className || ''}`}
    >
      {/* Background Ambient Decorative Elements */}
      <div className="hero-ambient-1" />
      <div className="hero-ambient-2" />

      {/* Main Fullscreen Grid Layout */}
      <div className="hero-grid">

        {/* Left Side: Description/Quote & CTA Button */}
        <div className="hero-content-col is-ltr">
          <AnimatePresence mode="wait">
            <motion.div
              key={`left-${currentIndex}`}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="hero-quote-wrapper"
            >

              {/* Quote / Glassmorphic Box */}
              <div className="hero-quote-box group">
                {/* Top Glass Highlight Specular Line */}
                <div className="hero-quote-hl-top" />
                
                {/* Bottom subtle edge highlight */}
                <div className="hero-quote-hl-bottom" />

                {/* Corner Glass Ambient Glow */}
                <div className="hero-quote-ambient" />

                {/* Glass Badge Icon */}
                <div className="hero-quote-icon-wrap">
                  <Quote className="hero-quote-icon" />
                </div>

                {/* Quote Content */}
                <p className="hero-quote-text">
                  "{currentMember.quote}"
                </p>
              </div>

              {/* Action Button */}
              <div>
                <button
                  onClick={onOpenGetStarted}
                  className="hero-btn-action"
                >
                  <span>{t('whoWeAre.bookBtn') || 'Boka ett möte'}</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Center: Circle Backdrop & Member Portrait */}
        <div className="hero-image-col">

          {/* Circle Backdrop */}
          <motion.div
            key={`circle-${currentIndex}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="hero-circle"
          />

          {/* Member Image with Framer Motion */}
          <AnimatePresence mode="wait">
            <motion.img
              key={`img-${currentIndex}`}
              src={currentMember.src}
              alt={currentMember.name}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1.18 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="hero-portrait"
            />
          </AnimatePresence>
        </div>

        {/* Right Side: Name & Navigation Controls */}
        <div className="hero-info-col is-ltr">
          <AnimatePresence mode="wait">
            <motion.div
              key={`right-${currentIndex}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="hero-info-title-wrap"
            >
              <span className="hero-designation">
                {currentMember.designation}
              </span>
              <h1 className="hero-name">
                {currentMember.name}
              </h1>
            </motion.div>
          </AnimatePresence>

          {/* Controls: Member Counter & Left/Right Arrow Buttons */}
          <div className="hero-controls">

            {/* Index Counter & Clickable Navigation Dots */}
            <div className="hero-dots-wrap">
              <div className="hero-counter">
                <span className="hero-counter-current">0{currentIndex + 1}</span>
                <span className="hero-counter-slash">/</span>
                <span>0{teamMembers.length}</span>
              </div>
              <div className="hero-dots">
                {teamMembers.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSelectIndex(idx)}
                    className={`hero-dot ${idx === currentIndex ? 'is-active' : ''}`}
                    title={`Go to team member ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Left & Right Arrow Buttons */}
            <div className="hero-arrows">
              <button
                onClick={onPrev}
                className="hero-btn-arrow"
                title="Previous Member"
              >
                <ChevronLeft className="hero-arrow-icon" />
              </button>
              <button
                onClick={onNext}
                className="hero-btn-arrow"
                title="Next Member"
              >
                <ChevronRight className="hero-arrow-icon" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

