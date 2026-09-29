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

  // Communication message composer
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
    <div className="flex h-screen bg-[#071628] text-white font-sans overflow-hidden">
      
      {/* ── Left Sidebar (Image 1: Overview, Digital Key, TrustLink, Properties, Messages) ── */}
      <PropertySidebar
        property={property}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onSwitchProperty={handleSwitchProperty}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* ── Main View Area ── */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* ── Top Bar (Image 2: Search, Find a Pro, Owner Role, Avatar) ── */}
        <header className="h-[62px] border-b border-[#12283e] bg-[#071628] px-4 sm:px-6 flex items-center justify-between gap-4 flex-shrink-0 z-20">
          
          <div className="flex items-center gap-3 flex-1 max-w-md">
            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-[#8096ae] hover:text-white p-1 rounded-lg border border-[#1a3857] bg-[#0b2138]"
              aria-label="Open sidebar menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Search Input from Image 2 */}
            <div className="relative w-full">
              <svg
                className="w-4 h-4 text-[#4f6c89] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
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
                className="w-full bg-[#0a1e33] border border-[#173757] rounded-lg pl-9 pr-3 py-1.5 text-xs sm:text-[13px] text-slate-200 placeholder-[#4f6c89] focus:outline-none focus:border-[#38bdf8] transition-colors"
              />
            </div>
          </div>

          {/* Right Header Controls (Image 2) */}
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            <Link
              href="/explore"
              className="text-xs text-[#7e99b7] hover:text-white transition-colors font-medium hidden sm:inline"
            >
              Find a pro
            </Link>

            {/* Role Dropdown from Image 2 */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0b2138] border border-[#1b3857] hover:border-[#285580] text-xs text-slate-200 font-medium transition-colors"
              >
                <span className="truncate max-w-[130px] sm:max-w-none">{selectedRole}</span>
                <svg
                  className={`w-3 h-3 text-[#6f8aa5] transition-transform ${roleMenuOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 top-full mt-1.5 bg-[#091b2f] border border-[#1b3d62] rounded-xl shadow-xl p-1.5 z-30 min-w-[170px] space-y-1 text-xs">
                  {["Owner · Living here", "Landlord · Investor", "Tenant · Resident", "Property Manager"].map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        setSelectedRole(role);
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors ${
                        selectedRole === role
                          ? "bg-[#112d48] text-[#38bdf8] font-bold"
                          : "text-[#8ea4bc] hover:bg-[#0e253e] hover:text-white"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Avatar Circle: SM from Image 2 */}
            <div
              className="w-8 h-8 rounded-full bg-[#143454] border border-[#234d75] text-[#93c5fd] font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-xs cursor-pointer hover:border-[#38bdf8] transition-colors"
              title="Signed in as Alex (SM)"
              onClick={() => alert(`Active user account: Alex (Owner of ${property.street}). Record access: Verified Owner.`)}
            >
              SM
            </div>
          </div>
        </header>

        {/* ── Scrollable Tab Content Container ── */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
          
          {/* ═════════════════════════════════════════════════════════════ */}
          {/* TAB 1: OVERVIEW                                              */}
          {/* ═════════════════════════════════════════════════════════════ */}
          {activeTab === "overview" && (
            <div className="space-y-6 max-w-[1040px] mx-auto pb-12">
              
              {/* Masthead Banner */}
              <div className="bg-[#092036] border border-[#173859] rounded-2xl p-6 sm:p-7 shadow-sm">
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
                    <p className="text-xs text-[#8aa1b8]">
                      {property.suburb} {property.state} {property.postcode} · Permanent digital home record.
                    </p>

                    <div className="flex items-center gap-3 mt-4 flex-wrap">
                      <span className="font-mono text-xs px-2.5 py-1 bg-[#061729] rounded-md font-bold text-[#efbd66] border border-[#efbd66]/20">
                        {property.propId}
                      </span>
                      <span className="text-xs text-[#10b981] flex items-center gap-1">
                        <span>🔑</span> Verified Sovereign Property Record
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 flex-wrap">
                    <button
                      onClick={() => handleTabChange("digital-key")}
                      className="px-4 py-2.5 bg-[#a7f3d0] hover:bg-[#86efac] text-[#064e3b] rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>🔑</span>
                      <span>Open Digital Key</span>
                    </button>
                    <button
                      onClick={() => handleTabChange("trustlink")}
                      className="px-4 py-2.5 bg-[#122e49] hover:bg-[#1a3f64] text-white rounded-xl text-xs font-semibold transition-colors border border-[#214b73] flex items-center gap-1.5 cursor-pointer"
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
                <div className="bg-[#092036] border border-[#173859] rounded-xl p-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#6f8ba7]">
                    Verified Records
                  </div>
                  <div className="text-2xl font-bold text-white mt-1">
                    {property.documents.length} Files
                  </div>
                  <div className="text-[11px] text-[#10b981] mt-0.5">
                    Statutory Form 16 & Form 43 attached
                  </div>
                </div>

                <div className="bg-[#092036] border border-[#173859] rounded-xl p-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#6f8ba7]">
                    Active TrustLink
                  </div>
                  <div className="text-2xl font-bold text-[#38bdf8] mt-1">
                    1 Scoped
                  </div>
                  <div className="text-[11px] text-[#7ea0be] mt-0.5">
                    Miller's Building & Pest Inspections
                  </div>
                </div>

                <div className="bg-[#092036] border border-[#173859] rounded-xl p-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#6f8ba7]">
                    Digital Handover
                  </div>
                  <div className="text-2xl font-bold text-[#efbd66] mt-1">
                    Protected
                  </div>
                  <div className="text-[11px] text-[#8aa1b8] mt-0.5">
                    Managed in Digital Key
                  </div>
                </div>
              </div>

              {/* Property DNA Breakdown Preview */}
              <div className="bg-[#092036] border border-[#173859] rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-[#142d45] pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white">Property DNA Breakdown</h3>
                    <p className="text-xs text-[#7e99b7]">Cadastral, structural and appliance details for {property.street}.</p>
                  </div>
                  <button
                    onClick={() => handleTabChange("digital-key")}
                    className="text-xs text-[#38bdf8] hover:underline font-semibold"
                  >
                    Pack into Digital Key →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="bg-[#07192d] p-3.5 rounded-lg border border-[#163554] space-y-1.5">
                    <div className="font-bold text-[#efbd66] uppercase text-[10px]">Legal DNA</div>
                    <div className="text-slate-200">{property.legalDna.cadastral}</div>
                    <div className="text-[#6d88a4]">{property.legalDna.council}</div>
                  </div>
                  <div className="bg-[#07192d] p-3.5 rounded-lg border border-[#163554] space-y-1.5">
                    <div className="font-bold text-[#38bdf8] uppercase text-[10px]">Physical DNA</div>
                    <div className="text-slate-200">{property.physicalDna.foundation}</div>
                    <div className="text-[#6d88a4]">{property.physicalDna.cladding}</div>
                  </div>
                  <div className="bg-[#07192d] p-3.5 rounded-lg border border-[#163554] space-y-1.5">
                    <div className="font-bold text-[#6ee7b7] uppercase text-[10px]">Operational DNA</div>
                    <div className="text-slate-200">{property.operationalDna.hotWater}</div>
                    <div className="text-[#6d88a4]">{property.operationalDna.ac}</div>
                  </div>
                </div>
              </div>

              {/* Recent Logbook Events */}
              <div className="bg-[#092036] border border-[#173859] rounded-xl p-5 space-y-3">
                <h3 className="text-sm font-bold text-white">Recent Property Logbook Activity</h3>
                <div className="space-y-2 text-xs">
                  {property.events.map((evt, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#07192d] rounded-lg border border-[#163554] flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="font-semibold text-white">{evt.title}</div>
                        <div className="text-[#7e99b7] text-[11px]">{evt.detail}</div>
                      </div>
                      <div className="text-[#557393] text-[10.5px] font-mono whitespace-nowrap">
                        {evt.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ═════════════════════════════════════════════════════════════ */}
          {/* TAB 2: DIGITAL KEY (Direct match with Image 2)              */}
          {/* ═════════════════════════════════════════════════════════════ */}
          {activeTab === "digital-key" && (
            <DigitalKeyView
              property={property}
              onOpenTrustLink={() => handleTabChange("trustlink")}
            />
          )}

          {/* ═════════════════════════════════════════════════════════════ */}
          {/* TAB 3: TRUSTLINK (Specific to this property)                */}
          {/* ═════════════════════════════════════════════════════════════ */}
          {activeTab === "trustlink" && (
            <div className="space-y-6 max-w-[1040px] mx-auto pb-12">
              
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="text-[10.5px] font-bold uppercase tracking-[2px] text-[#38bdf8] mb-1">
                    SCOPED ACCESS GOVERNANCE
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight text-white mb-1.5">
                    Trust Link · {property.trustlinkId}
                  </h1>
                  <p className="text-[13px] text-[#8aa1b9]">
                    Manage granular permissions and professional connections for {property.street}.
                  </p>
                </div>

                <Link
                  href={trustlinkUrl}
                  className="self-start sm:self-auto px-4 py-2 bg-[#122e49] hover:bg-[#1a3f64] text-white rounded-lg text-xs font-semibold border border-[#214b73] transition-colors flex items-center gap-1.5"
                >
                  <span>Open Full Portal</span>
                  <span>↗</span>
                </Link>
              </div>

              {/* Status Banner */}
              <div className="bg-[#092036] border border-[#173859] rounded-xl p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#10b981] shadow-[0_0_10px_#10b981] flex-shrink-0 animate-pulse" />
                  <div>
                    <h3 className="text-sm font-bold text-white">TrustLink Active & Scoped</h3>
                    <p className="text-xs text-[#829bb5]">Connected Specialist: Miller's Building & Pest Inspections (David Miller)</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-[#efbd66] bg-[#efbd66]/10 px-2.5 py-1 rounded border border-[#efbd66]/20">
                  Expires in 28 Days
                </span>
              </div>

              {/* Scoped Document Permissions List */}
              <div className="bg-[#092036] border border-[#173859] rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-[#142d45] pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white">Scoped Document Permissions</h3>
                    <p className="text-xs text-[#7e99b7]">Selectively shared files from your Digital Key.</p>
                  </div>
                  <button
                    onClick={() => handleTabChange("digital-key")}
                    className="text-xs text-[#a7f3d0] hover:underline font-semibold"
                  >
                    + Add Pack from Digital Key
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  {property.documents.map((doc, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#07192d] rounded-lg border border-[#163554] flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-[#38bdf8]">📄</span>
                        <div className="min-w-0">
                          <div className="font-semibold text-white truncate">{doc.title}</div>
                          <div className="text-[#6d88a4] text-[10.5px]">{doc.cat} · {doc.size}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            doc.shared
                              ? "bg-[#064e3b]/60 text-[#6ee7b7] border border-[#047857]/40"
                              : "bg-[#253040] text-[#8aa1b8]"
                          }`}
                        >
                          {doc.shared ? "Shared (Read-Only)" : "Private (Revoked)"}
                        </span>
                        <button
                          onClick={() => alert(`Access toggled for ${doc.title}`)}
                          className="text-[11px] text-[#38bdf8] hover:underline"
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
                  className="px-3.5 py-2 bg-[#0d2238] hover:bg-[#143150] text-[#93c5fd] rounded-lg text-xs font-semibold border border-[#1e4268] transition-colors"
                >
                  Pause Access
                </button>
                <button
                  onClick={() => alert("TrustLink revoked. All shared tokens invalidated immediately.")}
                  className="px-3.5 py-2 bg-[#451017] hover:bg-[#5c1620] text-[#fca5a5] rounded-lg text-xs font-semibold border border-[#7f1d1d] transition-colors"
                >
                  Revoke Connection
                </button>
              </div>
            </div>
          )}

          {/* ═════════════════════════════════════════════════════════════ */}
          {/* TAB 4: PROPERTIES (Portfolio directory & switcher)          */}
          {/* ═════════════════════════════════════════════════════════════ */}
          {activeTab === "properties" && (
            <div className="space-y-6 max-w-[1040px] mx-auto pb-12">
              
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="text-[10.5px] font-bold uppercase tracking-[2px] text-[#efbd66] mb-1">
                    MY PROPERTY PORTFOLIO
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight text-white mb-1.5">
                    Your Properties
                  </h1>
                  <p className="text-[13px] text-[#8aa1b9]">
                    Switch between your managed digital homes or open the directory.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/properties"
                    className="px-3.5 py-2 bg-[#122e49] hover:bg-[#1a3f64] text-white rounded-lg text-xs font-semibold border border-[#214b73] transition-colors"
                  >
                    Directory View
                  </Link>
                  <Link
                    href="/properties/new"
                    className="px-3.5 py-2 bg-[#efbd66] hover:bg-[#dfac55] text-[#071d3b] rounded-lg text-xs font-bold transition-colors"
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
                      className={`bg-[#092036] border rounded-2xl p-5 flex flex-col justify-between transition-all ${
                        isCurrent
                          ? "border-[#38bdf8] ring-1 ring-[#38bdf8]/40 shadow-lg"
                          : "border-[#173859] hover:border-[#27537e]"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded ${p.typeColor}`}>
                            {p.type}
                          </span>
                          {isCurrent ? (
                            <span className="text-[10px] font-bold text-[#38bdf8] bg-[#38bdf8]/10 px-2 py-0.5 rounded border border-[#38bdf8]/30">
                              Current Home
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono text-[#8aa1b8]">
                              {p.propId}
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-bold text-white mb-1">{p.street}</h3>
                        <p className="text-xs text-[#8aa1b8] mb-4">
                          {p.suburb} {p.state} {p.postcode}
                        </p>

                        <div className="space-y-1.5 text-xs text-[#718da8] border-t border-[#142d45] pt-3">
                          <div className="flex items-center justify-between">
                            <span>Documents:</span>
                            <span className="text-white font-medium">{p.documents.length} verified</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>TrustLink:</span>
                            <span className="text-[#38bdf8] font-mono font-medium">{p.trustlinkId}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-[#142d45] flex items-center justify-between gap-2">
                        {isCurrent ? (
                          <button
                            onClick={() => handleTabChange("digital-key")}
                            className="w-full py-1.5 bg-[#a7f3d0] text-[#064e3b] font-bold rounded-lg text-xs text-center"
                          >
                            Open Digital Key
                          </button>
                        ) : (
                          <button
                            onClick={() => handleSwitchProperty(p.id)}
                            className="w-full py-1.5 bg-[#122e49] hover:bg-[#1b436a] text-white font-semibold rounded-lg text-xs text-center border border-[#214b73] transition-colors"
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
          {/* TAB 5: MESSAGES (Communications with specialists)           */}
          {/* ═════════════════════════════════════════════════════════════ */}
          {activeTab === "messages" && (
            <div className="space-y-6 max-w-[1040px] mx-auto pb-12">
              
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="text-[10.5px] font-bold uppercase tracking-[2px] text-[#6ee7b7] mb-1">
                    PROPERTY COMMUNICATIONS
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight text-white mb-1.5">
                    Messages · {property.street}
                  </h1>
                  <p className="text-[13px] text-[#8aa1b9]">
                    Direct messaging with verified specialists connected via TrustLink.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
                  <span className="text-xs text-[#8aa1b8]">David Miller is online</span>
                </div>
              </div>

              {/* Chat Thread Container */}
              <div className="bg-[#092036] border border-[#173859] rounded-2xl overflow-hidden flex flex-col h-[520px]">
                
                {/* Chat Header */}
                <div className="p-4 border-b border-[#142d45] bg-[#07192d] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#122e49] text-[#38bdf8] font-bold text-xs flex items-center justify-center border border-[#204970]">
                      DM
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">David Miller</h4>
                      <p className="text-[11px] text-[#7ea0be]">
                        Miller's Building & Pest Inspections · TrustLink {property.trustlinkId}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleTabChange("trustlink")}
                    className="text-xs text-[#38bdf8] hover:underline font-semibold"
                  >
                    View Scoped TrustLink →
                  </button>
                </div>

                {/* Message History */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 max-w-xl ${msg.isUser ? "ml-auto flex-row-reverse" : ""}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                          msg.isUser
                            ? "bg-[#143454] text-[#93c5fd] border border-[#234d75]"
                            : "bg-[#0d2a45] text-[#38bdf8] border border-[#1d4668]"
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
                          <span className="font-semibold text-slate-200">{msg.sender}</span>
                          <span className="text-[#557393]">{msg.time}</span>
                        </div>
                        <div
                          className={`p-3.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed ${
                            msg.isUser
                              ? "bg-[#102b44] text-white border border-[#1e486d]"
                              : "bg-[#07192d] text-slate-200 border border-[#163554]"
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
                  className="p-3 border-t border-[#142d45] bg-[#07192d] flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={`Reply regarding ${property.street}...`}
                    className="flex-1 bg-[#0b2138] border border-[#1a3d60] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#506c88] focus:outline-none focus:border-[#38bdf8]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#38bdf8] hover:bg-[#0284c7] text-[#071d3b] font-bold text-xs rounded-xl transition-colors cursor-pointer flex-shrink-0"
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
        <div className="flex items-center justify-center h-screen bg-[#071628] text-white">
          <div className="text-xs text-[#8aa1b8]">Loading property workspace...</div>
        </div>
      }
    >
      <PropertyDetailInner id={id} />
    </Suspense>
  );
}
