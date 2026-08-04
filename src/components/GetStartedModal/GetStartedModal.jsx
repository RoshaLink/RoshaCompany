import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Sparkles, Send, CheckCircle2, Loader2 } from 'lucide-react';
import './GetStartedModal.css';

export default function GetStartedModal({ isOpen, onClose }) {
  const { t, i18n } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '$25k - $50k',
    service: 'Full Product Engineering',
    details: ''
  });

  if (!isOpen) return null;

  // This used to call setSubmitted(true) and nothing else, so every enquiry
  // was shown a success screen and then silently discarded. Only show success
  // once the server has actually accepted the lead.
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
          lang: i18n.language,
          name: formData.name,
          email: formData.email,
          budget: formData.budget,
          service: formData.service,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-card relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rtl:left-5 rtl:right-auto text-slate-400 hover:text-slate-900 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 font-headline-md">{t('modal.submittedTitle')}</h3>
            <p className="text-slate-600 text-sm">
              {t('modal.submittedSub')}
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="bg-sky-500 hover:bg-sky-600 text-white font-label-md font-bold px-6 py-2.5 rounded-lg transition-all shadow-[0_4px_20px_rgba(56,189,248,0.35)]"
            >
              {t('modal.done')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Header */}
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-1.5 rtl:space-x-reverse text-xs font-label-sm text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                <Sparkles className="w-3 h-3" />
                <span>{t('modal.badge')}</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-headline-md">{t('modal.title')}</h3>
              <p className="text-slate-600 text-xs">{t('modal.subtitle')}</p>
            </div>

            {/* Inputs */}
            <div className="space-y-3 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">{t('modal.name')}</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jane Doe"
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">{t('modal.email')}</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jane@company.com"
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">{t('modal.focus')}</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-sky-500 transition-colors"
                  >
                    <option>Full Product Engineering</option>
                    <option>Strategic UX & Design System</option>
                    <option>AI & Predictive Analytics</option>
                    <option>Cloud Security & DevOps</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">{t('modal.budget')}</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-sky-500 transition-colors"
                  >
                    <option>$15k - $25k</option>
                    <option>$25k - $50k</option>
                    <option>$50k - $100k</option>
                    <option>$100k+</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">{t('modal.overview')}</label>
                <textarea
                  rows={3}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="..."
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>
            </div>

            {error && (
              <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
                {t('modal.error')}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-label-md font-bold py-3 rounded-lg transition-all shadow-[0_4px_20px_rgba(56,189,248,0.35)] flex items-center justify-center space-x-2 rtl:space-x-reverse cursor-pointer mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span>{isSubmitting ? t('modal.sending') : t('modal.submit')}</span>
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4 rtl:rotate-180" />
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
