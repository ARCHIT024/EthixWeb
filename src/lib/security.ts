import crypto from "crypto";

/**
 * Generates a SHA-256 hash of the client's IP with a server salt.
 * Ensures zero storage of raw PII while allowing rate limiting and duplicate abuse detection.
 */
export function hashIp(ip: string): string {
  const salt = process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 16) || "ethixweb-secure-salt";
  return crypto.createHash("sha256").update(`${ip}:${salt}`).digest("hex");
}

/**
 * Validates and normalizes Indian mobile phone numbers.
 * Valid Indian mobile format: 10 digits starting with 6, 7, 8, or 9.
 * Accepts inputs like: "+91 9876543210", "9876543210", "09876543210".
 */
export function validateIndianPhone(input: string): { isValid: boolean; normalized: string } {
  // Strip all non-digit characters
  const cleanDigits = input.replace(/\D/g, "");

  let core10Digits = "";

  if (cleanDigits.length === 10 && /^[6-9]\d{9}$/.test(cleanDigits)) {
    core10Digits = cleanDigits;
  } else if (cleanDigits.length === 11 && cleanDigits.startsWith("0") && /^[6-9]\d{9}$/.test(cleanDigits.slice(1))) {
    core10Digits = cleanDigits.slice(1);
  } else if (cleanDigits.length === 12 && cleanDigits.startsWith("91") && /^[6-9]\d{9}$/.test(cleanDigits.slice(2))) {
    core10Digits = cleanDigits.slice(2);
  }

  if (core10Digits) {
    return {
      isValid: true,
      normalized: `+91 ${core10Digits.slice(0, 5)} ${core10Digits.slice(5)}`,
    };
  }

  return {
    isValid: false,
    normalized: input.trim(),
  };
}

/**
 * Validates standard email address syntax.
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}
