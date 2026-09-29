"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Tradie {
  id: string;
  name: string;
  business: string;
  trade: string;
  phone: string;
  license: string;
  property: string;
  propId: string;
  client: string;
  status: "pending_cert" | "verified" | "in_progress";
  statusLabel: string;
  statusColor: string;
  requiredCert: string;
  certStatus: "awaiting_sms" | "verified" | "not_required";
  smsLinkSent: boolean;
  smsUrl: string;
  lastActive: string;
  unreadCount?: number;
}

interface ChatMessage {
  id: string;
  sender: string;
  senderRole: "builder" | "tradie";
  time: string;
  text: string;
  attachment?: {
    title: string;
    size: string;
    type: string;
  };
}

const INITIAL_TRADIES: Tradie[] = [
  {
    id: "subbie-lachlan",
    name: "Lachlan Vance",
    business: "Lachlan Electrical Solutions",
    trade: "Licensed Electrician (Sparky)",
    phone: "+61 412 890 123",
    license: "QLD Electrical #78192",
    property: "18 Banksia Crescent, Kenmore",
    propId: "TPH-KEN-018",
    client: "Alex & Emily",
    status: "pending_cert",
    statusLabel: "⏳ Form 16 Pending",
    statusColor: "bg-[#fff4df] text-[#8b641c] border-[#fce3b8]",
    requiredCert: "Electrical Safety Certificate (QBCC Form 16)",
    certStatus: "awaiting_sms",
    smsLinkSent: true,
    smsUrl: "link.tph.au/c/7a9f",
    lastActive: "Today 10:14 AM",
    unreadCount: 1,
  },
  {
    id: "subbie-dave",
    name: "Dave Miller",
    business: "Miller Waterproofing & Tiling",
    trade: "Waterproofer & Tiler",
    phone: "+61 423 711 405",
    license: "QBCC #118492",
    property: "18 Banksia Crescent, Kenmore",
    propId: "TPH-KEN-018",
    client: "Alex & Emily",
    status: "verified",
    statusLabel: "✓ Form 16 Verified",
    statusColor: "bg-[#eaf5ef] text-[#24754c] border-[#c7e3d1]",
    requiredCert: "Wet-Area Waterproofing Certificate (Form 43)",
    certStatus: "verified",
    smsLinkSent: true,
    smsUrl: "link.tph.au/c/4b1e",
    lastActive: "Yesterday 4:30 PM",
  },
  {
    id: "subbie-sam",
    name: "Sam Cooper",
    business: "Southside Plumbing & Drainage",
    trade: "Licensed Plumber & Drainer",
    phone: "+61 433 901 884",
    license: "QBCC #44912",
    property: "7 Cedar Street, Graceville",
    propId: "TPH-GRV-007",
    client: "Sofia Nguyen",
    status: "in_progress",
    statusLabel: "Active Rough-in",
    statusColor: "bg-[#f0f4f9] text-[#071d3b] border-[#cbd5e2]",
    requiredCert: "Plumbing & Drainage Compliance (Form 4)",
    certStatus: "not_required",
    smsLinkSent: false,
    smsUrl: "link.tph.au/c/992d",
    lastActive: "23 Sep",
  },
  {
    id: "subbie-flick",
    name: "Flick Pest Control",
    business: "Commercial Termite & Pest Management",
    trade: "Termite Barrier Specialist",
    phone: "1300 247 378",
    license: "QBCC #90211",
    property: "18 Banksia Crescent, Kenmore",
    propId: "TPH-KEN-018",
    client: "Alex & Emily",
    status: "verified",
    statusLabel: "✓ Barrier Cert Attached",
    statusColor: "bg-[#eaf5ef] text-[#24754c] border-[#c7e3d1]",
    requiredCert: "AS 3660.1 Termite Management System Notice",
    certStatus: "verified",
    smsLinkSent: true,
    smsUrl: "link.tph.au/c/2f80",
    lastActive: "20 Sep",
  },
  {
    id: "subbie-elena",
    name: "Elena Rostova",
    business: "Rostova Structural Engineering",
    trade: "Structural Engineer (RPEQ)",
    phone: "+61 408 332 119",
    license: "RPEQ #18921 / QBCC #10291",
    property: "7 Fig Tree Pocket Road",
    propId: "TPH-FIG-007",
    client: "Thomas Murray",
    status: "verified",
    statusLabel: "✓ Form 16 Slab Post-Pour",
    statusColor: "bg-[#eaf5ef] text-[#24754c] border-[#c7e3d1]",
    requiredCert: "QBCC Form 16 Structural Stage Signoff",
    certStatus: "verified",
    smsLinkSent: true,
    smsUrl: "link.tph.au/c/55c1",
    lastActive: "19 Sep",
  },
];

