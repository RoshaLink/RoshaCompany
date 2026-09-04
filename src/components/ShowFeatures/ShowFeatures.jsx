import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import DisplayCards from "../ui/display-cards";
import { Sparkles, Cpu, Layers, Zap, ArrowRight, ShieldCheck } from "lucide-react";
import "./ShowFeatures.css";

export default function ShowFeatures({ onOpenGetStarted, setActivePage }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams();

  const cards = [
    {
      icon: <Zap className="size-4 text-sky-500" />,
      title: "AI-Powered Systems",
      description: "Generative LLM & Real-Time Telemetry",
      date: "v4.2 Architecture",
      iconClassName: "text-sky-600",
      titleClassName: "text-sky-600",
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-white/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Layers className="size-4 text-indigo-500" />,
      title: "Nexus Design Tokens",
      description: "400+ Production React Components",
      date: "ISO 27001 Certified",
      iconClassName: "text-indigo-600",
      titleClassName: "text-indigo-600",
      className:
        "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-white/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Cpu className="size-4 text-sky-600" />,
      title: "Micro-Frontend Engine",
      description: "Sub-20ms Transaction Performance",
      date: "99.99% SLA Uptime",
      iconClassName: "text-sky-600",
      titleClassName: "text-sky-600",
      className:
        "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10 border-sky-400/60 shadow-lg",
    },
  ];

  return (
    <section className="relative py-24 px-4 md:px-12 bg-white overflow-hidden">
      
      {/* Background Glow */}
      <div className="ambient-glow-cyan top-1/2 left-1/4 -translate-y-1/2 opacity-30 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column */}
        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold font-headline-md text-slate-900 leading-tight">
            {t('features.title')}
          </h2>

          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-body-md">
            {t('features.subtitle')}
          </p>

          <div className="space-y-3 pt-2 text-sm text-slate-800 font-body-md">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <span>{t('features.bullet1')}</span>
            </div>

            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
                <Layers className="w-3.5 h-3.5" />
              </div>
              <span>{t('features.bullet2')}</span>
            </div>

            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0">
                <Zap className="w-3.5 h-3.5" />
              </div>
              <span>{t('features.bullet3')}</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button
              onClick={onOpenGetStarted}
              className="bg-sky-500 hover:bg-sky-600 text-white font-label-md font-bold px-8 py-3.5 rounded-lg transition-all shadow-[0_4px_20px_rgba(56,189,248,0.35)] flex items-center justify-center space-x-2 rtl:space-x-reverse active:scale-95 cursor-pointer"
            >
              <span>{t('features.exploreBtn')}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>

            <button
              onClick={() => {
                navigate(`/${lang}/services`);
                // Preserve side-effect logic for backward compatibility
                if (setActivePage) {
                  setActivePage('services');
                }
              }}
              className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-label-md text-sm font-semibold px-6 py-3.5 rounded-lg transition-all cursor-pointer text-center shadow-sm"
            >
              {t('features.viewSpecBtn')}
            </button>
          </div>

        </div>

        {/* Right Column */}
        <div className="lg:col-span-6 flex items-center justify-center py-12 lg:py-0">
          <div className="w-full max-w-md">
            <DisplayCards cards={cards} />
          </div>
        </div>

      </div>
    </section>
  );
}
