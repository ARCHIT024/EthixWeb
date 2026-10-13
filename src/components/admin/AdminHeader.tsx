"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AdminHeaderProps {
  adminEmail?: string;
}

export function AdminHeader({ adminEmail }: AdminHeaderProps) {
  const router = useRouter();
  const [istTime, setIstTime] = useState<string>("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);
      setIstTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#14161c]/90 backdrop-blur-md border-b border-[#262a36] px-4 sm:px-6 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand & Area */}
        <div className="flex items-center gap-3">
          <Link href="/admin" className="flex items-center gap-2 group">
            <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-[#c59b4b] transition-colors">
              ETHIXWEB
            </span>
            <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-[#e51d25]/15 text-[#e51d25] border border-[#e51d25]/30 rounded-md">
              Operations
            </span>
          </Link>

          {/* Live IST Status Clock */}
          <div className="hidden md:flex items-center gap-2 pl-3 border-l border-[#262a36] text-xs text-[#9ca3af]">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[#f3f4f6]">{istTime ? `IST: ${istTime}` : "IST"}</span>
          </div>
        </div>

        {/* Right Actions: Public Site Link, Admin Profile, Logout */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1c1f27] border border-[#262a36] text-xs text-[#9ca3af] hover:text-white transition-colors"
          >
            <span>View Public Site</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>

          {adminEmail && (
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1c1f27] border border-[#262a36] text-xs text-[#9ca3af]">
              <span className="w-2 h-2 rounded-full bg-[#c59b4b]" />
              <span className="truncate max-w-[180px]">{adminEmail}</span>
            </div>
          )}

          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/50 border border-red-800/40 text-red-300 text-xs font-medium transition-colors cursor-pointer disabled:opacity-60"
            title="Sign out of console"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>{isLoggingOut ? "Signing out..." : "Logout"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
