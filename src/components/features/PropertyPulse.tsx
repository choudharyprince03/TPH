"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export interface PulseTask {
  id: string;
  title: string;
  property: string;
  propId: string;
  client?: string;
  due: string;
  isToday: boolean;
  category: "Handover" | "Trade" | "Client Action" | "Compliance" | "Defect";
  priority: "High" | "Medium" | "Low";
  completed: boolean;
  actionLabel: string;
  actionHref: string;
  assignee?: string;
  notes?: string;
}

const PRO_DEFAULT_PULSE_TASKS: PulseTask[] = [
  {
    id: "pulse-p1",
    title: "Verify Form 16 Structural Engineering Certification for Handover Vault",
    property: "18 Banksia Crescent, Kenmore",
    propId: "TPH-KEN-018",
    client: "Alex & Emily",
    due: "Today, 5:00 PM",
    isToday: true,
    category: "Handover",
    priority: "High",
    completed: false,
    actionLabel: "Verify Gate →",
    actionHref: "/pro/trustlinks/welcome",
    assignee: "Brendan Kelly (Apex Certifications)",
    notes: "Mandatory gate required before sealing digital handover.",
  },
  {
    id: "pulse-p2",
    title: "Confirm painter appointment for touch-up near laundry door",
    property: "18 Banksia Crescent, Kenmore",
    propId: "TPH-KEN-018",
    client: "Alex & Emily",
    due: "Today, 11:15 AM",
    isToday: true,
    category: "Trade",
    priority: "Medium",
    completed: false,
    actionLabel: "Chat with Painter →",
    actionHref: "/pro/tradie",
    assignee: "Marcus Finch (Prime Finish)",
    notes: "Dulux Natural White touch-up schedule.",
  },
  {
    id: "pulse-p3",
    title: "Record signed client Variation Notice #04 (Caesarstone upgrade)",
    property: "18 Banksia Crescent, Kenmore",
    propId: "TPH-KEN-018",
    client: "Alex & Emily",
    due: "Today, 2:00 PM",
    isToday: true,
    category: "Client Action",
    priority: "High",
    completed: false,
    actionLabel: "Open Variation →",
    actionHref: "/pro/trustlinks/welcome",
    assignee: "Client (Alex & Emily)",
    notes: "+$1,400 AUD variation awaiting digital seal.",
  },
  {
    id: "pulse-p4",
    title: "Schedule frame stage inspection with private building certifier",
    property: "7 Cedar Street, Graceville",
    propId: "TPH-GRV-007",
    client: "Sofia Nguyen",
    due: "Today, 4:30 PM",
    isToday: true,
    category: "Compliance",
    priority: "High",
    completed: false,
    actionLabel: "Book Certifier →",
    actionHref: "/pro/trustlinks/TL-88301-A",
    assignee: "Apex Building Certifications",
    notes: "Frame inspection sign-off required prior to wall linings.",
  },
  {
    id: "pulse-p5",
    title: "Review pre-attached Class H1 soil test & contour survey from lead intake",
    property: "Simpsons Road, Bardon",
    propId: "TPH-BAR-019",
    client: "James & Sarah Davidson",
    due: "Today, End of Day",
    isToday: true,
    category: "Trade",
    priority: "Medium",
    completed: false,
    actionLabel: "Inspect Site Data →",
    actionHref: "/pro/leads/L-101",
    assignee: "Hart Homes Estimator",
    notes: "Inbound customer inquiry with Macquarie pre-approval.",
  },
];

