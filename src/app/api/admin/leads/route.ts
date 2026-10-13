import { NextRequest, NextResponse, connection } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/auth-admin";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(req: NextRequest) {
  try {
    await connection();
    // 1. Verify admin authorization
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized. Admin session required." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim() || "";
    const status = searchParams.get("status")?.trim() || "all";
    const service = searchParams.get("service")?.trim() || "all";
    const sort = searchParams.get("sort")?.trim() || "date_desc";
    const isExport = searchParams.get("export") === "true";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = isExport ? 1000 : Math.max(1, Math.min(100, parseInt(searchParams.get("limit") || "10", 10)));
    const offset = (page - 1) * limit;

    const supabase = createAdminClient();

    // 2. Fetch Aggregated Status Counts across all records
    const { data: allStatusData, error: countError } = await supabase
      .from("leads")
      .select("status");

    if (countError) {
      console.error("Failed to query status counts:", countError);
    }

    const counts = {
      total: allStatusData?.length || 0,
      new: 0,
      contacted: 0,
      qualified: 0,
      won: 0,
      lost: 0,
    };

    if (allStatusData) {
      allStatusData.forEach((row) => {
        const s = row.status as keyof typeof counts;
        if (typeof counts[s] === "number") {
          counts[s]++;
        }
      });
    }

    // 3. Build Filtered Query
    let query = supabase.from("leads").select("*", { count: "exact" });

    // Status filter
    if (status !== "all") {
      query = query.eq("status", status);
    }

    // Service filter
    if (service !== "all") {
      query = query.eq("service", service);
    }

    // Search filter across name, business_name, email, and phone
    if (search) {
      const escaped = search.replace(/[%_]/g, "\\$&");
      query = query.or(
        `name.ilike.%${escaped}%,business_name.ilike.%${escaped}%,email.ilike.%${escaped}%,phone.ilike.%${escaped}%,city.ilike.%${escaped}%`
      );
    }

    // Sort order
    if (sort === "date_asc") {
      query = query.order("created_at", { ascending: true });
    } else {
      query = query.order("created_at", { ascending: false });
    }

    // Pagination
    query = query.range(offset, offset + limit - 1);

    const { data: leads, count, error: fetchError } = await query;

    if (fetchError) {
      console.error("Error fetching leads:", fetchError);
      return NextResponse.json(
        { ok: false, error: "Failed to fetch leads from database." },
        { status: 500 }
      );
    }

    const totalCount = count ?? (leads?.length || 0);
    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      ok: true,
      data: {
        leads: leads || [],
        totalCount,
        page,
        limit,
        totalPages,
        counts,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
