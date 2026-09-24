"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  PageTransition,
  FadeUp,
  SlideIn,
  StaggerGrid,
  StaggerItem,
  CardHover,
  MagneticButton,
  FloatLoop,
  HeroText,
} from "@/components/ui/motion";

export default function Home() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState("builder");
  const [suburb, setSuburb] = useState("Kenmore QLD 4069");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/explore?service=${encodeURIComponent(selectedService)}&suburb=${encodeURIComponent(suburb)}`);
  };

  return (
    <PageTransition className="w-full flex-1 flex flex-col bg-[#fcfbf8] text-[#102645]">

      {/* ── 1. HERO SECTION ──────────────────────────────────────────────────── */}
      <section className="bg-[#071d3b] text-white relative pt-10 pb-16 lg:pb-20 overflow-hidden">

        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#102d59] opacity-30 animate-gradient-shift blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-[400px] h-[400px] rounded-full bg-[#24754c] opacity-15 animate-gradient-shift-delayed blur-3xl" />
        </div>

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-9 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] items-center gap-10 lg:gap-16 relative z-10">
          
          {/* Left Hero Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#102d59] border border-white/15 text-[#efbd66] text-[11px] font-bold uppercase tracking-[2px] mb-5 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#efbd66] animate-pulse" />
              <span>Prop ID</span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl lg:text-[50px] font-bold leading-[1.12] tracking-[-1.5px] text-white mb-5">
              One property.{" "}
              <span className="text-[#efbd66] font-normal italic font-serif block sm:inline">
                One shared workspace.
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-[#d8e3f0] text-[16px] sm:text-[17px] font-medium leading-relaxed max-w-[460px] mb-3"
            >
              Your property paperwork, tasks and the right people—together.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="text-[#9ab1cb] text-[13px] sm:text-[14px] leading-relaxed max-w-[440px] mb-6"
            >
              Review requests, approve next steps and see what needs your attention.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/15 text-[12px] font-semibold text-[#efbd66]"
            >
              <svg className="w-4 h-4 text-[#efbd66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>You control who sees what.</span>
            </motion.div>
          </div>

          {/* Right Hero Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative h-[260px] sm:h-[320px] lg:h-[360px] w-full"
          >
            <img
              src="/images/hero-real-estate.jpg"
              alt="Contemporary Australian home surrounded by a subtropical garden"
              className="w-full h-full object-cover shadow-2xl rounded-tl-[7px] rounded-tr-[56px] rounded-bl-[7px] rounded-br-[7px]"
            />
            {/* Floating Photo Caption Badge */}
            <FloatLoop className="absolute -bottom-4 sm:bottom-4 -left-3 sm:-left-6" amplitude={6} duration={3.8}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.75, type: "spring", stiffness: 200 }}
                className="bg-[#fcfbf8] text-[#102645] p-3 sm:p-4 rounded-xl shadow-[0_12px_35px_rgba(0,0,0,0.18)] flex items-center gap-3 border border-[#dfe6ef]"
              >
                <div className="w-8 h-8 rounded-lg bg-[#eaf5ef] text-[#24754c] flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <strong className="block text-[12px] sm:text-[13px] font-semibold leading-tight text-[#102645]">
                    More peace of mind. Less running around.
                  </strong>
                  <small className="text-[10px] sm:text-[11px] text-[#68788e] leading-tight">
                    A home for the story of your property.
                  </small>
                </div>
              </motion.div>
            </FloatLoop>
          </motion.div>

        </div>
      </section>

      {/* ── 2. SEARCH DOCK & INTENTS ─────────────────────────────────────────── */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-9 w-full">
        
        {/* Floating Search Dock */}
        <motion.div
          className="relative -mt-8 sm:-mt-10 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.5, type: "spring", stiffness: 180, damping: 22 }}
        >
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
                  className="w-full bg-transparent border-0 p-0 text-[14px] sm:text-[15px] font-semibold text-[#102645] focus:outline-none cursor-pointer"
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
                  className="w-full bg-transparent border-0 p-0 text-[14px] sm:text-[15px] font-semibold text-[#102645] focus:outline-none"
                />
              </div>
            </div>

            {/* Search Button */}
            <MagneticButton>
              <button
                type="submit"
                className="w-full md:w-auto bg-[#071d3b] hover:bg-[#102d59] text-white px-6 sm:px-7 py-3 rounded-xl text-[13px] font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm tap-target"
              >
                <span>Find help</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </MagneticButton>
          </form>
        </motion.div>

        {/* Quick Intent Chips */}
        <motion.div
          className="chip-scroll mt-5 pb-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          <span className="text-[#68788e] mr-2 text-[11px] whitespace-nowrap hidden sm:inline self-center">
            Or start with your next step
          </span>
          {[
            { label: "I'm selling", service: "agent" },
            { label: "I'm buying", service: "conveyancer" },
            { label: "I'm renting", service: "manager" },
            { label: "Building or renovating", service: "builder" },
            { label: "Renting out", service: "manager" },
          ].map((chip, i) => (
            <motion.button
              key={chip.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72 + i * 0.05, duration: 0.35 }}
              onClick={() => {
                setSelectedService(chip.service);
                router.push(`/explore?service=${chip.service}`);
              }}
              className="border border-[#dfe6ef] bg-white hover:border-[#071d3b] hover:bg-[#071d3b] hover:text-white transition-all px-3.5 py-1.5 rounded-full text-[11px] text-[#102645] font-medium whitespace-nowrap tap-target flex-shrink-0"
            >
              {chip.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Brand Band */}
        <FadeUp delay={0.1} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-6 sm:mt-8 py-4 border-b border-[#dfe6ef] text-[12px] text-[#68788e]">
          <span className="font-medium">Your property record and connections, together.</span>
          <div className="flex items-center gap-4 flex-wrap">
            <Link href="/properties/TPH-KEN-018" className="inline-flex items-center gap-2 text-[#071d3b] font-semibold hover:underline">
              <svg className="w-4 h-4 text-[#24754c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Explore Prop ID &amp; Property DNA →
            </Link>
            <Link href="/trustlinks" className="inline-flex items-center gap-2 text-[#071d3b] font-semibold hover:underline">
              <svg className="w-4 h-4 text-[#24754c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Open Trust Link →
            </Link>
          </div>
        </FadeUp>

        {/* ── CLAIM YOUR FREE DIGITAL HOME BANNER ────────────────────────── */}
        <FadeUp delay={0.15}>
          <div className="mt-8 sm:mt-10 bg-[#071d3b] text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#0f2d59] relative overflow-hidden shadow-lg">
            {/* Subtle glow elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#efbd66]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#24754c]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-10">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[11px] font-bold uppercase tracking-wider text-[#efbd66] mb-3 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-[#efbd66]" />
                  <span>The Property Helpline · One property free</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
                  Claim your free digital home.
                </h2>
                <p className="text-[14px] sm:text-[15px] text-[#b9c8db] leading-relaxed mb-4">
                  Your property’s paperwork, people and history—in one place. You control who sees what.
                </p>
                <div className="flex items-center gap-2 text-[12px] text-[#efbd66] font-medium">
                  <svg className="w-4 h-4 text-[#24754c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Encrypted sovereign storage · Independent Australian platform</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 flex-shrink-0">
                <MagneticButton>
                  <Link
                    href="/signup"
                    className="px-6 py-3.5 bg-[#efbd66] hover:bg-[#e4b257] text-[#071d3b] font-bold text-[14px] rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-center"
                  >
                    <span>Claim my digital home</span>
                    <span>→</span>
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* ── 3. START WHERE YOU ARE ─────────────────────────────────────────── */}
        <section className="pt-12 sm:pt-14 pb-10 sm:pb-12">
          <FadeUp className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
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
          </FadeUp>

          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {/* Card 1 */}
            <StaggerItem>
              <CardHover>
                <Link
                  href="/properties"
                  className="bg-white border border-[#dfe6ef] hover:border-[#a0b3c6] rounded-2xl p-6 sm:p-7 flex flex-col justify-between min-h-[200px] sm:min-h-[220px] group block"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#eaf5ef] text-[#24754c] flex items-center justify-center mb-4 sm:mb-5 icon-hover">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-[#102645] mb-2">
                      Organise my property
                    </h3>
                    <p className="text-[12px] text-[#68788e] leading-relaxed">
                      Keep documents, jobs and trusted connections together in your living Prop ID record.
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[12px] font-semibold text-[#071d3b] group-hover:translate-x-1 transition-transform mt-4">
                    <span>Open my space</span>
                    <span className="text-[#efbd66]">→</span>
                  </div>
                </Link>
              </CardHover>
            </StaggerItem>

            {/* Card 2 */}
            <StaggerItem>
              <CardHover>
                <Link
                  href="/properties"
                  className="bg-white border border-[#dfe6ef] hover:border-[#a0b3c6] rounded-2xl p-6 sm:p-7 flex flex-col justify-between min-h-[200px] sm:min-h-[220px] group block"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#fbeeee] text-[#a44042] flex items-center justify-center mb-4 sm:mb-5 icon-hover">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-[#102645] mb-2">
                      Save a property
                    </h3>
                    <p className="text-[12px] text-[#68788e] leading-relaxed">
                      Buying or renting? Keep your notes, checklists and professional connections in a private space.
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[12px] font-semibold text-[#071d3b] group-hover:translate-x-1 transition-transform mt-4">
                    <span>View saved</span>
                    <span className="text-[#efbd66]">→</span>
                  </div>
                </Link>
              </CardHover>
            </StaggerItem>

            {/* Card 3 */}
            <StaggerItem>
              <CardHover>
                <Link
                  href="/trustlinks/welcome"
                  className="bg-white border border-[#dfe6ef] hover:border-[#a0b3c6] rounded-2xl p-6 sm:p-7 flex flex-col justify-between min-h-[200px] sm:min-h-[220px] group block sm:col-span-2 md:col-span-1"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#fff4df] text-[#8b641c] flex items-center justify-center mb-4 sm:mb-5 icon-hover">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-[#102645] mb-2">
                      Receive my handover
                    </h3>
                    <p className="text-[12px] text-[#68788e] leading-relaxed">
                      Your new home's plans, warranties and practical completion documents from Hart Homes.
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[12px] font-semibold text-[#071d3b] group-hover:translate-x-1 transition-transform mt-4">
                    <span>Open handover pack</span>
                    <span className="text-[#efbd66]">→</span>
                  </div>
                </Link>
              </CardHover>
            </StaggerItem>
          </StaggerGrid>
        </section>

        {/* ── 4. PROMISE STRIP ──────────────────────────────────────────────── */}
        <FadeUp>
          <div className="py-6 border-y border-[#dfe6ef] grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 text-[12px]">
            {[
              {
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                title: "You choose who gets access",
                sub: "Clear permissions, before you share.",
              },
              {
                icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
                title: "Your property, all together",
                sub: "Documents and conversations in context.",
              },
              {
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                title: "People when you need them",
                sub: "Choose a professional at your own pace.",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#24754c] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                </svg>
                <div>
                  <strong className="text-[#102645] font-semibold">{item.title}</strong>
                  <small className="block text-[#68788e] text-[10px]">{item.sub}</small>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* ── 5. FEATURED SPECIALISTS ───────────────────────────────────────── */}
        <section className="pt-12 sm:pt-14 pb-10 sm:pb-12">
          <FadeUp className="flex items-end justify-between gap-4 mb-8">
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
            <Link href="/explore" className="text-[12px] font-semibold text-[#071d3b] hover:underline flex items-center gap-1 flex-shrink-0">
              <span>View all</span>
              <span className="text-[#efbd66]">→</span>
            </Link>
          </FadeUp>

          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                initials: "OH",
                bg: "bg-[#e6eaf3] text-[#425b7c]",
                name: "Olivia Hart",
                role: "Builder & handover contact · Hart Homes",
                area: "Greater Brisbane",
                desc: "Discuss your build, renovation or the documents for your new home. Clear boundaries before sharing.",
                link: "/trustlinks/welcome",
              },
              {
                initials: "LV",
                bg: "bg-[#eaf5ef] text-[#24754c]",
                name: "Lachlan Vance",
                role: "Licensed Conveyancer · River City Conveyancing",
                area: "Brisbane & Western Suburbs",
                desc: "Contract advice and settlement guidance for buyers and sellers across Queensland. PEXA certified.",
                link: "/trustlinks/TL-88301-A",
              },
              {
                initials: "CD",
                bg: "bg-[#eee8dc] text-[#76623f]",
                name: "Claire Dupont",
                role: "Lead Building & Pest Inspector · Dupont Inspections",
                area: "Kenmore & Western Suburbs",
                desc: "AS 4349.1 building, pest and thermal diagnostic reports. Objective pre-purchase clarity.",
                link: "/trustlinks/TL-76100-C",
              },
            ].map((pro, i) => (
              <StaggerItem key={i}>
                <CardHover>
                  <div className="bg-white border border-[#dfe6ef] rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-sm h-full">
                    <div>
                      <div className="flex items-center gap-3 sm:gap-3.5 mb-4">
                        <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${pro.bg} font-serif font-bold text-lg sm:text-xl flex items-center justify-center flex-shrink-0`}>
                          {pro.initials}
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-[#102645] leading-tight">{pro.name}</h3>
                          <p className="text-[11px] text-[#68788e]">{pro.role}</p>
                        </div>
                      </div>
                      <p className="text-[12px] text-[#68788e] leading-[1.65] mb-4">{pro.desc}</p>
                    </div>
                    <div className="pt-4 border-t border-[#dfe6ef] flex items-center justify-between text-[11px]">
                      <span className="text-[#68788e]">{pro.area}</span>
                      <MagneticButton>
                        <Link href={pro.link} className="px-3 sm:px-3.5 py-1.5 bg-[#f3f6fb] hover:bg-[#e2eaf4] text-[#071d3b] font-semibold rounded-lg transition-colors tap-target text-[11px]">
                          Connect →
                        </Link>
                      </MagneticButton>
                    </div>
                  </div>
                </CardHover>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </section>

        {/* ── 6. MEET PROP ID ────────────────────────────────────────────────── */}
        <FadeUp>
          <section className="my-8 sm:my-10 bg-[#eaf0f6] rounded-2xl p-6 sm:p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] items-center gap-8 lg:gap-10">
            <SlideIn direction="left">
              <div className="text-[10px] font-bold uppercase tracking-[1.8px] text-[#24754c] mb-2">
                Meet Prop ID
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[-1px] text-[#102645] mb-4 leading-tight">
                A living memory<br />of your property.
              </h2>
              <p className="text-[13px] text-[#68788e] leading-[1.8] max-w-[400px] mb-6">
                From the appliance manual you can never find to the work done last year. Give the important things a permanent home, ready for whatever comes next.
              </p>
              <MagneticButton>
                <Link
                  href="/properties/TPH-KEN-018"
                  className="inline-flex items-center gap-2 bg-[#071d3b] hover:bg-[#102d59] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-[13px] font-semibold transition-colors shadow-sm"
                >
                  <span>Explore a property record</span>
                  <span className="text-[#efbd66]">→</span>
                </Link>
              </MagneticButton>
            </SlideIn>

            <SlideIn direction="right">
              <motion.div
                whileHover={{ rotate: 0, scale: 1.01 }}
                className="bg-white border border-[#dfe6ef] rounded-2xl p-5 sm:p-6 shadow-[0_18px_35px_rgba(7,29,59,0.06)] lg:rotate-1 transition-transform"
              >
                <div className="flex items-center gap-3 pb-4 border-b border-[#dfe6ef]">
                  <div className="w-10 h-10 rounded-lg bg-[#071d3b] text-[#efbd66] flex items-center justify-center font-bold text-sm">
                    <svg className="w-5 h-5 text-[#efbd66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#102645]">18 Banksia Crescent</h3>
                    <small className="text-[11px] text-[#68788e]">Kenmore, Queensland 4069 · Prop ID: TPH-KEN-018</small>
                  </div>
                </div>
                <div className="divide-y divide-[#dfe6ef] text-[12px] my-3">
                  {[
                    {
                      icon: (
                        <svg className="w-4 h-4 text-[#071d3b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      ),
                      label: "Plans & certificates",
                      value: "In one place",
                    },
                    {
                      icon: (
                        <svg className="w-4 h-4 text-[#071d3b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      ),
                      label: "Warranties & manuals",
                      value: "Easy to find",
                    },
                    {
                      icon: (
                        <svg className="w-4 h-4 text-[#071d3b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      ),
                      label: "People & permissions",
                      value: "You're in control",
                    },
                  ].map((row, i) => (
                    <motion.div
                      key={i}
                      className="py-2.5 flex items-center justify-between"
                      initial={{ opacity: 0, x: 8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                    >
                      <span className="flex items-center gap-2 text-[#68788e]">
                        <span>{row.icon}</span> {row.label}
                      </span>
                      <span className="text-[#24754c] font-semibold text-[11px]">{row.value}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="pt-3 border-t border-[#dfe6ef] text-[11px] text-[#68788e] flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-[#24754c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Private until you choose to share.</span>
                </div>
              </motion.div>
            </SlideIn>
          </section>
        </FadeUp>

        {/* ── 7. HOME COMPASS BANNER ────────────────────────────────────────── */}
        <FadeUp>
          <div className="bg-[#f0ede5] rounded-2xl p-6 sm:p-7 lg:p-9 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6 mb-12 sm:mb-16">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#102645] mb-1">
                Not sure where to start?
              </h3>
              <p className="text-[13px] text-[#68788e]">
                Home Compass helps you understand the next step, at your own pace.
              </p>
            </div>
            <MagneticButton className="flex-shrink-0 self-start sm:self-auto">
              <Link
                href="/learn"
                className="px-4 sm:px-5 py-2.5 bg-white border border-[#cbd5e2] hover:bg-[#f3f6fb] text-[#102645] font-semibold rounded-xl text-[12px] transition-colors flex items-center gap-2 whitespace-nowrap shadow-sm"
              >
                <span>Explore the guides</span>
                <span className="text-[#24754c]">→</span>
              </Link>
            </MagneticButton>
          </div>
        </FadeUp>

      </div>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <FadeUp>
        <footer className="border-t border-[#dfe6ef] bg-[#fcfbf8] py-8 sm:py-10 mt-auto text-[11px] text-[#68788e]">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-9 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6">
            <div>
              <div className="font-semibold text-[14px] text-[#071d3b]">The Property Helpline</div>
              <p className="mt-1 max-w-sm text-[11px]">Your digital home for every property journey. Independent Australian platform.</p>
            </div>
            <div className="flex gap-4 sm:gap-6 flex-wrap">
              <Link href="/explore" className="hover:underline tap-target">Find help</Link>
              <Link href="/learn" className="hover:underline tap-target">Home Compass</Link>
              <Link href="/properties" className="hover:underline tap-target">My Property World</Link>
              <Link href="/pro" className="hover:underline font-semibold text-[#071d3b] tap-target">I'm a Pro ↗</Link>
            </div>
          </div>
        </footer>
      </FadeUp>

    </PageTransition>
  );
}
