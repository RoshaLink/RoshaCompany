import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Pause, Sparkles, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import './BrandShowcaseGrid.css';

const SHOWCASE_STORIES = [
  {
    id: 0,
    title: "Nexus Brand & Product Identity",
    subtitle: "Complete Design System & 3D Glassmorphic Collateral",
    mainImg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop",
    topRightImg: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop",
    bottomLeftImg: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop",
    bottomMidImg: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop",
    bottomRightImg: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop"
  },
  {
    id: 1,
    title: "FinTech Enterprise Ecosystem",
    subtitle: "Global Banking Dashboard & Event-Driven Architecture",
    mainImg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop",
    topRightImg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop",
    bottomLeftImg: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop",
    bottomMidImg: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop",
    bottomRightImg: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "AI Predictive Engine Suite",
    subtitle: "Real-Time Telemetry & Machine Learning Workflows",
    mainImg: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&auto=format&fit=crop",
    topRightImg: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&auto=format&fit=crop",
    bottomLeftImg: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop",
    bottomMidImg: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop",
    bottomRightImg: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop"
  }
];

export default function BrandShowcaseGrid({ setActivePage, onOpenGetStarted }) {
  const { t } = useTranslation();
  const [activeStory, setActiveStory] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const current = SHOWCASE_STORIES[activeStory];

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setActiveStory((s) => (s + 1) % SHOWCASE_STORIES.length);
            return 0;
          }
          return prev + 1.25;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="relative py-24 px-4 md:px-12 bg-white overflow-hidden border-y border-slate-200">
      
      {/* Header */}
      <div className="max-w-[1280px] mx-auto text-center space-y-3 mb-12">
        <div className="inline-flex items-center space-x-2 bg-sky-50 px-3.5 py-1 rounded-full border border-sky-200 text-xs font-label-sm text-sky-600 shadow-sm rtl:space-x-reverse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('brandGrid.badge')}</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold font-headline-md text-slate-900">
          {t('brandGrid.title')}
        </h2>
        <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto font-body-md">
          {t('brandGrid.subtitle')}
        </p>
      </div>

      {/* Main Container Card */}
      <div className="max-w-[1280px] mx-auto glass-card rounded-3xl p-6 md:p-8 bg-slate-900 border border-slate-800 shadow-2xl relative space-y-6">
        
        {/* Story Title & Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
          <div>
            <h3 className="text-xl md:text-2xl font-bold font-headline-md text-white">{current.title}</h3>
            <p className="text-xs text-sky-400 font-label-md">{current.subtitle}</p>
          </div>
          <button
            onClick={onOpenGetStarted}
            className="bg-sky-500 hover:bg-sky-600 text-white text-xs font-label-md font-bold px-4 py-2 rounded-lg transition-all flex items-center space-x-1.5 rtl:space-x-reverse self-start sm:self-center cursor-pointer shadow-sm"
          >
            <span>{t('brandGrid.requestKit')}</span>
            <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </button>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          
          {/* Top Left */}
          <div className="col-span-12 lg:col-span-7 showcase-grid-card h-64 md:h-80 flex flex-col justify-between p-6 bg-gradient-to-br from-slate-900 to-slate-950 relative group">
            <div className="flex justify-between items-center z-10">
              <span className="font-headline-md font-bold text-2xl tracking-tighter text-white">
                DESIGN<span className="text-sky-400">+</span>LOGIC
              </span>
              <span className="text-[10px] font-label-sm uppercase bg-sky-950 px-2.5 py-1 rounded text-sky-400 font-semibold border border-sky-800/50">
                REGISTERED SYSTEM
              </span>
            </div>

            <img
              src={current.mainImg}
              alt="Brand Visual"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
            />

            <div className="z-10 flex items-center space-x-2 rtl:space-x-reverse text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
              <span>Full-Spectrum Digital & Physical Identity</span>
            </div>
          </div>

          {/* Top Right */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-5 showcase-grid-card h-64 md:h-80 relative group">
            <img
              src={current.topRightImg}
              alt="Product Packaging Mockup"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent p-4 flex items-end">
              <span className="text-xs font-bold text-white font-headline-md">Enterprise Product Packaging</span>
            </div>
          </div>

          {/* Bottom Left */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 showcase-grid-card h-56 relative group">
            <img
              src={current.bottomLeftImg}
              alt="Brand Identity Notebook"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent p-4 flex items-end">
              <span className="text-xs font-bold text-white font-headline-md">Design Tokens Guidelines</span>
            </div>
          </div>

          {/* Bottom Middle */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 showcase-grid-card h-56 relative group">
            <img
              src={current.bottomMidImg}
              alt="Executive VIP Metallic Cards"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent p-4 flex items-end">
              <span className="text-xs font-bold text-white font-headline-md">Metallic Membership Cards</span>
            </div>
          </div>

          {/* Bottom Right */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 showcase-grid-card h-56 relative group">
            <img
              src={current.bottomRightImg}
              alt="Brand Apparel & Merchandise"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent p-4 flex items-end">
              <span className="text-xs font-bold text-white font-headline-md">Apparel & Merchandising</span>
            </div>
          </div>

        </div>

        {/* Interactive Bottom Progress Timeline Bar */}
        <div className="pt-4 flex items-center space-x-4 rtl:space-x-reverse">
          
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-sky-500 hover:bg-sky-600 text-white transition-colors flex items-center justify-center flex-shrink-0 font-bold shadow-md cursor-pointer"
            aria-label={isPlaying ? "Pause story" : "Play story"}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>

          <div className="flex-grow grid grid-cols-3 gap-2">
            {SHOWCASE_STORIES.map((story, idx) => (
              <div
                key={story.id}
                onClick={() => {
                  setActiveStory(idx);
                  setProgress(0);
                  setIsPlaying(true);
                }}
                className="cursor-pointer group py-1"
              >
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-sky-400 h-full transition-all duration-100 rounded-full"
                    style={{
                      width:
                        idx === activeStory
                          ? `${progress}%`
                          : idx < activeStory
                          ? '100%'
                          : '0%',
                    }}
                  />
                </div>
                <span className={`text-[10px] font-label-sm block mt-1 truncate transition-colors ${
                  idx === activeStory ? 'text-sky-400 font-bold' : 'text-slate-400 group-hover:text-slate-200'
                }`}>
                  {story.title}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
