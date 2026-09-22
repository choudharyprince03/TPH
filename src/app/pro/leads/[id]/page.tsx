"use client";
import Link from "next/link";
import React, { use, useState } from "react";

export default function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [accepted, setAccepted] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const handleQuickAction = (actionName: string) => {
    setActionNotice(`✓ Completed: ${actionName}. Notification sent to James Davidson.`);
    setTimeout(() => {
      setActionNotice(null);
    }, 4000);
  };

  return (
    <div className="p-6 sm:p-9 lg:p-11 max-w-[1240px] w-full font-sans">
      {/* ── Breadcrumb ─────────────────────────────────────────────── */}
      <nav className="flex items-center gap-2 text-[11px] text-[#68788e] mb-6" aria-label="Breadcrumb">
        <Link href="/pro/leads" className="hover:underline">Incoming Leads</Link>
        <span>›</span>
        <span className="text-[#102645] font-semibold">{id || "L-101"}</span>
      </nav>

      {/* ── Header Masthead ────────────────────────────────────────── */}
      <section className="bg-white border border-[#dfe6ef] rounded-2xl p-6 sm:p-8 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap mb-1">
              <span className="text-[9px] font-bold uppercase tracking-[1.4px] text-[#24754c]">
                DLM Lead Intake · Attached Property Data
              </span>
              <span className="bg-[#fff4df] text-[#8b641c] text-[10px] font-bold px-2 py-0.5 rounded">
                🔥 Hot Inbound
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#102645]">
              James &amp; Sarah Davidson
            </h1>
            <p className="text-[12px] text-[#68788e] mt-1">
              Submitted: Today, 10:45 AM AEST · Origin: The Property Helpline (TPH Passport Connection)
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="/pro/leads"
              className="px-4 py-2.5 border border-[#cbd5e2] hover:bg-[#f3f6fb] text-[#102645] rounded-xl text-[12px] font-semibold transition-colors"
            >
              ← Back to Leads
            </Link>
            <button
              onClick={() => setAccepted(true)}
              className={`px-5 py-2.5 rounded-xl text-[12px] font-bold shadow-sm transition-all flex items-center gap-1.5 ${
                accepted
                  ? "bg-[#24754c] text-white"
                  : "bg-[#071d3b] hover:bg-[#102d59] text-white"
              }`}
            >
              <span>{accepted ? "✓ TrustLink TL-99214-B Issued" : "Accept & Issue Scoped TrustLink"}</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {accepted && (
          <div className="mt-6 p-4 bg-[#eaf5ef] border border-[#cbe3d3] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12px]">
            <div className="flex items-center gap-2.5 text-[#24754c] font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#24754c] animate-pulse" />
              <span>TrustLink workspace active for James &amp; Sarah Davidson with Prop ID TPH-BAR-019.</span>
            </div>
            <Link
              href="/pro/trustlinks/TL-99214-B"
              className="px-3.5 py-1.5 bg-[#071d3b] hover:bg-[#102d59] text-white font-bold rounded-lg text-[11px] transition-colors self-start sm:self-auto"
            >
              Open Active Workspace →
            </Link>
          </div>
        )}

        {actionNotice && (
          <div className="mt-4 p-3 bg-[#eaf5ef] border border-[#cbe3d3] rounded-xl text-[12px] text-[#24754c] font-medium flex items-center gap-2">
            <span>⚡</span>
            <span>{actionNotice}</span>
          </div>
        )}
      </section>

      {/* ── Main 2-Column DLM Inspector ──────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 mb-10">

        {/* Left 7 Cols: Project Scope & Client Communication */}
        <div className="lg:col-span-7 space-y-6">

          {/* Project Scope Card */}
          <section className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm">
            <div className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#24754c] mb-1">
              Project Specification
            </div>
            <h2 className="text-lg font-bold text-[#102645] mb-4">
              Project Scope &amp; Budget
            </h2>

            <dl className="divide-y divide-[#dfe6ef] text-[12px]">
              <div className="py-3 grid grid-cols-[150px_1fr] gap-2">
                <dt className="text-[#68788e]">Project Type</dt>
                <dd className="text-[#102645] font-semibold">
                  New Architectural Custom Build (4 Bed, 3 Bath, Double Garage, In-ground Pool)
                </dd>
              </div>
              <div className="py-3 grid grid-cols-[150px_1fr] gap-2">
                <dt className="text-[#68788e]">Target Suburb / Site</dt>
                <dd className="text-[#102645] font-semibold">
                  Simpsons Road, Bardon QLD 4065 (580 m² Vacant Sloping Lot)
                </dd>
              </div>
              <div className="py-3 grid grid-cols-[150px_1fr] gap-2">
                <dt className="text-[#68788e]">Target Construction Budget</dt>
                <dd className="text-[#102645] font-bold text-[13px]">
                  $950,000 – $1,100,000 AUD <span className="text-[11px] font-normal text-[#68788e]">(Excl. Pool)</span>
                </dd>
              </div>
              <div className="py-3 grid grid-cols-[150px_1fr] gap-2">
                <dt className="text-[#68788e]">Funding Status</dt>
                <dd className="text-[#24754c] font-semibold flex items-center gap-1.5">
                  <span>✓</span>
                  <span>Macquarie Bank construction facility pre-approved up to $1.2M AUD</span>
                </dd>
              </div>
              <div className="py-3 grid grid-cols-[150px_1fr] gap-2">
                <dt className="text-[#68788e]">Target Build Start</dt>
                <dd className="text-[#102645]">Q1 2027 (Upon DA/BA certification)</dd>
              </div>
            </dl>
          </section>

          {/* Customer Message */}
          <section className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm">
            <div className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#24754c] mb-1">
              Homeowner Message
            </div>
            <h2 className="text-lg font-bold text-[#102645] mb-3">
              Enquiry Note from James
            </h2>

            <div className="bg-[#f3f6fb] p-5 rounded-xl border border-[#dfe6ef] text-[13px] text-[#102645] leading-relaxed italic">
              &ldquo;Hello Olivia and Hart Homes team. We have just settled on our titled block on Simpsons Road in Bardon. The contour survey shows an approx 2.8m slope front-to-back. We love your modern cantilever designs and would like to review our conceptual architectural drawings together in a TrustLink workspace to see if this fits our $1M construction envelope.&rdquo;
            </div>

            <div className="mt-4 flex items-center justify-between text-[11px] text-[#68788e]">
              <span>Direct communication channel: TPH In-App Messages</span>
              <span className="font-semibold text-[#102645]">Client contact verified</span>
            </div>
          </section>

        </div>

        {/* Right 5 Cols: Attached Property Data & 1-Click Builder Actions */}
        <div className="lg:col-span-5 space-y-6">

          {/* Attached Property Data Card */}
          <section className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold text-[#24754c] uppercase tracking-wider">
                Permanent Prop ID Context
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#eaf5ef] text-[#24754c]">
                Titled Lot
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#071d3b] text-white mb-4">
              <div className="text-[10px] font-mono text-[#efbd66] uppercase">Cadastral Record</div>
              <div className="text-xl font-mono font-bold mt-0.5">TPH-BAR-019</div>
              <div className="text-[12px] text-[#b9c8db] mt-1">Lot 14 on RP 88201 · Brisbane City Council</div>
            </div>

            <div className="space-y-3 text-[12px]">
              <div className="p-3 bg-[#f9fafc] rounded-xl border border-[#dfe6ef]">
                <div className="text-[10px] text-[#68788e] font-semibold uppercase">Soil Classification</div>
                <div className="font-bold text-[#102645] mt-0.5">Class H1 (Highly Reactive Clay)</div>
                <div className="text-[11px] text-[#68788e] mt-0.5">Soil boreholes drilled by GeoTest QLD in August 2026.</div>
              </div>

              <div className="p-3 bg-[#f9fafc] rounded-xl border border-[#dfe6ef]">
                <div className="text-[10px] text-[#68788e] font-semibold uppercase">Site Slope &amp; Fall</div>
                <div className="font-bold text-[#102645] mt-0.5">2.8m Front-to-Back Fall</div>
                <div className="text-[11px] text-[#68788e] mt-0.5">Requires stepped slab or partial cut/fill design.</div>
              </div>

              <div className="p-3 bg-[#f9fafc] rounded-xl border border-[#dfe6ef]">
                <div className="text-[10px] text-[#68788e] font-semibold uppercase">Council Zoning &amp; Overlays</div>
                <div className="font-bold text-[#102645] mt-0.5">Low Density Residential (LDR)</div>
                <div className="text-[11px] text-[#68788e] mt-0.5">Free of overland flood flow · Low bushfire buffer.</div>
              </div>
            </div>
          </section>

          {/* Builder 1-Click Action Bar */}
          <section className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm">
            <div className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#24754c] mb-1">
              Workload Reducer
            </div>
            <h2 className="text-lg font-bold text-[#102645] mb-3">
              1-Click Builder Actions
            </h2>
            <p className="text-[12px] text-[#68788e] mb-4">
              Send standard responses or request missing engineering data without writing emails.
            </p>

            <div className="space-y-2.5">
              <button
                onClick={() => handleQuickAction("Requested Site Soil & Contour Survey PDF")}
                className="w-full py-2.5 px-4 text-[12px] font-semibold rounded-xl border border-[#dfe6ef] bg-[#f9fafc] hover:bg-[#f0f4f9] text-[#102645] text-left flex items-center justify-between transition-colors"
              >
                <span>📄 Request Site Soil &amp; Contour PDF</span>
                <span className="text-[11px] text-[#68788e]">1-click ↗</span>
              </button>

              <button
                onClick={() => handleQuickAction("Sent Sloping Site Preliminary Cost Schedule")}
                className="w-full py-2.5 px-4 text-[12px] font-semibold rounded-xl border border-[#dfe6ef] bg-[#f9fafc] hover:bg-[#f0f4f9] text-[#102645] text-left flex items-center justify-between transition-colors"
              >
                <span>💰 Send Standard Sloping Site Cost Schedule</span>
                <span className="text-[11px] text-[#68788e]">1-click ↗</span>
              </button>

              <button
                onClick={() => handleQuickAction("Sent 15-Minute Discovery Call Invitation")}
                className="w-full py-2.5 px-4 text-[12px] font-semibold rounded-xl border border-[#dfe6ef] bg-[#f9fafc] hover:bg-[#f0f4f9] text-[#102645] text-left flex items-center justify-between transition-colors"
              >
                <span>📅 Schedule 15-min Feasibility Call</span>
                <span className="text-[11px] text-[#68788e]">1-click ↗</span>
              </button>

              <button
                onClick={() => handleQuickAction("Declined with Polite Capacity Referral Note")}
                className="w-full py-2.5 px-4 text-[12px] font-semibold rounded-xl border border-[#f5dfdf] bg-[#fff8f8] hover:bg-[#fbeeee] text-[#a44042] text-left flex items-center justify-between transition-colors"
              >
                <span>🚫 Decline with Standard Referral Message</span>
                <span className="text-[11px] text-[#a44042]">Decline</span>
              </button>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
