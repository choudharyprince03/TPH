"use client";
import Link from "next/link";
import React, { useState } from "react";

interface TrustLinkItem {
  id: string;
  name: string;
  initials: string;
  avatarTone: "blue" | "green" | "sand";
  role: string;
  business: string;
  purpose: string;
  property: string;
  propertyType: "Prop ID" | "Saved space";
  status: "active" | "pending" | "paused" | "ended";
  statusLabel: string;
  sharedDocsCount: number;
  expiry: string;
}

const TRUSTLINKS: TrustLinkItem[] = [
  {
    id: "welcome",
    name: "Olivia Hart",
    initials: "OH",
    avatarTone: "blue",
    role: "Builder & handover contact",
    business: "Hart Homes · Example business",
    purpose: "New home handover",
    property: "18 Banksia Crescent, Kenmore",
    propertyType: "Prop ID",
    status: "active",
    statusLabel: "Active",
    sharedDocsCount: 3,
    expiry: "in 30 days",
  },
  {
    id: "TL-88301-A",
    name: "Lachlan Vance",
    initials: "LV",
    avatarTone: "green",
    role: "Licensed Conveyancer",
    business: "River City Conveyancing",
    purpose: "Settlement contract & PEXA workspace",
    property: "18 Banksia Crescent, Kenmore",
    propertyType: "Prop ID",
    status: "active",
    statusLabel: "Active",
    sharedDocsCount: 4,
    expiry: "in 45 days",
  },
  {
    id: "TL-76100-C",
    name: "Claire Dupont",
    initials: "CD",
    avatarTone: "sand",
    role: "Lead Building & Pest Inspector",
    business: "Dupont Property Inspections",
    purpose: "Pre-purchase AS 4349.1 timber pest audit",
    property: "7 Cedar Street, Graceville",
    propertyType: "Saved space",
    status: "pending",
    statusLabel: "Awaiting reply",
    sharedDocsCount: 2,
    expiry: "in 14 days",
  },
];

