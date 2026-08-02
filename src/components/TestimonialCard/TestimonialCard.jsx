import React from 'react';
import { Star } from 'lucide-react';
import './TestimonialCard.css';

export default function TestimonialCard({ name, role, comment, avatar }) {
  return (
    <div className="glass-card bg-white/95 border border-slate-200 rounded-2xl p-6 space-y-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] hover:border-sky-400 transition-all group">
      
      {/* Rating Stars */}
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
        ))}
      </div>

      {/* Review Comment */}
      <p className="text-slate-700 text-sm leading-relaxed font-body-md italic">
        "{comment}"
      </p>

      {/* Author Info - Always Strictly LTR */}
      <div className="flex items-center space-x-3 pt-2 border-t border-slate-100" dir="ltr" style={{ direction: 'ltr', textAlign: 'left' }}>
        <img
          src={avatar}
          alt={name}
          className="w-10 h-10 rounded-full object-cover border border-slate-200 group-hover:scale-105 transition-transform shrink-0"
        />
        <div className="text-left">
          <h4 className="text-sm font-bold text-slate-900 font-headline-md leading-tight text-left">{name}</h4>
          <p className="text-xs text-sky-600 font-label-md text-left mt-0.5">{role}</p>
        </div>
      </div>

    </div>
  );
}
