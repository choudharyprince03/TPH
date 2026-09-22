"use client";
import Link from "next/link";
import React, { use, useState } from "react";

const TRUSTLINK_DATA: Record<string, {
  id: string; propId: string; customer: string;
  property: string; suburb: string; stage: string; status: string;
  statusColor: string; progress: number;
}> = {
  welcome: {
    id: "welcome",
    propId: "TPH-KEN-018",
    customer: "Alex & Emily",
    property: "18 Banksia Crescent",
    suburb: "Kenmore QLD 4069",
    stage: "Digital Handover",
    status: "Handover Ready",
    statusColor: "bg-[#fff4df] text-[#8b641c]",
    progress: 92,
  },
  "TL-99214-B": {
    id: "TL-99214-B",
    propId: "TPH-KEN-018",
    customer: "Alex & Emily",
    property: "18 Banksia Crescent",
    suburb: "Kenmore QLD 4069",
    stage: "Digital Handover",
    status: "Handover Ready",
    statusColor: "bg-[#fff4df] text-[#8b641c]",
    progress: 92,
  },
  "TL-88301-A": {
    id: "TL-88301-A",
    propId: "TPH-GRV-007",
    customer: "Sofia Nguyen",
    property: "7 Cedar Street",
    suburb: "Graceville QLD 4075",
    stage: "Structural Framing",
    status: "Active",
    statusColor: "bg-[#eaf5ef] text-[#24754c]",
    progress: 45,
  },
  "TL-76100-C": {
    id: "TL-76100-C",
    propId: "TPH-BRK-042",
    customer: "Noah & Mia Wilson",
    property: "42 Ridge Road",
    suburb: "Brookfield QLD 4069",
    stage: "Aftercare",
    status: "Delivered",
    statusColor: "bg-[#f3f6fb] text-[#68788e]",
    progress: 100,
  },
};

