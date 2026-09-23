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
              <span>🤝</span>
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
                    className={`flex-1 py-2 px-3 rounded-lg text-[12px] font-bold transition-all text-center ${
                      activeTab === "client"
                        ? "bg-white text-[#071d3b] shadow-sm"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    🏡 Move Your Own Clients
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("pro");
                      setFormSubmitted(false);
                    }}
                    className={`flex-1 py-2 px-3 rounded-lg text-[12px] font-bold transition-all text-center ${
                      activeTab === "pro"
                        ? "bg-white text-[#071d3b] shadow-sm"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    🏗️ Invite Fellow Professionals
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setActiveTab("pro");
                      setFormSubmitted(false);
                    }}
                    className={`flex-1 py-2 px-3 rounded-lg text-[12px] font-bold transition-all text-center ${
                      activeTab === "pro"
                        ? "bg-white text-[#071d3b] shadow-sm"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    🛠️ Invite a Professional
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("friend");
                      setFormSubmitted(false);
                    }}
                    className={`flex-1 py-2 px-3 rounded-lg text-[12px] font-bold transition-all text-center ${
                      activeTab === "friend"
                        ? "bg-white text-[#071d3b] shadow-sm"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    🎁 Refer a Friend / Neighbor
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
                        <span>💡</span>
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
                        <span>🤝</span>
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
                        <span>🛡️</span>
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
                        <span>🎁</span>
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
                        <span>💬</span>
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
                        <span>✉️</span>
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
            <span>🔒 Encrypted invite · No spam guarantee</span>
            <button onClick={onClose} className="hover:text-[#102645] font-semibold">
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
