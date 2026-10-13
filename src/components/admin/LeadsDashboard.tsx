"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AdminHeader } from "./AdminHeader";
import { LeadDetailDrawer, type Lead } from "./LeadDetailDrawer";
import { exportLeadsToCsv } from "@/lib/csv-export";
import { SERVICE_CATEGORIES } from "@/lib/validations/enquiry";

interface StatusCounts {
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  won: number;
  lost: number;
}

interface LeadsDashboardProps {
  initialAdminEmail?: string;
}

export function LeadsDashboard({ initialAdminEmail }: LeadsDashboardProps) {
  // Filters & Pagination State
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"date_desc" | "date_asc">("date_desc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  // Data & Async State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [counts, setCounts] = useState<StatusCounts>({
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    won: 0,
    lost: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // Drawer State
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1); // Reset to page 1 on new search query
    }, 350);
    return () => clearTimeout(handler);
  }, [search]);

  // Fetch leads from server API
  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const params = new URLSearchParams({
        search: debouncedSearch,
        status: statusFilter,
        service: serviceFilter,
        sort: sortOrder,
        page: currentPage.toString(),
        limit: pageSize.toString(),
      });

      const res = await fetch(`/api/admin/leads?${params.toString()}`);
      const result = await res.json();

      if (!res.ok || !result.ok) {
        setErrorMessage(result.error || "Failed to load leads from database.");
        setIsLoading(false);
        return;
      }

      setLeads(result.data.leads || []);
      setTotalCount(result.data.totalCount || 0);
      setTotalPages(result.data.totalPages || 1);
      if (result.data.counts) {
        setCounts(result.data.counts);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Network error fetching leads";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, statusFilter, serviceFilter, sortOrder, currentPage]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Export current filtered results to CSV
  const handleExport = async () => {
    setIsExporting(true);
    try {
      const params = new URLSearchParams({
        search: debouncedSearch,
        status: statusFilter,
        service: serviceFilter,
        sort: sortOrder,
        export: "true",
      });

      const res = await fetch(`/api/admin/leads?${params.toString()}`);
      const result = await res.json();

      if (res.ok && result.ok && result.data.leads) {
        exportLeadsToCsv(result.data.leads);
      } else {
        alert(result.error || "Failed to export leads.");
      }
    } catch {
      alert("Network error during CSV export.");
    } finally {
      setIsExporting(false);
    }
  };

  // Lead update callbacks from Drawer
  const handleLeadUpdated = (updatedLead: Lead) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === updatedLead.id ? updatedLead : l))
    );
    setSelectedLead(updatedLead);
    // Refresh counts and data in background
    fetchLeads();
  };

  const handleLeadDeleted = (deletedId: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== deletedId));
    setSelectedLead(null);
    setIsDrawerOpen(false);
    fetchLeads();
  };

  const openDrawerForLead = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDrawerOpen(true);
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setServiceFilter("all");
    setSortOrder("date_desc");
    setCurrentPage(1);
  };

  const formatDate = (isoString: string) => {
    try {
      return new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(isoString));
    } catch {
      return isoString;
    }
  };

  // Status badge styling helper
  const getStatusBadge = (status: Lead["status"]) => {
    switch (status) {
      case "new":
        return "bg-blue-500/15 text-blue-400 border-blue-500/30";
      case "contacted":
        return "bg-amber-500/15 text-amber-400 border-amber-500/30";
      case "qualified":
        return "bg-purple-500/15 text-purple-400 border-purple-500/30";
      case "won":
        return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
      case "lost":
        return "bg-zinc-700/20 text-zinc-400 border-zinc-700/40";
      default:
        return "bg-zinc-800 text-zinc-300 border-zinc-700";
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0d10] text-[#f3f4f6]">
      {/* Top Header */}
      <AdminHeader adminEmail={initialAdminEmail} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Page Title & Quick Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Lead Operations Pipeline
            </h1>
            <p className="text-xs sm:text-sm text-[#9ca3af] mt-1">
              Real-time Indian business inquiries, qualification stages, and direct communication triggers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              disabled={isExporting || totalCount === 0}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1c1f27] hover:bg-[#262a36] border border-[#262a36] text-white text-xs font-semibold tracking-wide transition-all cursor-pointer disabled:opacity-50"
            >
              <svg className="w-4 h-4 text-[#c59b4b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>{isExporting ? "Exporting..." : "Export Filtered CSV"}</span>
            </button>
          </div>
        </div>

        {/* Status KPI Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { id: "all", label: "Total Inquiries", count: counts.total, color: "text-white" },
            { id: "new", label: "New Leads", count: counts.new, color: "text-blue-400" },
            { id: "contacted", label: "Contacted", count: counts.contacted, color: "text-amber-400" },
            { id: "qualified", label: "Qualified", count: counts.qualified, color: "text-purple-400" },
            { id: "won", label: "Won / Active", count: counts.won, color: "text-emerald-400" },
            { id: "lost", label: "Lost / Closed", count: counts.lost, color: "text-zinc-400" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setStatusFilter(item.id);
                setCurrentPage(1);
              }}
              className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                statusFilter === item.id
                  ? "bg-[#1c1f27] border-[#c59b4b] shadow-md shadow-amber-950/20"
                  : "bg-[#14161c] border-[#262a36] hover:border-[#3b4255]"
              }`}
            >
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af] truncate">
                {item.label}
              </div>
              <div className={`text-2xl font-bold mt-1 tracking-tight ${item.color}`}>
                {item.count}
              </div>
            </button>
          ))}
        </div>

        {/* Search, Filter & Sort Controls */}
        <div className="p-4 rounded-2xl bg-[#14161c] border border-[#262a36] space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#525866]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, phone, email, business..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0c0d10] border border-[#262a36] text-white placeholder-[#525866] text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#c59b4b]"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#9ca3af] hover:text-white"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0d10] border border-[#262a36] text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#c59b4b]"
              >
                <option value="all">All Pipeline Stages</option>
                <option value="new">New (Awaiting Review)</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="won">Won / Contracted</option>
                <option value="lost">Lost</option>
              </select>
            </div>

            {/* Service Category Filter */}
            <div>
              <select
                value={serviceFilter}
                onChange={(e) => {
                  setServiceFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0d10] border border-[#262a36] text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#c59b4b]"
              >
                <option value="all">All Service Categories</option>
                {SERVICE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div className="flex items-center gap-2">
              <select
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value as "date_desc" | "date_asc");
                  setCurrentPage(1);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0d10] border border-[#262a36] text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#c59b4b]"
              >
                <option value="date_desc">Newest First</option>
                <option value="date_asc">Oldest First</option>
              </select>

              {(search || statusFilter !== "all" || serviceFilter !== "all") && (
                <button
                  onClick={resetFilters}
                  className="px-3 py-2.5 rounded-xl bg-[#262a36] text-[#9ca3af] hover:text-white text-xs whitespace-nowrap transition-colors cursor-pointer"
                  title="Clear all filters"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Leads Table Container */}
        <div className="rounded-2xl bg-[#14161c] border border-[#262a36] overflow-hidden shadow-xl">
          {/* Error Banner */}
          {errorMessage && (
            <div className="p-4 bg-red-950/40 border-b border-red-800 text-red-200 text-xs flex items-center justify-between">
              <span>{errorMessage}</span>
              <button
                onClick={fetchLeads}
                className="px-2.5 py-1 rounded-md bg-red-800 hover:bg-red-700 text-white font-medium"
              >
                Retry
              </button>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#1c1f27] text-[#9ca3af] uppercase text-[10px] font-semibold tracking-wider border-b border-[#262a36]">
                <tr>
                  <th scope="col" className="px-5 py-3.5">
                    Prospect / Business
                  </th>
                  <th scope="col" className="px-5 py-3.5">
                    Contact Channels
                  </th>
                  <th scope="col" className="px-5 py-3.5">
                    Service & Budget
                  </th>
                  <th scope="col" className="px-5 py-3.5">
                    Status
                  </th>
                  <th scope="col" className="px-5 py-3.5">
                    Received (IST)
                  </th>
                  <th scope="col" className="px-5 py-3.5 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#262a36]/60">
                {isLoading ? (
                  // Skeleton Loading Rows
                  Array.from({ length: 5 }).map((_, idx) => (
                    <tr key={idx} className="animate-pulse">
                      <td className="px-5 py-4">
                        <div className="h-4 w-32 bg-[#262a36] rounded mb-1.5" />
                        <div className="h-3 w-20 bg-[#1c1f27] rounded" />
                      </td>
                      <td className="px-5 py-4">
                        <div className="h-3.5 w-28 bg-[#262a36] rounded mb-1.5" />
                        <div className="h-3 w-36 bg-[#1c1f27] rounded" />
                      </td>
                      <td className="px-5 py-4">
                        <div className="h-3.5 w-32 bg-[#262a36] rounded mb-1.5" />
                        <div className="h-3 w-20 bg-[#1c1f27] rounded" />
                      </td>
                      <td className="px-5 py-4">
                        <div className="h-6 w-20 bg-[#262a36] rounded-md" />
                      </td>
                      <td className="px-5 py-4">
                        <div className="h-3.5 w-24 bg-[#262a36] rounded" />
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="h-8 w-16 bg-[#262a36] rounded-lg ml-auto" />
                      </td>
                    </tr>
                  ))
                ) : leads.length === 0 ? (
                  // Empty State
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center">
                      <div className="w-12 h-12 rounded-2xl bg-[#1c1f27] border border-[#262a36] text-[#9ca3af] flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                      </div>
                      <h3 className="text-base font-semibold text-white">No inquiries found</h3>
                      <p className="text-xs text-[#9ca3af] max-w-sm mx-auto mt-1 mb-4">
                        No leads match your current search criteria or pipeline filters.
                      </p>
                      {(search || statusFilter !== "all" || serviceFilter !== "all") && (
                        <button
                          onClick={resetFilters}
                          className="px-4 py-2 rounded-xl bg-[#e51d25] hover:bg-[#cc1820] text-white font-medium text-xs transition-colors cursor-pointer"
                        >
                          Clear Active Filters
                        </button>
                      )}
                    </td>
                  </tr>
                ) : (
                  // Populated Data Rows
                  leads.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => openDrawerForLead(lead)}
                      className="hover:bg-[#1c1f27]/70 transition-colors cursor-pointer group"
                    >
                      {/* Prospect / Business */}
                      <td className="px-5 py-4">
                        <div className="font-semibold text-white group-hover:text-[#c59b4b] transition-colors">
                          {lead.name}
                        </div>
                        {lead.business_name ? (
                          <div className="text-xs text-[#9ca3af]">{lead.business_name}</div>
                        ) : lead.city ? (
                          <div className="text-xs text-[#9ca3af]">{lead.city}</div>
                        ) : null}
                      </td>

                      {/* Contact Channels */}
                      <td className="px-5 py-4">
                        <div className="text-xs font-mono text-gray-200">{lead.phone}</div>
                        <div className="text-xs text-[#9ca3af] truncate max-w-[180px]">{lead.email}</div>
                      </td>

                      {/* Service & Budget */}
                      <td className="px-5 py-4">
                        <div className="text-xs font-medium text-white line-clamp-1">{lead.service}</div>
                        <div className="text-xs text-[#c59b4b] font-semibold">{lead.budget_range || "Flexible"}</div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-block px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-md border ${getStatusBadge(
                            lead.status
                          )}`}
                        >
                          {lead.status}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4 text-xs text-[#9ca3af] whitespace-nowrap">
                        {formatDate(lead.created_at)}
                      </td>

                      {/* Action Button */}
                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openDrawerForLead(lead);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#262a36]/60 group-hover:bg-[#262a36] text-white text-xs font-medium border border-[#3b4255]/40 transition-colors cursor-pointer"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {!isLoading && leads.length > 0 && (
            <div className="p-4 bg-[#1c1f27]/40 border-t border-[#262a36] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#9ca3af]">
              <div>
                Showing <span className="font-semibold text-white">{(currentPage - 1) * pageSize + 1}</span> to{" "}
                <span className="font-semibold text-white">
                  {Math.min(currentPage * pageSize, totalCount)}
                </span>{" "}
                of <span className="font-semibold text-white">{totalCount}</span> total inquiries
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-lg bg-[#14161c] border border-[#262a36] text-white hover:bg-[#262a36] transition-colors disabled:opacity-40 cursor-pointer"
                >
                  Previous
                </button>
                <span className="px-2 font-mono text-white">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1.5 rounded-lg bg-[#14161c] border border-[#262a36] text-white hover:bg-[#262a36] transition-colors disabled:opacity-40 cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Slide-Over Detail Drawer */}
      <LeadDetailDrawer
        lead={selectedLead}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onLeadUpdated={handleLeadUpdated}
        onLeadDeleted={handleLeadDeleted}
      />
    </div>
  );
}
