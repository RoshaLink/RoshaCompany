import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Loader2,
  Sparkles,
  Copy,
  Check,
  Clock,
  ShieldCheck,
  FileText,
  Calendar,
  Rocket,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MessageSquare,
  Zap,
  Lock,
  Users
} from 'lucide-react';
import diaraContactImage from '../../assets/Diara/Contact/DiaraContact.jpeg';
import './ContactPage.css';

export default function ContactPage({ onOpenGetStarted }) {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());
  const rtlClass = isRTL ? 'is-rtl' : 'is-ltr';

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });

  const contactEmail = 'roshalinkcompany@gmail.com';

  const stepsData = [
    {
      id: 'step-1',
      icon: FileText,
      color: 'text-sky-500',
      bg: 'bg-sky-500/10 dark:bg-sky-500/20',
      border: 'border-sky-200 dark:border-sky-800/60',
      badgeBg: 'bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300',
      titleKey: 'contactPage.step1Title',
      defaultTitle: '01. Briefing & Teknisk Granskning',
      descKey: 'contactPage.step1Desc',
      defaultDesc: 'Vår huvudarkitekt går igenom dina krav, systemarkitektur och mål inom 4 arbetstimmar.',
      badgeKey: 'contactPage.step1Badge',
      defaultBadge: 'Inom 4 timmar',
      feat1Key: 'contactPage.step1Feature1',
      defaultFeat1: '✓ Fri teknisk analys',
      feat2Key: 'contactPage.step1Feature2',
      defaultFeat2: '✓ Arkitekturskiss',
    },
    {
      id: 'step-2',
      icon: Calendar,
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10 dark:bg-indigo-500/20',
      border: 'border-indigo-200 dark:border-indigo-800/60',
      badgeBg: 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300',
      titleKey: 'contactPage.step2Title',
      defaultTitle: '02. Strategiskt Rådgivningsmöte',
      descKey: 'contactPage.step2Desc',
      defaultDesc: 'Ett 30-minuters videomöte med våra seniora partners för att definiera omfattning, teknikstack och färdplan.',
      badgeKey: 'contactPage.step2Badge',
      defaultBadge: '30-min möte',
      feat1Key: 'contactPage.step2Feature1',
      defaultFeat1: '✓ Direkta svar från partners',
      feat2Key: 'contactPage.step2Feature2',
      defaultFeat2: '✓ Tydlig offert & budget',
    },
    {
      id: 'step-3',
      icon: Rocket,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
      border: 'border-emerald-200 dark:border-emerald-800/60',
      badgeBg: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300',
      titleKey: 'contactPage.step3Title',
      defaultTitle: '03. Kickoff & Direktingengörskonst',
      descKey: 'contactPage.step3Desc',
      defaultDesc: 'Vi startar utvecklingen omedelbart utan byråkratiska fördröjningar och levererar i snabba sprintar.',
      badgeKey: 'contactPage.step3Badge',
      defaultBadge: 'Snabb start',
      feat1Key: 'contactPage.step3Feature1',
      defaultFeat1: '✓ 100% skräddarsydd kod',
      feat2Key: 'contactPage.step3Feature2',
      defaultFeat2: '✓ Veckovisa demo-leveranser',
    },
  ];

  const faqList = [
    {
      qKey: 'contactPage.faq.q1',
      defaultQ: 'Hur snabbt får jag svar på min förfrågan?',
      aKey: 'contactPage.faq.a1',
      defaultA: 'Vår huvudarkitekt granskar dina projektkrav och återkopplar personligen via e-post eller telefon inom 4 arbetstimmar med en inledande bedömning.'
    },
    {
      qKey: 'contactPage.faq.q2',
      defaultQ: 'Vilka är det jag faktiskt samarbetar med under projektet?',
      aKey: 'contactPage.faq.a2',
      defaultA: 'Du samarbetar direkt i realtid med våra 5 seniora partners (huvudarkitekter, produktchefer & affärsanalytiker). Vi slussar aldrig vidare ditt projekt till juniora praktikanter.'
    },
    {
      qKey: 'contactPage.faq.q3',
      defaultQ: 'Vad kostar ett inledande strategisamtal?',
      aKey: 'contactPage.faq.a3',
      defaultA: 'Det första 30-minuters strategisamtalet är helt kostnadsfritt och utan förpliktelser. Vi ger dig värdefull teknisk insikt och en uppskattning på omfattning.'
    },
    {
      qKey: 'contactPage.faq.q4',
      defaultQ: 'Kan ni underteckna ett sekretessavtal (NDA) innan vi delar detaljer?',
      aKey: 'contactPage.faq.a4',
      defaultA: 'Självklart. Vi värnar om din affärsidé och undertecknar gärna ett standard-NDA före vårt första möte om så önskas.'
    }
  ];

  const handleNextStep = () => {
    setActiveStep((prev) => (prev + 1) % stepsData.length);
  };

  const handlePrevStep = () => {
    setActiveStep((prev) => (prev - 1 + stepsData.length) % stepsData.length);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(false);

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'contact',
          lang: i18n.language || 'sv',
          ...formData
        })
      });

      if (!res.ok) {
        setError(true);
        return;
      }

      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`contact-page-root ${rtlClass}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background Ambient Glows */}
      <div className="contact-glow-1" />
      <div className="contact-glow-2" />

      {/* =========================================================================
          1. HERO HEADER SECTION
          ========================================================================= */}
      <section className="contact-hero-section relative pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 text-center overflow-hidden">
        <div className="contact-container space-y-6 sm:space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('contactPage.badge', 'STRATEGISK SUPPORT & ADVISORY')}</span>
          </div>

          {/* Headline */}
          <h1 className="contact-hero-title text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.15] max-w-4xl mx-auto">
            <span className="contact-hero-title-text">{t('contactPage.titlePrefix', "Let's Build Something ")}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 dark:from-sky-300 dark:via-indigo-300 dark:to-purple-300">
              {t('contactPage.titleGradient', 'Extraordinary')}
            </span>
            <span className="contact-hero-title-text">{t('contactPage.titleSuffix', ' Together')}</span>
          </h1>

          {/* Subtitle */}
          <p className="contact-hero-subtitle text-sm sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            {t('contactPage.subtitle', 'Schedule a technical strategy session or reach out directly to our 5 principal partners today.')}
          </p>

          {/* Hero Guarantees / Quick Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-4">
            <div className="contact-stat-pill">
              <div className="flex items-center justify-center gap-1.5 text-sky-600 dark:text-sky-400 font-extrabold text-base sm:text-lg">
                <Clock className="w-4 h-4" />
                <span>&lt; 4h</span>
              </div>
              <div className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white">
                {t('contactPage.stats.s1Title', 'Responstid')}
              </div>
              <div className="text-[10px] text-slate-600 dark:text-slate-400 font-medium hidden sm:block">
                {t('contactPage.stats.s1Sub', 'Snabbt svar på briefs')}
              </div>
            </div>

            <div className="contact-stat-pill">
              <div className="flex items-center justify-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-extrabold text-base sm:text-lg">
                <Users className="w-4 h-4" />
                <span>100%</span>
              </div>
              <div className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white">
                {t('contactPage.stats.s2Title', 'Partnerkontakt')}
              </div>
              <div className="text-[10px] text-slate-600 dark:text-slate-400 font-medium hidden sm:block">
                {t('contactPage.stats.s2Sub', 'Inga mellanhänder')}
              </div>
            </div>

            <div className="contact-stat-pill">
              <div className="flex items-center justify-center gap-1.5 text-purple-600 dark:text-purple-400 font-extrabold text-base sm:text-lg">
                <MapPin className="w-4 h-4" />
                <span>Stockholm & SF</span>
              </div>
              <div className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white">
                {t('contactPage.stats.s3Title', 'Global Närvaro')}
              </div>
              <div className="text-[10px] text-slate-600 dark:text-slate-400 font-medium hidden sm:block">
                {t('contactPage.stats.s3Sub', 'Sverige & Remote')}
              </div>
            </div>

            <div className="contact-stat-pill">
              <div className="flex items-center justify-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-extrabold text-base sm:text-lg">
                <Zap className="w-4 h-4" />
                <span>Sub-20ms</span>
              </div>
              <div className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white">
                {t('contactPage.stats.s4Title', 'Prestanda SLA')}
              </div>
              <div className="text-[10px] text-slate-600 dark:text-slate-400 font-medium hidden sm:block">
                {t('contactPage.stats.s4Sub', '100% skräddarsydd kod')}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. MAIN RESPONSIVE GRID: INFO SHOWCASE & LEAD FORM
          ========================================================================= */}
      <section className="contact-container pb-16 sm:pb-24">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start ${isRTL ? 'is-rtl' : ''}`}>
          
          {/* Left Column (5 Cols on desktop): Diara Contact Card & Quick Info Cards */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            
            {/* Diara Contact Showcase Image Card */}
            <div className="relative w-full group">
              <div className="absolute -inset-2 bg-gradient-to-r from-sky-400/20 via-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:opacity-100 transition duration-500" />

              <div className="contact-image-frame">
                <img
                  src={diaraContactImage}
                  alt="RoshaLink Strategic Advisor - Diar"
                  className="contact-img"
                />

                {/* Floating Glassmorphic Pill */}
                <div className={`contact-floating-pill ${isRTL ? 'text-right' : 'text-left'}`}>
                  <div className="contact-status-dot shrink-0" />
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {t('contactPage.diaraPillTitle', 'RoshaLink Direct Channel')}
                    </div>
                    <div className="text-[11px] font-bold text-sky-600 dark:text-sky-400 truncate">
                      {t('contactPage.diaraPillSubtitle', '24/7 Strategic Support')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Access Intro Box */}
            <div className={`space-y-2 p-5 rounded-2xl bg-white/70 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-md shadow-sm ${isRTL ? 'text-right' : 'text-left'}`}>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-sky-500 shrink-0" />
                <span>{t('contactPage.infoTitle', 'Direct Partner Access')}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {t('contactPage.infoSubtitle', 'No intermediate sales reps. Speak directly with our Senior Systems Architects and Head of Design.')}
              </p>
            </div>

            {/* Contact Cards List */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3.5">
              
              {/* Primary Email Card */}
              <div className="contact-card-glass flex flex-col sm:flex-row lg:flex-row items-start sm:items-center justify-between gap-3 group">
                <div className={`flex items-center gap-3.5 min-w-0 w-full ${isRTL ? 'text-right sm:flex-row-reverse' : 'text-left'}`}>
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">
                      {t('contactPage.emailLabel', 'Primary Email')}
                    </span>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="font-bold text-slate-900 dark:text-white hover:text-sky-500 dark:hover:text-sky-400 transition-colors text-xs sm:text-sm lg:text-base block truncate"
                    >
                      {contactEmail}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 flex items-center justify-center transition-all shrink-0 cursor-pointer border border-slate-200 dark:border-slate-700 min-h-[44px] min-w-[44px] self-end sm:self-center"
                  title="Copy email to clipboard"
                  aria-label="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location Card */}
              <div className={`contact-card-glass flex items-center gap-3.5 ${isRTL ? 'text-right flex-row-reverse' : 'text-left'}`}>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">
                    {t('contactPage.phoneLabel', 'Location & Consultation')}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm lg:text-base block truncate">
                    {t('contactPage.phoneValue', 'Stockholm, Sweden & Global Remote')}
                  </span>
                </div>
              </div>

              {/* Agency HQ / SLA Card */}
              <div className={`contact-card-glass flex items-center gap-3.5 ${isRTL ? 'text-right flex-row-reverse' : 'text-left'}`}>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">
                    {t('contactPage.hqLabel', 'Agency HQ')}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm lg:text-base block truncate">
                    {t('contactPage.hqValue', 'Stockholm & San Francisco')}
                  </span>
                </div>
              </div>

            </div>

            {/* Quick Action Button to Open Get Started Modal */}
            {onOpenGetStarted && (
              <button
                type="button"
                onClick={onOpenGetStarted}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold text-sm shadow-lg hover:shadow-sky-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t('contactPage.openModalBtn', 'Boka Direkt Strategisamtal')}</span>
              </button>
            )}

          </div>

          {/* Right Column (7 Cols on desktop): Glassmorphic Lead Form & Next Steps Carousel */}
          <div className="lg:col-span-7 space-y-6">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="contact-form-glass"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  /* Success Confirmation State */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95, y: 0 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center py-8 sm:py-10 space-y-6"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                      <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        {t('contactPage.submittedTitle', 'Discovery Request Received!')}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-200 text-xs sm:text-sm max-w-md mx-auto leading-relaxed font-medium">
                        {t('contactPage.submittedSub', 'Our lead architect will review your project requirements and email you back within 4 business hours.')}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', company: '', message: '' });
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-semibold text-xs sm:text-sm hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors cursor-pointer min-h-[44px]"
                    >
                      <span>{t('contactPage.sendAnotherBtn', 'Skicka ett till meddelande')}</span>
                    </button>
                  </motion.div>
                ) : (
                  /* Main Form */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.08,
                        },
                      },
                    }}
                    className={`space-y-4 font-normal ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 12 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
                      }}
                      className="space-y-1"
                    >
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        {t('contactPage.formTitle', 'Send Us a Brief')}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                        {t('contactPage.formSubtitle', 'Tell us about your project goals, technical stack, or timeline requirements.')}
                      </p>
                    </motion.div>

                    {/* Name & Email Inputs */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 12 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
                      }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4"
                    >
                      <div className="space-y-1.5">
                        <label htmlFor="contact-name-input" className="text-xs font-semibold text-slate-700 dark:text-slate-200 block">
                          {t('contactPage.fieldName', 'Your Full Name')}
                        </label>
                        <input
                          id="contact-name-input"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder={t('contactPage.fieldNamePlaceholder', 'John Doe')}
                          className="contact-input"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="contact-email-input" className="text-xs font-semibold text-slate-700 dark:text-slate-200 block">
                          {t('contactPage.fieldEmail', 'Work Email')}
                        </label>
                        <input
                          id="contact-email-input"
                          type="email"
                          required
                          pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder={t('contactPage.fieldEmailPlaceholder', 'john@company.com')}
                          className="contact-input"
                        />
                      </div>
                    </motion.div>

                    {/* Company Input */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 12 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
                      }}
                      className="space-y-1.5"
                    >
                      <label htmlFor="contact-company-input" className="text-xs font-semibold text-slate-700 dark:text-slate-200 block">
                        {t('contactPage.fieldCompany', 'Company Name & Role')}
                      </label>
                      <input
                        id="contact-company-input"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder={t('contactPage.fieldCompanyPlaceholder', 'Enterprise Inc / CTO')}
                        className="contact-input"
                      />
                    </motion.div>

                    {/* Message Textarea Input */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 12 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
                      }}
                      className="space-y-1.5"
                    >
                      <label htmlFor="contact-message-input" className="text-xs font-semibold text-slate-700 dark:text-slate-200 block">
                        {t('contactPage.fieldMessage', 'Project Overview & Timeline')}
                      </label>
                      <textarea
                        id="contact-message-input"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={t('contactPage.fieldMessagePlaceholder', 'Describe your project goals, technical stack, or timeline requirements...')}
                        className="contact-input min-h-[110px] resize-y"
                      />
                    </motion.div>

                    {/* Error Notification Alert */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 rounded-xl p-3.5 flex items-start gap-2.5"
                      >
                        <div className="w-2 h-2 rounded-full bg-rose-500 mt-1 shrink-0" />
                        <p>{t('contactPage.errorMessage', "We couldn't send your brief. Please try again in a moment.")}</p>
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 12 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
                      }}
                      className={`flex ${isRTL ? 'justify-start' : 'justify-end'}`}
                    >
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                        className="contact-submit-btn w-full sm:w-auto bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-sky-500/25 inline-flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed min-h-[44px]"
                      >
                        <span className="text-xs sm:text-sm">
                          {isSubmitting
                            ? t('contactPage.submittingBtn', 'Sending...')
                            : t('contactPage.submitBtn', 'Submit Strategic Brief')}
                        </span>
                        {isSubmitting ? (
                          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                        ) : (
                          <Send className={`w-4 h-4 shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
                        )}
                      </motion.button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Interactive "Vad händer sedan?" Deck Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="contact-next-steps-card rounded-2xl space-y-4"
            >
              <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${isRTL ? 'is-rtl' : ''}`}>
                <div className={`space-y-0.5 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-sky-500 shrink-0 animate-pulse" />
                    <span>{t('contactPage.nextStepsTitle', 'Vad händer sedan?')}</span>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-300 font-medium">
                    {t('contactPage.nextStepsSub', 'Vår transparenta process från första kontakt till start.')}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-300">
                    {t('contactPage.stepLabel', 'Steg')} {activeStep + 1} {t('contactPage.ofLabel', 'av')} {stepsData.length}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      aria-label="Previous step"
                      title="Previous step"
                      className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 text-slate-600 dark:text-slate-200 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer border border-slate-200 dark:border-slate-700"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      aria-label="Next step"
                      title="Next step"
                      className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 text-slate-600 dark:text-slate-200 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer border border-slate-200 dark:border-slate-700"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic Animated Step Content */}
              <div className="relative min-h-[170px] overflow-hidden rounded-xl bg-slate-100/80 dark:bg-slate-900/90 p-4 border border-slate-200/80 dark:border-slate-800">
                <AnimatePresence mode="wait">
                  {stepsData.map((step, idx) => {
                    if (idx !== activeStep) return null;
                    const StepIcon = step.icon;
                    return (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className={`space-y-3 ${isRTL ? 'text-right' : 'text-left'}`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div className="p-2 rounded-lg bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 shrink-0">
                              <StepIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            </div>
                            <h5 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
                              {t(step.titleKey, step.defaultTitle)}
                            </h5>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 shrink-0">
                            {t(step.badgeKey, step.defaultBadge)}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-200 leading-relaxed font-medium">
                          {t(step.descKey, step.defaultDesc)}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] font-bold text-slate-600 dark:text-slate-200">
                          <div className="truncate">{t(step.feat1Key, step.defaultFeat1)}</div>
                          <div className="truncate">{t(step.feat2Key, step.defaultFeat2)}</div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Step Navigation Dots */}
              <div className="flex items-center justify-center sm:justify-start pt-1 gap-2">
                <div className="flex items-center gap-2">
                  {stepsData.map((_, stepIdx) => (
                    <button
                      key={stepIdx}
                      type="button"
                      onClick={() => setActiveStep(stepIdx)}
                      aria-label={`${t('contactPage.stepLabel', 'Steg')} ${stepIdx + 1}`}
                      title={`Step ${stepIdx + 1}`}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer min-h-[44px] flex items-center ${
                        stepIdx === activeStep
                          ? 'w-9 bg-sky-500 shadow-sm shadow-sky-500/50'
                          : 'w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          3. FAQ & CONSULTATION GUARANTEES SECTION
          ========================================================================= */}
      <section className="contact-faq-section py-12 sm:py-16 bg-white/50 dark:bg-slate-900/60 border-t border-slate-200/60 dark:border-slate-800">
        <div className="contact-container space-y-8">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5" />
              <span>{t('contactPage.faqBadge', 'TRYGGHET & RÅDGIVNING')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t('contactPage.faqTitle', 'Vanliga frågor inför ditt strategisamtal')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
              {t('contactPage.faqSubtitle', 'Allt du behöver veta om hur vi arbetar, konfidentialitet och nästa steg.')}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqList.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer min-h-[44px]"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                      {t(faq.qKey, faq.defaultQ)}
                    </span>
                    <div className={`p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-sky-500' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-slate-600 dark:text-slate-200 leading-relaxed font-medium border-t border-slate-100 dark:border-slate-800/80 pt-3"
                      >
                        {t(faq.aKey, faq.defaultA)}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
