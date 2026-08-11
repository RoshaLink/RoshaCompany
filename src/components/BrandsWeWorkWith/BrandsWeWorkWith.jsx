import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import "./BrandsWeWorkWith.css";

const TECH_ICONS_ROW1 = [
  { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Next.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Tailwind CSS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "AWS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Kubernetes", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
];

const TECH_ICONS_ROW2 = [
  { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "GraphQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
  { name: "PostgreSQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Figma", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "GitHub", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "GCP", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
];

const repeatedIcons = (icons, repeat = 4) => Array.from({ length: repeat }).flatMap(() => icons);

export default function BrandsWeWorkWith({ onOpenGetStarted, setActivePage }) {
  const { t } = useTranslation();

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.06)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 text-center z-10 space-y-6">

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-slate-900 font-headline-md w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto text-balance">
          {t('brands.title')}
        </h2>

        <p className="text-sm sm:text-base lg:text-xl xl:text-2xl text-slate-600 max-w-3xl mx-auto font-body-md leading-relaxed mt-4">
          {t('brands.subtitle')}
        </p>

        <div className="pt-6 flex flex-row flex-nowrap items-center justify-center gap-2 sm:gap-3.5 lg:gap-5 w-full">
          <button
            onClick={onOpenGetStarted}
            className="flex-1 sm:flex-none bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold font-label-md px-3 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-4 rounded-full shadow-[0_4px_20px_rgba(56,189,248,0.4)] transition-all duration-300 flex items-center justify-center space-x-1 sm:space-x-2.5 rtl:space-x-reverse active:scale-95 cursor-pointer border border-sky-400/40 text-[11px] sm:text-base lg:text-lg hover:shadow-[0_6px_25px_rgba(56,189,248,0.6)] whitespace-nowrap"
          >
            <span>{t('brands.auditBtn')}</span>

          </button>

          <button
            onClick={() => setActivePage ? setActivePage('services') : null}
            className="flex-1 sm:flex-none bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold font-label-md text-[11px] sm:text-base lg:text-lg py-3 px-3 sm:py-4 sm:px-7 lg:px-9 lg:py-4 rounded-full cursor-pointer transition-all duration-300 hover:border-sky-500 shadow-sm hover:shadow-md whitespace-nowrap text-center"
          >
            <span>{t('brands.exploreBtn')}</span>
          </button>
        </div>
      </div>

      {/* Carousel Container (Full Width) */}
      <div className="mt-12 lg:mt-16 overflow-hidden relative pb-4 pt-2 z-10 w-full">

        {/* Row 1 */}
        <div className="flex gap-8 lg:gap-10 whitespace-nowrap animate-scroll-left w-max">
          {repeatedIcons(TECH_ICONS_ROW1, 4).map((item, i) => (
            <div
              key={i}
              className="h-16 w-16 lg:h-24 lg:w-24 xl:h-28 xl:w-28 flex-shrink-0 rounded-xl lg:rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:border-sky-500 hover:scale-105 transition-all p-3 lg:p-4 group mx-4 lg:mx-5"
              title={item.name}
            >
              <img src={item.src} alt={item.name} className="h-9 w-9 lg:h-14 lg:w-14 xl:h-16 xl:w-16 object-contain" />
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex gap-8 lg:gap-10 whitespace-nowrap mt-6 lg:mt-8 animate-scroll-right w-max">
          {repeatedIcons(TECH_ICONS_ROW2, 4).map((item, i) => (
            <div
              key={i}
              className="h-16 w-16 lg:h-24 lg:w-24 xl:h-28 xl:w-28 flex-shrink-0 rounded-xl lg:rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:border-indigo-500 hover:scale-105 transition-all p-3 lg:p-4 group mx-4 lg:mx-5"
              title={item.name}
            >
              <img src={item.src} alt={item.name} className="h-9 w-9 lg:h-14 lg:w-14 xl:h-16 xl:w-16 object-contain" />
            </div>
          ))}
        </div>

        {/* Gradient Fade Overlays */}
        <div className="absolute left-0 top-0 h-full w-32 lg:w-64 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 h-full w-32 lg:w-64 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />

      </div>
    </section>
  );
}
