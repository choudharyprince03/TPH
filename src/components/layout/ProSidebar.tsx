"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NAV_WORKSPACE = [
  {
    href: "/pro",
    exact: true,
    label: "Overview",
    icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
  },
  {
    href: "/pro/leads",
    label: "Leads & Inquiries",
    badge: "4",
    badgeColor: "bg-brand-emerald text-brand-navy-dark",
    icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
  },
  {
    href: "/pro/trustlinks",
    label: "TrustLinks",
    badge: "8",
    badgeColor: "bg-slate-700 text-slate-300",
    icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1",
    highlight: true,
  },
  {
    href: "/pro/customers",
    label: "Customers",
    icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
  },
  {
    href: "/pro/properties",
    label: "Properties",
    icon: "m3 10 9-7 9 7v10H3Z M9 20v-7h6v7",
  },
];

const NAV_OPERATIONS = [
  {
    href: "/pro/documents",
    label: "Documents",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    href: "/pro/tasks",
    label: "Tasks",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
  {
    href: "/pro/activity",
    label: "Activity log",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

export function ProSidebar() {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className="w-64 flex-shrink-0 bg-brand-navy-dark border-r border-slate-800 text-slate-300 flex flex-col h-screen sticky top-0">

      {/* Brand */}
      <div className="p-5 flex items-center gap-3 text-white border-b border-slate-800">
        <div className="w-9 h-10 bg-gradient-to-br from-brand-emerald to-verified rounded-lg flex items-center justify-center font-bold text-xs text-brand-navy-dark flex-shrink-0"
          style={{borderRadius: "8px 8px 8px 2px"}}>
          TPH
        </div>
        <div className="leading-tight">
          <div className="text-sm font-bold tracking-wider">PRO HUB</div>
          <div className="text-[10px] text-brand-gold uppercase tracking-widest font-semibold">ABC Developers</div>
        </div>
      </div>

      {/* TrustLink active chip */}
      <div className="mx-4 mt-4 mb-1 flex items-center gap-2 px-3 py-2 bg-green-900/30 border border-green-800/40 rounded-lg">
        <div className="w-1.5 h-1.5 rounded-full bg-brand-emerald flex-shrink-0" style={{boxShadow: "0 0 0 3px rgba(16,185,129,0.2)"}} />
        <div className="min-w-0">
          <div className="text-[10px] font-bold text-brand-emerald uppercase tracking-wider leading-none">TrustLink · Active</div>
          <div className="text-[9px] text-green-500 opacity-80 mt-0.5">Scoped access enabled</div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-2">Workspace</div>

        {NAV_WORKSPACE.map(({ href, exact, label, badge, badgeColor, icon, highlight }) => {
          const active = isActive(href, exact);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors group ${
                active
                  ? "bg-slate-700/80 text-white"
                  : highlight
                  ? "hover:bg-slate-800 hover:text-white text-slate-300"
                  : "hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <svg className={`w-4 h-4 flex-shrink-0 ${active ? "text-brand-emerald" : "text-slate-500 group-hover:text-slate-300"}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
                </svg>
                <span className="text-sm font-medium">{label}</span>
              </div>
              {badge && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${active ? "bg-brand-emerald text-brand-navy-dark" : badgeColor}`}>
                  {badge}
                </span>
              )}
            </Link>
          );
        })}

        {/* Digital Handover highlight nav item */}
        <div className="mt-4 mb-2 mx-0">
          <div className="px-3 py-3 rounded-xl border border-green-800/40 bg-gradient-to-r from-green-900/30 to-brand-navy-dark">
            <div className="text-[9px] font-bold text-green-400 uppercase tracking-widest mb-1">Prop ID</div>
            <div className="text-xs font-bold text-white mb-0.5">Digital Handover</div>
            <div className="text-[10px] text-slate-400 leading-snug">Transfer the living property vault</div>
          </div>
        </div>

        <div className="mt-4 mb-2 px-2">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Operations</div>
        </div>

        {NAV_OPERATIONS.map(({ href, label, icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                active ? "bg-slate-700/80 text-white" : "hover:bg-slate-800 hover:text-white"
              }`}
            >
              <svg className={`w-4 h-4 flex-shrink-0 ${active ? "text-brand-emerald" : "text-slate-500 group-hover:text-slate-300"}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
              </svg>
              <span className="text-sm font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        {/* Company card */}
        <div className="px-3 py-2.5 bg-slate-800/60 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-700 rounded-md flex items-center justify-center text-[10px] font-bold text-brand-gold flex-shrink-0">A</div>
            <div>
              <div className="text-xs font-bold text-white leading-none">ABC Developers</div>
              <div className="text-[9px] text-slate-400 mt-0.5">Builder workspace · Demo</div>
            </div>
          </div>
        </div>
        <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors text-sm font-medium text-slate-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Exit to Customer Portal
        </Link>
      </div>
    </aside>
  );
}
