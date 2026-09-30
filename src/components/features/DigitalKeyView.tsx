"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PropertyData } from "@/lib/properties";

interface DigitalKeyViewProps {
  property: PropertyData;
  onOpenTrustLink?: () => void;
}

type RequirementLabel =
  | "Required by Law"
  | "Conditional Legal"
  | "Requested by Pro"
  | "Optional";

function getRequirementBadge(req: RequirementLabel) {
  switch (req) {
    case "Required by Law":
      return { style: "bg-[#eaf5ef] text-[#24754c] border border-[#c7e3d1]", label: "Law Required" };
    case "Conditional Legal":
      return { style: "bg-[#fff4df] text-[#8b641c] border border-[#fce3b8]", label: "Conditional" };
    case "Requested by Pro":
      return { style: "bg-[#eef4ff] text-[#071d3b] border border-[#cbd5e1]", label: "Pro Policy" };
    case "Optional":
    default:
      return { style: "bg-[#f1f5f9] text-[#64748b]", label: "Optional" };
  }
}

interface PackItem {
  id: string;
  title: string;
  requirement: RequirementLabel;
  size: string;
}

interface DealPack {
  id: string;
  title: string;
  category: "Build" | "Sell" | "Tenancy" | "Finance";
  sender: string;
  recipient: string;
  status: "Action Needed" | "In Review" | "Completed";
  statusColor: string;
  dueDate?: string;
  summary: string;
  financialImpact?: string;
  timelineImpact?: string;
  items: PackItem[];
  trustlinkHref: string;
}

