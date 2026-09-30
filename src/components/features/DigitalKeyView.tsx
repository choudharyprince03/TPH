"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PropertyData } from "@/lib/properties";

interface DigitalKeyViewProps {
  property: PropertyData;
  onOpenTrustLink?: () => void;
}

// ─── Document Requirement Labels (PDF Brief Rules) ───────────────────────────
type RequirementLabel =
  | "Required by Law"
  | "Conditional Legal"
  | "Requested by Pro"
  | "Optional";

function getRequirementBadge(req: RequirementLabel) {
  switch (req) {
    case "Required by Law":
      return {
        style: "bg-[#eaf5ef] text-[#24754c] border border-[#c7e3d1]",
        tooltip: "Mandatory statutory requirement under Queensland law.",
      };
    case "Conditional Legal":
      return {
        style: "bg-[#fff4df] text-[#8b641c] border border-[#fce3b8]",
        tooltip: "Required only if specific property conditions apply.",
      };
    case "Requested by Pro":
      return {
        style: "bg-[#eef4ff] text-[#071d3b] border border-[#cbd5e1]",
        tooltip: "Requested by receiving professional or lender policy.",
      };
    case "Optional":
    default:
      return {
        style: "bg-[#f1f5f9] text-[#64748b]",
        tooltip: "Optional supporting evidence chosen by consumer.",
      };
  }
}

interface PackItem {
  id: string;
  title: string;
  requirement: RequirementLabel;
  size: string;
  status: "Verified" | "Pending Review" | "Attached";
}

interface DealPack {
  id: string;
  title: string;
  family: "build" | "sell" | "lease" | "finance";
  familyLabel: string;
  senderName: string;
  senderRole: string;
  senderCompany: string;
  recipientName: string;
  status: "Pending Action" | "In Review" | "Executed & Filed" | "Draft";
  statusColor: string;
  dueDate?: string;
  items: PackItem[];
  summaryNote: string;
  financialImpact?: string;
  timelineImpact?: string;
  trustlinkHref: string;
}

