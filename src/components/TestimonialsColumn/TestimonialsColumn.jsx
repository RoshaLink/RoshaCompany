import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, Star } from 'lucide-react';
import TestimonialCard from '../TestimonialCard/TestimonialCard';
import './TestimonialsColumn.css';

const REVIEWS = [
  { name: "Alex Morgan", role: "CTO, FinTech Global", comment: "DESIGN+LOGIC transformed our legacy core banking dashboard into a sub-20ms micro-frontend architecture.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop" },
  { name: "Elena Rostova", role: "VP of Product, HealthTech", comment: "The design system provided by their team increased our multi-platform dev velocity by 300%.", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop" },
  { name: "Marcus Vance", role: "Head of Infrastructure, CloudScale", comment: "Flawless zero-downtime execution. Their DevOps team built our multi-cloud deployment pipeline in record time.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop" },
  { name: "Sarah Jenkins", role: "Director of UX, E-Commerce Empire", comment: "Exceptional visual aesthetics combined with rigorous performance metrics. Highly recommended!", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop" },
  { name: "David Chen", role: "Founder, AI Nexus Lab", comment: "They integrated custom generative AI pipelines into our web application seamlessly.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop" },
  { name: "Sophia Martinez", role: "Lead Product Designer, SaaSify", comment: "The tokenized design system is so clean and easy to maintain across mobile and web teams.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop" },
  { name: "James Wilson", role: "VP Engineering, CyberShield", comment: "ISO 27001 compliance and zero-trust security standards delivered without compromising user experience.", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop" },
  { name: "Chloe Bennett", role: "CMO, RetailX Group", comment: "Conversion rate increased by 48% within two months of releasing the new UI redesign.", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop" },
  { name: "Robert Taylor", role: "Chief Architect, PayFlow", comment: "Outstanding engineering rigor. The real-time telemetry dashboard gives us complete operational visibility.", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop" },
  { name: "Hannah Schmidt", role: "Product Manager, BioHealth", comment: "Working with their senior 5-member team felt like an inline extension of our own core founders.", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&auto=format&fit=crop" },
  { name: "Lucas Silva", role: "Managing Director, Global Logistics", comment: "Scaled our real-time tracking system to millions of concurrent requests effortlessly.", avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=200&auto=format&fit=crop" },
  { name: "Amara Oke", role: "Head of Growth, FinTech Africa", comment: "Beautiful UI design and bulletproof backend code. They exceeded all our corporate targets.", avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=200&auto=format&fit=crop" },
  { name: "Oliver Wright", role: "CTO, Datastream Inc", comment: "Sub-20ms latency maintained even under peak enterprise traffic spikes.", avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop" },
  { name: "Isabella Rossi", role: "Design Lead, Milan Studio", comment: "Pure visual perfection. The 3D animations and micro-interactions delight our users every day.", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop" },
  { name: "Noah Kim", role: "VP Tech, Seoul Innovations", comment: "Delivered our complex web application ahead of schedule with 100% test coverage.", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop" },
  { name: "Emily Watson", role: "Director, EduTech Platform", comment: "The design system simplified our internationalization efforts across 12 languages.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop" },
  { name: "Daniel Park", role: "Founder, Quantum AI", comment: "Intuitive dashboards for complex AI algorithms. Our users love the new experience.", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop" },
  { name: "Grace Liu", role: "Head of Digital, Asia Pacific Bank", comment: "Highest level of professionalism and technical competence. A true 5-star partner.", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop" },
  { name: "Liam O'Connor", role: "VP Product, InsureTech", comment: "Extremely clean code structure. Their React & Vite architecture made onboarding new devs a breeze.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop" },
  { name: "Mia Thompson", role: "CEO, NextGen Commerce", comment: "They transformed our brand identity and web application into an industry benchmark.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop" }
];

export default function TestimonialsColumn() {
  const { t } = useTranslation();

  const translatedReviews = REVIEWS.map((review, idx) => ({
    ...review,
    comment: t(`testimonials.reviews.r${idx + 1}`) || review.comment
  }));

  const col1 = translatedReviews.slice(0, 7);
  const col2 = translatedReviews.slice(7, 14);
  const col3 = translatedReviews.slice(14, 20);

  return (
    <section className="relative py-24 px-4 md:px-12 bg-[#f8fafc] overflow-hidden border-y border-slate-200">
      
      {/* Ambient background glow */}
      <div className="ambient-glow-purple top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 bg-sky-50 px-3.5 py-1 rounded-full border border-sky-200 text-xs font-label-sm text-sky-600 shadow-sm rtl:space-x-reverse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('testimonials.badge')}</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold font-headline-md text-slate-900">
            {t('testimonials.title')}
          </h2>

          <div className="flex items-center justify-center space-x-1 pt-1 rtl:space-x-reverse">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
            ))}
            <span className="text-slate-800 text-sm font-bold ml-2 rtl:mr-2 rtl:ml-0">{t('testimonials.rating')}</span>
          </div>
        </div>

        {/* Marquee Columns */}
        <div className="relative h-[650px] overflow-hidden">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
            
            {/* Column 1 */}
            <div className="flex flex-col gap-6 animate-marquee-up">
              {[...col1, ...col1].map((review, idx) => (
                <TestimonialCard key={`c1-${idx}`} {...review} />
              ))}
            </div>

            {/* Column 2 */}
            <div className="hidden md:flex flex-col gap-6 animate-marquee-down">
              {[...col2, ...col2].map((review, idx) => (
                <TestimonialCard key={`c2-${idx}`} {...review} />
              ))}
            </div>

            {/* Column 3 */}
            <div className="hidden lg:flex flex-col gap-6 animate-marquee-up">
              {[...col3, ...col3].map((review, idx) => (
                <TestimonialCard key={`c3-${idx}`} {...review} />
              ))}
            </div>

          </div>

          {/* Fade Masks */}
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#f8fafc] via-[#f8fafc]/70 to-transparent pointer-events-none z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/70 to-transparent pointer-events-none z-10" />

        </div>

      </div>
    </section>
  );
}
