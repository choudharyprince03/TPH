import Link from "next/link";
import React from "react";

const SERVICES = [
  { icon: "🔍", label: "Building & Pest Inspection", count: "1,240+ inspectors" },
  { icon: "⚖️", label: "Conveyancing & Settlement", count: "890+ conveyancers" },
  { icon: "🏗️", label: "Builders & Developers", count: "620+ builders" },
  { icon: "🏠", label: "Property Management", count: "2,100+ PMs" },
  { icon: "🤝", label: "Buyer&apos;s Agents", count: "480+ agents" },
  { icon: "🏢", label: "Strata Management", count: "310+ managers" },
  { icon: "⚡", label: "Electrical & Plumbing", count: "3,400+ tradies" },
  { icon: "💰", label: "Financial Advice (AFSL)", count: "540+ advisors" },
];

const HOW_IT_WORKS_OWNER = [
  { step: "01", title: "Create your Prop ID", desc: "Add your property and receive a permanent digital identity — your Prop ID. All records, professionals and history attach to it forever." },
  { step: "02", title: "Find a verified professional", desc: "Browse REIQ, MBA and AIBS-verified specialists filtered by service, suburb and reviews. No cold calls, no guesswork." },
  { step: "03", title: "Connect via TrustLink", desc: "Start a secure, scoped workspace with your chosen professional. Share documents, sign proposals, and track progress — all in one place." },
  { step: "04", title: "Own your property record", desc: "Every certificate, warranty, report and handover document lives in your Property Vault — accessible forever, transferable at resale." },
];

const HOW_IT_WORKS_PRO = [
  { step: "01", title: "Set up your Pro Hub", desc: "Create your verified profile with ABN, QBCC/REIQ licence and service areas. Start receiving qualified leads matched to your expertise." },
  { step: "02", title: "Open a TrustLink workspace", desc: "Each client gets a scoped, encrypted workspace. Share only what they need to see — never expose commercial margins or other client data." },
  { step: "03", title: "Run digital handover", desc: "Guide clients through the 5-gate Prop ID handover checklist: evidence, selections, walkthrough, blocking issues, and owner verification." },
  { step: "04", title: "Transfer the Prop ID vault", desc: "At completion, transfer the permanent digital record to your client. The home&apos;s history, warranties and certificates transfer with it." },
];

const TESTIMONIALS = [
  {
    quote: "The digital handover changed everything for us. Our clients receive their Prop ID and the whole property record at settlement — no more lost documents six months later.",
    name: "Alex Morgan",
    role: "Director, Banksia Homes",
    location: "Brisbane QLD",
    avatar: "AM",
  },
  {
    quote: "I found our conveyancer, building inspector and buyer's agent all through TPH. The TrustLink kept everything in one place — no chasing emails across three inboxes.",
    name: "Emily Carter",
    role: "Property Owner",
    location: "Kenmore QLD",
    avatar: "EC",
  },
  {
    quote: "As a conveyancer, TrustLink is brilliant. My clients see exactly what they need to see — PEXA documents, settlement details — nothing more. Privacy by design.",
    name: "Sarah Chen",
    role: "Senior Conveyancer",
    location: "Sydney NSW",
    avatar: "SC",
  },
];

