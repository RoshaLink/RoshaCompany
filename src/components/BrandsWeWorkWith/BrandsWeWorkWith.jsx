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
    <section className="brands-section">
      <div className="brands-pattern" />

      <div className="brands-content">

        <h2 className="brands-title">
          {t('brands.title')}
        </h2>

        <p className="brands-subtitle">
          {t('brands.subtitle')}
        </p>

        <div className="brands-actions">
          <button
            onClick={onOpenGetStarted}
            className="brands-btn-primary"
          >
            <span>{t('brands.auditBtn')}</span>
          </button>

          <button
            onClick={() => setActivePage ? setActivePage('services') : null}
            className="brands-btn-secondary"
          >
            <span>{t('brands.exploreBtn')}</span>
          </button>
        </div>
      </div>

      {/* Carousel Container (Full Width) */}
      <div className="brands-carousel">

        {/* Row 1 */}
        <div className="brands-row-left">
          {repeatedIcons(TECH_ICONS_ROW1, 4).map((item, i) => (
            <div
              key={i}
              className="brands-card brands-card-primary group"
              title={item.name}
            >
              <img src={item.src} alt={item.name} className="brands-card-img" />
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="brands-row-right">
          {repeatedIcons(TECH_ICONS_ROW2, 4).map((item, i) => (
            <div
              key={i}
              className="brands-card brands-card-secondary group"
              title={item.name}
            >
              <img src={item.src} alt={item.name} className="brands-card-img" />
            </div>
          ))}
        </div>

        {/* Gradient Fade Overlays */}
        <div className="brands-fade-left" />
        <div className="brands-fade-right" />

      </div>
    </section>
  );
}
