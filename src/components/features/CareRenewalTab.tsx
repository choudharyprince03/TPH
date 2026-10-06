"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PropertyData } from "@/lib/properties";

interface CareRenewalTabProps {
  property: PropertyData;
  onOpenTrustLink?: () => void;
}

export interface CareRenewalTask {
  id: string;
  title: string;
  category: "Maintenance" | "Warranty" | "Compliance" | "Insurance" | "General";
  dueDate: string;
  recurrence: "One-off" | "Quarterly" | "Bi-Annual" | "Annual" | "2-Year" | "5-Year";
  priority: "High" | "Medium" | "Low";
  completed: boolean;
  systemLinked?: string;
  notes?: string;
}

interface LinkedDocument {
  id: string;
  title: string;
  category: string;
  source: string;
  visibility: string;
}

type TaskFilter = "all" | "upcoming" | "maintenance" | "renewals" | "completed";

export function CareRenewalTab({ property, onOpenTrustLink }: CareRenewalTabProps) {
  const storageKey = `tph_care_tasks_${property.propId}`;

  // Default tasks tailored to the property's operational systems
  const initialDefaultTasks: CareRenewalTask[] = [
    {
      id: "task-1",
      title: "Termimesh Pest Barrier Annual Inspection",
      category: "Maintenance",
      dueDate: "2027-09-15",
      recurrence: "Annual",
      priority: "Medium",
      completed: false,
      systemLinked: property.operationalDna.pest || "Termimesh Physical Barrier System",
      notes: "Annual inspection required to keep the 10-year timber pest installation warranty valid.",
    },
    {
      id: "task-2",
      title: "Rheem Heat Pump Anode & Pressure Relief Valve Service",
      category: "Warranty",
      dueDate: "2026-11-10",
      recurrence: "2-Year",
      priority: "High",
      completed: false,
      systemLinked: property.operationalDna.hotWater || "Rheem 270L Heat Pump (Valid to Sep 2031)",
      notes: "Check sacrificial anode and PTR valve to protect the cylinder and maintain warranty coverage.",
    },
    {
      id: "task-3",
      title: "Daikin Ducted AC Air Filter Clean & Damper Balancing",
      category: "Maintenance",
      dueDate: "2026-10-28",
      recurrence: "Bi-Annual",
      priority: "Medium",
      completed: false,
      systemLinked: property.operationalDna.ac || "Daikin 14kW Inverter Ducted with AirTouch 5",
      notes: "Clean return air filter media and check AirTouch 5 zone dampers ahead of summer.",
    },
    {
      id: "task-4",
      title: "Suncorp Home & Building Insurance Annual Policy Renewal",
      category: "Insurance",
      dueDate: "2026-11-18",
      recurrence: "Annual",
      priority: "High",
      completed: false,
      systemLinked: "Suncorp Home & Contents · Renews Nov",
      notes: "Review sum insured valuation following final handover sign-off.",
    },
    {
      id: "task-5",
      title: "Interconnected Smoke Alarm Acoustic Test & Battery Sign-off",
      category: "Compliance",
      dueDate: "2026-09-01",
      recurrence: "Annual",
      priority: "Low",
      completed: true,
      systemLinked: "AS 3786-2014 Photoelectric Interconnected Alarms",
      notes: "Statutory Queensland compliance checked and verified for handover documentation.",
    },
  ];

  const [tasks, setTasks] = useState<CareRenewalTask[]>(initialDefaultTasks);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [linkDocModalOpen, setLinkDocModalOpen] = useState(false);

  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState<CareRenewalTask["category"]>("Maintenance");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [newTaskRecurrence, setNewTaskRecurrence] = useState<CareRenewalTask["recurrence"]>("Annual");
  const [newTaskPriority, setNewTaskPriority] = useState<CareRenewalTask["priority"]>("Medium");
  const [newTaskSystem, setNewTaskSystem] = useState("");
  const [newTaskNotes, setNewTaskNotes] = useState("");

  // Linked evidence documents
  const [linkedDocs, setLinkedDocs] = useState<LinkedDocument[]>([
    {
      id: "doc-care-1",
      title: "Appliance care guide",
      category: "Warranties",
      source: "Added by you",
      visibility: "Private",
    },
    {
      id: "doc-care-2",
      title: "Home maintenance checklist",
      category: "Maintenance",
      source: "Added by you",
      visibility: "Private",
    },
    {
      id: "doc-care-3",
      title: "Appliance Care & Warranty Schedule.pdf",
      category: "Warranties",
      source: "Hart Homes",
      visibility: "Private",
    },
  ]);

  // Load from localStorage on client
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setTasks(JSON.parse(saved));
      }
    } catch {
      // Ignore fallback
    }
  }, [storageKey]);

  // Save to localStorage
  const updateTasks = (newTasks: CareRenewalTask[]) => {
    setTasks(newTasks);
    try {
      localStorage.setItem(storageKey, JSON.stringify(newTasks));
    } catch {
      // Ignore
    }
  };

  const handleToggleTask = (id: string) => {
    const updated = tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    updateTasks(updated);
  };

  const handleDeleteTask = (id: string) => {
    const updated = tasks.filter((t) => t.id !== id);
    updateTasks(updated);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const created: CareRenewalTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      category: newTaskCategory,
      dueDate: newTaskDueDate || new Date().toISOString().split("T")[0],
      recurrence: newTaskRecurrence,
      priority: newTaskPriority,
      completed: false,
      systemLinked: newTaskSystem.trim() || undefined,
      notes: newTaskNotes.trim() || undefined,
    };

    updateTasks([created, ...tasks]);
    setAddTaskModalOpen(false);

    // Reset inputs
    setNewTaskTitle("");
    setNewTaskCategory("Maintenance");
    setNewTaskDueDate("");
    setNewTaskRecurrence("Annual");
    setNewTaskPriority("Medium");
    setNewTaskSystem("");
    setNewTaskNotes("");
  };

  const handleLinkExistingDoc = (title: string, cat: string) => {
    const doc: LinkedDocument = {
      id: `doc-${Date.now()}`,
      title,
      category: cat,
      source: "Added by you",
      visibility: "Private",
    };
    setLinkedDocs([...linkedDocs, doc]);
    setLinkDocModalOpen(false);
  };

  // Filtered task counts
  const pendingTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "upcoming") return !t.completed;
    if (filter === "maintenance") return !t.completed && (t.category === "Maintenance" || t.category === "General");
    if (filter === "renewals") return !t.completed && (t.category === "Warranty" || t.category === "Insurance" || t.category === "Compliance");
    return true;
  });

  return (
    <div className="space-y-6 max-w-[1060px] mx-auto pb-12 font-sans text-[#183249]">
      {/* ── Page Header ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#28715e] block mb-1">
            KEEP YOUR HOME RUNNING
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-[#183249] mb-1.5">
            Care &amp; renewal tasks
          </h1>
          <p className="text-[13px] text-[#64727e]">
            Organise routine maintenance, warranty expirations, and scheduled service jobs that keep your home running.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start">
          <span className="text-[11px] text-[#28715e] font-semibold flex items-center gap-1.5 bg-[#eaf4ef] px-3 py-1 rounded-full border border-[#d2e6d9] shadow-2xs">
            <svg className="w-3 h-3 text-[#28715e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Private by default
          </span>
          <button
            onClick={() => setAddTaskModalOpen(true)}
            className="px-4 py-2 bg-[#0F1A2C] hover:bg-[#1c3a54] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span className="text-sm leading-none">+</span>
            <span>Add task</span>
          </button>
        </div>
      </div>

      {/* ── Quick Metrics Bar ──────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-[#e2e5e5] rounded-xl p-3.5 shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-[#64727e] tracking-wider">Pending tasks</div>
          <div className="text-xl font-bold text-[#183249] mt-1">{pendingTasks.length} items</div>
          <div className="text-[11px] text-[#b45309] font-medium mt-0.5">Keep property in warranty</div>
        </div>
        <div className="bg-white border border-[#e2e5e5] rounded-xl p-3.5 shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-[#64727e] tracking-wider">Active warranties</div>
          <div className="text-xl font-bold text-[#28715e] mt-1">2 systems</div>
          <div className="text-[11px] text-[#64727e] mt-0.5">Rheem (2031) · Daikin (2031)</div>
        </div>
        <div className="bg-white border border-[#e2e5e5] rounded-xl p-3.5 shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-[#64727e] tracking-wider">Next scheduled</div>
          <div className="text-xl font-bold text-[#0F1A2C] mt-1">28 Oct 2026</div>
          <div className="text-[11px] text-[#64727e] mt-0.5">Daikin AC Filter Service</div>
        </div>
        <div className="bg-white border border-[#e2e5e5] rounded-xl p-3.5 shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-[#64727e] tracking-wider">Completed logs</div>
          <div className="text-xl font-bold text-[#475569] mt-1">{completedTasks.length} recorded</div>
          <div className="text-[11px] text-[#28715e] font-medium mt-0.5">Statutory certs signed</div>
        </div>
      </div>

      {/* ── Category Filter Dropdown ──────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <label htmlFor="care-category-filter" className="text-xs font-bold text-[#64727e]">
          Category:
        </label>
        <div className="relative inline-block min-w-[240px]">
          <select
            id="care-category-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value as TaskFilter)}
            className="w-full appearance-none bg-white border border-[#e2e5e5] hover:border-[#cbd5e1] text-[#183249] font-bold text-xs rounded-xl px-4 py-2 pr-9 shadow-2xs focus:outline-none focus:border-[#0F1A2C] cursor-pointer transition-colors"
          >
            <option value="all">All tasks ({tasks.length})</option>
            <option value="upcoming">Upcoming ({pendingTasks.length})</option>
            <option value="maintenance">Maintenance &amp; Systems</option>
            <option value="renewals">Warranties &amp; Renewals</option>
            <option value="completed">Completed ({completedTasks.length})</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#64727e]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Main Two-Column Layout ──────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
        {/* ═════════════════════════════════════════════════════════════
            LEFT COLUMN (TASKS LIST & CALLOUT)
        ═════════════════════════════════════════════════════════════ */}
        <div className="space-y-5">
          {/* Main Tasks Card */}
          <div className="bg-white border border-[#e2e5e5] rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#e2e5e5]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#28715e] block mb-0.5">
                  PROPERTY WORKLIST
                </span>
                <h3 className="text-base font-bold text-[#183249]">
                  Scheduled jobs &amp; reminders
                </h3>
              </div>
              <button
                onClick={() => setAddTaskModalOpen(true)}
                className="px-3 py-1.5 bg-white border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#183249] rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>+ Add task</span>
              </button>
            </div>

            {/* Task Items */}
            {filteredTasks.length === 0 ? (
              <div className="py-8 text-center text-[#64727e] text-xs">
                No tasks match this filter. Click <span className="font-bold text-[#0F1A2C] cursor-pointer" onClick={() => setAddTaskModalOpen(true)}>+ Add task</span> to create a new reminder.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTasks.map((t) => {
                  const isDone = t.completed;
                  return (
                    <div
                      key={t.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isDone
                          ? "bg-[#f8fafc] border-[#e2e8f0] opacity-75"
                          : "bg-white border-[#e2e5e5] hover:border-[#cbd5e1] hover:shadow-2xs"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                          <input
                            type="checkbox"
                            checked={isDone}
                            onChange={() => handleToggleTask(t.id)}
                            className="mt-1 w-4 h-4 rounded text-[#0F1A2C] focus:ring-0 cursor-pointer border-[#cbd5e1]"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4
                                className={`text-[13.5px] font-bold text-[#183249] ${
                                  isDone ? "line-through text-[#64748b]" : ""
                                }`}
                              >
                                {t.title}
                              </h4>

                              {/* Priority Badge */}
                              <span
                                className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full border ${
                                  t.priority === "High"
                                    ? "bg-[#fef2f2] text-[#991b1b] border-[#fecaca]"
                                    : t.priority === "Medium"
                                    ? "bg-[#fffbeb] text-[#946315] border-[#fde68a]"
                                    : "bg-[#f1f5f9] text-[#475569] border-[#cbd5e1]"
                                }`}
                              >
                                {t.priority}
                              </span>

                              {/* Category Badge */}
                              <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-[#f0f4f9] text-[#1e3a5f] border border-[#d2ddec]">
                                {t.category}
                              </span>

                              {/* Recurrence Badge */}
                              <span className="inline-flex items-center gap-1 text-[9.5px] font-medium text-[#64727e]">
                                <svg className="w-2.5 h-2.5 text-[#64727e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                {t.recurrence}
                              </span>
                            </div>

                            {/* System linkage */}
                            {t.systemLinked && (
                              <div className="text-[11px] text-[#28715e] font-medium mt-1 flex items-center gap-1">
                                <span className="inline-flex items-center gap-1">
                                  <svg className="w-3 h-3 text-[#28715e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                  Linked to:
                                </span>
                                <span>{t.systemLinked}</span>
                              </div>
                            )}

                            {/* Notes */}
                            {t.notes && (
                              <p className="text-[12px] text-[#64727e] mt-1 leading-relaxed">
                                {t.notes}
                              </p>
                            )}

                            {/* Due date */}
                            <div className="text-[11px] text-[#64727e] mt-2 flex items-center gap-1.5 font-medium">
                              <svg className="w-3.5 h-3.5 text-[#64727e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>
                                {isDone ? "Completed · " : "Due: "}
                                {t.dueDate}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            onClick={() => handleToggleTask(t.id)}
                            className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition-colors cursor-pointer inline-flex items-center gap-1 ${
                              isDone
                                ? "bg-white text-[#64727e] border-[#cbd5e1] hover:bg-[#f1f5f9]"
                                : "bg-[#eaf4ef] text-[#28715e] border-[#c2e2cf] hover:bg-[#d8eedf]"
                            }`}
                          >
                            {isDone ? (
                              "Reopen"
                            ) : (
                              <>
                                <span>Done</span>
                                <svg className="w-3 h-3 text-[#28715e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => handleDeleteTask(t.id)}
                            className="p-1 text-[#94a3b8] hover:text-[#dc2626] rounded-lg transition-colors cursor-pointer"
                            title="Delete task"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Callout Box (from screenshot) ── */}
          <div className="border-2 border-dashed border-[#cbd5e1] bg-[#fcfdfe] rounded-2xl p-6 text-center space-y-2">
            <h4 className="text-sm font-bold text-[#183249]">
              Stay ahead of the next job.
            </h4>
            <p className="text-xs text-[#64727e] max-w-md mx-auto">
              Add a service, maintenance job or renewal date. Keep the task with this property.
            </p>
            <div className="pt-1">
              <button
                onClick={() => setAddTaskModalOpen(true)}
                className="px-4 py-2 bg-[#0F1A2C] hover:bg-[#1c3a54] text-white rounded-xl text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>+ Add task</span>
              </button>
            </div>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════
            RIGHT COLUMN (LINKED DOCUMENTS & HELP)
        ═════════════════════════════════════════════════════════════ */}
        <div className="space-y-5">
          {/* Linked Documents Card */}
          <div className="bg-white border border-[#e2e5e5] rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#e2e5e5]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#28715e] block mb-0.5">
                  SUPPORTING EVIDENCE
                </span>
                <h3 className="text-base font-bold text-[#183249]">
                  Linked documents
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f1f5f9] text-[#475569] border border-[#cbd5e1]">
                {linkedDocs.length}
              </span>
            </div>

            {/* Document list */}
            <div className="space-y-2.5">
              {linkedDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3 rounded-xl border border-[#e2e5e5] bg-[#fafbfc] hover:bg-[#f1f5f9] transition-colors flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="text-[12.5px] font-semibold text-[#183249] truncate">
                      {doc.title}
                    </div>
                    <div className="text-[10.5px] text-[#64727e] truncate mt-0.5">
                      {doc.category} · {doc.source} · {doc.visibility}
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Opening preview for ${doc.title}`)}
                    className="px-3 py-1 bg-white border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#183249] text-xs font-semibold rounded-lg transition-colors cursor-pointer flex-shrink-0"
                  >
                    Open
                  </button>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => setLinkDocModalOpen(true)}
                className="flex-1 py-2 px-3 bg-white border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#183249] text-xs font-bold rounded-xl transition-colors cursor-pointer text-center"
              >
                Link existing
              </button>
              <button
                onClick={() => alert("Upload a new warranty or service certificate to link to Care & Renewal.")}
                className="flex-1 py-2 px-3 bg-[#0F1A2C] hover:bg-[#1c3a54] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer text-center flex items-center justify-center gap-1"
              >
                <span>+ Add document</span>
              </button>
            </div>

            <p className="text-[11px] text-[#8a97a7] leading-relaxed pt-1">
              Linking does not share a document. Existing Trust Link permissions stay as you approved them.
            </p>
          </div>

          {/* Need help with a job card */}
          <div className="bg-[#f8fafc] border border-[#e2e5e5] rounded-2xl p-5 shadow-2xs space-y-3">
            <h4 className="text-sm font-bold text-[#183249]">
              Need help with a job?
            </h4>
            <p className="text-xs text-[#64727e] leading-relaxed">
              Choose a professional and review exactly which documents and maintenance records you want to share.
            </p>
            <button
              onClick={onOpenTrustLink}
              className="text-xs font-bold text-[#0F1A2C] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Find property help</span>
              <span>→</span>
            </button>
          </div>

          {/* History link */}
          <div className="px-2">
            <button
              onClick={() => alert("Viewing complete service and maintenance history log for this property.")}
              className="text-xs text-[#64727e] hover:text-[#183249] font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>View property history</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Add Task Modal ────────────────────────────────────────── */}
      {addTaskModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#e2e5e5] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#e2e5e5] pb-3">
              <div>
                <h3 className="text-base font-bold text-[#183249]">Add Care &amp; Renewal Task</h3>
                <p className="text-xs text-[#64727e]">
                  Schedule routine service, warranty inspection or renewal.
                </p>
              </div>
              <button
                onClick={() => setAddTaskModalOpen(false)}
                className="text-[#64748b] hover:text-[#183249] p-1 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-[#183249] mb-1">
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Annual Termite Barrier Inspection"
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl px-3 py-2 text-xs text-[#183249] focus:outline-none focus:border-[#0F1A2C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#183249] mb-1">
                    Category
                  </label>
                  <select
                    value={newTaskCategory}
                    onChange={(e) => setNewTaskCategory(e.target.value as CareRenewalTask["category"])}
                    className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl px-3 py-2 text-xs text-[#183249] focus:outline-none focus:border-[#0F1A2C]"
                  >
                    <option value="Maintenance">Maintenance</option>
                    <option value="Warranty">Warranty</option>
                    <option value="Compliance">Compliance</option>
                    <option value="Insurance">Insurance</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#183249] mb-1">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newTaskDueDate}
                    onChange={(e) => setNewTaskDueDate(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl px-3 py-2 text-xs text-[#183249] focus:outline-none focus:border-[#0F1A2C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#183249] mb-1">
                    Frequency
                  </label>
                  <select
                    value={newTaskRecurrence}
                    onChange={(e) => setNewTaskRecurrence(e.target.value as CareRenewalTask["recurrence"])}
                    className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl px-3 py-2 text-xs text-[#183249] focus:outline-none focus:border-[#0F1A2C]"
                  >
                    <option value="One-off">One-off</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Bi-Annual">Bi-Annual</option>
                    <option value="Annual">Annual</option>
                    <option value="2-Year">Every 2 Years</option>
                    <option value="5-Year">Every 5 Years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#183249] mb-1">
                    Priority
                  </label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as CareRenewalTask["priority"])}
                    className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl px-3 py-2 text-xs text-[#183249] focus:outline-none focus:border-[#0F1A2C]"
                  >
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#183249] mb-1">
                  Linked System or Appliance (Optional)
                </label>
                <input
                  type="text"
                  value={newTaskSystem}
                  onChange={(e) => setNewTaskSystem(e.target.value)}
                  placeholder="e.g. Daikin Inverter AC / Rheem Heat Pump"
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl px-3 py-2 text-xs text-[#183249] focus:outline-none focus:border-[#0F1A2C]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#183249] mb-1">
                  Notes / Instructions
                </label>
                <textarea
                  rows={2}
                  value={newTaskNotes}
                  onChange={(e) => setNewTaskNotes(e.target.value)}
                  placeholder="Additional details, service trade contacts or warranty notes..."
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl px-3 py-2 text-xs text-[#183249] focus:outline-none focus:border-[#0F1A2C]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddTaskModalOpen(false)}
                  className="px-4 py-2 bg-white border border-[#cbd5e1] text-[#183249] rounded-xl text-xs font-semibold hover:bg-[#f8fafc] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0F1A2C] text-white rounded-xl text-xs font-bold hover:bg-[#1c3a54] cursor-pointer"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Link Existing Document Modal ──────────────────────────── */}
      {linkDocModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#e2e5e5] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#e2e5e5] pb-3">
              <div>
                <h3 className="text-base font-bold text-[#183249]">Link an Existing Document</h3>
                <p className="text-xs text-[#64727e]">Select a document from your property vault.</p>
              </div>
              <button
                onClick={() => setLinkDocModalOpen(false)}
                className="text-[#64748b] hover:text-[#183249] p-1 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {property.documents.map((doc) => (
                <div
                  key={doc.title}
                  onClick={() => handleLinkExistingDoc(doc.title, doc.cat)}
                  className="p-3 rounded-xl border border-[#e2e5e5] hover:border-[#0F1A2C] hover:bg-[#f8fafc] cursor-pointer transition-colors flex items-center justify-between"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#183249] truncate">{doc.title}</div>
                    <div className="text-[10px] text-[#64727e]">{doc.cat} · {doc.size}</div>
                  </div>
                  <span className="text-xs font-bold text-[#28715e]">+ Link</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setLinkDocModalOpen(false)}
                className="px-4 py-2 bg-white border border-[#cbd5e1] text-[#183249] rounded-xl text-xs font-semibold hover:bg-[#f8fafc] cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
