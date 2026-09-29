"use client";
import React from "react";
import Link from "next/link";
import { PropertyData, PROPERTIES_LIST } from "@/lib/properties";

export type PropertyWorkspaceTab =
  | "overview"
  | "digital-key"
  | "trustlink"
  | "properties"
  | "messages";

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
    icon: React.ReactNode;
    badge?: React.ReactNode;
  }[] = [
    {
      id: "overview",
      label: "Overview",
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
        <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981] flex-shrink-0" />
      ),
    },
    {
      id: "trustlink",
      label: "Trust Link",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      ),
      badge: (
        <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-[#102b44] text-[#38bdf8] border border-[#1d4668]">
          Active
        </span>
      ),
    },
    {
      id: "properties",
      label: "Properties",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      badge: (
        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#162e49] text-[#93c5fd]">
          {PROPERTIES_LIST.length}
        </span>
      ),
    },
    {
      id: "messages",
      label: "Messages",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
      badge: (
        <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-[#064e3b] text-[#6ee7b7] border border-[#047857]/40">
          1 New
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
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      {/* Sidebar Rail */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-[240px] sm:w-[250px] bg-[#071628] border-r border-[#12283e] text-white flex flex-col z-50 transition-transform duration-300 ease-in-out font-sans ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand & TPH Logo */}
        <div className="p-4 border-b border-[#12283e] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-white rounded-lg p-1.5 border border-white/20 shadow-xs flex items-center justify-center flex-shrink-0">
              <img
                src="/logo.png"
                alt="The Property Helpline"
                className="h-8 w-auto object-contain"
              />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-[12px] tracking-tight leading-tight text-white group-hover:text-[#efbd66] transition-colors truncate">
                The Property Helpline
              </div>
              <div className="text-[7.5px] font-semibold uppercase tracking-[1.6px] text-[#efbd66] leading-tight mt-0.5">
                YOUR DIGITAL HOME
              </div>
            </div>
          </Link>

          {/* Mobile Close Button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden text-[#8096ae] hover:text-white p-1 rounded-md"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Section Header: THIS HOME */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center justify-between">
            <span className="text-[9.5px] font-bold uppercase tracking-[1.8px] text-[#557393]">
              THIS HOME
            </span>
            <span className="text-[9px] font-mono text-[#efbd66] bg-[#efbd66]/10 px-1.5 py-0.5 rounded border border-[#efbd66]/20">
              {property.propId}
            </span>
          </div>

          {/* Current Property Mini Dropdown */}
          <div className="relative mt-2">
            <button
              onClick={() => setSwitcherOpen(!switcherOpen)}
              className="w-full flex items-center justify-between p-2 rounded-lg bg-[#0d2238] border border-[#1b3857] hover:border-[#27537e] transition-colors text-left group"
            >
              <div className="min-w-0 pr-2">
                <div className="text-[12px] font-bold text-white truncate group-hover:text-[#93c5fd] transition-colors">
                  {property.street}
                </div>
                <div className="text-[10px] text-[#718da8] truncate">
                  {property.suburb} {property.state}
                </div>
              </div>
              <svg
                className={`w-3.5 h-3.5 text-[#718da8] transition-transform ${switcherOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Property Switcher Menu */}
            {switcherOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#091b2f] border border-[#1b3d62] rounded-xl shadow-xl p-1.5 z-30 space-y-1">
                <div className="text-[9px] uppercase font-bold text-[#557393] px-2 py-1">
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
                        ? "bg-[#112d48] text-white font-semibold"
                        : "text-[#8ea4bc] hover:bg-[#0e253e] hover:text-white"
                    }`}
                  >
                    <span className="truncate pr-2">{p.street}</span>
                    {p.id === property.id && (
                      <span className="text-[10px] text-[#10b981]">✓</span>
                    )}
                  </button>
                ))}
                <div className="pt-1 border-t border-[#163353] mt-1">
                  <Link
                    href="/properties"
                    className="block text-[10px] text-[#38bdf8] hover:text-white px-2 py-1 font-semibold"
                  >
                    Manage all properties →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 5 Specific Nav Items */}
        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto" aria-label="Home Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all group ${
                  isActive
                    ? "bg-[#102b44] border border-[#1d4668] text-white shadow-xs"
                    : "text-[#8096ae] hover:text-white hover:bg-white/[0.04] border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`transition-colors ${
                      isActive ? "text-[#38bdf8]" : "text-[#557393] group-hover:text-white"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && <div className="ml-2 flex-shrink-0">{item.badge}</div>}
              </button>
            );
          })}
        </nav>

        {/* Quick Links & Footer */}
        <div className="p-3 border-t border-[#12283e] space-y-1.5 text-[11px]">
          <Link
            href="/explore"
            className="flex items-center justify-between px-3 py-1.5 text-[#7f99b5] hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors"
          >
            <span>Find a specialist</span>
            <span className="text-[10px] text-[#4f7091]">↗</span>
          </Link>
          <Link
            href="/pro"
            className="flex items-center justify-between px-3 py-1.5 text-[#efbd66] hover:text-white hover:bg-[#efbd66]/10 rounded-lg transition-colors font-medium"
          >
            <span>I'm a Pro</span>
            <span className="text-[10px]">↗</span>
          </Link>
          
          <div className="pt-2 border-t border-[#12283e] flex items-center justify-between px-3 py-1 text-[#4f6c8a] text-[10px]">
            <span>Verified Owner</span>
            <span className="font-mono text-[#10b981]">Active</span>
          </div>
        </div>
      </aside>
    </>
  );
}