export function DigitalKeyView({ property, onOpenTrustLink }: DigitalKeyViewProps) {
  const [activeTab, setActiveTab] = useState<"action" | "build" | "sell" | "tenancy" | "completed">("action");
  const [selectedPack, setSelectedPack] = useState<DealPack | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [newCategory, setNewCategory] = useState<"Sell" | "Build" | "Tenancy" | "Finance">("Sell");
  const [newTitle, setNewTitle] = useState("");
  const [newRecipient, setNewRecipient] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Simplified Deal Packs (Clean & Brief)
  const [packs, setPacks] = useState<DealPack[]>([
    {
      id: "PACK-01",
      title: "Builder Handover Pack",
      category: "Build",
      sender: "Hart Homes (Olivia)",
      recipient: "Alex & Emily",
      status: "Action Needed",
      statusColor: "bg-[#fff4df] text-[#8b641c] border-[#fce3b8]",
      dueDate: "Today",
      summary: "Construction complete. Review statutory certs and accept handover to seal into your property passport.",
      trustlinkHref: "/trustlinks/TL-99214-B",
      items: [
        { id: "1", title: "QBCC Form 16 Structural Certificate", requirement: "Required by Law", size: "2.4 MB" },
        { id: "2", title: "Form 43 Wet-Area Waterproofing Cert", requirement: "Required by Law", size: "1.8 MB" },
        { id: "3", title: "Termite Management System (AS 3660.1)", requirement: "Required by Law", size: "2.1 MB" },
        { id: "4", title: "Electrical Safety Compliance Cert", requirement: "Required by Law", size: "1.4 MB" },
        { id: "5", title: "Home Warranty Insurance Certificate", requirement: "Required by Law", size: "850 KB" },
      ],
    },
    {
      id: "PACK-02",
      title: "Kitchen Upgrade Variation #04",
      category: "Build",
      sender: "Hart Homes (Olivia)",
      recipient: "Alex & Emily",
      status: "Action Needed",
      statusColor: "bg-[#fff4df] text-[#8b641c] border-[#fce3b8]",
      dueDate: "2 Oct",
      summary: "Caesarstone Pure White kitchen island upgrade request.",
      financialImpact: "+$1,400 AUD",
      timelineImpact: "+2 Days",
      trustlinkHref: "/trustlinks/TL-99214-B",
      items: [
        { id: "v1", title: "Variation Schedule #04 Form", requirement: "Required by Law", size: "1.1 MB" },
        { id: "v2", title: "Caesarstone Stone Spec Sheet", requirement: "Requested by Pro", size: "1.9 MB" },
      ],
    },
    {
      id: "PACK-03",
      title: "Pre-Sale Disclosure Pack",
      category: "Sell",
      sender: "River City Conveyancing",
      recipient: "Alex & Emily",
      status: "In Review",
      statusColor: "bg-[#eaf5ef] text-[#24754c] border-[#c7e3d1]",
      summary: "Queensland Form 2 disclosure draft and title search evidence.",
      trustlinkHref: "/trustlinks/TL-88301-A",
      items: [
        { id: "s1", title: "Draft Seller Disclosure (Form 2)", requirement: "Required by Law", size: "2.8 MB" },
        { id: "s2", title: "Titles Queensland Search Evidence", requirement: "Required by Law", size: "1.5 MB" },
        { id: "s3", title: "Council Planning & Water Search", requirement: "Required by Law", size: "3.1 MB" },
      ],
    },
    {
      id: "PACK-04",
      title: "Property Manager Agreement",
      category: "Tenancy",
      sender: "Place Estate Agents",
      recipient: "Alex & Emily",
      status: "Completed",
      statusColor: "bg-[#f0f4f9] text-[#071d3b] border-[#cbd5e2]",
      summary: "Agency appointment executed under OFT Form 6.",
      trustlinkHref: "/trustlinks/TL-76100-C",
      items: [
        { id: "l1", title: "Executed OFT Form 6 Appointment", requirement: "Required by Law", size: "2.2 MB" },
        { id: "l2", title: "General Tenancy Terms (Form 18a)", requirement: "Required by Law", size: "1.4 MB" },
      ],
    },
  ]);

  const pendingPacks = packs.filter((p) => p.status === "Action Needed");
  const buildPacks = packs.filter((p) => p.category === "Build");
  const sellPacks = packs.filter((p) => p.category === "Sell");
  const tenancyPacks = packs.filter((p) => p.category === "Tenancy");
  const completedPacks = packs.filter((p) => p.status === "Completed");

  const handleExecute = (id: string) => {
    setPacks((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: "Completed", statusColor: "bg-[#f0f4f9] text-[#071d3b] border-[#cbd5e2]" }
          : p
      )
    );
    setSelectedPack(null);
    showToast("Pack approved and sealed to your property passport!");
  };

  const handleCreatePackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: DealPack = {
      id: `PACK-0${packs.length + 1}`,
      title: newTitle.trim(),
      category: newCategory,
      sender: "Alex & Emily",
      recipient: newRecipient.trim() || "Professional",
      status: "In Review",
      statusColor: "bg-[#eaf5ef] text-[#24754c] border-[#c7e3d1]",
      summary: "User created pack ready for review.",
      trustlinkHref: property.trustlinkHref || "/trustlinks/welcome",
      items: [
        { id: "c1", title: "Title Search Evidence", requirement: "Required by Law", size: "1.5 MB" },
        { id: "c2", title: "Statutory Property Cert", requirement: "Required by Law", size: "2.1 MB" },
      ],
    };

    setPacks([created, ...packs]);
    setCreateModalOpen(false);
    setNewTitle("");
    setNewRecipient("");
    showToast(`Pack "${created.title}" created successfully!`);
  };

  return (
    <div className="space-y-5 text-[#102645] font-sans max-w-[960px] mx-auto pb-10">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#071d3b] text-white px-4 py-3 rounded-xl shadow-lg border border-white/10 text-xs font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#24754c] animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── Header ────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#dfe6ef]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#102645]">
            Digital Key
          </h1>
          <p className="text-xs text-[#68788e] mt-0.5">
            Your property&apos;s secure document passport for {property.street}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onOpenTrustLink && (
            <button
              onClick={onOpenTrustLink}
              className="px-3 py-1.5 bg-white border border-[#cbd5e2] hover:bg-[#f3f6fb] text-[#102645] rounded-xl text-xs font-semibold shadow-2xs cursor-pointer"
            >
              🛡️ TrustLinks
            </button>
          )}
          <button
            onClick={() => setCreateModalOpen(true)}
            className="px-3.5 py-1.5 bg-[#071d3b] hover:bg-[#15345d] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
          >
            + Create Pack
          </button>
        </div>
      </div>

      {/* ── 3-Metric Compact Summary ──────────────────────────── */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white border border-[#dfe6ef] rounded-xl p-3 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#68788e]">Needs Action</div>
            <div className="text-lg font-bold text-[#8b641c] mt-0.5">{pendingPacks.length} Pending</div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-[#efbd66] animate-pulse" />
        </div>

        <div className="bg-white border border-[#dfe6ef] rounded-xl p-3 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#68788e]">Active Packs</div>
            <div className="text-lg font-bold text-[#102645] mt-0.5">{packs.length} Active</div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-[#071d3b]" />
        </div>

        <div className="bg-white border border-[#dfe6ef] rounded-xl p-3 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#68788e]">Vaulted Records</div>
            <div className="text-lg font-bold text-[#24754c] mt-0.5">14 Files</div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-[#24754c]" />
        </div>
      </div>

      {/* ── Minimal Navigation Bar ────────────────────────────── */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {[
          { id: "action", label: "Action Needed", count: pendingPacks.length },
          { id: "build", label: "Build & Handover", count: buildPacks.length },
          { id: "sell", label: "Sell & Disclosure", count: sellPacks.length },
          { id: "tenancy", label: "Tenancy", count: tenancyPacks.length },
          { id: "completed", label: "Completed", count: completedPacks.length },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? "bg-[#071d3b] text-white shadow-xs"
                  : "bg-white border border-[#dfe6ef] text-[#5b6e84] hover:bg-[#f3f6fb] hover:text-[#102645]"
              }`}
            >
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span
                  className={`text-[9.5px] font-bold px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-[#edf2f7] text-[#071d3b]"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Minimal Pack Cards (Less Info on Front) ────────────── */}
      <div className="space-y-2.5">
        {packs
          .filter((p) => {
            if (activeTab === "action") return p.status === "Action Needed";
            if (activeTab === "build") return p.category === "Build";
            if (activeTab === "sell") return p.category === "Sell";
            if (activeTab === "tenancy") return p.category === "Tenancy";
            if (activeTab === "completed") return p.status === "Completed";
            return true;
          })
          .map((pack) => (
            <div
              key={pack.id}
              className="bg-white border border-[#dfe6ef] hover:border-[#cbd5e1] rounded-xl p-3.5 shadow-2xs transition-all flex items-center justify-between gap-3"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9.5px] font-bold px-2 py-0.5 rounded bg-[#f0f4f8] text-[#071d3b]">
                    {pack.category}
                  </span>
                  <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded border ${pack.statusColor}`}>
                    {pack.status}
                  </span>
                  {pack.dueDate && (
                    <span className="text-[10px] text-[#8b641c] font-medium">Due: {pack.dueDate}</span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-[#102645] truncate">
                  {pack.title}
                </h3>
                
                <p className="text-[11.5px] text-[#68788e] truncate mt-0.5">
                  From <strong className="text-[#102645]">{pack.sender}</strong> · {pack.items.length} files included
                </p>
              </div>

              {/* Single Clean Action Button */}
              <button
                onClick={() => setSelectedPack(pack)}
                className="px-3 py-1.5 bg-[#071d3b] hover:bg-[#15345d] text-white text-xs font-bold rounded-lg transition-colors flex-shrink-0 cursor-pointer shadow-2xs"
              >
                {pack.status === "Action Needed" ? "Review & Sign →" : "View Pack →"}
              </button>
            </div>
          ))}
      </div>

      {/* ── POPUP CARD MODAL (Detailed Info Rendered Here Only) ── */}
      {selectedPack && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#dfe6ef] rounded-2xl max-w-lg w-full p-5 shadow-2xl space-y-4 max-h-[88vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-[#dfe6ef]">
              <div>
                <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#24754c]">
                  {selectedPack.category} Pack Details
                </span>
                <h3 className="text-base font-bold text-[#102645] mt-0.5">
                  {selectedPack.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPack(null)}
                className="w-7 h-7 rounded-full bg-[#f4f6f8] text-[#5b6e84] hover:bg-[#e2eaf4] flex items-center justify-center text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Quick Meta */}
            <div className="bg-[#f8fafc] border border-[#dfe6ef] rounded-xl p-3 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-[#68788e]">Sender:</span>
                <strong className="text-[#102645]">{selectedPack.sender}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#68788e]">Recipient:</span>
                <strong className="text-[#102645]">{selectedPack.recipient}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#68788e]">Status:</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${selectedPack.statusColor}`}>
                  {selectedPack.status}
                </span>
              </div>
            </div>

            {/* Summary Note */}
            <p className="text-xs text-[#5b6e84] leading-relaxed">
              {selectedPack.summary}
            </p>

            {/* Financial / Timeline Impact if present */}
            {selectedPack.financialImpact && (
              <div className="p-2.5 bg-[#fffaf0] border border-[#fce3b8] rounded-xl flex items-center justify-between text-xs font-bold text-[#8b641c]">
                <span>Cost: {selectedPack.financialImpact}</span>
                <span>Timeline: {selectedPack.timelineImpact}</span>
              </div>
            )}

            {/* Included Documents List with Legal Requirement Labels */}
            <div className="space-y-2">
              <div className="text-[10.5px] font-bold text-[#68788e] uppercase">
                Included Documents ({selectedPack.items.length}):
              </div>

              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {selectedPack.items.map((item) => {
                  const badge = getRequirementBadge(item.requirement);
                  return (
                    <div
                      key={item.id}
                      className="p-2 bg-[#f8fafc] border border-[#dfe6ef] rounded-lg flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span>📄</span>
                        <span className="font-semibold text-[#102645] truncate">{item.title}</span>
                      </div>
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${badge.style}`}>
                        {badge.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Modal Actions */}
            <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#dfe6ef]">
              <Link
                href={selectedPack.trustlinkHref}
                className="text-xs font-bold text-[#071d3b] hover:underline"
              >
                Discuss via TrustLink →
              </Link>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedPack(null)}
                  className="px-3 py-1.5 bg-white border border-[#cbd5e2] text-[#5b6e84] rounded-lg text-xs font-semibold hover:bg-[#f4f6f8] cursor-pointer"
                >
                  Close
                </button>
                {selectedPack.status === "Action Needed" && (
                  <button
                    onClick={() => handleExecute(selectedPack.id)}
                    className="px-3.5 py-1.5 bg-[#071d3b] hover:bg-[#15345d] text-white rounded-lg text-xs font-bold cursor-pointer shadow-xs"
                  >
                    Approve &amp; Sign →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CREATE PACK MODAL ─────────────────────────────────── */}
      {createModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#dfe6ef] rounded-2xl max-w-md w-full p-5 shadow-2xl space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-[#dfe6ef]">
              <h3 className="text-base font-bold text-[#102645]">Create Record Pack</h3>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="w-6 h-6 rounded-full bg-[#f4f6f8] text-[#5b6e84] hover:bg-[#e2eaf4] flex items-center justify-center text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePackSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#102645] mb-1">Pack Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-1.5 bg-[#f4f6f8] border border-[#dfe6ef] rounded-lg text-xs text-[#102645]"
                >
                  <option value="Sell">Sell &amp; Disclosure</option>
                  <option value="Build">Build &amp; Handover</option>
                  <option value="Tenancy">Landlord &amp; Tenancy</option>
                  <option value="Finance">Finance &amp; Refinance</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#102645] mb-1">Pack Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Pre-Sale Disclosure Pack"
                  className="w-full px-3 py-1.5 bg-[#f4f6f8] border border-[#dfe6ef] rounded-lg text-xs text-[#102645]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#102645] mb-1">Recipient Professional</label>
                <input
                  type="text"
                  value={newRecipient}
                  onChange={(e) => setNewRecipient(e.target.value)}
                  placeholder="e.g. Solicitor or Agent name"
                  className="w-full px-3 py-1.5 bg-[#f4f6f8] border border-[#dfe6ef] rounded-lg text-xs text-[#102645]"
                />
              </div>

              <div className="p-2.5 bg-[#eaf5ef] rounded-lg text-[11px] text-[#24754c]">
                🔑 Pack will be sealed and shared securely via TrustLink.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-3.5 py-1.5 bg-white border border-[#cbd5e2] text-[#5b6e84] rounded-lg font-semibold hover:bg-[#f4f6f8] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-[#071d3b] hover:bg-[#15345d] text-white font-bold rounded-lg shadow-xs cursor-pointer"
                >
                  Create Pack →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
