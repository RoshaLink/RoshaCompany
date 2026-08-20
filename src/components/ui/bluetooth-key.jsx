import React, { useState } from "react";
import { cn } from "../../lib/utils";
import "./bluetooth-key.css";

export const BluetoothKey = ({ onClick, className }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (e) => {
    setIsActive(true);
    
    // Trigger opening contact modal after animation plays
    if (onClick) {
      setTimeout(() => {
        onClick();
        setTimeout(() => setIsActive(false), 800);
      }, 700);
    } else {
      setTimeout(() => setIsActive(false), 1200);
    }
  };

  return (
    <div className={cn("bluetooth-key-container", className)}>
      <label className="bluetooth-wrap" onClick={handleClick}>
        <input
          type="checkbox"
          checked={isActive}
          onChange={() => {}}
          aria-label="Connect with RoshaLink"
          className="bluetooth-input"
        />
        <div className="bluetooth-btn-shell">
          <div className="bluetooth-corner" />
          <div className="bluetooth-inner">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 390 430"
              className="bluetooth-svg"
            >
              <g filter="url(#inset-shadow)" className="symbol">
                <path
                  d="M202.884 13.3026C196.814 7.84601 188.099 6.46854 180.642 9.78694C173.182 13.1055 168.377 20.4983 168.377 28.6551V164.683L78.6175 75.0327C70.5431 66.9664 57.4523 66.9664 49.3779 75.0327C41.3037 83.0988 41.3037 96.1768 49.3779 104.243L159.813 214.548L49.3787 324.853C41.3045 332.919 41.3045 345.997 49.3787 354.063C57.453 362.129 70.5439 362.129 78.6182 354.063L168.377 264.413V400.441C168.377 408.598 173.182 415.99 180.642 419.309C188.099 422.629 196.814 421.251 202.884 415.794L306.262 322.847C310.618 318.931 313.105 313.35 313.105 307.495C313.105 301.639 310.618 296.06 306.262 292.142L219.958 214.548L306.262 136.954C310.618 133.037 313.105 127.457 313.105 121.602C313.105 115.746 310.618 110.166 306.262 106.249L202.884 13.3026ZM261.524 307.495L209.728 260.926V354.063L261.524 307.495ZM261.524 121.602L209.728 168.171V75.0327L261.524 121.602Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
                <circle r={30} cy={215} cx={343} />
                <circle r={30} cy={215} cx={46} />
              </g>
              <g className="symbol-path symbol-path-glow">
                <circle r={30} cy={215} cx={343} />
                <circle r={30} cy={215} cx={46} />
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  d="M188.5 213.5L189.5 29L291.5 122C200.028 205.699 151.078 251.942 64 340"
                />
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  d="M188.5 215.5L189.5 400L291.5 307C200.028 223.301 151.078 177.058 64 89"
                />
              </g>
              <g className="symbol-path">
                <circle r={10} cy={215} cx={343} />
                <circle r={10} cy={215} cx={46} />
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  d="M188.5 213.5L189.5 29L291.5 122C200.028 205.699 151.078 251.942 64 340"
                />
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  d="M188.5 215.5L189.5 400L291.5 307C200.028 223.301 151.078 177.058 64 89"
                />
              </g>
              <defs>
                <filter id="inset-shadow">
                  <feOffset dy={0} dx={0} />
                  <feGaussianBlur result="offset-blur" stdDeviation={10} />
                  <feComposite
                    result="inverse"
                    in2="offset-blur"
                    in="SourceGraphic"
                    operator="out"
                  />
                  <feFlood result="color" floodOpacity={1} floodColor="black" />
                  <feComposite
                    result="shadow"
                    in2="inverse"
                    in="color"
                    operator="in"
                  />
                  <feComposite in2="SourceGraphic" in="shadow" operator="over" />
                  <feDropShadow
                    floodColor="white"
                    floodOpacity={0.2}
                    stdDeviation={0}
                    dy={5}
                    dx={5}
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
        <div className="bluetooth-led" />
        <div className="bluetooth-bg-fx">
          <div className="bluetooth-shine-1" />
          <div className="bluetooth-shine-2" />
        </div>
        <div className="bluetooth-bg-glow" />
      </label>
      
      {/* Click Hint */}
      <span className="bluetooth-hint">
        Click to Connect & Start Strategy
      </span>
    </div>
  );
};
