"use client";
import React, { useState } from "react";
import Link from "next/link";

interface DocItem {
  id: string;
  title: string;
  category: "statutory" | "plans" | "trade" | "variations" | "warranties";
  categoryLabel: string;
  propId: string;
  property: string;
  client: string;
  issuer: string;
  date: string;
  status: string;
  statusColor: string;
  fileSize: string;
  isSealed: boolean;
}

const INITIAL_DOCUMENTS: DocItem[] = [
  {
    id: "DOC-901",
    title: "Form 16 — Structural Engineering Final Inspection",
    category: "statutory",
    categoryLabel: "QBCC Statutory",
    propId: "TPH-KEN-018",
    property: "18 Banksia Crescent, Kenmore",
    client: "Alex & Emily",
    issuer: "Apex Engineers (RPEQ #49102)",
    date: "14 Sep 2026",
    status: "Sealed to Vault",
    statusColor: "bg-[#eaf5ef] text-[#24754c] border-[#c2e5cb]",
    fileSize: "2.4 MB PDF",
    isSealed: true,
  },
  {
    id: "DOC-902",
    title: "Form 43 — Wet Areas Waterproofing Certificate",
    category: "statutory",
    categoryLabel: "QBCC Statutory",
    propId: "TPH-KEN-018",
    property: "18 Banksia Crescent, Kenmore",
    client: "Alex & Emily",
    issuer: "HydroSeal QLD (QBCC #1184920)",
    date: "10 Sep 2026",
    status: "Sealed to Vault",
    statusColor: "bg-[#eaf5ef] text-[#24754c] border-[#c2e5cb]",
    fileSize: "1.8 MB PDF",
    isSealed: true,
  },
  {
    id: "DOC-903",
    title: "Electrical Safety Compliance Certificate (Form 4)",
    category: "trade",
    categoryLabel: "Trade Compliance",
    propId: "TPH-KEN-018",
    property: "18 Banksia Crescent, Kenmore",
    client: "Alex & Emily",
    issuer: "Lachlan Electrical Solutions (Lic #78192)",
    date: "08 Sep 2026",
    status: "Sealed to Vault",
    statusColor: "bg-[#eaf5ef] text-[#24754c] border-[#c2e5cb]",
    fileSize: "680 KB PDF",
    isSealed: true,
  },
  {
    id: "DOC-904",
    title: "Client Variation Notice #04 — Caesarstone Upgrade",
    category: "variations",
    categoryLabel: "Variation",
    propId: "TPH-KEN-018",
    property: "18 Banksia Crescent, Kenmore",
    client: "Alex & Emily",
    issuer: "Hart Homes Contracts Team",
    date: "02 Sep 2026",
    status: "Ready to Seal",
    statusColor: "bg-[#fff4df] text-[#8b641c] border-[#fce3b8]",
    fileSize: "320 KB PDF",
    isSealed: false,
  },
  {
    id: "DOC-905",
    title: "Architectural Plans & Elevations (Issue D)",
    category: "plans",
    categoryLabel: "Plans & Specs",
    propId: "TPH-GRV-007",
    property: "7 Cedar Street, Graceville",
    client: "Sofia Nguyen",
    issuer: "Studio Pacific Architects (BOAQ #3910)",
    date: "18 Aug 2026",
    status: "Ready to Seal",
    statusColor: "bg-[#fff4df] text-[#8b641c] border-[#fce3b8]",
    fileSize: "8.4 MB PDF",
    isSealed: false,
  },
  {
    id: "DOC-906",
    title: "Form 16 — Frame Stage Structural Certifier Sign-off",
    category: "statutory",
    categoryLabel: "QBCC Statutory",
    propId: "TPH-GRV-007",
    property: "7 Cedar Street, Graceville",
    client: "Sofia Nguyen",
    issuer: "Apex Certifications (QBCC #150821)",
    date: "24 Aug 2026",
    status: "Sealed to Vault",
    statusColor: "bg-[#eaf5ef] text-[#24754c] border-[#c2e5cb]",
    fileSize: "3.1 MB PDF",
    isSealed: true,
  },
  {
    id: "DOC-907",
    title: "Form 21 — Final Certificate of Occupancy & Inspection",
    category: "statutory",
    categoryLabel: "QBCC Statutory",
    propId: "TPH-BRK-042",
    property: "42 Ridge Road, Brookfield",
    client: "Noah & Mia Wilson",
    issuer: "Brisbane Private Certifiers",
    date: "12 May 2025",
    status: "Sealed to Vault",
    statusColor: "bg-[#eaf5ef] text-[#24754c] border-[#c2e5cb]",
    fileSize: "1.9 MB PDF",
    isSealed: true,
  },
  {
    id: "DOC-908",
    title: "30-Year Colorbond Steel Roof Warranty Deed",
    category: "warranties",
    categoryLabel: "Warranty",
    propId: "TPH-BRK-042",
    property: "42 Ridge Road, Brookfield",
    client: "Noah & Mia Wilson",
    issuer: "BlueScope Steel Australia",
    date: "14 May 2025",
    status: "Sealed to Vault",
    statusColor: "bg-[#eaf5ef] text-[#24754c] border-[#c2e5cb]",
    fileSize: "450 KB PDF",
    isSealed: true,
  },
];

