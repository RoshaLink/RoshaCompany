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
  const [isMuted, setIsMuted] = useState(true); // Start muted: unsolicited audio on load is jarring and blocked by most browsers anyway
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

  // Play video muted on initial load or language change; the visitor opts into sound via the mute button
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.muted = true;
      setIsMuted(true);
      videoRef.current.play().catch(() => { });
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
  const rtlClass = isRTL ? 'is-rtl' : 'is-ltr';

  return (
    <section className="hero-section">
      {/* Blueprint dot-grid ambient backdrop */}
      <div className="hero-grid-bg absolute inset-0 pointer-events-none" />
      <div className="hero-bg-blur-1" />
      <div className="hero-bg-blur-2" />

      <div className="hero-container">

        {/* Text Panel */}
        <motion.div
          className={`hero-text-panel ${rtlClass}`}
          initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Main Title Block */}
          <div className="hero-title-block">
            <h1 className="hero-title glass-text-shine">
              {t('hero.titlePrefix')}{' '}
              <span>
                {t('hero.titleGradient')}
              </span>{' '}
              {t('hero.titleSuffix')}
            </h1>
            {t('hero.subtitle') && (
              <p className="hero-subtitle">
                {t('hero.subtitle')}
              </p>
            )}
          </div>

          {/* Bottom Action Area — aligned with video controls at bottom */}
          <div className="hero-action-area">
            <div className={`hero-buttons-wrapper ${rtlClass}`}>
              <button
                onClick={onOpenGetStarted}
                className="hero-btn-primary"
              >
                <span>{t('hero.getStarted')}</span>
              </button>

              <button
                onClick={() => setActivePage ? setActivePage('services') : null}
                className="hero-btn-secondary"
              >
                <span>{t('hero.explore')}</span>
              </button>
            </div>

            {/* Capability strip — prominent, clear, multi-device adaptive */}
            <div className="hero-capability-strip">
              {[
                { Icon: Cpu, title: t('hero.card1Title'), sub: t('hero.card1Sub') },
                { Icon: Zap, title: t('hero.card2Title'), sub: t('hero.card2Sub') },
                { Icon: ShieldCheck, title: t('hero.card3Title'), sub: t('hero.card3Sub') },
              ].map(({ Icon, title, sub }, idx) => (
                <div key={idx} className={`hero-cap-card ${idx !== 0 ? 'hero-cap-border-s' : ''}`}>
                  <Icon className="hero-cap-icon" />
                  <h4 className="hero-cap-title">{title}</h4>
                  <p className="hero-cap-sub">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Divider rail */}
        <div className="hidden lg:block relative w-px shrink-0 hero-divider" />

        {/* Video Panel */}
        <motion.div
          className="hero-video-panel"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="hero-video-wrapper">
            <video
              ref={videoRef}
              key={currentVideoSrc}
              autoPlay
              muted={isMuted}
              playsInline
              onEnded={() => setIsPlaying(false)}
              className="hero-video-el"
            >
              <source src={currentVideoSrc} type="video/mp4" />
            </video>


            {/* Sweeping scanline */}
            <div className="hero-scanline absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent pointer-events-none" />

          </div>

          {/* Interactive Controls */}
          <div className={`hero-video-controls ${rtlClass}`}>
            <button
              onClick={togglePlayPause}
              title={isPlaying ? "Pause Video" : "Play Video"}
              aria-label={isPlaying ? "Pause Video" : "Play Video"}
              className="hero-control-btn"
            >
              {isPlaying ? (
                <Pause className="hero-control-icon text-white" />
              ) : (
                <Play className="hero-control-icon text-white" />
              )}
            </button>

            <button
              onClick={handleReplay}
              title="Replay Video"
              aria-label="Replay Video"
              className="hero-control-btn"
            >
              <RotateCcw className="hero-control-icon rotate-icon-hover text-white" />
            </button>

            <button
              onClick={toggleMute}
              title={isMuted ? "Unmute Video" : "Mute Video"}
              aria-label={isMuted ? "Unmute Video" : "Mute Video"}
              className="hero-control-btn"
            >
              {isMuted ? (
                <VolumeX className="hero-control-icon text-white" />
              ) : (
                <Volume2 className="hero-control-icon text-white" />
              )}
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

