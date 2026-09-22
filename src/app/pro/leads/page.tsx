"use client";
import React, { useState } from "react";
import Link from "next/link";

interface Lead {
  id: string;
  name: string;
  initials: string;
  type: string;
  suburb: string;
  state: string;
  propId: string;
  budget: string;
  financeStatus: string;
  date: string;
  status: "New" | "In Review" | "TrustLink Issued";
  statusColor: string;
  soilClass: string;
  lotSize: string;
  zoning: string;
  messageSnippet: string;
}

const LEADS: Lead[] = [
  {
    id: "L-101",
    name: "James & Sarah Davidson",
    initials: "JD",
    type: "New Custom Home (4 Bed, 3 Bath, Double Garage, In-ground Pool)",
    suburb: "Bardon",
    state: "QLD 4065",
    propId: "TPH-BAR-019",
    budget: "$950,000 – $1,100,000 AUD",
    financeStatus: "Macquarie Bank Pre-Approved",
    date: "Today, 10:45 AM",
    status: "New",
    statusColor: "bg-[#fff4df] text-[#8b641c]",
    soilClass: "Class H1 (Highly Reactive)",
    lotSize: "580 m² (2.8m Site Slope)",
    zoning: "Low Density Residential (BCC)",
    messageSnippet: "Settled on titled block on Simpsons Road. Contour survey shows 2.8m slope. Looking to review architectural drawings in TrustLink.",
  },
  {
    id: "L-102",
    name: "Aisha Khan",
    initials: "AK",
    type: "Knockdown & Architectural Rebuild",
    suburb: "Newstead",
    state: "QLD 4006",
    propId: "TPH-NWS-041",
    budget: "$800,000 – $950,000 AUD",
    financeStatus: "CBA Construction Loan Ready",
    date: "Yesterday, 3:20 PM",
    status: "New",
    statusColor: "bg-[#fff4df] text-[#8b641c]",
    soilClass: "Class M (Moderately Reactive)",
    lotSize: "420 m² Flat Post-War Lot",
    zoning: "Character Residential (CR2)",
    messageSnippet: "Planning demolition of existing post-war cottage and building contemporary 2-storey home. Need council BA guidance.",
  },
  {
    id: "L-103",
    name: "Thomas Murray",
    initials: "TM",
    type: "Master Wing Extension & Covered Alfresco Pavilion",
    suburb: "Fig Tree Pocket",
    state: "QLD 4069",
    propId: "TPH-FTP-004",
    budget: "$380,000 – $450,000 AUD",
    financeStatus: "Self-Funded / Cash Ready",
    date: "2 days ago",
    status: "In Review",
    statusColor: "bg-[#eaf5ef] text-[#24754c]",
    soilClass: "Class S (Slightly Reactive)",
    lotSize: "1,120 m² Riverfront Lot",
    zoning: "Low Density Residential",
    messageSnippet: "Expanding master suite and building outdoor kitchen pavilion. DA approval already granted by Brisbane City Council.",
  },
  {
    id: "L-104",
    name: "Lachlan & Sophie Taylor",
    initials: "LT",
    type: "Victorian Terrace Structural Renovation",
    suburb: "Paddington",
    state: "QLD 4064",
    propId: "TPH-PAD-088",
    budget: "$720,000 AUD",
    financeStatus: "ANZ Wealth Pre-Approval",
    date: "4 days ago",
    status: "TrustLink Issued",
    statusColor: "bg-[#f3f6fb] text-[#68788e]",
    soilClass: "Rock / Class M",
    lotSize: "310 m² Narrow Terrace",
    zoning: "Traditional Building Character",
    messageSnippet: "Internal structural remodel with rear glass atrium. TrustLink TL-99214-B issued and plans shared.",
  },
];

