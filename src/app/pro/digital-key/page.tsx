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

  // Handover Readiness Interactive State
  const [sparkyCertVerified, setSparkyCertVerified] = useState(false);
  const [isDigitalKeySealed, setIsDigitalKeySealed] = useState(false);
  const [bannerToast, setBannerToast] = useState<string | null>(null);

  const showBannerToast = (msg: string) => {
    setBannerToast(msg);
    setTimeout(() => setBannerToast(null), 4000);
  };

  const handleIssuePack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!packTitle.trim()) return;

    showBannerToast(`Digital Key handover pack "${packTitle}" has been sealed and dispatched via TrustLink.`);
    setModalOpen(false);
    setPackTitle("");
  };

  const handleSealDigitalKey = () => {
    setIsDigitalKeySealed(true);
    showBannerToast("Digital Key successfully sealed & transferred to Alex & Emily! Sovereign passport is now live.");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1240px] w-full font-sans space-y-5">
      {/* Toast */}
      {bannerToast && (
        <div className="fixed top-5 right-5 z-50 bg-[#071d3b] text-white px-4 py-3 rounded-xl shadow-lg border border-white/10 text-xs font-semibold flex items-center gap-2 max-w-md">
          <span className="w-2 h-2 rounded-full bg-[#24754c] animate-pulse" />
          <span>{bannerToast}</span>
        </div>
      )}

      {/* ── Top Header ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-[#dfe6ef]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#24754c]">
              Pro Hub · Digital Key
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#24754c]" />
            <span className="text-[10px] text-[#5b6e84] font-medium">
              Hart Homes (QBCC #150821)
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#102645]">
            Digital Keys
          </h1>
          <p className="text-xs text-[#68788e] mt-0.5">
            Assemble statutory compliance docs, subbie certs, and warranties into permanent client property passports.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <Link
            href="/pro/tradie"
            className="px-3.5 py-1.5 bg-white border border-[#cbd5e2] hover:bg-[#f3f6fb] text-[#102645] rounded-xl text-xs font-semibold transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <span>👥</span>
            <span>Tradie Hub (SMS Certs)</span>
          </Link>
          <button
            onClick={() => setModalOpen(true)}
            className="px-3.5 py-1.5 bg-[#071d3b] hover:bg-[#15345d] text-white rounded-xl text-xs font-semibold transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>🔑</span>
            <span>+ Assemble Handover Pack</span>
          </button>
        </div>
      </div>

      {/* ── Handover Readiness Hero Meter (The Core Handover MVP) ─ */}
      <div className="bg-white border border-[#dfe6ef] rounded-2xl p-5 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 pb-3 border-b border-[#dfe6ef]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#071d3b] text-white flex items-center justify-center text-lg flex-shrink-0">
              🔑
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#102645]">
                  18 Banksia Crescent, Kenmore
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#f1f5f9] text-[#071d3b] font-mono font-bold">
                  TPH-KEN-018
                </span>
                <span className="text-xs text-[#68788e]">
                  Client: <strong className="text-[#102645]">Alex &amp; Emily</strong>
                </span>
              </div>
              <p className="text-xs text-[#5b6e84] mt-0.5">
                Practical Completion Handover · Ready to issue sovereign homeowner passport
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-auto">
            <div className="text-right">
              <div className="text-xs font-bold text-[#102645]">
                {sparkyCertVerified ? "100% Handover Ready" : "92% Handover Ready"}
              </div>
              <div className="text-[10.5px] text-[#68788e]">
                {sparkyCertVerified ? "All statutory certs verified" : "1 trade cert awaiting upload"}
              </div>
            </div>
            <div className="w-24 bg-[#f0f4f8] rounded-full h-3 border border-[#dfe6ef] overflow-hidden p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  sparkyCertVerified ? "w-full bg-[#24754c]" : "w-[92%] bg-[#efbd66]"
                }`}
              />
            </div>
          </div>
        </div>

        {/* 4-Statutory Cert Checklist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          <div className="p-3 rounded-xl bg-[#f4fbf7] border border-[#c7e3d1] text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#24754c]">✓ Waterproofing</span>
              <span className="text-[9.5px] px-1.5 py-0.2 bg-[#24754c] text-white rounded font-bold">Form 43</span>
            </div>
            <div className="text-[#102645] font-semibold text-[11px]">Miller Tiling (Dave)</div>
            <div className="text-[10px] text-[#5b6e84]">Ensuite &amp; Main Bath Sealed</div>
          </div>

          <div className="p-3 rounded-xl bg-[#f4fbf7] border border-[#c7e3d1] text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#24754c]">✓ Termite Barrier</span>
              <span className="text-[9.5px] px-1.5 py-0.2 bg-[#24754c] text-white rounded font-bold">AS 3660.1</span>
            </div>
            <div className="text-[#102645] font-semibold text-[11px]">Flick Pest Control</div>
            <div className="text-[10px] text-[#5b6e84]">50-Yr Termimesh Warranty</div>
          </div>

          <div className="p-3 rounded-xl bg-[#f4fbf7] border border-[#c7e3d1] text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#24754c]">✓ Glazing Cert</span>
              <span className="text-[9.5px] px-1.5 py-0.2 bg-[#24754c] text-white rounded font-bold">AS 1288</span>
            </div>
            <div className="text-[#102645] font-semibold text-[11px]">Brisbane Glazing</div>
            <div className="text-[10px] text-[#5b6e84]">Toughened Safety Glass</div>
          </div>

          <div
            className={`p-3 rounded-xl border text-xs space-y-1 transition-all ${
              sparkyCertVerified
                ? "bg-[#f4fbf7] border-[#c7e3d1]"
                : "bg-[#fffaf0] border-[#fce3b8]"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`font-bold ${sparkyCertVerified ? "text-[#24754c]" : "text-[#8b641c]"}`}>
                {sparkyCertVerified ? "✓ Electrical Safety" : "⏳ Electrical Safety"}
              </span>
              <span
                className={`text-[9.5px] px-1.5 py-0.2 rounded font-bold ${
                  sparkyCertVerified ? "bg-[#24754c] text-white" : "bg-[#efbd66] text-[#071d3b]"
                }`}
              >
                Form 16
              </span>
            </div>
            <div className="text-[#102645] font-semibold text-[11px]">Lachlan Electrical</div>
            <div className="text-[10px] text-[#5b6e84]">
              {sparkyCertVerified ? "Verified & Attached" : "Awaiting Tradie Upload"}
            </div>
          </div>
        </div>

        {/* Handover Action Toolbar */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            {!sparkyCertVerified ? (
              <>
                <Link
                  href="/pro/tradie"
                  className="px-3 py-1.5 bg-[#f4f6f8] hover:bg-[#e8edf2] text-[#071d3b] rounded-lg font-bold border border-[#dfe6ef] flex items-center gap-1.5 transition-colors"
                >
                  <span>📲 Ping Sparky via SMS</span>
                  <span>→</span>
                </Link>
                <button
                  onClick={() => {
                    setSparkyCertVerified(true);
                    showBannerToast("QBCC Form 16 verified! 18 Banksia Crescent is now 100% Handover Ready.");
                  }}
                  className="px-3 py-1.5 bg-white hover:bg-[#f3f6fb] text-[#24754c] rounded-lg font-bold border border-[#c7e3d1] transition-colors cursor-pointer"
                >
                  Simulate Tradie Upload (100%)
                </button>
              </>
            ) : (
              <span className="text-[#24754c] font-bold flex items-center gap-1">
                <span>✓ All 4 statutory requirements verified. Ready to issue sovereign Digital Key.</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSealDigitalKey}
              disabled={isDigitalKeySealed}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ${
                isDigitalKeySealed
                  ? "bg-[#24754c] text-white cursor-default"
                  : sparkyCertVerified
                  ? "bg-[#071d3b] hover:bg-[#15345d] text-white ring-2 ring-[#efbd66]"
                  : "bg-[#071d3b] hover:bg-[#15345d] text-white"
              }`}
            >
              <span>🔑</span>
              <span>{isDigitalKeySealed ? "✓ Sovereign Key Issued" : "Issue Sovereign Digital Key →"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Connected Client Properties List ──────────────────── */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#102645]">All Connected Client Digital Keys</h2>
          <span className="text-xs text-[#68788e]">{keysList.length} properties under governance</span>
        </div>

        <div className="space-y-3">
          {keysList.map((ck) => (
            <div
              key={ck.id}
              className="bg-white border border-[#dfe6ef] rounded-xl p-4 shadow-2xs hover:border-[#cbd5e1] transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#f1f5f9] text-[#102645] border border-[#cbd5e1]">
                      {ck.id}
                    </span>
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#eef4ff] text-[#071d3b]">
                      {ck.propId}
                    </span>
                    <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded ${ck.statusColor}`}>
                      {ck.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#102645]">
                    {ck.property}
                  </h3>
                  <p className="text-xs text-[#68788e]">
                    {ck.suburb} · Client: <strong className="text-[#102645]">{ck.client}</strong>
                  </p>

                  <div className="pt-1.5">
                    <div className="text-[10.5px] font-bold text-[#68788e] uppercase mb-1">
                      Attached Handover Docs ({ck.docCount} records):
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {ck.highlightDocs.map((doc, idx) => (
                        <span
                          key={idx}
                          className="text-[10.5px] bg-[#f8fafc] text-[#102645] px-2 py-0.5 rounded-md border border-[#dfe6ef] flex items-center gap-1"
                        >
                          <span>📄</span>
                          <span>{doc}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end gap-2 flex-shrink-0 pt-2 lg:pt-0">
                  <Link
                    href={ck.trustlinkHref}
                    className="px-3.5 py-1.5 bg-[#071d3b] hover:bg-[#15345d] text-white text-xs font-bold rounded-lg transition-colors text-center shadow-2xs flex items-center justify-center gap-1"
                  >
                    <span>🛡️ Manage in TrustLink</span>
                    <span>→</span>
                  </Link>
                  <span className="text-[10px] text-[#8a9bb0] text-right">
                    Updated {ck.lastUpdated}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Modal: Assemble Handover ──────────────────────────── */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#dfe6ef] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#dfe6ef]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#24754c]">
                  Statutory Handover Builder
                </span>
                <h3 className="text-lg font-bold text-[#102645]">Assemble Digital Key Pack</h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-7 h-7 rounded-full bg-[#f4f6f8] text-[#5b6e84] hover:bg-[#e2eaf4] flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleIssuePack} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-[#102645] mb-1">
                  Target Property &amp; Client
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
                <label className="block font-bold text-[#102645] mb-1">
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
                <label className="block font-bold text-[#102645] mb-1.5">
                  Attach Statutory Forms &amp; Certifications
                </label>
                <div className="space-y-1.5 p-3 bg-[#f8fafc] rounded-xl border border-[#dfe6ef]">
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

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-white border border-[#cbd5e2] text-[#5b6e84] rounded-xl font-semibold hover:bg-[#f4f6f8] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#071d3b] hover:bg-[#15345d] text-white font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  Seal &amp; Dispatch to Client Digital Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
