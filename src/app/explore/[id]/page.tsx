"use client";
import Link from "next/link";
import React, { use } from "react";

export default function ProfessionalProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Top Nav (Breadcrumbs) */}
      <div className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center text-sm font-semibold text-slate-500">
          <Link href="/explore" className="flex items-center gap-2 hover:text-brand-navy">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Specialists Directory
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Main Info) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-24 h-24 bg-brand-navy text-white rounded-2xl flex items-center justify-center text-3xl font-bold flex-shrink-0 shadow-md">
                BH
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-2">
                  <h1 className="text-3xl font-display font-bold text-slate-900">Banksia Homes Pty Ltd</h1>
                  <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap border border-emerald-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Verified Australian Builder
                  </span>
                </div>

                <p className="text-lg text-slate-600 mb-4">
                  Master Builders Accredited · Custom Residential New Builds & Knockdown-Rebuilds
                </p>

                <div className="flex flex-wrap items-center gap-3 text-sm font-semibold">
                  <div className="flex items-center gap-1 text-slate-900">
                    <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    4.9 <span className="text-slate-500 font-normal">(142 client reviews)</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <div className="text-slate-500">QBCC Licence #150821</div>
                  <span className="text-slate-300">•</span>
                  <div className="text-emerald-600">Brisbane & South-East QLD</div>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Badges */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="flex-1 pt-4 md:pt-0">
              <h3 className="font-bold text-slate-900 mb-1">MBA Accredited</h3>
              <p className="text-xs text-slate-500">Master Builders Australia Member</p>
            </div>
            <div className="flex-1 pt-4 md:pt-0 md:pl-6">
              <h3 className="font-bold text-slate-900 mb-1">$20M Public Liability</h3>
              <p className="text-xs text-slate-500">Active certificate of currency</p>
            </div>
            <div className="flex-1 pt-4 md:pt-0 md:pl-6">
              <h3 className="font-bold text-slate-900 mb-1">Prop ID Certified</h3>
              <p className="text-xs text-slate-500">Digital Handover Enabled</p>
            </div>
          </div>

          {/* Specialisations & Portfolio */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Core Building Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Architectural Custom Homes", desc: "Sloping site specialists, modern cantilevered designs, and luxury suburban residences." },
                { title: "Knockdown & Rebuild", desc: "End-to-end service including demolition management, council BA approvals, and construction." },
                { title: "Digital Handover & Prop ID", desc: "Full statutory compliance warranty transfer, Form 16, and appliance manuals sealed to your vault." },
                { title: "Fixed Price Contracts", desc: "Transparent Master Builders contracts with clear progress claim milestones." },
              ].map((s) => (
                <div key={s.title} className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                  <h3 className="font-bold text-sm text-slate-900 mb-1">{s.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Booking & TrustLink CTA) */}
        <div>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg sticky top-24">
            <div className="text-xs font-bold text-verified uppercase tracking-widest mb-2">Connect Directly</div>
            <div className="text-xl font-bold text-slate-900 mb-1">Start a Scoped TrustLink</div>
            <p className="text-xs text-slate-500 mb-6">
              Create an encrypted collaboration space with Banksia Homes. Share site drawings and budget requirements safely.
            </p>

            <div className="space-y-3">
              <Link
                href={`/inquiry/new?pro=${id}`}
                className="w-full py-3.5 bg-brand-navy hover:bg-brand-navy-light text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex justify-center items-center gap-2"
                style={{ background: "linear-gradient(135deg, #0c2340, #143865)" }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Connect via TrustLink™
              </Link>
              <Link
                href="/explore"
                className="w-full py-3 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold rounded-xl transition-colors flex justify-center items-center gap-2"
              >
                Explore Other Specialists
              </Link>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center">
              🔒 Protected by The Property Helpline Security Guarantee
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
