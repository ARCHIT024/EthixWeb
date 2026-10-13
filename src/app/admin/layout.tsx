import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Console | Ethixweb",
  description: "Internal lead management and operations pipeline.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0c0d10] text-[#f3f4f6] selection:bg-[#e51d25] selection:text-white">
      {children}
    </div>
  );
}
