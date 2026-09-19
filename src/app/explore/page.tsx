"use client";
import React, { useState } from "react";
import Link from "next/link";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "builder", label: "Builders" },
  { id: "conveyancer", label: "Conveyancers" },
  { id: "inspector", label: "Building Inspectors" },
  { id: "agent", label: "Buyer's Agents" },
  { id: "pm", label: "Property Managers" },
  { id: "strata", label: "Strata Managers" },
  { id: "tradie", label: "Tradies" },
  { id: "financial", label: "Financial Advisors" },
];

const PROFESSIONALS = [
  {
    id: "1", category: "builder", icon: "🏗️", name: "Banksia Homes", specialty: "Custom Builder / Developer",
    location: "Brisbane QLD", rating: 4.9, reviews: 142, verified: true,
    badges: ["MBA Accredited", "QBCC Licensed", "15+ yrs"],
    desc: "Premium custom home builder specialising in residential new builds and knockdown-rebuilds across Greater Brisbane. PropID & Digital Handover ready.",
    trustlinks: 8,
  },
  {
    id: "2", category: "conveyancer", icon: "⚖️", name: "Chen & Associates", specialty: "Conveyancing & Settlement (PEXA)",
    location: "Sydney NSW", rating: 5.0, reviews: 98, verified: true,
    badges: ["PEXA Connected", "AICNSW Member", "QLD & NSW"],
    desc: "Specialist conveyancers handling residential and commercial property settlements via PEXA. Full TrustLink integration for seamless client communication.",
    trustlinks: 14,
  },
  {
    id: "3", category: "inspector", icon: "🔍", name: "SafeCheck Inspectors", specialty: "Building & Pest Inspection",
    location: "Brisbane QLD", rating: 4.8, reviews: 316, verified: true,
    badges: ["AIBS Certified", "Fully Insured", "48hr Reports"],
    desc: "Independent building and pest inspection specialists across South-East Queensland. Reports delivered to your Prop ID vault within 48 hours.",
    trustlinks: 22,
  },
  {
    id: "4", category: "agent", icon: "🤝", name: "PropertyPath Buyers Agents", specialty: "Buyer's Agent",
    location: "Melbourne VIC", rating: 4.9, reviews: 87, verified: true,
    badges: ["REIV Licensed", "Off-market access", "No vendor conflict"],
    desc: "Melbourne's trusted buyer's agent for first-home buyers, upsizers and investors. 100% buyer-side only — no conflict of interest, ever.",
    trustlinks: 11,
  },
  {
    id: "5", category: "pm", icon: "🏠", name: "Keystroke Property Management", specialty: "Property Management",
    location: "Gold Coast QLD", rating: 4.7, reviews: 203, verified: true,
    badges: ["REIQ Member", "Low vacancy rate", "Online portal"],
    desc: "Full-service rental property management on the Gold Coast and Northern NSW. TrustLink connected for real-time owner reporting.",
    trustlinks: 19,
  },
  {
    id: "6", category: "strata", icon: "🏢", name: "Clearview Strata", specialty: "Strata & Community Management",
    location: "Perth WA", rating: 4.6, reviews: 74, verified: true,
    badges: ["SCA Accredited", "WA Licensed", "120+ schemes"],
    desc: "Accredited strata managers handling body corporate levies, maintenance scheduling and AGMs across Perth metropolitan area.",
    trustlinks: 5,
  },
  {
    id: "7", category: "tradie", icon: "⚡", name: "Bright Spark Electrical", specialty: "Licensed Electrician",
    location: "Brisbane QLD", rating: 4.9, reviews: 411, verified: true,
    badges: ["QBCC Licensed", "ASP Level 2", "Same-day service"],
    desc: "Residential and commercial electrical services including switchboard upgrades, solar connections and compliance certificates. All work linked to your Prop ID.",
    trustlinks: 3,
  },
  {
    id: "8", category: "financial", icon: "💰", name: "Capital & Co. Finance", specialty: "Mortgage & Financial Advice (AFSL)",
    location: "Sydney NSW", rating: 4.8, reviews: 156, verified: true,
    badges: ["AFSL 456789", "MFAA Member", "40+ lenders"],
    desc: "Independent mortgage brokers and financial planners covering home loans, investment finance and SMSF property. AFSL licensed.",
    trustlinks: 9,
  },
];

