"use client";
import Link from "next/link";
import React, { useState } from "react";
import { use } from "react";

const TRUSTLINK_DATA: Record<string, {
  id: string; propId: string; propNum: string; customer: string; initials: string;
  property: string; suburb: string; stage: string; status: string; statusColor: string;
  handover: string; progress: number; readiness: number; readinessOf: number;
}> = {
  "TL-99214-B": {
    id: "TL-99214-B", propId: "TPH-KEN-018", propNum: "018", customer: "Emily & James Carter",
    initials: "EC", property: "18 Banksia Crescent", suburb: "Kenmore QLD", stage: "Finishing",
    status: "Handover Ready", statusColor: "emerald", handover: "24 Sep 2026",
    progress: 88, readiness: 1, readinessOf: 5,
  },
  "TL-88301-A": {
    id: "TL-88301-A", propId: "TPH-GRV-007", propNum: "007", customer: "Sofia Nguyen",
    initials: "SN", property: "7 Cedar Street", suburb: "Graceville QLD", stage: "Frame",
    status: "Documents Requested", statusColor: "amber", handover: "12 Feb 2027",
    progress: 38, readiness: 0, readinessOf: 5,
  },
  "TL-76100-C": {
    id: "TL-76100-C", propId: "TPH-BRK-042", propNum: "042", customer: "Noah & Mia Wilson",
    initials: "NW", property: "42 Ridge Road", suburb: "Brookfield QLD", stage: "Aftercare",
    status: "Delivered", statusColor: "green", handover: "04 Sep 2026",
    progress: 100, readiness: 5, readinessOf: 5,
  },
};

const GATES = [
  { id: "docs", title: "Evidence reviewed", note: "3 of 4 required records reviewed" },
  { id: "selections", title: "Selections settled", note: "1 change awaiting decision" },
  { id: "walkthrough", title: "Walkthrough recorded", note: "Review home together and record outcome" },
  { id: "issues", title: "Blocking issues cleared", note: "1 follow-up item remains" },
  { id: "owner", title: "Recipient & access checked", note: "Confirm owner and package access" },
];

const DOCS = [
  { title: "Approved plans & specifications", source: "Builder · project documents", status: "reviewed" },
  { title: "Electrical completion evidence", source: "Bright Spark Electrical", status: "missing" },
  { title: "Final inspection record", source: "Project supervisor", status: "reviewed" },
  { title: "Appliances, manuals & warranties", source: "Builder · supplied products", status: "missing" },
];

const STATUS_STYLES: Record<string, string> = {
  emerald: "bg-emerald-100 text-emerald-800",
  amber: "bg-amber-100 text-amber-800",
  green: "bg-green-100 text-green-800",
};

type Tab = "overview" | "documents" | "delivery";

