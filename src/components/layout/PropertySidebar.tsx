"use client";
import React from "react";
import Link from "next/link";
import { PropertyData, PROPERTIES_LIST } from "@/lib/properties";

export type PropertyWorkspaceTab =
  | "overview"
  | "digital-key"
  | "trustlink";

interface PropertySidebarProps {
  property: PropertyData;
  activeTab: PropertyWorkspaceTab;
  onTabChange: (tab: PropertyWorkspaceTab) => void;
  onSwitchProperty?: (propId: string) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export function PropertySidebar({
  property,
  activeTab,
  onTabChange,
  onSwitchProperty,
  mobileOpen,
  setMobileOpen,
}: PropertySidebarProps) {
  const [switcherOpen, setSwitcherOpen] = React.useState(false);

  const NAV_ITEMS: {
    id: PropertyWorkspaceTab;
    label: string;
    sublabel: string;
    icon: React.ReactNode;
    badge?: React.ReactNode;
  }[] = [
    {
      id: "overview",
      label: "Overview",
      sublabel: "Property summary",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      id: "digital-key",
      label: "Digital Key",
      sublabel: "Documents & handovers",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
          />
        </svg>
      ),
      badge: (
        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#fef3c7] text-[#92400e] border border-[#fcd34d]">
          2 incoming
        </span>
      ),
    },
    {
      id: "trustlink",
      label: "TrustLink",
      sublabel: "People & permissions",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      badge: (
        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#dcfce7] text-[#166534] border border-[#86efac]">
          2 active
        </span>
      ),
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      {/* Sidebar Rail - Light Theme */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-[240px] sm:w-[250px] bg-white border-r border-[#dfe6ef] text-[#102645] flex flex-col z-50 transition-transform duration-300 ease-in-out font-sans ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand & TPH Logo */}
        <div className="p-4 border-b border-[#dfe6ef] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-white rounded-lg p-1.5 border border-[#dfe6ef] shadow-xs flex items-center justify-center flex-shrink-0">
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
                YOUR DIGITAL HOME
              </div>
            </div>
          </Link>

          {/* Mobile Close Button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden text-[#68788e] hover:text-[#102645] p-1 rounded-md"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* This Home Header + Property Switcher */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] font-bold uppercase tracking-[1.8px] text-[#68788e]">
              THIS HOME
            </span>
            <span className="text-[9px] font-mono font-bold text-[#8b641c] bg-[#fff4df] px-1.5 py-0.5 rounded border border-[#ffe0a3]">
              {property.propId}
            </span>
          </div>

          {/* Property Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSwitcherOpen(!switcherOpen)}
              className="w-full flex items-center justify-between p-2 rounded-lg bg-[#f8fafc] border border-[#dfe6ef] hover:border-[#cbd5e1] hover:bg-[#f1f5f9] transition-colors text-left group"
            >
              <div className="min-w-0 pr-2">
                <div className="text-[12px] font-bold text-[#102645] truncate group-hover:text-[#071d3b] transition-colors">
                  {property.street}
                </div>
                <div className="text-[10px] text-[#68788e] truncate">
                  {property.suburb} {property.state}
                </div>
              </div>
              <svg
                className={`w-3.5 h-3.5 text-[#68788e] transition-transform ${switcherOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {switcherOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#dfe6ef] rounded-xl shadow-lg p-1.5 z-30 space-y-1">
                <div className="text-[9px] uppercase font-bold text-[#68788e] px-2 py-1">
                  Switch Property
                </div>
                {PROPERTIES_LIST.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      if (onSwitchProperty) onSwitchProperty(p.id);
                      setSwitcherOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      p.id === property.id
                        ? "bg-[#eef4ff] text-[#071d3b] font-bold"
                        : "text-[#5b6e84] hover:bg-[#f1f5f9] hover:text-[#102645]"
                    }`}
                  >
                    <span className="truncate pr-2">{p.street}</span>
                    {p.id === property.id && (
                      <span className="text-[10px] text-[#24754c] font-bold">✓</span>
                    )}
                  </button>
                ))}
                <div className="pt-1 border-t border-[#dfe6ef] mt-1">
                  <Link
                    href="/properties"
                    className="block text-[10px] text-[#071d3b] hover:underline px-2 py-1 font-bold"
                  >
                    All properties →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Nav Items — 4 clean tabs */}
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto" aria-label="Home Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all group ${
                  isActive
                    ? "bg-[#071d3b] text-white shadow-xs"
                    : "text-[#5b6e84] hover:bg-[#f3f6fb] hover:text-[#102645]"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`transition-colors flex-shrink-0 ${
                      isActive ? "text-[#efbd66]" : "text-[#68788e] group-hover:text-[#102645]"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <div className="min-w-0">
                    <div className={`text-[13px] font-semibold truncate ${isActive ? "text-white" : ""}`}>
                      {item.label}
                    </div>
                    <div className={`text-[10px] truncate ${isActive ? "text-white/60" : "text-[#94a3b8]"}`}>
                      {item.sublabel}
                    </div>
                  </div>
                </div>
                {item.badge && <div className="ml-2 flex-shrink-0">{item.badge}</div>}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-[#dfe6ef] space-y-1 text-[11px]">
          <Link
            href="/explore"
            className="flex items-center justify-between px-3 py-1.5 text-[#5b6e84] hover:text-[#102645] hover:bg-[#f3f6fb] rounded-lg transition-colors"
          >
            <span>Find a specialist</span>
            <span className="text-[10px] text-[#8a9bb0]">↗</span>
          </Link>
          <Link
            href="/pro"
            className="flex items-center justify-between px-3 py-1.5 text-[#24754c] hover:bg-[#eaf5ef] rounded-lg transition-colors font-semibold"
          >
            <span>I'm a Pro</span>
            <span className="text-[10px]">↗</span>
          </Link>

          <div className="pt-2 border-t border-[#dfe6ef] flex items-center justify-between px-3 py-1 text-[#68788e] text-[10px]">
            <span>Verified Owner</span>
            <span className="font-semibold text-[#24754c]">Active</span>
          </div>
        </div>
      </aside>
    </>
  );
}
