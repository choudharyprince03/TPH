"use client";
import React, { useState } from "react";
import Link from "next/link";
import { PROPERTIES_LIST } from "@/lib/properties";

interface ClientKey {
  id: string;
  propId: string;
  property: string;
  suburb: string;
  client: string;
  trustlinkId: string;
  trustlinkHref: string;
  status: "Ready to Claim" | "Active & Scoped" | "Archived / Delivered";
  statusColor: string;
  docCount: number;
  highlightDocs: string[];
  lastUpdated: string;
}

const CLIENT_KEYS: ClientKey[] = [
  {
    id: "DK-KEN-018",
    propId: "TPH-KEN-018",
    property: "18 Banksia Crescent",
    suburb: "Kenmore QLD 4069",
    client: "Alex & Emily",
    trustlinkId: "TL-99214-B",
    trustlinkHref: "/pro/trustlinks/TL-99214-B",
    status: "Ready to Claim",
    statusColor: "bg-[#fff4df] text-[#8b641c]",
    docCount: 14,
    highlightDocs: [
      "QBCC Form 16 Structural Engineering Final",
      "Form 43 Wet-Area Waterproofing Certificate",
      "Termimesh Pest Barrier Warranty",
      "Architectural Working Drawings",
    ],
    lastUpdated: "Today at 10:48 AM",
  },
  {
    id: "DK-GRV-007",
    propId: "TPH-GRV-007",
    property: "7 Cedar Street",
    suburb: "Graceville QLD 4075",
    client: "Sofia Nguyen",
    trustlinkId: "TL-88301-A",
    trustlinkHref: "/pro/trustlinks/TL-88301-A",
    status: "Active & Scoped",
    statusColor: "bg-[#eaf5ef] text-[#24754c]",
    docCount: 8,
    highlightDocs: [
      "Geotechnical Soil Classification Report",
      "Slab Pre-Pour Engineering Signoff",
      "Council Development Approval",
    ],
    lastUpdated: "2 days ago",
  },
  {
    id: "DK-BRK-042",
    propId: "TPH-BRK-042",
    property: "42 Ridge Road",
    suburb: "Brookfield QLD 4069",
    client: "Noah & Mia Wilson",
    trustlinkId: "TL-76100-C",
    trustlinkHref: "/pro/trustlinks/TL-76100-C",
    status: "Archived / Delivered",
    statusColor: "bg-[#f3f6fb] text-[#68788e]",
    docCount: 22,
    highlightDocs: [
      "Full Practical Completion Handover Dossier",
      "10-Year Structural Defect Warranty",
      "Appliance Manuals & Maintenance Schedules",
    ],
    lastUpdated: "12 Sep 2026",
  },
];

