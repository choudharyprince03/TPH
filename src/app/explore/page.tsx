"use client";
import React, { useState } from "react";
import Link from "next/link";
import { PROFESSIONALS_DATA } from "@/lib/professionals";
import { motion, AnimatePresence } from "framer-motion";
import {
  PageTransition,
  FadeUp,
  StaggerGrid,
  StaggerItem,
  CardHover,
  MagneticButton,
} from "@/components/ui/motion";

const CATEGORIES = [
  { id: "all", label: "All help" },
  { id: "builder", label: "Building" },
  { id: "conveyancer", label: "Conveyancing" },
  { id: "inspector", label: "Inspections" },
  { id: "agent", label: "Selling" },
  { id: "electrician", label: "Electrical" },
];

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("Kenmore QLD 4069");

  const filtered = PROFESSIONALS_DATA.filter((p) => {
    if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
    return true;
  });

  return (
    <PageTransition className="w-full flex-1 flex flex-col bg-[#F9F8F5] text-[#183249] font-sans">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-9 py-6 sm:py-8 w-full flex-1">

        {/* ── Breadcrumb ─────────────────────────────────────────────── */}
        <nav className="flex items-center gap-2 text-[11px] text-[#64727e] mb-5 sm:mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:underline">Home</Link>
          <span>›</span>
          <span className="text-[#183249] font-semibold">Find help</span>
        </nav>

        {/* ── Page Head ──────────────────────────────────────────────── */}
        <FadeUp className="mb-6 sm:mb-7">
          <div className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#28715e] mb-1">
            People for your next step
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.8px] text-[#183249]">
            Find the right help.
          </h1>
          <p className="text-[13px] text-[#64727e] mt-1">
            Browse verified professional profiles, review past project photos, and connect safely via TrustLink™.
          </p>
        </FadeUp>

        {/* ── Search Bar ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-white border border-[#e2e5e5] rounded-2xl p-4 sm:p-5 shadow-sm mb-5 sm:mb-6 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center"
        >
          <div className="flex-1 w-full flex items-center gap-3">
            <svg className="w-4 h-4 text-[#64727e] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by suburb or postcode..."
              className="w-full bg-transparent border-0 text-[14px] font-semibold text-[#183249] focus:outline-none"
            />
          </div>
          <MagneticButton>
            <button
              onClick={() => alert(`Searching for verified providers near: ${searchQuery}`)}
              className="w-full sm:w-auto px-5 sm:px-6 py-2.5 bg-[#0F1A2C] hover:bg-[#102d59] text-white font-semibold rounded-xl text-[12px] transition-colors shadow-sm tap-target"
            >
              Find help →
            </button>
          </MagneticButton>
        </motion.div>

        {/* ── Category Chips ─────────────────────────────────────────── */}
        <motion.div
          className="chip-scroll mb-5 sm:mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          {CATEGORIES.map((c, i) => (
            <motion.button
              key={c.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 + i * 0.05 }}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3.5 py-2 rounded-full text-[12px] font-medium transition-all whitespace-nowrap flex-shrink-0 tap-target ${
                selectedCategory === c.id
                  ? "bg-[#0F1A2C] text-white font-semibold"
                  : "bg-white border border-[#e2e5e5] text-[#64727e] hover:bg-[#F9F8F5]"
              }`}
            >
              {c.label}
            </motion.button>
          ))}
        </motion.div>

        {/* ── Result Count ───────────────────────────────────────────── */}
        <FadeUp className="flex items-center justify-between text-[11px] text-[#64727e] mb-5 sm:mb-6">
          <span>{filtered.length} verified professionals near {searchQuery}</span>
          <span className="hidden sm:inline">Click any specialist to view their full profile &amp; project photos</span>
        </FadeUp>

        {/* ── Professionals Grid ─────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-8 sm:mb-10">
              {filtered.map((pro) => (
                <StaggerItem key={pro.id}>
                  <CardHover>
                    <article className="bg-white border border-[#e2e5e5] rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between h-full group">
                      <div>
                        {/* Header with Photo Avatar */}
                        <div className="flex items-start gap-3 sm:gap-3.5 mb-4">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-[#e6eaf3] border border-[#e2e5e5] flex-shrink-0 shadow-sm">
                            <img
                              src={pro.avatarUrl}
                              alt={pro.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="min-w-0">
                            <Link
                              href={`/explore/${pro.id}`}
                              className="text-base font-bold text-[#183249] hover:text-[#0F1A2C] leading-tight block truncate group-hover:underline"
                            >
                              {pro.name}
                            </Link>
                            <p className="text-[11px] text-[#0F1A2C] font-semibold truncate mt-0.5">{pro.role}</p>
                            <p className="text-[10px] text-[#64727e] truncate">{pro.business}</p>
                          </div>
                        </div>

                        {/* Rating & Licence */}
                        <div className="flex items-center gap-2 text-[11px] mb-3 text-[#64727e]">
                          <span className="inline-flex items-center gap-1 text-amber-600 font-bold">
                            <svg className="w-3.5 h-3.5 text-amber-500 fill-amber-500" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {pro.rating}
                          </span>
                          <span>•</span>
                          <span className="font-mono text-[10px] font-semibold text-[#0F1A2C]">{pro.licence}</span>
                        </div>

                        <p className="text-[12px] text-[#556b83] leading-relaxed mb-4 line-clamp-3">{pro.desc}</p>

                        {/* Photos Preview Pills */}
                        <div className="flex items-center gap-1.5 mb-4 text-[10px] text-[#64727e]">
                          <span className="inline-flex items-center gap-1">
                            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {pro.portfolio.length} project photos
                          </span>
                          <span>•</span>
                          <span>{pro.portfolio[0]?.tag}</span>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="pt-4 border-t border-[#e2e5e5] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
                        <Link
                          href={`/explore/${pro.id}`}
                          className="px-3 py-2 bg-[#F9F8F5] hover:bg-[#e4ebf5] text-[#0F1A2C] font-bold rounded-lg text-[11px] text-center transition-colors tap-target"
                        >
                          View Profile &amp; Photos →
                        </Link>
                        <MagneticButton>
                          <Link
                            href={pro.link}
                            className="inline-flex items-center justify-center gap-1 px-3.5 py-2 bg-[#0F1A2C] hover:bg-[#102d59] text-white font-bold rounded-lg text-[11px] text-center transition-colors tap-target"
                          >
                            <span>Connect</span>
                            <svg className="w-3.5 h-3.5 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m12 2 8 3v7c0 6-8 10-8 10S4 18 4 12V5Z" />
                            </svg>
                          </Link>
                        </MagneticButton>
                      </div>
                    </article>
                  </CardHover>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </motion.div>
        </AnimatePresence>

        {/* ── Consumer Guidance Notice ───────────────────────────────── */}
        <FadeUp>
          <div className="p-4 sm:p-5 rounded-2xl bg-[#eaf0f6] border border-[#e2e5e5] flex items-start sm:items-center gap-3 sm:gap-3.5 text-[12px] text-[#4e6582] mb-6 sm:mb-8">
            <div className="w-5 h-5 rounded-full bg-[#0F1A2C]/10 text-[#0F1A2C] flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <strong className="text-[#183249] block mb-0.5">Verified Australian Specialist Directory</strong>
              Review trade licences, verified QBCC registrations, and real project photographs before agreeing upon scope. All initial communications through TrustLink™ are encrypted and revocable.
            </div>
          </div>
        </FadeUp>

      </div>
    </PageTransition>
  );
}
