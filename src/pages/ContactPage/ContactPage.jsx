import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Loader2, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import diaraContactImage from '../../assets/Diara/Contact/DiaraContact.webp';
import './ContactPage.css';

export default function ContactPage() {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });

  const stepsData = [
    {
      id: 'step-1',
      titleKey: 'contactPage.step1Title',
      descKey: 'contactPage.step1Desc',
      feat1Key: 'contactPage.step1Feature1',
      feat2Key: 'contactPage.step1Feature2',
    },
    {
      id: 'step-2',
      titleKey: 'contactPage.step2Title',
      descKey: 'contactPage.step2Desc',
      feat1Key: 'contactPage.step2Feature1',
      feat2Key: 'contactPage.step2Feature2',
    },
    {
      id: 'step-3',
      titleKey: 'contactPage.step3Title',
      descKey: 'contactPage.step3Desc',
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
    <div className="contact-page-wrapper">
      {/* Background Ambient Glows */}
      <div className="contact-glow-1" />
      <div className="contact-glow-2" />

      {/* Hero Header Section */}
      <section className="contact-hero-section">
        <div className="contact-container">
          


          {/* Headline */}
          <h1 className="contact-hero-title">
            <span>{t('contactPage.titlePrefix')}</span>
            <span className="sky-blue-text-shine">
              {t('contactPage.titleGradient')}
            </span>
            <span>{t('contactPage.titleSuffix')}</span>
          </h1>

          {/* Subtitle */}
          <p className="contact-hero-subtitle">
            {t('contactPage.subtitle')}
          </p>

        </div>
      </section>

      {/* Main Responsive Grid: Info Showcase & Form */}
      <section className="contact-container contact-main-grid-section">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start ${isRTL ? 'is-rtl' : ''}`}>
          
          {/* Left Column (5 Cols on desktop): DiarContact Image & Quick Contact Cards */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            
            {/* DiarContact Showcase Image Card */}
            <div className="relative w-full group">
              {/* Ambient Glow Backdrop */}
              <div className="absolute -inset-2 bg-gradient-to-r from-sky-400/20 via-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:opacity-100 transition duration-500" />

              {/* Glassmorphic Frame Card */}
              <div className="contact-image-frame">
                <img
                  src={diaraContactImage}
                  alt="RoshaLink Strategic Advisor"
                  className="contact-img"
                 width="1200" height="896" loading="lazy" />
              </div>
            </div>

            {/* Direct Access Intro */}
            <div className={`space-y-1.5 sm:space-y-2 p-4 sm:p-5 rounded-xl sm:rounded-2xl contact-card-glass ${isRTL ? 'text-right' : 'text-left'}`}>
              <h2 className="text-base sm:text-lg font-bold flex items-center gap-2 contact-section-heading contact-card-title">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500 shrink-0" />
                <span>{t('contactPage.infoTitle')}</span>
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed font-normal contact-card-desc">
                {t('contactPage.infoSubtitle')}
              </p>
            </div>
          </div>

          {/* Right Column (7 Cols on desktop): Lead Submission Glassmorphic Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="contact-form-glass"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  /* Success Confirmation State with Motion Animation */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="py-8 sm:py-12 px-4 sm:px-8 text-center space-y-4"
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>

                    <div className="space-y-1 sm:space-y-2">
                      <h2 className="text-lg sm:text-2xl font-bold contact-section-heading">
                        {t('contactPage.successTitle')}
                      </h2>
                      <p className="text-xs sm:text-sm max-w-md mx-auto contact-form-subtext">
                        {t('contactPage.successDesc')}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', company: '', message: '' });
                      }}
                      className="mt-4 px-6 py-2.5 rounded-xl border contact-reset-btn text-xs sm:text-sm font-semibold transition-all cursor-pointer inline-block"
                    >
                      {t('contactPage.sendAnotherBtn')}
                    </button>
                  </motion.div>
                ) : (
                  /* Interactive Form with Staggered Field Transitions */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.08 },
                      },
                    }}
                    className={`p-5 sm:p-7 md:p-8 space-y-4 sm:space-y-5 ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    <div className="space-y-1">
                      <h2 className="text-lg sm:text-xl font-black contact-section-heading contact-form-title">
                        {t('contactPage.formTitle')}
                      </h2>
                      <p className="text-xs sm:text-sm font-medium contact-form-subtitle">
                        {t('contactPage.formSubtitle')}
                      </p>
                    </div>
                    
                    {/* Name & Email Row */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 12 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
                      }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4"
                    >
                      <div className="space-y-1">
                        <label htmlFor="contact-name-input" className="text-[11px] sm:text-xs font-bold block contact-field-label">
                          {t('contactPage.fieldName')}
                        </label>
                        <input
                          id="contact-name-input"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder={t('contactPage.fieldNamePlaceholder')}
                          className="contact-input"
                        />
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="contact-email-input" className="text-[11px] sm:text-xs font-bold block contact-field-label">
                          {t('contactPage.fieldEmail')}
                        </label>
                        <input
                          id="contact-email-input"
                          type="email"
                          required
                          pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder={t('contactPage.fieldEmailPlaceholder')}
                          className="contact-input"
                        />
                      </div>
                    </motion.div>

                    {/* Company & Role */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 12 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
                      }}
                      className="space-y-1"
                    >
                      <label htmlFor="contact-company-input" className="text-[11px] sm:text-xs font-bold block contact-field-label">
                        {t('contactPage.fieldCompany')}
                      </label>
                      <input
                        id="contact-company-input"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder={t('contactPage.fieldCompanyPlaceholder')}
                        className="contact-input"
                      />
                    </motion.div>

                    {/* Message Field */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 12 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
                      }}
                      className="space-y-1"
                    >
                      <label htmlFor="contact-message-input" className="text-[11px] sm:text-xs font-bold block contact-field-label">
                        {t('contactPage.fieldMessage')}
                      </label>
                      <textarea
                        id="contact-message-input"
                        rows={3}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={t('contactPage.fieldMessagePlaceholder')}
                        className="contact-input min-h-[85px] sm:min-h-[110px] resize-y"
                      />
                    </motion.div>

                    {/* Error Notification */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-[11px] sm:text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 rounded-xl p-2.5 sm:p-3.5 flex items-start gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1 shrink-0" />
                        <p>{t('contactPage.errorMessage')}</p>
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
                        className="contact-submit-btn w-full sm:w-auto bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-sky-500/25 inline-flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        <span className="text-xs sm:text-sm">
                          {isSubmitting 
                            ? t('contactPage.submittingBtn') 
                            : t('contactPage.submitBtn')}
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

            {/* Animated Interactive "Vad händer sedan?" Step Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="contact-next-steps-card mt-4 sm:mt-6 rounded-2xl space-y-4"
            >
              {/* Card Header: Title & Step Counter Controls */}
              <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${isRTL ? 'is-rtl' : ''}`}>
                <div className={`space-y-0.5 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <h2 className="text-sm sm:text-base font-bold contact-section-heading contact-steps-title">
                    <span>{t('contactPage.nextStepsTitle')}</span>
                  </h2>
                  <p className="text-[11px] sm:text-xs contact-steps-subtitle">
                    {t('contactPage.nextStepsSub')}
                  </p>
                </div>

                {/* Step indicators & Next/Prev navigation controls */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  <span className="text-[11px] sm:text-xs font-bold contact-step-counter">
                    {t('contactPage.stepLabel')} {activeStep + 1} {t('contactPage.ofLabel')} {stepsData.length}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      aria-label="Previous step"
                      title="Previous step"
                      className="contact-step-nav-btn p-2 rounded-lg transition-all min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                    >
                      {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      aria-label="Next step"
                      title="Next step"
                      className="contact-step-nav-btn p-2 rounded-lg transition-all min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                    >
                      {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic Animated Step Card Content */}
              <div className="relative min-h-[140px] sm:min-h-[130px] overflow-hidden rounded-xl contact-step-inner-box p-3.5 sm:p-4 border">
                <AnimatePresence mode="wait">
                  {stepsData.map((step, idx) => {
                    if (idx !== activeStep) return null;
                    return (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className={`space-y-2.5 ${isRTL ? 'text-right' : 'text-left'}`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-sm sm:text-base font-bold contact-step-card-title">
                            {t(step.titleKey)}
                          </h3>
                        </div>

                        <p className="text-[11px] sm:text-xs leading-relaxed font-medium contact-step-desc">
                          {t(step.descKey)}
                        </p>

                        {/* Feature Bullet Highlights */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t text-[11px] font-medium contact-step-features">
                          <div className="flex items-center gap-1.5 truncate">
                            <div className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                            <span className="truncate contact-step-feat-text">{t(step.feat1Key)}</span>
                          </div>
                          <div className="flex items-center gap-1.5 truncate">
                            <div className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                            <span className="truncate contact-step-feat-text">{t(step.feat2Key)}</span>
                          </div>
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
                      aria-label={`${t('contactPage.stepLabel')} ${stepIdx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        stepIdx === activeStep
                          ? 'w-8 bg-sky-500 shadow-sm shadow-sky-500/50'
                          : 'w-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>
    </div>
  );
}
