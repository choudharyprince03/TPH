"use client";
import React, { useState } from "react";
import Link from "next/link";

interface PropertyRecord {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  propId: string;
  property: string;
  suburb: string;
  soilClass: string;
  lotPlan: string;
  contractValue: string;
  stage: string;
  stageProgress: number;
  statutoryStatus: string;
  trustlinkId: string;
  trustlinkStatus: "Active" | "Handover Ready" | "Settled";
}

const PROPERTY_RECORDS: PropertyRecord[] = [
  {
    id: "PR-101",
    name: "Alex & Emily",
    initials: "AE",
    email: "alex.emily@example.com",
    phone: "+61 412 890 234",
    propId: "TPH-KEN-018",
    property: "18 Banksia Crescent",
    suburb: "Kenmore QLD 4069",
    soilClass: "Class M (Slab on Ground)",
    lotPlan: "Lot 82 on SP 241092",
    contractValue: "$1,180,000 AUD",
    stage: "Practical Completion & Handover",
    stageProgress: 92,
    statutoryStatus: "Form 16 & 43 Cleared",
    trustlinkId: "welcome",
    trustlinkStatus: "Handover Ready",
  },
  {
    id: "PR-102",
    name: "Sofia Nguyen",
    initials: "SN",
    email: "s.nguyen@example.com.au",
    phone: "+61 423 555 781",
    propId: "TPH-GRV-007",
    property: "7 Cedar Street",
    suburb: "Graceville QLD 4075",
    soilClass: "Class H1 (Piers & Strip Footings)",
    lotPlan: "Lot 12 on RP 48102",
    contractValue: "$940,000 AUD",
    stage: "Fixing & Cabinetry Fit-out",
    stageProgress: 65,
    statutoryStatus: "Frame Inspection Cert Verified",
    trustlinkId: "TL-88301-A",
    trustlinkStatus: "Active",
  },
  {
    id: "PR-103",
    name: "Noah & Mia Wilson",
    initials: "NW",
    email: "noah.wilson@example.com",
    phone: "+61 401 223 908",
    propId: "TPH-BRK-042",
    property: "42 Ridge Road",
    suburb: "Brookfield QLD 4069",
    soilClass: "Class S (Stable Rock)",
    lotPlan: "Lot 5 on SP 182301",
    contractValue: "$1,450,000 AUD",
    stage: "Post-Handover Warranty Care",
    stageProgress: 100,
    statutoryStatus: "Form 21 Final Certificate Archived",
    trustlinkId: "TL-76100-C",
    trustlinkStatus: "Settled",
  },
];

