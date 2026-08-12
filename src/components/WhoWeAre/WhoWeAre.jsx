import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MinimalistHero } from '../ui/minimalist-hero';
import './WhoWeAre.css';

import MortezaPortrait from '../../assets/OurPictures/MortezaPortrait.png';
import BellaPortrait from '../../assets/OurPictures/BellaPortrait.png';
import SohrabPortrait from '../../assets/OurPictures/SohrabPortrait.png';
import MinaPortrait from '../../assets/OurPictures/MinaPortrait.png';
import MiladPortrait from '../../assets/OurPictures/MiladPortrait.png';

const TEAM_IMAGES = [
  { 
    src: MortezaPortrait,
    colors: {
      circle: "from-sky-400 via-sky-500 to-blue-600 shadow-[0_0_60px_rgba(56,189,248,0.35)]",
      button: "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-[0_4px_20px_rgba(56,189,248,0.35)]",
      text: "text-sky-600",
      badge: "bg-sky-50 border-sky-200 text-sky-600",
      quoteIcon: "text-sky-500",
      dotActive: "bg-sky-500 shadow-[0_0_10px_rgba(56,189,248,0.6)]"
    }
  },
  { 
    src: BellaPortrait,
    colors: {
      circle: "from-emerald-400 via-emerald-500 to-teal-600 shadow-[0_0_60px_rgba(16,185,129,0.35)]",
      button: "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-[0_4px_20px_rgba(16,185,129,0.35)]",
      text: "text-emerald-600",
      badge: "bg-emerald-50 border-emerald-200 text-emerald-600",
      quoteIcon: "text-emerald-500",
      dotActive: "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)]"
    }
  },
  { 
    src: SohrabPortrait,
    colors: {
      circle: "from-indigo-400 via-indigo-500 to-purple-600 shadow-[0_0_60px_rgba(99,102,241,0.35)]",
      button: "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-[0_4px_20px_rgba(99,102,241,0.35)]",
      text: "text-indigo-600",
      badge: "bg-indigo-50 border-indigo-200 text-indigo-600",
      quoteIcon: "text-indigo-500",
      dotActive: "bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.6)]"
    }
  },
  { 
    src: MinaPortrait,
    colors: {
      circle: "from-pink-400 via-pink-500 to-rose-600 shadow-[0_0_60px_rgba(236,72,153,0.35)]",
      button: "bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-[0_4px_20px_rgba(236,72,153,0.35)]",
      text: "text-pink-600",
      badge: "bg-pink-50 border-pink-200 text-pink-600",
      quoteIcon: "text-pink-500",
      dotActive: "bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.6)]"
    }
  },
  { 
    src: MiladPortrait,
    colors: {
      circle: "from-amber-400 via-amber-500 to-orange-600 shadow-[0_0_60px_rgba(245,158,11,0.35)]",
      button: "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-[0_4px_20px_rgba(245,158,11,0.35)]",
      text: "text-amber-600",
      badge: "bg-amber-50 border-amber-200 text-amber-600",
      quoteIcon: "text-amber-500",
      dotActive: "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.6)]"
    }
  },
];

export default function WhoWeAre({ setActivePage, onOpenGetStarted }) {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const translatedTeam = t('whoWeAre.team', { returnObjects: true });
  const teamMembers = TEAM_IMAGES.map((imgs, idx) => ({
    ...imgs,
    name: Array.isArray(translatedTeam) ? (translatedTeam[idx]?.name || "") : "",
    designation: Array.isArray(translatedTeam) ? (translatedTeam[idx]?.designation || "") : "",
    quote: Array.isArray(translatedTeam) ? (translatedTeam[idx]?.quote || "") : "",
  }));

  // Auto-switch every 5 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, teamMembers.length]);

  const handlePrev = () => {
    if (isRTL) {
      setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
    } else {
      setCurrentIndex((prev) => (prev === 0 ? teamMembers.length - 1 : prev - 1));
    }
  };

  const handleNext = () => {
    if (isRTL) {
      setCurrentIndex((prev) => (prev === 0 ? teamMembers.length - 1 : prev - 1));
    } else {
      setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
    }
  };

  return (
    <section className="relative w-full bg-white overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="ambient-glow-purple top-1/2 right-1/4 -translate-y-1/2 opacity-25 pointer-events-none" />
      <div className="ambient-glow-cyan bottom-10 left-1/4 opacity-20 pointer-events-none" />

      <div className="w-full h-full relative z-10">
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="w-full h-full"
        >
          <MinimalistHero
            teamMembers={teamMembers}
            currentIndex={currentIndex}
            onPrev={handlePrev}
            onNext={handleNext}
            onSelectIndex={setCurrentIndex}
            onOpenGetStarted={onOpenGetStarted}
          />
        </div>
      </div>

    </section>
  );
}
