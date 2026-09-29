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
    tabParam && ["overview", "digital-key", "trustlink", "properties", "messages"].includes(tabParam)
      ? tabParam
      : "overview"
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Owner · Living here");

  // Communication message composer for this property
  const [newMessage, setNewMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      id: "m-1",
      sender: "David Miller",
      role: "Miller's Building & Pest Inspections",
      avatar: "DM",
      time: "Yesterday at 2:14 PM",
      text: `Hello Alex, I've reviewed the Form 16 engineering & foundation files scoped via TrustLink for ${property.street}. The slab elevation and termite protection meet standard criteria.`,
      isUser: false,
    },
    {
      id: "m-2",
      sender: "Alex (You)",
      role: "Property Owner",
      avatar: "SM",
      time: "Yesterday at 4:30 PM",
      text: "Thanks David. Can you confirm if the wet-area waterproofing certificate is also verified in your report?",
      isUser: true,
    },
    {
      id: "m-3",
      sender: "David Miller",
      role: "Miller's Building & Pest Inspections",
      avatar: "DM",
      time: "Today at 9:05 AM",
      text: "Yes, Form 43 signed by HydroSeal QLD is verified. Full compliance report ready in TrustLink.",
      isUser: false,
    },
  ]);

  // Sync tab with URL
  useEffect(() => {
    if (tabParam && ["overview", "digital-key", "trustlink", "properties", "messages"].includes(tabParam)) {
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

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setChatMessages([
      ...chatMessages,
      {
        id: `m-${Date.now()}`,
        sender: "Alex (You)",
        role: "Property Owner",
        avatar: "SM",
        time: "Just now",
        text: newMessage.trim(),
        isUser: true,
      },
    ]);
    setNewMessage("");
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
                    Trust Links for {property.street}
                  </h1>
                  <p className="text-[13px] text-[#68788e]">
                    Manage granular permissions and professional connections specific to this property.
                  </p>
                </div>
              </div>

              {/* TrustLink Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {/* Connection 1 */}
                <article className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl font-serif font-bold text-lg flex items-center justify-center flex-shrink-0 bg-[#e6eaf3] text-[#425b7c]">
                          OH
                        </div>
                        <div>
                          <span className="text-[9px] font-bold uppercase tracking-[1px] text-[#68788e] block">
                            TRUST LINK
                          </span>
                          <h3 className="text-base font-bold text-[#102645] leading-tight">
                            Olivia Hart
                          </h3>
                          <p className="text-[11px] text-[#68788e]">
                            Builder & handover contact
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#eaf5ef] text-[#24754c]">
                        Active
                      </span>
                    </div>
                    <p className="text-[13px] font-medium text-[#102645] mb-4">
                      New home handover
                    </p>
                    <div className="bg-[#f3f6fb] p-3 rounded-lg flex flex-col gap-2 text-[11px] text-[#102645] mb-4 border border-[#dfe6ef]">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🔑</span>
                        <div>
                          <div className="font-bold">Digital Key Connected</div>
                          <div className="text-[#68788e]">Scoped Handover Files</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-[#dfe6ef] flex items-center justify-between text-[11px]">
                    <Link
                      href="/trustlinks/welcome"
                      className="px-4 py-2 bg-[#071d3b] hover:bg-[#15345d] text-white font-bold rounded-xl transition-colors shadow-2xs"
                    >
                      Open Trust Link →
                    </Link>
                  </div>
                </article>

                {/* Connection 2 */}
                <article className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl font-serif font-bold text-lg flex items-center justify-center flex-shrink-0 bg-[#eaf5ef] text-[#24754c]">
                          LV
                        </div>
                        <div>
                          <span className="text-[9px] font-bold uppercase tracking-[1px] text-[#68788e] block">
                            TRUST LINK
                          </span>
                          <h3 className="text-base font-bold text-[#102645] leading-tight">
                            Lachlan Vance
                          </h3>
                          <p className="text-[11px] text-[#68788e]">
                            Licensed Conveyancer
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#eaf5ef] text-[#24754c]">
                        Active
                      </span>
                    </div>
                    <p className="text-[13px] font-medium text-[#102645] mb-4">
                      Settlement Contract & PEXA Workspace
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-[11px] text-[#68788e] py-3 border-t border-[#dfe6ef] mb-1">
                      <div>
                        <span className="block text-[9px] uppercase tracking-[0.7px] text-[#8a97a7]">Shared documents</span>
                        <strong className="text-[#102645] font-semibold">2 selected</strong>
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase tracking-[0.7px] text-[#8a97a7]">Permission ends</span>
                        <strong className="text-[#102645] font-semibold">05 Nov 2026</strong>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-[#dfe6ef] flex items-center justify-between text-[11px]">
                    <Link
                      href="/trustlinks/TL-88301-A"
                      className="px-4 py-2 bg-[#f3f6fb] hover:bg-[#e4ebf5] text-[#071d3b] font-bold rounded-xl transition-colors border border-[#dfe6ef]"
                    >
                      Open Trust Link →
                    </Link>
                  </div>
                </article>
              </div>

              {/* Informational Banner */}
              <div className="mt-4 p-4 rounded-xl bg-[#eaf0f6] border border-[#dfe6ef] flex items-center gap-3 text-[12px] text-[#4e6582]">
                <span className="text-lg flex-shrink-0">🔒</span>
                <span>
                  Your property record stays with you when a connection ends. Professional access is specific to the information and time period you approve.
                </span>
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

          {/* ═════════════════════════════════════════════════════════════ */}
          {/* TAB 5: MESSAGES (Light Theme)                                */}
          {/* ═════════════════════════════════════════════════════════════ */}
          {activeTab === "messages" && (
            <div className="space-y-6 max-w-[1040px] mx-auto pb-12">
              
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="text-[10.5px] font-bold uppercase tracking-[2px] text-[#24754c] mb-1">
                    PROPERTY COMMUNICATIONS
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight text-[#102645] mb-1.5">
                    Messages · {property.street}
                  </h1>
                  <p className="text-[13px] text-[#68788e]">
                    Direct messaging with verified specialists connected via TrustLink.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
                  <span className="text-xs text-[#68788e]">David Miller is online</span>
                </div>
              </div>

              {/* Chat Thread Container */}
              <div className="bg-white border border-[#dfe6ef] rounded-2xl overflow-hidden flex flex-col h-[520px] shadow-sm">
                
                {/* Chat Header */}
                <div className="p-4 border-b border-[#dfe6ef] bg-[#f8fafc] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#eef4ff] text-[#071d3b] font-bold text-xs flex items-center justify-center border border-[#cbd5e1]">
                      DM
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#102645]">David Miller</h4>
                      <p className="text-[11px] text-[#68788e]">
                        Miller's Building & Pest Inspections · TrustLink {property.trustlinkId}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleTabChange("trustlink")}
                    className="text-xs text-[#071d3b] hover:underline font-bold cursor-pointer"
                  >
                    View Scoped TrustLink →
                  </button>
                </div>

                {/* Message History */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#fcfdfe]">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 max-w-xl ${msg.isUser ? "ml-auto flex-row-reverse" : ""}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                          msg.isUser
                            ? "bg-[#071d3b] text-[#efbd66]"
                            : "bg-[#eef4ff] text-[#071d3b] border border-[#cbd5e1]"
                        }`}
                      >
                        {msg.avatar}
                      </div>
                      <div>
                        <div
                          className={`flex items-center gap-2 mb-1 text-[11px] ${
                            msg.isUser ? "justify-end" : ""
                          }`}
                        >
                          <span className="font-semibold text-[#102645]">{msg.sender}</span>
                          <span className="text-[#8a9bb0]">{msg.time}</span>
                        </div>
                        <div
                          className={`p-3.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed ${
                            msg.isUser
                              ? "bg-[#071d3b] text-white shadow-2xs"
                              : "bg-[#f1f5f9] text-[#102645] border border-[#e2e8f0]"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input Box */}
                <form
                  onSubmit={handleSendMessage}
                  className="p-3 border-t border-[#dfe6ef] bg-[#f8fafc] flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={`Reply regarding ${property.street}...`}
                    className="flex-1 bg-white border border-[#cbd5e1] rounded-xl px-4 py-2.5 text-xs text-[#102645] placeholder-[#94a3b8] focus:outline-none focus:border-[#071d3b]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#071d3b] hover:bg-[#15345d] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer flex-shrink-0 shadow-2xs"
                  >
                    Send
                  </button>
                </form>
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
