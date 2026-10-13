import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export interface AdminUser {
  id: string;
  email: string;
  role: string;
}

/**
 * Validates that the current request has a valid Supabase session
 * AND that the user exists in the `public.admins` table.
 * Returns the admin user or null.
 */
export async function getAuthenticatedAdmin(): Promise<AdminUser | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return null;
    }

    const adminDb = createAdminClient();
    const { data: adminRecord, error: adminError } = await adminDb
      .from("admins")
      .select("user_id, role")
      .eq("user_id", user.id)
      .maybeSingle();

    if (adminError || !adminRecord) {
      return null;
    }

    return {
      id: user.id,
      email: user.email || "",
      role: adminRecord.role || "admin",
    };
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "digest" in err) {
      throw err;
    }
    console.error("Error in getAuthenticatedAdmin:", err);
    return null;
  }
}
