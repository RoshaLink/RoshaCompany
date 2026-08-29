import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Send, CheckCircle2, Loader2 } from 'lucide-react';
import './GetStartedModal.css';

export default function GetStartedModal({ isOpen, onClose }) {
  const { t, i18n } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
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

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'get-started',
          lang: i18n.language || 'sv',
          name: formData.name,
          email: formData.contact,
          message: formData.details
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
    <div
      className="get-started-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`get-started-modal-card ${isRTL ? 'is-rtl' : ''}`}
        dir={isRTL ? 'rtl' : 'ltr'}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button with 44px min hit area */}
        <button
          onClick={onClose}
          className="modal-close-btn"
          aria-label={t('modal.close', 'Close modal')}
          title={t('modal.close', 'Close modal')}
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 sm:py-8 space-y-4 relative z-10">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-sky-50 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800/80 text-sky-600 dark:text-sky-400 flex items-center justify-center mx-auto shadow-lg shadow-sky-500/10">
              <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9" />
            </div>
            <div className="space-y-2">
              <h3 className="modal-title">
                {t('modal.submittedTitle')}
              </h3>
              <p className="modal-subtitle max-w-sm mx-auto">
                {t('modal.submittedSub')}
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="modal-submit-btn py-2.5 sm:py-3 cursor-pointer"
              >
                {t('modal.done')}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 relative z-10">
            {/* Header */}
            <div className="space-y-1.5 pe-10">
              <h3 className="modal-title">
                {t('modal.title')}
              </h3>
              <p className="modal-subtitle">
                {t('modal.subtitle')}
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-3.5 pt-1">
              {/* Name */}
              <div>
                <label htmlFor="modal-name-input" className="modal-form-label">
                  {t('modal.name')}
                </label>
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

              {/* Email or Phone */}
              <div>
                <label htmlFor="modal-contact-input" className="modal-form-label">
                  {t('modal.contact')}
                </label>
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

              {/* Project Overview */}
              <div>
                <label htmlFor="modal-details-input" className="modal-form-label">
                  {t('modal.overview')}
                </label>
                <textarea
                  id="modal-details-input"
                  rows={3}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder={t('modal.overviewPlaceholder', 'Beskriv ditt projekt, mål eller tekniska krav...')}
                  className="modal-form-textarea min-h-[85px] sm:min-h-[95px] resize-y"
                />
              </div>
            </div>

            {/* Error Notification */}
            {error && (
              <div className="text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/60 rounded-xl p-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                <p>{t('modal.error')}</p>
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
  );
}