export default function ProDigitalKeyPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("TPH-KEN-018");
  const [packTitle, setPackTitle] = useState("");
  const [keysList, setKeysList] = useState<ClientKey[]>(CLIENT_KEYS);

  const handleIssuePack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!packTitle.trim()) return;

    alert(`Digital Key handover pack "${packTitle}" has been sealed and dispatched to the client's Digital Key via TrustLink.`);
    setModalOpen(false);
    setPackTitle("");
  };

  return (
    <div className="p-6 sm:p-9 lg:p-11 max-w-[1240px] w-full font-sans">
      
      {/* ── Breadcrumb ── */}
      <nav className="flex items-center gap-2 text-[11px] text-[#68788e] mb-6" aria-label="Breadcrumb">
        <Link href="/pro" className="hover:text-[#102645] transition-colors">
          Pro Hub
        </Link>
        <span>/</span>
        <span className="text-[#102645] font-semibold">Digital Keys & Handover</span>
      </nav>

      {/* ── Page Header ── */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="text-[9.5px] font-bold uppercase tracking-[1.4px] text-[#24754c] mb-1">
            CLIENT RECORD GOVERNANCE
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#102645]">
            Client Digital Keys & Handover Packs
          </h1>
          <p className="text-[13px] text-[#68788e] mt-1">
            Assemble statutory compliance documents, warranties, and certificates into permanent client Digital Keys.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="self-start sm:self-auto px-4 py-2.5 bg-[#071d3b] hover:bg-[#15345d] text-white rounded-xl text-xs font-bold transition-colors shadow-2xs flex items-center gap-2 cursor-pointer"
        >
          <span>🔑</span>
          <span>+ Assemble Handover Pack</span>
        </button>
      </header>

      {/* ── Stat Tiles ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-white border border-[#dfe6ef] rounded-xl p-5 shadow-sm">
          <div className="text-[10.5px] font-bold uppercase tracking-wider text-[#68788e]">
            Active Client Digital Keys
          </div>
          <div className="text-2xl font-bold text-[#102645] mt-1">
            {keysList.length} Connected
          </div>
          <p className="text-[11px] text-[#24754c] font-semibold mt-0.5">
            Governed by active TrustLinks
          </p>
        </div>

        <div className="bg-white border border-[#dfe6ef] rounded-xl p-5 shadow-sm">
          <div className="text-[10.5px] font-bold uppercase tracking-wider text-[#68788e]">
            Pending Handover Claim
          </div>
          <div className="text-2xl font-bold text-[#8b641c] mt-1">
            1 Pack Ready
          </div>
          <p className="text-[11px] text-[#8b641c] mt-0.5">
            18 Banksia Crescent (Alex & Emily)
          </p>
        </div>

        <div className="bg-white border border-[#dfe6ef] rounded-xl p-5 shadow-sm">
          <div className="text-[10.5px] font-bold uppercase tracking-wider text-[#68788e]">
            Statutory Handover Records
          </div>
          <div className="text-2xl font-bold text-[#071d3b] mt-1">
            44 Verified Files
          </div>
          <p className="text-[11px] text-[#68788e] mt-0.5">
            Form 16, Form 43, warranties attached
          </p>
        </div>
      </div>

      {/* ── Client Digital Keys List ── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#102645]">Connected Client Properties</h2>
          <span className="text-xs text-[#68788e]">{keysList.length} total records</span>
        </div>

        <div className="space-y-4">
          {keysList.map((ck) => (
            <div
              key={ck.id}
              className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm hover:border-[#cbd5e1] transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[10.5px] font-bold px-2 py-0.5 rounded bg-[#f1f5f9] text-[#102645] border border-[#cbd5e1]">
                      {ck.id}
                    </span>
                    <span className="font-mono text-[10.5px] font-bold px-2 py-0.5 rounded bg-[#eef4ff] text-[#071d3b]">
                      {ck.propId}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${ck.statusColor}`}>
                      {ck.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#102645]">
                    {ck.property}
                  </h3>
                  <p className="text-xs text-[#68788e]">
                    {ck.suburb} · Client: <strong className="text-[#102645]">{ck.client}</strong>
                  </p>

                  <div className="pt-2">
                    <div className="text-[11px] font-bold text-[#68788e] uppercase mb-1.5">
                      Included Handover Documents ({ck.docCount} files total):
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {ck.highlightDocs.map((doc, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] bg-[#f8fafc] text-[#102645] px-2.5 py-1 rounded-md border border-[#dfe6ef] flex items-center gap-1"
                        >
                          <span>📄</span>
                          <span>{doc}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end gap-2.5 flex-shrink-0 pt-2 lg:pt-0">
                  <Link
                    href={ck.trustlinkHref}
                    className="px-4 py-2 bg-[#071d3b] hover:bg-[#15345d] text-white text-xs font-bold rounded-xl transition-colors text-center shadow-2xs flex items-center justify-center gap-1.5"
                  >
                    <span>🛡️ Manage in TrustLink</span>
                    <span>→</span>
                  </Link>
                  <button
                    onClick={() => alert(`Digital Key Dossier ${ck.id} for ${ck.property}: verified under QBCC #150821.`)}
                    className="px-4 py-2 bg-[#f8fafc] hover:bg-[#f1f5f9] text-[#102645] text-xs font-semibold rounded-xl border border-[#cbd5e1] transition-colors text-center"
                  >
                    Inspect Handover Dossier
                  </button>
                  <span className="text-[10px] text-[#8a9bb0] text-right mt-1">
                    Updated {ck.lastUpdated}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Assemble Handover Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#dfe6ef] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#24754c]">
                  STATUTORY HANDOVER BUILDER
                </span>
                <h3 className="text-lg font-bold text-[#102645]">Assemble Digital Key Pack</h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-[#68788e] hover:text-[#102645] p-1 rounded-md"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleIssuePack} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-[#102645] uppercase mb-1">
                  Target Property & Client
                </label>
                <select
                  value={selectedProperty}
                  onChange={(e) => setSelectedProperty(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#102645] font-medium focus:bg-white focus:outline-none focus:border-[#071d3b]"
                >
                  {PROPERTIES_LIST.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.street} ({p.propId}) · {p.suburb}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#102645] uppercase mb-1">
                  Pack Title
                </label>
                <input
                  type="text"
                  required
                  value={packTitle}
                  onChange={(e) => setPackTitle(e.target.value)}
                  placeholder="e.g. Practical Completion & Statutory Compliance Pack"
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#102645] placeholder-[#94a3b8] focus:bg-white focus:outline-none focus:border-[#071d3b]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#102645] uppercase mb-2">
                  Attach Statutory Forms & Certifications
                </label>
                <div className="space-y-2 p-3 bg-[#f8fafc] rounded-xl border border-[#dfe6ef]">
                  {[
                    "QBCC Form 16 Structural Engineering Final",
                    "AS 3740 Form 43 Wet-Area Waterproofing Certificate",
                    "Termimesh Termite Barrier Certificate (AS 3660.1)",
                    "Electrical Safety Certificate of Compliance",
                    "Architectural & Engineering Drawings (As-Built)",
                    "Appliance Warranties & User Manuals Schedule",
                  ].map((item, idx) => (
                    <label key={idx} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded border-[#cbd5e1] text-[#071d3b]" />
                      <span className="text-[#102645] font-medium">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-[#eaf5ef] rounded-lg border border-[#d2e6d9] text-[11px] text-[#24754c]">
                🔑 When issued, the client receives this verified pack inside their Digital Key with permanent sovereign access via TrustLink.
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-transparent hover:bg-slate-100 text-[#64748b] rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#071d3b] hover:bg-[#15345d] text-white font-bold rounded-lg transition-colors cursor-pointer shadow-2xs"
                >
                  Seal & Dispatch to Client Digital Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
