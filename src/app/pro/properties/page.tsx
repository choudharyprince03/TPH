"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PropertyPulseNotification } from "@/components/features/PropertyPulse";

interface ConstructionSite {
  id: string;
  propId: string;
  address: string;
  suburb: string;
  supervisor: string;
  currentMilestone: string;
  milestoneProgress: number;
  lotPlan: string;
  councilDA: string;
  activeTradesOnSite: string[];
  weatherDelayDays: number;
  openPunchListItems: number;
  stageStatus: "Practical Completion" | "Fixing & Fit-out" | "Warranty Care";
  statusColor: string;
}

const CONSTRUCTION_SITES: ConstructionSite[] = [
  {
    id: "PRJ-018",
    propId: "TPH-KEN-018",
    address: "18 Banksia Crescent",
    suburb: "Kenmore QLD 4069",
    supervisor: "Mark Evans (Site Supervisor)",
    currentMilestone: "Milestone 5: Practical Completion & Handover Inspection",
    milestoneProgress: 92,
    lotPlan: "Lot 18 on RP 88201",
    councilDA: "BCC DA-2023-41829",
    activeTradesOnSite: ["Miller Tiling (Sealant Touch-up)", "Prime Finish Painters"],
    weatherDelayDays: 0,
    openPunchListItems: 2,
    stageStatus: "Practical Completion",
    statusColor: "bg-[#fbf3e4] text-[#946315] border-[#fce3b8]",
  },
  {
    id: "PRJ-007",
    propId: "TPH-GRV-007",
    address: "7 Cedar Street",
    suburb: "Graceville QLD 4075",
    supervisor: "Mark Evans (Site Supervisor)",
    currentMilestone: "Milestone 4: Internal Fixing & Joinery Installation",
    milestoneProgress: 65,
    lotPlan: "Lot 12 on RP 48102",
    councilDA: "BCC DA-2024-11029",
    activeTradesOnSite: ["Lachlan Electrical (Rough-in)", "Custom Joinery Brisbane"],
    weatherDelayDays: 2,
    openPunchListItems: 0,
    stageStatus: "Fixing & Fit-out",
    statusColor: "bg-[#eaf4ef] text-[#28715e] border-[#c7e3d1]",
  },
  {
    id: "PRJ-042",
    propId: "TPH-BRK-042",
    address: "42 Ridge Road",
    suburb: "Brookfield QLD 4069",
    supervisor: "Olivia Hart (Director)",
    currentMilestone: "Milestone 6: Post-Settlement Structural Warranty Audit",
    milestoneProgress: 100,
    lotPlan: "Lot 5 on SP 182301",
    councilDA: "BCC DA-2022-89211",
    activeTradesOnSite: ["Termimesh Annual Inspector (Scheduled)"],
    weatherDelayDays: 0,
    openPunchListItems: 0,
    stageStatus: "Warranty Care",
    statusColor: "bg-[#F9F8F5] text-[#64727e] border-[#e2e5e5]",
  },
];

