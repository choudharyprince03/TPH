"use client";
import React, { use, useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getPropertyById, PROPERTIES_LIST } from "@/lib/properties";
import { PropertyPulseNotification } from "@/components/features/PropertyPulse";
import { PropertySidebar, PropertyWorkspaceTab } from "@/components/layout/PropertySidebar";
import { DigitalKeyView } from "@/components/features/DigitalKeyView";
import { PropertyDnaTab } from "@/components/features/PropertyDnaTab";

function PropertyDetailInner({ id }: { id: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [currentId, setCurrentId] = useState(id);
  const property = getPropertyById(currentId);

  const validTabs: PropertyWorkspaceTab[] = ["overview", "dna", "digital-key", "trustlink"];

  const initialTab: PropertyWorkspaceTab = 
    tabParam === "access" || tabParam === "trustlink" || tabParam === "messages"
      ? "trustlink" 
      : tabParam === "dna"
      ? "dna"
      : tabParam && validTabs.includes(tabParam as PropertyWorkspaceTab) 
      ? (tabParam as PropertyWorkspaceTab) 
      : "overview";

  const [activeTab, setActiveTab] = useState<PropertyWorkspaceTab>(initialTab);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Owner · Living here");

  // Digital Key: incoming handover accepted state
  const [handoverAccepted, setHandoverAccepted] = useState(false);

  useEffect(() => {
    if (tabParam === "access" || tabParam === "trustlink" || tabParam === "messages") {
      setActiveTab("trustlink");
    } else if (tabParam && validTabs.includes(tabParam as PropertyWorkspaceTab)) {
      setActiveTab(tabParam as PropertyWorkspaceTab);
    }
  }, [tabParam]);

  const handleTabChange = (tab: PropertyWorkspaceTab) => {
    setActiveTab(tab);
    const newUrl = tab === "overview" ? `/properties/${currentId}` : `/properties/${currentId}?tab=${tab}`;
    router.replace(newUrl, { scroll: false });
  };

  const handleSwitchProperty = (propId: string) => {
    setCurrentId(propId);
    router.push(`/properties/${propId}${activeTab === "overview" ? "" : `?tab=${activeTab}`}`);
  };

  return (
    <div className="flex h-screen bg-[#f4f6f8] text-[#102645] font-sans overflow-hidden">

      {/* Sidebar */}
      <PropertySidebar
        property={property}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onSwitchProperty={handleSwitchProperty}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">

        {/* Top Bar */}
        <header className="h-[62px] border-b border-[#dfe6ef] bg-white px-4 sm:px-6 flex items-center justify-between gap-4 flex-shrink-0 z-20">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-[#68788e] hover:text-[#102645] p-1.5 rounded-lg border border-[#dfe6ef] bg-[#f8fafc]"
              aria-label="Open sidebar menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="relative w-full">
              <svg
                className="w-4 h-4 text-[#94a3b8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search records, documents..."
                className="w-full bg-[#f4f6f8] border border-[#cbd5e1] rounded-lg pl-9 pr-3 py-1.5 text-xs sm:text-[13px] text-[#102645] placeholder-[#94a3b8] focus:bg-white focus:outline-none focus:border-[#071d3b] transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            <Link
              href="/explore"
              className="text-xs text-[#5b6e84] hover:text-[#071d3b] transition-colors font-semibold hidden sm:inline"
            >
              Find a pro
            </Link>

            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#f8fafc] border border-[#cbd5e1] hover:border-[#94a3b8] text-xs text-[#102645] font-semibold transition-colors"
              >
                <span className="truncate max-w-[130px] sm:max-w-none">{selectedRole}</span>
                <svg
                  className={`w-3 h-3 text-[#68788e] transition-transform ${roleMenuOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 top-full mt-1.5 bg-white border border-[#dfe6ef] rounded-xl shadow-lg p-1.5 z-30 min-w-[170px] space-y-1 text-xs">
                  {["Owner · Living here", "Landlord · Investor", "Tenant · Resident", "Property Manager"].map((role) => (
                    <button
                      key={role}
                      onClick={() => { setSelectedRole(role); setRoleMenuOpen(false); }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors ${
                        selectedRole === role ? "bg-[#eef4ff] text-[#071d3b] font-bold" : "text-[#5b6e84] hover:bg-[#f1f5f9] hover:text-[#102645]"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div
              className="w-8 h-8 rounded-full bg-[#071d3b] text-[#efbd66] font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-xs cursor-pointer hover:scale-105 transition-transform"
              title="Alex — Verified Owner"
            >
              SM
            </div>
          </div>
        </header>

        {/* Tab Content */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">

          {/* ══════════════════════════════════════════
              TAB: OVERVIEW
          ══════════════════════════════════════════ */}
          {activeTab === "overview" && (
            <div className="space-y-6 max-w-[1040px] mx-auto pb-12">

              {/* Masthead */}
              <div className="bg-[#071d3b] text-white rounded-2xl p-6 sm:p-7 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <span className="text-[9.5px] font-bold uppercase tracking-[1.6px] text-[#efbd66]">
                        YOUR HOME RECORD
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${property.typeColor}`}>
                        {property.type}
                      </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">
                      {property.street}
                    </h1>
                    <p className="text-xs text-[#b9c8db]">
                      {property.suburb} {property.state} {property.postcode} · Permanent digital home record.
                    </p>
                    <div className="flex items-center gap-3 mt-4 flex-wrap">
                      <span className="font-mono text-xs px-2.5 py-1 bg-white/10 rounded-md font-bold text-[#efbd66] border border-white/20">
                        {property.propId}
                      </span>
                      <span className="text-xs text-[#6ee7b7] flex items-center gap-1 font-medium">
                        <span>✓</span> Verified Sovereign Property Record
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 flex-wrap">
                    <button
                      onClick={() => handleTabChange("digital-key")}
                      className="px-4 py-2.5 bg-[#efbd66] hover:bg-[#dfac55] text-[#071d3b] rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>📦</span>
                      <span>View Digital Key</span>
                    </button>
                    <button
                      onClick={() => handleTabChange("trustlink")}
                      className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-colors border border-white/20 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>🛡️</span>
                      <span>TrustLink</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Property Pulse */}
              <PropertyPulseNotification
                propId={property.propId}
                property={property.street}
                mode="consumer"
                actionHref={`/properties/${currentId}?tab=digital-key`}
                actionLabel="View Record"
              />

              {/* Stat Tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white border border-[#dfe6ef] rounded-xl p-4 shadow-sm">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#68788e]">Verified Documents</div>
                  <div className="text-2xl font-bold text-[#102645] mt-1">{property.documents.length} Files</div>
                  <div className="text-[11px] text-[#24754c] font-semibold mt-0.5">All statutory certs attached</div>
                </div>

                <div
                  className="bg-white border border-[#fcd34d] rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleTabChange("digital-key")}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#92400e]">Incoming</div>
                  <div className="text-2xl font-bold text-[#92400e] mt-1">2 Packs</div>
                  <div className="text-[11px] text-[#68788e] mt-0.5">
                    {handoverAccepted ? "Saved to your record ✓" : "Olivia Hart & Lachlan Vance"}
                  </div>
                </div>

                <div
                  className="bg-white border border-[#dfe6ef] rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleTabChange("trustlink")}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#68788e]">Active TrustLinks</div>
                  <div className="text-2xl font-bold text-[#102645] mt-1">2 Connections</div>
                  <div className="text-[11px] text-[#68788e] mt-0.5">Olivia Hart, Lachlan Vance</div>
                </div>
              </div>

              {/* Property DNA Breakdown */}
              <div className="bg-white border border-[#dfe6ef] rounded-xl p-5 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#dfe6ef] pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-[#102645]">Property Details</h3>
                    <p className="text-xs text-[#68788e]">Cadastral, structural and appliance details for {property.street}.</p>
                  </div>
                  <button
                    onClick={() => handleTabChange("dna")}
                    className="text-xs text-[#071d3b] hover:underline font-bold cursor-pointer"
                  >
                    View Property DNA →
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="bg-[#f8fafc] p-3.5 rounded-lg border border-[#dfe6ef] space-y-1.5">
                    <div className="font-bold text-[#8b641c] uppercase text-[10px]">Legal</div>
                    <div className="text-[#102645] font-medium">{property.legalDna.cadastral}</div>
                    <div className="text-[#68788e]">{property.legalDna.council}</div>
                  </div>
                  <div className="bg-[#f8fafc] p-3.5 rounded-lg border border-[#dfe6ef] space-y-1.5">
                    <div className="font-bold text-[#071d3b] uppercase text-[10px]">Physical</div>
                    <div className="text-[#102645] font-medium">{property.physicalDna.foundation}</div>
                    <div className="text-[#68788e]">{property.physicalDna.cladding}</div>
                  </div>
                  <div className="bg-[#f8fafc] p-3.5 rounded-lg border border-[#dfe6ef] space-y-1.5">
                    <div className="font-bold text-[#24754c] uppercase text-[10px]">Appliances</div>
                    <div className="text-[#102645] font-medium">{property.operationalDna.hotWater}</div>
                    <div className="text-[#68788e]">{property.operationalDna.ac}</div>
                  </div>
                </div>
              </div>

              {/* Logbook */}
              <div className="bg-white border border-[#dfe6ef] rounded-xl p-5 space-y-3 shadow-sm">
                <h3 className="text-sm font-bold text-[#102645]">Recent Activity</h3>
                <div className="space-y-2 text-xs">
                  {property.events.map((evt, idx) => (
                    <div key={idx} className="p-3 bg-[#f8fafc] rounded-lg border border-[#dfe6ef] flex items-center justify-between gap-4">
                      <div>
                        <div className="font-bold text-[#102645]">{evt.title}</div>
                        <div className="text-[#68788e] text-[11px]">{evt.detail}</div>
                      </div>
                      <div className="text-[#8a9bb0] text-[10.5px] font-mono whitespace-nowrap">{evt.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════
              TAB: PROPERTY DNA
          ══════════════════════════════════════════ */}
          {activeTab === "dna" && (
            <PropertyDnaTab
              property={property}
              onOpenTrustLink={() => handleTabChange("trustlink")}
            />
          )}

          {/* ══════════════════════════════════════════
              TAB: DIGITAL KEY
          ══════════════════════════════════════════ */}
          {activeTab === "digital-key" && (
            <DigitalKeyView
              property={property}
              onOpenTrustLink={() => handleTabChange("trustlink")}
            />
          )}

          {/* ══════════════════════════════════════════
              TAB: TRUSTLINK
          ══════════════════════════════════════════ */}
          {(activeTab === "trustlink" || (activeTab as string) === "access") && (
            <div className="space-y-6 max-w-[1040px] mx-auto pb-12">

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="text-[10.5px] font-bold uppercase tracking-[2px] text-[#24754c] mb-1">
                    SCOPED ACCESS &amp; PERMISSIONS
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight text-[#102645] mb-1.5">
                    TrustLink
                  </h1>
                  <p className="text-[13px] text-[#68788e]">
                    Specialists who have verified permission to access records for {property.street}.
                  </p>
                </div>
                <button
                  onClick={() => alert("Grant TrustLink access: Choose a professional and decide exactly which documents to share.")}
                  className="self-start px-4 py-2 bg-[#071d3b] hover:bg-[#15345d] text-white font-bold text-xs rounded-xl shadow-sm transition-colors cursor-pointer"
                >
                  + Create TrustLink
                </button>
              </div>

              {/* Access Cards */}
              <div className="space-y-4">

                {/* Person 1 */}
                <div className="bg-white border border-[#dfe6ef] rounded-2xl p-5 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#e6eaf3] text-[#425b7c] font-serif font-bold text-lg flex items-center justify-center flex-shrink-0">
                      OH
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div>
                          <h3 className="text-base font-bold text-[#102645]">Olivia Hart</h3>
                          <p className="text-[12px] text-[#68788e]">Builder & handover contact · Hart Homes</p>
                        </div>
                        <span className="self-start text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#dcfce7] text-[#166534] border border-[#86efac]">
                          Active
                        </span>
                      </div>

                      <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3 text-[11px]">
                        <div>
                          <div className="text-[9.5px] uppercase font-bold text-[#94a3b8] mb-0.5">Purpose</div>
                          <div className="text-[#102645] font-medium">New home handover</div>
                        </div>
                        <div>
                          <div className="text-[9.5px] uppercase font-bold text-[#94a3b8] mb-0.5">Can see</div>
                          <div className="text-[#102645] font-medium">3 documents</div>
                        </div>
                        <div>
                          <div className="text-[9.5px] uppercase font-bold text-[#94a3b8] mb-0.5">Access ends</div>
                          <div className="text-[#102645] font-medium">21 Oct 2026</div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-2 flex-wrap">
                        <Link
                          href="/trustlinks/welcome"
                          className="px-3 py-1.5 bg-[#f3f6fb] hover:bg-[#e4ebf5] text-[#071d3b] font-bold text-[11px] rounded-lg border border-[#dfe6ef] transition-colors"
                        >
                          View full connection →
                        </Link>
                        <Link
                          href="/trustlinks/welcome?tab=conversation"
                          className="px-3 py-1.5 text-[#68788e] hover:text-[#102645] font-semibold text-[11px] transition-colors flex items-center gap-1"
                        >
                          💬 Message
                        </Link>
                        <button
                          onClick={() => alert("Olivia Hart's access has been paused.")}
                          className="px-3 py-1.5 text-[#68788e] hover:text-[#102645] font-semibold text-[11px] transition-colors cursor-pointer"
                        >
                          ⏸ Pause
                        </button>
                        <button
                          onClick={() => alert("Olivia Hart's access has been removed.")}
                          className="px-3 py-1.5 text-[#a44042] hover:text-[#7f1d1d] font-semibold text-[11px] transition-colors cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Person 2 */}
                <div className="bg-white border border-[#dfe6ef] rounded-2xl p-5 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#eaf5ef] text-[#24754c] font-serif font-bold text-lg flex items-center justify-center flex-shrink-0">
                      LV
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div>
                          <h3 className="text-base font-bold text-[#102645]">Lachlan Vance</h3>
                          <p className="text-[12px] text-[#68788e]">Licensed Conveyancer · River City Conveyancing</p>
                        </div>
                        <span className="self-start text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#dcfce7] text-[#166534] border border-[#86efac]">
                          Active
                        </span>
                      </div>

                      <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3 text-[11px]">
                        <div>
                          <div className="text-[9.5px] uppercase font-bold text-[#94a3b8] mb-0.5">Purpose</div>
                          <div className="text-[#102645] font-medium">Settlement & PEXA</div>
                        </div>
                        <div>
                          <div className="text-[9.5px] uppercase font-bold text-[#94a3b8] mb-0.5">Can see</div>
                          <div className="text-[#102645] font-medium">2 documents</div>
                        </div>
                        <div>
                          <div className="text-[9.5px] uppercase font-bold text-[#94a3b8] mb-0.5">Access ends</div>
                          <div className="text-[#102645] font-medium">05 Nov 2026</div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-2 flex-wrap">
                        <Link
                          href="/trustlinks/TL-88301-A"
                          className="px-3 py-1.5 bg-[#f3f6fb] hover:bg-[#e4ebf5] text-[#071d3b] font-bold text-[11px] rounded-lg border border-[#dfe6ef] transition-colors"
                        >
                          View full connection →
                        </Link>
                        <Link
                          href="/trustlinks/TL-88301-A?tab=conversation"
                          className="px-3 py-1.5 text-[#68788e] hover:text-[#102645] font-semibold text-[11px] transition-colors flex items-center gap-1"
                        >
                          💬 Message
                        </Link>
                        <button
                          onClick={() => alert("Lachlan Vance's access has been paused.")}
                          className="px-3 py-1.5 text-[#68788e] hover:text-[#102645] font-semibold text-[11px] transition-colors cursor-pointer"
                        >
                          ⏸ Pause
                        </button>
                        <button
                          onClick={() => alert("Lachlan Vance's access has been removed.")}
                          className="px-3 py-1.5 text-[#a44042] hover:text-[#7f1d1d] font-semibold text-[11px] transition-colors cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#f0f7f3] border border-[#c7e4d0] flex items-center gap-3 text-[12px] text-[#1e3a2f]">
                <span className="text-base flex-shrink-0">🔒</span>
                <span>
                  Your documents never leave your record. Professionals get a read-only scoped view of only what you approve, for only as long as you allow.
                </span>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen bg-[#f4f6f8] text-[#102645]">
          <div className="text-xs text-[#68788e]">Loading...</div>
        </div>
      }
    >
      <PropertyDetailInner id={id} />
    </Suspense>
  );
}
