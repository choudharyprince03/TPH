"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PropertyData } from "@/lib/properties";

interface DigitalKeyViewProps {
  property: PropertyData;
  onOpenTrustLink?: () => void;
}

type PackFamily = "all" | "build" | "handover" | "seller" | "lease" | "finance";

interface DealPack {
  id: string;
  family: "build" | "handover" | "seller" | "lease" | "finance";
  familyLabel: string;
  familyIcon: string;
  title: string;
  counterparty: string;
  counterpartyRole: string;
  trustlinkId: string;
  trustlinkHref: string;
  status: "Action Required" | "In Review" | "Signed & Sealed" | "Draft Assembled";
  statusColor: string;
  summary: string;
  financialImpact?: string;
  timeImpact?: string;
  manifest: {
    title: string;
    labelType: "law" | "conditional" | "pro" | "optional";
    labelText: string;
    labelColor: string;
    status: "Verified" | "Pending Sign" | "Draft" | "Sealed";
  }[];
  loopStep: 1 | 2 | 3 | 4; // 1: Assembled, 2: Review, 3: Signing, 4: Sealed
  lastUpdated: string;
}

const INITIAL_DEAL_PACKS: DealPack[] = [
  {
    id: "PACK-BLD-004",
    family: "build",
    familyLabel: "Build & Change",
    familyIcon: "🏗️",
    title: "Priced Variation Notice #04 · Kitchen Stone Upgrade",
    counterparty: "Olivia Hart",
    counterpartyRole: "Builder · Hart Homes (QBCC #150821)",
    trustlinkId: "TL-99214-B",
    trustlinkHref: "/trustlinks/TL-99214-B",
    status: "Action Required",
    statusColor: "bg-[#fff4df] text-[#8b641c] border-[#fce3b8]",
    summary: "Caesarstone Pure White 40mm island benchtop upgrade with waterfall ends. QBCC s83 variation agreement.",
    financialImpact: "+$1,400 AUD (inc. GST)",
    timeImpact: "+2 business days delay",
    manifest: [
      {
        title: "QBCC Form 4 Variation Agreement Schedule",
        labelType: "law",
        labelText: "Required by Law",
        labelColor: "bg-[#fef2f2] text-[#991b1b] border-[#fecaca]",
        status: "Pending Sign",
      },
      {
        title: "Caesarstone Pure White Specification Sheet & Warranty",
        labelType: "pro",
        labelText: "Requested by Pro",
        labelColor: "bg-[#f0f4f9] text-[#071d3b] border-[#cbd5e2]",
        status: "Verified",
      },
      {
        title: "Kitchen Island Joinery As-Built Shop Drawings",
        labelType: "optional",
        labelText: "Optional Supporting",
        labelColor: "bg-[#f8fafc] text-[#5b6e84] border-[#e2e8f0]",
        status: "Verified",
      },
    ],
    loopStep: 3,
    lastUpdated: "Today 10:14 AM",
  },
  {
    id: "PACK-HND-018",
    family: "handover",
    familyLabel: "Service & Handover",
    familyIcon: "📦",
    title: "Practical Completion & Statutory Handover Bundle",
    counterparty: "Hart Homes & Certifiers",
    counterpartyRole: "Head Contractor & QBCC Subcontractors",
    trustlinkId: "TL-99214-B",
    trustlinkHref: "/trustlinks/TL-99214-B",
    status: "Action Required",
    statusColor: "bg-[#eaf5ef] text-[#24754c] border-[#c7e3d1]",
    summary: "14 statutory compliance certificates, warranties, and maintenance manuals compiled for sovereign handover.",
    manifest: [
      {
        title: "QBCC Form 16 Structural Engineering Final (Elena Rostova)",
        labelType: "law",
        labelText: "Required by Law",
        labelColor: "bg-[#fef2f2] text-[#991b1b] border-[#fecaca]",
        status: "Verified",
      },
      {
        title: "Form 43 Wet-Area Waterproofing Certificate (Dave Miller)",
        labelType: "law",
        labelText: "Required by Law",
        labelColor: "bg-[#fef2f2] text-[#991b1b] border-[#fecaca]",
        status: "Verified",
      },
      {
        title: "AS 3660.1 Termite Barrier System Notice (Flick Pest)",
        labelType: "conditional",
        labelText: "Conditional Legal",
        labelColor: "bg-[#fff7ed] text-[#c2410c] border-[#fed7aa]",
        status: "Verified",
      },
      {
        title: "Electrical Safety Certificate Form 16 (Lachlan Vance)",
        labelType: "law",
        labelText: "Required by Law",
        labelColor: "bg-[#fef2f2] text-[#991b1b] border-[#fecaca]",
        status: "Verified",
      },
    ],
    loopStep: 2,
    lastUpdated: "Yesterday 4:30 PM",
  },
  {
    id: "PACK-DIS-002",
    family: "seller",
    familyLabel: "Seller Disclosure",
    familyIcon: "🏡",
    title: "Queensland Seller Disclosure Pack (Form 2 Prep)",
    counterparty: "Lachlan Vance",
    counterpartyRole: "Licensed Conveyancer · River City Conveyancing",
    trustlinkId: "TL-88301-A",
    trustlinkHref: "/trustlinks/TL-88301-A",
    status: "In Review",
    statusColor: "bg-[#f0f4f9] text-[#071d3b] border-[#cbd5e2]",
    summary: "Pre-sale disclosure manifest under the Queensland Seller Disclosure Scheme (effective 1 Aug 2025).",
    manifest: [
      {
        title: "QLD Seller Disclosure Statement Draft (Form 2)",
        labelType: "law",
        labelText: "Required by Law",
        labelColor: "bg-[#fef2f2] text-[#991b1b] border-[#fecaca]",
        status: "Draft",
      },
      {
        title: "Current Title Search & Registered Survey Plan",
        labelType: "law",
        labelText: "Required by Law",
        labelColor: "bg-[#fef2f2] text-[#991b1b] border-[#fecaca]",
        status: "Verified",
      },
      {
        title: "Pool Safety Certificate (Form 23)",
        labelType: "conditional",
        labelText: "Conditional Legal",
        labelColor: "bg-[#fff7ed] text-[#c2410c] border-[#fed7aa]",
        status: "Verified",
      },
      {
        title: "Recent Council Rates & Water Infrastructure Notice",
        labelType: "optional",
        labelText: "Optional Supporting",
        labelColor: "bg-[#f8fafc] text-[#5b6e84] border-[#e2e8f0]",
        status: "Verified",
      },
    ],
    loopStep: 2,
    lastUpdated: "22 Sep 2026",
  },
  {
    id: "PACK-LSE-001",
    family: "lease",
    familyLabel: "Appoint & Lease",
    familyIcon: "🔑",
    title: "Residential Property Management Appointment (Form 6)",
    counterparty: "Graceville Real Estate",
    counterpartyRole: "Licensed Managing Agent (OFT #44102)",
    trustlinkId: "TL-99214-B",
    trustlinkHref: "/trustlinks/TL-99214-B",
    status: "Signed & Sealed",
    statusColor: "bg-[#eaf5ef] text-[#24754c] border-[#c7e3d1]",
    summary: "Executed OFT Form 6 agency appointment with scheduled inspection authority and fee schedule.",
    manifest: [
      {
        title: "OFT Form 6 Appointment to Act as Property Agent",
        labelType: "law",
        labelText: "Required by Law",
        labelColor: "bg-[#fef2f2] text-[#991b1b] border-[#fecaca]",
        status: "Sealed",
      },
      {
        title: "RTA Form 18a General Tenancy Agreement Standard Terms",
        labelType: "conditional",
        labelText: "Conditional Legal",
        labelColor: "bg-[#fff7ed] text-[#c2410c] border-[#fed7aa]",
        status: "Sealed",
      },
    ],
    loopStep: 4,
    lastUpdated: "14 Sep 2026",
  },
];

