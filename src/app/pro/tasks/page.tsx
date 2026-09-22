"use client";
import React, { useState } from "react";
import Link from "next/link";

interface Task {
  id: string;
  title: string;
  category: "Handover" | "Trade" | "Client Action";
  property: string;
  client: string;
  due: string;
  completed: boolean;
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
  },
  {
    id: "T-2",
    title: "Confirm painter appointment for touch-up paint near laundry door",
    category: "Trade",
    property: "18 Banksia Cres, Kenmore",
    client: "Alex & Emily",
    due: "Thursday, 10:00 AM",
    completed: false,
  },
  {
    id: "T-3",
    title: "Record signed client Variation Notice #04 (Caesarstone upgrade)",
    category: "Client Action",
    property: "18 Banksia Cres, Kenmore",
    client: "Alex & Emily",
    due: "Tomorrow, 2:00 PM",
    completed: false,
  },
  {
    id: "T-4",
    title: "Schedule frame stage inspection with private building certifier",
    category: "Trade",
    property: "7 Cedar Street, Graceville",
    client: "Sofia Nguyen",
    due: "Next Monday",
    completed: false,
  },
];

export default function ProTasksPage() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [filter, setFilter] = useState("All");

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const filtered = tasks.filter((t) => {
    if (filter === "Pending" && t.completed) return false;
    if (filter === "Completed" && !t.completed) return false;
    if (filter !== "All" && filter !== "Pending" && filter !== "Completed" && t.category !== filter) return false;
    return true;
  });

  return (
    <div className="p-6 sm:p-9 lg:p-11 max-w-[1240px] w-full">

      {/* ── Page Header ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <div className="text-[9px] font-bold uppercase tracking-[1.4px] text-[#24754c] mb-1">
            Workflow &amp; Field Coordination
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.8px] text-[#102645]">
            Tasks &amp; Milestones
          </h1>
          <p className="text-[13px] text-[#68788e] mt-1">
            Coordinate site trades, certifier inspections, and client handover milestones.
          </p>
        </div>

        <button
          onClick={() => alert("Add Task: Enter milestone title, due date, and assign to a property.")}
          className="px-4 py-2.5 bg-[#071d3b] hover:bg-[#102d59] text-white rounded-xl text-[12px] font-semibold transition-colors shadow-sm self-start sm:self-auto"
        >
          + Add New Task
        </button>
      </div>

      {/* ── Filter Chips ────────────────────────────────────────────── */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {["All", "Pending", "Handover", "Trade", "Client Action", "Completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all whitespace-nowrap ${
              filter === f
                ? "bg-[#071d3b] text-white font-semibold"
                : "bg-white border border-[#dfe6ef] text-[#68788e] hover:bg-[#f3f6fb]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ── Task List ───────────────────────────────────────────────── */}
      <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm divide-y divide-[#dfe6ef] text-[12px] mb-10">
        {filtered.map((task) => (
          <div key={task.id} className="py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="w-4 h-4 rounded text-[#071d3b] cursor-pointer"
              />
              <div className="min-w-0">
                <strong className={`block text-[13px] ${task.completed ? "line-through text-[#8a97a7]" : "text-[#102645]"}`}>
                  {task.title}
                </strong>
                <p className="text-[11px] text-[#68788e] mt-0.5">
                  {task.property} · Client: <span className="text-[#102645] font-medium">{task.client}</span> · Due: {task.due}
                </p>
              </div>
            </div>

            <Link
              href="/pro/trustlinks/welcome"
              className="px-3 py-1.5 bg-[#f3f6fb] hover:bg-[#e4ecf7] text-[#071d3b] font-semibold rounded-lg text-[11px] flex-shrink-0"
            >
              Open TrustLink →
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
}
