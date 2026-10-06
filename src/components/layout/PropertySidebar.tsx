"use client";
import React from "react";
import Link from "next/link";
import { PropertyData, PROPERTIES_LIST } from "@/lib/properties";

export type PropertyWorkspaceTab =
  | "overview"
  | "dna"
  | "care-renewal"
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
      id: "dna",
      label: "Property DNA",
      sublabel: "Attributes & specs",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
          />
        </svg>
      ),
    },
    {
      id: "care-renewal",
      label: "Care & Renewal",
      sublabel: "Tasks & maintenance",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
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
        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#244159] text-[#dfc595] border border-[#3a5d7c]">
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
        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#133d32] text-[#6ee7b7] border border-[#1e6150]">
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
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      {/* Sidebar Rail - Pro Hub Deep Navy Theme */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-[240px] sm:w-[250px] bg-[#0b2034] border-r border-[#1c3a54] text-[#d7e0e7] flex flex-col z-50 transition-transform duration-300 ease-in-out font-sans select-none ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand & TPH Logo */}
        <div className="p-4 border-b border-[#1c3a54] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-white rounded-lg p-1.5 border border-white/20 shadow-xs flex items-center justify-center flex-shrink-0">
              <img
                src="/logo.png"
                alt="The Property Helpline"
                className="h-8 w-auto object-contain"
              />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-[12px] tracking-tight leading-tight text-white group-hover:text-[#C59B27] transition-colors truncate">
                The Property Helpline
              </div>
              <div className="text-[7.5px] font-bold uppercase tracking-[1.4px] text-[#C59B27] leading-tight mt-0.5">
                YOUR DIGITAL HOME
              </div>
            </div>
          </Link>

          {/* Mobile Close Button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden text-[#8ca4b7] hover:text-white p-1 rounded-md cursor-pointer"
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
            <span className="text-[9px] font-bold uppercase tracking-[1.8px] text-[#8ca4b7]">
              THIS HOME
            </span>
            <span className="text-[9px] font-mono font-bold text-[#dfc595] bg-[#244159] px-1.5 py-0.5 rounded border border-[#3a5d7c]">
              {property.propId}
            </span>
          </div>

          {/* Property Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSwitcherOpen(!switcherOpen)}
              className="w-full flex items-center justify-between p-2 rounded-lg bg-[#173249]/80 border border-[#244159] hover:border-[#3a5d7c] hover:bg-[#1f3f5b] transition-colors text-left group cursor-pointer"
            >
              <div className="min-w-0 pr-2">
                <div className="text-[12px] font-bold text-white truncate group-hover:text-[#C59B27] transition-colors">
                  {property.street}
                </div>
                <div className="text-[10px] text-[#adc0cd] truncate">
                  {property.suburb} {property.state}
                </div>
              </div>
              <svg
                className={`w-3.5 h-3.5 text-[#8ca4b7] transition-transform ${switcherOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {switcherOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#0b2034] border border-[#244159] rounded-xl shadow-xl p-1.5 z-30 space-y-1">
                <div className="text-[9px] uppercase font-bold text-[#8ca4b7] px-2 py-1">
                  Switch Property
                </div>
                {PROPERTIES_LIST.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      if (onSwitchProperty) onSwitchProperty(p.id);
                      setSwitcherOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      p.id === property.id
                        ? "bg-[#24415b] text-white font-bold"
                        : "text-[#adc0cd] hover:bg-[#173249] hover:text-white"
                    }`}
                  >
                    <span className="truncate pr-2">{p.street}</span>
                    {p.id === property.id && (
                      <svg className="w-3.5 h-3.5 text-[#28715e] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
                <div className="pt-1 border-t border-[#1c3a54] mt-1">
                  <Link
                    href="/properties"
                    className="block text-[10px] text-[#C59B27] hover:underline px-2 py-1 font-bold"
                  >
                    All properties →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Nav Items — 5 clean tabs */}
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
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all relative group cursor-pointer ${
                  isActive
                    ? "bg-[#24415b] text-white font-semibold before:content-[''] before:absolute before:-left-3 before:w-[3px] before:h-[20px] before:bg-[#C59B27] before:rounded-r shadow-xs"
                    : "text-[#b6c6d3] hover:bg-[#173249] hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`transition-colors flex-shrink-0 ${
                      isActive ? "text-[#C59B27]" : "text-[#8ca4b7] group-hover:text-white"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <div className="min-w-0">
                    <div className={`text-[12px] font-semibold truncate ${isActive ? "text-white" : "text-[#d7e0e7] group-hover:text-white"}`}>
                      {item.label}
                    </div>
                    <div className={`text-[10px] truncate ${isActive ? "text-[#adc0cd]" : "text-[#7d92a4] group-hover:text-[#adc0cd]"}`}>
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
        <div className="p-3.5 border-t border-[#1c3a54] space-y-1.5 text-[11px] bg-[#08192a]/50">
          <Link
            href="/explore"
            className="flex items-center justify-between px-3 py-1.5 text-[#adc0cd] hover:text-white hover:bg-[#173249] rounded-lg transition-colors font-medium"
          >
            <span>Find a specialist</span>
            <span className="text-[10px] text-[#8ca4b7]">↗</span>
          </Link>
          <Link
            href="/pro"
            className="flex items-center justify-between px-3 py-1.5 text-[#dfc595] hover:text-white hover:bg-[#173249] rounded-lg transition-colors font-semibold"
          >
            <span>I'm a Pro</span>
            <span className="text-[10px]">↗</span>
          </Link>

          <div className="pt-2 border-t border-[#1c3a54] flex items-center justify-between px-3 py-1 text-[#8ca4b7] text-[10px]">
            <span>Verified Owner</span>
            <span className="font-semibold text-[#28715e] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#28715e]" />
              Active
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
