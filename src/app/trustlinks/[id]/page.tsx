"use client";
import Link from "next/link";
import React, { use, useState } from "react";
import { PropertyPulseNotification } from "@/components/features/PropertyPulse";

interface TrustLinkData {
  id: string;
  propId: string;
  propNum: string;
  property: string;
  suburb: string;
  proName: string;
  proRole: string;
  proBusiness: string;
  proLicence: string;
  proAvatar: string;
  avatarTone: "blue" | "green" | "sand";
  purpose: string;
  note: string;
  status: "active" | "pending" | "paused" | "ended";
  statusLabel: string;
  channel: string;
  expiry: string;
  addressShared: boolean;
  permissionVersion: number;
}

const TRUSTLINK_DATA_MAP: Record<string, TrustLinkData> = {
  welcome: {
    id: "welcome",
    propId: "TPH-KEN-018",
    propNum: "018",
    property: "18 Banksia Crescent",
    suburb: "Kenmore QLD 4069",
    proName: "Olivia Hart",
    proRole: "Builder & handover contact",
    proBusiness: "Hart Homes · Example business",
    proLicence: "QBCC #150821",
    proAvatar: "OH",
    avatarTone: "blue",
    purpose: "New home handover",
    note: "Please keep the handover documents and my questions together here.",
    status: "active",
    statusLabel: "Active",
    channel: "In-app messages",
    expiry: "21 Oct 2026",
    addressShared: true,
    permissionVersion: 1,
  },
  "TL-99214-B": {
    id: "TL-99214-B",
    propId: "TPH-KEN-018",
    propNum: "018",
    property: "18 Banksia Crescent",
    suburb: "Kenmore QLD 4069",
    proName: "Banksia Homes Pty Ltd",
    proRole: "Licensed Custom Builder (MBA Accredited)",
    proBusiness: "Banksia Homes Pty Ltd",
    proLicence: "QBCC #150821",
    proAvatar: "BH",
    avatarTone: "blue",
    purpose: "Practical Completion & Digital Handover Package",
    note: "Practical completion walkthrough and digital handover package sign-off.",
    status: "active",
    statusLabel: "Active",
    channel: "In-app messages",
    expiry: "21 Oct 2026",
    addressShared: true,
    permissionVersion: 1,
  },
  "TL-88301-A": {
    id: "TL-88301-A",
    propId: "TPH-KEN-018",
    propNum: "018",
    property: "18 Banksia Crescent",
    suburb: "Kenmore QLD 4069",
    proName: "Lachlan Vance",
    proRole: "Licensed Conveyancer",
    proBusiness: "River City Conveyancing",
    proLicence: "QLD Law Society #88219",
    proAvatar: "LV",
    avatarTone: "green",
    purpose: "Settlement Contract & PEXA Workspace",
    note: "Title transfer statement, council rate adjustments, water meter readings.",
    status: "active",
    statusLabel: "Active",
    channel: "In-app messages + email",
    expiry: "05 Nov 2026",
    addressShared: true,
    permissionVersion: 1,
  },
  "TL-76100-C": {
    id: "TL-76100-C",
    propId: "TPH-TOW-029",
    propNum: "029",
    property: "7 Cedar Street",
    suburb: "Graceville QLD 4075",
    proName: "Claire Dupont",
    proRole: "Lead Building & Timber Pest Inspector",
    proBusiness: "Dupont Property Inspections",
    proLicence: "QBCC #1089201",
    proAvatar: "CD",
    avatarTone: "sand",
    purpose: "Pre-Purchase AS 4349.1 Inspection Review",
    note: "Pre-purchase diagnostic review before auction.",
    status: "pending",
    statusLabel: "Awaiting reply",
    channel: "In-app messages",
    expiry: "05 Oct 2026",
    addressShared: true,
    permissionVersion: 1,
  },
};

interface MessageItem {
  id: string;
  sender: string;
  avatar: string;
  isMe: boolean;
  time: string;
  text: string;
}

