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
import ServicesHero from '../../components/ServicesHero/ServicesHero';
import ServicesCapabilities from '../../components/ServicesCapabilities/ServicesCapabilities';
import ServicesTechMatrix from '../../components/ServicesTechMatrix/ServicesTechMatrix';
import ServicesDeliveryProcess from '../../components/ServicesDeliveryProcess/ServicesDeliveryProcess';
import './ServicesPage.css';

export default function ServicesPage({ onOpenGetStarted }) {
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
      <ServicesCapabilities onOpenGetStarted={onOpenGetStarted} />


      {/* =========================================================================
          3. INTERACTIVE TECH STACK MATRIX (3D Glass Cards Component)
          ========================================================================= */}
      <ServicesTechMatrix />


      {/* =========================================================================
          4. 4-STAGE DELIVERY PROCESS SECTION (3D Animated Card Stack Deck)
          ========================================================================= */}
      <ServicesDeliveryProcess onOpenGetStarted={onOpenGetStarted} />


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
