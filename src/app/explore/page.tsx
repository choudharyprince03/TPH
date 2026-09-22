"use client";
import React, { useState } from "react";
import Link from "next/link";

const CATEGORIES = [
  { id: "all", label: "All help" },
  { id: "builder", label: "Building" },
  { id: "conveyancer", label: "Conveyancing" },
  { id: "inspector", label: "Inspections" },
  { id: "agent", label: "Selling" },
  { id: "manager", label: "Renting out" },
  { id: "electrician", label: "Electrical" },
  { id: "finance", label: "Finance" },
];

const PROFESSIONALS = [
  {
    id: "welcome",
    category: "builder",
    initials: "OH",
    avatarTone: "blue",
    name: "Olivia Hart",
    role: "Builder & handover contact",
    business: "Hart Homes · Example business",
    areas: "Greater Brisbane",
    desc: "Discuss your build, renovation or the documents for your new home. Agree the scope and appointment before sharing plans or accepting work.",
    link: "/trustlinks/welcome",
  },
  {
    id: "TL-88301-A",
    category: "conveyancer",
    initials: "LV",
    avatarTone: "green",
    name: "Lachlan Vance",
    role: "Licensed Conveyancer",
    business: "River City Conveyancing",
    areas: "Brisbane & Western Suburbs",
    desc: "Contract advice and settlement guidance for buyers and sellers across Queensland. PEXA certified and TrustLink connected.",
    link: "/trustlinks/TL-88301-A",
  },
  {
    id: "TL-76100-C",
    category: "inspector",
    initials: "CD",
    avatarTone: "sand",
    name: "Claire Dupont",
    role: "Lead Building & Timber Pest Inspector",
    business: "Dupont Property Inspections",
    areas: "Kenmore & Western Suburbs",
    desc: "AS 4349.1 building, pest and thermal diagnostic reports. Objective pre-purchase clarity with reports linked directly to your Prop ID.",
    link: "/trustlinks/TL-76100-C",
  },
  {
    id: "pro-4",
    category: "agent",
    initials: "PB",
    avatarTone: "blue",
    name: "Peter Bell",
    role: "Licensed Real Estate Agent",
    business: "Bell & Co Residential",
    areas: "Kenmore, Chapel Hill, Brookfield",
    desc: "Independent property advice, marketing and sales management with verified progress reporting attached to your Prop ID.",
    link: "/trustlinks/welcome",
  },
  {
    id: "pro-5",
    category: "electrician",
    initials: "BS",
    avatarTone: "green",
    name: "Marcus Evans",
    role: "Master Electrician",
    business: "Bright Spark Electrical QLD",
    areas: "Greater Brisbane Metro",
    desc: "Safety switches, solar connections, switchboard upgrades, and statutory Form 4 compliance certificates.",
    link: "/trustlinks/welcome",
  },
];

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("Kenmore QLD 4069");

  const filtered = PROFESSIONALS.filter((p) => {
    if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="w-full flex-1 flex flex-col bg-[#f4f6f8] text-[#102645]">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-9 py-8 w-full flex-1">

        {/* ── Breadcrumb ─────────────────────────────────────────────── */}
        <nav className="flex items-center gap-2 text-[11px] text-[#68788e] mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:underline">Home</Link>
          <span>›</span>
          <span className="text-[#102645] font-semibold">Find help</span>
        </nav>

        {/* ── Page Head ──────────────────────────────────────────────── */}
        <div className="mb-7">
          <div className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#24754c] mb-1">
            People for your next step
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.8px] text-[#102645]">
            Find the right help.
          </h1>
          <p className="text-[13px] text-[#68788e] mt-1">
            Start a conversation. Choose what you share. Decide in your own time.
          </p>
        </div>

        {/* ── Search Bar ─────────────────────────────────────────────── */}
        <div className="bg-white border border-[#dfe6ef] rounded-2xl p-4 sm:p-5 shadow-sm mb-6 flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-1 w-full flex items-center gap-3">
            <svg className="w-4 h-4 text-[#68788e] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by suburb or postcode..."
              className="w-full bg-transparent border-0 text-[14px] font-semibold text-[#102645] focus:outline-none"
            />
          </div>
          <button
            onClick={() => alert(`Searching for verified providers near: ${searchQuery}`)}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#071d3b] hover:bg-[#102d59] text-white font-semibold rounded-xl text-[12px] transition-colors shadow-sm"
          >
            Find help →
          </button>
        </div>

        {/* ── Category Chips ─────────────────────────────────────────── */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all whitespace-nowrap ${
                selectedCategory === c.id
                  ? "bg-[#071d3b] text-white font-semibold"
                  : "bg-white border border-[#dfe6ef] text-[#68788e] hover:bg-[#f3f6fb]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* ── Result Count ───────────────────────────────────────────── */}
        <div className="flex items-center justify-between text-[11px] text-[#68788e] mb-6">
          <span>{filtered.length} example professionals near {searchQuery}</span>
          <span className="hidden sm:inline">Sample profiles, not live availability</span>
        </div>

        {/* ── Professionals Grid ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {filtered.map((pro) => (
            <article
              key={pro.id}
              className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  <div className={`w-12 h-12 rounded-xl font-serif font-bold text-lg flex items-center justify-center flex-shrink-0 ${
                    pro.avatarTone === "blue"
                      ? "bg-[#e6eaf3] text-[#425b7c]"
                      : pro.avatarTone === "green"
                      ? "bg-[#eaf5ef] text-[#24754c]"
                      : "bg-[#eee8dc] text-[#76623f]"
                  }`}>
                    {pro.initials}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#102645] leading-tight">
                      {pro.name}
                    </h3>
                    <p className="text-[11px] text-[#68788e]">
                      {pro.role}
                    </p>
                  </div>
                </div>

                <p className="text-[12px] text-[#68788e] leading-relaxed mb-4">
                  {pro.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#dfe6ef] flex items-center justify-between text-[11px]">
                <span className="text-[#68788e]">{pro.areas}</span>
                <Link
                  href={pro.link}
                  className="px-3.5 py-1.5 bg-[#f3f6fb] hover:bg-[#e4ebf5] text-[#071d3b] font-bold rounded-lg transition-colors"
                >
                  Connect via TrustLink →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* ── Consumer Guidance Notice ───────────────────────────────── */}
        <div className="p-4 rounded-xl bg-[#eaf0f6] border border-[#dfe6ef] flex items-center gap-3 text-[12px] text-[#4e6582] mb-8">
          <span className="text-base flex-shrink-0">ℹ️</span>
          <span>
            Before engaging a professional, review their identity, relevant licence or authorisation, service scope and written fees. These example profiles demonstrate the TrustLink workflow.
          </span>
        </div>

      </div>
    </div>
  );
}
