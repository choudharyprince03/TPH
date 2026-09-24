"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  PageTransition,
  FadeUp,
  StaggerGrid,
  StaggerItem,
  CardHover,
  CountUp,
} from "@/components/ui/motion";

interface TradeContact {
  id: string;
  name: string;
  business: string;
  trade: string;
  license: string;
  avatar: string;
  tone: "gold" | "blue" | "green" | "purple";
  property: string;
  propId: string;
  client: string;
  status: "Active" | "In Progress" | "Sign-Off Ready" | "Final Booked";
  statusColor: string;
  sharedDocsCount: number;
  unreadCount?: number;
  latestMessage: string;
  latestMessageTime: string;
}

interface TradeDocument {
  id: string;
  title: string;
  tradeName: string;
  tradeType: string;
  property: string;
  propId: string;
  size: string;
  date: string;
  status: "Verified" | "Draft Pending" | "Statutory Seal";
  statusColor: string;
}

interface ChatMessage {
  id: string;
  sender: string;
  isMe: boolean;
  avatar: string;
  time: string;
  text: string;
  attachment?: {
    title: string;
    size: string;
    type: string;
  };
}

const INITIAL_TRADIES: TradeContact[] = [
  {
    id: "trade-painter",
    name: "Marcus Finch",
    business: "Prime Finish Painting & Decorating",
    trade: "Painter & Decorator",
    license: "QBCC #118492",
    avatar: "painter",
    tone: "gold",
    property: "18 Banksia Crescent, Kenmore",
    propId: "TPH-KEN-018",
    client: "Alex & Emily",
    status: "In Progress",
    statusColor: "bg-[#fff4df] text-[#8b641c] border-[#fce3b8]",
    sharedDocsCount: 3,
    unreadCount: 1,
    latestMessage: "Second coat completed in master suite, exterior eaves ready for inspection.",
    latestMessageTime: "Today 10:14 AM",
  },
  {
    id: "trade-electrician",
    name: "Dave Campbell",
    business: "Kenmore Electrical Services",
    trade: "Licensed Electrician",
    license: "QLD Electrical #78192",
    avatar: "electrician",
    tone: "blue",
    property: "18 Banksia Crescent, Kenmore",
    propId: "TPH-KEN-018",
    client: "Alex & Emily",
    status: "Sign-Off Ready",
    statusColor: "bg-[#eaf5ef] text-[#24754c] border-[#c7e3d1]",
    sharedDocsCount: 3,
    latestMessage: "Uploaded Form 4 and RCD safety test reports directly to this trade space.",
    latestMessageTime: "Yesterday 4:30 PM",
  },
  {
    id: "trade-certifier",
    name: "Brendan Kelly",
    business: "Apex Building Certifications",
    trade: "Private Building Certifier",
    license: "QBCC Certifier #A10982",
    avatar: "certifier",
    tone: "green",
    property: "18 Banksia Crescent, Kenmore",
    propId: "TPH-KEN-018",
    client: "Alex & Emily",
    status: "Final Booked",
    statusColor: "bg-[#f0f4f9] text-[#071d3b] border-[#cbd5e2]",
    sharedDocsCount: 2,
    latestMessage: "Final inspection confirmed for Thursday 9:30 AM with site foreman.",
    latestMessageTime: "22 Sep",
  },
  {
    id: "trade-plumber",
    name: "Pete Davies",
    business: "Southside Plumbing & Drainage",
    trade: "Licensed Plumber & Drainer",
    license: "QBCC #44912",
    avatar: "plumber",
    tone: "blue",
    property: "42 Riverview Terrace, Indooroopilly",
    propId: "TPH-IND-042",
    client: "Liam & Chloe Zhang",
    status: "Active",
    statusColor: "bg-[#eaf5ef] text-[#24754c] border-[#c7e3d1]",
    sharedDocsCount: 2,
    latestMessage: "Pressure testing complete at Riverview Terrace. All lines holding 1500 kPa.",
    latestMessageTime: "21 Sep",
  },
  {
    id: "trade-engineer",
    name: "Elena Rostova",
    business: "Rostova Structural Engineering",
    trade: "Structural Engineer",
    license: "RPEQ #18921",
    avatar: "engineer",
    tone: "purple",
    property: "7 Fig Tree Pocket Road",
    propId: "TPH-FIG-007",
    client: "Thomas Murray",
    status: "Active",
    statusColor: "bg-[#eaf5ef] text-[#24754c] border-[#c7e3d1]",
    sharedDocsCount: 2,
    latestMessage: "Form 16 Slab post-pour inspection certified and sealed to Prop ID.",
    latestMessageTime: "19 Sep",
  },
];

