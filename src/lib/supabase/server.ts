import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { connection } from "next/server";

/**
 * Creates a Supabase client configured for Server Components,
 * Route Handlers, and Server Actions with automatic cookie handling.
 */
export async function createClient() {
  await connection();
  const cookieStore = await cookies();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    throw new Error(
      "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be defined."
    );
  }

  return createServerClient(supabaseUrl, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            // Strip persistent maxAge/expires so cookies act as browser session cookies
            // This ensures sessions expire when the browser window/session terminates
            const sessionOptions = {
              ...options,
              maxAge: undefined,
              expires: undefined,
            };
            cookieStore.set(name, value, sessionOptions);
          });
        } catch {
          // The `setAll` method was called from a Server Component.
        }
      },
    },
  });
}
