"use client";
import React, { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProfessionalById, PROFESSIONALS_DATA } from "@/lib/professionals";

export default function ProfessionalProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const pro = getProfessionalById(id) || PROFESSIONALS_DATA[0];

  const [activeTab, setActiveTab] = useState<"about" | "services" | "portfolio" | "reviews">("about");
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <div className="w-full flex-1 flex flex-col bg-[#f4f6f8] text-[#102645] font-sans">
      {/* ── Top Breadcrumbs ────────────────────────────────────────── */}
      <div className="bg-white border-b border-[#dfe6ef] py-3.5 px-6 lg:px-9">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between text-[11px] text-[#68788e]">
          <nav className="flex items-center gap-2">
            <Link href="/" className="hover:underline">Home</Link>
            <span>›</span>
            <Link href="/explore" className="hover:underline">Find help</Link>
            <span>›</span>
            <span className="text-[#102645] font-semibold">{pro.name}</span>
          </nav>

          <Link
            href="/explore"
            className="flex items-center gap-1.5 font-semibold text-[#071d3b] hover:underline"
          >
            <span>← Back to all specialists</span>
          </Link>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 lg:px-9 py-8 w-full flex-1">

        {/* ── Profile Masthead Card with Cover Photo ─────────────────── */}
        <section className="bg-white border border-[#dfe6ef] rounded-2xl overflow-hidden shadow-sm mb-8">
          {/* Cover Photo */}
          <div className="relative w-full h-48 sm:h-64 bg-[#071d3b] overflow-hidden">
            <img
              src={pro.coverUrl}
              alt={`${pro.business} cover`}
              className="w-full h-full object-cover object-center opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute top-4 right-4">
              <span className="bg-white/90 backdrop-blur-sm text-[#071d3b] font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                {pro.category.toUpperCase()} SPECIALIST
              </span>
            </div>
          </div>

          {/* Profile Identity Details */}
          <div className="p-6 sm:p-8 pt-0 relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-14 sm:-mt-16 mb-6">
              {/* Avatar Headshot Photo */}
              <div className="flex items-end gap-5">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-[#071d3b] flex-shrink-0 relative">
                  <img
                    src={pro.avatarUrl}
                    alt={pro.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#102645] leading-tight">
                      {pro.name}
                    </h1>
                    <span className="inline-flex items-center gap-1 bg-[#eaf5ef] text-[#24754c] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#cbe3d3]">
                      <span>✓</span>
                      <span>Verified Australian Specialist</span>
                    </span>
                  </div>
                  <p className="text-[13px] font-semibold text-[#071d3b]">
                    {pro.role} · <span className="text-[#68788e] font-normal">{pro.business}</span>
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <Link
                  href={pro.link}
                  className="px-5 py-2.5 bg-[#071d3b] hover:bg-[#102d59] text-white rounded-xl text-[12px] font-bold transition-all shadow-sm flex items-center gap-1.5"
                >
                  <span>Connect via TrustLink™</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Quick Metadata Bar */}
            <div className="pt-4 border-t border-[#dfe6ef] flex flex-wrap items-center gap-4 sm:gap-6 text-[12px] text-[#68788e]">
              <div className="flex items-center gap-1 text-[#102645] font-semibold">
                <span className="text-amber-500 text-sm">★</span>
                <span>{pro.rating}</span>
                <span className="text-[#68788e] font-normal">({pro.reviewsCount} verified reviews)</span>
              </div>
              <span className="text-[#dfe6ef]">•</span>
              <div className="font-mono text-[#071d3b] font-semibold">
                {pro.licence}
              </div>
              <span className="text-[#dfe6ef]">•</span>
              <div>
                📍 {pro.areas}
              </div>
              <span className="text-[#dfe6ef]">•</span>
              <div>
                ⏳ {pro.experienceYears} Years Experience
              </div>
            </div>
          </div>
        </section>

        {/* ── Sub-Navigation Tabs ───────────────────────────────────── */}
        <nav className="flex items-center gap-5 border-b border-[#dfe6ef] mb-8 overflow-x-auto text-[13px] font-medium">
          {[
            { id: "about", label: "About & Credentials", icon: "👤" },
            { id: "services", label: "Services & Fees", icon: "💼" },
            { id: "portfolio", label: "Project Gallery", icon: "📸", count: `${pro.portfolio.length}` },
            { id: "reviews", label: "Client Reviews", icon: "💬", count: `${pro.reviews.length}` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 relative flex items-center gap-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "text-[#102645] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#24754c]"
                  : "text-[#68788e] hover:text-[#102645]"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.count && (
                <span className="text-[10px] font-bold px-1.5 py-0.2 bg-[#dfe6ef] text-[#102645] rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* ── 2-Column Content Layout ───────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">

          {/* Left Column (8 cols): Tab Content */}
          <div className="lg:col-span-8 space-y-7">

            {/* ── TAB 1: ABOUT & CREDENTIALS ──────────────────────────── */}
            {activeTab === "about" && (
              <div className="space-y-6">
                {/* Bio Card */}
                <section className="bg-white border border-[#dfe6ef] rounded-2xl p-6 sm:p-8 shadow-sm">
                  <div className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#24754c] mb-1">
                    Specialist Background
                  </div>
                  <h2 className="text-xl font-bold text-[#102645] mb-3">
                    About {pro.name}
                  </h2>
                  <p className="text-[13px] text-[#4e6582] leading-relaxed mb-6">
                    {pro.bio}
                  </p>

                  <div className="p-4 rounded-xl bg-[#f4f6f8] border border-[#dfe6ef] text-[12px] text-[#556b83] flex items-center gap-3">
                    <span className="text-xl flex-shrink-0">🛡️</span>
                    <span>
                      <strong>The Property Helpline Standard:</strong> Identity, trade licence currency, and public liability insurance verified by TPH Compliance.
                    </span>
                  </div>
                </section>

                {/* Verification Badges Grid */}
                <section className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm">
                  <h3 className="text-base font-bold text-[#102645] mb-4">
                    Licences, Accreditations &amp; Insurance
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pro.badges.map((b) => (
                      <div
                        key={b.title}
                        className="p-4 rounded-xl border border-[#dfe6ef] bg-[#f9fafc] flex items-start gap-3.5"
                      >
                        <span className="text-2xl flex-shrink-0">{b.icon}</span>
                        <div>
                          <strong className="block text-[13px] text-[#102645]">{b.title}</strong>
                          <span className="text-[11px] text-[#68788e]">{b.subtitle}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Featured Project Snapshot */}
                <section className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-[#dfe6ef] mb-4">
                    <h3 className="text-base font-bold text-[#102645]">Recent Featured Project</h3>
                    <button
                      onClick={() => setActiveTab("portfolio")}
                      className="text-[11px] font-bold text-[#071d3b] hover:underline"
                    >
                      View all {pro.portfolio.length} photos →
                    </button>
                  </div>

                  {pro.portfolio.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="rounded-xl overflow-hidden h-48 bg-slate-100">
                        <img
                          src={pro.portfolio[0].imageUrl}
                          alt={pro.portfolio[0].title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-[#eaf5ef] text-[#24754c] rounded w-fit mb-2">
                          {pro.portfolio[0].tag}
                        </span>
                        <h4 className="text-lg font-bold text-[#102645]">{pro.portfolio[0].title}</h4>
                        <p className="text-[12px] text-[#68788e] mt-1">{pro.portfolio[0].subtitle}</p>
                        <Link
                          href={pro.link}
                          className="mt-4 text-[12px] font-bold text-[#071d3b] hover:underline flex items-center gap-1"
                        >
                          <span>Review full case file in TrustLink</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </section>
              </div>
            )}

            {/* ── TAB 2: SERVICES & FEES ──────────────────────────────── */}
            {activeTab === "services" && (
              <div className="space-y-4">
                <section className="bg-white border border-[#dfe6ef] rounded-2xl p-6 sm:p-8 shadow-sm">
                  <div className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#24754c] mb-1">
                    What We Offer
                  </div>
                  <h2 className="text-xl font-bold text-[#102645] mb-2">
                    Services &amp; Transparent Price Guide
                  </h2>
                  <p className="text-[12px] text-[#68788e] mb-6">
                    Connect through TrustLink to agree upon an exact written scope before accepting work or transferring deposits.
                  </p>

                  <div className="divide-y divide-[#dfe6ef]">
                    {pro.services.map((s) => (
                      <div key={s.title} className="py-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="max-w-md">
                          <h3 className="text-base font-bold text-[#102645] mb-1">{s.title}</h3>
                          <p className="text-[12px] text-[#68788e] leading-relaxed">{s.desc}</p>
                        </div>
                        {s.priceGuide && (
                          <div className="sm:text-right flex-shrink-0">
                            <span className="text-[11px] text-[#68788e] block uppercase font-semibold">Guide</span>
                            <span className="text-[13px] font-bold text-[#24754c]">{s.priceGuide}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* ── TAB 3: PROJECT GALLERY (DUMMY PHOTOS) ───────────────── */}
            {activeTab === "portfolio" && (
              <div className="space-y-6">
                <section className="bg-white border border-[#dfe6ef] rounded-2xl p-6 sm:p-8 shadow-sm">
                  <div className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#24754c] mb-1">
                    Visual Work Portfolio
                  </div>
                  <h2 className="text-xl font-bold text-[#102645] mb-2">
                    Recent Projects &amp; Completed Works
                  </h2>
                  <p className="text-[12px] text-[#68788e] mb-6">
                    Actual photographs and case studies demonstrating build finishes, diagnostics, and compliance records.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {pro.portfolio.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedPhoto(item.imageUrl)}
                        className="group bg-[#f9fafc] border border-[#dfe6ef] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                      >
                        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="bg-black/60 backdrop-blur-sm text-white font-bold text-[9px] px-2 py-0.5 rounded uppercase tracking-wider">
                              {item.tag}
                            </span>
                          </div>
                        </div>

                        <div className="p-4">
                          <h3 className="text-base font-bold text-[#102645] group-hover:text-[#071d3b] transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-[11px] text-[#68788e] mt-1">
                            {item.subtitle}
                          </p>
                          <div className="mt-3 pt-3 border-t border-[#dfe6ef] flex items-center justify-between text-[11px] text-[#071d3b] font-semibold">
                            <span>Inspect full resolution</span>
                            <span>🔍</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* ── TAB 4: CLIENT REVIEWS ───────────────────────────────── */}
            {activeTab === "reviews" && (
              <div className="space-y-6">
                <section className="bg-white border border-[#dfe6ef] rounded-2xl p-6 sm:p-8 shadow-sm">
                  <div className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#24754c] mb-1">
                    Feedback From Verified Homeowners
                  </div>
                  <h2 className="text-xl font-bold text-[#102645] mb-2">
                    Client Reviews &amp; Testimonials
                  </h2>
                  <p className="text-[12px] text-[#68788e] mb-6">
                    All reviews are submitted by property owners who concluded a project or digital handover via TrustLink.
                  </p>

                  <div className="divide-y divide-[#dfe6ef] space-y-4">
                    {pro.reviews.map((r) => (
                      <div key={r.id} className="pt-4 first:pt-0">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <strong className="text-sm text-[#102645] font-bold">{r.author}</strong>
                            <span className="text-[11px] text-[#68788e] ml-2">({r.suburb})</span>
                          </div>
                          <div className="flex items-center gap-1 text-amber-500 text-xs">
                            {"★".repeat(r.rating)}
                            <span className="text-[10px] text-[#8a97a7] ml-1">{r.date}</span>
                          </div>
                        </div>
                        <p className="text-[12px] text-[#4e6582] leading-relaxed italic bg-[#f9fafc] p-4 rounded-xl border border-[#dfe6ef]">
                          &ldquo;{r.comment}&rdquo;
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

          </div>

          {/* Right Column (4 cols): Sticky TrustLink Action Card */}
          <div className="lg:col-span-4">
            <aside className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm sticky top-6 space-y-6">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#24754c] mb-1">
                  Connect Directly
                </div>
                <h3 className="text-xl font-bold text-[#102645] mb-2">
                  Start with TrustLink™
                </h3>
                <p className="text-[12px] text-[#68788e] leading-relaxed">
                  Connect with {pro.name} without exposing personal contact details or giving away unsolicited access.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link
                  href={pro.link}
                  className="w-full py-3 bg-[#071d3b] hover:bg-[#102d59] text-white font-bold text-[12px] rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <span>Open TrustLink Connection</span>
                  <span>→</span>
                </Link>

                <Link
                  href="/properties"
                  className="w-full py-2.5 bg-white border border-[#cbd5e2] hover:bg-[#f3f6fb] text-[#102645] font-semibold text-[12px] rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Attach Prop ID Passport</span>
                  <span>🏠</span>
                </Link>
              </div>

              {/* TrustLink Guarantees */}
              <div className="pt-4 border-t border-[#dfe6ef] space-y-2.5 text-[11px] text-[#68788e]">
                <div className="flex items-start gap-2">
                  <span className="text-[#24754c]">✓</span>
                  <span><strong>Scoped Consent:</strong> Choose exactly which plans or certificates to share.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#24754c]">✓</span>
                  <span><strong>Revocable Anytime:</strong> Pause or stop access with a single click.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#24754c]">✓</span>
                  <span><strong>Zero Third-Party Marketing:</strong> Messages stay strictly between you and {pro.name.split(" ")[0]}.</span>
                </div>
              </div>

              {/* Direct Availability Note */}
              <div className="p-3 bg-[#f3f6fb] rounded-xl text-[11px] text-[#071d3b] border border-[#dfe6ef] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#24754c] animate-pulse" />
                <span>Currently accepting inquiries in {pro.areas.split(",")[0]}.</span>
              </div>
            </aside>
          </div>

        </div>

      </div>

      {/* ── Photo Lightbox Modal ─────────────────────────────────────── */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden bg-black shadow-2xl">
            <img
              src={selectedPhoto}
              alt="Project Full View"
              className="w-full h-full object-contain max-h-[80vh]"
            />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 text-xs font-bold"
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