export default function ProDocumentsPage() {
  const [documents, setDocuments] = useState<DocItem[]>(INITIAL_DOCUMENTS);
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterProperty, setFilterProperty] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewDoc, setPreviewDoc] = useState<DocItem | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleSealToPropId = (doc: DocItem) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === doc.id
          ? {
              ...d,
              isSealed: true,
              status: "Sealed to Vault",
              statusColor: "bg-[#eaf5ef] text-[#24754c] border-[#c2e5cb]",
            }
          : d
      )
    );
    setToastMsg(
      `✓ Successfully sealed "${doc.title}" to ${doc.property} (${doc.propId}) permanent homeowner Vault!`
    );
    setTimeout(() => setToastMsg(null), 5000);
  };

  const filtered = documents.filter((d) => {
    if (filterCategory !== "all" && d.category !== filterCategory) return false;
    if (filterProperty !== "all" && d.propId !== filterProperty) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        d.title.toLowerCase().includes(q) ||
        d.propId.toLowerCase().includes(q) ||
        d.property.toLowerCase().includes(q) ||
        d.client.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1240px] w-full font-sans space-y-6 text-[#102645]">

      {/* ── Page Header ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-4 border-b border-[#dfe6ef]">
        <div>
          <div className="text-[9.5px] font-bold uppercase tracking-[1.4px] text-[#24754c] mb-1">
            Statutory Compliance &amp; Certifications Register · Hart Homes
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#102645]">
            Documents Register
          </h1>
          <p className="text-xs text-[#68788e] mt-1 max-w-2xl leading-relaxed">
            Statutory certificates, architectural plans, and trade compliance documents mapped to individual build sites and deposited to permanent homeowner Prop IDs.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <Link
            href="/pro/digital-key"
            className="px-3.5 py-2 bg-white border border-[#cbd5e2] hover:bg-[#f3f6fb] text-[#102645] rounded-xl text-xs font-semibold transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <span>🔑</span>
            <span>Digital Key Handover</span>
          </Link>
          <button
            onClick={() =>
              alert(
                "Upload Document: Select statutory Form 16/43, trade compliance cert, or warranty schedule to assign to a specific property."
              )
            }
            className="px-4 py-2 bg-[#071d3b] hover:bg-[#102d59] text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
          >
            + Upload Document
          </button>
        </div>
      </div>


      {/* ── Toast Notification when Document is Sealed ─────────────── */}
      {toastMsg && (
        <div className="p-3.5 bg-[#102645] text-white rounded-xl text-xs font-semibold shadow-lg flex items-center justify-between gap-3 animate-fade-in border border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-base">🔒</span>
            <span>{toastMsg}</span>
          </div>
          <button
            onClick={() => setToastMsg(null)}
            className="text-white/60 hover:text-white text-xs px-2 py-1 rounded"
          >
            ✕
          </button>
        </div>
      )}

      {/* ── Filter Controls: Property Filter + Category + Search ───── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-wrap bg-white border border-[#dfe6ef] rounded-2xl p-3.5 shadow-2xs">
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Property Dropdown Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-[#68788e] hidden md:inline">
              Property:
            </span>
            <div className="relative">
              <select
                id="pro-property-filter"
                value={filterProperty}
                onChange={(e) => setFilterProperty(e.target.value)}
                className="bg-[#fafbfc] border border-[#cbd5e2] hover:bg-[#f3f6fb] text-[#102645] rounded-xl px-3 py-1.5 text-xs font-semibold shadow-2xs cursor-pointer appearance-none pr-7 transition-colors"
              >
                <option value="all">All Properties ({documents.length})</option>
                <option value="TPH-KEN-018">18 Banksia Crescent (TPH-KEN-018)</option>
                <option value="TPH-GRV-007">7 Cedar Street (TPH-GRV-007)</option>
                <option value="TPH-BRK-042">42 Ridge Road (TPH-BRK-042)</option>
              </select>
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#68788e] text-[9px]">
                ▼
              </span>
            </div>
          </div>

          {/* Category Dropdown Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-[#68788e] hidden md:inline">
              Category:
            </span>
            <div className="relative">
              <select
                id="pro-docs-filter"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-[#fafbfc] border border-[#cbd5e2] hover:bg-[#f3f6fb] text-[#102645] rounded-xl px-3 py-1.5 text-xs font-semibold shadow-2xs cursor-pointer appearance-none pr-7 transition-colors"
              >
                <option value="all">All Categories</option>
                <option value="statutory">QBCC Statutory Certs</option>
                <option value="trade">Trade Safety (Form 4)</option>
                <option value="plans">Plans &amp; Elevations</option>
                <option value="variations">Client Variations</option>
                <option value="warranties">Warranties &amp; Care</option>
              </select>
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#68788e] text-[9px]">
                ▼
              </span>
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[220px]">
          <input
            type="text"
            placeholder="Search document title, prop ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#fafbfc] border border-[#cbd5e2] rounded-xl px-3 py-1.5 pl-8 text-xs font-medium text-[#102645] placeholder-[#94a3b8] focus:outline-none focus:border-[#071d3b] shadow-2xs"
          />
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-[#94a3b8]">
            🔍
          </span>
        </div>
      </div>

      {/* ── Document Register Table / List ──────────────────────────── */}
      <div className="bg-white border border-[#dfe6ef] rounded-2xl p-5 shadow-2xs divide-y divide-[#f0f4f8] text-[12px]">
        {filtered.length === 0 ? (
          <div className="py-8 text-center text-[#68788e] text-xs">
            No documents found matching the selected filter criteria.
          </div>
        ) : (
          filtered.map((doc) => (
            <div
              key={doc.id}
              className="py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4 first:pt-1 last:pb-1"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#f0f4f9] text-[#071d3b] flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#e2e8f0]">
                  <svg className="w-4 h-4 text-[#071d3b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <strong className="text-[#102645] text-[13px] font-bold">
                      {doc.title}
                    </strong>
                    <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-md border ${doc.statusColor}`}>
                      {doc.status}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#071d3b] bg-[#f0f4f8] px-2 py-0.5 rounded border border-[#cbd5e2]">
                      {doc.propId}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#64748b] mt-1 flex items-center gap-1.5 flex-wrap">
                    <span className="font-medium text-[#102645]">{doc.property}</span>
                    <span>·</span>
                    <span>Client: <strong className="text-[#102645]">{doc.client}</strong></span>
                    <span>·</span>
                    <span>Issuer: {doc.issuer}</span>
                    <span>·</span>
                    <span className="text-[#94a3b8]">{doc.fileSize}</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-shrink-0 self-end md:self-center">
                <button
                  type="button"
                  onClick={() => setPreviewDoc(doc)}
                  className="px-3 py-1.5 bg-[#f3f6fb] hover:bg-[#e4ecf7] text-[#071d3b] font-semibold rounded-lg text-[11px] transition-colors cursor-pointer border border-[#cbd5e2]"
                >
                  View Details
                </button>

                {doc.isSealed ? (
                  <Link
                    href={`/properties/${doc.propId}?tab=digital-key`}
                    className="px-3 py-1.5 bg-[#eaf5ef] hover:bg-[#d5ecd1] text-[#24754c] font-bold rounded-lg text-[11px] border border-[#c7e4d0] transition-colors flex items-center gap-1 shadow-2xs"
                    title={`Document is permanently deposited in ${doc.propId} Vault.`}
                  >
                    <span>✓ Sealed to {doc.propId}</span>
                    <span className="text-[10px]">↗</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSealToPropId(doc)}
                    className="px-3.5 py-1.5 bg-[#071d3b] hover:bg-[#15345d] text-white font-bold rounded-lg text-[11px] transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                    title={`Deposit this verified document into ${doc.propId}'s permanent Vault`}
                  >
                    <span>Deposit to {doc.propId}</span>
                    <span>→</span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Document Details Preview Modal ─────────────────────────── */}
      {previewDoc && (
        <div className="fixed inset-0 z-[300] bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-[#cbd5e2] text-[#102645] space-y-4">
            <div className="flex items-start justify-between gap-3 border-b border-[#dfe6ef] pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#071d3b] bg-[#f0f4f8] px-2 py-0.5 rounded border border-[#cbd5e2]">
                  {previewDoc.propId} · {previewDoc.categoryLabel}
                </span>
                <h3 className="text-base font-bold text-[#102645] mt-1.5">
                  {previewDoc.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="text-[#64748b] hover:text-[#102645] text-sm p-1 rounded-md hover:bg-[#f1f5f9]"
              >
                ✕
              </button>
            </div>

            <div className="bg-[#fafbfc] border border-[#dfe6ef] rounded-xl p-3.5 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#64748b]">Bound Property:</span>
                <strong className="text-[#102645]">{previewDoc.property}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Homeowner / Client:</span>
                <strong className="text-[#102645]">{previewDoc.client}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Issuing Certifier / Specialist:</span>
                <strong className="text-[#102645]">{previewDoc.issuer}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Certificate Date:</span>
                <span className="text-[#102645]">{previewDoc.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">File Size &amp; Format:</span>
                <span className="text-[#102645]">{previewDoc.fileSize}</span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-[#e2e8f0]">
                <span className="text-[#64748b]">Vault Status:</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${previewDoc.statusColor}`}>
                  {previewDoc.status}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-[#64748b] leading-relaxed">
              This statutory record complies with the Queensland Building and Construction Commission (QBCC) standards. When deposited, it is permanently cryptographically sealed to this specific property&apos;s digital key.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#dfe6ef]">
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="px-3.5 py-1.5 bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#102645] font-semibold rounded-lg text-xs"
              >
                Close
              </button>
              <Link
                href={`/properties/${previewDoc.propId}?tab=digital-key`}
                className="px-4 py-1.5 bg-[#071d3b] hover:bg-[#15345d] text-white font-bold rounded-lg text-xs shadow-2xs flex items-center gap-1"
              >
                <span>Open in Property Digital Key</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
