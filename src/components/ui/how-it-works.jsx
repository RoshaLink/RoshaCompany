import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import "./how-it-works.css";

const Pin = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" />
  </svg>
);

const Card = ({
  number,
  title,
  description,
  colorTheme = "blue",
  icon: Icon,
  className = "",
  style = {},
  isRTL = false
}) => {
  return (
    <div
      className={`how-card-outer theme-${colorTheme} ${className}`}
      style={style}
    >
      <div className="how-card-frame">
        <Pin className="how-pin-icon" />
        <div className="how-card-inner">
          <div className="how-card-top-row">
            <span className="how-card-number">{number}</span>
            {Icon && (
              <div className="how-card-icon-pill">
                <Icon className="w-4 h-4" />
              </div>
            )}
          </div>
          <h3 className="how-card-title">{title}</h3>
          <p className="how-card-desc">{description}</p>
        </div>
      </div>
    </div>
  );
};

const DEFAULT_POSITIONS_LTR = [
  { className: "how-pos-1-ltr", rotate: "rotate-3" },
  { className: "how-pos-2-ltr", rotate: "-rotate-3" },
  { className: "how-pos-3-ltr", rotate: "rotate-3" },
  { className: "how-pos-4-ltr", rotate: "-rotate-3" }
];

const DEFAULT_POSITIONS_RTL = [
  { className: "how-pos-1-rtl", rotate: "-rotate-3" },
  { className: "how-pos-2-rtl", rotate: "rotate-3" },
  { className: "how-pos-3-rtl", rotate: "-rotate-3" },
  { className: "how-pos-4-rtl", rotate: "rotate-3" }
];

export function HowItWorks({
  title,
  subtitle,
  steps = [],
  isRTL = false,
  className = ""
}) {
  const [activeStep, setActiveStep] = useState(0);
  const cardRefs = useRef([]);
  const positions = isRTL ? DEFAULT_POSITIONS_RTL : DEFAULT_POSITIONS_LTR;
  const height = 800;

  // Connecting path coordinates for 4 zigzag cards
  const pathD = isRTL
    ? "M 740 130 C 500 130, 460 270, 240 270 C 80 270, 460 410, 740 510 C 900 600, 460 690, 240 690"
    : "M 260 130 C 500 130, 540 270, 760 270 C 920 270, 540 410, 260 510 C 100 600, 540 690, 760 690";

  return (
    <section className={`how-it-works-section ${isRTL ? "is-rtl" : "is-ltr"} ${className}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Background paper lines & ambient gradients */}
      <div className="how-bg-grid" />
      <div className="how-ambient-glow" />

      <div className="how-container">
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="how-header">
            {title && <h2 className="how-title">{title}</h2>}
            {subtitle && <p className="how-subtitle">{subtitle}</p>}
          </div>
        )}

        {/* Interactive Canvas with Connecting SVG & Pinned Cards */}
        <div className="how-canvas-wrapper" style={{ "--canvas-height": `${height}px` }}>
          {/* Animated Connecting Dashed Line (Desktop) */}
          <svg
            className="how-svg-line"
            viewBox={`0 0 1000 ${height}`}
            preserveAspectRatio="none"
          >
            <motion.path
              d={pathD}
              stroke="currentColor"
              className="how-path-stroke"
              strokeWidth="2.5"
              strokeDasharray="8 6"
              fill="none"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: isRTL ? 140 : -140 }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </svg>

          {/* Cards Container */}
          <div className="how-cards-container">
            {steps.map((step, index) => {
              const pos = positions[index % positions.length] || {};
              return (
                <Card
                  key={step.title || index}
                  number={step.number || `0${index + 1}`}
                  title={step.title}
                  description={step.description}
                  colorTheme={step.colorTheme || (index === 0 ? "blue" : index === 1 ? "purple" : index === 2 ? "emerald" : "orange")}
                  icon={step.icon}
                  className={`${pos.className || ""} ${pos.rotate || ""}`}
                  isRTL={isRTL}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
