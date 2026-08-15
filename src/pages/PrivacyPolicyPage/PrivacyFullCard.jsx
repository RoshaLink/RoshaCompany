import React from 'react';

export default function PrivacyFullCard({ section }) {
  const IconComponent = section.icon;

  return (
    <div className="privacy-full-card">
      <div className="privacy-full-card-inner">
        {IconComponent && (
          <div className="privacy-full-card-icon-box">
            <IconComponent className="privacy-card-icon" />
          </div>
        )}

        <div className="privacy-full-card-content">
          <h2 className="privacy-full-card-title">
            {section.title}
          </h2>
          <div className="privacy-full-card-text">
            {section.text}
          </div>
        </div>
      </div>
    </div>
  );
}
