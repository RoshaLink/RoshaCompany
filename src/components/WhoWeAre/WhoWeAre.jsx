import React from 'react';
import { useTranslation } from 'react-i18next';
import CircularTestimonials from '../ui/circular-testimonials';
import { Users, ArrowRight } from 'lucide-react';
import './WhoWeAre.css';

import MortezaPortrait from '../../assets/OurPictures/MortezaPortrait.png';
import MortezaFullBody from '../../assets/OurPictures/MortezaFullBody.png';
import BellaPortrait from '../../assets/OurPictures/BellaPortrait.png';
import BellaFullBody from '../../assets/OurPictures/BellaFullBody.png';
import SohrabPortrait from '../../assets/OurPictures/SohrabPortrait.jpg';
import SohrabFullbody from '../../assets/OurPictures/SohrabFullbody.jpg';
import MinaPortrait from '../../assets/OurPictures/MinaPortrait.png';
import MinaFullBody from '../../assets/OurPictures/MinaFullBody.png';
import MiladPortrait from '../../assets/OurPictures/MiladPortrait.png';
import MiladFullBody from '../../assets/OurPictures/MiladFullBody.png';

const TEAM_IMAGES = [
  { src: MortezaPortrait, hoverSrc: MortezaFullBody },
  { src: BellaPortrait, hoverSrc: BellaFullBody },
  { src: SohrabPortrait, hoverSrc: SohrabFullbody },
  { src: MinaPortrait, hoverSrc: MinaFullBody },
  { src: MiladPortrait, hoverSrc: MiladFullBody },
];

export default function WhoWeAre({ setActivePage, onOpenGetStarted }) {
  const { t } = useTranslation();

  // Combine translated text with static image imports
  const translatedTeam = t('whoWeAre.team', { returnObjects: true });
  const teamMembers = TEAM_IMAGES.map((imgs, idx) => ({
    ...imgs,
    name: translatedTeam[idx]?.name || "",
    designation: translatedTeam[idx]?.designation || "",
    quote: translatedTeam[idx]?.quote || "",
  }));

  return (
    <section className="relative py-24 px-4 md:px-12 bg-white overflow-hidden border-y border-slate-200">

      {/* Background Radial Glow */}
      <div className="ambient-glow-purple top-1/2 right-1/4 -translate-y-1/2 opacity-35 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto space-y-12 relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 bg-sky-50 px-3.5 py-1 rounded-full border border-sky-200 text-xs font-label-sm text-sky-600 shadow-sm rtl:space-x-reverse">
            <Users className="w-3.5 h-3.5" />
            <span>{t('whoWeAre.badge')}</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold font-headline-md text-slate-900">
            {t('whoWeAre.title')}
          </h2>

          <p className="text-slate-600 text-sm md:text-base leading-relaxed font-body-md">
            {t('whoWeAre.subtitle')}
          </p>
        </div>

        {/* 3D Circular Team Carousel Component */}
        <div className="glass-card rounded-3xl p-6 md:p-12 border border-slate-200 flex justify-center shadow-lg bg-white/90">
          <CircularTestimonials
            testimonials={teamMembers}
            autoplay={true}
            colors={{
              name: "#0f172a",
              designation: "#0284c7",
              testimony: "#334155",
              arrowBackground: "#f1f5f9",
              arrowForeground: "#0284c7",
              arrowHoverBackground: "#38bdf8",
            }}
            fontSizes={{
              name: "28px",
              designation: "16px",
              quote: "18px",
            }}
          />
        </div>

        {/* Action Callout */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-slate-100 rounded-2xl p-6 md:p-8 border border-slate-200 gap-4">
          <div className="space-y-1 text-center sm:text-left rtl:sm:text-right">
            <h4 className="text-lg font-bold text-slate-900 font-headline-md">{t('whoWeAre.calloutTitle')}</h4>
            <p className="text-xs text-slate-600">{t('whoWeAre.calloutSub')}</p>
          </div>
          <button
            onClick={onOpenGetStarted}
            className="bg-sky-500 hover:bg-sky-600 text-white font-label-md font-bold px-6 py-3 rounded-lg transition-all shadow-[0_4px_20px_rgba(56,189,248,0.35)] flex items-center space-x-2 rtl:space-x-reverse whitespace-nowrap cursor-pointer"
          >
            <span>{t('whoWeAre.bookBtn')}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>

      </div>
    </section>
  );
}
