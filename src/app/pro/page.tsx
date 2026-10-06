"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ReferralModal } from "@/components/features/ReferralModal";

export default function ProDashboard() {
  const [referralOpen, setReferralOpen] = useState(false);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] w-full font-sans space-y-5">

      {/* ── Header ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-[#e2e5e5]">
        <div>
          <div className="text-[9.5px] font-bold uppercase tracking-wider text-[#28715e]">
            Hart Homes · QBCC #150821
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#183249] mt-0.5 font-headline">
            Good morning, Olivia
          </h1>
          <p className="text-xs text-[#64727e] mt-0.5">
            3 new leads · 8 connected properties · 1 handover ready
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <button
            onClick={() => setReferralOpen(true)}
            className="px-3 py-1.5 bg-white border border-[#e2e5e5] hover:bg-[#F9F8F5] text-[#183249] rounded-xl text-xs font-semibold transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 text-[#0F1A2C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <span>Invite</span>
          </button>
          <Link
            href="/pro/trustlinks/welcome"
            className="px-3.5 py-1.5 bg-[#0F1A2C] hover:bg-[#1c3a54] text-white rounded-xl text-xs font-semibold transition-colors shadow-xs flex items-center gap-1.5"
          >
            <span>+ Issue TrustLink</span>
          </Link>
        </div>
      </div>

      {/* ── Priority Action Alert (Brief & Clean) ──────────── */}
      <div className="bg-[#0F1A2C] text-white rounded-xl p-3.5 sm:p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-[#C59B27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#C59B27]">
                Handover Ready
              </span>
              <span className="text-[10.5px] text-[#adc0cd]">· 92% complete</span>
            </div>
            <h2 className="text-sm font-bold text-white truncate mt-0.5">
              18 Banksia Crescent, Kenmore (Alex &amp; Emily)
            </h2>
            <p className="text-xs text-[#adc0cd] truncate mt-0.5">
              Form 16 certs, manuals &amp; Digital Key compiled. Ready for client sign-off.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-shrink-0">
          <Link
            href="/pro/trustlinks/TL-99214-B"
            className="px-3 py-1.5 bg-[#C59B27] hover:bg-[#b58b20] text-[#0F1A2C] font-bold text-xs rounded-lg transition-colors shadow-2xs flex items-center gap-1"
          >
            <span>Open Pack</span>
            <span>→</span>
          </Link>
        </div>
      </div>

      {/* ── Key Metrics (3 Minimalist Cards) ───────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white border border-[#e2e5e5] rounded-xl p-3.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold tracking-tight text-[#183249]">3</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#fbf3e4] text-[#946315] font-bold">2 unread</span>
          </div>
          <div className="text-xs font-semibold text-[#183249] mt-1">Inbound Leads</div>
          <div className="text-[10.5px] text-[#64727e]">New client project briefs</div>
        </div>

        <div className="bg-white border border-[#e2e5e5] rounded-xl p-3.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold tracking-tight text-[#183249]">8</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#eaf4ef] text-[#28715e] font-bold">Active</span>
          </div>
          <div className="text-xs font-semibold text-[#183249] mt-1">Connected Properties</div>
          <div className="text-[10.5px] text-[#64727e]">Live TrustLink workspaces</div>
        </div>

        <div className="bg-white border border-[#e2e5e5] rounded-xl p-3.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold tracking-tight text-[#28715e]">5</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F9F8F5] text-[#64727e] font-bold border border-[#e2e5e5]">Network</span>
          </div>
          <div className="text-xs font-semibold text-[#183249] mt-1">Tradies &amp; Subbies</div>
          <div className="text-[10.5px] text-[#64727e]">Specialists collaborating</div>
        </div>
      </div>

      {/* ── 2-Column Clean Workspace: Leads & Active Projects ─ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Column 1: Inbound Leads */}
        <section className="bg-white border border-[#e2e5e5] rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between pb-2.5 border-b border-[#e2e5e5] mb-2.5">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-[#183249]">Inbound Leads</h2>
              <span className="text-[9.5px] font-bold px-1.5 py-0.2 bg-[#fbf3e4] text-[#946315] rounded-full">3</span>
            </div>
            <Link href="/pro/leads" className="text-xs font-bold text-[#0F1A2C] hover:underline">
              View all →
            </Link>
          </div>

          <div className="divide-y divide-[#f0f2f3] text-xs">
            <div className="py-2 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <strong className="text-[#183249] font-semibold truncate">James &amp; Sarah Davidson</strong>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#fbf3e4] text-[#946315] rounded">New</span>
                </div>
                <p className="text-[10.5px] text-[#64727e] truncate mt-0.5">
                  Bardon · 4-Bed Custom Build · $1.1M budget
                </p>
              </div>
              <Link
                href="/pro/leads/L-101"
                className="px-2.5 py-1 bg-[#0F1A2C] hover:bg-[#1c3a54] text-white text-[10.5px] font-bold rounded-lg transition-colors flex-shrink-0"
              >
                Review
              </Link>
            </div>

            <div className="py-2 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <strong className="text-[#183249] font-semibold truncate">Aisha Khan</strong>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#fbf3e4] text-[#946315] rounded">New</span>
                </div>
                <p className="text-[10.5px] text-[#64727e] truncate mt-0.5">
                  Newstead · Knockdown-Rebuild · Concept plans
                </p>
              </div>
              <Link
                href="/pro/leads/L-102"
                className="px-2.5 py-1 bg-[#F9F8F5] hover:bg-[#eae8e2] text-[#0F1A2C] text-[10.5px] font-bold rounded-lg transition-colors flex-shrink-0 border border-[#e2e5e5]"
              >
                Review
              </Link>
            </div>

            <div className="py-2 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <strong className="text-[#183249] font-semibold truncate">Thomas Murray</strong>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#eaf4ef] text-[#28715e] rounded">In Review</span>
                </div>
                <p className="text-[10.5px] text-[#64727e] truncate mt-0.5">
                  Fig Tree Pocket · Extension &amp; Alfresco · DA approved
                </p>
              </div>
              <Link
                href="/pro/leads/L-103"
                className="px-2.5 py-1 bg-[#F9F8F5] hover:bg-[#eae8e2] text-[#0F1A2C] text-[10.5px] font-bold rounded-lg transition-colors flex-shrink-0 border border-[#e2e5e5]"
              >
                Review
              </Link>
            </div>
          </div>
        </section>

        {/* Column 2: Active Projects & Handover */}
        <section className="bg-white border border-[#e2e5e5] rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between pb-2.5 border-b border-[#e2e5e5] mb-2.5">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-[#183249]">Active Projects</h2>
              <span className="text-[9.5px] font-bold px-1.5 py-0.2 bg-[#eaf4ef] text-[#28715e] rounded-full">8</span>
            </div>
            <Link href="/pro/properties" className="text-xs font-bold text-[#0F1A2C] hover:underline">
              View all →
            </Link>
          </div>

          <div className="divide-y divide-[#f0f2f3] text-xs">
            <div className="py-2 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <strong className="text-[#183249] font-semibold truncate">18 Banksia Crescent</strong>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#fbf3e4] text-[#946315] rounded">Handover</span>
                </div>
                <p className="text-[10.5px] text-[#64727e] truncate mt-0.5">
                  Kenmore · Alex &amp; Emily · 92% complete
                </p>
              </div>
              <Link
                href="/pro/trustlinks/TL-99214-B"
                className="px-2.5 py-1 bg-[#0F1A2C] hover:bg-[#1c3a54] text-white text-[10.5px] font-bold rounded-lg transition-colors flex-shrink-0"
              >
                Manage
              </Link>
            </div>

            <div className="py-2 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <strong className="text-[#183249] font-semibold truncate">7 Cedar Street</strong>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#eaf4ef] text-[#28715e] rounded">Building</span>
                </div>
                <p className="text-[10.5px] text-[#64727e] truncate mt-0.5">
                  Graceville · Sofia Nguyen · Fixing &amp; fit-out
                </p>
              </div>
              <Link
                href="/pro/trustlinks/TL-88301-A"
                className="px-2.5 py-1 bg-[#F9F8F5] hover:bg-[#eae8e2] text-[#0F1A2C] text-[10.5px] font-bold rounded-lg transition-colors flex-shrink-0 border border-[#e2e5e5]"
              >
                Manage
              </Link>
            </div>

            <div className="py-2 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <strong className="text-[#183249] font-semibold truncate">42 Ridge Road</strong>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#F9F8F5] text-[#64727e] rounded border border-[#e2e5e5]">Warranty</span>
                </div>
                <p className="text-[10.5px] text-[#64727e] truncate mt-0.5">
                  Brookfield · Noah &amp; Mia Wilson · 100% settled
                </p>
              </div>
              <Link
                href="/pro/trustlinks/TL-76100-C"
                className="px-2.5 py-1 bg-[#F9F8F5] hover:bg-[#eae8e2] text-[#0F1A2C] text-[10.5px] font-bold rounded-lg transition-colors flex-shrink-0 border border-[#e2e5e5]"
              >
                Manage
              </Link>
            </div>
          </div>
        </section>

      </div>

      {/* ── Quick Tools Bar (Minimalist 4-Column Strip) ─────── */}
      <div className="bg-white border border-[#e2e5e5] rounded-xl p-3.5 shadow-2xs">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[#64727e] mb-2.5">
          Workspace Shortcuts
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Link
            href="/pro/digital-key"
            className="p-2.5 rounded-lg bg-[#FAF9F6] hover:bg-[#f2efe9] border border-[#e8e6df] transition-all flex items-center gap-2.5 group"
          >
            <div className="w-7 h-7 rounded-lg bg-[#FAF0DC] text-[#946315] flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="text-[11.5px] font-semibold text-[#183249] group-hover:text-[#0F1A2C] truncate">
                Digital Key
              </div>
              <div className="text-[9.5px] text-[#64727e] truncate">Form 16/43 certs</div>
            </div>
          </Link>

          <Link
            href="/pro/documents"
            className="p-2.5 rounded-lg bg-[#FAF9F6] hover:bg-[#f2efe9] border border-[#e8e6df] transition-all flex items-center gap-2.5 group"
          >
            <div className="w-7 h-7 rounded-lg bg-[#eaf4ef] text-[#28715e] flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="text-[11.5px] font-semibold text-[#183249] group-hover:text-[#0F1A2C] truncate">
                Statutory Docs
              </div>
              <div className="text-[9.5px] text-[#64727e] truncate">Certs register</div>
            </div>
          </Link>

          <Link
            href="/pro/tradie"
            className="p-2.5 rounded-lg bg-[#FAF9F6] hover:bg-[#f2efe9] border border-[#e8e6df] transition-all flex items-center gap-2.5 group"
          >
            <div className="w-7 h-7 rounded-lg bg-[#e9eff4] text-[#102a43] flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="text-[11.5px] font-semibold text-[#183249] group-hover:text-[#0F1A2C] truncate">
                Tradie Network
              </div>
              <div className="text-[9.5px] text-[#64727e] truncate">5 active pros</div>
            </div>
          </Link>

          <Link
            href="/pro/tasks"
            className="p-2.5 rounded-lg bg-[#FAF9F6] hover:bg-[#f2efe9] border border-[#e8e6df] transition-all flex items-center gap-2.5 group"
          >
            <div className="w-7 h-7 rounded-lg bg-[#faeeeb] text-[#a34b43] flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="text-[11.5px] font-semibold text-[#183249] group-hover:text-[#0F1A2C] truncate">
                Punch List
              </div>
              <div className="text-[9.5px] text-[#64727e] truncate">Defect checks</div>
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
