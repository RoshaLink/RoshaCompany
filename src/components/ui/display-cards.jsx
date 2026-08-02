import React from "react";
import { cn } from "../../lib/utils";
import { Sparkles } from "lucide-react";

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-sky-500" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-sky-500",
  titleClassName = "text-sky-600",
}) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 border-slate-200 bg-white/95 backdrop-blur-md px-5 py-4 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-[#f8fafc] after:to-transparent after:content-[''] hover:border-sky-500 hover:bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] [&>*]:flex [&>*]:items-center [&>*]:gap-2.5",
        className
      )}
    >
      <div className="flex items-center space-x-2">
        <span className="relative inline-flex items-center justify-center rounded-full bg-sky-50 p-1.5 border border-sky-200">
          {icon}
        </span>
        <p className={cn("text-lg font-bold font-headline-md tracking-tight", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-sm text-slate-800 font-body-md">{description}</p>
      <p className="text-xs text-slate-500 font-label-md">{date}</p>
    </div>
  );
}

export default function DisplayCards({ cards }) {
  const defaultCards = [
    {
      className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-white/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className: "[grid-area:stack] translate-x-14 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-white/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className: "[grid-area:stack] translate-x-28 translate-y-20 hover:translate-y-10 border-sky-400/60",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}

export { DisplayCard };
