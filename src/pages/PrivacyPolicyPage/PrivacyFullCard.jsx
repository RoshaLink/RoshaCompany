import React from 'react';
import { ShieldCheck, Lock, Globe, FileText, CheckCircle2, Server, Scale, KeyRound, Eye, Mail, Clock, RefreshCw } from 'lucide-react';

const ICON_MAP = {
  ShieldCheck,
  FileText,
  CheckCircle2,
  Scale,
  Server,
  Globe,
  Clock,
  KeyRound,
  Eye,
  Lock,
  Mail,
  RefreshCw
};

export default function PrivacyFullCard({ section }) {
  if (!section) return null;
  
  const IconComponent = typeof section.icon === 'string' ? ICON_MAP[section.icon] : section.icon;

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
