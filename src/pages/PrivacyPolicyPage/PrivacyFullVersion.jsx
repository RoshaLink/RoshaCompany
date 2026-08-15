import React from 'react';
import PrivacyFullCard from './PrivacyFullCard';

export default function PrivacyFullVersion({ sections }) {
  if (!sections || !Array.isArray(sections)) return null;

  return (
    <div className="privacy-full-list">
      {sections.map((section, idx) => (
        <PrivacyFullCard key={idx} section={section} />
      ))}
    </div>
  );
}
