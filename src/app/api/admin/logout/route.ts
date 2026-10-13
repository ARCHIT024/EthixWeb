import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch (err: unknown) {
    console.error("Supabase signOut error:", err);
  }

  const response = NextResponse.json({ ok: true, message: "Logged out successfully" });

  try {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();

    // Expire every auth and session-related cookie explicitly on the response
    for (const cookie of allCookies) {
      if (
        cookie.name.includes("sb-") ||
        cookie.name.includes("auth") ||
        cookie.name.includes("token") ||
        cookie.name.includes("admin")
      ) {
        response.cookies.set(cookie.name, "", {
          path: "/",
          expires: new Date(0),
          maxAge: 0,
        });
      }
    }
  } catch (err: unknown) {
    console.error("Error clearing cookies on logout:", err);
  }

  return response;
}
