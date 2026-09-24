"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { ReferralModal } from "@/components/features/ReferralModal";

const NAV_ITEMS = [
  {
    href: "/pro",
    exact: true,
    label: "Overview",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: "/pro/leads",
    label: "Incoming Leads",
    badge: "3 New",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
    ),
  },
  {
    href: "/pro/customers",
    label: "Property Data & Clients",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    href: "/pro/trustlinks",
    label: "Active TrustLinks",
    badge: "8",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    href: "/pro/properties",
    label: "Handover & Projects",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    href: "/pro/tradie",
    label: "Tradie",
    badge: "5 Active",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    href: "/pro/documents",
    label: "Statutory Documents",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    href: "/pro/tasks",
    label: "Follow-ups & Tasks",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
];

export function ProSidebar() {
  const pathname = usePathname();
  const [referralOpen, setReferralOpen] = useState(false);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className="w-[230px] flex-shrink-0 bg-white border-r border-[#dfe6ef] text-[#102645] flex flex-col h-screen sticky top-0 font-sans">
      
      {/* Brand & Pro Identity Header */}
      <div className="p-4 border-b border-[#dfe6ef] space-y-3">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-white rounded-xl p-1.5 border border-[#dfe6ef] shadow-xs flex items-center justify-center flex-shrink-0">
            <img
              src="/logo.png"
              alt="The Property Helpline"
              className="h-10 w-auto object-contain"
            />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-[13px] tracking-tight leading-tight text-[#071d3b] group-hover:text-[#24754c] transition-colors truncate">
              The Property Helpline
            </div>
            <div className="text-[7.5px] font-bold uppercase tracking-[1.4px] text-[#24754c] leading-tight mt-0.5">
              PRO HUB PORTAL
            </div>
          </div>
        </Link>

        <div className="pt-2 border-t border-[#dfe6ef]/70 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#071d3b] text-[#efbd66] flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-2xs">
            <svg className="w-4 h-4 text-[#efbd66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div className="min-w-0">
            <h2 className="text-[13px] font-bold text-[#102645] leading-tight truncate">
              Hart Homes
            </h2>
            <small className="text-[9.5px] text-[#68788e] block truncate mt-0.5">
              QBCC #150821 · Builder
            </small>
          </div>
        </div>
      </div>

      {/* TrustLink Status Chip */}
      <div className="mx-4 mt-4 mb-2 p-2.5 bg-[#eaf5ef] border border-[#d2e6d9] rounded-xl flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#24754c] animate-pulse flex-shrink-0" />
        <div className="min-w-0">
          <strong className="block text-[10px] font-bold text-[#24754c] uppercase tracking-wider leading-none">
            TrustLink Active
          </strong>
          <span className="text-[9px] text-[#3b6651] leading-none mt-0.5 block truncate">
            Scoped access enabled
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1 text-[12px] font-medium" aria-label="Pro Workspace">
        {NAV_ITEMS.map(({ href, exact, label, badge, icon }) => {
          const active = isActive(href, exact);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg transition-all ${
                active
                  ? "bg-[#071d3b] text-white font-semibold shadow-sm"
                  : "text-[#5b6e84] hover:bg-[#f3f6fb] hover:text-[#102645]"
              }`}
            >
              <div className="flex items-center gap-3">
                {icon}
                <span>{label}</span>
              </div>
              {badge && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  active ? "bg-white/20 text-white" : "bg-[#edf2f7] text-[#071d3b]"
                }`}>
                  {badge}
                </span>
              )}
            </Link>
          );
        })}

        {/* Referral & Invite Trigger */}
        <div className="pt-2 mt-2 border-t border-[#dfe6ef]/60">
          <button
            onClick={() => setReferralOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-[#071d3b] hover:bg-[#eaf5ef] font-semibold transition-all group border border-transparent hover:border-[#c7e3d1] cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-[#24754c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-[12px]">Invite &amp; Referrals</span>
            </div>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#eaf5ef] text-[#24754c] group-hover:bg-[#24754c] group-hover:text-white transition-colors">
              Invite
            </span>
          </button>
        </div>
      </nav>

      {/* Sidebar Footer: Switch to Consumer View & Sovereignty */}
      <div className="p-4 border-t border-[#dfe6ef] space-y-2 text-[10px] text-[#68788e]">
        <Link
          href="/properties"
          className="flex items-center justify-between p-2.5 bg-[#f3f6fb] hover:bg-[#e4ecf7] rounded-xl text-[#071d3b] font-semibold text-[11px] transition-colors"
        >
          <span>Switch to Consumer View</span>
          <span>→</span>
        </Link>
        <div className="flex items-center justify-between px-1 pt-1 text-[10px] text-[#8a97a7]">
          <span>Master Builders QLD</span>
          <Link href="/login" className="text-[#a44042] hover:underline font-semibold flex items-center gap-1">
            <span>Log Out</span>
            <span>↗</span>
          </Link>
        </div>
      </div>

      {/* Professional Referral & Client Onboarding Modal */}
      <ReferralModal
        isOpen={referralOpen}
        onClose={() => setReferralOpen(false)}
        mode="pro"
      />
    </aside>
  );
}
