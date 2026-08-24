import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import './ProjectCard.css';

export default function ProjectCard({ project, onPreview }) {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);

  if (!project) return null;

  const translationKey = project.translationKey || 'perspolisProject';

  const category = t(`${translationKey}.category`, { defaultValue: project.category });
  const title = t(`${translationKey}.title`, { defaultValue: project.title });
  const desc = t(`${translationKey}.desc`, { defaultValue: project.desc });
  const feature1 = t(`${translationKey}.feature1`, { defaultValue: project.features?.[0] });
  const feature2 = t(`${translationKey}.feature2`, { defaultValue: project.features?.[1] });
  const feature3 = t(`${translationKey}.feature3`, { defaultValue: project.features?.[2] });
  const previewBtn = t(`${translationKey}.previewBtn`, { defaultValue: 'مشاهده پیش‌نمایش' });

  const featuresList = [feature1, feature2, feature3].filter(Boolean);

  return (
    <div className={`project-card ${isRTL ? 'text-right' : 'text-left'}`}>

      {/* TOP MEDIA AREA (LIVE WEBSITE IFRAME MOCKUP OR IMAGE) */}
      <div 
        className="project-card-media cursor-pointer"
        onClick={() => onPreview && onPreview(project)}
      >
        <div className={`relative w-full ${project.isFeatured ? 'h-[440px] sm:h-[520px] md:h-[580px] lg:h-[520px] xl:h-[620px] 2xl:h-[700px]' : 'h-72 sm:h-80 md:h-96 lg:h-80 xl:h-[420px]'} flex items-center justify-center overflow-hidden`}>
          {project.liveUrl ? (
            <div className="w-full h-full relative group">
              <iframe
                src={project.liveUrl}
                title={title}
                className="w-full h-full border-0 select-none bg-white transition-opacity duration-300 pointer-events-none"
                loading="lazy"
                tabIndex={-1}
              />

              {/* Hover Overlay Button */}
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPreview && onPreview(project);
                  }}
                  className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-xl flex items-center justify-center transform group-hover:scale-105 transition-all cursor-pointer"
                >
                  <span>{previewBtn}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full h-full relative group">
              <img
                src={project.img}
                alt={title}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 select-none"
              />
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPreview && onPreview(project);
                  }}
                  className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-xl flex items-center justify-center transform group-hover:scale-105 transition-all cursor-pointer"
                >
                  <span>{previewBtn}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CARD DETAILS CONTENT */}
      <div className="project-card-details">
        <div className="project-card-body space-y-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <span className="project-card-category">
              {category}
            </span>
          </div>

          <h3 className="project-card-title">
            {title}
          </h3>

          <p className="project-card-desc">
            {desc}
          </p>
        </div>

        {/* BOTTOM ACTION GROUP: FEATURES ACCORDION + PREVIEW BUTTON */}
        <div className="project-card-bottom-group">
          {/* EXPANDABLE ACCORDION FOR KEY FEATURES (VERTICAL FULL-WIDTH STACK) */}
          {featuresList.length > 0 && (
            <div className="project-card-features-wrapper">
              <button
                type="button"
                onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                className="project-card-features-btn"
              >
                <span>
                  {isFeaturesOpen
                    ? t('portfolioHero.featuresToggleClose', { defaultValue: 'بستن ویژگی‌ها' })
                    : t('portfolioHero.featuresToggleOpen', { defaultValue: 'بیشتر بدانید (ویژگی‌های کلیدی)' })}
                </span>
                <ChevronDown className={`w-4 h-4 features-btn-chevron transition-transform duration-300 ${isFeaturesOpen ? 'rotate-180' : ''}`} />
              </button>

              {isFeaturesOpen && (
                <div className="project-card-features-list">
                  {featuresList.map((feat, idx) => (
                    <div 
                      key={idx} 
                      className="project-card-feature-item"
                    >
                      <CheckCircle2 className="w-4 h-4 feature-item-icon shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SINGLE PREVIEW BUTTON ONLY */}
          <div className="project-card-footer">
            <button
              type="button"
              onClick={() => onPreview && onPreview(project)}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-sm sm:text-base px-8 py-3.5 sm:py-4 rounded-xl shadow-lg hover:shadow-sky-500/30 flex items-center justify-center transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>{previewBtn}</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
