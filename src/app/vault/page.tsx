"use client";
import React, { useState } from "react";
import Link from "next/link";

const VAULT_DOCS = [
  { id: 1, category: "plans", icon: "📋", title: "Approved Building Plans", source: "Brisbane City Council", date: "15 Jan 2024", size: "4.2 MB", status: "verified" },
  { id: 2, category: "plans", icon: "📋", title: "Engineering & Structural Drawings", source: "Banksia Homes", date: "20 Jan 2024", size: "2.8 MB", status: "verified" },
  { id: 3, category: "plans", icon: "📋", title: "Electrical Plans (AS/NZS 3000)", source: "Bright Spark Electrical", date: "28 Jan 2024", size: "1.1 MB", status: "verified" },
  { id: 4, category: "certs", icon: "🔒", title: "Electrical Compliance Certificate", source: "Bright Spark Electrical", date: "10 Sep 2026", size: "0.3 MB", status: "verified" },
  { id: 5, category: "certs", icon: "🔒", title: "Final Building Inspection (QBCC)", source: "SafeCheck Inspectors", date: "12 Sep 2026", size: "1.8 MB", status: "verified" },
  { id: 6, category: "certs", icon: "🔒", title: "Certificate of Occupancy", source: "Brisbane City Council", date: "Expected 24 Sep 2026", size: "—", status: "pending" },
  { id: 7, category: "certs", icon: "🔒", title: "Pool Safety Certificate (QLD)", source: "Pool Safety Inspector", date: "Expected 24 Sep 2026", size: "—", status: "missing" },
  { id: 8, category: "warranties", icon: "🛠️", title: "Structural Warranty (7 years)", source: "Banksia Homes · QBCC", date: "24 Sep 2026", size: "0.2 MB", status: "pending" },
  { id: 9, category: "warranties", icon: "🛠️", title: "Kitchen Appliance Warranty Pack", source: "Bosch Home Appliances", date: "Expected 24 Sep 2026", size: "—", status: "pending" },
  { id: 10, category: "warranties", icon: "🛠️", title: "Roofing Materials Warranty (30yr)", source: "Colorbond · BlueScope Steel", date: "Expected 24 Sep 2026", size: "—", status: "pending" },
  { id: 11, category: "settlement", icon: "⚖️", title: "Contract of Sale", source: "Chen & Associates", date: "03 Jan 2024", size: "1.4 MB", status: "verified" },
  { id: 12, category: "settlement", icon: "⚖️", title: "PEXA Workspace — Settlement Record", source: "Chen & Associates", date: "Expected 24 Sep 2026", size: "—", status: "pending" },
  { id: 13, category: "reports", icon: "🔍", title: "Building & Pest Inspection Report", source: "SafeCheck Inspectors", date: "05 Jan 2024", size: "3.1 MB", status: "verified" },
  { id: 14, category: "reports", icon: "🔍", title: "Pre-Handover Inspection Report", source: "SafeCheck Inspectors", date: "12 Sep 2026", size: "2.4 MB", status: "verified" },
];

const CATEGORIES = [
  { id: "all", label: "All Documents", icon: "📁" },
  { id: "plans", label: "Plans & Specs", icon: "📋" },
  { id: "certs", label: "Certificates", icon: "🔒" },
  { id: "warranties", label: "Warranties", icon: "🛠️" },
  { id: "settlement", label: "Settlement", icon: "⚖️" },
  { id: "reports", label: "Inspection Reports", icon: "🔍" },
];

