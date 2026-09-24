"use client";
import React, { useState } from "react";
import Link from "next/link";

interface DocItem {
  id: string;
  title: string;
  category: "statutory" | "plans" | "trade" | "variations";
  categoryLabel: string;
  propId: string;
  property: string;
  client: string;
  status: string;
  statusColor: string;
  fileSize: string;
}

const DOCUMENTS: DocItem[] = [
  {
    id: "DOC-901",
    title: "Form 16 — Structural Engineering Final Inspection",
    category: "statutory",
    categoryLabel: "QBCC Statutory",
    propId: "TPH-KEN-018",
    property: "18 Banksia Crescent, Kenmore",
    client: "Alex & Emily",
    status: "Verified",
    statusColor: "bg-[#eaf5ef] text-[#24754c]",
    fileSize: "2.4 MB PDF",
  },
  {
    id: "DOC-902",
    title: "Form 43 — Wet Areas Waterproofing Certificate",
    category: "statutory",
    categoryLabel: "QBCC Statutory",
    propId: "TPH-KEN-018",
    property: "18 Banksia Crescent, Kenmore",
    client: "Alex & Emily",
    status: "Verified",
    statusColor: "bg-[#eaf5ef] text-[#24754c]",
    fileSize: "1.8 MB PDF",
  },
  {
    id: "DOC-903",
    title: "Electrical Safety Compliance Certificate (Form 4)",
    category: "trade",
    categoryLabel: "Trade Compliance",
    propId: "TPH-KEN-018",
    property: "18 Banksia Crescent, Kenmore",
    client: "Alex & Emily",
    status: "Verified",
    statusColor: "bg-[#eaf5ef] text-[#24754c]",
    fileSize: "680 KB PDF",
  },
  {
    id: "DOC-904",
    title: "Client Variation Notice #04 — Caesarstone Upgrade",
    category: "variations",
    categoryLabel: "Variation",
    propId: "TPH-KEN-018",
    property: "18 Banksia Crescent, Kenmore",
    client: "Alex & Emily",
    status: "Client Sign Pending",
    statusColor: "bg-[#fff4df] text-[#8b641c]",
    fileSize: "320 KB PDF",
  },
  {
    id: "DOC-905",
    title: "Architectural Plans & Elevations (Issue D)",
    category: "plans",
    categoryLabel: "Plans & Specs",
    propId: "TPH-GRV-007",
    property: "7 Cedar Street, Graceville",
    client: "Sofia Nguyen",
    status: "Active",
    statusColor: "bg-[#eaf5ef] text-[#24754c]",
    fileSize: "8.4 MB PDF",
  },
];

export default function ProDocumentsPage() {
  const [filter, setFilter] = useState("all");

  const filtered = DOCUMENTS.filter((d) => {
    if (filter !== "all" && d.category !== filter) return false;
    return true;
  });

  return (
    <div className="p-6 sm:p-9 lg:p-11 max-w-[1240px] w-full">

      {/* ── Page Header ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <div className="text-[9px] font-bold uppercase tracking-[1.4px] text-[#24754c] mb-1">
            Documentation &amp; Statutory Compliance
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.8px] text-[#102645]">
            Documents Register
          </h1>
          <p className="text-[13px] text-[#68788e] mt-1">
            Statutory certificates, plans, and variation notices deposited to client Prop IDs.
          </p>
        </div>

        <button
          onClick={() => alert("Upload Document: Select statutory certificate or warranty schedule.")}
          className="px-4 py-2.5 bg-[#071d3b] hover:bg-[#102d59] text-white rounded-xl text-[12px] font-semibold transition-colors shadow-sm self-start sm:self-auto"
        >
          + Upload Document
        </button>
      </div>

      {/* ── Filter Chips ────────────────────────────────────────────── */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {[
          { id: "all", label: "All Documents" },
          { id: "statutory", label: "QBCC Statutory" },
          { id: "plans", label: "Plans & Specs" },
          { id: "trade", label: "Trade Certificates" },
          { id: "variations", label: "Variations" },
        ].map((c) => (
          <button
            key={c.id}
            onClick={() => setFilter(c.id)}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all whitespace-nowrap ${
              filter === c.id
                ? "bg-[#071d3b] text-white font-semibold"
                : "bg-white border border-[#dfe6ef] text-[#68788e] hover:bg-[#f3f6fb]"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* ── Document List ───────────────────────────────────────────── */}
      <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm divide-y divide-[#dfe6ef] text-[12px] mb-10">
        {filtered.map((doc) => (
          <div key={doc.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#f0f4f9] text-[#071d3b] flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-[#071d3b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <strong className="text-[#102645] text-[13px]">{doc.title}</strong>
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${doc.statusColor}`}>
                    {doc.status}
                  </span>
                </div>
                <p className="text-[11px] text-[#68788e] mt-0.5">
                  {doc.property} · Client: <span className="text-[#102645] font-medium">{doc.client}</span> · {doc.fileSize}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
              <button
                onClick={() => alert(`Viewing document: ${doc.title}`)}
                className="px-3 py-1.5 bg-[#f3f6fb] hover:bg-[#e4ecf7] text-[#071d3b] font-semibold rounded-lg text-[11px]"
              >
                View
              </button>
              <Link
                href="/pro/trustlinks/welcome"
                className="px-3 py-1.5 bg-[#071d3b] text-white font-semibold rounded-lg text-[11px]"
              >
                Transfer to Prop ID →
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
