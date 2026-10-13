import { NextRequest, NextResponse } from "next/server";
import { enquirySchema, quickEnquirySchema } from "@/lib/validations/enquiry";
import { createAdminClient } from "@/lib/supabase/admin";
import { hashIp, validateIndianPhone } from "@/lib/security";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { checkRateLimit, checkTimeToSubmit } from "@/lib/rate-limit";

// Consistent response envelope helper
function jsonResponse(
  status: number,
  body: {
    ok: boolean;
    error?: string;
    fieldErrors?: Record<string, string[]>;
    data?: { id: string; message: string };
  }
) {
  return NextResponse.json(body, { status });
}

export async function POST(req: NextRequest) {
  try {
    // 1. Parse JSON safely
    let rawBody: unknown;
    try {
      rawBody = await req.json();
    } catch {
      return jsonResponse(400, {
        ok: false,
        error: "Malformed request payload. Expected JSON body.",
      });
    }

    // 2. Client Diagnostics & IP Hashing (No Raw PII Storage)
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";
    const ipHash = hashIp(clientIp);
    const userAgent = req.headers.get("user-agent") || "Unknown";

    // 3. Per-IP Rate Limiting Check (Max 5 submissions / 10 mins per IP hash)
    const rateLimit = checkRateLimit(ipHash);
    if (!rateLimit.allowed) {
      return jsonResponse(429, {
        ok: false,
        error: `Too many submissions from this connection. Please try again in ${rateLimit.resetInSeconds} seconds.`,
      });
    }

    // 4. Honeypot Spam Check (Hidden field must be completely empty)
    const bodyObj = rawBody as Record<string, unknown>;
    if (bodyObj?.honeypot && String(bodyObj.honeypot).trim().length > 0) {
      return jsonResponse(400, {
        ok: false,
        error: "Spam detection triggered (honeypot field populated).",
      });
    }

    // 5. Minimum Time-to-Submit Check (Sub-second bot prevention)
    const timeCheck = checkTimeToSubmit(
      typeof bodyObj?.form_loaded_at === "number" ? bodyObj.form_loaded_at : undefined,
      2.0 // Minimum 2.0 seconds
    );
    if (!timeCheck.valid) {
      return jsonResponse(400, {
        ok: false,
        error: "Submission completed suspiciously fast. Please take a moment to review your inquiry.",
      });
    }

    const isHero = bodyObj?.source === "hero";

    // 6. Zod Validation (Quick Hero Schema or Full Contact Schema)
    if (isHero) {
      const quickParse = quickEnquirySchema.safeParse(rawBody);
      if (!quickParse.success) {
        const fieldErrors: Record<string, string[]> = {};
        for (const issue of quickParse.error.issues) {
          const fieldName = issue.path[0]?.toString() || "form";
          if (!fieldErrors[fieldName]) {
            fieldErrors[fieldName] = [];
          }
          fieldErrors[fieldName].push(issue.message);
        }

        return jsonResponse(422, {
          ok: false,
          error: "Validation failed. Please correct the highlighted fields.",
          fieldErrors,
        });
      }

      const validHero = quickParse.data;

      // Verify Cloudflare Turnstile Anti-Bot Token Server-Side
      const turnstileResult = await verifyTurnstileToken(
        validHero.turnstile_token,
        clientIp
      );
      if (!turnstileResult.success) {
        return jsonResponse(400, {
          ok: false,
          error: "Bot challenge verification failed. Please refresh and try again.",
        });
      }

      const phoneNormalized = validateIndianPhone(validHero.phone).normalized;
      const cleanDigits = phoneNormalized.replace(/\D/g, "");
      const supabase = createAdminClient();

      const { data, error } = await supabase
        .from("leads")
        .insert({
          name: validHero.name,
          business_name: null,
          phone: phoneNormalized,
          email: `${cleanDigits}@quicklead.ethixweb.com`,
          city: null,
          service: "Websites & High-Speed Portals",
          budget_range: validHero.budget_range,
          message: `Hero quick callback requested. Monthly budget: ${validHero.budget_range}. Preferred contact: WhatsApp / Call.`,
          preferred_contact: "whatsapp",
          status: "new",
          ip_hash: ipHash,
          user_agent: userAgent,
          source: "hero",
        })
        .select("id")
        .single();

      if (error) {
        console.error("Supabase enquiry insertion error:", error);
        return jsonResponse(500, {
          ok: false,
          error: "Failed to record inquiry due to a temporary database issue. Please message us directly via WhatsApp.",
        });
      }

      return jsonResponse(201, {
        ok: true,
        data: {
          id: data.id,
          message: "Thanks, we'll reach out shortly.",
        },
      });
    }

    const parseResult = enquirySchema.safeParse(rawBody);
    if (!parseResult.success) {
      const fieldErrors: Record<string, string[]> = {};
      for (const issue of parseResult.error.issues) {
        const fieldName = issue.path[0]?.toString() || "form";
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = [];
        }
        fieldErrors[fieldName].push(issue.message);
      }

      return jsonResponse(422, {
        ok: false,
        error: "Validation failed. Please correct the highlighted fields.",
        fieldErrors,
      });
    }

    const validData = parseResult.data;

    // 7. Verify Cloudflare Turnstile Anti-Bot Token Server-Side
    const turnstileResult = await verifyTurnstileToken(
      validData.turnstile_token,
      clientIp
    );
    if (!turnstileResult.success) {
      return jsonResponse(400, {
        ok: false,
        error: "Bot challenge verification failed. Please refresh and try again.",
      });
    }

    // 8. Normalize Indian Phone (+91 format)
    const phoneNormalized = validateIndianPhone(validData.phone).normalized;

    // 9. Insert into Supabase Leads Table via Server-Only Service Role Client
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("leads")
      .insert({
        name: validData.name,
        business_name: validData.business_name || null,
        phone: phoneNormalized,
        email: validData.email.toLowerCase(),
        city: validData.city || null,
        service: validData.service,
        budget_range: validData.budget_range,
        message: validData.message,
        preferred_contact: validData.preferred_contact,
        status: "new",
        ip_hash: ipHash,
        user_agent: userAgent,
        source: validData.source || "contact_page",
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase enquiry insertion error:", error);
      // Clean error without leaking internal Postgres schema details
      return jsonResponse(500, {
        ok: false,
        error: "Failed to record inquiry due to a temporary database issue. Please message us directly via WhatsApp.",
      });
    }

    return jsonResponse(201, {
      ok: true,
      data: {
        id: data.id,
        message: "Your project scope has been securely received. Our technical team replies within 15 minutes during IST hours.",
      },
    });
  } catch (err) {
    console.error("Unhandled error in POST /api/enquiries:", err);
    return jsonResponse(500, {
      ok: false,
      error: "An unexpected server error occurred. Please try reaching out directly via WhatsApp.",
    });
  }
}