const INITIAL_DOCS: TradeDocument[] = [
  {
    id: "td-1",
    title: "QBCC Form 4 Certificate of Electrical Compliance.pdf",
    tradeName: "Dave Campbell (Kenmore Electrical)",
    tradeType: "Electrician",
    property: "18 Banksia Crescent, Kenmore",
    propId: "TPH-KEN-018",
    size: "1.4 MB",
    date: "Yesterday",
    status: "Verified",
    statusColor: "bg-[#eaf5ef] text-[#24754c]",
  },
  {
    id: "td-2",
    title: "Interior Paint Specification Schedule (Dulux Natural White).pdf",
    tradeName: "Marcus Finch (Prime Finish)",
    tradeType: "Painter",
    property: "18 Banksia Crescent, Kenmore",
    propId: "TPH-KEN-018",
    size: "1.8 MB",
    date: "Today 9:45 AM",
    status: "Verified",
    statusColor: "bg-[#eaf5ef] text-[#24754c]",
  },
  {
    id: "td-3",
    title: "External Eaves & Facade Color Palette Signoff.pdf",
    tradeName: "Hart Homes (Builder) + Prime Finish",
    tradeType: "Shared Signoff",
    property: "18 Banksia Crescent, Kenmore",
    propId: "TPH-KEN-018",
    size: "2.4 MB",
    date: "22 Sep",
    status: "Statutory Seal",
    statusColor: "bg-[#071d3b] text-white",
  },
  {
    id: "td-4",
    title: "Form 43 Drainage Rough-In Inspection Certificate.pdf",
    tradeName: "Pete Davies (Southside Plumbing)",
    tradeType: "Plumber",
    property: "42 Riverview Terrace, Indooroopilly",
    propId: "TPH-IND-042",
    size: "1.1 MB",
    date: "21 Sep",
    status: "Verified",
    statusColor: "bg-[#eaf5ef] text-[#24754c]",
  },
  {
    id: "td-5",
    title: "Form 21 Final Certificate of Classification (Draft).pdf",
    tradeName: "Brendan Kelly (Apex Certifications)",
    tradeType: "Certifier",
    property: "18 Banksia Crescent, Kenmore",
    propId: "TPH-KEN-018",
    size: "2.8 MB",
    date: "20 Sep",
    status: "Draft Pending",
    statusColor: "bg-[#fff4df] text-[#8b641c]",
  },
  {
    id: "td-6",
    title: "Form 16 Slab Post-Pour Inspection Signoff.pdf",
    tradeName: "Elena Rostova (Rostova Structural)",
    tradeType: "Engineer",
    property: "7 Fig Tree Pocket Road",
    propId: "TPH-FIG-007",
    size: "1.9 MB",
    date: "19 Sep",
    status: "Statutory Seal",
    statusColor: "bg-[#071d3b] text-white",
  },
];

const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  "trade-painter": [
    {
      id: "m-p1",
      sender: "Marcus Finch (Prime Finish)",
      isMe: false,
      avatar: "painter",
      time: "Today 8:30 AM",
      text: "Morning Olivia. Finished undercoat and first coat on ceilings in the master suite and living room at 18 Banksia Crescent.",
    },
    {
      id: "m-p2",
      sender: "Hart Homes (You)",
      isMe: true,
      avatar: "builder",
      time: "Today 9:15 AM",
      text: "Looks great Marcus. The client (Alex) asked to double-check whether Dulux Natural White low-sheen is also going on hallway skirting or gloss enamel?",
    },
    {
      id: "m-p3",
      sender: "Marcus Finch (Prime Finish)",
      isMe: false,
      avatar: "painter",
      time: "Today 9:45 AM",
      text: "Attached the approved spec sheet to this trade link. Hallway trims are gloss enamel, walls are washable low-sheen. All on schedule for Friday sign-off.",
      attachment: {
        title: "Interior Paint Specification Schedule (Dulux Natural White).pdf",
        size: "1.8 MB",
        type: "Paint Spec Sheet",
      },
    },
    {
      id: "m-p4",
      sender: "Hart Homes (You)",
      isMe: true,
      avatar: "builder",
      time: "Today 10:02 AM",
      text: "Confirmed! I'll seal this document directly into the client's Prop ID handover vault.",
    },
  ],
  "trade-electrician": [
    {
      id: "m-e1",
      sender: "Dave Campbell (Kenmore Electrical)",
      isMe: false,
      avatar: "electrician",
      time: "Yesterday 2:15 PM",
      text: "Hey Olivia, Tesla Powerwall and main switchboard commission at 18 Banksia Crescent is 100% complete and tested.",
    },
    {
      id: "m-e2",
      sender: "Hart Homes (You)",
      isMe: true,
      avatar: "builder",
      time: "Yesterday 3:00 PM",
      text: "Great news Dave. Can you upload the QBCC Form 4 compliance cert so we can include it in Brendan's certifier pack?",
    },
    {
      id: "m-e3",
      sender: "Dave Campbell (Kenmore Electrical)",
      isMe: false,
      avatar: "electrician",
      time: "Yesterday 4:30 PM",
      text: "Uploaded Form 4 and RCD safety test reports directly to this trade space. Signed under Electrical Lic #78192.",
      attachment: {
        title: "QBCC Form 4 Certificate of Electrical Compliance.pdf",
        size: "1.4 MB",
        type: "Statutory Certificate",
      },
    },
  ],
  "trade-certifier": [
    {
      id: "m-c1",
      sender: "Brendan Kelly (Apex Certifications)",
      isMe: false,
      avatar: "certifier",
      time: "22 Sep 11:00 AM",
      text: "Olivia, received the electrical Form 4 from Dave. We have booked the final inspection for Thursday 9:30 AM with your site foreman.",
    },
    {
      id: "m-c2",
      sender: "Hart Homes (You)",
      isMe: true,
      avatar: "builder",
      time: "22 Sep 11:20 AM",
      text: "Thanks Brendan. Site supervisor will have keys and access ready. Once approved, we'll seal the Form 21 to the digital handover package.",
    },
  ],
};

const VERIFIED_TRADE_DIRECTORY = [
  {
    name: "Brisbane Architectural Glazing",
    trade: "Glazier & Window Fabricator",
    contact: "Ryan Miller",
    license: "QBCC #110921",
    suburbs: "Brisbane West / Kenmore / Indooroopilly",
    rating: "4.9 (34 projects)",
    avatar: "glazier",
  },
  {
    name: "HydroSeal Waterproofing QLD",
    trade: "Waterproofer (Form 43 Certified)",
    contact: "Sam Thorne",
    license: "QBCC #89124",
    suburbs: "Brisbane Metro & Western Suburbs",
    rating: "5.0 (52 projects)",
    avatar: "waterproofer",
  },
  {
    name: "Precision Timber Framing",
    trade: "Carpenter & Truss Specialist",
    contact: "Luke Harrison",
    license: "QBCC #145902",
    suburbs: "Kenmore / Brookfield / Chapel Hill",
    rating: "4.8 (29 projects)",
    avatar: "carpenter",
  },
  {
    name: "River City Tiling & Terrazzo",
    trade: "Wall & Floor Tiler",
    contact: "Marco Bellini",
    license: "QBCC #77218",
    suburbs: "All Brisbane Suburbs",
    rating: "4.9 (41 projects)",
    avatar: "tiler",
  },
];

