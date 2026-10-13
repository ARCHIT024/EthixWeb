import type { Lead } from "@/components/admin/LeadDetailDrawer";

/**
 * Escapes a single CSV value according to RFC 4180 standards:
 * - Wraps in double quotes if it contains commas, double quotes, or newlines.
 * - Doubles any internal double quotes.
 */
function escapeCsvValue(val: unknown): string {
  if (val === null || val === undefined) return '""';
  const str = String(val).trim();
  const escaped = str.replace(/"/g, '""');
  return `"${escaped}"`;
}

/**
 * Generates an RFC 4180 compliant CSV string with UTF-8 BOM for Excel compatibility,
 * and triggers a client-side file download.
 */
export function exportLeadsToCsv(leads: Lead[], filenamePrefix = "ethixweb-leads") {
  if (!leads || leads.length === 0) {
    alert("No leads available to export with current filters.");
    return;
  }

  const headers = [
    "Lead ID",
    "Created At (IST)",
    "Prospect Name",
    "Business Name",
    "Phone",
    "Email",
    "City",
    "Service Requested",
    "Budget Range",
    "Pipeline Status",
    "Preferred Channel",
    "Internal Notes",
    "Attribution Source",
    "IP Hash",
  ];

  const rows = leads.map((lead) => {
    let istDate = lead.created_at;
    try {
      istDate = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(lead.created_at));
    } catch {
      // keep iso
    }

    return [
      escapeCsvValue(lead.id),
      escapeCsvValue(istDate),
      escapeCsvValue(lead.name),
      escapeCsvValue(lead.business_name || ""),
      escapeCsvValue(lead.phone),
      escapeCsvValue(lead.email),
      escapeCsvValue(lead.city || ""),
      escapeCsvValue(lead.service),
      escapeCsvValue(lead.budget_range || ""),
      escapeCsvValue(lead.status),
      escapeCsvValue(lead.preferred_contact || ""),
      escapeCsvValue(lead.notes || ""),
      escapeCsvValue(lead.source || "website"),
      escapeCsvValue(lead.ip_hash || ""),
    ].join(",");
  });

  // UTF-8 BOM (\uFEFF) ensures Excel renders ₹ and special characters correctly
  const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const dateStamp = new Date().toISOString().split("T")[0];
  const filename = `${filenamePrefix}-${dateStamp}.csv`;

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
