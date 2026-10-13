import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getAuthenticatedAdmin } from "@/lib/auth-admin";
import { LeadsDashboard } from "@/components/admin/LeadsDashboard";
import AdminLoading from "./loading";

export const metadata: Metadata = {
  title: "Lead Dashboard | Ethixweb Admin Console",
  description: "Internal operations pipeline and lead qualification.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

async function AdminDashboardContent() {
  const admin = await getAuthenticatedAdmin();

  // If session is missing or expired, redirect to login
  if (!admin) {
    redirect("/admin/login");
  }

  return <LeadsDashboard initialAdminEmail={admin.email} />;
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<AdminLoading />}>
      <AdminDashboardContent />
    </Suspense>
  );
}
