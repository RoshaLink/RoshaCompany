import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Palette,
  Code2,
  ShieldCheck,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import './ServicesDeliveryProcess.css';

const stageVisuals = {
  1: {
    icon: Compass,
    theme: 'sky',
    gradient: 'from-sky-500 to-blue-600',
    accentColor: '#0284c7'
  },
  2: {
    icon: Palette,
    theme: 'indigo',
    gradient: 'from-indigo-500 to-purple-600',
    accentColor: '#6366f1'
  },
  3: {
    icon: Code2,
    theme: 'emerald',
    gradient: 'from-emerald-500 to-teal-600',
    accentColor: '#059669'
  },
  4: {
    icon: ShieldCheck,
    theme: 'purple',
    gradient: 'from-purple-500 to-pink-600',
    accentColor: '#9333ea'
  }
};

const positionStyles = [
  { scale: 1, y: 15 },
  { scale: 0.94, y: -20 },
  { scale: 0.88, y: -55 }
];

const exitAnimation = {
  y: 360,
  scale: 1,
  opacity: 0,
  zIndex: 15
};

const enterAnimation = {
  y: -55,
  scale: 0.88,
  opacity: 1
};

export default function ServicesDeliveryProcess({ onOpenGetStarted }) {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());
  const rtlClass = isRTL ? 'is-rtl' : 'is-ltr';

  const stagesData = [
    {
      id: 1,
      num: t('servicesPage.process.step1Num'),
      title: t('servicesPage.process.step1Title'),
      desc: t('servicesPage.process.step1Desc'),
      badge: t('servicesPage.process.stageBadge1'),
      tags: t('servicesPage.process.step1Tags', { returnObjects: true }) || []
    },
    {
      id: 2,
      num: t('servicesPage.process.step2Num'),
      title: t('servicesPage.process.step2Title'),
      desc: t('servicesPage.process.step2Desc'),
      badge: t('servicesPage.process.stageBadge2'),
      tags: t('servicesPage.process.step2Tags', { returnObjects: true }) || []
    },
    {
      id: 3,
      num: t('servicesPage.process.step3Num'),
      title: t('servicesPage.process.step3Title'),
      desc: t('servicesPage.process.step3Desc'),
      badge: t('servicesPage.process.stageBadge3'),
      tags: t('servicesPage.process.step3Tags', { returnObjects: true }) || []
    },
    {
      id: 4,
      num: t('servicesPage.process.step4Num'),
      title: t('servicesPage.process.step4Title'),
      desc: t('servicesPage.process.step4Desc'),
      badge: t('servicesPage.process.stageBadge4'),
      tags: t('servicesPage.process.step4Tags', { returnObjects: true }) || []
    }
  ];

  // Active top index (0 to 3)
  const [activeStageIdx, setActiveStageIdx] = useState(0);

  // Deck cards list
  const [cards, setCards] = useState([
    { id: 1, stageIndex: 0 },
    { id: 2, stageIndex: 1 },
    { id: 3, stageIndex: 2 }
  ]);
  const [nextUniqueId, setNextUniqueId] = useState(4);

  const handleNext = () => {
    const nextIdx = (activeStageIdx + 1) % 4;
    setActiveStageIdx(nextIdx);

    const nextCardStage = (cards[2].stageIndex + 1) % 4;
    setCards([...cards.slice(1), { id: nextUniqueId, stageIndex: nextCardStage }]);
    setNextUniqueId((prev) => prev + 1);
  };

  const handlePrev = () => {
    const prevIdx = (activeStageIdx - 1 + 4) % 4;
    setActiveStageIdx(prevIdx);

    const prevCardStage = (cards[0].stageIndex - 1 + 4) % 4;
    setCards([{ id: nextUniqueId, stageIndex: prevCardStage }, ...cards.slice(0, 2)]);
    setNextUniqueId((prev) => prev + 1);
  };

  const handleSelectStage = (targetIdx) => {
    if (targetIdx === activeStageIdx) return;
    setActiveStageIdx(targetIdx);

    const c0 = targetIdx;
    const c1 = (targetIdx + 1) % 4;
    const c2 = (targetIdx + 2) % 4;

    setCards([
      { id: nextUniqueId, stageIndex: c0 },
      { id: nextUniqueId + 1, stageIndex: c1 },
      { id: nextUniqueId + 2, stageIndex: c2 }
    ]);
    setNextUniqueId((prev) => prev + 3);
  };

  return (
    <section className={`services-process-section ${rtlClass}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background Ambient Glows */}
      <div className="process-glow-1" />
      <div className="process-glow-2" />

      <div className="services-container">
        {/* Section Header */}
        <div className="services-section-header">
          <h2 className="services-section-title">
            {t('servicesPage.process.title')}
          </h2>
          <p className="services-section-subtitle">
            {t('servicesPage.process.subtitle')}
          </p>
        </div>

        {/* 4 Stage Stepper Pills Tab Bar */}
        <div className="process-tabs-bar">
          {stagesData.map((stage, idx) => {
            const isCurrent = idx === activeStageIdx;
            const themeConfig = stageVisuals[stage.id];

            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => handleSelectStage(idx)}
                className={`process-tab-btn theme-${themeConfig.theme} ${isCurrent ? 'is-active' : ''}`}
              >
                <span className="process-tab-num">{stage.num}</span>
                <span className="process-tab-title">{stage.title}</span>
              </button>
            );
          })}
        </div>

        {/* Animated Stacked Deck Stage */}
        <div className="process-deck-wrapper">
          <div className="process-deck-stage">
            <AnimatePresence initial={false}>
              {cards.slice(0, 3).map((card, index) => {
                const stage = stagesData[card.stageIndex];
                const themeConfig = stageVisuals[stage.id];
                const IconComp = themeConfig.icon;
                const { scale, y } = positionStyles[index] ?? positionStyles[2];
                const zIndex = 10 - index;
                const isFront = index === 0;

                return (
                  <motion.div
                    key={card.id}
                    initial={index === 2 ? enterAnimation : undefined}
                    animate={{ y, scale }}
                    exit={isFront ? exitAnimation : undefined}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 24
                    }}
                    style={{
                      zIndex,
                      left: '50%',
                      x: '-50%',
                      bottom: 0
                    }}
                    className={`process-animated-card theme-${themeConfig.theme} ${isFront ? 'is-front' : 'is-back'} ${rtlClass}`}
                  >
                    {/* Card Inner Glow & Accent Border */}
                    <div className="process-card-glow" />

                    <div className="process-card-content">
                      {/* Top Header Row with Stage Badge and Large Step Number */}
                      <div className="process-card-top-row">
                        <div className="process-card-badge-box">
                          <div className="process-card-icon-box">
                            <IconComp className="process-card-icon" />
                          </div>
                          <span className="process-card-badge">
                            {stage.badge}
                          </span>
                        </div>

                        <div className="process-card-step-num">
                          {stage.num}
                        </div>
                      </div>

                      {/* Stage Headline */}
                      <h3 className="process-card-heading">
                        {stage.title}
                      </h3>

                      {/* Stage Description */}
                      <p className="process-card-paragraph">
                        {stage.desc}
                      </p>

                      {/* Deliverable Focus Checklist Tags */}
                      {Array.isArray(stage.tags) && (
                        <div className="process-card-tags-box">
                          {stage.tags.map((tag, tIdx) => (
                            <div key={tIdx} className="process-card-tag-item">
                              <CheckCircle2 className="process-tag-check-icon" />
                              <span>{tag}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Bottom Action Footer */}
                      <div className="process-card-bottom-action">
                        <button
                          type="button"
                          onClick={handleNext}
                          className="process-card-btn-next"
                        >
                          <span>{t('servicesPage.process.nextStage')}</span>
                          <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Navigation Controls below card deck */}
          <div className="process-deck-controls">
            <button
              type="button"
              onClick={isRTL ? handleNext : handlePrev}
              className="process-deck-nav-btn"
              aria-label="Previous delivery stage"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="process-deck-status">
              <span>
                {t('servicesPage.process.stageCounter', {
                  current: activeStageIdx + 1,
                  total: 4
                })}
              </span>
            </div>

            <button
              type="button"
              onClick={isRTL ? handlePrev : handleNext}
              className="process-deck-nav-btn"
              aria-label="Next delivery stage"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