export default function Home() {
  return (
    <div className="w-full flex-1 flex flex-col">

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-24"
        style={{ background: "linear-gradient(160deg, #061221 0%, #0c2340 55%, #0c3d2b 100%)" }}>
        {/* Real Estate Property Background Image (Subtle / Low Opacity) */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none"
          style={{
            backgroundImage: "url('/images/hero-real-estate.jpg')",
          }}
        />
        {/* Deep navy-forest gradient overlay to soften image and maintain high contrast */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(6,18,33,0.75) 0%, rgba(12,35,64,0.65) 50%, rgba(6,18,33,0.92) 100%)",
          }}
        />

        {/* Ambient accent glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #10b981, transparent)" }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
          style={{ background: "radial-gradient(circle, #e69d24, transparent)" }} />

        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-bold"
              style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", color: "#4ade80" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              AUSTRALIA&apos;S PROPERTY PLATFORM · PROP ID · TRUSTLINK · DIGITAL HANDOVER
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[64px] max-w-4xl text-white font-extrabold tracking-tight leading-tight mb-6">
              Every specialist your<br />
              <span style={{ color: "#4ade80" }}>property needs.</span>
            </h1>

            <p className="text-base lg:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed">
              Find verified Australian property professionals, manage your permanent Prop ID, and keep every service, document and handover connected — for life.
            </p>

            {/* Search bar */}
            <div className="w-full max-w-3xl bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] p-2 mb-10 border border-white/20 dark:border-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                <div className="md:col-span-5 flex items-center gap-2 px-4 py-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
                  <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input className="w-full bg-transparent text-sm text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none"
                    placeholder="Building inspection, conveyancing, electrical..." type="text" />
                </div>
                <div className="md:col-span-4 flex items-center gap-2 px-4 py-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
                  <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <input className="w-full bg-transparent text-sm text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none"
                    type="text" placeholder="Suburb, postcode or state" defaultValue="Brisbane QLD" />
                </div>
                <div className="md:col-span-3">
                  <Link href="/explore"
                    className="w-full h-full min-h-[48px] inline-flex items-center justify-center gap-2 text-white text-sm font-bold rounded-xl transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #0c2340, #143865)" }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Find Specialists
                  </Link>
                </div>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
              {[
                { icon: "✓", label: "Verified Professionals", color: "#4ade80" },
                { icon: "🔒", label: "TrustLink Encrypted", color: "#4ade80" },
                { icon: "🪪", label: "Permanent Prop ID", color: "#e69d24" },
                { icon: "🇦🇺", label: "Australian Owned & Hosted", color: "#94a3b8" },
              ].map(({ icon, label, color }) => (
                <div key={label} className="flex items-center gap-2 text-sm" style={{ color }}>
                  <span className="font-bold">{icon}</span>
                  <span className="font-semibold text-white">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────── */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "12,400+", label: "Verified Professionals", sub: "across all 8 states & territories" },
              { value: "48,000+", label: "Properties with Prop ID", sub: "permanent digital records" },
              { value: "130,000+", label: "TrustLinks opened", sub: "secure professional workspaces" },
              { value: "99.8%", label: "Client satisfaction", sub: "across all completed handovers" },
            ].map(({ value, label, sub }) => (
              <div key={label} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-brand-navy dark:text-white mb-1">{value}</div>
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE CATEGORIES ─────────────────────────────── */}
      <section className="py-16 bg-slate-50 dark:bg-[#0a1628]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <div className="text-xs font-bold text-verified uppercase tracking-widest mb-3">Find the Right Professional</div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              Every property service, verified.
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
              All professionals on TPH hold current Australian licences, carry appropriate insurance and are connected to your Prop ID record.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {SERVICES.map(({ icon, label, count }) => (
              <Link key={label} href="/explore"
                className="flex flex-col items-center p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl hover:border-brand-navy dark:hover:border-verified hover:shadow-md transition-all text-center group">
                <span className="text-3xl mb-3">{icon}</span>
                <div className="font-bold text-sm text-slate-900 dark:text-white mb-1 group-hover:text-brand-navy dark:group-hover:text-verified transition-colors"
                  dangerouslySetInnerHTML={{ __html: label }} />
                <div className="text-xs text-slate-400">{count}</div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/explore"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #0c2340, #143865)" }}>
              Browse all professionals
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12h16m-6-6 6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── KEY FEATURES ──────────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <div className="text-xs font-bold text-verified uppercase tracking-widest mb-3">Platform Features</div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              Built for every side of property.
            </h2>
          </div>

          {/* PropID feature */}
          <div className="grid lg:grid-cols-2 gap-10 items-center mb-20">
            <div>
              <div className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-3">PROP ID</div>
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                One permanent digital identity for every Australian property.
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                Your Prop ID is created the moment you add a property. Every inspection report, warranty, settlement document, renovation certificate and professional service attaches to it — permanently. When you sell, it transfers.
              </p>
              <div className="space-y-3">
                {[
                  "Approved building plans & council certificates",
                  "Warranty deeds & appliance manuals",
                  "Inspection reports (B&P, electrical, pest)",
                  "Settlement & PEXA documents",
                  "Full service history & maintenance log",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                    <svg className="w-4 h-4 text-verified flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m5 12 4 4L19 6" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-8">
                <Link href="/signup" className="px-5 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-all"
                  style={{ background: "linear-gradient(135deg, #0c2340, #143865)" }}>
                  Create your Prop ID
                </Link>
                <Link href="/vault" className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                  View Vault demo
                </Link>
              </div>
            </div>
            <div className="rounded-2xl p-8 border"
              style={{ background: "linear-gradient(135deg, #061221 0%, #0c2340 50%, #0c3d2b 100%)", borderColor: "rgba(16,185,129,0.2)" }}>
              <div className="text-[10px] font-bold text-green-400 uppercase tracking-widest mb-4">PROP ID · TPH-KEN-018</div>
              <div className="text-2xl font-bold text-white mb-1">18 Banksia Crescent</div>
              <div className="text-sm text-slate-400 mb-6">Kenmore QLD 4069 · Created 04 Jan 2024</div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "📋", label: "Plans & Specs", count: "4 docs" },
                  { icon: "🔒", label: "Certificates", count: "6 docs" },
                  { icon: "🛠️", label: "Warranties", count: "12 items" },
                  { icon: "📅", label: "Service History", count: "24 events" },
                ].map(({ icon, label, count }) => (
                  <div key={label} className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.07)" }}>
                    <div className="text-lg mb-1">{icon}</div>
                    <div className="text-xs font-bold text-white">{label}</div>
                    <div className="text-[10px] text-green-400 font-semibold">{count}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">TrustLink · Active · 2 professionals connected</span>
              </div>
            </div>
          </div>

          {/* TrustLink feature */}
          <div className="grid lg:grid-cols-2 gap-10 items-center mb-20">
            <div className="rounded-2xl p-8 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 order-2 lg:order-1">
              <div className="space-y-3">
                {[
                  { id: "TL-99214-B", label: "Building Inspection", pro: "SafeCheck Inspectors", status: "Report Ready", color: "emerald" },
                  { id: "TL-88301-A", label: "Settlement / Conveyancing", pro: "Chen & Associates", status: "Awaiting Docs", color: "amber" },
                  { id: "TL-76100-C", label: "Property Management", pro: "Ray White Inner West", status: "Active", color: "blue" },
                ].map(({ id, label, pro, status, color }) => (
                  <div key={id} className="flex items-center gap-3 p-4 bg-white dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #0c2340, #143865)" }}>
                      🔗
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs text-slate-900 dark:text-white">{label}</div>
                      <div className="text-[10px] text-slate-400">{pro}</div>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${
                      color === "emerald" ? "bg-emerald-100 text-emerald-800" :
                      color === "amber" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"
                    }`}>{status}</span>
                  </div>
                ))}
                <div className="mt-3 p-3 rounded-xl border" style={{ background: "rgba(16,185,129,0.05)", borderColor: "rgba(16,185,129,0.2)" }}>
                  <div className="text-[10px] font-bold text-verified">🔒 TrustLink Security</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Each professional sees only their scoped workspace — never your other service providers or financial details.</div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="text-xs font-bold text-verified uppercase tracking-widest mb-3">TRUSTLINK</div>
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Secure workspaces for every professional relationship.
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                TrustLink creates a scoped, encrypted workspace between you and each professional. Share documents, exchange messages, sign proposals and track progress — without exposing sensitive details to other parties.
              </p>
              <div className="space-y-3">
                {[
                  "Cryptographic access boundaries — professionals see only their scope",
                  "Document requests, uploads and reviews in one place",
                  "PEXA-connected for seamless settlement workflows",
                  "Full audit log — every action immutably recorded",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                    <svg className="w-4 h-4 text-verified flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m5 12 4 4L19 6" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Digital Handover feature */}
          <div className="rounded-2xl overflow-hidden"
            style={{ background: "linear-gradient(160deg, #061221 0%, #0c2340 55%, #0c3d2b 100%)", border: "1px solid rgba(16,185,129,0.2)" }}>
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-10 lg:p-14">
                <div className="text-xs font-bold text-green-400 uppercase tracking-widest mb-4">PROP ID DIGITAL HANDOVER</div>
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
                  A beautiful finish.<br />
                  <span className="text-green-400">A better beginning.</span>
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  The digital handover replaces the cardboard box of paperwork at settlement. Builders guide clients through 5 verification gates, then transfer the permanent Prop ID vault — plans, warranties, certificates and all.
                </p>
                <div className="space-y-3">
                  {["Evidence reviewed & certificates verified", "Selections settled & finishes confirmed", "Joint walkthrough recorded", "Blocking issues cleared", "Owner identity verified & Prop ID transferred"].map((gate, i) => (
                    <div key={gate} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 border-2 ${
                        i < 3 ? "bg-green-900/50 border-green-500 text-green-400" : "bg-amber-900/30 border-amber-500 text-amber-400"
                      }`}>
                        {i < 3 ? "✓" : "!"}
                      </div>
                      <span className="text-sm text-slate-300">{gate}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-8">
                  <Link href="/pro" className="px-5 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-all"
                    style={{ background: "rgba(16,185,129,0.3)", border: "1px solid rgba(16,185,129,0.4)" }}>
                    Open Pro Hub
                  </Link>
                  <Link href="/signup?role=pro" className="px-5 py-2.5 rounded-xl text-sm font-bold text-green-400 border border-green-800 hover:bg-green-900/20 transition-all">
                    Start for free
                  </Link>
                </div>
              </div>
              <div className="p-10 lg:p-14 flex flex-col justify-center" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Handover Readiness</div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                      <circle cx="40" cy="40" r="32" fill="none" stroke="#16a34a" strokeWidth="8" strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 32}`} strokeDashoffset={`${2 * Math.PI * 32 * 0.4}`} />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-bold text-white">3/5</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">18 Banksia Crescent</div>
                    <div className="text-xs text-slate-400">Kenmore QLD · PROP ID 018</div>
                    <div className="text-xs text-slate-400 mt-1">Handover: 24 Sep 2026</div>
                  </div>
                </div>
                {[
                  { label: "Plans & Certificates", status: "4/4 reviewed", ok: true },
                  { label: "Client Selections", status: "1 pending variation", ok: false },
                  { label: "Site Walkthrough", status: "Scheduled Fri 20 Sep", ok: false },
                ].map(({ label, status, ok }) => (
                  <div key={label} className="flex items-center justify-between py-2.5 border-b border-white/10 last:border-0">
                    <span className="text-sm text-slate-300">{label}</span>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded ${ok ? "bg-green-900/50 text-green-400" : "bg-amber-900/30 text-amber-400"}`}>{status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────── */}
      <section className="py-20 bg-slate-50 dark:bg-[#0a1628]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <div className="text-xs font-bold text-verified uppercase tracking-widest mb-3">How It Works</div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">Clear steps for each side.</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 mb-6">
                🏡 For Property Owners & Buyers
              </div>
              <div className="space-y-6">
                {HOW_IT_WORKS_OWNER.map(({ step, title, desc }) => (
                  <div key={step} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-brand-navy text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {step}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-sm mb-1">{title}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: desc }} />
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/signup" className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-all"
                style={{ background: "linear-gradient(135deg, #0c2340, #143865)" }}>
                Create My Property World
              </Link>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-green-50 text-verified dark:bg-green-900/20 dark:text-green-400 mb-6">
                🏗️ For Builders & Professionals
              </div>
              <div className="space-y-6">
                {HOW_IT_WORKS_PRO.map(({ step, title, desc }) => (
                  <div key={step} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-verified text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {step}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-sm mb-1">{title}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: desc }} />
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/signup?role=pro" className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-all"
                style={{ background: "linear-gradient(135deg, #0c3d2b, #16a34a)" }}>
                Set Up Pro Hub
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-xs font-bold text-verified uppercase tracking-widest mb-3">Real People. Real Results.</div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
              Trusted across Australia.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ quote, name, role, location, avatar }) => (
              <div key={name} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                <div className="flex mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-brand-gold" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5 italic">
                  &ldquo;{quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-navy text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {avatar}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-900 dark:text-white">{name}</div>
                    <div className="text-xs text-slate-400">{role} · {location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section className="py-20"
        style={{ background: "linear-gradient(160deg, #061221 0%, #0c2340 55%, #0c3d2b 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="text-xs font-bold text-green-400 uppercase tracking-widest mb-4">Get Started Today</div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            Your property. Your professionals.<br />
            <span className="text-green-400">One permanent record.</span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-10 max-w-xl mx-auto">
            Join 48,000+ Australian properties already on TPH. Free to get started — no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup"
              className="px-8 py-4 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #0c3d2b, #16a34a)" }}>
              🏡 Create My Property World
            </Link>
            <Link href="/signup?role=pro"
              className="px-8 py-4 rounded-xl text-sm font-bold text-white border border-slate-600 hover:bg-white/5 transition-all">
              🏗️ Set Up Pro Hub
            </Link>
          </div>
          <div className="flex justify-center gap-6 mt-8">
            {["REIQ Member Network", "MBA Accredited", "AIBS Certified", "AWS Hosted in Australia"].map((badge) => (
              <span key={badge} className="text-[10px] text-slate-500 font-semibold">{badge}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="bg-[#040d18] text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-10 flex items-center justify-center font-bold text-xs text-[#061221]"
                  style={{ background: "linear-gradient(135deg,#10b981,#16a34a)", borderRadius: "7px 7px 7px 2px" }}>
                  TPH
                </div>
                <div>
                  <div className="text-white font-bold text-sm">The Property Helpline</div>
                  <div className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Australia</div>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-slate-500 max-w-xs">
                Australia&apos;s trusted platform for property professionals and owners. Prop ID · TrustLink · Digital Handover.
              </p>
              <div className="flex gap-2 mt-4">
                {["REIQ", "MBA", "AIBS", "PEXA"].map((badge) => (
                  <span key={badge} className="text-[9px] font-bold px-2 py-1 rounded border border-slate-800 text-slate-500">{badge}</span>
                ))}
              </div>
            </div>

            {[
              { heading: "For Owners", links: ["My Property World", "Find a Professional", "Property Vault", "TrustLinks", "Prop ID"] },
              { heading: "For Professionals", links: ["Pro Hub", "Digital Handover", "TrustLink CRM", "Leads & Inquiries", "Get Listed"] },
              { heading: "Company", links: ["About TPH", "How It Works", "Pricing", "Blog", "Careers"] },
            ].map(({ heading, links }) => (
              <div key={heading}>
                <div className="text-xs font-bold text-white uppercase tracking-widest mb-4">{heading}</div>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="text-xs text-slate-500 hover:text-white transition-colors">{link}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs text-slate-600">
              © 2026 The Property Helpline Pty Ltd · ABN 12 345 678 901 · Brisbane QLD, Australia
            </div>
            <div className="flex gap-4 text-xs text-slate-600">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
            <div className="text-[10px] text-slate-700">
              🇦🇺 Data hosted in Australia · AWS ap-southeast-2 (Sydney)
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
