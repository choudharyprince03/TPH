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
    trade: "Licensed Electrician",
    phone: "+61 412 890 123",
    license: "QLD Electrical #78192",
    property: "18 Banksia Crescent, Kenmore",
    propId: "TPH-KEN-018",
    client: "Alex & Emily",
    status: "pending_cert",
    statusLabel: "Pending Cert",
    statusColor: "bg-[#fbf3e4] text-[#946315] border-[#fce3b8]",
    requiredCert: "Electrical Safety Certificate (Form 16)",
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
    statusLabel: "Verified",
    statusColor: "bg-[#eaf4ef] text-[#28715e] border-[#c7e3d1]",
    requiredCert: "Waterproofing Certificate (Form 43)",
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
    statusLabel: "In Progress",
    statusColor: "bg-[#f0f4f9] text-[#0F1A2C] border-[#cbd5e2]",
    requiredCert: "Plumbing & Drainage (Form 4)",
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
    statusLabel: "Verified",
    statusColor: "bg-[#eaf4ef] text-[#28715e] border-[#c7e3d1]",
    requiredCert: "Termite Management Notice (AS 3660.1)",
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
    license: "RPEQ #18921",
    property: "7 Fig Tree Pocket Road",
    propId: "TPH-FIG-007",
    client: "Thomas Murray",
    status: "verified",
    statusLabel: "Verified",
    statusColor: "bg-[#eaf4ef] text-[#28715e] border-[#c7e3d1]",
    requiredCert: "Form 16 Slab Inspection",
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
      text: "Morning Lachlan! Finishing up rough-in and switchboard testing at 18 Banksia Crescent this week. Handover is booked for Friday.",
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
      text: "Great work mate. I've sent an SMS upload link so you can snap a photo of the signed Form 16 on your phone.",
    },
    {
      id: "m-4",
      sender: "Lachlan Vance",
      senderRole: "tradie",
      time: "Today 10:14 AM",
      text: "Got the SMS link. Signing the certificate now on the ute tailgate and will upload it shortly.",
    },
  ],
  "subbie-dave": [
    {
      id: "m-d1",
      sender: "Dave Miller",
      senderRole: "tradie",
      time: "Yesterday 2:10 PM",
      text: "Hi Olivia, uploaded the Form 43 wet area waterproofing certificate for ensuite and main bathroom via the link.",
      attachment: {
        title: "QBCC Form 43 - Wet Area Signoff.pdf",
        size: "1.4 MB",
        type: "Compliance Certificate",
      },
    },
    {
      id: "m-d2",
      sender: "Hart Homes (Olivia)",
      senderRole: "builder",
      time: "Yesterday 2:45 PM",
      text: "Thanks Dave! Verified and added straight to Alex & Emily's handover pack.",
    },
  ],
  "subbie-sam": [
    {
      id: "m-s1",
      sender: "Hart Homes (Olivia)",
      senderRole: "builder",
      time: "23 Sep 8:00 AM",
      text: "Hi Sam, slab crew at 7 Cedar Street is scheduled for next Tuesday. Can you confirm rough-in inspection date?",
    },
    {
      id: "m-s2",
      sender: "Sam Cooper",
      senderRole: "tradie",
      time: "23 Sep 9:30 AM",
      text: "Rough-in test is set for Monday 10am. Will upload drainage diagram once certified.",
    },
  ],
  "subbie-flick": [
    {
      id: "m-f1",
      sender: "Flick Pest Control",
      senderRole: "tradie",
      time: "20 Sep 3:15 PM",
      text: "Installation complete for Termimesh system at 18 Banksia Crescent. AS 3660.1 meter box notice affixed.",
      attachment: {
        title: "Termimesh Warranty & AS 3660.1 Notice.pdf",
        size: "2.1 MB",
        type: "Warranty Certificate",
      },
    },
  ],
  "subbie-elena": [
    {
      id: "m-e1",
      sender: "Elena Rostova",
      senderRole: "tradie",
      time: "19 Sep 4:10 PM",
      text: "Form 16 Slab Post-Pour structural certificate executed under RPEQ #18921 and sealed to property record.",
      attachment: {
        title: "Form 16 - Foundations & Slab.pdf",
        size: "1.8 MB",
        type: "Statutory Certificate",
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

  // Chat open/minimize state
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

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
    }, 3500);
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
    showToast(`Message sent to ${selectedTradie.name}`);
  };

  const handleResendSmsLink = () => {
    showToast(`SMS link sent to ${selectedTradie.phone}`);
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "Hart Homes (Olivia)",
      senderRole: "builder",
      time: "Just now",
      text: `Upload link: https://${selectedTradie.smsUrl} — Tap to upload your signed certificate.`,
    };
    setChatMessages((prev) => ({
      ...prev,
      [selectedTradie.id]: [...(prev[selectedTradie.id] || []), newMsg],
    }));
  };

  const handleUploadOnBehalf = () => {
    setTradies((prev) =>
      prev.map((t) =>
        t.id === selectedTradie.id
          ? {
              ...t,
              status: "verified",
              statusLabel: "Verified",
              statusColor: "bg-[#eaf4ef] text-[#28715e] border-[#c7e3d1]",
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
        type: "Compliance Certificate",
      },
    };

    setChatMessages((prev) => ({
      ...prev,
      [selectedTradie.id]: [...(prev[selectedTradie.id] || []), docUploadMsg],
    }));

    showToast(`Certificate verified for ${selectedTradie.property.split(",")[0]}`);
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
      statusLabel: "Pending Cert",
      statusColor: "bg-[#fbf3e4] text-[#946315] border-[#fce3b8]",
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
          text: `Welcome ${newSubbie.name}! Please upload your ${newSubbie.requiredCert} when ready via https://${newSubbie.smsUrl}`,
        },
      ],
    }));

    setInviteModalOpen(false);
    setNewTradieName("");
    setNewTradieBusiness("");
    setNewTradiePhone("+61 4");
    showToast(`Tradie invited. SMS link sent to ${newSubbie.phone}`);
  };

  const pendingCount = tradies.filter((t) => t.status === "pending_cert").length;
  const verifiedCount = tradies.filter((t) => t.status === "verified").length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1360px] w-full font-sans space-y-5">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 bg-[#0F1A2C] text-white px-4 py-2.5 rounded-xl shadow-lg border border-white/10 text-xs font-semibold flex items-center gap-2 max-w-md"
          >
            <span className="w-2 h-2 rounded-full bg-[#28715e] animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Top Bar ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-[#e2e5e5]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#28715e]">
              Pro Hub · Tradies
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#28715e]" />
            <span className="text-[10px] text-[#5b6e84] font-medium">
              Hart Homes
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#183249]">
            Tradies
          </h1>
          <p className="text-xs text-[#64727e] mt-0.5">
            Manage trade contractors, compliance certificates, and messages.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setInviteModalOpen(true)}
            className="px-3.5 py-1.5 bg-[#0F1A2C] hover:bg-[#1c3a54] text-white rounded-xl text-xs font-semibold transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>+ Invite Tradie</span>
          </button>
        </div>
      </div>

      {/* ── Stats Strip ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-[#e2e5e5] rounded-xl p-3 shadow-2xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#64727e]">
            Tradies
          </div>
          <div className="text-xl font-bold text-[#183249] mt-0.5">
            {tradies.length}
          </div>
          <div className="text-[10px] text-[#28715e] font-medium mt-0.5">
            Active on site
          </div>
        </div>

        <div className="bg-white border border-[#e2e5e5] rounded-xl p-3 shadow-2xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#946315]">
            Pending Certs
          </div>
          <div className="text-xl font-bold text-[#946315] mt-0.5">
            {pendingCount}
          </div>
          <div className="text-[10px] text-[#946315] font-medium mt-0.5">
            Form 16 required
          </div>
        </div>

        <div className="bg-white border border-[#e2e5e5] rounded-xl p-3 shadow-2xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#28715e]">
            Verified Certs
          </div>
          <div className="text-xl font-bold text-[#28715e] mt-0.5">
            {verifiedCount}
          </div>
          <div className="text-[10px] text-[#5b6e84] font-medium mt-0.5">
            Handover ready
          </div>
        </div>

        <div className="bg-white border border-[#e2e5e5] rounded-xl p-3 shadow-2xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#0F1A2C]">
            SMS Links
          </div>
          <div className="text-xl font-bold text-[#0F1A2C] mt-0.5">
            Active
          </div>
          <div className="text-[10px] text-[#5b6e84] font-medium mt-0.5">
            Direct mobile upload
          </div>
        </div>
      </div>

      {/* ── Two-Column Layout ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* ── Left Column: Tradie List (5 cols) ─────────────────────────── */}
        <div className="lg:col-span-5 bg-white border border-[#e2e5e5] rounded-2xl p-4 shadow-2xs flex flex-col space-y-3">
          
          {/* Header & Filter */}
          <div className="space-y-2.5 pb-2 border-b border-[#e2e5e5]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-[#183249]">Tradies</h2>
                <span className="text-[10px] font-bold px-2 py-0.2 bg-[#f0f4f8] text-[#5b6e84] rounded-full">
                  {filteredTradies.length}
                </span>
              </div>
              <button
                onClick={() => setInviteModalOpen(true)}
                className="text-xs font-semibold text-[#0F1A2C] hover:underline cursor-pointer"
              >
                + Invite
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Search tradie, trade, or site..."
                className="w-full px-3 py-1.5 pl-8 bg-[#F9F8F5] border border-[#e2e5e5] rounded-lg text-xs text-[#183249] placeholder-[#8a9bb0] focus:outline-none focus:border-[#0F1A2C]"
              />
              <svg className="w-3.5 h-3.5 text-[#8a9bb0] absolute left-2.5 top-2.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 pt-0.5">
              <button
                onClick={() => setFilterCategory("all")}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                  filterCategory === "all"
                    ? "bg-[#0F1A2C] text-white"
                    : "bg-[#F9F8F5] text-[#5b6e84] hover:bg-[#e8edf2]"
                }`}
              >
                All ({tradies.length})
              </button>
              <button
                onClick={() => setFilterCategory("pending")}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                  filterCategory === "pending"
                    ? "bg-[#946315] text-white"
                    : "bg-[#fbf3e4] text-[#946315] hover:bg-[#feeccb]"
                }`}
              >
                <span>Pending</span>
                <span className="text-[9px] px-1 py-0.2 rounded-full bg-white/30 font-bold">{pendingCount}</span>
              </button>
              <button
                onClick={() => setFilterCategory("verified")}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                  filterCategory === "verified"
                    ? "bg-[#28715e] text-white"
                    : "bg-[#eaf4ef] text-[#28715e] hover:bg-[#d6ecd0]"
                }`}
              >
                Verified ({verifiedCount})
              </button>
            </div>
          </div>

          {/* Tradie Cards List */}
          <div className="space-y-2 max-h-[620px] overflow-y-auto pr-0.5">
            {filteredTradies.map((tradie) => {
              const isSelected = tradie.id === selectedTradie.id;
              return (
                <div
                  key={tradie.id}
                  onClick={() => setSelectedTradieId(tradie.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer text-left relative ${
                    isSelected
                      ? "bg-[#F9F8F5] border-[#0F1A2C] shadow-xs ring-1 ring-[#0F1A2C]"
                      : "bg-white border-[#e2e5e5] hover:border-[#cbd5e1] hover:bg-[#fafbfc]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <strong className="text-xs font-bold text-[#183249] truncate">
                          {tradie.name}
                        </strong>
                        {tradie.unreadCount ? (
                          <span className="w-2 h-2 rounded-full bg-[#C59B27]" />
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
                    <span className="text-[#28715e] font-medium truncate flex items-center gap-1.5">
                      <svg className="w-3 h-3 text-[#28715e] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{tradie.property.split(",")[0]}</span>
                    </span>
                    <span className="text-[#8a9bb0]">{tradie.lastActive}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Right Column: Details & Conversation (7 cols) ──────────────── */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Profile Header */}
          <div className="bg-white border border-[#e2e5e5] rounded-2xl p-4 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0F1A2C] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {selectedTradie.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-bold text-[#183249]">
                      {selectedTradie.name}
                    </h2>
                    <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full border ${selectedTradie.statusColor}`}>
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
                  className="px-2.5 py-1.5 bg-[#F9F8F5] hover:bg-[#e8edf2] text-[#183249] rounded-lg font-semibold transition-colors border border-[#e2e5e5] flex items-center gap-1.5 text-[11px]"
                >
                  <svg className="w-3 h-3 text-[#183249] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{selectedTradie.phone}</span>
                </a>
              </div>
            </div>

            {/* Site tag */}
            <div className="mt-3 pt-2.5 border-t border-[#e2e5e5] flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-[#64727e]">Site:</span>
                <span className="font-semibold text-[#183249] bg-[#f0f4f8] px-2 py-0.5 rounded-md text-[11px]">
                  {selectedTradie.property.split(",")[0]} ({selectedTradie.client})
                </span>
              </div>
              <Link
                href="/pro/digital-key"
                className="text-xs font-semibold text-[#0F1A2C] hover:underline flex items-center gap-1"
              >
                <span>Handover Pack</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Compliance Certificate Box */}
          <div
            className={`rounded-2xl p-3.5 border transition-all ${
              selectedTradie.status === "pending_cert"
                ? "bg-[#fffaf0] border-[#fce3b8] shadow-2xs"
                : "bg-[#f4fbf7] border-[#c7e3d1] shadow-2xs"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                      selectedTradie.status === "pending_cert"
                        ? "bg-[#C59B27] text-[#0F1A2C]"
                        : "bg-[#28715e] text-white"
                    }`}
                  >
                    {selectedTradie.status === "pending_cert" ? "Required" : "Verified"}
                  </span>
                  <span className="text-xs font-bold text-[#183249]">
                    {selectedTradie.requiredCert}
                  </span>
                </div>
                <p className="text-[11px] text-[#5b6e84]">
                  {selectedTradie.status === "pending_cert"
                    ? `Upload link sent to ${selectedTradie.name.split(" ")[0]} · Awaiting file`
                    : `Verified under ${selectedTradie.license}`}
                </p>
              </div>

              {selectedTradie.status === "pending_cert" ? (
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={handleResendSmsLink}
                    className="px-2.5 py-1.5 bg-white border border-[#cbd5e2] hover:bg-[#F9F8F5] text-[#183249] rounded-xl text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
                  >
                    Resend SMS Link
                  </button>
                  <button
                    onClick={handleUploadOnBehalf}
                    className="px-2.5 py-1.5 bg-[#0F1A2C] hover:bg-[#1c3a54] text-white rounded-xl text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
                  >
                    Upload File
                  </button>
                </div>
              ) : (
                <div className="px-2.5 py-1 bg-[#28715e] text-white rounded-xl text-[11px] font-semibold flex items-center gap-1.5">
                  <svg className="w-3 h-3 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Handover Ready</span>
                </div>
              )}
            </div>
          </div>

          {/* ── Conversation Card ─────────────────────────────────────────── */}
          {!isChatOpen ? (
            <div className="bg-white border border-[#e2e5e5] rounded-2xl p-4 shadow-2xs flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-[#28715e] flex-shrink-0" />
                <span className="text-xs font-bold text-[#183249]">Conversation</span>
                <span className="text-[11px] text-[#5b6e84] truncate">· {selectedTradie.name}</span>
                <span className="text-[11px] text-[#8a9bb0]">({activeChat.length} messages)</span>
              </div>

              <button
                type="button"
                onClick={() => setIsChatOpen(true)}
                className="px-3.5 py-1.5 bg-[#0F1A2C] hover:bg-[#1c3a54] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors flex-shrink-0"
              >
                <span>Open Chat</span>
                <span>▾</span>
              </button>
            </div>
          ) : (
            <div className="bg-white border border-[#e2e5e5] rounded-2xl shadow-2xs overflow-hidden transition-all">
              {/* Header */}
              <div className="px-4 py-3 bg-[#fafbfc] border-b border-[#e2e5e5] flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-[#28715e] flex-shrink-0" />
                  <span className="text-xs font-bold text-[#183249] truncate">
                    Conversation
                  </span>
                  <span className="text-[11px] text-[#8a9bb0] truncate">
                    · {selectedTradie.name}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsChatOpen(false)}
                  className="px-2.5 py-1 bg-white border border-[#cbd5e2] hover:bg-[#F9F8F5] text-[#5b6e84] hover:text-[#183249] rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Minimize</span>
                  <span className="text-[9px]">▲</span>
                </button>
              </div>

              {/* Collapsible Chat Body */}
              <div className="flex flex-col h-[400px]">
                {/* Message Feed */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-white">
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
                            ? "bg-[#0F1A2C] text-white rounded-tr-none shadow-xs"
                            : "bg-[#F9F8F5] text-[#183249] rounded-tl-none border border-[#e2e5e5]"
                        }`}
                      >
                        <p>{msg.text}</p>

                        {/* Attachment Preview */}
                        {msg.attachment && (
                          <div className="mt-2 pt-2 border-t border-white/20 flex items-center justify-between gap-3 bg-black/10 rounded-lg p-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center flex-shrink-0">
                                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              </div>
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
                              className="px-2 py-1 bg-white/20 hover:bg-white/30 text-[10px] font-bold rounded cursor-pointer"
                            >
                              View
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="p-3 bg-white border-t border-[#e2e5e5] flex items-center gap-2"
                >
                  <button
                    type="button"
                    onClick={handleUploadOnBehalf}
                    title="Attach File"
                    className="p-2 text-[#5b6e84] hover:text-[#0F1A2C] hover:bg-[#F9F8F5] rounded-lg transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-[#5b6e84]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={`Message ${selectedTradie.name.split(" ")[0]}...`}
                    className="flex-1 px-3 py-2 bg-[#F9F8F5] border border-[#e2e5e5] rounded-xl text-xs text-[#183249] placeholder-[#8a9bb0] focus:outline-none focus:border-[#0F1A2C]"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim()}
                    className="px-3.5 py-2 bg-[#0F1A2C] hover:bg-[#1c3a54] disabled:opacity-40 text-white rounded-xl text-xs font-semibold transition-colors shadow-xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>Send</span>
                    <span>→</span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Modal: Invite Tradie ────────────────────────────────────────── */}
      {inviteModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-[#e2e5e5] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#e2e5e5]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#28715e]">
                  Onboarding
                </span>
                <h3 className="text-lg font-bold text-[#183249]">
                  Invite Tradie
                </h3>
              </div>
              <button
                onClick={() => setInviteModalOpen(false)}
                className="w-7 h-7 rounded-full bg-[#F9F8F5] text-[#5b6e84] hover:bg-[#e2eaf4] flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleInviteTradieSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-[#183249] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={newTradieName}
                  onChange={(e) => setNewTradieName(e.target.value)}
                  placeholder="e.g. Lachlan Vance"
                  className="w-full px-3 py-2 bg-[#F9F8F5] border border-[#e2e5e5] rounded-lg text-xs text-[#183249] focus:outline-none focus:border-[#0F1A2C]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#183249] mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  value={newTradieBusiness}
                  onChange={(e) => setNewTradieBusiness(e.target.value)}
                  placeholder="e.g. Vance Electrical"
                  className="w-full px-3 py-2 bg-[#F9F8F5] border border-[#e2e5e5] rounded-lg text-xs text-[#183249] focus:outline-none focus:border-[#0F1A2C]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#183249] mb-1">
                    Trade *
                  </label>
                  <select
                    value={newTradieTrade}
                    onChange={(e) => setNewTradieTrade(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F9F8F5] border border-[#e2e5e5] rounded-lg text-xs text-[#183249] focus:outline-none focus:border-[#0F1A2C]"
                  >
                    <option value="Licensed Electrician">Licensed Electrician</option>
                    <option value="Licensed Plumber & Drainer">Licensed Plumber & Drainer</option>
                    <option value="Waterproofer & Tiler">Waterproofer & Tiler</option>
                    <option value="Termite & Pest Specialist">Termite Specialist</option>
                    <option value="Structural Engineer (RPEQ)">Structural Engineer</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#183249] mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newTradiePhone}
                    onChange={(e) => setNewTradiePhone(e.target.value)}
                    placeholder="+61 412 000 000"
                    className="w-full px-3 py-2 bg-[#F9F8F5] border border-[#e2e5e5] rounded-lg text-xs text-[#183249] focus:outline-none focus:border-[#0F1A2C]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#183249] mb-1">
                  Job Site
                </label>
                <select
                  value={newTradieProperty}
                  onChange={(e) => setNewTradieProperty(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F9F8F5] border border-[#e2e5e5] rounded-lg text-xs text-[#183249] focus:outline-none focus:border-[#0F1A2C]"
                >
                  <option value="18 Banksia Crescent, Kenmore">18 Banksia Crescent, Kenmore (Alex & Emily)</option>
                  <option value="7 Cedar Street, Graceville">7 Cedar Street, Graceville (Sofia Nguyen)</option>
                  <option value="7 Fig Tree Pocket Road">7 Fig Tree Pocket Road (Thomas Murray)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#183249] mb-1">
                  Required Certificate
                </label>
                <input
                  type="text"
                  value={newTradieCert}
                  onChange={(e) => setNewTradieCert(e.target.value)}
                  placeholder="e.g. Electrical Safety Certificate Form 16"
                  className="w-full px-3 py-2 bg-[#F9F8F5] border border-[#e2e5e5] rounded-lg text-xs text-[#183249] focus:outline-none focus:border-[#0F1A2C]"
                />
              </div>

              <div className="bg-[#f0f9f4] border border-[#c7e3d1] rounded-xl p-3 text-[11px] text-[#28715e]">
                An SMS link will be sent to their mobile for certificate uploads without login.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setInviteModalOpen(false)}
                  className="px-4 py-2 bg-white border border-[#cbd5e2] text-[#5b6e84] rounded-xl text-xs font-semibold hover:bg-[#F9F8F5] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0F1A2C] hover:bg-[#1c3a54] text-white rounded-xl text-xs font-bold cursor-pointer shadow-xs"
                >
                  Send Invite
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* ── Modal: Request Cert ─────────────────────────────────────────── */}
      {requestCertModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-[#e2e5e5] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#e2e5e5]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#28715e]">
                  Compliance
                </span>
                <h3 className="text-lg font-bold text-[#183249]">
                  Request Certificate
                </h3>
              </div>
              <button
                onClick={() => setRequestCertModalOpen(false)}
                className="w-7 h-7 rounded-full bg-[#F9F8F5] text-[#5b6e84] hover:bg-[#e2eaf4] flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#183249] mb-1">
                  Subcontractor
                </label>
                <select
                  value={selectedTradie.id}
                  onChange={(e) => setSelectedTradieId(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F9F8F5] border border-[#e2e5e5] rounded-lg text-xs text-[#183249]"
                >
                  {tradies.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.trade}) — {t.property.split(",")[0]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#183249] mb-1">
                  Certificate Type
                </label>
                <select className="w-full px-3 py-2 bg-[#F9F8F5] border border-[#e2e5e5] rounded-lg text-xs text-[#183249]">
                  <option>QBCC Form 16 - Electrical Safety Certificate</option>
                  <option>QBCC Form 43 - Wet Area Waterproofing Certificate</option>
                  <option>AS 3660.1 - Termite Management Notice</option>
                  <option>Form 43 - Drainage &amp; Sanitary Rough-in</option>
                </select>
              </div>

              <div className="p-3 bg-[#fffaf0] border border-[#fce3b8] rounded-xl text-[11px] text-[#946315]">
                An SMS reminder with a direct upload link will be sent to the subcontractor.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRequestCertModalOpen(false)}
                  className="px-4 py-2 bg-white border border-[#cbd5e2] text-[#5b6e84] rounded-xl text-xs font-semibold hover:bg-[#F9F8F5] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRequestCertModalOpen(false);
                    handleResendSmsLink();
                  }}
                  className="px-4 py-2 bg-[#0F1A2C] hover:bg-[#1c3a54] text-white rounded-xl text-xs font-bold cursor-pointer shadow-xs"
                >
                  Send Request
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
