"use client";

import React, { useState } from "react";
import Link from "next/link";

interface ClientAccount {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  solicitorContact: string;
  propId: string;
  propertyAddress: string;
  totalContractValue: string;
  invoicedToDate: string;
  invoicedPercentage: number;
  currentStageClaim: string;
  claimAmount: string;
  claimStatus: "Pending Signoff" | "Paid" | "Approved";
  claimStatusColor: string;
  approvedVariationsTotal: string;
  accountStanding: "Good Standing" | "Action Required" | "Settled Account";
  standingColor: string;
}

const CLIENT_ACCOUNTS: ClientAccount[] = [
  {
    id: "CL-101",
    name: "Alex & Emily",
    initials: "AE",
    email: "alex.emily@example.com",
    phone: "+61 412 890 234",
    solicitorContact: "Lachlan Vance (River City Conveyancing)",
    propId: "TPH-KEN-018",
    propertyAddress: "18 Banksia Crescent, Kenmore QLD",
    totalContractValue: "$1,180,000 AUD",
    invoicedToDate: "$1,062,000 AUD",
    invoicedPercentage: 90,
    currentStageClaim: "Stage 5: Practical Completion (Final 10%)",
    claimAmount: "$118,000 AUD",
    claimStatus: "Pending Signoff",
    claimStatusColor: "bg-[#fbf3e4] text-[#946315] border-[#fce3b8]",
    approvedVariationsTotal: "+$1,400 AUD (Form 7 Caesarstone)",
    accountStanding: "Action Required",
    standingColor: "bg-[#fbf3e4] text-[#946315] border-[#fce3b8]",
  },
  {
    id: "CL-102",
    name: "Sofia Nguyen",
    initials: "SN",
    email: "s.nguyen@example.com.au",
    phone: "+61 423 555 781",
    solicitorContact: "David Chen Legal Practice",
    propId: "TPH-GRV-007",
    propertyAddress: "7 Cedar Street, Graceville QLD",
    totalContractValue: "$940,000 AUD",
    invoicedToDate: "$611,000 AUD",
    invoicedPercentage: 65,
    currentStageClaim: "Stage 4: Fixing & Cabinetry Progress Claim",
    claimAmount: "$141,000 AUD",
    claimStatus: "Paid",
    claimStatusColor: "bg-[#eaf4ef] text-[#28715e] border-[#c7e3d1]",
    approvedVariationsTotal: "$0 AUD",
    accountStanding: "Good Standing",
    standingColor: "bg-[#eaf4ef] text-[#28715e] border-[#c7e3d1]",
  },
  {
    id: "CL-103",
    name: "Noah & Mia Wilson",
    initials: "NW",
    email: "noah.wilson@example.com",
    phone: "+61 401 223 908",
    solicitorContact: "Bell & Co Commercial Solicitors",
    propId: "TPH-BRK-042",
    propertyAddress: "42 Ridge Road, Brookfield QLD",
    totalContractValue: "$1,450,000 AUD",
    invoicedToDate: "$1,450,000 AUD",
    invoicedPercentage: 100,
    currentStageClaim: "Stage 6: Final Settlement Reconciled",
    claimAmount: "$0 AUD",
    claimStatus: "Paid",
    claimStatusColor: "bg-[#eaf4ef] text-[#28715e] border-[#c7e3d1]",
    approvedVariationsTotal: "+$8,500 AUD (Reconciled)",
    accountStanding: "Settled Account",
    standingColor: "bg-[#F9F8F5] text-[#64727e] border-[#e2e5e5]",
  },
];

