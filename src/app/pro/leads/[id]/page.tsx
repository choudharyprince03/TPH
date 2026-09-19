"use client";
import Link from "next/link";
import React, { use, useState } from "react";

export default function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-xs text-slate-500">
        <Link href="/pro/leads" className="hover:text-brand-navy dark:hover:text-brand-gold font-medium">Leads</Link>
        <span>/</span>
        <span className="font-bold text-slate-800 dark:text-white">{id || "L-101"}</span>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden mb-6">
        {/* Header banner */}
        <div className="p-6 flex flex-col md:flex-row justify-between items-start gap-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">James & Sarah Davidson</h1>
              <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                🔥 Hot Inbound Lead
              </span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Submitted: Today, 10:45 AM AEST • Origin: The Property Helpline Direct Inquiry
            </div>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Link
              href="/pro/leads"
              className="flex-1 md:flex-none px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 text-center"
            >
              Back to Leads
            </Link>
            <button
              onClick={() => setAccepted(true)}
              className="flex-1 md:flex-none px-5 py-2 bg-brand-navy hover:bg-brand-navy-light text-white rounded-xl text-xs font-bold shadow-sm transition-all"
            >
              {accepted ? "✓ TrustLink TL-99214-B Opened" : "Accept & Create TrustLink"}
            </button>
          </div>
        </div>

        {accepted && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border-b border-green-200 dark:border-green-800/40 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-verified font-semibold">
              <span className="w-2 h-2 rounded-full bg-verified animate-pulse" />
              TrustLink workspace generated for James Davidson with Prop ID TPH-BAR-019.
            </div>
            <Link
              href="/pro/trustlinks/TL-99214-B"
              className="text-xs font-bold text-verified underline hover:opacity-80"
            >
              Go to Workspace →
            </Link>
          </div>
        )}

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Client Requirements */}
          <div className="space-y-5">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Project Scope & Requirements
              </h3>
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-3">
                <div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Project Type</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    New Architectural Custom Build (4 Bed, 3 Bath, Double Garage, In-ground Pool)
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Target Suburb / Site</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    Bardon QLD 4065 (580 m² Vacant Lot)
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Indicative Construction Budget</div>
                  <div className="text-sm font-bold text-emerald-600">
                    $950,000 – $1,100,000 AUD (Excl. Pool)
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Finance & Funding Status</div>
                  <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Macquarie Bank construction loan pre-approved to $1.2M AUD
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                Customer Message
              </h3>
              <div className="text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 leading-relaxed italic">
                &ldquo;Hello ABC Developers. We have settled on our titled block on Simpsons Road in Bardon. The contour survey shows an approx 2.8m slope front-to-back. We love your modern cantilever designs and would like to review our conceptual architectural drawings together in a TrustLink workspace.&rdquo;
              </div>
            </div>
          </div>

          {/* Right Column: Site & Prop ID Context */}
          <div className="space-y-5">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Property & Cadastral Context
              </h3>
              <div className="rounded-2xl p-5 border"
                style={{ background: "linear-gradient(135deg, #061221, #0c3d2b)", borderColor: "rgba(16,185,129,0.2)" }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">
                    Permanent Prop ID
                  </span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-green-900/50 text-green-300">
                    Titled Lot
                  </span>
                </div>
                <div className="font-mono text-xl font-bold text-white mb-1">TPH-BAR-019</div>
                <div className="text-xs text-slate-300">Simpsons Road, Bardon QLD 4065</div>
                <div className="text-[11px] text-slate-400 mt-1">Lot 14 on RP 88201 · Brisbane City Council</div>

                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/10 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Soil Classification</span>
                    <span className="font-bold text-white">Class H1 (Highly Reactive)</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Zoning Overlay</span>
                    <span className="font-bold text-white">Low Density Residential</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Builder Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full py-2.5 px-4 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 text-left flex items-center justify-between">
                  <span>Schedule Discovery Phone Call</span>
                  <span className="text-slate-400">📅</span>
                </button>
                <button className="w-full py-2.5 px-4 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 text-left flex items-center justify-between">
                  <span>Request Site Soil & Contour Survey PDF</span>
                  <span className="text-slate-400">📄</span>
                </button>
                <button className="w-full py-2.5 px-4 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 text-left flex items-center justify-between">
                  <span>Send Initial Estimate / Cost Schedule</span>
                  <span className="text-slate-400">💰</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
