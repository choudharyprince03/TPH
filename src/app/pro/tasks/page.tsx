"use client";
import React, { useState } from "react";
import Link from "next/link";

interface Task {
  id: string;
  title: string;
  category: "Certifier / Council" | "Trade Coordination" | "Handover Milestone" | "Client Action";
  property: string;
  propId: string;
  client: string;
  due: string;
  priority: "High" | "Medium" | "Urgent";
  completed: boolean;
}

const INITIAL_TASKS: Task[] = [
  {
    id: "T-1",
    title: "Review Form 16 Structural Engineering Certification for Handover Vault",
    category: "Certifier / Council",
    property: "18 Banksia Cres, Kenmore",
    propId: "TPH-KEN-018",
    client: "Emily & James Carter",
    due: "Today, 5:00 PM",
    priority: "Urgent",
    completed: false,
  },
  {
    id: "T-2",
    title: "Confirm joint pre-handover walkthrough outcome & record defects list",
    category: "Handover Milestone",
    property: "18 Banksia Cres, Kenmore",
    propId: "TPH-KEN-018",
    client: "Emily & James Carter",
    due: "Tomorrow, 10:00 AM",
    priority: "High",
    completed: false,
  },
  {
    id: "T-3",
    title: "Chase signed Variation #04 (Kitchen Caesarstone upgrade) from owner",
    category: "Client Action",
    property: "18 Banksia Cres, Kenmore",
    propId: "TPH-KEN-018",
    client: "Emily & James Carter",
    due: "21 Sep 2026",
    priority: "Medium",
    completed: false,
  },
  {
    id: "T-4",
    title: "Book Certifier for Frame Stage Inspection (Form 15 verification)",
    category: "Certifier / Council",
    property: "7 Cedar St, Graceville",
    propId: "TPH-GRV-007",
    client: "Sofia Nguyen",
    due: "22 Sep 2026",
    priority: "High",
    completed: false,
  },
  {
    id: "T-5",
    title: "Collect Electrical Safety Compliance Certificate from Bright Spark Electrical",
    category: "Trade Coordination",
    property: "18 Banksia Cres, Kenmore",
    propId: "TPH-KEN-018",
    client: "Emily & James Carter",
    due: "Yesterday",
    priority: "Urgent",
    completed: true,
  },
  {
    id: "T-6",
    title: "Upload soil test & foundation engineering report to Prop ID Vault",
    category: "Trade Coordination",
    property: "7 Cedar St, Graceville",
    propId: "TPH-GRV-007",
    client: "Sofia Nguyen",
    due: "3 days ago",
    priority: "Medium",
    completed: true,
  },
];

export default function ProTasksPage() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [tab, setTab] = useState<"all" | "pending" | "completed">("pending");

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const filtered = tasks.filter((t) => {
    if (tab === "pending") return !t.completed;
    if (tab === "completed") return t.completed;
    return true;
  });

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="text-[10px] font-bold text-verified uppercase tracking-widest mb-1.5">
          Pro Hub · Construction Operations
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-1">
              Tasks, Compliance & Handover Milestones
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Track QBCC certifier bookings, trade compliance certificates, and client variation sign-offs.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-sm hover:opacity-90 transition-all flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #0c2340, #143865)" }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16M4 12h16" />
            </svg>
            + Create Builder Task
          </button>
        </div>
      </div>

      {/* Task Card Container */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden">
        {/* Tab filters */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex gap-2">
          {[
            { id: "pending", label: `Action Required (${tasks.filter((t) => !t.completed).length})` },
            { id: "completed", label: `Completed (${tasks.filter((t) => t.completed).length})` },
            { id: "all", label: `All Tasks (${tasks.length})` },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id as "all" | "pending" | "completed")}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                tab === item.id
                  ? "bg-brand-navy text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Task List */}
        <div className="divide-y divide-slate-100 dark:divide-slate-700">
          {filtered.map((task) => (
            <div
              key={task.id}
              className={`p-4 sm:p-5 flex items-start gap-4 transition-colors ${
                task.completed ? "bg-slate-50/50 dark:bg-slate-900/30 opacity-60" : "hover:bg-slate-50 dark:hover:bg-slate-700/50"
              }`}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-verified focus:ring-verified mt-0.5 cursor-pointer accent-verified"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`font-bold text-sm text-slate-900 dark:text-white ${task.completed ? "line-through text-slate-400" : ""}`}>
                    {task.title}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    {task.category}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    task.priority === "Urgent"
                      ? "bg-red-100 text-red-700"
                      : task.priority === "High"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-blue-100 text-blue-800"
                  }`}>
                    {task.priority}
                  </span>
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-3 flex-wrap mt-1">
                  <span>📍 {task.property}</span>
                  <span>•</span>
                  <span className="font-mono text-brand-navy dark:text-brand-gold font-semibold">{task.propId}</span>
                  <span>•</span>
                  <span>Client: {task.client}</span>
                  <span>•</span>
                  <span className={task.due.includes("Today") || task.due.includes("Urgent") ? "text-red-600 font-bold" : ""}>
                    Due: {task.due}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  href={`/pro/trustlinks/TL-99214-B`}
                  className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  Workspace
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
