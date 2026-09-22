"use client";
import Link from "next/link";
import React, { use, useState } from "react";

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
    <div className="w-full flex-1 flex flex-col bg-[#f4f6f8] text-[#102645]">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-9 py-8 w-full flex-1">

        {/* ── Breadcrumb ─────────────────────────────────────────────── */}
        <nav className="flex items-center gap-2 text-[11px] text-[#68788e] mb-6" aria-label="Breadcrumb">
          <Link href="/properties" className="hover:underline">My Property World</Link>
          <span>›</span>
          <Link href="/trustlinks" className="hover:underline">Trust Link</Link>
          <span>›</span>
          <span className="text-[#102645] font-semibold">{data.proName}</span>
        </nav>

        {/* ── Trust Masthead (Prototype .trust-mast) ─────────────────── */}
        <section className="bg-[#e9f0f5] border border-[#d8e2ec] rounded-2xl p-6 sm:p-8 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl font-serif font-bold text-2xl flex items-center justify-center flex-shrink-0 ${
                data.avatarTone === "blue"
                  ? "bg-[#e6eaf3] text-[#425b7c]"
                  : data.avatarTone === "green"
                  ? "bg-[#eaf5ef] text-[#24754c]"
                  : "bg-[#eee8dc] text-[#76623f]"
              }`}>
                {data.proAvatar}
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#24754c] mb-0.5">
                  Trust Link
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#102645]">
                  {data.proName}
                </h1>
                <div className="text-[12px] text-[#68788e] mt-0.5">
                  {data.proRole} · {data.proBusiness}
                </div>
              </div>
            </div>

            <span className={`px-3 py-1 rounded-full text-[11px] font-bold self-start sm:self-auto ${
              stopped
                ? "bg-[#fbeeee] text-[#a44042]"
                : paused
                ? "bg-[#fff4df] text-[#8b641c]"
                : "bg-[#eaf5ef] text-[#24754c]"
            }`}>
              {stopped ? "Access Ended" : paused ? "Access Paused" : "Active"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-[#566d86] mt-5 pt-4 border-t border-[#d8e2ec] flex-wrap">
            <span className="font-semibold text-[#102645]">{data.purpose}</span>
            <span>·</span>
            <Link
              href="/properties/TPH-KEN-018"
              className="hover:underline flex items-center gap-1 font-semibold text-[#071d3b]"
            >
              <span>🏠</span>
              <span>{data.property} · Open Prop ID</span>
            </Link>
            <span>·</span>
            <span>Ends {data.expiry}</span>
          </div>
        </section>

        {/* ── Paused / Stopped Banner ─────────────────────────────────── */}
        {paused && !stopped && (
          <div className="p-4 rounded-xl bg-[#fff4df] border border-[#f5dfb8] text-[#8b641c] text-[12px] mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span>⏸️</span>
              <span>You paused this Trust Link. Shared access and new in-app messages remain paused until you resume.</span>
            </div>
            <button
              onClick={() => setPaused(false)}
              className="px-3 py-1 bg-[#071d3b] text-white font-bold text-[11px] rounded-lg"
            >
              Resume original permissions
            </button>
          </div>
        )}

        {stopped && (
          <div className="p-4 rounded-xl bg-[#fbeeee] border border-[#f3d4d4] text-[#a44042] text-[12px] mb-6">
            Access ended. No future platform access is permitted through this link. Your own records remain available.
          </div>
        )}

        {/* ── Sub-Navigation Tabs ─────────────────────────────────────── */}
        <nav className="flex items-center gap-4 sm:gap-7 border-b border-[#dfe6ef] mb-8 overflow-x-auto text-[13px] font-medium">
          {[
            { id: "overview", label: "Overview", icon: "🛡️" },
            { id: "conversation", label: "Conversation", icon: "💬", count: `${messages.length}` },
            { id: "documents", label: "Shared items", icon: "📄", count: `${docs.filter((d) => d.shared).length}` },
            { id: "permissions", label: "Permissions", icon: "⚙️" },
            { id: "activity", label: "Activity", icon: "🕒" },
            { id: "handover", label: "Digital Handover", icon: "🎁" },
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

        {/* ── TAB 1: OVERVIEW ─────────────────────────────────────────── */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">

            {/* Left Card: This Connection */}
            <section className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm">
              <div className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#24754c] mb-1">
                This connection
              </div>
              <h2 className="text-xl font-bold text-[#102645] mb-2">{data.purpose}</h2>
              <p className="text-[12px] text-[#68788e] mb-6">{data.note}</p>

              <dl className="divide-y divide-[#dfe6ef] text-[12px] mb-6">
                <div className="py-2.5 grid grid-cols-[140px_1fr] gap-2">
                  <dt className="text-[#68788e]">Connected with</dt>
                  <dd className="text-[#102645] font-semibold">
                    {data.proName}<br />
                    <small className="text-[#68788e] font-normal">{data.proRole}</small>
                  </dd>
                </div>
                <div className="py-2.5 grid grid-cols-[140px_1fr] gap-2">
                  <dt className="text-[#68788e]">Property context</dt>
                  <dd className="text-[#102645] font-semibold">
                    {data.property}<br />
                    <small className="text-[#68788e] font-normal">Your Prop ID ({data.propId})</small>
                  </dd>
                </div>
                <div className="py-2.5 grid grid-cols-[140px_1fr] gap-2">
                  <dt className="text-[#68788e]">Allowed contact</dt>
                  <dd className="text-[#102645] font-semibold">{data.channel}</dd>
                </div>
                <div className="py-2.5 grid grid-cols-[140px_1fr] gap-2">
                  <dt className="text-[#68788e]">Permission ends</dt>
                  <dd className="text-[#102645] font-semibold">{data.expiry}</dd>
                </div>
              </dl>

              <div className="flex items-center gap-2.5 pt-4 border-t border-[#dfe6ef] flex-wrap">
                <button
                  onClick={() => setShowEditModal(true)}
                  className="px-3.5 py-2 bg-white border border-[#cbd5e2] text-[#102645] rounded-xl text-[12px] font-semibold hover:bg-[#f3f6fb]"
                >
                  ⚙️ Edit permissions
                </button>
                <button
                  onClick={() => setPaused(!paused)}
                  className="px-3.5 py-2 bg-white border border-[#cbd5e2] text-[#102645] rounded-xl text-[12px] font-semibold hover:bg-[#f3f6fb]"
                >
                  {paused ? "▶ Resume" : "⏸ Pause"}
                </button>
                <button
                  onClick={() => setShowStopModal(true)}
                  className="px-3.5 py-2 bg-white border border-[#e4b8b8] text-[#a44042] rounded-xl text-[12px] font-semibold hover:bg-[#fbeeee]"
                >
                  Stop access
                </button>
              </div>

              <p className="text-[10px] text-[#68788e] mt-4 leading-relaxed">
                Stopping access cannot retrieve downloaded copies or prevent contact outside the platform.
              </p>
            </section>

            {/* Right Card: Latest Conversation */}
            <section className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#dfe6ef] mb-4">
                  <h3 className="text-base font-bold text-[#102645]">Latest conversation</h3>
                  <button onClick={() => setActiveTab("conversation")} className="text-[11px] font-bold text-[#071d3b] hover:underline">
                    Open →
                  </button>
                </div>

                {/* Latest Speech Bubble */}
                <div className="bg-[#f3f6fb] p-4 rounded-2xl rounded-bl-sm text-[12px] text-[#102645] mb-4">
                  <p className="leading-relaxed">{messages[messages.length - 1].text}</p>
                  <small className="block text-[10px] text-[#68788e] mt-2">
                    {messages[messages.length - 1].sender} · {messages[messages.length - 1].time}
                  </small>
                </div>

                <button
                  onClick={() => setActiveTab("conversation")}
                  className="w-full py-2.5 bg-[#071d3b] text-white rounded-xl text-[12px] font-semibold hover:bg-[#102d59] transition-colors mb-4"
                >
                  Open conversation 💬
                </button>

                <div className="p-3 bg-[#f9fafc] rounded-xl text-[11px] text-[#68788e] border border-[#dfe6ef] leading-relaxed">
                  <strong className="text-[#102645]">{docs.filter((d) => d.shared).length} selected document(s)</strong> · {data.addressShared ? "Property address included in your permission." : "Property address is private."}
                  <br />Other properties, private notes, and financial schedules are excluded.
                </div>
              </div>

              <div className="pt-4 border-t border-[#dfe6ef] mt-4 flex items-center justify-between text-[11px]">
                <button onClick={() => setActiveTab("permissions")} className="text-[#071d3b] font-semibold hover:underline">
                  Review exact permissions →
                </button>
                <Link href="/properties/TPH-KEN-018" className="text-[#24754c] font-semibold hover:underline">
                  Return to Prop ID 🏠
                </Link>
              </div>
            </section>

          </div>
        )}

        {/* ── TAB 2: CONVERSATION ─────────────────────────────────────── */}
        {activeTab === "conversation" && (
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-7">
            
            {/* Conversation Thread */}
            <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm flex flex-col h-[560px]">
              <h3 className="text-base font-bold text-[#102645] pb-3 border-b border-[#dfe6ef]">
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
                          ? "bg-[#071d3b] text-white rounded-br-sm"
                          : "bg-[#f3f6fb] text-[#102645] rounded-bl-sm"
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
              <form onSubmit={handleSendMessage} className="pt-3 border-t border-[#dfe6ef] flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  disabled={paused || stopped}
                  placeholder={paused ? "Access paused..." : "Write a message to the builder..."}
                  className="flex-1 p-2.5 border border-[#dfe6ef] rounded-xl text-[12px] text-[#102645] bg-[#fcfbf8] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={paused || stopped}
                  className="px-5 py-2.5 bg-[#071d3b] hover:bg-[#102d59] text-white font-bold rounded-xl text-[12px] transition-colors"
                >
                  Send →
                </button>
              </form>

              {/* Interactive Simulation Footer */}
              <div className="pt-2 mt-2 flex items-center justify-between text-[10px] text-[#68788e]">
                <span>Sample conversation · Prototype session</span>
                <button
                  onClick={simulateReply}
                  className="text-[#24754c] font-semibold hover:underline"
                >
                  Try a sample reply ⚡
                </button>
              </div>
            </div>

            {/* Right Sidecard: Clear Boundaries */}
            <aside className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm self-start">
              <div className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#24754c] mb-1">
                Trust Link stays with you
              </div>
              <h3 className="text-xl font-bold text-[#102645] mb-2 leading-tight">
                One conversation.<br />Clear boundaries.
              </h3>
              <p className="text-[12px] text-[#68788e] leading-relaxed mb-6">
                Messages belong to this professional and this purpose. Your other property records, valuations and conversations are kept strictly separate.
              </p>

              <button
                onClick={() => setActiveTab("permissions")}
                className="w-full py-2.5 bg-white border border-[#cbd5e2] hover:bg-[#f3f6fb] text-[#102645] font-bold rounded-xl text-[12px] transition-colors mb-3 flex items-center justify-center gap-2"
              >
                <span>Manage permissions 🛡️</span>
              </button>

              <button
                onClick={() => setActiveTab("documents")}
                className="text-[12px] text-[#071d3b] font-semibold hover:underline"
              >
                Review shared items →
              </button>
            </aside>

          </div>
        )}

        {/* ── TAB 3: SHARED ITEMS ─────────────────────────────────────── */}
        {activeTab === "documents" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#dfe6ef]">
              <div>
                <h2 className="text-xl font-bold text-[#102645]">Shared through this Trust Link</h2>
                <p className="text-[12px] text-[#68788e]">Only the items below are included in the permission you granted.</p>
              </div>
              <button
                onClick={() => setShowEditModal(true)}
                className="px-3.5 py-1.5 bg-[#071d3b] text-white text-[12px] font-bold rounded-xl"
              >
                ⚙️ Edit sharing
              </button>
            </div>

            <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm divide-y divide-[#dfe6ef] text-[12px]">
              {/* Row: Messages */}
              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg">💬</span>
                  <div>
                    <strong className="block text-[#102645]">Your request and conversation</strong>
                    <p className="text-[11px] text-[#68788e]">Display name, purpose and messages for this connection</p>
                  </div>
                </div>
                <button onClick={() => setActiveTab("conversation")} className="text-[11px] font-bold text-[#071d3b] hover:underline">
                  Open
                </button>
              </div>

              {/* Row: Property address */}
              {data.addressShared && (
                <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📍</span>
                    <div>
                      <strong className="block text-[#102645]">Selected property address</strong>
                      <p className="text-[11px] text-[#68788e]">{data.property}, {data.suburb}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-[#eaf5ef] text-[#24754c] rounded">
                    Included
                  </span>
                </div>
              )}

              {/* Rows: Individual Documents */}
              {docs.map((doc) => (
                <div key={doc.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-lg">📄</span>
                    <div className="min-w-0">
                      <strong className="block text-[#102645] truncate">{doc.name}</strong>
                      <p className="text-[10px] text-[#68788e]">{doc.category} · Sovereign Prop ID Record</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => toggleDoc(doc.id)}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                        doc.shared
                          ? "bg-[#fbeeee] text-[#a44042] hover:bg-[#f7d6d6]"
                          : "bg-[#eaf5ef] text-[#24754c] hover:bg-[#d8edd6]"
                      }`}
                    >
                      {doc.shared ? "Revoke File" : "Grant Share"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* What stays private card */}
            <div className="bg-[#071d3b] text-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-3">What stays private</h3>
              <div className="space-y-3 text-[12px] text-[#b9c8db]">
                <div className="flex items-start gap-2.5">
                  <span className="text-[#efbd66]">🔒</span>
                  <span>Property DNA details, care tasks, private notes and every unselected document</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-[#efbd66]">🔒</span>
                  <span>Other properties, private valuations, conversations and other professionals</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-[#efbd66]">🔒</span>
                  <span>Owner&apos;s sovereign credentials, loan schedules and financial information</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 4: PERMISSIONS RECEIPT ──────────────────────────────── */}
        {activeTab === "permissions" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            
            {/* Permission Receipt Card */}
            <section className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#dfe6ef] mb-4">
                <h3 className="text-base font-bold text-[#102645]">Your permission receipt</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-[#eaf5ef] text-[#24754c] rounded">
                  Version {data.permissionVersion}
                </span>
              </div>

              <dl className="divide-y divide-[#dfe6ef] text-[12px] mb-6">
                <div className="py-2.5 grid grid-cols-[140px_1fr] gap-2">
                  <dt className="text-[#68788e]">Recipient</dt>
                  <dd className="text-[#102645] font-semibold">
                    {data.proName}<br />
                    <small className="text-[#68788e] font-normal">{data.proRole}</small>
                  </dd>
                </div>
                <div className="py-2.5 grid grid-cols-[140px_1fr] gap-2">
                  <dt className="text-[#68788e]">Purpose</dt>
                  <dd className="text-[#102645]">{data.purpose}</dd>
                </div>
                <div className="py-2.5 grid grid-cols-[140px_1fr] gap-2">
                  <dt className="text-[#68788e]">Property address</dt>
                  <dd className="text-[#102645]">{data.addressShared ? `${data.property}, ${data.suburb}` : "Not shared"}</dd>
                </div>
                <div className="py-2.5 grid grid-cols-[140px_1fr] gap-2">
                  <dt className="text-[#68788e]">Documents</dt>
                  <dd className="text-[#102645]">
                    {docs.filter((d) => d.shared).map((d) => d.name).join(", ") || "None selected"}
                  </dd>
                </div>
                <div className="py-2.5 grid grid-cols-[140px_1fr] gap-2">
                  <dt className="text-[#68788e]">Contact channel</dt>
                  <dd className="text-[#102645]">{data.channel}</dd>
                </div>
                <div className="py-2.5 grid grid-cols-[140px_1fr] gap-2">
                  <dt className="text-[#68788e]">Expiry</dt>
                  <dd className="text-[#102645]">{data.expiry}</dd>
                </div>
                <div className="py-2.5 grid grid-cols-[140px_1fr] gap-2">
                  <dt className="text-[#68788e]">Current access</dt>
                  <dd>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-[#eaf5ef] text-[#24754c] rounded">
                      {stopped ? "Ended" : paused ? "Paused" : "Active"}
                    </span>
                  </dd>
                </div>
              </dl>

              <div className="flex items-center gap-2.5 pt-4 border-t border-[#dfe6ef] flex-wrap">
                <button
                  onClick={() => setShowEditModal(true)}
                  className="px-3.5 py-2 bg-white border border-[#cbd5e2] text-[#102645] rounded-xl text-[12px] font-semibold hover:bg-[#f3f6fb]"
                >
                  ⚙️ Edit permissions
                </button>
                <button
                  onClick={() => setPaused(!paused)}
                  className="px-3.5 py-2 bg-white border border-[#cbd5e2] text-[#102645] rounded-xl text-[12px] font-semibold hover:bg-[#f3f6fb]"
                >
                  {paused ? "Resume access" : "Pause"}
                </button>
                <button
                  onClick={() => setShowStopModal(true)}
                  className="px-3.5 py-2 bg-white border border-[#e4b8b8] text-[#a44042] rounded-xl text-[12px] font-semibold hover:bg-[#fbeeee]"
                >
                  Stop access
                </button>
              </div>

              <button
                onClick={() => {
                  setStopped(true);
                  alert(`Blocked ${data.proName} across all TrustLinks. Existing records retained in Prop ID.`);
                }}
                className="text-[11px] text-[#a44042] font-semibold hover:underline mt-4 block"
              >
                Block this professional across my Trust Links
              </button>
            </section>

            {/* Right Sidecard: You Remain in Control */}
            <aside className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm self-start">
              <div className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#24754c] mb-1">
                You remain in control
              </div>
              <h3 className="text-xl font-bold text-[#102645] mb-2 leading-tight">
                Sharing can change.<br />Your records stay.
              </h3>
              <p className="text-[12px] text-[#68788e] leading-relaxed mb-4">
                Edit the items and duration while the link is open. Pause to temporarily stop access. Stop access to permanently end this permission.
              </p>

              <div className="p-3.5 bg-[#f3f6fb] rounded-xl text-[11px] text-[#556b83] mb-4">
                Reopening an ended connection requires a new request and fresh consent.
              </div>

              <p className="text-[10px] text-[#68788e] leading-relaxed mb-4">
                Downloaded copies cannot be recalled. Records a professional has already retained outside the platform cannot be deleted by this control.
              </p>

              <button
                onClick={() => setActiveTab("activity")}
                className="text-[12px] font-bold text-[#071d3b] hover:underline"
              >
                View the activity history →
              </button>
            </aside>

          </div>
        )}

        {/* ── TAB 5: ACTIVITY TIMELINE ────────────────────────────────── */}
        {activeTab === "activity" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            <section className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-[#102645] pb-3 border-b border-[#dfe6ef] mb-4">
                Trust Link activity
              </h3>

              <div className="relative pl-6 border-l-2 border-[#dfe6ef] space-y-6 text-[12px] my-4">
                {events.map((e, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#24754c] ring-4 ring-white" />
                    <span className="text-[10px] text-[#68788e] block">{e.time}</span>
                    <strong className="block text-[#102645] font-semibold">{e.text}</strong>
                    {e.detail && <p className="text-[11px] text-[#68788e] mt-0.5">{e.detail}</p>}
                  </div>
                ))}
              </div>
            </section>

            <aside className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm self-start">
              <div className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#24754c] mb-1">
                A clear record of your choices
              </div>
              <h3 className="text-xl font-bold text-[#102645] mb-2 leading-tight">
                Who. What. When.
              </h3>
              <p className="text-[12px] text-[#68788e] leading-relaxed mb-4">
                The activity history keeps permission changes, acceptance, pauses and access changes in verifiable chronological context.
              </p>
              <div className="p-3.5 bg-[#f3f6fb] rounded-xl text-[11px] text-[#556b83] mb-4">
                Cryptographic append-only event ledger tied to Prop ID.
              </div>
              <button
                onClick={() => setActiveTab("permissions")}
                className="text-[12px] font-bold text-[#071d3b] hover:underline"
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
            <div className="bg-[#071d3b] text-white rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="text-[#efbd66] text-[10px] font-bold uppercase tracking-[1.6px] mb-1">
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
                  className={`px-5 py-2.5 rounded-xl text-[12px] font-bold transition-all ${
                    handoverSealed
                      ? "bg-[#24754c] text-white"
                      : "bg-[#efbd66] text-[#071d3b] hover:bg-[#e0ad52]"
                  }`}
                >
                  {handoverSealed ? "✓ Handover Sealed to Prop ID Vault" : "Accept & Seal to Prop ID Vault →"}
                </button>
              </div>

              <div className="text-right">
                <span className="font-mono text-[12px] text-[#efbd66] font-bold px-3 py-1 rounded-lg bg-white/10 block mb-1">
                  4 of 5 Gates Cleared
                </span>
                <span className="text-[10px] text-[#b9c8db]">QBCC #150821 Verified</span>
              </div>
            </div>

            {/* Variation Notice #04 */}
            <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#fff4df] text-[#8b641c] uppercase tracking-wider">
                    Variation Notice #04
                  </span>
                  <h3 className="text-base font-bold text-[#102645] mt-1.5">
                    Caesarstone 40mm Kitchen Island Upgrade
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold text-[#102645]">+$1,400 AUD</div>
                  <div className="text-[10px] text-[#68788e]">0 days schedule impact</div>
                </div>
              </div>

              <p className="text-[12px] text-[#68788e] mb-4">
                Upgrade from standard 20mm edge to 40mm mitred edge in Caesarstone &apos;Pure White&apos; across kitchen island and butler&apos;s pantry waterfall ends. Includes stonemason compliance certificate.
              </p>

              <div className="pt-3 border-t border-[#dfe6ef] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#68788e]">
                  Hash: <strong>0x89ab...4e11</strong>
                </span>
                <button
                  onClick={() => setVariationSigned(true)}
                  className={`px-4 py-1.5 rounded-lg text-[11px] font-bold transition-colors ${
                    variationSigned
                      ? "bg-[#eaf5ef] text-[#24754c]"
                      : "bg-[#071d3b] text-white hover:bg-[#102d59]"
                  }`}
                >
                  {variationSigned ? "✓ Approved & Signed" : "Digital Sign-Off (Approve)"}
                </button>
              </div>
            </div>

            {/* Handover Gate Status */}
            <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-[#102645] pb-3 border-b border-[#dfe6ef] mb-4">
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
                  <div key={g.gate} className="p-3 rounded-xl border border-[#dfe6ef] bg-[#f9fafc] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                        g.verified ? "bg-[#eaf5ef] text-[#24754c]" : "bg-[#fff4df] text-[#8b641c]"
                      }`}>
                        {g.verified ? "✓" : "!"}
                      </span>
                      <strong className="text-[#102645] font-semibold">{g.title}</strong>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      g.verified ? "bg-[#eaf5ef] text-[#24754c]" : "bg-[#fff4df] text-[#8b641c]"
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
        <div className="fixed inset-0 z-50 bg-[#071d3b]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-[#dfe6ef] mb-4">
              <div>
                <h2 className="text-xl font-bold text-[#102645]">Review Trust Link permissions</h2>
                <p className="text-[11px] text-[#68788e]">{data.proName} · {data.purpose}</p>
              </div>
              <button onClick={() => setShowEditModal(false)} className="text-[#68788e] hover:text-[#102645] text-lg font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePermissions} className="space-y-4 text-[12px]">
              <div className="p-3 bg-[#f3f6fb] rounded-xl text-[#556b83] text-[11px]">
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
                  <strong className="block text-[#102645]">Share this property’s address</strong>
                  <small className="text-[#68788e]">{data.property}, {data.suburb}</small>
                </div>
              </label>

              {/* Selected documents checklist */}
              <div className="space-y-2">
                <label className="block font-bold text-[#102645]">Selected documents</label>
                {docs.map((d) => (
                  <label key={d.id} className="flex items-center gap-3 p-1.5 rounded hover:bg-[#f9fafc] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={d.shared}
                      onChange={() => toggleDoc(d.id)}
                    />
                    <span className="text-[#102645]">{d.name}</span>
                  </label>
                ))}
              </div>

              {/* Allowed Contact Channel */}
              <div>
                <label htmlFor="channel-select" className="block font-bold text-[#102645] mb-1">Allowed contact</label>
                <select
                  id="channel-select"
                  name="channel"
                  defaultValue={data.channel}
                  className="w-full p-2.5 border border-[#dfe6ef] rounded-xl text-[#102645] bg-white"
                >
                  <option>In-app messages</option>
                  <option>In-app messages + email</option>
                  <option>In-app messages + phone</option>
                </select>
              </div>

              {/* Permission Expiry */}
              <div>
                <label htmlFor="expiry-input" className="block font-bold text-[#102645] mb-1">Permission ends</label>
                <input
                  id="expiry-input"
                  type="text"
                  name="expiry"
                  defaultValue={data.expiry}
                  className="w-full p-2.5 border border-[#dfe6ef] rounded-xl text-[#102645] bg-white"
                />
              </div>

              <div className="pt-4 border-t border-[#dfe6ef] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-[#cbd5e2] text-[#102645] font-semibold rounded-xl text-[12px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#071d3b] text-white font-bold rounded-xl text-[12px] hover:bg-[#102d59]"
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
        <div className="fixed inset-0 z-50 bg-[#071d3b]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-[#102645] mb-2">Stop access to this Trust Link?</h3>
            <p className="text-[12px] text-[#68788e] leading-relaxed mb-4">
              All active sharing permissions with {data.proName} will terminate immediately. Your own records, documents, and historical messages remain preserved in your Prop ID.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setStopped(true);
                  setShowStopModal(false);
                }}
                className="flex-1 py-2.5 bg-[#a44042] text-white font-bold rounded-xl text-[12px]"
              >
                Confirm stop access
              </button>
              <button
                onClick={() => setShowStopModal(false)}
                className="flex-1 py-2.5 border border-[#cbd5e2] text-[#102645] font-bold rounded-xl text-[12px]"
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
