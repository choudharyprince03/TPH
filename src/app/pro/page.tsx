"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ReferralModal } from "@/components/features/ReferralModal";
import {
  PageTransition,
  FadeUp,
  SlideIn,
  StaggerGrid,
  StaggerItem,
  CardHover,
  CountUp,
} from "@/components/ui/motion";

export default function ProDashboard() {
  const [referralOpen, setReferralOpen] = useState(false);

  return (
    <PageTransition className="p-4 sm:p-6 lg:p-8 xl:p-10 max-w-[1240px] w-full font-sans">

      {/* ── Top Header ────────────────────────────────────────────────── */}
      <FadeUp className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-7">
        <div>
          <div className="text-[9px] font-bold uppercase tracking-[1.4px] text-[#24754c] mb-1">
            Pro Hub · Hart Homes (QBCC #150821)
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#102645]">
            Good morning, Olivia.
          </h1>
          <p className="text-xs sm:text-[13px] text-[#68788e] mt-0.5">
            Verified site data, collaborative Tradie network &amp; digital handovers.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
          <button
            onClick={() => setReferralOpen(true)}
            className="px-3.5 py-2 bg-[#eaf5ef] hover:bg-[#d8ecdf] text-[#24754c] border border-[#c7e3d1] rounded-xl text-xs font-semibold transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
            title="Move clients or invite fellow trade specialists"
          >
            <svg className="w-3.5 h-3.5 text-[#24754c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <span>+ Invite &amp; Refer</span>
          </button>
          <Link
            href="/pro/leads"
            className="px-3.5 py-2 bg-white border border-[#cbd5e2] hover:bg-[#f3f6fb] text-[#102645] rounded-xl text-xs font-semibold transition-colors shadow-xs flex items-center gap-1.5"
          >
            <span>Inbound Leads</span>
            <span className="bg-[#fff4df] text-[#8b641c] text-[10px] font-bold px-1.5 py-0.5 rounded">3 New</span>
          </Link>
          <Link
            href="/pro/trustlinks/welcome"
            className="px-3.5 py-2 bg-[#071d3b] hover:bg-[#102d59] text-white rounded-xl text-xs font-semibold transition-colors shadow-xs flex items-center gap-1.5"
          >
            <span>+ Issue TrustLink</span>
          </Link>
        </div>
      </FadeUp>

      {/* ── Priority Lead Action Banner ─────────────────────────────────── */}
      <SlideIn direction="left">
        <section className="bg-[#071d3b] text-white rounded-2xl p-5 sm:p-6 mb-6 sm:mb-7 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
          <div className="max-w-xl">
            <div className="text-[#efbd66] text-[10px] font-bold uppercase tracking-[1.5px] mb-1">
              Action Required · 3 New Leads
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1.5">
              James &amp; Sarah Davidson — Simpsons Rd, Bardon
            </h2>
            <p className="text-xs sm:text-[13px] text-[#b9c8db] leading-relaxed mb-3.5">
              4-Bed Custom Build inquiry with verified Class H1 soil and 2.8m contour survey pre-attached. Zero manual chasing.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/pro/leads/L-101"
                className="px-4 py-2 bg-[#efbd66] hover:bg-[#dfac55] text-[#071d3b] font-bold rounded-xl text-xs transition-colors"
              >
                Review Site Data →
              </Link>
              <Link
                href="/pro/leads"
                className="text-xs text-[#b9c8db] hover:text-white underline"
              >
                View all leads
              </Link>
            </div>
          </div>

          <div className="text-right flex-shrink-0 bg-white/10 p-3.5 rounded-xl border border-white/15">
            <span className="text-2xl font-bold text-[#efbd66] block">100%</span>
            <span className="text-[10px] text-[#b9c8db] uppercase tracking-wider font-semibold">Site Data Verified</span>
          </div>
        </section>
      </SlideIn>

      {/* ── 3-Card Summary Counters ───────────────────────────────────── */}
      <StaggerGrid className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 sm:mb-7">
        <StaggerItem>
          <CardHover>
            <div className="bg-white border border-[#dfe6ef] rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <CountUp value={3} className="text-3xl font-bold tracking-tight text-[#102645]" />
                <div className="w-9 h-9 rounded-lg bg-[#f0f4f9] text-[#071d3b] flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#071d3b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
              </div>
              <strong className="block text-[13px] text-[#102645]">Inbound Enquiries</strong>
              <small className="text-[11px] text-[#68788e]">2 awaiting review</small>
            </div>
          </CardHover>
        </StaggerItem>

        <StaggerItem>
          <CardHover>
            <div className="bg-white border border-[#dfe6ef] rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <CountUp value={8} className="text-3xl font-bold tracking-tight text-[#102645]" />
                <div className="w-9 h-9 rounded-lg bg-[#eaf5ef] text-[#24754c] flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#24754c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <strong className="block text-[13px] text-[#102645]">Connected Properties</strong>
              <small className="text-[11px] text-[#68788e]">Active Prop ID records</small>
            </div>
          </CardHover>
        </StaggerItem>

        <StaggerItem>
          <CardHover>
            <div className="bg-white border border-[#dfe6ef] rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <CountUp value={1} className="text-3xl font-bold tracking-tight text-[#24754c]" />
                <div className="w-9 h-9 rounded-lg bg-[#fff4df] text-[#8b641c] flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#8b641c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
              </div>
              <strong className="block text-[13px] text-[#102645]">Handover Ready</strong>
              <small className="text-[11px] text-[#68788e]">18 Banksia Cres (92%)</small>
            </div>
          </CardHover>
        </StaggerItem>
      </StaggerGrid>

      {/* ── 2-Column Focus Grid (Incoming Leads & Fast Actions) ───────── */}
      <FadeUp>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 mb-7 sm:mb-8">

          {/* Incoming Leads Priority Queue */}
          <section className="bg-white border border-[#dfe6ef] rounded-2xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#dfe6ef] mb-3">
              <div>
                <h2 className="text-base font-bold text-[#102645]">Incoming Enquiries</h2>
                <p className="text-[11px] text-[#68788e]">Attached site data &amp; soil specs.</p>
              </div>
              <Link href="/pro/leads" className="text-xs font-bold text-[#071d3b] hover:underline">
                View all 3 →
              </Link>
            </div>

            <div className="divide-y divide-[#dfe6ef] text-xs">
              {/* Lead 1 */}
              <div className="py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <strong className="text-[#102645] font-semibold truncate">James &amp; Sarah Davidson</strong>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 bg-[#fff4df] text-[#8b641c] rounded">
                      New
                    </span>
                  </div>
                  <p className="text-[11px] text-[#68788e] truncate mt-0.5">
                    Bardon · 4 Bed Custom Build · <span className="font-mono text-[#071d3b] font-semibold">Class H1 Soil</span>
                  </p>
                </div>
                <Link
                  href="/pro/leads/L-101"
                  className="px-3 py-1.5 bg-[#071d3b] hover:bg-[#102d59] text-white font-bold rounded-lg text-[11px] transition-colors flex-shrink-0"
                >
                  Inspect →
                </Link>
              </div>

              {/* Lead 2 */}
              <div className="py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <strong className="text-[#102645] font-semibold truncate">Aisha Khan</strong>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 bg-[#fff4df] text-[#8b641c] rounded">
                      New
                    </span>
                  </div>
                  <p className="text-[11px] text-[#68788e] truncate mt-0.5">
                    Newstead · Knockdown-Rebuild · <span className="font-mono text-[#071d3b] font-semibold">Class M Soil</span>
                  </p>
                </div>
                <Link
                  href="/pro/leads/L-102"
                  className="px-3 py-1.5 bg-[#f3f6fb] hover:bg-[#e4ecf7] text-[#071d3b] font-bold rounded-lg text-[11px] transition-colors flex-shrink-0"
                >
                  Inspect →
                </Link>
              </div>

              {/* Lead 3 */}
              <div className="py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <strong className="text-[#102645] font-semibold truncate">Thomas Murray</strong>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 bg-[#eaf5ef] text-[#24754c] rounded">
                      In Review
                    </span>
                  </div>
                  <p className="text-[11px] text-[#68788e] truncate mt-0.5">
                    Fig Tree Pocket · Extension &amp; Alfresco
                  </p>
                </div>
                <Link
                  href="/pro/leads/L-103"
                  className="px-3 py-1.5 bg-[#f3f6fb] hover:bg-[#e4ecf7] text-[#071d3b] font-bold rounded-lg text-[11px] transition-colors flex-shrink-0"
                >
                  Inspect →
                </Link>
              </div>
            </div>
          </section>

          {/* Builder DLM Workflows & Tools */}
          <section className="bg-white border border-[#dfe6ef] rounded-2xl p-5 sm:p-6 shadow-xs">
            <div className="pb-3 border-b border-[#dfe6ef] mb-3">
              <h2 className="text-base font-bold text-[#102645]">Workspace Tools</h2>
              <p className="text-[11px] text-[#68788e]">Direct actions &amp; client records.</p>
            </div>

            <div className="divide-y divide-[#dfe6ef] text-xs">
              <Link
                href="/pro/trustlinks/welcome"
                className="py-2.5 flex items-center justify-between hover:bg-[#f9fafc] p-2 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#f0f4f9] text-[#071d3b] flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#071d3b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <strong className="block text-[13px] text-[#102645] group-hover:text-[#071d3b]">Digital Handover Manager</strong>
                    <small className="text-[11px] text-[#68788e]">Seal Form 16 / Form 43 directly to Prop ID</small>
                  </div>
                </div>
                <span className="text-[#68788e]">›</span>
              </Link>

              <Link
                href="/pro/customers"
                className="py-2.5 flex items-center justify-between hover:bg-[#f9fafc] p-2 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#f0f4f9] text-[#071d3b] flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#071d3b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <strong className="block text-[13px] text-[#102645] group-hover:text-[#071d3b]">Property Data &amp; Clients</strong>
                    <small className="text-[11px] text-[#68788e]">Soil classes, lot plans &amp; client records</small>
                  </div>
                </div>
                <span className="text-[#68788e]">›</span>
              </Link>

              <Link
                href="/pro/documents"
                className="py-2.5 flex items-center justify-between hover:bg-[#f9fafc] p-2 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#f0f4f9] text-[#071d3b] flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#071d3b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <strong className="block text-[13px] text-[#102645] group-hover:text-[#071d3b]">Statutory Certificates Register</strong>
                    <small className="text-[11px] text-[#68788e]">Form 16, Form 43 &amp; electrical certificates</small>
                  </div>
                </div>
                <span className="text-[#68788e]">›</span>
              </Link>

              <Link
                href="/pro/tradie"
                className="py-2.5 flex items-center justify-between hover:bg-[#f9fafc] p-2 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#eaf5ef] text-[#24754c] flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#24754c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="block text-[13px] text-[#102645] group-hover:text-[#24754c]">Tradie (Pro Network)</strong>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 bg-[#eaf5ef] text-[#24754c] rounded">
                        5 Active
                      </span>
                    </div>
                    <small className="text-[11px] text-[#68788e]">Collaborate with painters, sparkies &amp; certifiers</small>
                  </div>
                </div>
                <span className="text-[#68788e]">›</span>
              </Link>
            </div>
          </section>

        </div>
      </FadeUp>

      {/* ── Active Client Workspaces ─────────────────────────────────── */}
      <FadeUp>
        <section className="bg-white border border-[#dfe6ef] rounded-2xl p-5 sm:p-6 shadow-xs mb-8">
          <div className="flex items-center justify-between pb-3 border-b border-[#dfe6ef] mb-3">
            <div>
              <h2 className="text-base font-bold text-[#102645]">Active Client Workspaces</h2>
              <p className="text-[11px] text-[#68788e]">Scoped TrustLink portals.</p>
            </div>
            <Link href="/pro/trustlinks" className="text-xs font-bold text-[#071d3b] hover:underline">
              View all 8 →
            </Link>
          </div>

          <div className="divide-y divide-[#dfe6ef] text-xs">
            {[
              {
                id: "welcome",
                client: "Alex & Emily",
                property: "18 Banksia Crescent, Kenmore",
                purpose: "Digital handover",
                status: "Handover Ready",
                badgeStyle: "bg-[#fff4df] text-[#8b641c]",
                updated: "34m ago",
              },
              {
                id: "TL-88301-A",
                client: "Sofia Nguyen",
                property: "7 Cedar Street, Graceville",
                purpose: "Plans & scope",
                status: "Active",
                badgeStyle: "bg-[#eaf5ef] text-[#24754c]",
                updated: "2h ago",
              },
              {
                id: "TL-76100-C",
                client: "Noah & Mia Wilson",
                property: "42 Ridge Road, Brookfield",
                purpose: "Warranty care",
                status: "Settled",
                badgeStyle: "bg-[#f3f6fb] text-[#68788e]",
                updated: "Yesterday",
              },
            ].map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <strong className="text-[#102645] font-semibold">{item.client}</strong>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${item.badgeStyle}`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#68788e] truncate mt-0.5">
                    {item.property} · {item.purpose}
                  </p>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-[10px] text-[#8a97a7] hidden sm:inline">{item.updated}</span>
                  <Link
                    href={`/pro/trustlinks/${item.id}`}
                    className="px-3 py-1.5 bg-[#f3f6fb] hover:bg-[#e5eef7] text-[#071d3b] font-bold rounded-lg text-[11px] transition-colors"
                  >
                    Manage →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </FadeUp>

      {/* Professional Referral & Client Onboarding Modal */}
      <ReferralModal
        isOpen={referralOpen}
        onClose={() => setReferralOpen(false)}
        mode="pro"
      />

    </PageTransition>
  );
}
