"use client";

import React, { useState } from "react";
import Link from "next/link";

interface TrustLinkPortal {
  id: string;
  propId: string;
  clientName: string;
  propertyAddress: string;
  secureToken: string;
  status: "Active Portal" | "Awaiting Client Join" | "Expired / Sealed";
  statusColor: string;
  lastClientVisit: string;
  unreadMessagesCount: number;
  sharedDocsCount: number;
  addressShared: boolean;
  internalCostsRedacted: boolean;
  expiresIn: string;
  permissionVersion: number;
}

const TRUSTLINK_PORTALS: TrustLinkPortal[] = [
  {
    id: "welcome",
    propId: "TPH-KEN-018",
    clientName: "Alex & Emily",
    propertyAddress: "18 Banksia Crescent, Kenmore QLD",
    secureToken: "TL-99214-B",
    status: "Active Portal",
    statusColor: "bg-[#eaf4ef] text-[#28715e] border-[#c7e3d1]",
    lastClientVisit: "34 mins ago (Online)",
    unreadMessagesCount: 1,
    sharedDocsCount: 5,
    addressShared: true,
    internalCostsRedacted: true,
    expiresIn: "15 days (21 Oct 2026)",
    permissionVersion: 1,
  },
  {
    id: "TL-88301-A",
    propId: "TPH-GRV-007",
    clientName: "Sofia Nguyen",
    propertyAddress: "7 Cedar Street, Graceville QLD",
    secureToken: "TL-88301-A",
    status: "Active Portal",
    statusColor: "bg-[#eaf4ef] text-[#28715e] border-[#c7e3d1]",
    lastClientVisit: "2 hours ago",
    unreadMessagesCount: 0,
    sharedDocsCount: 3,
    addressShared: true,
    internalCostsRedacted: true,
    expiresIn: "30 days (05 Nov 2026)",
    permissionVersion: 1,
  },
  {
    id: "TL-76100-C",
    propId: "TPH-BRK-042",
    clientName: "Noah & Mia Wilson",
    propertyAddress: "42 Ridge Road, Brookfield QLD",
    secureToken: "TL-76100-C",
    status: "Expired / Sealed",
    statusColor: "bg-[#F9F8F5] text-[#64727e] border-[#e2e5e5]",
    lastClientVisit: "12 Sep 2026",
    unreadMessagesCount: 0,
    sharedDocsCount: 6,
    addressShared: true,
    internalCostsRedacted: true,
    expiresIn: "Sealed to Sovereign Vault",
    permissionVersion: 2,
  },
];

