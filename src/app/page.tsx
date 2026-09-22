"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState("builder");
  const [suburb, setSuburb] = useState("Kenmore QLD 4069");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/explore?service=${encodeURIComponent(selectedService)}&suburb=${encodeURIComponent(suburb)}`);
  };

  return (
    <div className="w-full flex-1 flex flex-col bg-[#fcfbf8] text-[#102645]">

      {/* ── 1. HERO SECTION ────────────────────────────────────────────── */}
      <section className="bg-[#071d3b] text-white relative pt-10 pb-16 lg:pb-20 overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-9 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] items-center gap-12 lg:gap-16">
          
          {/* Left Hero Copy */}
          <div>
            <div className="text-[#b7c4d7] text-[10px] font-bold uppercase tracking-[2px] mb-4">
              Your digital home for every property journey
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-normal leading-[1.08] tracking-[-2.2px] text-white mb-6">
              Your property.<br />
              <em className="font-serif text-[#efbd66] italic font-normal">Made simpler.</em>
            </h1>
            <p className="text-[#b9c8db] text-[15px] sm:text-[16px] leading-[1.75] max-w-[420px]">
              Find the right help. Keep the important things together. Stay in control, every step of the way.
            </p>
          </div>

          {/* Right Hero Photo with Asymmetric Radius & Floating Badge */}
          <div className="relative h-[280px] sm:h-[340px] w-full">
            <img
              src="/images/hero-real-estate.jpg"
              alt="Contemporary Australian home surrounded by a subtropical garden"
              className="w-full h-full object-cover shadow-2xl rounded-tl-[7px] rounded-tr-[56px] rounded-bl-[7px] rounded-br-[7px]"
            />
            {/* Floating Photo Caption Badge */}
            <div className="absolute -bottom-4 sm:bottom-4 -left-3 sm:-left-6 bg-[#fcfbf8] text-[#102645] p-3.5 sm:p-4 rounded-xl shadow-[0_12px_35px_rgba(0,0,0,0.18)] flex items-center gap-3 border border-[#dfe6ef]">
              <div className="w-8 h-8 rounded-lg bg-[#eaf5ef] text-[#24754c] flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <strong className="block text-[13px] font-semibold leading-tight text-[#102645]">
                  More peace of mind. Less running around.
                </strong>
                <small className="text-[11px] text-[#68788e] leading-tight">
                  A home for the story of your property.
                </small>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. SEARCH DOCK & INTENTS ────────────────────────────────────── */}
      <div className="max-w-[1240px] mx-auto px-6 lg:px-9 w-full">
        
        {/* Floating Search Dock */}
        <div className="relative -mt-8 sm:-mt-10 z-20">
          <form
            onSubmit={handleSearch}
            className="bg-white border border-[#dfe6ef] rounded-2xl p-4 sm:p-6 shadow-[0_16px_40px_rgba(7,29,59,0.08)] grid grid-cols-1 md:grid-cols-[1.1fr_1fr_auto] items-end gap-4 sm:gap-6"
          >
            {/* Service selector */}
            <div className="md:border-r md:border-[#dfe6ef] md:pr-6">
              <label className="block text-[10px] uppercase font-bold tracking-[1.2px] text-[#68788e] mb-1.5">
                What would you like help with?
              </label>
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-[#68788e] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-transparent border-0 p-0 text-[15px] font-semibold text-[#102645] focus:outline-none cursor-pointer"
                >
                  <option value="builder">Building, renovations or handover</option>
                  <option value="conveyancer">Conveyancing &amp; contract review</option>
                  <option value="inspector">Building &amp; pest inspection</option>
                  <option value="agent">Selling a property</option>
                  <option value="manager">Property management &amp; leasing</option>
                  <option value="electrician">Licensed trade specialist</option>
                </select>
              </div>
            </div>

            {/* Suburb / Postcode */}
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-[1.2px] text-[#68788e] mb-1.5">
                Suburb or postcode
              </label>
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-[#68788e] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input
                  type="text"
                  value={suburb}
                  onChange={(e) => setSuburb(e.target.value)}
                  placeholder="e.g. Kenmore QLD 4069"
                  className="w-full bg-transparent border-0 p-0 text-[15px] font-semibold text-[#102645] focus:outline-none"
                />
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full md:w-auto bg-[#071d3b] hover:bg-[#102d59] text-white px-7 py-3 rounded-xl text-[13px] font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Find help</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        </div>

        {/* Quick Intent Chips */}
        <div className="flex items-center justify-center gap-2 mt-5 flex-wrap text-[11px]">
          <span className="text-[#68788e] mr-1 hidden sm:inline">Or start with your next step</span>
          {[
            { label: "I’m selling", service: "agent" },
            { label: "I’m buying", service: "conveyancer" },
            { label: "I’m renting", service: "manager" },
            { label: "Building or renovating", service: "builder" },
            { label: "Renting out", service: "manager" },
          ].map((chip) => (
            <button
              key={chip.label}
              onClick={() => {
                setSelectedService(chip.service);
                router.push(`/explore?service=${chip.service}`);
              }}
              className="border border-[#dfe6ef] bg-white hover:border-[#071d3b] hover:bg-[#071d3b] hover:text-white transition-all px-3.5 py-1.5 rounded-full text-[#102645] font-medium"
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Prototype Brand Band */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 py-4 border-b border-[#dfe6ef] text-[12px] text-[#68788e]">
          <span className="font-medium">Your property record and connections, together.</span>
          <div className="flex items-center gap-4">
            <Link
              href="/properties/TPH-KEN-018"
              className="inline-flex items-center gap-2 text-[#071d3b] font-semibold hover:underline"
            >
              <svg className="w-4 h-4 text-[#24754c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Explore Prop ID &amp; Property DNA →
            </Link>
            <Link
              href="/trustlinks"
              className="inline-flex items-center gap-2 text-[#071d3b] font-semibold hover:underline"
            >
              <svg className="w-4 h-4 text-[#24754c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Open Trust Link →
            </Link>
          </div>
        </div>

        {/* ── 3. START WHERE YOU ARE (3 Action Cards) ──────────────────── */}
        <section className="pt-14 pb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[1.8px] text-[#24754c] mb-2">
                Start where you are
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.8px] text-[#102645]">
                A clearer next step.
              </h2>
              <p className="text-[#68788e] text-[13px] mt-1.5">
                One place to get help and keep life with property organised.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Organise my property */}
            <Link
              href="/properties"
              className="bg-white border border-[#dfe6ef] hover:border-[#a0b3c6] rounded-2xl p-7 flex flex-col justify-between min-h-[220px] transition-all hover:shadow-[0_12px_40px_rgba(7,29,59,0.06)] group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#eaf5ef] text-[#24754c] flex items-center justify-center mb-5">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#102645] mb-2">
                  Organise my property
                </h3>
                <p className="text-[12px] text-[#68788e] leading-relaxed max-w-[260px]">
                  Keep documents, jobs and trusted connections together in your living Prop ID record.
                </p>
              </div>
              <div className="flex items-center gap-1 text-[12px] font-semibold text-[#071d3b] group-hover:translate-x-1 transition-transform mt-4">
                <span>Open my space</span>
                <span className="text-[#efbd66]">→</span>
              </div>
            </Link>

            {/* Card 2: Save a property */}
            <Link
              href="/properties"
              className="bg-white border border-[#dfe6ef] hover:border-[#a0b3c6] rounded-2xl p-7 flex flex-col justify-between min-h-[220px] transition-all hover:shadow-[0_12px_40px_rgba(7,29,59,0.06)] group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#fbeeee] text-[#a44042] flex items-center justify-center mb-5">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#102645] mb-2">
                  Save a property
                </h3>
                <p className="text-[12px] text-[#68788e] leading-relaxed max-w-[260px]">
                  Buying or renting? Keep your notes, checklists and professional connections in a private space.
                </p>
              </div>
              <div className="flex items-center gap-1 text-[12px] font-semibold text-[#071d3b] group-hover:translate-x-1 transition-transform mt-4">
                <span>View saved</span>
                <span className="text-[#efbd66]">→</span>
              </div>
            </Link>

            {/* Card 3: Receive my handover */}
            <Link
              href="/trustlinks/welcome"
              className="bg-white border border-[#dfe6ef] hover:border-[#a0b3c6] rounded-2xl p-7 flex flex-col justify-between min-h-[220px] transition-all hover:shadow-[0_12px_40px_rgba(7,29,59,0.06)] group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#fff4df] text-[#8b641c] flex items-center justify-center mb-5">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#102645] mb-2">
                  Receive my handover
                </h3>
                <p className="text-[12px] text-[#68788e] leading-relaxed max-w-[260px]">
                  Your new home’s plans, warranties and practical completion documents from Hart Homes.
                </p>
              </div>
              <div className="flex items-center gap-1 text-[12px] font-semibold text-[#071d3b] group-hover:translate-x-1 transition-transform mt-4">
                <span>Open handover pack</span>
                <span className="text-[#efbd66]">→</span>
              </div>
            </Link>

          </div>
        </section>

        {/* ── 4. PROMISE STRIP (3 Values) ─────────────────────────────────── */}
        <div className="py-6 border-y border-[#dfe6ef] grid grid-cols-1 md:grid-cols-3 gap-6 text-[12px]">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-[#24754c] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div>
              <strong className="text-[#102645] font-semibold">You choose who gets access</strong>
              <small className="block text-[#68788e] text-[10px]">Clear permissions, before you share.</small>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-[#24754c] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <div>
              <strong className="text-[#102645] font-semibold">Your property, all together</strong>
              <small className="block text-[#68788e] text-[10px]">Documents and conversations in context.</small>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-[#24754c] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <div>
              <strong className="text-[#102645] font-semibold">People when you need them</strong>
              <small className="block text-[#68788e] text-[10px]">Choose a professional at your own pace.</small>
            </div>
          </div>
        </div>

        {/* ── 5. FIND YOUR PEOPLE (Featured Specialists) ──────────────────── */}
        <section className="pt-14 pb-12">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[1.8px] text-[#24754c] mb-2">
                Find your people
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.8px] text-[#102645]">
                A good place to start.
              </h2>
              <p className="text-[#68788e] text-[13px] mt-1.5">
                Explore verified professionals near western Brisbane.
              </p>
            </div>
            <Link href="/explore" className="text-[12px] font-semibold text-[#071d3b] hover:underline flex items-center gap-1">
              <span>View all</span>
              <span className="text-[#efbd66]">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Pro 1: Olivia Hart */}
            <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#e6eaf3] text-[#425b7c] font-serif font-bold text-xl flex items-center justify-center flex-shrink-0">
                    OH
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#102645] leading-tight">
                      Olivia Hart
                    </h3>
                    <p className="text-[11px] text-[#68788e]">
                      Builder &amp; handover contact · Hart Homes
                    </p>
                  </div>
                </div>
                <p className="text-[12px] text-[#68788e] leading-[1.65] mb-4">
                  Discuss your build, renovation or the documents for your new home. Clear boundaries before sharing.
                </p>
              </div>
              <div className="pt-4 border-t border-[#dfe6ef] flex items-center justify-between text-[11px]">
                <span className="text-[#68788e]">Greater Brisbane</span>
                <Link
                  href="/trustlinks/welcome"
                  className="px-3.5 py-1.5 bg-[#f3f6fb] hover:bg-[#e2eaf4] text-[#071d3b] font-semibold rounded-lg transition-colors"
                >
                  Connect →
                </Link>
              </div>
            </div>

            {/* Pro 2: Lachlan Vance */}
            <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#eaf5ef] text-[#24754c] font-serif font-bold text-xl flex items-center justify-center flex-shrink-0">
                    LV
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#102645] leading-tight">
                      Lachlan Vance
                    </h3>
                    <p className="text-[11px] text-[#68788e]">
                      Licensed Conveyancer · River City Conveyancing
                    </p>
                  </div>
                </div>
                <p className="text-[12px] text-[#68788e] leading-[1.65] mb-4">
                  Contract advice and settlement guidance for buyers and sellers across Queensland. PEXA certified.
                </p>
              </div>
              <div className="pt-4 border-t border-[#dfe6ef] flex items-center justify-between text-[11px]">
                <span className="text-[#68788e]">Brisbane &amp; Western Suburbs</span>
                <Link
                  href="/trustlinks/TL-88301-A"
                  className="px-3.5 py-1.5 bg-[#f3f6fb] hover:bg-[#e2eaf4] text-[#071d3b] font-semibold rounded-lg transition-colors"
                >
                  Connect →
                </Link>
              </div>
            </div>

            {/* Pro 3: Claire Dupont */}
            <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#eee8dc] text-[#76623f] font-serif font-bold text-xl flex items-center justify-center flex-shrink-0">
                    CD
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#102645] leading-tight">
                      Claire Dupont
                    </h3>
                    <p className="text-[11px] text-[#68788e]">
                      Lead Building &amp; Pest Inspector · Dupont Inspections
                    </p>
                  </div>
                </div>
                <p className="text-[12px] text-[#68788e] leading-[1.65] mb-4">
                  AS 4349.1 building, pest and thermal diagnostic reports. Objective pre-purchase clarity.
                </p>
              </div>
              <div className="pt-4 border-t border-[#dfe6ef] flex items-center justify-between text-[11px]">
                <span className="text-[#68788e]">Kenmore &amp; Western Suburbs</span>
                <Link
                  href="/trustlinks/TL-76100-C"
                  className="px-3.5 py-1.5 bg-[#f3f6fb] hover:bg-[#e2eaf4] text-[#071d3b] font-semibold rounded-lg transition-colors"
                >
                  Connect →
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* ── 6. MEET PROP ID (Living Memory Section) ────────────────────── */}
        <section className="my-10 bg-[#eaf0f6] rounded-2xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] items-center gap-10">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[1.8px] text-[#24754c] mb-2">
              Meet Prop ID
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-1px] text-[#102645] mb-4 leading-tight">
              A living memory<br />of your property.
            </h2>
            <p className="text-[13px] text-[#68788e] leading-[1.8] max-w-[400px] mb-6">
              From the appliance manual you can never find to the work done last year. Give the important things a permanent home, ready for whatever comes next.
            </p>
            <Link
              href="/properties/TPH-KEN-018"
              className="inline-flex items-center gap-2 bg-[#071d3b] hover:bg-[#102d59] text-white px-6 py-3 rounded-xl text-[13px] font-semibold transition-colors shadow-sm"
            >
              <span>Explore a property record</span>
              <span className="text-[#efbd66]">→</span>
            </Link>
          </div>

          {/* Mini-Record Card (Rotated slightly for prototype aesthetic) */}
          <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-[0_18px_35px_rgba(7,29,59,0.06)] transform lg:rotate-1 transition-transform hover:rotate-0">
            <div className="flex items-center gap-3 pb-4 border-b border-[#dfe6ef]">
              <div className="w-10 h-10 rounded-lg bg-[#071d3b] text-[#efbd66] flex items-center justify-center font-bold text-sm">
                🏠
              </div>
              <div>
                <h3 className="text-base font-bold text-[#102645]">
                  18 Banksia Crescent
                </h3>
                <small className="text-[11px] text-[#68788e]">
                  Kenmore, Queensland 4069 · Prop ID: TPH-KEN-018
                </small>
              </div>
            </div>

            <div className="divide-y divide-[#dfe6ef] text-[12px] my-3">
              <div className="py-2.5 flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#68788e]">
                  <span>📄</span> Plans &amp; certificates
                </span>
                <span className="text-[#24754c] font-semibold text-[11px]">In one place</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#68788e]">
                  <span>🛠️</span> Warranties &amp; manuals
                </span>
                <span className="text-[#24754c] font-semibold text-[11px]">Easy to find</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#68788e]">
                  <span>👥</span> People &amp; permissions
                </span>
                <span className="text-[#24754c] font-semibold text-[11px]">You’re in control</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#dfe6ef] text-[11px] text-[#68788e] flex items-center gap-1.5">
              <span>🔒</span> Private until you choose to share.
            </div>
          </div>
        </section>

        {/* ── 7. HOME COMPASS BANNER ─────────────────────────────────────── */}
        <div className="bg-[#f0ede5] rounded-2xl p-7 sm:p-9 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-16">
          <div>
            <h3 className="text-xl font-bold text-[#102645] mb-1">
              Not sure where to start?
            </h3>
            <p className="text-[13px] text-[#68788e]">
              Home Compass helps you understand the next step, at your own pace.
            </p>
          </div>
          <Link
            href="/learn"
            className="px-5 py-2.5 bg-white border border-[#cbd5e2] hover:bg-[#f3f6fb] text-[#102645] font-semibold rounded-xl text-[12px] transition-colors flex items-center gap-2 whitespace-nowrap shadow-sm"
          >
            <span>Explore the guides</span>
            <span className="text-[#24754c]">→</span>
          </Link>
        </div>

      </div>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-[#dfe6ef] bg-[#fcfbf8] py-10 mt-auto text-[11px] text-[#68788e]">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-9 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="font-semibold text-[14px] text-[#071d3b]">The Property Helpline</div>
            <p className="mt-1 max-w-sm text-[11px]">Your digital home for every property journey. Independent Australian platform.</p>
          </div>
          <div className="flex gap-6 flex-wrap">
            <Link href="/explore" className="hover:underline">Find help</Link>
            <Link href="/learn" className="hover:underline">Home Compass</Link>
            <Link href="/properties" className="hover:underline">My Property World</Link>
            <Link href="/pro" className="hover:underline font-semibold text-[#071d3b]">I’m a Pro ↗</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
