import React from 'react';
import { useTranslation } from 'react-i18next';
import { Eye, CheckCircle2 } from 'lucide-react';

export default function ProjectCard({ project, onPreview }) {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());

  if (!project) return null;

  const translationKey = project.translationKey || 'perspolisProject';

  const category = t(`${translationKey}.category`, { defaultValue: project.category });
  const title = t(`${translationKey}.title`, { defaultValue: project.title });
  const desc = t(`${translationKey}.desc`, { defaultValue: project.desc });
  const featuredBadge = t(`${translationKey}.featuredBadge`, { defaultValue: '★ Featured Case Study' });
  const feature1 = t(`${translationKey}.feature1`, { defaultValue: project.features?.[0] });
  const feature2 = t(`${translationKey}.feature2`, { defaultValue: project.features?.[1] });
  const feature3 = t(`${translationKey}.feature3`, { defaultValue: project.features?.[2] });
  const previewBtn = t(`${translationKey}.previewBtn`, { defaultValue: 'مشاهده پیش‌نمایش تعاملی' });

  const featuresList = [feature1, feature2, feature3].filter(Boolean);

  return (
    <div className={`rounded-3xl overflow-hidden border border-slate-200/90 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between ${isRTL ? 'text-right' : 'text-left'}`}>
      
      {/* TOP MEDIA AREA (LIVE WEBSITE IFRAME MOCKUP OR IMAGE) */}
      <div className="relative w-full bg-white rounded-t-3xl overflow-hidden border-b border-slate-200">
        <div className={`relative w-full ${project.isFeatured ? 'h-[460px] md:h-[540px]' : 'h-72 md:h-80'} bg-white flex items-center justify-center overflow-hidden`}>
          {project.liveUrl ? (
            <div className="w-full h-full relative group">
              <iframe 
                src={project.liveUrl} 
                title={title}
                className="w-full h-full border-0 select-none bg-white transition-opacity duration-300"
                loading="lazy"
              />
              
              {/* Hover Overlay Button */}
              <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                <button
                  onClick={() => onPreview && onPreview(project)}
                  className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-xl flex items-center gap-2 transform group-hover:scale-105 transition-all cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>{previewBtn}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full h-full relative group">
              <img 
                src={project.img} 
                alt={title} 
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                onClick={() => onPreview && onPreview(project)}
              />
              <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                <button
                  onClick={() => onPreview && onPreview(project)}
                  className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-xl flex items-center gap-2 transform group-hover:scale-105 transition-all cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>{previewBtn}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CARD DETAILS CONTENT */}
      <div className="p-8 space-y-6 flex-1 flex flex-col justify-between bg-white text-slate-900 transition-colors">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <span className="text-xs font-extrabold text-sky-600 tracking-wider uppercase">
              {category}
            </span>
            {project.isFeatured && (
              <span className="bg-amber-100/80 text-amber-800 border border-amber-300/80 px-3.5 py-1 rounded-full text-xs font-bold shadow-2xs">
                {featuredBadge}
              </span>
            )}
          </div>

          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug tracking-tight">
            {title}
          </h3>

          <p className="text-slate-700 text-sm md:text-base leading-relaxed font-normal">
            {desc}
          </p>
        </div>

        {featuresList.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-2">
            {featuresList.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-slate-100 px-3 py-2.5 rounded-xl border border-slate-300/80 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>
        )}

        {/* SINGLE PREVIEW BUTTON ONLY */}
        <div className="pt-4 border-t border-slate-200 flex justify-center">
          <button 
            onClick={() => onPreview && onPreview(project)}
            className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-lg hover:shadow-sky-500/30 flex items-center justify-center space-x-2 transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <Eye className="w-4 h-4" />
            <span>{previewBtn}</span>
          </button>
        </div>

      </div>

    </div>
  );
}
