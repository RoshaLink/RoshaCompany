import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Lightbulb, Layers, TrendingUp, Zap, ShieldCheck, Users } from 'lucide-react';

export default function PortfolioServicesModal({ isOpen, onClose }) {
  const { t, i18n } = useTranslation();
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      document.body.style.overflow = 'hidden';
    } else {
      setTimeout(() => setIsRendered(false), 300);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen && !isRendered) return null;

  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());

  const pillars = [
    {
      icon: Lightbulb,
      title: t('portfolioHero.feature1Title'),
      desc: t('portfolioHero.feature1Desc'),
      color: "from-amber-500 to-orange-600",
      bg: "bg-amber-50"
    },
    {
      icon: Layers,
      title: t('portfolioHero.feature2Title'),
      desc: t('portfolioHero.feature2Desc'),
      color: "from-sky-500 to-indigo-600",
      bg: "bg-sky-50"
    },
    {
      icon: TrendingUp,
      title: t('portfolioHero.feature3Title'),
      desc: t('portfolioHero.feature3Desc'),
      color: "from-emerald-500 to-teal-600",
      bg: "bg-emerald-50"
    },
    {
      icon: Zap,
      title: t('portfolioHero.feature4Title'),
      desc: t('portfolioHero.feature4Desc'),
      color: "from-purple-500 to-pink-600",
      bg: "bg-purple-50"
    },
    {
      icon: ShieldCheck,
      title: t('portfolioHero.feature5Title'),
      desc: t('portfolioHero.feature5Desc'),
      color: "from-rose-500 to-red-600",
      bg: "bg-rose-50"
    },
    {
      icon: Users,
      title: t('portfolioHero.feature6Title'),
      desc: t('portfolioHero.feature6Desc'),
      color: "from-cyan-500 to-blue-600",
      bg: "bg-cyan-50"
    }
  ];

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div 
        className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose}
      />
      
      <div className={`relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-all duration-300 transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}>
        
        {/* Header */}
        <div className="relative px-6 py-5 sm:px-8 sm:py-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
          <div className="pr-10 rtl:pr-0 rtl:pl-10">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-headline-xl">
              {t('portfolioHero.modalTitle')}
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              {t('portfolioHero.modalSubtitle')}
            </p>
          </div>
          <button 
            onClick={onClose}
            className={`absolute top-5 sm:top-6 ${isRTL ? 'left-5 sm:left-6' : 'right-5 sm:right-6'} p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors focus:outline-none`}
            aria-label={t('portfolioHero.modalClose', { defaultValue: 'Close' })}
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Content - 3x2 Card Grid */}
        <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx} 
                  className={`group flex flex-col p-5 rounded-2xl border border-slate-100 bg-white hover:border-transparent hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 ${isRTL ? 'text-right' : 'text-left'}`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${item.color} text-white shadow-md mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ${isRTL ? 'mr-0' : 'mr-auto'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
