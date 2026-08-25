import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, Sparkles, Copy, Check, Clock, ShieldCheck, FileText, Calendar, Rocket, ChevronLeft, ChevronRight } from 'lucide-react';
import diaraContactImage from '../../assets/Diara/Contact/DiaraContact.jpeg';
import './ContactPage.css';

export default function ContactPage() {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });

  const contactEmail = 'roshalinkcompany@gmail.com';

  const stepsData = [
    {
      icon: FileText,
      color: 'text-sky-500',
      bg: 'bg-sky-500/10 dark:bg-sky-500/20',
      border: 'border-sky-200 dark:border-sky-800/60',
      badgeBg: 'bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300',
      titleKey: 'contactPage.step1Title',
      descKey: 'contactPage.step1Desc',
      badgeKey: 'contactPage.step1Badge',
      feat1Key: 'contactPage.step1Feature1',
      feat2Key: 'contactPage.step1Feature2',
    },
    {
      icon: Calendar,
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10 dark:bg-indigo-500/20',
      border: 'border-indigo-200 dark:border-indigo-800/60',
      badgeBg: 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300',
      titleKey: 'contactPage.step2Title',
      descKey: 'contactPage.step2Desc',
      badgeKey: 'contactPage.step2Badge',
      feat1Key: 'contactPage.step2Feature1',
      feat2Key: 'contactPage.step2Feature2',
    },
    {
      icon: Rocket,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
      border: 'border-emerald-200 dark:border-emerald-800/60',
      badgeBg: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300',
      titleKey: 'contactPage.step3Title',
      descKey: 'contactPage.step3Desc',
      badgeKey: 'contactPage.step3Badge',
      feat1Key: 'contactPage.step3Feature1',
      feat2Key: 'contactPage.step3Feature2',
    },
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
    <div className="contact-page-wrapper bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-16 sm:pb-24 transition-colors duration-300">
      {/* Background Ambient Glows */}
      <div className="contact-glow-1" />
      <div className="contact-glow-2" />

      {/* Hero Header Section */}
      <section className="relative pt-20 sm:pt-28 lg:pt-32 pb-10 sm:pb-14 lg:pb-16 px-4 sm:px-6 md:px-12 text-center overflow-hidden">
        <div className="contact-container space-y-4 sm:space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('contactPage.badge', 'STRATEGISK SUPPORT & ADVISORY')}</span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto">
            <span>{t('contactPage.titlePrefix', "Let's Build Something ")}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500">
              {t('contactPage.titleGradient', 'Extraordinary')}
            </span>
            <span>{t('contactPage.titleSuffix', ' Together')}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            {t('contactPage.subtitle', 'Schedule a technical strategy session or reach out directly to our 5 principal partners today.')}
          </p>

        </div>
      </section>

      {/* Main Responsive Grid: Info Showcase & Form */}
      <section className="contact-container">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start ${isRTL ? 'is-rtl' : ''}`}>
          
          {/* Left Column (5 Cols on desktop): DiarContact Image & Quick Contact Cards */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            
            {/* DiarContact Showcase Image Card (Matches Portfolio Hero Frame Style) */}
            <div className="relative w-full group">
              {/* Ambient Glow Backdrop */}
              <div className="absolute -inset-2 bg-gradient-to-r from-sky-400/20 via-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:opacity-100 transition duration-500" />

              {/* Glassmorphic Frame Card */}
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
                    <div className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white truncate">
                      {t('contactPage.diaraPillTitle', 'RoshaLink Direct Channel')}
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-medium text-sky-600 dark:text-sky-400 truncate">
                      {t('contactPage.diaraPillSubtitle', '24/7 Strategic Support')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Access Intro */}
            <div className={`space-y-1.5 sm:space-y-2 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 backdrop-blur-md ${isRTL ? 'text-right' : 'text-left'}`}>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500 shrink-0" />
                <span>{t('contactPage.infoTitle', 'Direct Partner Access')}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t('contactPage.infoSubtitle', 'No intermediate sales reps. Speak directly with our Senior Systems Architects and Head of Design.')}
              </p>
            </div>

            {/* Contact Cards List - Responsive: 1 Col on mobile, 3 Cols on Tablet (sm/md), 1 Col on Desktop (lg) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 sm:gap-3.5">
              
              {/* Primary Email Card */}
              <div className="contact-card-glass flex flex-col sm:flex-row lg:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 group">
                <div className={`flex items-center gap-2.5 sm:gap-3.5 min-w-0 w-full ${isRTL ? 'text-right sm:flex-row-reverse' : 'text-left'}`}>
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">
                      {t('contactPage.emailLabel', 'Primary Email')}
                    </span>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="font-bold text-slate-900 dark:text-white hover:text-sky-500 dark:hover:text-sky-400 transition-colors text-xs xs:text-sm sm:text-xs md:text-sm lg:text-base block truncate"
                    >
                      {contactEmail}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 flex items-center justify-center transition-colors shrink-0 cursor-pointer border border-slate-200 dark:border-slate-700 self-end sm:self-center"
                  title="Copy email to clipboard"
                  aria-label="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location Card */}
              <div className={`contact-card-glass flex items-center gap-2.5 sm:gap-3.5 ${isRTL ? 'text-right flex-row-reverse' : 'text-left'}`}>
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">
                    {t('contactPage.phoneLabel', 'Location & Consultation')}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white text-xs xs:text-sm sm:text-xs md:text-sm lg:text-base block truncate">
                    {t('contactPage.phoneValue', 'Stockholm, Sweden & Global Remote')}
                  </span>
                </div>
              </div>

              {/* Agency HQ Card */}
              <div className={`contact-card-glass flex items-center gap-2.5 sm:gap-3.5 ${isRTL ? 'text-right flex-row-reverse' : 'text-left'}`}>
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">
                    {t('contactPage.hqLabel', 'Agency HQ')}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white text-xs xs:text-sm sm:text-xs md:text-sm lg:text-base block truncate">
                    {t('contactPage.hqValue', 'Stockholm & San Francisco')}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column (7 Cols on desktop): Lead Submission Glassmorphic Form */}
          <div className="lg:col-span-7">
            <div className="contact-form-glass">
              {submitted ? (
                /* Success Confirmation State */
                <div className="text-center py-8 sm:py-10 space-y-5 sm:space-y-6 animate-fade-in">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                    <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {t('contactPage.submittedTitle', 'Discovery Request Received!')}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                      {t('contactPage.submittedSub', 'Our lead architect will review your project requirements and email you back within 4 business hours.')}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', company: '', message: '' });
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-semibold text-xs sm:text-sm hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    <span>{t('contactPage.sendAnotherBtn', 'Skicka ett till meddelande')}</span>
                  </button>
                </div>
              ) : (
                /* Main Interactive Form */
                <form onSubmit={handleSubmit} className={`space-y-3 sm:space-y-4 font-normal ${isRTL ? 'text-right' : 'text-left'}`}>
                  <div className="space-y-0.5 sm:space-y-1">
                    <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {t('contactPage.formTitle', 'Send Us a Brief')}
                    </h3>
                    <p className="text-[11px] sm:text-sm text-slate-500 dark:text-slate-400 leading-snug">
                      {t('contactPage.formSubtitle', 'Tell us about your project goals, technical stack, or timeline requirements.')}
                    </p>
                  </div>
                  
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                    <div className="space-y-1">
                      <label htmlFor="contact-name-input" className="text-[11px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300 block">
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

                    <div className="space-y-1">
                      <label htmlFor="contact-email-input" className="text-[11px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300 block">
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
                  </div>

                  {/* Company & Role */}
                  <div className="space-y-1">
                    <label htmlFor="contact-company-input" className="text-[11px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300 block">
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
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1">
                    <label htmlFor="contact-message-input" className="text-[11px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                      {t('contactPage.fieldMessage', 'Project Overview & Timeline')}
                    </label>
                    <textarea
                      id="contact-message-input"
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t('contactPage.fieldMessagePlaceholder', 'Describe your project goals, technical stack, or timeline requirements...')}
                      className="contact-input min-h-[85px] sm:min-h-[110px] resize-y"
                    />
                  </div>

                  {/* Error Notification */}
                  {error && (
                    <div className="text-[11px] sm:text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 rounded-xl p-2.5 sm:p-3.5 flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1 shrink-0" />
                      <p>{t('contactPage.errorMessage', "We couldn't send your brief. Please try again in a moment.")}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="contact-submit-btn w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-2.5 sm:py-3.5 px-3 sm:px-6 rounded-xl transition-all shadow-lg hover:shadow-sky-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transform active:scale-[0.99]"
                  >
                    <span className="truncate text-xs sm:text-sm">
                      {isSubmitting 
                        ? t('contactPage.submittingBtn', 'Sending...') 
                        : t('contactPage.submitBtn', 'Submit Strategic Brief')}
                    </span>
                    {isSubmitting ? (
                      <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin shrink-0" />
                    ) : (
                      <Send className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Animated Interactive "Vad händer sedan?" Step Card */}
            <div className="mt-4 sm:mt-6 p-4 sm:p-6 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 backdrop-blur-xl shadow-lg dark:shadow-2xl/40 space-y-4">
              {/* Card Header: Title & Step Counter Controls */}
              <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${isRTL ? 'is-rtl' : ''}`}>
                <div className={`space-y-0.5 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-sky-500 shrink-0 animate-pulse" />
                    <span>{t('contactPage.nextStepsTitle', 'Vad händer sedan?')}</span>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t('contactPage.nextStepsSub', 'Tre enkla steg från din förfrågan till startat projekt')}
                  </p>
                </div>

                {/* Counter & Nav Buttons */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
                    {t('contactPage.stepLabel', 'Steg')} {activeStep + 1} {t('contactPage.ofLabel', 'av')} {stepsData.length}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={isRTL ? handleNextStep : handlePrevStep}
                      aria-label={t('contactPage.prevBtn', 'Föregående')}
                      title={t('contactPage.prevBtn', 'Föregående')}
                      className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 text-slate-600 dark:text-slate-300 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                    >
                      <ChevronLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                    </button>
                    <button
                      type="button"
                      onClick={isRTL ? handlePrevStep : handleNextStep}
                      aria-label={t('contactPage.nextBtn', 'Nästa')}
                      title={t('contactPage.nextBtn', 'Nästa')}
                      className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 text-slate-600 dark:text-slate-300 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                    >
                      <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Animated Card Content */}
              <div className="relative min-h-[180px] sm:min-h-[160px] overflow-hidden">
                <AnimatePresence mode="wait">
                  {stepsData.map((step, idx) => {
                    if (idx !== activeStep) return null;
                    const StepIcon = step.icon;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className={`p-4 sm:p-5 rounded-xl bg-slate-50/90 dark:bg-slate-800/50 border ${step.border} space-y-3 ${isRTL ? 'text-right' : 'text-left'}`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className={`w-9 h-9 rounded-xl ${step.bg} ${step.color} flex items-center justify-center shrink-0`}>
                              <StepIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            </div>
                            <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                              {t(step.titleKey)}
                            </h5>
                          </div>
                          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border border-slate-200/60 dark:border-slate-700/80 ${step.badgeBg} shrink-0`}>
                            {t(step.badgeKey)}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {t(step.descKey)}
                        </p>

                        {/* Feature Bullet Highlights */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/50 text-[11px] font-medium text-slate-600 dark:text-slate-400">
                          <div className="truncate">{t(step.feat1Key)}</div>
                          <div className="truncate">{t(step.feat2Key)}</div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Interactive Step Selector Dots */}
              <div className="flex items-center justify-center sm:justify-start pt-1 gap-2">
                <div className="flex items-center gap-2">
                  {stepsData.map((_, stepIdx) => (
                    <button
                      key={stepIdx}
                      type="button"
                      onClick={() => setActiveStep(stepIdx)}
                      aria-label={`${t('contactPage.stepLabel', 'Steg')} ${stepIdx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        stepIdx === activeStep
                          ? 'w-8 bg-sky-500 shadow-sm shadow-sky-500/50'
                          : 'w-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
