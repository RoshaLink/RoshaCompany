import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import './rolling-list.css';

const colorClassMap = {
  sky: "theme-color-sky",
  emerald: "theme-color-emerald",
  indigo: "theme-color-indigo",
  purple: "theme-color-purple",
  blue: "theme-color-sky"
};

function RollingTextItem({ item, index, isRTL }) {
  const colorClass = colorClassMap[item.color] || "theme-color-sky";
  const numString = item.number || String((index !== undefined ? index : (item.id || 1) - 1) + 1).padStart(2, '0');

  return (
    <div className={`rolling-item-group ${colorClass} ${isRTL ? "is-rtl" : "is-ltr"}`}>
      {/* Background Hover Highlight */}
      <div className="rolling-item-hover-bg" />

      {/* Main Row Content */}
      <div className="rolling-item-main">
        {/* Index Number */}
        <div className="rolling-item-index">
          <span className="rolling-item-number">{numString}</span>
        </div>

        {/* Content Container (Title + Subtext) */}
        <div className="rolling-item-content">
          {/* Large Title Box */}
          <div className="rolling-title-box">
            <h3 className="rolling-title-text rolling-title-normal">
              {item.title}
            </h3>
            <h3 className="rolling-title-text rolling-title-hover italic" aria-hidden="true">
              {item.title}
            </h3>
          </div>

          {/* Collapsible Subtext / Description on Hover */}
          {item.description && (
            <div className="rolling-desc-container">
              <p className="rolling-item-desc">
                {item.description}
              </p>
            </div>
          )}

          {/* Mobile inline expandable preview */}
          {item.src && (
            <div className="rolling-mobile-image-wrapper">
              <img
                src={item.src}
                alt={item.alt || item.title}
                className="rolling-mobile-img"
                loading="lazy"
              />
            </div>
          )}
        </div>

        {/* Arrow Action Box */}
        <div className="rolling-item-action">
          <div className="rolling-arrow-circle">
            <ArrowUpRight className="rolling-item-arrow" />
          </div>
        </div>
      </div>

      {/* Floating Desktop Image Reveal Effect on Hover */}
      {item.src && (
        <div className="rolling-image-reveal-wrapper">
          <div className="rolling-image-reveal-frame">
            <img
              src={item.src}
              alt={item.alt || item.title}
              className="rolling-reveal-img"
              loading="lazy"
            />
            <div className="rolling-image-overlay" />
          </div>
        </div>
      )}
    </div>
  );
}

export function RollingTextList({
  title,
  subtitle,
  items = [],
  isRTL = false,
  className = ""
}) {
  return (
    <section className={`rolling-list-section ${isRTL ? "is-rtl" : "is-ltr"} ${className}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Ambient background glows */}
      <div className="rolling-list-glow-1" />
      <div className="rolling-list-glow-2" />

      <div className="rolling-list-container">
        {/* Header */}
        {(title || subtitle) && (
          <div className="rolling-list-header">
            {title && <h2 className="rolling-section-title">{title}</h2>}
            {subtitle && <p className="rolling-section-subtitle">{subtitle}</p>}
          </div>
        )}

        {/* Interactive List Container */}
        <div className="rolling-items-wrapper">
          {items.map((item, index) => (
            <RollingTextItem
              key={item.id || index}
              item={item}
              index={index}
              isRTL={isRTL}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RollingTextList;
