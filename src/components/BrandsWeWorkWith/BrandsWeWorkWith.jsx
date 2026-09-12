import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import "./BrandsWeWorkWith.css";

const TECH_ICONS_ROW1 = [
  { name: "React", src: "/tech-icons/react.svg" },
  { name: "TypeScript", src: "/tech-icons/typescript.svg" },
  { name: "Next.js", src: "/tech-icons/nextjs.svg" },
  { name: "Tailwind CSS", src: "/tech-icons/tailwindcss.svg" },
  { name: "AWS", src: "/tech-icons/aws.svg" },
  { name: "Docker", src: "/tech-icons/docker.svg" },
  { name: "Kubernetes", src: "/tech-icons/kubernetes.svg" },
];

const TECH_ICONS_ROW2 = [
  { name: "Python", src: "/tech-icons/python.svg" },
  { name: "Node.js", src: "/tech-icons/nodejs.svg" },
  { name: "GraphQL", src: "/tech-icons/graphql.svg" },
  { name: "PostgreSQL", src: "/tech-icons/postgresql.svg" },
  { name: "Figma", src: "/tech-icons/figma.svg" },
  { name: "GitHub", src: "/tech-icons/github.svg" },
  { name: "GCP", src: "/tech-icons/gcp.svg" },
];

const repeatedIcons = (icons, repeat = 4) => Array.from({ length: repeat }).flatMap(() => icons);

export default function BrandsWeWorkWith({ onOpenGetStarted, setActivePage }) {
  const { t } = useTranslation();
  const { lang } = useParams();

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

          <Link
            to={`/${lang}/services`}
            className="brands-btn-secondary"
          >
            <span>{t('brands.exploreBtn')}</span>
          </Link>
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
              <img
                src={item.src}
                alt={item.name}
                className="brands-card-img"
                width="36"
                height="36"
                loading="lazy"
                decoding="async"
              />
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
              <img
                src={item.src}
                alt={item.name}
                className="brands-card-img"
                width="36"
                height="36"
                loading="lazy"
                decoding="async"
              />
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
