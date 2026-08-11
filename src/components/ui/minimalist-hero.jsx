import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';

export const MinimalistHero = ({
  teamMembers,
  currentIndex,
  onPrev,
  onNext,
  onSelectIndex,
  onOpenGetStarted,
  className,
}) => {
  const { t } = useTranslation();
  const currentMember = teamMembers[currentIndex] || teamMembers[0];
  const colors = currentMember.colors || {
    circle: "from-sky-400 via-sky-500 to-blue-600 shadow-[0_0_60px_rgba(56,189,248,0.35)]",
    button: "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-[0_4px_20px_rgba(56,189,248,0.35)]",
    text: "text-sky-600",
    badge: "bg-sky-50 border-sky-200 text-sky-600",
    quoteIcon: "text-sky-500",
    dotActive: "bg-sky-500 shadow-[0_0_10px_rgba(56,189,248,0.6)]"
  };

  return (
    <div
      className={cn(
        'relative w-full min-h-[90vh] md:min-h-screen bg-white px-6 sm:px-12 md:px-16 lg:px-24 py-12 overflow-hidden font-sans flex flex-col justify-center items-center',
        className
      )}
    >
      {/* Background Ambient Decorative Elements */}
      <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-sky-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-blue-50/60 rounded-full blur-3xl pointer-events-none" />

      {/* Main Fullscreen Grid Layout */}
      <div className="relative grid w-full max-w-[1400px] mx-auto grid-cols-1 items-center gap-8 md:grid-cols-12 flex-1 z-10">

        {/* Left Side: Description/Quote & CTA Button */}
        <div className="order-3 md:order-1 md:col-span-4 lg:col-span-4 xl:col-span-4 flex flex-col justify-center space-y-6 text-left rtl:text-right">
          <AnimatePresence mode="wait">
            <motion.div
              key={`left-${currentIndex}`}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="space-y-5 lg:space-y-7 w-full max-w-xl mx-auto md:mx-0"
            >

              {/* Quote / Glassmorphic Box */}
              <div className="relative overflow-hidden bg-white/50 backdrop-blur-xl border border-white/80 shadow-[0_12px_40px_rgba(0,0,0,0.06),_inset_0_1px_1px_rgba(255,255,255,0.9)] rounded-3xl p-6 md:p-5 lg:p-7 xl:p-8 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.09)] group">
                {/* Top Glass Highlight Specular Line */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90" />
                
                {/* Bottom subtle edge highlight */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                {/* Corner Glass Ambient Glow */}
                <div className="absolute -top-12 -left-12 w-32 h-32 bg-white/40 rounded-full blur-2xl pointer-events-none" />

                {/* Glass Badge Icon */}
                <div className="w-10 h-10 md:w-9 md:h-9 lg:w-11 lg:h-11 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 flex items-center justify-center shadow-sm mb-4 shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <Quote className={cn("w-5 h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 opacity-90 drop-shadow-sm", colors.quoteIcon)} />
                </div>

                {/* Quote Content */}
                <p className="text-slate-800 text-sm sm:text-base md:text-xs lg:text-base xl:text-lg leading-relaxed font-body-md font-medium italic relative z-10 tracking-wide text-pretty">
                  "{currentMember.quote}"
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={onOpenGetStarted}
                  className={cn("text-white font-bold text-sm md:text-xs lg:text-base px-7 py-3.5 md:px-5 md:py-3 lg:px-7 lg:py-3.5 rounded-xl transition-all flex items-center space-x-2 rtl:space-x-reverse cursor-pointer transform hover:-translate-y-0.5 shadow-md", colors.button)}
                >
                  <span>{t('whoWeAre.bookBtn') || 'Boka ett möte'}</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Center: Circle Backdrop & Member Portrait */}
        <div className="order-2 md:order-2 md:col-span-4 lg:col-span-4 xl:col-span-4 relative flex items-center justify-center h-[360px] sm:h-[440px] md:h-[280px] lg:h-[480px] xl:h-[540px] my-4 md:my-0">

          {/* Circle Backdrop */}
          <motion.div
            key={`circle-${currentIndex}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={cn("absolute z-0 h-[280px] w-[280px] sm:h-[360px] sm:w-[360px] md:h-[200px] md:w-[200px] lg:h-[360px] lg:w-[360px] xl:h-[480px] xl:w-[480px] rounded-full bg-gradient-to-tr", colors.circle)}
          />

          {/* Member Image with Framer Motion */}
          <AnimatePresence mode="wait">
            <motion.img
              key={`img-${currentIndex}`}
              src={currentMember.src}
              alt={currentMember.name}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1.18 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 h-auto w-56 sm:w-64 md:w-40 lg:w-60 xl:w-72 object-cover drop-shadow-2xl"
            />
          </AnimatePresence>
        </div>

        {/* Right Side: Name & Navigation Controls */}
        <div className="order-1 md:order-3 md:col-span-4 lg:col-span-4 xl:col-span-4 flex flex-col justify-between space-y-8 text-left rtl:text-right">
          <AnimatePresence mode="wait">
            <motion.div
              key={`right-${currentIndex}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="space-y-3"
            >
              <span className={cn("text-xs md:text-[9px] lg:text-sm font-extrabold uppercase tracking-widest block", colors.text)}>
                {currentMember.designation}
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-3xl lg:text-5xl xl:text-7xl 2xl:text-8xl font-black text-slate-900 leading-none tracking-tight font-headline-md uppercase whitespace-nowrap">
                {currentMember.name}
              </h1>
            </motion.div>
          </AnimatePresence>

          {/* Controls: Member Counter & Left/Right Arrow Buttons */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-between">

            {/* Index Counter & Clickable Navigation Dots */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="text-xs md:text-[10px] lg:text-xs font-extrabold text-slate-800 tracking-wider">
                <span className={cn("text-base md:text-xs lg:text-base", colors.text)}>0{currentIndex + 1}</span>
                <span className="text-slate-300 mx-1">/</span>
                <span>0{teamMembers.length}</span>
              </div>
              <div className="flex space-x-1.5 rtl:space-x-reverse hidden lg:flex">
                {teamMembers.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSelectIndex(idx)}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${idx === currentIndex ? cn("w-8", colors.dotActive) : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                      }`}
                    title={`Go to team member ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Left & Right Arrow Buttons */}
            <div className="flex items-center space-x-2 md:space-x-1 lg:space-x-3 rtl:space-x-reverse">
              <button
                onClick={onPrev}
                className="w-12 h-12 md:w-8 md:h-8 lg:w-12 lg:h-12 rounded-2xl md:rounded-xl lg:rounded-2xl bg-slate-100 hover:bg-sky-500 text-slate-700 hover:text-white border border-slate-200 flex items-center justify-center transition-all cursor-pointer shadow-md transform hover:-translate-y-0.5"
                title="Previous Member"
              >
                <ChevronLeft className="w-6 h-6 md:w-4 md:h-4 lg:w-6 lg:h-6 rtl:rotate-180" />
              </button>
              <button
                onClick={onNext}
                className="w-12 h-12 md:w-8 md:h-8 lg:w-12 lg:h-12 rounded-2xl md:rounded-xl lg:rounded-2xl bg-slate-100 hover:bg-sky-500 text-slate-700 hover:text-white border border-slate-200 flex items-center justify-center transition-all cursor-pointer shadow-md transform hover:-translate-y-0.5"
                title="Next Member"
              >
                <ChevronRight className="w-6 h-6 md:w-4 md:h-4 lg:w-6 lg:h-6 rtl:rotate-180" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

