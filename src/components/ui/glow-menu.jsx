import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
    },
  },
};

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const sharedTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  duration: 0.5,
};

export const MenuBar = React.forwardRef(
  ({ className, items, activeItem, onItemClick, ...props }, ref) => {
    return (
      <motion.nav
        ref={ref}
        className={cn(
          "p-1.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200 shadow-md relative overflow-hidden",
          className
        )}
        initial="initial"
        whileHover="hover"
        {...props}
      >
        <motion.div
          className="absolute -inset-2 bg-gradient-radial from-transparent via-sky-400/20 via-30% via-blue-400/20 via-60% via-indigo-400/20 via-90% to-transparent rounded-3xl z-0 pointer-events-none"
          variants={navGlowVariants}
        />
        <ul className="flex items-center gap-1.5 relative z-10 rtl:flex-row-reverse">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeItem || item.label.toLowerCase() === activeItem?.toLowerCase();

            return (
              <motion.li key={item.label} className="relative">
                <button
                  onClick={() => onItemClick?.(item.id || item.label)}
                  // min-h-11 (44px): the visible pill is ~32px tall (py-2 +
                  // text-xs), under the 44px touch-target minimum. flex +
                  // items-center grows the invisible hit area to 44px and
                  // centers the pill inside it without changing how it looks
                  // -- the 3D hover/flip effect below is unaffected, since it
                  // sizes itself off the pill's own content, not this button.
                  className="flex items-center justify-center w-full min-h-11 cursor-pointer"
                >
                  <motion.div
                    className="block rounded-xl overflow-visible group relative"
                    style={{ perspective: "600px" }}
                    whileHover="hover"
                    initial="initial"
                  >
                    <motion.div
                      className="absolute inset-0 z-0 pointer-events-none"
                      variants={glowVariants}
                      animate={isActive ? "hover" : "initial"}
                      style={{
                        background: item.gradient,
                        opacity: isActive ? 1 : 0,
                        borderRadius: "14px",
                      }}
                    />
                    <motion.div
                      className={cn(
                        "flex items-center gap-2 px-3.5 py-2 relative z-10 bg-transparent transition-colors rounded-xl font-label-md text-xs font-semibold rtl:flex-row-reverse",
                        isActive
                          ? "text-slate-900 font-bold"
                          : "text-slate-600 group-hover:text-slate-900"
                      )}
                      variants={itemVariants}
                      transition={sharedTransition}
                      style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: "center bottom",
                      }}
                    >
                      <span
                        className={cn(
                          "transition-colors duration-300",
                          isActive ? item.iconColor : "text-slate-500",
                          `group-hover:${item.iconColor}`
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>{item.label}</span>
                    </motion.div>
                    <motion.div
                      className={cn(
                        "flex items-center gap-2 px-3.5 py-2 absolute inset-0 z-10 bg-transparent transition-colors rounded-xl font-label-md text-xs font-semibold rtl:flex-row-reverse",
                        isActive
                          ? "text-slate-900 font-bold"
                          : "text-slate-600 group-hover:text-slate-900"
                      )}
                      variants={backVariants}
                      transition={sharedTransition}
                      style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: "center top",
                        rotateX: 90,
                      }}
                    >
                      <span
                        className={cn(
                          "transition-colors duration-300",
                          isActive ? item.iconColor : "text-slate-500",
                          `group-hover:${item.iconColor}`
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>{item.label}</span>
                    </motion.div>
                  </motion.div>
                </button>
              </motion.li>
            );
          })}
        </ul>
      </motion.nav>
    );
  }
);

MenuBar.displayName = "MenuBar";
export default MenuBar;
