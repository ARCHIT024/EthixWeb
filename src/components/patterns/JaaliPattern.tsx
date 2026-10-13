import React from "react";

export interface JaaliPatternProps {
  className?: string;
  opacity?: number;
  inverted?: boolean;
}

/**
 * JaaliPattern: Lightweight (<1KB) SVG geometric lattice pattern.
 * Uses fine 8-point geometric intersections inspired by traditional Indian architectural screens.
 * Designed to sit at low opacity (4-8%) in backgrounds without degrading WCAG AA text contrast.
 */
export function JaaliPattern({
  className = "",
  opacity = 0.05,
  inverted = false,
}: JaaliPatternProps) {
  const strokeColor = inverted ? "#FFFFFF" : "#0C0D10";

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="ethix-jaali-lattice"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            {/* Outer Diamond */}
            <path
              d="M20 0 L40 20 L20 40 L0 20 Z"
              fill="none"
              stroke={strokeColor}
              strokeWidth="0.8"
            />
            {/* Center Octagram Cross */}
            <path
              d="M20 8 L24 16 L32 20 L24 24 L20 32 L16 24 L8 20 L16 16 Z"
              fill="none"
              stroke={strokeColor}
              strokeWidth="0.8"
            />
            {/* Corner connection accents */}
            <path
              d="M0 0 L6 6 M40 0 L34 6 M40 40 L34 34 M0 40 L6 34"
              fill="none"
              stroke={strokeColor}
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ethix-jaali-lattice)" />
      </svg>
    </div>
  );
}
