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
  propertyType: "Prop ID" | "Renovation";
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
    purpose: "AS 4349.1 timber pest audit & structural inspection",
    property: "7 Cedar Street, Graceville",
    propertyType: "Renovation",
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
    <div className="w-full flex-1 flex flex-col bg-[#F9F8F5] text-[#183249]">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-9 py-8 w-full flex-1">

        {/* ── Breadcrumb & Back to My Property World ─────────────────── */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <Link
            href="/properties"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#F9F8F5] text-[#183249] text-[12px] font-semibold rounded-lg border border-[#e2e5e5] transition-colors shadow-2xs group cursor-pointer"
            title="Back to My Property World"
          >
            <span className="transition-transform group-hover:-translate-x-0.5 font-bold">←</span>
            <span>Back</span>
          </Link>
          <span className="h-4 w-px bg-[#e2e5e5]" />
          <nav className="flex items-center gap-2 text-[11px] text-[#64727e]" aria-label="Breadcrumb">
            <Link href="/properties" className="hover:underline">My Property World</Link>
            <span>›</span>
            <span className="text-[#183249] font-semibold">Trust Link</span>
          </nav>
        </div>

        {/* ── Page Header ────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-7">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#28715e] mb-1">
              People &amp; permissions
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.8px] text-[#183249]">
              Trust Link
            </h1>
            <p className="text-[13px] text-[#64727e] mt-1">
              See who has access, what is shared and when it ends.
            </p>
          </div>

          <Link
            href="/explore"
            className="px-4 py-2.5 bg-[#0F1A2C] hover:bg-[#102d59] text-white rounded-xl text-[12px] font-semibold transition-colors flex items-center gap-2 shadow-sm self-start sm:self-auto"
          >
            <span>+ Find someone to connect</span>
          </Link>
        </div>

        {/* ── Summary Counters (Prototype 3-col record summary) ──────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-[#e2e5e5] rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[#183249]">
                {TRUSTLINKS.filter((t) => t.status === "active").length}
              </span>
              <span className="text-lg">🛡️</span>
            </div>
            <span className="text-[12px] text-[#64727e]">Connected</span>
          </div>

          <div className="bg-white border border-[#e2e5e5] rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[#183249]">
                {TRUSTLINKS.filter((t) => t.status === "pending").length}
              </span>
              <span className="text-lg">🕒</span>
            </div>
            <span className="text-[12px] text-[#64727e]">Awaiting reply</span>
          </div>

          <div className="bg-white border border-[#e2e5e5] rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[#183249]">
                {TRUSTLINKS.filter((t) => t.status === "paused").length}
              </span>
              <span className="text-lg">⏸️</span>
            </div>
            <span className="text-[12px] text-[#64727e]">Paused by you</span>
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
                    ? "bg-[#0F1A2C] text-white"
                    : "bg-white border border-[#e2e5e5] text-[#64727e] hover:bg-[#F9F8F5]"
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
              className="bg-white border border-[#e2e5e5] rounded-xl px-3 py-1.5 text-[12px] text-[#183249] font-medium focus:outline-none"
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
                className="bg-white border border-[#e2e5e5] rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl font-serif font-bold text-lg flex items-center justify-center flex-shrink-0 ${
                        tl.avatarTone === "blue"
                          ? "bg-[#e6eaf3] text-[#425b7c]"
                          : tl.avatarTone === "green"
                          ? "bg-[#eaf4ef] text-[#28715e]"
                          : "bg-[#eee8dc] text-[#76623f]"
                      }`}>
                        {tl.initials}
                      </div>
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-[1px] text-[#64727e] block">
                          TRUST LINK
                        </span>
                        <h3 className="text-base font-bold text-[#183249] leading-tight">
                          {tl.name}
                        </h3>
                        <p className="text-[11px] text-[#64727e]">
                          {tl.role}
                        </p>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      tl.status === "active"
                        ? "bg-[#eaf4ef] text-[#28715e]"
                        : tl.status === "pending"
                        ? "bg-[#fbf3e4] text-[#946315]"
                        : "bg-[#fbeeee] text-[#a34b43]"
                    }`}>
                      {tl.statusLabel}
                    </span>
                  </div>

                  <p className="text-[13px] font-medium text-[#183249] mb-3">
                    {tl.purpose}
                  </p>

                  <div className="bg-[#F9F8F5] p-2.5 rounded-lg flex items-center gap-2 text-[11px] text-[#183249] mb-4">
                    <span>{tl.propertyType === "Prop ID" ? "🏠" : "🔨"}</span>
                    <span>{tl.property} · {tl.propertyType}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-[11px] text-[#64727e] py-3 border-t border-[#e2e5e5] mb-4">
                    <div>
                      <span className="block text-[9px] uppercase tracking-[0.7px] text-[#8a97a7]">Shared documents</span>
                      <strong className="text-[#183249] font-semibold">{tl.sharedDocsCount} selected</strong>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase tracking-[0.7px] text-[#8a97a7]">Permission ends</span>
                      <strong className="text-[#183249] font-semibold">{tl.expiry}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#e2e5e5] flex items-center justify-between text-[11px]">
                  <Link
                    href={`/trustlinks/${tl.id}`}
                    className="px-3.5 py-1.5 bg-[#F9F8F5] hover:bg-[#e4ebf5] text-[#0F1A2C] font-bold rounded-lg transition-colors"
                  >
                    Open Trust Link →
                  </Link>
                  <Link
                    href={`/trustlinks/${tl.id}?tab=conversation`}
                    className="text-[#64727e] hover:text-[#183249] font-semibold flex items-center gap-1"
                  >
                    <span>💬 Message</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#e2e5e5] rounded-2xl p-12 text-center my-6">
            <span className="text-3xl block mb-2">🛡️</span>
            <h3 className="text-base font-bold text-[#183249]">No connections in this view</h3>
            <p className="text-[12px] text-[#64727e] mt-1 mb-4">
              Change the filter or start with a professional who fits what you need.
            </p>
            <button
              onClick={() => { setFilter("all"); setPropertyFilter("all"); }}
              className="px-4 py-2 bg-[#0F1A2C] text-white text-[12px] font-semibold rounded-xl"
            >
              Show all Trust Links
            </button>
          </div>
        )}

        {/* ── Privacy Notice at Bottom ───────────────────────────── */}
        <div className="p-4 rounded-xl bg-[#eaf0f6] border border-[#e2e5e5] flex items-center gap-3 text-[12px] text-[#4e6582] mb-8">
          <span className="text-base flex-shrink-0">🔒</span>
          <span>
            Your property record stays with you when a connection ends. Professional access is specific to the information and time period you approve.
          </span>
        </div>

      </div>
    </div>
  );
}
