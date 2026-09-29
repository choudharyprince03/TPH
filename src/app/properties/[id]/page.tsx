"use client";
import React, { use, useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getPropertyById, PROPERTIES_LIST, PropertyData } from "@/lib/properties";
import { PropertyPulseNotification } from "@/components/features/PropertyPulse";
import { PropertySidebar, PropertyWorkspaceTab } from "@/components/layout/PropertySidebar";
import { DigitalKeyView } from "@/components/features/DigitalKeyView";

function PropertyDetailInner({ id }: { id: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") as PropertyWorkspaceTab | null;

  const [currentId, setCurrentId] = useState(id);
  const property = getPropertyById(currentId);

  const [activeTab, setActiveTab] = useState<PropertyWorkspaceTab>(
    tabParam && ["overview", "digital-key", "trustlink", "properties"].includes(tabParam)
      ? tabParam
      : "overview"
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Owner · Living here");

  // Sync tab with URL
  useEffect(() => {
    if (tabParam && ["overview", "digital-key", "trustlink", "properties"].includes(tabParam)) {
      setActiveTab(tabParam);
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

  const trustlinkUrl = property.trustlinkHref || `/trustlinks/${property.trustlinkId || "TL-99214-B"}`;

  return (
    <div className="flex h-screen bg-[#f4f6f8] text-[#102645] font-sans overflow-hidden">
      
      {/* ── Left Sidebar (Light Theme: Overview, Digital Key, TrustLink, Properties, Messages) ── */}
      <PropertySidebar
        property={property}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onSwitchProperty={handleSwitchProperty}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* ── Main View Area (Light Theme) ── */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* ── Top Bar (Light Theme) ── */}
        <header className="h-[62px] border-b border-[#dfe6ef] bg-white px-4 sm:px-6 flex items-center justify-between gap-4 flex-shrink-0 z-20">
          
          <div className="flex items-center gap-3 flex-1 max-w-md">
            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-[#68788e] hover:text-[#102645] p-1.5 rounded-lg border border-[#dfe6ef] bg-[#f8fafc]"
              aria-label="Open sidebar menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Search Input */}
            <div className="relative w-full">
              <svg
                className="w-4 h-4 text-[#94a3b8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search records, equipment or folders..."
                className="w-full bg-[#f4f6f8] border border-[#cbd5e1] rounded-lg pl-9 pr-3 py-1.5 text-xs sm:text-[13px] text-[#102645] placeholder-[#94a3b8] focus:bg-white focus:outline-none focus:border-[#071d3b] transition-colors"
              />
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            <Link
              href="/explore"
              className="text-xs text-[#5b6e84] hover:text-[#071d3b] transition-colors font-semibold hidden sm:inline"
            >
              Find a pro
            </Link>

            {/* Role Dropdown */}
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
                      onClick={() => {
                        setSelectedRole(role);
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors ${
                        selectedRole === role
                          ? "bg-[#eef4ff] text-[#071d3b] font-bold"
                          : "text-[#5b6e84] hover:bg-[#f1f5f9] hover:text-[#102645]"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Avatar Circle: SM */}
            <div
              className="w-8 h-8 rounded-full bg-[#071d3b] text-[#efbd66] font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-xs cursor-pointer hover:scale-105 transition-transform"
              title="Signed in as Alex (SM)"
              onClick={() => alert(`Active user account: Alex (Owner of ${property.street}). Record access: Verified Owner.`)}
            >
              SM
            </div>
          </div>
        </header>

        {/* ── Scrollable Tab Content Container (Light Theme) ── */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
          
          {/* ═════════════════════════════════════════════════════════════ */}
          {/* TAB 1: OVERVIEW (Light Theme)                                */}
          {/* ═════════════════════════════════════════════════════════════ */}
          {activeTab === "overview" && (
            <div className="space-y-6 max-w-[1040px] mx-auto pb-12">
              
              {/* Masthead Banner */}
              <div className="bg-[#071d3b] text-white rounded-2xl p-6 sm:p-7 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <span className="text-[9.5px] font-bold uppercase tracking-[1.6px] text-[#efbd66]">
                        PROP ID · DIGITAL RECORD
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
                        <span>🔑</span> Verified Sovereign Property Record
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 flex-wrap">
                    <button
                      onClick={() => handleTabChange("digital-key")}
                      className="px-4 py-2.5 bg-[#efbd66] hover:bg-[#dfac55] text-[#071d3b] rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>🔑</span>
                      <span>Open Digital Key</span>
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

              {/* Minimal Property Pulse Notification */}
              <PropertyPulseNotification
                propId={property.propId}
                property={property.street}
                mode="consumer"
                trustlinkHref={trustlinkUrl}
                actionHref={`/properties/${currentId}?tab=digital-key`}
                actionLabel="Digital Key"
              />

              {/* Quick Stat Tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white border border-[#dfe6ef] rounded-xl p-4 shadow-sm">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#68788e]">
                    Verified Records
                  </div>
                  <div className="text-2xl font-bold text-[#102645] mt-1">
                    {property.documents.length} Files
                  </div>
                  <div className="text-[11px] text-[#24754c] font-semibold mt-0.5">
                    Statutory Form 16 & Form 43 attached
                  </div>
                </div>

                <div className="bg-white border border-[#dfe6ef] rounded-xl p-4 shadow-sm">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#68788e]">
                    Active TrustLink
                  </div>
                  <div className="text-2xl font-bold text-[#071d3b] mt-1">
                    1 Scoped
                  </div>
                  <div className="text-[11px] text-[#68788e] mt-0.5">
                    Miller's Building & Pest Inspections
                  </div>
                </div>

                <div className="bg-white border border-[#dfe6ef] rounded-xl p-4 shadow-sm">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#68788e]">
                    Digital Handover
                  </div>
                  <div className="text-2xl font-bold text-[#8b641c] mt-1">
                    Protected
                  </div>
                  <div className="text-[11px] text-[#68788e] mt-0.5">
                    Managed in Digital Key
                  </div>
                </div>
              </div>

              {/* Property DNA Breakdown Preview */}
              <div className="bg-white border border-[#dfe6ef] rounded-xl p-5 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#dfe6ef] pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-[#102645]">Property DNA Breakdown</h3>
                    <p className="text-xs text-[#68788e]">Cadastral, structural and appliance details for {property.street}.</p>
                  </div>
                  <button
                    onClick={() => handleTabChange("digital-key")}
                    className="text-xs text-[#071d3b] hover:underline font-bold"
                  >
                    Pack into Digital Key →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="bg-[#f8fafc] p-3.5 rounded-lg border border-[#dfe6ef] space-y-1.5">
                    <div className="font-bold text-[#8b641c] uppercase text-[10px]">Legal DNA</div>
                    <div className="text-[#102645] font-medium">{property.legalDna.cadastral}</div>
                    <div className="text-[#68788e]">{property.legalDna.council}</div>
                  </div>
                  <div className="bg-[#f8fafc] p-3.5 rounded-lg border border-[#dfe6ef] space-y-1.5">
                    <div className="font-bold text-[#071d3b] uppercase text-[10px]">Physical DNA</div>
                    <div className="text-[#102645] font-medium">{property.physicalDna.foundation}</div>
                    <div className="text-[#68788e]">{property.physicalDna.cladding}</div>
                  </div>
                  <div className="bg-[#f8fafc] p-3.5 rounded-lg border border-[#dfe6ef] space-y-1.5">
                    <div className="font-bold text-[#24754c] uppercase text-[10px]">Operational DNA</div>
                    <div className="text-[#102645] font-medium">{property.operationalDna.hotWater}</div>
                    <div className="text-[#68788e]">{property.operationalDna.ac}</div>
                  </div>
                </div>
              </div>

              {/* Recent Logbook Events */}
              <div className="bg-white border border-[#dfe6ef] rounded-xl p-5 space-y-3 shadow-sm">
                <h3 className="text-sm font-bold text-[#102645]">Recent Property Logbook Activity</h3>
                <div className="space-y-2 text-xs">
                  {property.events.map((evt, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#f8fafc] rounded-lg border border-[#dfe6ef] flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="font-bold text-[#102645]">{evt.title}</div>
                        <div className="text-[#68788e] text-[11px]">{evt.detail}</div>
                      </div>
                      <div className="text-[#8a9bb0] text-[10.5px] font-mono whitespace-nowrap">
                        {evt.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ═════════════════════════════════════════════════════════════ */}
          {/* TAB 2: DIGITAL KEY (Light Theme)                             */}
          {/* ═════════════════════════════════════════════════════════════ */}
          {activeTab === "digital-key" && (
            <DigitalKeyView
              property={property}
              onOpenTrustLink={() => handleTabChange("trustlink")}
            />
          )}

          {/* ═════════════════════════════════════════════════════════════ */}
          {/* TAB 3: TRUSTLINK (Light Theme)                               */}
          {/* ═════════════════════════════════════════════════════════════ */}
          {activeTab === "trustlink" && (
            <div className="space-y-6 max-w-[1040px] mx-auto pb-12">
              
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="text-[10.5px] font-bold uppercase tracking-[2px] text-[#24754c] mb-1">
                    SCOPED ACCESS GOVERNANCE
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight text-[#102645] mb-1.5">
                    Trust Link · {property.trustlinkId}
                  </h1>
                  <p className="text-[13px] text-[#68788e]">
                    Manage granular permissions and professional connections for {property.street}.
                  </p>
                </div>

                <Link
                  href={trustlinkUrl}
                  className="self-start sm:self-auto px-4 py-2 bg-[#071d3b] hover:bg-[#15345d] text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <span>Open Full Portal</span>
                  <span>↗</span>
                </Link>
              </div>

              {/* Status Banner */}
              <div className="bg-white border border-[#dfe6ef] rounded-xl p-5 flex items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#10b981] shadow-[0_0_10px_rgba(16,185,129,0.4)] flex-shrink-0 animate-pulse" />
                  <div>
                    <h3 className="text-sm font-bold text-[#102645]">TrustLink Active & Scoped</h3>
                    <p className="text-xs text-[#68788e]">Connected Specialist: Miller's Building & Pest Inspections (David Miller)</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono font-bold text-[#8b641c] bg-[#fff4df] px-2.5 py-1 rounded border border-[#ffe0a3]">
                  Expires in 28 Days
                </span>
              </div>

              {/* Connected Digital Key Section */}
              <div className="bg-white border border-[#dfe6ef] rounded-xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#eaf5ef] text-[#24754c] flex items-center justify-center font-bold text-lg flex-shrink-0 border border-[#d2e6d9]">
                    🔑
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="text-sm font-bold text-[#102645]">Digital Key Connected</h4>
                      <span className="text-[9.5px] font-bold px-1.5 py-0.2 rounded bg-[#eaf5ef] text-[#24754c]">
                        Scoped Handover
                      </span>
                    </div>
                    <p className="text-xs text-[#68788e]">
                      Records shared in this TrustLink are verified and governed by your Digital Key for {property.street}.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleTabChange("digital-key")}
                  className="px-3.5 py-2 bg-[#f8fafc] hover:bg-[#f1f5f9] text-[#071d3b] rounded-lg text-xs font-bold border border-[#cbd5e1] transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer"
                >
                  Manage in Digital Key →
                </button>
              </div>

              {/* Scoped Document Permissions List */}
              <div className="bg-white border border-[#dfe6ef] rounded-xl p-5 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#dfe6ef] pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-[#102645]">Scoped Document Permissions</h3>
                    <p className="text-xs text-[#68788e]">Selectively shared files from your Digital Key.</p>
                  </div>
                  <button
                    onClick={() => handleTabChange("digital-key")}
                    className="text-xs text-[#24754c] hover:underline font-bold"
                  >
                    + Add Pack from Digital Key
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  {property.documents.map((doc, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#f8fafc] rounded-lg border border-[#dfe6ef] flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-[#071d3b]">📄</span>
                        <div className="min-w-0">
                          <div className="font-bold text-[#102645] truncate">{doc.title}</div>
                          <div className="text-[#68788e] text-[10.5px]">{doc.cat} · {doc.size}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            doc.shared
                              ? "bg-[#eaf5ef] text-[#24754c] border border-[#d2e6d9]"
                              : "bg-[#f1f5f9] text-[#68788e] border border-[#e2e8f0]"
                          }`}
                        >
                          {doc.shared ? "Shared (Read-Only)" : "Private (Revoked)"}
                        </span>
                        <button
                          onClick={() => alert(`Access toggled for ${doc.title}`)}
                          className="text-[11px] text-[#071d3b] hover:underline font-semibold"
                        >
                          Toggle
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => alert("TrustLink connection paused. Professionals cannot view documents until resumed.")}
                  className="px-3.5 py-2 bg-white hover:bg-slate-50 text-[#102645] rounded-lg text-xs font-semibold border border-[#cbd5e1] transition-colors"
                >
                  Pause Access
                </button>
                <button
                  onClick={() => alert("TrustLink revoked. All shared tokens invalidated immediately.")}
                  className="px-3.5 py-2 bg-[#fef2f2] hover:bg-[#fee2e2] text-[#b91c1c] rounded-lg text-xs font-bold border border-[#fecaca] transition-colors"
                >
                  Revoke Connection
                </button>
              </div>
            </div>
          )}

          {/* ═════════════════════════════════════════════════════════════ */}
          {/* TAB 4: PROPERTIES (Light Theme)                              */}
          {/* ═════════════════════════════════════════════════════════════ */}
          {activeTab === "properties" && (
            <div className="space-y-6 max-w-[1040px] mx-auto pb-12">
              
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="text-[10.5px] font-bold uppercase tracking-[2px] text-[#24754c] mb-1">
                    MY PROPERTY PORTFOLIO
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight text-[#102645] mb-1.5">
                    Your Properties
                  </h1>
                  <p className="text-[13px] text-[#68788e]">
                    Switch between your managed digital homes or open the directory.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/properties"
                    className="px-3.5 py-2 bg-white hover:bg-[#f1f5f9] text-[#102645] rounded-lg text-xs font-semibold border border-[#cbd5e1] transition-colors"
                  >
                    Directory View
                  </Link>
                  <Link
                    href="/properties/new"
                    className="px-3.5 py-2 bg-[#071d3b] hover:bg-[#15345d] text-white rounded-lg text-xs font-bold transition-colors shadow-2xs"
                  >
                    + Add Property
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {PROPERTIES_LIST.map((p) => {
                  const isCurrent = p.id === property.id;
                  return (
                    <div
                      key={p.id}
                      className={`bg-white border rounded-2xl p-5 flex flex-col justify-between transition-all shadow-sm ${
                        isCurrent
                          ? "border-[#071d3b] ring-2 ring-[#071d3b]/10"
                          : "border-[#dfe6ef] hover:border-[#cbd5e1]"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded ${p.typeColor}`}>
                            {p.type}
                          </span>
                          {isCurrent ? (
                            <span className="text-[10px] font-bold text-[#071d3b] bg-[#eef4ff] px-2 py-0.5 rounded border border-[#cbd5e1]">
                              Current Home
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono text-[#68788e]">
                              {p.propId}
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-bold text-[#102645] mb-1">{p.street}</h3>
                        <p className="text-xs text-[#68788e] mb-4">
                          {p.suburb} {p.state} {p.postcode}
                        </p>

                        <div className="space-y-1.5 text-xs text-[#68788e] border-t border-[#dfe6ef] pt-3">
                          <div className="flex items-center justify-between">
                            <span>Documents:</span>
                            <span className="text-[#102645] font-bold">{p.documents.length} verified</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>TrustLink:</span>
                            <span className="text-[#24754c] font-mono font-bold">{p.trustlinkId}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-[#dfe6ef] flex items-center justify-between gap-2">
                        {isCurrent ? (
                          <button
                            onClick={() => handleTabChange("digital-key")}
                            className="w-full py-1.5 bg-[#eaf5ef] hover:bg-[#d8edd4] text-[#24754c] font-bold rounded-lg text-xs text-center border border-[#d2e6d9] cursor-pointer"
                          >
                            Open Digital Key
                          </button>
                        ) : (
                          <button
                            onClick={() => handleSwitchProperty(p.id)}
                            className="w-full py-1.5 bg-[#f8fafc] hover:bg-[#f1f5f9] text-[#102645] font-bold rounded-lg text-xs text-center border border-[#cbd5e1] transition-colors cursor-pointer"
                          >
                            Switch to this Home →
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
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
          <div className="text-xs text-[#68788e]">Loading property workspace...</div>
        </div>
      }
    >
      <PropertyDetailInner id={id} />
    </Suspense>
  );
}
