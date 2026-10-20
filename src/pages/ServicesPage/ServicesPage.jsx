import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
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
  const { lang: urlLang } = useParams();
  const { t, i18n } = useTranslation();
  const langKey = (urlLang || i18n.language || 'sv').toLowerCase().slice(0, 2);
  const isRTL = ['fa', 'ar'].includes(langKey);
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
      {langKey === 'sv' && (
        <section className="services-seo-section">
          <div className="services-container">
            <div className="services-seo-card">
              <div className="services-seo-ambient" />
              <span className="services-seo-badge">Senior Arkitektur & Webbyrå Stockholm</span>
              <h2 className="services-seo-title">Webbyrå i Stockholm för Skräddarsydd Webbutveckling & Appar</h2>
              <p className="services-seo-lead">
                RoshaLink är en ledande <strong>webbyrå i Stockholm</strong> med specialistkompetens inom ren React- och modern full-stack arkitektur. Vi skapar högpresterande, skräddarsydda digitala plattformar utan att förlita oss på färdiga mallar. Genom att integrera modern molnarkitektur, banbrytande design och djupgående affärsanalys bygger vi lösningar som driver verklig tillväxt.
              </p>

              <div className="services-seo-grid">
                <div className="services-seo-subcard">
                  <h3 className="services-seo-subtitle">React & GraphQL Webbyrå i Stockholm</h3>
                  <p className="services-seo-text">
                    Letar du efter en <strong>React- och GraphQL-webbyrå i Stockholm</strong>? Vi konstruerar skalbara webbapplikationer och mikrotjänster med GraphQL- och REST-gränssnitt som minimerar nätverkslatens och levererar blixtsnabba användarupplevelser. Du samarbetar direkt med seniora ingenjörer utan fördyrande mellanhänder.
                  </p>
                </div>

                <div className="services-seo-subcard">
                  <h3 className="services-seo-subtitle">Automatiserad SEO-tjänst & Teknisk Prestanda</h3>
                  <p className="services-seo-text">
                    Med vår <strong>automatiserade SEO-tjänst</strong> bygger vi in sökmotoroptimering och Google Core Web Vitals-efterlevnad direkt i kodbasen. Från strukturerad JSON-LD-data till dynamiska sitemaps hjälper vi ditt företag i Stockholm att dominera Googles organiska sökresultat.
                  </p>
                </div>

                <div className="services-seo-subcard">
                  <h3 className="services-seo-subtitle">Skräddarsydd Utveckling Utan Färdiga Mallar</h3>
                  <p className="services-seo-text">
                    Kostnaden för skräddarsydd webbutveckling och apputveckling anpassas efter projektets unika arkitektur. Vi erbjuder transparent prissättning och en detaljerad teknisk roadmap efter vår första kostnadsfria konsultation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {langKey === 'en' && (
        <section className="services-seo-section">
          <div className="services-container">
            <div className="services-seo-card">
              <div className="services-seo-ambient" />
              <span className="services-seo-badge">Stockholm Software Engineering</span>
              <h2 className="services-seo-title">Full-Stack Development & High-Performance Web App Agency in Stockholm</h2>
              <p className="services-seo-lead">
                If you are looking for <strong>where to find the best services for full-stack development in Stockholm</strong> or <strong>where to hire a company for developing a high-performance web app in Stockholm</strong>, RoshaLink delivers elite engineering. We specialize in bespoke React, Node.js, and GraphQL architectures engineered for speed, scalability, and measurable ROI.
              </p>

              <div className="services-seo-grid">
                <div className="services-seo-subcard">
                  <h3 className="services-seo-subtitle">Custom Software Engineering Without Templates</h3>
                  <p className="services-seo-text">
                    Unlike traditional web agencies that recycle WordPress themes or slow generic templates, every single line of code at RoshaLink is crafted custom. You get direct access to 5 senior partner engineers who build scalable web platforms, iOS/Android apps, and resilient cloud systems.
                  </p>
                </div>

                <div className="services-seo-subcard">
                  <h3 className="services-seo-subtitle">React & GraphQL Web Architecture</h3>
                  <p className="services-seo-text">
                    We architect low-latency React and GraphQL applications that achieve top Core Web Vitals scores and instantaneous interactions, paired with resilient microservices and distributed databases.
                  </p>
                </div>

                <div className="services-seo-subcard">
                  <h3 className="services-seo-subtitle">Automated Technical SEO & Core Web Vitals</h3>
                  <p className="services-seo-text">
                    Our integrated automated technical SEO services guarantee sub-second rendering, comprehensive schema markup, automated sitemap indexing, and top positions on Google across European and Nordic markets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {langKey === 'fa' && (
        <section className="services-seo-section">
          <div className="services-container">
            <div className="services-seo-card">
              <div className="services-seo-ambient" />
              <span className="services-seo-badge">مهندسی نرم‌افزار و معماری اختصاصی در استکهلم</span>
              <h2 className="services-seo-title">طراحی اپلیکیشن اختصاصی و شرکت ساخت اپلیکیشن موبایل</h2>
              <p className="services-seo-lead">
                روشالینک به عنوان یک <strong>شرکت ساخت اپلیکیشن موبایل</strong> و توسعه نرم‌افزار در استکهلم سوئد، ارائه‌دهنده خدمات تخصصی <strong>طراحی اپلیکیشن اختصاصی</strong> برای سیستم‌عامل‌های iOS و Android است. ما با استفاده از تکنولوژی قدرتمند React Native و معماری ابری مدرن، محصولاتی با کارایی نیتیو، امنیت بالا و سرعت فوق‌العاده خلق می‌کنیم.
              </p>

              <div className="services-seo-grid">
                <div className="services-seo-subcard">
                  <h3 className="services-seo-subtitle">مزایای طراحی اپلیکیشن و وب‌سایت کاملاً اختصاصی</h3>
                  <p className="services-seo-text">
                    در روشالینک هیچ پروژه‌ای با قالب‌های آماده یا سیستم‌های محدودکننده اجرا نمی‌شود. طراحی اختصاصی تضمین می‌کند که نرم‌افزار شما دقیقاً متناسب با فرآیندهای کسب‌وکار، با امنیت Zero-Trust و بالاترین رتبه در فاکتورهای سئو گوگل پیاده‌سازی شود.
                  </p>
                </div>

                <div className="services-seo-subcard">
                  <h3 className="services-seo-subtitle">طراحی وب‌اپلیکیشن پرسرعت و React & GraphQL</h3>
                  <p className="services-seo-text">
                    توسعه سیستم‌های ابری توزیع‌شده و وب‌اپلیکیشن‌های پیشرفته با React و GraphQL با کمترین تاخیر شبکه و بهینه‌سازی کامل شاخص‌های Core Web Vitals برای بازارهای اسکاندیناوی و بین‌المللی.
                  </p>
                </div>

                <div className="services-seo-subcard">
                  <h3 className="services-seo-subtitle">مشاوره رایگان و برآورد زمان‌بندی پروژه</h3>
                  <p className="services-seo-text">
                    تیم مهندسین ارشد ما در سوئد پیش از شروع هر پروژه، یک جلسه مشاوره استراتژیک رایگان جهت تحلیل نیازها، تدوین نقشه راه فنی و برآورد دقیق زمان‌بندی و هزینه در اختیار شما قرار می‌دهد.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {langKey === 'ar' && (
        <section className="services-seo-section">
          <div className="services-container">
            <div className="services-seo-card">
              <div className="services-seo-ambient" />
              <span className="services-seo-badge">هندسة البرمجيات والأنظمة في ستوكهولم</span>
              <h2 className="services-seo-title">شركة تطوير مواقع وتطبيقات جوال مخصصة في ستوكهولم</h2>
              <p className="services-seo-lead">
                إذا كنت تبحث عن <strong>أفضل خدمات تطوير Full-Stack في ستوكهولم</strong> أو ترغب في <strong>توظيف شركة لتطوير تطبيقات ويب عالية الأداء</strong>، تقدم روشا لينك هندسة برمجية متطورة بدون قوالب جاهزة، مبنية خصيصًا لتسريع نمو أعمالك وتحقيق أعلى عائد استثماري.
              </p>

              <div className="services-seo-grid">
                <div className="services-seo-subcard">
                  <h3 className="services-seo-subtitle">تطوير تطبيقات الويب باستخدام React & GraphQL</h3>
                  <p className="services-seo-text">
                    نحن متخصصون في بناء منصات ويب فائقة السرعة مع واجهات React وGraphQL الحديثة التي تلبي أعلى معايير Core Web Vitals وأمان الأنظمة المؤسسية.
                  </p>
                </div>

                <div className="services-seo-subcard">
                  <h3 className="services-seo-subtitle">برمجة وتطوير تطبيقات الجوال المخصصة</h3>
                  <p className="services-seo-text">
                    تطوير تطبيقات iOS وأندرويد بأكواد مخصصة 100% وأداء أصيل وتجربة مستخدم سلسة تناسب متطلبات الأسواق الأوروبية والإسكندنافية.
                  </p>
                </div>

                <div className="services-seo-subcard">
                  <h3 className="services-seo-subtitle">استشارات واستراتيجية تقنية شفافة</h3>
                  <p className="services-seo-text">
                    تعاون مباشر مع الشركاء المؤسسين الخمسة مع جلسة استشارية أولية مجانية لتحليل متطلبات مشروعك ووضع جدول زمني وخطة معمارية واضحة.
                  </p>
                </div>
              </div>
            </div>
          </div>
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
