"use client";
import Link from "next/link";
import React, { use, useState } from "react";
import { BacktrackingNav } from "@/components/layout/BacktrackingNav";
import { getPropertyById, PROPERTIES_LIST } from "@/lib/properties";

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const property = getPropertyById(id);

  const [activeTab, setActiveTab] = useState<"overview" | "dna" | "documents" | "history" | "handover">("overview");
  const [dnaCategory, setDnaCategory] = useState<"legal" | "physical" | "operational">("legal");
  const [handoverReceived, setHandoverReceived] = useState(false);
  const [notes, setNotes] = useState(property.notes);

  return (
    <div className="w-full flex-1 flex flex-col bg-[#f4f6f8] text-[#102645] font-sans">
      
      {/* ── Backtracking & Location Tracking Navbar ─────────────────── */}
      <BacktrackingNav
        backHref="/properties?tab=properties"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "My Property World", href: "/properties" },
          { label: "Properties", href: "/properties?tab=properties" },
          { label: property.street, active: true },
        ]}
        pageTag={`Prop ID: ${property.propId}`}
        actionSlot={
          <div className="flex items-center gap-2">
            <Link
              href="/properties?tab=properties"
              className="px-3 py-1.5 bg-[#f4f6f8] hover:bg-[#e5ecf5] text-[#071d3b] text-[11px] font-bold rounded-lg border border-[#cbd5e2] transition-colors"
            >
              All Properties ({PROPERTIES_LIST.length})
            </Link>
          </div>
        }
      />

      <div className="max-w-[1240px] mx-auto px-6 lg:px-9 py-8 w-full flex-1">

        {/* ── Prototype Masthead ─────────────────────────────────────── */}
        <header className="bg-[#071d3b] text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className="text-[#efbd66] text-[9px] font-bold uppercase tracking-[1.6px]">
                PROP ID · YOUR SOVEREIGN PROPERTY RECORD
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${property.typeColor}`}>
                {property.type}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white mb-1.5">
              {property.street}
            </h1>
            <p className="text-[12px] text-[#b9c8db]">
              {property.suburb} {property.state} {property.postcode} · A living memory of your property.
            </p>

            <div className="flex items-center gap-3 mt-4 flex-wrap">
              <span className="font-mono text-[11px] px-2.5 py-1 bg-white/10 rounded-md font-bold tracking-wider text-[#efbd66]">
                {property.propId}
              </span>
              <button
                onClick={() => alert(`Owner Status: Verified sovereign passport for ${property.street}.`)}
                className="text-[11px] text-[#b9c8db] hover:text-white flex items-center gap-1.5 underline underline-offset-2"
              >
                <span>🔑</span> Verified Sovereign Record
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <Link
              href="/explore"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[12px] font-semibold transition-colors border border-white/20"
            >
              Find specialists
            </Link>
            <button
              onClick={() => alert(`Property Options: Manage title records, download Prop ID passport, or export vault for ${property.street}.`)}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[12px] font-semibold transition-colors border border-white/20"
            >
              Property options ▾
            </button>
          </div>
        </header>

        {/* ── Sub-Navigation Tabs ─────────────────────────────────────── */}
        <nav className="flex items-center gap-4 sm:gap-7 border-b border-[#dfe6ef] mb-8 overflow-x-auto text-[13px] font-medium">
          {[
            { id: "overview", label: "Overview", icon: "🏠" },
            { id: "dna", label: "Property DNA", icon: "🧬" },
            { id: "documents", label: "Documents", icon: "📄", count: `${property.documents.length}` },
            { id: "history", label: "Logbook", icon: "🕒" },
            { id: "handover", label: "Handover", icon: "🎁", badge: !handoverReceived ? "Ready" : undefined },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 relative flex items-center gap-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "text-[#102645] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#24754c]"
                  : "text-[#68788e] hover:text-[#102645]"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.count && (
                <span className="text-[10px] font-bold px-1.5 py-0.2 bg-[#dfe6ef] text-[#102645] rounded-full">
                  {tab.count}
                </span>
              )}
              {tab.badge && (
                <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#fff4df] text-[#8b641c] rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* ── TAB 1: OVERVIEW ─────────────────────────────────────────── */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            
            {/* Record Welcome Banner */}
            <div className="bg-[#071d3b] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[1.6px] text-[#efbd66] mb-1">
                  Your home, understood
                </div>
                <h2 className="text-2xl font-semibold mb-2">
                  Every detail. In the right place.
                </h2>
                <p className="text-[12px] text-[#b9c8db] max-w-md mb-4 leading-relaxed">
                  Build the story of your home, from its cadastral title records to the way it runs every day.
                </p>
                <button
                  onClick={() => setActiveTab("dna")}
                  className="px-4 py-2 bg-[#efbd66] text-[#071d3b] font-bold rounded-xl text-[12px] hover:bg-[#e0ad52] transition-colors"
                >
                  Explore Property DNA →
                </button>
              </div>

              <div className="hidden md:block w-48 h-32 rounded-xl overflow-hidden shadow-sm flex-shrink-0 border border-white/20">
                <img src={property.imageUrl} alt={property.street} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Property DNA Quick Preview 3 Columns */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#102645]">Property DNA</h3>
                  <p className="text-[12px] text-[#68788e]">Three useful views. One permanent property record.</p>
                </div>
                <button onClick={() => setActiveTab("dna")} className="text-[12px] font-bold text-[#071d3b] hover:underline">
                  View all →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div
                  onClick={() => { setActiveTab("dna"); setDnaCategory("legal"); }}
                  className="bg-white border border-[#dfe6ef] hover:border-[#24754c] rounded-2xl p-6 shadow-sm cursor-pointer transition-all"
                >
                  <div className="text-2xl mb-3">📜</div>
                  <strong className="block text-[15px] text-[#102645] mb-1">01 Legal DNA</strong>
                  <p className="text-[11px] text-[#68788e] mb-3">Rights, boundaries, title search &amp; easements</p>
                  <span className="text-[10px] text-[#24754c] font-semibold">Inspect legal attributes →</span>
                </div>

                <div
                  onClick={() => { setActiveTab("dna"); setDnaCategory("physical"); }}
                  className="bg-white border border-[#dfe6ef] hover:border-[#24754c] rounded-2xl p-6 shadow-sm cursor-pointer transition-all"
                >
                  <div className="text-2xl mb-3">📐</div>
                  <strong className="block text-[15px] text-[#102645] mb-1">02 Physical DNA</strong>
                  <p className="text-[11px] text-[#68788e] mb-3">Materials, paint codes, engineering &amp; structure</p>
                  <span className="text-[10px] text-[#24754c] font-semibold">Inspect structural data →</span>
                </div>

                <div
                  onClick={() => { setActiveTab("dna"); setDnaCategory("operational"); }}
                  className="bg-white border border-[#dfe6ef] hover:border-[#24754c] rounded-2xl p-6 shadow-sm cursor-pointer transition-all"
                >
                  <div className="text-2xl mb-3">🛠️</div>
                  <strong className="block text-[15px] text-[#102645] mb-1">03 Operational DNA</strong>
                  <p className="text-[11px] text-[#68788e] mb-3">Utilities, appliance warranties &amp; scheduled care</p>
                  <span className="text-[10px] text-[#24754c] font-semibold">Inspect operational schedules →</span>
                </div>
              </div>
            </div>

            {/* Two-Column Panels: Pulse & Vault */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Pulse */}
              <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-[#dfe6ef] mb-4">
                  <h3 className="text-base font-bold text-[#102645]">Property Pulse</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-[#eaf5ef] text-[#24754c] rounded">Status: Verified</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-[#fff4df] text-[#8b641c] flex items-center justify-center font-bold text-xs flex-shrink-0">
                      🎁
                    </div>
                    <div className="flex-1">
                      <strong className="block text-[12px] text-[#102645]">{property.statusBadge}</strong>
                      <p className="text-[11px] text-[#68788e]">All authenticated records sealed to {property.propId}.</p>
                    </div>
                    <button onClick={() => setActiveTab("handover")} className="text-[11px] font-bold text-[#071d3b] hover:underline">
                      Review →
                    </button>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-[#eaf5ef] text-[#24754c] flex items-center justify-center font-bold text-xs flex-shrink-0">
                      🛡️
                    </div>
                    <div className="flex-1">
                      <strong className="block text-[12px] text-[#102645]">Active TrustLink Permissions</strong>
                      <p className="text-[11px] text-[#68788e]">Collaborative access scoped to this property passport.</p>
                    </div>
                    <Link href="/trustlinks" className="text-[11px] font-bold text-[#071d3b] hover:underline">
                      Manage →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Private Notes */}
              <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#dfe6ef] mb-3">
                    <h3 className="text-base font-bold text-[#102645]">My Private Notes</h3>
                    <span className="text-[10px] text-[#24754c] flex items-center gap-1">
                      <span>🔒</span> Only you
                    </span>
                  </div>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-[#dfe6ef] rounded-xl text-[12px] text-[#102645] bg-[#fcfbf8] focus:outline-none"
                    placeholder="Questions to ask, ideas to keep, things to remember..."
                  />
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#dfe6ef] text-[10px] text-[#68788e] mt-3">
                  <span>Excluded from professional sharing.</span>
                  <button onClick={() => alert("Notes saved successfully to local Prop ID storage.")} className="px-3 py-1.5 bg-[#071d3b] text-white font-semibold rounded-lg text-[11px]">
                    Save notes
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ── TAB 2: PROPERTY DNA ─────────────────────────────────────── */}
        {activeTab === "dna" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#dfe6ef]">
              <div>
                <h2 className="text-xl font-bold text-[#102645]">Property DNA Breakdown</h2>
                <p className="text-[12px] text-[#68788e]">Granular immutable attributes of {property.street}.</p>
              </div>
              <span className="text-[11px] text-[#24754c] font-semibold flex items-center gap-1.5">
                <span>🔒</span> Private by default
              </span>
            </div>

            {/* Category Subtabs */}
            <div className="flex gap-2">
              {[
                { id: "legal", label: "01 Legal DNA" },
                { id: "physical", label: "02 Physical DNA" },
                { id: "operational", label: "03 Operational DNA" },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setDnaCategory(c.id as any)}
                  className={`px-4 py-2 rounded-xl text-[12px] font-bold transition-all ${
                    dnaCategory === c.id
                      ? "bg-[#071d3b] text-white"
                      : "bg-white border border-[#dfe6ef] text-[#68788e] hover:bg-[#f3f6fb]"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* DNA Content */}
            <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm divide-y divide-[#dfe6ef] text-[12px]">
              {dnaCategory === "legal" && (
                <>
                  <div className="py-3.5 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2">
                    <span className="text-[#68788e] font-medium">Cadastral Identifier</span>
                    <span className="font-mono font-bold text-[#102645]">{property.legalDna.cadastral}</span>
                  </div>
                  <div className="py-3.5 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2">
                    <span className="text-[#68788e] font-medium">Local Government</span>
                    <span className="font-semibold text-[#102645]">{property.legalDna.council}</span>
                  </div>
                  <div className="py-3.5 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2">
                    <span className="text-[#68788e] font-medium">Easements / Covenants</span>
                    <span className="text-[#102645]">{property.legalDna.easements}</span>
                  </div>
                  <div className="py-3.5 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2">
                    <span className="text-[#68788e] font-medium">Building Approval</span>
                    <span className="text-[#102645]">{property.legalDna.approval}</span>
                  </div>
                </>
              )}

              {dnaCategory === "physical" && (
                <>
                  <div className="py-3.5 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2">
                    <span className="text-[#68788e] font-medium">Structural Foundation</span>
                    <span className="text-[#102645]">{property.physicalDna.foundation}</span>
                  </div>
                  <div className="py-3.5 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2">
                    <span className="text-[#68788e] font-medium">Wall Cladding &amp; Bricks</span>
                    <span className="text-[#102645]">{property.physicalDna.cladding}</span>
                  </div>
                  <div className="py-3.5 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2">
                    <span className="text-[#68788e] font-medium">Roofing &amp; Insulation</span>
                    <span className="text-[#102645]">{property.physicalDna.roofing}</span>
                  </div>
                  <div className="py-3.5 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2">
                    <span className="text-[#68788e] font-medium">Waterproofing</span>
                    <span className="text-[#102645]">{property.physicalDna.waterproofing}</span>
                  </div>
                </>
              )}

              {dnaCategory === "operational" && (
                <>
                  <div className="py-3.5 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2">
                    <span className="text-[#68788e] font-medium">Hot Water System</span>
                    <span className="text-[#102645]">{property.operationalDna.hotWater}</span>
                  </div>
                  <div className="py-3.5 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2">
                    <span className="text-[#68788e] font-medium">Air Conditioning</span>
                    <span className="text-[#102645]">{property.operationalDna.ac}</span>
                  </div>
                  <div className="py-3.5 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2">
                    <span className="text-[#68788e] font-medium">Termite Protection</span>
                    <span className="text-[#102645]">{property.operationalDna.pest}</span>
                  </div>
                  <div className="py-3.5 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2">
                    <span className="text-[#68788e] font-medium">Solar Array</span>
                    <span className="text-[#102645]">{property.operationalDna.solar}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* ── TAB 3: DOCUMENTS VAULT ──────────────────────────────────── */}
        {activeTab === "documents" && (
          <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#dfe6ef]">
              <div>
                <h2 className="text-lg font-bold text-[#102645]">Prop ID Document Vault</h2>
                <p className="text-[12px] text-[#68788e]">{property.documents.length} authenticated records attached permanently to {property.propId}.</p>
              </div>
              <button onClick={() => alert("Upload Document: Securely deposit PDF, warranty, or receipt into Prop ID Vault.")} className="px-3.5 py-1.5 bg-[#071d3b] text-white text-[11px] font-bold rounded-lg">
                + Upload document
              </button>
            </div>

            <div className="divide-y divide-[#dfe6ef] text-[12px]">
              {property.documents.map((doc) => (
                <div key={doc.title} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-lg">📄</span>
                    <div className="min-w-0">
                      <div className="font-semibold text-[#102645] truncate">{doc.title}</div>
                      <div className="text-[10px] text-[#68788e]">{doc.cat} · {doc.size}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                      doc.shared ? "bg-[#eaf5ef] text-[#24754c]" : "bg-[#f3f6fb] text-[#68788e]"
                    }`}>
                      {doc.shared ? "Shared via TrustLink" : "Private Vault"}
                    </span>
                    <button onClick={() => alert(`Viewing document: ${doc.title}`)} className="text-[11px] font-bold text-[#071d3b] hover:underline">
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 4: LOGBOOK ──────────────────────────────────────────── */}
        {activeTab === "history" && (
          <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-[#102645] pb-3 border-b border-[#dfe6ef]">
              Prop ID Living Logbook · {property.propId}
            </h2>
            <div className="relative pl-6 border-l-2 border-[#dfe6ef] space-y-6 text-[12px] my-4">
              {property.events.map((ev, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#24754c] ring-4 ring-white" />
                  <strong className="block text-[#102645] font-semibold">{ev.title}</strong>
                  <span className="text-[10px] text-[#68788e] block mt-0.5">{ev.time}</span>
                  <p className="text-[11px] text-[#68788e] mt-1">{ev.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 5: DIGITAL HANDOVER PACK ────────────────────────────── */}
        {activeTab === "handover" && (
          <div className="space-y-6">
            <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#dfe6ef] mb-6">
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-[1.4px] text-[#24754c] mb-1">
                    Prop ID Digital Handover
                  </div>
                  <h2 className="text-2xl font-bold text-[#102645]">
                    A beautiful beginning.
                  </h2>
                  <p className="text-[12px] text-[#68788e]">
                    {property.address} · From Hart Homes · Sample pack
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  handoverReceived ? "bg-[#eaf5ef] text-[#24754c]" : "bg-[#fff4df] text-[#8b641c]"
                }`}>
                  {handoverReceived ? "✓ Receipt Recorded" : "Ready for your review"}
                </span>
              </div>

              {/* Handover Categories Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                  { title: "Plans", icon: "📐", note: "1 sample document" },
                  { title: "Warranties", icon: "🛠️", note: "1 sample document" },
                  { title: "Certificates", icon: "📜", note: "1 sample register" },
                  { title: "Open items", icon: "💬", note: "1 item recorded" },
                ].map((cat) => (
                  <div key={cat.title} className="p-4 rounded-xl border border-[#dfe6ef] bg-[#f9fafc] text-center">
                    <span className="text-2xl block mb-1">{cat.icon}</span>
                    <strong className="block text-[13px] text-[#102645]">{cat.title}</strong>
                    <small className="text-[10px] text-[#68788e]">{cat.note}</small>
                  </div>
                ))}
              </div>

              {/* Confirmation Form */}
              <div className="pt-4 border-t border-[#dfe6ef] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-[12px] text-[#68788e] max-w-lg">
                  Receiving this pack records the delivery of selected documents into your permanent Prop ID. Open items remain tracked until completed.
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href="/trustlinks/welcome"
                    className="px-4 py-2.5 bg-white border border-[#cbd5e2] text-[#102645] font-semibold text-[12px] rounded-xl hover:bg-[#f3f6fb]"
                  >
                    Open TrustLink
                  </Link>
                  <button
                    onClick={() => setHandoverReceived(true)}
                    className={`px-5 py-2.5 rounded-xl text-[12px] font-bold transition-all ${
                      handoverReceived
                        ? "bg-[#24754c] text-white"
                        : "bg-[#071d3b] text-white hover:bg-[#102d59]"
                    }`}
                  >
                    {handoverReceived ? "✓ Handover Pack Sealed" : "Confirm received ✓"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
