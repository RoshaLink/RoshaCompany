import * as React from "react";
import { cn } from "../../lib/utils";

export const MenuBar = React.forwardRef(
  ({ className, items, activeItem, onItemClick, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn(
          "p-1.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200 shadow-md relative overflow-hidden group/nav",
          className
        )}
        {...props}
      >
        <div
          className="absolute -inset-2 bg-gradient-radial from-transparent via-sky-400/20 via-30% via-blue-400/20 via-60% via-indigo-400/20 via-90% to-transparent rounded-3xl z-0 pointer-events-none opacity-0 group-hover/nav:opacity-100 transition-opacity duration-500 ease-out"
        />
        <ul className="flex items-center gap-1.5 relative z-10 rtl:flex-row-reverse">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeItem || item.label.toLowerCase() === activeItem?.toLowerCase();

            return (
              <li key={item.label} className="relative">
                <button
                  onClick={() => onItemClick?.(item.id || item.label)}
                  className="flex items-center justify-center w-full min-h-11 cursor-pointer"
                >
                  <div
                    className="block rounded-xl overflow-visible group relative"
                    style={{ perspective: "600px" }}
                  >
                    {/* Radial glow backdrop on active / hover */}
                    <div
                      className={cn(
                        "absolute inset-0 z-0 pointer-events-none transition-all duration-500 ease-out rounded-[14px]",
                        isActive ? "opacity-100 scale-100" : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-105"
                      )}
                      style={{
                        background: item.gradient,
                      }}
                    />

                    {/* Front Face */}
                    <div
                      className={cn(
                        "flex items-center gap-2 px-3.5 py-2 relative z-10 bg-transparent rounded-xl font-label-md text-xs font-semibold rtl:flex-row-reverse transition-all duration-300 ease-out",
                        isActive
                          ? "text-slate-900 font-bold"
                          : "text-slate-600 group-hover:text-slate-900 group-hover:-rotate-x-90 group-hover:opacity-0"
                      )}
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
                    </div>

                    {/* Back 3D Flipped Face */}
                    <div
                      className={cn(
                        "flex items-center gap-2 px-3.5 py-2 absolute inset-0 z-10 bg-transparent rounded-xl font-label-md text-xs font-semibold rtl:flex-row-reverse transition-all duration-300 ease-out rotate-x-90 opacity-0",
                        isActive
                          ? "hidden"
                          : "text-slate-900 group-hover:rotate-x-0 group-hover:opacity-100"
                      )}
                      style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: "center top",
                      }}
                    >
                      <span
                        className={cn(
                          "transition-colors duration-300",
                          item.iconColor
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>{item.label}</span>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
);

MenuBar.displayName = "MenuBar";
export default MenuBar;