export default function TrustLinksListPage() {
  const [filter, setFilter] = useState<string>("all");
  const [propertyFilter, setPropertyFilter] = useState<string>("all");

  const filtered = TRUSTLINKS.filter((tl) => {
    if (filter === "open" && !["active", "pending"].includes(tl.status)) return false;
    if (filter === "pending" && tl.status !== "pending") return false;
    if (filter === "paused" && tl.status !== "paused") return false;
    if (filter === "ended" && tl.status !== "ended") return false;

    if (propertyFilter !== "all" && !tl.property.toLowerCase().includes(propertyFilter.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="w-full flex-1 flex flex-col bg-[#f4f6f8] text-[#102645]">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-9 py-8 w-full flex-1">

        {/* ── Breadcrumb ─────────────────────────────────────────────── */}
        <nav className="flex items-center gap-2 text-[11px] text-[#68788e] mb-6" aria-label="Breadcrumb">
          <Link href="/properties" className="hover:underline">My Property World</Link>
          <span>›</span>
          <span className="text-[#102645] font-semibold">Trust Link</span>
        </nav>

        {/* ── Page Header ────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-7">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#24754c] mb-1">
              People &amp; permissions
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.8px] text-[#102645]">
              Trust Link
            </h1>
            <p className="text-[13px] text-[#68788e] mt-1">
              See who has access, what is shared and when it ends.
            </p>
          </div>

          <Link
            href="/explore"
            className="px-4 py-2.5 bg-[#071d3b] hover:bg-[#102d59] text-white rounded-xl text-[12px] font-semibold transition-colors flex items-center gap-2 shadow-sm self-start sm:self-auto"
          >
            <span>+ Find someone to connect</span>
          </Link>
        </div>

        {/* ── Summary Counters (Prototype 3-col record summary) ──────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-[#dfe6ef] rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[#102645]">
                {TRUSTLINKS.filter((t) => t.status === "active").length}
              </span>
              <span className="text-lg">🛡️</span>
            </div>
            <span className="text-[12px] text-[#68788e]">Connected</span>
          </div>

          <div className="bg-white border border-[#dfe6ef] rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[#102645]">
                {TRUSTLINKS.filter((t) => t.status === "pending").length}
              </span>
              <span className="text-lg">🕒</span>
            </div>
            <span className="text-[12px] text-[#68788e]">Awaiting reply</span>
          </div>

          <div className="bg-white border border-[#dfe6ef] rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[#102645]">
                {TRUSTLINKS.filter((t) => t.status === "paused").length}
              </span>
              <span className="text-lg">⏸️</span>
            </div>
            <span className="text-[12px] text-[#68788e]">Paused by you</span>
          </div>
        </div>

        {/* ── Filters & Property Selector Bar ────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: "all", label: "All" },
              { id: "open", label: "Open" },
              { id: "pending", label: "Awaiting reply" },
              { id: "paused", label: "Paused" },
              { id: "ended", label: "Ended" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all whitespace-nowrap ${
                  filter === f.id
                    ? "bg-[#071d3b] text-white"
                    : "bg-white border border-[#dfe6ef] text-[#68788e] hover:bg-[#f3f6fb]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div>
            <label htmlFor="property-filter" className="sr-only">Filter by property</label>
            <select
              id="property-filter"
              value={propertyFilter}
              onChange={(e) => setPropertyFilter(e.target.value)}
              className="bg-white border border-[#dfe6ef] rounded-xl px-3 py-1.5 text-[12px] text-[#102645] font-medium focus:outline-none"
            >
              <option value="all">All properties &amp; enquiries</option>
              <option value="Banksia">18 Banksia Crescent, Kenmore</option>
              <option value="Cedar">7 Cedar Street, Graceville</option>
            </select>
          </div>
        </div>

        {/* ── TrustLink Cards Grid ───────────────────────────────────── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {filtered.map((tl) => (
              <article
                key={tl.id}
                className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl font-serif font-bold text-lg flex items-center justify-center flex-shrink-0 ${
                        tl.avatarTone === "blue"
                          ? "bg-[#e6eaf3] text-[#425b7c]"
                          : tl.avatarTone === "green"
                          ? "bg-[#eaf5ef] text-[#24754c]"
                          : "bg-[#eee8dc] text-[#76623f]"
                      }`}>
                        {tl.initials}
                      </div>
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-[1px] text-[#68788e] block">
                          TRUST LINK
                        </span>
                        <h3 className="text-base font-bold text-[#102645] leading-tight">
                          {tl.name}
                        </h3>
                        <p className="text-[11px] text-[#68788e]">
                          {tl.role}
                        </p>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      tl.status === "active"
                        ? "bg-[#eaf5ef] text-[#24754c]"
                        : tl.status === "pending"
                        ? "bg-[#fff4df] text-[#8b641c]"
                        : "bg-[#fbeeee] text-[#a44042]"
                    }`}>
                      {tl.statusLabel}
                    </span>
                  </div>

                  <p className="text-[13px] font-medium text-[#102645] mb-3">
                    {tl.purpose}
                  </p>

                  <div className="bg-[#f3f6fb] p-2.5 rounded-lg flex items-center gap-2 text-[11px] text-[#102645] mb-4">
                    <span>{tl.propertyType === "Prop ID" ? "🏠" : "❤️"}</span>
                    <span>{tl.property} · {tl.propertyType}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-[11px] text-[#68788e] py-3 border-t border-[#dfe6ef] mb-4">
                    <div>
                      <span className="block text-[9px] uppercase tracking-[0.7px] text-[#8a97a7]">Shared documents</span>
                      <strong className="text-[#102645] font-semibold">{tl.sharedDocsCount} selected</strong>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase tracking-[0.7px] text-[#8a97a7]">Permission ends</span>
                      <strong className="text-[#102645] font-semibold">{tl.expiry}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#dfe6ef] flex items-center justify-between text-[11px]">
                  <Link
                    href={`/trustlinks/${tl.id}`}
                    className="px-3.5 py-1.5 bg-[#f3f6fb] hover:bg-[#e4ebf5] text-[#071d3b] font-bold rounded-lg transition-colors"
                  >
                    Open Trust Link →
                  </Link>
                  <Link
                    href={`/trustlinks/${tl.id}?tab=conversation`}
                    className="text-[#68788e] hover:text-[#102645] font-semibold flex items-center gap-1"
                  >
                    <span>💬 Message</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#dfe6ef] rounded-2xl p-12 text-center my-6">
            <span className="text-3xl block mb-2">🛡️</span>
            <h3 className="text-base font-bold text-[#102645]">No connections in this view</h3>
            <p className="text-[12px] text-[#68788e] mt-1 mb-4">
              Change the filter or start with a professional who fits what you need.
            </p>
            <button
              onClick={() => { setFilter("all"); setPropertyFilter("all"); }}
              className="px-4 py-2 bg-[#071d3b] text-white text-[12px] font-semibold rounded-xl"
            >
              Show all Trust Links
            </button>
          </div>
        )}

        {/* ── Sovereignty Notice at Bottom ───────────────────────────── */}
        <div className="p-4 rounded-xl bg-[#eaf0f6] border border-[#dfe6ef] flex items-center gap-3 text-[12px] text-[#4e6582] mb-8">
          <span className="text-base flex-shrink-0">🔒</span>
          <span>
            Your property record stays with you when a connection ends. Professional access is specific to the information and time period you approve.
          </span>
        </div>

      </div>
    </div>
  );
}
