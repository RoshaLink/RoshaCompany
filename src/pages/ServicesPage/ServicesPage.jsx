import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Compass,
  Code2,
  Cpu,
  Cloud,
  Smartphone,
  Search,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  ChevronDown,
  Layers,
  Server,
  Database,
  Lock,
  Workflow,
  TrendingUp,
  Activity,
  Check,
  X
} from 'lucide-react';
import roshaAnalysis from '../../assets/Rosha/AnalyisYourBusiness/RoshaAnalyisYourBusiness.png';
import './ServicesPage.css';

export default function ServicesPage({ onOpenGetStarted }) {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());
  const rtlClass = isRTL ? 'is-rtl' : 'is-ltr';

  const [activeTechTab, setActiveTechTab] = useState('frontend');
  const [openFaq, setOpenFaq] = useState(0);

  // 6 Core Services Configuration
  const serviceIcons = {
    discovery: Compass,
    'web-architecture': Code2,
    'cloud-backend': Server,
    'ai-automation': Cpu,
    'mobile-apps': Smartphone,
    'seo-performance': Search
  };

  const serviceColors = {
    discovery: 'sky',
    'web-architecture': 'indigo',
    'cloud-backend': 'emerald',
    'ai-automation': 'purple',
    'mobile-apps': 'amber',
    'seo-performance': 'rose'
  };

  const rawServicesList = t('servicesPage.servicesList', { returnObjects: true }) || [];

  // Tech Stack Matrix Data
  const techStackData = {
    frontend: [
      {
        name: "React 19 & Vite",
        badge: "Core Framework",
        desc: isRTL ? "معماری کامپوننت‌های مدرن، رندرینگ فوق‌سریع و HMR بدون اتلاف وقت." : "Next-gen component lifecycle, sub-second HMR, and ultra-fast client rendering."
      },
      {
        name: "Framer Motion & WebGL",
        badge: "Motion & UI",
        desc: isRTL ? "انیمیشن‌های نرم و تعاملی ۶۰ فریم بر ثانیه با شتاب‌دهی سخت‌افزاری." : "Hardware-accelerated 60fps micro-animations and physics-based interactions."
      },
      {
        name: "Tokenized Design Systems",
        badge: "Architecture",
        desc: isRTL ? "سیستم‌های دیزاین هماهنگ متصل به فیگما با متغیرهای توکنیزه و دارک‌مود کامل." : "Strict design tokens with full multi-theme light/dark mode and responsive scaling."
      },
      {
        name: "Vanilla CSS & Tailwind",
        badge: "Styling Engine",
        desc: isRTL ? "کدهای سبک و بهینه با پرفورمنس بالا و حذف کامل فایل‌های زائد." : "Zero-runtime bloat, clean modular layout rules, and strict CSS architecture."
      }
    ],
    backend: [
      {
        name: "Node.js & Microservices",
        badge: "API Runtime",
        desc: isRTL ? "معماری سرورهای ناهمگام و میکروسرویس‌های ماژولار با پاسخگویی زیر ۲۰ میلی‌ثانیه." : "High-concurrency async runtime engineered for low-latency transaction pipelines."
      },
      {
        name: "PostgreSQL & Prisma",
        badge: "Primary Database",
        desc: isRTL ? "پایگاه‌داده رابطه‌ای استاندارد ACID با ایندکس‌های پیشرفته و مدل‌سازی قوی." : "Robust ACID-compliant relational data modeling with automated type-safe migrations."
      },
      {
        name: "Redis & Upstash",
        badge: "In-Memory Cache",
        desc: isRTL ? "کشینگ توزیع‌شده با تاخیر زیر میلی‌ثانیه و مدیریت نشست‌های همزمان." : "Sub-millisecond memory caching, distributed rate limiting, and pub/sub queues."
      },
      {
        name: "WebSockets & Telemetry",
        badge: "Real-Time Comms",
        desc: isRTL ? "ارتباط زنده دوطرفه کلاینت و سرور همراه با پایش مداوم رویدادها." : "Bidirectional live synchronization streams with instant telemetry feedback."
      }
    ],
    ai: [
      {
        name: "Custom LLM Integrations",
        badge: "Generative AI",
        desc: isRTL ? "اتصال پیشرفته به مدل‌های OpenAI GPT-4o، Anthropic Claude و Gemini." : "Custom integration with OpenAI, Claude, and Gemini for tailored domain reasoning."
      },
      {
        name: "RAG & Vector Databases",
        badge: "Enterprise Knowledge",
        desc: isRTL ? "سیستم‌های بازیابی هوشمند اسناد با Pinecone و pgvector بدون توهم مدل." : "Contextual semantic document search and zero-hallucination knowledge retrieval."
      },
      {
        name: "Autonomous Agents",
        badge: "Workflow Automation",
        desc: isRTL ? "ایجنت‌های خودمختار برای اجرای اتوماتیک کارهای پیچیده و پردازش داده‌ها." : "Multi-agent workflows autonomously executing multi-step business operations."
      },
      {
        name: "Python Data Pipelines",
        badge: "ETL & Ingestion",
        desc: isRTL ? "پایپ‌لاین‌های اتوماتیک جمع‌آوری، پاک‌سازی و پردازش داده‌های سازمانی." : "Automated data ingestion, sanitization, and structured transformation pipelines."
      }
    ],
    cloud: [
      {
        name: "Docker & Containerization",
        badge: "Environment",
        desc: isRTL ? "محیط‌های ایزوله و یکدست با قابلیت اجرای سریع در محیط توسعه و پروداکشن." : "Isolated, reproducible development and production container environments."
      },
      {
        name: "AWS & Cloudflare Edge",
        badge: "Global CDN",
        desc: isRTL ? "توزیع سرورلس جهانی در بیش از ۳۰۰ شهر دنیا با محافظت DDoS." : "Global edge serverless execution, smart caching, and enterprise DDoS shielding."
      },
      {
        name: "ISO 27001 Security",
        badge: "Compliance",
        desc: isRTL ? "رمزنگاری کامل AES-256 و TLS 1.3 با معماری امنیت لایه صفر Zero-Trust." : "End-to-end AES-256 encryption, TLS 1.3, and strict Zero-Trust access policies."
      },
      {
        name: "Automated CI/CD",
        badge: "Deployment",
        desc: isRTL ? "فرآیند تست خودکار و استقرار پیوسته بر بستر GitHub Actions با آپ‌تایم ۹۹.۹۹٪." : "Zero-downtime automated linting, test suites, and instant deployment pipelines."
      }
    ]
  };

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
          1. SERVICES HERO SECTION
          ========================================================================= */}
      <section className="services-hero-section">
        {/* Ambient Lighting Glows */}
        <div className="services-ambient-glow-1" />
        <div className="services-ambient-glow-2" />

        <div className="services-container">
          <div className="services-hero-content">
            <h1 className="services-hero-title">
              {t('servicesPage.hero.titlePrefix')}{' '}
              <span className="services-hero-gradient-text">
                {t('servicesPage.hero.titleGradient')}
              </span>
              {t('servicesPage.hero.titleSuffix')}
            </h1>

            <p className="services-hero-subtitle">
              {t('servicesPage.hero.subtitle')}
            </p>

            <div className="services-hero-actions">
              <button
                type="button"
                onClick={onOpenGetStarted}
                className="services-btn-primary"
              >
                <span>{t('servicesPage.hero.primaryCta')}</span>
                <ArrowRight className="services-btn-icon" />
              </button>

              <a href="#core-capabilities" className="services-btn-secondary">
                <span>{t('servicesPage.hero.secondaryCta')}</span>
                <ArrowUpRight className="services-btn-icon" />
              </a>
            </div>

            {/* Metrics Ribbon */}
            <div className="services-metrics-grid">
              <div className="services-metric-card">
                <div className="services-metric-val services-val-sky">
                  {t('servicesPage.hero.metric1Value')}
                </div>
                <div className="services-metric-lbl">
                  {t('servicesPage.hero.metric1Label')}
                </div>
              </div>

              <div className="services-metric-card">
                <div className="services-metric-val services-val-emerald">
                  {t('servicesPage.hero.metric2Value')}
                </div>
                <div className="services-metric-lbl">
                  {t('servicesPage.hero.metric2Label')}
                </div>
              </div>

              <div className="services-metric-card">
                <div className="services-metric-val services-val-indigo">
                  {t('servicesPage.hero.metric3Value')}
                </div>
                <div className="services-metric-lbl">
                  {t('servicesPage.hero.metric3Label')}
                </div>
              </div>

              <div className="services-metric-card">
                <div className="services-metric-val services-val-purple">
                  {t('servicesPage.hero.metric4Value')}
                </div>
                <div className="services-metric-lbl">
                  {t('servicesPage.hero.metric4Label')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          2. CORE 6 CAPABILITIES SECTION
          ========================================================================= */}
      <section id="core-capabilities" className="services-capabilities-section">
        <div className="services-container">
          <div className="services-section-header">
            <h2 className="services-section-title">
              {t('servicesPage.servicesSection.title')}
            </h2>
            <p className="services-section-subtitle">
              {t('servicesPage.servicesSection.subtitle')}
            </p>
          </div>

          <div className="services-grid-wrapper">
            {Array.isArray(rawServicesList) && rawServicesList.map((service, index) => {
              const IconComponent = serviceIcons[service.id] || Compass;
              const colorTheme = serviceColors[service.id] || 'sky';

              return (
                <div
                  key={service.id || index}
                  className={`service-card-item theme-${colorTheme}`}
                >
                  <div className="service-card-glow" />

                  <div className="service-card-header">
                    <div className="service-icon-box">
                      <IconComponent className="service-icon" />
                    </div>
                    <span className="service-category-tag">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="service-card-title">
                    {service.title}
                  </h3>

                  <p className="service-card-desc">
                    {service.desc}
                  </p>

                  {/* Deliverables Checklist */}
                  {Array.isArray(service.deliverables) && (
                    <div className="service-deliverables-box">
                      <span className="service-deliverables-heading">
                        {t('servicesPage.servicesSection.deliverablesLabel')}
                      </span>
                      <ul className="service-deliverables-list">
                        {service.deliverables.map((item, dIdx) => (
                          <li key={dIdx} className="service-deliverable-row">
                            <CheckCircle2 className="service-check-icon" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech Tags */}
                  {Array.isArray(service.techTags) && (
                    <div className="service-tags-box">
                      {service.techTags.map((tag, tIdx) => (
                        <span key={tIdx} className="service-tech-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Card Bottom CTA */}
                  <div className="service-card-footer">
                    <button
                      type="button"
                      onClick={onOpenGetStarted}
                      className="service-card-action-btn"
                    >
                      <span>{t('servicesPage.hero.primaryCta')}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* =========================================================================
          3. INTERACTIVE TECH STACK MATRIX
          ========================================================================= */}
      <section className="services-techmatrix-section">
        <div className="services-container">
          <div className="services-section-header">
            <h2 className="services-section-title">
              {t('servicesPage.techMatrix.title')}
            </h2>
            <p className="services-section-subtitle">
              {t('servicesPage.techMatrix.subtitle')}
            </p>
          </div>

          {/* Tab Selector Buttons */}
          <div className="services-tabs-bar">
            <button
              type="button"
              onClick={() => setActiveTechTab('frontend')}
              className={`services-tab-btn ${activeTechTab === 'frontend' ? 'is-active' : ''}`}
            >
              <Code2 className="w-4 h-4" />
              <span>{t('servicesPage.techMatrix.tabFrontend')}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTechTab('backend')}
              className={`services-tab-btn ${activeTechTab === 'backend' ? 'is-active' : ''}`}
            >
              <Server className="w-4 h-4" />
              <span>{t('servicesPage.techMatrix.tabBackend')}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTechTab('ai')}
              className={`services-tab-btn ${activeTechTab === 'ai' ? 'is-active' : ''}`}
            >
              <Cpu className="w-4 h-4" />
              <span>{t('servicesPage.techMatrix.tabAi')}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTechTab('cloud')}
              className={`services-tab-btn ${activeTechTab === 'cloud' ? 'is-active' : ''}`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t('servicesPage.techMatrix.tabCloud')}</span>
            </button>
          </div>

          {/* Active Tab Grid Items */}
          <div className="services-techmatrix-grid">
            {techStackData[activeTechTab]?.map((item, idx) => (
              <div key={idx} className="techmatrix-card">
                <div className="techmatrix-card-top">
                  <span className="techmatrix-title">{item.name}</span>
                  <span className="techmatrix-badge">{item.badge}</span>
                </div>
                <p className="techmatrix-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* =========================================================================
          4. 4-STAGE DELIVERY PROCESS SECTION
          ========================================================================= */}
      <section className="services-process-section">
        <div className="services-container">
          <div className="services-section-header">
            <h2 className="services-section-title">
              {t('servicesPage.process.title')}
            </h2>
            <p className="services-section-subtitle">
              {t('servicesPage.process.subtitle')}
            </p>
          </div>

          <div className="services-process-grid">
            {/* Step 1 */}
            <div className="services-process-card">
              <div className="process-number-badge">
                {t('servicesPage.process.step1Num')}
              </div>
              <h3 className="process-card-title">
                {t('servicesPage.process.step1Title')}
              </h3>
              <p className="process-card-desc">
                {t('servicesPage.process.step1Desc')}
              </p>
            </div>

            {/* Step 2 */}
            <div className="services-process-card">
              <div className="process-number-badge">
                {t('servicesPage.process.step2Num')}
              </div>
              <h3 className="process-card-title">
                {t('servicesPage.process.step2Title')}
              </h3>
              <p className="process-card-desc">
                {t('servicesPage.process.step2Desc')}
              </p>
            </div>

            {/* Step 3 */}
            <div className="services-process-card">
              <div className="process-number-badge">
                {t('servicesPage.process.step3Num')}
              </div>
              <h3 className="process-card-title">
                {t('servicesPage.process.step3Title')}
              </h3>
              <p className="process-card-desc">
                {t('servicesPage.process.step3Desc')}
              </p>
            </div>

            {/* Step 4 */}
            <div className="services-process-card">
              <div className="process-number-badge">
                {t('servicesPage.process.step4Num')}
              </div>
              <h3 className="process-card-title">
                {t('servicesPage.process.step4Title')}
              </h3>
              <p className="process-card-desc">
                {t('servicesPage.process.step4Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          5. SENIOR MODEL VS. TRADITIONAL AGENCY COMPARISON TABLE
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

              return (
                <div
                  key={idx}
                  className={`services-faq-item ${isOpen ? 'is-open' : ''}`}
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
                      <p>{item.a}</p>
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
                  />
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
                    <ArrowRight className="services-btn-icon" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
