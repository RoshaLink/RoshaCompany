import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, ArrowRight } from 'lucide-react';
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
  const currentMember = teamMembers[currentIndex] || teamMembers[0];

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
        
        {/* Left Side: Role Badge, Description/Quote & CTA Button */}
        <div className="order-2 md:order-1 md:col-span-4 flex flex-col justify-center space-y-6 text-left rtl:text-right">
          <AnimatePresence mode="wait">
            <motion.div
              key={`left-${currentIndex}`}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="space-y-5"
            >
              {/* Role Badge */}
              <div className="inline-flex items-center space-x-2 bg-sky-50 border border-sky-200 text-sky-600 text-xs md:text-sm font-extrabold uppercase px-4 py-1.5 rounded-full tracking-wider rtl:space-x-reverse shadow-2xs">
                <span>{currentMember.designation}</span>
              </div>

              {/* Quote / Description Box */}
              <div className="bg-slate-50/90 border border-slate-200/90 rounded-2xl p-6 md:p-8 relative shadow-xs">
                <Quote className="w-7 h-7 text-sky-500 mb-3 shrink-0 opacity-80" />
                <p className="text-slate-700 text-base md:text-lg leading-relaxed font-body-md italic">
                  "{currentMember.quote}"
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={onOpenGetStarted}
                  className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm md:text-base px-7 py-3.5 rounded-xl transition-all shadow-[0_4px_20px_rgba(56,189,248,0.35)] flex items-center space-x-2 rtl:space-x-reverse cursor-pointer transform hover:-translate-y-0.5"
                >
                  <span>Boka ett möte</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Center: Sky Blue Circle Backdrop & Member Portrait */}
        <div className="order-1 md:order-2 md:col-span-4 relative flex items-center justify-center h-[360px] sm:h-[440px] md:h-[500px] lg:h-[540px] my-4 md:my-0">
          
          {/* Blue Circle Backdrop */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-0 h-[280px] w-[280px] sm:h-[360px] sm:w-[360px] md:h-[420px] md:w-[420px] lg:h-[480px] lg:w-[480px] rounded-full bg-gradient-to-tr from-sky-400 via-sky-500 to-blue-600 shadow-[0_0_60px_rgba(56,189,248,0.35)]"
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
              className="relative z-10 h-auto w-56 sm:w-64 md:w-72 lg:w-84 object-cover drop-shadow-2xl"
            />
          </AnimatePresence>
        </div>

        {/* Right Side: Name & Navigation Controls */}
        <div className="order-3 md:order-3 md:col-span-4 flex flex-col justify-between space-y-8 text-left rtl:text-right">
          <AnimatePresence mode="wait">
            <motion.div
              key={`right-${currentIndex}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="space-y-3"
            >
              <span className="text-xs font-extrabold text-sky-600 uppercase tracking-widest block">
                RoshaLink Leader
              </span>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-none tracking-tight font-headline-md uppercase">
                {currentMember.name}
              </h1>
            </motion.div>
          </AnimatePresence>

          {/* Controls: Member Counter & Left/Right Arrow Buttons */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
            
            {/* Index Counter & Clickable Navigation Dots */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="text-xs font-extrabold text-slate-800 tracking-wider">
                <span className="text-sky-600 text-base">0{currentIndex + 1}</span>
                <span className="text-slate-300 mx-1">/</span>
                <span>0{teamMembers.length}</span>
              </div>
              <div className="flex space-x-1.5 rtl:space-x-reverse">
                {teamMembers.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSelectIndex(idx)}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      idx === currentIndex ? 'w-7 bg-sky-500' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                    title={`Go to team member ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Left & Right Arrow Buttons */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <button
                onClick={onPrev}
                className="w-12 h-12 rounded-2xl bg-slate-100 hover:bg-sky-500 text-slate-700 hover:text-white border border-slate-200 flex items-center justify-center transition-all cursor-pointer shadow-md transform hover:-translate-y-0.5"
                title="Previous Member"
              >
                <ChevronLeft className="w-6 h-6 rtl:rotate-180" />
              </button>
              <button
                onClick={onNext}
                className="w-12 h-12 rounded-2xl bg-slate-100 hover:bg-sky-500 text-slate-700 hover:text-white border border-slate-200 flex items-center justify-center transition-all cursor-pointer shadow-md transform hover:-translate-y-0.5"
                title="Next Member"
              >
                <ChevronRight className="w-6 h-6 rtl:rotate-180" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
