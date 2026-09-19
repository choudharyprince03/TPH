"use client";
import Link from "next/link";
import React, { useState } from "react";

const MOCK_TRUSTLINKS = [
  {
    id: "TL-99214-B",
    proName: "Banksia Homes Pty Ltd",
    proCategory: "Licensed Builder (QBCC #150821)",
    propId: "TPH-KEN-018",
    property: "18 Banksia Crescent, Kenmore QLD",
    stage: "Practical Completion & Digital Handover",
    status: "Handover Ready",
    statusColor: "emerald",
    date: "Updated 34m ago",
    badge: "Action Required",
  },
  {
    id: "TL-88301-A",
    proName: "Chen & Associates Conveyancing",
    proCategory: "Certified PEXA Conveyancers",
    propId: "TPH-KEN-018",
    property: "18 Banksia Crescent, Kenmore QLD",
    stage: "Settlement Contract & PEXA Workspace",
    status: "Active",
    statusColor: "blue",
    date: "Updated yesterday",
    badge: "2 Docs Pending",
  },
  {
    id: "TL-76100-C",
    proName: "Miller Building & Pest Inspections",
    proCategory: "Lead Inspector (AS 4349.1)",
    propId: "TPH-TOW-029",
    property: "14 Fernberg Court, Toowong QLD",
    stage: "Deliverable Ready for Vault Deposit",
    status: "Action Required",
    statusColor: "amber",
    date: "Updated 2h ago",
    badge: "Review Report",
  },
];

export default function TrustLinksListPage() {
  const [filter, setFilter] = useState("All");

  const filtered = MOCK_TRUSTLINKS.filter((tl) => {
    if (filter === "Active") return tl.status === "Active" || tl.status === "Handover Ready";
    if (filter === "Handover") return tl.status === "Handover Ready";
    if (filter === "Action Required") return tl.status === "Action Required" || tl.status === "Handover Ready";
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="text-[10px] font-bold text-verified uppercase tracking-widest mb-1.5">
            My Property World · Encrypted Connections
          </div>
          <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">
            My TrustLinks
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Scoped, sovereign workspaces connecting your Prop ID to Australian builders, conveyancers, and inspectors.
          </p>
        </div>
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-sm hover:opacity-90 transition-all flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #0c2340, #143865)" }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Find New Professional
        </Link>
      </div>

      {/* Security notice chip */}
      <div className="flex items-center gap-3 p-3.5 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/30 rounded-xl mb-6">
        <div className="w-2 h-2 rounded-full bg-verified animate-pulse flex-shrink-0" />
        <span className="text-xs font-bold text-verified uppercase tracking-wider">TrustLink Sovereignty Active</span>
        <span className="text-xs text-green-700 dark:text-green-400">
          You retain unilateral authority. You can pause or revoke access keys at any time without losing documents deposited to your Prop ID Vault.
        </span>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6">
        {["All", "Action Required", "Active", "Handover"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filter === f
                ? "bg-brand-navy text-white shadow-sm"
                : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50"
            }`}
          >
            {f === "Handover" ? "🎁 Handover Ready (1)" : f}
          </button>
        ))}
      </div>

      {/* TrustLink list */}
      <div className="grid gap-5">
        {filtered.map((tl) => (
          <div
            key={tl.id}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-brand-navy text-white">
                  {tl.id}
                </span>
                <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full ${
                  tl.statusColor === "emerald"
                    ? "bg-green-100 text-green-800"
                    : tl.statusColor === "amber"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-blue-100 text-blue-800"
                }`}>
                  {tl.status}
                </span>
                <span className="text-xs text-slate-400">{tl.date}</span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 flex-wrap mb-1">
                {tl.proName}
                <span className="text-xs font-normal text-slate-500 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-0.5">
                  {tl.proCategory}
                </span>
              </h2>

              <div className="text-xs text-slate-500 mb-3">
                📍 {tl.property}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-brand-gold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {tl.stage}
                </div>
                <div className="hidden sm:block text-slate-300">&bull;</div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600 dark:text-slate-400">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Prop ID:</span>
                  <span className="font-bold text-brand-navy dark:text-brand-gold">{tl.propId}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center sm:flex-shrink-0">
              <Link
                href={`/trustlinks/${tl.id}`}
                className="px-5 py-3 bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold rounded-xl shadow-sm transition-colors text-center"
              >
                Open Workspace →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