export default function ProPropertiesPage() {
  const [filter, setFilter] = useState("All");

  const filtered = CONSTRUCTION_SITES.filter((p) => {
    if (filter === "Handover" && p.stageStatus !== "Practical Completion") return false;
    if (filter === "Active" && p.stageStatus !== "Fixing & Fit-out") return false;
    if (filter === "Warranty" && p.stageStatus !== "Warranty Care") return false;
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1240px] w-full font-sans space-y-6 text-[#183249]">

      {/* ── Page Header ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-4 border-b border-[#e2e5e5]">
        <div>
          <div className="text-[9.5px] font-bold uppercase tracking-[1.4px] text-[#28715e] mb-1">
            Site Operations &amp; Construction Management · Hart Homes
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#183249]">
            Construction Sites &amp; Projects
          </h1>
          <p className="text-xs text-[#64727e] mt-1 max-w-2xl leading-relaxed">
            Real-time site management: track on-site trades, construction milestones, DA approvals, weather delays, and defect punch lists.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <Link
            href="/pro/tasks"
            className="px-3.5 py-2 bg-white border border-[#cbd5e2] hover:bg-[#F9F8F5] text-[#183249] rounded-xl text-xs font-semibold transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5 text-[#64727e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <span>Punch List (Defects)</span>
          </Link>
          <button
            onClick={() => alert("Add Build Site: Register cadastral survey, council DA reference, and assign Site Supervisor.")}
            className="px-4 py-2 bg-[#0F1A2C] hover:bg-[#102d59] text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
          >
            + Register New Build Site
          </button>
        </div>
      </div>

      {/* ── Operational Quick Metrics ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-[#e2e5e5] rounded-2xl p-4 shadow-2xs">
          <div className="text-[10px] font-bold text-[#64727e] uppercase">Active Sites</div>
          <div className="text-xl font-bold text-[#183249] mt-0.5">3 Active Builds</div>
          <div className="text-[10px] text-[#28715e] mt-0.5">All sites on schedule</div>
        </div>
        <div className="bg-white border border-[#e2e5e5] rounded-2xl p-4 shadow-2xs">
          <div className="text-[10px] font-bold text-[#64727e] uppercase">Trades On Site Today</div>
          <div className="text-xl font-bold text-[#0F1A2C] mt-0.5">5 Subbie Crews</div>
          <div className="text-[10px] text-[#5b6e84] mt-0.5">Kenmore &amp; Graceville</div>
        </div>
        <div className="bg-white border border-[#e2e5e5] rounded-2xl p-4 shadow-2xs">
          <div className="text-[10px] font-bold text-[#64727e] uppercase">Weather Delays</div>
          <div className="text-xl font-bold text-[#28715e] mt-0.5">2 Days Total</div>
          <div className="text-[10px] text-[#28715e] mt-0.5">Zero delay notices pending</div>
        </div>
        <div className="bg-white border border-[#e2e5e5] rounded-2xl p-4 shadow-2xs">
          <div className="text-[10px] font-bold text-[#64727e] uppercase">Punch List Items</div>
          <div className="text-xl font-bold text-[#946315] mt-0.5">2 Open Items</div>
          <div className="text-[10px] text-[#946315] mt-0.5">Pre-handover paint touchup</div>
        </div>
      </div>

      {/* ── Property Pulse Floating Notification ── */}
      <PropertyPulseNotification
        propId="TPH-KEN-018"
        property="18 Banksia Crescent"
        mode="pro"
        actionHref="/pro/tasks"
        actionLabel="Site Punch List"
      />

      {/* ── Section Header with Dropdown on Top Right ─────────────── */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-[#183249]">
            Active Sites &amp; Projects
          </h2>
          <span className="text-[11px] font-semibold text-[#64727e] bg-[#f1f5f9] px-2 py-0.5 rounded-full">
            {filtered.length} {filtered.length === 1 ? "site" : "sites"}
          </span>
        </div>

        {/* Dropdown on Top Right */}
        <div className="flex items-center gap-2">
          <label htmlFor="stage-filter" className="text-xs text-[#64727e] font-medium hidden sm:inline">
            Stage:
          </label>
          <div className="relative">
            <select
              id="stage-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-white border border-[#cbd5e2] hover:bg-[#F9F8F5] text-[#183249] rounded-xl px-3.5 py-1.5 text-xs font-semibold focus:outline-none focus:border-[#0F1A2C] shadow-2xs cursor-pointer appearance-none pr-8 transition-colors"
            >
              <option value="All">All Sites (3)</option>
              <option value="Handover">Practical Completion (1)</option>
              <option value="Active">Fixing &amp; Construction (1)</option>
              <option value="Warranty">Warranty &amp; Aftercare (1)</option>
            </select>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#64727e] text-[10px]">
              ▼
            </span>
          </div>
        </div>
      </div>

      {/* ── Construction Site Cards Grid (Minimalist) ────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((site) => (
          <article
            key={site.id}
            className="bg-white border border-[#e2e8f0] hover:border-[#cbd5e1] rounded-2xl p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3.5">
              {/* Header: Prop ID, DA info & Stage status */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#0F1A2C] bg-[#f1f5f9] px-2 py-0.5 rounded-md border border-[#e2e8f0]">
                    {site.propId}
                  </span>
                  <div className="text-[10px] text-[#94a3b8] font-mono mt-1">
                    {site.lotPlan} · {site.councilDA}
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${site.statusColor}`}>
                  {site.stageStatus}
                </span>
              </div>

              {/* Title & Supervisor */}
              <div>
                <h3 className="text-base font-bold text-[#183249] leading-snug">
                  {site.address}
                </h3>
                <p className="text-xs text-[#64748b] mt-0.5">
                  {site.suburb} · Assigned: <strong className="text-[#183249] font-semibold">{site.supervisor}</strong>
                </p>
              </div>

              {/* Milestone Progress (Sleek minimalist bar) */}
              <div className="space-y-1.5 pt-0.5">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-medium text-[#475569] truncate">{site.currentMilestone}</span>
                  <strong className="text-[#183249] ml-2 shrink-0">{site.milestoneProgress}%</strong>
                </div>
                <div className="w-full h-1.5 bg-[#f1f5f9] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#28715e] rounded-full transition-all duration-500"
                    style={{ width: `${site.milestoneProgress}%` }}
                  />
                </div>
              </div>

              {/* Trades On Site Today (Minimalist tag pills) */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#94a3b8]">
                  Trades on site today
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {site.activeTradesOnSite.map((trade, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 text-[11px] bg-[#f8fafc] text-[#334155] px-2.5 py-1 rounded-lg border border-[#e2e8f0]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#28715e]" />
                      <span>{trade}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Weather & Punch List Meta */}
              <div className="flex items-center justify-between text-[11px] text-[#64748b] pt-1">
                <span>Weather delays: <strong className="text-[#183249] font-semibold">{site.weatherDelayDays} days</strong></span>
                <span className={site.openPunchListItems > 0 ? "text-[#b45309] font-semibold flex items-center gap-1.5" : "text-[#28715e] font-medium flex items-center gap-1.5"}>
                  {site.openPunchListItems > 0 ? (
                    <>
                      <svg className="w-3.5 h-3.5 text-[#b45309] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span>{site.openPunchListItems} Punch items logged</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5 text-[#28715e] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>0 Defects pending</span>
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Footer: Live Pulse Notification Trigger + Inspect Punch List Button */}
            <div className="pt-3.5 border-t border-[#f1f5f9] mt-4 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(
                      new CustomEvent("tph:show-pulse-popup", {
                        detail: {
                          propId: site.propId,
                          property: site.address,
                          suburb: site.suburb,
                          client:
                            site.propId === "TPH-KEN-018"
                              ? "Alex & Emily"
                              : site.propId === "TPH-GRV-007"
                              ? "Sofia Nguyen"
                              : "Noah & Mia Wilson",
                          actionHref: "/pro/tasks",
                          actionLabel: "Inspect Punch List",
                          mode: "pro",
                        },
                      })
                    );
                  }
                }}
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#28715e] hover:text-[#185334] px-2.5 py-1.5 rounded-lg hover:bg-[#eaf4ef] transition-colors cursor-pointer"
                title="View Live Property Pulse"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#28715e] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#28715e]" />
                </span>
                <span>Live Pulse</span>
              </button>

              <Link
                href="/pro/tasks"
                className="px-3.5 py-1.5 bg-[#0F1A2C] hover:bg-[#1c3a54] text-white text-[11.5px] font-bold rounded-xl transition-colors shadow-2xs flex items-center gap-1"
              >
                <span>Inspect Punch List</span>
                <span>→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}
