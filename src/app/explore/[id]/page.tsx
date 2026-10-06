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
    <div className="w-full flex-1 flex flex-col bg-[#F9F8F5] text-[#183249] font-sans">
      {/* ── Top Breadcrumbs ────────────────────────────────────────── */}
      <div className="bg-white border-b border-[#e2e5e5] py-3.5 px-6 lg:px-9">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between text-[11px] text-[#64727e]">
          <nav className="flex items-center gap-2">
            <Link href="/" className="hover:underline">Home</Link>
            <span>›</span>
            <Link href="/explore" className="hover:underline">Find help</Link>
            <span>›</span>
            <span className="text-[#183249] font-semibold">{pro.name}</span>
          </nav>

          <Link
            href="/explore"
            className="flex items-center gap-1.5 font-semibold text-[#0F1A2C] hover:underline"
          >
            <span>← Back to all specialists</span>
          </Link>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 lg:px-9 py-8 w-full flex-1">

        {/* ── Profile Masthead Card with Cover Photo ─────────────────── */}
        <section className="bg-white border border-[#e2e5e5] rounded-2xl overflow-hidden shadow-sm mb-8">
          {/* Cover Photo */}
          <div className="relative w-full h-48 sm:h-64 bg-[#0F1A2C] overflow-hidden">
            <img
              src={pro.coverUrl}
              alt={`${pro.business} cover`}
              className="w-full h-full object-cover object-center opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute top-4 right-4">
              <span className="bg-white/90 backdrop-blur-sm text-[#0F1A2C] font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                {pro.category.toUpperCase()} SPECIALIST
              </span>
            </div>
          </div>

          {/* Profile Identity Details */}
          <div className="p-6 sm:p-8 pt-0 relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-14 sm:-mt-16 mb-6">
              {/* Avatar Headshot Photo */}
              <div className="flex items-end gap-5">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-[#0F1A2C] flex-shrink-0 relative">
                  <img
                    src={pro.avatarUrl}
                    alt={pro.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#183249] leading-tight">
                      {pro.name}
                    </h1>
                    <span className="inline-flex items-center gap-1 bg-[#eaf4ef] text-[#28715e] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#cbe3d3]">
                      <svg className="w-3 h-3 text-[#28715e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Verified Australian Specialist</span>
                    </span>
                  </div>
                  <p className="text-[13px] font-semibold text-[#0F1A2C]">
                    {pro.role} · <span className="text-[#64727e] font-normal">{pro.business}</span>
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <Link
                  href={pro.link}
                  className="px-5 py-2.5 bg-[#0F1A2C] hover:bg-[#102d59] text-white rounded-xl text-[12px] font-bold transition-all shadow-sm flex items-center gap-1.5"
                >
                  <span>Connect via TrustLink™</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Quick Metadata Bar */}
            <div className="pt-4 border-t border-[#e2e5e5] flex flex-wrap items-center gap-4 sm:gap-6 text-[12px] text-[#64727e]">
              <div className="flex items-center gap-1 text-[#183249] font-semibold">
                <svg className="w-3.5 h-3.5 text-amber-500 fill-amber-500" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>{pro.rating}</span>
                <span className="text-[#64727e] font-normal">({pro.reviewsCount} verified reviews)</span>
              </div>
              <span className="text-[#e2e5e5]">•</span>
              <div className="font-mono text-[#0F1A2C] font-semibold">
                {pro.licence}
              </div>
              <span className="text-[#e2e5e5]">•</span>
              <div className="inline-flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {pro.areas}
              </div>
              <span className="text-[#e2e5e5]">•</span>
              <div className="inline-flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {pro.experienceYears} Years Experience
              </div>
            </div>
          </div>
        </section>

        {/* ── Sub-Navigation Tabs ───────────────────────────────────── */}
        <nav className="flex items-center gap-5 border-b border-[#e2e5e5] mb-8 overflow-x-auto text-[13px] font-medium">
          {[
            {
              id: "about",
              label: "About & Credentials",
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              ),
            },
            {
              id: "services",
              label: "Services & Fees",
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ),
            },
            {
              id: "portfolio",
              label: "Project Gallery",
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
              count: `${pro.portfolio.length}`,
            },
            {
              id: "reviews",
              label: "Client Reviews",
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              ),
              count: `${pro.reviews.length}`,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 relative flex items-center gap-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "text-[#183249] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#28715e]"
                  : "text-[#64727e] hover:text-[#183249]"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.count && (
                <span className="text-[10px] font-bold px-1.5 py-0.2 bg-[#e2e5e5] text-[#183249] rounded-full">
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
                <section className="bg-white border border-[#e2e5e5] rounded-2xl p-6 sm:p-8 shadow-sm">
                  <div className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#28715e] mb-1">
                    Specialist Background
                  </div>
                  <h2 className="text-xl font-bold text-[#183249] mb-3">
                    About {pro.name}
                  </h2>
                  <p className="text-[13px] text-[#4e6582] leading-relaxed mb-6">
                    {pro.bio}
                  </p>

                  <div className="p-4 rounded-xl bg-[#F9F8F5] border border-[#e2e5e5] text-[12px] text-[#556b83] flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#28715e]/10 text-[#28715e] flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m12 2 8 3v7c0 6-8 10-8 10S4 18 4 12V5Z" />
                      </svg>
                    </div>
                    <span>
                      <strong>The Property Helpline Standard:</strong> Identity, trade licence currency, and public liability insurance verified by TPH Compliance.
                    </span>
                  </div>
                </section>

                {/* Verification Badges Grid */}
                <section className="bg-white border border-[#e2e5e5] rounded-2xl p-6 shadow-sm">
                  <h3 className="text-base font-bold text-[#183249] mb-4">
                    Licences, Accreditations &amp; Insurance
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pro.badges.map((b) => (
                      <div
                        key={b.title}
                        className="p-4 rounded-xl border border-[#e2e5e5] bg-[#f9fafc] flex items-start gap-3.5 hover:border-[#0F1A2C]/30 transition-colors"
                      >
                        <div className="w-9 h-9 rounded-lg bg-white border border-[#e2e5e5] flex items-center justify-center flex-shrink-0 shadow-2xs">
                          {b.title.includes("Certified") || b.title.includes("Licence") || b.title.includes("Licensed") || b.title.includes("Insurance") || b.title.includes("Liability") ? (
                            <svg className="w-5 h-5 text-[#28715e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          ) : b.title.includes("Master") || b.title.includes("Member") || b.title.includes("Society") || b.title.includes("Assoc") ? (
                            <svg className="w-5 h-5 text-[#C59B27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V4.5a2.5 2.5 0 115 0V8h-5zm0 0H7a2.5 2.5 0 110-5 2.5 2.5 0 012.5 2.5V8H12zm-8 4h16v9a1 1 0 01-1 1H5a1 1 0 01-1-1v-9z" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-[#0F1A2C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <strong className="block text-[13px] text-[#183249]">{b.title}</strong>
                          <span className="text-[11px] text-[#64727e]">{b.subtitle}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Featured Project Snapshot */}
                <section className="bg-white border border-[#e2e5e5] rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-[#e2e5e5] mb-4">
                    <h3 className="text-base font-bold text-[#183249]">Recent Featured Project</h3>
                    <button
                      onClick={() => setActiveTab("portfolio")}
                      className="text-[11px] font-bold text-[#0F1A2C] hover:underline"
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
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-[#eaf4ef] text-[#28715e] rounded w-fit mb-2">
                          {pro.portfolio[0].tag}
                        </span>
                        <h4 className="text-lg font-bold text-[#183249]">{pro.portfolio[0].title}</h4>
                        <p className="text-[12px] text-[#64727e] mt-1">{pro.portfolio[0].subtitle}</p>
                        <Link
                          href={pro.link}
                          className="mt-4 text-[12px] font-bold text-[#0F1A2C] hover:underline flex items-center gap-1"
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
                <section className="bg-white border border-[#e2e5e5] rounded-2xl p-6 sm:p-8 shadow-sm">
                  <div className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#28715e] mb-1">
                    What We Offer
                  </div>
                  <h2 className="text-xl font-bold text-[#183249] mb-2">
                    Services &amp; Transparent Price Guide
                  </h2>
                  <p className="text-[12px] text-[#64727e] mb-6">
                    Connect through TrustLink to agree upon an exact written scope before accepting work or transferring deposits.
                  </p>

                  <div className="divide-y divide-[#e2e5e5]">
                    {pro.services.map((s) => (
                      <div key={s.title} className="py-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="max-w-md">
                          <h3 className="text-base font-bold text-[#183249] mb-1">{s.title}</h3>
                          <p className="text-[12px] text-[#64727e] leading-relaxed">{s.desc}</p>
                        </div>
                        {s.priceGuide && (
                          <div className="sm:text-right flex-shrink-0">
                            <span className="text-[11px] text-[#64727e] block uppercase font-semibold">Guide</span>
                            <span className="text-[13px] font-bold text-[#28715e]">{s.priceGuide}</span>
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
                <section className="bg-white border border-[#e2e5e5] rounded-2xl p-6 sm:p-8 shadow-sm">
                  <div className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#28715e] mb-1">
                    Visual Work Portfolio
                  </div>
                  <h2 className="text-xl font-bold text-[#183249] mb-2">
                    Recent Projects &amp; Completed Works
                  </h2>
                  <p className="text-[12px] text-[#64727e] mb-6">
                    Actual photographs and case studies demonstrating build finishes, diagnostics, and compliance records.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {pro.portfolio.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedPhoto(item.imageUrl)}
                        className="group bg-[#f9fafc] border border-[#e2e5e5] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
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
                          <h3 className="text-base font-bold text-[#183249] group-hover:text-[#0F1A2C] transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-[11px] text-[#64727e] mt-1">
                            {item.subtitle}
                          </p>
                          <div className="mt-3 pt-3 border-t border-[#e2e5e5] flex items-center justify-between text-[11px] text-[#0F1A2C] font-semibold">
                            <span>Inspect full resolution</span>
                            <svg className="w-3.5 h-3.5 text-[#0F1A2C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
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
                <section className="bg-white border border-[#e2e5e5] rounded-2xl p-6 sm:p-8 shadow-sm">
                  <div className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#28715e] mb-1">
                    Feedback From Verified Homeowners
                  </div>
                  <h2 className="text-xl font-bold text-[#183249] mb-2">
                    Client Reviews &amp; Testimonials
                  </h2>
                  <p className="text-[12px] text-[#64727e] mb-6">
                    All reviews are submitted by property owners who concluded a project or digital handover via TrustLink.
                  </p>

                  <div className="divide-y divide-[#e2e5e5] space-y-4">
                    {pro.reviews.map((r) => (
                      <div key={r.id} className="pt-4 first:pt-0">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <strong className="text-sm text-[#183249] font-bold">{r.author}</strong>
                            <span className="text-[11px] text-[#64727e] ml-2">({r.suburb})</span>
                          </div>
                          <div className="flex items-center gap-0.5 text-amber-500">
                            {[...Array(r.rating)].map((_, idx) => (
                              <svg key={idx} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="text-[10px] text-[#8a97a7] ml-1">{r.date}</span>
                          </div>
                        </div>
                        <p className="text-[12px] text-[#4e6582] leading-relaxed italic bg-[#f9fafc] p-4 rounded-xl border border-[#e2e5e5]">
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
            <aside className="bg-white border border-[#e2e5e5] rounded-2xl p-6 shadow-sm sticky top-6 space-y-6">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#28715e] mb-1">
                  Connect Directly
                </div>
                <h3 className="text-xl font-bold text-[#183249] mb-2">
                  Start with TrustLink™
                </h3>
                <p className="text-[12px] text-[#64727e] leading-relaxed">
                  Connect with {pro.name} without exposing personal contact details or giving away unsolicited access.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link
                  href={pro.link}
                  className="w-full py-3 bg-[#0F1A2C] hover:bg-[#102d59] text-white font-bold text-[12px] rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <span>Open TrustLink Connection</span>
                  <span>→</span>
                </Link>

                <Link
                  href="/properties"
                  className="w-full py-2.5 bg-white border border-[#cbd5e2] hover:bg-[#F9F8F5] text-[#183249] font-semibold text-[12px] rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Attach Prop ID Passport</span>
                  <svg className="w-3.5 h-3.5 text-[#64727e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </Link>
              </div>

              {/* TrustLink Guarantees */}
              <div className="pt-4 border-t border-[#e2e5e5] space-y-2.5 text-[11px] text-[#64727e]">
                <div className="flex items-start gap-2">
                  <svg className="w-3.5 h-3.5 text-[#28715e] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Scoped Consent:</strong> Choose exactly which plans or certificates to share.</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-3.5 h-3.5 text-[#28715e] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Revocable Anytime:</strong> Pause or stop access with a single click.</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-3.5 h-3.5 text-[#28715e] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Zero Third-Party Marketing:</strong> Messages stay strictly between you and {pro.name.split(" ")[0]}.</span>
                </div>
              </div>

              {/* Direct Availability Note */}
              <div className="p-3 bg-[#F9F8F5] rounded-xl text-[11px] text-[#0F1A2C] border border-[#e2e5e5] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#28715e] animate-pulse" />
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
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full px-3 py-1.5 text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Close</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
