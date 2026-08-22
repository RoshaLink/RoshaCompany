import * as React from 'react';
import './glass-card.css';

export const GlassCard = React.forwardRef(
  (
    {
      title = 'Tech Title',
      description = 'Description of the technology and architecture capabilities.',
      icon: Icon,
      theme = 'sky',
      badge,
      isRTL = false,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`glass-card-root theme-${theme} ${isRTL ? 'is-rtl' : 'is-ltr'} ${className}`}
        {...props}
      >
        <div className="glass-card-inner">
          {/* Layer 1: Ambient Glass Backdrop Layer */}
          <div className="glass-card-backdrop" />

          {/* Layer 2: 3D Concentric Floating Depth Rings in Corner */}
          <div className="glass-card-circles-wrapper">
            {[
              { size: '170px', pos: '8px', z: '20px', delay: '0s' },
              { size: '140px', pos: '10px', z: '40px', delay: '0.15s' },
              { size: '110px', pos: '17px', z: '60px', delay: '0.3s' },
              { size: '80px', pos: '23px', z: '80px', delay: '0.45s' }
            ].map((circle, index) => (
              <div
                key={index}
                className={`glass-card-circle circle-layer-${index + 1}`}
                style={{
                  width: circle.size,
                  height: circle.size,
                  top: circle.pos,
                  [isRTL ? 'left' : 'right']: circle.pos,
                  transform: `translate3d(0, 0, ${circle.z})`,
                  transitionDelay: circle.delay
                }}
              />
            ))}

            {/* Floating Top Corner Icon Badge */}
            {Icon && (
              <div
                className="glass-card-icon-badge"
                style={{ top: '28px', [isRTL ? 'left' : 'right']: '28px' }}
              >
                <Icon className="glass-card-icon" />
              </div>
            )}
          </div>

          {/* Layer 3: Title & Description Content */}
          <div className="glass-card-content">
            <h3 className="glass-card-title">{title}</h3>
            <p className="glass-card-desc">{description}</p>
          </div>

          {/* Layer 4: Optional Bottom Feature / Tag */}
          {badge && (
            <div className="glass-card-footer">
              <div className="glass-card-badge-pill">
                <span className="glass-card-badge-dot" />
                <span>{badge}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;