export default function ProTrustLinksListPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyLink = (token: string) => {
    navigator.clipboard?.writeText(`https://thepropertyhelpline.com/trustlinks/${token}`);
    setCopiedId(token);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filtered = TRUSTLINK_PORTALS.filter((tl) => {
    if (filter === "Active" && tl.status !== "Active Portal") return false;
    if (filter === "Sealed" && tl.status !== "Expired / Sealed") return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        tl.clientName.toLowerCase().includes(q) ||
        tl.propertyAddress.toLowerCase().includes(q) ||
        tl.secureToken.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1240px] w-full font-sans space-y-6 text-[#183249]">

      {/* ── Page Header ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-4 border-b border-[#e2e5e5]">
        <div>
          <div className="text-[9.5px] font-bold uppercase tracking-[1.4px] text-[#28715e] mb-1">
            Secure Portals &amp; Access Governance · Hart Homes
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#183249]">
            TrustLink Portals
          </h1>
          <p className="text-xs text-[#64727e] mt-1 max-w-2xl leading-relaxed">
            Manage secure collaboration portals: configure scoped document permissions, copy cryptographic access tokens, monitor activity, and protect proprietary trade costs.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <button
            onClick={() => alert("Issue New TrustLink: Select an approved workspace and generate a time-limited scoped portal token.")}
            className="px-4 py-2 bg-[#0F1A2C] hover:bg-[#102d59] text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
          >
            + Generate TrustLink
          </button>
        </div>
      </div>

      {/* ── Security & Governance Counters ─────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-[#e2e5e5] rounded-2xl p-4 shadow-2xs">
          <div className="text-[10px] font-bold text-[#64727e] uppercase">Active Portals</div>
          <div className="text-xl font-bold text-[#183249] mt-0.5">2 Live Bridges</div>
          <div className="text-[10px] text-[#28715e] mt-0.5">Encrypted client channels</div>
        </div>

        <div className="bg-white border border-[#e2e5e5] rounded-2xl p-4 shadow-2xs">
          <div className="text-[10px] font-bold text-[#64727e] uppercase">Client Presence</div>
          <div className="text-xl font-bold text-[#28715e] mt-0.5">Alex Online</div>
          <div className="text-[10px] text-[#28715e] mt-0.5">14 total portal visits this week</div>
        </div>

        <div className="bg-white border border-[#e2e5e5] rounded-2xl p-4 shadow-2xs">
          <div className="text-[10px] font-bold text-[#64727e] uppercase">Access Privacy Guard</div>
          <div className="text-xl font-bold text-[#0F1A2C] mt-0.5">100% Scoped</div>
          <div className="text-[10px] text-[#0F1A2C] mt-0.5">Subcontractor rates redacted</div>
        </div>

        <div className="bg-white border border-[#e2e5e5] rounded-2xl p-4 shadow-2xs">
          <div className="text-[10px] font-bold text-[#64727e] uppercase">Pending Messages</div>
          <div className="text-xl font-bold text-[#946315] mt-0.5">1 Unread</div>
          <div className="text-[10px] text-[#946315] mt-0.5">Alex: Touchup paint query</div>
        </div>
      </div>

      {/* ── Filter & Search Toolbar ─────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
        <div className="w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client, token, or suburb..."
            className="w-full bg-white border border-[#e2e5e5] rounded-xl px-3.5 py-1.5 text-xs text-[#183249] placeholder-[#94a3b8] focus:outline-none focus:border-[#0F1A2C] shadow-2xs"
          />
        </div>

        {/* Dropdown on Top Right */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <label htmlFor="portal-filter" className="text-xs text-[#64727e] font-medium hidden sm:inline">
            Portal Status:
          </label>
          <div className="relative">
            <select
              id="portal-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-white border border-[#cbd5e2] hover:bg-[#F9F8F5] text-[#183249] rounded-xl px-3.5 py-1.5 text-xs font-semibold focus:outline-none focus:border-[#0F1A2C] shadow-2xs cursor-pointer appearance-none pr-8 transition-colors"
            >
              <option value="All">All Portals (3)</option>
              <option value="Active">Active Live Bridges (2)</option>
              <option value="Sealed">Sealed to Vault (1)</option>
            </select>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#64727e] text-[10px]">
              ▼
            </span>
          </div>
        </div>
      </div>

      {/* ── TrustLink Portals List ──────────────────────────────────── */}
      <div className="space-y-4">
        {filtered.map((portal) => (
          <article
            key={portal.id}
            className="bg-white border border-[#e2e5e5] rounded-2xl p-5 shadow-2xs space-y-4 hover:border-[#cbd5e1] transition-all"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-[#e2e5e5]">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#f0f4f8] text-[#0F1A2C] border border-[#cbd5e2]">
                    Token: {portal.secureToken}
                  </span>
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#f1f5f9] text-[#183249]">
                    {portal.propId}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${portal.statusColor}`}>
                    {portal.status}
                  </span>
                  <span className="text-[10px] font-semibold text-[#64727e]">
                    Receipt v{portal.permissionVersion}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#183249]">
                  {portal.clientName} · {portal.propertyAddress}
                </h3>
              </div>

              <div className="flex items-center gap-2 self-start lg:self-auto">
                <button
                  onClick={() => handleCopyLink(portal.secureToken)}
                  className="px-3 py-1.5 bg-[#F9F8F5] hover:bg-[#e8edf2] text-[#0F1A2C] text-xs font-bold rounded-lg border border-[#e2e5e5] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>🔗</span>
                  <span>{copiedId === portal.secureToken ? "Copied Link!" : "Copy Portal Link"}</span>
                </button>
                <Link
                  href={`/trustlinks/${portal.id}`}
                  className="px-3 py-1.5 bg-white hover:bg-[#F9F8F5] text-[#183249] text-xs font-semibold rounded-lg border border-[#cbd5e2] transition-colors"
                >
                  Client Preview ↗
                </Link>
              </div>
            </div>

            {/* Scoped Boundary & Activity Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#fafbfc] border border-[#e2e5e5] space-y-1">
                <div className="text-[10px] font-bold text-[#64727e] uppercase">Document Scope</div>
                <div className="font-bold text-[#183249]">{portal.sharedDocsCount} documents scoped</div>
                <div className="text-[10.5px] text-[#28715e]">Address included · Form 16/43</div>
              </div>

              <div className="p-3 rounded-xl bg-[#fafbfc] border border-[#e2e5e5] space-y-1">
                <div className="text-[10px] font-bold text-[#64727e] uppercase">Privacy &amp; Redaction</div>
                <div className="font-bold text-[#28715e]">Zero Cost Exposure</div>
                <div className="text-[10.5px] text-[#5b6e84]">Subbie margins &amp; internal logs hidden</div>
              </div>

              <div className="p-3 rounded-xl bg-[#fafbfc] border border-[#e2e5e5] space-y-1">
                <div className="text-[10px] font-bold text-[#64727e] uppercase">Session &amp; Expiry</div>
                <div className="font-bold text-[#183249]">Active: {portal.lastClientVisit}</div>
                <div className="text-[10.5px] text-[#64727e]">{portal.expiresIn}</div>
              </div>
            </div>

            {/* Footer Toolbar */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-t border-[#e2e5e5]">
              <div className="flex items-center gap-2">
                {portal.unreadMessagesCount > 0 && (
                  <span className="text-[10.5px] font-bold px-2 py-0.5 rounded bg-[#fbf3e4] text-[#946315] border border-[#fce3b8]">
                    💬 1 Pending Client Query
                  </span>
                )}
                <span className="text-[11px] text-[#64727e]">
                  Bound to client sovereign property ID
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/pro/trustlinks/${portal.id}`}
                  className="px-3.5 py-1.5 bg-[#0F1A2C] hover:bg-[#1c3a54] text-white text-xs font-bold rounded-lg transition-colors shadow-2xs flex items-center gap-1"
                >
                  <span>🛡️ Enter Collaboration Workspace</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}
