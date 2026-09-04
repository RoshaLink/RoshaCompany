import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Send, CheckCircle2, Loader2, Sparkles, User, Mail, MessageSquare } from 'lucide-react';
import roshaLikeImage from '../../assets/Rosha/ConnectWthUS/RoshaGivingLike.webp';
import roshaLoveImage from '../../assets/Rosha/aboutus/showLove.webp';
import './GetStartedModal.css';

export default function GetStartedModal({ isOpen, onClose }) {
  const { t, i18n } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    details: ''
  });

  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());

  // Prevent background scrolling while modal is open & listen for Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(false);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'get-started',
          lang: i18n.language || 'sv',
          name: formData.name.trim(),
          email: formData.contact.trim(),
          message: formData.details.trim()
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const serverError = data?.errors?.[0] || data?.message;
        setErrorMessage(serverError || null);
        setError(true);
        return;
      }

      setSubmitted(true);
    } catch {
      setErrorMessage(null);
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="get-started-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Decorative ambient background glows */}
      <div className="modal-ambient-glow modal-glow-1" />
      <div className="modal-ambient-glow modal-glow-2" />

      <div
        className={`get-started-modal-card ${isRTL ? 'is-rtl' : ''}`}
        dir={isRTL ? 'rtl' : 'ltr'}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Full-width Top Hero Banner with Prominent Rosha Mascot & Close Button */}
        <div className="modal-hero-banner">
          <div className="modal-hero-glow" />
          <img
            src={roshaLikeImage}
            alt="Rosha Mascot"
            className="modal-hero-mascot-img"
          />

          {/* Close Button with 44px min hit area */}
          <button
            type="button"
            onClick={onClose}
            className="modal-close-btn"
            aria-label="Close modal"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Card Body */}
        <div className="modal-body-content">
          {submitted ? (
            <div className="text-center py-4 sm:py-6 space-y-4 relative z-10">
              <div className="modal-success-check-icon-wrapper">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="modal-title">
                  {t('modal.submittedTitle')}
                </h3>
                <p className="modal-success-subtitle">
                  {t('modal.submittedSub')}
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="modal-submit-btn py-3 cursor-pointer"
                >
                  {t('modal.done')}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5 relative z-10">
              {/* Header: Animated Uppercase Title & 1-Line Subtitle */}
              <div className="modal-title-group">
                <h3 className="modal-title">
                  {t('modal.title')}
                </h3>
                <p className="modal-subtitle">
                  {t('modal.subtitle')}
                </p>
              </div>

              {/* Form Fields */}
              <div className="space-y-3 pt-0.5">
                {/* Name */}
                <div className="modal-field-group">
                  <label htmlFor="modal-name-input" className="modal-form-label">
                    <User className="w-3.5 h-3.5 text-sky-500" />
                    <span>{t('modal.name')}</span>
                  </label>
                  <div className="modal-input-wrapper">
                    <input
                      id="modal-name-input"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t('modal.namePlaceholder', 'Jane Doe')}
                      className="modal-form-input"
                    />
                  </div>
                </div>

                {/* Email or Phone */}
                <div className="modal-field-group">
                  <label htmlFor="modal-contact-input" className="modal-form-label">
                    <Mail className="w-3.5 h-3.5 text-sky-500" />
                    <span>{t('modal.contact')}</span>
                  </label>
                  <div className="modal-input-wrapper">
                    <input
                      id="modal-contact-input"
                      type="text"
                      required
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      placeholder={t('modal.contactPlaceholder', 'namn@foretag.se / 070-123 45 67')}
                      className="modal-form-input"
                    />
                  </div>
                </div>

                {/* Project Overview */}
                <div className="modal-field-group">
                  <label htmlFor="modal-details-input" className="modal-form-label">
                    <MessageSquare className="w-3.5 h-3.5 text-sky-500" />
                    <span>{t('modal.overview')}</span>
                  </label>
                  <div className="modal-input-wrapper">
                    <textarea
                      id="modal-details-input"
                      rows={3}
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder={t('modal.overviewPlaceholder', 'Beskriv ditt projekt, mål eller tekniska krav...')}
                      className="modal-form-textarea min-h-[80px] sm:min-h-[88px] resize-y"
                    />
                  </div>
                </div>
              </div>

              {/* Error Notification */}
              {error && (
                <div className="text-xs text-rose-600 dark:text-rose-400 bg-rose-50/90 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-800/80 rounded-xl p-3 flex items-center gap-2 backdrop-blur-md">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                  <p>{errorMessage || t('modal.error')}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="modal-submit-btn"
              >
                <span>
                  {isSubmitting ? t('modal.sending') : t('modal.submit')}
                </span>
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                ) : (
                  <Send className={`w-4 h-4 shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
