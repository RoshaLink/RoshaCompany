import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ArrowRight, 
  Layers, 
  BarChart3,
  Cpu,
  Server
} from 'lucide-react';
import { TeamShowcase } from '../../components/ui/team-showcase';
import { ClientFeedback } from '../../components/ui/testimonial';
import { Awards } from '../../components/ui/award';
import { HowItWorks } from '../../components/ui/how-it-works';
import { RollingTextList } from '../../components/ui/rolling-list';
import './AboutPage.css';

// Team member image assets
import SohrabFullbody from '../../assets/OurPictures/SohrabFullbody.jpg';
import BellaFullBody from '../../assets/OurPictures/BellaFullBody.png';
import MortezaFullBody from '../../assets/OurPictures/MortezaFullBody.png';
import MinaFullBody from '../../assets/OurPictures/MinaFullBody.png';
import MiladFullBody from '../../assets/OurPictures/MiladFullBody.png';

// Mission & Philosophy Assets
import strategyImg from '../../assets/AboutPage/Strategi.png';
import performanceImg from '../../assets/AboutPage/Performance.png';
import partnershipImg from '../../assets/AboutPage/Partnersip.png';
import automationImg from '../../assets/AboutPage/Automation.png';

const TEAM_CONFIG = [
  {
    imageSrc: SohrabFullbody,
    themeClass: "theme-arch-indigo",
    accentColor: "#6366f1"
  },
  {
    imageSrc: BellaFullBody,
    themeClass: "theme-arch-emerald",
    accentColor: "#10b981"
  },
  {
    imageSrc: MortezaFullBody,
    themeClass: "theme-arch-sky",
    accentColor: "#0ea5e9"
  },
  {
    imageSrc: MinaFullBody,
    themeClass: "theme-arch-pink",
    accentColor: "#ec4899"
  },
  {
    imageSrc: MiladFullBody,
    themeClass: "theme-arch-amber",
    accentColor: "#f59e0b"
  }
];

