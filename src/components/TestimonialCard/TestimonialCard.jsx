import React from 'react';
import StarRating from '../StarRating/StarRating';
import './TestimonialCard.css';

export default function TestimonialCard({ name, role, comment, avatar, rating = 5 }) {
  return (
    <div className="testimonial-card group">

      {/* Rating Stars -- per review, not a fixed five */}
      <div className="testimonial-card-rating">
        <StarRating
          value={rating}
          starClassName="testimonial-card-star"
          label={`${rating} of 5 stars`}
        />
      </div>

      {/* Review Comment */}
      <p className="testimonial-card-comment">
        "{comment}"
      </p>

      {/* Author Info - Always Strictly LTR */}
      <div className="testimonial-card-author" dir="ltr" style={{ direction: 'ltr', textAlign: 'left' }}>
        <img
          src={avatar}
          alt=""
          width="40"
          height="40"
          loading="lazy"
          decoding="async"
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
