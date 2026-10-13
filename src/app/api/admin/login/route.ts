import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, error: "Please enter both email and password." },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // 1. Authenticate with Supabase Auth
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

    if (authError || !authData.user) {
      return NextResponse.json(
        {
          ok: false,
          error:
            authError?.message ||
            "Invalid email or password. Please check your credentials.",
        },
        { status: 401 }
      );
    }

    // 2. Authorize against public.admins table
    const adminDb = createAdminClient();
    const { data: adminRecord, error: adminCheckError } = await adminDb
      .from("admins")
      .select("user_id, role")
      .eq("user_id", authData.user.id)
      .maybeSingle();

    if (adminCheckError || !adminRecord) {
      // Sign out unauthorized user immediately
      await supabase.auth.signOut();
      return NextResponse.json(
        {
          ok: false,
          error:
            "Access Denied: Your account is authenticated but not registered in the administrators table.",
        },
        { status: 403 }
      );
    }

    const response = NextResponse.json({
      ok: true,
      user: {
        id: authData.user.id,
        email: authData.user.email,
        role: adminRecord.role || "admin",
      },
    });

    // Mirror session cookies directly onto the response object without multi-month persistence
    const cookieStore = await cookies();
    cookieStore.getAll().forEach((c) => {
      if (c.name.includes("sb-") || c.name.includes("auth")) {
        response.cookies.set(c.name, c.value, {
          path: "/",
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          // No maxAge or expires -> true browser session cookie
        });
      }
    });

    return response;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Authentication error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
