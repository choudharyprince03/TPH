"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function ProDashboard() {
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  const scrollToSchedule = () => {
    const el = document.getElementById("coming-up");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:px-9 lg:py-7 max-w-[1260px] w-full mx-auto font-sans text-[#13293d] space-y-6">

      {/* ── Breadcrumb ──────────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] text-[#5c6f7e]">
        <Link href="/" className="hover:text-[#13293d] transition-colors">
          The Property Helpline
        </Link>
        <span className="text-[#94a3b8]">›</span>
        <Link href="/pro" className="hover:text-[#13293d] transition-colors">
          Pro Hub
        </Link>
        <span className="text-[#94a3b8]">›</span>
        <span className="font-bold text-[#13293d]">Needs Me</span>
      </nav>

      {/* ── Hero Greeting & Action Buttons ──────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-0.5">
        <div>
          <div className="text-[10.5px] font-bold uppercase tracking-[1.8px] text-[#946e2b]">
            BUILDER PRO HUB
          </div>
          <h1 className="font-editorial text-[34px] sm:text-[42px] leading-[1.1] font-normal text-[#13293d] tracking-[-0.02em] mt-1.5">
            Good afternoon, Chris.
          </h1>
          <p className="text-[13.5px] text-[#5c6f7e] mt-2">
            Keep the build moving. Make the handover feel effortless.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-center flex-wrap">
          <button
            type="button"
            onClick={scrollToSchedule}
            className="px-4 py-2.5 bg-white border border-[#e2e5e5] hover:bg-[#F9F8F5] text-[#13293d] rounded-xl text-[12.5px] font-bold transition-colors shadow-2xs flex items-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4 text-[#13293d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="1.8" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
            </svg>
            <span>This week</span>
          </button>

          <Link
            href="/pro/digital-key"
            className="px-4.5 py-2.5 bg-[#12263a] hover:bg-[#1c3a54] text-white rounded-xl text-[12.5px] font-bold transition-colors shadow-xs flex items-center gap-2"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            <span>Open handover</span>
          </Link>
        </div>
      </div>

      {/* ── 4-Column Connected Metrics Strip ────────────────────────── */}
      <div className="bg-white border border-[#e5e2dc] rounded-2xl shadow-[0_2px_10px_rgba(19,41,61,0.03)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#eae7e0]">
        <div className="px-5 py-4 flex items-center gap-3.5">
          <span className="font-editorial text-[28px] leading-none text-[#13293d]">
            3
          </span>
          <div className="min-w-0">
            <div className="text-[12px] font-medium text-[#5c6f7e] truncate">
              Homes in your portfolio
            </div>
            <div className="text-[11px] text-[#7b8b97] truncate mt-0.5">
              One shared operating view
            </div>
          </div>
        </div>

        <div className="px-5 py-4 flex items-center gap-3.5">
          <span className="font-editorial text-[28px] leading-none text-[#13293d]">
            1
          </span>
          <div className="min-w-0">
            <div className="text-[12px] font-medium text-[#5c6f7e] truncate">
              Required record to review
            </div>
            <div className="text-[11px] text-[#7b8b97] truncate mt-0.5">
              Oak Residence
            </div>
          </div>
        </div>

        <div className="px-5 py-4 flex items-center gap-3.5">
          <div className="font-editorial leading-none flex items-baseline flex-shrink-0">
            <span className="text-[28px] text-[#13293d]">0</span>
            <span className="text-[19px] text-[#64727e] ml-0.5">/6</span>
          </div>
          <div className="min-w-0">
            <div className="text-[12px] font-medium text-[#5c6f7e] truncate">
              Handover item responses
            </div>
            <div className="text-[11px] text-[#7b8b97] truncate mt-0.5">
              Both review fields recorded
            </div>
          </div>
        </div>

        <div className="px-5 py-4 flex items-center gap-3.5">
          <span className="font-editorial text-[28px] leading-none text-[#13293d]">
            1
          </span>
          <div className="min-w-0">
            <div className="text-[12px] font-medium text-[#5c6f7e] truncate">
              Open follow-up items
            </div>
            <div className="text-[11px] text-[#7b8b97] truncate mt-0.5">
              A named next step for each
            </div>
          </div>
        </div>
      </div>

      {/* ── Main 2-Column Workspace Grid ────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

        {/* ── Left Column: Needs Me & Coming Up ─────────────────────── */}
        <div className="lg:col-span-7 space-y-5">

          {/* Card 1: Needs Me */}
          <section className="bg-white border border-[#e5e2dc] rounded-2xl p-6 shadow-[0_2px_10px_rgba(19,41,61,0.03)]">
            <div className="flex items-start justify-between gap-3 pb-4">
              <div>
                <h2 className="text-[18.5px] font-bold text-[#13293d] tracking-tight">
                  Needs Me
                </h2>
                <p className="text-[12.5px] text-[#5c6f7e] mt-0.5">
                  The next useful action, with the evidence beside it.
                </p>
              </div>
              <span className="px-3 py-1 rounded-lg bg-[#edf1f5] text-[#13293d] text-[11px] font-bold flex-shrink-0 mt-1">
                Oak Residence
              </span>
            </div>

            <div className="divide-y divide-[#eae7e0]">
              {/* Action Item 1 */}
              <div className="py-5 first:pt-2 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#f7f2e7] text-[#8d6b2e] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2m8-16h2a2 2 0 012 2v2m-4 12h2a2 2 0 002-2v-2M9 12a3 3 0 106 0 3 3 0 00-6 0z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[13.5px] font-bold text-[#13293d]">
                    The cooktop delivery differs from the selection
                  </h3>
                  <p className="text-[12.5px] text-[#5c6f7e] mt-0.5">
                    Approved IC90, 90 cm. Delivery docket records IC60, 60 cm.
                  </p>
                  <div className="flex items-center flex-wrap gap-3 mt-3">
                    <span className="text-[11px] text-[#64727e]">
                      Chris Taylor · Before handover
                    </span>
                    <button
                      type="button"
                      onClick={() => setCompareModalOpen(true)}
                      className="px-3.5 py-1.5 bg-white hover:bg-[#F9F8F5] border border-[#dce1e5] rounded-lg text-[11.5px] font-bold text-[#13293d] inline-flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                    >
                      <span>Compare sources</span>
                      <span className="text-[12px] leading-none">↗</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Item 2 */}
              <div className="py-5 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#f7f2e7] text-[#8d6b2e] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[13.5px] font-bold text-[#13293d]">
                    Waterproofing record is ready for your check
                  </h3>
                  <p className="text-[12.5px] text-[#5c6f7e] mt-0.5">
                    Sam has supplied the certificate. Confirm its project and scope.
                  </p>
                  <div className="flex items-center flex-wrap gap-3 mt-3">
                    <span className="text-[11px] text-[#64727e]">
                      Clearcoat Wet Areas · Received 15 Sep
                    </span>
                    <Link
                      href="/pro/documents"
                      className="px-3.5 py-1.5 bg-white hover:bg-[#F9F8F5] border border-[#dce1e5] rounded-lg text-[11.5px] font-bold text-[#13293d] inline-flex items-center gap-1.5 shadow-2xs transition-colors"
                    >
                      <span>Review record</span>
                      <span className="text-[12px] leading-none">↗</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Action Item 3 */}
              <div className="pt-5 pb-1 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#f2efe9] text-[#5c6460] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[13.5px] font-bold text-[#13293d]">
                    A home almost ready for its welcome
                  </h3>
                  <p className="text-[12.5px] text-[#5c6f7e] mt-0.5">
                    Review the standard tabs with Emma, then sign the same version.
                  </p>
                  <div className="flex items-center flex-wrap gap-3 mt-3">
                    <span className="text-[11px] text-[#64727e]">
                      18 Sep · 10:00 am · Chris + Emma
                    </span>
                    <Link
                      href="/pro/digital-key"
                      className="px-3.5 py-1.5 bg-white hover:bg-[#F9F8F5] border border-[#dce1e5] rounded-lg text-[11.5px] font-bold text-[#13293d] inline-flex items-center gap-1.5 shadow-2xs transition-colors"
                    >
                      <span>Prepare review</span>
                      <span className="text-[12px] leading-none">↗</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Card 2: Coming up */}
          <section
            id="coming-up"
            className="bg-white border border-[#e5e2dc] rounded-2xl p-6 shadow-[0_2px_10px_rgba(19,41,61,0.03)]"
          >
            <div className="flex items-start justify-between gap-3 pb-4">
              <div>
                <h2 className="text-[17px] font-bold text-[#13293d] tracking-tight">
                  Coming up
                </h2>
                <p className="text-[12.5px] text-[#5c6f7e] mt-0.5">
                  Your review appointments and promised follow-up.
                </p>
              </div>
              <Link
                href="/pro/tasks"
                className="text-[12px] font-bold text-[#13293d] hover:text-[#946e2b] transition-colors mt-1"
              >
                View week
              </Link>
            </div>

            <div className="divide-y divide-[#eae7e0]">
              <div className="py-3.5 first:pt-1 flex items-center justify-between gap-3.5">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-xl border border-[#e5e2dc] bg-[#faf9f5] flex flex-col items-center justify-center flex-shrink-0">
                    <span className="font-editorial text-[18px] leading-none text-[#13293d]">
                      18
                    </span>
                    <span className="text-[8.5px] font-bold uppercase tracking-wider text-[#64727e] mt-0.5">
                      SEP
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[13px] font-bold text-[#13293d] truncate">
                      Oak Residence · review together
                    </h3>
                    <p className="text-[11.5px] text-[#5c6f7e] truncate mt-0.5">
                      10:00 am · 18 Willow Street, Kenmore · Chris + Emma Wilson
                    </p>
                  </div>
                </div>
                <Link
                  href="/pro/digital-key"
                  className="px-3.5 py-1.5 bg-[#f4f6f8] hover:bg-[#e8edf2] text-[#13293d] rounded-lg text-[11.5px] font-bold transition-colors flex-shrink-0"
                >
                  Open
                </Link>
              </div>

              <div className="pt-3.5 pb-1 flex items-center justify-between gap-3.5">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-xl border border-[#e5e2dc] bg-[#faf9f5] flex flex-col items-center justify-center flex-shrink-0">
                    <span className="font-editorial text-[18px] leading-none text-[#13293d]">
                      21
                    </span>
                    <span className="text-[8.5px] font-bold uppercase tracking-wider text-[#64727e] mt-0.5">
                      SEP
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[13px] font-bold text-[#13293d] truncate">
                      Oak Residence · appliance docket follow-up
                    </h3>
                    <p className="text-[11.5px] text-[#5c6f7e] truncate mt-0.5">
                      2:00 pm · Confirm IC90 replacement docket with supplier
                    </p>
                  </div>
                </div>
                <Link
                  href="/pro/tasks"
                  className="px-3.5 py-1.5 bg-[#f4f6f8] hover:bg-[#e8edf2] text-[#13293d] rounded-lg text-[11.5px] font-bold transition-colors flex-shrink-0"
                >
                  Task
                </Link>
              </div>
            </div>
          </section>

        </div>

        {/* ── Right Column: Next Handover Card & Day One Studio Card ── */}
        <div className="lg:col-span-5 space-y-5">

          {/* Card 1: Next Handover — Oak Residence */}
          <article className="bg-white border border-[#e5e2dc] rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(19,41,61,0.03)]">
            {/* Image Header */}
            <div className="relative h-[200px] sm:h-[212px] w-full overflow-hidden">
              <img
                src="/images/oak-residence-clean.jpg"
                alt="Oak Residence interior and balcony"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

              <span className="absolute top-3.5 right-3.5 px-3 py-1 rounded-lg bg-white/95 backdrop-blur-xs text-[#13293d] text-[11px] font-bold shadow-xs">
                Next handover
              </span>

              <div className="absolute bottom-3.5 left-5 right-5">
                <h2 className="font-editorial text-[26px] text-white font-normal leading-tight">
                  Oak Residence
                </h2>
                <p className="text-[11.5px] text-white/90 mt-0.5 font-medium">
                  18 Willow Street, Kenmore · Example property
                </p>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-5 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-[15.5px] font-bold text-[#13293d]">
                    Your handover is taking shape.
                  </h3>
                  <p className="text-[12px] text-[#5c6f7e] mt-0.5">
                    0 item responses · 3 reviewed document records
                  </p>
                </div>
                <svg className="w-5 h-5 text-[#13293d] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>

              {/* Progress Bar & Stages */}
              <div className="space-y-2">
                <div className="w-full h-1.5 bg-[#e6eaee] rounded-full overflow-hidden">
                  <div className="w-[26%] h-full bg-[#28715e] rounded-full" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px]">
                  <span className="text-[#28715e] font-semibold">Prepared</span>
                  <span className="text-[#94a3b8]">›</span>
                  <span className="text-[#13293d] font-bold">Review together</span>
                  <span className="text-[#94a3b8]">›</span>
                  <span className="text-[#64727e]">At home</span>
                </div>
              </div>

              {/* Owner Footer */}
              <div className="pt-1 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-[#edf1f5] text-[#13293d] text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                    EW
                  </div>
                  <div className="min-w-0">
                    <div className="text-[12.5px] font-bold text-[#13293d] leading-tight truncate">
                      Emma Wilson
                    </div>
                    <div className="text-[11px] text-[#64727e] truncate mt-0.5">
                      Current owner · Prop ID connected
                    </div>
                  </div>
                </div>

                <Link
                  href="/pro/properties/oak-residence"
                  className="px-4 py-2 bg-[#12263a] hover:bg-[#1c3a54] text-white text-[12px] font-bold rounded-xl transition-colors inline-flex items-center gap-1.5 shadow-2xs flex-shrink-0"
                >
                  <span>Open home</span>
                  <span className="text-[12px] leading-none">↗</span>
                </Link>
              </div>
            </div>
          </article>

          {/* Card 2: The Finishing Touch — Day One Studio */}
          <article className="bg-[#ede6da] border border-[#e2d9c8] rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(19,41,61,0.03)] flex flex-col sm:flex-row items-stretch min-h-[205px]">
            <div className="p-5 sm:p-6 flex flex-col justify-between sm:w-[54%] z-10">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[1.6px] text-[#6e6558]">
                  THE FINISHING TOUCH
                </div>
                <h2 className="font-editorial text-[23px] sm:text-[24px] leading-[1.15] text-[#13293d] mt-1.5 font-normal">
                  A welcome<br />worth keeping.
                </h2>
                <p className="text-[11.5px] text-[#59544b] mt-2 leading-relaxed">
                  Pair the digital record with a beautifully prepared presentation pack.
                </p>
              </div>

              <Link
                href="/pro/digital-key"
                className="text-[12px] font-bold text-[#13293d] hover:text-[#8d6b2e] inline-flex items-center gap-1.5 mt-3.5 transition-colors"
              >
                <span>Explore Day One Studio</span>
                <span className="text-[12px] leading-none">↗</span>
              </Link>
            </div>

            <div className="sm:w-[46%] relative min-h-[165px] flex-shrink-0">
              <img
                src="/images/day-one-studio-pack.png"
                alt="Prop ID Digital Handover Presentation Pack"
                className="w-full h-full object-cover object-center"
              />
              <div className="hidden sm:block absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[#ede6da] to-transparent pointer-events-none" />
            </div>
          </article>

        </div>

      </div>

      {/* ── Source Comparison Modal (Triggered by "Compare sources ↗") ── */}
      {compareModalOpen && (
        <div className="fixed inset-0 z-[300] bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-[#e5e2dc] text-[#13293d] space-y-5">
            <div className="flex items-start justify-between gap-3 border-b border-[#eae7e0] pb-3.5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#946e2b]">
                  Oak Residence · Evidence Check
                </span>
                <h3 className="text-[17px] font-bold text-[#13293d] mt-0.5">
                  The cooktop delivery differs from the selection
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCompareModalOpen(false)}
                className="text-[#64727e] hover:text-[#13293d] p-1.5 rounded-lg hover:bg-[#F9F8F5] cursor-pointer"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div className="p-4 rounded-xl bg-[#faf9f5] border border-[#e5e2dc] space-y-1.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#28715e]">
                  Approved Selection Schedule
                </div>
                <div className="font-bold text-sm text-[#13293d]">
                  Induction Cooktop IC90 · 90 cm
                </div>
                <p className="text-[#5c6f7e]">
                  Signed by Emma Wilson on 14 Jul · Kitchen Joinery Rev C (900mm cutout).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#fbf3e4]/60 border border-[#f0dec0] space-y-1.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#946315]">
                  Supplier Delivery Docket
                </div>
                <div className="font-bold text-sm text-[#13293d]">
                  Induction Cooktop IC60 · 60 cm
                </div>
                <p className="text-[#5c6f7e]">
                  Logged by Chris Taylor · Docket #DL-48219 received before handover.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#eae7e0]">
              <button
                type="button"
                onClick={() => setCompareModalOpen(false)}
                className="px-4 py-2 bg-[#F9F8F5] hover:bg-[#eae7e0] text-[#13293d] rounded-xl text-xs font-bold cursor-pointer"
              >
                Close
              </button>
              <Link
                href="/pro/tasks"
                className="px-4 py-2 bg-[#12263a] hover:bg-[#1c3a54] text-white rounded-xl text-xs font-bold"
              >
                Log supplier replacement follow-up →
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
