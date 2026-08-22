import React from 'react';
import { useTranslation } from 'react-i18next';
import TestimonialCard from '../TestimonialCard/TestimonialCard';
import StarRating from '../StarRating/StarRating';
import './TestimonialsColumn.css';

// The average shown in the header. Keep it equal to the mean of the ratings
// below -- 12 fives and 8 fours over 20 reviews is exactly 4.6.
const AVERAGE_RATING = 4.6;

const AVATAR_COLORS = ['#0284c7', '#0d9488', '#4f46e5', '#b45309', '#be185d', '#15803d'];

/**
 * Initial-based avatars rather than stock portraits: the previous set pulled
 * 20 photos of real people from Unsplash on every render of this section, and
 * attaching a stranger's face to a named review is misleading on top of being
 * 20 extra network requests. Inline SVG has neither problem.
 */
function initialsAvatar(name, idx) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase();
  const bg = AVATAR_COLORS[idx % AVATAR_COLORS.length];
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">` +
    `<rect width="80" height="80" rx="40" fill="${bg}"/>` +
    `<text x="50%" y="50%" dy="0.35em" text-anchor="middle" ` +
    `font-family="system-ui, -apple-system, Segoe UI, sans-serif" ` +
    `font-size="32" font-weight="600" fill="#ffffff">${initials}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

// Comments come from i18n (testimonials.reviews.rN) so they translate with the
// rest of the page; name, role and rating stay here since they do not.
const REVIEWS = [
  { name: 'Kianoush Amiri', role: 'Ägare, Perspolis Restaurang', rating: 5 },
  { name: 'Anna Lindqvist', role: 'Klinikchef, Tandläkaren', rating: 5 },
  { name: 'Farhad Shirazi', role: 'Delägare, Shirazi Associates', rating: 5 },
  { name: 'Mehrdad Parsa', role: 'Managing Partner, Pars Law Firm', rating: 4 },
  { name: 'Johan Ek', role: 'Driftchef, FFSTECH', rating: 5 },
  { name: 'Nasrin Tehrani', role: 'Grundare, Saffron Deli', rating: 5 },
  { name: 'Erik Sandberg', role: 'VD, Nordic Bygg', rating: 4 },
  { name: 'Roya Kazemi', role: 'Marknadschef, Golestan Import', rating: 5 },
  { name: 'Linnea Holm', role: 'Produktägare, VårdPortalen', rating: 4 },
  { name: 'Babak Rahimi', role: 'Ägare, Rahimi Fastighetsservice', rating: 5 },
  { name: 'Oscar Lund', role: 'CTO, Frakt & Logistik AB', rating: 4 },
  { name: 'Shirin Daryaei', role: 'Grundare, Diba Skönhetsklinik', rating: 5 },
  { name: 'Mattias Ohlsson', role: 'Utvecklingschef, RetailNord', rating: 5 },
  { name: 'Arash Moradi', role: 'Ägare, Persia Auto Service', rating: 4 },
  { name: 'Camilla Nyberg', role: 'Kommunikationschef, Stiftelsen Framtid', rating: 4 },
  { name: 'Hamid Yazdani', role: 'VD, Yazdani Juridik', rating: 5 },
  { name: 'Sofia Ekelund', role: 'Egenföretagare, Ekelund Design', rating: 5 },
  { name: 'Payam Sadeghi', role: 'Teknisk chef, ParsNet', rating: 4 },
  { name: 'Elin Forsberg', role: 'Projektledare, KommunIT', rating: 4 },
  { name: 'Maryam Hosseini', role: 'Grundare, Hosseini Catering', rating: 5 },
].map((review, idx) => ({ ...review, avatar: initialsAvatar(review.name, idx) }));

export default function TestimonialsColumn() {
  const { t, i18n } = useTranslation();
  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());
  const rtlClass = isRTL ? 'is-rtl' : 'is-ltr';

  const translatedReviews = REVIEWS.map((review, idx) => ({
    ...review,
    comment: t(`testimonials.reviews.r${idx + 1}`)
  }));

  const col1 = translatedReviews.slice(0, 7);
  const col2 = translatedReviews.slice(7, 14);
  const col3 = translatedReviews.slice(14, 20);

  return (
    <section className="testimonial-col-section">

      {/* Ambient background glow */}
      <div className="testimonial-col-glow" />

      <div className="testimonial-col-container">

        {/* Section Header */}
        <div className="testimonial-col-header">

          <h2 className="testimonial-col-title">
            {t('testimonials.title')}
          </h2>

          <div className={`testimonial-col-rating ${rtlClass}`}>
            <StarRating
              value={AVERAGE_RATING}
              starClassName="testimonial-col-star"
              label={t('testimonials.rating')}
            />
            <span className="testimonial-col-rating-text">{t('testimonials.rating')}</span>
          </div>
        </div>

        {/* Marquee Columns */}
        <div className="testimonial-col-marquee-wrapper">

          <div className="testimonial-col-grid">

            {/* Column 1 */}
            <div className="testimonial-col-track animate-marquee-up">
              {[...col1, ...col1].map((review, idx) => (
                <TestimonialCard key={`c1-${idx}`} {...review} />
              ))}
            </div>

            {/* Column 2 */}
            <div className="testimonial-col-track-2 animate-marquee-down">
              {[...col2, ...col2].map((review, idx) => (
                <TestimonialCard key={`c2-${idx}`} {...review} />
              ))}
            </div>

            {/* Column 3 */}
            <div className="testimonial-col-track-3 animate-marquee-up">
              {[...col3, ...col3].map((review, idx) => (
                <TestimonialCard key={`c3-${idx}`} {...review} />
              ))}
            </div>

          </div>

          {/* Fade Masks */}
          <div className="testimonial-col-fade-top" />
          <div className="testimonial-col-fade-bottom" />

        </div>

      </div>
    </section>
  );
}
