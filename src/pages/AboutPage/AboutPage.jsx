import React from 'react';
import { Sparkles, Users, Award, ShieldCheck, Target, HeartHandshake, ArrowRight } from 'lucide-react';

export default function AboutPage({ onOpenGetStarted }) {
  const values = [
    { icon: Target, title: "Precision-First Architecture", desc: "Every line of code and UI component is crafted to sustain rapid enterprise scaling without technical debt." },
    { icon: ShieldCheck, title: "Security & Zero Trust", desc: "Enterprise data privacy and ISO 27001 compliance standards baked into core application workflows." },
    { icon: Award, title: "Measurable Impact", desc: "We measure success in client revenue growth, reduced latency, and real user adoption metrics." },
    { icon: HeartHandshake, title: "Transparent Engineering", desc: "Direct collaboration with senior partner architects without proxy project managers or handoff friction." }
  ];

  return (
    <div className="space-y-20 pb-20 bg-[#f8fafc]">
      
      {/* Header Banner */}
      <section className="relative pt-28 pb-20 px-4 md:px-12 bg-gradient-to-b from-[#f8fafc] via-slate-50 to-[#f8fafc] border-b border-slate-200 overflow-hidden">
        <div className="ambient-glow-cyan top-0 right-1/4 opacity-25 pointer-events-none" />
        <div className="max-w-[1280px] mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-sky-50 px-3.5 py-1 rounded-full border border-sky-200 text-xs font-label-sm text-sky-600 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ABOUT DESIGN+LOGIC</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-headline-xl text-slate-900 max-w-3xl mx-auto">
            Architecting the Next Generation of Digital Products
          </h1>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto font-body-lg">
            We are an elite squad of senior architects, product designers, and security engineers dedicated to transforming complex digital products.
          </p>
        </div>
      </section>

      {/* Mission & Vision Bento */}
      <section className="px-4 md:px-12 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card rounded-2xl p-8 space-y-4 border border-slate-200 bg-white shadow-sm">
            <span className="text-xs font-label-sm text-sky-600 uppercase font-semibold">Our Purpose</span>
            <h3 className="text-2xl font-bold text-slate-900 font-headline-md">Eliminating Product Friction</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Modern enterprises struggle with disconnected design systems, slow legacy backends, and bloated software stacks. Our mission is to bridge the gap between rigorous business analysis and cutting-edge tech.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-8 space-y-4 border border-slate-200 bg-white shadow-sm">
            <span className="text-xs font-label-sm text-indigo-600 uppercase font-semibold">Our Standard</span>
            <h3 className="text-2xl font-bold text-slate-900 font-headline-md">Zero-Downtime Execution</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              We design modular, event-driven architectures engineered for 99.99% uptime, sub-20ms transaction speeds, and multi-platform consistency across web and mobile.
            </p>
          </div>
        </div>
      </section>

      {/* Core Principles Grid */}
      <section className="px-4 md:px-12 max-w-[1280px] mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-label-sm text-sky-600 uppercase font-semibold">Core Principles</span>
          <h2 className="text-3xl font-bold font-headline-md text-slate-900">How We Build Products</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const IconComp = v.icon;
            return (
              <div key={i} className="glass-card rounded-xl p-6 space-y-3 border border-slate-200 bg-white shadow-sm hover:border-sky-400 transition-all">
                <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                  <IconComp className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 font-headline-md">{v.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-4 md:px-12 max-w-[1280px] mx-auto">
        <div className="glass-card rounded-2xl p-10 text-center space-y-6 border border-sky-300 bg-gradient-to-r from-sky-50 via-white to-slate-100 shadow-lg">
          <h2 className="text-2xl md:text-4xl font-bold font-headline-md text-slate-900">Want to Partner with Our Leadership Squad?</h2>
          <div className="flex justify-center">
            <button
              onClick={onOpenGetStarted}
              className="bg-sky-500 hover:bg-sky-600 text-white font-label-md font-bold px-8 py-3.5 rounded-lg transition-all shadow-[0_4px_20px_rgba(56,189,248,0.35)] flex items-center space-x-2 cursor-pointer"
            >
              <span>Schedule Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
