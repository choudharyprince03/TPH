"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  PageTransition,
  FadeUp,
  MagneticButton,
} from "@/components/ui/motion";



interface PillarItem {
  id: string;
  num: string;
  label: string;
  tagline: string;
  title: string;
  summary: string;
  outside: string;
  inside: string;
  widget: {
    badge: string;
    item1: string;
    item2: string;
    action: string;
  };
  cta: string;
  ctaHref: string;
}

const PILLARS: PillarItem[] = [
  {
    id: "trustlink",
    num: "01",
    label: "TrustLink™",
    tagline: "Private by design",
    title: "Zero spam. Zero telemarketing.",
    summary:
      "Outside, an inquiry submits your phone and email to lead brokers who auction them to sales reps. With TrustLink™, you converse through a private, encrypted tunnel. You decide which documents to share, and you can revoke access at any time.",
    outside: "Your phone & email are sold to lead aggregators.",
    inside: "Private in-app messaging. Direct contact details are never exposed.",
    widget: {
      badge: "Active TrustLink™ · Encrypted",
      item1: "Phone & Email: Masked & Private",
      item2: "Soil Report: Read-only access granted",
      action: "Revoke connection anytime",
    },
    cta: "Find specialists on TrustLink",
    ctaHref: "/explore",
  },
  {
    id: "propid",
    num: "02",
    label: "Prop ID™",
    tagline: "A living sovereign memory",
    title: "Your home’s history, together for life.",
    summary:
      "Outside, property plans, Form 16 certs, paint numbers, and warranties scatter across old ring binders and previous owners' emails. Prop ID™ anchors your home’s complete story to the address so you never search or re-test again.",
    outside: "Documents lost with previous owners & council archives.",
    inside: "Permanent digital passport containing plans, certs & warranties.",
    widget: {
      badge: "Prop ID: TPH-KEN-018 · Verified",
      item1: "Cadastral: Lot 18 on RP 88201",
      item2: "22 Authenticated Vault Documents",
      action: "Explore living property record",
    },
    cta: "Explore sample record",
    ctaHref: "/properties/TPH-KEN-018",
  },
  {
    id: "world",
    num: "03",
    label: "My Property World",
    tagline: "Private personal space",
    title: "A calm sanctuary, not an ad feed.",
    summary:
      "Commercial property websites track every search and alert selling agents to your interest. My Property World is an isolated canvas: manage homes you own, or run quiet due diligence on properties you’re considering buying or renting.",
    outside: "Browsing tracked and monetized by commercial listing sites.",
    inside: "Private sandbox for your inspections, notes & budgets.",
    widget: {
      badge: "Personal Space · Sovereign & Private",
      item1: "Zero tracking, zero vendor notifications",
      item2: "Independent due diligence workspace",
      action: "Open My Property World",
    },
    cta: "Open My Property World",
    ctaHref: "/properties",
  },
  {
    id: "trust",
    num: "04",
    label: "Mutual Trust",
    tagline: "Built on verified facts",
    title: "Accurate quotes upfront. Certified handovers upon finish.",
    summary:
      "Hiring trades traditionally starts with fear of hidden costs and vague briefs. On TPH, professionals receive verified site data (Lot/RP, soil class, slope) upfront to quote honestly, and deposit official compliance certificates and warranties straight into your vault.",
    outside: "Vague briefs, surprise variations & uncertain licenses.",
    inside: "Data-backed upfront quotes & official Form 16 sign-offs.",
    widget: {
      badge: "QBCC Licensed Specialist · Verified",
      item1: "Site Data Pre-Attached (Class H1 Soil)",
      item2: "Form 16/43 Sign-Off Deposited",
      action: "View verified directory",
    },
    cta: "Explore verified professionals",
    ctaHref: "/explore",
  },
];

