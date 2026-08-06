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
  { src: MortezaPortrait },
  { src: BellaPortrait },
  { src: SohrabPortrait },
  { src: MinaPortrait },
  { src: MiladPortrait },
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
