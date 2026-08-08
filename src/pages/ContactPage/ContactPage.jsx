import React, { useState } from 'react';
import { Sparkles, Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });

  // Previously this only called setSubmitted(true), so every brief was shown a
  // confirmation and then discarded. Success is now contingent on the server
  // actually accepting the lead.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(false);

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: 'contact', ...formData })
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
    <div className="space-y-20 pb-20 bg-[#f8fafc]">
      
      {/* Header */}
      <section className="relative pt-28 pb-20 px-4 md:px-12 bg-gradient-to-b from-[#f8fafc] via-slate-50 to-[#f8fafc] border-b border-slate-200 overflow-hidden">
        <div className="ambient-glow-cyan top-0 left-1/3 opacity-25 pointer-events-none" />
        <div className="max-w-[1280px] mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-sky-50 px-3.5 py-1 rounded-full border border-sky-200 text-xs font-label-sm text-sky-600 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CONTACT & DISCOVERY CALL</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-headline-xl text-slate-900 max-w-3xl mx-auto">
            Let's Build Something Extraordinary
          </h1>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto font-body-lg">
            Schedule a technical strategy session with our 5 principal partners today.
          </p>
        </div>
      </section>

      {/* Form & Details Container */}
      <section className="px-4 md:px-12 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 font-headline-md">Direct Partner Access</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                No intermediate sales reps. You will speak directly with our Senior Systems Architects and Head of Design.
              </p>
            </div>

            <div className="space-y-4 text-sm font-label-md">
              <div className="flex items-center space-x-3 text-slate-700">
                <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">General Enquiries</span>
                  <span className="font-bold text-slate-900">hello@designlogic.agency</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-slate-700">
                <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Direct Line</span>
                  <span className="font-bold text-slate-900">+1 (800) 492-9102</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-slate-700">
                <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Global HQ</span>
                  <span className="font-bold text-slate-900">San Francisco, CA & Zurich, Switzerland</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-8 border border-slate-200 bg-white shadow-md">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 font-headline-md">Discovery Request Received!</h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto">
                    Our lead architect will review your project requirements and email you back within 4 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-bold text-slate-900 font-headline-md">Send Us a Brief</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Work Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Company Name & Role</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Enterprise Inc / CTO"
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Project Overview & Timeline</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your project goals, technical stack, or timeline requirements..."
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>

                  {error && (
                    <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
                      We couldn&apos;t send your brief. Please try again in a moment.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white font-label-md font-bold py-3.5 rounded-lg transition-all shadow-[0_4px_20px_rgba(56,189,248,0.35)] flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Submit Strategic Brief'}</span>
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
