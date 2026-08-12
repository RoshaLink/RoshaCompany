import React from 'react';
import { Star } from 'lucide-react';
import './TestimonialCard.css';

export default function TestimonialCard({ name, role, comment, avatar }) {
  return (
    <div className="testimonial-card group">
      
      {/* Rating Stars */}
      <div className="testimonial-card-rating">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="testimonial-card-star" />
        ))}
      </div>

      {/* Review Comment */}
      <p className="testimonial-card-comment">
        "{comment}"
      </p>

      {/* Author Info - Always Strictly LTR */}
      <div className="testimonial-card-author" dir="ltr" style={{ direction: 'ltr', textAlign: 'left' }}>
        <img
          src={avatar}
          alt={name}
          className="testimonial-card-avatar group-hover:scale-105"
        />
        <div className="testimonial-card-info">
          <h4 className="testimonial-card-name">{name}</h4>
          <p className="testimonial-card-role">{role}</p>
        </div>
      </div>

    </div>
  );
}
