"use client";
import React, { useState } from "react";
import Link from "next/link";

const TODAY_DATE = "Friday, 19 September 2026";

const STATS = [
  { label: "New Leads", value: 4, delta: "+2 today", color: "text-brand-navy dark:text-white", indicator: "pulse" },
  { label: "Active TrustLinks", value: 8, delta: "2 need action", color: "text-slate-900 dark:text-white", indicator: "amber" },
  { label: "Handovers Due", value: 1, delta: "24 Sep 2026", color: "text-emerald-600", indicator: "green" },
  { label: "Open Tasks", value: 6, delta: "3 overdue", color: "text-brand-gold", indicator: "none" },
];

const TRUSTLINKS = [
  { id: "TL-99214-B", propId: "TPH-KEN-018", customer: "Emily & James Carter", initials: "EC", status: "Handover Ready", statusColor: "emerald", updated: "34m ago", progress: 88 },
  { id: "TL-88301-A", propId: "TPH-GRV-007", customer: "Sofia Nguyen", initials: "SN", status: "Docs Requested", statusColor: "amber", updated: "2h ago", progress: 38 },
  { id: "TL-76100-C", propId: "TPH-BRK-042", customer: "Noah & Mia Wilson", initials: "NW", status: "Delivered", statusColor: "green", updated: "Yesterday", progress: 100 },
];

const LEADS = [
  { id: "123", initials: "JD", name: "James Davidson", intent: "New build — 4 bed, Bardon QLD", budget: "$950K–$1.1M", time: "Just now", hot: true },
  { id: "124", initials: "AK", name: "Aisha Khan", intent: "Knockdown-rebuild — Newstead QLD", budget: "$800K–$900K", time: "12m ago", hot: true },
  { id: "125", initials: "TM", name: "Thomas Murray", intent: "Extensions + renovation — Fig Tree Pocket", budget: "$320K", time: "1h ago", hot: false },
];

const ATTENTION = [
  {
    type: "warning",
    title: "Variation sign-off required",
    detail: "Emily Carter — tile selection change, +$1,400 impact · TL-99214-B",
    action: "Review Variation",
    href: "/pro/trustlinks/TL-99214-B",
  },
  {
    type: "info",
    title: "Electrical certificate uploaded",
    detail: "Bright Spark Electrical uploaded to TL-99214-B · verify before handover",
    action: "Verify",
    href: "/pro/trustlinks/TL-99214-B",
  },
  {
    type: "warning",
    title: "Document request overdue",
    detail: "Sofia Nguyen — Identity proof requested 5 days ago · TL-88301-A",
    action: "Send Reminder",
    href: "/pro/trustlinks/TL-88301-A",
  },
];

const TRADES_TODAY = [
  { time: "8:00 AM", trade: "Bright Spark Electrical", site: "18 Banksia Cres, Kenmore", tlId: "TL-99214-B", access: "TrustLink scoped" },
  { time: "10:30 AM", trade: "SafeCheck Inspectors", site: "18 Banksia Cres, Kenmore", tlId: "TL-99214-B", access: "TrustLink scoped" },
  { time: "2:00 PM", trade: "Plumber — Ryan Hadlow", site: "7 Cedar St, Graceville", tlId: "TL-88301-A", access: "TrustLink scoped" },
];

const STATUS_STYLE: Record<string, string> = {
  emerald: "bg-emerald-100 text-emerald-800",
  amber: "bg-amber-100 text-amber-800",
  green: "bg-green-100 text-green-800",
};

