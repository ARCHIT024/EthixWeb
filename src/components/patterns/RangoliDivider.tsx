import React from "react";

export interface RangoliDividerProps {
  className?: string;
  opacity?: number;
  inverted?: boolean;
}

/**
 * RangoliDivider: Lightweight (<1.5KB) SVG abstract geometric divider.
 * Built with symmetric dot-grid nodes and fine intersecting diagonals (kolam geometry).
 * Strictly non-cliché: purely mathematical symmetry for section transitions.
 */
export function RangoliDivider({
  className = "",
  opacity = 0.12,
  inverted = false,
}: RangoliDividerProps) {
  const strokeColor = inverted ? "#FFFFFF" : "#0C0D10";
  const dotColor = inverted ? "#C59B4B" : "#B31B21";

  return (
    <div
      className={`w-full flex items-center justify-center my-8 overflow-hidden select-none pointer-events-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <div className="flex items-center w-full max-w-4xl px-4">
        {/* Left hairline gradient */}
        <div
          className={`h-[1px] flex-1 ${
            inverted
              ? "bg-gradient-to-r from-transparent to-white/60"
              : "bg-gradient-to-r from-transparent to-dark-bg/60"
          }`}
        />

        {/* Central Abstract Kolam/Dot-Grid Geometry */}
        <svg
          width="160"
          height="32"
          viewBox="0 0 160 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-3 shrink-0"
        >
          {/* Symmetrical Connecting Looped Geometry */}
          <path
            d="M20 16 L40 6 L60 16 L80 6 L100 16 L120 6 L140 16 L120 26 L100 16 L80 26 L60 16 L40 26 Z"
            stroke={strokeColor}
            strokeWidth="0.8"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Inner Rhombus Center */}
          <path
            d="M72 16 L80 10 L88 16 L80 22 Z"
            stroke={dotColor}
            strokeWidth="1"
            fill="none"
          />

          {/* Precision Dot-Grid Coordinates */}
          <circle cx="20" cy="16" r="1.5" fill={strokeColor} />
          <circle cx="40" cy="6" r="1.5" fill={strokeColor} />
          <circle cx="40" cy="26" r="1.5" fill={strokeColor} />
          <circle cx="60" cy="16" r="1.5" fill={strokeColor} />
          <circle cx="80" cy="6" r="1.5" fill={strokeColor} />
          <circle cx="80" cy="16" r="2" fill={dotColor} />
          <circle cx="80" cy="26" r="1.5" fill={strokeColor} />
          <circle cx="100" cy="16" r="1.5" fill={strokeColor} />
          <circle cx="120" cy="6" r="1.5" fill={strokeColor} />
          <circle cx="120" cy="26" r="1.5" fill={strokeColor} />
          <circle cx="140" cy="16" r="1.5" fill={strokeColor} />
        </svg>

        {/* Right hairline gradient */}
        <div
          className={`h-[1px] flex-1 ${
            inverted
              ? "bg-gradient-to-l from-transparent to-white/60"
              : "bg-gradient-to-l from-transparent to-dark-bg/60"
          }`}
        />
      </div>
    </div>
  );
}