const STATUS_STYLE: Record<string, string> = {
  verified: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  missing: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const LOGBOOK = [
  { date: "12 Sep 2026", event: "Pre-handover inspection completed", by: "SafeCheck Inspectors", type: "inspection" },
  { date: "10 Sep 2026", event: "Electrical compliance certificate issued", by: "Bright Spark Electrical", type: "certificate" },
  { date: "05 Sep 2026", event: "Internal painting completed — Dulux Whisper White throughout", by: "Banksia Homes", type: "build" },
  { date: "01 Aug 2026", event: "Kitchen fit-out completed — Bosch appliances installed", by: "Banksia Homes", type: "build" },
  { date: "15 Jun 2026", event: "Frame stage approved by certifier", by: "Brisbane City Council", type: "approval" },
  { date: "05 Jan 2024", event: "Building & pest inspection completed — clear report", by: "SafeCheck Inspectors", type: "inspection" },
  { date: "03 Jan 2024", event: "Contract of Sale executed via PEXA", by: "Chen & Associates", type: "settlement" },
];

export default function VaultPage() {
  const [category, setCategory] = useState("all");
  const [activeTab, setActiveTab] = useState<"documents" | "logbook">("documents");

  const filtered = VAULT_DOCS.filter((d) => category === "all" || d.category === category);
  const verified = VAULT_DOCS.filter((d) => d.status === "verified").length;
  const total = VAULT_DOCS.length;

  return (
    <div className="w-full flex-1 flex flex-col bg-slate-50 dark:bg-[#0a1628]">

      {/* PropID header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="text-[10px] font-bold text-verified uppercase tracking-widest mb-2">Property Vault · Prop ID</div>
              <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-1">
                18 Banksia Crescent, Kenmore QLD 4069
              </h1>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #0c2340, #0c3d2b)" }}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m12 2 8 3v7c0 6-8 10-8 10S4 18 4 12V5Z" />
                  </svg>
                  TPH-KEN-018
                </div>
                <span className="text-xs text-slate-500">4 bed · 2 bath · Built 2024</span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-verified">
                  <div className="w-1.5 h-1.5 rounded-full bg-verified animate-pulse" />
                  TrustLink Active
                </span>
              </div>
            </div>
            <button
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-all flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #0c2340, #143865)" }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Vault
            </button>
          </div>

          {/* Vault stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Total Documents", value: total, color: "text-slate-900 dark:text-white" },
              { label: "Verified", value: verified, color: "text-verified" },
              { label: "Pending / Missing", value: total - verified, color: "text-amber-600" },
              { label: "Completeness", value: `${Math.round((verified / total) * 100)}%`, color: "text-brand-navy dark:text-white" },
            ].map(({ label, value, color }) => (
              <div key={label} className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-center">
                <div className={`text-2xl font-bold ${color} mb-1`}>{value}</div>
                <div className="text-xs text-slate-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8 w-full">

        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl w-fit">
          {(["documents", "logbook"] as const).map((t) => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`px-5 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                activeTab === t ? "bg-brand-navy text-white shadow" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}>
              {t === "documents" ? "📁 Documents" : "📅 Prop Logbook"}
            </button>
          ))}
        </div>

        {activeTab === "documents" && (
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Category sidebar */}
            <div className="space-y-1">
              {CATEGORIES.map(({ id, label, icon }) => {
                const count = id === "all" ? VAULT_DOCS.length : VAULT_DOCS.filter((d) => d.category === id).length;
                return (
                  <button key={id} onClick={() => setCategory(id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      category === id
                        ? "bg-brand-navy text-white"
                        : "text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 bg-transparent"
                    }`}>
                    <div className="flex items-center gap-2">
                      <span>{icon}</span>
                      <span className="text-xs">{label}</span>
                    </div>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${category === id ? "bg-white/20" : "bg-slate-100 dark:bg-slate-700 text-slate-500"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Documents list */}
            <div className="lg:col-span-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 dark:border-slate-700">
                <div className="font-bold text-slate-900 dark:text-white text-sm">
                  {CATEGORIES.find((c) => c.id === category)?.label ?? "All Documents"}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">{filtered.length} document{filtered.length !== 1 ? "s" : ""}</div>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-700">
                {filtered.map((doc) => (
                  <div key={doc.id} className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <div className="w-10 h-11 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                      {doc.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-slate-900 dark:text-white truncate">{doc.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{doc.source}</div>
                      <div className="text-[10px] text-slate-300 dark:text-slate-500 mt-0.5">{doc.date} · {doc.size}</div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-lg capitalize ${STATUS_STYLE[doc.status]}`}>
                        {doc.status}
                      </span>
                      {doc.status === "verified" && (
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-brand-navy hover:border-brand-navy transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "logbook" && (
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 dark:border-slate-700">
              <div className="font-bold text-slate-900 dark:text-white text-sm">Prop Logbook</div>
              <div className="text-xs text-slate-500 mt-0.5">Full immutable history of every service, certificate and event attached to this property.</div>
            </div>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[28px] top-4 bottom-4 w-px bg-slate-200 dark:bg-slate-700" />
              <div className="divide-y divide-slate-100 dark:divide-slate-700">
                {LOGBOOK.map((entry, i) => {
                  const colorMap: Record<string, string> = {
                    inspection: "bg-blue-500", certificate: "bg-verified", build: "bg-brand-gold",
                    approval: "bg-purple-500", settlement: "bg-brand-navy",
                  };
                  return (
                    <div key={i} className="flex gap-4 p-5 pl-12 relative hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                      <div className={`absolute left-4 top-6 w-5 h-5 rounded-full ${colorMap[entry.type] ?? "bg-slate-400"} flex items-center justify-center z-10`}>
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-slate-900 dark:text-white">{entry.event}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{entry.by}</div>
                      </div>
                      <div className="text-xs text-slate-400 flex-shrink-0">{entry.date}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* PropID transfer notice */}
        <div className="mt-6 p-5 rounded-2xl border"
          style={{ background: "linear-gradient(135deg, #061221, #0c3d2b)", borderColor: "rgba(16,185,129,0.2)" }}>
          <div className="text-[10px] font-bold text-green-400 uppercase tracking-widest mb-2">PROP ID VAULT TRANSFER</div>
          <div className="font-bold text-white mb-1">This vault transfers with your property at resale.</div>
          <div className="text-xs text-slate-400 leading-relaxed">
            All verified documents, warranties and the full Prop Logbook will be accessible to the next owner. 
            A TrustLink transfer is initiated by your conveyancer at settlement via PEXA.
          </div>
        </div>
      </div>
    </div>
  );
}
