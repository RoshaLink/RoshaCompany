import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MinimalistHero } from '../ui/minimalist-hero';
import './WhoWeAre.css';

import MortezaPortrait from '../../assets/OurPictures/MortezaPortrait.webp';
import BellaPortrait from '../../assets/OurPictures/BellaPortrait.webp';
import SohrabPortrait from '../../assets/OurPictures/SohrabPortrait.webp';
import MinaPortrait from '../../assets/OurPictures/MinaPortrait.webp';
import MiladPortrait from '../../assets/OurPictures/MiladPortrait.webp';

const TEAM_IMAGES = [
  { 
    src: MortezaPortrait,
    theme: "sky"
  },
  { 
    src: BellaPortrait,
    theme: "emerald"
  },
  { 
    src: SohrabPortrait,
    theme: "indigo"
  },
  { 
    src: MinaPortrait,
    theme: "pink"
  },
  { 
    src: MiladPortrait,
    theme: "amber"
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
    <section className="whoweare-section">
      
      {/* Background Ambient Glows */}
      <div className="whoweare-glow-1" />
      <div className="whoweare-glow-2" />

      <div className="whoweare-container">
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="whoweare-wrapper"
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
