import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Check,
  X
} from 'lucide-react';
import roshaAnalysis from '../../assets/Rosha/AnalyisYourBusiness/RoshaAnalyisYourBusiness.webp';
import ServicesHero from '../../components/ServicesHero/ServicesHero';
import ServicesCapabilities from '../../components/ServicesCapabilities/ServicesCapabilities';
import ServicesTechMatrix from '../../components/ServicesTechMatrix/ServicesTechMatrix';
import ServicesDeliveryProcess from '../../components/ServicesDeliveryProcess/ServicesDeliveryProcess';
import './ServicesPage.css';

export default function ServicesPage({ selectedSlug, onOpenGetStarted }) {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());
  const rtlClass = isRTL ? 'is-rtl' : 'is-ltr';

  const [openFaq, setOpenFaq] = useState(0);

  const faqList = [
    { q: t('servicesPage.faq.q1'), a: t('servicesPage.faq.a1') },
    { q: t('servicesPage.faq.q2'), a: t('servicesPage.faq.a2') },
    { q: t('servicesPage.faq.q3'), a: t('servicesPage.faq.a3') },
    { q: t('servicesPage.faq.q4'), a: t('servicesPage.faq.a4') },
    { q: t('servicesPage.faq.q5'), a: t('servicesPage.faq.a5') }
  ];

  return (
    <div className={`services-page-root ${rtlClass}`} dir={isRTL ? 'rtl' : 'ltr'}>

      {/* =========================================================================
          1. SERVICES HERO SECTION (Separate Component)
          ========================================================================= */}
      <ServicesHero onOpenGetStarted={onOpenGetStarted} />


      {/* =========================================================================
          2. CORE 6 CAPABILITIES SECTION (3D Staggered Carousel Component)
          ========================================================================= */}
      <ServicesCapabilities selectedSlug={selectedSlug} onOpenGetStarted={onOpenGetStarted} />


      {/* =========================================================================
          3. INTERACTIVE TECH STACK MATRIX (3D Glass Cards Component)
          ========================================================================= */}
      <ServicesTechMatrix />


      {/* =========================================================================
          4. 4-STAGE DELIVERY PROCESS SECTION (3D Animated Card Stack Deck)
          ========================================================================= */}
      <ServicesDeliveryProcess onOpenGetStarted={onOpenGetStarted} />


      {/* =========================================================================
          5. SEO / LOCALIZED CONTENT SECTIONS
          ========================================================================= */}
      {i18n.language === 'sv' && (
        <section className="services-seo-section" style={{ padding: '4rem 1.5rem', maxWidth: '1200px', margin: '0 auto', color: 'var(--color-slate-300)' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#fff' }}>Webbyrå i Stockholm med fokus på anpassad kod</h2>
          <p style={{ marginBottom: '2rem', lineHeight: '1.7', fontSize: '1.05rem' }}>
            RoshaLink är en ledande webbyrå i Stockholm. Vi skapar högpresterande, skräddarsydda digitala plattformar utan att förlita oss på färdiga mallar. Genom att integrera modern molnarkitektur, banbrytande design och djuptgående affärsanalys bygger vi lösningar som driver riktig affärsnytta. Vårt mål är att framtidssäkra din digitala närvaro och säkerställa en oslagbar kundupplevelse.
          </p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#fff' }}>Vad kostar skräddarsydd webbutveckling och apputveckling?</h3>
          <p style={{ lineHeight: '1.7', fontSize: '1.05rem' }}>
            Kostnaden för skräddarsydd webbutveckling och apputveckling varierar beroende på projektets komplexitet, funktionella krav och plattformsval. Vi erbjuder transparent prissättning och en detaljerad uppskattning efter vår första kostnadsfria strategiska konsultation. Kontakta oss för att få en exakt offert som är helt anpassad efter ditt företags unika behov och målsättningar.
          </p>
        </section>
      )}

      {i18n.language === 'en' && (
        <section className="services-seo-section" style={{ padding: '4rem 1.5rem', maxWidth: '1200px', margin: '0 auto', color: 'var(--color-slate-300)' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#fff' }}>Guide: Choosing the Top Full-Stack Engineering Agency in Stockholm</h2>
          <p style={{ marginBottom: '2rem', lineHeight: '1.7', fontSize: '1.05rem' }}>
            Stockholm is home to some of the most innovative tech companies in the world. When selecting a full-stack engineering agency in Stockholm, it's crucial to evaluate their expertise in custom architecture, scalable cloud infrastructure, and modern frameworks like React and Node.js. A top-tier agency focuses on long-term scalability and business growth rather than quick, template-based fixes.
          </p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#fff' }}>Why RoshaLink Stands Out in the Nordic Tech Scene</h3>
          <p style={{ lineHeight: '1.7', fontSize: '1.05rem' }}>
            At RoshaLink, we merge rigorous business analysis with elite software engineering. Our direct-partnership model ensures you work directly with senior architects to build bespoke, high-performance web and mobile applications tailored to your exact strategic goals.
          </p>
        </section>
      )}

      {i18n.language === 'fa' && selectedSlug === 'mobile-apps' && (
        <section className="services-seo-section" style={{ padding: '4rem 1.5rem', maxWidth: '1200px', margin: '0 auto', color: 'var(--color-slate-300)' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#fff' }}>طراحی اپلیکیشن اختصاصی با تکنولوژی‌های روز</h2>
          <p style={{ marginBottom: '2rem', lineHeight: '1.7', fontSize: '1.05rem' }}>
            ما در روشالینک با استفاده از قدرتمندترین فریم‌ورک‌های کراس‌پلتفرم مانند <strong>React Native</strong> و <strong>Flutter</strong>، اپلیکیشن‌هایی توسعه می‌دهیم که عملکردی کاملاً بومی (Native) روی سیستم‌عامل‌های iOS و اندروید ارائه می‌دهند. طراحی اپلیکیشن اختصاصی به معنای ساخت نرم‌افزاری است که دقیقاً منطبق بر نیازها و مدل کسب‌وکار شما مهندسی شده باشد، بدون استفاده از راهکارهای آماده و محدودکننده. این رویکرد بالاترین سرعت و بهترین تجربه کاربری را تضمین می‌کند.
          </p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#fff' }}>زمان‌بندی پروژه‌های توسعه اپلیکیشن چقدر است؟</h3>
          <p style={{ lineHeight: '1.7', fontSize: '1.05rem' }}>
            زمان‌بندی طراحی و توسعه یک اپلیکیشن موبایل بسته به پیچیدگی امکانات، نیاز به پنل مدیریت بک‌اند اختصاصی و یکپارچه‌سازی با سیستم‌های موجود متفاوت است. به طور معمول، یک نسخه پایه (MVP) طی ۲ تا ۳ ماه آماده می‌شود، در حالی که اپلیکیشن‌های سازمانی و پلتفرم‌های پیچیده‌تر ممکن است ۴ تا ۶ ماه زمان ببرند. ما از روز اول یک نقشه راه شفاف و زمان‌بندی دقیق مهندسی شده به شما ارائه می‌دهیم.
          </p>
        </section>
      )}


      {/* =========================================================================
          6. SENIOR MODEL VS. TRADITIONAL AGENCY COMPARISON TABLE
          ========================================================================= */}
      <section className="services-comparison-section">
        <div className="services-container">
          <div className="services-section-header">
            <h2 className="services-section-title">
              {t('servicesPage.comparison.title')}
            </h2>
            <p className="services-section-subtitle">
              {t('servicesPage.comparison.subtitle')}
            </p>
          </div>

          <div className="services-table-wrapper">
            <table className="services-comparison-table">
              <thead>
                <tr>
                  <th className="table-col-feature">
                    {t('servicesPage.comparison.featureCol')}
                  </th>
                  <th className="table-col-agency">
                    {t('servicesPage.comparison.agencyCol')}
                  </th>
                  <th className="table-col-rosha">
                    {t('servicesPage.comparison.roshaCol')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1 */}
                <tr>
                  <td className="table-cell-feature">
                    {t('servicesPage.comparison.f1')}
                  </td>
                  <td className="table-cell-agency">
                    <div className="table-cell-flex">
                      <X className="table-icon-red" />
                      <span>{t('servicesPage.comparison.f1Agency')}</span>
                    </div>
                  </td>
                  <td className="table-cell-rosha">
                    <div className="table-cell-flex">
                      <Check className="table-icon-green" />
                      <span>{t('servicesPage.comparison.f1Rosha')}</span>
                    </div>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr>
                  <td className="table-cell-feature">
                    {t('servicesPage.comparison.f2')}
                  </td>
                  <td className="table-cell-agency">
                    <div className="table-cell-flex">
                      <X className="table-icon-red" />
                      <span>{t('servicesPage.comparison.f2Agency')}</span>
                    </div>
                  </td>
                  <td className="table-cell-rosha">
                    <div className="table-cell-flex">
                      <Check className="table-icon-green" />
                      <span>{t('servicesPage.comparison.f2Rosha')}</span>
                    </div>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr>
                  <td className="table-cell-feature">
                    {t('servicesPage.comparison.f3')}
                  </td>
                  <td className="table-cell-agency">
                    <div className="table-cell-flex">
                      <X className="table-icon-red" />
                      <span>{t('servicesPage.comparison.f3Agency')}</span>
                    </div>
                  </td>
                  <td className="table-cell-rosha">
                    <div className="table-cell-flex">
                      <Check className="table-icon-green" />
                      <span>{t('servicesPage.comparison.f3Rosha')}</span>
                    </div>
                  </td>
                </tr>

                {/* Row 4 */}
                <tr>
                  <td className="table-cell-feature">
                    {t('servicesPage.comparison.f4')}
                  </td>
                  <td className="table-cell-agency">
                    <div className="table-cell-flex">
                      <X className="table-icon-red" />
                      <span>{t('servicesPage.comparison.f4Agency')}</span>
                    </div>
                  </td>
                  <td className="table-cell-rosha">
                    <div className="table-cell-flex">
                      <Check className="table-icon-green" />
                      <span>{t('servicesPage.comparison.f4Rosha')}</span>
                    </div>
                  </td>
                </tr>

                {/* Row 5 */}
                <tr>
                  <td className="table-cell-feature">
                    {t('servicesPage.comparison.f5')}
                  </td>
                  <td className="table-cell-agency">
                    <div className="table-cell-flex">
                      <X className="table-icon-red" />
                      <span>{t('servicesPage.comparison.f5Agency')}</span>
                    </div>
                  </td>
                  <td className="table-cell-rosha">
                    <div className="table-cell-flex">
                      <Check className="table-icon-green" />
                      <span>{t('servicesPage.comparison.f5Rosha')}</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>


      {/* =========================================================================
          6. SERVICES FAQ ACCORDION
          ========================================================================= */}
      <section className="services-faq-section">
        <div className="services-container">
          <div className="services-section-header">
            <h2 className="services-section-title">
              {t('servicesPage.faq.title')}
            </h2>
            <p className="services-section-subtitle">
              {t('servicesPage.faq.subtitle')}
            </p>
          </div>

          <div className="services-faq-accordion">
            {faqList.map((item, idx) => {
              const isOpen = openFaq === idx;
              const themes = ['sky', 'indigo', 'purple', 'emerald', 'amber'];
              const currentTheme = themes[idx % themes.length];

              return (
                <div
                  key={idx}
                  className={`services-faq-item theme-${currentTheme} ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="services-faq-trigger"
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question-text">{item.q}</span>
                    <div className="faq-icon-wrap">
                      <ChevronDown className="faq-chevron-icon" />
                    </div>
                  </button>

                  <div className="services-faq-collapse">
                    <div className="services-faq-answer">
                      <div className="faq-answer-box">
                        <p>{item.a}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* =========================================================================
          7. BOTTOM CALL-TO-ACTION WITH ROSHA MASCOT
          ========================================================================= */}
      <section className="services-cta-section">
        <div className="services-container">
          <div className="services-cta-card">
            <div className="services-cta-ambient" />

            <div className="services-cta-grid">
              {/* Mascot Side */}
              <div className="services-cta-image-col">
                <div className="services-cta-image-wrapper">
                  <div className="services-cta-image-backdrop" />
                  <img
                    src={roshaAnalysis}
                    alt="RoshaLink Strategic Partner Discovery"
                    className="services-cta-mascot-img"
                    loading="lazy"
                   width="1536" height="1024" />
                </div>
              </div>

              {/* Text & Button Side */}
              <div className="services-cta-text-col">
                <h2 className="services-cta-title">
                  {t('servicesPage.cta.title')}
                </h2>
                <p className="services-cta-subtitle">
                  {t('servicesPage.cta.subtitle')}
                </p>

                <div className="services-cta-actions">
                  <button
                    type="button"
                    onClick={onOpenGetStarted}
                    className="services-btn-primary services-cta-btn"
                  >
                    <span>{t('servicesPage.cta.button')}</span>
                    <ArrowRight className={`services-btn-icon ${isRTL ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                <div className="services-cta-secondary-links">
                  <Link to={`/${i18n.language}/portfolio`} className="services-cta-secondary-link">
                    <span>{t('servicesPage.cta.portfolioLink')}</span>
                    <ArrowUpRight className="services-cta-secondary-icon" />
                  </Link>
                  <Link to={`/${i18n.language}/about`} className="services-cta-secondary-link">
                    <span>{t('servicesPage.cta.aboutLink')}</span>
                    <ArrowUpRight className="services-cta-secondary-icon" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
