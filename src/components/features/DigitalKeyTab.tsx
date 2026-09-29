"use client";
import React, { useState } from "react";
import Link from "next/link";
import { PropertyData } from "@/lib/properties";

// ─── Types ───────────────────────────────────────────────────────────────────

interface IncomingPack {
  id: string;
  senderName: string;
  senderRole: string;
  senderCompany: string;
  senderAvatar: string;
  avatarBg: string;
  avatarText: string;
  packName: string;
  docCount: number;
  docPreview: string[];
  sentTime: string;
  trustlinkHref: string;
  accepted: boolean;
  dismissed: boolean;
}
interface SavedHandover {
  id: string;
  packName: string;
  senderName: string;
  senderRole: string;
  senderCompany: string;
  senderAvatar: string;
  avatarBg: string;
  avatarText: string;
  docCount: number;
  acceptedDate: string;
  documents: { title: string; cat: string; size: string }[];
}

interface SavedDoc {
  id: string;
  title: string;
  cat: string;
  size: string;
  shared: boolean;
  source: string; // who sent it
  savedAt: string;
}

interface DigitalKeyTabProps {
  property: PropertyData;
  onGoToMessages: () => void;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function DigitalKeyTab({ property, onGoToMessages }: DigitalKeyTabProps) {

  const [incomingPacks, setIncomingPacks] = useState<IncomingPack[]>([
    {
      id: "pack-1",
      senderName: "Olivia Hart",
      senderRole: "Builder & handover contact",
      senderCompany: "Hart Homes",
      senderAvatar: "OH",
      avatarBg: "bg-[#e6eaf3]",
      avatarText: "text-[#425b7c]",
      packName: "New Home Handover Pack",
      docCount: 14,
      docPreview: [
        "Form 16 Structural Engineering Certificate",
        "Form 43 Waterproofing Certificate",
        "QBCC Home Warranty Insurance",
        "Appliance Care & Maintenance Guide",
        "Colorbond Roof 30-Year Warranty",
      ],
      sentTime: "Today 9:05 AM",
      trustlinkHref: "/trustlinks/welcome",
      accepted: false,
      dismissed: false,
    },
    {
      id: "pack-2",
      senderName: "Lachlan Vance",
      senderRole: "Licensed Conveyancer",
      senderCompany: "River City Conveyancing",
      senderAvatar: "LV",
      avatarBg: "bg-[#eaf5ef]",
      avatarText: "text-[#24754c]",
      packName: "Settlement & Title Transfer Documents",
      docCount: 3,
      docPreview: [
        "Contract of Sale — Signed Copy",
        "Form 1 Vendor Disclosure Statement",
        "PEXA Settlement Statement",
      ],
      sentTime: "Yesterday 4:45 PM",
      trustlinkHref: "/trustlinks/TL-88301-A",
      accepted: false,
      dismissed: false,
    },
  ]);

  const [expandedPackId, setExpandedPackId] = useState<string | null>("pack-1");
  const [transferOpen, setTransferOpen] = useState(false);

  const pendingPacks = incomingPacks.filter((p) => !p.accepted && !p.dismissed);
  const acceptedPacks = incomingPacks.filter((p) => p.accepted);

  const [expandedSavedId, setExpandedSavedId] = useState<string | null>("sh-1");

  const [savedHandovers, setSavedHandovers] = useState<SavedHandover[]>([
    {
      id: "sh-1",
      packName: "Hart Homes Construction & Practical Completion Bundle",
      senderName: "Olivia Hart",
      senderRole: "Builder & handover contact",
      senderCompany: "Hart Homes",
      senderAvatar: "OH",
      avatarBg: "bg-[#e6eaf3]",
      avatarText: "text-[#425b7c]",
      docCount: 14,
      acceptedDate: "14 Sep 2026",
      documents: [
        { title: "Form 16 Structural Engineering & Slab Certificate", cat: "Statutory", size: "2.4 MB" },
        { title: "Form 43 Wet-Area Waterproofing Certificate", cat: "Compliance", size: "1.8 MB" },
        { title: "QBCC Home Warranty Insurance Certificate", cat: "Warranty", size: "850 KB" },
        { title: "Colorbond Roof & Guttering 30-Year Warranty", cat: "Warranty", size: "1.2 MB" },
        { title: "Daikin Ducted Inverter AC Commissioning Report", cat: "Manuals", size: "3.1 MB" },
        { title: "Rheem 270L Heat Pump Warranty & Plumber Signoff", cat: "Appliances", size: "940 KB" },
        { title: "Interior & Exterior Dulux Paint Schedule", cat: "Specifications", size: "620 KB" },
      ],
    },
  ]);

  const acceptPack = (id: string) => {
    const pack = incomingPacks.find((p) => p.id === id);
    if (pack) {
      const newSaved: SavedHandover = {
        id: `sh-${Date.now()}`,
        packName: pack.packName,
        senderName: pack.senderName,
        senderRole: pack.senderRole,
        senderCompany: pack.senderCompany,
        senderAvatar: pack.senderAvatar,
        avatarBg: pack.avatarBg,
        avatarText: pack.avatarText,
        docCount: pack.docCount,
        acceptedDate: "Just now",
        documents: pack.docPreview.map((title) => ({
          title,
          cat: "Statutory",
          size: "1.5 MB",
        })),
      };
      setSavedHandovers([newSaved, ...savedHandovers]);
      setIncomingPacks((prev) =>
        prev.map((p) => (p.id === id ? { ...p, accepted: true } : p))
      );
    }
  };

  const dismissPack = (id: string) => {
    setIncomingPacks((prev) =>
      prev.map((p) => (p.id === id ? { ...p, dismissed: true } : p))
    );
  };

  return (
    <div className="space-y-6 max-w-[1040px] mx-auto pb-12">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[2px] text-[#24754c] mb-1">
            YOUR RECORDS · YOUR DECISION
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#102645] mb-1.5">
            Digital Key
          </h1>
          <p className="text-[13px] text-[#68788e]">
            Receive, keep and share the documents you control for {property.street}.
          </p>
        </div>
        <button
          onClick={() => alert("Choose a professional and select which documents to share. They get read-only access.")}
          className="self-start px-4 py-2 bg-[#10b981] hover:bg-[#059669] text-white font-bold rounded-xl text-xs transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
        >
          + Share with a pro
        </button>
      </div>

      {/* ── INCOMING HANDOVER PACKS ── */}
      {pendingPacks.length > 0 && (
        <div className="space-y-3">
          {/* Section header */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#92400e]">
              Incoming
            </span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#fef3c7] text-[#92400e] border border-[#fcd34d]">
              {pendingPacks.length}
            </span>
          </div>

          {pendingPacks.map((pack) => {
            const isExpanded = expandedPackId === pack.id;
            return (
              <div
                key={pack.id}
                className="bg-[#fffbeb] border border-[#fcd34d] rounded-2xl overflow-hidden shadow-sm"
              >
                {/* Pack header — always visible */}
                <button
                  onClick={() => setExpandedPackId(isExpanded ? null : pack.id)}
                  className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-[#fffadf] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl font-serif font-bold text-base flex items-center justify-center flex-shrink-0 ${pack.avatarBg} ${pack.avatarText}`}
                    >
                      {pack.senderAvatar}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[13px] font-bold text-[#102645]">
                          {pack.senderName}
                        </span>
                        <span className="text-[10px] font-medium text-[#92400e] bg-[#fef3c7] px-1.5 py-0.5 rounded border border-[#fcd34d]">
                          {pack.docCount} docs
                        </span>
                      </div>
                      <div className="text-[11px] text-[#68788e] truncate">
                        {pack.packName} · {pack.senderCompany} · {pack.sentTime}
                      </div>
                    </div>
                  </div>
                  <svg
                    className={`w-4 h-4 text-[#92400e] flex-shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Expanded body */}
                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-[#fcd34d]/50 pt-4">
                    <div className="flex flex-col sm:flex-row gap-5">

                      {/* Left: document preview */}
                      <div className="flex-1 min-w-0">
                        <div className="text-[10.5px] font-bold uppercase tracking-[1.2px] text-[#92400e] mb-2">
                          What's included
                        </div>
                        <div className="space-y-1.5">
                          {pack.docPreview.map((doc) => (
                            <div
                              key={doc}
                              className="flex items-center gap-2 text-[12px] text-[#102645]"
                            >
                              <span className="text-[#92400e]">📄</span>
                              <span>{doc}</span>
                            </div>
                          ))}
                          {pack.docCount > pack.docPreview.length && (
                            <div className="text-[11px] text-[#68788e] pl-5">
                              + {pack.docCount - pack.docPreview.length} more documents included
                            </div>
                          )}
                        </div>

                        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#68788e]">
                          <span>Sent via</span>
                          <Link
                            href={pack.trustlinkHref}
                            className="font-bold text-[#071d3b] hover:underline"
                          >
                            {pack.senderName}'s connection →
                          </Link>
                        </div>
                      </div>

                      {/* Right: actions */}
                      <div className="flex flex-col gap-2 sm:min-w-[180px]">
                        <button
                          onClick={() => acceptPack(pack.id)}
                          className="w-full px-4 py-2.5 bg-[#071d3b] hover:bg-[#15345d] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-sm text-center"
                        >
                          ✓ Accept & save to Digital Key
                        </button>
                        <button
                          onClick={onGoToMessages}
                          className="w-full px-4 py-2.5 bg-white hover:bg-[#f8fafc] text-[#102645] font-semibold text-xs rounded-xl border border-[#dfe6ef] transition-colors cursor-pointer text-center"
                        >
                          💬 Ask {pack.senderName.split(" ")[0]} a question
                        </button>
                        <button
                          onClick={() => dismissPack(pack.id)}
                          className="w-full px-4 py-2 text-[#a44042] hover:text-[#7f1d1d] font-semibold text-[11px] transition-colors cursor-pointer text-center"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── SAVED DIGITAL HANDOVERS (PERMANENT VAULT) ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#24754c]">
              SAVED DIGITAL HANDOVERS
            </span>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#dcfce7] text-[#166534] border border-[#86efac]">
              {savedHandovers.length} Permanent Records
            </span>
          </div>
          <span className="text-[11px] text-[#68788e]">
            Secured in Digital Key · Sovereign property vault
          </span>
        </div>

        {savedHandovers.map((sh) => {
          const isExpanded = expandedSavedId === sh.id;
          return (
            <div
              key={sh.id}
              className="bg-white border border-[#bbf7d0] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Card Header */}
              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#fbfdfb]">
                <div className="flex items-start gap-3.5">
                  <div className={`w-11 h-11 rounded-xl font-serif font-bold text-lg flex items-center justify-center flex-shrink-0 ${sh.avatarBg} ${sh.avatarText}`}>
                    {sh.senderAvatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[9px] font-bold uppercase tracking-[1px] px-2 py-0.5 rounded-full bg-[#dcfce7] text-[#166534] border border-[#86efac] flex items-center gap-1">
                        <span>✓</span>
                        <span>Verified Handover</span>
                      </span>
                      <span className="text-[10px] font-semibold text-[#68788e]">
                        Accepted {sh.acceptedDate}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#102645]">
                      {sh.packName}
                    </h3>
                    <p className="text-[12px] text-[#68788e] mt-0.5">
                      Delivered by <strong className="text-[#102645]">{sh.senderName}</strong> · {sh.senderCompany} · {sh.docCount} verified records attached
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                  <button
                    onClick={() => setExpandedSavedId(isExpanded ? null : sh.id)}
                    className="px-3.5 py-2 rounded-xl bg-[#f0fdf4] hover:bg-[#dcfce7] text-[#166534] text-xs font-bold border border-[#bbf7d0] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{isExpanded ? "Hide files" : `Inspect ${sh.documents.length} files`}</span>
                    <span className="text-[10px]">{isExpanded ? "▲" : "▼"}</span>
                  </button>
                  <button
                    onClick={() => alert(`Downloading verified ZIP archive for ${sh.packName}...`)}
                    className="px-3.5 py-2 rounded-xl bg-[#071d3b] hover:bg-[#15345d] text-white text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                  >
                    ⬇ Download ZIP
                  </button>
                </div>
              </div>

              {/* Expanded File Register */}
              {isExpanded && (
                <div className="px-5 py-4 border-t border-[#bbf7d0] bg-white divide-y divide-[#f1f5f9]">
                  <div className="text-[10.5px] font-bold uppercase tracking-[1.2px] text-[#24754c] pb-2">
                    Verified Documents Included in this Handover
                  </div>
                  {sh.documents.map((doc, idx) => (
                    <div
                      key={idx}
                      className="py-2.5 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-base text-[#166534]">📄</span>
                        <div className="min-w-0">
                          <span className="font-semibold text-[#102645] truncate block">
                            {doc.title}
                          </span>
                          <span className="text-[10.5px] text-[#68788e]">
                            {doc.cat} · {doc.size}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[9.5px] font-bold px-1.5 py-0.2 rounded bg-[#eaf5ef] text-[#24754c]">
                          Verified
                        </span>
                        <button
                          onClick={() => alert(`Opening ${doc.title}`)}
                          className="text-[11px] text-[#071d3b] hover:underline font-bold"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── YOUR SAVED DOCUMENTS ── */}
      <div className="bg-white border border-[#dfe6ef] rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-[#dfe6ef] flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#102645]">Your Documents</h3>
            <p className="text-[11px] text-[#68788e]">
              {property.documents.length} verified files saved to your Digital Key.
            </p>
          </div>
          <button
            onClick={() => alert("Upload a document directly to your Digital Key.")}
            className="text-xs font-bold text-[#071d3b] hover:underline"
          >
            + Upload
          </button>
        </div>

        <div className="divide-y divide-[#f1f5f9]">
          {property.documents.map((doc, idx) => (
            <div
              key={idx}
              className="px-5 py-3.5 flex items-center justify-between gap-4 hover:bg-[#fafbfc] transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-lg">📄</span>
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold text-[#102645] truncate">{doc.title}</div>
                  <div className="text-[11px] text-[#68788e]">{doc.cat} · {doc.size}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {doc.shared && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#eaf5ef] text-[#24754c] border border-[#d2e6d9]">
                    Shared
                  </span>
                )}
                <button
                  onClick={() => alert(`View/download: ${doc.title}`)}
                  className="text-xs text-[#071d3b] hover:underline font-semibold"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TRANSFER OWNERSHIP ── */}
      <div className="bg-white border border-[#dfe6ef] rounded-2xl p-5 shadow-sm">
        <button
          onClick={() => setTransferOpen(!transferOpen)}
          className="w-full flex items-center justify-between text-left group"
        >
          <div>
            <div className="text-sm font-bold text-[#102645] group-hover:text-[#24754c] transition-colors">
              ► Transfer to a new owner
            </div>
            <div className="text-[11px] text-[#68788e] mt-0.5">
              When you sell, hand over your entire Digital Key to the new owner.
            </div>
          </div>
          <span className="text-[#68788e] group-hover:text-[#24754c] transition-colors text-xs font-bold">
            {transferOpen ? "Collapse" : "Expand"}
          </span>
        </button>

        {transferOpen && (
          <form
            className="mt-4 pt-4 border-t border-[#dfe6ef] space-y-3"
            onSubmit={(e) => { e.preventDefault(); alert("Transfer initiated. Requires two-factor authentication to finalise."); }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10.5px] font-bold text-[#102645] uppercase mb-1">
                  New Owner Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance"
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-xs text-[#102645] placeholder-[#94a3b8] focus:outline-none focus:border-[#071d3b]"
                />
              </div>
              <div>
                <label className="block text-[10.5px] font-bold text-[#102645] uppercase mb-1">
                  New Owner Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. eleanor@example.com"
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-xs text-[#102645] placeholder-[#94a3b8] focus:outline-none focus:border-[#071d3b]"
                />
              </div>
              <div>
                <label className="block text-[10.5px] font-bold text-[#102645] uppercase mb-1">
                  Settlement Date
                </label>
                <input
                  type="date"
                  required
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-xs text-[#102645] focus:outline-none focus:border-[#071d3b]"
                />
              </div>
              <div>
                <label className="block text-[10.5px] font-bold text-[#102645] uppercase mb-1">
                  Conveyancer Ref #
                </label>
                <input
                  type="text"
                  placeholder="e.g. CNV-2024-88"
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-xs text-[#102645] placeholder-[#94a3b8] focus:outline-none focus:border-[#071d3b]"
                />
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-[10px] text-[#64748b]">
                Requires two-factor authentication to finalise.
              </span>
              <button
                type="submit"
                className="px-4 py-2 bg-[#efbd66] hover:bg-[#dfac55] text-[#071d3b] font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Initiate Transfer
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Footer */}
      <div className="text-center text-[11px] text-[#94a3b8]">
        TPH · Your digital home. · Interactive concept · Sample records · Nothing is sent
      </div>
    </div>
  );
}
