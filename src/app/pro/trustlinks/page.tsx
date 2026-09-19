"use client";
import Link from "next/link";
import React, { useState } from "react";

const TRUSTLINKS = [
  {
    id: "TL-99214-B",
    propId: "TPH-KEN-018",
    customer: "Emily & James Carter",
    initials: "EC",
    property: "18 Banksia Crescent, Kenmore QLD",
    stage: "Finishing",
    status: "Handover Ready",
    statusColor: "emerald",
    updated: "34m ago",
    progress: 88,
    handover: "24 Sep 2026",
  },
  {
    id: "TL-88301-A",
    propId: "TPH-GRV-007",
    customer: "Sofia Nguyen",
    initials: "SN",
    property: "7 Cedar Street, Graceville QLD",
    stage: "Frame",
    status: "Documents Requested",
    statusColor: "amber",
    updated: "2h ago",
    progress: 38,
    handover: "12 Feb 2027",
  },
  {
    id: "TL-76100-C",
    propId: "TPH-BRK-042",
    customer: "Noah & Mia Wilson",
    initials: "NW",
    property: "42 Ridge Road, Brookfield QLD",
    stage: "Aftercare",
    status: "Delivered",
    statusColor: "green",
    updated: "Yesterday",
    progress: 100,
    handover: "04 Sep 2026",
  },
];

const STATUS_STYLES: Record<string, string> = {
  emerald: "bg-emerald-100 text-emerald-800",
  amber: "bg-amber-100 text-amber-800",
  green: "bg-green-100 text-green-800",
  slate: "bg-slate-100 text-slate-600",
};

const FILTERS = ["All", "Active", "Handover Ready", "Documents Requested", "Delivered"];

export default function ProTrustLinksListPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = TRUSTLINKS.filter((tl) => {
    const matchesFilter = activeFilter === "All" || tl.status === activeFilter;
    const matchesSearch =
      tl.customer.toLowerCase().includes(search.toLowerCase()) ||
      tl.id.toLowerCase().includes(search.toLowerCase()) ||
      tl.propId.toLowerCase().includes(search.toLowerCase()) ||
      tl.property.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto">
      {/* Page header */}
      <div className="mb-8">
        <div className="text-[10px] font-bold text-verified uppercase tracking-widest mb-2">
          PROP ID · BUILDER WORKSPACE
        </div>
        <div className="flex justify-between items-end gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white leading-tight">
              TrustLinks
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Secure, scoped connections between your builds and your clients.
            </p>
          </div>
          <button className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-brand-navy text-white text-sm font-bold rounded-lg hover:bg-brand-navy-light transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16M4 12h16" />
            </svg>
            New TrustLink
          </button>
        </div>
      </div>

      {/* TrustLink active chip */}
      <div className="flex items-center gap-3 mb-6 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/40 rounded-xl">
        <div className="w-2 h-2 rounded-full bg-verified animate-pulse" />
        <span className="text-xs font-bold text-verified uppercase tracking-wider">TrustLink · Active</span>
        <span className="text-xs text-green-700 dark:text-green-400">
          Scoped access enabled · All 3 workspaces encrypted
        </span>
        <div className="ml-auto flex items-center gap-1 text-xs text-green-700 dark:text-green-400 font-semibold">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m12 2 8 3v7c0 6-8 10-8 10S4 18 4 12V5Z" />
          </svg>
          Permission boundaries active
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Active TrustLinks", value: "8", color: "text-brand-navy dark:text-white" },
          { label: "Handover Ready", value: "1", color: "text-emerald-600" },
          { label: "Docs Requested", value: "3", color: "text-amber-600" },
          { label: "Delivered", value: "1", color: "text-verified" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">{label}</div>
            <div className={`text-3xl font-bold ${color}`}>{value}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {FILTERS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-3 py-1.5 text-xs font-bold rounded-md whitespace-nowrap transition-colors ${
                  activeFilter === tab
                    ? "bg-brand-navy text-white"
                    : "text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 w-full sm:w-64">
            <input
              type="text"
              placeholder="Search by ID, client, Prop ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-slate-200 dark:border-slate-700 rounded-lg text-sm px-3 py-1.5 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-navy/30"
            />
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 text-[10px] uppercase tracking-widest text-slate-500 font-bold bg-white dark:bg-slate-900">
              <th className="p-4">TrustLink</th>
              <th className="p-4">Client</th>
              <th className="p-4 hidden md:table-cell">Prop ID</th>
              <th className="p-4 hidden lg:table-cell">Property</th>
              <th className="p-4">Progress</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((tl) => (
              <tr key={tl.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                {/* TrustLink ID */}
                <td className="p-4">
                  <div className="font-mono font-bold text-sm text-brand-navy dark:text-brand-gold">{tl.id}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Updated {tl.updated}</div>
                </td>
                {/* Client */}
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
                      {tl.initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">{tl.customer}</div>
                      <div className="text-[10px] text-slate-400">Handover: {tl.handover}</div>
                    </div>
                  </div>
                </td>
                {/* PropID */}
                <td className="p-4 hidden md:table-cell">
                  <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-brand-navy text-white rounded text-[10px] font-bold tracking-wider">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m12 2 8 3v7c0 6-8 10-8 10S4 18 4 12V5Z" />
                    </svg>
                    {tl.propId}
                  </div>
                </td>
                {/* Property */}
                <td className="p-4 hidden lg:table-cell">
                  <div className="text-sm text-slate-700 dark:text-slate-300 truncate max-w-[200px]">{tl.property}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{tl.stage}</div>
                </td>
                {/* Progress */}
                <td className="p-4">
                  <div className="flex items-center gap-2 min-w-[80px]">
                    <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-verified to-brand-emerald rounded-full"
                        style={{ width: `${tl.progress}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500">{tl.progress}%</span>
                  </div>
                </td>
                {/* Status */}
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${STATUS_STYLES[tl.statusColor]}`}>
                    {tl.status}
                  </span>
                </td>
                {/* Action */}
                <td className="p-4 text-right">
                  <Link
                    href={`/pro/trustlinks/${tl.id}`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 bg-brand-navy text-white text-xs font-bold rounded-lg hover:bg-brand-navy-light transition-colors"
                  >
                    Open
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16m-6-6 6 6-6 6" />
                    </svg>
                  </Link>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="p-12 text-center text-slate-400 text-sm">
                  No TrustLinks match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
