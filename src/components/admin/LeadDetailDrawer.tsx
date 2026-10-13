"use client";

import React, { useState, useEffect } from "react";

export interface Lead {
  id: string;
  created_at: string;
  name: string;
  business_name: string | null;
  phone: string;
  email: string;
  city: string | null;
  service: string;
  budget_range: string | null;
  message: string | null;
  preferred_contact: string | null;
  status: "new" | "contacted" | "qualified" | "won" | "lost";
  notes: string | null;
  ip_hash: string | null;
  user_agent: string | null;
  source: string | null;
}

interface LeadDetailDrawerProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onLeadUpdated: (updatedLead: Lead) => void;
  onLeadDeleted: (deletedId: string) => void;
}

export function LeadDetailDrawer({
  lead,
  isOpen,
  onClose,
  onLeadUpdated,
  onLeadDeleted,
}: LeadDetailDrawerProps) {
  const [currentStatus, setCurrentStatus] = useState<Lead["status"]>("new");
  const [notes, setNotes] = useState<string>("");
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state when lead changes
  useEffect(() => {
    if (lead) {
      setCurrentStatus(lead.status);
      setNotes(lead.notes || "");
      setShowDeleteConfirm(false);
      setToastMessage(null);
    }
  }, [lead]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !lead) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Status Change Handler
  const handleStatusChange = async (newStatus: Lead["status"]) => {
    if (!lead || newStatus === currentStatus) return;
    setIsUpdatingStatus(true);
    setCurrentStatus(newStatus);

    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        onLeadUpdated(data.data);
        showToast(`Status updated to "${newStatus}"`);
      } else {
        setCurrentStatus(lead.status);
        showToast(data.error || "Failed to update status");
      }
    } catch {
      setCurrentStatus(lead.status);
      showToast("Network error updating status");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Notes Save Handler
  const handleSaveNotes = async () => {
    if (!lead) return;
    setIsSavingNotes(true);

    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        onLeadUpdated(data.data);
        showToast("Internal notes saved successfully.");
      } else {
        showToast(data.error || "Failed to save notes");
      }
    } catch {
      showToast("Network error saving notes");
    } finally {
      setIsSavingNotes(false);
    }
  };

  // Delete Handler
  const handleDeleteLead = async () => {
    if (!lead) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        onLeadDeleted(lead.id);
        onClose();
      } else {
        showToast(data.error || "Failed to delete lead");
        setIsDeleting(false);
      }
    } catch {
      showToast("Network error deleting lead");
      setIsDeleting(false);
    }
  };

  // Clean phone number for WhatsApp wa.me link
  const cleanPhoneForWa = lead.phone.replace(/[^0-9]/g, "");
  const waUrl = `https://wa.me/${cleanPhoneForWa}?text=${encodeURIComponent(
    `Hello ${lead.name}, thank you for contacting Ethixweb regarding "${lead.service}". We are reviewing your requirements.`
  )}`;

  const mailtoUrl = `mailto:${lead.email}?subject=${encodeURIComponent(
    `Ethixweb Proposal & Scope - ${lead.service}`
  )}&body=${encodeURIComponent(
    `Hi ${lead.name},\n\nThank you for reaching out to Ethixweb about your project.\n\n`
  )}`;

  const formatDate = (isoString: string) => {
    try {
      return new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(isoString));
    } catch {
      return isoString;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-[#14161c] border-l border-[#262a36] shadow-2xl flex flex-col justify-between overflow-y-auto">
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#262a36] bg-[#1c1f27]/50 sticky top-0 z-10 backdrop-blur-md">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-[#9ca3af]">ID: {lead.id.slice(0, 8)}...</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#262a36] text-[#9ca3af]">
                    {lead.source || "web"}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">{lead.name}</h2>
                {lead.business_name && (
                  <p className="text-sm text-[#c59b4b] font-medium mt-0.5">{lead.business_name}</p>
                )}
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-[#262a36]/60 hover:bg-[#262a36] text-[#9ca3af] hover:text-white transition-colors cursor-pointer"
                title="Close drawer (Esc)"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Quick Actions Bar */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/50 text-emerald-300 text-xs font-medium transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4 fill-emerald-400" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 1.771.821 2.791.821 3.18 0 5.767-2.587 5.767-5.766.001-3.181-2.585-5.767-5.767-5.767zm7.576 5.766c0 4.183-3.407 7.589-7.576 7.589-1.328 0-2.574-.35-3.662-.962l-4.369 1.144 1.166-4.258c-.689-1.148-1.054-2.474-1.054-3.513 0-4.183 3.407-7.588 7.576-7.588 4.183.001 7.575 3.406 7.575 7.588z" />
                </svg>
                <span>Reply on WhatsApp</span>
              </a>

              <a
                href={mailtoUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#262a36]/60 hover:bg-[#262a36] border border-[#3b4255] text-white text-xs font-medium transition-colors"
              >
                <svg className="w-4 h-4 text-[#9ca3af]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Email Lead</span>
              </a>

              <a
                href={`tel:${lead.phone}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#262a36]/60 hover:bg-[#262a36] border border-[#3b4255] text-white text-xs font-medium transition-colors"
              >
                <svg className="w-4 h-4 text-[#9ca3af]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Call ({lead.phone})</span>
              </a>
            </div>

            {/* Notification Toast */}
            {toastMessage && (
              <div className="mt-3 py-1.5 px-3 rounded-lg bg-[#c59b4b]/20 border border-[#c59b4b]/40 text-[#c59b4b] text-xs font-medium animate-in fade-in">
                {toastMessage}
              </div>
            )}
          </div>

          {/* Drawer Body */}
          <div className="p-6 space-y-6 flex-1">
            {/* Status Pipeline Controller */}
            <div className="p-4 rounded-xl bg-[#1c1f27] border border-[#262a36]">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#9ca3af] mb-2">
                Pipeline Status
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {(["new", "contacted", "qualified", "won", "lost"] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    disabled={isUpdatingStatus}
                    onClick={() => handleStatusChange(st)}
                    className={`py-2 px-1 text-center rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      currentStatus === st
                        ? st === "new"
                          ? "bg-blue-600 text-white shadow-md shadow-blue-900/50"
                          : st === "contacted"
                          ? "bg-amber-600 text-white shadow-md shadow-amber-900/50"
                          : st === "qualified"
                          ? "bg-purple-600 text-white shadow-md shadow-purple-900/50"
                          : st === "won"
                          ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/50"
                          : "bg-zinc-700 text-zinc-200"
                        : "bg-[#14161c] text-[#9ca3af] hover:text-white hover:bg-[#262a36]"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Core Fields Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-[#1c1f27] border border-[#262a36]">
                <div className="text-[11px] font-medium uppercase tracking-wider text-[#9ca3af]">Service</div>
                <div className="text-sm font-semibold text-white mt-1">{lead.service}</div>
              </div>
              <div className="p-3 rounded-xl bg-[#1c1f27] border border-[#262a36]">
                <div className="text-[11px] font-medium uppercase tracking-wider text-[#9ca3af]">Budget Range</div>
                <div className="text-sm font-semibold text-[#c59b4b] mt-1">{lead.budget_range || "Not specified"}</div>
              </div>
              <div className="p-3 rounded-xl bg-[#1c1f27] border border-[#262a36]">
                <div className="text-[11px] font-medium uppercase tracking-wider text-[#9ca3af]">City / Location</div>
                <div className="text-sm font-medium text-white mt-1">{lead.city || "Not specified"}</div>
              </div>
              <div className="p-3 rounded-xl bg-[#1c1f27] border border-[#262a36]">
                <div className="text-[11px] font-medium uppercase tracking-wider text-[#9ca3af]">Preferred Channel</div>
                <div className="text-sm font-medium text-white capitalize mt-1">{lead.preferred_contact || "whatsapp"}</div>
              </div>
            </div>

            {/* Message Details */}
            <div className="p-4 rounded-xl bg-[#1c1f27] border border-[#262a36]">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#9ca3af] mb-2">
                Project Scope / Message
              </div>
              <blockquote className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap bg-[#14161c] p-3 rounded-lg border border-[#262a36]">
                {lead.message || "No project message provided."}
              </blockquote>
            </div>

            {/* Internal Team Notes */}
            <div className="p-4 rounded-xl bg-[#1c1f27] border border-[#262a36]">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="notes" className="text-xs font-semibold uppercase tracking-wider text-[#9ca3af]">
                  Internal Team Notes
                </label>
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  disabled={isSavingNotes}
                  className="px-3 py-1 rounded-md bg-[#c59b4b] hover:bg-[#b0873a] text-black font-semibold text-xs tracking-wide transition-colors cursor-pointer disabled:opacity-60"
                >
                  {isSavingNotes ? "Saving..." : "Save Notes"}
                </button>
              </div>
              <textarea
                id="notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add private team notes, call logs, qualification criteria..."
                className="w-full p-3 rounded-lg bg-[#14161c] border border-[#262a36] text-white placeholder-[#525866] text-sm focus:outline-none focus:ring-1 focus:ring-[#c59b4b]"
              />
            </div>

            {/* System Audit & Security Metadata */}
            <div className="p-4 rounded-xl bg-[#14161c] border border-[#262a36] space-y-2 text-xs">
              <div className="font-semibold text-[#9ca3af] uppercase tracking-wider mb-1">
                Audit & Telemetry (No Raw IP)
              </div>
              <div className="flex justify-between text-[#9ca3af]">
                <span>Submitted At (IST):</span>
                <span className="font-mono text-white">{formatDate(lead.created_at)}</span>
              </div>
              <div className="flex justify-between text-[#9ca3af]">
                <span>Salted IP Hash:</span>
                <span className="font-mono text-xs text-zinc-400 truncate max-w-[200px]" title={lead.ip_hash || ""}>
                  {lead.ip_hash ? `${lead.ip_hash.slice(0, 16)}...` : "None"}
                </span>
              </div>
              <div className="flex justify-between text-[#9ca3af]">
                <span>User Agent:</span>
                <span className="text-xs text-zinc-400 truncate max-w-[200px]" title={lead.user_agent || ""}>
                  {lead.user_agent || "Unknown"}
                </span>
              </div>
            </div>

            {/* Destructive Action Section */}
            <div className="pt-4 border-t border-[#262a36]">
              {showDeleteConfirm ? (
                <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/80 space-y-3">
                  <div className="text-xs text-red-200 font-semibold">
                    Are you sure you want to permanently delete this lead? This action cannot be undone.
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={isDeleting}
                      onClick={handleDeleteLead}
                      className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-xs cursor-pointer disabled:opacity-50"
                    >
                      {isDeleting ? "Deleting..." : "Yes, Delete Lead"}
                    </button>
                    <button
                      type="button"
                      disabled={isDeleting}
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-3 py-1.5 rounded-lg bg-[#262a36] text-[#9ca3af] hover:text-white text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="text-xs text-red-400 hover:text-red-300 font-medium inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Permanently Delete Lead</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