export default function ProCustomersPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = CLIENT_ACCOUNTS.filter((client) => {
    if (filter === "Action" && client.accountStanding !== "Action Required") return false;
    if (filter === "Active" && client.accountStanding !== "Good Standing") return false;
    if (filter === "Settled" && client.accountStanding !== "Settled Account") return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        client.name.toLowerCase().includes(q) ||
        client.propertyAddress.toLowerCase().includes(q) ||
        client.email.toLowerCase().includes(q) ||
        client.propId.toLowerCase().includes(q)
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
            Client Relationship Management &amp; Commercial Billing (CRM) · Hart Homes
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#183249]">
            Client Accounts &amp; Billing
          </h1>
          <p className="text-xs text-[#64727e] mt-1 max-w-2xl leading-relaxed">
            Manage client commercial accounts: track contract sums, progressive stage claim invoices, variation billing balances, and solicitor contacts.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <button
            onClick={() => alert("Issue Stage Claim: Select a contract stage and generate a tax invoice with schedule of values.")}
            className="px-4 py-2 bg-[#0F1A2C] hover:bg-[#102d59] text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
          >
            + Create Stage Claim Invoice
          </button>
        </div>
      </div>

      {/* ── Financial Summary Counters ─────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-[#e2e5e5] rounded-2xl p-4 shadow-2xs">
          <div className="text-[10px] font-bold text-[#64727e] uppercase">Total Active Contracts</div>
          <div className="text-xl font-bold text-[#183249] mt-0.5">$3,570,000 AUD</div>
          <div className="text-[10px] text-[#28715e] mt-0.5">3 active client agreements</div>
        </div>

        <div className="bg-white border border-[#e2e5e5] rounded-2xl p-4 shadow-2xs">
          <div className="text-[10px] font-bold text-[#64727e] uppercase">Invoiced &amp; Collected</div>
          <div className="text-xl font-bold text-[#28715e] mt-0.5">$3,123,000 AUD</div>
          <div className="text-[10px] text-[#28715e] mt-0.5">87.5% progress collections</div>
        </div>

        <div className="bg-white border border-[#e2e5e5] rounded-2xl p-4 shadow-2xs">
          <div className="text-[10px] font-bold text-[#64727e] uppercase">Pending Stage Claims</div>
          <div className="text-xl font-bold text-[#946315] mt-0.5">$118,000 AUD</div>
          <div className="text-[10px] text-[#946315] mt-0.5">Alex &amp; Emily Practical Completion</div>
        </div>

        <div className="bg-white border border-[#e2e5e5] rounded-2xl p-4 shadow-2xs">
          <div className="text-[10px] font-bold text-[#64727e] uppercase">Variations Ledger</div>
          <div className="text-xl font-bold text-[#0F1A2C] mt-0.5">+$9,900 AUD</div>
          <div className="text-[10px] text-[#0F1A2C] mt-0.5">100% QBCC Form 7 signed</div>
        </div>
      </div>

      {/* ── Filter & Search Toolbar ─────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
        <div className="w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client name, email, or suburb..."
            className="w-full bg-white border border-[#e2e5e5] rounded-xl px-3.5 py-1.5 text-xs text-[#183249] placeholder-[#94a3b8] focus:outline-none focus:border-[#0F1A2C] shadow-2xs"
          />
        </div>

        {/* Dropdown on Top Right */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <label htmlFor="client-filter" className="text-xs text-[#64727e] font-medium hidden sm:inline">
            Status:
          </label>
          <div className="relative">
            <select
              id="client-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-white border border-[#cbd5e2] hover:bg-[#F9F8F5] text-[#183249] rounded-xl px-3.5 py-1.5 text-xs font-semibold focus:outline-none focus:border-[#0F1A2C] shadow-2xs cursor-pointer appearance-none pr-8 transition-colors"
            >
              <option value="All">All Clients (3)</option>
              <option value="Action">Claims Pending (1)</option>
              <option value="Active">Good Standing (1)</option>
              <option value="Settled">Settled Accounts (1)</option>
            </select>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#64727e] text-[10px]">
              ▼
            </span>
          </div>
        </div>
      </div>

      {/* ── Client Commercial Accounts Ledger ───────────────────────── */}
      <div className="space-y-4">
        {filtered.map((client) => (
          <article
            key={client.id}
            className="bg-white border border-[#e2e5e5] rounded-2xl p-5 shadow-2xs space-y-4 hover:border-[#cbd5e1] transition-all"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-[#e2e5e5]">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-[#e6eaf3] text-[#425b7c] font-serif font-bold text-lg flex items-center justify-center flex-shrink-0">
                  {client.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-[#183249]">
                      {client.name}
                    </h3>
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#f0f4f8] text-[#0F1A2C] border border-[#cbd5e2]">
                      {client.propId}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${client.standingColor}`}>
                      {client.accountStanding}
                    </span>
                  </div>

                  <p className="text-xs text-[#64727e] mt-0.5">
                    {client.propertyAddress} · {client.email} · {client.phone}
                  </p>
                  <p className="text-[11px] text-[#5b6e84] mt-0.5">
                    Solicitor / Legal Rep: <strong className="text-[#183249]">{client.solicitorContact}</strong>
                  </p>
                </div>
              </div>

              {/* Commercials Box */}
              <div className="flex items-center gap-4 bg-[#fafbfc] border border-[#e2e5e5] p-3 rounded-xl self-start lg:self-auto">
                <div>
                  <span className="text-[10px] font-bold text-[#64727e] uppercase block">Contract Value</span>
                  <span className="text-sm font-bold text-[#183249]">{client.totalContractValue}</span>
                </div>
                <div className="w-px h-8 bg-[#e2e5e5]" />
                <div>
                  <span className="text-[10px] font-bold text-[#64727e] uppercase block">Invoiced To Date</span>
                  <span className="text-sm font-bold text-[#28715e]">{client.invoicedToDate} ({client.invoicedPercentage}%)</span>
                </div>
              </div>
            </div>

            {/* Current Stage Claim & Variations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#f8fafc] border border-[#e2e5e5] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#183249]">{client.currentStageClaim}</span>
                  <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded border ${client.claimStatusColor}`}>
                    {client.claimStatus}
                  </span>
                </div>
                <div className="text-[#64727e] text-[11px]">
                  Claim Sum: <strong className="text-[#183249]">{client.claimAmount}</strong>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#f8fafc] border border-[#e2e5e5] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#183249]">Approved Variations Ledger</span>
                  <span className="text-[9.5px] font-bold px-2 py-0.5 rounded bg-[#eaf4ef] text-[#28715e] border border-[#c7e3d1]">
                    Form 7 Compliant
                  </span>
                </div>
                <div className="text-[#64727e] text-[11px]">
                  Total Added to Contract: <strong className="text-[#183249]">{client.approvedVariationsTotal}</strong>
                </div>
              </div>
            </div>

            {/* Footer Toolbar */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-t border-[#e2e5e5]">
              <span className="text-[11px] text-[#64727e]">
                All progressive claims issued per QBCC building contract schedule.
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Generating statement of accounts for ${client.name}...`)}
                  className="px-3 py-1.5 bg-white border border-[#cbd5e2] hover:bg-[#F9F8F5] text-[#183249] rounded-lg font-semibold transition-colors shadow-2xs"
                >
                  Download Statement
                </button>
                <Link
                  href={`/pro/digital-key`}
                  className="px-3.5 py-1.5 bg-[#0F1A2C] hover:bg-[#1c3a54] text-white rounded-lg font-bold transition-colors shadow-2xs"
                >
                  View Digital Key Packs →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}
