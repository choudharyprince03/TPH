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
    <aside className="w-[222px] flex-shrink-0 bg-[#0b2034] text-[#d7e0e7] flex flex-col h-full font-sans border-r border-[#1c3a54] select-none">
      
      {/* Workspace Brand & Company */}
      <div className="p-4 border-b border-[#1c3a54]">
        <div className="text-[9.5px] font-bold uppercase tracking-[1.8px] text-[#8ca4b7]">
          Your professional workspace
        </div>
        <div className="flex items-baseline justify-between mt-1">
          <h2 className="text-[25px] font-display font-semibold text-white tracking-tight">
            Pro Hub
          </h2>
          <span className="text-[10.5px] text-[#adc0cd] font-medium">
            Builder edition
          </span>
        </div>

        {/* Company Card */}
        <div className="mt-3.5 pt-3 border-t border-[#1c3a54] flex items-center gap-2.5">
          <div className="w-[31px] h-[31px] bg-[#244159] text-[#dfc595] font-display text-[16px] font-bold rounded-lg flex items-center justify-center flex-shrink-0">
            N
          </div>
          <div className="min-w-0">
            <div className="text-[12px] font-semibold text-white leading-tight truncate">
              Northline Homes
            </div>
            <div className="text-[9.5px] text-[#8ca4b7] truncate mt-0.5">
              QBCC #150821 · Active
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-4 text-[12px] font-medium scrollbar-none" aria-label="Pro Workspace">
        {NAV_SECTIONS.map((section, sIdx) => (
          <div key={section.category || sIdx} className="space-y-1">
            <div className="text-[9px] font-bold uppercase tracking-[1.8px] text-[#8ca4b7] px-2.5 pb-0.5">
              {section.category === "Main" ? "Your day, organised" : section.category}
            </div>
            {section.items.map(({ href, exact, label, badge, badgeColor, icon }) => {
              const active = isActive(href, exact);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all text-[12px] relative ${
                    active
                      ? "bg-[#24415b] text-white font-semibold before:content-[''] before:absolute before:-left-3 before:w-[3px] before:h-[20px] before:bg-[#C59B27] before:rounded-r"
                      : "text-[#b6c6d3] hover:bg-[#173249] hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`flex-shrink-0 ${active ? "text-[#C59B27]" : "text-[#8ca4b7]"}`}>
                      {icon}
                    </span>
                    <span className="truncate">{label}</span>
                  </div>
                  {badge && (
                    <span className={`text-[9.5px] font-semibold px-1.5 py-0.5 rounded flex-shrink-0 ml-1.5 ${
                      active ? "bg-white/20 text-white" : badgeColor || "bg-[#173249] text-[#adc0cd]"
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

      {/* Sidebar Bottom / Philosophy */}
      <div className="p-3.5 border-t border-[#1c3a54] space-y-2.5 bg-[#08192a]/50">
        <div>
          <p className="font-display text-[14px] text-[#f3eee3] leading-snug font-medium">
            Build with care.<br />Hand over beautifully.
          </p>
          <small className="text-[#8ca4b7] text-[10px] block mt-1 leading-tight">
            One home. A connected record.<br />Clear responsibilities.
          </small>
        </div>

        <div className="flex items-center gap-1.5 text-[9.5px] text-[#adc0cd] pt-1 border-t border-[#1c3a54]">
          <svg className="w-3 h-3 text-[#28715e] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="truncate">QBCC statutory standard</span>
        </div>

        <div className="flex items-center gap-1.5 pt-1">
          <button
            onClick={() => setReferralOpen(true)}
            className="flex-1 px-2 py-1.5 rounded-lg text-[#adc0cd] hover:text-white hover:bg-[#173249] border border-[#244159] text-[10.5px] font-medium transition-colors text-center cursor-pointer"
          >
            🤝 Invite
          </button>
          <Link
            href="/properties"
            className="flex-1 px-2 py-1.5 rounded-lg text-[#adc0cd] hover:text-white hover:bg-[#173249] border border-[#244159] text-[10.5px] font-medium transition-colors text-center"
          >
            Owner View →
          </Link>
        </div>
      </div>

      <ReferralModal
        isOpen={referralOpen}
        onClose={() => setReferralOpen(false)}
        mode="pro"
      />
    </aside>
  );
}
