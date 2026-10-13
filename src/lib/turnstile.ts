/**
 * Verifies Cloudflare Turnstile token server-side.
 * Endpoint: https://challenges.cloudflare.com/turnstile/v0/siteverify
 */
export async function verifyTurnstileToken(
  token?: string,
  remoteIp?: string
): Promise<{ success: boolean; error?: string }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // In development without Turnstile configured, bypass verification
  if (!secretKey || secretKey === "your-turnstile-secret-key") {
    return { success: true };
  }

  // If client failed to provide token
  if (!token) {
    return { success: false, error: "Missing Turnstile verification token" };
  }

  // Cloudflare official test key for always-pass
  if (secretKey.startsWith("1x0000000000000000000000000000000")) {
    return { success: true };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (remoteIp) {
      formData.append("remoteip", remoteIp);
    }

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    );

    const data = await response.json();
    return {
      success: Boolean(data.success),
      error: data["error-codes"] ? data["error-codes"].join(", ") : undefined,
    };
  } catch (err) {
    console.error("Turnstile verification error:", err);
    // In case of network timeout to Cloudflare, fail gracefully or block
    return { success: false, error: "Verification service temporarily unavailable" };
  }
}