export default function ProPropertyDataPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = PROPERTY_RECORDS.filter((p) => {
    if (filter === "Handover" && p.trustlinkStatus !== "Handover Ready") return false;
    if (filter === "Active" && p.trustlinkStatus !== "Active") return false;
    if (filter === "Settled" && p.trustlinkStatus !== "Settled") return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.property.toLowerCase().includes(q) ||
        p.propId.toLowerCase().includes(q) ||
        p.suburb.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="p-6 sm:p-9 lg:p-11 max-w-[1240px] w-full font-sans">

      {/* ── Page Header ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <div className="text-[9px] font-bold uppercase tracking-[1.4px] text-[#24754c] mb-1">
            Data &amp; Lead Management (DLM) · Hart Homes
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.8px] text-[#102645]">
            Property Data &amp; Clients
          </h1>
          <p className="text-[13px] text-[#68788e] mt-1">
            Connected property passports, cadastral Lot/Plan titles, soil records, and statutory certificates.
          </p>
        </div>

        <button
          onClick={() => alert("Link Property: Enter client name, site address, and attach to a new Prop ID.")}
          className="px-4 py-2.5 bg-[#071d3b] hover:bg-[#102d59] text-white rounded-xl text-[12px] font-semibold transition-colors shadow-sm self-start sm:self-auto"
        >
          + Link New Property Record
        </button>
      </div>

      {/* ── Summary Counters ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm">
          <span className="text-3xl font-bold tracking-tight text-[#102645] block mb-0.5">{PROPERTY_RECORDS.length}</span>
          <strong className="text-[13px] text-[#102645] block">Connected Properties</strong>
          <small className="text-[11px] text-[#68788e]">All linked via sovereign Prop IDs</small>
        </div>

        <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm">
          <span className="text-3xl font-bold tracking-tight text-[#8b641c] block mb-0.5">1</span>
          <strong className="text-[13px] text-[#102645] block">Handover Ready</strong>
          <small className="text-[11px] text-[#68788e]">18 Banksia Crescent, Kenmore</small>
        </div>

        <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm">
          <span className="text-3xl font-bold tracking-tight text-[#24754c] block mb-0.5">100%</span>
          <strong className="text-[13px] text-[#102645] block">QBCC Compliance</strong>
          <small className="text-[11px] text-[#68788e]">Statutory Form 16/43 certs registered</small>
        </div>
      </div>

      {/* ── Filter Chips & Search ────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: "All", label: "All Properties" },
            { id: "Handover", label: "Handover Ready" },
            { id: "Active", label: "Under Construction" },
            { id: "Settled", label: "Settled / Warranty" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all whitespace-nowrap ${
                filter === f.id
                  ? "bg-[#071d3b] text-white font-semibold shadow-sm"
                  : "bg-white border border-[#dfe6ef] text-[#68788e] hover:bg-[#f3f6fb]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client, Prop ID, or suburb..."
            className="w-full bg-white border border-[#dfe6ef] rounded-xl px-3.5 py-2 text-[12px] text-[#102645] focus:outline-none"
          />
        </div>
      </div>

      {/* ── Property Data Cards ─────────────────────────────────────── */}
      <div className="space-y-4 mb-10">
        {filtered.map((record) => (
          <article
            key={record.id}
            className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:shadow-md transition-shadow"
          >
            {/* Left: Property & Client Identity */}
            <div className="flex items-start gap-4 min-w-0 max-w-xl">
              <div className="w-12 h-12 rounded-xl bg-[#e6eaf3] text-[#425b7c] font-serif font-bold text-lg flex items-center justify-center flex-shrink-0">
                {record.initials}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="text-base font-bold text-[#102645]">
                    {record.property}, {record.suburb}
                  </h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    record.trustlinkStatus === "Handover Ready"
                      ? "bg-[#fff4df] text-[#8b641c]"
                      : record.trustlinkStatus === "Active"
                      ? "bg-[#eaf5ef] text-[#24754c]"
                      : "bg-[#f3f6fb] text-[#68788e]"
                  }`}>
                    {record.trustlinkStatus}
                  </span>
                </div>

                <p className="text-[12px] text-[#68788e] mt-0.5">
                  Client: <strong className="text-[#102645]">{record.name}</strong> · Contract: <span className="font-semibold text-[#102645]">{record.contractValue}</span>
                </p>

                {/* Property Data Badges */}
                <div className="flex items-center gap-2 flex-wrap mt-2.5 text-[11px]">
                  <span className="font-mono font-bold text-[#071d3b] bg-[#f3f6fb] px-2 py-0.5 rounded">
                    📍 {record.propId}
                  </span>
                  <span className="bg-[#f3f6fb] text-[#556b83] px-2 py-0.5 rounded">
                    📜 {record.lotPlan}
                  </span>
                  <span className="bg-[#eaf5ef] text-[#24754c] font-medium px-2 py-0.5 rounded">
                    🌱 {record.soilClass}
                  </span>
                  <span className="bg-[#eaf5ef] text-[#24754c] font-medium px-2 py-0.5 rounded">
                    ✓ {record.statutoryStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Stage & Workspace Link */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 flex-shrink-0 border-t lg:border-t-0 pt-4 lg:pt-0 border-[#dfe6ef]">
              <div className="lg:text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#68788e] block">
                  Construction Stage
                </span>
                <span className="text-[12px] font-bold text-[#102645]">
                  {record.stage}
                </span>
                <span className="text-[11px] text-[#24754c] font-semibold block mt-0.5">
                  {record.stageProgress}% Complete
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  href={`/properties/${record.propId}`}
                  className="w-full sm:w-auto px-3.5 py-2 bg-white border border-[#cbd5e2] hover:bg-[#f3f6fb] text-[#102645] font-semibold rounded-xl text-[12px] text-center transition-colors"
                >
                  Prop ID Passport
                </Link>
                <Link
                  href={`/pro/trustlinks/${record.trustlinkId}`}
                  className="w-full sm:w-auto px-4 py-2 bg-[#071d3b] hover:bg-[#102d59] text-white font-bold rounded-xl text-[12px] text-center transition-colors shadow-sm"
                >
                  TrustLink Workspace →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}
