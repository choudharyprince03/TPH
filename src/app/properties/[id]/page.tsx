"use client";
import Link from "next/link";
import React, { use, useState } from "react";

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState<"overview" | "dna" | "documents" | "history" | "handover">("overview");
  const [dnaCategory, setDnaCategory] = useState<"legal" | "physical" | "operational">("legal");
  const [handoverReceived, setHandoverReceived] = useState(false);
  const [notes, setNotes] = useState("Check solar inverter wifi connection after handover walkthrough.");

  return (
    <div className="w-full flex-1 flex flex-col bg-[#f4f6f8] text-[#102645]">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-9 py-8 w-full flex-1">

        {/* ── Breadcrumb ─────────────────────────────────────────────── */}
        <nav className="flex items-center gap-2 text-[11px] text-[#68788e] mb-6" aria-label="Breadcrumb">
          <Link href="/properties" className="hover:underline">My Property World</Link>
          <span>›</span>
          <Link href="/properties" className="hover:underline">Properties</Link>
          <span>›</span>
          <span className="text-[#102645] font-semibold">18 Banksia Crescent</span>
        </nav>

        {/* ── Prototype Masthead ─────────────────────────────────────── */}
        <header className="bg-[#071d3b] text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-[#efbd66] text-[9px] font-bold uppercase tracking-[1.6px] block mb-1.5">
              PROP ID · YOUR PROPERTY RECORD
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white mb-1.5">
              18 Banksia Crescent
            </h1>
            <p className="text-[12px] text-[#b9c8db]">
              Kenmore QLD 4069 · A living memory of your property.
            </p>

            <div className="flex items-center gap-3 mt-4 flex-wrap">
              <span className="font-mono text-[11px] px-2.5 py-1 bg-white/10 rounded-md font-bold tracking-wider text-[#efbd66]">
                TPH-KEN-018
              </span>
              <button
                onClick={() => alert("Owner Status: Verification pending in this prototype demonstration.")}
                className="text-[11px] text-[#b9c8db] hover:text-white flex items-center gap-1.5 underline underline-offset-2"
              >
                <span>🔑</span> Owner verification pending
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <Link
              href="/explore"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[12px] font-semibold transition-colors border border-white/20"
            >
              Find help
            </Link>
            <button
              onClick={() => alert("Property Options: Manage title records, download Prop ID passport, or configure sovereignty keys.")}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[12px] font-semibold transition-colors border border-white/20"
            >
              Property options ▾
            </button>
          </div>
        </header>

        {/* ── Sub-Navigation Tabs ─────────────────────────────────────── */}
        <nav className="flex items-center gap-4 sm:gap-7 border-b border-[#dfe6ef] mb-8 overflow-x-auto text-[13px] font-medium">
          {[
            { id: "overview", label: "Overview" },
            { id: "dna", label: "Property DNA" },
            { id: "documents", label: "Documents", count: "22" },
            { id: "history", label: "Logbook" },
            { id: "handover", label: "Handover", badge: !handoverReceived ? "Ready" : undefined },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 relative flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "text-[#102645] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#24754c]"
                  : "text-[#68788e] hover:text-[#102645]"
              }`}
            >
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
            <div className="bg-[#071d3b] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[1.6px] text-[#efbd66] mb-1">
                  Your home, understood
                </div>
                <h2 className="text-2xl font-semibold mb-2">
                  Every detail. In the right place.
                </h2>
                <p className="text-[12px] text-[#b9c8db] max-w-md mb-4">
                  Build the story of your home, from its legal title records to the way it runs every day.
                </p>
                <button
                  onClick={() => setActiveTab("dna")}
                  className="px-4 py-2 bg-[#efbd66] text-[#071d3b] font-bold rounded-xl text-[12px] hover:bg-[#e0ad52] transition-colors"
                >
                  Explore Property DNA →
                </button>
              </div>

              <div className="hidden md:block w-40 h-28 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                <img src="/images/hero-real-estate.jpg" alt="Home" className="w-full h-full object-cover" />
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
                  <span className="text-[10px] text-[#24754c] font-semibold">6 linked documents →</span>
                </div>

                <div
                  onClick={() => { setActiveTab("dna"); setDnaCategory("physical"); }}
                  className="bg-white border border-[#dfe6ef] hover:border-[#24754c] rounded-2xl p-6 shadow-sm cursor-pointer transition-all"
                >
                  <div className="text-2xl mb-3">📐</div>
                  <strong className="block text-[15px] text-[#102645] mb-1">02 Physical DNA</strong>
                  <p className="text-[11px] text-[#68788e] mb-3">Materials, paint codes, engineering &amp; structure</p>
                  <span className="text-[10px] text-[#24754c] font-semibold">10 linked documents →</span>
                </div>

                <div
                  onClick={() => { setActiveTab("dna"); setDnaCategory("operational"); }}
                  className="bg-white border border-[#dfe6ef] hover:border-[#24754c] rounded-2xl p-6 shadow-sm cursor-pointer transition-all"
                >
                  <div className="text-2xl mb-3">🛠️</div>
                  <strong className="block text-[15px] text-[#102645] mb-1">03 Operational DNA</strong>
                  <p className="text-[11px] text-[#68788e] mb-3">Utilities, appliance warranties &amp; scheduled care</p>
                  <span className="text-[10px] text-[#24754c] font-semibold">6 linked documents →</span>
                </div>
              </div>
            </div>

            {/* Two-Column Panels: Pulse & Vault */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Pulse */}
              <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-[#dfe6ef] mb-4">
                  <h3 className="text-base font-bold text-[#102645]">Property Pulse</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-[#eaf5ef] text-[#24754c] rounded">Action items</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-[#fff4df] text-[#8b641c] flex items-center justify-center font-bold text-xs flex-shrink-0">
                      🎁
                    </div>
                    <div className="flex-1">
                      <strong className="block text-[12px] text-[#102645]">Your handover is ready</strong>
                      <p className="text-[11px] text-[#68788e]">Review documents and open items from Hart Homes.</p>
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
                      <strong className="block text-[12px] text-[#102645]">2 Open TrustLinks</strong>
                      <p className="text-[11px] text-[#68788e]">Hart Homes and River City Conveyancing.</p>
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
                <p className="text-[12px] text-[#68788e]">Granular immutable attributes of 18 Banksia Crescent.</p>
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
                    <span className="font-mono font-bold text-[#102645]">Lot 18 on RP 88201 (Title Ref 50921844)</span>
                  </div>
                  <div className="py-3.5 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2">
                    <span className="text-[#68788e] font-medium">Local Government</span>
                    <span className="font-semibold text-[#102645]">Brisbane City Council · Low Density Residential (LDR)</span>
                  </div>
                  <div className="py-3.5 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2">
                    <span className="text-[#68788e] font-medium">Easements / Covenants</span>
                    <span className="text-[#102645]">Easement B on RP 88201 for stormwater drainage along rear boundary (2.5m wide).</span>
                  </div>
                  <div className="py-3.5 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2">
                    <span className="text-[#68788e] font-medium">Building Approval</span>
                    <span className="text-[#102645]">BCC DA-2023-41829 · Private Certifier Approval PCA-QLD-8910</span>
                  </div>
                </>
              )}

              {dnaCategory === "physical" && (
                <>
                  <div className="py-3.5 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2">
                    <span className="text-[#68788e] font-medium">Structural Foundation</span>
                    <span className="text-[#102645]">Engineered Waffle Pod Slab on Class H1 Soil · Form 16 Structural by Apex Engineers</span>
                  </div>
                  <div className="py-3.5 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2">
                    <span className="text-[#68788e] font-medium">Wall Cladding &amp; Bricks</span>
                    <span className="text-[#102645]">Austral Bricks &apos;Sanctuary&apos; + James Hardie Linea Weatherboards (Dulux Lexicon Half)</span>
                  </div>
                  <div className="py-3.5 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2">
                    <span className="text-[#68788e] font-medium">Roofing &amp; Insulation</span>
                    <span className="text-[#102645]">Colorbond &apos;Monument&apos; Custom Orb + Bradford Gold R4.1 Ceiling Batts</span>
                  </div>
                  <div className="py-3.5 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2">
                    <span className="text-[#68788e] font-medium">Waterproofing</span>
                    <span className="text-[#102645]">AS 3740 Compliance · QBCC Form 43 Verified Certificate by HydroSeal QLD</span>
                  </div>
                </>
              )}

              {dnaCategory === "operational" && (
                <>
                  <div className="py-3.5 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2">
                    <span className="text-[#68788e] font-medium">Hot Water System</span>
                    <span className="text-[#102645]">Rheem 270L Heat Pump · 7 Year Tank Warranty (Valid to Sep 2031)</span>
                  </div>
                  <div className="py-3.5 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2">
                    <span className="text-[#68788e] font-medium">Air Conditioning</span>
                    <span className="text-[#102645]">Daikin 14kW Inverter Ducted System with AirTouch 5 Zone Control · 5 Year Warranty</span>
                  </div>
                  <div className="py-3.5 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2">
                    <span className="text-[#68788e] font-medium">Termite Protection</span>
                    <span className="text-[#102645]">Termimesh Physical Barrier System · Annual Inspection Due Sep 2027</span>
                  </div>
                  <div className="py-3.5 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2">
                    <span className="text-[#68788e] font-medium">Solar Array</span>
                    <span className="text-[#102645]">6.6 kW Tier 1 Panels with Sungrow 5kW Hybrid Inverter · Smart Meter enabled</span>
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
                <p className="text-[12px] text-[#68788e]">22 authenticated records attached permanently to TPH-KEN-018.</p>
              </div>
              <button onClick={() => alert("Upload Document: Securely deposit PDF, warranty, or receipt into Prop ID Vault.")} className="px-3.5 py-1.5 bg-[#071d3b] text-white text-[11px] font-bold rounded-lg">
                + Upload document
              </button>
            </div>

            <div className="divide-y divide-[#dfe6ef] text-[12px]">
              {[
                { title: "Certificate of Title (QT2291/4).pdf", cat: "Legal", size: "1.2 MB", shared: true },
                { title: "QBCC Form 16 Structural Engineering Final.pdf", cat: "Certificates", size: "3.4 MB", shared: true },
                { title: "Form 43 Wet-Area Waterproofing Certificate.pdf", cat: "Certificates", size: "1.8 MB", shared: true },
                { title: "Architectural Floorplans & Working Drawings.pdf", cat: "Plans", size: "8.4 MB", shared: true },
                { title: "Soil Test & Geotechnical Class H1 Report.pdf", cat: "Engineering", size: "2.1 MB", shared: false },
                { title: "Appliance Care & Warranty Schedule.pdf", cat: "Warranties", size: "4.2 MB", shared: false },
              ].map((doc) => (
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
              Prop ID Living Logbook
            </h2>
            <div className="relative pl-6 border-l-2 border-[#dfe6ef] space-y-6 text-[12px] my-4">
              {[
                { title: "Practical completion handover submitted by Hart Homes", time: "Today 10:48 AM", detail: "Form 16 structural engineering and waterproofing registers deposited." },
                { title: "Client variation notice #04 signed by Alex", time: "Today 08:30 AM", detail: "Caesarstone Pure White kitchen island specification approved." },
                { title: "Cadastral boundary confirmation completed", time: "Sep 12, 2026", detail: "Surveyor certified boundary peg placements along Lot 18 RP 88201." },
                { title: "Prop ID cryptographic record initiated", time: "Sep 01, 2026", detail: "Genesis token minted for 18 Banksia Crescent, Kenmore." },
              ].map((ev, i) => (
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
                    18 Banksia Crescent, Kenmore QLD 4069 · From Hart Homes · Sample pack
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

              {/* Handover Open Item Card */}
              <div className="p-4 rounded-xl bg-[#fff9ef] border border-[#f2debe] mb-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🎨</span>
                  <div>
                    <strong className="block text-[13px] text-[#102645]">
                      Touch-up paint near the laundry door
                    </strong>
                    <p className="text-[11px] text-[#68788e]">
                      Sample open item · Builder scheduled for Thursday rectification
                    </p>
                  </div>
                </div>
                <Link
                  href="/trustlinks/welcome"
                  className="text-[11px] font-bold text-[#071d3b] hover:underline whitespace-nowrap"
                >
                  Ask builder →
                </Link>
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
