"use client";
import React, { useState } from "react";
import Link from "next/link";
import { PropertyData } from "@/lib/properties";

interface DigitalKeyViewProps {
  property: PropertyData;
  onOpenTrustLink?: () => void;
}

interface RecordPack {
  id: string;
  name: string;
  recipient: string;
  docCount: number;
  createdAt: string;
  status: "Active" | "Pending" | "Archived";
  expiry: string;
}

export function DigitalKeyView({ property, onOpenTrustLink }: DigitalKeyViewProps) {
  const [activeTab, setActiveTab] = useState<"saved" | "incoming" | "outgoing" | "history">("saved");
  const [transferOpen, setTransferOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [incomingClaimed, setIncomingClaimed] = useState(false);

  // User created packs
  const [savedPacks, setSavedPacks] = useState<RecordPack[]>([]);

  // Create pack modal form state
  const [newPackName, setNewPackName] = useState("");
  const [newPackRecipient, setNewPackRecipient] = useState("");
  const [selectedDocs, setSelectedDocs] = useState<string[]>(
    property.documents.slice(0, 3).map((d) => d.title)
  );

  const handleCreatePack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPackName.trim()) return;

    const newPack: RecordPack = {
      id: `PACK-${Date.now().toString().slice(-4)}`,
      name: newPackName.trim(),
      recipient: newPackRecipient.trim() || "Verified Professional via TrustLink",
      docCount: selectedDocs.length,
      createdAt: "Just now",
      status: "Active",
      expiry: "30 Days",
    };

    setSavedPacks([newPack, ...savedPacks]);
    setNewPackName("");
    setNewPackRecipient("");
    setCreateModalOpen(false);
    setActiveTab("saved");
  };

  const toggleDocSelection = (title: string) => {
    if (selectedDocs.includes(title)) {
      setSelectedDocs(selectedDocs.filter((t) => t !== title));
    } else {
      setSelectedDocs([...selectedDocs, title]);
    }
  };

  const trustlinkUrl = property.trustlinkHref || `/trustlinks/${property.trustlinkId || "TL-99214-B"}`;

  return (
    <div className="space-y-6 text-[#102645] font-sans max-w-[1040px] mx-auto pb-12">
      
      {/* ── Page Header Block ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pt-1">
        <div>
          <div className="text-[10.5px] font-bold uppercase tracking-[2px] text-[#0284c7] mb-1">
            YOUR RECORDS. YOUR DECISION.
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#102645] mb-1.5">
            Digital Key
          </h1>
          <p className="text-[13px] text-[#64748b]">
            Receive, keep and move the records you control.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="self-start sm:self-auto px-4 py-2 rounded-lg bg-[#bbf7d0] hover:bg-[#a7f3d0] text-[#14532d] font-bold text-xs transition-colors shadow-2xs cursor-pointer"
        >
          Create a record pack
        </button>
      </div>

      {/* ── Handover Info Banner (Light Green Card) ──────────────────── */}
      <div className="border border-[#bbf7d0] bg-[#f0fdf4] rounded-xl p-4 sm:p-5 shadow-2xs text-[#14532d]">
        <h3 className="text-sm font-bold text-[#14532d] mb-1 flex items-center gap-2">
          <span>🛡️</span>
          <span>Handover stays here until you choose what happens next.</span>
        </h3>
        <p className="text-xs text-[#15803d] leading-relaxed">
          Builder handovers are reviewed from Overview and kept permanently here. Sharing a selected copy does not transfer ownership of the property record.
        </p>
      </div>

      {/* ── Tabs Row ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-[#dfe6ef]">
        {[
          { id: "saved", label: `Saved packs ${savedPacks.length}` },
          { id: "incoming", label: `Incoming ${incomingClaimed ? 0 : 1}`, highlight: !incomingClaimed },
          { id: "outgoing", label: "Outgoing 0" },
          { id: "history", label: "Transfer history 0" },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isActive
                  ? "bg-[#071d3b] text-white shadow-xs"
                  : "bg-white border border-[#dfe6ef] text-[#64748b] hover:text-[#102645] hover:bg-[#f8fafc]"
              }`}
            >
              <span>{tab.label}</span>
              {tab.highlight && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Tab Content Area ─────────────────────────────────────────── */}
      
      {/* 1. Saved Packs (Empty State from Image 2 or Created Packs) */}
      {activeTab === "saved" && (
        <div className="space-y-4">
          {savedPacks.length === 0 ? (
            <div className="border-2 border-dashed border-[#cbd5e1] bg-white rounded-2xl py-14 px-6 text-center flex flex-col items-center justify-center shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-[#f1f5f9] flex items-center justify-center text-[#64748b] mb-3 border border-[#cbd5e1]">
                <svg className="w-6 h-6 stroke-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
              <h4 className="text-sm font-bold text-[#102645]">
                Your saved handovers live here
              </h4>
              <p className="text-xs text-[#64748b] mt-1 max-w-sm">
                Records only leave when you choose the recipient, records and purpose.
              </p>
              <button
                onClick={() => setCreateModalOpen(true)}
                className="mt-4 px-3.5 py-1.5 bg-[#f8fafc] hover:bg-[#f1f5f9] text-xs text-[#071d3b] font-bold rounded-lg border border-[#cbd5e1] transition-colors"
              >
                + Create first record pack
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedPacks.map((pack) => (
                <div
                  key={pack.id}
                  className="bg-white border border-[#dfe6ef] rounded-xl p-4 flex flex-col justify-between shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono font-bold text-[#8b641c] bg-[#fff4df] px-2 py-0.5 rounded border border-[#ffe0a3]">
                        {pack.id}
                      </span>
                      <span className="text-[10px] font-bold text-[#24754c] bg-[#eaf5ef] px-2 py-0.5 rounded border border-[#d2e6d9]">
                        {pack.status}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#102645] mb-1">{pack.name}</h4>
                    <p className="text-xs text-[#64748b] mb-3">
                      Scoped for: <span className="text-[#102645] font-semibold">{pack.recipient}</span>
                    </p>
                    <div className="text-[11px] text-[#64748b] flex items-center gap-3">
                      <span>📄 {pack.docCount} records</span>
                      <span>⏱ Valid {pack.expiry}</span>
                      <span>📅 {pack.createdAt}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#dfe6ef] flex items-center justify-between">
                    <Link
                      href={trustlinkUrl}
                      className="text-xs font-bold text-[#071d3b] hover:underline flex items-center gap-1"
                    >
                      <span>Share in Trust Link</span>
                      <span>→</span>
                    </Link>
                    <button
                      onClick={() => alert(`Record pack ${pack.id} downloaded as verified archive.`)}
                      className="text-xs text-[#64748b] hover:text-[#102645]"
                    >
                      Download ZIP
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. Incoming Handovers (Builder handover for this property) */}
      {activeTab === "incoming" && (
        <div className="space-y-4">
          {!incomingClaimed ? (
            <div className="bg-white border border-[#dfe6ef] rounded-xl p-5 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#f1f5f9] text-[#071d3b] flex items-center justify-center flex-shrink-0 border border-[#cbd5e1] text-lg font-bold">
                    🏗️
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[9.5px] font-bold uppercase tracking-[1.4px] text-[#8b641c]">
                        BUILDER COMPLETION HANDOVER
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#fff4df] text-[#8b641c]">
                        Ready to claim
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#102645] mb-0.5">
                      Hart Homes Statutory & Construction Handover Bundle
                    </h4>
                    <p className="text-xs text-[#64748b]">
                      QBCC #150821 · Form 16 Structural, Form 43 Wet-Area Waterproofing, Architectural Drawings, and Appliance Warranties.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                  <button
                    onClick={() => {
                      setIncomingClaimed(true);
                      alert(`Handover accepted! All 14 verified documents have been placed into permanent Prop ID storage for ${property.street}.`);
                    }}
                    className="px-3.5 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg text-xs font-bold transition-colors shadow-2xs cursor-pointer"
                  >
                    Accept Handover
                  </button>
                  <button
                    onClick={() => alert("Previewing 14 statutory handover documents.")}
                    className="px-3 py-2 bg-[#f8fafc] hover:bg-[#f1f5f9] text-[#102645] rounded-lg text-xs font-semibold border border-[#cbd5e1] transition-colors"
                  >
                    Inspect records
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="border border-[#bbf7d0] bg-[#f0fdf4] rounded-xl p-6 text-center text-[#14532d]">
              <div className="text-xl mb-2">✅</div>
              <h4 className="text-sm font-bold text-[#14532d]">Handover Bundle Claimed</h4>
              <p className="text-xs text-[#15803d] mt-1 max-w-md mx-auto">
                Hart Homes builder documents are permanently logged in the {property.street} digital record and accessible for scoping anytime.
              </p>
            </div>
          )}
        </div>
      )}

      {/* 3. Outgoing Tab */}
      {activeTab === "outgoing" && (
        <div className="border border-[#dfe6ef] bg-white rounded-xl p-8 text-center shadow-2xs">
          <p className="text-xs text-[#64748b]">
            No outgoing packages currently active outside of scoped TrustLinks.
          </p>
          <p className="text-[11px] text-[#94a3b8] mt-1">
            Create a record pack to share selective documents with inspectors, tradies, or valuers.
          </p>
        </div>
      )}

      {/* 4. History Tab */}
      {activeTab === "history" && (
        <div className="border border-[#dfe6ef] bg-white rounded-xl p-6 space-y-3 shadow-2xs">
          <div className="text-xs font-bold text-[#102645]">Digital Record Chain of Custody</div>
          <div className="space-y-2 text-[11px] text-[#64748b]">
            <div className="flex items-center justify-between py-1.5 border-b border-[#dfe6ef]">
              <span>Prop ID Verified Record Registered</span>
              <span className="font-mono text-[#94a3b8]">2024-03-12 · TPH System</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-[#dfe6ef]">
              <span>TrustLink TL-99214-B Provisioned for {property.street}</span>
              <span className="font-mono text-[#94a3b8]">2024-03-14 · Owner Alex</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span>Digital Key Enabled for Scoped Professional Sharing</span>
              <span className="font-semibold text-[#24754c]">Active</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Professional access in Trust Link card (Light Theme) ────────── */}
      <div className="bg-white border border-[#dfe6ef] rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <h3 className="text-sm font-bold text-[#102645] mb-1">
            Professional access is managed in Trust Link
          </h3>
          <p className="text-xs text-[#64748b]">
            Create a scoped connection from a pack. Pause, revoke or communicate from Trust Link for {property.street}.
          </p>
        </div>

        {onOpenTrustLink ? (
          <button
            onClick={onOpenTrustLink}
            className="px-4 py-2 bg-[#071d3b] hover:bg-[#15345d] text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer shadow-2xs"
          >
            Open Trust Link
          </button>
        ) : (
          <Link
            href={trustlinkUrl}
            className="px-4 py-2 bg-[#071d3b] hover:bg-[#15345d] text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shadow-2xs"
          >
            Open Trust Link
          </Link>
        )}
      </div>

      {/* ── Collapsible Transfer property record (Light Theme) ─────────── */}
      <div className="bg-white border border-[#dfe6ef] rounded-xl overflow-hidden shadow-2xs transition-all">
        <button
          onClick={() => setTransferOpen(!transferOpen)}
          className="w-full p-4 sm:p-5 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-[#102645] hover:bg-[#f8fafc] transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className={`text-[10px] text-[#071d3b] transition-transform ${transferOpen ? "rotate-90" : ""}`}>
              ▶
            </span>
            <span>Transfer the property record to a new owner</span>
          </div>
          <span className="text-[11px] text-[#64748b] font-normal">
            {transferOpen ? "Hide" : "Expand"}
          </span>
        </button>

        {transferOpen && (
          <div className="px-5 pb-5 pt-1 border-t border-[#dfe6ef] space-y-4">
            <p className="text-xs text-[#64748b] leading-relaxed">
              Transferring this digital home hands over permanent title to the new owner, including statutory documents, warranties, and equipment logbooks. This is typically initiated at property settlement.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Ownership transfer initiated for ${property.street}. A verification code has been dispatched to the conveyancer.`);
                setTransferOpen(false);
              }}
              className="space-y-3 max-w-lg bg-[#f8fafc] p-4 rounded-xl border border-[#dfe6ef]"
            >
              <div>
                <label className="block text-[11px] font-bold text-[#102645] uppercase mb-1">
                  New Owner Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance"
                  className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-xs text-[#102645] placeholder-[#94a3b8] focus:outline-none focus:border-[#071d3b]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#102645] uppercase mb-1">
                  New Owner Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. eleanor.vance@example.com"
                  className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-xs text-[#102645] placeholder-[#94a3b8] focus:outline-none focus:border-[#071d3b]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#102645] uppercase mb-1">
                    Settlement Date
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-xs text-[#102645] focus:outline-none focus:border-[#071d3b]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#102645] uppercase mb-1">
                    Conveyancer Ref #
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. CNV-2024-88"
                    className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-xs text-[#102645] placeholder-[#94a3b8] focus:outline-none focus:border-[#071d3b]"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[10px] text-[#64748b]">
                  Requires two-factor authentication to finalize.
                </span>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#efbd66] hover:bg-[#dfac55] text-[#071d3b] text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-2xs"
                >
                  Initiate Transfer
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* ── Footer line ──────────────────────────────────────────────── */}
      <div className="border-t border-[#dfe6ef] pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#94a3b8]">
        <div>TPH · Your digital home.</div>
        <div>Interactive concept · Sample records · Nothing is sent</div>
      </div>

      {/* ── Create Record Pack Modal (Light Theme) ───────────────────── */}
      {createModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#dfe6ef] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-[#102645]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#0284c7]">
                  NEW SCOPED PACK
                </span>
                <h3 className="text-lg font-bold text-[#102645]">Create a Record Pack</h3>
              </div>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="text-[#64748b] hover:text-[#102645] p-1 rounded-md"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePack} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-[#102645] uppercase mb-1">
                  Pack Name
                </label>
                <input
                  type="text"
                  required
                  value={newPackName}
                  onChange={(e) => setNewPackName(e.target.value)}
                  placeholder="e.g. Pre-Purchase Building & Pest Pack"
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#102645] placeholder-[#94a3b8] focus:bg-white focus:outline-none focus:border-[#071d3b]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#102645] uppercase mb-1">
                  Target Recipient / Purpose
                </label>
                <input
                  type="text"
                  value={newPackRecipient}
                  onChange={(e) => setNewPackRecipient(e.target.value)}
                  placeholder="e.g. David Miller (Miller's Inspections)"
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#102645] placeholder-[#94a3b8] focus:bg-white focus:outline-none focus:border-[#071d3b]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#102645] uppercase mb-2">
                  Select Documents to Bundle ({selectedDocs.length} selected)
                </label>
                <div className="max-h-48 overflow-y-auto space-y-1.5 p-2 bg-[#f8fafc] rounded-xl border border-[#dfe6ef]">
                  {property.documents.map((doc) => (
                    <label
                      key={doc.title}
                      className="flex items-center gap-2 p-1.5 rounded hover:bg-white cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedDocs.includes(doc.title)}
                        onChange={() => toggleDocSelection(doc.title)}
                        className="rounded border-[#cbd5e1] text-[#071d3b] focus:ring-0"
                      />
                      <span className="text-[#102645] font-medium truncate flex-1">{doc.title}</span>
                      <span className="text-[10px] text-[#64748b]">{doc.cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-[#eaf5ef] rounded-lg border border-[#d2e6d9] text-[11px] text-[#24754c]">
                🛡️ Scoped access allows viewing selected files through TrustLink without transferring ownership or exposing your private notes.
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 bg-transparent hover:bg-slate-100 text-[#64748b] rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#10b981] hover:bg-[#059669] text-white font-bold rounded-lg transition-colors cursor-pointer shadow-2xs"
                >
                  Generate Pack
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