export function DigitalKeyView({ property, onOpenTrustLink }: DigitalKeyViewProps) {
  const [dealPacks, setDealPacks] = useState<DealPack[]>(INITIAL_DEAL_PACKS);
  const [activeFamilyFilter, setActiveFamilyFilter] = useState<PackFamily>("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Privacy drawer state
  const [privacyDrawerOpen, setPrivacyDrawerOpen] = useState(false);

  // Transfer drawer state
  const [transferOpen, setTransferOpen] = useState(false);

  // Modals
  const [reviewSignModalPack, setReviewSignModalPack] = useState<DealPack | null>(null);
  const [inspectHandoverModalOpen, setInspectHandoverModalOpen] = useState(false);
  const [createPackModalOpen, setCreatePackModalOpen] = useState(false);

  // Create pack state
  const [newPackType, setNewPackType] = useState<"seller" | "build" | "lease" | "finance">("seller");
  const [newPackTitle, setNewPackTitle] = useState("");
  const [newPackRecipient, setNewPackRecipient] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredPacks = dealPacks.filter((p) => {
    if (activeFamilyFilter === "all") return true;
    return p.family === activeFamilyFilter;
  });

  const handleSignVariation = (packId: string) => {
    setDealPacks((prev) =>
      prev.map((p) =>
        p.id === packId
          ? {
              ...p,
              status: "Signed & Sealed",
              statusColor: "bg-[#eaf5ef] text-[#24754c] border-[#c7e3d1]",
              loopStep: 4,
              lastUpdated: "Just now",
              manifest: p.manifest.map((m) => ({
                ...m,
                status: "Sealed",
              })),
            }
          : p
      )
    );
    setReviewSignModalPack(null);
    showToast("Signed & Executed! QBCC Variation Notice #04 has been sealed into your Digital Key vault.");
  };

  const handleAcceptHandover = () => {
    setDealPacks((prev) =>
      prev.map((p) =>
        p.id === "PACK-HND-018"
          ? {
              ...p,
              status: "Signed & Sealed",
              statusColor: "bg-[#eaf5ef] text-[#24754c] border-[#c7e3d1]",
              loopStep: 4,
              lastUpdated: "Just now",
            }
          : p
      )
    );
    setInspectHandoverModalOpen(false);
    showToast("Handover bundle accepted! 14 statutory certificates are permanently sealed to 18 Banksia Crescent.");
  };

  const handleCreateNewPack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPackTitle.trim()) return;

    const newDeal: DealPack = {
      id: `PACK-${Date.now().toString().slice(-4)}`,
      family: newPackType,
      familyLabel:
        newPackType === "seller"
          ? "Seller Disclosure"
          : newPackType === "build"
          ? "Build & Change"
          : newPackType === "lease"
          ? "Appoint & Lease"
          : "Finance & Mortgage",
      familyIcon:
        newPackType === "seller"
          ? "🏡"
          : newPackType === "build"
          ? "🏗️"
          : newPackType === "lease"
          ? "🔑"
          : "🏦",
      title: newPackTitle.trim(),
      counterparty: newPackRecipient.trim() || "Verified Professional via TrustLink",
      counterpartyRole: "Professional Counterparty",
      trustlinkId: property.trustlinkId || "TL-99214-B",
      trustlinkHref: property.trustlinkHref || "/trustlinks/TL-99214-B",
      status: "Draft Assembled",
      statusColor: "bg-[#f0f4f9] text-[#071d3b] border-[#cbd5e2]",
      summary: "Draft deal pack assembled by property owner under sovereign Digital Key governance.",
      manifest: [
        {
          title: "Primary Matter Document Draft",
          labelType: "law",
          labelText: "Required by Law",
          labelColor: "bg-[#fef2f2] text-[#991b1b] border-[#fecaca]",
          status: "Draft",
        },
        {
          title: "Supporting Evidence & Authorised Records",
          labelType: "pro",
          labelText: "Requested by Pro",
          labelColor: "bg-[#f0f4f9] text-[#071d3b] border-[#cbd5e2]",
          status: "Verified",
        },
      ],
      loopStep: 1,
      lastUpdated: "Just now",
    };

    setDealPacks([newDeal, ...dealPacks]);
    setCreatePackModalOpen(false);
    setNewPackTitle("");
    setNewPackRecipient("");
    showToast(`Deal pack "${newDeal.title}" assembled! Ready for counterparty review in TrustLink.`);
  };

  const pendingActionCount = dealPacks.filter((p) => p.status === "Action Required").length;

  return (
    <div className="space-y-6 text-[#102645] font-sans max-w-[1080px] mx-auto pb-16">
      
      {/* ── Toast Feedback ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 bg-[#071d3b] text-white px-4 py-3 rounded-xl shadow-xl border border-white/10 text-xs font-semibold flex items-center gap-2 max-w-md"
          >
            <span className="w-2 h-2 rounded-full bg-[#24754c] animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Top Header: Identity & Sovereignty ─────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pt-1 pb-2 border-b border-[#dfe6ef]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[9.5px] font-bold uppercase tracking-[1.4px] text-[#24754c]">
              Digital Key · Sovereign Record
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#24754c]" />
            <span className="text-[10px] font-mono text-[#5b6e84]">
              {property.propId}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#102645]">
            Digital Key
          </h1>
          <p className="text-xs text-[#68788e] mt-1 max-w-2xl leading-relaxed">
            The place to complete property deals. Assemble professional packs, review original contracts, make signing decisions, and keep permanent executed copies.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
          <button
            onClick={() => setPrivacyDrawerOpen(!privacyDrawerOpen)}
            className="px-3.5 py-2 bg-white border border-[#cbd5e2] hover:bg-[#f3f6fb] text-[#102645] rounded-xl text-xs font-semibold transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>🔒</span>
            <span>Privacy Boundaries</span>
          </button>
          <button
            onClick={() => setCreatePackModalOpen(true)}
            className="px-4 py-2 bg-[#071d3b] hover:bg-[#15345d] text-white rounded-xl text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>+ Assemble Deal Pack</span>
          </button>
        </div>
      </div>

      {/* ── 4 Reassuring Metrics Tiles ─────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white border border-[#dfe6ef] rounded-xl p-3.5 shadow-2xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#68788e]">
            Active Deal Packs
          </div>
          <div className="text-2xl font-bold text-[#102645] mt-0.5">
            {dealPacks.length}
          </div>
          <div className="text-[10.5px] text-[#24754c] font-medium mt-0.5">
            Build, handover, disclosure &amp; lease
          </div>
        </div>

        <div className="bg-white border border-[#dfe6ef] rounded-xl p-3.5 shadow-2xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#8b641c]">
            Needs Your Decision
          </div>
          <div className="text-2xl font-bold text-[#8b641c] mt-0.5">
            {pendingActionCount} {pendingActionCount === 1 ? "Action" : "Actions"}
          </div>
          <div className="text-[10.5px] text-[#8b641c] font-medium mt-0.5">
            Awaiting signing or acceptance
          </div>
        </div>

        <div className="bg-white border border-[#dfe6ef] rounded-xl p-3.5 shadow-2xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#24754c]">
            Sealed Originals
          </div>
          <div className="text-2xl font-bold text-[#24754c] mt-0.5">
            14 Files
          </div>
          <div className="text-[10.5px] text-[#5b6e84] font-medium mt-0.5">
            Form 16/43 &amp; statutory warranties
          </div>
        </div>

        <div className="bg-white border border-[#dfe6ef] rounded-xl p-3.5 shadow-2xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#071d3b]">
            Privacy Partition
          </div>
          <div className="text-2xl font-bold text-[#071d3b] mt-0.5">
            100% Isolated
          </div>
          <div className="text-[10.5px] text-[#5b6e84] font-medium mt-0.5">
            Personal finance excluded from title
          </div>
        </div>
      </div>

      {/* ── Privacy Partition Explanation Banner (Page 9 of Brief) ────── */}
      <AnimatePresence>
        {privacyDrawerOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-[#f0f7f3] border border-[#c7e4d0] rounded-2xl p-5 text-xs text-[#1e3a2f] space-y-3 shadow-2xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#c7e4d0]">
                <div className="flex items-center gap-2">
                  <span className="text-base">🛡️</span>
                  <strong className="text-sm font-bold text-[#102645]">
                    A Shared Property Does Not Mean a Shared Vault
                  </strong>
                </div>
                <button
                  onClick={() => setPrivacyDrawerOpen(false)}
                  className="text-xs text-[#527965] hover:text-[#102645] font-semibold cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="bg-white/80 rounded-xl p-3.5 border border-[#c7e4d0] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[#24754c] font-bold">
                    <span>🏠</span>
                    <span>Transferable Property Passport (Transfers at Sale)</span>
                  </div>
                  <p className="text-[11.5px] text-[#5b6e84] leading-relaxed">
                    Statutory Form 16/43 certs, waterproofing records, council approvals, appliance warranties, and as-built plans. These stay with the physical property to protect its market value.
                  </p>
                </div>

                <div className="bg-white/80 rounded-xl p-3.5 border border-[#cbd5e2] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[#071d3b] font-bold">
                    <span>🔒</span>
                    <span>Strictly Private to You (Never Transferred)</span>
                  </div>
                  <p className="text-[11.5px] text-[#5b6e84] leading-relaxed">
                    Mortgage documents, bank statements, personal ID, tax file numbers, private repair invoices, and tenancy histories. These remain permanently isolated and are never passed to buyers or renters.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PRIORITY ACTION BANNER: "Needs Your Action" ────────────────── */}
      {dealPacks.some((p) => p.status === "Action Required") && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#efbd66] animate-pulse" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#102645]">
              Decisions Waiting For You (Action Hub)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Action 1: Builder Variation Notice #04 */}
            {dealPacks.find((p) => p.id === "PACK-BLD-004" && p.status === "Action Required") && (
              <div className="bg-white border-2 border-[#efbd66] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[9.5px] font-bold uppercase tracking-[1.4px] text-[#8b641c] flex items-center gap-1">
                      <span>🏗️</span> Build &amp; Change Decision
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#fff4df] text-[#8b641c] border border-[#fce3b8]">
                      Sign Decision Pending
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#102645] mb-1">
                    Variation Notice #04: Caesarstone Kitchen Island
                  </h3>
                  <p className="text-xs text-[#5b6e84] mb-3 leading-relaxed">
                    Hart Homes submitted priced variation. Written agreement precedes physical work under QBCC contract rules.
                  </p>

                  <div className="p-3 bg-[#f8fafc] border border-[#dfe6ef] rounded-xl text-xs space-y-1 mb-4">
                    <div className="flex justify-between">
                      <span className="text-[#68788e]">Price Effect:</span>
                      <strong className="text-[#102645]">+$1,400 AUD inc. GST</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#68788e]">Schedule Delay:</span>
                      <strong className="text-[#102645]">+2 business days</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#68788e]">Pro Contact:</span>
                      <span className="text-[#071d3b] font-medium">Olivia Hart (Builder)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-[#f0f4f8] flex-wrap">
                  <button
                    onClick={() => setReviewSignModalPack(dealPacks.find((p) => p.id === "PACK-BLD-004") || null)}
                    className="flex-1 px-4 py-2 bg-[#071d3b] hover:bg-[#15345d] text-white text-xs font-bold rounded-xl transition-colors shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>✍️ Review &amp; Sign</span>
                    <span>→</span>
                  </button>
                  <Link
                    href="/trustlinks/TL-99214-B?tab=conversation"
                    className="px-3 py-2 bg-white border border-[#cbd5e2] hover:bg-[#f3f6fb] text-[#102645] text-xs font-semibold rounded-xl transition-colors"
                  >
                    Ask Olivia
                  </Link>
                  <button
                    onClick={() => {
                      if (confirm("Decline Variation #04? Hart Homes will be notified to proceed with default contract specification.")) {
                        showToast("Variation declined. Default builder specification retained.");
                      }
                    }}
                    className="px-3 py-2 text-[#a44042] hover:bg-[#fef2f2] text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Decline
                  </button>
                </div>
              </div>
            )}

            {/* Action 2: Builder Handover Bundle */}
            {dealPacks.find((p) => p.id === "PACK-HND-018" && p.status === "Action Required") && (
              <div className="bg-white border-2 border-[#24754c] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[9.5px] font-bold uppercase tracking-[1.4px] text-[#24754c] flex items-center gap-1">
                      <span>📦</span> Practical Completion Handover
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#eaf5ef] text-[#24754c] border border-[#c7e3d1]">
                      14 Certs Ready
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#102645] mb-1">
                    Hart Homes Handover Pack &amp; Warranties
                  </h3>
                  <p className="text-xs text-[#5b6e84] mb-3 leading-relaxed">
                    Form 16 Structural, Form 43 Waterproofing, Termimesh 50-Yr Warranty, and Electrical certs compiled for client acceptance.
                  </p>

                  <div className="p-3 bg-[#f8fafc] border border-[#dfe6ef] rounded-xl text-xs space-y-1 mb-4">
                    <div className="flex justify-between">
                      <span className="text-[#68788e]">Licence:</span>
                      <strong className="text-[#102645]">QBCC #150821</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#68788e]">Records Attached:</span>
                      <strong className="text-[#24754c]">14 Verified Files</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#68788e]">Status:</span>
                      <span className="text-[#24754c] font-semibold">Ready to seal into sovereign passport</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-[#f0f4f8] flex-wrap">
                  <button
                    onClick={handleAcceptHandover}
                    className="flex-1 px-4 py-2 bg-[#24754c] hover:bg-[#1e603e] text-white text-xs font-bold rounded-xl transition-colors shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>✓ Accept &amp; Seal to Passport</span>
                  </button>
                  <button
                    onClick={() => setInspectHandoverModalOpen(true)}
                    className="px-3 py-2 bg-white border border-[#cbd5e2] hover:bg-[#f3f6fb] text-[#102645] text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Inspect 14 Records
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ── Pack Families Workspace ────────────────────────────────────── */}
      <div className="space-y-4">
        
        {/* Navigation & Category Filter Pills */}
        <div className="flex items-center justify-between gap-3 flex-wrap border-b border-[#dfe6ef] pb-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {[
              { id: "all", label: "All Deal Packs", count: dealPacks.length },
              { id: "build", label: "Build & Change", count: dealPacks.filter((p) => p.family === "build").length },
              { id: "handover", label: "Service & Handover", count: dealPacks.filter((p) => p.family === "handover").length },
              { id: "seller", label: "Seller Disclosure", count: dealPacks.filter((p) => p.family === "seller").length },
              { id: "lease", label: "Appoint & Lease", count: dealPacks.filter((p) => p.family === "lease").length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFamilyFilter(tab.id as PackFamily)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeFamilyFilter === tab.id
                    ? "bg-[#071d3b] text-white shadow-xs"
                    : "bg-[#f4f6f8] text-[#5b6e84] hover:bg-[#e8edf2] hover:text-[#102645]"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    activeFamilyFilter === tab.id
                      ? "bg-white/20 text-white"
                      : "bg-[#dfe6ef] text-[#071d3b]"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <span className="text-xs text-[#68788e] font-medium hidden sm:inline">
            Showing {filteredPacks.length} records
          </span>
        </div>

        {/* List of Deal Packs */}
        <div className="space-y-4">
          {filteredPacks.map((pack) => (
            <div
              key={pack.id}
              className="bg-white border border-[#dfe6ef] rounded-2xl p-5 shadow-2xs hover:border-[#cbd5e1] transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                
                {/* Left: Pack Details & Manifest */}
                <div className="space-y-2.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-base">{pack.familyIcon}</span>
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#f1f5f9] text-[#102645] border border-[#cbd5e1]">
                      {pack.id}
                    </span>
                    <span className="text-[10.5px] font-bold text-[#5b6e84]">
                      {pack.familyLabel}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${pack.statusColor}`}>
                      {pack.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#102645]">
                    {pack.title}
                  </h3>
                  
                  <p className="text-xs text-[#5b6e84] leading-relaxed">
                    {pack.summary}
                  </p>

                  <div className="text-[11px] text-[#68788e]">
                    Counterparty: <strong className="text-[#102645]">{pack.counterparty}</strong> ({pack.counterpartyRole})
                  </div>

                  {/* Document Manifest with the 4 Statutory Requirement Badges from Brief */}
                  <div className="pt-2">
                    <div className="text-[10.5px] font-bold text-[#68788e] uppercase tracking-wider mb-2">
                      Included Manifest ({pack.manifest.length} items):
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {pack.manifest.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 bg-[#f8fafc] border border-[#dfe6ef] rounded-xl flex items-center justify-between gap-2"
                        >
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-[#102645] truncate">
                              {item.title}
                            </div>
                            <span className={`inline-block text-[9px] font-bold px-1.5 py-0.2 rounded border mt-0.5 ${item.labelColor}`}>
                              {item.labelText}
                            </span>
                          </div>
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${
                              item.status === "Sealed" || item.status === "Verified"
                                ? "bg-[#eaf5ef] text-[#24754c]"
                                : "bg-[#fff4df] text-[#8b641c]"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4-Step Lifecycle Loop Stepper (Page 8 of Brief) */}
                  <div className="pt-2">
                    <div className="text-[10px] font-bold text-[#68788e] uppercase tracking-wider mb-1.5">
                      Exchange Loop Status:
                    </div>
                    <div className="flex items-center gap-1.5 text-[10.5px]">
                      <span className={`px-2 py-0.5 rounded font-semibold ${pack.loopStep >= 1 ? "bg-[#eaf5ef] text-[#24754c]" : "bg-[#f4f6f8] text-[#8a9bb0]"}`}>
                        1. Assembled ✓
                      </span>
                      <span className="text-[#cbd5e2]">→</span>
                      <span className={`px-2 py-0.5 rounded font-semibold ${pack.loopStep >= 2 ? "bg-[#eaf5ef] text-[#24754c]" : "bg-[#f4f6f8] text-[#8a9bb0]"}`}>
                        2. In Review {pack.loopStep >= 2 ? "✓" : ""}
                      </span>
                      <span className="text-[#cbd5e2]">→</span>
                      <span className={`px-2 py-0.5 rounded font-semibold ${pack.loopStep >= 3 ? (pack.loopStep === 3 ? "bg-[#fff4df] text-[#8b641c] font-bold" : "bg-[#eaf5ef] text-[#24754c]") : "bg-[#f4f6f8] text-[#8a9bb0]"}`}>
                        3. Signing Decision {pack.loopStep >= 4 ? "✓" : ""}
                      </span>
                      <span className="text-[#cbd5e2]">→</span>
                      <span className={`px-2 py-0.5 rounded font-semibold ${pack.loopStep >= 4 ? "bg-[#071d3b] text-white" : "bg-[#f4f6f8] text-[#8a9bb0]"}`}>
                        4. Sealed to Vault
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end gap-2 flex-shrink-0 pt-2 lg:pt-0">
                  {pack.status === "Action Required" && pack.id === "PACK-BLD-004" ? (
                    <button
                      onClick={() => setReviewSignModalPack(pack)}
                      className="px-4 py-2 bg-[#071d3b] hover:bg-[#15345d] text-white text-xs font-bold rounded-xl transition-colors shadow-2xs text-center cursor-pointer"
                    >
                      ✍️ Review &amp; Sign
                    </button>
                  ) : pack.status === "Action Required" && pack.id === "PACK-HND-018" ? (
                    <button
                      onClick={handleAcceptHandover}
                      className="px-4 py-2 bg-[#24754c] hover:bg-[#1e603e] text-white text-xs font-bold rounded-xl transition-colors shadow-2xs text-center cursor-pointer"
                    >
                      ✓ Accept Handover
                    </button>
                  ) : null}

                  <Link
                    href={pack.trustlinkHref}
                    className="px-3.5 py-1.5 bg-[#f4f6f8] hover:bg-[#e8edf2] text-[#071d3b] text-xs font-semibold rounded-lg border border-[#dfe6ef] transition-colors text-center flex items-center justify-center gap-1"
                  >
                    <span>🛡️ Manage in TrustLink</span>
                    <span>→</span>
                  </Link>

                  <button
                    onClick={() => showToast(`Exported immutable manifest for ${pack.id}`)}
                    className="px-3.5 py-1.5 text-[#5b6e84] hover:text-[#102645] text-xs font-medium transition-colors text-center cursor-pointer"
                  >
                    Download Manifest JSON
                  </button>

                  <span className="text-[10px] text-[#8a9bb0] text-right mt-1">
                    Updated {pack.lastUpdated}
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Collapsible Transfer property record (Settlement Gate) ──────── */}
      <div className="bg-white border border-[#dfe6ef] rounded-2xl overflow-hidden shadow-2xs transition-all">
        <button
          onClick={() => setTransferOpen(!transferOpen)}
          className="w-full p-4 sm:p-5 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-[#102645] hover:bg-[#f8fafc] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="text-base">🤝</span>
            <span>Transfer Property Record to New Owner (Settlement)</span>
          </div>
          <span className="text-xs text-[#5b6e84] font-normal">
            {transferOpen ? "Hide" : "Show Settlement Gate ▾"}
          </span>
        </button>

        {transferOpen && (
          <div className="px-5 pb-5 pt-1 border-t border-[#dfe6ef] space-y-4">
            <p className="text-xs text-[#5b6e84] leading-relaxed">
              Transferring hands over permanent title to the new homeowner, including building certificates, Form 16/43 certs, warranties, and equipment logbooks. Personal borrower records and private finances are automatically unlinked and scrubbed.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                showToast(`Settlement transfer token created for ${property.street}. Conveyancer notified.`);
                setTransferOpen(false);
              }}
              className="space-y-3 max-w-lg bg-[#f8fafc] p-4 rounded-xl border border-[#dfe6ef] text-xs"
            >
              <div>
                <label className="block font-bold text-[#102645] mb-1">
                  New Owner Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance"
                  className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-xs text-[#102645] focus:outline-none focus:border-[#071d3b]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#102645] mb-1">
                  New Owner Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. eleanor.vance@example.com"
                  className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-xs text-[#102645] focus:outline-none focus:border-[#071d3b]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#102645] mb-1">
                    Settlement Date
                  </label>
                  <input
                    type="date"
                    required
                    defaultValue="2026-10-15"
                    className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-xs text-[#102645] focus:outline-none focus:border-[#071d3b]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#102645] mb-1">
                    Conveyancer Ref #
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. CNV-2026-88"
                    className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-xs text-[#102645] focus:outline-none focus:border-[#071d3b]"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[10px] text-[#64748b]">
                  Requires two-factor authentication to finalize.
                </span>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#071d3b] hover:bg-[#15345d] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-2xs"
                >
                  Initiate Settlement Transfer
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* ── MODAL 1: Review & Sign Variation Notice #04 ────────────────── */}
      {reviewSignModalPack && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-[#dfe6ef] rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#dfe6ef]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8b641c]">
                  QBCC Statutory Variation Signing
                </span>
                <h3 className="text-lg font-bold text-[#102645]">
                  Review &amp; Sign Contract Variation #04
                </h3>
              </div>
              <button
                onClick={() => setReviewSignModalPack(null)}
                className="w-7 h-7 rounded-full bg-[#f4f6f8] text-[#5b6e84] hover:bg-[#e2eaf4] flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-[#102645]">
              <div className="bg-[#f8fafc] border border-[#dfe6ef] rounded-xl p-3.5 space-y-2">
                <div className="font-bold text-[#102645]">
                  Item Description &amp; Scope
                </div>
                <p className="text-[#5b6e84] leading-relaxed">
                  Upgrade kitchen island benchtop from standard 20mm builder range laminate to 40mm engineered Caesarstone (Pure White) with 40mm mitred waterfall edge finishes and undermount sink cut-out.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#fffaf0] border border-[#fce3b8] rounded-xl">
                  <div className="text-[10px] uppercase font-bold text-[#8b641c]">Price Adjustment</div>
                  <div className="text-base font-bold text-[#102645] mt-0.5">+$1,400 AUD inc. GST</div>
                  <div className="text-[10px] text-[#68788e]">Payable at practical completion stage</div>
                </div>

                <div className="p-3 bg-[#f0f4f9] border border-[#cbd5e2] rounded-xl">
                  <div className="text-[10px] uppercase font-bold text-[#071d3b]">Schedule Delay Effect</div>
                  <div className="text-base font-bold text-[#071d3b] mt-0.5">+2 Business Days</div>
                  <div className="text-[10px] text-[#68788e]">Stonemason fabrication window</div>
                </div>
              </div>

              <div className="p-3 bg-[#f0f7f3] border border-[#c7e4d0] rounded-xl text-[11px] text-[#24754c] leading-relaxed">
                ⚖️ <strong>QBCC Compliance Notice:</strong> By signing below, you agree to this variation in writing prior to work commencing in accordance with Queensland Building and Construction Commission requirements. Executed copy will be permanently archived in your Digital Key.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#dfe6ef]">
                <button
                  type="button"
                  onClick={() => setReviewSignModalPack(null)}
                  className="px-4 py-2 bg-white border border-[#cbd5e2] text-[#5b6e84] rounded-xl text-xs font-semibold hover:bg-[#f4f6f8] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSignVariation(reviewSignModalPack.id)}
                  className="px-5 py-2 bg-[#071d3b] hover:bg-[#15345d] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <span>✍️ Sign with Verified ID</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* ── MODAL 2: Inspect 14 Statutory Records in Handover ───────────── */}
      {inspectHandoverModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-[#dfe6ef] rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#dfe6ef]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#24754c]">
                  Statutory Completion Dossier
                </span>
                <h3 className="text-lg font-bold text-[#102645]">
                  14 Handover Records for 18 Banksia Crescent
                </h3>
              </div>
              <button
                onClick={() => setInspectHandoverModalOpen(false)}
                className="w-7 h-7 rounded-full bg-[#f4f6f8] text-[#5b6e84] hover:bg-[#e2eaf4] flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="max-h-[380px] overflow-y-auto space-y-2 pr-1 text-xs">
              {[
                { title: "QBCC Form 16 - Structural Engineering Signoff", issuer: "Elena Rostova (RPEQ #18921)", size: "1.9 MB", verified: true },
                { title: "QBCC Form 43 - Wet Area Waterproofing Certificate", issuer: "Miller Tiling (Dave Miller · QBCC #118492)", size: "1.4 MB", verified: true },
                { title: "Termimesh Termite Barrier System Notice (AS 3660.1)", issuer: "Flick Pest Control (50-Yr Warranty)", size: "2.1 MB", verified: true },
                { title: "Electrical Safety Certificate Form 16", issuer: "Lachlan Electrical (Lic #78192)", size: "1.2 MB", verified: true },
                { title: "Glazing & Window Safety Certificate (AS 1288)", issuer: "Brisbane Architectural Glazing", size: "1.5 MB", verified: true },
                { title: "Plumbing & Drainage Rough-in Form 4", issuer: "Southside Plumbing & Drainage", size: "1.1 MB", verified: true },
                { title: "Final As-Built Architectural Working Drawings", issuer: "Hart Homes Architecture", size: "8.4 MB", verified: true },
                { title: "Appliance Warranty & Operation Schedule", issuer: "Miele, Daikin, Tesla Powerwall", size: "3.2 MB", verified: true },
              ].map((doc, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#f8fafc] border border-[#dfe6ef] flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <strong className="block text-xs font-bold text-[#102645] truncate">
                      {doc.title}
                    </strong>
                    <span className="text-[10.5px] text-[#68788e]">
                      {doc.issuer} · {doc.size}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#eaf5ef] text-[#24754c] border border-[#c7e3d1] flex-shrink-0">
                    ✓ Verified
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#dfe6ef]">
              <span className="text-[11px] text-[#68788e]">
                All files sealed with cryptographic hash to Prop ID.
              </span>
              <button
                type="button"
                onClick={handleAcceptHandover}
                className="px-4 py-2 bg-[#24754c] hover:bg-[#1e603e] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                Accept &amp; Seal to Passport
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ── MODAL 3: Assemble Deal Pack ───────────────────────────────── */}
      {createPackModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-[#dfe6ef] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#dfe6ef]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#24754c]">
                  Deal Pack Generator
                </span>
                <h3 className="text-lg font-bold text-[#102645]">
                  Assemble a New Deal Pack
                </h3>
              </div>
              <button
                onClick={() => setCreatePackModalOpen(false)}
                className="w-7 h-7 rounded-full bg-[#f4f6f8] text-[#5b6e84] hover:bg-[#e2eaf4] flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNewPack} className="space-y-3.5 text-xs text-[#102645]">
              <div>
                <label className="block font-bold text-[#102645] mb-1">
                  Select Pack Family *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "seller", label: "🏡 Seller Disclosure", desc: "Form 2 draft & title search" },
                    { id: "build", label: "🏗️ Build & Change", desc: "Variations & specification" },
                    { id: "lease", label: "🔑 Appoint & Lease", desc: "Form 6 & RTA Form 18a" },
                    { id: "finance", label: "🏦 Finance & Mortgage", desc: "Borrower evidence pack" },
                  ].map((family) => (
                    <div
                      key={family.id}
                      onClick={() => setNewPackType(family.id as any)}
                      className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                        newPackType === family.id
                          ? "bg-[#f3f6fb] border-[#071d3b] ring-1 ring-[#071d3b]"
                          : "bg-white border-[#dfe6ef] hover:bg-[#fafbfc]"
                      }`}
                    >
                      <strong className="block text-xs font-bold text-[#102645]">{family.label}</strong>
                      <span className="text-[10px] text-[#68788e]">{family.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#102645] mb-1">
                  Pack Title *
                </label>
                <input
                  type="text"
                  required
                  value={newPackTitle}
                  onChange={(e) => setNewPackTitle(e.target.value)}
                  placeholder={
                    newPackType === "seller"
                      ? "e.g. QLD Seller Disclosure Statement Prep"
                      : newPackType === "build"
                      ? "e.g. Variation Notice: Ensuite Tile Upgrade"
                      : "e.g. Tenancy Agreement Preparation"
                  }
                  className="w-full px-3 py-2 bg-[#f4f6f8] border border-[#dfe6ef] rounded-lg text-xs text-[#102645] focus:outline-none focus:border-[#071d3b]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#102645] mb-1">
                  Named Professional Counterparty
                </label>
                <input
                  type="text"
                  value={newPackRecipient}
                  onChange={(e) => setNewPackRecipient(e.target.value)}
                  placeholder="e.g. River City Conveyancing or Hart Homes"
                  className="w-full px-3 py-2 bg-[#f4f6f8] border border-[#dfe6ef] rounded-lg text-xs text-[#102645] focus:outline-none focus:border-[#071d3b]"
                />
              </div>

              <div className="p-3 bg-[#f0f7f3] border border-[#c7e4d0] rounded-xl text-[11px] text-[#24754c]">
                ⚡ <strong>Queensland Workflow Engine:</strong> The assembled pack will automatically enforce statutory requirements, label mandatory legal items, and freeze versions for clean counterparty signing.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#dfe6ef]">
                <button
                  type="button"
                  onClick={() => setCreatePackModalOpen(false)}
                  className="px-4 py-2 bg-white border border-[#cbd5e2] text-[#5b6e84] rounded-xl text-xs font-semibold hover:bg-[#f4f6f8] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#071d3b] hover:bg-[#15345d] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  Assemble Pack
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
}
