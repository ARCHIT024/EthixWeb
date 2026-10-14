"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { HUB, CITIES, CITY_IDS } from "@/lib/constellation";
import { STARS } from "@/lib/stars";

export function CityConstellation() {
  const [active, setActive] = useState<string | null>(null);

  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const autoIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastIdRef = useRef<string | null>("delhi");
  const hoveringRef = useRef<boolean>(false);

  const activate = useCallback((id: string) => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
    }
    lastIdRef.current = id;
    setActive(id);
    holdTimerRef.current = setTimeout(() => {
      setActive(null);
    }, 2800);
  }, []);

  const startAuto = useCallback(() => {
    if (autoIntervalRef.current) {
      clearInterval(autoIntervalRef.current);
    }
    if (typeof window !== "undefined") {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;
    }
    autoIntervalRef.current = setInterval(() => {
      if (hoveringRef.current) return;
      let nextId: string;
      do {
        nextId = CITY_IDS[Math.floor(Math.random() * CITY_IDS.length)];
      } while (nextId === lastIdRef.current);
      lastIdRef.current = nextId;
      if (holdTimerRef.current) {
        clearTimeout(holdTimerRef.current);
      }
      setActive(nextId);
    }, 2000);
  }, []);

  useEffect(() => {
    startAuto();

    return () => {
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
      if (autoIntervalRef.current) clearInterval(autoIntervalRef.current);
    };
  }, [startAuto]);

  return (
    <div
      id="wrap"
      className="relative w-full max-w-[520px] [aspect-ratio:520/640] mx-auto select-none"
      role="group"
      aria-label="Ethixweb serves businesses across India. Cities: Delhi, Jaipur, Lucknow, Ahmedabad, Kolkata, Mumbai, Pune, Bhubaneswar, Bengaluru, Chennai."
      onMouseEnter={() => {
        if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
          hoveringRef.current = true;
        }
      }}
      onMouseLeave={() => {
        hoveringRef.current = false;
        startAuto();
      }}
    >
      <svg
        viewBox="0 0 520 640"
        width="100%"
        height="100%"
        className="absolute inset-0 block overflow-visible"
      >
        <defs>
          <radialGradient id="g-gl" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#B3202A" stopOpacity="0.4" />
            <stop offset="1" stopColor="#B3202A" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Hub Glow Layer */}
        <g className="gp" aria-hidden="true">
          <circle cx={HUB.cx} cy={HUB.cy} r={120} fill="url(#g-gl)" />
        </g>

        {/* 2. Star-field: 90 Tiny Background Stars */}
        <g aria-hidden="true">
          {STARS.map((star, i) => (
            <circle
              key={i}
              cx={star.cx}
              cy={star.cy}
              r={star.r}
              fill="#fff"
              opacity={star.opacity}
            />
          ))}
        </g>

        {/* 3. Ten City Groups */}
        {CITIES.map((city) => {
          const isAct = active === city.id;
          const isRest = active === null && city.id === "delhi";
          const groupClass = `c ${isAct ? "on" : ""} ${isRest ? "rest" : ""}`.trim();

          return (
            <g
              key={city.id}
              className={groupClass}
              data-id={city.id}
              tabIndex={0}
              role="button"
              aria-label={city.label}
              onMouseEnter={() => activate(city.id)}
              onClick={() => activate(city.id)}
              onFocus={() => activate(city.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  activate(city.id);
                }
              }}
            >
              {/* Transparent hit path */}
              <path
                d={city.d}
                fill="none"
                stroke="transparent"
                strokeWidth={16}
                pointerEvents="stroke"
              />
              {/* Visible connecting line */}
              <path className="ln" d={city.d} />
              {/* Red travelling trail */}
              <path className="tr" d={city.d} pathLength={1} />
              {/* Transparent hit circle */}
              <circle
                className="hit-circle"
                cx={city.sx}
                cy={city.sy}
                r={14}
                fill="transparent"
              />
              {/* Arrival pulse ring */}
              <circle className="rg" cx={city.sx} cy={city.sy} r={5} />
              {/* Four-pointed city star */}
              <path
                className="nd"
                transform={`translate(${city.sx} ${city.sy})`}
                d={city.starD}
              />
              {/* City Label */}
              <text
                className="lb"
                x={city.tx}
                y={city.ty}
                textAnchor={city.anchor}
                letterSpacing={2}
              >
                {city.name}
              </text>
              {/* Travelling red pulse dot */}
              <circle
                className="dt"
                cx={0}
                cy={0}
                r={4}
                style={{ offsetPath: `path('${city.d}')` }}
              />
            </g>
          );
        })}

        {/* 4. Central Hub Circle */}
        <circle
          className={`hr ${active ? "lit" : ""}`}
          id="hub"
          cx={HUB.cx}
          cy={HUB.cy}
          r={HUB.r}
          fill="#14110F"
          stroke="#B8924A"
          strokeOpacity={0.8}
          strokeWidth={1.5}
        />

        {/* 5. Central Hub Mark: Geometric 'E' monogram */}
        <g
          transform={`translate(${HUB.cx.toFixed(1)} ${HUB.cy.toFixed(1)}) scale(0.27)`}
          fill="#B3202A"
          aria-hidden="true"
        >
          <rect x="-50" y="-52" width="20" height="104" rx="3" />
          <rect x="-50" y="-52" width="100" height="20" rx="3" />
          <rect x="-50" y="-10" width="76" height="20" rx="3" />
          <rect x="-50" y="32" width="100" height="20" rx="3" />
          <g fill="#E0414B">
            <rect x="-47" y="-52" width="94" height="3" rx="1.5" />
            <rect x="-47" y="-10" width="70" height="3" rx="1.5" />
            <rect x="-47" y="32" width="94" height="3" rx="1.5" />
          </g>
        </g>
      </svg>

      {/* Wordmark Pill under the SVG */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "89%",
          transform: "translateX(-50%)",
          background: "#000000",
          border: "1px solid rgba(255, 255, 255, 0.35)",
          borderRadius: "10px",
          padding: "7px 20px",
          fontFamily: "var(--font-display), 'Bricolage Grotesque', sans-serif",
          fontWeight: 800,
          fontSize: "20px",
          letterSpacing: "0.05em",
          color: "#ffffff",
          pointerEvents: "none",
        }}
      >
        ETHIXWEB
      </div>

      {/* Subtitle Caption under the SVG */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "96%",
          textAlign: "center",
          fontSize: "11px",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "#A89F90",
          fontWeight: 500,
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        Nakshatra network <span style={{ color: "#B8924A" }}>◆</span> across India
      </div>
    </div>
  );
}
