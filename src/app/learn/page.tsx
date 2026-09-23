"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  PageTransition,
  FadeUp,
  StaggerGrid,
  StaggerItem,
  CardHover,
  MagneticButton,
} from "@/components/ui/motion";

interface GuideStep {
  title: string;
  detail: string;
}

interface GuideItem {
  id: string;
  category: string;
  title: string;
  cardTitle: string;
  intro: string;
  icon: string;
  steps: GuideStep[];
  cta: string;
  ctaHref: string;
  officialSource?: {
    name: string;
    url: string;
  };
}

const GUIDES_DATA: Record<string, GuideItem> = {
  own: {
    id: "own",
    category: "Home Compass · 2 min read",
    cardTitle: "Owning a home",
    title: "Make your home easier to manage.",
    intro: "A few organised records today can save a lot of searching later.",
    icon: "home",
    steps: [
      {
        title: "Start with the essentials",
        detail:
          "Keep the documents you already have: architectural plans, appliance manuals, warranties, insurance certificates, and records of completed trade work. You can add the rest over time.",
      },
      {
        title: "Record what changes",
        detail:
          "Add a brief note and supporting documents when work is done. Keep dates, business names, invoices, and the scope of work easy to find for future maintenance or resale.",
      },
      {
        title: "Share a little at a time",
        detail:
          "Choose only the documents a professional needs for their specific job via TrustLink™. Review and revoke access whenever the work finishes.",
      },
    ],
    cta: "Organise my property",
    ctaHref: "/properties",
    officialSource: {
      name: "Queensland Government Housing & Home Ownership",
      url: "https://www.qld.gov.au/housing/buying-owning-home",
    },
  },
  buy: {
    id: "buy",
    category: "Home Compass · 2 min read",
    cardTitle: "Buying a property",
    title: "Keep your next move in perspective.",
    intro:
      "Use a private space for each property you’re considering, so questions and documents don’t get mixed up.",
    icon: "heart",
    steps: [
      {
        title: "Save the property",
        detail:
          "Add its address and your own private notes. Saving a property creates an isolated due diligence space and does not claim the current owner’s records.",
      },
      {
        title: "Write down your questions",
        detail:
          "Record what you want to clarify about the property, your budget, building & pest inspections, council overlays, and the timing of your move.",
      },
      {
        title: "Bring in the right help",
        detail:
          "Ask a conveyancer, building inspector, or finance professional about matters within their expertise before signing contracts. Connect via TrustLink without getting spammed.",
      },
    ],
    cta: "Save a property",
    ctaHref: "/properties?tab=properties",
    officialSource: {
      name: "Queensland Government Property Buying Guide",
      url: "https://www.qld.gov.au/housing/buying-owning-home",
    },
  },
  sell: {
    id: "sell",
    category: "Home Compass · 2 min read",
    cardTitle: "Preparing to sell",
    title: "A more organised start to selling.",
    intro:
      "Gather what you know, identify what is missing and choose professional help at your own pace.",
    icon: "key",
    steps: [
      {
        title: "Get your records together",
        detail:
          "Start with property certificates, council approvals, renovation history, and questions you want answered. Keep your private financial details separate.",
      },
      {
        title: "Compare proposed services",
        detail:
          "Ask selling agents about their local track record, marketing approach, communication, and written fee structures before making commitments.",
      },
      {
        title: "Get current, specific advice",
        detail:
          "Discuss contract terms and statutory disclosure statements (e.g. Form 2 in QLD) with an appropriately qualified solicitor or conveyancer.",
      },
    ],
    cta: "Find a selling agent",
    ctaHref: "/explore?category=agent",
    officialSource: {
      name: "Queensland Government Selling a Property",
      url: "https://www.qld.gov.au/housing/buying-owning-home",
    },
  },
  rent: {
    id: "rent",
    category: "Home Compass · 2 min read",
    cardTitle: "Renting a home",
    title: "Keep rental life organised.",
    intro:
      "A private place for your rental questions, documents and maintenance notes.",
    icon: "folder",
    steps: [
      {
        title: "Save your rental space",
        detail:
          "Keep the rental address, lease agreement, bond paperwork, and condition reports together in a private personal workspace.",
      },
      {
        title: "Record issues clearly",
        detail:
          "Log maintenance items, timestamps of when they occurred, and attach photos before submitting requests to your property manager.",
      },
      {
        title: "Know your tenancy rights",
        detail:
          "Refer to standard tenancy guidelines and official dispute resolution processes through the Residential Tenancies Authority (RTA).",
      },
    ],
    cta: "Save my rental",
    ctaHref: "/properties?tab=properties",
    officialSource: {
      name: "Residential Tenancies Authority (RTA QLD)",
      url: "https://www.rta.qld.gov.au/",
    },
  },
  handover: {
    id: "handover",
    category: "Home Compass · 2 min read",
    cardTitle: "Receiving a handover",
    title: "Receive your home’s information with confidence.",
    intro:
      "A clear handover starts with knowing what has been delivered and what is still open.",
    icon: "gift",
    steps: [
      {
        title: "Review the sections",
        detail:
          "Look through architectural plans, Form 16/43 inspection certificates, manufacturer warranties, and sub-trade contacts. Ask about anything missing.",
      },
      {
        title: "Keep open items visible",
        detail:
          "Acknowledge the defect/punch list of unresolved items with agreed rectification dates. Recording handover receipt is separate from accepting defect work.",
      },
      {
        title: "Keep the useful records",
        detail:
          "Bring the delivered documents into your sovereign Prop ID record. You retain complete ownership and control over who accesses them in the future.",
      },
    ],
    cta: "Explore a sample handover",
    ctaHref: "/properties/TPH-KEN-018",
    officialSource: {
      name: "Queensland Building and Construction Commission (QBCC)",
      url: "https://www.qbcc.qld.gov.au/",
    },
  },
};

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
  const [activeGuide, setActiveGuide] = useState<GuideItem | null>(null);
  const [activePillar, setActivePillar] = useState<string>("trustlink");

  return (
    <PageTransition className="w-full flex-1 flex flex-col bg-[#f4f6f8] text-[#102645] font-sans pb-16">
      
      {/* ── Main Container ───────────────────────────────────────────── */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-9 py-6 sm:py-8 lg:py-10 w-full flex-1">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[12px] text-[#68788e] mb-5 sm:mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:underline text-[#68788e]">Home</Link>
          <span className="text-[#a4b2c2]">›</span>
          <span className="text-[#102645] font-semibold">Learn</span>
        </nav>

        {/* Page Head */}
        <FadeUp className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[1.6px] text-[#24754c] mb-1.5">
              Home Compass
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#102645]">
              A little clarity goes a long way.
            </h1>
            <p className="text-[13px] sm:text-[14px] text-[#68788e] mt-2 max-w-2xl">
              Start with a short guide. Take the next step when you're ready.
            </p>
          </div>
          <div className="self-start sm:self-auto">
            <span className="inline-flex items-center px-3 py-1.5 bg-white border border-[#dfe6ef] rounded-lg text-[11px] font-semibold text-[#5c7089] shadow-2xs">
              General guidance
            </span>
          </div>
        </FadeUp>

        {/* ── 1. The 6 Guides Grid ────── */}
        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12 sm:mb-16">
          
          {/* Card 1: Owning a home */}
          <div className="bg-white border border-[#dfe6ef] rounded-2xl p-7 flex flex-col justify-between hover:border-[#acbccf] hover:shadow-md transition-all group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#eaf5ef] flex items-center justify-center text-[#24754c]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#102645] mt-5 mb-2 group-hover:text-[#24754c] transition-colors">
                Owning a home
              </h3>
              <p className="text-[13px] text-[#68788e] leading-relaxed">
                A few organised records today can save a lot of searching later.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#f0f4f8]">
              <button
                onClick={() => setActiveGuide(GUIDES_DATA.own)}
                className="text-[12px] font-bold text-[#071d3b] hover:text-[#24754c] flex items-center gap-1.5 transition-colors"
              >
                <span>Read the guide</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Card 2: Buying a property */}
          <div className="bg-white border border-[#dfe6ef] rounded-2xl p-7 flex flex-col justify-between hover:border-[#acbccf] hover:shadow-md transition-all group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#eaf5ef] flex items-center justify-center text-[#24754c]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#102645] mt-5 mb-2 group-hover:text-[#24754c] transition-colors">
                Buying a property
              </h3>
              <p className="text-[13px] text-[#68788e] leading-relaxed">
                Use a private space for each property you’re considering, so questions and documents don’t get mixed up.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#f0f4f8]">
              <button
                onClick={() => setActiveGuide(GUIDES_DATA.buy)}
                className="text-[12px] font-bold text-[#071d3b] hover:text-[#24754c] flex items-center gap-1.5 transition-colors"
              >
                <span>Read the guide</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Card 3: Preparing to sell */}
          <div className="bg-white border border-[#dfe6ef] rounded-2xl p-7 flex flex-col justify-between hover:border-[#acbccf] hover:shadow-md transition-all group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#eaf5ef] flex items-center justify-center text-[#24754c]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#102645] mt-5 mb-2 group-hover:text-[#24754c] transition-colors">
                Preparing to sell
              </h3>
              <p className="text-[13px] text-[#68788e] leading-relaxed">
                Gather what you know, identify what is missing and choose professional help at your own pace.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#f0f4f8]">
              <button
                onClick={() => setActiveGuide(GUIDES_DATA.sell)}
                className="text-[12px] font-bold text-[#071d3b] hover:text-[#24754c] flex items-center gap-1.5 transition-colors"
              >
                <span>Read the guide</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Card 4: Renting a home */}
          <div className="bg-white border border-[#dfe6ef] rounded-2xl p-7 flex flex-col justify-between hover:border-[#acbccf] hover:shadow-md transition-all group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#eaf5ef] flex items-center justify-center text-[#24754c]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#102645] mt-5 mb-2 group-hover:text-[#24754c] transition-colors">
                Renting a home
              </h3>
              <p className="text-[13px] text-[#68788e] leading-relaxed">
                A private place for your rental questions, documents and maintenance notes.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#f0f4f8]">
              <button
                onClick={() => setActiveGuide(GUIDES_DATA.rent)}
                className="text-[12px] font-bold text-[#071d3b] hover:text-[#24754c] flex items-center gap-1.5 transition-colors"
              >
                <span>Read the guide</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Card 5: Receiving a handover */}
          <div className="bg-white border border-[#dfe6ef] rounded-2xl p-7 flex flex-col justify-between hover:border-[#acbccf] hover:shadow-md transition-all group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#eaf5ef] flex items-center justify-center text-[#24754c]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#102645] mt-5 mb-2 group-hover:text-[#24754c] transition-colors">
                Receiving a handover
              </h3>
              <p className="text-[13px] text-[#68788e] leading-relaxed">
                A clear handover starts with knowing what has been delivered and what is still open.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#f0f4f8]">
              <button
                onClick={() => setActiveGuide(GUIDES_DATA.handover)}
                className="text-[12px] font-bold text-[#071d3b] hover:text-[#24754c] flex items-center gap-1.5 transition-colors"
              >
                <span>Read the guide</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Card 6: Need a person? (Highlight Navy Card) */}
          <div className="bg-[#071d3b] text-white rounded-2xl p-7 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#efbd66]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mt-5 mb-2">
                Need a person?
              </h3>
              <p className="text-[13px] text-[#b9c8db] leading-relaxed">
                Choose a professional and start with a question. Decide what to share before you connect.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10">
              <Link
                href="/explore"
                className="text-[12px] font-bold text-[#efbd66] hover:text-[#f8d79b] flex items-center gap-1.5 transition-colors"
              >
                <span>Find help</span>
                <span>→</span>
              </Link>
            </div>
          </div>

        </StaggerGrid>

        {/* ── 2. "WHAT WE DO & WHAT MAKES US DIFFERENT" ── */}
        <FadeUp>
        <section className="bg-white border border-[#dfe6ef] rounded-3xl p-6 sm:p-8 lg:p-12 mb-12 sm:mb-16 shadow-2xs">
          
          {/* Subtle Editorial Header */}
          <div className="max-w-3xl mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#24754c] block mb-2">
              The Property Helpline Philosophy
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#102645] tracking-tight leading-[1.25]">
              We don’t provide properties.<br />
              <span className="font-serif italic font-normal text-[#071d3b]">We provide the professionals who help you get services done.</span>
            </h2>
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
                          <span>🔒</span>
                          <span>{p.widget.item1}</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white border border-[#e2e8f0] flex items-center gap-2 text-[#102645]">
                          <span>📄</span>
                          <span>{p.widget.item2}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#dfe6ef] flex items-center justify-between text-[10px] text-[#68788e]">
                        <span>{p.widget.action}</span>
                        <span className="text-[#24754c] font-semibold">Active ✓</span>
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

      {/* ── 4. Interactive Guide Modal ── */}
      <AnimatePresence>
      {activeGuide && (
        <motion.div
          key="guide-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-[#071d3b]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveGuide(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#dfe6ef]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-[#dfe6ef] flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#24754c] block mb-1">
                  {activeGuide.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#102645] tracking-tight">
                  {activeGuide.title}
                </h2>
                <p className="text-[13px] text-[#68788e] mt-1.5">
                  {activeGuide.intro}
                </p>
              </div>
              <button
                onClick={() => setActiveGuide(null)}
                className="w-8 h-8 rounded-full bg-[#f4f6f8] hover:bg-[#e6ebf2] text-[#68788e] hover:text-[#102645] flex items-center justify-center text-sm font-bold transition-colors flex-shrink-0"
                aria-label="Close guide"
              >
                ✕
              </button>
            </div>

            {/* Modal Steps */}
            <div className="p-6 sm:p-8 space-y-6">
              {activeGuide.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-[#eaf5ef] text-[#24754c] flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#102645] mb-1">
                      {step.title}
                    </h3>
                    <p className="text-[13px] text-[#68788e] leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}

              {/* Official Reference Notice */}
              {activeGuide.officialSource && (
                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-4 text-[11px] text-[#556b83] leading-relaxed">
                  <span className="font-semibold text-[#102645] block mb-1">
                    ℹ️ General Guidance &amp; Official Legislation
                  </span>
                  This guide is general property organisation guidance and does not replace qualified legal, building, or financial advice. For state regulations, refer to the{" "}
                  <a
                    href={activeGuide.officialSource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#24754c] font-semibold underline"
                  >
                    {activeGuide.officialSource.name}
                  </a>
                  .
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 sm:p-8 border-t border-[#dfe6ef] bg-[#fcfbf8] flex items-center justify-between gap-4 rounded-b-3xl">
              <button
                onClick={() => setActiveGuide(null)}
                className="text-[12px] font-semibold text-[#68788e] hover:text-[#102645]"
              >
                Close guide
              </button>
              <Link
                href={activeGuide.ctaHref}
                onClick={() => setActiveGuide(null)}
                className="px-5 py-2.5 bg-[#071d3b] hover:bg-[#102d59] text-white text-[12px] font-semibold rounded-xl transition-colors shadow-2xs inline-flex items-center gap-2"
              >
                <span>{activeGuide.cta}</span>
                <span>→</span>
              </Link>
            </div>

          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

    </PageTransition>
  );
}
