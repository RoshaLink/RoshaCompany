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
    <section className="relative py-16 overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.06)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 text-center z-10 space-y-6">

        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 font-headline-md max-w-3xl mx-auto">
          {t('brands.title')}
        </h2>

        <p className="text-base lg:text-lg text-slate-600 max-w-2xl mx-auto font-body-md leading-relaxed">
          {t('brands.subtitle')}
        </p>

        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={onOpenGetStarted}
            size="lg"
            className="rounded-lg px-8 py-3.5 text-sm font-bold flex items-center justify-center space-x-2 rtl:space-x-reverse bg-sky-500 hover:bg-sky-600 text-white shadow-[0_4px_20px_rgba(56,189,248,0.35)]"
          >
            <span>{t('brands.auditBtn')}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Button>

          <Button
            onClick={() => setActivePage ? setActivePage('services') : null}
            variant="outline"
            size="lg"
            className="rounded-lg px-8 py-3.5 text-sm font-bold border-slate-300 text-slate-800 bg-white hover:bg-slate-100"
          >
            {t('brands.exploreBtn')}
          </Button>
        </div>

        {/* Carousel Container */}
        <div className="mt-12 overflow-hidden relative pb-4 pt-2">

          {/* Row 1 */}
          <div className="flex gap-8 whitespace-nowrap animate-scroll-left">
            {repeatedIcons(TECH_ICONS_ROW1, 4).map((item, i) => (
              <div
                key={i}
                className="h-16 w-16 flex-shrink-0 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:border-sky-500 hover:scale-105 transition-all p-3 group"
                title={item.name}
              >
                <img src={item.src} alt={item.name} className="h-9 w-9 object-contain" />
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex gap-8 whitespace-nowrap mt-6 animate-scroll-right">
            {repeatedIcons(TECH_ICONS_ROW2, 4).map((item, i) => (
              <div
                key={i}
                className="h-16 w-16 flex-shrink-0 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:border-indigo-500 hover:scale-105 transition-all p-3 group"
                title={item.name}
              >
                <img src={item.src} alt={item.name} className="h-9 w-9 object-contain" />
              </div>
            ))}
          </div>

          {/* Gradient Fade Overlays */}
          <div className="absolute left-0 top-0 h-full w-28 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 h-full w-28 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />

        </div>
      </div>
    </section>
  );
}
