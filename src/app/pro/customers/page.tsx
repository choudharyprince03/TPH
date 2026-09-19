"use client";
import React, { useState } from "react";
import Link from "next/link";

interface Customer {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  propId: string;
  property: string;
  suburb: string;
  projectType: string;
  contractValue: string;
  stage: string;
  stageProgress: number;
  trustlinkId: string;
  trustlinkStatus: "Active" | "Handover Ready" | "Settled" | "Awaiting Docs";
  lastContact: string;
}

const CUSTOMERS: Customer[] = [
  {
    id: "C-101",
    name: "Emily & James Carter",
    initials: "EC",
    email: "emily.carter@gmail.com",
    phone: "+61 412 890 234",
    propId: "TPH-KEN-018",
    property: "18 Banksia Crescent",
    suburb: "Kenmore QLD 4069",
    projectType: "Architectural 4-Bed Custom Build",
    contractValue: "$1,180,000 AUD",
    stage: "Practical Completion & Handover",
    stageProgress: 92,
    trustlinkId: "TL-99214-B",
    trustlinkStatus: "Handover Ready",
    lastContact: "Today, 09:15 AM",
  },
  {
    id: "C-102",
    name: "Sofia Nguyen",
    initials: "SN",
    email: "s.nguyen@outlook.com.au",
    phone: "+61 423 555 781",
    propId: "TPH-GRV-007",
    property: "7 Cedar Street",
    suburb: "Graceville QLD 4075",
    projectType: "Knockdown & Rebuild (Double Storey)",
    contractValue: "$940,000 AUD",
    stage: "Fixing & Cabinetry Stage",
    stageProgress: 65,
    trustlinkId: "TL-88301-A",
    trustlinkStatus: "Active",
    lastContact: "Yesterday, 3:30 PM",
  },
  {
    id: "C-103",
    name: "Noah & Mia Wilson",
    initials: "NW",
    email: "n.wilson@wilsonlaw.com.au",
    phone: "+61 431 209 844",
    propId: "TPH-BRK-042",
    property: "42 Ridge Road",
    suburb: "Brookfield QLD 4069",
    projectType: "Acreage Luxury Residence",
    contractValue: "$1,650,000 AUD",
    stage: "12-Month Defect Liability Period",
    stageProgress: 100,
    trustlinkId: "TL-76100-C",
    trustlinkStatus: "Settled",
    lastContact: "3 days ago",
  },
  {
    id: "C-104",
    name: "Marcus & Chloe Brody",
    initials: "MB",
    email: "marcus.brody@qantas.com.au",
    phone: "+61 408 911 200",
    propId: "TPH-TOW-029",
    property: "14 Fernberg Court",
    suburb: "Toowong QLD 4066",
    projectType: "Extensive Heritage Renovation",
    contractValue: "$620,000 AUD",
    stage: "Enclosed / Lock-up Stage",
    stageProgress: 48,
    trustlinkId: "TL-65402-D",
    trustlinkStatus: "Awaiting Docs",
    lastContact: "5 days ago",
  },
];

export default function ProCustomersPage() {
  const [search, setSearch] = useState("");
  const [filterStage, setFilterStage] = useState("All");

  const filtered = CUSTOMERS.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.propId.toLowerCase().includes(search.toLowerCase()) ||
      c.property.toLowerCase().includes(search.toLowerCase()) ||
      c.suburb.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filterStage === "All" ||
      (filterStage === "Handover" && c.trustlinkStatus === "Handover Ready") ||
      (filterStage === "Active" && c.trustlinkStatus === "Active") ||
      (filterStage === "Settled" && c.trustlinkStatus === "Settled");
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="mb-8">
        <div className="text-[10px] font-bold text-verified uppercase tracking-widest mb-1.5">
          Pro Hub · Builder CRM
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-1">
              Customer Directory & Relationships
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Manage client accounts, contract progress, QBCC claim milestones, and active TrustLinks.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-sm hover:opacity-90 transition-all flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #0c2340, #143865)" }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16M4 12h16" />
            </svg>
            Add New Client
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Active Clients", value: "8", sub: "across 4 suburbs", color: "text-brand-navy dark:text-white" },
          { label: "Total Booked Value", value: "$6.8M", sub: "AUD contracts", color: "text-emerald-600" },
          { label: "Handover Ready", value: "1", sub: "Prop ID transfer ready", color: "text-verified" },
          { label: "Open Variations", value: "3", sub: "$14,200 pending sign-off", color: "text-amber-600" },
        ].map((m) => (
          <div key={m.label} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 mb-1">{m.label}</div>
            <div className={`text-2xl lg:text-3xl font-bold ${m.color} mb-0.5`}>{m.value}</div>
            <div className="text-[10px] text-slate-400">{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Main CRM Table Container */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {["All", "Active", "Handover", "Settled"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterStage(tab)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                  filterStage === tab
                    ? "bg-brand-navy text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700"
                }`}
              >
                {tab === "Handover" ? "Handover Ready (1)" : tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 w-full sm:w-72">
            <div className="relative w-full">
              <svg className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search clients, Prop ID, suburb..."
                className="w-full pl-9 pr-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20"
              />
            </div>
          </div>
        </div>

        {/* Customer Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 text-[10px] uppercase tracking-widest text-slate-500 font-bold bg-white dark:bg-slate-900">
                <th className="p-4">Customer</th>
                <th className="p-4">Property & Prop ID</th>
                <th className="p-4 hidden md:table-cell">Contract Value</th>
                <th className="p-4">Build Stage</th>
                <th className="p-4">TrustLink</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  {/* Customer */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-brand-navy text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {c.initials}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white leading-snug">{c.name}</div>
                        <div className="text-[11px] text-slate-500">{c.phone}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">Contact: {c.lastContact}</div>
                      </div>
                    </div>
                  </td>

                  {/* Property & Prop ID */}
                  <td className="p-4">
                    <div className="font-semibold text-slate-900 dark:text-white text-xs">{c.property}</div>
                    <div className="text-[11px] text-slate-500">{c.suburb}</div>
                    <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded bg-brand-navy text-white text-[9px] font-mono font-bold tracking-wider">
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m12 2 8 3v7c0 6-8 10-8 10S4 18 4 12V5Z" />
                      </svg>
                      {c.propId}
                    </div>
                  </td>

                  {/* Contract */}
                  <td className="p-4 hidden md:table-cell">
                    <div className="font-bold text-slate-900 dark:text-white text-xs">{c.contractValue}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{c.projectType}</div>
                  </td>

                  {/* Build Stage & Progress */}
                  <td className="p-4">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">{c.stage}</div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-verified to-brand-emerald rounded-full"
                          style={{ width: `${c.stageProgress}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-slate-500">{c.stageProgress}%</span>
                    </div>
                  </td>

                  {/* TrustLink */}
                  <td className="p-4">
                    <div className="font-mono text-xs font-bold text-brand-navy dark:text-brand-gold">{c.trustlinkId}</div>
                    <span className={`inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mt-1 ${
                      c.trustlinkStatus === "Handover Ready"
                        ? "bg-emerald-100 text-emerald-800"
                        : c.trustlinkStatus === "Active"
                        ? "bg-blue-100 text-blue-800"
                        : c.trustlinkStatus === "Settled"
                        ? "bg-slate-100 text-slate-600"
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {c.trustlinkStatus}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/pro/trustlinks/${c.trustlinkId}`}
                        className="px-3 py-1.5 bg-brand-navy text-white text-xs font-bold rounded-lg hover:bg-brand-navy-light transition-colors"
                      >
                        Workspace
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
