"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PropertyData } from "@/lib/properties";

interface DigitalKeyViewProps {
  property: PropertyData;
  onOpenTrustLink?: () => void;
}

// ─── Pack Family Types (per Queensland Workflow Brief) ───────────────────────

export type PackFamily =
  | "Service & Handover"
  | "Build & Change"
  | "Sell a Property"
  | "Appoint & Lease"
  | "Finance a Home"
  | "My Tenancy";

export type RequirementLabel =
  | "Required by law"
  | "Conditional legal requirement"
  | "Requested by professional"
  | "Optional supporting record";

export type PackExecutionStatus =
  | "Draft"
  | "Assembled"
  | "Approved to Share"
  | "Sent & Pending"
  | "Signed by You / Waiting"
  | "Fully Executed & Sealed";

export interface PackItem {
  title: string;
  category: string;
  label: RequirementLabel;
  size?: string;
  source?: string;
}

export interface DigitalKeyPack {
  id: string;
  family: PackFamily;
  title: string;
  recipient: string;
  recipientRole: string;
  status: PackExecutionStatus;
  statusColor: string;
  items: PackItem[];
  updatedAt: string;
  trustlinkId?: string;
  trustlinkHref?: string;
}

export interface ExecutedReceipt {
  id: string;
  packTitle: string;
  family: PackFamily;
  executedDate: string;
  recipient: string;
  hash: string;
  documentsCount: number;
  highlightDocs: string[];
}

