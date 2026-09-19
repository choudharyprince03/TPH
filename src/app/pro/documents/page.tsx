"use client";
import React, { useState } from "react";
import Link from "next/link";

interface DocItem {
  id: string;
  title: string;
  type: "cert" | "plans" | "trade" | "contract" | "variation";
  categoryLabel: string;
  propId: string;
  property: string;
  suburb: string;
  client: string;
  signee: string;
  status: "Verified & Sealed" | "Awaiting Client Sign" | "Under Review" | "Missing Evidence";
  updated: string;
  fileSize: string;
}

const DOCUMENTS: DocItem[] = [
  {
    id: "DOC-901",
    title: "Form 16 — Final Structural Engineering Inspection",
    type: "cert",
    categoryLabel: "QBCC Statutory Certificate",
    propId: "TPH-KEN-018",
    property: "18 Banksia Crescent",
    suburb: "Kenmore QLD",
    client: "Emily & James Carter",
    signee: "Inertia Structural Engineers",
    status: "Verified & Sealed",
    updated: "Yesterday, 4:20 PM",
    fileSize: "2.4 MB PDF",
  },
  {
    id: "DOC-902",
    title: "Electrical Certificate of Testing & Safety (Form 4)",
    type: "trade",
    categoryLabel: "Subcontractor Compliance",
    propId: "TPH-KEN-018",
    property: "18 Banksia Crescent",
    suburb: "Kenmore QLD",
    client: "Emily & James Carter",
    signee: "Bright Spark Electrical (Lic #84210)",
    status: "Verified & Sealed",
    updated: "10 Sep 2026",
    fileSize: "680 KB PDF",
  },
  {
    id: "DOC-903",
    title: "Client Variation Notice #04 — Kitchen Tile & Caesarstone Upgrade",
    type: "variation",
    categoryLabel: "Client Variation Schedule",
    propId: "TPH-KEN-018",
    property: "18 Banksia Crescent",
    suburb: "Kenmore QLD",
    client: "Emily & James Carter",
    signee: "Emily Carter",
    status: "Awaiting Client Sign",
    updated: "2h ago",
    fileSize: "1.1 MB PDF",
  },
  {
    id: "DOC-904",
    title: "Form 43 — Waterproofing & Wet Areas Aspect Certificate",
    type: "trade",
    categoryLabel: "Subcontractor Compliance",
    propId: "TPH-KEN-018",
    property: "18 Banksia Crescent",
    suburb: "Kenmore QLD",
    client: "Emily & James Carter",
    signee: "AquaGuard Waterproofing Pty Ltd",
    status: "Verified & Sealed",
    updated: "08 Sep 2026",
    fileSize: "1.5 MB PDF",
  },
  {
    id: "DOC-905",
    title: "Council Decision Notice & Approved Architectural Plans",
    type: "plans",
    categoryLabel: "Council Development Approval",
    propId: "TPH-GRV-007",
    property: "7 Cedar Street",
    suburb: "Graceville QLD",
    client: "Sofia Nguyen",
    signee: "Brisbane City Council",
    status: "Verified & Sealed",
    updated: "03 Aug 2026",
    fileSize: "8.6 MB PDF",
  },
  {
    id: "DOC-906",
    title: "Soil Test & Foundation Geotechnical Investigation (AS 2870)",
    type: "cert",
    categoryLabel: "Engineering & Site Reports",
    propId: "TPH-GRV-007",
    property: "7 Cedar Street",
    suburb: "Graceville QLD",
    client: "Sofia Nguyen",
    signee: "Geotech Queensland",
    status: "Verified & Sealed",
    updated: "12 May 2026",
    fileSize: "3.2 MB PDF",
  },
  {
    id: "DOC-907",
    title: "QBCC Home Warranty Insurance Certificate",
    type: "contract",
    categoryLabel: "Statutory Insurance",
    propId: "TPH-TOW-029",
    property: "14 Fernberg Court",
    suburb: "Toowong QLD",
    client: "Marcus & Chloe Brody",
    signee: "Queensland Building & Construction Commission",
    status: "Under Review",
    updated: "4 days ago",
    fileSize: "450 KB PDF",
  },
];

export default function ProDocumentsPage() {
  const [filterType, setFilterType] = useState("all");
  const [selectedProp, setSelectedProp] = useState("all");

  const filtered = DOCUMENTS.filter((doc) => {
    const matchesType = filterType === "all" || doc.type === filterType;
    const matchesProp = selectedProp === "all" || doc.propId === selectedProp;
    return matchesType && matchesProp;
  });

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <div className="text-[10px] font-bold text-verified uppercase tracking-widest mb-1.5">
          Pro Hub · Compliance & Document Vault
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-1">
              Project Documentation & Form Vault
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Australian statutory forms (QBCC Form 15/16/43), trade certificates, variations, and digital handover packs.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-navy text-white text-xs font-bold rounded-xl hover:bg-brand-navy-light transition-colors shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Upload Form / Cert
            </button>
          </div>
        </div>
      </div>

      {/* Quick summary chips */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Compliance Records", value: "38", sub: "across 4 active sites", color: "text-slate-900 dark:text-white" },
          { label: "Verified for Handover", value: "24", sub: "ready to seal into Prop ID", color: "text-verified" },
          { label: "Awaiting Client Sign", value: "2", sub: "variations pending", color: "text-amber-600" },
          { label: "Trade Certificates Due", value: "3", sub: "plumbing & certifier", color: "text-brand-gold" },
        ].map((s) => (
          <div key={s.label} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 mb-1">{s.label}</div>
            <div className={`text-2xl lg:text-3xl font-bold ${s.color} mb-0.5`}>{s.value}</div>
            <div className="text-[10px] text-slate-400">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Main Table */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            {[
              { id: "all", label: "All Documents" },
              { id: "cert", label: "QBCC Forms (15/16)" },
              { id: "trade", label: "Trade Compliance (AS/NZS)" },
              { id: "variation", label: "Client Variations" },
              { id: "plans", label: "DA/BA Plans" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                  filterType === f.id
                    ? "bg-brand-navy text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">Property:</span>
            <select
              value={selectedProp}
              onChange={(e) => setSelectedProp(e.target.value)}
              className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
            >
              <option value="all">All Properties</option>
              <option value="TPH-KEN-018">18 Banksia Cres (TPH-KEN-018)</option>
              <option value="TPH-GRV-007">7 Cedar St (TPH-GRV-007)</option>
              <option value="TPH-TOW-029">14 Fernberg Ct (TPH-TOW-029)</option>
            </select>
          </div>
        </div>

        {/* List */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filtered.map((doc) => (
            <div key={doc.id} className="p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-11 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-300 flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{doc.title}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                      {doc.categoryLabel}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Signee: <span className="font-semibold text-slate-700 dark:text-slate-300">{doc.signee}</span> • Client: {doc.client}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                    <span className="font-mono text-brand-navy dark:text-brand-gold font-bold">{doc.propId}</span>
                    <span>•</span>
                    <span>{doc.property}, {doc.suburb}</span>
                    <span>•</span>
                    <span>{doc.updated}</span>
                    <span>•</span>
                    <span>{doc.fileSize}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:flex-shrink-0 self-end sm:self-center">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                  doc.status === "Verified & Sealed"
                    ? "bg-green-100 text-green-800"
                    : doc.status === "Awaiting Client Sign"
                    ? "bg-amber-100 text-amber-800"
                    : doc.status === "Under Review"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {doc.status}
                </span>
                <button className="px-3.5 py-1.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  View PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