export default function ProDashboard() {
  const [dismissedAlerts, setDismissedAlerts] = useState<number[]>([]);

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <div className="text-[10px] font-bold text-verified uppercase tracking-widest mb-2">
          Pro Hub · ABC Developers Pty Ltd
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-1">
              Good morning, Alex. 👋
            </h1>
            <p className="text-sm text-slate-500">{TODAY_DATE}</p>
          </div>
          <div className="flex gap-2">
            <Link href="/pro/trustlinks"
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              🔗 TrustLinks
            </Link>
            <Link href="/pro/leads"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white hover:opacity-90 transition-all"
              style={{ background: "linear-gradient(135deg, #0c2340, #143865)" }}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16M4 12h16" />
              </svg>
              New TrustLink
            </Link>
          </div>
        </div>
      </div>

      {/* TrustLink active chip */}
      <div className="flex items-center gap-2.5 p-3.5 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/30 rounded-xl mb-8">
        <div className="w-1.5 h-1.5 rounded-full bg-verified animate-pulse flex-shrink-0" />
        <span className="text-xs font-bold text-verified uppercase tracking-wider">TrustLink · Active</span>
        <span className="text-xs text-green-700 dark:text-green-400">
          8 active workspaces · Permission boundaries enforced · All connections encrypted
        </span>
        <div className="ml-auto text-[10px] font-semibold text-verified hidden sm:block">
          🇦🇺 AWS Sydney
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {STATS.map(({ label, value, delta, color, indicator }) => (
          <div key={label} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div className="text-xs font-semibold text-slate-500">{label}</div>
              {indicator === "pulse" && <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />}
              {indicator === "amber" && <span className="w-2 h-2 rounded-full bg-brand-gold" />}
              {indicator === "green" && <span className="w-2 h-2 rounded-full bg-verified" />}
            </div>
            <div className={`text-3xl font-bold ${color} mb-1`}>{value}</div>
            <div className="text-[10px] text-slate-400">{delta}</div>
          </div>
        ))}
      </div>

      {/* Handover due banner */}
      <div className="rounded-2xl p-5 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        style={{ background: "linear-gradient(135deg, #061221, #0c3d2b)", border: "1px solid rgba(16,185,129,0.25)" }}>
        <div>
          <div className="text-[10px] font-bold text-green-400 uppercase tracking-widest mb-1">
            PROP ID DIGITAL HANDOVER — DUE 24 SEP 2026
          </div>
          <div className="font-bold text-white mb-0.5">18 Banksia Crescent, Kenmore · TPH-KEN-018</div>
          <div className="text-xs text-slate-400">Emily & James Carter · TL-99214-B · 3/5 gates complete</div>
        </div>
        <Link href="/pro/trustlinks/TL-99214-B"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white flex-shrink-0 hover:opacity-90 transition-all"
          style={{ background: "rgba(16,185,129,0.25)", border: "1px solid rgba(16,185,129,0.4)" }}>
          Open Handover Workspace
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 12h16m-6-6 6 6-6 6" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">

          {/* Requires attention */}
          {ATTENTION.filter((_, i) => !dismissedAlerts.includes(i)).length > 0 && (
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-slate-900 dark:text-white">Requires Attention</h2>
                <span className="text-[10px] font-bold px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
                  {ATTENTION.filter((_, i) => !dismissedAlerts.includes(i)).length} items
                </span>
              </div>
              <div className="space-y-3">
                {ATTENTION.map((item, i) => {
                  if (dismissedAlerts.includes(i)) return null;
                  return (
                    <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${
                      item.type === "warning"
                        ? "bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/30"
                        : "bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800/30"
                    }`}>
                      <span className="text-lg flex-shrink-0 mt-0.5">{item.type === "warning" ? "⚠️" : "ℹ️"}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm text-slate-900 dark:text-white">{item.title}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{item.detail}</div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <Link href={item.href}
                          className="px-3 py-1.5 text-xs font-bold text-brand-navy dark:text-brand-gold border border-brand-navy/20 dark:border-brand-gold/20 rounded-lg hover:bg-brand-navy/5 transition-colors">
                          {item.action}
                        </Link>
                        <button onClick={() => setDismissedAlerts((prev) => [...prev, i])}
                          className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                          ×
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TrustLinks summary */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-slate-900 dark:text-white">Active TrustLinks</h2>
              <Link href="/pro/trustlinks" className="text-xs font-bold text-brand-navy dark:text-brand-gold hover:underline">
                View all →
              </Link>
            </div>
            <div className="space-y-3">
              {TRUSTLINKS.map(({ id, propId, customer, initials, status, statusColor, updated, progress }) => (
                <div key={id} className="flex items-center gap-3 p-4 border border-slate-100 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-brand-navy text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-slate-900 dark:text-white">{customer}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-brand-navy text-white">{propId}</span>
                      <span className="text-[10px] text-slate-400">{updated}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="hidden sm:flex flex-col items-end gap-1">
                      <div className="w-20 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-verified to-brand-emerald rounded-full" style={{ width: `${progress}%` }} />
                      </div>
                      <span className="text-[9px] text-slate-400">{progress}%</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${STATUS_STYLE[statusColor]}`}>{status}</span>
                    <Link href={`/pro/trustlinks/${id}`}
                      className="px-3 py-1.5 text-xs font-bold text-white rounded-lg hover:opacity-90 transition-all"
                      style={{ background: "linear-gradient(135deg, #0c2340, #143865)" }}>
                      Open
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent leads */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-slate-900 dark:text-white">Recent Leads</h2>
              <Link href="/pro/leads" className="text-xs font-bold text-brand-navy dark:text-brand-gold hover:underline">View all →</Link>
            </div>
            <div className="space-y-3">
              {LEADS.map(({ id, initials, name, intent, budget, time, hot }) => (
                <div key={id} className="flex items-start gap-3 p-4 border border-slate-100 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300 flex-shrink-0">
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <div className="font-bold text-sm text-slate-900 dark:text-white">{name}</div>
                      {hot && <span className="text-[9px] font-bold px-1.5 py-0.5 bg-red-50 text-red-600 rounded-full">🔥 HOT</span>}
                    </div>
                    <div className="text-xs text-slate-500">{intent}</div>
                    <div className="text-xs text-brand-gold font-semibold mt-0.5">Budget: {budget}</div>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span className="text-[10px] text-slate-400">{time}</span>
                    <Link href={`/pro/leads/${id}`}
                      className="px-3 py-1.5 text-xs font-bold text-white rounded-lg hover:opacity-90 transition-all"
                      style={{ background: "linear-gradient(135deg, #0c2340, #143865)" }}>
                      Review
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">

          {/* Trade schedule */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Today&apos;s Trades</h3>
              <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 rounded-full">
                {TODAY_DATE.split(",")[0]}
              </span>
            </div>
            <div className="space-y-3">
              {TRADES_TODAY.map(({ time, trade, site, tlId, access }) => (
                <div key={`${time}-${trade}`} className="flex gap-3 py-3 border-b border-slate-100 dark:border-slate-700 last:border-0">
                  <div className="text-[10px] font-bold text-slate-400 w-14 flex-shrink-0 pt-0.5">{time}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-xs text-slate-900 dark:text-white">{trade}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5 truncate">📍 {site}</div>
                    <div className="text-[10px] text-verified mt-0.5">🔗 {access}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PropID / CRM snapshot */}
          <div className="rounded-2xl overflow-hidden border"
            style={{ background: "linear-gradient(135deg, #061221, #0c3d2b)", borderColor: "rgba(16,185,129,0.2)" }}>
            <div className="p-5">
              <div className="text-[10px] font-bold text-green-400 uppercase tracking-widest mb-3">Prop ID Snapshot</div>
              <div className="space-y-2">
                {TRUSTLINKS.map(({ id, propId, customer, progress }) => (
                  <div key={id} className="flex items-center gap-2">
                    <div className="text-[10px] font-bold text-white w-20 flex-shrink-0">{propId}</div>
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-verified to-brand-emerald rounded-full" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="text-[9px] text-slate-400 w-6 text-right">{progress}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm p-5">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-3">Quick Actions</h3>
            <div className="space-y-1.5">
              {[
                { label: "New TrustLink", href: "/pro/trustlinks", icon: "🔗" },
                { label: "View all leads", href: "/pro/leads", icon: "👥" },
                { label: "Documents", href: "/pro/documents", icon: "📄" },
                { label: "Open tasks", href: "/pro/tasks", icon: "✅" },
                { label: "Customers", href: "/pro/customers", icon: "🤝" },
                { label: "Settings", href: "/pro/settings", icon: "⚙️" },
              ].map(({ label, href, icon }) => (
                <Link key={href} href={href}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span>{icon}</span>
                  <span>{label}</span>
                  <svg className="w-3 h-3 text-slate-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 18l6-6-6-6" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