function TradeAvatarIcon({ trade, className = "w-4 h-4" }: { trade?: string; className?: string }) {
  const t = (trade || "").toLowerCase();
  if (t.includes("paint")) {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    );
  }
  if (t.includes("electr") || t.includes("spark")) {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    );
  }
  if (t.includes("certif") || t.includes("inspect")) {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    );
  }
  if (t.includes("plumb") || t.includes("drain")) {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      </svg>
    );
  }
  if (t.includes("engine") || t.includes("struct")) {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    );
  }
  if (t.includes("waterproof")) {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    );
  }
  if (t.includes("carpenter") || t.includes("timber") || t.includes("fram")) {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    );
  }
  if (t.includes("til") || t.includes("brick") || t.includes("terrazzo")) {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    );
  }
  if (t.includes("glaz") || t.includes("window")) {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18v18H3V3zm9 0v18M3 12h18" />
      </svg>
    );
  }
  if (t.includes("hart") || t.includes("you") || t.includes("builder")) {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    );
  }
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

export default function TradiePage() {
  const [activeTab, setActiveTab] = useState<"collaborations" | "chat" | "documents" | "directory">(
    "collaborations"
  );
  const [selectedPropertyFilter, setSelectedPropertyFilter] = useState("all");
  const [tradiesList, setTradiesList] = useState<TradeContact[]>(INITIAL_TRADIES);
  const [selectedTradieId, setSelectedTradieId] = useState("trade-painter");
  const [messagesMap, setMessagesMap] = useState<Record<string, ChatMessage[]>>(INITIAL_MESSAGES);
  const [chatInput, setChatInput] = useState("");
  const [docsList, setDocsList] = useState<TradeDocument[]>(INITIAL_DOCS);

  // Connect New Tradie Modal State
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [newTradeName, setNewTradeName] = useState("");
  const [newTradeBusiness, setNewTradeBusiness] = useState("");
  const [newTradeType, setNewTradeType] = useState("Painter");
  const [newTradeProperty, setNewTradeProperty] = useState("18 Banksia Crescent, Kenmore");
  const [newTradeLicense, setNewTradeLicense] = useState("");
  const [newTradeContact, setNewTradeContact] = useState("");

  // Upload Doc Simulation Modal State
  const [isUploadDocOpen, setIsUploadDocOpen] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState("");
  const [newDocTrade, setNewDocTrade] = useState("Marcus Finch (Prime Finish - Painter)");
  const [newDocProperty, setNewDocProperty] = useState("18 Banksia Crescent, Kenmore");

  const activeTradie =
    tradiesList.find((t) => t.id === selectedTradieId) || tradiesList[0];
  const activeMessages = messagesMap[selectedTradieId] || [];

  const filteredTradies = tradiesList.filter((t) => {
    if (selectedPropertyFilter === "all") return true;
    return t.property.includes(selectedPropertyFilter);
  });

  const filteredDocs = docsList.filter((d) => {
    if (selectedPropertyFilter === "all") return true;
    return d.property.includes(selectedPropertyFilter);
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "Hart Homes (You)",
      isMe: true,
      avatar: "builder",
      time: "Just now",
      text: chatInput.trim(),
    };

    setMessagesMap((prev) => ({
      ...prev,
      [selectedTradieId]: [...(prev[selectedTradieId] || []), newMsg],
    }));

    setChatInput("");
  };

  const handleAttachQuickDoc = () => {
    const docName =
      selectedTradieId === "trade-painter"
        ? "Dulux Wash&Wear 10L Warranty Certificate.pdf"
        : "Switchboard Earthing Test Certificate.pdf";

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "Hart Homes (You)",
      isMe: true,
      avatar: "builder",
      time: "Just now",
      text: `Attached project document for ${activeTradie.property}:`,
      attachment: {
        title: docName,
        size: "1.2 MB",
        type: "Project Specification",
      },
    };

    setMessagesMap((prev) => ({
      ...prev,
      [selectedTradieId]: [...(prev[selectedTradieId] || []), newMsg],
    }));
  };

  const handleConnectNewTradie = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTradeName || !newTradeBusiness) return;

    const newTradie: TradeContact = {
      id: `trade-${Date.now()}`,
      name: newTradeName,
      business: newTradeBusiness,
      trade: newTradeType,
      license: newTradeLicense || "QBCC Verified",
      avatar: newTradeType.toLowerCase().includes("paint")
        ? "painter"
        : newTradeType.toLowerCase().includes("elect")
        ? "electrician"
        : newTradeType.toLowerCase().includes("plumb")
        ? "plumber"
        : "trades",
      tone: "gold",
      property: newTradeProperty,
      propId: newTradeProperty.includes("Banksia")
        ? "TPH-KEN-018"
        : newTradeProperty.includes("Riverview")
        ? "TPH-IND-042"
        : "TPH-FIG-007",
      client: newTradeProperty.includes("Banksia") ? "Alex & Emily" : "Liam & Chloe Zhang",
      status: "Active",
      statusColor: "bg-[#eaf5ef] text-[#24754c] border-[#c7e3d1]",
      sharedDocsCount: 0,
      latestMessage: "Trade workspace created. Awaiting first document exchange.",
      latestMessageTime: "Just now",
    };

    setTradiesList([newTradie, ...tradiesList]);
    setSelectedTradieId(newTradie.id);
    setIsConnectModalOpen(false);
    setNewTradeName("");
    setNewTradeBusiness("");
    setNewTradeLicense("");
    setNewTradeContact("");
    setActiveTab("chat");
  };

  const handleUploadDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle) return;

    const newDoc: TradeDocument = {
      id: `doc-${Date.now()}`,
      title: newDocTitle.endsWith(".pdf") ? newDocTitle : `${newDocTitle}.pdf`,
      tradeName: newDocTrade,
      tradeType: newDocTrade.includes("Painter")
        ? "Painter"
        : newDocTrade.includes("Electrician")
        ? "Electrician"
        : "Trade Signoff",
      property: newDocProperty,
      propId: newDocProperty.includes("Banksia") ? "TPH-KEN-018" : "TPH-IND-042",
      size: "1.6 MB",
      date: "Just now",
      status: "Verified",
      statusColor: "bg-[#eaf5ef] text-[#24754c]",
    };

    setDocsList([newDoc, ...docsList]);
    setIsUploadDocOpen(false);
    setNewDocTitle("");
  };

  return (
    <PageTransition className="p-4 sm:p-6 lg:p-9 xl:p-11 max-w-[1320px] w-full font-sans">
      
      {/* ── Top Header ────────────────────────────────────────────────── */}
      <FadeUp className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[9px] font-bold uppercase tracking-[1.4px] text-[#24754c]">
              ProHub · Trade-to-Trade Network
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#24754c] animate-pulse" />
            <span className="text-[10px] font-semibold text-[#5b6e84]">
              Hart Homes (QBCC #150821)
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.8px] text-[#102645]">
            Tradie
          </h1>
          <p className="text-[13px] text-[#68788e] mt-1 max-w-2xl">
            Pro-to-Pro collaboration. Connect with trades, share site documents, certs, and project chat.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
          <button
            onClick={() => setIsConnectModalOpen(true)}
            className="px-4 py-2.5 bg-[#071d3b] hover:bg-[#102d59] text-white rounded-xl text-[12px] font-bold transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <span>+ Connect New Tradie</span>
          </button>
          <button
            onClick={() => setIsUploadDocOpen(true)}
            className="px-4 py-2.5 bg-white border border-[#cbd5e2] hover:bg-[#f3f6fb] text-[#102645] rounded-xl text-[12px] font-semibold transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 text-[#071d3b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Share Trade Doc</span>
          </button>
        </div>
      </FadeUp>

      {/* ── 4 Top Metrics Counters ────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        <div className="bg-white border border-[#dfe6ef] rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <CountUp value={tradiesList.length} className="text-3xl font-bold tracking-tight text-[#102645]" />
            <div className="w-8 h-8 rounded-lg bg-[#f0f4f9] text-[#071d3b] flex items-center justify-center">
              <svg className="w-4 h-4 text-[#071d3b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
          </div>
          <strong className="block text-[13px] text-[#102645]">Connected Tradies</strong>
          <small className="text-[11px] text-[#68788e]">Electrician, Painter, Plumber &amp; Certifiers</small>
        </div>

        <div className="bg-white border border-[#dfe6ef] rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <CountUp value={docsList.length} className="text-3xl font-bold tracking-tight text-[#24754c]" />
            <div className="w-8 h-8 rounded-lg bg-[#eaf5ef] text-[#24754c] flex items-center justify-center">
              <svg className="w-4 h-4 text-[#24754c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <strong className="block text-[13px] text-[#102645]">Shared Trade Docs</strong>
          <small className="text-[11px] text-[#68788e]">Form 4, Form 16, paint &amp; solar specs</small>
        </div>

        <div className="bg-white border border-[#dfe6ef] rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-3xl font-bold tracking-tight text-[#8b641c]">3</span>
            <div className="w-8 h-8 rounded-lg bg-[#fff4df] text-[#8b641c] flex items-center justify-center">
              <svg className="w-4 h-4 text-[#8b641c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <strong className="block text-[13px] text-[#102645]">Active Project Sites</strong>
          <small className="text-[11px] text-[#68788e]">Kenmore, Indooroopilly, Fig Tree Pocket</small>
        </div>

        <div className="bg-white border border-[#dfe6ef] rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-3xl font-bold tracking-tight text-[#071d3b]">100%</span>
            <div className="w-8 h-8 rounded-lg bg-[#f0f4f9] text-[#071d3b] flex items-center justify-center">
              <svg className="w-4 h-4 text-[#071d3b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
          <strong className="block text-[13px] text-[#102645]">Prop ID Integrated</strong>
          <small className="text-[11px] text-[#68788e]">Zero manual email attachments</small>
        </div>
      </div>

      {/* ── Main Dashboard Tabs Bar & Property Filter ────────────────── */}
      <div className="bg-white border border-[#dfe6ef] rounded-2xl p-3 sm:p-4 mb-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {[
            { id: "collaborations", label: "Active Collaborations", icon: (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            ), badge: `${tradiesList.length}` },
            { id: "chat", label: "Pro-to-Pro Chat", icon: (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            ), badge: "Live" },
            { id: "documents", label: "Trade Documents Register", icon: (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            ), badge: `${docsList.length}` },
            { id: "directory", label: "Find Vetted Tradies", icon: (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            ), badge: "QLD" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3.5 py-2 rounded-xl text-[12px] font-semibold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#071d3b] text-white shadow-sm"
                  : "text-[#5b6e84] hover:bg-[#f3f6fb] hover:text-[#102645]"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                  activeTab === tab.id ? "bg-white/20 text-white" : "bg-[#edf2f7] text-[#071d3b]"
                }`}
              >
                {tab.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Project Property Filter */}
        <div className="flex items-center gap-2 self-stretch md:self-auto">
          <span className="text-[11px] text-[#68788e] font-medium whitespace-nowrap hidden sm:inline">
            Project Site:
          </span>
          <select
            value={selectedPropertyFilter}
            onChange={(e) => setSelectedPropertyFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-1.5 bg-[#f4f6f8] border border-[#dfe6ef] rounded-lg text-[12px] text-[#102645] font-semibold focus:outline-none"
          >
            <option value="all">All Active Sites (3)</option>
            <option value="Kenmore">18 Banksia Crescent (Kenmore)</option>
            <option value="Indooroopilly">42 Riverview Terrace (Indooroopilly)</option>
            <option value="Fig Tree Pocket">7 Fig Tree Pocket Road</option>
          </select>
        </div>
      </div>

      {/* ── TAB 1: ACTIVE COLLABORATIONS ──────────────────────────────── */}
      {activeTab === "collaborations" && (
        <div className="space-y-6">
          <div className="bg-[#f0ede5] border border-[#e2dcd0] rounded-2xl p-4 sm:p-5 text-[12px] text-[#554b38] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <strong className="block text-[#102645] text-xs font-bold mb-0.5 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-[#071d3b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Tradie Workspace</span>
              </strong>
              <span>
                Loop in painters, sparkies &amp; certifiers. Shared plans, certificates, and chat seal to the client&apos;s Prop ID.
              </span>
            </div>
            <button
              onClick={() => setIsConnectModalOpen(true)}
              className="px-3.5 py-2 bg-[#071d3b] hover:bg-[#102d59] text-white rounded-lg text-[11px] font-bold whitespace-nowrap self-start sm:self-auto cursor-pointer"
            >
              + Invite Trade to Project
            </button>
          </div>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTradies.map((tradie) => (
              <StaggerItem key={tradie.id}>
                <CardHover className="h-full">
                  <div className="bg-white border border-[#dfe6ef] rounded-2xl p-5 shadow-2xs flex flex-col justify-between h-full">
                    <div>
                      {/* Top Header of Card */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#f4f6f8] border border-[#dfe6ef] flex items-center justify-center flex-shrink-0">
                            <TradeAvatarIcon trade={tradie.trade} className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-[14px] font-bold text-[#102645] leading-tight">
                              {tradie.name}
                            </h3>
                            <p className="text-[11px] text-[#24754c] font-semibold mt-0.5">
                              {tradie.trade}
                            </p>
                          </div>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${tradie.statusColor}`}>
                          {tradie.status}
                        </span>
                      </div>

                      <div className="text-[11px] text-[#68788e] mb-3">
                        <span className="font-semibold text-[#102645]">{tradie.business}</span> · {tradie.license}
                      </div>

                      {/* Property badge */}
                      <div className="p-2.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] mb-3">
                        <div className="text-[9px] font-bold uppercase tracking-wider text-[#68788e]">
                          Linked Client Property
                        </div>
                        <div className="text-[12px] font-semibold text-[#102645] truncate">
                          {tradie.property}
                        </div>
                        <div className="text-[10px] text-[#5b6e84] mt-0.5">
                          Client: {tradie.client} · <span className="font-mono text-[#071d3b]">{tradie.propId}</span>
                        </div>
                      </div>

                      {/* Latest chat snippet */}
                      <div className="text-[11px] text-[#4b5563] bg-[#fdfcf9] border border-[#f0ece1] rounded-lg p-2.5 mb-4 italic">
                        &quot;{tradie.latestMessage}&quot;
                        <span className="block not-italic text-[9px] text-[#9ca3af] mt-1 text-right">
                          {tradie.latestMessageTime}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="pt-3 border-t border-[#f0f4f8] flex items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          setSelectedTradieId(tradie.id);
                          setActiveTab("chat");
                        }}
                        className="px-3 py-1.5 bg-[#071d3b] hover:bg-[#102d59] text-white text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>Open Chat</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedPropertyFilter(tradie.property.includes("Kenmore") ? "Kenmore" : "all");
                          setActiveTab("documents");
                        }}
                        className="px-3 py-1.5 bg-[#f4f6f8] hover:bg-[#e4ecf7] text-[#071d3b] text-[11px] font-semibold rounded-lg transition-colors cursor-pointer"
                      >
                        {tradie.sharedDocsCount} Docs
                      </button>
                    </div>
                  </div>
                </CardHover>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      )}

      {/* ── TAB 2: PRO-TO-PRO CHAT & DOCUMENT EXCHANGE ─────────────────── */}
      {activeTab === "chat" && (
        <div className="bg-white border border-[#dfe6ef] rounded-2xl shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-[300px_1fr] min-h-[580px]">
          
          {/* Left Tradie Switcher List */}
          <div className="border-r border-[#dfe6ef] bg-[#fafbfc] flex flex-col">
            <div className="p-4 border-b border-[#dfe6ef]">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#68788e] mb-1">
                Connected Tradies ({tradiesList.length})
              </div>
              <p className="text-[10px] text-[#94a3b8]">
                Select a trade contact to view live conversation &amp; documents.
              </p>
            </div>

            <div className="divide-y divide-[#f0f4f8] overflow-y-auto flex-1">
              {tradiesList.map((t) => {
                const isSelected = t.id === selectedTradieId;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTradieId(t.id)}
                    className={`w-full text-left p-3.5 transition-colors flex items-start gap-3 cursor-pointer ${
                      isSelected ? "bg-white border-l-4 border-l-[#071d3b] shadow-2xs" : "hover:bg-[#f3f6fb]"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#f0f4f8] flex items-center justify-center flex-shrink-0">
                      <TradeAvatarIcon trade={t.trade} className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[12px] font-bold text-[#102645] truncate">
                          {t.name}
                        </span>
                        <span className="text-[9px] text-[#94a3b8] whitespace-nowrap">
                          {t.latestMessageTime.split(" ")[0]}
                        </span>
                      </div>
                      <div className="text-[10px] text-[#24754c] font-semibold truncate">
                        {t.trade}
                      </div>
                      <div className="text-[10px] text-[#64748b] truncate mt-0.5">
                        {t.property.split(",")[0]}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="p-3 border-t border-[#dfe6ef] bg-white">
              <button
                onClick={() => setIsConnectModalOpen(true)}
                className="w-full py-2 bg-[#f4f6f8] hover:bg-[#e4ecf7] text-[#071d3b] rounded-lg text-[11px] font-bold transition-colors text-center cursor-pointer"
              >
                + Connect Another Trade
              </button>
            </div>
          </div>

          {/* Right Live Chat Workspace */}
          <div className="flex flex-col h-[580px] bg-white">
            
            {/* Chat Top Banner with Property Context */}
            <div className="p-4 border-b border-[#dfe6ef] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#fdfcfb]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#eaf0f6] flex items-center justify-center flex-shrink-0">
                  <TradeAvatarIcon trade={activeTradie.trade} className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-[15px] font-bold text-[#102645]">
                      {activeTradie.name}
                    </h2>
                    <span className="text-[10px] font-semibold text-[#5b6e84]">
                      ({activeTradie.business})
                    </span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${activeTradie.statusColor}`}>
                      {activeTradie.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#68788e] flex items-center gap-2 mt-0.5">
                    <span>{activeTradie.license}</span>
                    <span>·</span>
                    <span className="font-semibold text-[#071d3b]">
                      {activeTradie.property}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleAttachQuickDoc}
                  className="px-3 py-1.5 bg-[#f4f6f8] hover:bg-[#e4ecf7] text-[#071d3b] rounded-lg text-[11px] font-semibold transition-colors cursor-pointer border border-[#cbd5e2]"
                  title="Simulate attaching a site plan or certificate"
                >
                  + Attach Site Doc
                </button>
              </div>
            </div>

            {/* Messages Thread Container */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#f8fafc]">
              <div className="text-center my-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#94a3b8] px-3 py-1 bg-white border border-[#e2e8f0] rounded-full">
                  Private Trade Workspace · {activeTradie.propId}
                </span>
              </div>

              {activeMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 max-w-[80%] ${
                    msg.isMe ? "ml-auto flex-row-reverse" : ""
                  }`}
                >
                  <div className="w-7 h-7 rounded-full bg-white border border-[#dfe6ef] flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <TradeAvatarIcon trade={msg.isMe ? "hart" : msg.sender} className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div
                      className={`p-3.5 rounded-2xl text-[12px] leading-relaxed shadow-2xs ${
                        msg.isMe
                          ? "bg-[#071d3b] text-white rounded-tr-none"
                          : "bg-white text-[#102645] border border-[#dfe6ef] rounded-tl-none"
                      }`}
                    >
                      <p>{msg.text}</p>

                      {/* Attachment Box if present */}
                      {msg.attachment && (
                        <div
                          className={`mt-2.5 p-2.5 rounded-xl border flex items-center gap-2.5 text-[11px] ${
                            msg.isMe
                              ? "bg-white/10 border-white/20 text-white"
                              : "bg-[#f4f6f8] border-[#cbd5e2] text-[#071d3b]"
                          }`}
                        >
                          <svg className="w-4 h-4 text-[#071d3b] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <div className="min-w-0 flex-1">
                            <strong className="block truncate font-semibold">
                              {msg.attachment.title}
                            </strong>
                            <span className="opacity-70 text-[10px]">
                              {msg.attachment.type} · {msg.attachment.size}
                            </span>
                          </div>
                          <span className="text-[10px] font-bold underline cursor-pointer">
                            View
                          </span>
                        </div>
                      )}
                    </div>
                    <div
                      className={`text-[9px] text-[#94a3b8] mt-1 ${
                        msg.isMe ? "text-right" : "text-left"
                      }`}
                    >
                      {msg.sender} · {msg.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input Field */}
            <form onSubmit={handleSendMessage} className="p-3.5 bg-white border-t border-[#dfe6ef] flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={`Send message to ${activeTradie.name} (${activeTradie.trade}) regarding ${activeTradie.property.split(",")[0]}...`}
                className="flex-1 px-4 py-2.5 bg-[#f4f6f8] border border-[#dfe6ef] rounded-xl text-[12px] text-[#102645] focus:outline-none focus:border-[#071d3b]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#071d3b] hover:bg-[#102d59] text-white font-bold rounded-xl text-[12px] transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Send</span>
                <span>→</span>
              </button>
            </form>

          </div>
        </div>
      )}

      {/* ── TAB 3: SHARED TRADE DOCUMENTS REGISTER ────────────────────── */}
      {activeTab === "documents" && (
        <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#dfe6ef] mb-5 gap-3">
            <div>
              <h2 className="text-base font-bold text-[#102645]">
                Cross-Trade Statutory &amp; Specification Documents
              </h2>
              <p className="text-[11px] text-[#68788e]">
                Documents exchanged between Hart Homes, painters, sparkies, certifiers, and plumbers.
              </p>
            </div>
            <button
              onClick={() => setIsUploadDocOpen(true)}
              className="px-3.5 py-2 bg-[#071d3b] hover:bg-[#102d59] text-white rounded-lg text-[11px] font-bold transition-colors cursor-pointer self-start sm:self-auto"
            >
              + Upload &amp; Share Trade Doc
            </button>
          </div>

          <div className="divide-y divide-[#f0f4f8] text-[12px]">
            {filteredDocs.map((doc) => (
              <div key={doc.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#fbfcfd] p-2 rounded-xl transition-colors">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#f0f4f9] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-[#071d3b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <strong className="block text-[#102645] font-semibold text-[13px] truncate">
                      {doc.title}
                    </strong>
                    <div className="text-[11px] text-[#68788e] flex items-center gap-2 flex-wrap mt-0.5">
                      <span>Source: <strong className="text-[#071d3b]">{doc.tradeName}</strong></span>
                      <span>·</span>
                      <span>Site: {doc.property.split(",")[0]} (<span className="font-mono text-[#071d3b]">{doc.propId}</span>)</span>
                      <span>·</span>
                      <span>{doc.size}</span>
                      <span>·</span>
                      <span>{doc.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 flex-shrink-0 self-end sm:self-auto">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${doc.statusColor}`}>
                    {doc.status}
                  </span>
                  <button
                    onClick={() => alert(`Viewing document: ${doc.title}`)}
                    className="px-3 py-1.5 bg-[#f4f6f8] hover:bg-[#e4ecf7] text-[#071d3b] font-bold rounded-lg text-[11px] transition-colors cursor-pointer"
                  >
                    View / Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 4: FIND & CONNECT TRADIES DIRECTORY ────────────────────── */}
      {activeTab === "directory" && (
        <div className="space-y-6">
          <div className="bg-[#eaf5ef] border border-[#c7e3d1] rounded-2xl p-4 sm:p-5 text-[12px] text-[#2d6143]">
            <strong className="block text-[#1b4e31] text-[13px] font-bold mb-0.5">
              Verified Trade Subcontractors
            </strong>
            <span>
              All listed contractors hold active QBCC or statutory licences. Connect them to client properties with one click.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {VERIFIED_TRADE_DIRECTORY.map((trade, idx) => (
              <div key={idx} className="bg-white border border-[#dfe6ef] rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#f4f6f8] border border-[#dfe6ef] flex items-center justify-center flex-shrink-0">
                        <TradeAvatarIcon trade={trade.trade} className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-[14px] font-bold text-[#102645]">
                          {trade.name}
                        </h3>
                        <p className="text-[11px] text-[#24754c] font-semibold">
                          {trade.trade}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-[#8b641c] bg-[#fff4df] px-2 py-0.5 rounded">
                      {trade.rating}
                    </span>
                  </div>

                  <div className="text-[11px] text-[#68788e] space-y-1 mb-4 pt-2 border-t border-[#f0f4f8]">
                    <div>Lead Specialist: <strong className="text-[#102645]">{trade.contact}</strong> · {trade.license}</div>
                    <div>Service Area: {trade.suburbs}</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#f0f4f8] flex items-center justify-between">
                  <span className="text-[10px] text-[#24754c] font-bold">QBCC Licence Active</span>
                  <button
                    onClick={() => {
                      setNewTradeName(trade.contact);
                      setNewTradeBusiness(trade.name);
                      setNewTradeType(trade.trade);
                      setNewTradeLicense(trade.license);
                      setIsConnectModalOpen(true);
                    }}
                    className="px-3.5 py-1.5 bg-[#071d3b] hover:bg-[#102d59] text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    + Connect to Property
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MODAL: CONNECT NEW TRADIE ─────────────────────────────────── */}
      <AnimatePresence>
        {isConnectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsConnectModalOpen(false)}
              className="fixed inset-0 bg-[#071d3b]/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 14 }}
              className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-[#dfe6ef] overflow-hidden z-10 font-sans my-8"
            >
              <div className="bg-[#071d3b] text-white p-6 relative">
                <button
                  onClick={() => setIsConnectModalOpen(false)}
                  className="absolute top-5 right-5 text-white/60 hover:text-white cursor-pointer p-1 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-[#efbd66] mb-1.5">
                  <svg className="w-3.5 h-3.5 text-[#efbd66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                  <span>New Subcontractor / Trade Connection</span>
                </div>
                <h3 className="text-xl font-bold">Connect a Tradie to a Project</h3>
                <p className="text-[12px] text-[#b9c8db] mt-1">
                  Connect your painter, electrician, certifier, or plumber to an active client property.
                </p>
              </div>

              <form onSubmit={handleConnectNewTradie} className="p-6 space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#68788e] mb-1">
                    Trade / Business Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newTradeBusiness}
                    onChange={(e) => setNewTradeBusiness(e.target.value)}
                    placeholder="e.g. Swift Painting Services Pty Ltd"
                    className="w-full px-3.5 py-2.5 bg-[#fcfbf8] border border-[#dfe6ef] rounded-xl text-[12px] text-[#102645] focus:outline-none focus:border-[#071d3b]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#68788e] mb-1">
                      Lead Tradie Name
                    </label>
                    <input
                      type="text"
                      required
                      value={newTradeName}
                      onChange={(e) => setNewTradeName(e.target.value)}
                      placeholder="e.g. Aaron Swift"
                      className="w-full px-3.5 py-2.5 bg-[#fcfbf8] border border-[#dfe6ef] rounded-xl text-[12px] text-[#102645] focus:outline-none focus:border-[#071d3b]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#68788e] mb-1">
                      Trade Discipline
                    </label>
                    <select
                      value={newTradeType}
                      onChange={(e) => setNewTradeType(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#fcfbf8] border border-[#dfe6ef] rounded-xl text-[12px] text-[#102645] focus:outline-none focus:border-[#071d3b]"
                    >
                      <option value="Painter & Decorator">Painter &amp; Decorator</option>
                      <option value="Licensed Electrician">Licensed Electrician</option>
                      <option value="Licensed Plumber">Licensed Plumber</option>
                      <option value="Building Certifier">Building Certifier</option>
                      <option value="Structural Engineer">Structural Engineer</option>
                      <option value="Glazier / Windows">Glazier / Windows</option>
                      <option value="Waterproofer">Waterproofer (Form 43)</option>
                      <option value="Tiler">Floor &amp; Wall Tiler</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#68788e] mb-1">
                    Assign to Client Project
                  </label>
                  <select
                    value={newTradeProperty}
                    onChange={(e) => setNewTradeProperty(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#fcfbf8] border border-[#dfe6ef] rounded-xl text-[12px] text-[#102645] focus:outline-none focus:border-[#071d3b]"
                  >
                    <option value="18 Banksia Crescent, Kenmore">18 Banksia Crescent, Kenmore (Alex &amp; Emily)</option>
                    <option value="42 Riverview Terrace, Indooroopilly">42 Riverview Terrace, Indooroopilly (Liam &amp; Chloe)</option>
                    <option value="7 Fig Tree Pocket Road">7 Fig Tree Pocket Road (Thomas Murray)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#68788e] mb-1">
                      QBCC or License #
                    </label>
                    <input
                      type="text"
                      value={newTradeLicense}
                      onChange={(e) => setNewTradeLicense(e.target.value)}
                      placeholder="e.g. QBCC #158291"
                      className="w-full px-3.5 py-2.5 bg-[#fcfbf8] border border-[#dfe6ef] rounded-xl text-[12px] text-[#102645] focus:outline-none focus:border-[#071d3b]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#68788e] mb-1">
                      Email or Mobile
                    </label>
                    <input
                      type="text"
                      value={newTradeContact}
                      onChange={(e) => setNewTradeContact(e.target.value)}
                      placeholder="e.g. aaron@swiftpainting.com.au"
                      className="w-full px-3.5 py-2.5 bg-[#fcfbf8] border border-[#dfe6ef] rounded-xl text-[12px] text-[#102645] focus:outline-none focus:border-[#071d3b]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsConnectModalOpen(false)}
                    className="px-4 py-2 text-[12px] text-[#68788e] hover:text-[#102645] font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#071d3b] hover:bg-[#102d59] text-white text-[12px] font-bold rounded-xl transition-colors shadow-sm cursor-pointer"
                  >
                    Connect &amp; Open Chat →
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── MODAL: UPLOAD TRADE DOC ───────────────────────────────────── */}
      <AnimatePresence>
        {isUploadDocOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsUploadDocOpen(false)}
              className="fixed inset-0 bg-[#071d3b]/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 14 }}
              className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-[#dfe6ef] overflow-hidden z-10 font-sans my-8"
            >
              <div className="bg-[#071d3b] text-white p-6 relative">
                <button
                  onClick={() => setIsUploadDocOpen(false)}
                  className="absolute top-5 right-5 text-white/60 hover:text-white cursor-pointer p-1 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <h3 className="text-xl font-bold">Share Trade Document</h3>
                <p className="text-[12px] text-[#b9c8db] mt-1">
                  Upload a trade specification, inspection signoff, or Form 16/43 cert into the project workspace.
                </p>
              </div>

              <form onSubmit={handleUploadDoc} className="p-6 space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#68788e] mb-1">
                    Document Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newDocTitle}
                    onChange={(e) => setNewDocTitle(e.target.value)}
                    placeholder="e.g. Paint Touch-Up & Defect Protocol.pdf"
                    className="w-full px-3.5 py-2.5 bg-[#fcfbf8] border border-[#dfe6ef] rounded-xl text-[12px] text-[#102645] focus:outline-none focus:border-[#071d3b]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#68788e] mb-1">
                    Originating Trade
                  </label>
                  <select
                    value={newDocTrade}
                    onChange={(e) => setNewDocTrade(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#fcfbf8] border border-[#dfe6ef] rounded-xl text-[12px] text-[#102645] focus:outline-none focus:border-[#071d3b]"
                  >
                    <option value="Marcus Finch (Prime Finish - Painter)">Marcus Finch (Prime Finish - Painter)</option>
                    <option value="Dave Campbell (Kenmore Electrical)">Dave Campbell (Kenmore Electrical)</option>
                    <option value="Pete Davies (Southside Plumbing)">Pete Davies (Southside Plumbing)</option>
                    <option value="Brendan Kelly (Apex Certifications)">Brendan Kelly (Apex Certifications)</option>
                    <option value="Hart Homes (Master Builder)">Hart Homes (Master Builder)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#68788e] mb-1">
                    Target Property
                  </label>
                  <select
                    value={newDocProperty}
                    onChange={(e) => setNewDocProperty(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#fcfbf8] border border-[#dfe6ef] rounded-xl text-[12px] text-[#102645] focus:outline-none focus:border-[#071d3b]"
                  >
                    <option value="18 Banksia Crescent, Kenmore">18 Banksia Crescent, Kenmore (TPH-KEN-018)</option>
                    <option value="42 Riverview Terrace, Indooroopilly">42 Riverview Terrace, Indooroopilly (TPH-IND-042)</option>
                    <option value="7 Fig Tree Pocket Road">7 Fig Tree Pocket Road (TPH-FIG-007)</option>
                  </select>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsUploadDocOpen(false)}
                    className="px-4 py-2 text-[12px] text-[#68788e] hover:text-[#102645] font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#071d3b] hover:bg-[#102d59] text-white text-[12px] font-bold rounded-xl transition-colors shadow-sm cursor-pointer"
                  >
                    Upload &amp; Attach →
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </PageTransition>
  );
}
