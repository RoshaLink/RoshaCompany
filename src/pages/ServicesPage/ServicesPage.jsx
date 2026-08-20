import React from 'react';
import { Sparkles, Compass, Code2, Cpu, Cloud, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ServicesPage({ onOpenGetStarted }) {
  const services = [
    {
      icon: Compass,
      title: "Strategic Product & UX Design",
      desc: "Transforming high-level business goals into intuitive, high-converting digital interfaces through deep analytics and precision user research.",
      deliverables: ["Design Tokens & Systems", "High-Fidelity React Wireframes", "User Journey & Analytics Audits", "Accessibility & WCAG 2.1 AA Compliance"]
    },
    {
      icon: Code2,
      title: "Full-Stack Software Engineering",
      desc: "Resilient web and mobile software built with modern JavaScript frameworks, modular architecture, and high-performance backend pipelines.",
      deliverables: ["React & Vite SPA Architectures", "Node.js & Microservices APIs", "Real-Time Telemetry & WebSockets", "Automated E2E Testing Suites"]
    },
    {
      icon: Cpu,
      title: "AI & Intelligence Platforms",
      desc: "Integrating predictive models, generative AI APIs, and real-time automated data processing directly into customer workflows.",
      deliverables: ["Custom LLM & RAG Integration", "Predictive Analytics Dashboards", "Automated Data Ingestion Pipelines", "AI Model Fine-Tuning & Evaluation"]
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps Infrastructure",
      desc: "Scalable cloud infrastructures, microservices architecture, and automated CI/CD pipelines engineered for zero downtime.",
      deliverables: ["Multi-Cloud Deployment (AWS/GCP)", "Kubernetes & Docker Containerization", "ISO 27001 Security Validation", "Sub-20ms Global CDN Acceleration"]
    }
  ];

  return (
    <div className="space-y-20 pb-20 bg-[#f8fafc]">
      
      {/* Header */}
      <section className="relative pt-28 pb-20 px-4 md:px-12 bg-gradient-to-b from-[#f8fafc] via-slate-50 to-[#f8fafc] border-b border-slate-200 overflow-hidden">
        <div className="ambient-glow-cyan top-0 left-1/4 opacity-25 pointer-events-none" />
        <div className="max-w-[1280px] mx-auto text-center space-y-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold font-headline-xl text-slate-900 max-w-3xl mx-auto">
            Full-Lifecycle Product Architecture & Execution
          </h1>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto font-body-lg">
            From initial technical scoping to zero-downtime production deployment, we deliver enterprise-grade software.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 md:px-12 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div key={idx} className="glass-card rounded-2xl p-8 space-y-6 border border-slate-200 bg-white shadow-sm hover:border-sky-400 transition-all">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 font-headline-md">{item.title}</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-xs font-label-sm text-sky-600 uppercase font-semibold">Key Deliverables:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-800">
                    {item.deliverables.map((d, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-12 max-w-[1280px] mx-auto">
        <div className="glass-card rounded-2xl p-10 text-center space-y-6 border border-sky-300 bg-gradient-to-r from-sky-50 via-white to-slate-100 shadow-lg">
          <h2 className="text-2xl md:text-4xl font-bold font-headline-md text-slate-900">Need Custom Technical Scoping?</h2>
          <div className="flex justify-center">
            <button
              onClick={onOpenGetStarted}
              className="bg-sky-500 hover:bg-sky-600 text-white font-label-md font-bold px-8 py-3.5 rounded-lg transition-all shadow-[0_4px_20px_rgba(56,189,248,0.35)] flex items-center space-x-2 cursor-pointer"
            >
              <span>Initiate Project Brief</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
