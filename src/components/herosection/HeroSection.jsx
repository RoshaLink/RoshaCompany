import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, RotateCcw, Volume2, VolumeX, Play, Pause, Cpu, Zap, ShieldCheck } from "lucide-react";
import { SUPPORTED_LANGS, DEFAULT_LANG } from "../../config/seoConfig";
import videoEnglishMp4 from "../../assets/Rosha/Herosection/RoshaHeroSectionEnglish.mp4";
import videoEnglishWebm from "../../assets/Rosha/Herosection/RoshaHeroSectionEnglish.webm";
import videoFarsiMp4 from "../../assets/Rosha/Herosection/RoshaHeroSectionFarsi.mp4";
import videoFarsiWebm from "../../assets/Rosha/Herosection/RoshaHeroSectionFarsi.webm";
import videoSwedishMp4 from "../../assets/Rosha/Herosection/RoshaHeroSectionSwedish.mp4";
import videoSwedishWebm from "../../assets/Rosha/Herosection/RoshaHeroSectionSwedish.webm";
import videoArabicMp4 from "../../assets/Rosha/Herosection/RoshaHeroSectionArabic.mp4";
import videoArabicWebm from "../../assets/Rosha/Herosection/RoshaHeroSectionArabic.webm";
import "./HeroSection.css";

export default function HeroSection({ onOpenGetStarted, setActivePage }) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true); // Start muted: unsolicited audio on load is jarring and blocked by most browsers anyway
  const [isPlaying, setIsPlaying] = useState(true);

  // Select video based on selected language
  const getVideoSources = () => {
    const lang = (i18n.language || 'en').toLowerCase();
    if (lang.startsWith('ar')) return { mp4: videoArabicMp4, webm: videoArabicWebm };
    if (lang.startsWith('fa')) return { mp4: videoFarsiMp4, webm: videoFarsiWebm };
    if (lang.startsWith('sv')) return { mp4: videoSwedishMp4, webm: videoSwedishWebm };
    return { mp4: videoEnglishMp4, webm: videoEnglishWebm };
  };

  const { mp4: currentVideoMp4, webm: currentVideoWebm } = getVideoSources();

  // Play video muted on initial load or language change; defer slightly so initial paint occurs immediately
  useEffect(() => {
    let timer;
    if (videoRef.current) {
      videoRef.current.muted = true;
      setIsMuted(true);
      timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => { });
          setIsPlaying(true);
        }
      }, 350);
    }
    return () => clearTimeout(timer);
  }, [currentVideoMp4]);

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

  // Mirror App.jsx's URL-lang resolution so the localized route matches the active page
  const pathLang = location.pathname.split('/').filter(Boolean)[0];
  const activeLang = SUPPORTED_LANGS.includes(pathLang) ? pathLang : (i18n.language || DEFAULT_LANG);

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
              {t('hero.titlePrefix')}
              <span className="hero-title-accent hero-title-accent-1">
                {t('hero.titleGradient')}
              </span>
              {t('hero.titleConnector')}
              <span className="hero-title-accent hero-title-accent-2">
                {t('hero.titleGradient2')}
              </span>
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

              <Link
                to={`/${activeLang}/services`}
                onClick={() => setActivePage && setActivePage('services')}
                className="hero-btn-secondary"
              >
                <span>{t('hero.explore')}</span>
              </Link>
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
              key={currentVideoMp4}
              muted={isMuted}
              playsInline
              preload="none"
              aria-label="RoshaLink Engineering Product Reel"
              width="640"
              height="360"
              onEnded={() => setIsPlaying(false)}
              className="hero-video-el"
            >
              <source src={currentVideoWebm} type="video/webm" />
              <source src={currentVideoMp4} type="video/mp4" />
            </video>


            {/* Sweeping scanline */}
            <div className="hero-scanline absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent pointer-events-none" />

            {/* Interactive Controls — inside wrapper to guarantee they never overflow */}
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
          </div>
        </motion.div>

      </div>
    </section>
  );
}