export default function ProTrustLinkDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const tl = TRUSTLINK_DATA[id] ?? TRUSTLINK_DATA["TL-99214-B"];
  const [tab, setTab] = useState<Tab>("overview");
  const [gateState, setGateState] = useState<Record<string, boolean>>({ issues: true });
  const [docState, setDocState] = useState<Record<string, string>>(
    Object.fromEntries(DOCS.map((d) => [d.title, d.status]))
  );
  const [ownerConfirmed, setOwnerConfirmed] = useState(false);
  const [delivered, setDelivered] = useState(tl.readiness === 5);

  const okCount = GATES.filter((g) => gateState[g.id]).length;
  const readinessPct = Math.round((okCount / 5) * 100);

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/pro/trustlinks" className="hover:text-brand-navy dark:hover:text-brand-gold font-medium">TrustLinks</Link>
        <span>/</span>
        <span className="font-bold text-slate-700 dark:text-white">{tl.id}</span>
      </div>

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <div className="text-[10px] font-bold text-verified uppercase tracking-widest mb-2">
            PROP ID DIGITAL HANDOVER
          </div>
          <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white leading-tight">
            A beautiful finish.<br />A better beginning.
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Assemble documentation, conduct joint walkthrough, and transfer the living Prop ID vault.
          </p>
        </div>
        <button className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-sm font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          Owner preview
        </button>
      </div>

      {/* Context bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm mb-6">
        <div className="flex items-center gap-3">
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m3 10 9-7 9 7v10H3Z M9 20v-7h6v7" />
          </svg>
          <div>
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Working Property</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">{tl.property} · {tl.suburb}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">{tl.customer}</span>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-navy text-white rounded-lg text-[10px] font-bold tracking-wider">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="m12 2 8 3v7c0 6-8 10-8 10S4 18 4 12V5Z" />
            </svg>
            PROP ID {tl.propNum}
          </div>
          <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            Project details
          </button>
        </div>
      </div>

      {/* Main two-column layout */}
      <div className="flex gap-6 flex-col lg:flex-row">

        {/* LEFT RAIL — Readiness */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm p-5">
            <div className="text-[10px] font-bold text-verified uppercase tracking-widest text-center mb-3">
              Handover Readiness
            </div>

            {/* Readiness ring */}
            <div className="flex justify-center mb-4">
              <div className="relative w-28 h-28">
                <svg className="w-28 h-28 -rotate-90" viewBox="0 0 112 112">
                  <circle cx="56" cy="56" r="46" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                  <circle
                    cx="56" cy="56" r="46" fill="none"
                    stroke="#16a34a" strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 46}`}
                    strokeDashoffset={`${2 * Math.PI * 46 * (1 - readinessPct / 100)}`}
                    className="transition-all duration-700"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white leading-none">{okCount}/5</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1">Complete</span>
                </div>
              </div>
            </div>

            <div className="text-center text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">Checklist items</div>
            <div className="text-center text-[10px] text-slate-400 leading-snug mb-5">
              Verify evidence and complete the joint review prior to delivery.
            </div>

            {/* Tab nav */}
            <nav className="border-t border-slate-100 dark:border-slate-700 pt-3 space-y-1">
              {([
                ["overview", "🎁", "Readiness"],
                ["documents", "📄", `Home records · ${Object.values(docState).filter(s => s === "reviewed").length}/${DOCS.length}`],
                ["delivery", "🔒", "Delivery & access"],
              ] as [Tab, string, string][]).map(([t, emoji, label]) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left text-xs font-semibold transition-colors ${
                    tab === t
                      ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white"
                      : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-800 dark:hover:text-white"
                  }`}
                >
                  <span>{emoji}</span>
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* RIGHT — Main content */}
        <div className="flex-1 space-y-5">

          {/* Package header card */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm">
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700 flex items-start justify-between gap-4 rounded-t-xl">
              <div>
                <div className="text-[10px] font-bold text-verified uppercase tracking-widest mb-1">
                  {tl.id} · {delivered ? "DELIVERED RECORD" : "PREPARATION DRAFT"}
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{tl.property}</h2>
                <p className="text-xs text-slate-500 mt-0.5">Prepared for {tl.customer} · {tl.suburb}</p>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider mt-1 ${delivered ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-600"}`}>
                {delivered ? "Delivered" : "Draft"}
              </span>
            </div>

            <div className="p-6">
              {tab === "overview" && (
                <>
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-base">Handover checkpoints</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Five verification gates required before final Prop ID handover.</p>
                    </div>
                  </div>

                  <div className="space-y-0">
                    {GATES.map((g, i) => {
                      const ok = !!gateState[g.id];
                      return (
                        <div key={g.id} className={`flex items-start gap-4 py-4 ${i > 0 ? "border-t border-slate-100 dark:border-slate-700" : ""}`}>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 border-2 ${
                            ok ? "bg-green-50 border-green-300 text-verified" : "bg-amber-50 border-amber-300 text-amber-700"
                          }`}>
                            {ok ? "✓" : "!"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold text-slate-900 dark:text-white">{g.title}</div>
                            <div className="text-xs text-slate-500 mt-0.5">{g.note}</div>
                          </div>
                          <button
                            onClick={() => setGateState((prev) => ({ ...prev, [g.id]: !prev[g.id] }))}
                            className="flex-shrink-0 px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                          >
                            {ok ? "View" : "Review"}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* PropID Vault Transfer */}
                  <div className="mt-6 p-6 rounded-xl"
                    style={{background: "linear-gradient(135deg, #0b1f38 0%, #0c3d2b 100%)", border: "1px solid rgba(34,197,94,0.2)"}}>
                    <div className="text-[10px] font-bold text-green-400 uppercase tracking-widest mb-3">
                      PROP ID VAULT TRANSFER
                    </div>
                    <h3 className="text-xl font-display font-bold text-white mb-2">Deliver the permanent digital home.</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      The owner receives approved plans, warranty deeds, certificates of inspection, and agreed maintenance follow-ups — all in a permanent, living property record.
                    </p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <button
                        onClick={() => setTab("delivery")}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-verified text-white text-xs font-bold rounded-lg hover:bg-verified-dark transition-colors"
                      >
                        Review delivery
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16m-6-6 6 6-6 6" />
                        </svg>
                      </button>
                      <button className="inline-flex items-center gap-2 px-4 py-2 border border-slate-600 text-slate-300 text-xs font-bold rounded-lg hover:bg-slate-700 transition-colors">
                        Owner preview
                      </button>
                    </div>
                  </div>
                </>
              )}

              {tab === "documents" && (
                <>
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-base">Property documentation records</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Verified certificates and manuals for the homeowner vault.</p>
                    </div>
                    <span className="text-xs font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-lg">
                      {Object.values(docState).filter(s => s === "reviewed").length}/{DOCS.length} reviewed
                    </span>
                  </div>
                  <div className="space-y-0">
                    {DOCS.map((doc, i) => {
                      const status = docState[doc.title];
                      return (
                        <div key={doc.title} className={`flex items-center gap-4 py-4 ${i > 0 ? "border-t border-slate-100 dark:border-slate-700" : ""}`}>
                          <div className="w-9 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 flex-shrink-0">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M5 3h9l5 5v13H5Z M14 3v6h5M8 13h8m-8 4h6" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-slate-900 dark:text-white">{doc.title}</div>
                            <div className="text-xs text-slate-500 mt-0.5">{doc.source}</div>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider flex-shrink-0 ${
                            status === "reviewed" ? "bg-green-100 text-green-800"
                            : status === "missing" ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-800"
                          }`}>
                            {status === "reviewed" ? "Reviewed" : status === "missing" ? "Missing" : "Needs review"}
                          </span>
                          <button
                            onClick={() => setDocState(prev => ({ ...prev, [doc.title]: "reviewed" }))}
                            className="flex-shrink-0 px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                          >
                            {status === "missing" ? "Add evidence" : status === "reviewed" ? "Open record" : "Review"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {tab === "delivery" && (
                <>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">Handover transfer & delivery</h3>
                  <p className="text-xs text-slate-500 mb-5">Confirm owner credentials and deliver the permanent Prop ID package.</p>

                  {/* Owner card */}
                  <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700 rounded-xl mb-5">
                    <div className="w-10 h-10 rounded-full bg-brand-navy flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                      {tl.initials}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-slate-900 dark:text-white">{tl.customer}</div>
                      <div className="text-xs text-slate-500">{tl.property} · <span className="text-verified font-bold">PROP ID {tl.propNum}</span></div>
                    </div>
                  </div>

                  {/* Owner confirm */}
                  <label className="flex items-start gap-3 cursor-pointer mb-5">
                    <input
                      type="checkbox"
                      checked={ownerConfirmed}
                      onChange={(e) => setOwnerConfirmed(e.target.checked)}
                      className="mt-0.5 w-4 h-4 accent-verified"
                    />
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">Confirm owner entitlement & release authorisation</div>
                      <div className="text-xs text-slate-500 mt-1">Only registered titleholders can claim ownership of the permanent Prop ID.</div>
                    </div>
                  </label>

                  {/* TrustLink verification */}
                  <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/40 rounded-xl mb-5">
                    <svg className="w-5 h-5 text-verified flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m12 2 8 3v7c0 6-8 10-8 10S4 18 4 12V5Z M8 11l3 3 5-5" />
                    </svg>
                    <div>
                      <div className="text-xs font-bold text-verified">TrustLink identity verification</div>
                      <div className="text-xs text-green-700 dark:text-green-400 mt-0.5">Owner identity is verified against registered title before Prop ID transfer is authorised.</div>
                    </div>
                  </div>

                  <button
                    onClick={() => { if (ownerConfirmed) setDelivered(true); }}
                    disabled={!ownerConfirmed || delivered}
                    className="w-full py-3 bg-brand-navy text-white text-sm font-bold rounded-xl hover:bg-brand-navy-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {delivered ? "✓ Handover completed" : "Deliver Prop ID package"}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Requirements card */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-4">Requirements &amp; Documents</h3>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                  <tr>
                    <th className="p-3">Requirement</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {[
                    { req: "Identity Proof", status: "Pending", color: "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300" },
                    { req: "Property Sale Deed", status: "Under Review", color: "bg-amber-100 text-amber-800" },
                    { req: "Electrical Certificate", status: "Missing", color: "bg-red-100 text-red-700" },
                  ].map(({ req, status, color }) => (
                    <tr key={req}>
                      <td className="p-3 font-medium text-slate-800 dark:text-slate-200">{req}</td>
                      <td className="p-3">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${color}`}>{status}</span>
                      </td>
                      <td className="p-3 text-right">
                        <button className="text-brand-navy dark:text-brand-gold font-bold text-xs hover:underline">
                          {status === "Pending" ? "Remind" : "Review File"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* CRM sidebar */}
        <div className="w-full lg:w-72 flex-shrink-0 space-y-5">
          {/* PropID badge */}
          <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm"
            style={{background: "linear-gradient(135deg, #0c2340 0%, #0c3d2b 100%)"}}>
            <div className="p-5">
              <div className="text-[10px] font-bold text-green-400 uppercase tracking-widest mb-3">Prop ID</div>
              <div className="text-2xl font-bold text-white font-mono mb-1">{tl.propId}</div>
              <div className="text-xs text-slate-400">{tl.property} · {tl.suburb}</div>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-verified" />
                <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">TrustLink · Active</span>
              </div>
            </div>
            <div className="px-5 pb-5">
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-verified to-brand-emerald rounded-full" style={{ width: `${tl.progress}%` }} />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 mt-1.5">
                <span>Build progress</span>
                <span className="font-bold text-white">{tl.progress}%</span>
              </div>
            </div>
          </div>

          {/* CRM notes */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl p-5">
            <h3 className="text-[10px] font-bold text-amber-900 dark:text-amber-500 uppercase tracking-widest mb-1">Internal CRM Notes</h3>
            <p className="text-[10px] text-amber-700 dark:text-amber-400 opacity-70 mb-3">Private — not visible to the customer.</p>
            <div className="bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800 rounded-lg p-3 text-xs text-slate-700 dark:text-slate-300 mb-3">
              Customer is highly motivated. Follow up by Tuesday if documents aren&apos;t uploaded. — Alex
            </div>
            <button className="w-full py-1.5 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-500 text-xs font-bold rounded-lg hover:bg-amber-100 dark:hover:bg-amber-800/30 transition-colors">
              + Add Private Note
            </button>
          </div>

          {/* Quick actions */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm p-5">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Request Docs", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
                { label: "Add Milestone", icon: "M12 6v6m0 0v6m0-6h6m-6 0H6" },
                { label: "Send Message", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
                { label: "Update Status", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" },
              ].map(({ label, icon }) => (
                <button key={label} className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-navy hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <svg className="w-4 h-4 text-slate-500 mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
                  </svg>
                  <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 text-center leading-tight">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
