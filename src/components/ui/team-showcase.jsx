import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Quote } from "lucide-react";
import { cn } from "../../lib/utils";
import "./team-showcase.css";

const TeamShowcase = React.forwardRef(
  (
    {
      badge = null,
      title = "Get to Know Our Expert Team",
      description = "We are a dedicated squad of senior software architects, product designers, and strategic advisors passionate about crafting world-class digital experiences.",
      buttonText = "Schedule Strategy Call",
      onButtonClick,
      headerImage,
      members = [],
      className,
      isRTL = false,
      ...props
    },
    ref
  ) => {
    const [selectedMember, setSelectedMember] = useState(null);

    // Animation variants for container to stagger children
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.12,
        },
      },
    };

    // Animation variants for each card
    const cardVariants = {
      hidden: { y: 30, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 120,
          damping: 14,
        },
      },
    };

    return (
      <section
        ref={ref}
        className={cn("team-showcase-section", className)}
        {...props}
      >
        <div className="team-showcase-container">
          
          {/* 2-Column Header Section */}
          <div className="team-showcase-header-grid">
            
            {/* Left Column: Text & CTA */}
            <motion.div
              className="team-showcase-header-left"
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="team-showcase-title">
                {title}
              </h2>
              
              {description && (
                <p className="team-showcase-desc">
                  {description}
                </p>
              )}

              {buttonText && (
                <div className="team-showcase-cta-wrap">
                  <button
                    type="button"
                    onClick={onButtonClick}
                    className="team-showcase-cta"
                  >
                    <span>{buttonText}</span>
                    <ArrowRight className="w-4 h-4 team-cta-arrow" />
                  </button>
                </div>
              )}
            </motion.div>

            {/* Right Column: Custom Component or Image */}
            {headerImage && (
              <motion.div
                className="team-showcase-header-right"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, ease: "easeOut", delay: 0.15 }}
              >
                {typeof headerImage === 'string' ? (
                  <div className="team-header-image-frame">
                    <div className="team-header-glow" />
                    <motion.img
                      src={headerImage}
                      alt="Team Showcase"
                      className="team-header-rosha-img"
                      whileHover={{ y: -6, scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                      loading="lazy"
                    />
                  </div>
                ) : (
                  headerImage
                )}
              </motion.div>
            )}

          </div>

          {/* Members Showcase Row */}
          <motion.div
            className="team-showcase-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <AnimatePresence>
              {members.map((member, index) => {
                const isSelected = selectedMember?.name === member.name;
                return (
                  <motion.div
                    key={member.name || index}
                    className="team-member-card"
                    variants={cardVariants}
                    whileHover={{ y: -8, zIndex: 40 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (member.quote) {
                        setSelectedMember(isSelected ? null : member);
                      }
                    }}
                    style={{ zIndex: members.length - index }}
                  >
                    <div
                      className={cn(
                        "team-member-arch",
                        member.themeClass || "theme-arch-sky"
                      )}
                    >
                      {/* Member Info Text */}
                      <div className="team-member-info">
                        <h3 className="team-member-name">{member.name}</h3>
                        <p className="team-member-role">{member.role}</p>
                      </div>

                      {/* Member Photo */}
                      {member.imageSrc && (
                        <img
                          src={member.imageSrc}
                          alt={member.name}
                          className="team-member-img"
                          loading="lazy"
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Selected Member Quote Popover / Box */}
          <AnimatePresence>
            {selectedMember && selectedMember.quote && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="team-member-quote-box"
              >
                <div className="flex items-start gap-3">
                  <Quote className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="team-member-quote-text">
                      "{selectedMember.quote}"
                    </p>
                    <p className="team-member-quote-author">
                      — {selectedMember.name}, {selectedMember.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>
    );
  }
);

TeamShowcase.displayName = "TeamShowcase";

export { TeamShowcase };