const INITIAL_CHATS: Record<string, ChatMessage[]> = {
  "subbie-lachlan": [
    {
      id: "m-1",
      sender: "Hart Homes (Olivia)",
      senderRole: "builder",
      time: "Yesterday 9:15 AM",
      text: "Morning Lachlan! Finishing up rough-in and switchboard testing at 18 Banksia Crescent this week. Homeowner handover is booked for Friday.",
    },
    {
      id: "m-2",
      sender: "Lachlan Vance",
      senderRole: "tradie",
      time: "Yesterday 11:20 AM",
      text: "Hey Olivia, Tesla Powerwall, EV charger circuit, and all main switchboard RCD checks passed 100% this morning.",
    },
    {
      id: "m-3",
      sender: "Hart Homes (Olivia)",
      senderRole: "builder",
      time: "Yesterday 11:45 AM",
      text: "Awesome work mate. I've dispatched an SMS magic upload link so you can snap a photo of the signed QBCC Form 16 Electrical Safety Certificate on your phone.",
    },
    {
      id: "m-4",
      sender: "Lachlan Vance",
      senderRole: "tradie",
      time: "Today 10:14 AM",
      text: "Got the SMS link on my phone! Signing the certificate now on the ute tailgate and will upload it shortly.",
    },
  ],
  "subbie-dave": [
    {
      id: "m-d1",
      sender: "Dave Miller",
      senderRole: "tradie",
      time: "Yesterday 2:10 PM",
      text: "Hi Olivia, uploaded the Form 43 wet area waterproofing certificate for ensuite and main bathroom via the SMS link. Bond breaker and 2 coats ARDEX WPM 002 applied.",
      attachment: {
        title: "QBCC Form 43 - Wet Area Waterproofing Signoff.pdf",
        size: "1.4 MB",
        type: "Statutory Certificate",
      },
    },
    {
      id: "m-d2",
      sender: "Hart Homes (Olivia)",
      senderRole: "builder",
      time: "Yesterday 2:45 PM",
      text: "Thanks Dave! The system verified the cert and locked it straight into Alex & Emily's Digital Key handover pack.",
    },
  ],
  "subbie-sam": [
    {
      id: "m-s1",
      sender: "Hart Homes (Olivia)",
      senderRole: "builder",
      time: "23 Sep 8:00 AM",
      text: "Hi Sam, slab crew at 7 Cedar Street is scheduled for next Tuesday. Can you confirm rough-in plumbing inspection date?",
    },
    {
      id: "m-s2",
      sender: "Sam Cooper",
      senderRole: "tradie",
      time: "23 Sep 9:30 AM",
      text: "Rough-in pressure test is set for Monday 10am. Will upload the drainage diagram once certified.",
    },
  ],
  "subbie-flick": [
    {
      id: "m-f1",
      sender: "Flick Pest Control",
      senderRole: "tradie",
      time: "20 Sep 3:15 PM",
      text: "Installation complete for Termimesh stainless steel physical barrier system at 18 Banksia Crescent. AS 3660.1 meter box notice affixed.",
      attachment: {
        title: "Termimesh 50-Year System Warranty & AS 3660.1 Notice.pdf",
        size: "2.1 MB",
        type: "Statutory Warranty",
      },
    },
  ],
  "subbie-elena": [
    {
      id: "m-e1",
      sender: "Elena Rostova",
      senderRole: "tradie",
      time: "19 Sep 4:10 PM",
      text: "Form 16 Slab Post-Pour structural certificate has been executed under RPEQ #18921 and sealed directly to the property record.",
      attachment: {
        title: "Form 16 - Inspection Certificate (Foundations & Slab).pdf",
        size: "1.8 MB",
        type: "Statutory Form 16",
      },
    },
  ],
};