export default function AboutPage({ onOpenGetStarted }) {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());
  const rtlClass = isRTL ? 'is-rtl' : 'is-ltr';

  // Get translated team members data for TeamShowcase
  const rawMembers = t('aboutPage.teamShowcase.members', { returnObjects: true });
  const membersList = Array.isArray(rawMembers) ? rawMembers : [];

  const teamMembers = TEAM_CONFIG.map((config, index) => {
    const memberData = membersList[index] || {};
    return {
      ...config,
      name: memberData.name || "",
      role: memberData.role || "",
      tag: memberData.tag || "",
      quote: memberData.quote || "",
    };
  });

  // Get translated perspective data for ClientFeedback
  const rawPerspectives = t('aboutPage.teamPerspectives', { returnObjects: true }) || {};


  const methodologySteps = [
    {
      number: t('aboutPage.methodology.step1Num') || "01",
      title: t('aboutPage.methodology.step1Title'),
      description: t('aboutPage.methodology.step1Desc'),
      colorTheme: "blue",
      icon: BarChart3
    },
    {
      number: t('aboutPage.methodology.step2Num') || "02",
      title: t('aboutPage.methodology.step2Title'),
      description: t('aboutPage.methodology.step2Desc'),
      colorTheme: "purple",
      icon: Layers
    },
    {
      number: t('aboutPage.methodology.step3Num') || "03",
      title: t('aboutPage.methodology.step3Title'),
      description: t('aboutPage.methodology.step3Desc'),
      colorTheme: "emerald",
      icon: Cpu
    },
    {
      number: t('aboutPage.methodology.step4Num') || "04",
      title: t('aboutPage.methodology.step4Title'),
      description: t('aboutPage.methodology.step4Desc'),
      colorTheme: "orange",
      icon: Server
    }
  ];

  const missionPillars = [
    {
      id: 1,
      number: "01",
      title: t('aboutPage.missionBento.card1Title'),
      description: t('aboutPage.missionBento.card1Desc'),
      src: strategyImg,
      alt: "Strategic Business Discovery",
      color: "sky"
    },
    {
      id: 2,
      number: "02",
      title: t('aboutPage.missionBento.card2Title'),
      description: t('aboutPage.missionBento.card2Desc'),
      src: performanceImg,
      alt: "Zero Downtime Cloud Performance",
      color: "emerald"
    },
    {
      id: 3,
      number: "03",
      title: t('aboutPage.missionBento.card3Title'),
      description: t('aboutPage.missionBento.card3Desc'),
      src: partnershipImg,
      alt: "Direct Senior Partnership",
      color: "indigo"
    },
    {
      id: 4,
      number: "04",
      title: t('aboutPage.missionBento.card4Title'),
      description: t('aboutPage.missionBento.card4Desc'),
      src: automationImg,
      alt: "AI & Intelligent Automation",
      color: "purple"
    }
  ];

  return (
    <div className={`aboutpage-container ${rtlClass}`} dir={isRTL ? 'rtl' : 'ltr'}>

      {/* =========================================================================
          1. INDUSTRY RECOGNITION & AWARDS (SHOWN FIRST AT TOP)
          ========================================================================= */}
      <section className="about-awards-section">
        <div className="about-section-header">
          <h2 className="about-section-title">
            {t('aboutPage.awards.titlePrefix') || t('aboutPage.awards.sectionTitle')}{' '}
            {t('aboutPage.awards.titleGradient') && (
              <span className="sky-blue-text-shine">
                {t('aboutPage.awards.titleGradient')}
              </span>
            )}{' '}
            {t('aboutPage.awards.titleSuffix')}
          </h2>
          <p className="about-section-subtitle">
            {t('aboutPage.awards.sectionSubtitle')}
          </p>
        </div>

        <div className="about-awards-grid">
          {/* Award 1: Gold Web Architecture */}
          <Awards
            variant="award"
            level="gold"
            title={t('aboutPage.awards.a1.title')}
            subtitle={t('aboutPage.awards.a1.subtitle')}
            recipient={t('aboutPage.awards.a1.recipient')}
            date={t('aboutPage.awards.a1.date')}
          />

          {/* Award 2: Platinum Full-Stack Innovation */}
          <Awards
            variant="award"
            level="platinum"
            title={t('aboutPage.awards.a2.title')}
            subtitle={t('aboutPage.awards.a2.subtitle')}
            recipient={t('aboutPage.awards.a2.recipient')}
            date={t('aboutPage.awards.a2.date')}
          />

          {/* Award 3: Gold UI/UX Product Design */}
          <Awards
            variant="award"
            level="gold"
            title={t('aboutPage.awards.a3.title')}
            subtitle={t('aboutPage.awards.a3.subtitle')}
            recipient={t('aboutPage.awards.a3.recipient')}
            date={t('aboutPage.awards.a3.date')}
          />

          {/* Award 4: Platinum AI & App Innovation */}
          <Awards
            variant="award"
            level="platinum"
            title={t('aboutPage.awards.a4.title')}
            subtitle={t('aboutPage.awards.a4.subtitle')}
            recipient={t('aboutPage.awards.a4.recipient')}
            date={t('aboutPage.awards.a4.date')}
          />
        </div>
      </section>


      {/* =========================================================================
          2. INTEGRATED TEAM SHOWCASE COMPONENT (ARCHED CARDS)
          ========================================================================= */}
      <TeamShowcase
        title={
          <>
            {t('aboutPage.teamShowcase.titlePrefix') || t('aboutPage.teamShowcase.title')}{' '}
            {t('aboutPage.teamShowcase.titleGradient') && (
              <span className="sky-blue-text-shine">
                {t('aboutPage.teamShowcase.titleGradient')}
              </span>
            )}{' '}
            {t('aboutPage.teamShowcase.titleSuffix')}
          </>
        }
        description={t('aboutPage.teamShowcase.description')}
        members={teamMembers}
        isRTL={isRTL}
      />


      {/* =========================================================================
          3. STRATEGIC PERSPECTIVES & TIMELINE BENTO (CLIENT FEEDBACK / VOICES)
          ========================================================================= */}
      <ClientFeedback
        title={
          <>
            {t('aboutPage.teamPerspectives.titlePrefix') || rawPerspectives.title}{' '}
            {t('aboutPage.teamPerspectives.titleGradient') && (
              <span className="indigo-text-shine">
                {t('aboutPage.teamPerspectives.titleGradient')}
              </span>
            )}{' '}
            {t('aboutPage.teamPerspectives.titleSuffix')}
          </>
        }
        subtitle={rawPerspectives.subtitle}
        data={rawPerspectives}
        isRTL={isRTL}
      />


      {/* =========================================================================
          4. MISSION & PHILOSOPHY ROLLING LIST (WHY ROSHALINK)
          ========================================================================= */}
      <RollingTextList
        title={
          <>
            {t('aboutPage.missionBento.titlePrefix') || t('aboutPage.missionBento.title')}{' '}
            {t('aboutPage.missionBento.titleGradient') && (
              <span className="purple-text-shine">
                {t('aboutPage.missionBento.titleGradient')}
              </span>
            )}{' '}
            {t('aboutPage.missionBento.titleSuffix')}
          </>
        }
        subtitle={t('aboutPage.missionBento.subtitle')}
        items={missionPillars}
        isRTL={isRTL}
      />


      {/* =========================================================================
          5. 4-STEP PINNED METHODOLOGY & HOW IT WORKS COMPONENT
          ========================================================================= */}
      <HowItWorks
        title={
          <>
            {t('aboutPage.methodology.titlePrefix') || t('aboutPage.methodology.title')}{' '}
            {t('aboutPage.methodology.titleGradient') && (
              <span className="emerald-text-shine">
                {t('aboutPage.methodology.titleGradient')}
              </span>
            )}{' '}
            {t('aboutPage.methodology.titleSuffix')}
          </>
        }
        subtitle={t('aboutPage.methodology.subtitle')}
        steps={methodologySteps}
        isRTL={isRTL}
      />


      {/* =========================================================================
          6. BOTTOM LEADERSHIP SQUAD CALL-TO-ACTION BANNER
          ========================================================================= */}
      <section className="about-cta-section">
        <div className="about-cta-card glass-card">
          <div className="ambient-glow-cyan about-cta-glow" />
          
          <div className="about-cta-content-wrapper">
            <h2 className="about-cta-title">
              {t('aboutPage.cta.titlePrefix') || t('aboutPage.cta.title')}{' '}
              {t('aboutPage.cta.titleGradient') && (
                <span className="sky-blue-text-shine">
                  {t('aboutPage.cta.titleGradient')}
                </span>
              )}{' '}
              {t('aboutPage.cta.titleSuffix')}
            </h2>

            <p className="about-cta-subtitle">
              {t('aboutPage.cta.subtitle')}
            </p>

            <div className="about-cta-actions">
              <button
                onClick={onOpenGetStarted}
                className="about-cta-button"
              >
                <span>{t('aboutPage.cta.button')}</span>
                <ArrowRight className="w-4 h-4 about-btn-arrow" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
