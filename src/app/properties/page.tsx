"use client";
import React, { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BacktrackingNav } from "@/components/layout/BacktrackingNav";
import { PROPERTIES_LIST } from "@/lib/properties";
import { PropertyPulseNotification } from "@/components/features/PropertyPulse";

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
    if (propertyFilter === "renovation" && p.type !== "Renovation") return false;
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
            <Link
              href="/trustlinks"
              className="px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all bg-[#f4f6f8] text-[#5b6e84] hover:bg-[#e4e9f0] hover:text-[#071d3b]"
            >
              TrustLinks
            </Link>
          </div>
        }
      />

      {/* Workspace Content */}
      <main className="max-w-[1240px] mx-auto w-full p-6 sm:p-9 lg:p-11">

          {/* ═══════════════════════════════════════════════════════════════
              VIEW 1: OVERVIEW DASHBOARD (Active when activeRailTab === "overview")
             ═══════════════════════════════════════════════════════════════ */}
          {activeRailTab === "overview" && (
            <div>
              {/* Top Header & Greeting */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
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
                    className="inline-flex items-center gap-1.5 bg-white border border-[#cbd5e2] hover:bg-[#f3f6fb] text-[#102645] px-4 py-2.5 rounded-xl text-[12px] font-semibold transition-colors shadow-2xs cursor-pointer"
                  >
                    <span>View all properties ({PROPERTIES_LIST.length})</span>
                    <span>→</span>
                  </button>
                  <button
                    onClick={() => alert("Add a Property: Enter address to start a new Prop ID record.")}
                    className="inline-flex items-center gap-1.5 bg-[#071d3b] hover:bg-[#102d59] text-white px-4 py-2.5 rounded-xl text-[12px] font-semibold transition-colors shadow-2xs cursor-pointer"
                  >
                    <span>+ Add a property</span>
                  </button>
                </div>
              </div>

              {/* Main Workspace Layout: Properties (Primary) + Side Notifications */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_360px] gap-8 items-start mb-12">

                {/* ── LEFT: PROPERTIES (MAIN FOCUS) ─────────────────────────── */}
                <section className="space-y-5">
                  <div className="flex items-center justify-between pb-2 border-b border-[#dfe6ef]">
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-xl font-bold text-[#102645]">Your properties</h2>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-[#eaf5ef] text-[#24754c] rounded-full border border-[#d2e6d9]">
                        {PROPERTIES_LIST.length} Connected
                      </span>
                    </div>
                    <span className="text-[11px] text-[#68788e]">
                      Choose a property to open its living passport
                    </span>
                  </div>

                  {/* Properties Grid including "+ Add another property" card */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {PROPERTIES_LIST.map((property) => (
                      <article
                        key={property.id}
                        className="bg-white border border-[#dfe6ef] rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md hover:border-[#cbd5e2] transition-all group"
                      >
                        <Link href={`/properties/${property.id}`} className="block">
                          <div className="relative h-44 bg-[#e4eaf0] overflow-hidden">
                            <img
                              src={property.imageUrl}
                              alt={property.street}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <span className={`absolute bottom-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold shadow-sm flex items-center gap-1.5 bg-white ${property.typeColor}`}>
                              <svg className="w-3 h-3 text-[#102645]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              </svg>
                              <span>{property.type} · {property.propId}</span>
                            </span>
                          </div>
                        </Link>

                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <Link href={`/properties/${property.id}`} className="block">
                              <h3 className="text-base font-bold text-[#102645] group-hover:text-[#071d3b] transition-colors mb-0.5">
                                {property.street}
                              </h3>
                            </Link>
                            <p className="text-[11px] text-[#68788e] mb-3">
                              {property.suburb}, {property.state} {property.postcode}
                            </p>
                            <div className="text-[11px] text-[#68788e] flex items-center gap-1.5 mb-3 pb-3 border-b border-[#dfe6ef]">
                              <svg className="w-3.5 h-3.5 text-[#24754c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                              </svg>
                              <span>{property.documentsCount} documents · <strong className="text-[#102645]">Living Prop ID</strong></span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-1 text-[11px] gap-2 flex-wrap">
                            <Link
                              href={`/properties/${property.id}`}
                              className="px-3 py-1.5 bg-[#071d3b] hover:bg-[#15345d] text-white font-bold rounded-lg text-[10px] transition-colors shadow-2xs"
                            >
                              Open my home →
                            </Link>
                            <div className="flex items-center gap-1.5">
                              <Link
                                href={`/properties/${property.id}?tab=digital-key`}
                                className="px-2 py-1 bg-[#eaf5ef] hover:bg-[#d5ebd9] text-[#24754c] font-bold rounded-lg text-[10px] transition-colors flex items-center gap-1 border border-[#c3dfcc]"
                              >
                                <span>🔑 Digital Key</span>
                              </Link>
                              <Link
                                href={`/properties/${property.id}?tab=trustlink`}
                                className="px-2.5 py-1 bg-[#071d3b] hover:bg-[#15345d] text-white font-bold rounded-lg text-[10px] transition-colors flex items-center gap-1 shadow-2xs"
                              >
                                <span>🛡️ TrustLink</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}

                    {/* Add Another Property Card (Directly in the grid!) */}
                    <div
                      onClick={() => alert("Add a Property: Enter address to allocate a new Prop ID passport.")}
                      className="bg-[#f9fafc] border-2 border-dashed border-[#cbd5e2] hover:border-[#071d3b] rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:shadow-md min-h-[340px] group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-[#071d3b] text-[#071d3b] group-hover:text-white border border-[#dfe6ef] flex items-center justify-center text-2xl font-bold mb-3 transition-colors shadow-2xs">
                        +
                      </div>
                      <h3 className="text-base font-bold text-[#102645] mb-1">
                        Add another property
                      </h3>
                      <p className="text-[12px] text-[#68788e] max-w-xs mb-4">
                        Create a living Prop ID for a home you own, an investment, or an active renovation.
                      </p>
                      <span className="px-4 py-2 bg-[#071d3b] group-hover:bg-[#15345d] text-white text-[11px] font-bold rounded-xl shadow-2xs transition-colors">
                        + Start New Prop ID
                      </span>
                    </div>
                  </div>
                </section>

                {/* ── RIGHT: SIDE NOTIFICATIONS & ACTIONS ────────────────────── */}
                <aside className="space-y-4 lg:sticky lg:top-[74px]">

                  {/* Section Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-[#dfe6ef]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#24754c] animate-pulse" />
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#102645]">
                        Side Notifications
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-[#fef3c7] text-[#92400e] rounded-full border border-[#fde68a]">
                      3 Active
                    </span>
                  </div>

                  {/* 1. Handover Ready Alert (The Blue Card portrayed as a side notification) */}
                  <div className="bg-[#071d3b] text-white rounded-xl p-4 shadow-sm border border-white/10 relative overflow-hidden">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[#efbd66] text-[9.5px] font-bold uppercase tracking-[1.4px] flex items-center gap-1">
                        <span>📦</span> Handover Ready
                      </span>
                      <span className="text-[9px] bg-white/10 text-[#b9c8db] px-2 py-0.5 rounded">
                        Hart Homes
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      18 Banksia Crescent
                    </h4>
                    <p className="text-[11.5px] text-[#b9c8db] leading-relaxed mb-3">
                      Your new digital handover pack is ready. Review warranties, manuals, and statutory certs.
                    </p>
                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/10">
                      <Link
                        href="/properties/TPH-KEN-018?tab=digital-key"
                        className="px-3 py-1.5 bg-[#efbd66] hover:bg-[#dfac55] text-[#071d3b] text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
                      >
                        <span>Review handover</span>
                        <span>→</span>
                      </Link>
                      <span className="text-[10px] text-[#8a9bb0]">
                        Sample pack
                      </span>
                    </div>
                  </div>

                  {/* 2. Property Pulse Live Notice */}
                  <PropertyPulseNotification
                    propId="TPH-KEN-018"
                    property="18 Banksia Crescent"
                    mode="consumer"
                    actionHref="/properties/TPH-KEN-018"
                    actionLabel="Open Prop ID"
                    className="shadow-2xs"
                  />

                  {/* 3. Needs Attention Card */}
                  <div className="bg-white border border-[#dfe6ef] rounded-xl p-3.5 shadow-2xs">
                    <div className="flex items-center justify-between pb-2 border-b border-[#f1f4f8] mb-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#102645]">
                          Needs attention
                        </h4>
                      </div>
                      <span className="text-[9.5px] font-bold px-1.5 py-0.2 bg-[#fef3c7] text-[#92400e] rounded-full">
                        2 items
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="p-2 rounded-lg bg-[#fafbfc] hover:bg-[#f3f6fb] transition-colors border border-[#f0f4f8] flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <span className="text-[11.5px] font-semibold text-[#102645] block truncate leading-tight">
                            Review handover pack
                          </span>
                          <span className="text-[9.5px] text-[#68788e] block truncate leading-tight">
                            18 Banksia Crescent · Certs & items
                          </span>
                        </div>
                        <Link
                          href="/properties/TPH-KEN-018?tab=digital-key"
                          className="px-2 py-1 bg-[#071d3b] hover:bg-[#15345d] text-white text-[10px] font-bold rounded-md flex-shrink-0 transition-colors"
                        >
                          Review
                        </Link>
                      </div>

                      <div className="p-2 rounded-lg bg-[#fafbfc] hover:bg-[#f3f6fb] transition-colors border border-[#f0f4f8] flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <span className="text-[11.5px] font-semibold text-[#102645] block truncate leading-tight">
                            Verify TrustLink access
                          </span>
                          <span className="text-[9.5px] text-[#68788e] block truncate leading-tight">
                            18 Banksia Crescent · Active connection
                          </span>
                        </div>
                        <Link
                          href="/trustlinks/TL-99214-B"
                          className="px-2 py-1 bg-[#f0f4f8] hover:bg-[#e2e8f0] text-[#071d3b] text-[10px] font-bold rounded-md flex-shrink-0 transition-colors"
                        >
                          Review
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* 4. Quick Actions Shortcuts */}
                  <div className="bg-white border border-[#dfe6ef] rounded-xl p-3.5 shadow-2xs">
                    <div className="pb-2 border-b border-[#f1f4f8] mb-2.5">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#68788e]">
                        Quick actions
                      </h4>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => alert("Keep a Document Safe: Upload warranties, receipts or compliance certificates to your Prop ID.")}
                        className="p-2 rounded-lg bg-[#fafbfc] hover:bg-[#f3f6fb] border border-[#edf2f7] hover:border-[#dfe6ef] transition-all text-left flex flex-col justify-between group cursor-pointer"
                      >
                        <span className="text-sm mb-1 text-[#24754c]">📄</span>
                        <div>
                          <strong className="block text-[11px] font-semibold text-[#102645] group-hover:text-[#071d3b] leading-tight">
                            Save doc
                          </strong>
                          <span className="text-[9px] text-[#68788e] block leading-tight mt-0.5 truncate">
                            To vault
                          </span>
                        </div>
                      </button>

                      <Link
                        href="/explore"
                        className="p-2 rounded-lg bg-[#fafbfc] hover:bg-[#f3f6fb] border border-[#edf2f7] hover:border-[#dfe6ef] transition-all text-left flex flex-col justify-between group cursor-pointer"
                      >
                        <span className="text-sm mb-1 text-[#071d3b]">👥</span>
                        <div>
                          <strong className="block text-[11px] font-semibold text-[#102645] group-hover:text-[#071d3b] leading-tight">
                            Find pro
                          </strong>
                          <span className="text-[9px] text-[#68788e] block leading-tight mt-0.5 truncate">
                            Specialist
                          </span>
                        </div>
                      </Link>

                      <Link
                        href="/trustlinks"
                        className="p-2 rounded-lg bg-[#fafbfc] hover:bg-[#f3f6fb] border border-[#edf2f7] hover:border-[#dfe6ef] transition-all text-left flex flex-col justify-between group cursor-pointer"
                      >
                        <span className="text-sm mb-1 text-[#24754c]">🛡️</span>
                        <div>
                          <strong className="block text-[11px] font-semibold text-[#102645] group-hover:text-[#071d3b] leading-tight">
                            TrustLinks
                          </strong>
                          <span className="text-[9px] text-[#68788e] block leading-tight mt-0.5 truncate">
                            Manage
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>

                </aside>

              </div>
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
                    onClick={() => alert("Add a Property: Enter address to start a new Prop ID record.")}
                    className="inline-flex items-center gap-1.5 bg-[#071d3b] hover:bg-[#102d59] text-white px-4 py-2.5 rounded-xl text-[12px] font-semibold transition-colors shadow-2xs"
                  >
                    <span>+ Add a property</span>
                  </button>
                </div>
              </div>

              {/* Search & Filters (Category Pills & Search) */}
              <div className="bg-white border border-[#dfe6ef] rounded-2xl p-4 sm:p-5 shadow-sm mb-6 sm:mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex gap-2 overflow-x-auto pb-1 w-full sm:w-auto">
                  {[
                    { id: "all", label: "All Properties" },
                    { id: "owned", label: "Owned Homes" },
                    { id: "renovation", label: "Renovations" },
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

              {/* 3 Summary Analytics Counters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-3xl font-bold tracking-tight text-[#102645]">{PROPERTIES_LIST.length}</span>
                    <div className="w-8 h-8 rounded-lg bg-[#f0f4f9] text-[#102645] flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#102645]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                  </div>
                  <strong className="block text-[13px] text-[#102645]">Active Property Spaces</strong>
                  <small className="text-[11px] text-[#68788e]">All linked to property records</small>
                </div>

                <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-3xl font-bold tracking-tight text-[#8b641c]">1</span>
                    <div className="w-8 h-8 rounded-lg bg-[#fff4df] text-[#8b641c] flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#8b641c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  </div>
                  <strong className="block text-[13px] text-[#102645]">Handover Ready to Review</strong>
                  <small className="text-[11px] text-[#68788e]">18 Banksia Crescent, Kenmore</small>
                </div>

                <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-3xl font-bold tracking-tight text-[#24754c]">47</span>
                    <div className="w-8 h-8 rounded-lg bg-[#eaf5ef] text-[#24754c] flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#24754c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                    </div>
                  </div>
                  <strong className="block text-[13px] text-[#102645]">Authenticated Documents</strong>
                  <small className="text-[11px] text-[#68788e]">Form 16/43 certs, plans &amp; warranties</small>
                </div>
              </div>

              {/* Properties Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {filteredProperties.map((property) => (
                  <article
                    key={property.id}
                    className="bg-white border border-[#dfe6ef] rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md hover:border-[#cbd5e2] transition-all group"
                  >
                    <Link href={`/properties/${property.id}`} className="block">
                      <div className="relative h-48 bg-[#e4eaf0] overflow-hidden">
                        <img
                          src={property.imageUrl}
                          alt={property.street}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className={`absolute bottom-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold shadow-sm flex items-center gap-1.5 bg-white ${property.typeColor}`}>
                          <svg className="w-3.5 h-3.5 text-[#102645]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          <span>{property.type}</span>
                        </span>
                      </div>
                    </Link>

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

                        <Link href={`/properties/${property.id}`} className="block">
                          <h3 className="text-lg font-bold text-[#102645] group-hover:text-[#071d3b] transition-colors mt-2 mb-1">
                            {property.street}
                          </h3>
                        </Link>
                        <p className="text-[12px] text-[#68788e] mb-4">
                          {property.suburb}, {property.state} {property.postcode}
                        </p>

                        <div className="space-y-1.5 text-[11px] text-[#68788e] mb-5 pt-3 border-t border-[#dfe6ef]">
                          <div className="flex items-center justify-between">
                            <span>Property Vault:</span>
                            <strong className="text-[#102645]">{property.documentsCount} documents</strong>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Cadastral Title:</span>
                            <span className="font-mono text-[#102645]">{property.legalDna.cadastral.split("(")[0]}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Active Connection:</span>
                            <span className="font-semibold text-[#24754c]">{property.trustlinkId}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#dfe6ef] flex items-center justify-between gap-2 text-[12px] flex-wrap">
                        <Link
                          href={`/properties/${property.id}`}
                          className="text-[#68788e] hover:text-[#071d3b] text-[11px] font-semibold"
                        >
                          View Prop ID →
                        </Link>
                        <div className="flex items-center gap-1.5">
                          <Link
                            href={`/properties/${property.id}?tab=digital-key`}
                            className="px-2.5 py-1 bg-[#eaf5ef] hover:bg-[#d5ebd9] text-[#24754c] font-bold rounded-lg text-[10px] transition-colors flex items-center gap-1 border border-[#c3dfcc]"
                          >
                            <span>🔑 Digital Key</span>
                          </Link>
                          <Link
                            href={`/properties/${property.id}?tab=trustlink`}
                            className="px-3 py-1.5 bg-[#071d3b] hover:bg-[#15345d] text-white font-bold rounded-lg text-[11px] transition-colors flex items-center gap-1 shadow-2xs"
                          >
                            <span>🛡️ Open TrustLink</span>
                            <span>→</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
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
                    Create a living Prop ID for a home you own, an investment, or an active renovation.
                  </p>
                  <span className="px-4 py-2 bg-[#071d3b] text-white text-[12px] font-bold rounded-xl shadow-2xs">
                    + Start New Prop ID
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Subtle Page Footer */}
          <footer className="mt-16 pt-8 border-t border-[#dfe6ef] flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#68788e]">
            <div className="flex items-center gap-4">
              <Link href="/about" className="hover:text-[#102645] transition-colors">
                About Us
              </Link>
              <span>·</span>
              <span className="text-[#68788e]">The Property Helpline</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#24754c] font-medium">
              <span>🔒</span>
              <span>Private by default · You choose what to share, with whom, and for how long.</span>
            </div>
          </footer>

        </main>
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
