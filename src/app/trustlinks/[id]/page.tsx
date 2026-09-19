"use client";
import Link from "next/link";
import React, { use, useState } from "react";

interface TrustLinkData {
  id: string;
  propId: string;
  propNum: string;
  property: string;
  suburb: string;
  proName: string;
  proRole: string;
  proLicence: string;
  proAvatar: string;
  stage: string;
  status: string;
  statusColor: string;
  progressPct: number;
  lastUpdated: string;
  deliverableTitle: string;
  deliverableDesc: string;
}

const TRUSTLINK_DATA_MAP: Record<string, TrustLinkData> = {
  "TL-99214-B": {
    id: "TL-99214-B",
    propId: "TPH-KEN-018",
    propNum: "018",
    property: "18 Banksia Crescent",
    suburb: "Kenmore QLD 4069",
    proName: "Banksia Homes Pty Ltd",
    proRole: "Licensed Custom Builder (MBA Accredited)",
    proLicence: "QBCC #150821",
    proAvatar: "BH",
    stage: "Stage 5: Practical Completion & Digital Handover",
    status: "Handover Ready",
    statusColor: "emerald",
    progressPct: 92,
    lastUpdated: "34m ago",
    deliverableTitle: "Practical Completion & Digital Handover Package",
    deliverableDesc: "Includes QBCC Form 16 structural engineering certificate, Form 43 wet-area waterproofing warranty, electrical safety compliance, appliance warranty pack, and joint PCI walkthrough defects register.",
  },
  "TL-88301-A": {
    id: "TL-88301-A",
    propId: "TPH-KEN-018",
    propNum: "018",
    property: "18 Banksia Crescent",
    suburb: "Kenmore QLD 4069",
    proName: "Chen & Associates Conveyancing",
    proRole: "PEXA Certified Conveyancing Specialists",
    proLicence: "QLD Law Society #88219",
    proAvatar: "CA",
    stage: "Settlement Contract & PEXA Workspace",
    status: "Active",
    statusColor: "blue",
    progressPct: 75,
    lastUpdated: "Yesterday",
    deliverableTitle: "Draft Settlement Adjustments & PEXA Transfer",
    deliverableDesc: "Title transfer statement, council rate adjustments, water meter readings, and PEXA digital settlement schedule.",
  },
  "TL-76100-C": {
    id: "TL-76100-C",
    propId: "TPH-TOW-029",
    propNum: "029",
    property: "14 Fernberg Court",
    suburb: "Toowong QLD 4066",
    proName: "Miller Building & Pest Inspections",
    proRole: "Lead Building & Timber Pest Inspector",
    proLicence: "QBCC #1089201",
    proAvatar: "MI",
    stage: "Pre-Purchase Inspection Review",
    status: "Action Required",
    statusColor: "amber",
    progressPct: 85,
    lastUpdated: "2h ago",
    deliverableTitle: "AS 4349.1 Building & Timber Pest Audit Report",
    deliverableDesc: "Comprehensive 48-page diagnostic with 42 defect tags, FLIR thermal moisture scans, and Form 43 compliance check.",
  },
};

type ActiveTab = "deliverables" | "documents" | "messages" | "audit";

interface MessageItem {
  id: string;
  sender: string;
  avatar: string;
  isMe: boolean;
  time: string;
  text: string;
  attachment?: string;
}

