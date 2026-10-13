import React from "react";

/**
 * PatternDefs: Single shared inline SVG defs element rendered once in RootLayout.
 * Contains all 6 approved Indian architectural & textile patterns in brass line style (#B8924A).
 * Positioned absolute with width 0 and height 0 without display:none so SVG references resolve in all browsers.
 */
export function PatternDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        {/* 1. Jaali: Geometric diamond, concentric circle, and center dot (Hero & Final CTA) */}
        <pattern id="jaali" width="44" height="44" patternUnits="userSpaceOnUse">
          <path
            d="M22 2 L42 22 L22 42 L2 22Z"
            fill="none"
            stroke="#B8924A"
            strokeWidth="1"
          />
          <circle cx="22" cy="22" r="7" fill="none" stroke="#B8924A" strokeWidth="1" />
          <circle cx="22" cy="22" r="1.5" fill="#B8924A" />
        </pattern>

        {/* 2. Kolam: Interconnected loop curves and threshold dots (Services) */}
        <pattern id="kolam" width="48" height="48" patternUnits="userSpaceOnUse">
          <path
            d="M0 24 Q12 8 24 24 T48 24"
            fill="none"
            stroke="#B8924A"
            strokeWidth="1"
          />
          <circle cx="12" cy="40" r="1.8" fill="#B8924A" />
          <circle cx="36" cy="8" r="1.8" fill="#B8924A" />
        </pattern>

        {/* 3. Bandhani: Five-point tie-dye droplet clusters (Process) */}
        <pattern id="bandhani" width="34" height="34" patternUnits="userSpaceOnUse">
          <circle cx="17" cy="17" r="2.2" fill="#B8924A" />
          <circle cx="11" cy="17" r="1.4" fill="#B8924A" />
          <circle cx="23" cy="17" r="1.4" fill="#B8924A" />
          <circle cx="17" cy="11" r="1.4" fill="#B8924A" />
          <circle cx="17" cy="23" r="1.4" fill="#B8924A" />
        </pattern>

        {/* 4. Stepwell: Concentric architectural terraces (Featured Work) */}
        <pattern id="stepwell" width="60" height="60" patternUnits="userSpaceOnUse">
          <rect x="4" y="4" width="52" height="52" fill="none" stroke="#B8924A" strokeWidth="1" />
          <rect x="15" y="15" width="30" height="30" fill="none" stroke="#B8924A" strokeWidth="1" />
          <rect x="25" y="25" width="10" height="10" fill="none" stroke="#B8924A" strokeWidth="1" />
        </pattern>

        {/* 5. Butta: Traditional floral woodblock motif (Why Ethixweb) */}
        <pattern id="butta" width="64" height="64" patternUnits="userSpaceOnUse">
          <g transform="translate(32 32)" fill="none" stroke="#B8924A" strokeWidth="1">
            <ellipse rx="3.5" ry="11" />
            <ellipse rx="3.5" ry="11" transform="rotate(90)" />
            <circle r="1.6" fill="#B8924A" />
          </g>
        </pattern>

        {/* 6. Ikat: Chevron wave weave pattern (Sectors) */}
        <pattern id="ikat" width="40" height="28" patternUnits="userSpaceOnUse">
          <path
            d="M0 14 L10 4 L20 14 L30 24 L40 14"
            fill="none"
            stroke="#B8924A"
            strokeWidth="1"
          />
        </pattern>
      </defs>
    </svg>
  );
}
