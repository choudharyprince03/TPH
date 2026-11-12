"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  INITIAL_PRO_PROJECTS,
  ProProject,
  ProjectDocumentRecord,
} from "@/lib/proProjects";

function ProjectCardBanner({ project }: { project: ProProject }) {
  const badgeTextClass =
    project.statusBadge === "Aftercare" ? "text-[#28715e]" : "text-[#13293d]";

  if (project.bannerType === "photo" && project.imageUrl) {
    return (
      <div className="relative h-[185px] w-full overflow-hidden bg-[#e8e4dc]">
        <img
          src={project.imageUrl}
          alt={project.name}
          className="w-full h-full object-cover object-center"
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
      <div className="relative h-[185px] w-full overflow-hidden bg-gradient-to-br from-[#d3dedb] via-[#dbe2de] to-[#e4e5de] flex items-center justify-center">
        <span
          className={`absolute top-3.5 left-3.5 px-3 py-1 rounded-lg bg-white/95 ${badgeTextClass} text-[11px] font-bold shadow-2xs`}
        >
          {project.statusBadge}
        </span>
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
    <div className="relative h-[185px] w-full overflow-hidden bg-gradient-to-br from-[#e5dccf] via-[#e9e0d3] to-[#ece5db] flex items-center justify-center">
      <span
        className={`absolute top-3.5 left-3.5 px-3 py-1 rounded-lg bg-white/95 ${badgeTextClass} text-[11px] font-bold shadow-2xs`}
      >
        {project.statusBadge}
      </span>
      <svg
        className="w-13 h-13 text-[#9b8465]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 48 48"
      >
        <circle cx="19" cy="24" r="6.5" strokeWidth="2.2" />
        <path strokeLinecap="round" strokeWidth="2.2" d="M19 30.5V39" />
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

export default function ProProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const projectId = params?.id || "oak-residence";

  const [project, setProject] = useState<ProProject>(
    INITIAL_PRO_PROJECTS.find((p) => p.id === projectId) || INITIAL_PRO_PROJECTS[0]
  );
  const [selectedDoc, setSelectedDoc] = useState<ProjectDocumentRecord | null>(null);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  useEffect(() => {
    const baseMatch = INITIAL_PRO_PROJECTS.find((p) => p.id === projectId);
    if (baseMatch) {
      setProject(baseMatch);
      return;
    }
    try {
      const saved = localStorage.getItem("tph_pro_custom_projects");
      if (saved) {
        const parsed: ProProject[] = JSON.parse(saved);
        const found = parsed.find((p) => p.id === projectId);
        if (found) {
          setProject(found);
        }
      }
    } catch {
      // ignore
    }
  }, [projectId]);

  const handleMarkReviewed = (docId: string) => {
    setProject((prev) => ({
      ...prev,
      documents: prev.documents.map((d) =>
        d.id === docId ? { ...d, status: "Reviewed" } : d
      ),
    }));
    if (selectedDoc && selectedDoc.id === docId) {
      setSelectedDoc({ ...selectedDoc, status: "Reviewed" });
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:px-9 lg:py-7 max-w-[1260px] w-full mx-auto font-sans text-[#13293d] flex flex-col min-h-full justify-between space-y-6">
      <div className="space-y-6">

        {/* ── Breadcrumb ──────────────────────────────────────────────── */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] text-[#5c6f7e] flex-wrap">
          <Link href="/" className="hover:text-[#13293d] transition-colors">
            The Property Helpline
          </Link>
          <span className="text-[#94a3b8]">›</span>
          <Link href="/pro" className="hover:text-[#13293d] transition-colors">
            Pro Hub
          </Link>
          <span className="text-[#94a3b8]">›</span>
          <Link href="/pro/properties" className="hover:text-[#13293d] transition-colors">
            Projects
          </Link>
          <span className="text-[#94a3b8]">›</span>
          <span className="font-bold text-[#13293d]">{project.name}</span>
        </nav>

        {/* ── Project Header & Actions ────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-0.5">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-[10.5px] font-bold uppercase tracking-[1.8px] text-[#946e2b]">
                BUILDER PRO HUB · {project.propId}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-md text-[10.5px] font-bold ${
                  project.statusBadge === "Aftercare"
                    ? "bg-[#eaf4ef] text-[#28715e]"
                    : "bg-[#edf1f5] text-[#13293d]"
                }`}
              >
                {project.statusBadge}
              </span>
            </div>
            <h1 className="font-editorial text-[34px] sm:text-[42px] leading-[1.1] font-normal text-[#13293d] tracking-[-0.02em] mt-1.5">
              {project.name}
            </h1>
            <p className="text-[13.5px] text-[#5c6f7e] mt-2">
              {project.fullAddress} · {project.ownerName} ({project.ownerRoleLabel})
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-center flex-wrap">
            <Link
              href="/pro/properties"
              className="px-4 py-2.5 bg-white border border-[#e2e5e5] hover:bg-[#F9F8F5] text-[#13293d] rounded-xl text-[12.5px] font-bold transition-colors shadow-2xs flex items-center gap-2"
            >
              <span>← All projects</span>
            </Link>
            <Link
              href="/pro/digital-key"
              className="px-4.5 py-2.5 bg-[#12263a] hover:bg-[#1c3a54] text-white rounded-xl text-[12.5px] font-bold transition-colors shadow-xs flex items-center gap-2"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              <span>Open handover</span>
            </Link>
          </div>
        </div>

        {/* ── 4-Column Connected Project Metrics Strip ────────────────── */}
        <div className="bg-white border border-[#e5e2dc] rounded-2xl shadow-[0_2px_10px_rgba(19,41,61,0.03)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#eae7e0]">
          <div className="px-5 py-4 flex items-center gap-3.5">
            <span className="font-editorial text-[28px] leading-none text-[#13293d]">
              {project.progressPercent}%
            </span>
            <div className="min-w-0">
              <div className="text-[12px] font-medium text-[#5c6f7e] truncate">
                Stage readiness
              </div>
              <div className="text-[11px] text-[#7b8b97] truncate mt-0.5">
                {project.statusBadge}
              </div>
            </div>
          </div>

          <div className="px-5 py-4 flex items-center gap-3.5">
            <span className="font-editorial text-[28px] leading-none text-[#13293d]">
              {project.metrics.recordsToReview}
            </span>
            <div className="min-w-0">
              <div className="text-[12px] font-medium text-[#5c6f7e] truncate">
                Required record to review
              </div>
              <div className="text-[11px] text-[#7b8b97] truncate mt-0.5">
                {project.metrics.recordsReviewedCount} reviewed records on file
              </div>
            </div>
          </div>

          <div className="px-5 py-4 flex items-center gap-3.5">
            <div className="font-editorial leading-none flex items-baseline flex-shrink-0">
              <span className="text-[28px] text-[#13293d]">
                {project.metrics.itemResponses.split("/")[0]}
              </span>
              <span className="text-[19px] text-[#64727e] ml-0.5">
                /{project.metrics.itemResponses.split("/")[1] || "6"}
              </span>
            </div>
            <div className="min-w-0">
              <div className="text-[12px] font-medium text-[#5c6f7e] truncate">
                Handover item responses
              </div>
              <div className="text-[11px] text-[#7b8b97] truncate mt-0.5">
                {project.metrics.itemResponsesSub}
              </div>
            </div>
          </div>

          <div className="px-5 py-4 flex items-center gap-3.5">
            <span className="font-editorial text-[28px] leading-none text-[#13293d]">
              {project.metrics.openFollowUps}
            </span>
            <div className="min-w-0">
              <div className="text-[12px] font-medium text-[#5c6f7e] truncate">
                Open follow-up items
              </div>
              <div className="text-[11px] text-[#7b8b97] truncate mt-0.5">
                {project.metrics.openFollowUpsSub}
              </div>
            </div>
          </div>
        </div>

        {/* ── Main 2-Column Project Information Grid ──────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

          {/* ── Left Column: Actions, Statutory Records & Specifications ── */}
          <div className="lg:col-span-7 space-y-5">

            {/* Section 1: Needs Me on this Project */}
            <section className="bg-white border border-[#e5e2dc] rounded-2xl p-6 shadow-[0_2px_10px_rgba(19,41,61,0.03)]">
              <div className="flex items-start justify-between gap-3 pb-4">
                <div>
                  <h2 className="text-[18px] font-bold text-[#13293d] tracking-tight">
                    Needs Me
                  </h2>
                  <p className="text-[12.5px] text-[#5c6f7e] mt-0.5">
                    The next useful action for {project.name}, with the evidence beside it.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-lg bg-[#edf1f5] text-[#13293d] text-[11px] font-bold flex-shrink-0 mt-1">
                  {project.name}
                </span>
              </div>

              <div className="divide-y divide-[#eae7e0]">
                {project.actionItems.map((item) => (
                  <div key={item.id} className="py-5 first:pt-2 last:pb-1 flex items-start gap-3.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        item.iconType === "people"
                          ? "bg-[#f2efe9] text-[#5c6460]"
                          : "bg-[#f7f2e7] text-[#8d6b2e]"
                      }`}
                    >
                      {item.iconType === "compare" && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2m8-16h2a2 2 0 012 2v2m-4 12h2a2 2 0 002-2v-2M9 12a3 3 0 106 0 3 3 0 00-6 0z" />
                        </svg>
                      )}
                      {item.iconType === "check" && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {item.iconType === "people" && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-[13.5px] font-bold text-[#13293d]">
                        {item.title}
                      </h3>
                      <p className="text-[12.5px] text-[#5c6f7e] mt-0.5">
                        {item.description}
                      </p>
                      <div className="flex items-center flex-wrap gap-3 mt-3">
                        <span className="text-[11px] text-[#64727e]">{item.meta}</span>
                        {item.ctaLabel === "Compare sources" ? (
                          <button
                            type="button"
                            onClick={() => setCompareModalOpen(true)}
                            className="px-3.5 py-1.5 bg-white hover:bg-[#F9F8F5] border border-[#dce1e5] rounded-lg text-[11.5px] font-bold text-[#13293d] inline-flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                          >
                            <span>{item.ctaLabel}</span>
                            <span className="text-[12px] leading-none">↗</span>
                          </button>
                        ) : (
                          <Link
                            href={item.ctaHref}
                            className="px-3.5 py-1.5 bg-white hover:bg-[#F9F8F5] border border-[#dce1e5] rounded-lg text-[11.5px] font-bold text-[#13293d] inline-flex items-center gap-1.5 shadow-2xs transition-colors"
                          >
                            <span>{item.ctaLabel}</span>
                            <span className="text-[12px] leading-none">↗</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 2: Statutory Documents & Compliance Records */}
            <section className="bg-white border border-[#e5e2dc] rounded-2xl p-6 shadow-[0_2px_10px_rgba(19,41,61,0.03)]">
              <div className="flex items-start justify-between gap-3 pb-4">
                <div>
                  <h2 className="text-[17px] font-bold text-[#13293d] tracking-tight">
                    Document Records &amp; Certificates
                  </h2>
                  <p className="text-[12.5px] text-[#5c6f7e] mt-0.5">
                    Statutory certificates, compliance forms, and plans bound to {project.name}.
                  </p>
                </div>
                <Link
                  href="/pro/documents"
                  className="text-[12px] font-bold text-[#13293d] hover:text-[#946e2b] transition-colors mt-1"
                >
                  Open register ↗
                </Link>
              </div>

              <div className="divide-y divide-[#eae7e0]">
                {project.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="py-3.5 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-[13px] font-bold text-[#13293d]">
                          {doc.title}
                        </h3>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            doc.status === "Ready to check"
                              ? "bg-[#fbf3e4] text-[#946315]"
                              : "bg-[#eaf4ef] text-[#28715e]"
                          }`}
                        >
                          {doc.status}
                        </span>
                      </div>
                      <p className="text-[11.5px] text-[#5c6f7e] mt-0.5">
                        {doc.category} · {doc.issuer} · {doc.date}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedDoc(doc)}
                      className="px-3.5 py-1.5 bg-white hover:bg-[#F9F8F5] border border-[#dce1e5] rounded-lg text-[11.5px] font-bold text-[#13293d] inline-flex items-center gap-1.5 shadow-2xs transition-colors flex-shrink-0 self-start sm:self-center cursor-pointer"
                    >
                      <span>{doc.status === "Ready to check" ? "Check record" : "Inspect"}</span>
                      <span className="text-[11px] leading-none">↗</span>
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3: Project Specifications & Site Approvals */}
            <section className="bg-white border border-[#e5e2dc] rounded-2xl p-6 shadow-[0_2px_10px_rgba(19,41,61,0.03)] space-y-5">
              <div>
                <h2 className="text-[17px] font-bold text-[#13293d] tracking-tight">
                  Project Specifications &amp; Approvals
                </h2>
                <p className="text-[12.5px] text-[#5c6f7e] mt-0.5">
                  Verified selections, structural DNA, and statutory site governance.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#faf9f5] border border-[#eae7e0]">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#64727e]">
                    Cadastral Lot &amp; Plan
                  </div>
                  <div className="font-bold text-[#13293d] mt-1">
                    {project.legalInfo.lotPlan}
                  </div>
                  <div className="text-[11px] text-[#5c6f7e] mt-0.5">
                    {project.legalInfo.councilApproval}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#faf9f5] border border-[#eae7e0]">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#64727e]">
                    Certifier &amp; Supervision
                  </div>
                  <div className="font-bold text-[#13293d] mt-1">
                    {project.legalInfo.certifier}
                  </div>
                  <div className="text-[11px] text-[#5c6f7e] mt-0.5">
                    Supervisor: {project.legalInfo.siteSupervisor}
                  </div>
                </div>
              </div>

              <div className="divide-y divide-[#eae7e0]">
                {project.specifications.map((spec, idx) => (
                  <div key={idx} className="py-3 first:pt-1 last:pb-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#64727e]">
                        {spec.label}
                      </span>
                      <span className="text-[12.5px] font-bold text-[#13293d]">
                        {spec.value}
                      </span>
                    </div>
                    <p className="text-[11.5px] text-[#5c6f7e] mt-0.5">
                      {spec.detail}
                    </p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* ── Right Column: Handover Card, Milestone & Trades ───────── */}
          <div className="lg:col-span-5 space-y-5">

            {/* Card 1: Project Handover & Owner Connection Card */}
            <article className="bg-white border border-[#e5e2dc] rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(19,41,61,0.03)]">
              <ProjectCardBanner project={project} />

              <div className="p-5 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-[15.5px] font-bold text-[#13293d]">
                      {project.handoverHeadline}
                    </h3>
                    <p className="text-[12px] text-[#5c6f7e] mt-0.5">
                      {project.handoverSubline}
                    </p>
                  </div>
                  <svg className="w-5 h-5 text-[#13293d] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>

                {/* Progress Bar & Stages */}
                <div className="space-y-2">
                  <div className="w-full h-1.5 bg-[#e6eaee] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#28715e] rounded-full transition-all duration-500"
                      style={{ width: `${project.progressPercent}%` }}
                    />
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <span
                      className={
                        project.currentStage === "Prepared"
                          ? "text-[#13293d] font-bold"
                          : "text-[#28715e] font-semibold"
                      }
                    >
                      Prepared
                    </span>
                    <span className="text-[#94a3b8]">›</span>
                    <span
                      className={
                        project.currentStage === "Review together"
                          ? "text-[#13293d] font-bold"
                          : project.currentStage === "At home"
                          ? "text-[#28715e] font-semibold"
                          : "text-[#64727e]"
                      }
                    >
                      Review together
                    </span>
                    <span className="text-[#94a3b8]">›</span>
                    <span
                      className={
                        project.currentStage === "At home"
                          ? "text-[#13293d] font-bold"
                          : "text-[#64727e]"
                      }
                    >
                      At home
                    </span>
                  </div>
                </div>

                {/* Owner Row */}
                <div className="pt-1 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-full ${project.ownerAvatarBg} text-[11px] font-bold flex items-center justify-center flex-shrink-0`}
                    >
                      {project.ownerInitials}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[12.5px] font-bold text-[#13293d] leading-tight truncate">
                        {project.ownerName}
                      </div>
                      <div className="text-[11px] text-[#64727e] truncate mt-0.5">
                        {project.ownerConnectionSub}
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/pro/trustlinks/${project.trustlinkId}`}
                    className="px-4 py-2 bg-[#12263a] hover:bg-[#1c3a54] text-white text-[12px] font-bold rounded-xl transition-colors inline-flex items-center gap-1.5 shadow-2xs flex-shrink-0"
                  >
                    <span>Open TrustLink</span>
                    <span className="text-[12px] leading-none">↗</span>
                  </Link>
                </div>
              </div>
            </article>

            {/* Card 2: Next Milestone Schedule */}
            <section className="bg-white border border-[#e5e2dc] rounded-2xl p-6 shadow-[0_2px_10px_rgba(19,41,61,0.03)] space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-[16px] font-bold text-[#13293d] tracking-tight">
                    Next Milestone
                  </h2>
                  <p className="text-[12px] text-[#5c6f7e] mt-0.5">
                    Scheduled review and site coordination.
                  </p>
                </div>
                <Link
                  href="/pro/tasks"
                  className="text-[11.5px] font-bold text-[#13293d] hover:text-[#946e2b] transition-colors"
                >
                  All tasks ↗
                </Link>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#faf9f5] border border-[#eae7e0]">
                <div className="w-11 h-11 rounded-xl border border-[#e5e2dc] bg-white flex flex-col items-center justify-center flex-shrink-0">
                  <span className="font-editorial text-[18px] leading-none text-[#13293d]">
                    {project.nextMilestoneDay}
                  </span>
                  <span className="text-[8.5px] font-bold uppercase tracking-wider text-[#64727e] mt-0.5">
                    {project.nextMilestoneMonth}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-[13px] font-bold text-[#13293d] truncate">
                    {project.nextMilestoneTitle}
                  </h3>
                  <p className="text-[11.5px] text-[#5c6f7e] mt-0.5">
                    {project.nextMilestoneDetail}
                  </p>
                </div>
              </div>
            </section>

            {/* Card 3: Active Trades & Specialists */}
            <section className="bg-white border border-[#e5e2dc] rounded-2xl p-6 shadow-[0_2px_10px_rgba(19,41,61,0.03)] space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-[16px] font-bold text-[#13293d] tracking-tight">
                    Contributing Trades &amp; Specialists
                  </h2>
                  <p className="text-[12px] text-[#5c6f7e] mt-0.5">
                    Subcontractors supplying records for {project.name}.
                  </p>
                </div>
                <Link
                  href="/pro/tradie"
                  className="text-[11.5px] font-bold text-[#13293d] hover:text-[#946e2b] transition-colors"
                >
                  Tradies ↗
                </Link>
              </div>

              <div className="divide-y divide-[#eae7e0]">
                {project.activeTrades.map((trade, idx) => (
                  <div key={idx} className="py-3 first:pt-1 last:pb-1 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[12.5px] font-bold text-[#13293d] truncate">
                        {trade.name}
                      </div>
                      <div className="text-[11.5px] text-[#5c6f7e] truncate mt-0.5">
                        {trade.scope}
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-[#faf9f5] border border-[#e5e2dc] text-[10.5px] font-bold text-[#13293d] flex-shrink-0">
                      {trade.status}
                    </span>
                  </div>
                ))}
              </div>
            </section>

          </div>

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

      {/* ── Document Inspection Modal ───────────────────────────────── */}
      {selectedDoc && (
        <div className="fixed inset-0 z-[300] bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#e5e2dc] text-[#13293d] space-y-5">
            <div className="flex items-start justify-between gap-3 border-b border-[#eae7e0] pb-3.5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#946e2b]">
                  {project.name} · {selectedDoc.category}
                </span>
                <h3 className="text-[17px] font-bold text-[#13293d] mt-0.5">
                  {selectedDoc.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="text-[#64727e] hover:text-[#13293d] p-1.5 rounded-lg hover:bg-[#F9F8F5] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-[#faf9f5] border border-[#e5e2dc] rounded-xl p-4 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#5c6f7e]">Project:</span>
                <strong className="text-[#13293d]">{project.name} ({project.propId})</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5c6f7e]">Property Address:</span>
                <strong className="text-[#13293d]">{project.fullAddress}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5c6f7e]">Supplied By:</span>
                <strong className="text-[#13293d]">{selectedDoc.issuer}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5c6f7e]">Date Received:</span>
                <span className="text-[#13293d]">{selectedDoc.date}</span>
              </div>
              <div className="flex justify-between items-center pt-1.5 border-t border-[#eae7e0]">
                <span className="text-[#5c6f7e]">Record Status:</span>
                <span
                  className={`text-[10.5px] font-bold px-2.5 py-0.5 rounded-md ${
                    selectedDoc.status === "Ready to check"
                      ? "bg-[#fbf3e4] text-[#946315]"
                      : "bg-[#eaf4ef] text-[#28715e]"
                  }`}
                >
                  {selectedDoc.status}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#eae7e0]">
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-2 bg-[#F9F8F5] hover:bg-[#eae7e0] text-[#13293d] rounded-xl text-xs font-bold cursor-pointer"
              >
                Close
              </button>
              {selectedDoc.status === "Ready to check" && (
                <button
                  type="button"
                  onClick={() => handleMarkReviewed(selectedDoc.id)}
                  className="px-4 py-2 bg-[#28715e] hover:bg-[#1e5949] text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  ✓ Confirm &amp; mark reviewed
                </button>
              )}
              <Link
                href="/pro/digital-key"
                className="px-4 py-2 bg-[#12263a] hover:bg-[#1c3a54] text-white rounded-xl text-xs font-bold"
              >
                Open in handover →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── Source Comparison Modal ─────────────────────────────────── */}
      {compareModalOpen && (
        <div className="fixed inset-0 z-[300] bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-[#e5e2dc] text-[#13293d] space-y-5">
            <div className="flex items-start justify-between gap-3 border-b border-[#eae7e0] pb-3.5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#946e2b]">
                  {project.name} · Evidence Check
                </span>
                <h3 className="text-[17px] font-bold text-[#13293d] mt-0.5">
                  Source comparison
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCompareModalOpen(false)}
                className="text-[#64727e] hover:text-[#13293d] p-1.5 rounded-lg hover:bg-[#F9F8F5] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div className="p-4 rounded-xl bg-[#faf9f5] border border-[#e5e2dc] space-y-1.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#28715e]">
                  Approved Selection Schedule
                </div>
                <div className="font-bold text-sm text-[#13293d]">
                  Induction Cooktop IC90 · 90 cm
                </div>
                <p className="text-[#5c6f7e]">
                  Signed by {project.ownerName} · Kitchen Joinery Rev C (900mm cutout).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#fbf3e4]/60 border border-[#f0dec0] space-y-1.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#946315]">
                  Supplier Delivery Docket
                </div>
                <div className="font-bold text-sm text-[#13293d]">
                  Induction Cooktop IC60 · 60 cm
                </div>
                <p className="text-[#5c6f7e]">
                  Logged by Chris Taylor · Docket #DL-48219 received before handover.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#eae7e0]">
              <button
                type="button"
                onClick={() => setCompareModalOpen(false)}
                className="px-4 py-2 bg-[#F9F8F5] hover:bg-[#eae7e0] text-[#13293d] rounded-xl text-xs font-bold cursor-pointer"
              >
                Close
              </button>
              <Link
                href="/pro/tasks"
                className="px-4 py-2 bg-[#12263a] hover:bg-[#1c3a54] text-white rounded-xl text-xs font-bold"
              >
                Log follow-up task →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