export default function ProTrustLinkDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const tl = TRUSTLINK_DATA[id] ?? TRUSTLINK_DATA["welcome"];

  const [activeTab, setActiveTab] = useState<"gates" | "documents" | "messages" | "variations">("gates");
  const [variationSigned, setVariationSigned] = useState(false);
  const [handoverSealed, setHandoverSealed] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: "m-1",
      sender: "You (Hart Homes)",
      time: "10:48 AM",
      text: "Your sample handover pack is ready to review. You can check each section and record receipt when you are ready.",
    },
    {
      id: "m-2",
      sender: "Alex (Client)",
      time: "11:15 AM",
      text: "Thanks Olivia! We saw the Touch-up paint near the laundry door open item. When is the painter coming by?",
    },
  ]);
  const [replyText, setReplyText] = useState("");

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `m-${Date.now()}`,
        sender: "You (Hart Homes)",
        time: "Just now",
        text: replyText.trim(),
      },
    ]);
    setReplyText("");
  };

  return (
    <div className="p-6 sm:p-9 lg:p-11 max-w-[1240px] w-full">

      {/* ── Breadcrumb ─────────────────────────────────────────────── */}
      <nav className="flex items-center gap-2 text-[11px] text-[#68788e] mb-6" aria-label="Breadcrumb">
        <Link href="/pro/trustlinks" className="hover:underline">TrustLinks</Link>
        <span>›</span>
        <span className="text-[#102645] font-semibold">{tl.id}</span>
      </nav>

      {/* ── Masthead ───────────────────────────────────────────────── */}
      <section className="bg-[#e9f0f5] border border-[#d8e2ec] rounded-2xl p-6 sm:p-8 mb-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#24754c] mb-1">
            Builder Handover Workspace · {tl.propId}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#102645]">
            {tl.customer}
          </h1>
          <div className="text-[12px] text-[#68788e] mt-1 flex items-center gap-2 flex-wrap">
            <span>{tl.property}, {tl.suburb}</span>
            <span>·</span>
            <span>{tl.stage}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${tl.statusColor}`}>
            {tl.status}
          </span>
          <Link
            href={`/trustlinks/${tl.id}`}
            className="px-4 py-2 bg-white border border-[#cbd5e2] hover:bg-[#f3f6fb] text-[#102645] rounded-xl text-[12px] font-semibold transition-colors"
          >
            Client view ↗
          </Link>
        </div>
      </section>

      {/* ── Sub-Navigation Tabs ─────────────────────────────────────── */}
      <nav className="flex items-center gap-5 border-b border-[#dfe6ef] mb-8 overflow-x-auto text-[13px] font-medium">
        {[
          { id: "gates", label: "Handover Gates", icon: "🚪" },
          { id: "documents", label: "Packaged Documents", icon: "📄" },
          { id: "messages", label: "Client Messages", icon: "💬", count: `${messages.length}` },
          { id: "variations", label: "Variations", icon: "📝" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`py-3 relative flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === t.id
                ? "text-[#102645] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#24754c]"
                : "text-[#68788e] hover:text-[#102645]"
            }`}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
            {t.count && (
              <span className="text-[10px] font-bold px-1.5 py-0.2 bg-[#dfe6ef] text-[#102645] rounded-full">
                {t.count}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* ── TAB 1: GATES ────────────────────────────────────────────── */}
      {activeTab === "gates" && (
        <div className="space-y-6">
          <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#dfe6ef] mb-6">
              <div>
                <h2 className="text-lg font-bold text-[#102645]">5-Gate Handover Verification</h2>
                <p className="text-[12px] text-[#68788e]">All gates must be cleared to seal the handover package to client Prop ID.</p>
              </div>
              <span className="text-[12px] font-bold text-[#24754c]">
                4 of 5 gates verified
              </span>
            </div>

            <div className="space-y-3 text-[12px]">
              {[
                { gate: "Gate 1", title: "Statutory Form 16 & Engineering Cleared", note: "Apex Engineers Form 16 registered.", ok: true },
                { gate: "Gate 2", title: "Wet Areas Waterproofing Form 43 Verified", note: "HydroSeal Form 43 uploaded and checked.", ok: true },
                { gate: "Gate 3", title: "Electrical Safety Compliance Certificate (Form 4)", note: "Bright Spark Electrical certificate deposited.", ok: true },
                { gate: "Gate 4", title: "Pre-Handover PCI Walkthrough & Touch-up Register", note: "Laundry paint touch-up open item logged with painter.", ok: true },
                { gate: "Gate 5", title: "Client Variation Notice #04 Digital Sign-Off", note: "Caesarstone island upgrade approval.", ok: variationSigned },
              ].map((g) => (
                <div key={g.gate} className="p-4 rounded-xl border border-[#dfe6ef] bg-[#f9fafc] flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                        g.ok ? "bg-[#eaf5ef] text-[#24754c]" : "bg-[#fff4df] text-[#8b641c]"
                      }`}>
                        {g.ok ? "✓" : "!"}
                      </span>
                      <strong className="text-[#102645] font-semibold">{g.gate}: {g.title}</strong>
                    </div>
                    <p className="text-[11px] text-[#68788e] mt-1 ml-7">{g.note}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    g.ok ? "bg-[#eaf5ef] text-[#24754c]" : "bg-[#fff4df] text-[#8b641c]"
                  }`}>
                    {g.ok ? "Verified" : "Pending Sign-Off"}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-6 mt-6 border-t border-[#dfe6ef] flex items-center justify-between">
              <span className="text-[11px] text-[#68788e]">
                Sealing delivers documents to client Prop ID without exposing internal subcontractor costs.
              </span>
              <button
                onClick={() => setHandoverSealed(true)}
                className={`px-5 py-2.5 rounded-xl text-[12px] font-bold transition-all ${
                  handoverSealed
                    ? "bg-[#24754c] text-white"
                    : "bg-[#071d3b] text-white hover:bg-[#102d59]"
                }`}
              >
                {handoverSealed ? "✓ Handover Delivered" : "Seal & Deliver to Prop ID"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: DOCUMENTS ────────────────────────────────────────── */}
      {activeTab === "documents" && (
        <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#dfe6ef]">
            <div>
              <h2 className="text-lg font-bold text-[#102645]">Handover Document Package</h2>
              <p className="text-[12px] text-[#68788e]">Documents packaged for transfer to client Prop ID vault.</p>
            </div>
            <button
              onClick={() => alert("Upload Handover Document: Select compliance certificate or plan to append.")}
              className="px-3.5 py-1.5 bg-[#071d3b] text-white text-[11px] font-bold rounded-lg"
            >
              + Upload document
            </button>
          </div>

          <div className="divide-y divide-[#dfe6ef] text-[12px]">
            {[
              { title: "Home Plans — Full Architectural Set.pdf", cat: "Plans", status: "Ready" },
              { title: "QBCC Form 16 Structural Engineering Final.pdf", cat: "Statutory", status: "Verified" },
              { title: "QBCC Form 43 Wet Areas Waterproofing Certificate.pdf", cat: "Statutory", status: "Verified" },
              { title: "Electrical Safety Compliance Certificate (Form 4).pdf", cat: "Statutory", status: "Verified" },
              { title: "Appliance Warranties & User Manuals Compendium.pdf", cat: "Warranties", status: "Ready" },
            ].map((d) => (
              <div key={d.title} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg">📄</span>
                  <div>
                    <strong className="block text-[#102645]">{d.title}</strong>
                    <span className="text-[10px] text-[#68788e]">{d.cat} · Scoped for Client</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-[#eaf5ef] text-[#24754c] rounded">
                  {d.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 3: MESSAGES ─────────────────────────────────────────── */}
      {activeTab === "messages" && (
        <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm flex flex-col h-[520px]">
          <h2 className="text-base font-bold text-[#102645] pb-3 border-b border-[#dfe6ef]">
            Client Discussion Channel · Alex
          </h2>

          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            {messages.map((m) => (
              <div key={m.id} className="p-4 rounded-2xl bg-[#f3f6fb] text-[12px] text-[#102645] leading-relaxed max-w-[85%]">
                <div className="font-bold text-[10px] text-[#68788e] mb-1">{m.sender} · {m.time}</div>
                <p>{m.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendReply} className="pt-3 border-t border-[#dfe6ef] flex gap-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Reply to Alex..."
              className="flex-1 p-2.5 border border-[#dfe6ef] rounded-xl text-[12px] text-[#102645] bg-[#fcfbf8] focus:outline-none"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#071d3b] text-white font-bold rounded-xl text-[12px] hover:bg-[#102d59]"
            >
              Reply →
            </button>
          </form>
        </div>
      )}

      {/* ── TAB 4: VARIATIONS ───────────────────────────────────────── */}
      {activeTab === "variations" && (
        <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#dfe6ef]">
            <div>
              <h2 className="text-lg font-bold text-[#102645]">Variation Notices &amp; Change Orders</h2>
              <p className="text-[12px] text-[#68788e]">Track variation approvals tied to QBCC requirements.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-[#dfe6ef] bg-[#f9fafc]">
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#fff4df] text-[#8b641c] uppercase tracking-wider">
                  Notice #04
                </span>
                <h3 className="text-base font-bold text-[#102645] mt-1">
                  Caesarstone 40mm Kitchen Island Upgrade
                </h3>
              </div>
              <strong className="text-base font-bold text-[#102645]">+$1,400 AUD</strong>
            </div>

            <p className="text-[12px] text-[#68788e] mb-4">
              Upgrade from standard 20mm edge to 40mm mitred edge in Caesarstone &apos;Pure White&apos; across kitchen island and butler&apos;s pantry waterfall ends.
            </p>

            <div className="pt-3 border-t border-[#dfe6ef] flex items-center justify-between">
              <span className="text-[11px] text-[#68788e]">Status: {variationSigned ? "Signed & Closed" : "Awaiting Client Sign-Off"}</span>
              <button
                onClick={() => setVariationSigned(true)}
                className={`px-4 py-1.5 rounded-lg text-[11px] font-bold transition-colors ${
                  variationSigned
                    ? "bg-[#eaf5ef] text-[#24754c]"
                    : "bg-[#071d3b] text-white hover:bg-[#102d59]"
                }`}
              >
                {variationSigned ? "✓ Variation Signed" : "Record Approval"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
