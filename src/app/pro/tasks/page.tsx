"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export interface Task {
  id: string;
  title: string;
  category: "Handover" | "Trade" | "Client Action" | "Follow-up";
  property: string;
  client: string;
  due: string;
  completed: boolean;
  priority?: "High" | "Medium" | "Low";
  assignee?: string;
  notes?: string;
  isHandoverGate?: boolean;
}

const INITIAL_TASKS: Task[] = [
  {
    id: "T-1",
    title: "Verify Form 16 Structural Engineering Certification for Handover Vault",
    category: "Handover",
    property: "18 Banksia Cres, Kenmore",
    client: "Alex & Emily",
    due: "Today, 5:00 PM",
    completed: false,
    priority: "High",
    isHandoverGate: true,
    assignee: "Brendan Kelly (Apex Certifications)",
  },
  {
    id: "T-2",
    title: "Confirm painter appointment for touch-up paint near laundry door",
    category: "Trade",
    property: "18 Banksia Cres, Kenmore",
    client: "Alex & Emily",
    due: "Thursday, 10:00 AM",
    completed: false,
    priority: "Medium",
    assignee: "Marcus Finch (Prime Finish)",
  },
  {
    id: "T-3",
    title: "Record signed client Variation Notice #04 (Caesarstone upgrade)",
    category: "Client Action",
    property: "18 Banksia Cres, Kenmore",
    client: "Alex & Emily",
    due: "Tomorrow, 2:00 PM",
    completed: false,
    priority: "High",
    assignee: "Client (Alex & Emily)",
  },
  {
    id: "T-4",
    title: "Schedule frame stage inspection with private building certifier",
    category: "Trade",
    property: "7 Cedar Street, Graceville",
    client: "Sofia Nguyen",
    due: "Next Monday",
    completed: false,
    priority: "Medium",
    assignee: "Brendan Kelly (Apex Certifications)",
  },
];

const FILTERS = ["All", "Pending", "Handover", "Trade", "Client Action", "Follow-up", "Completed"];

export default function ProTasksPage() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [filter, setFilter] = useState("All");

  // Load persistent tasks from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("tph_pro_tasks");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const customIds = new Set(parsed.map((p: any) => p.id));
          const baseRemaining = INITIAL_TASKS.filter((t) => !customIds.has(t.id));
          setTasks([...parsed, ...baseRemaining]);
        }
      }
    } catch {
      // Ignore if localStorage unavailable
    }
  }, []);

  const toggleTask = (id: string) => {
    setTasks((prev) => {
      const updated = prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
      try {
        localStorage.setItem("tph_pro_tasks", JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const filtered = tasks.filter((t) => {
    if (filter === "Pending" && t.completed) return false;
    if (filter === "Completed" && !t.completed) return false;
    if (filter !== "All" && filter !== "Pending" && filter !== "Completed" && t.category !== filter) return false;
    return true;
  });

  const pendingCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="p-6 sm:p-9 lg:p-11 max-w-[1240px] w-full font-sans">

      {/* ── Page Header ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <div className="text-[9px] font-bold uppercase tracking-[1.4px] text-[#24754c] mb-1">
            Workflow &amp; Field Coordination · Hart Homes
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.8px] text-[#102645]">
            Follow-ups &amp; Tasks
          </h1>
          <p className="text-[13px] text-[#68788e] mt-1">
            Coordinate site trades, certifier inspections, and client handover milestones.
          </p>
        </div>

        <Link
          href="/pro/tasks/new"
          className="px-4 py-2.5 bg-[#071d3b] hover:bg-[#102d59] text-white rounded-xl text-[12px] font-semibold transition-colors shadow-sm self-start sm:self-auto inline-flex items-center gap-1.5"
        >
          <svg className="w-4 h-4 text-[#efbd66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
          </svg>
          <span>Add New Task</span>
        </Link>
      </div>

      {/* ── Filter Chips & Summary ──────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all whitespace-nowrap cursor-pointer ${
                filter === f
                  ? "bg-[#071d3b] text-white font-semibold shadow-2xs"
                  : "bg-white border border-[#dfe6ef] text-[#68788e] hover:bg-[#f3f6fb]"
              }`}
            >
              {f}
              {f === "Pending" && (
                <span className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  filter === f ? "bg-white/20 text-white" : "bg-[#f0f4f9] text-[#071d3b]"
                }`}>
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>

        <span className="text-[11px] text-[#68788e] font-medium hidden sm:inline">
          Showing {filtered.length} of {tasks.length} tasks
        </span>
      </div>

      {/* ── Task List ───────────────────────────────────────────────── */}
      <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm divide-y divide-[#dfe6ef] text-[12px] mb-10">
        {filtered.length === 0 ? (
          <div className="py-12 text-center">
            <div className="w-12 h-12 rounded-xl bg-[#f4f6f8] text-[#68788e] flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <p className="text-[13px] font-bold text-[#102645]">No tasks match this filter</p>
            <p className="text-[11px] text-[#68788e] mt-0.5 mb-4">
              Clear the filter or schedule a new site milestone.
            </p>
            <Link
              href="/pro/tasks/new"
              className="px-4 py-2 bg-[#071d3b] hover:bg-[#102d59] text-white text-[11px] font-bold rounded-lg transition-colors inline-flex items-center gap-1.5"
            >
              + Add New Task
            </Link>
          </div>
        ) : (
          filtered.map((task) => (
            <div key={task.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
              <div className="flex items-start gap-3.5 min-w-0">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="w-4 h-4 rounded text-[#071d3b] cursor-pointer mt-0.5"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <strong className={`text-[13px] font-semibold ${task.completed ? "line-through text-[#8a97a7]" : "text-[#102645]"}`}>
                      {task.title}
                    </strong>
                    
                    {/* Category Tag */}
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#f0f4f9] text-[#071d3b]">
                      {task.category}
                    </span>

                    {/* Priority Tag if present */}
                    {task.priority === "High" && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">
                        High Priority
                      </span>
                    )}

                    {/* Handover Gate Tag */}
                    {task.isHandoverGate && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#eaf5ef] text-[#24754c] border border-[#c7e3d1]">
                        Handover Gate
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-[#68788e]">
                    {task.property} · Client: <span className="text-[#102645] font-medium">{task.client}</span> · Due: <span className="font-semibold text-[#102645]">{task.due}</span>
                    {task.assignee && (
                      <span> · Assigned: <span className="text-[#556b83] font-medium">{task.assignee}</span></span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto flex-shrink-0 ml-7 sm:ml-0">
                <Link
                  href="/pro/trustlinks/welcome"
                  className="px-3 py-1.5 bg-[#f3f6fb] hover:bg-[#e4ecf7] text-[#071d3b] font-semibold rounded-lg text-[11px] transition-colors"
                >
                  Open TrustLink →
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
