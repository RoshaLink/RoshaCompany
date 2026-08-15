import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, Star } from 'lucide-react';
import TestimonialCard from '../TestimonialCard/TestimonialCard';
import './TestimonialsColumn.css';

const REVIEWS = [
  { name: "Alex Morgan", role: "CTO, FinTech Global", comment: "RoshaLink transformed our legacy core banking dashboard into a sub-20ms micro-frontend architecture.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop" },
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
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());
  const rtlClass = isRTL ? 'is-rtl' : 'is-ltr';

  const translatedReviews = REVIEWS.map((review, idx) => ({
    ...review,
    comment: t(`testimonials.reviews.r${idx + 1}`) || review.comment
  }));

  const col1 = translatedReviews.slice(0, 7);
  const col2 = translatedReviews.slice(7, 14);
  const col3 = translatedReviews.slice(14, 20);

  return (
    <section className="testimonial-col-section">
      
      {/* Ambient background glow */}
      <div className="testimonial-col-glow" />

      <div className="testimonial-col-container">
        
        {/* Section Header */}
        <div className="testimonial-col-header">

          <h2 className="testimonial-col-title">
            {t('testimonials.title')}
          </h2>

          <div className={`testimonial-col-rating ${rtlClass}`}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="testimonial-col-star" />
            ))}
            <span className="testimonial-col-rating-text">{t('testimonials.rating')}</span>
          </div>
        </div>

        {/* Marquee Columns */}
        <div className="testimonial-col-marquee-wrapper">
          
          <div className="testimonial-col-grid">
            
            {/* Column 1 */}
            <div className="testimonial-col-track animate-marquee-up">
              {[...col1, ...col1].map((review, idx) => (
                <TestimonialCard key={`c1-${idx}`} {...review} />
              ))}
            </div>

            {/* Column 2 */}
            <div className="testimonial-col-track-2 animate-marquee-down">
              {[...col2, ...col2].map((review, idx) => (
                <TestimonialCard key={`c2-${idx}`} {...review} />
              ))}
            </div>

            {/* Column 3 */}
            <div className="testimonial-col-track-3 animate-marquee-up">
              {[...col3, ...col3].map((review, idx) => (
                <TestimonialCard key={`c3-${idx}`} {...review} />
              ))}
            </div>

          </div>

          {/* Fade Masks */}
          <div className="testimonial-col-fade-top" />
          <div className="testimonial-col-fade-bottom" />

        </div>

      </div>
    </section>
  );
}
