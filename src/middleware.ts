import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only run auth checks on /admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    // If Supabase is not configured, don't crash middleware
    return response;
  }

  // Create server client to read session cookies from request
  const supabase = createServerClient(supabaseUrl, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // Get current authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoginPage = pathname === "/admin/login";

  // Case 1: Unauthenticated user trying to access protected /admin page
  if (!user) {
    if (isLoginPage) {
      return response;
    }
    const loginUrl = new URL("/admin/login", request.url);
    if (pathname !== "/admin") {
      loginUrl.searchParams.set("redirect", pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  // Case 2: Authenticated user - Verify user exists in the `admins` table
  let isAdmin = false;
  try {
    const adminDb = createAdminClient();
    const { data: adminRecord, error: adminError } = await adminDb
      .from("admins")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!adminError && adminRecord?.user_id) {
      isAdmin = true;
    }
  } catch (err) {
    console.error("Middleware admin check failed:", err);
    isAdmin = false;
  }

  // If user is not authorized in admins table
  if (!isAdmin) {
    if (isLoginPage) {
      return response;
    }
    const unauthorizedUrl = new URL("/admin/login", request.url);
    unauthorizedUrl.searchParams.set("error", "unauthorized");
    return NextResponse.redirect(unauthorizedUrl);
  }

  // Allow user to always view and submit credentials on /admin/login
  if (isLoginPage) {
    return response;
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
