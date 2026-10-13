"use client";

import React, { useEffect, useState } from "react";

export function IstStatusBadge({ className = "" }: { className?: string }) {
  // Safe server-rendered initial state matching exact dimensions to avoid layout shift
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    function checkIstStatus() {
      try {
        const now = new Date();
        // Format to Asia/Kolkata timezone
        const istFormatter = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          minute: "numeric",
          hour12: false,
          weekday: "short",
        });

        const parts = istFormatter.formatToParts(now);
        const hourPart = parts.find((p) => p.type === "hour");
        const minutePart = parts.find((p) => p.type === "minute");
        const weekdayPart = parts.find((p) => p.type === "weekday");

        const hour = hourPart ? parseInt(hourPart.value, 10) : 10;
        const minute = minutePart ? parseInt(minutePart.value, 10) : 0;
        const weekday = weekdayPart?.value || "Mon";

        // Business hours: Mon-Sat 09:30 AM to 08:00 PM IST
        const isSunday = weekday === "Sun";
        const currentMinuteOfDay = hour * 60 + minute;
        const openMinute = 9 * 60 + 30; // 09:30
        const closeMinute = 20 * 60; // 20:00

        const online =
          !isSunday &&
          currentMinuteOfDay >= openMinute &&
          currentMinuteOfDay < closeMinute;

        setIsOnline(online);

        // Display current IST time
        const timeDisplayFormatter = new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        setTimeString(timeDisplayFormatter.format(now) + " IST");
      } catch {
        // Fallback default
        setIsOnline(true);
      }
    }

    checkIstStatus();
    // Update every minute
    const interval = setInterval(checkIstStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-light-border bg-white/90 px-2.5 py-1 text-[11px] font-medium text-dark-bg shadow-2xs backdrop-blur-xs transition-colors dark:border-dark-border dark:bg-dark-surface/90 dark:text-gray-200 ${className}`}
      title={timeString ? `Current time: ${timeString}` : "Indian Standard Time"}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        {isOnline ?? true ? (
          <>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 duration-1000" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </>
        ) : (
          <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
        )}
      </span>

      <span className="tabular-nums whitespace-nowrap">
        {isOnline === null ? (
          "IST Support (09:30–20:00)"
        ) : isOnline ? (
          <>
            <strong className="font-semibold text-emerald-800 dark:text-emerald-400">
              Online now
            </strong>
            <span className="text-gray-500 dark:text-gray-400"> · Replies &lt;15m</span>
          </>
        ) : (
          <>
            <strong className="font-semibold text-amber-800 dark:text-amber-400">
              Offline
            </strong>
            <span className="text-gray-500 dark:text-gray-400"> · Opens 9:30 AM IST</span>
          </>
        )}
      </span>
    </div>
  );
}
