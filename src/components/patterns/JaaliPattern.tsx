import React from "react";

export interface JaaliPatternProps {
  className?: string;
  opacity?: number;
  inverted?: boolean;
}

/**
 * JaaliPattern: Decorative architectural jaali lattice SVG texture.
 * Repeating 44x44 pattern with diamond, concentric circle, and center accent dot.
 * Rendered at low opacity (default 0.09), pure inline SVG, zero images, zero JS.
 */
export function JaaliPattern({
  className = "",
  opacity = 0.09,
  inverted = false,
}: JaaliPatternProps) {
  const strokeColor = inverted ? "#FAF6EF" : "#B8924A";
  return (
    <svg
      aria-hidden="true"
      width="100%"
      height="100%"
      className={`absolute inset-0 pointer-events-none select-none ${className}`}
      style={{ opacity }}
    >
      <defs>
        <pattern
          id="jaali"
          width="44"
          height="44"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M22 2 L42 22 L22 42 L2 22Z"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
          />
          <circle
            cx="22"
            cy="22"
            r="7"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
          />
          <circle cx="22" cy="22" r="1.5" fill={strokeColor} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#jaali)" />
    </svg>
  );
}
