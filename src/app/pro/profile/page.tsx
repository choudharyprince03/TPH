"use client";
import React, { useState } from "react";
import Link from "next/link";
import { PROFESSIONALS_DATA } from "@/lib/professionals";

export default function ProProfileManagementPage() {
  const pro = PROFESSIONALS_DATA[0]; // Olivia Hart / Hart Homes
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6 sm:p-9 lg:p-11 max-w-[1240px] w-full font-sans">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="text-[9px] font-bold uppercase tracking-[1.4px] text-[#24754c] mb-1">
            Pro Hub · Public Directory Presence
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.8px] text-[#102645]">
            Public Profile &amp; Portfolio
          </h1>
          <p className="text-[13px] text-[#68788e] mt-1">
            Manage how Hart Homes appears to consumers in the Explore directory.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/explore/welcome"
            target="_blank"
            className="px-4 py-2.5 bg-[#071d3b] hover:bg-[#102d59] text-white rounded-xl text-[12px] font-bold transition-colors shadow-sm flex items-center gap-1.5"
          >
            <span>Preview Consumer View</span>
            <span>↗</span>
          </Link>
        </div>
      </div>

      {saved && (
        <div className="mb-6 p-4 bg-[#eaf5ef] border border-[#cbe3d3] rounded-xl text-[12px] text-[#24754c] font-semibold flex items-center gap-2">
          <svg className="w-4 h-4 text-[#24754c] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
          <span>Profile changes and portfolio photos updated successfully!</span>
        </div>
      )}

      {/* ── Live Profile Preview Banner ─────────────────────────────── */}
      <section className="bg-white border border-[#dfe6ef] rounded-2xl overflow-hidden shadow-sm mb-8">
        <div className="relative h-40 bg-[#071d3b] overflow-hidden">
          <img
            src={pro.coverUrl}
            alt="Cover"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="p-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 mb-4">
            <div className="flex items-end gap-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-md bg-white">
                <img
                  src={pro.avatarUrl}
                  alt={pro.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#102645]">{pro.name}</h2>
                <p className="text-[12px] text-[#68788e]">{pro.role} · {pro.business}</p>
              </div>
            </div>

            <span className="text-[11px] font-bold px-3 py-1 bg-[#eaf5ef] text-[#24754c] rounded-full border border-[#cbe3d3] self-start sm:self-auto inline-flex items-center gap-1.5">
              <svg className="w-3 h-3 text-[#24754c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
              Active on Explore
            </span>
          </div>

          <div className="text-[11px] text-[#68788e] flex items-center gap-4 border-t border-[#dfe6ef] pt-3">
            <span>Licence: <strong className="text-[#102645]">{pro.licence}</strong></span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              Rating:
              <strong className="text-[#102645] inline-flex items-center gap-0.5">
                <svg className="w-3.5 h-3.5 text-amber-500 fill-amber-500 inline" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {pro.rating}
              </strong>
              ({pro.reviewsCount} reviews)
            </span>
            <span>•</span>
            <span>Photos: <strong className="text-[#102645]">{pro.portfolio.length} gallery images</strong></span>
          </div>
        </div>
      </section>

      {/* ── Edit Form ───────────────────────────────────────────────── */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Core Info */}
        <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-[#102645] pb-3 border-b border-[#dfe6ef]">
            Profile Overview
          </h3>

          <div>
            <label className="block text-[11px] font-bold text-[#102645] uppercase tracking-wider mb-1">
              Professional / Business Display Name
            </label>
            <input
              type="text"
              defaultValue={pro.business}
              className="w-full p-2.5 border border-[#dfe6ef] rounded-xl text-[12px] text-[#102645] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#102645] uppercase tracking-wider mb-1">
              Contact Person
            </label>
            <input
              type="text"
              defaultValue={pro.name}
              className="w-full p-2.5 border border-[#dfe6ef] rounded-xl text-[12px] text-[#102645] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#102645] uppercase tracking-wider mb-1">
              QBCC Registration / Licence
            </label>
            <input
              type="text"
              defaultValue={pro.licence}
              className="w-full p-2.5 border border-[#dfe6ef] rounded-xl text-[12px] text-[#102645] font-mono focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#102645] uppercase tracking-wider mb-1">
              About &amp; Experience Bio
            </label>
            <textarea
              rows={4}
              defaultValue={pro.bio}
              className="w-full p-2.5 border border-[#dfe6ef] rounded-xl text-[12px] text-[#102645] leading-relaxed focus:outline-none"
            />
          </div>
        </div>

        {/* Gallery & Photo Management */}
        <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#dfe6ef]">
            <h3 className="text-base font-bold text-[#102645]">
              Project Portfolio Photos
            </h3>
            <button
              type="button"
              onClick={() => alert("Upload Photo: Select an image file to append to your public portfolio.")}
              className="text-[11px] font-bold text-[#071d3b] hover:underline"
            >
              + Upload photo
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {pro.portfolio.map((img) => (
              <div key={img.id} className="relative rounded-xl overflow-hidden border border-[#dfe6ef] group">
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="w-full h-28 object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <span className="text-[10px] text-white font-bold bg-black/60 px-2 py-1 rounded">
                    {img.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#dfe6ef] flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#071d3b] hover:bg-[#102d59] text-white text-[12px] font-bold rounded-xl transition-colors shadow-sm"
            >
              Save Profile Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