const AU_STATES = ["All States", "QLD", "NSW", "VIC", "SA", "WA", "TAS", "ACT", "NT"];

export default function ExplorePage() {
  const [category, setCategory] = useState("all");
  const [state, setState] = useState("All States");
  const [search, setSearch] = useState("");

  const filtered = PROFESSIONALS.filter((p) => {
    const catMatch = category === "all" || p.category === category;
    const stateMatch = state === "All States" || p.location.includes(state);
    const searchMatch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.specialty.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    return catMatch && stateMatch && searchMatch;
  });

  return (
    <div className="w-full flex-1 flex flex-col bg-slate-50 dark:bg-[#0a1628]">

      {/* Hero search bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8">
          <div className="text-[10px] font-bold text-verified uppercase tracking-widest mb-2">Find a Professional</div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-5">
            Verified Australian property specialists.
          </h1>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2 flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
              <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by service, name or suburb..."
                className="flex-1 bg-transparent text-sm text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none"
            >
              {AU_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Category pills */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
            {CATEGORIES.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setCategory(id)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  category === id
                    ? "bg-brand-navy text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-3 text-xs text-slate-400">
            {filtered.length} professional{filtered.length !== 1 ? "s" : ""} found
            {state !== "All States" ? ` in ${state}` : ""}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8 w-full">
        {/* Trust notice */}
        <div className="flex items-center gap-2.5 p-3.5 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/30 rounded-xl mb-6">
          <svg className="w-4 h-4 text-verified flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m12 2 8 3v7c0 6-8 10-8 10S4 18 4 12V5Z M8 11l3 3 5-5" />
          </svg>
          <span className="text-xs font-semibold text-verified">
            All professionals on TPH hold verified Australian licences, carry public liability insurance, and are TrustLink-enabled.
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
          {filtered.map((pro) => (
            <div key={pro.id}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-2xl flex-shrink-0">
                      {pro.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <div className="font-bold text-slate-900 dark:text-white text-sm">{pro.name}</div>
                        {pro.verified && (
                          <svg className="w-4 h-4 text-verified flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="text-xs text-slate-500">{pro.specialty}</div>
                      <div className="text-xs text-slate-400">📍 {pro.location}</div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-bold text-brand-navy dark:text-white text-sm">{pro.rating}</div>
                    <div className="flex justify-end">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} className={`w-2.5 h-2.5 ${i < Math.floor(pro.rating) ? "text-brand-gold" : "text-slate-200"}`} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <div className="text-[10px] text-slate-400">{pro.reviews} reviews</div>
                  </div>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{pro.desc}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {pro.badges.map((b) => (
                    <span key={b} className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
                      {b}
                    </span>
                  ))}
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-green-50 dark:bg-green-900/20 text-verified rounded-full">
                    🔗 {pro.trustlinks} TrustLinks
                  </span>
                </div>

                <div className="flex gap-2">
                  <Link href={`/inquiry?pro=${pro.id}`}
                    className="flex-1 py-2.5 text-center text-xs font-bold text-white rounded-xl hover:opacity-90 transition-all"
                    style={{ background: "linear-gradient(135deg, #0c2340, #143865)" }}>
                    Request TrustLink
                  </Link>
                  <Link href={`/explore/${pro.id}`}
                    className="px-4 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">🔍</div>
            <div className="font-bold text-slate-700 dark:text-slate-300 mb-2">No professionals found</div>
            <div className="text-sm text-slate-400">Try adjusting your search or filters</div>
          </div>
        )}
      </div>
    </div>
  );
}
