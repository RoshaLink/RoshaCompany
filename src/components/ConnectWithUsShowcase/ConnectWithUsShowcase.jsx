import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe2, PhoneCall } from 'lucide-react';
import roshaConnectImage from '../../assets/Rosha/ConnectWthUS/RoshaGivingLike.webp';
import iranFlagLogo from '../../assets/Rosha/logos/Iran.webp';
import './ConnectWithUsShowcase.css';

const SwedenFlag = ({ className }) => (
  <svg className={`rounded-[3px] shadow-sm shrink-0 overflow-hidden inline-block ${className || 'w-6 h-4'}`} viewBox="0 0 16 10" fill="none">
    <rect width="16" height="10" fill="#006AA7" />
    <rect x="5" width="2" height="10" fill="#FECC00" />
    <rect y="4" width="16" height="2" fill="#FECC00" />
  </svg>
);

const UkFlag = ({ className }) => (
  <svg className={`rounded-[3px] shadow-sm shrink-0 overflow-hidden inline-block ${className || 'w-6 h-4'}`} viewBox="0 0 60 30" fill="none">
    <rect width="60" height="30" fill="#012169" />
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="8" />
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
    <path d="M30,0 V30 M0,15 H60" stroke="#FFFFFF" strokeWidth="10" />
    <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
  </svg>
);

const IranFlag = ({ className }) => (
  <img
    src={iranFlagLogo}
    alt="Iran Flag"
    width="44"
    height="28"
    className={`rounded-[3px] shadow-sm shrink-0 object-cover inline-block ${className || 'w-6 h-4'}`}
   loading="lazy" />
);

const ArabicFlag = ({ className }) => (
  <svg className={`rounded-[3px] shadow-sm shrink-0 overflow-hidden inline-block ${className || 'w-6 h-4'}`} viewBox="0 0 16 10" fill="none">
    <rect width="16" height="3.33" y="0" fill="#007A3D" />
    <rect width="16" height="3.33" y="3.33" fill="#FFFFFF" />
    <rect width="16" height="3.34" y="6.66" fill="#000000" />
    <rect width="4" height="10" x="0" y="0" fill="#CE1126" />
  </svg>
);

export default function ConnectWithUsShowcase({ onOpenGetStarted, setActivePage }) {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());
  const rtlClass = isRTL ? 'is-rtl' : 'is-ltr';

  const languagesList = [
    {
      FlagComponent: SwedenFlag,
      title: t('connectWithUs.langSvTitle'),
      desc: t('connectWithUs.langSvDesc'),
    },
    {
      FlagComponent: UkFlag,
      title: t('connectWithUs.langEnTitle'),
      desc: t('connectWithUs.langEnDesc'),
    },
    {
      FlagComponent: IranFlag,
      title: t('connectWithUs.langFaTitle'),
      desc: t('connectWithUs.langFaDesc'),
    },
    {
      FlagComponent: ArabicFlag,
      title: t('connectWithUs.langArTitle'),
      desc: t('connectWithUs.langArDesc'),
    }
  ];

  return (
    <section className="connect-section">

      {/* Background glowing blurred radial orbs */}
      <div className="connect-glow-1" />
      <div className="connect-glow-2" />

      <div className="connect-container">
        <div className="connect-grid">

          {/* Image Side (Rosha Connect With Us Character Graphic) */}
          <div className={`connect-image-col ${rtlClass}`}>
            <div className="connect-image-card-wrapper group">

              {/* Outer Glow Ring behind card */}
              <div className="connect-image-glow" />

              {/* Glassmorphic Frame */}
              <div className="connect-image-frame">
                <img
                  src={roshaConnectImage}
                  alt="Connect With RoshaLink"
                  className="connect-img"
                 width="1536" height="1024" loading="lazy" />

                {/* Bottom Floating Language Flags Pill */}
                <div className="connect-lang-pill">
                  <span className="connect-lang-pill-text">Supported:</span>
                  <div className="connect-lang-pill-icons">
                    <SwedenFlag />
                    <UkFlag />
                    <IranFlag />
                    <ArabicFlag />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className={`connect-content-col ${rtlClass}`}>

            {/* Headline */}
            <h2 className="connect-title">
              <span className="connect-title-line">{t('connectWithUs.titlePrefix')}</span>
              <span className="connect-title-inline sky-blue-text-shine">
                {t('connectWithUs.titleGradient')}
              </span>
              <span className="block">{t('connectWithUs.titleSuffix')}</span>
            </h2>

            {/* Subtitle */}
            <p className="connect-subtitle">
              {t('connectWithUs.subtitle')}
            </p>

            {/* 4 Languages Support Cards Grid */}
            <div className="connect-lang-grid">
              {languagesList.map((lang, idx) => {
                const Flag = lang.FlagComponent;
                return (
                  <div
                    key={idx}
                    className="connect-lang-card group/lang"
                  >
                    <div className="connect-lang-icon-wrap">
                      <Flag className="connect-lang-icon" />
                    </div>
                    <div className="connect-lang-text-wrap">
                      <h4 className="connect-lang-title">
                        {lang.title}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="connect-action">
              <Link
                to={`/${i18n.language}/contact`}
                onClick={() => setActivePage?.('contact')}
                className="connect-btn-primary"
              >
                <span>{t('connectWithUs.contactBtn')}</span>
              </Link>

              <button
                onClick={onOpenGetStarted}
                className="connect-btn-secondary"
              >
                <span>{t('connectWithUs.bookCallBtn')}</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