export default function TrustLinkDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const data = TRUSTLINK_DATA_MAP[id] ?? TRUSTLINK_DATA_MAP["TL-99214-B"];

  const [activeTab, setActiveTab] = useState<ActiveTab>("deliverables");
  const [paused, setPaused] = useState(false);
  const [variationSigned, setVariationSigned] = useState(false);
  const [handoverSealed, setHandoverSealed] = useState(false);
  const [sharedDocs, setSharedDocs] = useState([
    { id: 1, title: "Title Search QT2291/4.pdf", size: "1.2 MB", shared: true, date: "Shared Sep 13" },
    { id: 2, title: "Architectural Floor Plans & Elevations.pdf", size: "8.4 MB", shared: true, date: "Shared Sep 13" },
    { id: 3, title: "Engineering Structural Details (S-01 to S-08).pdf", size: "4.8 MB", shared: true, date: "Shared Sep 14" },
    { id: 4, title: "Soil Test & Geotech Report (Class H1).pdf", size: "2.1 MB", shared: false, date: "In Vault (Unshared)" },
    { id: 5, title: "Private Home Loan & Mortgage Schedule.pdf", size: "640 KB", shared: false, date: "Private / Sovereign" },
  ]);

  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: "m-1",
      sender: "Alex Morgan (Banksia Homes)",
      avatar: "AM",
      isMe: false,
      time: "Yesterday, 3:15 PM",
      text: "Hi Emily & James, we have uploaded the Form 16 Structural Engineering Certificate and the updated defect rectification log from yesterday's walkthrough.",
      attachment: "Form_16_Structural_Kenmore_Final.pdf",
    },
    {
      id: "m-2",
      sender: "Emily Carter (You)",
      avatar: "EC",
      isMe: true,
      time: "Yesterday, 4:20 PM",
      text: "Thanks Alex! We noticed the Caesarstone kitchen island variation notice is attached. We'll sign that off tonight.",
    },
    {
      id: "m-3",
      sender: "Alex Morgan (Banksia Homes)",
      avatar: "AM",
      isMe: false,
      time: "Today, 08:30 AM",
      text: "Wonderful. Once that's signed, the Handover package will be 100% complete and ready to seal into your permanent Prop ID Vault!",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const toggleDocShare = (docId: number) => {
    setSharedDocs((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, shared: !d.shared } : d))
    );
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const msg: MessageItem = {
      id: `m-${Date.now()}`,
      sender: "Emily Carter (You)",
      avatar: "EC",
      isMe: true,
      time: "Just now",
      text: newMessage.trim(),
    };
    setMessages((prev) => [...prev, msg]);
    setNewMessage("");
  };

  return (
    <div className="w-full flex-1 flex flex-col bg-slate-50 dark:bg-[#0a1628]">

      {/* Top Context Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-5">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
            <Link href="/properties" className="hover:text-brand-navy dark:hover:text-white font-medium">My Property World</Link>
            <span>/</span>
            <Link href="/trustlinks" className="hover:text-brand-navy dark:hover:text-white font-medium">TrustLinks</Link>
            <span>/</span>
            <span className="font-mono font-bold text-slate-800 dark:text-white">{data.id}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold bg-brand-navy text-white">
                  <svg className="w-3.5 h-3.5 text-verified" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m12 2 8 3v7c0 6-8 10-8 10S4 18 4 12V5Z" />
                  </svg>
                  {data.id}
                </span>

                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-green-50 dark:bg-green-900/20 text-verified text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-verified animate-pulse" />
                  {paused ? "Access Paused" : "Active & Scoped"}
                </div>

                <span className="text-xs font-mono text-slate-500">
                  Attached to <span className="font-bold text-slate-700 dark:text-slate-300">{data.propId}</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white leading-tight">
                {data.property}, {data.suburb}
              </h1>

              <div className="text-xs text-slate-500 mt-1 flex items-center gap-2 flex-wrap">
                <span>Professional: <strong className="text-slate-800 dark:text-slate-200">{data.proName}</strong></span>
                <span>•</span>
                <span>{data.proRole}</span>
                <span>•</span>
                <span className="text-verified font-semibold">✓ {data.proLicence}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                onClick={() => setPaused(!paused)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors ${
                  paused
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-700"
                }`}
              >
                {paused ? "▶ Resume Access" : "⏸ Pause Access"}
              </button>

              <Link
                href="/vault"
                className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                View Sovereign Vault
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace with Left Sidebar & Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ── LEFT SIDEBAR (Sovereign Navigation & Pro Card) ────────────────────── */}
          <aside className="lg:col-span-4 space-y-6">

            {/* Navigation Tabs */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 shadow-sm space-y-1">
              {[
                { id: "deliverables", label: "🎁 Handover & Deliverables", count: "Action Due" },
                { id: "documents", label: "📄 Shared Vault Records", count: `${sharedDocs.filter((d) => d.shared).length} Shared` },
                { id: "messages", label: "💬 Messages & Discussion", count: `${messages.length}` },
                { id: "audit", label: "📜 Cryptographic Audit Trail", count: "Append-Only" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ActiveTab)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all text-left ${
                    activeTab === tab.id
                      ? "bg-brand-navy text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    activeTab === tab.id
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-500"
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Connected Professional Profile Card */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                Connected Specialist
              </div>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-brand-navy text-white font-bold flex items-center justify-center text-sm flex-shrink-0 shadow-sm">
                  {data.proAvatar}
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                    {data.proName}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{data.proRole}</div>
                  <div className="text-[11px] text-green-600 dark:text-green-400 font-semibold mt-1">
                    ✓ Verified {data.proLicence}
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-700 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Insurance:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">$20M Public Liability</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Accreditation:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Master Builders QLD</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Handover Status:</span>
                  <span className="font-bold text-verified">92% Ready</span>
                </div>
              </div>

              <Link
                href="/explore/1"
                className="block mt-4 text-center py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors"
              >
                View Full Specialist Profile →
              </Link>
            </div>

            {/* Sovereignty Master Controls */}
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-verified" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Unilateral Sovereignty
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                As the property owner, you hold the master cryptographic keys. You can pause or revoke access at any time without destroying existing audit logs or historical records deposited to your Prop ID Vault.
              </p>

              <button
                onClick={() => alert("Master revocation confirmation: The specialist will lose access immediately while retaining all deposited records in your vault.")}
                className="w-full py-2.5 px-3 bg-white dark:bg-slate-800 border border-red-200 dark:border-red-800/40 text-red-600 hover:bg-red-50 text-xs font-bold rounded-xl transition-colors text-center flex items-center justify-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Revoke TrustLink Workspace
              </button>
            </div>
          </aside>

          {/* ── RIGHT MAIN WORKSPACE ────────────────────────────────────────── */}
          <main className="lg:col-span-8 space-y-6">

            {/* 1. DELIVERABLES & HANDOVER TAB */}
            {activeTab === "deliverables" && (
              <div className="space-y-6">
                {/* Hero Action Banner */}
                <div
                  className="rounded-2xl p-6 border shadow-sm"
                  style={{ background: "linear-gradient(135deg, #061221 0%, #0c2340 60%, #0c3d2b 100%)", borderColor: "rgba(16,185,129,0.3)" }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-green-500/20 text-green-300 text-[10px] font-bold uppercase tracking-wider mb-2">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        Practical Completion Package
                      </div>
                      <h2 className="text-xl font-bold text-white leading-tight">
                        {data.deliverableTitle}
                      </h2>
                    </div>
                    <span className="text-xs font-mono text-green-400 font-bold px-3 py-1 rounded-lg bg-white/10">
                      4 of 5 Gates Cleared
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {data.deliverableDesc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10">
                    <button
                      onClick={() => setHandoverSealed(true)}
                      className="px-5 py-3 rounded-xl text-xs font-bold text-white transition-all shadow-md flex items-center justify-center gap-2 hover:opacity-90"
                      style={{ background: "linear-gradient(135deg, #10b981, #16a34a)" }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {handoverSealed ? "✓ Handover Sealed to Prop ID" : "Accept & Seal to Prop ID Vault"}
                    </button>

                    <button
                      onClick={() => setActiveTab("documents")}
                      className="px-5 py-3 bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      Inspect Evidence Files
                    </button>
                  </div>
                </div>

                {/* Variation #04 Sign-Off Card */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-amber-100 text-amber-800">
                          Variation Notice #04
                        </span>
                        <span className="text-xs text-slate-400">Issued 2h ago</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        Caesarstone 40mm Kitchen Island Upgrade
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-bold text-slate-900 dark:text-white">+$1,400 AUD</div>
                      <div className="text-[10px] text-slate-400">Schedule Impact: 0 days</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    Upgrade from standard 20mm edge to 40mm mitred edge in Caesarstone &apos;Pure White&apos; across kitchen island and butler&apos;s pantry waterfall ends. Includes certification from stone mason.
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700 gap-3">
                    <span className="text-xs text-slate-500 font-mono">
                      Doc Hash: <strong className="text-slate-700 dark:text-slate-300">0x89ab...4e11</strong>
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setVariationSigned(true)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          variationSigned
                            ? "bg-green-100 text-green-800 border border-green-200"
                            : "bg-brand-navy text-white hover:bg-brand-navy-light"
                        }`}
                      >
                        {variationSigned ? "✓ Digitally Signed & Approved" : "Digital Sign-Off (Approve)"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Handover Gate Verification Checklist */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                    Handover Gate Verification Status
                  </h3>
                  <div className="space-y-3">
                    {[
                      { gate: "Gate 1", title: "Statutory Form 16 & Engineering Cleared", status: "Verified", ok: true },
                      { gate: "Gate 2", title: "Wet Areas Waterproofing Form 43 Verified", status: "Verified", ok: true },
                      { gate: "Gate 3", title: "Electrical Safety Compliance Certificate (Form 4)", status: "Verified", ok: true },
                      { gate: "Gate 4", title: "Joint Pre-Handover PCI Walkthrough & Rectifications", status: "Verified", ok: true },
                      { gate: "Gate 5", title: "Client Variation #04 Digital Sign-Off", status: variationSigned ? "Verified" : "Pending Sign-Off", ok: variationSigned },
                    ].map((g) => (
                      <div
                        key={g.gate}
                        className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            g.ok ? "bg-green-100 text-verified font-bold" : "bg-amber-100 text-amber-700 font-bold"
                          }`}>
                            {g.ok ? "✓" : "!"}
                          </span>
                          <span className="text-xs font-bold text-slate-900 dark:text-white">{g.title}</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                          g.ok ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                        }`}>
                          {g.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. GRANULAR VAULT DOCUMENTS TAB */}
            {activeTab === "documents" && (
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                    Granular Prop ID Vault Permissions
                  </h2>
                  <p className="text-xs text-slate-500">
                    Control exactly which records from your sovereign vault are accessible to {data.proName}. Revoke access to individual files anytime.
                  </p>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-700">
                  {sharedDocs.map((doc) => (
                    <div key={doc.id} className="py-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center text-slate-500 flex-shrink-0">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-xs text-slate-900 dark:text-white truncate">{doc.title}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{doc.size} • {doc.date}</div>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleDocShare(doc.id)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          doc.shared
                            ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                            : "bg-brand-navy text-white hover:bg-brand-navy-light"
                        }`}
                      >
                        {doc.shared ? "Unshare File" : "Grant Access"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. MESSAGES & DISCUSSION TAB */}
            {activeTab === "messages" && (
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[560px]">
                <div className="p-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Discussion Thread</div>
                    <div className="text-[10px] text-slate-500">Encrypted TrustLink Channel • {data.proName}</div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-green-100 text-green-800">
                    Live Channel
                  </span>
                </div>

                <div className="flex-1 p-5 overflow-y-auto space-y-4">
                  {messages.map((m) => (
                    <div key={m.id} className={`flex gap-3 ${m.isMe ? "justify-end" : "justify-start"}`}>
                      {!m.isMe && (
                        <div className="w-8 h-8 rounded-full bg-brand-navy text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {m.avatar}
                        </div>
                      )}
                      <div className={`max-w-md rounded-2xl p-4 text-xs ${
                        m.isMe
                          ? "bg-brand-navy text-white"
                          : "bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                      }`}>
                        <div className="font-bold text-[10px] opacity-75 mb-1">{m.sender} • {m.time}</div>
                        <p className="leading-relaxed">{m.text}</p>
                        {m.attachment && (
                          <div className="mt-2.5 p-2 rounded-lg bg-black/10 flex items-center gap-2">
                            <span className="text-base">📄</span>
                            <span className="font-mono text-[11px] underline truncate">{m.attachment}</span>
                          </div>
                        )}
                      </div>
                      {m.isMe && (
                        <div className="w-8 h-8 rounded-full bg-verified text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {m.avatar}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 dark:border-slate-700 flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message or query to the builder..."
                    className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-xs bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2 bg-brand-navy text-white text-xs font-bold rounded-xl hover:bg-brand-navy-light transition-colors"
                  >
                    Send
                  </button>
                </form>
              </div>
            )}

            {/* 4. CRYPTOGRAPHIC AUDIT TRAIL TAB */}
            {activeTab === "audit" && (
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Append-Only Merkle Audit Trail
                    </h3>
                    <p className="text-xs text-slate-500">
                      Cryptographically validated historical proof of events, certificate deposits, and sign-offs.
                    </p>
                  </div>
                  <span className="font-mono text-xs px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    Merkle: 0x4f12...b998
                  </span>
                </div>

                <div className="relative pl-6 border-l-2 border-slate-100 dark:border-slate-700 space-y-6">
                  {[
                    { title: "Practical completion package compiled by Banksia Homes", time: "Today 10:48 AM AEST", tx: "0x8a92...ef31", detail: "Form 16, Form 43 waterproofing, and appliance registers assembled." },
                    { title: "Client Variation #04 generated for stone upgrade", time: "Today 08:30 AM AEST", tx: "0x5c33...8912", detail: "Caesarstone Pure White specification appended." },
                    { title: "On-site geo-presence check confirmed via GPS token", time: "Yesterday 11:32 AM AEST", tx: "0x3d41...982a", detail: "Site supervisor entered cadastral radius (Lot 18 on RP 88201). Scope activated." },
                    { title: "TrustLink connection accepted by Banksia Homes (QBCC #150821)", time: "Sep 13 02:15 PM AEST", tx: "0x7c12...41a0", detail: "Insurance policy Lloyd's #20M verified and registered." },
                  ].map((entry) => (
                    <div key={entry.tx} className="relative">
                      <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-verified ring-4 ring-white dark:ring-slate-800" />
                      <div className="font-bold text-xs text-slate-900 dark:text-white">{entry.title}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{entry.time}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{entry.detail}</div>
                      <div className="text-[10px] font-mono text-slate-400 mt-1">Tx: {entry.tx}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}
