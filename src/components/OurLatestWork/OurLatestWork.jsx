import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  ContainerAnimated,
  ContainerStagger,
  GalleryGrid,
  GalleryGridCell,
} from "../ui/cta-section-with-gallery";
import { Button } from "../ui/button";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import "./OurLatestWork.css";

const GALLERY_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    title: "Vanguard Global Banking Platform",
    category: "FinTech Dashboard"
  },
  {
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    title: "Apex AI Predictive Engine",
    category: "AI Analytics Suite"
  },
  {
    url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    title: "BioPulse Health Intelligence",
    category: "HealthTech Telemetry"
  },
  {
    url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
    title: "OmniCore SaaS Design System",
    category: "Enterprise System"
  },
];

export default function OurLatestWork({ setActivePage, onOpenGetStarted }) {
  const { t, i18n } = useTranslation();

  return (
    <section className="relative py-24 px-4 md:px-12 bg-slate-50/60 overflow-hidden border-y border-slate-200">
      
      {/* Ambient background glow */}
      <div className="ambient-glow-cyan top-1/3 right-1/4 opacity-30 pointer-events-none" />

      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-12 md:grid-cols-2 relative z-10">
        
        {/* Left Column: Copywriting & CTA */}
        <ContainerStagger className="space-y-6">
          <ContainerAnimated className="text-3xl md:text-5xl font-bold font-headline-md text-slate-900 leading-tight">
            {t('ourWork.titlePrefix')}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600">
              {t('ourWork.titleGradient')}
            </span>
          </ContainerAnimated>

          <ContainerAnimated className="text-slate-600 text-base md:text-lg leading-relaxed font-body-md">
            {t('ourWork.subtitle')}
          </ContainerAnimated>

          <ContainerAnimated className="space-y-2 text-sm text-slate-800 font-body-md pt-2">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <CheckCircle2 className="w-4 h-4 text-sky-500 flex-shrink-0" />
              <span>{t('ourWork.bullet1')}</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <CheckCircle2 className="w-4 h-4 text-sky-500 flex-shrink-0" />
              <span>{t('ourWork.bullet2')}</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <CheckCircle2 className="w-4 h-4 text-sky-500 flex-shrink-0" />
              <span>{t('ourWork.bullet3')}</span>
            </div>
          </ContainerAnimated>

          <ContainerAnimated className="pt-4 flex flex-col sm:flex-row gap-4">
            <Link to={`/${i18n.language}/portfolio`}>
              <Button
                size="lg"
                className="rounded-lg px-8 py-3.5 text-sm font-bold flex items-center space-x-2 rtl:space-x-reverse bg-sky-500 hover:bg-sky-600 text-white shadow-[0_4px_20px_rgba(56,189,248,0.35)]"
              >
                <span>{t('ourWork.explorePortfolio')}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Button>
            </Link>

            <Button
              onClick={onOpenGetStarted}
              variant="outline"
              size="lg"
              className="rounded-lg px-6 py-3.5 text-sm font-bold border-slate-300 text-slate-800 bg-white hover:bg-slate-50"
            >
              {t('ourWork.startProject')}
            </Button>
          </ContainerAnimated>
        </ContainerStagger>

        {/* Right Column: Animated Gallery Grid */}
        <div className="w-full flex justify-center py-6">
          <GalleryGrid className="w-full max-w-md md:max-w-lg">
            {GALLERY_IMAGES.map((img, index) => (
              <GalleryGridCell index={index} key={index}>
                <img
                  className="size-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  width="100%"
                  height="100%"
                  src={img.url}
                  alt={img.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                  <span className="text-[10px] font-label-sm text-sky-400 uppercase font-semibold">{img.category}</span>
                  <span className="text-xs font-bold text-white font-headline-md truncate">{img.title}</span>
                </div>
              </GalleryGridCell>
            ))}
          </GalleryGrid>
        </div>

      </div>
    </section>
  );
}
