"use client";
import React, { useState } from "react";
import Link from "next/link";

const PROP_SUMMARY = {
  propId: "TPH-KEN-018",
  propNum: "018",
  address: "18 Banksia Crescent",
  suburb: "Kenmore QLD 4069",
  type: "4 bed · 2 bath · 2 car · 624 m²",
  buildYear: 2024,
  progress: 88,
  activeLinks: 2,
  vaultDocs: 22,
};

const ACTIVITY = [
  { icon: "📄", title: "Electrical certificate uploaded", detail: "Bright Spark Electrical · TrustLink TL-99214-B", time: "34m ago", ok: true },
  { icon: "✅", title: "Site walkthrough completed", detail: "Banksia Homes · recorded & saved to Prop ID", time: "2h ago", ok: true },
  { icon: "⚠️", title: "Variation request requires sign-off", detail: "Tile selection change — +$1,400 impact · TL-99214-B", time: "Yesterday", ok: false },
  { icon: "📋", title: "Settlement documents ready for review", detail: "Chen & Associates Conveyancing · TrustLink TL-88301-A", time: "Yesterday", ok: false },
  { icon: "🔒", title: "Building inspection report available", detail: "SafeCheck Inspectors · uploaded to Prop ID vault", time: "3 days ago", ok: true },
];

const VAULT_CATEGORIES = [
  { icon: "📋", label: "Plans & Specs", count: 4, total: 4 },
  { icon: "🔒", label: "Certificates", count: 5, total: 6 },
  { icon: "🛠️", label: "Warranties", count: 12, total: 12 },
  { icon: "📅", label: "Service History", count: 1, total: null },
];

const PROS = [
  { initials: "BH", name: "Banksia Homes", role: "Builder", tlId: "TL-99214-B", status: "Handover Ready", color: "emerald" },
  { initials: "CA", name: "Chen & Associates", role: "Conveyancer", tlId: "TL-88301-A", status: "Docs Requested", color: "amber" },
];

const AU_SERVICES = [
  { icon: "🔍", label: "Building & Pest Inspection" },
  { icon: "⚖️", label: "Conveyancing" },
  { icon: "🤝", label: "Buyer's Agent" },
  { icon: "🏠", label: "Property Management" },
  { icon: "⚡", label: "Electrician" },
  { icon: "🏢", label: "Strata Management" },
];

