import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Server,
  Cpu,
  ShieldCheck,
  Sparkles,
  Palette,
  Layers,
  Database,
  Zap,
  Radio,
  Bot,
  Search,
  Terminal,
  Box,
  Globe,
  GitBranch
} from 'lucide-react';
import GlassCard from '../ui/glass-card';
import './ServicesTechMatrix.css';

const tabConfigs = {
  frontend: {
    icon: Code2,
    cards: [
      { icon: Code2, theme: 'sky' },
      { icon: Sparkles, theme: 'indigo' },
      { icon: Palette, theme: 'purple' },
      { icon: Layers, theme: 'emerald' }
    ]
  },
  backend: {
    icon: Server,
    cards: [
      { icon: Server, theme: 'emerald' },
      { icon: Database, theme: 'sky' },
      { icon: Zap, theme: 'amber' },
      { icon: Radio, theme: 'indigo' }
    ]
  },
  ai: {
    icon: Cpu,
    cards: [
      { icon: Bot, theme: 'purple' },
      { icon: Search, theme: 'sky' },
      { icon: Cpu, theme: 'emerald' },
      { icon: Terminal, theme: 'amber' }
    ]
  },
  cloud: {
    icon: ShieldCheck,
    cards: [
      { icon: Box, theme: 'sky' },
      { icon: Globe, theme: 'amber' },
      { icon: ShieldCheck, theme: 'emerald' },
      { icon: GitBranch, theme: 'purple' }
    ]
  }
};

export default function ServicesTechMatrix() {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());
  const [activeTab, setActiveTab] = useState('frontend');

  const tabs = [
    { id: 'frontend', label: t('servicesPage.techMatrix.tabFrontend'), icon: Code2 },
    { id: 'backend', label: t('servicesPage.techMatrix.tabBackend'), icon: Server },
    { id: 'ai', label: t('servicesPage.techMatrix.tabAi'), icon: Cpu },
    { id: 'cloud', label: t('servicesPage.techMatrix.tabCloud'), icon: ShieldCheck }
  ];

  // Retrieve current category items from i18n
  const currentCategoryCards = t(`servicesPage.techMatrix.${activeTab}`, { returnObjects: true }) || [];
  const currentConfig = tabConfigs[activeTab] || tabConfigs.frontend;

  return (
    <section className="services-techmatrix-section" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background Ambient Glows */}
      <div className="techmatrix-ambient-glow-1" />
      <div className="techmatrix-ambient-glow-2" />

      <div className="services-container">
        {/* Section Header */}
        <div className="services-section-header">
          <h2 className="services-section-title">
            {t('servicesPage.techMatrix.title')}
          </h2>
          <p className="services-section-subtitle">
            {t('servicesPage.techMatrix.subtitle')}
          </p>
        </div>

        {/* Tab Selector Buttons Bar */}
        <div className="services-tabs-bar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`services-tab-btn ${isActive ? 'is-active' : ''}`}
              >
                <span className="services-tab-text">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3D Glass Cards Grid */}
        <div className="techmatrix-cards-grid-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="techmatrix-cards-grid"
            >
              {Array.isArray(currentCategoryCards) &&
                currentCategoryCards.map((item, idx) => {
                  const cardConf = currentConfig.cards[idx] || currentConfig.cards[0];
                  const IconComp = cardConf.icon;

                  return (
                    <GlassCard
                      key={idx}
                      title={item.title}
                      description={item.desc}
                      icon={IconComp}
                      theme={cardConf.theme}
                      isRTL={isRTL}
                    />
                  );
                })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
