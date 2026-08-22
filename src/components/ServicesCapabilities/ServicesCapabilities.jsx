import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import './ServicesCapabilities.css';

const serviceThemes = {
  discovery: {
    theme: 'sky',
    gradient: 'from-sky-500 to-blue-600',
    accent: '#0284c7'
  },
  'web-architecture': {
    theme: 'indigo',
    gradient: 'from-indigo-500 to-purple-600',
    accent: '#6366f1'
  },
  'cloud-backend': {
    theme: 'emerald',
    gradient: 'from-emerald-500 to-teal-600',
    accent: '#059669'
  },
  'ai-automation': {
    theme: 'purple',
    gradient: 'from-purple-500 to-pink-600',
    accent: '#9333ea'
  },
  'mobile-apps': {
    theme: 'amber',
    gradient: 'from-amber-500 to-orange-600',
    accent: '#d97706'
  },
  'seo-performance': {
    theme: 'rose',
    gradient: 'from-rose-500 to-red-600',
    accent: '#e11d48'
  }
};

export default function ServicesCapabilities({ onOpenGetStarted }) {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());
  const rtlClass = isRTL ? 'is-rtl' : 'is-ltr';

  const rawServicesList = t('servicesPage.servicesList', { returnObjects: true }) || [];
  const [servicesList, setServicesList] = useState([]);
  const [cardDimensions, setCardDimensions] = useState({ width: 440, height: 525 });

  // Initialize service list with unique tempIds
  useEffect(() => {
    if (Array.isArray(rawServicesList) && rawServicesList.length > 0) {
      setServicesList(
        rawServicesList.map((service, idx) => ({
          ...service,
          tempId: service.id || `service-${idx}`
        }))
      );
    }
  }, [i18n.language]);

  // Responsive card dimensions
  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setCardDimensions({ width: w - 40, height: 530 });
      } else if (w < 768) {
        setCardDimensions({ width: 380, height: 520 });
      } else if (w < 1280) {
        setCardDimensions({ width: 430, height: 520 });
      } else {
        setCardDimensions({ width: 470, height: 525 });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Shift items left or right
  const handleMove = (steps) => {
    if (!servicesList.length || steps === 0) return;
    const newList = [...servicesList];

    if (steps > 0) {
      for (let i = 0; i < steps; i++) {
        const item = newList.shift();
        if (item) newList.push(item);
      }
    } else {
      for (let i = 0; i < Math.abs(steps); i++) {
        const item = newList.pop();
        if (item) newList.unshift(item);
      }
    }
    setServicesList(newList);
  };

  const handleSelectIndex = (targetIdx) => {
    const centerIdx = Math.floor(servicesList.length / 2);
    const steps = targetIdx - centerIdx;
    handleMove(steps);
  };

  if (!servicesList.length) return null;

  const centerIndex = Math.floor(servicesList.length / 2);

  return (
    <section id="core-capabilities" className={`stagger-services-section ${rtlClass}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background Ambient Glows */}
      <div className="stagger-services-glow-1" />
      <div className="stagger-services-glow-2" />

      <div className="stagger-services-container">
        {/* Section Header */}
        <div className="stagger-services-header">
          <h2 className="stagger-services-title">
            {t('servicesPage.servicesSection.title')}
          </h2>

          <p className="stagger-services-subtitle">
            {t('servicesPage.servicesSection.subtitle')}
          </p>
        </div>

        {/* 3D Staggered Carousel Stage */}
        <div className="stagger-services-stage-wrapper">
          <div className="stagger-services-stage">
            {servicesList.map((service, index) => {
              const position = index - centerIndex;
              const isCenter = position === 0;
              const themeConfig = serviceThemes[service.id] || serviceThemes.discovery;

              // Hide far cards off-screen for crisp performance
              const isVisible = Math.abs(position) <= 2;
              if (!isVisible) return null;

              return (
                <div
                  key={service.tempId || service.id || index}
                  onClick={() => !isCenter && handleMove(position)}
                  className={`stagger-service-card ${isCenter ? 'is-center' : 'is-side'} theme-${themeConfig.theme} ${rtlClass}`}
                  style={{
                    width: cardDimensions.width,
                    height: cardDimensions.height,
                    transform: `
                      translate(-50%, -50%)
                      translateX(${position * (cardDimensions.width * 0.42)}px)
                      translateY(${isCenter ? -35 : Math.abs(position) * 20 + (position % 2 ? 10 : -10)}px)
                      scale(${isCenter ? 1 : Math.max(0.85, 1 - Math.abs(position) * 0.12)})
                      rotate(${isCenter ? 0 : isRTL ? -position * 2.8 : position * 2.8}deg)
                    `,
                    zIndex: isCenter ? 25 : 20 - Math.abs(position),
                    opacity: 1
                  }}
                >
                  {/* Decorative Geometric Corner Accent Line */}
                  <span className="stagger-card-corner-line" />

                  {/* Card Glow Highlight */}
                  <div className="stagger-card-ambient-glow" />

                  {/* Title & Desc */}
                  <h3 className="stagger-card-title">
                    {service.title}
                  </h3>

                  <p className="stagger-card-desc">
                    {service.desc}
                  </p>

                  {/* Deliverables Checklist */}
                  {Array.isArray(service.deliverables) && (
                    <div className="stagger-deliverables-box">
                      <span className="stagger-deliverables-label">
                        {t('servicesPage.servicesSection.deliverablesLabel')}
                      </span>
                      <ul className="stagger-deliverables-list">
                        {service.deliverables.slice(0, 4).map((item, dIdx) => (
                          <li key={dIdx} className="stagger-deliverable-item">
                            <CheckCircle2 className="stagger-check-icon" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech Tags */}
                  {Array.isArray(service.techTags) && (
                    <div className="stagger-tags-box">
                      {service.techTags.map((tag, tIdx) => (
                        <span key={tIdx} className="stagger-tech-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Navigation Controls (Arrows + Number Indicator Dots) */}
          <div className="stagger-services-controls">
            <button
              type="button"
              onClick={() => handleMove(isRTL ? 1 : -1)}
              className="stagger-ctrl-btn"
              aria-label="Previous capability"
            >
              <ChevronLeft className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
            </button>

            {/* Indicator Pills */}
            <div className="stagger-indicators-wrapper">
              {servicesList.map((service, idx) => {
                const isCurrent = idx === centerIndex;
                return (
                  <button
                    key={service.tempId || idx}
                    type="button"
                    onClick={() => handleSelectIndex(idx)}
                    className={`stagger-indicator-dot ${isCurrent ? 'is-active' : ''}`}
                    aria-label={`Go to ${service.title || idx + 1}`}
                  >
                    <span>{idx + 1}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => handleMove(isRTL ? -1 : 1)}
              className="stagger-ctrl-btn"
              aria-label="Next capability"
            >
              <ChevronRight className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
