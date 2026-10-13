import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { hashIp, validateIndianPhone, validateEmail } from "@/lib/security";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      business_name,
      phone,
      email,
      city,
      service,
      budget_range,
      message,
      preferred_contact = "whatsapp",
      turnstile_token,
      source = "contact_page",
    } = body;

    // 1. Validate required fields
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !validateEmail(email)) {
      return NextResponse.json(
        { error: "A valid email address is required" },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string") {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    const phoneValidation = validateIndianPhone(phone);
    if (!phoneValidation.isValid) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit Indian phone number (+91)" },
        { status: 400 }
      );
    }

    if (!service || typeof service !== "string") {
      return NextResponse.json(
        { error: "Service selection is required" },
        { status: 400 }
      );
    }

    // 2. Client Diagnostics & IP Hashing (Zero Raw PII Storage)
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";
    const ipHash = hashIp(clientIp);
    const userAgent = req.headers.get("user-agent") || "Unknown";

    // 3. Verify Cloudflare Turnstile Token
    const turnstileResult = await verifyTurnstileToken(turnstile_token, clientIp);
    if (!turnstileResult.success) {
      return NextResponse.json(
        { error: "Bot verification failed. Please refresh and try again." },
        { status: 403 }
      );
    }

    // 4. Secure Server-Side Insertion using Service Role Client
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("leads")
      .insert({
        name: name.trim(),
        business_name: business_name?.trim() || null,
        phone: phoneValidation.normalized,
        email: email.trim().toLowerCase(),
        city: city?.trim() || null,
        service: service.trim(),
        budget_range: budget_range?.trim() || null,
        message: message?.trim() || null,
        preferred_contact: preferred_contact || "whatsapp",
        status: "new",
        ip_hash: ipHash,
        user_agent: userAgent,
        source: source || "website",
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase lead insertion error:", error);
      return NextResponse.json(
        { error: "Failed to record inquiry. Please try again or message via WhatsApp." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      leadId: data.id,
      message: "Inquiry received. A senior specialist will reply within 15 minutes during IST hours.",
    });
  } catch (err) {
    console.error("API /api/leads exception:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please contact us via WhatsApp." },
      { status: 500 }
    );
  }
}
