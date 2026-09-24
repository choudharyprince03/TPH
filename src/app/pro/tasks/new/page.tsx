"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PROPERTIES = [
  {
    id: "TPH-KEN-018",
    property: "18 Banksia Crescent, Kenmore",
    client: "Alex & Emily",
    stage: "Digital Handover",
  },
  {
    id: "TPH-GRV-007",
    property: "7 Cedar Street, Graceville",
    client: "Sofia Nguyen",
    stage: "Structural Framing",
  },
  {
    id: "TPH-BRK-042",
    property: "42 Ridge Road, Brookfield",
    client: "Noah & Mia Wilson",
    stage: "Aftercare & Warranty",
  },
  {
    id: "TPH-BAR-019",
    property: "Simpsons Road, Bardon",
    client: "James & Sarah Davidson",
    stage: "Pre-Construction / Soil H1",
  },
  {
    id: "TPH-NWS-041",
    property: "Newstead Post-War Lot, Newstead",
    client: "Aisha Khan",
    stage: "Knockdown-Rebuild Planning",
  },
  {
    id: "TPH-FIG-007",
    property: "7 Fig Tree Pocket Road",
    client: "Thomas Murray",
    stage: "Master Wing Extension",
  },
];

const CATEGORIES = [
  {
    id: "Handover",
    label: "Handover",
    desc: "Certificates, compliance sign-offs & digital vault delivery",
    icon: (
      <svg className="w-4 h-4 text-[#24754c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: "Trade",
    label: "Trade",
    desc: "Subcontractor appointments, site inspections & trade work",
    icon: (
      <svg className="w-4 h-4 text-[#efbd66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    id: "Client Action",
    label: "Client Action",
    desc: "Variations, material approvals & homeowner confirmations",
    icon: (
      <svg className="w-4 h-4 text-[#071d3b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: "Follow-up",
    label: "Follow-up",
    desc: "Defect rectification, punch list items & maintenance checks",
    icon: (
      <svg className="w-4 h-4 text-[#8b641c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const TRADES = [
  "Site Supervisor (Hart Homes)",
  "Marcus Finch — Prime Finish Painters",
  "Dave Campbell — Kenmore Electrical",
  "Brendan Kelly — Apex Certifications",
  "Pete Davies — Southside Plumbing",
  "Elena Rostova — Rostova Structural Engineering",
  "Homeowner Direct Action",
];

const PRESET_DATES = [
  "Today, 5:00 PM",
  "Tomorrow, 2:00 PM",
  "Thursday, 10:00 AM",
  "Next Monday, 9:00 AM",
  "Friday, End of Day",
];

export default function NewTaskPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"Handover" | "Trade" | "Client Action" | "Follow-up">("Trade");
  const [selectedPropertyId, setSelectedPropertyId] = useState(PROPERTIES[0].id);
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [dueDate, setDueDate] = useState("Tomorrow, 2:00 PM");
  const [customDue, setCustomDue] = useState("");
  const [assignee, setAssignee] = useState(TRADES[0]);
  const [notes, setNotes] = useState("");
  const [isHandoverGate, setIsHandoverGate] = useState(false);
  const [notifyAssignee, setNotifyAssignee] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectedProp = PROPERTIES.find((p) => p.id === selectedPropertyId) || PROPERTIES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);

    const effectiveDue = customDue.trim() || dueDate;

    const newTask = {
      id: `T-${Date.now()}`,
      title: title.trim(),
      category,
      property: selectedProp.property,
      client: selectedProp.client,
      due: effectiveDue,
      completed: false,
      priority,
      assignee,
      notes: notes.trim(),
      isHandoverGate,
      propId: selectedProp.id,
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage for persistent session support
    try {
      const existingRaw = localStorage.getItem("tph_pro_tasks");
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      localStorage.setItem("tph_pro_tasks", JSON.stringify([newTask, ...existing]));
    } catch {
      // Ignore if localStorage unavailable
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <div className="p-6 sm:p-9 lg:p-11 max-w-[1000px] w-full font-sans">
      
      {/* ── Breadcrumb ──────────────────────────────────────────────── */}
      <nav className="flex items-center gap-2 text-[11px] text-[#68788e] mb-6" aria-label="Breadcrumb">
        <Link href="/pro/tasks" className="hover:underline text-[#68788e]">
          Follow-ups &amp; Tasks
        </Link>
        <span>›</span>
        <span className="text-[#102645] font-semibold">New Task</span>
      </nav>

      {/* ── Page Header ─────────────────────────────────────────────── */}
      <div className="mb-8">
        <div className="text-[9px] font-bold uppercase tracking-[1.4px] text-[#24754c] mb-1">
          Field Coordination · Hart Homes
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.8px] text-[#102645]">
          Create New Task
        </h1>
        <p className="text-[13px] text-[#68788e] mt-1">
          Schedule site trades, assign statutory certifier sign-offs, and track client handover actions.
        </p>
      </div>

      {submitted ? (
        <div className="bg-white border border-[#cbe3d3] rounded-2xl p-8 sm:p-10 shadow-sm text-center max-w-xl mx-auto">
          <div className="w-14 h-14 bg-[#eaf5ef] text-[#24754c] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#c7e3d1]">
            <svg className="w-7 h-7 text-[#24754c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#102645] mb-2">
            Task Created Successfully
          </h2>
          <p className="text-[13px] text-[#68788e] mb-6 leading-relaxed">
            <strong className="text-[#102645] font-semibold">&ldquo;{title}&rdquo;</strong> has been scheduled for{" "}
            <span className="font-semibold text-[#071d3b]">{selectedProp.property}</span>.
            {notifyAssignee && " Notification dispatched to " + assignee + "."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/pro/tasks"
              className="w-full sm:w-auto px-5 py-2.5 bg-[#071d3b] hover:bg-[#102d59] text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
            >
              View in Task List →
            </Link>
            <button
              onClick={() => {
                setTitle("");
                setNotes("");
                setSubmitted(false);
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-white border border-[#cbd5e2] hover:bg-[#f3f6fb] text-[#102645] rounded-xl text-xs font-semibold transition-colors"
            >
              + Create Another Task
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Main Card */}
          <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            
            {/* 1. Title Input */}
            <div>
              <label className="block text-[11px] font-bold text-[#102645] uppercase tracking-wider mb-1.5">
                Task Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Schedule Form 16 Frame Inspection with Private Certifier"
                className="w-full px-4 py-3 border border-[#dfe6ef] rounded-xl text-[13px] text-[#102645] placeholder-[#94a3b8] focus:outline-none focus:border-[#071d3b] transition-colors"
              />
            </div>

            {/* 2. Category Selector */}
            <div>
              <label className="block text-[11px] font-bold text-[#102645] uppercase tracking-wider mb-2">
                Task Category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {CATEGORIES.map((cat) => {
                  const isSelected = category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id as any)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#071d3b] bg-[#f0f4f9] shadow-2xs"
                          : "border-[#dfe6ef] hover:border-[#cbd5e2] bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-lg bg-white border border-[#dfe6ef] flex items-center justify-center flex-shrink-0">
                          {cat.icon}
                        </div>
                        <span className={`text-[12px] font-bold ${isSelected ? "text-[#071d3b]" : "text-[#102645]"}`}>
                          {cat.label}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#68788e] leading-snug">
                        {cat.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Property & Client Selector */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-[#f0f4f8]">
              <div>
                <label className="block text-[11px] font-bold text-[#102645] uppercase tracking-wider mb-1.5">
                  Linked Property &amp; Client <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedPropertyId}
                  onChange={(e) => setSelectedPropertyId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#dfe6ef] rounded-xl text-[12px] text-[#102645] focus:outline-none focus:border-[#071d3b] transition-colors cursor-pointer"
                >
                  {PROPERTIES.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.property} — {p.client} ({p.id})
                    </option>
                  ))}
                </select>
                <span className="text-[10px] text-[#24754c] font-semibold mt-1 block">
                  Active Stage: {selectedProp.stage}
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#102645] uppercase tracking-wider mb-1.5">
                  Assigned Specialist / Trade
                </label>
                <select
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#dfe6ef] rounded-xl text-[12px] text-[#102645] focus:outline-none focus:border-[#071d3b] transition-colors cursor-pointer"
                >
                  {TRADES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <span className="text-[10px] text-[#68788e] mt-1 block">
                  Connected via Tradie Pro-to-Pro network
                </span>
              </div>
            </div>

            {/* 4. Priority & Due Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-[#f0f4f8]">
              
              {/* Priority */}
              <div>
                <label className="block text-[11px] font-bold text-[#102645] uppercase tracking-wider mb-1.5">
                  Priority Level
                </label>
                <div className="flex items-center gap-2">
                  {[
                    { level: "High", color: "border-red-300 text-red-700 bg-red-50", active: "bg-red-600 text-white border-red-600" },
                    { level: "Medium", color: "border-[#dfe6ef] text-[#071d3b] bg-[#f0f4f9]", active: "bg-[#071d3b] text-white border-[#071d3b]" },
                    { level: "Low", color: "border-[#dfe6ef] text-[#68788e] bg-white", active: "bg-[#5b6e84] text-white border-[#5b6e84]" },
                  ].map((p) => {
                    const isSelected = priority === p.level;
                    return (
                      <button
                        key={p.level}
                        type="button"
                        onClick={() => setPriority(p.level as any)}
                        className={`px-3.5 py-1.5 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer flex-1 ${
                          isSelected ? p.active : p.color
                        }`}
                      >
                        {p.level}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Due Date Presets & Custom */}
              <div>
                <label className="block text-[11px] font-bold text-[#102645] uppercase tracking-wider mb-1.5">
                  Due Schedule
                </label>
                <div className="flex items-center gap-1.5 flex-wrap mb-2">
                  {PRESET_DATES.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        setDueDate(preset);
                        setCustomDue("");
                      }}
                      className={`px-2 py-1 rounded text-[10px] font-semibold border transition-colors cursor-pointer ${
                        dueDate === preset && !customDue
                          ? "bg-[#071d3b] text-white border-[#071d3b]"
                          : "bg-white text-[#5b6e84] border-[#dfe6ef] hover:bg-[#f3f6fb]"
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={customDue}
                  onChange={(e) => setCustomDue(e.target.value)}
                  placeholder="Or enter custom time (e.g. Next Friday 11:30 AM)"
                  className="w-full px-3 py-1.5 border border-[#dfe6ef] rounded-lg text-[11px] text-[#102645] placeholder-[#94a3b8] focus:outline-none focus:border-[#071d3b]"
                />
              </div>

            </div>

            {/* 5. Notes / Scope Description */}
            <div className="pt-4 border-t border-[#f0f4f8]">
              <label className="block text-[11px] font-bold text-[#102645] uppercase tracking-wider mb-1.5">
                Task Scope &amp; Field Notes
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Include room location, certificate requirements, or instructions for the trade..."
                className="w-full px-4 py-2.5 border border-[#dfe6ef] rounded-xl text-[12px] text-[#102645] placeholder-[#94a3b8] focus:outline-none focus:border-[#071d3b] transition-colors resize-none"
              />
            </div>

            {/* 6. Handover Gate & Notification Flags */}
            <div className="pt-4 border-t border-[#f0f4f8] space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isHandoverGate}
                  onChange={(e) => setIsHandoverGate(e.target.checked)}
                  className="w-4 h-4 rounded text-[#071d3b] mt-0.5 cursor-pointer"
                />
                <div>
                  <strong className="block text-[12px] text-[#102645] font-semibold">
                    Set as Mandatory Handover Gate Milestone
                  </strong>
                  <span className="text-[11px] text-[#68788e]">
                    Blocks digital handover sealing to Prop ID until marked verified.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyAssignee}
                  onChange={(e) => setNotifyAssignee(e.target.checked)}
                  className="w-4 h-4 rounded text-[#071d3b] mt-0.5 cursor-pointer"
                />
                <div>
                  <strong className="block text-[12px] text-[#102645] font-semibold">
                    Notify Specialist &amp; Client via Scoped TrustLink
                  </strong>
                  <span className="text-[11px] text-[#68788e]">
                    Sends real-time in-app notification without disclosing direct email addresses.
                  </span>
                </div>
              </label>
            </div>

          </div>

          {/* Form Action Buttons */}
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/pro/tasks"
              className="px-5 py-2.5 border border-[#cbd5e2] hover:bg-[#f3f6fb] text-[#102645] rounded-xl text-xs font-semibold transition-colors"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isSubmitting || !title.trim()}
              className="px-6 py-2.5 bg-[#071d3b] hover:bg-[#102d59] disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>Saving Task...</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5 text-[#efbd66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Save &amp; Assign Task</span>
                </>
              )}
            </button>
          </div>

        </form>
      )}

    </div>
  );
}
