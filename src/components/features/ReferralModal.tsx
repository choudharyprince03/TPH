"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: "consumer" | "pro";
}

export function ReferralModal({ isOpen, onClose, mode = "consumer" }: ReferralModalProps) {
  // Tab selection
  const [activeTab, setActiveTab] = useState<"client" | "pro" | "friend">(
    mode === "pro" ? "client" : "pro"
  );

  // Copy state
  const [copied, setCopied] = useState(false);

  // Form states
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedTarget, setSubmittedTarget] = useState("");

  // Pro: Client invite form
  const [clientName, setClientName] = useState("");
  const [clientContact, setClientContact] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [projectStage, setProjectStage] = useState("New Build Handover");

  // Pro: Fellow pro invite form
  const [tradeName, setTradeName] = useState("");
  const [tradeDiscipline, setTradeDiscipline] = useState("Building Certifier");
  const [tradeContact, setTradeContact] = useState("");

  // Consumer: Pro invite form
  const [consumerProName, setConsumerProName] = useState("");
  const [consumerProTrade, setConsumerProTrade] = useState("Custom Builder");
  const [consumerProContact, setConsumerProContact] = useState("");

  // Referral links
  const proClientLink = "https://thepropertyhelpline.com.au/onboard/hart-homes";
  const proPartnerLink = "https://thepropertyhelpline.com.au/pro/join?ref=HART-HOMES-QBCC150821";
  const consumerReferralLink = "https://thepropertyhelpline.com.au/invite?ref=ALEX-KENMORE-4069";

  const currentLink =
    mode === "pro"
      ? activeTab === "client"
        ? proClientLink
        : proPartnerLink
      : activeTab === "friend"
      ? consumerReferralLink
      : "https://thepropertyhelpline.com.au/pro/join?ref=ALEX-INVITE";

  const handleCopy = (text: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const handleSubmit = (e: React.FormEvent, targetName: string) => {
    e.preventDefault();
    setSubmittedTarget(targetName || "your contact");
    setFormSubmitted(true);
  };

  const handleResetForm = () => {
    setFormSubmitted(false);
    setSubmittedTarget("");
    setClientName("");
    setClientContact("");
    setPropertyAddress("");
    setTradeName("");
    setTradeContact("");
    setConsumerProName("");
    setConsumerProContact("");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#071d3b]/60 backdrop-blur-xs"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 14 }}
          transition={{ duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-[#dfe6ef] overflow-hidden z-10 font-sans my-8"
        >
          {/* Header */}
          <div className="bg-[#071d3b] text-white p-6 sm:p-7 relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-white/60 hover:text-white p-1 rounded-lg text-lg leading-none"
              aria-label="Close modal"
            >
              ✕
            </button>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-bold uppercase tracking-wider text-[#efbd66] mb-2">
              <svg className="w-3.5 h-3.5 text-[#efbd66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>{mode === "pro" ? "Pro Hub Network & Onboarding" : "TPH Referral & Invite"}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {mode === "pro" ? "Grow Your Network on TPH" : "Invite & Refer to The Property Helpline"}
            </h2>
            <p className="text-[12px] text-[#b9c8db] mt-1">
              {mode === "pro"
                ? "Move your existing clients to private TrustLinks, or invite fellow professionals to collaborate on projects."
                : "Bring your trusted builder, trades, or friends onto TPH for private, encrypted property management."}
            </p>

            {/* Mode Switch Tabs */}
            <div className="flex gap-2 mt-5 p-1 bg-white/10 rounded-xl">
              {mode === "pro" ? (
                <>
                  <button
                    onClick={() => {
                      setActiveTab("client");
                      setFormSubmitted(false);
                    }}
                    className={`flex-1 py-2 px-3 rounded-lg text-[12px] font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
                      activeTab === "client"
                        ? "bg-white text-[#071d3b] shadow-sm"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>Move Your Own Clients</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("pro");
                      setFormSubmitted(false);
                    }}
                    className={`flex-1 py-2 px-3 rounded-lg text-[12px] font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
                      activeTab === "pro"
                        ? "bg-white text-[#071d3b] shadow-sm"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>Invite Fellow Professionals</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setActiveTab("pro");
                      setFormSubmitted(false);
                    }}
                    className={`flex-1 py-2 px-3 rounded-lg text-[12px] font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
                      activeTab === "pro"
                        ? "bg-white text-[#071d3b] shadow-sm"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                    </svg>
                    <span>Invite a Professional</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("friend");
                      setFormSubmitted(false);
                    }}
                    className={`flex-1 py-2 px-3 rounded-lg text-[12px] font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
                      activeTab === "friend"
                        ? "bg-white text-[#071d3b] shadow-sm"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V4.5a2.5 2.5 0 115 0V8h-5zm0 0H7a2.5 2.5 0 110-5 2.5 2.5 0 012.5 2.5V8H12zm-8 4h16v9a1 1 0 01-1 1H5a1 1 0 01-1-1v-9z" />
                    </svg>
                    <span>Refer a Friend / Neighbor</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-7 max-h-[68vh] overflow-y-auto">
            {formSubmitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-[#eaf5ef] text-[#24754c] rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 border border-[#d2e6d9]">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-[#102645] mb-2">Invitation Prepared!</h3>
                <p className="text-[13px] text-[#68788e] max-w-md mx-auto mb-6 leading-relaxed">
                  We have dispatched a private secure TrustLink™ invitation to{" "}
                  <strong className="text-[#102645]">{submittedTarget}</strong>. Once they accept, they will
                  automatically appear in your connected workspace with zero manual chasing.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={handleResetForm}
                    className="px-4 py-2 bg-[#f4f6f8] hover:bg-[#e4ecf7] text-[#071d3b] font-semibold rounded-xl text-[12px] transition-colors"
                  >
                    + Send Another Invite
                  </button>
                  <button
                    onClick={onClose}
                    className="px-5 py-2 bg-[#071d3b] hover:bg-[#102d59] text-white font-semibold rounded-xl text-[12px] transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* ── 1. PRO MODE: MOVE OWN CLIENTS ── */}
                {mode === "pro" && activeTab === "client" && (
                  <div className="space-y-5">
                    <div className="bg-[#f0f4f9] border border-[#d8e3ef] rounded-2xl p-4 text-[12px] text-[#425872]">
                      <div className="font-bold text-[#071d3b] mb-1 flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-[#efbd66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        <span>Zero Commission · Sovereign Property Handover</span>
                      </div>
                      Bring your current building, renovation, or settlement clients onto TPH. You can issue QBCC
                      Form 16/43 certs, seal warranties to their permanent Prop ID, and communicate without chasing
                      emails.
                    </div>

                    {/* Fast Direct Form */}
                    <form onSubmit={(e) => handleSubmit(e, clientName)} className="space-y-3.5">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#68788e] mb-1">
                          Client / Homeowner Name
                        </label>
                        <input
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="e.g. James & Sarah Davidson"
                          className="w-full px-3.5 py-2.5 bg-[#fcfbf8] border border-[#dfe6ef] rounded-xl text-[13px] text-[#102645] focus:outline-none focus:border-[#071d3b]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#68788e] mb-1">
                            Email or Mobile
                          </label>
                          <input
                            type="text"
                            required
                            value={clientContact}
                            onChange={(e) => setClientContact(e.target.value)}
                            placeholder="e.g. sarah@davidson.com.au"
                            className="w-full px-3.5 py-2.5 bg-[#fcfbf8] border border-[#dfe6ef] rounded-xl text-[13px] text-[#102645] focus:outline-none focus:border-[#071d3b]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#68788e] mb-1">
                            Project Stage / Service
                          </label>
                          <select
                            value={projectStage}
                            onChange={(e) => setProjectStage(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#fcfbf8] border border-[#dfe6ef] rounded-xl text-[13px] text-[#102645] focus:outline-none focus:border-[#071d3b]"
                          >
                            <option value="New Build Handover">New Build Handover</option>
                            <option value="Contract & Scope Review">Contract & Scope Review</option>
                            <option value="Renovation Walkthrough">Renovation Walkthrough</option>
                            <option value="Post-Completion Warranty">Post-Completion Warranty</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#68788e] mb-1">
                          Property Address / Prop ID (Optional)
                        </label>
                        <input
                          type="text"
                          value={propertyAddress}
                          onChange={(e) => setPropertyAddress(e.target.value)}
                          placeholder="e.g. 18 Banksia Crescent, Kenmore QLD 4069"
                          className="w-full px-3.5 py-2.5 bg-[#fcfbf8] border border-[#dfe6ef] rounded-xl text-[13px] text-[#102645] focus:outline-none focus:border-[#071d3b]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-[#071d3b] hover:bg-[#102d59] text-white font-bold rounded-xl text-[12px] transition-colors shadow-sm flex items-center justify-center gap-2 mt-2"
                      >
                        <span>Send Client TrustLink™ Invitation</span>
                        <span>→</span>
                      </button>
                    </form>

                    {/* Direct Onboarding Link */}
                    <div className="pt-4 border-t border-[#dfe6ef]">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#68788e] mb-1.5">
                        Or Share Your Direct Client Onboarding Link
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          readOnly
                          value={proClientLink}
                          className="flex-1 px-3 py-2 bg-[#f4f6f8] border border-[#dfe6ef] rounded-lg text-[11px] font-mono text-[#425872] select-all"
                        />
                        <button
                          onClick={() => handleCopy(proClientLink)}
                          className="px-3.5 py-2 bg-[#f4f6f8] hover:bg-[#e4ebf5] text-[#071d3b] font-bold rounded-lg text-[11px] transition-colors border border-[#cbd5e2] whitespace-nowrap"
                        >
                          {copied ? "Copied! ✓" : "Copy Link"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── 2. PRO MODE: INVITE FELLOW PROFESSIONALS ── */}
                {mode === "pro" && activeTab === "pro" && (
                  <div className="space-y-5">
                    <div className="bg-[#eaf5ef] border border-[#c7e3d1] rounded-2xl p-4 text-[12px] text-[#2d6143]">
                      <div className="font-bold text-[#1b4e31] mb-1 flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-[#24754c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>Collaborate on Joint Building &amp; Property Projects</span>
                      </div>
                      Bring your preferred certifiers, engineers, architects, subcontractors, and conveyancers onto
                      TPH so you can share site records, Form 16 sign-offs, and client workspaces seamlessly.
                    </div>

                    <form onSubmit={(e) => handleSubmit(e, tradeName)} className="space-y-3.5">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#68788e] mb-1">
                          Professional / Colleague Name
                        </label>
                        <input
                          type="text"
                          required
                          value={tradeName}
                          onChange={(e) => setTradeName(e.target.value)}
                          placeholder="e.g. Dupont Inspections / Claire Dupont"
                          className="w-full px-3.5 py-2.5 bg-[#fcfbf8] border border-[#dfe6ef] rounded-xl text-[13px] text-[#102645] focus:outline-none focus:border-[#071d3b]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#68788e] mb-1">
                            Trade Discipline
                          </label>
                          <select
                            value={tradeDiscipline}
                            onChange={(e) => setTradeDiscipline(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#fcfbf8] border border-[#dfe6ef] rounded-xl text-[13px] text-[#102645] focus:outline-none focus:border-[#071d3b]"
                          >
                            <option value="Building Certifier">Building Certifier</option>
                            <option value="Structural Engineer">Structural Engineer</option>
                            <option value="Building & Pest Inspector">Building &amp; Pest Inspector</option>
                            <option value="Licensed Conveyancer">Licensed Conveyancer</option>
                            <option value="Architect / Draftsperson">Architect / Draftsperson</option>
                            <option value="Electrician (Form 4)">Electrician (Form 4)</option>
                            <option value="Plumber & Drainer">Plumber &amp; Drainer</option>
                            <option value="Buyer's Agent">Buyer&apos;s Agent</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#68788e] mb-1">
                            Email or Mobile
                          </label>
                          <input
                            type="text"
                            required
                            value={tradeContact}
                            onChange={(e) => setTradeContact(e.target.value)}
                            placeholder="e.g. info@dupontinspections.com.au"
                            className="w-full px-3.5 py-2.5 bg-[#fcfbf8] border border-[#dfe6ef] rounded-xl text-[13px] text-[#102645] focus:outline-none focus:border-[#071d3b]"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-[#071d3b] hover:bg-[#102d59] text-white font-bold rounded-xl text-[12px] transition-colors shadow-sm flex items-center justify-center gap-2 mt-2"
                      >
                        <span>Send Professional Network Invitation</span>
                        <span>→</span>
                      </button>
                    </form>

                    {/* Direct Partner Referral Link */}
                    <div className="pt-4 border-t border-[#dfe6ef]">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#68788e] mb-1.5">
                        Your Unique Pro Referral Link
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          readOnly
                          value={proPartnerLink}
                          className="flex-1 px-3 py-2 bg-[#f4f6f8] border border-[#dfe6ef] rounded-lg text-[11px] font-mono text-[#425872] select-all"
                        />
                        <button
                          onClick={() => handleCopy(proPartnerLink)}
                          className="px-3.5 py-2 bg-[#f4f6f8] hover:bg-[#e4ebf5] text-[#071d3b] font-bold rounded-lg text-[11px] transition-colors border border-[#cbd5e2] whitespace-nowrap"
                        >
                          {copied ? "Copied! ✓" : "Copy Link"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── 3. CONSUMER MODE: INVITE A PROFESSIONAL ── */}
                {mode === "consumer" && activeTab === "pro" && (
                  <div className="space-y-5">
                    <div className="bg-[#f0ede5] border border-[#e2dcd0] rounded-2xl p-4 text-[12px] text-[#554b38]">
                      <div className="font-bold text-[#102645] mb-1 flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-[#071d3b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span>Bring Your Own Trusted Tradie or Specialist</span>
                      </div>
                      Already have a favorite builder, conveyancer, or pest inspector? Invite them onto TPH so they
                      can upload plans, deposit certificates, and chat with you in a private, spam-free space.
                    </div>

                    <form onSubmit={(e) => handleSubmit(e, consumerProName)} className="space-y-3.5">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#68788e] mb-1">
                          Specialist / Business Name
                        </label>
                        <input
                          type="text"
                          required
                          value={consumerProName}
                          onChange={(e) => setConsumerProName(e.target.value)}
                          placeholder="e.g. Kenmore Electrical Services / Dave"
                          className="w-full px-3.5 py-2.5 bg-[#fcfbf8] border border-[#dfe6ef] rounded-xl text-[13px] text-[#102645] focus:outline-none focus:border-[#071d3b]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#68788e] mb-1">
                            Discipline / Service
                          </label>
                          <select
                            value={consumerProTrade}
                            onChange={(e) => setConsumerProTrade(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#fcfbf8] border border-[#dfe6ef] rounded-xl text-[13px] text-[#102645] focus:outline-none focus:border-[#071d3b]"
                          >
                            <option value="Custom Builder">Builder / Renovator</option>
                            <option value="Building & Pest Inspector">Building &amp; Pest Inspector</option>
                            <option value="Conveyancer">Licensed Conveyancer</option>
                            <option value="Electrician">Licensed Electrician</option>
                            <option value="Plumber">Licensed Plumber</option>
                            <option value="Architect">Architect / Designer</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#68788e] mb-1">
                            Their Email or Mobile
                          </label>
                          <input
                            type="text"
                            required
                            value={consumerProContact}
                            onChange={(e) => setConsumerProContact(e.target.value)}
                            placeholder="e.g. dave@kenmoreelectric.com.au"
                            className="w-full px-3.5 py-2.5 bg-[#fcfbf8] border border-[#dfe6ef] rounded-xl text-[13px] text-[#102645] focus:outline-none focus:border-[#071d3b]"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-[#071d3b] hover:bg-[#102d59] text-white font-bold rounded-xl text-[12px] transition-colors shadow-sm flex items-center justify-center gap-2 mt-2"
                      >
                        <span>Invite Specialist to My Property Record</span>
                        <span>→</span>
                      </button>
                    </form>

                    <div className="pt-4 border-t border-[#dfe6ef]">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#68788e] mb-1.5">
                        Or Share General Pro Invitation Link
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          readOnly
                          value="https://thepropertyhelpline.com.au/pro/join?ref=ALEX-INVITE"
                          className="flex-1 px-3 py-2 bg-[#f4f6f8] border border-[#dfe6ef] rounded-lg text-[11px] font-mono text-[#425872] select-all"
                        />
                        <button
                          onClick={() => handleCopy("https://thepropertyhelpline.com.au/pro/join?ref=ALEX-INVITE")}
                          className="px-3.5 py-2 bg-[#f4f6f8] hover:bg-[#e4ebf5] text-[#071d3b] font-bold rounded-lg text-[11px] transition-colors border border-[#cbd5e2] whitespace-nowrap"
                        >
                          {copied ? "Copied! ✓" : "Copy Link"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── 4. CONSUMER MODE: REFER A FRIEND / NEIGHBOR ── */}
                {mode === "consumer" && activeTab === "friend" && (
                  <div className="space-y-5">
                    <div className="bg-[#eaf5ef] border border-[#c7e3d1] rounded-2xl p-4 text-[12px] text-[#2d6143]">
                      <div className="font-bold text-[#1b4e31] mb-1 flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-[#24754c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V4.5a2.5 2.5 0 115 0V8h-5zm0 0H7a2.5 2.5 0 110-5 2.5 2.5 0 012.5 2.5V8H12zm-8 4h16v9a1 1 0 01-1 1H5a1 1 0 01-1-1v-9z" />
                        </svg>
                        <span>Share The Property Helpline</span>
                      </div>
                      Help friends, family, or neighbors organize their home, keep statutory warranties safe, and
                      connect with vetted Australian specialists without unsolicited sales calls.
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#68788e] mb-1.5">
                        Your Personal Invitation Link
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          readOnly
                          value={consumerReferralLink}
                          className="flex-1 px-3.5 py-2.5 bg-[#f4f6f8] border border-[#dfe6ef] rounded-xl text-[12px] font-mono text-[#102645] select-all"
                        />
                        <button
                          onClick={() => handleCopy(consumerReferralLink)}
                          className="px-4 py-2.5 bg-[#071d3b] hover:bg-[#102d59] text-white font-bold rounded-xl text-[12px] transition-colors whitespace-nowrap shadow-sm"
                        >
                          {copied ? "Copied! ✓" : "Copy Link"}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(
                          "Check out The Property Helpline - it's an Australian platform to organise property records, handovers, and find verified specialists: " +
                            consumerReferralLink
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl border border-[#dfe6ef] hover:bg-[#f4f6f8] flex items-center justify-center gap-2 text-[12px] font-semibold text-[#102645] transition-colors"
                      >
                        <svg className="w-4 h-4 text-[#24754c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>Share on WhatsApp</span>
                      </a>
                      <a
                        href={`mailto:?subject=${encodeURIComponent(
                          "Organise your property records with The Property Helpline"
                        )}&body=${encodeURIComponent(
                          "Hey, I use The Property Helpline to manage our home's plans, certs, and connect with verified specialists. Check it out here: " +
                            consumerReferralLink
                        )}`}
                        className="p-3 rounded-xl border border-[#dfe6ef] hover:bg-[#f4f6f8] flex items-center justify-center gap-2 text-[12px] font-semibold text-[#102645] transition-colors"
                      >
                        <svg className="w-4 h-4 text-[#071d3b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>Share via Email</span>
                      </a>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 px-6 sm:px-7 bg-[#fcfbf8] border-t border-[#dfe6ef] flex items-center justify-between text-[11px] text-[#68788e]">
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#24754c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Encrypted invite · No spam guarantee</span>
            </div>
            <button onClick={onClose} className="hover:text-[#102645] font-semibold">
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
