"use client";

import React, { useState, useEffect } from "react";

/**
 * Computes whether current moment is within IST business hours:
 * Mon-Sat 10:00 - 19:00 IST (Indian Standard Time, UTC+5:30)
 */
function checkIstBusinessHours(): boolean {
  try {
    const now = new Date();
    // Convert to IST timestamp
    const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
    const istDate = new Date(utcMs + 330 * 60000);
    const day = istDate.getDay(); // 0 = Sunday, 1..6 = Mon-Sat
    const minutesOfDay = istDate.getHours() * 60 + istDate.getMinutes();

    const isWorkDay = day >= 1 && day <= 6;
    const isWorkHours = minutesOfDay >= 600 && minutesOfDay < 1140; // 10:00 to 19:00

    return isWorkDay && isWorkHours;
  } catch {
    return false;
  }
}

export function AvailabilityBadge() {
  // Server-render fallback as closed to prevent layout shift and hydration mismatches
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    void Promise.resolve().then(() => {
      if (isMounted) {
        setIsOpen(checkIstBusinessHours());
      }
    });

    const interval = setInterval(() => {
      if (isMounted) {
        setIsOpen(checkIstBusinessHours());
      }
    }, 60000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="inline-flex items-center gap-2 border border-white/20 rounded-full px-3.5 py-1.5 text-[14px] leading-none text-white select-none min-h-[32px]"
      aria-label={
        isOpen
          ? "Online now, replies within the hour"
          : "Offline, opens 10:00 AM IST"
      }
    >
      <span
        className={`w-2 h-2 rounded-full shrink-0 transition-colors ${
          isOpen ? "bg-[#3DBE7A]" : "bg-[#E0A030]"
        }`}
        aria-hidden="true"
      />
      <span>
        {isOpen
          ? "Online now · replies within the hour (IST)"
          : "Offline · Opens 10:00 AM IST · we reply first thing"}
      </span>
    </div>
  );
}
