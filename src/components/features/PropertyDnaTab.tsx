"use client";
import React, { useState } from "react";
import Link from "next/link";
import { PropertyData } from "@/lib/properties";

interface PropertyDnaTabProps {
  property: PropertyData;
  onOpenTrustLink?: () => void;
}

type DnaCategory = "legal" | "physical" | "operational";

interface LinkedDocument {
  id: string;
  title: string;
  category: string;
  source: string;
  visibility: string;
  categoryType: DnaCategory;
}

export function PropertyDnaTab({ property, onOpenTrustLink }: PropertyDnaTabProps) {
  const [activeCategory, setActiveCategory] = useState<DnaCategory>("operational");
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // Linked evidence documents per category
  const [linkedDocs, setLinkedDocs] = useState<LinkedDocument[]>([
    {
      id: "doc-1",
      title: "Solar installation certificate",
      category: "Certificates",
      source: "Installer",
      visibility: "Private",
      categoryType: "legal",
    },
    {
      id: "doc-2",
      title: "Appliance care guide",
      category: "Warranties",
      source: "Added by you",
      visibility: "Private",
      categoryType: "operational",
    },
    {
      id: "doc-3",
      title: "Home maintenance checklist",
      category: "Maintenance",
      source: "Added by you",
      visibility: "Private",
      categoryType: "operational",
    },
  ]);

  const activeCategoryDocs = linkedDocs.filter((d) => d.categoryType === activeCategory);

  const handleLinkDoc = (title: string, cat: string) => {
    const newDoc: LinkedDocument = {
      id: `doc-${Date.now()}`,
      title,
      category: cat,
      source: "Added by you",
      visibility: "Private",
      categoryType: activeCategory,
    };
    setLinkedDocs([...linkedDocs, newDoc]);
    setLinkModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-[1060px] mx-auto pb-12 font-sans text-[#102645]">

      {/* ── Page Header Block ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#102645] mb-1.5">
            {activeCategory === "legal" && "Legal DNA"}
            {activeCategory === "physical" && "Physical DNA"}
            {activeCategory === "operational" && "Operational DNA"}
          </h1>
          <p className="text-[13px] text-[#68788e]">
            {activeCategory === "legal" &&
              "Keep title details, ownership records, approvals and property obligations in one place."}
            {activeCategory === "physical" &&
              "Keep plans, layout, structural specs and building materials in one place."}
            {activeCategory === "operational" &&
              "Organise utilities, systems, maintenance, warranties and the jobs that keep your home running."}
          </p>
        </div>

        <span className="text-[11px] text-[#24754c] font-semibold flex items-center gap-1.5 self-start bg-[#eaf5ef] px-3 py-1 rounded-full border border-[#d2e6d9] shadow-2xs">
          <span>🔒</span> Private by default
        </span>
      </div>

      {/* ── Category Switcher Pills ──────────────────────────────────── */}
      <div className="flex gap-2 flex-wrap">
        {[
          { id: "legal", label: "Legal DNA" },
          { id: "physical", label: "Physical DNA" },
          { id: "operational", label: "Operational DNA" },
        ].map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id as DnaCategory)}
            className={`px-4 py-2 rounded-xl text-[12px] font-bold transition-all cursor-pointer ${
              activeCategory === c.id
                ? "bg-[#071d3b] text-white shadow-xs"
                : "bg-white border border-[#dfe6ef] text-[#68788e] hover:bg-[#f3f6fb] hover:text-[#102645]"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* ── Main Two-Column Layout ──────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">

        {/* ═════════════════════════════════════════════════════════════
            LEFT COLUMN (DNA CONTENT)
        ═════════════════════════════════════════════════════════════ */}
        <div className="space-y-6">

          {/* ── 1. LEGAL DNA ────────────────────────────────────────── */}
          {activeCategory === "legal" && (
            <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#dfe6ef]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#24754c] block mb-0.5">
                    RIGHTS, RECORDS &amp; OBLIGATIONS
                  </span>
                  <h3 className="text-base font-bold text-[#102645]">
                    Property records
                  </h3>
                </div>
                <button
                  onClick={() => setEditModalOpen(true)}
                  className="px-3 py-1.5 bg-white border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#102645] rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  Edit details
                </button>
              </div>

              {/* Ownership Verification Pending Banner */}
              <div className="p-3 bg-[#fff8eb] border border-[#fde047] rounded-xl text-[12px] text-[#854d0e] leading-relaxed">
                Ownership verification is pending. Adding legal records does not verify ownership.
              </div>

              {/* Attribute Rows */}
              <div className="divide-y divide-[#f1f5f9] text-[12px]">
                <div className="py-3 flex items-center justify-between">
                  <span className="text-[#68788e]">Title reference</span>
                  <span className="font-mono font-medium text-[#102645]">
                    {property.legalDna.cadastral.includes("Title Ref")
                      ? property.legalDna.cadastral.split("Title Ref")[1].replace(")", "").trim()
                      : "50921844"}
                  </span>
                </div>
                <div className="py-3 flex items-center justify-between">
                  <span className="text-[#68788e]">Lot / plan</span>
                  <span className="font-semibold text-[#102645]">
                    {property.legalDna.cadastral.split("(")[0].trim()}
                  </span>
                </div>
                <div className="py-3 flex items-center justify-between">
                  <span className="text-[#68788e]">Local council</span>
                  <span className="text-[#102645] font-medium">{property.legalDna.council}</span>
                </div>
                <div className="py-3 flex items-center justify-between">
                  <span className="text-[#68788e]">Easements / Covenants</span>
                  <span className="text-[#102645] text-right max-w-[280px]">
                    {property.legalDna.easements}
                  </span>
                </div>
                <div className="py-3 flex items-center justify-between">
                  <span className="text-[#68788e]">Building approval</span>
                  <span className="text-[#102645] text-right max-w-[280px]">
                    {property.legalDna.approval}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ── 2. PHYSICAL DNA ─────────────────────────────────────── */}
          {activeCategory === "physical" && (
            <>
              {/* Card 1: Layout & Size */}
              <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#dfe6ef]">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#24754c] block mb-0.5">
                      HOME ESSENTIALS
                    </span>
                    <h3 className="text-base font-bold text-[#102645]">
                      Layout &amp; size
                    </h3>
                  </div>
                  <button
                    onClick={() => setEditModalOpen(true)}
                    className="px-3 py-1.5 bg-white border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#102645] rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Edit
                  </button>
                </div>

                {/* 6-Grid Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 text-xs">
                  <div>
                    <div className="text-[11px] text-[#68788e] mb-0.5">Property type</div>
                    <div className="text-sm font-bold text-[#102645]">{property.type || "House"}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[#68788e] mb-0.5">Bedrooms</div>
                    <div className="text-sm font-bold text-[#102645]">4</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[#68788e] mb-0.5">Bathrooms</div>
                    <div className="text-sm font-bold text-[#102645]">2</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[#68788e] mb-0.5">Car spaces</div>
                    <div className="text-sm font-bold text-[#102645]">2</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[#68788e] mb-0.5">Land area</div>
                    <div className="text-sm font-bold text-[#102645]">480 m²</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[#68788e] mb-0.5">Year built</div>
                    <div className="text-sm font-bold text-[#102645]">2026</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#dfe6ef] text-[11px] text-[#8a97a7]">
                  Details in this record · Not independently verified
                </div>
              </div>

              {/* Card 2: Construction & Condition */}
              <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#dfe6ef]">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#24754c] block mb-0.5">
                      WHAT YOUR PROPERTY IS MADE OF
                    </span>
                    <h3 className="text-base font-bold text-[#102645]">
                      Construction &amp; condition
                    </h3>
                  </div>
                  <button
                    onClick={() => setEditModalOpen(true)}
                    className="px-3 py-1.5 bg-white border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#102645] rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Edit details
                  </button>
                </div>

                <div className="divide-y divide-[#f1f5f9] text-[12px]">
                  <div className="py-3 flex items-center justify-between">
                    <span className="text-[#68788e]">Structural foundation</span>
                    <span className="text-[#102645] font-medium text-right max-w-[280px]">
                      {property.physicalDna.foundation}
                    </span>
                  </div>
                  <div className="py-3 flex items-center justify-between">
                    <span className="text-[#68788e]">Wall cladding &amp; bricks</span>
                    <span className="text-[#102645] font-medium text-right max-w-[280px]">
                      {property.physicalDna.cladding}
                    </span>
                  </div>
                  <div className="py-3 flex items-center justify-between">
                    <span className="text-[#68788e]">Roofing &amp; insulation</span>
                    <span className="text-[#102645] font-medium text-right max-w-[280px]">
                      {property.physicalDna.roofing}
                    </span>
                  </div>
                  <div className="py-3 flex items-center justify-between">
                    <span className="text-[#68788e]">Waterproofing</span>
                    <span className="text-[#102645] font-medium text-right max-w-[280px]">
                      {property.physicalDna.waterproofing}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── 3. OPERATIONAL DNA ───────────────────────────────────── */}
          {activeCategory === "operational" && (
            <>
              {/* Card 1: Services & Systems */}
              <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#dfe6ef]">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#24754c] block mb-0.5">
                      HOW YOUR PROPERTY RUNS
                    </span>
                    <h3 className="text-base font-bold text-[#102645]">
                      Services &amp; systems
                    </h3>
                  </div>
                  <button
                    onClick={() => setEditModalOpen(true)}
                    className="px-3 py-1.5 bg-white border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#102645] rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Edit details
                  </button>
                </div>

                <div className="divide-y divide-[#f1f5f9] text-[12px]">
                  <div className="py-3 flex items-center justify-between">
                    <span className="text-[#68788e]">Electricity provider / notes</span>
                    <span className="text-[#102645] font-medium">Origin Energy · Smart Meter</span>
                  </div>
                  <div className="py-3 flex items-center justify-between">
                    <span className="text-[#68788e]">Water service / notes</span>
                    <span className="text-[#102645] font-medium">Urban Utilities · Meter #WM-9921</span>
                  </div>
                  <div className="py-3 flex items-center justify-between">
                    <span className="text-[#68788e]">Internet connection / notes</span>
                    <span className="text-[#102645] font-medium">NBN FTTP · 100/20 Mbps</span>
                  </div>
                  <div className="py-3 flex items-center justify-between">
                    <span className="text-[#68788e]">Hot water system</span>
                    <span className="text-[#102645] font-medium text-right max-w-[280px]">
                      {property.operationalDna.hotWater}
                    </span>
                  </div>
                  <div className="py-3 flex items-center justify-between">
                    <span className="text-[#68788e]">Heating / cooling</span>
                    <span className="text-[#102645] font-medium text-right max-w-[280px]">
                      {property.operationalDna.ac}
                    </span>
                  </div>
                  <div className="py-3 flex items-center justify-between">
                    <span className="text-[#68788e]">Pest protection system</span>
                    <span className="text-[#102645] font-medium text-right max-w-[280px]">
                      {property.operationalDna.pest}
                    </span>
                  </div>
                  <div className="py-3 flex items-center justify-between">
                    <span className="text-[#68788e]">Solar energy system</span>
                    <span className="text-[#102645] font-medium text-right max-w-[280px]">
                      {property.operationalDna.solar}
                    </span>
                  </div>
                  <div className="py-3 flex items-center justify-between">
                    <span className="text-[#68788e]">Insurance renewal notes</span>
                    <span className="text-[#102645] font-medium">Suncorp Home &amp; Contents · Renews Nov</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#dfe6ef] text-[11px] text-[#8a97a7] leading-relaxed">
                  Keep service details and useful renewal dates here. Use sample details in this prototype; leave account numbers and passwords out.
                </div>
              </div>
            </>
          )}

        </div>

        {/* ═════════════════════════════════════════════════════════════
            RIGHT COLUMN (SUPPORTING EVIDENCE / LINKED DOCUMENTS)
        ═════════════════════════════════════════════════════════════ */}
        <div className="space-y-5">

          {/* Linked Documents Card */}
          <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#dfe6ef]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#24754c] block mb-0.5">
                  SUPPORTING EVIDENCE
                </span>
                <h3 className="text-base font-bold text-[#102645]">
                  Linked documents
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f1f5f9] text-[#475569] border border-[#cbd5e1]">
                {activeCategoryDocs.length}
              </span>
            </div>

            {/* Document list or empty state */}
            {activeCategoryDocs.length === 0 ? (
              <div className="border-2 border-dashed border-[#cbd5e1] bg-[#fcfdfe] rounded-xl p-6 text-center">
                <h4 className="text-sm font-bold text-[#102645] mb-1">
                  No documents linked yet.
                </h4>
                <p className="text-xs text-[#68788e] leading-relaxed">
                  Keep plans, inspection reports or renovation records with {activeCategory === "legal" ? "Legal DNA" : activeCategory === "physical" ? "Physical DNA" : "Operational DNA"}.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {activeCategoryDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3 rounded-xl border border-[#dfe6ef] bg-[#fafbfc] hover:bg-[#f1f5f9] transition-colors flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="text-[12.5px] font-semibold text-[#102645] truncate">
                        {doc.title}
                      </div>
                      <div className="text-[10.5px] text-[#68788e] truncate mt-0.5">
                        {doc.category} · {doc.source} · {doc.visibility}
                      </div>
                    </div>
                    <button
                      onClick={() => alert(`Opening ${doc.title} preview.`)}
                      className="px-3 py-1 bg-white border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#102645] text-xs font-semibold rounded-lg transition-colors cursor-pointer flex-shrink-0"
                    >
                      Open
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => setLinkModalOpen(true)}
                className="flex-1 py-2 px-3 bg-white border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#102645] text-xs font-bold rounded-xl transition-colors cursor-pointer text-center"
              >
                Link existing
              </button>
              <button
                onClick={() => alert("Upload a new document to link directly to this DNA category.")}
                className="flex-1 py-2 px-3 bg-[#071d3b] hover:bg-[#15345d] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer text-center flex items-center justify-center gap-1"
              >
                <span>+ Add document</span>
              </button>
            </div>

            <p className="text-[11px] text-[#8a97a7] leading-relaxed pt-1">
              Linking does not share a document. Existing Trust Link permissions stay as you approved them.
            </p>
          </div>

          {/* Need help with a job card (Shown on Operational DNA) */}
          {activeCategory === "operational" && (
            <div className="bg-[#f8fafc] border border-[#dfe6ef] rounded-2xl p-5 shadow-2xs space-y-3">
              <h4 className="text-sm font-bold text-[#102645]">
                Need help with a job?
              </h4>
              <p className="text-xs text-[#68788e] leading-relaxed">
                Choose a professional and review exactly which documents you want to share.
              </p>
              <button
                onClick={onOpenTrustLink}
                className="text-xs font-bold text-[#071d3b] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Find property help</span>
                <span>→</span>
              </button>
            </div>
          )}

          <div className="px-2">
            <button
              onClick={() => alert("Viewing full property audit trail and DNA change history.")}
              className="text-xs text-[#68788e] hover:text-[#102645] font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>View property history</span>
              <span>→</span>
            </button>
          </div>

        </div>

      </div>

      {/* ── Link Existing Document Modal ── */}
      {linkModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#dfe6ef] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#dfe6ef] pb-3">
              <div>
                <h3 className="text-base font-bold text-[#102645]">Link an Existing Document</h3>
                <p className="text-xs text-[#68788e]">Select a document from your property vault.</p>
              </div>
              <button
                onClick={() => setLinkModalOpen(false)}
                className="text-[#64748b] hover:text-[#102645] p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {property.documents.map((doc) => (
                <div
                  key={doc.title}
                  onClick={() => handleLinkDoc(doc.title, doc.cat)}
                  className="p-3 rounded-xl border border-[#dfe6ef] hover:border-[#071d3b] hover:bg-[#f8fafc] cursor-pointer transition-colors flex items-center justify-between"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#102645] truncate">{doc.title}</div>
                    <div className="text-[10px] text-[#68788e]">{doc.cat} · {doc.size}</div>
                  </div>
                  <span className="text-xs font-bold text-[#24754c]">+ Link</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setLinkModalOpen(false)}
                className="px-4 py-2 bg-white border border-[#cbd5e1] text-[#102645] rounded-xl text-xs font-semibold hover:bg-[#f8fafc]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit Details Modal ── */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#dfe6ef] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#dfe6ef] pb-3">
              <div>
                <h3 className="text-base font-bold text-[#102645]">Edit DNA Details</h3>
                <p className="text-xs text-[#68788e]">Update record specifications for {property.street}.</p>
              </div>
              <button
                onClick={() => setEditModalOpen(false)}
                className="text-[#64748b] hover:text-[#102645] p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-[#102645] mb-1">
                  Primary Spec Note
                </label>
                <input
                  type="text"
                  defaultValue="Updated specification details recorded"
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl px-3 py-2 text-xs text-[#102645] focus:outline-none focus:border-[#071d3b]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#102645] mb-1">
                  Verifier / Authority
                </label>
                <input
                  type="text"
                  defaultValue="Hart Homes & Council Certifier"
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl px-3 py-2 text-xs text-[#102645] focus:outline-none focus:border-[#071d3b]"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setEditModalOpen(false)}
                className="px-4 py-2 bg-white border border-[#cbd5e1] text-[#102645] rounded-xl text-xs font-semibold hover:bg-[#f8fafc]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Property DNA details updated.");
                  setEditModalOpen(false);
                }}
                className="px-4 py-2 bg-[#071d3b] text-white rounded-xl text-xs font-bold hover:bg-[#15345d]"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}



    </div>
  );
}