export default function LeadsPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = LEADS.filter((lead) => {
    const matchesFilter =
      filter === "All" ||
      (filter === "New" && lead.status === "New") ||
      (filter === "In Review" && lead.status === "In Review") ||
      (filter === "TrustLink Issued" && lead.status === "TrustLink Issued");
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.suburb.toLowerCase().includes(search.toLowerCase()) ||
      lead.propId.toLowerCase().includes(search.toLowerCase()) ||
      lead.type.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 sm:p-9 lg:p-11 max-w-[1240px] w-full font-sans">
      {/* ── Page Header ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <div className="text-[9px] font-bold uppercase tracking-[1.4px] text-[#24754c] mb-1">
            Pro Hub · Data &amp; Lead Management (DLM)
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.8px] text-[#102645]">
            Incoming Enquiries &amp; Leads
          </h1>
          <p className="text-[13px] text-[#68788e] mt-1">
            Verified inbound homeowner connections with structured property data, soil parameters, and bank pre-approvals.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Link
            href="/pro/customers"
            className="px-4 py-2.5 bg-white border border-[#cbd5e2] hover:bg-[#f3f6fb] text-[#102645] rounded-xl text-[12px] font-semibold transition-colors shadow-sm"
          >
            Property Data Records
          </Link>
          <Link
            href="/pro/trustlinks"
            className="px-4 py-2.5 bg-[#071d3b] hover:bg-[#102d59] text-white rounded-xl text-[12px] font-semibold transition-colors shadow-sm flex items-center gap-1.5"
          >
            <span>Active TrustLinks →</span>
          </Link>
        </div>
      </div>

      {/* ── DLM Metrics Bar ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-3xl font-bold tracking-tight text-[#102645]">3</span>
            <span className="text-lg">📥</span>
          </div>
          <strong className="block text-[13px] text-[#102645]">New Inbound Enquiries</strong>
          <small className="text-[11px] text-[#68788e]">2 with complete cadastral and soil data</small>
        </div>

        <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-3xl font-bold tracking-tight text-[#24754c]">100%</span>
            <span className="text-lg">📐</span>
          </div>
          <strong className="block text-[13px] text-[#102645]">Site Data Attached</strong>
          <small className="text-[11px] text-[#68788e]">Zero manual chasing for zoning &amp; slope</small>
        </div>

        <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-3xl font-bold tracking-tight text-[#102645]">1-Click</span>
            <span className="text-lg">⚡</span>
          </div>
          <strong className="block text-[13px] text-[#102645]">TrustLink Issuance</strong>
          <small className="text-[11px] text-[#68788e]">Instant sovereign workspace onboarding</small>
        </div>
      </div>

      {/* ── Search & Filter Bar ──────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: "All", label: "All Enquiries" },
            { id: "New", label: "🔥 New with Site Data (2)" },
            { id: "In Review", label: "In Review" },
            { id: "TrustLink Issued", label: "TrustLink Issued" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all whitespace-nowrap ${
                filter === f.id
                  ? "bg-[#071d3b] text-white font-semibold shadow-sm"
                  : "bg-white border border-[#dfe6ef] text-[#68788e] hover:bg-[#f3f6fb]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client, suburb, or Prop ID..."
            className="w-full bg-white border border-[#dfe6ef] rounded-xl px-3.5 py-2 text-[12px] text-[#102645] focus:outline-none"
          />
        </div>
      </div>

      {/* ── DLM Lead Cards List ──────────────────────────────────────── */}
      <div className="space-y-4 mb-10">
        {filtered.map((lead) => (
          <article
            key={lead.id}
            className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          >
            {/* Left Column: Client & Project Scope */}
            <div className="flex items-start gap-4 min-w-0 max-w-xl">
              <div className="w-12 h-12 rounded-xl bg-[#e6eaf3] text-[#425b7c] font-serif font-bold text-lg flex items-center justify-center flex-shrink-0">
                {lead.initials}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h2 className="text-base font-bold text-[#102645]">
                    {lead.name}
                  </h2>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${lead.statusColor}`}>
                    {lead.status === "New" ? "🔥 New Lead" : lead.status}
                  </span>
                  <span className="text-[11px] text-[#8a97a7]">
                    {lead.date}
                  </span>
                </div>

                <div className="text-[13px] font-semibold text-[#102645] mt-1">
                  {lead.type}
                </div>

                <p className="text-[12px] text-[#68788e] italic mt-1 line-clamp-2">
                  &ldquo;{lead.messageSnippet}&rdquo;
                </p>

                {/* Attached Property Data Badges */}
                <div className="flex items-center gap-2 flex-wrap mt-3 pt-3 border-t border-[#f0f4f8] text-[11px]">
                  <span className="font-mono font-bold text-[#071d3b] bg-[#f3f6fb] px-2 py-0.5 rounded">
                    📍 {lead.propId}
                  </span>
                  <span className="bg-[#eaf5ef] text-[#24754c] font-medium px-2 py-0.5 rounded">
                    🌱 {lead.soilClass}
                  </span>
                  <span className="bg-[#f3f6fb] text-[#556b83] px-2 py-0.5 rounded">
                    📐 {lead.lotSize}
                  </span>
                  <span className="bg-[#f3f6fb] text-[#556b83] px-2 py-0.5 rounded">
                    🏛️ {lead.zoning}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Financial Qualification & 1-Click Action */}
            <div className="lg:text-right flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 flex-shrink-0 border-t lg:border-t-0 pt-4 lg:pt-0 border-[#dfe6ef]">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#68788e]">
                  Budget &amp; Funding
                </div>
                <div className="text-sm font-bold text-[#102645]">
                  {lead.budget}
                </div>
                <div className="text-[11px] text-[#24754c] font-semibold flex items-center lg:justify-end gap-1 mt-0.5">
                  <span>✓</span>
                  <span>{lead.financeStatus}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <Link
                  href={`/pro/leads/${lead.id}`}
                  className="w-full sm:w-auto px-4 py-2.5 bg-[#071d3b] hover:bg-[#102d59] text-white font-bold rounded-xl text-[12px] transition-colors shadow-sm flex items-center justify-center gap-1.5 text-center"
                >
                  <span>Inspect Data &amp; Respond →</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ── DLM Builder Guidance Notice ─────────────────────────────── */}
      <div className="p-5 rounded-2xl bg-[#eaf0f6] border border-[#dfe6ef] flex items-start sm:items-center gap-3.5 text-[12px] text-[#4e6582]">
        <span className="text-xl flex-shrink-0">💡</span>
        <div>
          <strong className="text-[#102645] block mb-0.5">How Data &amp; Lead Management (DLM) saves your daily time:</strong>
          Every inquiry enters directly from the consumer&apos;s TPH Property Passport. You do not need to request basic site maps, zoning certificates or pre-approval letters—they are already attached to the permanent Prop ID.
        </div>
      </div>
    </div>
  );
}
