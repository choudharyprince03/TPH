"use client";
import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ReferralModal } from "@/components/features/ReferralModal";

function ProDashboardContent() {
  const searchParams = useSearchParams();
  const scenario = searchParams.get("scenario") || "draft";
  const [activeScenario, setActiveScenario] = useState<string>(scenario);
  const [referralOpen, setReferralOpen] = useState(false);
  const [builderSigned, setBuilderSigned] = useState(true);
  const [clientSigned, setClientSigned] = useState(false);

  // Sync if URL query param changes
  React.useEffect(() => {
    if (searchParams.get("scenario")) {
      setActiveScenario(searchParams.get("scenario") || "draft");
    }
  }, [searchParams]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1240px] w-full mx-auto font-sans space-y-6">

      {/* ── Scenario Switcher Tabs (Stitch Alignment) ── */}
      <div className="flex items-center justify-between border-b border-[#e2e5e5] pb-2">
        <div className="flex items-center gap-2 overflow-x-auto">
          {[
            { id: "draft", label: "Builder's Working Day", badge: "Live" },
            { id: "review", label: "Completed Review Example", badge: "Joint" },
            { id: "delivered", label: "Owner's Delivered Home", badge: "Transferred" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveScenario(tab.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeScenario === tab.id
                  ? "bg-[#0F1A2C] text-white shadow-2xs"
                  : "bg-white text-[#64727e] hover:text-[#0F1A2C] border border-[#e2e5e5]"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[9.5px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeScenario === tab.id
                    ? "bg-[#C59B27] text-[#0F1A2C]"
                    : "bg-[#f0f2f3] text-[#64727e]"
                }`}
              >
                {tab.badge}
              </span>
            </button>
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => setReferralOpen(true)}
            className="px-3 py-1.5 bg-white border border-[#e2e5e5] hover:bg-[#F9F8F5] text-[#183249] rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>🤝</span>
            <span>Invite</span>
          </button>
          <Link
            href="/pro/trustlinks/welcome"
            className="px-3.5 py-1.5 bg-[#0F1A2C] hover:bg-[#1c3a54] text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <span>+ Issue TrustLink</span>
          </Link>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          SCENARIO 1: BUILDER'S WORKING DAY (Draft & In-Flight)
          ══════════════════════════════════════════════════════ */}
      {activeScenario === "draft" && (
        <div className="space-y-6">
          {/* Breadcrumb & Heading */}
          <div>
            <div className="text-[11px] text-[#64727e] mb-1.5 flex items-center gap-1.5 font-medium">
              <span>Builder Pro Hub</span>
              <span>›</span>
              <span className="text-[#183249]">Your day, organised</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="text-[9.5px] font-bold uppercase tracking-[1.5px] text-[#C59B27]">
                  Draft &amp; In-Flight Handovers
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F1A2C] mt-0.5 font-headline">
                  Good morning, Chris
                </h1>
                <p className="text-xs text-[#64727e] mt-0.5">
                  3 inbound leads · 8 connected properties · 1 handover package ready for joint review
                </p>
              </div>
            </div>
          </div>

          {/* Metric Strip (4 Clean Metrics) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 bg-white border border-[#e2e5e5] rounded-xl overflow-hidden shadow-2xs divide-y sm:divide-y-0 sm:divide-x divide-[#e2e5e5]">
            <div className="p-4">
              <div className="text-2xl sm:text-3xl font-display font-medium text-[#0F1A2C]">3</div>
              <div className="text-xs font-semibold text-[#183249] mt-1">Inbound Leads</div>
              <div className="text-[10.5px] text-[#64727e] mt-0.5">2 unread client briefs</div>
            </div>
            <div className="p-4">
              <div className="text-2xl sm:text-3xl font-display font-medium text-[#0F1A2C]">8</div>
              <div className="text-xs font-semibold text-[#183249] mt-1">Connected Properties</div>
              <div className="text-[10.5px] text-[#64727e] mt-0.5">Live TrustLink records</div>
            </div>
            <div className="p-4">
              <div className="text-2xl sm:text-3xl font-display font-medium text-[#C59B27]">1</div>
              <div className="text-xs font-semibold text-[#183249] mt-1">Handover Ready</div>
              <div className="text-[10.5px] text-[#64727e] mt-0.5">Banksia Cres sign-off pending</div>
            </div>
            <div className="p-4">
              <div className="text-2xl sm:text-3xl font-display font-medium text-[#28715e]">100%</div>
              <div className="text-xs font-semibold text-[#183249] mt-1">Compliance Gate</div>
              <div className="text-[10.5px] text-[#64727e] mt-0.5">QBCC certs up to date</div>
            </div>
          </div>

          {/* Featured Priority Handover Banner */}
          <div className="bg-[#0F1A2C] text-white rounded-xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-white/10 text-xl flex items-center justify-center flex-shrink-0">
                📦
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#C59B27]">
                    Handover Ready
                  </span>
                  <span className="text-[10.5px] text-[#adc0cd]">· 92% complete</span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-white truncate mt-0.5">
                  18 Banksia Crescent, Kenmore (Alex &amp; Emily)
                </h2>
                <p className="text-xs text-[#adc0cd] mt-0.5 max-w-2xl">
                  Form 16 certs, manuals &amp; Digital Key compiled. Ready for client sign-off.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 flex-shrink-0">
              <button
                onClick={() => setActiveScenario("review")}
                className="px-4 py-2 bg-[#C59B27] hover:bg-[#b58b20] text-[#0F1A2C] font-bold text-xs rounded-lg transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Open Handover Review</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* 2-Column Clean Workspace: Leads & Active Projects */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Leads Column */}
            <section className="bg-white border border-[#e2e5e5] rounded-xl p-4 shadow-2xs">
              <div className="flex items-center justify-between pb-2.5 border-b border-[#e2e5e5] mb-2.5">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-[#0F1A2C]">Inbound Leads</h2>
                  <span className="text-[9.5px] font-bold px-1.5 py-0.2 bg-[#fbf3e4] text-[#946315] rounded-full">3</span>
                </div>
                <Link href="/pro/leads" className="text-xs font-bold text-[#0F1A2C] hover:underline">
                  View all →
                </Link>
              </div>

              <div className="divide-y divide-[#f0f2f3] text-xs">
                <div className="py-2.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <strong className="text-[#0F1A2C] font-semibold truncate">James &amp; Sarah Davidson</strong>
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

                <div className="py-2.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <strong className="text-[#0F1A2C] font-semibold truncate">Aisha Khan</strong>
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

                <div className="py-2.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <strong className="text-[#0F1A2C] font-semibold truncate">Thomas Murray</strong>
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

            {/* Active Projects Column */}
            <section className="bg-white border border-[#e2e5e5] rounded-xl p-4 shadow-2xs">
              <div className="flex items-center justify-between pb-2.5 border-b border-[#e2e5e5] mb-2.5">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-[#0F1A2C]">Active Projects</h2>
                  <span className="text-[9.5px] font-bold px-1.5 py-0.2 bg-[#eaf4ef] text-[#28715e] rounded-full">8</span>
                </div>
                <Link href="/pro/properties" className="text-xs font-bold text-[#0F1A2C] hover:underline">
                  View all →
                </Link>
              </div>

              <div className="divide-y divide-[#f0f2f3] text-xs">
                <div className="py-2.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <strong className="text-[#0F1A2C] font-semibold truncate">18 Banksia Crescent</strong>
                      <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#fbf3e4] text-[#946315] rounded">Handover Ready</span>
                    </div>
                    <p className="text-[10.5px] text-[#64727e] truncate mt-0.5">
                      Kenmore · Alex &amp; Emily · 92% complete
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveScenario("review")}
                    className="px-2.5 py-1 bg-[#0F1A2C] hover:bg-[#1c3a54] text-white text-[10.5px] font-bold rounded-lg transition-colors flex-shrink-0 cursor-pointer"
                  >
                    Review
                  </button>
                </div>

                <div className="py-2.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <strong className="text-[#0F1A2C] font-semibold truncate">7 Cedar Street</strong>
                      <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#eaf4ef] text-[#28715e] rounded">Fixing Stage</span>
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

                <div className="py-2.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <strong className="text-[#0F1A2C] font-semibold truncate">42 Ridge Road</strong>
                      <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#f0f2f3] text-[#64727e] rounded">Settled</span>
                    </div>
                    <p className="text-[10.5px] text-[#64727e] truncate mt-0.5">
                      Brookfield · Noah &amp; Mia Wilson · 100% delivered
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveScenario("delivered")}
                    className="px-2.5 py-1 bg-[#F9F8F5] hover:bg-[#eae8e2] text-[#0F1A2C] text-[10.5px] font-bold rounded-lg transition-colors flex-shrink-0 border border-[#e2e5e5] cursor-pointer"
                  >
                    Owner Record
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Quick Tools Strip */}
          <div className="bg-white border border-[#e2e5e5] rounded-xl p-3.5 shadow-2xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#64727e] mb-2.5">
              Workspace Shortcuts
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <Link
                href="/pro/digital-key"
                className="p-2.5 rounded-lg bg-[#faf9f6] hover:bg-[#f2efe9] border border-[#e8e6df] transition-all flex items-center gap-2.5 group"
              >
                <span className="text-base">🔑</span>
                <div className="min-w-0">
                  <div className="text-[11.5px] font-semibold text-[#0F1A2C] group-hover:text-[#C59B27] truncate">
                    Digital Key
                  </div>
                  <div className="text-[9.5px] text-[#64727e] truncate">Form 16/43 certs</div>
                </div>
              </Link>

              <Link
                href="/pro/documents"
                className="p-2.5 rounded-lg bg-[#faf9f6] hover:bg-[#f2efe9] border border-[#e8e6df] transition-all flex items-center gap-2.5 group"
              >
                <span className="text-base">📄</span>
                <div className="min-w-0">
                  <div className="text-[11.5px] font-semibold text-[#0F1A2C] group-hover:text-[#C59B27] truncate">
                    Statutory Docs
                  </div>
                  <div className="text-[9.5px] text-[#64727e] truncate">QBCC compliance</div>
                </div>
              </Link>

              <Link
                href="/pro/tradie"
                className="p-2.5 rounded-lg bg-[#faf9f6] hover:bg-[#f2efe9] border border-[#e8e6df] transition-all flex items-center gap-2.5 group"
              >
                <span className="text-base">👥</span>
                <div className="min-w-0">
                  <div className="text-[11.5px] font-semibold text-[#0F1A2C] group-hover:text-[#C59B27] truncate">
                    Tradie Network
                  </div>
                  <div className="text-[9.5px] text-[#64727e] truncate">5 active pros</div>
                </div>
              </Link>

              <Link
                href="/pro/tasks"
                className="p-2.5 rounded-lg bg-[#faf9f6] hover:bg-[#f2efe9] border border-[#e8e6df] transition-all flex items-center gap-2.5 group"
              >
                <span className="text-base">📋</span>
                <div className="min-w-0">
                  <div className="text-[11.5px] font-semibold text-[#0F1A2C] group-hover:text-[#C59B27] truncate">
                    Punch List
                  </div>
                  <div className="text-[9.5px] text-[#64727e] truncate">Defect checks</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          SCENARIO 2: COMPLETED REVIEW EXAMPLE (Joint Handover)
          ══════════════════════════════════════════════════════ */}
      {activeScenario === "review" && (
        <div className="space-y-6">
          {/* Breadcrumb & Heading */}
          <div>
            <div className="text-[11px] text-[#64727e] mb-1.5 flex items-center gap-1.5 font-medium">
              <span>Builder Pro Hub</span>
              <span>›</span>
              <span>Handover Review</span>
              <span>›</span>
              <span className="text-[#0F1A2C] font-semibold">18 Banksia Crescent</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="text-[9.5px] font-bold uppercase tracking-[1.5px] text-[#C59B27]">
                  Joint Handover Review &amp; Inspection
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F1A2C] mt-0.5 font-headline">
                  18 Banksia Crescent, Kenmore
                </h1>
                <p className="text-xs text-[#64727e] mt-0.5">
                  Walk-through completed with Alex &amp; Emily Harrison · Ready for mutual sign-off and Digital Key release
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveScenario("draft")}
                  className="px-3 py-1.5 bg-white border border-[#e2e5e5] hover:bg-[#F9F8F5] text-[#183249] rounded-lg text-xs font-semibold cursor-pointer"
                >
                  ← Back to Day
                </button>
                <button
                  onClick={() => setActiveScenario("delivered")}
                  className="px-3.5 py-1.5 bg-[#C59B27] hover:bg-[#b58b20] text-[#0F1A2C] font-bold rounded-lg text-xs transition-colors cursor-pointer"
                >
                  View Delivered Prop ID →
                </button>
              </div>
            </div>
          </div>

          {/* Stepper (5 Stages from Stitch prototype) */}
          <div className="bg-white border border-[#e2e5e5] rounded-xl p-3.5 shadow-2xs">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { num: "1", label: "Preparation", status: "done" },
                { num: "2", label: "Walk-Through", status: "done" },
                { num: "3", label: "Finishes & Specs", status: "current" },
                { num: "4", label: "Statutory Certs", status: "done" },
                { num: "5", label: "Mutual Sign-off", status: clientSigned ? "done" : "pending" },
              ].map((step) => (
                <div key={step.num} className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10.5px] font-bold flex-shrink-0 ${
                      step.status === "done"
                        ? "bg-[#eaf4ef] text-[#28715e]"
                        : step.status === "current"
                        ? "bg-[#0F1A2C] text-white"
                        : "bg-[#f0f2f3] text-[#8ca4b7]"
                    }`}
                  >
                    {step.status === "done" ? "✓" : step.num}
                  </div>
                  <div className="min-w-0">
                    <span
                      className={`text-xs block truncate ${
                        step.status === "current"
                          ? "font-bold text-[#0F1A2C]"
                          : "font-medium text-[#64727e]"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Review Grid: Finishes with Material Swatches */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Item 1: Engineered Oak Flooring */}
            <div className="bg-white border border-[#e2e5e5] rounded-xl overflow-hidden shadow-2xs">
              <div className="h-[95px] bg-[#f4f2ec] p-4 flex items-center justify-between border-b border-[#e2e5e5]">
                <div className="material-swatch oak flex-shrink-0" />
                <div className="text-right">
                  <span className="text-[9.5px] uppercase tracking-wider text-[#64727e] font-semibold block">
                    Living &amp; Dining
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#eaf4ef] text-[#28715e] font-bold mt-1 inline-block">
                    ✓ Verified to Spec
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-2.5">
                <h3 className="text-sm font-bold text-[#0F1A2C]">
                  Natural European Oak Engineered Flooring
                </h3>
                <div className="text-[11px] text-[#64727e] space-y-1">
                  <div className="flex justify-between border-b border-[#f0f2f3] pb-1">
                    <span>Specification:</span>
                    <strong className="text-[#183249]">190mm Plank · Matte UV Lacquer</strong>
                  </div>
                  <div className="flex justify-between border-b border-[#f0f2f3] pb-1">
                    <span>Installer:</span>
                    <strong className="text-[#183249]">Brisbane Timberworks (QBCC #110294)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Warranty:</span>
                    <strong className="text-[#183249]">25-Year Manufacturer Warranty</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Item 2: Calacatta Engineered Stone */}
            <div className="bg-white border border-[#e2e5e5] rounded-xl overflow-hidden shadow-2xs">
              <div className="h-[95px] bg-[#f4f2ec] p-4 flex items-center justify-between border-b border-[#e2e5e5]">
                <div className="material-swatch stone flex-shrink-0" />
                <div className="text-right">
                  <span className="text-[9.5px] uppercase tracking-wider text-[#64727e] font-semibold block">
                    Kitchen &amp; Island
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#eaf4ef] text-[#28715e] font-bold mt-1 inline-block">
                    ✓ Zero Silica Compliant
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-2.5">
                <h3 className="text-sm font-bold text-[#0F1A2C]">
                  Calacatta Gold Engineered Mineral Surface
                </h3>
                <div className="text-[11px] text-[#64727e] space-y-1">
                  <div className="flex justify-between border-b border-[#f0f2f3] pb-1">
                    <span>Thickness:</span>
                    <strong className="text-[#183249]">40mm Mitered Waterfall Edge</strong>
                  </div>
                  <div className="flex justify-between border-b border-[#f0f2f3] pb-1">
                    <span>Fabricator:</span>
                    <strong className="text-[#183249]">Apex Stoneworks (Verified)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Certificates:</span>
                    <strong className="text-[#183249]">SafeWork QLD Certified Non-Silica</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mutual Sign-off Box */}
          <div className="bg-white border border-[#e2e5e5] rounded-xl p-5 shadow-2xs space-y-4">
            <div className="border-b border-[#e2e5e5] pb-3">
              <h2 className="text-sm font-bold text-[#0F1A2C]">
                Mutual Handover Sign-off &amp; Transfer
              </h2>
              <p className="text-xs text-[#64727e] mt-0.5">
                Signing confirms that physical walk-through items, statutory Form 16 certificates, and Digital Key keys are verified.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Builder Sign-off */}
              <div className="p-4 rounded-xl border border-[#cfdfd4] bg-[#f4f8f4] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#28715e]">
                    Builder Sign-off
                  </span>
                  <span className="text-[10px] text-[#28715e] font-semibold">✓ Verified</span>
                </div>
                <div className="font-display italic text-2xl text-[#0F1A2C] py-1">
                  Chris Taylor
                </div>
                <div className="text-[10.5px] text-[#64727e]">
                  Nominated Supervisor · Northline Homes (QBCC #150821)
                </div>
              </div>

              {/* Client Sign-off */}
              <div className={`p-4 rounded-xl border transition-all space-y-2 ${
                clientSigned ? "border-[#cfdfd4] bg-[#f4f8f4]" : "border-[#e2e5e5] bg-[#faf9f6]"
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#64727e]">
                    Owner Confirmation
                  </span>
                  <span className={`text-[10px] font-semibold ${clientSigned ? "text-[#28715e]" : "text-[#946315]"}`}>
                    {clientSigned ? "✓ Confirmed" : "Awaiting signature"}
                  </span>
                </div>
                <div className="font-display italic text-2xl text-[#0F1A2C] py-1">
                  {clientSigned ? "Alex & Emily Harrison" : "—"}
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10.5px] text-[#64727e]">
                    Property Owners · 18 Banksia Crescent
                  </span>
                  <button
                    onClick={() => setClientSigned(!clientSigned)}
                    className="text-xs font-bold text-[#0F1A2C] underline hover:text-[#C59B27] cursor-pointer"
                  >
                    {clientSigned ? "Undo" : "Simulate Owner Signature"}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-[#64727e]">
                Dual verification timestamped on secure Queensland Prop ID registry.
              </span>
              <button
                onClick={() => setActiveScenario("delivered")}
                className="px-4 py-2 bg-[#0F1A2C] hover:bg-[#1c3a54] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Complete Handover &amp; Deliver →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          SCENARIO 3: OWNER'S DELIVERED HOME (Prop ID Record)
          ══════════════════════════════════════════════════════ */}
      {activeScenario === "delivered" && (
        <div className="space-y-6">
          {/* Breadcrumb & Heading */}
          <div>
            <div className="text-[11px] text-[#64727e] mb-1.5 flex items-center gap-1.5 font-medium">
              <span>Builder Pro Hub</span>
              <span>›</span>
              <span>Delivered Records</span>
              <span>›</span>
              <span className="text-[#0F1A2C] font-semibold">18 Banksia Crescent</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="text-[9.5px] font-bold uppercase tracking-[1.5px] text-[#28715e]">
                  Delivered Property World Record
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F1A2C] mt-0.5 font-headline">
                  Welcome Home: 18 Banksia Crescent
                </h1>
                <p className="text-xs text-[#64727e] mt-0.5">
                  Transferred securely to Alex &amp; Emily Harrison · Permanent owner record and digital key active
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveScenario("draft")}
                  className="px-3 py-1.5 bg-white border border-[#e2e5e5] hover:bg-[#F9F8F5] text-[#183249] rounded-lg text-xs font-semibold cursor-pointer"
                >
                  ← Back to Day
                </button>
                <Link
                  href="/properties"
                  className="px-3.5 py-1.5 bg-[#0F1A2C] hover:bg-[#1c3a54] text-white font-bold rounded-lg text-xs transition-colors"
                >
                  View in My Property World →
                </Link>
              </div>
            </div>
          </div>

          {/* Delivered Values Strip */}
          <div className="bg-[#0F1A2C] text-white rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C59B27]">
                  Statutory Prop ID
                </span>
                <div className="text-lg font-bold text-white mt-0.5">#TL-99214-B</div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#28715e] text-white text-[10px] font-bold">
                ✓ Handover Complete
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-[#adc0cd] block text-[10.5px]">Owner</span>
                <strong className="text-white text-sm">Alex &amp; Emily Harrison</strong>
              </div>
              <div>
                <span className="text-[#adc0cd] block text-[10.5px]">Builder</span>
                <strong className="text-white text-sm">Northline Homes</strong>
              </div>
              <div>
                <span className="text-[#adc0cd] block text-[10.5px]">Compliance Docs</span>
                <strong className="text-[#C59B27] text-sm">7 QBCC Forms Filed</strong>
              </div>
              <div>
                <span className="text-[#adc0cd] block text-[10.5px]">Statutory Warranty</span>
                <strong className="text-[#28715e] text-sm">6 Years 6 Months</strong>
              </div>
            </div>
          </div>

          {/* Checklist Gates & Transferred Artifacts */}
          <div className="bg-white border border-[#e2e5e5] rounded-xl p-5 shadow-2xs space-y-3">
            <h2 className="text-sm font-bold text-[#0F1A2C] border-b border-[#e2e5e5] pb-2.5">
              Handover Gates Verified &amp; Transferred
            </h2>
            <div className="divide-y divide-[#f0f2f3] text-xs">
              {[
                { label: "QBCC Form 16 / Form 43 Inspection Certificates", sub: "Structural, waterproofing, termite barrier, and glazing compliance.", status: "Verified" },
                { label: "Digital Key Master Token Released", sub: "Permanent owner administrative control granted to client email.", status: "Transferred" },
                { label: "Trade Subcontractor Directory", sub: "Emergency plumbing, electrical, and HVAC warranties linked.", status: "Linked" },
                { label: "90-Day Post-Handover Maintenance Schedule", sub: "Defect liability period monitoring active with builder support.", status: "Active" },
              ].map((gate, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <strong className="text-[#0F1A2C] block font-semibold">{gate.label}</strong>
                    <span className="text-[10.5px] text-[#64727e] mt-0.5 block">{gate.sub}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#eaf4ef] text-[#28715e] flex-shrink-0">
                    ✓ {gate.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Referral Modal */}
      <ReferralModal
        isOpen={referralOpen}
        onClose={() => setReferralOpen(false)}
        mode="pro"
      />
    </div>
  );
}

export default function ProDashboard() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-[#64727e]">Loading workspace...</div>}>
      <ProDashboardContent />
    </Suspense>
  );
}