export default function MyPropertyWorldPage() {
  const [tab, setTab] = useState<"overview" | "activity" | "trustlinks">("overview");

  return (
    <div className="w-full flex-1 flex flex-col bg-slate-50 dark:bg-[#0a1628]">

      {/* Hero header */}
      <div className="w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="text-[10px] font-bold text-verified uppercase tracking-widest mb-1.5">My Property World</div>
              <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-1">
                Good morning, Emily.
              </h1>
              <p className="text-sm text-slate-500">Here&apos;s your property summary for today.</p>
            </div>
            <Link href="/explore"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-all flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #0c2340, #143865)" }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16M4 12h16" />
              </svg>
              Find a Professional
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8 w-full">

        {/* PropID card */}
        <div className="rounded-2xl overflow-hidden mb-8 shadow-lg"
          style={{ background: "linear-gradient(135deg, #061221 0%, #0c2340 60%, #0c3d2b 100%)", border: "1px solid rgba(16,185,129,0.2)" }}>
          <div className="p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Prop ID</div>
                  <div className="h-px flex-1 bg-green-900/50" />
                </div>
                <div className="font-mono text-3xl font-bold text-white mb-1">{PROP_SUMMARY.propId}</div>
                <div className="text-lg font-bold text-white mb-0.5">{PROP_SUMMARY.address}</div>
                <div className="text-sm text-slate-400 mb-1">{PROP_SUMMARY.suburb}</div>
                <div className="text-xs text-slate-500">{PROP_SUMMARY.type}</div>

                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: "rgba(16,185,129,0.2)", color: "#4ade80" }}>
                    ✓ TrustLink Active
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border border-slate-700 text-slate-400">
                    Built {PROP_SUMMARY.buildYear}
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border border-slate-700 text-slate-400">
                    {PROP_SUMMARY.vaultDocs} vault documents
                  </span>
                </div>
              </div>

              {/* Progress ring */}
              <div className="flex flex-col items-center gap-2">
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
                    <circle cx="48" cy="48" r="38" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                    <circle cx="48" cy="48" r="38" fill="none" stroke="#16a34a" strokeWidth="8" strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 38}`}
                      strokeDashoffset={`${2 * Math.PI * 38 * (1 - PROP_SUMMARY.progress / 100)}`} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-white">{PROP_SUMMARY.progress}%</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs font-bold text-white">Build progress</div>
                  <div className="text-[10px] text-slate-400">Handover: 24 Sep 2026</div>
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
              {[
                { label: "Active TrustLinks", value: PROP_SUMMARY.activeLinks, color: "#4ade80" },
                { label: "Vault Documents", value: PROP_SUMMARY.vaultDocs, color: "#fff" },
                { label: "Requires Action", value: 2, color: "#fbbf24" },
                { label: "Services Completed", value: 5, color: "#94a3b8" },
              ].map(({ label, value, color }) => (
                <div key={label} className="text-center py-2">
                  <div className="text-2xl font-bold" style={{ color }}>{value}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl w-fit">
          {(["overview", "activity", "trustlinks"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                tab === t ? "bg-brand-navy text-white shadow" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}>
              {t === "trustlinks" ? "TrustLinks" : t === "activity" ? "Activity" : "Overview"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main panel */}
          <div className="lg:col-span-2 space-y-5">

            {tab === "overview" && (
              <>
                {/* Vault snapshot */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-bold text-slate-900 dark:text-white">Property Vault</h2>
                    <Link href="/vault" className="text-xs font-bold text-brand-navy dark:text-brand-gold hover:underline">
                      View all →
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {VAULT_CATEGORIES.map(({ icon, label, count, total }) => (
                      <div key={label} className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl text-center">
                        <div className="text-2xl mb-2">{icon}</div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">
                          {total ? `${count}/${total}` : `${count} events`}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{label}</div>
                        {total && (
                          <div className="mt-2 h-1 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                            <div className="h-full bg-verified rounded-full transition-all" style={{ width: `${(count / total) * 100}%` }} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requires attention */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm p-6">
                  <h2 className="font-bold text-slate-900 dark:text-white mb-5">Requires Your Attention</h2>
                  <div className="space-y-3">
                    {ACTIVITY.filter((a) => !a.ok).map((item) => (
                      <div key={item.title} className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-xl">
                        <span className="text-xl flex-shrink-0">{item.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm text-slate-900 dark:text-white">{item.title}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{item.detail}</div>
                        </div>
                        <button className="flex-shrink-0 px-3 py-1.5 border border-amber-300 text-amber-800 dark:text-amber-400 dark:border-amber-700 text-xs font-bold rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/20 transition-colors">
                          Review
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {tab === "activity" && (
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm p-6">
                <h2 className="font-bold text-slate-900 dark:text-white mb-5">Recent Activity</h2>
                <div className="space-y-0">
                  {ACTIVITY.map((item, i) => (
                    <div key={item.title} className={`flex items-start gap-3 py-4 ${i > 0 ? "border-t border-slate-100 dark:border-slate-700" : ""}`}>
                      <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-slate-900 dark:text-white">{item.title}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{item.detail}</div>
                      </div>
                      <span className="text-[10px] text-slate-400 flex-shrink-0 mt-0.5">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "trustlinks" && (
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm p-6">
                <h2 className="font-bold text-slate-900 dark:text-white mb-5">Your TrustLinks</h2>
                <div className="space-y-3">
                  {PROS.map(({ initials, name, role, tlId, status, color }) => (
                    <div key={tlId} className="flex items-center gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm text-slate-900 dark:text-white">{name}</div>
                        <div className="text-xs text-slate-400">{role} · {tlId}</div>
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${color === "emerald" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                        {status}
                      </span>
                      <Link href={`/trustlinks/${tlId}`} className="flex-shrink-0 px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        Open
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Find a Pro */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm p-5">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-4">Find a Professional</h3>
              <div className="grid grid-cols-2 gap-2">
                {AU_SERVICES.map(({ icon, label }) => (
                  <Link key={label} href="/explore"
                    className="flex flex-col items-center p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-navy dark:hover:border-verified hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all text-center">
                    <span className="text-xl mb-1">{icon}</span>
                    <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 leading-tight">{label}</span>
                  </Link>
                ))}
              </div>
              <Link href="/explore" className="block mt-3 w-full py-2.5 text-center text-xs font-bold text-brand-navy dark:text-brand-gold border border-brand-navy/20 dark:border-brand-gold/20 rounded-xl hover:bg-brand-navy/5 transition-colors">
                Browse all professionals →
              </Link>
            </div>

            {/* Quick links */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm p-5">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-3">Quick Access</h3>
              <div className="space-y-2">
                {[
                  { href: "/vault", label: "Property Vault", icon: "🔒", sub: `${PROP_SUMMARY.vaultDocs} documents` },
                  { href: "/trustlinks", label: "TrustLinks", icon: "🔗", sub: `${PROP_SUMMARY.activeLinks} active` },
                  { href: "/explore", label: "Find a Professional", icon: "🔍", sub: "12,400+ verified" },
                  { href: "/settings", label: "Account Settings", icon: "⚙️", sub: "" },
                ].map(({ href, label, icon, sub }) => (
                  <Link key={href} href={href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <span className="text-base">{icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{label}</div>
                      {sub && <div className="text-[10px] text-slate-400">{sub}</div>}
                    </div>
                    <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 18l6-6-6-6" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
