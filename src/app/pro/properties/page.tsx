"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { INITIAL_PRO_PROJECTS, ProProject } from "@/lib/proProjects";

function ProjectCardBanner({ project }: { project: ProProject }) {
  const badgeTextClass =
    project.statusBadge === "Aftercare" ? "text-[#28715e]" : "text-[#13293d]";

  if (project.bannerType === "photo" && project.imageUrl) {
    return (
      <div className="relative h-[178px] w-full overflow-hidden bg-[#e8e4dc]">
        <img
          src={project.imageUrl}
          alt={project.name}
          className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
        />
        <span
          className={`absolute top-3.5 left-3.5 px-3 py-1 rounded-lg bg-white/95 backdrop-blur-xs ${badgeTextClass} text-[11px] font-bold shadow-2xs`}
        >
          {project.statusBadge}
        </span>
      </div>
    );
  }

  if (project.bannerType === "house-illustration") {
    return (
      <div className="relative h-[178px] w-full overflow-hidden bg-gradient-to-br from-[#d3dedb] via-[#dbe2de] to-[#e4e5de] flex items-center justify-center">
        <span
          className={`absolute top-3.5 left-3.5 px-3 py-1 rounded-lg bg-white/95 ${badgeTextClass} text-[11px] font-bold shadow-2xs`}
        >
          {project.statusBadge}
        </span>
        {/* Minimal House Illustration Icon */}
        <svg
          className="w-12 h-12 text-[#6b827b]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 48 48"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.2"
            d="M10 22L24 10l14 12v15a3 3 0 01-3 3H13a3 3 0 01-3-3V22z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.2"
            d="M20 40V28a4 4 0 018 0v12"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="relative h-[178px] w-full overflow-hidden bg-gradient-to-br from-[#e5dccf] via-[#e9e0d3] to-[#ece5db] flex items-center justify-center">
      <span
        className={`absolute top-3.5 left-3.5 px-3 py-1 rounded-lg bg-white/95 ${badgeTextClass} text-[11px] font-bold shadow-2xs`}
      >
        {project.statusBadge}
      </span>
      {/* Minimal Trees / Nature Illustration Icon */}
      <svg
        className="w-13 h-13 text-[#9b8465]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 48 48"
      >
        {/* Left round tree */}
        <circle cx="19" cy="24" r="6.5" strokeWidth="2.2" />
        <path strokeLinecap="round" strokeWidth="2.2" d="M19 30.5V39" />
        {/* Right pine tree */}
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.2"
          d="M29 11l8 11h-4.5l5.5 9H24"
        />
        <path strokeLinecap="round" strokeWidth="2.2" d="M29 31v8" />
      </svg>
    </div>
  );
}

export default function ProPropertiesPage() {
  const [projects, setProjects] = useState<ProProject[]>(INITIAL_PRO_PROJECTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);

  // New project form state
  const [newName, setNewName] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newSuburb, setNewSuburb] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [newStage, setNewStage] = useState<"Handover review" | "Build in progress" | "Aftercare">("Build in progress");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("tph_pro_custom_projects");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const existingIds = new Set(INITIAL_PRO_PROJECTS.map((p) => p.id));
          const customOnly = parsed.filter((p: ProProject) => !existingIds.has(p.id));
          setProjects([...INITIAL_PRO_PROJECTS, ...customOnly]);
        }
      }
    } catch {
      // ignore localStorage errors
    }
  }, []);

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const slug = newName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const ownerClean = newOwner.trim() || "Client Owner";
    const initials = ownerClean
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const newProj: ProProject = {
      id: `${slug}-${Date.now().toString().slice(-3)}`,
      name: newName.trim(),
      subtitle: newAddress.trim()
        ? `${newAddress.trim()}, ${newSuburb.trim() || "Brisbane"}`
        : `Example property · ${newSuburb.trim() || "Brisbane"}`,
      fullAddress: `${newAddress.trim() || "10 Example Street"}, ${newSuburb.trim() || "Brisbane"} QLD`,
      suburb: newSuburb.trim() || "Brisbane",
      propId: `TPH-QLD-${Math.floor(100 + Math.random() * 900)}`,
      trustlinkId: "welcome",
      statusBadge: newStage,
      bannerType: newStage === "Aftercare" ? "trees-illustration" : "house-illustration",
      ownerInitials: initials || "CO",
      ownerAvatarBg: newStage === "Aftercare" ? "bg-[#efe7d8] text-[#13293d]" : "bg-[#edf1f5] text-[#13293d]",
      ownerName: ownerClean,
      ownerRoleLabel: "Owner connected",
      ownerConnectionSub: "Current owner · Prop ID connected",
      nextMilestoneDate: "28 Sep 2026",
      nextMilestoneDay: "28",
      nextMilestoneMonth: "SEP",
      nextMilestoneTitle: `${newName.trim()} · milestone review`,
      nextMilestoneDetail: `10:00 am · ${newSuburb.trim() || "Brisbane"} · Chris + ${ownerClean}`,
      handoverHeadline: "Project record initialized.",
      handoverSubline: "0 item responses · 1 reviewed document record",
      progressPercent: newStage === "Aftercare" ? 100 : newStage === "Handover review" ? 65 : 25,
      currentStage: newStage === "Aftercare" ? "At home" : newStage === "Handover review" ? "Review together" : "Prepared",
      metrics: {
        recordsToReview: 1,
        recordsReviewedCount: 1,
        itemResponses: "0/6",
        itemResponsesSub: "Ready for milestone review",
        openFollowUps: 1,
        openFollowUpsSub: "Initial site & document check",
      },
      legalInfo: {
        lotPlan: "Lot 1 on RP 90124",
        councilApproval: "BCC DA-2026-10492 · Approved",
        certifier: "Brisbane Private Certifiers",
        siteSupervisor: "Chris Taylor (Northline Homes)",
        warrantyStatus: "QBCC Statutory Home Warranty Active",
      },
      actionItems: [
        {
          id: `act-${Date.now()}`,
          title: "Confirm initial statutory certificates and project scope",
          description: "Upload slab, frame, and waterproofing compliance records as stages complete.",
          meta: `Chris Taylor · ${newSuburb.trim() || "Brisbane"}`,
          ctaLabel: "Review record",
          ctaHref: "/pro/documents",
          iconType: "check",
        },
      ],
      specifications: [
        {
          label: "Structural & Envelope",
          value: "Engineered Slab & Architectural Framing",
          detail: "Registered under Northline Homes QBCC workspace.",
        },
      ],
      documents: [
        {
          id: `doc-${Date.now()}`,
          title: "Approved Architectural & Engineering Plans (Issue A)",
          category: "Plans & Schedule",
          issuer: "Northline Design Studio",
          date: "16 Sep 2026",
          status: "Reviewed",
        },
      ],
      activeTrades: [
        { name: "Northline Site Team", scope: "Site establishment & stage coordination", status: "Active" },
      ],
    };

    const updated = [...projects, newProj];
    setProjects(updated);
    try {
      const customOnly = updated.filter(
        (p) => !INITIAL_PRO_PROJECTS.some((init) => init.id === p.id)
      );
      localStorage.setItem("tph_pro_custom_projects", JSON.stringify(customOnly));
    } catch {
      // ignore
    }

    setNewName("");
    setNewAddress("");
    setNewSuburb("");
    setNewOwner("");
    setAddModalOpen(false);
  };

  const filtered = projects.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.ownerName.toLowerCase().includes(q) ||
      p.ownerRoleLabel.toLowerCase().includes(q) ||
      p.statusBadge.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-4 sm:p-6 lg:px-9 lg:py-7 max-w-[1260px] w-full mx-auto font-sans text-[#13293d] flex flex-col min-h-full justify-between space-y-6">
      <div className="space-y-6">

        {/* ── Breadcrumb ──────────────────────────────────────────────── */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] text-[#5c6f7e]">
          <Link href="/" className="hover:text-[#13293d] transition-colors">
            The Property Helpline
          </Link>
          <span className="text-[#94a3b8]">›</span>
          <Link href="/pro" className="hover:text-[#13293d] transition-colors">
            Pro Hub
          </Link>
          <span className="text-[#94a3b8]">›</span>
          <span className="font-bold text-[#13293d]">Projects</span>
        </nav>

        {/* ── Hero Header Row ─────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-0.5">
          <div>
            <div className="text-[10.5px] font-bold uppercase tracking-[1.8px] text-[#946e2b]">
              BUILDER PRO HUB
            </div>
            <h1 className="font-editorial text-[34px] sm:text-[42px] leading-[1.1] font-normal text-[#13293d] tracking-[-0.02em] mt-1.5">
              Every home, in view.
            </h1>
            <p className="text-[13.5px] text-[#5c6f7e] mt-2">
              A clear next step for every property and the people building it.
            </p>
          </div>

          <div className="self-start sm:self-center">
            <button
              type="button"
              onClick={() => setAddModalOpen(true)}
              className="px-4.5 py-2.5 bg-[#12263a] hover:bg-[#1c3a54] text-white rounded-xl text-[12.5px] font-bold transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m-7-7h14" />
              </svg>
              <span>Add project</span>
            </button>
          </div>
        </div>

        {/* ── Search Input & Project Count Toolbar ────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
          <div className="relative w-full sm:w-[240px]">
            <svg
              className="w-4 h-4 text-[#13293d] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find a project or owner"
              className="w-full bg-white border border-[#e5e2dc] rounded-xl pl-10 pr-3.5 py-2.5 text-[12px] text-[#13293d] placeholder-[#8c9aa6] focus:outline-none focus:border-[#13293d] shadow-[0_1px_4px_rgba(19,41,61,0.02)] transition-colors"
            />
          </div>

          <div className="text-[12px] text-[#5c6f7e] font-medium">
            {filtered.length} {filtered.length === 1 ? "demonstration project" : "demonstration projects"}
          </div>
        </div>

        {/* ── 3-Column Project Cards Grid ─────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project) => (
            <article
              key={project.id}
              className="bg-white border border-[#e5e2dc] rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(19,41,61,0.03)] flex flex-col justify-between group"
            >
              <ProjectCardBanner project={project} />

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  {/* Project Title & Subtitle */}
                  <div>
                    <h2 className="font-editorial text-[24px] leading-tight text-[#13293d] font-normal">
                      {project.name}
                    </h2>
                    <p className="text-[12px] text-[#5c6f7e] mt-1">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Owner / Stakeholder Row */}
                  <div className="flex items-center gap-3 pt-0.5">
                    <div
                      className={`w-9 h-9 rounded-full ${project.ownerAvatarBg} text-[11px] font-bold flex items-center justify-center flex-shrink-0`}
                    >
                      {project.ownerInitials}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[12px] font-bold text-[#13293d] leading-snug truncate">
                        {project.ownerName} · {project.ownerRoleLabel}
                      </div>
                      <div className="text-[11.5px] text-[#5c6f7e] truncate mt-0.5">
                        Next milestone · {project.nextMilestoneDate}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Full-Width Open Project CTA */}
                <Link
                  href={`/pro/properties/${project.id}`}
                  className="w-full py-3 px-4 bg-[#12263a] hover:bg-[#1c3a54] text-white text-[12.5px] font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-2xs"
                >
                  <span>Open project</span>
                  <span className="text-[12.5px] leading-none">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* ── Prop ID Connection Info Strip ───────────────────────────── */}
        <div className="bg-[#eef3f7] border border-[#e1e9f0] rounded-xl px-4 py-3.5 flex items-center gap-3 text-[12px] text-[#4a5f70]">
          <svg
            className="w-4 h-4 text-[#4a5f70] flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
          <span>
            Builder projects connect to the current owner&apos;s authorised Prop ID. A prospective buyer can join an approved review; ownership changes follow a separate verified transfer.
          </span>
        </div>
      </div>

      {/* ── Bottom Workspace Footer ─────────────────────────────────── */}
      <footer className="border-t border-[#e6e3dd] pt-4 mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-[#64727e]">
        <div className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-[#64727e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Connected through TPH. Controlled through Prop ID.</span>
        </div>
        <div>Northline Homes · Example workspace</div>
      </footer>

      {/* ── Add Project Modal ───────────────────────────────────────── */}
      {addModalOpen && (
        <div className="fixed inset-0 z-[300] bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#e5e2dc] text-[#13293d] space-y-5">
            <div className="flex items-start justify-between gap-3 border-b border-[#eae7e0] pb-3.5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#946e2b]">
                  Builder Pro Hub
                </span>
                <h3 className="font-editorial text-[22px] text-[#13293d] mt-0.5 font-normal">
                  Add a build project
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setAddModalOpen(false)}
                className="text-[#64727e] hover:text-[#13293d] p-1.5 rounded-lg hover:bg-[#F9F8F5] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProject} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#13293d] mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Banksia House"
                  className="w-full bg-[#faf9f5] border border-[#e5e2dc] rounded-xl px-3.5 py-2.5 text-[#13293d] focus:outline-none focus:border-[#13293d]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#13293d] mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    placeholder="e.g. 24 Banksia Ave"
                    className="w-full bg-[#faf9f5] border border-[#e5e2dc] rounded-xl px-3.5 py-2.5 text-[#13293d] focus:outline-none focus:border-[#13293d]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#13293d] mb-1">
                    Suburb
                  </label>
                  <input
                    type="text"
                    required
                    value={newSuburb}
                    onChange={(e) => setNewSuburb(e.target.value)}
                    placeholder="e.g. Ashgrove"
                    className="w-full bg-[#faf9f5] border border-[#e5e2dc] rounded-xl px-3.5 py-2.5 text-[#13293d] focus:outline-none focus:border-[#13293d]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#13293d] mb-1">
                    Owner / Developer
                  </label>
                  <input
                    type="text"
                    required
                    value={newOwner}
                    onChange={(e) => setNewOwner(e.target.value)}
                    placeholder="e.g. Liam & Chloe Chen"
                    className="w-full bg-[#faf9f5] border border-[#e5e2dc] rounded-xl px-3.5 py-2.5 text-[#13293d] focus:outline-none focus:border-[#13293d]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#13293d] mb-1">
                    Stage
                  </label>
                  <select
                    value={newStage}
                    onChange={(e) =>
                      setNewStage(
                        e.target.value as "Handover review" | "Build in progress" | "Aftercare"
                      )
                    }
                    className="w-full bg-[#faf9f5] border border-[#e5e2dc] rounded-xl px-3.5 py-2.5 text-[#13293d] focus:outline-none focus:border-[#13293d]"
                  >
                    <option value="Build in progress">Build in progress</option>
                    <option value="Handover review">Handover review</option>
                    <option value="Aftercare">Aftercare</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#eae7e0]">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 bg-[#F9F8F5] hover:bg-[#eae7e0] text-[#13293d] rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#12263a] hover:bg-[#1c3a54] text-white rounded-xl font-bold cursor-pointer"
                >
                  Create project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
