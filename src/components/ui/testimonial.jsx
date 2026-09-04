import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, Quote } from "lucide-react";
import { cn } from "../../lib/utils";
import "./testimonial.css";

// Import team member portraits
import MortezaPortrait from "../../assets/OurPictures/MortezaPortrait.webp";
import BellaPortrait from "../../assets/OurPictures/BellaPortrait.webp";
import SohrabPortrait from "../../assets/OurPictures/SohrabPortrait.webp";
import MinaPortrait from "../../assets/OurPictures/MinaPortrait.webp";
import MiladPortrait from "../../assets/OurPictures/MiladPortrait.webp";

function TimelineContent({
  as: Component = "div",
  children,
  className,
  animationNum = 0,
  customVariants,
  ...props
}) {
  const defaultVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.12,
        duration: 0.55,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  const variants = customVariants || defaultVariants;
  const MotionComponent = motion.create(Component);

  return (
    <MotionComponent
      custom={animationNum}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

export function ClientFeedback({
  badge = null,
  title = "Direct Leadership Driving Enterprise Innovation",
  subtitle = "How our founding squad engineers solutions, eliminates friction, and guarantees measurable growth.",
  data,
  isRTL = false,
  className,
}) {
  const testimonialRef = useRef(null);

  const revealVariants = {
    visible: (i) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    hidden: {
      filter: "blur(8px)",
      y: 20,
      opacity: 0,
    },
  };

  // Fallback / default cards if not passed via props
  const defaultCards = {
    morteza: {
      quote: "Software architecture must directly serve revenue and long-term business goals. We eliminate technical debt from day one by building clean, bespoke foundations without templates.",
      name: "Morteza",
      role: "CEO & Lead Architect",
    },
    bella: {
      quote: "Exceptional UI/UX connects technical precision with emotional human connection, boosting conversion and brand retention.",
      name: "Bella",
      role: "Head of Product & Brand",
    },
    sohrab: {
      quote: "Distributed cloud systems with sub-20ms latency and 99.99% uptime guarantee your platform never fails under peak enterprise traffic.",
      name: "Sohrab (Sam)",
      role: "Senior Full-Stack & Cloud Engineer",
    },
    mina: {
      quote: "Having consulted for global giants like Ericsson, rigorous business process auditing before writing code saves months of rework.",
      name: "Mina",
      role: "Business Analyst & Strategic Advisor",
    },
    milad: {
      quote: "From database indexing to silky frontend interactivity, pure and scalable code is the backbone of high-growth applications.",
      name: "Milad",
      role: "Senior Full-Stack & Systems Engineer",
    },
    synergy: {
      quote: "Our cross-disciplinary synergy between deep business analysis and senior engineering gives clients an unfair competitive advantage.",
      name: "RoshaLink Synergy",
      role: "Strategic Product Discovery",
    },
    guarantee: {
      quote: "We don't hand off projects to junior contractors. Every single client collaborates directly in real-time with the 5 senior partners building their software.",
      name: "RoshaLink Commitment",
      role: "Zero-Friction Engineering Guarantee",
    }
  };

  const cards = data || defaultCards;

  return (
    <section
      ref={testimonialRef}
      className={cn("feedback-section-wrapper", className)}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="feedback-container">
        
        {/* Header */}
        <div className="feedback-header">
          <TimelineContent
            as="h2"
            animationNum={0}
            customVariants={revealVariants}
            className="feedback-title"
          >
            {title}
          </TimelineContent>

          {subtitle && (
            <TimelineContent
              as="p"
              animationNum={2}
              customVariants={revealVariants}
              className="feedback-subtitle"
            >
              {subtitle}
            </TimelineContent>
          )}
        </div>

        {/* 3-Column Bento Grid */}
        <div className="feedback-bento-grid">
          
          {/* Column 1: Left */}
          <div className="feedback-col">
            
            {/* Top Large Card - Morteza */}
            <TimelineContent
              animationNum={1}
              customVariants={revealVariants}
              className="feedback-card flex-large card-theme-primary"
            >
              <div className="card-grid-pattern" />
              <Quote className="w-6 h-6 text-sky-500 mb-3 opacity-60" />
              <p className="feedback-quote-text">
                "{cards.morteza?.quote}"
              </p>
              <div className="feedback-author-row">
                <div className="feedback-author-info">
                  <h3 className="feedback-author-name">{cards.morteza?.name}</h3>
                  <p className="feedback-author-role">{cards.morteza?.role}</p>
                </div>
                <img
                  src={MortezaPortrait}
                  alt={cards.morteza?.name}
                  className="feedback-avatar"
                  loading="lazy"
                 width="1039" height="1513" />
              </div>
            </TimelineContent>

            {/* Bottom Card - Bella */}
            <TimelineContent
              animationNum={2}
              customVariants={revealVariants}
              className="feedback-card flex-small card-theme-blue"
            >
              <p className="feedback-quote-text">
                "{cards.bella?.quote}"
              </p>
              <div className="feedback-author-row">
                <div className="feedback-author-info">
                  <h3 className="feedback-author-name">{cards.bella?.name}</h3>
                  <p className="feedback-author-role">{cards.bella?.role}</p>
                </div>
                <img
                  src={BellaPortrait}
                  alt={cards.bella?.name}
                  className="feedback-avatar"
                  loading="lazy"
                 width="1086" height="1448" />
              </div>
            </TimelineContent>

          </div>

          {/* Column 2: Middle Stack */}
          <div className="feedback-col">
            
            {/* Middle Card 1 - Sohrab */}
            <TimelineContent
              animationNum={3}
              customVariants={revealVariants}
              className="feedback-card flex-medium card-theme-dark"
            >
              <p className="feedback-quote-text">
                "{cards.sohrab?.quote}"
              </p>
              <div className="feedback-author-row">
                <div className="feedback-author-info">
                  <h3 className="feedback-author-name">{cards.sohrab?.name}</h3>
                  <p className="feedback-author-role">{cards.sohrab?.role}</p>
                </div>
                <img
                  src={SohrabPortrait}
                  alt={cards.sohrab?.name}
                  className="feedback-avatar"
                  loading="lazy"
                 width="1089" height="1444" />
              </div>
            </TimelineContent>

            {/* Middle Card 2 - Mina */}
            <TimelineContent
              animationNum={4}
              customVariants={revealVariants}
              className="feedback-card flex-medium card-theme-dark"
            >
              <p className="feedback-quote-text">
                "{cards.mina?.quote}"
              </p>
              <div className="feedback-author-row">
                <div className="feedback-author-info">
                  <h3 className="feedback-author-name">{cards.mina?.name}</h3>
                  <p className="feedback-author-role">{cards.mina?.role}</p>
                </div>
                <img
                  src={MinaPortrait}
                  alt={cards.mina?.name}
                  className="feedback-avatar"
                  loading="lazy"
                 width="1122" height="1402" />
              </div>
            </TimelineContent>

            {/* Middle Card 3 - Milad */}
            <TimelineContent
              animationNum={5}
              customVariants={revealVariants}
              className="feedback-card flex-medium card-theme-dark"
            >
              <p className="feedback-quote-text">
                "{cards.milad?.quote}"
              </p>
              <div className="feedback-author-row">
                <div className="feedback-author-info">
                  <h3 className="feedback-author-name">{cards.milad?.name}</h3>
                  <p className="feedback-author-role">{cards.milad?.role}</p>
                </div>
                <img
                  src={MiladPortrait}
                  alt={cards.milad?.name}
                  className="feedback-avatar"
                  loading="lazy"
                 width="1091" height="1442" />
              </div>
            </TimelineContent>

          </div>

          {/* Column 3: Right */}
          <div className="feedback-col">
            
            {/* Top Card - Synergy */}
            <TimelineContent
              animationNum={6}
              customVariants={revealVariants}
              className="feedback-card flex-small card-theme-emerald"
            >
              <p className="feedback-quote-text">
                "{cards.synergy?.quote}"
              </p>
              <div className="feedback-author-row">
                <div className="feedback-author-info">
                  <h3 className="feedback-author-name">{cards.synergy?.name}</h3>
                  <p className="feedback-author-role">{cards.synergy?.role}</p>
                </div>
                <img
                  src={BellaPortrait}
                  alt={cards.synergy?.name}
                  className="feedback-avatar"
                  loading="lazy"
                 width="1086" height="1448" />
              </div>
            </TimelineContent>

            {/* Bottom Large Card - Guarantee */}
            <TimelineContent
              animationNum={7}
              customVariants={revealVariants}
              className="feedback-card flex-large card-theme-primary"
            >
              <div className="card-grid-pattern" />
              <Quote className="w-6 h-6 text-sky-500 mb-3 opacity-60" />
              <p className="feedback-quote-text">
                "{cards.guarantee?.quote}"
              </p>
              <div className="feedback-author-row">
                <div className="feedback-author-info">
                  <h3 className="feedback-author-name">{cards.guarantee?.name}</h3>
                  <p className="feedback-author-role">{cards.guarantee?.role}</p>
                </div>
                <img
                  src={MortezaPortrait}
                  alt={cards.guarantee?.name}
                  className="feedback-avatar"
                  loading="lazy"
                 width="1039" height="1513" />
              </div>
            </TimelineContent>

          </div>

        </div>

        <div className="feedback-bottom-accent" />
      </div>
    </section>
  );
}

export default ClientFeedback;