export default function LearnPage() {
  const [activePillar, setActivePillar] = useState<string>("trustlink");

  return (
    <PageTransition className="w-full flex-1 flex flex-col bg-[#f4f6f8] text-[#102645] font-sans pb-16">
      
      {/* ── Main Container ───────────────────────────────────────────── */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-9 py-6 sm:py-8 lg:py-10 w-full flex-1">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[12px] text-[#68788e] mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:underline text-[#68788e]">Home</Link>
          <span className="text-[#a4b2c2]">›</span>
          <span className="text-[#102645] font-semibold">Learn</span>
        </nav>

        {/* ── Philosophy & How It Works ── */}
        <FadeUp>
        <section className="bg-white border border-[#dfe6ef] rounded-3xl p-6 sm:p-8 lg:p-12 mb-12 sm:mb-16 shadow-2xs">
          
          {/* Subtle Editorial Header */}
          <div className="max-w-3xl mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#24754c] block mb-2">
              The Property Helpline Philosophy
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#102645] tracking-tight leading-[1.25]">
              We don’t provide properties.<br />
              <span className="font-serif italic font-normal text-[#071d3b]">We provide the professionals who help you get services done.</span>
            </h1>
            <p className="text-[13px] sm:text-[14px] text-[#556b83] mt-3.5 leading-relaxed">
              We are not a real estate agency or listing board. We connect property owners, buyers, renovators, and tenants with vetted independent Australian specialists — and provide sovereign digital tools so you can work together with complete confidence and zero spam.
            </p>
          </div>

          {/* 3 Simple Steps: How it works */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 pt-8 border-t border-[#f0f4f8]">
            <div className="flex flex-col">
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-6 rounded-full bg-[#eaf5ef] text-[#24754c] text-[11px] font-bold flex items-center justify-center">1</span>
                <h4 className="text-[14px] font-bold text-[#102645]">Organise your property</h4>
              </div>
              <p className="text-[12px] text-[#68788e] leading-relaxed">
                Add your home or project to your private <strong className="text-[#102645]">My Property World</strong>. Store plans, site info, and notes in your sovereign space.
              </p>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-6 rounded-full bg-[#eaf5ef] text-[#24754c] text-[11px] font-bold flex items-center justify-center">2</span>
                <h4 className="text-[14px] font-bold text-[#102645]">Enquire via TrustLink™</h4>
              </div>
              <p className="text-[12px] text-[#68788e] leading-relaxed">
                Choose a vetted specialist and start with a question. Your phone and email are never auctioned to telemarketers.
              </p>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-6 rounded-full bg-[#eaf5ef] text-[#24754c] text-[11px] font-bold flex items-center justify-center">3</span>
                <h4 className="text-[14px] font-bold text-[#102645]">Build trust &amp; keep records</h4>
              </div>
              <p className="text-[12px] text-[#68788e] leading-relaxed">
                Share relevant site data for accurate upfront quotes. Once finished, certificates and warranties are anchored to your <strong className="text-[#102645]">Prop ID™</strong> for life.
              </p>
            </div>
          </div>

          {/* Creative Interactive Pillar Spotlight */}
          <div className="border border-[#dfe6ef] rounded-2xl overflow-hidden bg-[#fafbfc] mb-10">
            
            {/* Minimalist Tab Navigation */}
            <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[#dfe6ef] bg-[#f4f6f8]">
              {PILLARS.map((p) => {
                const isActive = activePillar === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActivePillar(p.id)}
                    className={`p-4 sm:p-5 text-left transition-all relative ${
                      isActive
                        ? "bg-white text-[#102645] shadow-xs"
                        : "text-[#68788e] hover:bg-[#ebf0f5] hover:text-[#102645]"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute top-0 left-0 right-0 h-[2.5px] bg-[#071d3b]" />
                    )}
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#a4b2c2] block mb-1">
                      {p.num}
                    </span>
                    <strong className="block text-[13px] font-bold tracking-tight">
                      {p.label}
                    </strong>
                    <span className="text-[10px] text-[#68788e] block mt-0.5 truncate">
                      {p.tagline}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Pillar Showcase Panel */}
            <div className="p-6 sm:p-9 bg-white">
              {(() => {
                const p = PILLARS.find((item) => item.id === activePillar) || PILLARS[0];
                return (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Left Narrative (7 cols) */}
                    <div className="lg:col-span-7">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#eaf5ef] text-[#24754c] text-[10px] font-bold uppercase tracking-wider mb-2">
                        <span>✦</span> {p.tagline}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#102645] tracking-tight mb-2.5">
                        {p.title}
                      </h3>
                      <p className="text-[13px] text-[#556b83] leading-relaxed mb-6">
                        {p.summary}
                      </p>

                      {/* Creative Minimalist Contrast Bar */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-[11px]">
                        <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-[#8a97a7] block mb-1">
                            Outside
                          </span>
                          <span className="text-[#556b83] leading-snug block">
                            {p.outside}
                          </span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[#f0f5fa] border border-[#cbdceb]">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-[#24754c] block mb-1">
                            On The Property Helpline
                          </span>
                          <span className="text-[#102645] font-medium leading-snug block">
                            {p.inside}
                          </span>
                        </div>
                      </div>

                      <Link
                        href={p.ctaHref}
                        className="inline-flex items-center gap-2 text-[12px] font-bold text-[#071d3b] hover:text-[#24754c] transition-colors"
                      >
                        <span>{p.cta}</span>
                        <span>→</span>
                      </Link>
                    </div>

                    {/* Right Creative Interactive Artifact Mockup (5 cols) */}
                    <div className="lg:col-span-5 bg-[#f8fafc] border border-[#dfe6ef] rounded-2xl p-5 shadow-2xs">
                      <div className="flex items-center justify-between pb-3 border-b border-[#dfe6ef] text-[10px]">
                        <span className="font-mono font-bold text-[#24754c] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#24754c] inline-block animate-pulse" />
                          {p.widget.badge}
                        </span>
                        <span className="text-[#8a97a7]">TPH Protocol</span>
                      </div>

                      <div className="py-4 space-y-2 text-[11px]">
                        <div className="p-2.5 rounded-lg bg-white border border-[#e2e8f0] flex items-center gap-2 text-[#102645]">
                          <svg className="w-4 h-4 text-[#24754c] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          <span>{p.widget.item1}</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white border border-[#e2e8f0] flex items-center gap-2 text-[#102645]">
                          <svg className="w-4 h-4 text-[#071d3b] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>{p.widget.item2}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#dfe6ef] flex items-center justify-between text-[10px] text-[#68788e]">
                        <span>{p.widget.action}</span>
                        <span className="text-[#24754c] font-semibold inline-flex items-center gap-1">
                          Active
                          <svg className="w-3 h-3 text-[#24754c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      </div>
                    </div>

                  </div>
                );
              })()}
            </div>

          </div>

          {/* Minimalist Specialists Directory Strip */}
          <div className="pt-6 border-t border-[#dfe6ef] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[12px]">
            <div className="flex items-center gap-2 flex-wrap text-[#68788e]">
              <span className="font-bold text-[#102645]">Verified Disciplines:</span>
              <span className="px-2.5 py-0.5 rounded-md bg-[#f4f6f8] text-[#102645] font-medium text-[11px]">Builders</span>
              <span className="px-2.5 py-0.5 rounded-md bg-[#f4f6f8] text-[#102645] font-medium text-[11px]">Building &amp; Pest Inspectors</span>
              <span className="px-2.5 py-0.5 rounded-md bg-[#f4f6f8] text-[#102645] font-medium text-[11px]">Architects</span>
              <span className="px-2.5 py-0.5 rounded-md bg-[#f4f6f8] text-[#102645] font-medium text-[11px]">Conveyancers</span>
              <span className="px-2.5 py-0.5 rounded-md bg-[#f4f6f8] text-[#102645] font-medium text-[11px]">Certifiers</span>
            </div>
            <Link
              href="/explore"
              className="text-[12px] font-bold text-[#071d3b] hover:text-[#24754c] flex items-center gap-1.5 whitespace-nowrap self-start sm:self-auto"
            >
              <span>Explore Specialist Directory</span>
              <span>→</span>
            </Link>
          </div>

        </section>
        </FadeUp>

        {/* ── 3. Bottom Help & Privacy Banner ─────────────────────────── */}
        <FadeUp>
        <div className="bg-[#f0ede5] rounded-2xl p-6 sm:p-7 lg:p-9 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6 mb-8">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#24754c] mb-1">
              Private by default
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#102645]">
              You choose what to share, with whom, and for how long.
            </h3>
            <p className="text-[13px] text-[#68788e] mt-1 max-w-xl">
              The Property Helpline never sells your data to third-party telemarketers. All property documents remain encrypted and sovereign to you.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-auto flex-shrink-0">
            <MagneticButton>
              <Link
                href="/explore"
                className="px-4 py-2.5 bg-[#071d3b] hover:bg-[#102d59] text-white font-semibold rounded-xl text-[12px] transition-colors shadow-2xs tap-target"
              >
                Find specialists
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="/properties"
                className="px-4 py-2.5 bg-white border border-[#cbd5e2] hover:bg-[#f3f6fb] text-[#102645] font-semibold rounded-xl text-[12px] transition-colors shadow-2xs tap-target"
              >
                Open My World
              </Link>
            </MagneticButton>
          </div>
        </div>
        </FadeUp>

      </div>
    </PageTransition>
  );
}
