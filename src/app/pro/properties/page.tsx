"use client";
import React, { useState } from "react";
import Link from "next/link";

interface Project {
  id: string;
  propId: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  client: string;
  stage: string;
  progress: number;
  contractSum: string;
  targetHandover: string;
  supervisor: string;
  certifier: string;
  trustlinkId: string;
  status: "Under Construction" | "Handover Phase" | "Completed / Settled";
  badgeColor: "emerald" | "amber" | "blue";
  highlights: string[];
}

const PROJECTS: Project[] = [
  {
    id: "PRJ-018",
    propId: "TPH-KEN-018",
    address: "18 Banksia Crescent",
    suburb: "Kenmore",
    state: "QLD",
    postcode: "4069",
    client: "Emily & James Carter",
    stage: "Stage 5: Practical Completion (PCI) & Digital Handover",
    progress: 92,
    contractSum: "$1,180,000 AUD",
    targetHandover: "24 Sep 2026",
    supervisor: "Mark H. (Senior Site Supervisor)",
    certifier: "Queensland Building Certifiers Pty Ltd",
    trustlinkId: "TL-99214-B",
    status: "Handover Phase",
    badgeColor: "emerald",
    highlights: ["4 bed · 2.5 bath · 2 car", "624 m² lot", "Form 16 Structural Cleared", "1 variation sign-off pending"],
  },
  {
    id: "PRJ-007",
    propId: "TPH-GRV-007",
    address: "7 Cedar Street",
    suburb: "Graceville",
    state: "QLD",
    postcode: "4075",
    client: "Sofia Nguyen",
    stage: "Stage 4: Fixing & Cabinetry Fit-out",
    progress: 65,
    contractSum: "$940,000 AUD",
    targetHandover: "12 Feb 2027",
    supervisor: "David O'Connor",
    certifier: "Brisbane Certifiers Group",
    trustlinkId: "TL-88301-A",
    status: "Under Construction",
    badgeColor: "blue",
    highlights: ["Knockdown & Rebuild", "Flood overlay compliant", "Frame inspection passed", "Plumbing rough-in complete"],
  },
  {
    id: "PRJ-042",
    propId: "TPH-BRK-042",
    address: "42 Ridge Road",
    suburb: "Brookfield",
    state: "QLD",
    postcode: "4069",
    client: "Noah & Mia Wilson",
    stage: "Stage 6: 12-Month Defect Liability Period (DLP)",
    progress: 100,
    contractSum: "$1,650,000 AUD",
    targetHandover: "Settled 04 Sep 2026",
    supervisor: "Mark H.",
    certifier: "Queensland Building Certifiers Pty Ltd",
    trustlinkId: "TL-76100-C",
    status: "Completed / Settled",
    badgeColor: "emerald",
    highlights: ["Architectural Acreage", "Vault Transferred to Owner", "PEXA Settlement Record Verified", "Zero active defects"],
  },
  {
    id: "PRJ-029",
    propId: "TPH-TOW-029",
    address: "14 Fernberg Court",
    suburb: "Toowong",
    state: "QLD",
    postcode: "4066",
    client: "Marcus & Chloe Brody",
    stage: "Stage 3: Enclosed & Weatherproofing",
    progress: 48,
    contractSum: "$620,000 AUD",
    targetHandover: "28 Mar 2027",
    supervisor: "Liam Vance",
    certifier: "Westside Certifications",
    trustlinkId: "TL-65402-D",
    status: "Under Construction",
    badgeColor: "amber",
    highlights: ["Character Residential overlay", "Roof sheeting in progress", "Waterproofing Form 43 booked"],
  },
];

export default function ProPropertiesPage() {
  const [filter, setFilter] = useState("all");

  const filtered = PROJECTS.filter((p) => {
    if (filter === "handover") return p.status === "Handover Phase";
    if (filter === "construction") return p.status === "Under Construction";
    if (filter === "completed") return p.status === "Completed / Settled";
    return true;
  });

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="mb-8">
        <div className="text-[10px] font-bold text-verified uppercase tracking-widest mb-1.5">
          Pro Hub · Active Builds & Sites
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-1">
              Projects & Property Developments
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Track building progress across Queensland & New South Wales, manage site teams, and trigger digital handovers.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-sm hover:opacity-90 transition-all flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #0c2340, #143865)" }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16M4 12h16" />
            </svg>
            Register New Build & Prop ID
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {[
          { id: "all", label: "All Projects (4)" },
          { id: "handover", label: "Handover Ready (1)" },
          { id: "construction", label: "Under Construction (2)" },
          { id: "completed", label: "Completed & Settled (1)" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filter === f.id
                ? "bg-brand-navy text-white shadow-sm"
                : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow"
          >
            {/* Card Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-navy text-white text-[10px] font-mono font-bold tracking-wider">
                  <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m12 2 8 3v7c0 6-8 10-8 10S4 18 4 12V5Z" />
                  </svg>
                  {p.propId}
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                  p.badgeColor === "emerald"
                    ? "bg-green-100 text-green-800"
                    : p.badgeColor === "blue"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-amber-100 text-amber-800"
                }`}>
                  {p.status}
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                {p.address}
              </h2>
              <div className="text-xs text-slate-500 mt-0.5">
                {p.suburb} {p.state} {p.postcode} • Client: <span className="font-semibold text-slate-700 dark:text-slate-300">{p.client}</span>
              </div>
            </div>

            {/* Progress Section */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div className="mb-5">
                <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                  <span className="text-slate-700 dark:text-slate-200">{p.stage}</span>
                  <span className="text-brand-navy dark:text-brand-gold font-mono">{p.progress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-verified to-brand-emerald rounded-full transition-all"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>

              {/* Highlights & Metadata */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-5">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">Contract Sum</span>
                  <span className="font-bold text-slate-900 dark:text-white text-xs">{p.contractSum}</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">Target Handover</span>
                  <span className="font-bold text-slate-900 dark:text-white text-xs">{p.targetHandover}</span>
                </div>
              </div>

              <div className="space-y-1.5 mb-6">
                {p.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <svg className="w-3.5 h-3.5 text-verified flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m5 12 4 4L19 6" />
                    </svg>
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Actions Bottom Bar */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-3">
                <div className="text-[11px] text-slate-400 font-mono">
                  TrustLink: <span className="font-bold text-slate-700 dark:text-slate-300">{p.trustlinkId}</span>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/pro/trustlinks/${p.trustlinkId}`}
                    className="px-4 py-2 bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                  >
                    {p.status === "Handover Phase" ? "🎁 Digital Handover" : "Open Workspace"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
