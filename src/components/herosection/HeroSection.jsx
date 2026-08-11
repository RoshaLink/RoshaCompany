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
    <section className="relative w-full min-h-screen lg:h-screen lg:min-h-[620px] lg:max-h-[1080px] overflow-hidden bg-white text-slate-900 select-none flex flex-col justify-center py-4 lg:py-0">
      {/* Blueprint dot-grid ambient backdrop */}
      <div className="hero-grid-bg absolute inset-0 pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full bg-sky-400/25 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-400/20 blur-[130px] pointer-events-none" />

      <div className="relative z-10 w-full lg:h-full flex flex-col pt-20 sm:pt-24 lg:pt-28 lg:flex-row">

        {/* Text Panel */}
        <motion.div
          className={`relative z-20 order-2 lg:order-1 w-full lg:w-[46%] xl:w-[42%] shrink-0 flex flex-col justify-between px-4 sm:px-8 lg:px-12 xl:px-16 pt-4 lg:pt-8 pb-3 sm:pb-6 lg:pb-6 pointer-events-auto ${isRTL ? 'text-right items-end' : 'text-left items-start'}`}
          initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Main Title Block */}
          <div className="flex flex-col justify-center my-auto py-2 sm:py-3">
            <h1 className="font-headline-xl text-2xl sm:text-4xl lg:text-[44px] xl:text-[52px] 2xl:text-[60px] font-black leading-tight sm:leading-tight tracking-tight py-1 glass-text-shine capitalize">
              {t('hero.titlePrefix')}{' '}
              <span>
                {t('hero.titleGradient')}
              </span>{' '}
              {t('hero.titleSuffix')}
            </h1>
            {t('hero.subtitle') && (
              <p className="text-slate-700 font-bold text-xs sm:text-base lg:text-lg xl:text-xl max-w-2xl leading-relaxed mt-2 sm:mt-4">
                {t('hero.subtitle')}
              </p>
            )}
          </div>

          {/* Bottom Action Area — aligned with video controls at bottom */}
          <div className="w-full flex flex-col gap-3 sm:gap-6 lg:gap-8 pt-2 sm:pt-3">
            <div className="flex flex-row flex-nowrap items-center gap-2 sm:gap-3.5 lg:gap-5 w-full sm:w-auto">
              <button
                onClick={onOpenGetStarted}
                className="flex-1 sm:flex-none bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold font-label-md px-3 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-4 rounded-full shadow-[0_4px_20px_rgba(56,189,248,0.4)] transition-all duration-300 flex items-center justify-center space-x-1 sm:space-x-2.5 rtl:space-x-reverse active:scale-95 cursor-pointer border border-sky-400/40 text-[11px] sm:text-base lg:text-lg hover:shadow-[0_6px_25px_rgba(56,189,248,0.6)] whitespace-nowrap"
              >
                <span>{t('hero.getStarted')}</span>

              </button>

              <button
                onClick={() => setActivePage ? setActivePage('services') : null}
                className="flex-1 sm:flex-none bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold font-label-md text-[11px] sm:text-base lg:text-lg py-3 px-3 sm:py-4 sm:px-7 lg:px-9 lg:py-4 rounded-full cursor-pointer transition-all duration-300 hover:border-sky-500 shadow-sm hover:shadow-md whitespace-nowrap text-center"
              >
                <span>{t('hero.explore')}</span>
              </button>
            </div>

            {/* Capability strip — prominent, clear, multi-device adaptive */}
            <div className="flex items-stretch gap-2 sm:gap-6 lg:gap-8 pt-3 sm:pt-5 lg:pt-6 border-t border-slate-200 w-full">
              {[
                { Icon: Cpu, title: t('hero.card1Title'), sub: t('hero.card1Sub') },
                { Icon: Zap, title: t('hero.card2Title'), sub: t('hero.card2Sub') },
                { Icon: ShieldCheck, title: t('hero.card3Title'), sub: t('hero.card3Sub') },
              ].map(({ Icon, title, sub }, idx) => (
                <div key={idx} className={`flex-1 flex flex-col gap-1 sm:gap-2 ${idx !== 0 ? 'border-s border-slate-200 ps-2 sm:ps-6 lg:ps-8' : ''}`}>
                  <Icon className="w-4 h-4 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-sky-600 shrink-0" />
                  <h4 className="text-[10px] sm:text-sm lg:text-lg font-bold text-slate-900 leading-tight font-label-md">{title}</h4>
                  <p className="text-[9px] sm:text-xs lg:text-base text-slate-600 leading-snug line-clamp-2">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Divider rail */}
        <div className="hidden lg:block relative w-px shrink-0 hero-divider" />

        {/* Video Panel */}
        <motion.div
          className="relative flex-1 min-h-[35vh] sm:min-h-[45vh] lg:min-h-0 lg:h-full order-1 lg:order-2 overflow-hidden bg-white pointer-events-auto my-2 lg:my-0 hero-video-blend"
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


            {/* Sweeping scanline */}
            <div className="hero-scanline absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent pointer-events-none" />

          </div>

          {/* Interactive Controls */}
          <div className={`absolute bottom-3 sm:bottom-6 ${isRTL ? 'left-3 sm:left-6' : 'right-3 sm:right-6'} z-30 flex items-center gap-2 sm:gap-3`}>
            <button
              onClick={togglePlayPause}
              title={isPlaying ? "Pause Video" : "Play Video"}
              className="p-2.5 sm:p-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white border border-sky-400/40 transition-all duration-300 shadow-[0_4px_15px_rgba(56,189,248,0.4)] hover:shadow-[0_6px_20px_rgba(56,189,248,0.6)] hover:scale-105 active:scale-95 cursor-pointer group"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              ) : (
                <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-current" />
              )}
            </button>

            <button
              onClick={handleReplay}
              title="Replay Video"
              className="p-2.5 sm:p-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white border border-sky-400/40 transition-all duration-300 shadow-[0_4px_15px_rgba(56,189,248,0.4)] hover:shadow-[0_6px_20px_rgba(56,189,248,0.6)] hover:scale-105 active:scale-95 cursor-pointer group"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:rotate-[-45deg] transition-transform duration-300" />
            </button>

            <button
              onClick={toggleMute}
              title={isMuted ? "Unmute Video" : "Mute Video"}
              className="p-2.5 sm:p-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white border border-sky-400/40 transition-all duration-300 shadow-[0_4px_15px_rgba(56,189,248,0.4)] hover:shadow-[0_6px_20px_rgba(56,189,248,0.6)] hover:scale-105 active:scale-95 cursor-pointer group"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              ) : (
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              )}
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