export function DigitalKeyView({ property, onOpenTrustLink }: DigitalKeyViewProps) {
  const [activeTab, setActiveTab] = useState<"decisions" | "packs" | "sent-returned" | "rules">("decisions");
  const [selectedFamilyFilter, setSelectedFamilyFilter] = useState<string>("all");

  // Incoming Decision States (Simulating real property transaction decisions)
  const [builderHandoverAccepted, setBuilderHandoverAccepted] = useState(false);
  const [variationAccepted, setVariationAccepted] = useState(false);

  // Modals State
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [previewModalDoc, setPreviewModalDoc] = useState<PackItem | null>(null);

  // New Pack Form State
  const [newFamily, setNewFamily] = useState<PackFamily>("Service & Handover");
  const [newTitle, setNewTitle] = useState("");
  const [newRecipient, setNewRecipient] = useState("");
  const [newRecipientRole, setNewRecipientRole] = useState("Selling Agent / Solicitor");
  const [selectedDocTitles, setSelectedDocTitles] = useState<string[]>(
    property.documents.slice(0, 3).map((d) => d.title)
  );

  // Dynamic Packs State
  const [packsList, setPacksList] = useState<DigitalKeyPack[]>([
    {
      id: "PACK-HO-018",
      family: "Service & Handover",
      title: "Practical Completion & Builder Handover Pack",
      recipient: "Hart Homes (Olivia Hart)",
      recipientRole: "Licensed Builder · QBCC #150821",
      status: builderHandoverAccepted ? "Fully Executed & Sealed" : "Signed by You / Waiting",
      statusColor: builderHandoverAccepted ? "bg-[#eaf5ef] text-[#24754c] border-[#c7e3d1]" : "bg-[#eef4ff] text-[#0284c7] border-[#bae6fd]",
      updatedAt: "Today 10:48 AM",
      trustlinkId: "TL-99214-B",
      trustlinkHref: "/trustlinks/TL-99214-B",
      items: [
        { title: "QBCC Form 16 Structural Engineering Certificate", category: "Compliance", label: "Required by law", size: "1.8 MB", source: "Apex Certifications" },
        { title: "AS 3740 Form 43 Wet-Area Waterproofing Certificate", category: "Compliance", label: "Required by law", size: "1.4 MB", source: "Miller Tiling" },
        { title: "Termimesh AS 3660.1 Termite Management System Notice", category: "Warranty", label: "Conditional legal requirement", size: "2.1 MB", source: "Flick Pest" },
        { title: "Architectural & Electrical As-Built Working Drawings", category: "Plans", label: "Requested by professional", size: "4.5 MB", source: "Hart Homes" },
        { title: "Dulux Wash&Wear Paint Schedule & Warranty", category: "Specification", label: "Optional supporting record", size: "1.2 MB", source: "Prime Finish" },
      ],
    },
    {
      id: "PACK-[#VAR-04]",
      family: "Build & Change",
      title: "Priced Variation #04 — Kitchen Island Caesarstone Upgrade",
      recipient: "Hart Homes (Olivia Hart)",
      recipientRole: "Licensed Builder · QBCC #150821",
      status: variationAccepted ? "Fully Executed & Sealed" : "Approved to Share",
      statusColor: variationAccepted ? "bg-[#eaf5ef] text-[#24754c] border-[#c7e3d1]" : "bg-[#f0f4f9] text-[#071d3b] border-[#cbd5e2]",
      updatedAt: "Yesterday 3:15 PM",
      trustlinkId: "TL-99214-B",
      trustlinkHref: "/trustlinks/TL-99214-B",
      items: [
        { title: "QBCC Form 7 Variation Request & Price Effect ($1,400 GST incl)", category: "Contract", label: "Required by law", size: "840 KB", source: "Hart Homes" },
        { title: "Caesarstone Pure White Sample & Edge Profile Signoff", category: "Specification", label: "Requested by professional", size: "1.1 MB", source: "Alex & Emily" },
      ],
    },
    {
      id: "PACK-SEL-002",
      family: "Sell a Property",
      title: "Queensland Form 2 Seller Disclosure Preparation Pack",
      recipient: "River City Conveyancing (Lachlan Vance)",
      recipientRole: "Solicitor / Conveyancing Team",
      status: "Draft",
      statusColor: "bg-[#f1f5f9] text-[#5b6e84] border-[#dfe6ef]",
      updatedAt: "2 days ago",
      trustlinkId: "TL-88301-A",
      trustlinkHref: "/trustlinks/TL-88301-A",
      items: [
        { title: "Title Search & Registered Encumbrances Statement", category: "Title", label: "Required by law", size: "620 KB", source: "Titles Queensland" },
        { title: "BCC Planning Scheme & Flood Awareness Record", category: "Disclosures", label: "Conditional legal requirement", size: "1.9 MB", source: "Brisbane City Council" },
        { title: "Form 23 Pool Safety Inspection Certificate", category: "Compliance", label: "Conditional legal requirement", size: "950 KB", source: "QDC Inspector" },
      ],
    },
  ]);

  // Executed Returned Receipts
  const [receipts, setReceipts] = useState<ExecutedReceipt[]>([
    {
      id: "RCPT-90124",
      packTitle: "Title Transfer & Contract of Sale Execution",
      family: "Sell a Property",
      executedDate: "14 Sep 2026",
      recipient: "River City Conveyancing (PEXA Handoff)",
      hash: "0x89f2a7b1c3e459021a",
      documentsCount: 4,
      highlightDocs: [
        "Signed Contract of Sale (Form 18a)",
        "PEXA Settlement Direction Notice",
        "Form 1 Vendor Statement Sealed Copy",
      ],
    },
    {
      id: "RCPT-88102",
      packTitle: "Pre-Pour Slab & Footing Structural Certification",
      family: "Service & Handover",
      executedDate: "28 Aug 2026",
      recipient: "Apex Building Certifications",
      hash: "0x44c1d2e3f4a567890b",
      documentsCount: 2,
      highlightDocs: [
        "QBCC Form 16 Slab Inspection Signoff",
        "Soil Test Classification (Class M-D)",
      ],
    },
  ]);

  const trustlinkUrl = property.trustlinkHref || `/trustlinks/${property.trustlinkId || "TL-99214-B"}`;

  const handleCreatePackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const chosenItems: PackItem[] = selectedDocTitles.map((title) => {
      const orig = property.documents.find((d) => d.title === title);
      return {
        title: title,
        category: orig?.cat || "Document",
        label: title.toLowerCase().includes("form") || title.toLowerCase().includes("cert")
          ? "Required by law"
          : title.toLowerCase().includes("plan") || title.toLowerCase().includes("drawing")
          ? "Requested by professional"
          : "Optional supporting record",
        size: "1.5 MB",
        source: "Property Vault",
      };
    });

    const newPack: DigitalKeyPack = {
      id: `PACK-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      family: newFamily,
      title: newTitle.trim(),
      recipient: newRecipient.trim() || "Assigned Professional",
      recipientRole: newRecipientRole,
      status: "Assembled",
      statusColor: "bg-[#eef4ff] text-[#071d3b] border-[#cbd5e2]",
      items: chosenItems,
      updatedAt: "Just now",
      trustlinkId: property.trustlinkId || "TL-99214-B",
      trustlinkHref: trustlinkUrl,
    };

    setPacksList([newPack, ...packsList]);
    setNewTitle("");
    setNewRecipient("");
    setCreateModalOpen(false);
    setActiveTab("packs");
  };

  const handleAcceptHandover = () => {
    setBuilderHandoverAccepted(true);

    setPacksList((prev) =>
      prev.map((p) =>
        p.id === "PACK-HO-018"
          ? {
              ...p,
              status: "Fully Executed & Sealed",
              statusColor: "bg-[#eaf5ef] text-[#24754c] border-[#c7e3d1]",
              updatedAt: "Just now",
            }
          : p
      )
    );

    const newRcpt: ExecutedReceipt = {
      id: `RCPT-${Math.floor(10000 + Math.random() * 90000)}`,
      packTitle: "Practical Completion & Builder Handover Pack",
      family: "Service & Handover",
      executedDate: "Today",
      recipient: "Hart Homes (QBCC #150821)",
      hash: `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`,
      documentsCount: 5,
      highlightDocs: [
        "QBCC Form 16 Structural Engineering Certificate",
        "Form 43 Wet-Area Waterproofing Certificate",
        "Termimesh Termite Management System Notice",
      ],
    };

    setReceipts([newRcpt, ...receipts]);
  };

  const filteredPacks = packsList.filter((p) => {
    if (selectedFamilyFilter === "all") return true;
    return p.family === selectedFamilyFilter;
  });

  return (
    <div className="space-y-6 text-[#102645] font-sans max-w-[1120px] mx-auto pb-12">
      
      {/* ── Top Header & Context Banner ───────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-[#dfe6ef]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[9.5px] font-bold uppercase tracking-[1.4px] text-[#24754c]">
              My Property World · Digital Key
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#24754c]" />
            <span className="text-[10px] text-[#5b6e84] font-semibold font-mono">
              {property.propId}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#102645]">
            Digital Key for {property.street}
          </h1>
          <p className="text-xs text-[#68788e] mt-1 max-w-2xl leading-relaxed">
            The place to complete deals and exchanges. Assemble scoped packs, review original statutory forms, approve requests, and keep returned executed copies linked to your property record.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto flex-wrap">
          {onOpenTrustLink && (
            <button
              onClick={onOpenTrustLink}
              className="px-3.5 py-2 bg-white border border-[#cbd5e2] hover:bg-[#f3f6fb] text-[#102645] rounded-xl text-xs font-semibold transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>🛡️ TrustLink Access</span>
            </button>
          )}
          <button
            onClick={() => setCreateModalOpen(true)}
            className="px-4 py-2 bg-[#071d3b] hover:bg-[#15345d] text-white rounded-xl text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>🔑</span>
            <span>+ Assemble Record Pack</span>
          </button>
        </div>
      </div>

      {/* ── Main Navigation Tabs ───────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-[#dfe6ef] pb-0.5 gap-2 overflow-x-auto">
        <div className="flex items-center gap-2">
          {[
            {
              id: "decisions",
              label: "Overview & Decisions",
              badge: !builderHandoverAccepted ? "1 Action Waiting" : "Up to date",
              badgeColor: !builderHandoverAccepted ? "bg-[#eef4ff] text-[#0284c7] border-[#bae6fd]" : "bg-[#eaf5ef] text-[#24754c] border-[#c7e3d1]",
            },
            {
              id: "packs",
              label: "Pack Families & Manifests",
              badge: `${packsList.length} Packs`,
              badgeColor: "bg-[#f1f5f9] text-[#071d3b] border-[#cbd5e2]",
            },
            {
              id: "sent-returned",
              label: "Sent & Returned Ledger",
              badge: `${receipts.length} Executed`,
              badgeColor: "bg-[#f1f5f9] text-[#071d3b] border-[#cbd5e2]",
            },
            {
              id: "rules",
              label: "Statutory Rules & Guardrails",
              badge: "QLD Rules",
              badgeColor: "bg-[#f0f4f9] text-[#24754c] border-[#c7e3d1]",
            },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-3.5 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer border-b-2 ${
                  isActive
                    ? "border-[#071d3b] text-[#071d3b] bg-white shadow-2xs"
                    : "border-transparent text-[#68788e] hover:text-[#102645] hover:bg-[#f4f6f8]"
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-2 py-0.2 rounded-full border font-semibold ${tab.badgeColor}`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════
          TAB 1: OVERVIEW & DECISION ENGINE
         ═════════════════════════════════════════════════════════════════ */}
      {activeTab === "decisions" && (
        <div className="space-y-6">

          {/* 1. Pending Action Banner: Builder Handover */}
          {!builderHandoverAccepted ? (
            <div className="bg-[#071d3b] text-white rounded-2xl p-5 sm:p-6 shadow-sm relative overflow-hidden space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-[9.5px] font-bold uppercase tracking-[1.4px] bg-[#38bdf8] text-[#071d3b] px-2 py-0.5 rounded">
                    Action Required · Deal Handover
                  </span>
                  <span className="text-xs text-[#b9c8db]">Issuer: Hart Homes (QBCC #150821)</span>
                </div>
                <span className="text-xs text-[#7dd3fc] font-semibold">
                  Due: Practical Completion Stage
                </span>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="space-y-2 flex-1">
                  <h3 className="text-lg font-bold text-white">
                    Accept Builder Practical Completion &amp; Handover Pack
                  </h3>
                  <p className="text-xs text-[#b9c8db] leading-relaxed max-w-2xl">
                    Hart Homes has assembled the statutory compliance certificates, engineering signoffs, and appliance warranties for {property.street}. Review the original documents and accept handover to seal them permanently into your property logbook.
                  </p>

                  {/* 4 Requirement Label Pills */}
                  <div className="pt-2 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#991b1b] text-white">
                      Required by law: QBCC Form 16 &amp; Form 43
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#1e40af] text-white">
                      Conditional legal: Termite AS 3660.1
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#1e293b] text-white">
                      Requested by builder: As-Built Drawings
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#334155] text-white">
                      Optional: Paint Warranty
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col items-stretch gap-2.5 min-w-[200px] flex-shrink-0">
                  <button
                    onClick={handleAcceptHandover}
                    className="px-4 py-2.5 bg-[#38bdf8] hover:bg-[#0284c7] text-[#071d3b] rounded-xl text-xs font-bold transition-colors shadow-2xs text-center cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>✓ Accept &amp; Seal to Vault</span>
                  </button>
                  <Link
                    href={trustlinkUrl}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-colors text-center cursor-pointer"
                  >
                    Ask Question via TrustLink
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#f0fbf7] border border-[#c7e3d1] rounded-2xl p-5 text-xs text-[#24754c] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#24754c] text-white flex items-center justify-center text-base font-bold flex-shrink-0">
                  ✓
                </div>
                <div>
                  <strong className="block text-sm font-bold text-[#102645]">
                    Handover Executed &amp; Sealed to Property Logbook
                  </strong>
                  <span>All 5 statutory documents, Form 16/43 certs, and warranties are permanently recorded under {property.propId}.</span>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold bg-white px-3 py-1.5 rounded-lg border border-[#c7e3d1] text-[#071d3b]">
                Executed Receipt #RCPT-90124
              </span>
            </div>
          )}

          {/* 2. Outstanding Decisions & Packs Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-[#dfe6ef] rounded-2xl p-4 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#68788e]">
                  Active Pack Families
                </span>
                <span className="text-xs font-bold text-[#071d3b]">3 Families</span>
              </div>
              <div className="text-xl font-bold text-[#102645]">
                {packsList.length} Assembled Manifests
              </div>
              <p className="text-[11px] text-[#68788e]">
                Service &amp; Handover, Build &amp; Change, Sell Disclosure
              </p>
            </div>

            <div className="bg-white border border-[#dfe6ef] rounded-2xl p-4 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#24754c]">
                  Executed Receipts
                </span>
                <span className="text-xs font-bold text-[#24754c]">Verified</span>
              </div>
              <div className="text-xl font-bold text-[#24754c]">
                {receipts.length} Returned Records
              </div>
              <p className="text-[11px] text-[#68788e]">
                Signed title deeds &amp; structural engineering signoffs
              </p>
            </div>

            <div className="bg-white border border-[#dfe6ef] rounded-2xl p-4 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#071d3b]">
                  TrustLink Boundaries
                </span>
                <span className="text-xs font-bold text-[#071d3b]">Scoped</span>
              </div>
              <div className="text-xl font-bold text-[#071d3b]">
                Private Vault Protected
              </div>
              <p className="text-[11px] text-[#68788e]">
                Zero blanket access · Scoped party permissions only
              </p>
            </div>
          </div>

          {/* 3. The 6 Queensland Pack Families Reference Strip */}
          <div className="bg-white border border-[#dfe6ef] rounded-2xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#dfe6ef]">
              <div>
                <h3 className="text-sm font-bold text-[#102645]">
                  Queensland Pack Families &amp; Main Jobs
                </h3>
                <p className="text-[11.5px] text-[#68788e]">
                  Every Digital Key pack follows structured statutory rules for Queensland property transactions.
                </p>
              </div>
              <button
                onClick={() => setCreateModalOpen(true)}
                className="text-xs font-bold text-[#071d3b] hover:underline cursor-pointer"
              >
                + Assemble New Pack
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              {[
                { family: "Service & Handover", icon: "📦", job: "Relevant asset context; quote decision; returned job records; accepted handover." },
                { family: "Build & Change", icon: "🔨", job: "Colour / equipment request; priced variation; approval; returned specification." },
                { family: "Sell a Property", icon: "🏡", job: "Seller Form 2 disclosure preparation; title search evidence to agent/solicitor." },
                { family: "Appoint & Lease", icon: "📜", job: "Residential OFT Form 6 agency appointment; Form 18a tenancy agreement." },
                { family: "Finance a Home", icon: "🏦", job: "Named mortgage broker / lender evidence; payslips & valuation." },
                { family: "My Tenancy", icon: "🔑", job: "Form 22 application, lease/bond records, renewal permission requests." },
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#fafbfc] border border-[#dfe6ef] space-y-1">
                  <div className="flex items-center gap-2 font-bold text-[#102645]">
                    <span>{item.icon}</span>
                    <span>{item.family}</span>
                  </div>
                  <p className="text-[11px] text-[#68788e] leading-snug">
                    {item.job}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════
          TAB 2: PACK FAMILIES & MANIFESTS
         ═════════════════════════════════════════════════════════════════ */}
      {activeTab === "packs" && (
        <div className="space-y-5">
          {/* Family Filter Toolbar */}
          <div className="flex items-center justify-between gap-3 flex-wrap bg-white border border-[#dfe6ef] rounded-2xl p-3 shadow-2xs">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {[
                { id: "all", label: "All Pack Families" },
                { id: "Service & Handover", label: "Service & Handover" },
                { id: "Build & Change", label: "Build & Change" },
                { id: "Sell a Property", label: "Sell a Property" },
                { id: "Appoint & Lease", label: "Appoint & Lease" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFamilyFilter(f.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    selectedFamilyFilter === f.id
                      ? "bg-[#071d3b] text-white shadow-2xs"
                      : "bg-[#f4f6f8] text-[#5b6e84] hover:bg-[#e8edf2]"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCreateModalOpen(true)}
              className="px-3.5 py-1.5 bg-[#071d3b] hover:bg-[#15345d] text-white rounded-xl text-xs font-bold transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
            >
              <span>+ Create Record Pack</span>
            </button>
          </div>

          {/* Pack Cards List */}
          <div className="space-y-4">
            {filteredPacks.map((pack) => (
              <div
                key={pack.id}
                className="bg-white border border-[#dfe6ef] rounded-2xl p-5 shadow-2xs space-y-3.5 hover:border-[#cbd5e1] transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#dfe6ef]">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-[#f0f4f8] text-[#071d3b] border border-[#cbd5e2]">
                      {pack.id}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#f4f6f8] text-[#24754c] border border-[#d2e6d9]">
                      {pack.family}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${pack.statusColor}`}>
                      {pack.status}
                    </span>
                  </div>

                  <span className="text-[11px] text-[#8a9bb0]">
                    Updated {pack.updatedAt}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[#102645]">
                    {pack.title}
                  </h3>
                  <p className="text-xs text-[#5b6e84]">
                    Target Recipient: <strong className="text-[#102645]">{pack.recipient}</strong> ({pack.recipientRole})
                  </p>
                </div>

                {/* Document Items Table with 4 Requirement Labels */}
                <div className="space-y-1.5">
                  <div className="text-[10.5px] font-bold text-[#68788e] uppercase tracking-wider">
                    Assembled Pack Manifest ({pack.items.length} records):
                  </div>

                  <div className="divide-y divide-[#f0f4f8] border border-[#dfe6ef] rounded-xl overflow-hidden bg-[#fafbfc]">
                    {pack.items.map((item, idx) => (
                      <div key={idx} className="p-2.5 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-base">📄</span>
                          <div className="min-w-0">
                            <div className="font-semibold text-[#102645] truncate">
                              {item.title}
                            </div>
                            <div className="text-[10px] text-[#8a9bb0]">
                              {item.category} · {item.size} · Source: {item.source}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span
                            className={`text-[9.5px] font-bold px-2 py-0.5 rounded whitespace-nowrap ${
                              item.label === "Required by law"
                                ? "bg-[#fee2e2] text-[#991b1b]"
                                : item.label === "Conditional legal requirement"
                                ? "bg-[#dbeafe] text-[#1e40af]"
                                : item.label === "Requested by professional"
                                ? "bg-[#f1f5f9] text-[#1e293b]"
                                : "bg-[#f8fafc] text-[#475569] border border-[#e2e8f0]"
                            }`}
                          >
                            {item.label}
                          </span>

                          <button
                            onClick={() => setPreviewModalDoc(item)}
                            className="px-2 py-1 bg-white border border-[#cbd5e2] hover:bg-[#f4f6f8] text-[#102645] text-[10.5px] font-bold rounded cursor-pointer"
                          >
                            Review
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Toolbar */}
                <div className="pt-2 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Link
                      href={pack.trustlinkHref || trustlinkUrl}
                      className="px-3.5 py-1.5 bg-[#071d3b] hover:bg-[#15345d] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
                    >
                      <span>🛡️ Manage via TrustLink</span>
                      <span>→</span>
                    </Link>
                  </div>

                  <span className="text-[11px] text-[#5b6e84]">
                    Bound to {property.street} Digital Key
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════
          TAB 3: SENT & RETURNED EXECUTED LEDGER
         ═════════════════════════════════════════════════════════════════ */}
      {activeTab === "sent-returned" && (
        <div className="space-y-4">
          <div className="bg-white border border-[#dfe6ef] rounded-2xl p-5 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#102645]">
                  Executed Exchange Ledger &amp; Returned Copies
                </h3>
                <p className="text-xs text-[#68788e]">
                  Every completed signing, settlement, or handover creates an immutable returned record receipt filed to your property vault.
                </p>
              </div>
              <span className="text-xs font-mono font-bold bg-[#eaf5ef] text-[#24754c] px-3 py-1 rounded-lg border border-[#c7e3d1]">
                {receipts.length} Executed Receipts
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {receipts.map((rcpt) => (
              <div
                key={rcpt.id}
                className="bg-white border border-[#dfe6ef] rounded-2xl p-5 shadow-2xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#dfe6ef]">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10.5px] font-bold px-2 py-0.5 rounded bg-[#eaf5ef] text-[#24754c] border border-[#c7e3d1]">
                      {rcpt.id}
                    </span>
                    <span className="text-xs font-bold text-[#102645]">
                      {rcpt.packTitle}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#8a9bb0]">
                    Executed: {rcpt.executedDate}
                  </span>
                </div>

                <div className="text-xs space-y-1">
                  <div>Recipent / Counterparty: <strong className="text-[#102645]">{rcpt.recipient}</strong></div>
                  <div className="font-mono text-[10.5px] text-[#5b6e84]">Verification Hash: {rcpt.hash}</div>
                </div>

                <div>
                  <div className="text-[10.5px] font-bold text-[#68788e] uppercase mb-1">
                    Returned Documents ({rcpt.documentsCount} files total):
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {rcpt.highlightDocs.map((doc, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-[#f8fafc] text-[#102645] px-2.5 py-1 rounded-md border border-[#dfe6ef] flex items-center gap-1 font-semibold"
                      >
                        <span className="text-[#24754c]">✓</span>
                        <span>{doc}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════
          TAB 4: STATUTORY RULES & GUARDRAILS
         ═════════════════════════════════════════════════════════════════ */}
      {activeTab === "rules" && (
        <div className="space-y-4">
          <div className="bg-white border border-[#dfe6ef] rounded-2xl p-5 shadow-2xs space-y-3">
            <h3 className="text-base font-bold text-[#102645]">
              Queensland Statutory Rules &amp; Privacy Guardrails
            </h3>
            <p className="text-xs text-[#68788e] leading-relaxed">
              Digital Key enforces statutory compliance rules for Queensland property workflows. Ownership, tenancy rights, agent appointments, and mortgage applications operate under distinct privacy boundaries.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-[#fafbfc] border border-[#dfe6ef] space-y-1">
                <strong className="block text-[#102645] font-bold">
                  A Shared Property Does Not Mean a Shared Vault
                </strong>
                <p className="text-[11px] text-[#5b6e84]">
                  Owner identity, mortgage finance, and renter applications are kept strictly private. Transfer only authorised, reviewed manifests upon sale or tenancy change.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#fafbfc] border border-[#dfe6ef] space-y-1">
                <strong className="block text-[#102645] font-bold">
                  Queensland Seller Disclosure Scheme (Aug 2025)
                </strong>
                <p className="text-[11px] text-[#5b6e84]">
                  Form 2 seller statements, title searches, and prescribed certificates must be delivered prior to buyer contract signing.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#fafbfc] border border-[#dfe6ef] space-y-1">
                <strong className="block text-[#102645] font-bold">
                  QBCC Construction Variation Rules
                </strong>
                <p className="text-[11px] text-[#5b6e84]">
                  Written agreement precedes variation work. Description, price effect, delay estimate, and payment terms are executed before work commences.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#fafbfc] border border-[#dfe6ef] space-y-1">
                <strong className="block text-[#102645] font-bold">
                  RTA Rental Recipient Retention Limits
                </strong>
                <p className="text-[11px] text-[#5b6e84]">
                  Supporting application documents are limited to 2 per category. Records are destroyed after 3 months for unsuccessful applicants and 1 year after tenancy completion.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Assemble Record Pack ───────────────────────────────── */}
      {createModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#dfe6ef] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-[#dfe6ef]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#24754c]">
                  Digital Key Pack Generator
                </span>
                <h3 className="text-lg font-bold text-[#102645]">Assemble Record Pack</h3>
              </div>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="w-7 h-7 rounded-full bg-[#f4f6f8] text-[#5b6e84] hover:bg-[#e2eaf4] flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePackSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-[#102645] mb-1">
                  1. Select Pack Family *
                </label>
                <select
                  value={newFamily}
                  onChange={(e) => setNewFamily(e.target.value as PackFamily)}
                  className="w-full px-3 py-2 bg-[#f4f6f8] border border-[#dfe6ef] rounded-lg text-xs text-[#102645] font-semibold focus:outline-none focus:border-[#071d3b]"
                >
                  <option value="Service & Handover">Service &amp; Handover (Practical Completion, Form 16/43)</option>
                  <option value="Build & Change">Build &amp; Change (Variations, Color &amp; Equipment Spec)</option>
                  <option value="Sell a Property">Sell a Property (Queensland Form 2 Seller Disclosure)</option>
                  <option value="Appoint & Lease">Appoint &amp; Lease (Form 6 Agency, Form 18a Tenancy)</option>
                  <option value="Finance a Home">Finance a Home (Mortgage Broker &amp; Lender Evidence)</option>
                  <option value="My Tenancy">My Tenancy (Renter Form 22 Application &amp; Bond)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#102645] mb-1">
                  2. Pack Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Practical Completion & Statutory Handover Pack"
                  className="w-full px-3 py-2 bg-[#f4f6f8] border border-[#dfe6ef] rounded-lg text-xs text-[#102645] focus:outline-none focus:border-[#071d3b]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#102645] mb-1">
                    Recipient Name
                  </label>
                  <input
                    type="text"
                    value={newRecipient}
                    onChange={(e) => setNewRecipient(e.target.value)}
                    placeholder="e.g. River City Conveyancing"
                    className="w-full px-3 py-2 bg-[#f4f6f8] border border-[#dfe6ef] rounded-lg text-xs text-[#102645] focus:outline-none focus:border-[#071d3b]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#102645] mb-1">
                    Recipient Role
                  </label>
                  <select
                    value={newRecipientRole}
                    onChange={(e) => setNewRecipientRole(e.target.value)}
                    className="w-full px-3 py-2 bg-[#f4f6f8] border border-[#dfe6ef] rounded-lg text-xs text-[#102645] focus:outline-none focus:border-[#071d3b]"
                  >
                    <option value="Solicitor / Conveyancing Team">Solicitor / Conveyancing Team</option>
                    <option value="Selling Agent / Agency">Selling Agent / Agency</option>
                    <option value="Licensed Builder">Licensed Builder (QBCC)</option>
                    <option value="Mortgage Broker / Lender">Mortgage Broker / Lender</option>
                    <option value="Property Manager">Property Manager</option>
                    <option value="Direct Buyer / Owner">Direct Buyer / Owner</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#102645] mb-1.5">
                  3. Select Documents from Property Vault ({selectedDocTitles.length} selected)
                </label>
                <div className="space-y-1.5 max-h-40 overflow-y-auto p-2 bg-[#f8fafc] border border-[#dfe6ef] rounded-xl">
                  {property.documents.map((doc) => {
                    const isChecked = selectedDocTitles.includes(doc.title);
                    return (
                      <label key={doc.title} className="flex items-center gap-2 text-xs p-1.5 hover:bg-white rounded cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            if (isChecked) {
                              setSelectedDocTitles(selectedDocTitles.filter((t) => t !== doc.title));
                            } else {
                              setSelectedDocTitles([...selectedDocTitles, doc.title]);
                            }
                          }}
                          className="rounded border-[#cbd5e1] text-[#071d3b]"
                        />
                        <span className="text-[#102645] font-semibold truncate">{doc.title}</span>
                        <span className="text-[10px] text-[#8a9bb0] ml-auto whitespace-nowrap">{doc.cat}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="p-3 bg-[#eaf5ef] rounded-xl border border-[#c7e3d1] text-[11px] text-[#24754c]">
                🔑 When created, this pack creates a frozen manifest. External recipients access it under scoped TrustLink permissions without seeing your private vault.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 bg-white border border-[#cbd5e2] text-[#5b6e84] rounded-xl font-semibold hover:bg-[#f4f6f8] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#071d3b] hover:bg-[#15345d] text-white font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Assemble Pack &amp; Freeze Manifest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal: Document Preview / Review ──────────────────────────── */}
      {previewModalDoc && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#dfe6ef] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#dfe6ef]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#24754c]">
                  Document Review
                </span>
                <h3 className="text-base font-bold text-[#102645]">
                  {previewModalDoc.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewModalDoc(null)}
                className="w-7 h-7 rounded-full bg-[#f4f6f8] text-[#5b6e84] hover:bg-[#e2eaf4] flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-[#fafbfc] rounded-xl border border-[#dfe6ef] space-y-1">
                <div>Category: <strong className="text-[#102645]">{previewModalDoc.category}</strong></div>
                <div>Statutory Label: <strong className="text-[#991b1b]">{previewModalDoc.label}</strong></div>
                <div>Source: <strong className="text-[#102645]">{previewModalDoc.source || "Property Vault"}</strong></div>
                <div>File Size: <span className="text-[#5b6e84]">{previewModalDoc.size || "1.4 MB"}</span></div>
              </div>

              <div className="p-3 bg-[#f0f4f9] rounded-xl text-[11px] text-[#071d3b]">
                ✓ Immutable original hash verified under Queensland Electronic Transactions Act.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setPreviewModalDoc(null)}
                className="px-4 py-2 bg-[#071d3b] hover:bg-[#15345d] text-white font-bold rounded-xl text-xs cursor-pointer shadow-xs"
              >
                Close Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
