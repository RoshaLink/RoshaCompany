import React from 'react';
import { Star } from 'lucide-react';
import './StarRating.css';

/**
 * Renders `value` out of `count` stars, including a partially filled star for
 * the fractional part -- a 4.6 average should not be drawn as five solid
 * stars. The filled layer is an overlay clipped to the remainder, so the
 * partial star fills left-to-right regardless of page direction (a star icon
 * reads the same way in RTL).
 */
export default function StarRating({ value, count = 5, starClassName = '', label }) {
  return (
    <span
      className="star-rating"
      role="img"
      aria-label={label || `${value} of ${count} stars`}
    >
      {Array.from({ length: count }, (_, i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span key={i} className="star-rating-item" aria-hidden="true">
            <Star className={`star-rating-empty ${starClassName}`} />
            {fill > 0 && (
              <span className="star-rating-fill" style={{ width: `${fill * 100}%` }}>
                <Star className={starClassName} />
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}
