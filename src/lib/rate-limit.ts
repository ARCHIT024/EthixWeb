interface RateLimitRecord {
  count: number;
  resetAt: number;
}

// In-memory sliding window rate limiter keyed by hashed IP
const rateLimitMap = new Map<string, RateLimitRecord>();

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5; // Max 5 submissions per 10 minutes per IP hash

/**
 * Checks if the hashed IP has exceeded the allowed rate limit.
 */
export function checkRateLimit(ipHash: string): {
  allowed: boolean;
  remaining: number;
  resetInSeconds: number;
} {
  const now = Date.now();

  // Periodic cleanup of stale records
  if (rateLimitMap.size > 1000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetAt) {
        rateLimitMap.delete(key);
      }
    }
  }

  const existing = rateLimitMap.get(ipHash);

  if (!existing || now > existing.resetAt) {
    rateLimitMap.set(ipHash, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });
    return {
      allowed: true,
      remaining: MAX_REQUESTS - 1,
      resetInSeconds: Math.ceil(WINDOW_MS / 1000),
    };
  }

  if (existing.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
      resetInSeconds: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count += 1;
  return {
    allowed: true,
    remaining: MAX_REQUESTS - existing.count,
    resetInSeconds: Math.ceil((existing.resetAt - now) / 1000),
  };
}

/**
 * Minimum time-to-submit verification.
 * Real humans take at least 2.5 seconds to review, fill, and submit a 6-field form.
 * Automated scripts typically post within 100-800ms.
 */
export function checkTimeToSubmit(
  formLoadedAt?: number,
  minSeconds = 2.0
): { valid: boolean; durationSeconds: number } {
  if (!formLoadedAt || typeof formLoadedAt !== "number") {
    // If client did not send formLoadedAt, allow but note duration as 0
    return { valid: true, durationSeconds: 0 };
  }

  const durationMs = Date.now() - formLoadedAt;
  const durationSeconds = durationMs / 1000;

  // Bot check: sub-second or negative timestamp
  if (durationSeconds < minSeconds || durationMs < 0) {
    return { valid: false, durationSeconds };
  }

  return { valid: true, durationSeconds };
}