export default function TradiePage() {
  const [tradies, setTradies] = useState<Tradie[]>(INITIAL_TRADIES);
  const [selectedTradieId, setSelectedTradieId] = useState<string>("subbie-lachlan");
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>(INITIAL_CHATS);
  const [filterQuery, setFilterQuery] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<"all" | "pending" | "verified">("all");
  const [inputMessage, setInputMessage] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals
  const [inviteModalOpen, setInviteModalOpen] = useState<boolean>(false);
  const [requestCertModalOpen, setRequestCertModalOpen] = useState<boolean>(false);

  // New Tradie Form State
  const [newTradieName, setNewTradieName] = useState("");
  const [newTradieBusiness, setNewTradieBusiness] = useState("");
  const [newTradieTrade, setNewTradieTrade] = useState("Licensed Electrician");
  const [newTradiePhone, setNewTradiePhone] = useState("+61 4");
  const [newTradieProperty, setNewTradieProperty] = useState("18 Banksia Crescent, Kenmore");
  const [newTradieCert, setNewTradieCert] = useState("QBCC Form 16 Compliance");

  // Selected Tradie & Active Chat
  const selectedTradie = tradies.find((t) => t.id === selectedTradieId) || tradies[0];
  const activeChat = chatMessages[selectedTradie.id] || [];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const filteredTradies = tradies.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      t.trade.toLowerCase().includes(filterQuery.toLowerCase()) ||
      t.property.toLowerCase().includes(filterQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filterCategory === "pending") return t.status === "pending_cert";
    if (filterCategory === "verified") return t.status === "verified";
    return true;
  });

  // Actions
  const handleSendMessage = (textToSend?: string) => {
    const content = (textToSend || inputMessage).trim();
    if (!content) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "Hart Homes (Olivia)",
      senderRole: "builder",
      time: "Just now",
      text: content,
    };

    setChatMessages((prev) => ({
      ...prev,
      [selectedTradie.id]: [...(prev[selectedTradie.id] || []), newMsg],
    }));

    setInputMessage("");
    showToast(`Message dispatched via SMS & in-app to ${selectedTradie.name}`);
  };

  const handleResendSmsLink = () => {
    showToast(`SMS Magic Upload Link (${selectedTradie.smsUrl}) re-sent to ${selectedTradie.phone}`);
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "Hart Homes (Olivia)",
      senderRole: "builder",
      time: "Just now",
      text: `📲 Re-sent SMS Magic Upload Link: https://${selectedTradie.smsUrl} — Tap the link on your mobile to upload your signed certificate. No login required.`,
    };
    setChatMessages((prev) => ({
      ...prev,
      [selectedTradie.id]: [...(prev[selectedTradie.id] || []), newMsg],
    }));
  };

  const handleUploadOnBehalf = () => {
    // Simulates builder uploading on behalf of tradie
    setTradies((prev) =>
      prev.map((t) =>
        t.id === selectedTradie.id
          ? {
              ...t,
              status: "verified",
              statusLabel: "✓ Form 16 Verified",
              statusColor: "bg-[#eaf5ef] text-[#24754c] border-[#c7e3d1]",
              certStatus: "verified",
            }
          : t
      )
    );

    const docUploadMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "Hart Homes (Olivia)",
      senderRole: "builder",
      time: "Just now",
      text: `Verified & attached certificate for ${selectedTradie.property}:`,
      attachment: {
        title: `${selectedTradie.requiredCert}.pdf`,
        size: "1.9 MB",
        type: "Statutory Certificate",
      },
    };

    setChatMessages((prev) => ({
      ...prev,
      [selectedTradie.id]: [...(prev[selectedTradie.id] || []), docUploadMsg],
    }));

    showToast(`Form 16 verified! 18 Banksia Crescent Handover Pack is now 100% complete.`);
  };

  const handleInviteTradieSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTradieName.trim()) return;

    const newSubbie: Tradie = {
      id: `subbie-${Date.now()}`,
      name: newTradieName.trim(),
      business: newTradieBusiness.trim() || `${newTradieName.trim()} Services`,
      trade: newTradieTrade,
      phone: newTradiePhone.trim(),
      license: "QBCC Verified",
      property: newTradieProperty,
      propId: newTradieProperty.includes("Banksia")
        ? "TPH-KEN-018"
        : newTradieProperty.includes("Cedar")
        ? "TPH-GRV-007"
        : "TPH-FIG-007",
      client: newTradieProperty.includes("Banksia") ? "Alex & Emily" : "Sofia Nguyen",
      status: "pending_cert",
      statusLabel: "⏳ Form 16 Pending",
      statusColor: "bg-[#fff4df] text-[#8b641c] border-[#fce3b8]",
      requiredCert: newTradieCert,
      certStatus: "awaiting_sms",
      smsLinkSent: true,
      smsUrl: `link.tph.au/c/${Math.random().toString(36).substring(2, 6)}`,
      lastActive: "Just now",
      unreadCount: 0,
    };

    setTradies([newSubbie, ...tradies]);
    setSelectedTradieId(newSubbie.id);
    setChatMessages((prev) => ({
      ...prev,
      [newSubbie.id]: [
        {
          id: `msg-${Date.now()}`,
          sender: "Hart Homes (Olivia)",
          senderRole: "builder",
          time: "Just now",
          text: `Welcome ${newSubbie.name}! You've been linked to ${newSubbie.property}. Please upload your ${newSubbie.requiredCert} when ready via https://${newSubbie.smsUrl}.`,
        },
      ],
    }));

    setInviteModalOpen(false);
    setNewTradieName("");
    setNewTradieBusiness("");
    setNewTradiePhone("+61 4");
    showToast(`Tradie invited! SMS Magic Link dispatched to ${newSubbie.phone}`);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1360px] w-full font-sans space-y-5">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 bg-[#071d3b] text-white px-4 py-3 rounded-xl shadow-lg border border-white/10 text-xs font-semibold flex items-center gap-2 max-w-md"
          >
            <span className="w-2 h-2 rounded-full bg-[#24754c] animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Breadcrumb & Top Bar ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-[#dfe6ef]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#24754c]">
              Pro Hub · Tradie Section
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#24754c]" />
            <span className="text-[10px] text-[#5b6e84] font-medium">
              Hart Homes (QBCC #150821)
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#102645]">
            Tradie Network &amp; Communication
          </h1>
          <p className="text-xs text-[#68788e] mt-0.5">
            Collaborate with trade specialists, request Form 16 certs, and invite subbies via SMS
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <button
            onClick={() => setRequestCertModalOpen(true)}
            className="px-3.5 py-1.5 bg-white border border-[#cbd5e2] hover:bg-[#f3f6fb] text-[#102645] rounded-xl text-xs font-semibold transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>📄</span>
            <span>Request Compliance Cert</span>
          </button>
          <button
            onClick={() => setInviteModalOpen(true)}
            className="px-3.5 py-1.5 bg-[#071d3b] hover:bg-[#15345d] text-white rounded-xl text-xs font-semibold transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>+ Invite Tradie</span>
          </button>
        </div>
      </div>

      {/* ── Stat Ribbon (Minimalist 4-Stat Strip) ─────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-[#dfe6ef] rounded-xl p-3 shadow-2xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#68788e]">
            Active Subbies
          </div>
          <div className="text-xl font-bold text-[#102645] mt-0.5">
            {tradies.length} Specialists
          </div>
          <div className="text-[10px] text-[#24754c] font-medium mt-0.5">
            Sparky, Tiler, Plumber, Pest
          </div>
        </div>

        <div className="bg-white border border-[#dfe6ef] rounded-xl p-3 shadow-2xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#8b641c]">
            Handover Blockers
          </div>
          <div className="text-xl font-bold text-[#8b641c] mt-0.5">
            1 Form 16 Pending
          </div>
          <div className="text-[10px] text-[#8b641c] font-medium mt-0.5">
            18 Banksia Crescent (Sparky)
          </div>
        </div>

        <div className="bg-white border border-[#dfe6ef] rounded-xl p-3 shadow-2xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#24754c]">
            Verified Certs
          </div>
          <div className="text-xl font-bold text-[#24754c] mt-0.5">
            4 Sealed
          </div>
          <div className="text-[10px] text-[#5b6e84] font-medium mt-0.5">
            Waterproofing, Termite, Slab
          </div>
        </div>

        <div className="bg-white border border-[#dfe6ef] rounded-xl p-3 shadow-2xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#071d3b]">
            SMS Magic Links
          </div>
          <div className="text-xl font-bold text-[#071d3b] mt-0.5">
            100% Zero-Friction
          </div>
          <div className="text-[10px] text-[#5b6e84] font-medium mt-0.5">
            No password or app download
          </div>
        </div>
      </div>

      {/* ── Two-Column Main Workspace ──────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* ── Left Column: Trade Roster (5 cols) ─────────────────────────── */}
        <div className="lg:col-span-5 bg-white border border-[#dfe6ef] rounded-2xl p-4 shadow-2xs flex flex-col space-y-3">
          
          {/* Roster Header & Search */}
          <div className="space-y-2.5 pb-2 border-b border-[#dfe6ef]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-[#102645]">Trade Roster</h2>
                <span className="text-[10px] font-bold px-2 py-0.2 bg-[#f0f4f8] text-[#5b6e84] rounded-full">
                  {filteredTradies.length}
                </span>
              </div>
              <button
                onClick={() => setInviteModalOpen(true)}
                className="text-xs font-bold text-[#071d3b] hover:underline cursor-pointer"
              >
                + Add Subbie
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Filter by name, trade, or site..."
                className="w-full px-3 py-1.5 pl-8 bg-[#f4f6f8] border border-[#dfe6ef] rounded-lg text-xs text-[#102645] placeholder-[#8a9bb0] focus:outline-none focus:border-[#071d3b]"
              />
              <span className="absolute left-2.5 top-2 text-[#8a9bb0] text-xs">🔍</span>
            </div>

            {/* Quick Filter Chips */}
            <div className="flex items-center gap-1.5 pt-0.5">
              <button
                onClick={() => setFilterCategory("all")}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                  filterCategory === "all"
                    ? "bg-[#071d3b] text-white"
                    : "bg-[#f4f6f8] text-[#5b6e84] hover:bg-[#e8edf2]"
                }`}
              >
                All ({tradies.length})
              </button>
              <button
                onClick={() => setFilterCategory("pending")}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                  filterCategory === "pending"
                    ? "bg-[#8b641c] text-white"
                    : "bg-[#fff4df] text-[#8b641c] hover:bg-[#feeccb]"
                }`}
              >
                <span>Pending Certs</span>
                <span className="text-[9px] px-1 py-0.2 rounded-full bg-white/30 font-bold">1</span>
              </button>
              <button
                onClick={() => setFilterCategory("verified")}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                  filterCategory === "verified"
                    ? "bg-[#24754c] text-white"
                    : "bg-[#eaf5ef] text-[#24754c] hover:bg-[#d6ecd0]"
                }`}
              >
                Verified ({tradies.filter((t) => t.status === "verified").length})
              </button>
            </div>
          </div>

          {/* Tradie List Cards */}
          <div className="space-y-2 max-h-[580px] overflow-y-auto pr-0.5">
            {filteredTradies.map((tradie) => {
              const isSelected = tradie.id === selectedTradie.id;
              return (
                <div
                  key={tradie.id}
                  onClick={() => setSelectedTradieId(tradie.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer text-left relative ${
                    isSelected
                      ? "bg-[#f3f6fb] border-[#071d3b] shadow-xs ring-1 ring-[#071d3b]"
                      : "bg-white border-[#dfe6ef] hover:border-[#cbd5e1] hover:bg-[#fafbfc]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <strong className="text-xs font-bold text-[#102645] truncate">
                          {tradie.name}
                        </strong>
                        {tradie.unreadCount ? (
                          <span className="w-2 h-2 rounded-full bg-[#efbd66]" />
                        ) : null}
                      </div>
                      <div className="text-[11px] text-[#5b6e84] truncate">
                        {tradie.business}
                      </div>
                    </div>
                    <span
                      className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap flex-shrink-0 ${tradie.statusColor}`}
                    >
                      {tradie.statusLabel}
                    </span>
                  </div>

                  <div className="mt-2 pt-2 border-t border-[#f0f4f8] flex items-center justify-between text-[10.5px]">
                    <span className="text-[#24754c] font-medium truncate flex items-center gap-1">
                      <span>📍</span>
                      <span>{tradie.property.split(",")[0]}</span>
                    </span>
                    <span className="text-[#8a9bb0]">{tradie.lastActive}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Pro Tip Box */}
          <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-2.5 text-[11px] text-[#5b6e84] flex items-start gap-2">
            <span className="text-sm">💡</span>
            <div>
              <span className="font-bold text-[#102645]">Tradies never need to download an app.</span> All cert requests fire via single-use SMS magic links.
            </div>
          </div>
        </div>

        {/* ── Right Column: Tradie Workspace & Chat (7 cols) ─────────────── */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Subbie Profile Header Card */}
          <div className="bg-white border border-[#dfe6ef] rounded-2xl p-4 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#071d3b] text-white flex items-center justify-center font-bold text-base flex-shrink-0">
                  {selectedTradie.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-[#102645]">
                      {selectedTradie.name}
                    </h2>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${selectedTradie.statusColor}`}>
                      {selectedTradie.statusLabel}
                    </span>
                  </div>
                  <p className="text-xs text-[#5b6e84] mt-0.5">
                    {selectedTradie.trade} · {selectedTradie.license}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
                <a
                  href={`tel:${selectedTradie.phone}`}
                  className="px-3 py-1.5 bg-[#f4f6f8] hover:bg-[#e8edf2] text-[#102645] rounded-lg font-semibold transition-colors border border-[#dfe6ef] flex items-center gap-1.5"
                >
                  <span>📞</span>
                  <span>{selectedTradie.phone}</span>
                </a>
              </div>
            </div>

            {/* Assigned Property Tag */}
            <div className="mt-3 pt-3 border-t border-[#dfe6ef] flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[#68788e]">Assigned Site:</span>
                <span className="font-semibold text-[#102645] bg-[#f0f4f8] px-2 py-0.5 rounded-md">
                  {selectedTradie.property} ({selectedTradie.client})
                </span>
              </div>
              <Link
                href="/pro/digital-key"
                className="text-xs font-bold text-[#071d3b] hover:underline flex items-center gap-1"
              >
                <span>View Handover Pack</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Handover Compliance Request Box (The Critical MVP Pillar) */}
          <div
            className={`rounded-2xl p-4 border transition-all ${
              selectedTradie.status === "pending_cert"
                ? "bg-[#fffaf0] border-[#fce3b8] shadow-xs"
                : "bg-[#f4fbf7] border-[#c7e3d1] shadow-2xs"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      selectedTradie.status === "pending_cert"
                        ? "bg-[#efbd66] text-[#071d3b]"
                        : "bg-[#24754c] text-white"
                    }`}
                  >
                    {selectedTradie.status === "pending_cert" ? "Required for Handover" : "Handover Ready"}
                  </span>
                  <span className="text-xs font-bold text-[#102645]">
                    {selectedTradie.requiredCert}
                  </span>
                </div>
                
                <p className="text-xs text-[#5b6e84]">
                  {selectedTradie.status === "pending_cert"
                    ? `SMS Magic Link active (${selectedTradie.smsUrl}) · Awaiting ${selectedTradie.name.split(" ")[0]}'s photo upload.`
                    : `Verified under ${selectedTradie.license}. Formally sealed into client's sovereign Digital Key.`}
                </p>
              </div>

              {selectedTradie.status === "pending_cert" ? (
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={handleResendSmsLink}
                    className="px-3 py-1.5 bg-white border border-[#cbd5e2] hover:bg-[#f3f6fb] text-[#102645] rounded-xl text-xs font-semibold transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>📲 Resend SMS</span>
                  </button>
                  <button
                    onClick={handleUploadOnBehalf}
                    className="px-3 py-1.5 bg-[#071d3b] hover:bg-[#15345d] text-white rounded-xl text-xs font-bold transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>+ Upload on Behalf</span>
                  </button>
                </div>
              ) : (
                <div className="px-3 py-1.5 bg-[#24754c] text-white rounded-xl text-xs font-bold flex items-center gap-1.5">
                  <span>✓ Sealed to Handover Pack</span>
                </div>
              )}
            </div>

            {selectedTradie.status === "pending_cert" && (
              <div className="mt-3 pt-2.5 border-t border-[#fce3b8] flex items-center justify-between text-[11px] text-[#8b641c]">
                <span>⚡ Uploading this Form 16 advances 18 Banksia Crescent handover readiness from 92% to 100%.</span>
              </div>
            )}
          </div>

          {/* Contextual Chat Workspace */}
          <div className="bg-white border border-[#dfe6ef] rounded-2xl shadow-2xs flex flex-col h-[460px] overflow-hidden">
            
            {/* Chat Bar Header */}
            <div className="px-4 py-2.5 bg-[#fafbfc] border-b border-[#dfe6ef] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#24754c]" />
                <span className="text-xs font-bold text-[#102645]">
                  SMS &amp; In-App Live Thread with {selectedTradie.name}
                </span>
              </div>
              <span className="text-[10.5px] text-[#8a9bb0]">
                Dual-synced to +61 mobile
              </span>
            </div>

            {/* Chat Feed */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-white">
              {activeChat.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.senderRole === "builder" ? "items-end" : "items-start"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1 text-[10px] text-[#8a9bb0]">
                    <span className="font-semibold text-[#5b6e84]">{msg.sender}</span>
                    <span>·</span>
                    <span>{msg.time}</span>
                  </div>

                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      msg.senderRole === "builder"
                        ? "bg-[#071d3b] text-white rounded-tr-none shadow-xs"
                        : "bg-[#f4f6f8] text-[#102645] rounded-tl-none border border-[#dfe6ef]"
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Attachment Preview Box */}
                    {msg.attachment && (
                      <div className="mt-2 pt-2 border-t border-white/20 flex items-center justify-between gap-3 bg-black/10 rounded-lg p-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-base">📄</span>
                          <div className="min-w-0">
                            <div className="font-bold text-xs truncate">
                              {msg.attachment.title}
                            </div>
                            <div className="text-[10px] opacity-80">
                              {msg.attachment.type} · {msg.attachment.size}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => showToast(`Opening ${msg.attachment?.title}...`)}
                          className="px-2 py-1 bg-white/20 hover:bg-white/30 text-[10.5px] font-bold rounded cursor-pointer"
                        >
                          View
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Contextual Quick-Action Chips */}
            <div className="px-4 py-2 bg-[#f8fafc] border-t border-[#dfe6ef] flex items-center gap-2 overflow-x-auto">
              <span className="text-[10.5px] font-bold text-[#68788e] uppercase whitespace-nowrap">
                Quick Actions:
              </span>
              <button
                onClick={() =>
                  handleSendMessage(
                    `Hi ${selectedTradie.name.split(" ")[0]}, please submit the ${selectedTradie.requiredCert} when ready via https://${selectedTradie.smsUrl}`
                  )
                }
                className="px-2.5 py-1 bg-white border border-[#cbd5e2] hover:bg-[#edf2f7] text-[#071d3b] rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors shadow-2xs cursor-pointer"
              >
                📋 Request Form 16
              </button>
              <button
                onClick={() =>
                  handleSendMessage(
                    `Site details for ${selectedTradie.property}: Key lockbox code #4812 on front water meter. Supervisor Olivia 0419 882 110.`
                  )
                }
                className="px-2.5 py-1 bg-white border border-[#cbd5e2] hover:bg-[#edf2f7] text-[#071d3b] rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors shadow-2xs cursor-pointer"
              >
                📍 Send Site Details
              </button>
              <button
                onClick={() =>
                  handleSendMessage(
                    `Lockbox access code for ${selectedTradie.property.split(",")[0]}: #4812 (Entry gate lock: 1984)`
                  )
                }
                className="px-2.5 py-1 bg-white border border-[#cbd5e2] hover:bg-[#edf2f7] text-[#071d3b] rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors shadow-2xs cursor-pointer"
              >
                🔐 Access Code
              </button>
              <button
                onClick={() =>
                  handleSendMessage(
                    `All trade milestones verified! Signing off stage on behalf of Hart Homes.`
                  )
                }
                className="px-2.5 py-1 bg-white border border-[#cbd5e2] hover:bg-[#edf2f7] text-[#071d3b] rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors shadow-2xs cursor-pointer"
              >
                ✍️ Handover Sign-off
              </button>
            </div>

            {/* Input Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-[#dfe6ef] flex items-center gap-2"
            >
              <button
                type="button"
                onClick={handleUploadOnBehalf}
                title="Attach Document or Certificate"
                className="p-2 text-[#5b6e84] hover:text-[#071d3b] hover:bg-[#f4f6f8] rounded-lg transition-colors cursor-pointer"
              >
                📎
              </button>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Message ${selectedTradie.name.split(" ")[0]} (delivers to mobile via SMS)...`}
                className="flex-1 px-3 py-2 bg-[#f4f6f8] border border-[#dfe6ef] rounded-xl text-xs text-[#102645] placeholder-[#8a9bb0] focus:outline-none focus:border-[#071d3b]"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="px-3.5 py-2 bg-[#071d3b] hover:bg-[#15345d] disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Send SMS / In-App</span>
                <span>→</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Modal: + Invite Tradie ──────────────────────────────────────── */}
      {inviteModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-[#dfe6ef] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#dfe6ef]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#24754c]">
                  Trade Onboarding
                </span>
                <h3 className="text-lg font-bold text-[#102645]">
                  Invite Tradie to Job Site
                </h3>
              </div>
              <button
                onClick={() => setInviteModalOpen(false)}
                className="w-7 h-7 rounded-full bg-[#f4f6f8] text-[#5b6e84] hover:bg-[#e2eaf4] flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleInviteTradieSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-[#102645] mb-1">
                  Tradie Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={newTradieName}
                  onChange={(e) => setNewTradieName(e.target.value)}
                  placeholder="e.g. Lachlan Vance"
                  className="w-full px-3 py-2 bg-[#f4f6f8] border border-[#dfe6ef] rounded-lg text-xs text-[#102645] focus:outline-none focus:border-[#071d3b]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#102645] mb-1">
                  Business / Company Name
                </label>
                <input
                  type="text"
                  value={newTradieBusiness}
                  onChange={(e) => setNewTradieBusiness(e.target.value)}
                  placeholder="e.g. Vance Electrical Services"
                  className="w-full px-3 py-2 bg-[#f4f6f8] border border-[#dfe6ef] rounded-lg text-xs text-[#102645] focus:outline-none focus:border-[#071d3b]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#102645] mb-1">
                    Trade Category *
                  </label>
                  <select
                    value={newTradieTrade}
                    onChange={(e) => setNewTradieTrade(e.target.value)}
                    className="w-full px-3 py-2 bg-[#f4f6f8] border border-[#dfe6ef] rounded-lg text-xs text-[#102645] focus:outline-none focus:border-[#071d3b]"
                  >
                    <option value="Licensed Electrician">Licensed Electrician (Sparky)</option>
                    <option value="Licensed Plumber & Drainer">Licensed Plumber & Drainer</option>
                    <option value="Waterproofer & Tiler">Waterproofer & Tiler</option>
                    <option value="Termite & Pest Specialist">Termite & Pest Specialist</option>
                    <option value="Glazier & Window Fabricator">Glazier & Window Fabricator</option>
                    <option value="Structural Engineer (RPEQ)">Structural Engineer (RPEQ)</option>
                    <option value="Building Certifier">Private Building Certifier</option>
                    <option value="Painter & Decorator">Painter & Decorator</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#102645] mb-1">
                    Mobile Number (for SMS Link) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newTradiePhone}
                    onChange={(e) => setNewTradiePhone(e.target.value)}
                    placeholder="+61 412 000 000"
                    className="w-full px-3 py-2 bg-[#f4f6f8] border border-[#dfe6ef] rounded-lg text-xs text-[#102645] focus:outline-none focus:border-[#071d3b]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#102645] mb-1">
                  Assign to Job Site
                </label>
                <select
                  value={newTradieProperty}
                  onChange={(e) => setNewTradieProperty(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f4f6f8] border border-[#dfe6ef] rounded-lg text-xs text-[#102645] focus:outline-none focus:border-[#071d3b]"
                >
                  <option value="18 Banksia Crescent, Kenmore">18 Banksia Crescent, Kenmore (Alex & Emily)</option>
                  <option value="7 Cedar Street, Graceville">7 Cedar Street, Graceville (Sofia Nguyen)</option>
                  <option value="7 Fig Tree Pocket Road">7 Fig Tree Pocket Road (Thomas Murray)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#102645] mb-1">
                  Handover Certificate Needed
                </label>
                <input
                  type="text"
                  value={newTradieCert}
                  onChange={(e) => setNewTradieCert(e.target.value)}
                  placeholder="e.g. Electrical Safety Certificate Form 16"
                  className="w-full px-3 py-2 bg-[#f4f6f8] border border-[#dfe6ef] rounded-lg text-xs text-[#102645] focus:outline-none focus:border-[#071d3b]"
                />
              </div>

              <div className="bg-[#f0f9f4] border border-[#c7e3d1] rounded-xl p-3 text-[11px] text-[#24754c] flex items-center gap-2">
                <span>📲</span>
                <span>An instant SMS Magic Link will be sent. The tradie can photograph and upload certs right from their phone without an account.</span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setInviteModalOpen(false)}
                  className="px-4 py-2 bg-white border border-[#cbd5e2] text-[#5b6e84] rounded-xl text-xs font-semibold hover:bg-[#f4f6f8] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#071d3b] hover:bg-[#15345d] text-white rounded-xl text-xs font-bold cursor-pointer shadow-xs"
                >
                  Send SMS Invitation
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* ── Modal: Request Compliance Cert ──────────────────────────────── */}
      {requestCertModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-[#dfe6ef] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#dfe6ef]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#24754c]">
                  Statutory Compliance
                </span>
                <h3 className="text-lg font-bold text-[#102645]">
                  Request Compliance Cert
                </h3>
              </div>
              <button
                onClick={() => setRequestCertModalOpen(false)}
                className="w-7 h-7 rounded-full bg-[#f4f6f8] text-[#5b6e84] hover:bg-[#e2eaf4] flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#102645] mb-1">
                  Select Subcontractor
                </label>
                <select
                  value={selectedTradie.id}
                  onChange={(e) => setSelectedTradieId(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f4f6f8] border border-[#dfe6ef] rounded-lg text-xs text-[#102645]"
                >
                  {tradies.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.trade}) — {t.property.split(",")[0]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#102645] mb-1">
                  Statutory Form Type
                </label>
                <select className="w-full px-3 py-2 bg-[#f4f6f8] border border-[#dfe6ef] rounded-lg text-xs text-[#102645]">
                  <option>QBCC Form 16 - Electrical Safety Certificate</option>
                  <option>QBCC Form 43 - Wet Area Waterproofing Certificate</option>
                  <option>AS 3660.1 - Termite Management System Notice</option>
                  <option>QBCC Form 16 - Glazing &amp; Window Compliance</option>
                  <option>Form 43 - Drainage &amp; Sanitary Rough-in</option>
                </select>
              </div>

              <div className="p-3 bg-[#fffaf0] border border-[#fce3b8] rounded-xl text-[11px] text-[#8b641c]">
                The subbie will receive an SMS reminder with a direct upload link. Photos uploaded are timestamped and embedded straight into the handover pack.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRequestCertModalOpen(false)}
                  className="px-4 py-2 bg-white border border-[#cbd5e2] text-[#5b6e84] rounded-xl text-xs font-semibold hover:bg-[#f4f6f8] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRequestCertModalOpen(false);
                    handleResendSmsLink();
                  }}
                  className="px-4 py-2 bg-[#071d3b] hover:bg-[#15345d] text-white rounded-xl text-xs font-bold cursor-pointer shadow-xs"
                >
                  Dispatch SMS Request
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
