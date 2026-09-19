"use client";
import Link from "next/link";
import React, { useState } from "react";

const AU_INTENTS = [
  "New Home Construction (Custom Build)",
  "Knockdown & Rebuild",
  "Major Renovation & Extension",
  "Building & Pest Pre-Purchase Inspection",
  "Conveyancing & Settlement via PEXA",
  "Property Management / Rental Leasing",
  "Strata & Body Corporate Management",
  "Licensed Trade (Electrical / Plumbing / Waterproofing)",
];

const AU_PROPERTIES = [
  { id: "TPH-KEN-018", label: "TPH-KEN-018 — 18 Banksia Crescent, Kenmore QLD 4069" },
  { id: "TPH-GRV-007", label: "TPH-GRV-007 — 7 Cedar Street, Graceville QLD 4075" },
  { id: "TPH-TOW-029", label: "TPH-TOW-029 — 14 Fernberg Court, Toowong QLD 4066" },
];

export default function StartInquiryPage() {
  const [selectedIntent, setSelectedIntent] = useState(AU_INTENTS[0]);
  const [selectedProp, setSelectedProp] = useState(AU_PROPERTIES[0].id);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 lg:px-8 py-10 w-full">
      <div className="text-center mb-8">
        <div className="text-[10px] font-bold text-verified uppercase tracking-widest mb-1.5">
          Connect via TrustLink™
        </div>
        <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">
          Start a Professional Inquiry
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Connect with an Australian verified builder or specialist under an encrypted TrustLink workspace.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden">
        {/* Step Indicator */}
        <div className="flex bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          <div className="flex-1 py-3 px-4 text-center border-r border-slate-200 dark:border-slate-700 text-brand-navy dark:text-white bg-white dark:bg-slate-800">
            1. Scope & Intent
          </div>
          <div className="flex-1 py-3 px-4 text-center border-r border-slate-200 dark:border-slate-700">
            2. Prop ID Linkage
          </div>
          <div className="flex-1 py-3 px-4 text-center">
            3. Instant TrustLink
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-verified rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                ✓
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Inquiry Sent & TrustLink Created!
              </h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto mb-6">
                Your request has been routed to the specialist. A scoped TrustLink workspace is now active under your Prop ID.
              </p>
              <Link
                href="/trustlinks/TL-99214-B"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
              >
                Open TrustLink Workspace →
              </Link>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                What service do you require?
              </h2>

              <div className="space-y-2 mb-6">
                {AU_INTENTS.map((option) => (
                  <label
                    key={option}
                    onClick={() => setSelectedIntent(option)}
                    className={`flex items-center gap-3 p-3.5 border rounded-xl cursor-pointer transition-all ${
                      selectedIntent === option
                        ? "border-brand-navy bg-slate-50 dark:bg-slate-700/50 dark:border-white font-semibold text-slate-900 dark:text-white"
                        : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="intent"
                      checked={selectedIntent === option}
                      onChange={() => setSelectedIntent(option)}
                      className="w-4 h-4 text-brand-navy focus:ring-brand-navy border-slate-300 accent-brand-navy"
                    />
                    <span className="text-xs">{option}</span>
                  </label>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Attach your Permanent Prop ID
                </label>
                <select
                  value={selectedProp}
                  onChange={(e) => setSelectedProp(e.target.value)}
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-xs p-3 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20"
                >
                  {AU_PROPERTIES.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                  <option value="">No property linked yet (General Inquiry)</option>
                </select>
                <p className="text-[11px] text-slate-500 mt-1.5">
                  Linking your Prop ID allows the professional to view authorized site details without sharing private deeds.
                </p>
              </div>

              <div className="mb-8">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Project Notes & Timeline
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-xs p-3 text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-navy/20"
                  placeholder="Describe your site details, preferred finishes, or target start date..."
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold rounded-xl shadow-sm transition-all"
                  style={{ background: "linear-gradient(135deg, #0c2340, #143865)" }}
                >
                  Submit Inquiry & Create TrustLink →
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
