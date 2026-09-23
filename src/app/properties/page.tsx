"use client";
import React, { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BacktrackingNav } from "@/components/layout/BacktrackingNav";
import { PROPERTIES_LIST } from "@/lib/properties";

function MyPropertyWorldContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeRailTab, setActiveRailTab] = useState<"overview" | "properties">(
    tabParam === "properties" ? "properties" : "overview"
  );
  const [propertyFilter, setPropertyFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (tabParam === "properties") {
      setActiveRailTab("properties");
    } else if (tabParam === "overview") {
      setActiveRailTab("overview");
    }
  }, [tabParam]);

  const handleTabChange = (tab: "overview" | "properties") => {
    setActiveRailTab(tab);
    const url = tab === "properties" ? "/properties?tab=properties" : "/properties";
    router.replace(url, { scroll: false });
  };

  const filteredProperties = PROPERTIES_LIST.filter((p) => {
    if (propertyFilter === "owned" && p.type !== "Owned home") return false;
    if (propertyFilter === "saved" && p.type !== "Saved space") return false;
    if (propertyFilter === "investment" && p.type !== "Investment") return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.address.toLowerCase().includes(q) ||
        p.propId.toLowerCase().includes(q) ||
        p.suburb.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="w-full flex-1 flex flex-col bg-[#f4f6f8] text-[#102645] font-sans">
      
      {/* ── Backtracking & Location Tracking Navbar ─────────────────── */}
      <BacktrackingNav
        backHref="/"
        breadcrumbs={
          activeRailTab === "overview"
            ? [
                { label: "Home", href: "/" },
                { label: "My Property World", href: "/properties" },
                { label: "Overview", active: true },
              ]
            : [
                { label: "Home", href: "/" },
                { label: "My Property World", href: "/properties" },
                { label: "My Properties", active: true },
              ]
        }
        pageTag={
          activeRailTab === "overview"
            ? "Space: Personal Overview"
            : "Space: My Properties Directory"
        }
        actionSlot={
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleTabChange("overview")}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                activeRailTab === "overview"
                  ? "bg-[#071d3b] text-white"
                  : "bg-[#f4f6f8] text-[#5b6e84] hover:bg-[#e4e9f0]"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => handleTabChange("properties")}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                activeRailTab === "properties"
                  ? "bg-[#071d3b] text-white"
                  : "bg-[#f4f6f8] text-[#5b6e84] hover:bg-[#e4e9f0]"
              }`}
            >
              <span>My Properties</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeRailTab === "properties" ? "bg-white/20 text-white" : "bg-[#dfe6ef] text-[#071d3b]"
              }`}>
                {PROPERTIES_LIST.length}
              </span>
            </button>
          </div>
        }
      />

      {/* Shell with Left Navigation Rail + Workspace Content */}
      <div className="max-w-[1512px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[230px_minmax(0,1fr)] min-h-[calc(100vh-140px)]">

        {/* ── LEFT RAIL ─────────────────────────────────────────────── */}
        <aside className="bg-white border-r border-[#dfe6ef] p-6 lg:p-7 flex flex-col gap-6 sticky top-[54px] h-[calc(100vh-54px)] overflow-y-auto">
          
          <div className="px-1">
            <div className="text-[9px] font-bold uppercase tracking-[1.3px] text-[#24754c]">
              Your personal space
            </div>
            <h2 className="text-xl font-bold tracking-tight text-[#102645] mt-1 leading-snug">
              My Property<br />World
            </h2>
          </div>

          {/* Rail Navigation Links */}
          <nav className="grid gap-1.5 text-[12px] font-medium" aria-label="My Property World">
            <button
              onClick={() => handleTabChange("overview")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-left transition-all ${
                activeRailTab === "overview"
                  ? "bg-[#071d3b] text-white font-semibold shadow-sm"
                  : "text-[#5b6e84] hover:bg-[#f3f6f9]"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Overview</span>
            </button>

            <button
              onClick={() => handleTabChange("properties")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-left transition-all ${
                activeRailTab === "properties"
                  ? "bg-[#071d3b] text-white font-semibold shadow-sm"
                  : "text-[#5b6e84] hover:bg-[#f3f6f9]"
              }`}
            >
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                <span>Properties</span>
              </div>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                activeRailTab === "properties" ? "bg-white/20 text-white" : "bg-[#edf2f7] text-[#071d3b]"
              }`}>
                {PROPERTIES_LIST.length}
              </span>
            </button>

            <Link
              href="/trustlinks"
              className="flex items-start gap-3 px-3.5 py-2.5 rounded-lg text-[#5b6e84] hover:bg-[#f3f6f9] transition-all"
            >
              <svg className="w-4 h-4 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div>
                <div>Trust Link</div>
                <small className="block text-[9px] text-[#8a97a7]">People &amp; permissions</small>
              </div>
            </Link>

            <Link
              href="/trustlinks/welcome"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-[#5b6e84] hover:bg-[#f3f6f9] transition-all"
            >
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <span>Messages</span>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.5 bg-[#edf2f7] text-[#071d3b] rounded">
                1
              </span>
            </Link>
          </nav>

          {/* Current Property Context */}
          <div className="px-1 pt-4 border-t border-[#dfe6ef]">
            <span className="block text-[9px] font-bold uppercase tracking-[1px] text-[#8a97a7] mb-2.5">
              In this property
            </span>
            <Link
              href="/properties/TPH-KEN-018"
              className="flex items-center gap-2.5 p-2 rounded-lg bg-[#f3f6fb] hover:bg-[#e8f0f8] transition-colors border border-[#dfe6ef]"
            >
              <div className="w-8 h-8 rounded bg-[#071d3b] text-[#efbd66] flex items-center justify-center font-bold text-xs flex-shrink-0">
                🏠
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-bold text-[#102645] truncate leading-tight">
                  18 Banksia Crescent
                </div>
                <small className="text-[9px] text-[#68788e] block leading-tight mt-0.5">
                  Kenmore · Prop ID
                </small>
              </div>
            </Link>
          </div>

          {/* Rail Bottom Footer */}
          <div className="mt-auto pt-4 border-t border-[#dfe6ef] text-[10px] text-[#68788e] space-y-2">
            <Link href="/learn" className="flex items-center gap-2 text-[#102645] font-semibold hover:underline">
              <svg className="w-3.5 h-3.5 text-[#24754c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Home Compass · Learn</span>
            </Link>
            <div className="pt-2">
              <strong className="block text-[#102645] font-semibold text-[11px] flex items-center gap-1">
                <span>🔒</span> Private by default
              </strong>
              <p className="mt-1 leading-relaxed text-[#68788e]">
                You choose what to share, with whom, and for how long.
              </p>
            </div>
          </div>

        </aside>

        {/* ── RIGHT WORKSPACE CONTENT ─────────────────────────────────── */}
        <main className="p-6 sm:p-9 lg:p-11 max-w-[1240px] w-full">

          {/* ═══════════════════════════════════════════════════════════════
              VIEW 1: OVERVIEW DASHBOARD (Active when activeRailTab === "overview")
             ═══════════════════════════════════════════════════════════════ */}
          {activeRailTab === "overview" && (
            <div>
              {/* Top Header & Greeting */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-[1.4px] text-[#24754c] mb-1">
                    My Property World
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-1px] text-[#102645]">
                    Good to see you, Alex.
                  </h1>
                  <p className="text-[13px] text-[#68788e] mt-1">
                    Your next step is here. Everything stays with the right property.
                  </p>
                </div>
                <div className="flex items-center gap-2.5 self-start sm:self-auto">
                  <button
                    onClick={() => handleTabChange("properties")}
                    className="inline-flex items-center gap-1.5 bg-white border border-[#cbd5e2] hover:bg-[#f3f6fb] text-[#102645] px-4 py-2.5 rounded-xl text-[12px] font-semibold transition-colors shadow-2xs"
                  >
                    <span>View all properties ({PROPERTIES_LIST.length})</span>
                    <span>→</span>
                  </button>
                  <button
                    onClick={() => alert("Add a Property: Enter address to start a new Prop ID record or private saved space.")}
                    className="inline-flex items-center gap-1.5 bg-[#071d3b] hover:bg-[#102d59] text-white px-4 py-2.5 rounded-xl text-[12px] font-semibold transition-colors shadow-2xs"
                  >
                    <span>+ Add a property</span>
                  </button>
                </div>
              </div>

              {/* Handover Ready Hero Banner */}
              <section className="bg-[#071d3b] text-white rounded-2xl p-6 sm:p-8 mb-9 relative overflow-hidden shadow-[0_12px_40px_rgba(7,29,59,0.08)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="max-w-xl">
                  <div className="text-[#efbd66] text-[10px] font-bold uppercase tracking-[1.8px] mb-2">
                    Your next step · Handover ready
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-2 leading-snug">
                    A new home.<br />Everything you need to know.
                  </h2>
                  <p className="text-[13px] text-[#b9c8db] leading-relaxed mb-6">
                    Your pack for <strong className="text-white font-medium">18 Banksia Crescent</strong> is ready to review. Check the documents and open items in your Prop ID.
                  </p>
                  <div className="flex items-center gap-4 flex-wrap">
                    <Link
                      href="/properties/TPH-KEN-018"
                      className="bg-[#efbd66] hover:bg-[#dfac55] text-[#071d3b] font-bold px-5 py-2.5 rounded-xl text-[13px] transition-colors shadow-sm flex items-center gap-2"
                    >
                      <span>Review my handover</span>
                      <span>→</span>
                    </Link>
                    <span className="text-[11px] text-[#b9c8db]">
                      From Hart Homes · Sample pack
                    </span>
                  </div>
                </div>

                <Link
                  href="/properties/TPH-KEN-018"
                  className="hidden lg:block w-48 h-36 rounded-xl overflow-hidden shadow-md flex-shrink-0 border border-white/20 hover:scale-[1.02] transition-transform"
                >
                  <img
                    src="/images/hero-real-estate.jpg"
                    alt="18 Banksia Crescent"
                    className="w-full h-full object-cover"
                  />
                </Link>
              </section>

              {/* Two-Column Overview Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 mb-10">

                {/* Left Card: Needs Your Attention */}
                <section className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-[#dfe6ef] mb-4">
                    <h2 className="text-base font-bold text-[#102645]">Needs your attention</h2>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-[#eaf5ef] text-[#24754c] rounded-full">
                      2
                    </span>
                  </div>

                  <div className="divide-y divide-[#dfe6ef]">
                    <div className="py-3.5 flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#fff4df] text-[#8b641c] flex items-center justify-center font-bold text-base flex-shrink-0">
                        🎁
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[13px] font-bold text-[#102645] truncate">
                          Review your handover pack
                        </h3>
                        <p className="text-[11px] text-[#68788e] truncate">
                          18 Banksia Crescent · Plans, warranties and open items
                        </p>
                      </div>
                      <Link
                        href="/properties/TPH-KEN-018"
                        className="px-3 py-1.5 bg-[#f3f6fb] hover:bg-[#e5eef7] text-[#071d3b] text-[11px] font-bold rounded-lg transition-colors flex-shrink-0"
                      >
                        Review
                      </Link>
                    </div>

                    <div className="py-3.5 flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#eaf5ef] text-[#24754c] flex items-center justify-center font-bold text-base flex-shrink-0">
                        💬
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[13px] font-bold text-[#102645] truncate">
                          Read Olivia’s message
                        </h3>
                        <p className="text-[11px] text-[#68788e] truncate">
                          New home handover · Hart Homes
                        </p>
                      </div>
                      <Link
                        href="/trustlinks/welcome"
                        className="px-3 py-1.5 bg-[#f3f6fb] hover:bg-[#e5eef7] text-[#071d3b] text-[11px] font-bold rounded-lg transition-colors flex-shrink-0"
                      >
                        Read
                      </Link>
                    </div>
                  </div>
                </section>

                {/* Right Card: What would you like to do? */}
                <section className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm">
                  <div className="pb-4 border-b border-[#dfe6ef] mb-4">
                    <h2 className="text-base font-bold text-[#102645]">What would you like to do?</h2>
                  </div>

                  <div className="divide-y divide-[#dfe6ef]">
                    <button
                      onClick={() => alert("Keep a Document Safe: Upload warranties, receipts or compliance certificates to your Prop ID.")}
                      className="w-full py-3 flex items-center gap-3.5 text-left hover:bg-[#f9fafc] rounded-lg p-1.5 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#f3f6fb] text-[#24754c] flex items-center justify-center flex-shrink-0">
                        📄
                      </div>
                      <div className="flex-1">
                        <strong className="block text-[13px] font-semibold text-[#102645]">Keep a document safe</strong>
                        <small className="text-[11px] text-[#68788e]">Add it to the right property</small>
                      </div>
                      <span className="text-[#68788e]">›</span>
                    </button>

                    <Link
                      href="/explore"
                      className="w-full py-3 flex items-center gap-3.5 text-left hover:bg-[#f9fafc] rounded-lg p-1.5 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#f3f6fb] text-[#24754c] flex items-center justify-center flex-shrink-0">
                        👥
                      </div>
                      <div className="flex-1">
                        <strong className="block text-[13px] font-semibold text-[#102645]">Find the right person</strong>
                        <small className="text-[11px] text-[#68788e]">Start with a conversation</small>
                      </div>
                      <span className="text-[#68788e]">›</span>
                    </Link>

                    <Link
                      href="/trustlinks"
                      className="w-full py-3 flex items-center gap-3.5 text-left hover:bg-[#f9fafc] rounded-lg p-1.5 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#f3f6fb] text-[#24754c] flex items-center justify-center flex-shrink-0">
                        🛡️
                      </div>
                      <div className="flex-1">
                        <strong className="block text-[13px] font-semibold text-[#102645]">Review who has access</strong>
                        <small className="text-[11px] text-[#68788e]">Manage your Trust Links</small>
                      </div>
                      <span className="text-[#68788e]">›</span>
                    </Link>
                  </div>
                </section>

              </div>

              {/* Your Properties Section Preview */}
              <section className="mb-10">
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div>
                    <h2 className="text-xl font-bold text-[#102645]">Your properties</h2>
                    <p className="text-[12px] text-[#68788e]">Choose a property to open its own space.</p>
                  </div>
                  <button
                    onClick={() => handleTabChange("properties")}
                    className="text-[12px] font-bold text-[#071d3b] hover:underline flex items-center gap-1"
                  >
                    <span>View all {PROPERTIES_LIST.length} properties</span>
                    <span>→</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {PROPERTIES_LIST.map((property) => (
                    <Link
                      key={property.id}
                      href={`/properties/${property.id}`}
                      className="bg-white border border-[#dfe6ef] rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md hover:border-[#cbd5e2] transition-all group"
                    >
                      <div className="relative h-44 bg-[#e4eaf0] overflow-hidden">
                        <img
                          src={property.imageUrl}
                          alt={property.street}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className={`absolute bottom-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold shadow-sm flex items-center gap-1.5 bg-white ${property.typeColor}`}>
                          <span>🏠</span> {property.type} · {property.propId}
                        </span>
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-base font-bold text-[#102645] group-hover:text-[#071d3b] transition-colors mb-0.5">
                            {property.street}
                          </h3>
                          <p className="text-[11px] text-[#68788e] mb-3">
                            {property.suburb}, {property.state} {property.postcode}
                          </p>
                          <div className="text-[11px] text-[#68788e] flex items-center gap-1.5 mb-3 pb-3 border-b border-[#dfe6ef]">
                            <span>📁</span> {property.documentsCount} documents · <strong className="text-[#102645]">Living Prop ID</strong>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1 text-[11px]">
                          <span className={`font-semibold ${property.statusColor} px-2 py-0.5 rounded text-[10px]`}>
                            {property.statusBadge}
                          </span>
                          <span className="text-[#071d3b] font-bold group-hover:underline flex items-center gap-1">
                            <span>Open Space</span>
                            <span className="text-[#efbd66]">→</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Recent Conversations */}
              <section className="mb-12">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-[#102645]">Recent conversations</h2>
                    <p className="text-[12px] text-[#68788e]">Pick up with the person who knows your property.</p>
                  </div>
                  <Link href="/trustlinks" className="text-[12px] font-semibold text-[#071d3b] hover:underline flex items-center gap-1">
                    <span>All messages</span>
                    <span className="text-[#efbd66]">→</span>
                  </Link>
                </div>

                <div className="bg-white border border-[#dfe6ef] rounded-2xl overflow-hidden shadow-sm">
                  <Link
                    href="/trustlinks/welcome"
                    className="p-5 flex items-center gap-4 hover:bg-[#f8fafc] transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#e6eaf3] text-[#425b7c] font-serif font-bold text-xl flex items-center justify-center flex-shrink-0">
                      OH
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-[#102645]">Olivia Hart</h3>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 bg-[#eaf5ef] text-[#24754c] rounded">
                          New
                        </span>
                      </div>
                      <p className="text-[11px] text-[#68788e] mt-0.5">
                        New home handover · 18 Banksia Crescent
                      </p>
                      <span className="block text-[11px] text-[#102645] mt-1 truncate">
                        “Your sample handover pack is ready to review. You can check each section and record receipt...”
                      </span>
                    </div>
                    <div className="text-right text-[11px] text-[#68788e] flex-shrink-0 hidden sm:block">
                      <span className="text-[#24754c] font-semibold block">Active</span>
                      <span className="text-[10px]">Open conversation →</span>
                    </div>
                  </Link>
                </div>
              </section>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              VIEW 2: DEDICATED MY PROPERTIES PAGE (Active when activeRailTab === "properties")
             ═══════════════════════════════════════════════════════════════ */}
          {activeRailTab === "properties" && (
            <div>
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-[1.4px] text-[#24754c] mb-1">
                    Your Personal Space · Property Portfolio
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-1px] text-[#102645]">
                    My Properties
                  </h1>
                  <p className="text-[13px] text-[#68788e] mt-1">
                    All your connected homes, due diligence spaces, and investment records in one place.
                  </p>
                </div>
                <div className="flex items-center gap-2.5 self-start sm:self-auto">
                  <button
                    onClick={() => handleTabChange("overview")}
                    className="inline-flex items-center gap-1.5 bg-white border border-[#cbd5e2] hover:bg-[#f3f6fb] text-[#102645] px-4 py-2.5 rounded-xl text-[12px] font-semibold transition-colors shadow-2xs"
                  >
                    <span>← Back to Overview</span>
                  </button>
                  <button
                    onClick={() => alert("Add a Property: Enter address to start a new Prop ID record or private saved space.")}
                    className="inline-flex items-center gap-1.5 bg-[#071d3b] hover:bg-[#102d59] text-white px-4 py-2.5 rounded-xl text-[12px] font-semibold transition-colors shadow-2xs"
                  >
                    <span>+ Add a property</span>
                  </button>
                </div>
              </div>

              {/* 3 Summary Counters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-3xl font-bold tracking-tight text-[#102645]">{PROPERTIES_LIST.length}</span>
                    <span className="text-lg">🏡</span>
                  </div>
                  <strong className="block text-[13px] text-[#102645]">Active Property Spaces</strong>
                  <small className="text-[11px] text-[#68788e]">All linked to sovereign records</small>
                </div>

                <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-3xl font-bold tracking-tight text-[#8b641c]">1</span>
                    <span className="text-lg">🎁</span>
                  </div>
                  <strong className="block text-[13px] text-[#102645]">Handover Ready to Review</strong>
                  <small className="text-[11px] text-[#68788e]">18 Banksia Crescent, Kenmore</small>
                </div>

                <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-3xl font-bold tracking-tight text-[#24754c]">47</span>
                    <span className="text-lg">📁</span>
                  </div>
                  <strong className="block text-[13px] text-[#102645]">Authenticated Documents</strong>
                  <small className="text-[11px] text-[#68788e]">Form 16/43 certs, plans &amp; warranties</small>
                </div>
              </div>

              {/* Search & Filters */}
              <div className="bg-white border border-[#dfe6ef] rounded-2xl p-4 sm:p-5 shadow-sm mb-7 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex gap-2 overflow-x-auto pb-1 w-full sm:w-auto">
                  {[
                    { id: "all", label: "All Properties" },
                    { id: "owned", label: "Owned Homes" },
                    { id: "saved", label: "Saved for Buying" },
                    { id: "investment", label: "Investment" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setPropertyFilter(f.id)}
                      className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all whitespace-nowrap ${
                        propertyFilter === f.id
                          ? "bg-[#071d3b] text-white font-semibold shadow-sm"
                          : "bg-white border border-[#dfe6ef] text-[#68788e] hover:bg-[#f3f6fb]"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                <div className="w-full sm:w-72">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by address, suburb, or Prop ID..."
                    className="w-full bg-[#f4f6f8] border border-[#dfe6ef] rounded-xl px-3.5 py-2 text-[12px] text-[#102645] focus:outline-none"
                  />
                </div>
              </div>

              {/* Properties Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {filteredProperties.map((property) => (
                  <Link
                    key={property.id}
                    href={`/properties/${property.id}`}
                    className="bg-white border border-[#dfe6ef] rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md hover:border-[#cbd5e2] transition-all group"
                  >
                    <div className="relative h-48 bg-[#e4eaf0] overflow-hidden">
                      <img
                        src={property.imageUrl}
                        alt={property.street}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className={`absolute bottom-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold shadow-sm flex items-center gap-1.5 bg-white ${property.typeColor}`}>
                        <span>🏠</span> {property.type}
                      </span>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-[#f3f6fb] rounded text-[#071d3b]">
                            {property.propId}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${property.statusColor}`}>
                            {property.statusBadge}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-[#102645] group-hover:text-[#071d3b] transition-colors mt-2 mb-1">
                          {property.street}
                        </h3>
                        <p className="text-[12px] text-[#68788e] mb-4">
                          {property.suburb}, {property.state} {property.postcode}
                        </p>

                        <div className="space-y-1.5 text-[11px] text-[#68788e] mb-5 pt-3 border-t border-[#dfe6ef]">
                          <div className="flex items-center justify-between">
                            <span>Sovereign Vault:</span>
                            <strong className="text-[#102645]">{property.documentsCount} documents</strong>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Cadastral Title:</span>
                            <span className="font-mono text-[#102645]">{property.legalDna.cadastral.split("(")[0]}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#dfe6ef] flex items-center justify-between text-[12px]">
                        <span className="text-[#68788e] text-[11px]">Open property space</span>
                        <span className="px-3.5 py-1.5 bg-[#071d3b] text-white font-bold rounded-lg text-[11px] group-hover:bg-[#102d59] transition-colors flex items-center gap-1">
                          <span>View Property</span>
                          <span>→</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}

                {/* Add New Property Card */}
                <div
                  onClick={() => alert("Add a Property: Enter address to allocate a new Prop ID passport.")}
                  className="bg-[#f9fafc] border-2 border-dashed border-[#cbd5e2] hover:border-[#071d3b] rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors min-h-[360px]"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white border border-[#dfe6ef] flex items-center justify-center text-2xl mb-3 shadow-2xs">
                    +
                  </div>
                  <h3 className="text-base font-bold text-[#102645] mb-1">
                    Add another property
                  </h3>
                  <p className="text-[12px] text-[#68788e] max-w-xs mb-4">
                    Create a living Prop ID for a home you own, a renovation, or a property you are buying.
                  </p>
                  <span className="px-4 py-2 bg-[#071d3b] text-white text-[12px] font-bold rounded-xl shadow-2xs">
                    + Start New Prop ID
                  </span>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}

export default function MyPropertyWorldPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-[#68788e]">Loading My Property World...</div>}>
      <MyPropertyWorldContent />
    </Suspense>
  );
}
