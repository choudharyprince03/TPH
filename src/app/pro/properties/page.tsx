"use client";
import React, { useState } from "react";
import Link from "next/link";

interface Project {
  id: string;
  propId: string;
  address: string;
  suburb: string;
  client: string;
  stage: string;
  progress: number;
  contractSum: string;
  trustlinkId: string;
  status: string;
  statusColor: string;
}

const PROJECTS: Project[] = [
  {
    id: "PRJ-018",
    propId: "TPH-KEN-018",
    address: "18 Banksia Crescent",
    suburb: "Kenmore QLD 4069",
    client: "Alex & Emily",
    stage: "Stage 5: Practical Completion & Digital Handover",
    progress: 92,
    contractSum: "$1,180,000 AUD",
    trustlinkId: "welcome",
    status: "Handover Phase",
    statusColor: "bg-[#fff4df] text-[#8b641c]",
  },
  {
    id: "PRJ-007",
    propId: "TPH-GRV-007",
    address: "7 Cedar Street",
    suburb: "Graceville QLD 4075",
    client: "Sofia Nguyen",
    stage: "Stage 4: Fixing & Cabinetry Fit-out",
    progress: 65,
    contractSum: "$940,000 AUD",
    trustlinkId: "TL-88301-A",
    status: "Under Construction",
    statusColor: "bg-[#eaf5ef] text-[#24754c]",
  },
  {
    id: "PRJ-042",
    propId: "TPH-BRK-042",
    address: "42 Ridge Road",
    suburb: "Brookfield QLD 4069",
    client: "Noah & Mia Wilson",
    stage: "Stage 6: Post-Settlement Warranty Care",
    progress: 100,
    contractSum: "$1,450,000 AUD",
    trustlinkId: "TL-76100-C",
    status: "Settled / Warranty",
    statusColor: "bg-[#f3f6fb] text-[#68788e]",
  },
];

export default function ProPropertiesPage() {
  const [filter, setFilter] = useState("All");

  const filtered = PROJECTS.filter((p) => {
    if (filter === "Handover" && p.status !== "Handover Phase") return false;
    if (filter === "Active" && p.status !== "Under Construction") return false;
    if (filter === "Settled" && p.status !== "Settled / Warranty") return false;
    return true;
  });

  return (
    <div className="p-6 sm:p-9 lg:p-11 max-w-[1240px] w-full">

      {/* ── Page Header ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <div className="text-[9px] font-bold uppercase tracking-[1.4px] text-[#24754c] mb-1">
            Projects &amp; Construction Sites · Hart Homes
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.8px] text-[#102645]">
            Active Projects
          </h1>
          <p className="text-[13px] text-[#68788e] mt-1">
            Residential build sites linked to living Prop ID records and client TrustLinks.
          </p>
        </div>

        <button
          onClick={() => alert("Add Project: Register a new build address and allocate initial Prop ID.")}
          className="px-4 py-2.5 bg-[#071d3b] hover:bg-[#102d59] text-white rounded-xl text-[12px] font-semibold transition-colors shadow-sm self-start sm:self-auto"
        >
          + Add New Project
        </button>
      </div>

      {/* ── Filter Chips ────────────────────────────────────────────── */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {["All", "Handover", "Active", "Settled"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all whitespace-nowrap ${
              filter === f
                ? "bg-[#071d3b] text-white font-semibold"
                : "bg-white border border-[#dfe6ef] text-[#68788e] hover:bg-[#f3f6fb]"
            }`}
          >
            {f === "Handover" ? "Handover Ready" : f}
          </button>
        ))}
      </div>

      {/* ── Projects Cards Grid ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {filtered.map((prj) => (
          <article
            key={prj.id}
            className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-xs font-mono font-bold text-[#68788e] bg-[#f3f6fb] px-2 py-0.5 rounded">
                  {prj.propId}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${prj.statusColor}`}>
                  {prj.status}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#102645] mb-0.5">
                {prj.address}
              </h3>
              <p className="text-[12px] text-[#68788e] mb-3">
                {prj.suburb} · Client: <strong className="text-[#102645]">{prj.client}</strong>
              </p>

              <div className="p-3 bg-[#f9fafc] rounded-xl text-[11px] text-[#68788e] mb-4">
                <strong className="block text-[#102645] mb-1">{prj.stage}</strong>
                <span>Contract value: {prj.contractSum}</span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1 mb-4">
                <div className="flex justify-between text-[10px] text-[#68788e]">
                  <span>Construction progress</span>
                  <strong className="text-[#102645]">{prj.progress}%</strong>
                </div>
                <div className="w-full h-1.5 bg-[#dfe6ef] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#24754c] rounded-full"
                    style={{ width: `${prj.progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#dfe6ef] flex items-center justify-between text-[11px]">
              <Link
                href={`/properties/${prj.propId}`}
                className="text-[#68788e] hover:text-[#102645] font-semibold"
              >
                Prop ID Record
              </Link>
              <Link
                href={`/pro/trustlinks/${prj.trustlinkId}`}
                className="px-3.5 py-1.5 bg-[#071d3b] text-white font-bold rounded-lg hover:bg-[#102d59] transition-colors"
              >
                Manage Handover →
              </Link>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}