const CONSUMER_DEFAULT_PULSE_TASKS: PulseTask[] = [
  {
    id: "pulse-c1",
    title: "Review and record receipt of Builder Digital Handover Pack",
    property: "18 Banksia Crescent, Kenmore",
    propId: "TPH-KEN-018",
    due: "Today, 5:00 PM",
    isToday: true,
    category: "Handover",
    priority: "High",
    completed: false,
    actionLabel: "Review Handover →",
    actionHref: "/properties/TPH-KEN-018",
    assignee: "Hart Homes (Builder)",
    notes: "Full architectural plans, Form 16, Form 43 & warranty schedules ready.",
  },
  {
    id: "pulse-c2",
    title: "Approve Client Variation Notice #04 (40mm Caesarstone kitchen island)",
    property: "18 Banksia Crescent, Kenmore",
    propId: "TPH-KEN-018",
    due: "Today, 2:00 PM",
    isToday: true,
    category: "Client Action",
    priority: "High",
    completed: false,
    actionLabel: "Approve Notice →",
    actionHref: "/trustlinks/welcome",
    assignee: "Your Action Required",
    notes: "Signed variation adds $1,400 AUD to final handover statement.",
  },
  {
    id: "pulse-c3",
    title: "Inspect laundry door touch-up finish with site supervisor",
    property: "18 Banksia Crescent, Kenmore",
    propId: "TPH-KEN-018",
    due: "Today, 11:15 AM",
    isToday: true,
    category: "Defect",
    priority: "Medium",
    completed: false,
    actionLabel: "Open Chat →",
    actionHref: "/trustlinks/welcome",
    assignee: "Hart Homes Site Supervisor",
    notes: "Trade confirmed for 11:15 AM onsite.",
  },
  {
    id: "pulse-c4",
    title: "Review structural framing inspection certificate from Certifier",
    property: "7 Cedar Street, Graceville",
    propId: "TPH-GRV-007",
    due: "Today, 4:30 PM",
    isToday: true,
    category: "Compliance",
    priority: "Medium",
    completed: false,
    actionLabel: "View Document →",
    actionHref: "/properties/TPH-GRV-007",
    assignee: "Private Certifier (Apex)",
    notes: "Inspection sign-off recorded in your Prop ID record.",
  },
  {
    id: "pulse-c5",
    title: "Archive final QBCC Form 21 certificate & Colorbond roof warranty",
    property: "42 Ridge Road, Brookfield",
    propId: "TPH-BRK-042",
    due: "Pending Review",
    isToday: false,
    category: "Handover",
    priority: "Low",
    completed: false,
    actionLabel: "Open Vault →",
    actionHref: "/properties/TPH-BRK-042",
    assignee: "Prop ID Vault",
    notes: "30-year Colorbond warranty and statutory certificates safely archived.",
  },
];

interface PropertyPulseProps {
  mode: "pro" | "consumer";
  className?: string;
}

