import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, RotateCcw, Volume2, VolumeX, Play, Pause, Cpu, Zap, ShieldCheck } from "lucide-react";
import videoEnglish from "../../assets/Rosha/Herosection/RoshaHeroSectionEnglish.mp4";
import videoFarsi from "../../assets/Rosha/Herosection/RoshaHeroSectionFarsi.mp4";
import videoSwedish from "../../assets/Rosha/Herosection/RoshaHeroSectionSwedish.mp4";
import videoArabic from "../../assets/Rosha/Herosection/RoshaHeroSectionArabic.mp4";
import "./HeroSection.css";

export default function HeroSection({ onOpenGetStarted, setActivePage }) {
  const { t, i18n } = useTranslation();
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false); // Enable audio on initial load
  const [isPlaying, setIsPlaying] = useState(true);

  // Select video based on selected language
  const getVideoSource = () => {
    const lang = (i18n.language || 'en').toLowerCase();
    if (lang.startsWith('ar')) return videoArabic;
    if (lang.startsWith('fa')) return videoFarsi;
    if (lang.startsWith('sv')) return videoSwedish;
    return videoEnglish;
  };

  const currentVideoSrc = getVideoSource();

  // Play video ONCE with sound on initial load or language change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.play().catch((err) => {
        // Fallback to muted play if browser autoplay policy blocks unmuted autoplay
        console.warn("Unmuted autoplay restricted by browser policy, falling back to muted play:", err);
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(() => { });
        }
      });
      setIsPlaying(true);
    }
  }, [currentVideoSrc]);

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());

  return (
    <section className="relative w-full min-h-screen lg:h-screen lg:min-h-[620px] lg:max-h-[1080px] overflow-hidden bg-white text-slate-900 select-none flex flex-col justify-center">
      {/* Blueprint dot-grid ambient backdrop */}
      <div className="hero-grid-bg absolute inset-0 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-[380px] h-[380px] rounded-full bg-sky-400/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full lg:h-full flex flex-col pt-20 sm:pt-24 lg:pt-28 lg:flex-row">

        {/* Text Panel */}
        <motion.div
          className={`relative z-20 order-2 lg:order-1 w-full lg:w-[42%] xl:w-[38%] shrink-0 flex flex-col justify-center gap-4 sm:gap-5 px-4 sm:px-8 lg:px-12 xl:px-16 py-6 lg:py-0 pointer-events-auto ${isRTL ? 'text-right items-end' : 'text-left items-start'}`}
          initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="h-1 w-12 rounded-full bg-gradient-to-r from-sky-500 to-blue-600" />

          <h1 className="font-headline-xl text-2xl sm:text-4xl lg:text-[38px] xl:text-[44px] font-black leading-snug sm:leading-tight tracking-tight py-1 glass-text-shine">
            {t('hero.titlePrefix')}{' '}
            <span>
              {t('hero.titleGradient')}
            </span>{' '}
            {t('hero.titleSuffix')}
          </h1>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onOpenGetStarted}
              className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold font-label-md px-6 py-3.5 sm:px-7 rounded-full shadow-[0_4px_20px_rgba(56,189,248,0.4)] transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse active:scale-95 cursor-pointer border border-sky-400/40 text-xs sm:text-sm hover:shadow-[0_6px_25px_rgba(56,189,248,0.6)]"
            >
              <span>{t('hero.getStarted')}</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white rtl:rotate-180" />
            </button>

            <button
              onClick={() => setActivePage ? setActivePage('services') : null}
              className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold font-label-md text-xs sm:text-sm py-3.5 px-5 sm:px-6 rounded-full cursor-pointer transition-all duration-300 hover:border-sky-500 shadow-sm hover:shadow-md"
            >
              <span>{t('hero.explore')}</span>
            </button>
          </div>

          {/* Capability strip — compact, ruled, multi-device adaptive */}
          <div className="flex items-stretch gap-3 sm:gap-5 pt-4 sm:pt-6 mt-2 border-t border-slate-200 w-full">
            {[
              { Icon: Cpu, title: t('hero.card1Title'), sub: t('hero.card1Sub') },
              { Icon: Zap, title: t('hero.card2Title'), sub: t('hero.card2Sub') },
              { Icon: ShieldCheck, title: t('hero.card3Title'), sub: t('hero.card3Sub') },
            ].map(({ Icon, title, sub }, idx) => (
              <div key={idx} className={`flex-1 flex flex-col gap-1.5 ${idx !== 0 ? 'border-s border-slate-200 ps-3 sm:ps-5' : ''}`}>
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-600" />
                <h4 className="text-[10px] sm:text-[11px] font-bold text-slate-900 leading-tight font-label-md">{title}</h4>
                <p className="text-[9.5px] sm:text-[10.5px] text-slate-500 leading-snug line-clamp-2">{sub}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Divider rail */}
        <div className="hidden lg:block relative w-px shrink-0 hero-divider" />

        {/* Video Panel */}
        <motion.div
          className="relative flex-1 min-h-[35vh] sm:min-h-[45vh] lg:min-h-0 lg:h-full order-1 lg:order-2 overflow-hidden bg-gradient-to-br from-sky-50/70 via-white to-white pointer-events-auto my-2 lg:my-0"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="absolute inset-2 sm:inset-4 lg:inset-6 flex items-center justify-center">
            <video
              ref={videoRef}
              key={currentVideoSrc}
              autoPlay
              muted={isMuted}
              playsInline
              onEnded={() => setIsPlaying(false)}
              className="w-full h-full max-h-[70vh] lg:max-h-full object-contain object-center"
            >
              <source src={currentVideoSrc} type="video/mp4" />
            </video>

            {/* Viewport corner brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 sm:w-5 sm:h-5 border-t-2 border-l-2 border-sky-400/60 pointer-events-none" />
            <div className="absolute top-0 right-0 w-4 h-4 sm:w-5 sm:h-5 border-t-2 border-r-2 border-sky-400/60 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-4 h-4 sm:w-5 sm:h-5 border-b-2 border-l-2 border-sky-400/60 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-5 sm:h-5 border-b-2 border-r-2 border-sky-400/60 pointer-events-none" />

            {/* Sweeping scanline */}
            <div className="hero-scanline absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent pointer-events-none" />

            {/* Live status badge */}
            <div className={`absolute top-2 sm:top-3 ${isRTL ? 'right-2 sm:right-3' : 'left-2 sm:left-3'} inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md border border-slate-200 rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1 shadow-sm z-30`}>
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-sky-500" />
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] text-slate-700 font-label-md">LIVE</span>
            </div>
          </div>

          {/* Interactive Controls */}
          <div className={`absolute bottom-3 sm:bottom-6 ${isRTL ? 'left-3 sm:left-6' : 'right-3 sm:right-6'} z-30 flex items-center gap-2 sm:gap-3`}>
            <button
              onClick={togglePlayPause}
              title={isPlaying ? "Pause Video" : "Play Video"}
              className="p-2.5 sm:p-3 rounded-full bg-white/90 hover:bg-sky-500 hover:text-white backdrop-blur-lg border border-slate-300 text-slate-800 transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer group"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              )}
            </button>

            <button
              onClick={handleReplay}
              title="Replay Video"
              className="p-2.5 sm:p-3 rounded-full bg-white/90 hover:bg-sky-500 hover:text-white backdrop-blur-lg border border-slate-300 text-slate-800 transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer group"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-[-45deg] transition-transform duration-300" />
            </button>

            <button
              onClick={toggleMute}
              title={isMuted ? "Unmute Video" : "Mute Video"}
              className={`p-2.5 sm:p-3 rounded-full backdrop-blur-lg border transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer ${isMuted
                ? 'bg-white/90 border-slate-300 text-slate-700 hover:bg-sky-500 hover:text-white'
                : 'bg-sky-500 border-sky-400 text-white shadow-[0_0_15px_rgba(56,189,248,0.5)]'
                }`}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

