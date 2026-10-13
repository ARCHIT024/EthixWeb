"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get("redirect") || "/admin";
  const errorParam = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (errorParam === "unauthorized") {
      setErrorMessage(
        "Access Denied: Your account is authenticated in Supabase but lacks administrator permissions in the `admins` table."
      );
    }
  }, [errorParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setErrorMessage(data.error || "Authentication failed. Please check credentials.");
        setIsLoading(false);
        return;
      }

      // Successful login - hard navigation ensures fresh cookie transmission
      window.location.href = redirectParam || "/admin";
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Network error. Please try again.";
      setErrorMessage(msg);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-[#14161c] border border-[#262a36] rounded-2xl shadow-2xl shadow-black/80 relative overflow-hidden">
      {/* Top Accent Gradient Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#e51d25] via-[#c59b4b] to-[#e51d25]" />

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1c1f27] border border-[#262a36] text-[#c59b4b] mb-4 shadow-inner">
          <svg
            className="w-7 h-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-lg font-bold tracking-tight text-white">ETHIXWEB</span>
          <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-[#c59b4b]/15 text-[#c59b4b] border border-[#c59b4b]/30 rounded-md">
            Console
          </span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Admin Sign In</h1>
        <p className="text-xs text-[#9ca3af] mt-1">
          Protected pipeline. Authorized operations personnel only.
        </p>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-red-200 text-xs leading-relaxed flex items-start gap-3 animate-in fade-in duration-200"
        >
          <svg
            className="w-5 h-5 text-red-400 shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div>
            <strong className="font-semibold block text-red-100 mb-0.5">Authentication Alert</strong>
            {errorMessage}
          </div>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-medium uppercase tracking-wider text-[#9ca3af] mb-1.5"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            placeholder="admin@ethixweb.com"
            className="w-full px-4 py-3 rounded-xl bg-[#0c0d10] border border-[#262a36] text-white placeholder-[#525866] text-sm focus:outline-none focus:ring-2 focus:ring-[#e51d25] focus:border-transparent transition-all disabled:opacity-60"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-xs font-medium uppercase tracking-wider text-[#9ca3af] mb-1.5"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            placeholder="••••••••••••"
            className="w-full px-4 py-3 rounded-xl bg-[#0c0d10] border border-[#262a36] text-white placeholder-[#525866] text-sm focus:outline-none focus:ring-2 focus:ring-[#e51d25] focus:border-transparent transition-all disabled:opacity-60"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 py-3 px-4 rounded-xl bg-[#e51d25] hover:bg-[#cc1820] active:scale-[0.99] text-white font-medium text-sm tracking-wide transition-all shadow-lg shadow-red-950/40 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Verifying credentials...</span>
            </>
          ) : (
            <span>Sign In to Console</span>
          )}
        </button>
      </form>

      {/* Return to website */}
      <div className="mt-8 pt-6 border-t border-[#262a36]/60 text-center">
        <Link
          href="/"
          className="text-xs text-[#9ca3af] hover:text-[#c59b4b] transition-colors inline-flex items-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Return to ethixweb.com</span>
        </Link>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-radial from-[#14161c] to-[#0c0d10]">
      <Suspense
        fallback={
          <div className="p-8 text-center text-sm text-[#9ca3af]">
            Loading login portal...
          </div>
        }
      >
        <LoginFormContent />
      </Suspense>
    </div>
  );
}
