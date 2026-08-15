import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function PrivacyShortVersion({ points }) {
  if (!points || !Array.isArray(points)) return null;

  return (
    <div className="privacy-short-grid">
      {points.map((pt, i) => (
        <div key={i} className="privacy-short-card">
          <div className="privacy-short-card-header">
            <CheckCircle2 className="privacy-icon-green" />
            <span>{pt.title}</span>
          </div>
          <p className="privacy-short-card-desc">
            {pt.desc}
          </p>
        </div>
      ))}
    </div>
  );
}