export function PropertyPulse({ mode, className = "" }: PropertyPulseProps) {
  const isPro = mode === "pro";
  const defaultTasks = isPro ? PRO_DEFAULT_PULSE_TASKS : CONSUMER_DEFAULT_PULSE_TASKS;

  const [tasks, setTasks] = useState<PulseTask[]>(defaultTasks);
  const [selectedPropertyFilter, setSelectedPropertyFilter] = useState<string>("all");
  const [showCompleted, setShowCompleted] = useState<boolean>(true);

  // Load custom tasks from localStorage in Pro mode
  useEffect(() => {
    if (isPro) {
      try {
        const stored = localStorage.getItem("tph_pro_tasks");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const mappedCustom: PulseTask[] = parsed.map((item: any) => ({
              id: item.id || `task-${Date.now()}`,
              title: item.title,
              property: item.property,
              propId: item.propId || "TPH-KEN-018",
              client: item.client,
              due: item.due,
              isToday: (item.due || "").toLowerCase().includes("today"),
              category: (item.category as any) || "Trade",
              priority: (item.priority as any) || "Medium",
              completed: Boolean(item.completed),
              actionLabel: "Open Task →",
              actionHref: "/pro/tasks",
              assignee: item.assignee,
              notes: item.notes,
            }));

            // Merge with defaults
            const customIds = new Set(mappedCustom.map((m) => m.id));
            const remainingDefaults = PRO_DEFAULT_PULSE_TASKS.filter((t) => !customIds.has(t.id));
            setTasks([...mappedCustom, ...remainingDefaults]);
          }
        }
      } catch {
        // Ignore fallback
      }
    }
  }, [isPro]);

  // Extract unique properties from tasks
  const properties = Array.from(
    new Set(tasks.map((t) => t.property))
  ).map((prop) => {
    const firstMatch = tasks.find((t) => t.property === prop);
    return {
      name: prop,
      propId: firstMatch?.propId || "",
      client: firstMatch?.client,
      pendingCount: tasks.filter((t) => t.property === prop && !t.completed).length,
    };
  });

  const toggleTask = (id: string) => {
    setTasks((prev) => {
      const updated = prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
      if (isPro) {
        try {
          localStorage.setItem("tph_pro_tasks", JSON.stringify(updated));
        } catch {
          // Ignore
        }
      }
      return updated;
    });
  };

  const filteredTasks = tasks.filter((t) => {
    if (selectedPropertyFilter !== "all" && t.property !== selectedPropertyFilter) {
      return false;
    }
    if (!showCompleted && t.completed) {
      return false;
    }
    return true;
  });

  const todayCount = tasks.filter((t) => t.isToday && !t.completed).length;
  const totalCompleted = tasks.filter((t) => t.completed).length;

  return (
    <section
      className={`bg-white border border-[#dfe6ef] rounded-2xl shadow-xs overflow-hidden ${className}`}
      aria-label="Property Pulse"
    >
      {/* ── Top Header with Radar Indicator ──────────────────────────── */}
      <div className="p-5 sm:p-6 border-b border-[#dfe6ef] bg-[#fafbfc] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isPro ? "bg-[#efbd66]" : "bg-[#24754c]"
              }`} />
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                isPro ? "bg-[#efbd66]" : "bg-[#24754c]"
              }`} />
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[1.5px] text-[#24754c]">
              Property Pulse · Live Notifications
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#fff4df] text-[#8b641c]">
              {todayCount} Due Today
            </span>
          </div>
          
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#102645]">
            Property Pulse
          </h2>
          <p className="text-[12px] sm:text-[13px] text-[#68788e] mt-0.5">
            {isPro
              ? "Today's site milestones, pending trade sign-offs & field tasks organized by property."
              : "What needs your attention today across your living property records."}
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
          {isPro ? (
            <Link
              href="/pro/tasks/new"
              className="px-3.5 py-2 bg-[#071d3b] hover:bg-[#102d59] text-white rounded-xl text-xs font-bold transition-colors shadow-2xs inline-flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 text-[#efbd66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
              </svg>
              <span>+ Add Task</span>
            </Link>
          ) : (
            <Link
              href="/trustlinks/welcome"
              className="px-3.5 py-2 bg-[#071d3b] hover:bg-[#102d59] text-white rounded-xl text-xs font-bold transition-colors shadow-2xs inline-flex items-center gap-1.5"
            >
              <span>View Workspace</span>
              <span>→</span>
            </Link>
          )}

          <button
            type="button"
            onClick={() => setShowCompleted(!showCompleted)}
            className="px-3 py-2 bg-white border border-[#cbd5e2] hover:bg-[#f3f6fb] text-[#102645] rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            {showCompleted ? "Hide Done" : "Show All"}
          </button>
        </div>
      </div>

      {/* ── Property Filter Pills ────────────────────────────────────── */}
      <div className="p-3.5 sm:p-4 bg-white border-b border-[#dfe6ef] flex items-center gap-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setSelectedPropertyFilter("all")}
          className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer inline-flex items-center gap-1.5 ${
            selectedPropertyFilter === "all"
              ? "bg-[#071d3b] text-white shadow-2xs"
              : "bg-[#f4f6f8] text-[#5b6e84] hover:bg-[#eaf0f6] hover:text-[#102645]"
          }`}
        >
          <span>All Properties</span>
          <span className={`text-[9.5px] px-1.5 py-0.2 rounded-full font-bold ${
            selectedPropertyFilter === "all" ? "bg-white/20 text-white" : "bg-[#dfe6ef] text-[#071d3b]"
          }`}>
            {tasks.filter((t) => !t.completed).length}
          </span>
        </button>

        {properties.map((prop) => {
          const isSelected = selectedPropertyFilter === prop.name;
          const shortName = prop.name.split(",")[0];
          return (
            <button
              key={prop.name}
              type="button"
              onClick={() => setSelectedPropertyFilter(prop.name)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer inline-flex items-center gap-1.5 border ${
                isSelected
                  ? "border-[#071d3b] bg-[#f0f4f9] text-[#071d3b] font-bold shadow-2xs"
                  : "border-[#dfe6ef] text-[#5b6e84] hover:bg-[#f4f6f8] hover:text-[#102645]"
              }`}
            >
              <span className="font-mono text-[10px] text-[#24754c] font-bold">{prop.propId}</span>
              <span>·</span>
              <span>{shortName}</span>
              {prop.pendingCount > 0 && (
                <span className={`text-[9.5px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected ? "bg-[#071d3b] text-white" : "bg-[#fff4df] text-[#8b641c]"
                }`}>
                  {prop.pendingCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Active Tasks Feed ────────────────────────────────────────── */}
      <div className="divide-y divide-[#dfe6ef] p-2 sm:p-3">
        {filteredTasks.length === 0 ? (
          <div className="py-10 text-center">
            <div className="w-10 h-10 rounded-xl bg-[#eaf5ef] text-[#24754c] flex items-center justify-center mx-auto mb-2.5">
              <svg className="w-5 h-5 text-[#24754c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <strong className="block text-[13px] text-[#102645]">All caught up for this property!</strong>
            <p className="text-[11px] text-[#68788e] mt-0.5">
              Zero pending tasks or overdue notifications.
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`p-3 sm:p-4 rounded-xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                task.completed ? "bg-[#fafbfc] opacity-60" : "hover:bg-[#f8fafc]"
              }`}
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="w-4 h-4 rounded text-[#071d3b] cursor-pointer mt-1 flex-shrink-0"
                  aria-label={`Mark "${task.title}" as complete`}
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <strong
                      className={`text-[13px] font-bold ${
                        task.completed ? "line-through text-[#8a97a7]" : "text-[#102645]"
                      }`}
                    >
                      {task.title}
                    </strong>

                    {/* Today Badge */}
                    {task.isToday && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#fff4df] text-[#8b641c] border border-[#f5e3ba]">
                        Today
                      </span>
                    )}

                    {/* Category Badge */}
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#f0f4f9] text-[#071d3b]">
                      {task.category}
                    </span>

                    {/* High Priority Badge */}
                    {task.priority === "High" && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#fdf2f2] text-[#9b2c2c] border border-[#f8d7d7]">
                        Critical
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] text-[#68788e] flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-[#102645]">{task.property}</span>
                    <span>·</span>
                    <span className="font-mono text-[#24754c] font-semibold text-[10px]">{task.propId}</span>
                    <span>·</span>
                    <span className="font-medium text-[#071d3b]">Due: {task.due}</span>
                    {task.assignee && (
                      <>
                        <span>·</span>
                        <span className="text-[#556b83]">({task.assignee})</span>
                      </>
                    )}
                  </div>

                  {task.notes && (
                    <p className="text-[11px] text-[#64748b] mt-1 italic">
                      {task.notes}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center gap-2 self-start sm:self-auto flex-shrink-0 ml-7 sm:ml-0">
                <Link
                  href={task.actionHref}
                  className="px-3 py-1.5 bg-[#f3f6fb] hover:bg-[#e4ecf7] text-[#071d3b] font-bold rounded-lg text-[11px] transition-colors whitespace-nowrap"
                >
                  {task.actionLabel}
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Footer Summary Strip ─────────────────────────────────────── */}
      <div className="p-3.5 sm:p-4 border-t border-[#dfe6ef] bg-[#fafbfc] text-[11px] text-[#68788e] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#102645]">Pulse Status:</span>
          <span>{todayCount} active items scheduled for today</span>
          <span>·</span>
          <span>{totalCompleted} completed this cycle</span>
        </div>

        <Link
          href={isPro ? "/pro/tasks" : "/trustlinks"}
          className="font-bold text-[#071d3b] hover:text-[#24754c] hover:underline self-start sm:self-auto"
        >
          {isPro ? "Open All Follow-ups & Tasks →" : "View All Property Workspaces →"}
        </Link>
      </div>
    </section>
  );
}
