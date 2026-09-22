"use client";
import React from "react";
import Link from "next/link";

export default function ProDashboard() {
  return (
    <div className="p-6 sm:p-9 lg:p-11 max-w-[1240px] w-full font-sans">

      {/* ── Top Header ────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="text-[9px] font-bold uppercase tracking-[1.4px] text-[#24754c] mb-1">
            Pro Hub · Hart Homes (QBCC #150821)
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.8px] text-[#102645]">
            Good morning, Olivia.
          </h1>
          <p className="text-[13px] text-[#68788e] mt-1">
            Data &amp; Lead Management Center · Simplified enquiries, attached property records, and digital handovers.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <Link
            href="/pro/leads"
            className="px-4 py-2.5 bg-white border border-[#cbd5e2] hover:bg-[#f3f6fb] text-[#102645] rounded-xl text-[12px] font-semibold transition-colors shadow-sm flex items-center gap-1.5"
          >
            <span>Incoming Leads</span>
            <span className="bg-[#fff4df] text-[#8b641c] text-[10px] font-bold px-1.5 py-0.2 rounded">3 New</span>
          </Link>
          <Link
            href="/pro/trustlinks/welcome"
            className="px-4 py-2.5 bg-[#071d3b] hover:bg-[#102d59] text-white rounded-xl text-[12px] font-semibold transition-colors shadow-sm flex items-center gap-1.5"
          >
            <span>+ Issue TrustLink</span>
          </Link>
        </div>
      </div>

      {/* ── Inbound Enquiries Priority Banner ─────────────────────────── */}
      <section className="bg-[#071d3b] text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="text-[#efbd66] text-[10px] font-bold uppercase tracking-[1.6px] mb-1">
            DLM Intake Action Required · 3 New Leads
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Inbound Enquiries with Attached Property Data
          </h2>
          <p className="text-[12px] text-[#b9c8db] max-w-xl mb-4 leading-relaxed">
            James &amp; Sarah Davidson have submitted an inquiry for a new build on Simpsons Rd, Bardon with Class H1 soil and 2.8m contour slope data pre-attached. Zero manual chasing required.
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="/pro/leads/L-101"
              className="px-4 py-2 bg-[#efbd66] hover:bg-[#dfac55] text-[#071d3b] font-bold rounded-xl text-[12px] transition-colors"
            >
              Review James&apos;s Site Data &amp; Respond →
            </Link>
            <Link
              href="/pro/leads"
              className="text-[11px] text-[#b9c8db] hover:text-white underline"
            >
              View all 3 leads
            </Link>
          </div>
        </div>

        <div className="text-right flex-shrink-0 bg-white/10 p-4 rounded-xl border border-white/15">
          <span className="text-2xl font-bold text-[#efbd66] block">100%</span>
          <span className="text-[10px] text-[#b9c8db]">Site Data Structured</span>
        </div>
      </section>

      {/* ── 3-Card Summary Counters ───────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-9">
        <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-3xl font-bold tracking-tight text-[#102645]">3</span>
            <span className="text-lg">📥</span>
          </div>
          <strong className="block text-[13px] text-[#102645]">Inbound Enquiries</strong>
          <small className="text-[11px] text-[#68788e]">2 require quick review &amp; reply</small>
        </div>

        <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-3xl font-bold tracking-tight text-[#102645]">8</span>
            <span className="text-lg">🛡️</span>
          </div>
          <strong className="block text-[13px] text-[#102645]">Active Connected Properties</strong>
          <small className="text-[11px] text-[#68788e]">Living Prop ID records attached</small>
        </div>

        <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-3xl font-bold tracking-tight text-[#24754c]">1</span>
            <span className="text-lg">🎁</span>
          </div>
          <strong className="block text-[13px] text-[#102645]">Handover Ready to Seal</strong>
          <small className="text-[11px] text-[#68788e]">18 Banksia Crescent, Kenmore (92%)</small>
        </div>
      </div>

      {/* ── 2-Column Focus Grid (Incoming Leads & Fast Actions) ───────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 mb-10">

        {/* Incoming Leads Priority Queue */}
        <section className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[#dfe6ef] mb-4">
            <div>
              <h2 className="text-base font-bold text-[#102645]">Incoming Enquiries Queue</h2>
              <p className="text-[11px] text-[#68788e]">Direct homeowner inquiries with verified site data.</p>
            </div>
            <Link href="/pro/leads" className="text-[11px] font-bold text-[#071d3b] hover:underline">
              View all 3 →
            </Link>
          </div>

          <div className="divide-y divide-[#dfe6ef] text-[12px]">
            {/* Lead 1 */}
            <div className="py-3.5 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <strong className="text-[#102645] font-semibold truncate">James &amp; Sarah Davidson</strong>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#fff4df] text-[#8b641c] rounded">
                    New
                  </span>
                </div>
                <p className="text-[11px] text-[#68788e] truncate mt-0.5">
                  Bardon QLD · 4 Bed Custom Build · <span className="font-mono text-[#071d3b]">Class H1 Soil</span>
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
            <div className="py-3.5 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <strong className="text-[#102645] font-semibold truncate">Aisha Khan</strong>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#fff4df] text-[#8b641c] rounded">
                    New
                  </span>
                </div>
                <p className="text-[11px] text-[#68788e] truncate mt-0.5">
                  Newstead QLD · Knockdown-Rebuild · <span className="font-mono text-[#071d3b]">Class M Soil</span>
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
            <div className="py-3.5 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <strong className="text-[#102645] font-semibold truncate">Thomas Murray</strong>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#eaf5ef] text-[#24754c] rounded">
                    In Review
                  </span>
                </div>
                <p className="text-[11px] text-[#68788e] truncate mt-0.5">
                  Fig Tree Pocket · Extension &amp; Alfresco · Cash Ready
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
        <section className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm">
          <div className="pb-3 border-b border-[#dfe6ef] mb-4">
            <h2 className="text-base font-bold text-[#102645]">DLM Workflows &amp; Data Tools</h2>
            <p className="text-[11px] text-[#68788e]">Automated actions reducing daily admin workload.</p>
          </div>

          <div className="divide-y divide-[#dfe6ef] text-[12px]">
            <Link
              href="/pro/trustlinks/welcome"
              className="py-3 flex items-center justify-between hover:bg-[#f9fafc] p-2 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">🎁</span>
                <div>
                  <strong className="block text-[#102645]">Digital Handover Manager</strong>
                  <small className="text-[#68788e]">Seal verified Form 16 / Form 43 directly to Prop ID</small>
                </div>
              </div>
              <span className="text-[#68788e]">›</span>
            </Link>

            <Link
              href="/pro/customers"
              className="py-3 flex items-center justify-between hover:bg-[#f9fafc] p-2 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">📁</span>
                <div>
                  <strong className="block text-[#102645]">Property Data &amp; Clients</strong>
                  <small className="text-[#68788e]">Living property registry, soil classes, and build records</small>
                </div>
              </div>
              <span className="text-[#68788e]">›</span>
            </Link>

            <Link
              href="/pro/documents"
              className="py-3 flex items-center justify-between hover:bg-[#f9fafc] p-2 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">📄</span>
                <div>
                  <strong className="block text-[#102645]">Statutory Certificates Register</strong>
                  <small className="text-[#68788e]">Deposit QBCC Form 16, Form 43, and electrical Form 4 certs</small>
                </div>
              </div>
              <span className="text-[#68788e]">›</span>
            </Link>
          </div>
        </section>

      </div>

      {/* ── Active Client Workspaces ─────────────────────────────────── */}
      <section className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm mb-8">
        <div className="flex items-center justify-between pb-3 border-b border-[#dfe6ef] mb-4">
          <div>
            <h2 className="text-base font-bold text-[#102645]">Active Client Workspaces</h2>
            <p className="text-[11px] text-[#68788e]">Collaborative TrustLink portals scoped by property.</p>
          </div>
          <Link href="/pro/trustlinks" className="text-[12px] font-bold text-[#071d3b] hover:underline">
            View all 8 →
          </Link>
        </div>

        <div className="divide-y divide-[#dfe6ef] text-[12px]">
          {[
            {
              id: "welcome",
              client: "Alex & Emily",
              property: "18 Banksia Crescent, Kenmore",
              purpose: "New home digital handover",
              status: "Handover Ready",
              badgeStyle: "bg-[#fff4df] text-[#8b641c]",
              updated: "34m ago",
            },
            {
              id: "TL-88301-A",
              client: "Sofia Nguyen",
              property: "7 Cedar Street, Graceville",
              purpose: "Architectural plans & scope",
              status: "Active",
              badgeStyle: "bg-[#eaf5ef] text-[#24754c]",
              updated: "2h ago",
            },
            {
              id: "TL-76100-C",
              client: "Noah & Mia Wilson",
              property: "42 Ridge Road, Brookfield",
              purpose: "Post-handover warranty care",
              status: "Settled",
              badgeStyle: "bg-[#f3f6fb] text-[#68788e]",
              updated: "Yesterday",
            },
          ].map((item) => (
            <div key={item.id} className="py-3.5 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <strong className="text-[#102645] font-semibold">{item.client}</strong>
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${item.badgeStyle}`}>
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

    </div>
  );
}