export function DigitalKeyView({ property, onOpenTrustLink }: DigitalKeyViewProps) {
  // Tab State: 'action', 'build', 'sell', 'lease', 'finance', 'executed'
  const [activeTab, setActiveTab] = useState<"action" | "build" | "sell" | "lease" | "finance" | "executed">("action");
  
  // Modals state
  const [reviewModalPack, setReviewModalPack] = useState<DealPack | null>(null);
  const [assembleModalOpen, setAssembleModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Assemble Pack Form State
  const [newPackFamily, setNewPackFamily] = useState<"sell" | "lease" | "build" | "finance">("sell");
  const [newPackTitle, setNewPackTitle] = useState("");
  const [newPackRecipient, setNewPackRecipient] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Mock Deal Packs
  const [dealPacks, setDealPacks] = useState<DealPack[]>([
    {
      id: "PACK-HANDOVER-01",
      title: "Practical Completion & Builder Handover Dossier",
      family: "build",
      familyLabel: "Build & Handover",
      senderName: "Olivia Hart",
      senderRole: "Licensed Builder",
      senderCompany: "Hart Homes (QBCC #150821)",
      recipientName: "Alex & Emily (Homeowners)",
      status: "Pending Action",
      statusColor: "bg-[#fff4df] text-[#8b641c] border-[#fce3b8]",
      dueDate: "Today 5:00 PM",
      summaryNote: "Hart Homes has completed construction and certified statutory compliance. Review original certs and accept handover to seal into your property passport.",
      trustlinkHref: "/trustlinks/TL-99214-B",
      items: [
        { id: "i1", title: "QBCC Form 16 Structural Engineering & Slab Signoff", requirement: "Required by Law", size: "2.4 MB", status: "Verified" },
        { id: "i2", title: "AS 3740 Form 43 Wet-Area Waterproofing Certificate", requirement: "Required by Law", size: "1.8 MB", status: "Verified" },
        { id: "i3", title: "AS 3660.1 Termimesh Termite Management Notice & 50-Yr Warranty", requirement: "Required by Law", size: "2.1 MB", status: "Verified" },
        { id: "i4", title: "Electrical Safety Certificate of Compliance", requirement: "Required by Law", size: "1.4 MB", status: "Verified" },
        { id: "i5", title: "QBCC Home Warranty Insurance Policy Certificate", requirement: "Required by Law", size: "850 KB", status: "Verified" },
        { id: "i6", title: "Daikin Air Conditioning Commissioning & Warranty Schedule", requirement: "Requested by Pro", size: "3.2 MB", status: "Attached" },
        { id: "i7", title: "As-Built Architectural Drawings & Plumbing Layouts", requirement: "Optional", size: "4.5 MB", status: "Attached" },
      ],
    },
    {
      id: "PACK-VAR-04",
      title: "Priced Contract Variation #04 (Caesarstone Upgrade)",
      family: "build",
      familyLabel: "Build & Change",
      senderName: "Olivia Hart",
      senderRole: "Licensed Builder",
      senderCompany: "Hart Homes (QBCC #150821)",
      recipientName: "Alex & Emily (Homeowners)",
      status: "Pending Action",
      statusColor: "bg-[#fff4df] text-[#8b641c] border-[#fce3b8]",
      dueDate: "2 Oct 2026",
      summaryNote: "Owner requested kitchen island benchtop change to 40mm Caesarstone Pure White with waterfall edges.",
      financialImpact: "+$1,400.00 AUD (incl. GST)",
      timelineImpact: "+2 Business Days",
      trustlinkHref: "/trustlinks/TL-99214-B",
      items: [
        { id: "v1", title: "QBCC Contract Variation Schedule #04", requirement: "Required by Law", size: "1.1 MB", status: "Pending Review" },
        { id: "v2", title: "Caesarstone Pure White Specification & Edge Profile", requirement: "Requested by Pro", size: "1.9 MB", status: "Attached" },
      ],
    },
    {
      id: "PACK-SELL-01",
      title: "Seller Disclosure Statement & Title Evidence (Form 2 Draft)",
      family: "sell",
      familyLabel: "Sell & Disclosure",
      senderName: "Lachlan Vance",
      senderRole: "Conveyancer / Solicitor",
      senderCompany: "River City Conveyancing",
      recipientName: "Alex & Emily (Sellers)",
      status: "In Review",
      statusColor: "bg-[#eaf5ef] text-[#24754c] border-[#c7e3d1]",
      summaryNote: "Draft Queensland Statutory Seller Disclosure pack compiled for upcoming market listing.",
      trustlinkHref: "/trustlinks/TL-88301-A",
      items: [
        { id: "s1", title: "Draft Seller Disclosure Statement (QLD Form 2)", requirement: "Required by Law", size: "2.8 MB", status: "Verified" },
        { id: "s2", title: "Titles Queensland Current Title Search & Cadastral Plan", requirement: "Required by Law", size: "1.5 MB", status: "Verified" },
        { id: "s3", title: "Brisbane City Council Planning & Water Search", requirement: "Required by Law", size: "3.1 MB", status: "Verified" },
        { id: "s4", title: "Pool Safety Certificate (Form 23)", requirement: "Conditional Legal", size: "1.2 MB", status: "Verified" },
      ],
    },
    {
      id: "PACK-LEASE-01",
      title: "Residential Agency Appointment (OFT Form 6)",
      family: "lease",
      familyLabel: "Landlord & Tenancy",
      senderName: "Sarah Jenkins",
      senderRole: "Senior Property Manager",
      senderCompany: "Place Estate Agents Kenmore",
      recipientName: "Alex & Emily (Property Owners)",
      status: "Executed & Filed",
      statusColor: "bg-[#f0f4f9] text-[#071d3b] border-[#cbd5e2]",
      summaryNote: "Exclusive Management Appointment executed under OFT Form 6. Filed into landlord vault.",
      trustlinkHref: "/trustlinks/TL-76100-C",
      items: [
        { id: "l1", title: "Executed OFT Form 6 Agency Appointment", requirement: "Required by Law", size: "2.2 MB", status: "Verified" },
        { id: "l2", title: "RTA Form 18a General Tenancy Terms Reference", requirement: "Required by Law", size: "1.4 MB", status: "Verified" },
      ],
    },
  ]);

  const pendingPacks = dealPacks.filter((p) => p.status === "Pending Action");
  const buildPacks = dealPacks.filter((p) => p.family === "build");
  const sellPacks = dealPacks.filter((p) => p.family === "sell");
  const leasePacks = dealPacks.filter((p) => p.family === "lease");
  const financePacks = dealPacks.filter((p) => p.family === "finance");
  const executedPacks = dealPacks.filter((p) => p.status === "Executed & Filed");

  // Handle Accept / Execute
  const handleExecutePack = (packId: string) => {
    setDealPacks((prev) =>
      prev.map((p) =>
        p.id === packId
          ? {
              ...p,
              status: "Executed & Filed",
              statusColor: "bg-[#eaf5ef] text-[#24754c] border-[#c7e3d1]",
            }
          : p
      )
    );

    setReviewModalPack(null);
    showToast(`Pack executed & sealed to ${property.street} sovereign passport!`);
  };

  // Handle Assemble New Pack Submit
  const handleAssembleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPackTitle.trim()) return;

    const newPack: DealPack = {
      id: `PACK-${Date.now().toString().slice(-4)}`,
      title: newPackTitle.trim(),
      family: newPackFamily,
      familyLabel:
        newPackFamily === "sell"
          ? "Sell & Disclosure"
          : newPackFamily === "lease"
          ? "Landlord & Tenancy"
          : newPackFamily === "build"
          ? "Build & Handover"
          : "Finance & Refinance",
      senderName: "Alex & Emily",
      senderRole: "Property Owner",
      senderCompany: "Owner Workspace",
      recipientName: newPackRecipient.trim() || "Unassigned Professional",
      status: "In Review",
      statusColor: "bg-[#eaf5ef] text-[#24754c] border-[#c7e3d1]",
      summaryNote: "User-assembled record pack ready for professional review.",
      trustlinkHref: property.trustlinkHref || "/trustlinks/welcome",
      items: [
        {
          id: `item-${Date.now()}-1`,
          title: "Titles Queensland Search Evidence",
          requirement: "Required by Law",
          size: "1.8 MB",
          status: "Verified",
        },
        {
          id: `item-${Date.now()}-2`,
          title: "Form 16 Statutory Signoff",
          requirement: "Required by Law",
          size: "2.4 MB",
          status: "Verified",
        },
      ],
    };

    setDealPacks([newPack, ...dealPacks]);
    setAssembleModalOpen(false);
    setNewPackTitle("");
    setNewPackRecipient("");
    showToast(`Record Pack "${newPack.title}" assembled & dispatched via TrustLink!`);
  };

  return (
    <div className="space-y-6 text-[#102645] font-sans max-w-[1080px] mx-auto pb-12">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#071d3b] text-white px-4 py-3 rounded-xl shadow-lg border border-white/10 text-xs font-semibold flex items-center gap-2 max-w-md">
          <span className="w-2 h-2 rounded-full bg-[#24754c] animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── Top Header ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#dfe6ef]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[9.5px] font-bold uppercase tracking-[1.4px] text-[#24754c]">
              TPH · Sovereign Digital Key
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#24754c]" />
            <span className="text-[10.5px] font-semibold text-[#5b6e84]">
              {property.street} ({property.propId})
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#102645]">
            Digital Key
          </h1>
          <p className="text-xs text-[#68788e] mt-1 max-w-2xl">
            One single place to complete property deals, review professional requests, approve variations, and hold verified executed records.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
          {onOpenTrustLink && (
            <button
              onClick={onOpenTrustLink}
              className="px-3 py-2 bg-white border border-[#cbd5e2] hover:bg-[#f3f6fb] text-[#102645] rounded-xl text-xs font-semibold transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>🛡️</span>
              <span>Manage TrustLinks</span>
            </button>
          )}
          <button
            onClick={() => setAssembleModalOpen(true)}
            className="px-4 py-2 bg-[#071d3b] hover:bg-[#15345d] text-white rounded-xl text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>🔑</span>
            <span>+ Assemble Record Pack</span>
          </button>
        </div>
      </div>

      {/* ── Architecture Overview Ribbon ("The Brutal Product Test") ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white border border-[#dfe6ef] rounded-xl p-3.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-[#8b641c]">
              {pendingPacks.length}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#fff4df] text-[#8b641c]">
              Needs Action
            </span>
          </div>
          <div className="text-xs font-bold text-[#102645] mt-1">Pending Decisions</div>
          <div className="text-[10.5px] text-[#68788e]">Handovers, variations &amp; signoffs</div>
        </div>

        <div className="bg-white border border-[#dfe6ef] rounded-xl p-3.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-[#102645]">
              {dealPacks.length}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f0f4f9] text-[#071d3b]">
              Active
            </span>
          </div>
          <div className="text-xs font-bold text-[#102645] mt-1">Active Record Packs</div>
          <div className="text-[10.5px] text-[#68788e]">Build, Sell, Tenancy &amp; Finance</div>
        </div>

        <div className="bg-white border border-[#dfe6ef] rounded-xl p-3.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-[#24754c]">14</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#eaf5ef] text-[#24754c]">
              Vaulted
            </span>
          </div>
          <div className="text-xs font-bold text-[#102645] mt-1">Executed Originals</div>
          <div className="text-[10.5px] text-[#68788e]">Tamper-sealed exchange history</div>
        </div>
      </div>

      {/* ── HERO SPOTLIGHT: Pending Actions Banner ─────────────────────── */}
      {pendingPacks.length > 0 && (
        <div className="bg-[#071d3b] text-white rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#efbd66] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#efbd66]">
                Decision Required ({pendingPacks.length} Pending)
              </span>
            </div>
            <span className="text-[10.5px] text-[#b9c8db]">
              Next action waiting for your review
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingPacks.map((pack) => (
              <div
                key={pack.id}
                className="bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl p-4 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[9.5px] font-bold px-2 py-0.5 rounded bg-[#efbd66] text-[#071d3b]">
                      {pack.familyLabel}
                    </span>
                    <span className="text-[10px] text-[#b9c8db] font-mono">
                      Due: {pack.dueDate || "Asap"}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-1 leading-snug">
                    {pack.title}
                  </h3>
                  <p className="text-[11.5px] text-[#b9c8db] leading-relaxed mb-3">
                    From: <strong className="text-white">{pack.senderCompany}</strong> ({pack.senderName})
                  </p>

                  {pack.financialImpact && (
                    <div className="p-2 bg-black/20 rounded-lg text-xs mb-3 flex items-center justify-between">
                      <span className="text-[#b9c8db]">Financial Effect:</span>
                      <strong className="text-[#efbd66] font-mono">{pack.financialImpact}</strong>
                    </div>
                  )}

                  <div className="text-[11px] text-[#cbd5e1] bg-black/20 p-2 rounded-lg mb-3">
                    📄 Includes {pack.items.length} files (e.g. {pack.items[0]?.title})
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                  <button
                    onClick={() => setReviewModalPack(pack)}
                    className="flex-1 px-3 py-2 bg-[#efbd66] hover:bg-[#dfac55] text-[#071d3b] text-xs font-bold rounded-lg transition-colors text-center cursor-pointer shadow-2xs"
                  >
                    Review &amp; Decide →
                  </button>
                  <Link
                    href={pack.trustlinkHref}
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    Discuss
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Pack Family Navigation Tabs ────────────────────────────────── */}
      <div className="bg-white border border-[#dfe6ef] rounded-2xl p-2 flex items-center gap-1 overflow-x-auto shadow-2xs">
        {[
          { id: "action", label: "Needs Action", badge: `${pendingPacks.length}` },
          { id: "build", label: "Build & Handover", badge: `${buildPacks.length}` },
          { id: "sell", label: "Sell & Disclosure", badge: `${sellPacks.length}` },
          { id: "lease", label: "Landlord & Tenancy", badge: `${leasePacks.length}` },
          { id: "finance", label: "Finance & Refinance", badge: `${financePacks.length}` },
          { id: "executed", label: "Executed Vault", badge: `${executedPacks.length}` },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? "bg-[#071d3b] text-white shadow-xs"
                  : "text-[#5b6e84] hover:bg-[#f3f6fb] hover:text-[#102645]"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                  isActive ? "bg-white/20 text-white" : "bg-[#edf2f7] text-[#071d3b]"
                }`}
              >
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Pack Cards List ────────────────────────────────────────────── */}
      <div className="space-y-4">
        {dealPacks
          .filter((p) => {
            if (activeTab === "action") return p.status === "Pending Action";
            if (activeTab === "build") return p.family === "build";
            if (activeTab === "sell") return p.family === "sell";
            if (activeTab === "lease") return p.family === "lease";
            if (activeTab === "finance") return p.family === "finance";
            if (activeTab === "executed") return p.status === "Executed & Filed";
            return true;
          })
          .map((pack) => (
            <div
              key={pack.id}
              className="bg-white border border-[#dfe6ef] rounded-2xl p-5 shadow-2xs hover:border-[#cbd5e1] transition-all space-y-4"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-[#dfe6ef]">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#f1f5f9] text-[#102645] border border-[#cbd5e1]">
                      {pack.id}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#f0f4f8] text-[#071d3b]">
                      {pack.familyLabel}
                    </span>
                    <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded border ${pack.statusColor}`}>
                      {pack.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#102645]">
                    {pack.title}
                  </h3>
                  <p className="text-xs text-[#5b6e84] mt-0.5">
                    Sender: <strong className="text-[#102645]">{pack.senderCompany}</strong> ({pack.senderName}) · Recipient: <strong className="text-[#102645]">{pack.recipientName}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto flex-shrink-0">
                  <button
                    onClick={() => setReviewModalPack(pack)}
                    className="px-3.5 py-1.5 bg-[#071d3b] hover:bg-[#15345d] text-white text-xs font-bold rounded-xl transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>Inspect Pack</span>
                    <span>→</span>
                  </button>
                </div>
              </div>

              {/* Summary note */}
              <p className="text-xs text-[#5b6e84] leading-relaxed bg-[#fafbfc] p-3 rounded-xl border border-[#f0f4f8]">
                {pack.summaryNote}
              </p>

              {/* Items List with PDF Brief Legal Requirement Badges */}
              <div className="space-y-2">
                <div className="text-[10.5px] font-bold text-[#68788e] uppercase tracking-wider">
                  Included Document Records ({pack.items.length} files):
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {pack.items.map((item) => {
                    const badge = getRequirementBadge(item.requirement);
                    return (
                      <div
                        key={item.id}
                        className="p-2.5 rounded-xl bg-[#f8fafc] border border-[#dfe6ef] flex items-center justify-between gap-2 text-xs"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span>📄</span>
                          <div className="min-w-0">
                            <div className="font-semibold text-[#102645] truncate">
                              {item.title}
                            </div>
                            <div className="text-[10px] text-[#8a9bb0]">
                              {item.size} · Verified original
                            </div>
                          </div>
                        </div>

                        {/* PDF Brief Rule Badge */}
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded whitespace-nowrap flex-shrink-0 ${badge.style}`}
                          title={badge.tooltip}
                        >
                          {item.requirement}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-2 border-t border-[#f0f4f8] flex items-center justify-between text-xs text-[#8a9bb0]">
                <span>Governance: Scoped TrustLink grant active</span>
                <Link
                  href={pack.trustlinkHref}
                  className="font-bold text-[#071d3b] hover:underline"
                >
                  View TrustLink Audit Trail →
                </Link>
              </div>
            </div>
          ))}
      </div>

      {/* ── Helper Explanation Banner (Zero Overwhelm) ───────────────── */}
      <div className="bg-[#f0f4f9] border border-[#cbd5e2] rounded-2xl p-4 text-xs text-[#071d3b] flex items-start gap-3">
        <span className="text-lg">💡</span>
        <div>
          <strong className="block text-[#102645] font-bold mb-0.5">
            How the Digital Key Protects You
          </strong>
          <span>
            Every original document in your Digital Key is tamper-sealed and linked directly to {property.street}. Professionals receive only the specific records you grant via TrustLink—never your full personal vault.
          </span>
        </div>
      </div>

      {/* ── MODAL 1: Inspect & Review Pack ────────────────────────────── */}
      {reviewModalPack && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#dfe6ef] rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#dfe6ef]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#24754c]">
                  {reviewModalPack.familyLabel}
                </span>
                <h3 className="text-lg font-bold text-[#102645]">
                  {reviewModalPack.title}
                </h3>
              </div>
              <button
                onClick={() => setReviewModalPack(null)}
                className="w-7 h-7 rounded-full bg-[#f4f6f8] text-[#5b6e84] hover:bg-[#e2eaf4] flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-[#f8fafc] p-3 rounded-xl border border-[#dfe6ef] space-y-1">
                <div>
                  Sender: <strong className="text-[#102645]">{reviewModalPack.senderCompany}</strong> ({reviewModalPack.senderName})
                </div>
                <div>
                  Recipient: <strong className="text-[#102645]">{reviewModalPack.recipientName}</strong>
                </div>
                <div>
                  Status: <span className="font-bold text-[#24754c]">{reviewModalPack.status}</span>
                </div>
              </div>

              <p className="text-[#5b6e84] leading-relaxed">
                {reviewModalPack.summaryNote}
              </p>

              {reviewModalPack.financialImpact && (
                <div className="p-3 bg-[#fffaf0] border border-[#fce3b8] rounded-xl flex items-center justify-between font-bold text-xs text-[#8b641c]">
                  <span>Priced Effect: {reviewModalPack.financialImpact}</span>
                  <span>Timeline Effect: {reviewModalPack.timelineImpact}</span>
                </div>
              )}

              <div className="space-y-2">
                <div className="font-bold text-[#102645]">
                  Document Manifest ({reviewModalPack.items.length} files):
                </div>
                {reviewModalPack.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-lg border border-[#dfe6ef] bg-[#f4f6f8] flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span>📄</span>
                      <span className="font-semibold text-[#102645]">{item.title}</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-white text-[#24754c] border rounded">
                      {item.requirement}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-[#eaf5ef] rounded-xl border border-[#c7e3d1] text-[11px] text-[#24754c]">
                ✓ Tamper-evident hash verified. Executing this pack files a permanent copy to your Digital Key vault and notifies the sender via TrustLink.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReviewModalPack(null)}
                  className="px-4 py-2 bg-white border border-[#cbd5e2] text-[#5b6e84] rounded-xl font-semibold hover:bg-[#f4f6f8] cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => handleExecutePack(reviewModalPack.id)}
                  className="px-4 py-2 bg-[#071d3b] hover:bg-[#15345d] text-white font-bold rounded-xl transition-colors shadow-xs cursor-pointer"
                >
                  Accept &amp; Seal Pack →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 2: Assemble Record Pack ─────────────────────────────── */}
      {assembleModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#dfe6ef] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#dfe6ef]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#24754c]">
                  Pack Generation Engine
                </span>
                <h3 className="text-lg font-bold text-[#102645]">
                  Assemble Record Pack
                </h3>
              </div>
              <button
                onClick={() => setAssembleModalOpen(false)}
                className="w-7 h-7 rounded-full bg-[#f4f6f8] text-[#5b6e84] hover:bg-[#e2eaf4] flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAssembleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-[#102645] mb-1">
                  1. Select Pack Family
                </label>
                <select
                  value={newPackFamily}
                  onChange={(e) => setNewPackFamily(e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#f4f6f8] border border-[#dfe6ef] rounded-xl text-xs text-[#102645]"
                >
                  <option value="sell">Sell &amp; Disclosure (Seller Pack)</option>
                  <option value="build">Build &amp; Handover (Construction Pack)</option>
                  <option value="lease">Landlord &amp; Tenancy (Rental Pack)</option>
                  <option value="finance">Finance &amp; Refinance (Borrower Pack)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#102645] mb-1">
                  2. Pack Title *
                </label>
                <input
                  type="text"
                  required
                  value={newPackTitle}
                  onChange={(e) => setNewPackTitle(e.target.value)}
                  placeholder="e.g. Pre-Sale Form 2 Disclosure & Title Pack"
                  className="w-full px-3 py-2 bg-[#f4f6f8] border border-[#dfe6ef] rounded-xl text-xs text-[#102645]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#102645] mb-1">
                  3. Recipient Professional / Firm
                </label>
                <input
                  type="text"
                  value={newPackRecipient}
                  onChange={(e) => setNewPackRecipient(e.target.value)}
                  placeholder="e.g. River City Conveyancing (Lachlan Vance)"
                  className="w-full px-3 py-2 bg-[#f4f6f8] border border-[#dfe6ef] rounded-xl text-xs text-[#102645]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#102645] mb-1.5">
                  4. Select Included Documents from Vault
                </label>
                <div className="space-y-2 p-3 bg-[#f8fafc] rounded-xl border border-[#dfe6ef]">
                  {[
                    { id: "doc-1", title: "QBCC Form 16 Structural Engineering Final", tag: "Required by Law" },
                    { id: "doc-2", title: "Form 43 Wet-Area Waterproofing Certificate", tag: "Required by Law" },
                    { id: "doc-3", title: "Termimesh Pest Management Certificate (AS 3660.1)", tag: "Required by Law" },
                    { id: "doc-4", title: "Titles Queensland Search Evidence", tag: "Required by Law" },
                    { id: "doc-5", title: "Appliance Care & Warranties Schedule", tag: "Optional" },
                  ].map((doc) => (
                    <label key={doc.id} className="flex items-center justify-between gap-2 cursor-pointer p-1 rounded hover:bg-[#f0f4f8]">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded border-[#cbd5e1] text-[#071d3b]" />
                        <span className="font-semibold text-[#102645]">{doc.title}</span>
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#eaf5ef] text-[#24754c] rounded border">
                        {doc.tag}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-[#eaf5ef] rounded-xl border border-[#c7e3d1] text-[11px] text-[#24754c]">
                🔑 When created, the recipient receives a scoped grant via TrustLink. You can revoke access at any time.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAssembleModalOpen(false)}
                  className="px-4 py-2 bg-white border border-[#cbd5e2] text-[#5b6e84] rounded-xl font-semibold hover:bg-[#f4f6f8] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#071d3b] hover:bg-[#15345d] text-white font-bold rounded-xl transition-colors shadow-xs cursor-pointer"
                >
                  Freeze &amp; Issue Pack →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
