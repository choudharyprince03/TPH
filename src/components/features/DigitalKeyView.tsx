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
    <div className="space-y-6 text-white font-sans max-w-[1040px] mx-auto pb-12">
      
      {/* ── Page Header Block ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pt-1">
        <div>
          <div className="text-[10.5px] font-bold uppercase tracking-[2px] text-[#38bdf8] mb-1">
            YOUR RECORDS. YOUR DECISION.
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-1.5">
            Digital Key
          </h1>
          <p className="text-[13px] text-[#8aa1b9]">
            Receive, keep and move the records you control for {property.street}.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="self-start sm:self-auto px-4 py-2 rounded-full bg-[#a7f3d0] hover:bg-[#86efac] text-[#064e3b] font-bold text-xs transition-colors shadow-sm cursor-pointer flex items-center gap-1.5"
        >
          <span className="text-base leading-none">+</span>
          <span>Create a record pack</span>
        </button>
      </div>

      {/* ── Handover Info Banner ─────────────────────────────────────── */}
      <div className="border border-[#14424e] bg-[#071e2e]/90 rounded-xl p-4 sm:p-5 shadow-xs">
        <h3 className="text-sm font-semibold text-white mb-1">
          Handover stays here until you choose what happens next.
        </h3>
        <p className="text-xs text-[#859eb8] leading-relaxed">
          Builder handovers are reviewed from Overview and kept permanently here. Sharing a selected copy does not transfer ownership of the property record.
        </p>
      </div>

      {/* ── Tabs Row ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-[#142d45]">
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
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isActive
                  ? "bg-[#0e2c45] border border-[#225076] text-white shadow-xs"
                  : "text-[#7d94aa] hover:text-white hover:bg-white/[0.04] border border-transparent"
              }`}
            >
              <span>{tab.label}</span>
              {tab.highlight && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
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
            <div className="border-2 border-dashed border-[#173452] bg-[#07192d]/40 rounded-2xl py-14 px-6 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-xl bg-[#0e263d] flex items-center justify-center text-[#43678c] mb-3 border border-[#1a3d60]">
                <svg className="w-6 h-6 stroke-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
              <h4 className="text-sm font-semibold text-slate-200">
                Your saved handovers live here
              </h4>
              <p className="text-xs text-[#6e859f] mt-1 max-w-sm">
                Records only leave when you choose the recipient, records and purpose.
              </p>
              <button
                onClick={() => setCreateModalOpen(true)}
                className="mt-4 px-3.5 py-1.5 bg-[#122e49] hover:bg-[#1a3f64] text-xs text-[#93c5fd] font-semibold rounded-lg border border-[#214b73] transition-colors"
              >
                + Create first record pack
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedPacks.map((pack) => (
                <div
                  key={pack.id}
                  className="bg-[#092036] border border-[#173859] rounded-xl p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono font-bold text-[#efbd66] bg-[#efbd66]/10 px-2 py-0.5 rounded border border-[#efbd66]/20">
                        {pack.id}
                      </span>
                      <span className="text-[10px] font-bold text-[#6ee7b7] bg-[#064e3b]/60 px-2 py-0.5 rounded border border-[#047857]/40">
                        {pack.status}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">{pack.name}</h4>
                    <p className="text-xs text-[#8aa1b8] mb-3">
                      Scoped for: <span className="text-slate-200 font-medium">{pack.recipient}</span>
                    </p>
                    <div className="text-[11px] text-[#6e859e] flex items-center gap-3">
                      <span>📄 {pack.docCount} records</span>
                      <span>⏱ Valid {pack.expiry}</span>
                      <span>📅 {pack.createdAt}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#142d45] flex items-center justify-between">
                    <Link
                      href={trustlinkUrl}
                      className="text-xs font-semibold text-[#38bdf8] hover:underline flex items-center gap-1"
                    >
                      <span>Share in Trust Link</span>
                      <span>→</span>
                    </Link>
                    <button
                      onClick={() => alert(`Record pack ${pack.id} downloaded as encrypted archive.`)}
                      className="text-xs text-[#8aa1b8] hover:text-white"
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
            <div className="bg-[#092036] border border-[#173859] rounded-xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#0d2a45] text-[#38bdf8] flex items-center justify-center flex-shrink-0 border border-[#1d4668] text-lg font-bold">
                    🏗️
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[9.5px] font-bold uppercase tracking-[1.4px] text-[#efbd66]">
                        BUILDER COMPLETION HANDOVER
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#fff4df] text-[#8b641c]">
                        Ready to claim
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-0.5">
                      Hart Homes Statutory & Construction Handover Bundle
                    </h4>
                    <p className="text-xs text-[#8aa1b8]">
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
                    className="px-3.5 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
                  >
                    Accept Handover
                  </button>
                  <button
                    onClick={() => alert("Previewing 14 statutory handover documents.")}
                    className="px-3 py-2 bg-[#0e2741] hover:bg-[#143454] text-[#8ea8c4] hover:text-white rounded-lg text-xs font-semibold border border-[#1c3e62] transition-colors"
                  >
                    Inspect records
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="border border-[#143b35] bg-[#062621]/40 rounded-xl p-6 text-center">
              <div className="text-xl mb-2">✅</div>
              <h4 className="text-sm font-bold text-[#6ee7b7]">Handover Bundle Claimed</h4>
              <p className="text-xs text-[#a7f3d0]/80 mt-1 max-w-md mx-auto">
                Hart Homes builder documents are permanently logged in the {property.street} digital record and accessible for scoping anytime.
              </p>
            </div>
          )}
        </div>
      )}

      {/* 3. Outgoing Tab */}
      {activeTab === "outgoing" && (
        <div className="border border-[#163350] bg-[#07192d]/40 rounded-xl p-8 text-center">
          <p className="text-xs text-[#8aa1b8]">
            No outgoing packages currently active outside of scoped TrustLinks.
          </p>
          <p className="text-[11px] text-[#5b738e] mt-1">
            Create a record pack to share selective documents with inspectors, tradies, or valuers.
          </p>
        </div>
      )}

      {/* 4. History Tab */}
      {activeTab === "history" && (
        <div className="border border-[#163350] bg-[#07192d]/40 rounded-xl p-6 space-y-3">
          <div className="text-xs font-bold text-slate-200">Digital Record Chain of Custody</div>
          <div className="space-y-2 text-[11px] text-[#7d97b2]">
            <div className="flex items-center justify-between py-1.5 border-b border-[#142d45]">
              <span>Prop ID Verified Record Registered</span>
              <span className="font-mono text-[#5b738e]">2024-03-12 · TPH System</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-[#142d45]">
              <span>TrustLink TL-99214-B Provisioned for {property.street}</span>
              <span className="font-mono text-[#5b738e]">2024-03-14 · Owner Alex</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span>Digital Key Enabled for Scoped Professional Sharing</span>
              <span className="font-mono text-[#10b981]">Active</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Professional access in Trust Link card (from Image 2) ────────── */}
      <div className="bg-[#0a2037] border border-[#173859] rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-white mb-1">
            Professional access is managed in Trust Link
          </h3>
          <p className="text-xs text-[#829bb5]">
            Create a scoped connection from a pack. Pause, revoke or communicate from Trust Link for {property.street}.
          </p>
        </div>

        {onOpenTrustLink ? (
          <button
            onClick={onOpenTrustLink}
            className="px-4 py-2 bg-[#102a46] hover:bg-[#183c63] text-white border border-[#254f76] rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <span>🛡️ Open Trust Link</span>
            <span>→</span>
          </button>
        ) : (
          <Link
            href={trustlinkUrl}
            className="px-4 py-2 bg-[#102a46] hover:bg-[#183c63] text-white border border-[#254f76] rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <span>🛡️ Open Trust Link</span>
            <span>→</span>
          </Link>
        )}
      </div>

      {/* ── Collapsible Transfer property record (from Image 2) ───────── */}
      <div className="bg-[#0a2037] border border-[#173859] rounded-xl overflow-hidden transition-all">
        <button
          onClick={() => setTransferOpen(!transferOpen)}
          className="w-full p-4 sm:p-5 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-200 hover:text-white transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className={`text-[10px] text-[#38bdf8] transition-transform ${transferOpen ? "rotate-90" : ""}`}>
              ▶
            </span>
            <span>Transfer the property record to a new owner</span>
          </div>
          <span className="text-[11px] text-[#6a849f] font-normal">
            {transferOpen ? "Hide" : "Expand"}
          </span>
        </button>

        {transferOpen && (
          <div className="px-5 pb-5 pt-1 border-t border-[#132c45] space-y-4">
            <p className="text-xs text-[#8aa1b8] leading-relaxed">
              Transferring this digital home hands over permanent title to the new owner, including statutory documents, warranties, and equipment logbooks. This is typically initiated at property settlement.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Ownership transfer initiated for ${property.street}. A verification code has been dispatched to the conveyancer.`);
                setTransferOpen(false);
              }}
              className="space-y-3 max-w-lg bg-[#07192d] p-4 rounded-xl border border-[#163554]"
            >
              <div>
                <label className="block text-[11px] font-bold text-[#8aa1b8] uppercase mb-1">
                  New Owner Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance"
                  className="w-full bg-[#0b2138] border border-[#1a3d60] rounded-lg px-3 py-2 text-xs text-white placeholder-[#506c88] focus:outline-none focus:border-[#38bdf8]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#8aa1b8] uppercase mb-1">
                  New Owner Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. eleanor.vance@example.com"
                  className="w-full bg-[#0b2138] border border-[#1a3d60] rounded-lg px-3 py-2 text-xs text-white placeholder-[#506c88] focus:outline-none focus:border-[#38bdf8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#8aa1b8] uppercase mb-1">
                    Settlement Date
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full bg-[#0b2138] border border-[#1a3d60] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#8aa1b8] uppercase mb-1">
                    Conveyancer Ref #
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. CNV-2024-88"
                    className="w-full bg-[#0b2138] border border-[#1a3d60] rounded-lg px-3 py-2 text-xs text-white placeholder-[#506c88] focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[10px] text-[#5e7792]">
                  Requires two-factor authentication to finalize.
                </span>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#efbd66] hover:bg-[#dfac55] text-[#071d3b] text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Initiate Transfer
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* ── Footer line (from Image 2) ───────────────────────────────── */}
      <div className="border-t border-[#11273f] pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#516b84]">
        <div>TPH · Your digital home.</div>
        <div>Interactive concept · Sample records · Nothing is sent</div>
      </div>

      {/* ── Create Record Pack Modal ─────────────────────────────────── */}
      {createModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#091f36] border border-[#1a3f64] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#38bdf8]">
                  NEW SCOPED PACK
                </span>
                <h3 className="text-lg font-bold text-white">Create a Record Pack</h3>
              </div>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="text-[#6d88a4] hover:text-white p-1 rounded-md"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePack} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-[#8ba2ba] uppercase mb-1">
                  Pack Name
                </label>
                <input
                  type="text"
                  required
                  value={newPackName}
                  onChange={(e) => setNewPackName(e.target.value)}
                  placeholder="e.g. Pre-Purchase Building & Pest Pack"
                  className="w-full bg-[#07182c] border border-[#183c60] rounded-lg px-3 py-2 text-white placeholder-[#4b6887] focus:outline-none focus:border-[#38bdf8]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#8ba2ba] uppercase mb-1">
                  Target Recipient / Purpose
                </label>
                <input
                  type="text"
                  value={newPackRecipient}
                  onChange={(e) => setNewPackRecipient(e.target.value)}
                  placeholder="e.g. David Miller (Miller's Inspections)"
                  className="w-full bg-[#07182c] border border-[#183c60] rounded-lg px-3 py-2 text-white placeholder-[#4b6887] focus:outline-none focus:border-[#38bdf8]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#8ba2ba] uppercase mb-2">
                  Select Documents to Bundle ({selectedDocs.length} selected)
                </label>
                <div className="max-h-48 overflow-y-auto space-y-1.5 p-2 bg-[#07182c] rounded-xl border border-[#163554]">
                  {property.documents.map((doc) => (
                    <label
                      key={doc.title}
                      className="flex items-center gap-2 p-1.5 rounded hover:bg-[#0d2742] cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedDocs.includes(doc.title)}
                        onChange={() => toggleDocSelection(doc.title)}
                        className="rounded border-[#1a3e62] bg-[#0a1e34] text-[#38bdf8] focus:ring-0"
                      />
                      <span className="text-white truncate flex-1">{doc.title}</span>
                      <span className="text-[10px] text-[#6b859f]">{doc.cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-[#071b30] rounded-lg border border-[#143250] text-[11px] text-[#7ea0be]">
                🛡️ Scoped access allows viewing selected files through TrustLink without transferring ownership or exposing your private notes.
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 bg-transparent hover:bg-white/5 text-[#8aa1b8] rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#a7f3d0] hover:bg-[#86efac] text-[#064e3b] font-bold rounded-lg transition-colors cursor-pointer"
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
