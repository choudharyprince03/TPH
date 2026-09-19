"use client";
import React, { useState } from "react";
import Link from "next/link";

interface Lead {
  id: string;
  name: string;
  initials: string;
  type: string;
  suburb: string;
  state: string;
  propId: string;
  budget: string;
  financeStatus: string;
  date: string;
  status: "New" | "Contacted" | "Qualified" | "TrustLink Issued";
  statusColor: "red" | "blue" | "amber" | "emerald";
  messageSnippet: string;
}

const LEADS: Lead[] = [
  {
    id: "L-101",
    name: "James Davidson",
    initials: "JD",
    type: "New Custom Home (4 Bed, 3 Bath, Pool)",
    suburb: "Bardon",
    state: "QLD",
    propId: "TPH-BAR-019 (Land Titled)",
    budget: "$950,000 – $1,100,000 AUD",
    financeStatus: "Macquarie Bank Pre-Approved",
    date: "Today, 10:45 AM",
    status: "New",
    statusColor: "red",
    messageSnippet: "We have bought a 580m² block in Bardon with soil class H1. Looking for a high-spec builder experienced with sloping sites.",
  },
  {
    id: "L-102",
    name: "Aisha Khan",
    initials: "AK",
    type: "Knockdown & Architectural Rebuild",
    suburb: "Newstead",
    state: "QLD",
    propId: "Pending Prop ID",
    budget: "$800,000 – $950,000 AUD",
    financeStatus: "CBA Construction Loan Ready",
    date: "Yesterday, 3:20 PM",
    status: "New",
    statusColor: "red",
    messageSnippet: "Planning to demolish existing 1960s post-war cottage and build a contemporary modern home. Need council BA guidance.",
  },
  {
    id: "L-103",
    name: "Thomas Murray",
    initials: "TM",
    type: "Ground Floor Extension & Outdoor Pavilion",
    suburb: "Fig Tree Pocket",
    state: "QLD",
    propId: "TPH-FTP-004",
    budget: "$380,000 – $450,000 AUD",
    financeStatus: "Self-Funded / Cash",
    date: "2 days ago",
    status: "Qualified",
    statusColor: "amber",
    messageSnippet: "Expanding master wing and building a covered alfresco pavilion with outdoor kitchen. DA approval already in place.",
  },
  {
    id: "L-104",
    name: "Lachlan & Sophie Taylor",
    initials: "LT",
    type: "Victorian Terrace Heritage Renovation",
    suburb: "Paddington",
    state: "NSW",
    propId: "TPH-PAD-088",
    budget: "$720,000 AUD",
    financeStatus: "ANZ Wealth Pre-Approval",
    date: "4 days ago",
    status: "TrustLink Issued",
    statusColor: "emerald",
    messageSnippet: "Full internal remodel with rear glass atrium and DA compliance for heritage conservation zone.",
  },
];

export default function LeadsPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = LEADS.filter((lead) => {
    const matchesFilter =
      filter === "All" ||
      (filter === "New" && lead.status === "New") ||
      (filter === "Qualified" && lead.status === "Qualified") ||
      (filter === "TrustLink Issued" && lead.status === "TrustLink Issued");
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.suburb.toLowerCase().includes(search.toLowerCase()) ||
      lead.type.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="text-[10px] font-bold text-verified uppercase tracking-widest mb-1.5">
          Pro Hub · Client Acquisition CRM
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-1">
              Qualified Inquiries & Project Leads
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Direct homeowner inquiries across Australia with verified finance and site context.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {["All", "New", "Qualified", "TrustLink Issued"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                  filter === tab
                    ? "bg-brand-navy text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700"
                }`}
              >
                {tab === "New" ? "🔥 New Inquiries (2)" : tab}
              </button>
            ))}
          </div>
          <div className="w-full sm:w-72">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search leads by name, suburb, project..."
              className="w-full px-3.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 text-[10px] uppercase tracking-widest text-slate-500 font-bold bg-white dark:bg-slate-900">
                <th className="p-4">Customer</th>
                <th className="p-4">Inquiry / Property Scope</th>
                <th className="p-4 hidden md:table-cell">Budget & Finance</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {filtered.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {lead.initials}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white leading-snug">{lead.name}</div>
                        <div className="text-[11px] text-slate-500">{lead.suburb}, {lead.state}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{lead.date}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-slate-900 dark:text-white text-xs">{lead.type}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-1 max-w-sm mt-0.5">{lead.messageSnippet}</div>
                    <div className="text-[10px] text-brand-navy dark:text-brand-gold font-mono font-bold mt-1">
                      {lead.propId}
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <div className="font-bold text-slate-900 dark:text-white text-xs">{lead.budget}</div>
                    <div className="text-[10px] text-green-600 dark:text-green-400 font-semibold mt-0.5">
                      ✓ {lead.financeStatus}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      lead.status === "New"
                        ? "bg-red-100 text-red-700 font-bold"
                        : lead.status === "TrustLink Issued"
                        ? "bg-green-100 text-green-800"
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/pro/leads/${lead.id}`}
                      className="inline-flex items-center justify-center px-4 py-1.5 bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
                    >
                      Review Lead
                    </Link>
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
