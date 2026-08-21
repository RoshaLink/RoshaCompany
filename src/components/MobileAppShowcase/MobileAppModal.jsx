import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Smartphone, Share2, BellRing, Link, LayoutTemplate, ShieldCheck } from 'lucide-react';

export default function MobileAppModal({ isOpen, onClose }) {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      setTimeout(() => setIsVisible(true), 10);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setIsRendered(false), 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isRendered) return null;

  const features = [
    {
      icon: Smartphone,
      title: t('mobileApp.feature1Title'),
      desc: t('mobileApp.feature1Desc'),
      color: "from-sky-500 to-indigo-600",
      shadow: "shadow-indigo-500/20"
    },
    {
      icon: Share2,
      title: t('mobileApp.feature2Title'),
      desc: t('mobileApp.feature2Desc'),
      color: "from-indigo-600 to-purple-600",
      shadow: "shadow-purple-500/20"
    },
    {
      icon: BellRing,
      title: t('mobileApp.feature3Title'),
      desc: t('mobileApp.feature3Desc'),
      color: "from-purple-500 to-pink-600",
      shadow: "shadow-pink-500/20"
    },
    {
      icon: Link,
      title: t('mobileApp.feature4Title'),
      desc: t('mobileApp.feature4Desc'),
      color: "from-sky-400 to-blue-500",
      shadow: "shadow-sky-500/20"
    },
    {
      icon: LayoutTemplate,
      title: t('mobileApp.feature5Title'),
      desc: t('mobileApp.feature5Desc'),
      color: "from-indigo-500 to-blue-600",
      shadow: "shadow-indigo-500/20"
    },
    {
      icon: ShieldCheck,
      title: t('mobileApp.feature6Title'),
      desc: t('mobileApp.feature6Desc'),
      color: "from-teal-500 to-emerald-600",
      shadow: "shadow-teal-500/20"
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6 py-6 sm:py-12 pointer-events-none select-none">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm pointer-events-auto transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Modal Container */}
      <div 
        className={`relative w-full max-w-5xl max-h-[90vh] bg-white rounded-3xl sm:rounded-[2rem] shadow-2xl flex flex-col pointer-events-auto overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}
      >
        {/* Header */}
        <div className="relative shrink-0 px-6 sm:px-10 py-6 sm:py-8 border-b border-slate-100 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-white to-sky-50/80" />
          <div className={`absolute top-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-500 ${isRTL ? 'right-0' : 'left-0'}`} />
          
          <div className="relative flex items-center justify-between gap-4">
            <div className={`space-y-1 sm:space-y-2 ${isRTL ? 'text-right' : 'text-left'}`}>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
                {t('mobileApp.modalTitle')}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 font-medium">
                {t('mobileApp.modalSubtitle')}
              </p>
            </div>
            
            <button 
              onClick={onClose}
              className="shrink-0 p-2 sm:p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-colors"
              title={t('mobileApp.closeBtn')}
              aria-label={t('mobileApp.closeBtn')}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto min-h-0 px-6 sm:px-10 py-8 sm:py-10 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-10 sm:gap-y-12">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className={`flex items-start gap-4 sm:gap-5 group ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}>
                  {/* Icon */}
                  <div className={`shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${item.color} ${item.shadow} text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300`}>
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  
                  {/* Text */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className={`shrink-0 px-6 sm:px-10 py-5 sm:py-6 bg-slate-50 border-t border-slate-100 flex items-center ${isRTL ? 'justify-start' : 'justify-end'}`}>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-bold rounded-xl shadow-sm hover:shadow transition-all active:scale-95 text-sm sm:text-base"
          >
            {t('mobileApp.closeBtn')}
          </button>
        </div>
      </div>
    </div>
  );
}
