"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { ReferralModal } from "@/components/features/ReferralModal";

interface NavItem {
  href: string;
  exact?: boolean;
  label: string;
  badge?: string;
  badgeColor?: string;
  icon: React.ReactNode;
}

interface NavSection {
  category: string;
  items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    category: "Main",
    items: [
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
        label: "Leads",
        badge: "3",
        badgeColor: "bg-[#fef3c7] text-[#92400e]",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        ),
      },
    ],
  },
  {
    category: "Projects",
    items: [
      {
        href: "/pro/properties",
        label: "Projects",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        ),
      },
      {
        href: "/pro/digital-key",
        label: "Digital Key",
        badge: "Ready",
        badgeColor: "bg-[#dcfce7] text-[#166534]",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        ),
      },
      {
        href: "/pro/documents",
        label: "Documents",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        ),
      },
    ],
  },
  {
    category: "TrustLink",
    items: [
      {
        href: "/pro/trustlinks",
        label: "TrustLink",
        badge: "8",
        badgeColor: "bg-[#e0f2fe] text-[#0369a1]",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        ),
      },
    ],
  },
  {
    category: "Team & Ops",
    items: [
      {
        href: "/pro/tradie",
        label: "Tradies",
        badge: "5",
        badgeColor: "bg-[#f1f5f9] text-[#475569]",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
        ),
      },
      {
        href: "/pro/tasks",
        label: "Tasks",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        ),
      },
    ],
  },
];

export function ProSidebar() {
  const pathname = usePathname();
  const [referralOpen, setReferralOpen] = useState(false);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className="w-[220px] flex-shrink-0 bg-white border-r border-[#dfe6ef] text-[#102645] flex flex-col h-screen sticky top-0 font-sans">
      
      {/* Brand & Identity */}
      <div className="p-3.5 border-b border-[#dfe6ef]">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="bg-white rounded-lg p-1 border border-[#dfe6ef] shadow-2xs flex items-center justify-center flex-shrink-0">
            <img
              src="/logo.png"
              alt="The Property Helpline"
              className="h-8 w-auto object-contain"
            />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-[12px] tracking-tight leading-tight text-[#071d3b] group-hover:text-[#24754c] transition-colors truncate">
              The Property Helpline
            </div>
            <div className="text-[7.5px] font-bold uppercase tracking-[1.4px] text-[#24754c] leading-tight mt-0.5">
              PRO HUB
            </div>
          </div>
        </Link>

        {/* Business Badge */}
        <div className="mt-3 pt-2.5 border-t border-[#f0f4f8] flex items-center justify-between">
          <div className="min-w-0">
            <div className="text-[11.5px] font-bold text-[#102645] truncate">
              Hart Homes
            </div>
            <div className="text-[9px] text-[#68788e] truncate">
              QBCC #150821
            </div>
          </div>
          <span className="flex items-center gap-1 text-[9px] font-bold text-[#24754c] bg-[#eaf5ef] px-2 py-0.5 rounded-full border border-[#d2e6d9]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#24754c]" />
            Active
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-2.5 space-y-3 text-[12px] font-medium" aria-label="Pro Workspace">
        {NAV_SECTIONS.map((section, sIdx) => (
          <div key={section.category || sIdx} className="space-y-0.5">
            {section.category && (
              <div className="text-[8.5px] font-bold uppercase tracking-[1.2px] text-[#8a97a7] px-2 pb-1">
                {section.category}
              </div>
            )}
            {section.items.map(({ href, exact, label, badge, badgeColor, icon }) => {
              const active = isActive(href, exact);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-all text-[12px] font-semibold ${
                    active
                      ? "bg-[#071d3b] text-white shadow-2xs"
                      : "text-[#475569] hover:bg-[#f3f6fb] hover:text-[#102645]"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`flex-shrink-0 ${active ? "text-[#efbd66]" : "text-[#64748b]"}`}>
                      {icon}
                    </span>
                    <span className="truncate">{label}</span>
                  </div>
                  {badge && (
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full flex-shrink-0 ml-1.5 ${
                      active ? "bg-white/20 text-white" : badgeColor || "bg-[#edf2f7] text-[#071d3b]"
                    }`}>
                      {badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-[#dfe6ef] space-y-1.5 text-[10px]">
        <button
          onClick={() => setReferralOpen(true)}
          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[#071d3b] hover:bg-[#eaf5ef] font-semibold transition-all border border-[#dfe6ef] hover:border-[#c7e3d1] cursor-pointer"
        >
          <span className="flex items-center gap-1.5 text-[11px]">
            <span>🤝</span> Invite &amp; Refer
          </span>
          <span className="text-[9px] text-[#24754c] font-bold">+</span>
        </button>

        <Link
          href="/properties"
          className="flex items-center justify-between px-2.5 py-1.5 bg-[#f3f6fb] hover:bg-[#e4ecf7] rounded-lg text-[#071d3b] font-semibold text-[11px] transition-colors"
        >
          <span>Consumer View</span>
          <span>→</span>
        </Link>
      </div>

      <ReferralModal
        isOpen={referralOpen}
        onClose={() => setReferralOpen(false)}
        mode="pro"
      />
    </aside>
  );
}
