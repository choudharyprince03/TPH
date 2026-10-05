"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ReferralModal } from "@/components/features/ReferralModal";

export default function ProDashboard() {
  const [referralOpen, setReferralOpen] = useState(false);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] w-full font-sans space-y-5">

      {/* ── Header ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-[#dfe6ef]">
        <div>
          <div className="text-[9.5px] font-bold uppercase tracking-wider text-[#24754c]">
            Hart Homes · QBCC #150821
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#102645] mt-0.5">
            Good morning, Olivia
          </h1>
          <p className="text-xs text-[#68788e] mt-0.5">
            3 new leads · 8 connected properties · 1 handover ready
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <button
            onClick={() => setReferralOpen(true)}
            className="px-3 py-1.5 bg-white border border-[#cbd5e2] hover:bg-[#f3f6fb] text-[#102645] rounded-xl text-xs font-semibold transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>🤝</span>
            <span>Invite</span>
          </button>
          <Link
            href="/pro/trustlinks/welcome"
            className="px-3.5 py-1.5 bg-[#071d3b] hover:bg-[#15345d] text-white rounded-xl text-xs font-semibold transition-colors shadow-xs flex items-center gap-1.5"
          >
            <span>+ Issue TrustLink</span>
          </Link>
        </div>
      </div>

      {/* ── Priority Action Alert (Brief & Clean) ──────────── */}
      <div className="bg-[#071d3b] text-white rounded-xl p-3.5 sm:p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-white/10 text-base flex items-center justify-center flex-shrink-0">
            📦
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#efbd66]">
                Handover Ready
              </span>
              <span className="text-[10.5px] text-[#b9c8db]">· 92% complete</span>
            </div>
            <h2 className="text-sm font-bold text-white truncate mt-0.5">
              18 Banksia Crescent, Kenmore (Alex &amp; Emily)
            </h2>
            <p className="text-xs text-[#b9c8db] truncate mt-0.5">
              Form 16 certs, manuals &amp; Digital Key compiled. Ready for client sign-off.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-shrink-0">
          <Link
            href="/pro/trustlinks/TL-99214-B"
            className="px-3 py-1.5 bg-[#efbd66] hover:bg-[#dfac55] text-[#071d3b] font-bold text-xs rounded-lg transition-colors shadow-2xs flex items-center gap-1"
          >
            <span>Open Pack</span>
            <span>→</span>
          </Link>
        </div>
      </div>

      {/* ── Key Metrics (3 Minimalist Cards) ───────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white border border-[#dfe6ef] rounded-xl p-3.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold tracking-tight text-[#102645]">3</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#fef3c7] text-[#92400e] font-bold">2 unread</span>
          </div>
          <div className="text-xs font-semibold text-[#102645] mt-1">Inbound Leads</div>
          <div className="text-[10.5px] text-[#68788e]">New client project briefs</div>
        </div>

        <div className="bg-white border border-[#dfe6ef] rounded-xl p-3.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold tracking-tight text-[#102645]">8</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#eaf5ef] text-[#24754c] font-bold">Active</span>
          </div>
          <div className="text-xs font-semibold text-[#102645] mt-1">Connected Properties</div>
          <div className="text-[10.5px] text-[#68788e]">Live TrustLink workspaces</div>
        </div>

        <div className="bg-white border border-[#dfe6ef] rounded-xl p-3.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold tracking-tight text-[#24754c]">5</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#f1f5f9] text-[#475569] font-bold">Network</span>
          </div>
          <div className="text-xs font-semibold text-[#102645] mt-1">Tradies &amp; Subbies</div>
          <div className="text-[10.5px] text-[#68788e]">Specialists collaborating</div>
        </div>
      </div>

      {/* ── 2-Column Clean Workspace: Leads & Active Projects ─ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Column 1: Inbound Leads */}
        <section className="bg-white border border-[#dfe6ef] rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between pb-2.5 border-b border-[#dfe6ef] mb-2.5">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-[#102645]">Inbound Leads</h2>
              <span className="text-[9.5px] font-bold px-1.5 py-0.2 bg-[#fef3c7] text-[#92400e] rounded-full">3</span>
            </div>
            <Link href="/pro/leads" className="text-xs font-bold text-[#071d3b] hover:underline">
              View all →
            </Link>
          </div>

          <div className="divide-y divide-[#f0f4f8] text-xs">
            <div className="py-2 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <strong className="text-[#102645] font-semibold truncate">James &amp; Sarah Davidson</strong>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#fff4df] text-[#8b641c] rounded">New</span>
                </div>
                <p className="text-[10.5px] text-[#68788e] truncate mt-0.5">
                  Bardon · 4-Bed Custom Build · $1.1M budget
                </p>
              </div>
              <Link
                href="/pro/leads/L-101"
                className="px-2.5 py-1 bg-[#071d3b] hover:bg-[#15345d] text-white text-[10.5px] font-bold rounded-lg transition-colors flex-shrink-0"
              >
                Review
              </Link>
            </div>

            <div className="py-2 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <strong className="text-[#102645] font-semibold truncate">Aisha Khan</strong>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#fff4df] text-[#8b641c] rounded">New</span>
                </div>
                <p className="text-[10.5px] text-[#68788e] truncate mt-0.5">
                  Newstead · Knockdown-Rebuild · Concept plans
                </p>
              </div>
              <Link
                href="/pro/leads/L-102"
                className="px-2.5 py-1 bg-[#f3f6fb] hover:bg-[#e2eaf4] text-[#071d3b] text-[10.5px] font-bold rounded-lg transition-colors flex-shrink-0"
              >
                Review
              </Link>
            </div>

            <div className="py-2 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <strong className="text-[#102645] font-semibold truncate">Thomas Murray</strong>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#eaf5ef] text-[#24754c] rounded">In Review</span>
                </div>
                <p className="text-[10.5px] text-[#68788e] truncate mt-0.5">
                  Fig Tree Pocket · Extension &amp; Alfresco · DA approved
                </p>
              </div>
              <Link
                href="/pro/leads/L-103"
                className="px-2.5 py-1 bg-[#f3f6fb] hover:bg-[#e2eaf4] text-[#071d3b] text-[10.5px] font-bold rounded-lg transition-colors flex-shrink-0"
              >
                Review
              </Link>
            </div>
          </div>
        </section>

        {/* Column 2: Active Projects & Handover */}
        <section className="bg-white border border-[#dfe6ef] rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between pb-2.5 border-b border-[#dfe6ef] mb-2.5">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-[#102645]">Active Projects</h2>
              <span className="text-[9.5px] font-bold px-1.5 py-0.2 bg-[#eaf5ef] text-[#24754c] rounded-full">8</span>
            </div>
            <Link href="/pro/properties" className="text-xs font-bold text-[#071d3b] hover:underline">
              View all →
            </Link>
          </div>

          <div className="divide-y divide-[#f0f4f8] text-xs">
            <div className="py-2 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <strong className="text-[#102645] font-semibold truncate">18 Banksia Crescent</strong>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#fff4df] text-[#8b641c] rounded">Handover</span>
                </div>
                <p className="text-[10.5px] text-[#68788e] truncate mt-0.5">
                  Kenmore · Alex &amp; Emily · 92% complete
                </p>
              </div>
              <Link
                href="/pro/trustlinks/TL-99214-B"
                className="px-2.5 py-1 bg-[#071d3b] hover:bg-[#15345d] text-white text-[10.5px] font-bold rounded-lg transition-colors flex-shrink-0"
              >
                Manage
              </Link>
            </div>

            <div className="py-2 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <strong className="text-[#102645] font-semibold truncate">7 Cedar Street</strong>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#eaf5ef] text-[#24754c] rounded">Building</span>
                </div>
                <p className="text-[10.5px] text-[#68788e] truncate mt-0.5">
                  Graceville · Sofia Nguyen · Fixing &amp; fit-out
                </p>
              </div>
              <Link
                href="/pro/trustlinks/TL-88301-A"
                className="px-2.5 py-1 bg-[#f3f6fb] hover:bg-[#e2eaf4] text-[#071d3b] text-[10.5px] font-bold rounded-lg transition-colors flex-shrink-0"
              >
                Manage
              </Link>
            </div>

            <div className="py-2 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <strong className="text-[#102645] font-semibold truncate">42 Ridge Road</strong>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#f1f5f9] text-[#475569] rounded">Warranty</span>
                </div>
                <p className="text-[10.5px] text-[#68788e] truncate mt-0.5">
                  Brookfield · Noah &amp; Mia Wilson · 100% settled
                </p>
              </div>
              <Link
                href="/pro/trustlinks/TL-76100-C"
                className="px-2.5 py-1 bg-[#f3f6fb] hover:bg-[#e2eaf4] text-[#071d3b] text-[10.5px] font-bold rounded-lg transition-colors flex-shrink-0"
              >
                Manage
              </Link>
            </div>
          </div>
        </section>

      </div>

      {/* ── Quick Tools Bar (Minimalist 4-Column Strip) ─────── */}
      <div className="bg-white border border-[#dfe6ef] rounded-xl p-3.5 shadow-2xs">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[#68788e] mb-2.5">
          Workspace Shortcuts
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Link
            href="/pro/digital-key"
            className="p-2.5 rounded-lg bg-[#fafbfc] hover:bg-[#f3f6fb] border border-[#f0f4f8] hover:border-[#dfe6ef] transition-all flex items-center gap-2.5 group"
          >
            <span className="text-base">🔑</span>
            <div className="min-w-0">
              <div className="text-[11.5px] font-semibold text-[#102645] group-hover:text-[#071d3b] truncate">
                Digital Key
              </div>
              <div className="text-[9.5px] text-[#68788e] truncate">Form 16/43 certs</div>
            </div>
          </Link>

          <Link
            href="/pro/documents"
            className="p-2.5 rounded-lg bg-[#fafbfc] hover:bg-[#f3f6fb] border border-[#f0f4f8] hover:border-[#dfe6ef] transition-all flex items-center gap-2.5 group"
          >
            <span className="text-base">📄</span>
            <div className="min-w-0">
              <div className="text-[11.5px] font-semibold text-[#102645] group-hover:text-[#071d3b] truncate">
                Statutory Docs
              </div>
              <div className="text-[9.5px] text-[#68788e] truncate">Certs register</div>
            </div>
          </Link>

          <Link
            href="/pro/tradie"
            className="p-2.5 rounded-lg bg-[#fafbfc] hover:bg-[#f3f6fb] border border-[#f0f4f8] hover:border-[#dfe6ef] transition-all flex items-center gap-2.5 group"
          >
            <span className="text-base">👥</span>
            <div className="min-w-0">
              <div className="text-[11.5px] font-semibold text-[#102645] group-hover:text-[#071d3b] truncate">
                Tradie Network
              </div>
              <div className="text-[9.5px] text-[#68788e] truncate">5 active pros</div>
            </div>
          </Link>

          <Link
            href="/pro/tasks"
            className="p-2.5 rounded-lg bg-[#fafbfc] hover:bg-[#f3f6fb] border border-[#f0f4f8] hover:border-[#dfe6ef] transition-all flex items-center gap-2.5 group"
          >
            <span className="text-base">📋</span>
            <div className="min-w-0">
              <div className="text-[11.5px] font-semibold text-[#102645] group-hover:text-[#071d3b] truncate">
                Punch List
              </div>
              <div className="text-[9.5px] text-[#68788e] truncate">Defect checks</div>
            </div>
          </Link>
        </div>
      </div>

      <ReferralModal
        isOpen={referralOpen}
        onClose={() => setReferralOpen(false)}
        mode="pro"
      />

    </div>
  );
}