export default function TrustLinkDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const initialData = TRUSTLINK_DATA_MAP[id] ?? TRUSTLINK_DATA_MAP["welcome"];

  const [data, setData] = useState<TrustLinkData>(initialData);
  const [activeTab, setActiveTab] = useState<"overview" | "conversation" | "documents" | "permissions" | "activity" | "handover">("overview");
  const [paused, setPaused] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showStopModal, setShowStopModal] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [variationSigned, setVariationSigned] = useState(false);
  const [handoverSealed, setHandoverSealed] = useState(false);

  // Messages state
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: "m-1",
      sender: `${data.proName}`,
      avatar: data.proAvatar,
      isMe: false,
      time: "Sample message",
      text: "Your sample handover pack is ready to review. You can check each section and record receipt when you are ready.",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  // Shared docs state
  const [docs, setDocs] = useState([
    { id: "d1", name: "Appliance care guide", category: "Warranties", shared: true },
    { id: "d2", name: "Home maintenance checklist", category: "Maintenance", shared: true },
    { id: "d3", name: "QBCC Form 16 Structural Engineering Certificate", category: "Certificates", shared: true },
    { id: "d4", name: "Form 43 Wet-Area Waterproofing Certificate", category: "Certificates", shared: false },
    { id: "d5", name: "Private Mortgage Schedule & Finances", category: "Private", shared: false },
  ]);

  // Activity events
  const [events, setEvents] = useState([
    { text: "Connection opened for handover", detail: "Sample account initiated", time: "Demo session" },
    { text: "Sample handover pack compiled by Hart Homes", detail: "Plans, warranties and certificates uploaded", time: "Today 10:48 AM" },
  ]);

  const toggleDoc = (docId: string) => {
    setDocs((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, shared: !d.shared } : d))
    );
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || paused || stopped) return;
    const msg: MessageItem = {
      id: `m-${Date.now()}`,
      sender: "You",
      avatar: "AL",
      isMe: true,
      time: "Just now",
      text: newMessage.trim(),
    };
    setMessages((prev) => [...prev, msg]);
    setNewMessage("");
  };

  const simulateReply = () => {
    setTimeout(() => {
      const reply: MessageItem = {
        id: `m-reply-${Date.now()}`,
        sender: data.proName,
        avatar: data.proAvatar,
        isMe: false,
        time: "Just now",
        text: "Thanks Alex! The touch-up paint near the laundry door is scheduled with our painter for Thursday morning. All other handover certificates are verified in your Prop ID.",
      };
      setMessages((prev) => [...prev, reply]);
    }, 600);
  };

  const handleSavePermissions = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newChannel = formData.get("channel") as string;
    const newExpiry = formData.get("expiry") as string;
    const shareAddr = formData.get("addressShared") === "on";

    setData((prev) => ({
      ...prev,
      channel: newChannel || prev.channel,
      expiry: newExpiry || prev.expiry,
      addressShared: shareAddr,
      permissionVersion: prev.permissionVersion + 1,
    }));

    setEvents((prev) => [
      ...prev,
      {
        text: `You approved updated permissions (Version ${data.permissionVersion + 1})`,
        detail: `Channel: ${newChannel}, address ${shareAddr ? "included" : "private"}, ends ${newExpiry}`,
        time: "Just now",
      },
    ]);

    setShowEditModal(false);
  };

  return (
    <div className="w-full flex-1 flex flex-col bg-[#F9F8F5] text-[#183249]">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-9 py-8 w-full flex-1">

        {/* ── Breadcrumb & Back to Trust Link ─────────────────────────── */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <Link
            href="/trustlinks"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#F9F8F5] text-[#183249] text-[12px] font-semibold rounded-lg border border-[#e2e5e5] transition-colors shadow-2xs group cursor-pointer"
            title="Back to Trust Link"
          >
            <span className="transition-transform group-hover:-translate-x-0.5 font-bold">←</span>
            <span>Back</span>
          </Link>
          <span className="h-4 w-px bg-[#e2e5e5]" />
          <nav className="flex items-center gap-2 text-[11px] text-[#64727e]" aria-label="Breadcrumb">
            <Link href="/properties" className="hover:underline">My Property World</Link>
            <span>›</span>
            <Link href="/trustlinks" className="hover:underline">Trust Link</Link>
            <span>›</span>
            <span className="text-[#183249] font-semibold">{data.proName}</span>
          </nav>
        </div>

        {/* ── Trust Masthead (Prototype .trust-mast) ─────────────────── */}
        <section className="bg-[#e9f0f5] border border-[#d8e2ec] rounded-2xl p-6 sm:p-8 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl font-serif font-bold text-2xl flex items-center justify-center flex-shrink-0 ${
                data.avatarTone === "blue"
                  ? "bg-[#e6eaf3] text-[#425b7c]"
                  : data.avatarTone === "green"
                  ? "bg-[#eaf4ef] text-[#28715e]"
                  : "bg-[#eee8dc] text-[#76623f]"
              }`}>
                {data.proAvatar}
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#28715e] mb-0.5">
                  Connected Professional
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#183249]">
                  {data.proName}
                </h1>
                <div className="text-[12px] text-[#64727e] mt-0.5">
                  {data.proRole} · {data.proBusiness}
                </div>
              </div>
            </div>

            <span className={`px-3 py-1 rounded-full text-[11px] font-bold self-start sm:self-auto ${
              stopped
                ? "bg-[#fbeeee] text-[#a34b43]"
                : paused
                ? "bg-[#fbf3e4] text-[#946315]"
                : "bg-[#eaf4ef] text-[#28715e]"
            }`}>
              {stopped ? "Access Ended" : paused ? "Access Paused" : "Active"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-[#566d86] mt-5 pt-4 border-t border-[#d8e2ec] flex-wrap">
            <span className="font-semibold text-[#183249]">{data.purpose}</span>
            <span>·</span>
            <Link
              href={`/properties/${data.propId}?tab=digital-key`}
              className="hover:underline flex items-center gap-1.5 font-semibold text-[#0F1A2C]"
            >
              <svg className="w-3.5 h-3.5 text-[#0F1A2C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>{data.property} · Back to my home</span>
            </Link>
            <span>·</span>
            <span>Ends {data.expiry}</span>
          </div>
        </section>

        {/* ── Minimal Property Pulse Notification ── */}
        <PropertyPulseNotification
          propId={data.propId}
          property={data.property}
          mode="consumer"
          actionHref={`/properties/${data.propId}`}
          actionLabel="View Prop ID"
        />

        {/* ── Connected Digital Key Status Card ── */}
        <section className="bg-white border border-[#e2e5e5] rounded-2xl p-5 sm:p-6 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#eaf4ef] text-[#28715e] border border-[#d2e6d9] flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#28715e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#28715e]">
                    HOME RECORD CONNECTED
                  </span>
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#f1f5f9] text-[#183249] border border-[#cbd5e1]">
                    {data.propId}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#eaf4ef] text-[#28715e] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                    <span>Active</span>
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#183249]">
                  Documents from your Digital Key
                </h3>
                <p className="text-xs text-[#64727e] mt-0.5">
                  {data.property} — you control exactly which documents {data.proName} can see. You can remove access at any time.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap sm:flex-nowrap">
              <Link
                href={`/properties/${data.propId}?tab=digital-key`}
                className="px-4 py-2 bg-[#0F1A2C] hover:bg-[#1c3a54] text-white rounded-xl text-xs font-bold transition-colors shadow-2xs whitespace-nowrap flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5 text-[#C59B27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span>Open Digital Key</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Paused / Stopped Banner ─────────────────────────────────── */}
        {paused && !stopped && (
          <div className="p-4 rounded-xl bg-[#fbf3e4] border border-[#f5dfb8] text-[#946315] text-[12px] mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#946315] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>You paused this Trust Link. Shared access and new in-app messages remain paused until you resume.</span>
            </div>
            <button
              onClick={() => setPaused(false)}
              className="px-3 py-1 bg-[#0F1A2C] text-white font-bold text-[11px] rounded-lg cursor-pointer"
            >
              Resume original permissions
            </button>
          </div>
        )}

        {stopped && (
          <div className="p-4 rounded-xl bg-[#fbeeee] border border-[#f3d4d4] text-[#a34b43] text-[12px] mb-6">
            Access ended. No future platform access is permitted through this link. Your own records remain available.
          </div>
        )}

        {/* ── Sub-Navigation Tabs ─────────────────────────────────────── */}
        <nav className="flex items-center gap-4 sm:gap-7 border-b border-[#e2e5e5] mb-8 overflow-x-auto text-[13px] font-medium">
          {[
            {
              id: "overview",
              label: "Overview",
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              ),
            },
            {
              id: "conversation",
              label: "Conversation",
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              ),
              count: `${messages.length}`,
            },
            {
              id: "permissions",
              label: "Permissions",
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
            },
            {
              id: "activity",
              label: "Activity",
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 relative flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? "text-[#183249] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#28715e]"
                  : "text-[#64727e] hover:text-[#183249]"
              }`}
            >
              <span className="flex-shrink-0">{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.count && (
                <span className="text-[10px] font-bold px-1.5 py-0.2 bg-[#e2e5e5] text-[#183249] rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* ── TAB 1: OVERVIEW ─────────────────────────────────────────── */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">

            {/* Left Card: This Connection */}
            <section className="bg-white border border-[#e2e5e5] rounded-2xl p-6 shadow-sm">
              <div className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#28715e] mb-1">
                This connection
              </div>
              <h2 className="text-xl font-bold text-[#183249] mb-2">{data.purpose}</h2>
              <p className="text-[12px] text-[#64727e] mb-6">{data.note}</p>

              <dl className="divide-y divide-[#e2e5e5] text-[12px] mb-6">
                <div className="py-2.5 grid grid-cols-[140px_1fr] gap-2">
                  <dt className="text-[#64727e]">Connected with</dt>
                  <dd className="text-[#183249] font-semibold">
                    {data.proName}<br />
                    <small className="text-[#64727e] font-normal">{data.proRole}</small>
                  </dd>
                </div>
                <div className="py-2.5 grid grid-cols-[140px_1fr] gap-2">
                  <dt className="text-[#64727e]">Property context</dt>
                  <dd className="text-[#183249] font-semibold">
                    {data.property}<br />
                    <small className="text-[#64727e] font-normal">Your Prop ID ({data.propId})</small>
                  </dd>
                </div>
                <div className="py-2.5 grid grid-cols-[140px_1fr] gap-2">
                  <dt className="text-[#64727e]">Allowed contact</dt>
                  <dd className="text-[#183249] font-semibold">{data.channel}</dd>
                </div>
                <div className="py-2.5 grid grid-cols-[140px_1fr] gap-2">
                  <dt className="text-[#64727e]">Permission ends</dt>
                  <dd className="text-[#183249] font-semibold">{data.expiry}</dd>
                </div>
              </dl>

              <div className="flex items-center gap-2.5 pt-4 border-t border-[#e2e5e5] flex-wrap">
                <button
                  onClick={() => setShowEditModal(true)}
                  className="px-3.5 py-2 bg-white border border-[#cbd5e2] text-[#183249] rounded-xl text-[12px] font-semibold hover:bg-[#F9F8F5] flex items-center gap-1.5 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 text-[#64727e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Edit permissions</span>
                </button>
                <button
                  onClick={() => setPaused(!paused)}
                  className="px-3.5 py-2 bg-white border border-[#cbd5e2] text-[#183249] rounded-xl text-[12px] font-semibold hover:bg-[#F9F8F5] flex items-center gap-1.5 cursor-pointer"
                >
                  {paused ? (
                    <>
                      <svg className="w-3.5 h-3.5 text-[#28715e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Resume</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5 text-[#64727e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Pause</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowStopModal(true)}
                  className="px-3.5 py-2 bg-white border border-[#e4b8b8] text-[#a34b43] rounded-xl text-[12px] font-semibold hover:bg-[#fbeeee] cursor-pointer"
                >
                  Stop access
                </button>
              </div>

              <p className="text-[10px] text-[#64727e] mt-4 leading-relaxed">
                Stopping access cannot retrieve downloaded copies or prevent contact outside the platform.
              </p>
            </section>

            {/* Right Card: Latest Conversation */}
            <section className="bg-white border border-[#e2e5e5] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#e2e5e5] mb-4">
                  <h3 className="text-base font-bold text-[#183249]">Latest conversation</h3>
                  <button onClick={() => setActiveTab("conversation")} className="text-[11px] font-bold text-[#0F1A2C] hover:underline cursor-pointer">
                    Open →
                  </button>
                </div>

                {/* Latest Speech Bubble */}
                <div className="bg-[#F9F8F5] p-4 rounded-2xl rounded-bl-sm text-[12px] text-[#183249] mb-4">
                  <p className="leading-relaxed">{messages[messages.length - 1].text}</p>
                  <small className="block text-[10px] text-[#64727e] mt-2">
                    {messages[messages.length - 1].sender} · {messages[messages.length - 1].time}
                  </small>
                </div>

                <button
                  onClick={() => setActiveTab("conversation")}
                  className="w-full py-2.5 bg-[#0F1A2C] text-white rounded-xl text-[12px] font-semibold hover:bg-[#102d59] transition-colors mb-4 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Open conversation</span>
                  <svg className="w-3.5 h-3.5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </button>

                <div className="p-3 bg-[#f9fafc] rounded-xl text-[11px] text-[#64727e] border border-[#e2e5e5] leading-relaxed">
                  <strong className="text-[#183249]">{docs.filter((d) => d.shared).length} selected document(s)</strong> · {data.addressShared ? "Property address included in your permission." : "Property address is private."}
                  <br />Other properties, private notes, and financial schedules are excluded.
                </div>
              </div>

              <div className="pt-4 border-t border-[#e2e5e5] mt-4 flex items-center justify-between text-[11px]">
                <button onClick={() => setActiveTab("permissions")} className="text-[#0F1A2C] font-semibold hover:underline cursor-pointer">
                  Review exact permissions →
                </button>
                <Link href="/properties/TPH-KEN-018" className="text-[#28715e] font-semibold hover:underline flex items-center gap-1">
                  <span>Return to Prop ID</span>
                  <svg className="w-3.5 h-3.5 text-[#28715e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </Link>
              </div>
            </section>

          </div>
        )}

        {/* ── TAB 2: CONVERSATION ─────────────────────────────────────── */}
        {activeTab === "conversation" && (
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-7">
            
            {/* Conversation Thread */}
            <div className="bg-white border border-[#e2e5e5] rounded-2xl p-6 shadow-sm flex flex-col h-[560px]">
              <h3 className="text-base font-bold text-[#183249] pb-3 border-b border-[#e2e5e5]">
                Conversation with {data.proName.split(" ")[0]}
              </h3>

              <div className="flex-1 overflow-y-auto py-4 space-y-3">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.isMe ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`p-4 rounded-2xl text-[12px] max-w-[85%] leading-relaxed ${
                        m.isMe
                          ? "bg-[#0F1A2C] text-white rounded-br-sm"
                          : "bg-[#F9F8F5] text-[#183249] rounded-bl-sm"
                      }`}
                    >
                      <p>{m.text}</p>
                      <small className={`block text-[10px] mt-1.5 opacity-75`}>
                        {m.sender} · {m.time}
                      </small>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Composer */}
              <form onSubmit={handleSendMessage} className="pt-3 border-t border-[#e2e5e5] flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  disabled={paused || stopped}
                  placeholder={paused ? "Access paused..." : "Write a message to the builder..."}
                  className="flex-1 p-2.5 border border-[#e2e5e5] rounded-xl text-[12px] text-[#183249] bg-[#fcfbf8] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={paused || stopped}
                  className="px-5 py-2.5 bg-[#0F1A2C] hover:bg-[#102d59] text-white font-bold rounded-xl text-[12px] transition-colors cursor-pointer"
                >
                  Send →
                </button>
              </form>

              {/* Interactive Simulation Footer */}
              <div className="pt-2 mt-2 flex items-center justify-between text-[10px] text-[#64727e]">
                <span>Sample conversation · Prototype session</span>
                <button
                  onClick={simulateReply}
                  className="text-[#28715e] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <svg className="w-3 h-3 text-[#28715e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Try a sample reply</span>
                </button>
              </div>
            </div>

            {/* Right Sidecard: Clear Boundaries */}
            <aside className="bg-white border border-[#e2e5e5] rounded-2xl p-6 shadow-sm self-start">
              <div className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#28715e] mb-1">
                Trust Link stays with you
              </div>
              <h3 className="text-xl font-bold text-[#183249] mb-2 leading-tight">
                One conversation.<br />Clear boundaries.
              </h3>
              <p className="text-[12px] text-[#64727e] leading-relaxed mb-6">
                Messages belong to this professional and this purpose. Your other property records, valuations and conversations are kept strictly separate.
              </p>

              <button
                onClick={() => setActiveTab("permissions")}
                className="w-full py-2.5 bg-white border border-[#cbd5e2] hover:bg-[#F9F8F5] text-[#183249] font-bold rounded-xl text-[12px] transition-colors mb-3 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 text-[#0F1A2C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Manage permissions</span>
              </button>

              <button
                onClick={() => setActiveTab("permissions")}
                className="text-[12px] text-[#0F1A2C] font-semibold hover:underline"
              >
                Review permissions →
              </button>
            </aside>

          </div>
        )}

        {/* ── TAB 4: PERMISSIONS RECEIPT ──────────────────────────────── */}
        {activeTab === "permissions" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            
            {/* Permission Receipt Card */}
            <section className="bg-white border border-[#e2e5e5] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#e2e5e5] mb-4">
                <h3 className="text-base font-bold text-[#183249]">Your permission receipt</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-[#eaf4ef] text-[#28715e] rounded">
                  Version {data.permissionVersion}
                </span>
              </div>

              <dl className="divide-y divide-[#e2e5e5] text-[12px] mb-6">
                <div className="py-2.5 grid grid-cols-[140px_1fr] gap-2">
                  <dt className="text-[#64727e]">Recipient</dt>
                  <dd className="text-[#183249] font-semibold">
                    {data.proName}<br />
                    <small className="text-[#64727e] font-normal">{data.proRole}</small>
                  </dd>
                </div>
                <div className="py-2.5 grid grid-cols-[140px_1fr] gap-2">
                  <dt className="text-[#64727e]">Purpose</dt>
                  <dd className="text-[#183249]">{data.purpose}</dd>
                </div>
                <div className="py-2.5 grid grid-cols-[140px_1fr] gap-2">
                  <dt className="text-[#64727e]">Property address</dt>
                  <dd className="text-[#183249]">{data.addressShared ? `${data.property}, ${data.suburb}` : "Not shared"}</dd>
                </div>
                <div className="py-2.5 grid grid-cols-[140px_1fr] gap-2">
                  <dt className="text-[#64727e]">Documents</dt>
                  <dd className="text-[#183249]">
                    {docs.filter((d) => d.shared).map((d) => d.name).join(", ") || "None selected"}
                  </dd>
                </div>
                <div className="py-2.5 grid grid-cols-[140px_1fr] gap-2">
                  <dt className="text-[#64727e]">Contact channel</dt>
                  <dd className="text-[#183249]">{data.channel}</dd>
                </div>
                <div className="py-2.5 grid grid-cols-[140px_1fr] gap-2">
                  <dt className="text-[#64727e]">Expiry</dt>
                  <dd className="text-[#183249]">{data.expiry}</dd>
                </div>
                <div className="py-2.5 grid grid-cols-[140px_1fr] gap-2">
                  <dt className="text-[#64727e]">Current access</dt>
                  <dd>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-[#eaf4ef] text-[#28715e] rounded">
                      {stopped ? "Ended" : paused ? "Paused" : "Active"}
                    </span>
                  </dd>
                </div>
              </dl>

              <div className="flex items-center gap-2.5 pt-4 border-t border-[#e2e5e5] flex-wrap">
                <button
                  onClick={() => setShowEditModal(true)}
                  className="px-3.5 py-2 bg-white border border-[#cbd5e2] text-[#183249] rounded-xl text-[12px] font-semibold hover:bg-[#F9F8F5] flex items-center gap-1.5 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 text-[#64727e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Edit permissions</span>
                </button>
                <button
                  onClick={() => setPaused(!paused)}
                  className="px-3.5 py-2 bg-white border border-[#cbd5e2] text-[#183249] rounded-xl text-[12px] font-semibold hover:bg-[#F9F8F5]"
                >
                  {paused ? "Resume access" : "Pause"}
                </button>
                <button
                  onClick={() => setShowStopModal(true)}
                  className="px-3.5 py-2 bg-white border border-[#e4b8b8] text-[#a34b43] rounded-xl text-[12px] font-semibold hover:bg-[#fbeeee]"
                >
                  Stop access
                </button>
              </div>

              <button
                onClick={() => {
                  setStopped(true);
                  alert(`Blocked ${data.proName} across all TrustLinks. Existing records retained in Prop ID.`);
                }}
                className="text-[11px] text-[#a34b43] font-semibold hover:underline mt-4 block"
              >
                Block this professional across my Trust Links
              </button>
            </section>

            {/* Right Sidecard: You Remain in Control */}
            <aside className="bg-white border border-[#e2e5e5] rounded-2xl p-6 shadow-sm self-start">
              <div className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#28715e] mb-1">
                You remain in control
              </div>
              <h3 className="text-xl font-bold text-[#183249] mb-2 leading-tight">
                Sharing can change.<br />Your records stay.
              </h3>
              <p className="text-[12px] text-[#64727e] leading-relaxed mb-4">
                Edit the items and duration while the link is open. Pause to temporarily stop access. Stop access to permanently end this permission.
              </p>

              <div className="p-3.5 bg-[#F9F8F5] rounded-xl text-[11px] text-[#556b83] mb-4">
                Reopening an ended connection requires a new request and fresh consent.
              </div>

              <p className="text-[10px] text-[#64727e] leading-relaxed mb-4">
                Downloaded copies cannot be recalled. Records a professional has already retained outside the platform cannot be deleted by this control.
              </p>

              <button
                onClick={() => setActiveTab("activity")}
                className="text-[12px] font-bold text-[#0F1A2C] hover:underline"
              >
                View the activity history →
              </button>
            </aside>

          </div>
        )}

        {/* ── TAB 5: ACTIVITY TIMELINE ────────────────────────────────── */}
        {activeTab === "activity" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            <section className="bg-white border border-[#e2e5e5] rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-[#183249] pb-3 border-b border-[#e2e5e5] mb-4">
                Trust Link activity
              </h3>

              <div className="relative pl-6 border-l-2 border-[#e2e5e5] space-y-6 text-[12px] my-4">
                {events.map((e, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#28715e] ring-4 ring-white" />
                    <span className="text-[10px] text-[#64727e] block">{e.time}</span>
                    <strong className="block text-[#183249] font-semibold">{e.text}</strong>
                    {e.detail && <p className="text-[11px] text-[#64727e] mt-0.5">{e.detail}</p>}
                  </div>
                ))}
              </div>
            </section>

            <aside className="bg-white border border-[#e2e5e5] rounded-2xl p-6 shadow-sm self-start">
              <div className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#28715e] mb-1">
                A clear record of your choices
              </div>
              <h3 className="text-xl font-bold text-[#183249] mb-2 leading-tight">
                Who. What. When.
              </h3>
              <p className="text-[12px] text-[#64727e] leading-relaxed mb-4">
                The activity history keeps permission changes, acceptance, pauses and access changes in verifiable chronological context.
              </p>
              <div className="p-3.5 bg-[#F9F8F5] rounded-xl text-[11px] text-[#556b83] mb-4">
                Cryptographic append-only event ledger tied to Prop ID.
              </div>
              <button
                onClick={() => setActiveTab("permissions")}
                className="text-[12px] font-bold text-[#0F1A2C] hover:underline"
              >
                View current permission receipt →
              </button>
            </aside>
          </div>
        )}

        {/* ── TAB 6: DIGITAL HANDOVER & DELIVERABLES ──────────────────── */}
        {activeTab === "handover" && (
          <div className="space-y-6">
            {/* Practical completion hero */}
            <div className="bg-[#0F1A2C] text-white rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="text-[#C59B27] text-[10px] font-bold uppercase tracking-[1.6px] mb-1">
                  Practical Completion Handover
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  New Home Digital Handover Package
                </h2>
                <p className="text-[12px] text-[#b9c8db] max-w-lg mb-4">
                  Includes QBCC Form 16 structural engineering certificate, Form 43 wet-area waterproofing, electrical compliance, appliance warranties, and joint walkthrough defects log.
                </p>
                <button
                  onClick={() => setHandoverSealed(true)}
                  className={`px-5 py-2.5 rounded-xl text-[12px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    handoverSealed
                      ? "bg-[#28715e] text-white"
                      : "bg-[#C59B27] text-[#0F1A2C] hover:bg-[#e0ad52]"
                  }`}
                >
                  {handoverSealed ? (
                    <>
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Handover Sealed to Prop ID Vault</span>
                    </>
                  ) : (
                    <span>Accept &amp; Seal to Prop ID Vault →</span>
                  )}
                </button>
              </div>

              <div className="text-right">
                <span className="font-mono text-[12px] text-[#C59B27] font-bold px-3 py-1 rounded-lg bg-white/10 block mb-1">
                  4 of 5 Gates Cleared
                </span>
                <span className="text-[10px] text-[#b9c8db]">QBCC #150821 Verified</span>
              </div>
            </div>

            {/* Variation Notice #04 */}
            <div className="bg-white border border-[#e2e5e5] rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#fbf3e4] text-[#946315] uppercase tracking-wider">
                    Variation Notice #04
                  </span>
                  <h3 className="text-base font-bold text-[#183249] mt-1.5">
                    Caesarstone 40mm Kitchen Island Upgrade
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold text-[#183249]">+$1,400 AUD</div>
                  <div className="text-[10px] text-[#64727e]">0 days schedule impact</div>
                </div>
              </div>

              <p className="text-[12px] text-[#64727e] mb-4">
                Upgrade from standard 20mm edge to 40mm mitred edge in Caesarstone &apos;Pure White&apos; across kitchen island and butler&apos;s pantry waterfall ends. Includes stonemason compliance certificate.
              </p>

              <div className="pt-3 border-t border-[#e2e5e5] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#64727e]">
                  Hash: <strong>0x89ab...4e11</strong>
                </span>
                <button
                  onClick={() => setVariationSigned(true)}
                  className={`px-4 py-1.5 rounded-lg text-[11px] font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                    variationSigned
                      ? "bg-[#eaf4ef] text-[#28715e]"
                      : "bg-[#0F1A2C] text-white hover:bg-[#102d59]"
                  }`}
                >
                  {variationSigned ? (
                    <>
                      <svg className="w-3.5 h-3.5 text-[#28715e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Approved &amp; Signed</span>
                    </>
                  ) : (
                    <span>Digital Sign-Off (Approve)</span>
                  )}
                </button>
              </div>
            </div>

            {/* Handover Gate Status */}
            <div className="bg-white border border-[#e2e5e5] rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-[#183249] pb-3 border-b border-[#e2e5e5] mb-4">
                Handover Gate Checklist
              </h3>
              <div className="space-y-2.5 text-[12px]">
                {[
                  { gate: "Gate 1", title: "Statutory Form 16 & Engineering Cleared", verified: true },
                  { gate: "Gate 2", title: "Wet Areas Waterproofing Form 43 Verified", verified: true },
                  { gate: "Gate 3", title: "Electrical Safety Compliance Certificate (Form 4)", verified: true },
                  { gate: "Gate 4", title: "Joint Pre-Handover Walkthrough & Touch-up Register", verified: true },
                  { gate: "Gate 5", title: "Client Variation Notice #04 Digital Sign-Off", verified: variationSigned },
                ].map((g) => (
                  <div key={g.gate} className="p-3 rounded-xl border border-[#e2e5e5] bg-[#f9fafc] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                        g.verified ? "bg-[#eaf4ef] text-[#28715e]" : "bg-[#fbf3e4] text-[#946315]"
                      }`}>
                        {g.verified ? (
                          <svg className="w-3 h-3 text-[#28715e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : "!"}
                      </span>
                      <strong className="text-[#183249] font-semibold">{g.title}</strong>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      g.verified ? "bg-[#eaf4ef] text-[#28715e]" : "bg-[#fbf3e4] text-[#946315]"
                    }`}>
                      {g.verified ? "Verified" : "Pending Sign-Off"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ── MODAL: EDIT PERMISSIONS (Prototype .modal) ─────────────── */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-[#0F1A2C]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-[#e2e5e5] mb-4">
              <div>
                <h2 className="text-xl font-bold text-[#183249]">Review Trust Link permissions</h2>
                <p className="text-[11px] text-[#64727e]">{data.proName} · {data.purpose}</p>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-[#64727e] hover:text-[#183249] p-1.5 rounded-lg hover:bg-[#f1f5f9] cursor-pointer transition-colors"
                aria-label="Close"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSavePermissions} className="space-y-4 text-[12px]">
              <div className="p-3 bg-[#F9F8F5] rounded-xl text-[#556b83] text-[11px]">
                Your display name, purpose and messages remain part of this connection. Private notes and other properties are excluded.
              </div>

              {/* Share address checkbox */}
              <label className="flex items-start gap-3 p-2 rounded-lg hover:bg-[#f9fafc] cursor-pointer">
                <input
                  type="checkbox"
                  name="addressShared"
                  defaultChecked={data.addressShared}
                  className="mt-1"
                />
                <div>
                  <strong className="block text-[#183249]">Share this property’s address</strong>
                  <small className="text-[#64727e]">{data.property}, {data.suburb}</small>
                </div>
              </label>

              {/* Selected documents checklist */}
              <div className="space-y-2">
                <label className="block font-bold text-[#183249]">Selected documents</label>
                {docs.map((d) => (
                  <label key={d.id} className="flex items-center gap-3 p-1.5 rounded hover:bg-[#f9fafc] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={d.shared}
                      onChange={() => toggleDoc(d.id)}
                    />
                    <span className="text-[#183249]">{d.name}</span>
                  </label>
                ))}
              </div>

              {/* Allowed Contact Channel */}
              <div>
                <label htmlFor="channel-select" className="block font-bold text-[#183249] mb-1">Allowed contact</label>
                <select
                  id="channel-select"
                  name="channel"
                  defaultValue={data.channel}
                  className="w-full p-2.5 border border-[#e2e5e5] rounded-xl text-[#183249] bg-white"
                >
                  <option>In-app messages</option>
                  <option>In-app messages + email</option>
                  <option>In-app messages + phone</option>
                </select>
              </div>

              {/* Permission Expiry */}
              <div>
                <label htmlFor="expiry-input" className="block font-bold text-[#183249] mb-1">Permission ends</label>
                <input
                  id="expiry-input"
                  type="text"
                  name="expiry"
                  defaultValue={data.expiry}
                  className="w-full p-2.5 border border-[#e2e5e5] rounded-xl text-[#183249] bg-white"
                />
              </div>

              <div className="pt-4 border-t border-[#e2e5e5] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-[#cbd5e2] text-[#183249] font-semibold rounded-xl text-[12px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0F1A2C] text-white font-bold rounded-xl text-[12px] hover:bg-[#102d59]"
                >
                  Save approved permissions
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: STOP ACCESS ──────────────────────────────────────── */}
      {showStopModal && (
        <div className="fixed inset-0 z-50 bg-[#0F1A2C]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-[#183249] mb-2">Stop access to this Trust Link?</h3>
            <p className="text-[12px] text-[#64727e] leading-relaxed mb-4">
              All active sharing permissions with {data.proName} will terminate immediately. Your own records, documents, and historical messages remain preserved in your Prop ID.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setStopped(true);
                  setShowStopModal(false);
                }}
                className="flex-1 py-2.5 bg-[#a34b43] text-white font-bold rounded-xl text-[12px]"
              >
                Confirm stop access
              </button>
              <button
                onClick={() => setShowStopModal(false)}
                className="flex-1 py-2.5 border border-[#cbd5e2] text-[#183249] font-bold rounded-xl text-[12px]"
              >
                Keep access
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
