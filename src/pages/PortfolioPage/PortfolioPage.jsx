import React from 'react';
import { Sparkles, ArrowRight, ExternalLink } from 'lucide-react';

export default function PortfolioPage({ onOpenGetStarted }) {
  const projects = [
    {
      title: "Vanguard Global Banking Platform",
      category: "FinTech & Real-Time Analytics",
      desc: "Re-architected core dashboard for 4M+ active enterprise users with sub-20ms transaction speeds.",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      metrics: "+420% Speed Improvement"
    },
    {
      title: "Apex AI Predictive Engine Suite",
      category: "AI & Machine Learning",
      desc: "Integrated real-time machine learning telemetry and predictive data dashboards for SaaS enterprise clients.",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
      metrics: "99.99% Uptime SLA"
    },
    {
      title: "BioPulse Health Intelligence",
      category: "HealthTech & Telemetry",
      desc: "ISO 27001 compliant patient monitoring interface with tokenized component architecture.",
      img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
      metrics: "100% Security Pass"
    },
    {
      title: "OmniCore SaaS Design System",
      category: "Enterprise Design System",
      desc: "Multi-brand design system with over 400+ production React components used by 12 internal dev squads.",
      img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
      metrics: "300% Velocity Increase"
    }
  ];

  return (
    <div className="space-y-20 pb-20 bg-[#f8fafc]">
      
      {/* Header */}
      <section className="relative pt-28 pb-20 px-4 md:px-12 bg-gradient-to-b from-[#f8fafc] via-slate-50 to-[#f8fafc] border-b border-slate-200 overflow-hidden">
        <div className="ambient-glow-cyan top-0 right-1/3 opacity-25 pointer-events-none" />
        <div className="max-w-[1280px] mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-sky-50 px-3.5 py-1 rounded-full border border-sky-200 text-xs font-label-sm text-sky-600 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FEATURED PORTFOLIO & CASE STUDIES</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-headline-xl text-slate-900 max-w-3xl mx-auto">
            High-Impact Software Shipped to Production
          </h1>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto font-body-lg">
            Explore our portfolio of enterprise web applications, AI platforms, and design systems built for market leaders.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="px-4 md:px-12 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <div key={i} className="glass-card rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:border-sky-400 transition-all group">
              <div className="h-64 overflow-hidden relative">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-sky-600 border border-slate-200 shadow-sm">
                  {p.metrics}
                </div>
              </div>
              <div className="p-8 space-y-3">
                <span className="text-xs font-label-sm text-sky-600 uppercase font-semibold">{p.category}</span>
                <h3 className="text-2xl font-bold text-slate-900 font-headline-md">{p.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
                <div className="pt-2">
                  <button 
                    onClick={onOpenGetStarted}
                    className="text-sky-600 font-bold text-xs flex items-center space-x-1 hover:text-sky-700 transition-colors cursor-pointer"
                  >
                    <span>View Case Study Detail</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-12 max-w-[1280px] mx-auto">
        <div className="glass-card rounded-2xl p-10 text-center space-y-6 border border-sky-300 bg-gradient-to-r from-sky-50 via-white to-slate-100 shadow-lg">
          <h2 className="text-2xl md:text-4xl font-bold font-headline-md text-slate-900">Have a High-Impact Product in Mind?</h2>
          <div className="flex justify-center">
            <button
              onClick={onOpenGetStarted}
              className="bg-sky-500 hover:bg-sky-600 text-white font-label-md font-bold px-8 py-3.5 rounded-lg transition-all shadow-[0_4px_20px_rgba(56,189,248,0.35)] flex items-center space-x-2 cursor-pointer"
            >
              <span>Build Your Product</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
