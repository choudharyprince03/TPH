"use client";
import Link from "next/link";
import React, { useState } from "react";

const TRUSTLINKS = [
  {
    id: "welcome",
    propId: "TPH-KEN-018",
    customer: "Alex & Emily",
    initials: "AE",
    property: "18 Banksia Crescent, Kenmore QLD",
    stage: "Digital Handover",
    status: "Handover Ready",
    statusColor: "bg-[#fff4df] text-[#8b641c]",
    updated: "34m ago",
    progress: 92,
    gates: "4 of 5 gates cleared",
  },
  {
    id: "TL-88301-A",
    propId: "TPH-GRV-007",
    customer: "Sofia Nguyen",
    initials: "SN",
    property: "7 Cedar Street, Graceville QLD",
    stage: "Structural Framing",
    status: "Active",
    statusColor: "bg-[#eaf5ef] text-[#24754c]",
    updated: "2h ago",
    progress: 45,
    gates: "2 of 5 gates cleared",
  },
  {
    id: "TL-76100-C",
    propId: "TPH-BRK-042",
    customer: "Noah & Mia Wilson",
    initials: "NW",
    property: "42 Ridge Road, Brookfield QLD",
    stage: "Aftercare & Defect Warranty",
    status: "Delivered",
    statusColor: "bg-[#f3f6fb] text-[#68788e]",
    updated: "Yesterday",
    progress: 100,
    gates: "5 of 5 gates cleared",
  },
];

const FILTERS = ["All", "Handover Ready", "Active", "Delivered"];

export default function ProTrustLinksListPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = TRUSTLINKS.filter((tl) => {
    const matchesFilter = activeFilter === "All" || tl.status === activeFilter;
    const matchesSearch =
      tl.customer.toLowerCase().includes(search.toLowerCase()) ||
      tl.property.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 sm:p-9 lg:p-11 max-w-[1240px] w-full">

      {/* ── Page Header ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <div className="text-[9px] font-bold uppercase tracking-[1.4px] text-[#24754c] mb-1">
            Builder Workspaces · Prop ID
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.8px] text-[#102645]">
            Client TrustLinks
          </h1>
          <p className="text-[13px] text-[#68788e] mt-1">
            Scoped client portals for plans, variations, defect registers, and digital handovers.
          </p>
        </div>

        <button
          onClick={() => alert("Create TrustLink: Select an approved client and attach to an existing Prop ID.")}
          className="px-4 py-2.5 bg-[#071d3b] hover:bg-[#102d59] text-white rounded-xl text-[12px] font-semibold transition-colors shadow-sm self-start sm:self-auto"
        >
          + Create Client TrustLink
        </button>
      </div>

      {/* ── Search & Filter Bar ──────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all whitespace-nowrap ${
                activeFilter === f
                  ? "bg-[#071d3b] text-white font-semibold"
                  : "bg-white border border-[#dfe6ef] text-[#68788e] hover:bg-[#f3f6fb]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client or property..."
            className="w-full bg-white border border-[#dfe6ef] rounded-xl px-3.5 py-2 text-[12px] text-[#102645] focus:outline-none"
          />
        </div>
      </div>

      {/* ── TrustLinks Grid ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {filtered.map((tl) => (
          <article
            key={tl.id}
            className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#e6eaf3] text-[#425b7c] font-serif font-bold text-base flex items-center justify-center flex-shrink-0">
                    {tl.initials}
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-[#102645] leading-tight">
                      {tl.customer}
                    </h3>
                    <small className="text-[10px] text-[#68788e] block mt-0.5">
                      {tl.propId}
                    </small>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${tl.statusColor}`}>
                  {tl.status}
                </span>
              </div>

              <div className="bg-[#f3f6fb] p-2.5 rounded-lg text-[11px] text-[#102645] mb-3">
                <span className="font-semibold block truncate">{tl.property}</span>
                <span className="text-[10px] text-[#68788e]">{tl.stage}</span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1 mb-4">
                <div className="flex justify-between text-[10px] text-[#68788e]">
                  <span>{tl.gates}</span>
                  <strong className="text-[#102645]">{tl.progress}%</strong>
                </div>
                <div className="w-full h-1.5 bg-[#dfe6ef] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#24754c] rounded-full transition-all"
                    style={{ width: `${tl.progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#dfe6ef] flex items-center justify-between text-[11px]">
              <span className="text-[10px] text-[#8a97a7]">{tl.updated}</span>
              <Link
                href={`/pro/trustlinks/${tl.id}`}
                className="px-3.5 py-1.5 bg-[#f3f6fb] hover:bg-[#e4ebf5] text-[#071d3b] font-bold rounded-lg transition-colors"
              >
                Manage Handover →
              </Link>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}
