"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface PulseTask {
  id: string;
  title: string;
  property: string;
  propId: string;
  client?: string;
  due: string;
  isToday: boolean;
  category: "Handover" | "Trade" | "Client Action" | "Compliance" | "Defect";
  priority: "High" | "Medium" | "Low";
  completed: boolean;
  actionLabel: string;
  actionHref: string;
  assignee?: string;
  notes?: string;
}

const PRO_DEFAULT_PULSE_TASKS: PulseTask[] = [
  {
    id: "pulse-p1",
    title: "Verify Form 16 Structural Engineering Certification for Handover Vault",
    property: "18 Banksia Crescent, Kenmore",
    propId: "TPH-KEN-018",
    client: "Alex & Emily",
    due: "Today, 5:00 PM",
    isToday: true,
    category: "Handover",
    priority: "High",
    completed: false,
    actionLabel: "Verify Gate →",
    actionHref: "/pro/trustlinks/welcome",
    assignee: "Brendan Kelly (Apex Certifications)",
    notes: "Mandatory gate required before sealing digital handover.",
  },
  {
    id: "pulse-p2",
    title: "Confirm painter appointment for touch-up near laundry door",
    property: "18 Banksia Crescent, Kenmore",
    propId: "TPH-KEN-018",
    client: "Alex & Emily",
    due: "Today, 11:15 AM",
    isToday: true,
    category: "Trade",
    priority: "Medium",
    completed: false,
    actionLabel: "Chat with Painter →",
    actionHref: "/pro/tradie",
    assignee: "Marcus Finch (Prime Finish)",
    notes: "Dulux Natural White touch-up schedule.",
  },
  {
    id: "pulse-p3",
    title: "Record signed client Variation Notice #04 (Caesarstone upgrade)",
    property: "18 Banksia Crescent, Kenmore",
    propId: "TPH-KEN-018",
    client: "Alex & Emily",
    due: "Today, 2:00 PM",
    isToday: true,
    category: "Client Action",
    priority: "High",
    completed: false,
    actionLabel: "Open Variation →",
    actionHref: "/pro/trustlinks/welcome",
    assignee: "Client (Alex & Emily)",
    notes: "+$1,400 AUD variation awaiting digital seal.",
  },
  {
    id: "pulse-p4",
    title: "Schedule frame stage inspection with private building certifier",
    property: "7 Cedar Street, Graceville",
    propId: "TPH-GRV-007",
    client: "Sofia Nguyen",
    due: "Today, 4:30 PM",
    isToday: true,
    category: "Compliance",
    priority: "High",
    completed: false,
    actionLabel: "Book Certifier →",
    actionHref: "/pro/trustlinks/TL-88301-A",
    assignee: "Apex Building Certifications",
    notes: "Frame inspection sign-off required prior to wall linings.",
  },
  {
    id: "pulse-p5",
    title: "Upload QBCC Form 43 waterproofing certificate for character renovation",
    property: "7 Cedar Street, Graceville",
    propId: "TPH-GRV-007",
    client: "Sofia Nguyen",
    due: "Tomorrow, 10:00 AM",
    isToday: false,
    category: "Compliance",
    priority: "Medium",
    completed: false,
    actionLabel: "Upload Form 43 →",
    actionHref: "/pro/trustlinks/TL-88301-A",
    assignee: "Licensed Tiler / Waterproofer",
    notes: "AS 3740 internal wet-area compliance declaration.",
  },
  {
    id: "pulse-p6",
    title: "Confirm timber pest chemical barrier treatment receipt with Claire Dupont",
    property: "7 Cedar Street, Graceville",
    propId: "TPH-GRV-007",
    client: "Sofia Nguyen",
    due: "Today, 1:30 PM",
    isToday: true,
    category: "Trade",
    priority: "High",
    completed: false,
    actionLabel: "Inspect Report →",
    actionHref: "/pro/trustlinks/TL-88301-A",
    assignee: "Dupont Property Inspections",
    notes: "Pre-purchase timber pest audit verification.",
  },
  {
    id: "pulse-p7",
    title: "Review 12-month post-handover warranty inspection audit report",
    property: "42 Ridge Road, Brookfield",
    propId: "TPH-BRK-042",
    client: "Noah & Mia Wilson",
    due: "Friday, 3:00 PM",
    isToday: false,
    category: "Handover",
    priority: "Low",
    completed: false,
    actionLabel: "Open Warranty →",
    actionHref: "/pro/trustlinks/TL-76100-C",
    assignee: "Hart Homes Maintenance",
    notes: "Post-settlement aftercare check on exterior sealants.",
  },
  {
    id: "pulse-p8",
    title: "Issue final maintenance sign-off & deposit archive receipt in Prop ID",
    property: "42 Ridge Road, Brookfield",
    propId: "TPH-BRK-042",
    client: "Noah & Mia Wilson",
    due: "Next Monday",
    isToday: false,
    category: "Compliance",
    priority: "Medium",
    completed: false,
    actionLabel: "Seal Record →",
    actionHref: "/pro/trustlinks/TL-76100-C",
    assignee: "Project Supervisor",
    notes: "Deposit Form 21 & statutory warranty into customer vault.",
  },
  {
    id: "pulse-p9",
    title: "Seal AS 4349.1 building & timber pest diagnostic report into TrustLink workspace",
    property: "7 Cedar Street, Graceville",
    propId: "TPH-TOW-029",
    client: "Sofia Nguyen",
    due: "Today, 3:00 PM",
    isToday: true,
    category: "Compliance",
    priority: "High",
    completed: false,
    actionLabel: "Seal Diagnostic →",
    actionHref: "/pro/trustlinks/TL-76100-C",
    assignee: "Claire Dupont",
    notes: "Pre-settlement timber pest and moisture diagnostic report.",
  },
  {
    id: "pulse-p10",
    title: "Review client project brief & conceptual site sketches from lead intake",
    property: "Simpsons Road, Bardon",
    propId: "TPH-BAR-019",
    client: "James & Sarah Davidson",
    due: "Today, End of Day",
    isToday: true,
    category: "Trade",
    priority: "Medium",
    completed: false,
    actionLabel: "Inspect Client Brief →",
    actionHref: "/pro/leads",
    assignee: "Hart Homes Estimator",
    notes: "Inbound customer inquiry with pre-approval.",
  },
];

const CONSUMER_DEFAULT_PULSE_TASKS: PulseTask[] = [
  {
    id: "pulse-c1",
    title: "Review and record receipt of Builder Digital Handover Pack",
    property: "18 Banksia Crescent, Kenmore",
    propId: "TPH-KEN-018",
    due: "Today, 5:00 PM",
    isToday: true,
    category: "Handover",
    priority: "High",
    completed: false,
    actionLabel: "Review Handover →",
    actionHref: "/properties/TPH-KEN-018",
    assignee: "Hart Homes (Builder)",
    notes: "Full architectural plans, Form 16, Form 43 & warranty schedules ready.",
  },
  {
    id: "pulse-c2",
    title: "Approve Client Variation Notice #04 (40mm Caesarstone kitchen island)",
    property: "18 Banksia Crescent, Kenmore",
    propId: "TPH-KEN-018",
    due: "Today, 2:00 PM",
    isToday: true,
    category: "Client Action",
    priority: "High",
    completed: false,
    actionLabel: "Approve Notice →",
    actionHref: "/trustlinks/welcome",
    assignee: "Your Action Required",
    notes: "Signed variation adds $1,400 AUD to final handover statement.",
  },
  {
    id: "pulse-c3",
    title: "Inspect laundry door touch-up finish with site supervisor",
    property: "18 Banksia Crescent, Kenmore",
    propId: "TPH-KEN-018",
    due: "Today, 11:15 AM",
    isToday: true,
    category: "Defect",
    priority: "Medium",
    completed: false,
    actionLabel: "Open Chat →",
    actionHref: "/trustlinks/welcome",
    assignee: "Hart Homes Site Supervisor",
    notes: "Trade confirmed for 11:15 AM onsite.",
  },
  {
    id: "pulse-c4",
    title: "Review structural framing inspection certificate from Certifier",
    property: "7 Cedar Street, Graceville",
    propId: "TPH-GRV-007",
    due: "Today, 4:30 PM",
    isToday: true,
    category: "Compliance",
    priority: "Medium",
    completed: false,
    actionLabel: "View Document →",
    actionHref: "/properties/TPH-GRV-007",
    assignee: "Private Certifier (Apex)",
    notes: "Inspection sign-off recorded in your Prop ID record.",
  },
  {
    id: "pulse-c5",
    title: "Review contract advice & title disclosures from Lachlan Vance (Conveyancer)",
    property: "7 Cedar Street, Graceville",
    propId: "TPH-GRV-007",
    due: "Today, 2:30 PM",
    isToday: true,
    category: "Client Action",
    priority: "High",
    completed: false,
    actionLabel: "Review Advice →",
    actionHref: "/trustlinks/TL-88301-A",
    assignee: "River City Conveyancing",
    notes: "Vendor disclosure review and overland flow path notes.",
  },
  {
    id: "pulse-c6",
    title: "Sign off on character renovation kitchen waterproofing certificate",
    property: "7 Cedar Street, Graceville",
    propId: "TPH-GRV-007",
    due: "Tomorrow, 9:00 AM",
    isToday: false,
    category: "Compliance",
    priority: "Medium",
    completed: false,
    actionLabel: "Inspect Form 43 →",
    actionHref: "/properties/TPH-GRV-007",
    assignee: "Your Action Required",
    notes: "Seals ensuite and kitchen waterproofing into Prop ID.",
  },
  {
    id: "pulse-c7",
    title: "Archive final QBCC Form 21 certificate & Colorbond roof warranty",
    property: "42 Ridge Road, Brookfield",
    propId: "TPH-BRK-042",
    due: "Pending Review",
    isToday: false,
    category: "Handover",
    priority: "Low",
    completed: false,
    actionLabel: "Open Vault →",
    actionHref: "/properties/TPH-BRK-042",
    assignee: "Prop ID Vault",
    notes: "30-year Colorbond warranty and statutory certificates safely archived.",
  },
  {
    id: "pulse-c8",
    title: "Confirm 12-month defect liability inspection schedule with builder",
    property: "42 Ridge Road, Brookfield",
    propId: "TPH-BRK-042",
    due: "This Week",
    isToday: false,
    category: "Defect",
    priority: "Medium",
    completed: false,
    actionLabel: "Message Builder →",
    actionHref: "/trustlinks/welcome",
    assignee: "Hart Homes Maintenance",
    notes: "Annual maintenance inspection appointment scheduling.",
  },
  {
    id: "pulse-c9",
    title: "Review Dupont Building & Timber Pest diagnostic report in TrustLink",
    property: "7 Cedar Street, Graceville",
    propId: "TPH-TOW-029",
    due: "Today, 3:00 PM",
    isToday: true,
    category: "Compliance",
    priority: "High",
    completed: false,
    actionLabel: "Inspect Report →",
    actionHref: "/trustlinks/TL-76100-C",
    assignee: "Dupont Property Inspections",
    notes: "Pre-purchase AS 4349.1 diagnostic report and thermal moisture imaging.",
  },
];

export interface PropertyPulseNotificationProps {
  propId?: string;
  property?: string;
  suburb?: string;
  client?: string;
  mode?: "consumer" | "pro";
  className?: string;
  actionHref?: string;
  actionLabel?: string;
  trustlinkHref?: string;
  showTrustLinkButton?: boolean;
  forceShow?: boolean;
}

const PROPERTY_PULSE_BRIEFS: Record<
  string,
  {
    property?: string;
    suburb?: string;
    client?: string;
    consumer: string;
    pro: string;
    badge?: string;
    trustlinkId: string;
    consumerTrustlink: string;
    proTrustlink: string;
    items: string[];
  }
> = {
  "TPH-KEN-018": {
    property: "18 Banksia Crescent",
    suburb: "Kenmore QLD 4069",
    client: "Alex & Emily",
    consumer: "Handover pack ready for review · Laundry door touch-up booked today 11:15 AM · Variation #04 pending sign-off.",
    pro: "Form 16 structural engineering cleared · Painter onsite 11:15 AM · Client Variation #04 ($1,400) pending sign-off.",
    badge: "Practical Completion",
    trustlinkId: "TL-99214-B",
    consumerTrustlink: "/trustlinks/TL-99214-B",
    proTrustlink: "/pro/trustlinks/TL-99214-B",
    items: [
      "QBCC Form 16 Structural Engineering Certification sealed to Vault",
      "Painter appointment booked for laundry door touch-up at 11:15 AM",
      "Client Variation Notice #04 (Caesarstone upgrade) ready for digital sign-off",
    ],
  },
  "TPH-GRV-007": {
    property: "7 Cedar Street",
    suburb: "Graceville QLD 4075",
    client: "Sofia Nguyen",
    consumer: "Conveyancing advice uploaded by Lachlan Vance · Structural framing inspection certificate sealed to Prop ID.",
    pro: "Frame stage cleared by certifier · Form 43 waterproofing certificate required prior to tiling.",
    badge: "Fixing & Fit-out",
    trustlinkId: "TL-88301-A",
    consumerTrustlink: "/trustlinks/TL-88301-A",
    proTrustlink: "/pro/trustlinks/TL-88301-A",
    items: [
      "Draft REIQ contract review notes sealed by Lachlan Vance",
      "AS 4349.1 timber pest audit on file with Claire Dupont",
      "QBCC Form 43 wet-area certificate required for tiling stage",
    ],
  },
  "TPH-BRK-042": {
    property: "42 Ridge Road",
    suburb: "Brookfield QLD 4069",
    client: "Noah & Mia Wilson",
    consumer: "12-month post-handover warranty inspection scheduled · QBCC Form 21 & Colorbond warranties sealed in Vault.",
    pro: "12-month defect liability audit underway · Final maintenance sign-off scheduled with client.",
    badge: "Warranty Care",
    trustlinkId: "TL-76100-C",
    consumerTrustlink: "/trustlinks/TL-76100-C",
    proTrustlink: "/pro/trustlinks/TL-76100-C",
    items: [
      "30-year Colorbond steel roof warranty certificate sealed in Vault",
      "12-month post-settlement inspection booked with project supervisor",
      "Statutory Form 21 final inspection certificate verified",
    ],
  },
  "TPH-TOW-029": {
    property: "29 Tower Mill Way",
    suburb: "Spring Hill QLD 4000",
    client: "Liam & Chloe",
    consumer: "Claire Dupont completed AS 4349.1 timber pest audit · Diagnostic report sealed in TrustLink.",
    pro: "AS 4349.1 pre-settlement inspection signed · Thermal moisture imaging report sealed.",
    badge: "Diagnostic Sealed",
    trustlinkId: "TL-76100-C",
    consumerTrustlink: "/trustlinks/TL-76100-C",
    proTrustlink: "/pro/trustlinks/TL-76100-C",
    items: [
      "AS 4349.1 timber pest diagnostic completed by Dupont Inspections",
      "Moisture meter and thermal imaging scans clear",
      "Report sealed to buyer due diligence workspace",
    ],
  },
};

export function PropertyPulseNotification({
  propId: initialPropId = "TPH-KEN-018",
  property: initialProperty,
  suburb: initialSuburb,
  client: initialClient,
  mode: initialMode = "consumer",
  className = "",
  actionHref: initialActionHref,
  actionLabel: initialActionLabel,
  trustlinkHref,
  showTrustLinkButton = true,
  forceShow = false,
}: PropertyPulseNotificationProps) {
  const [currentPropId, setCurrentPropId] = useState(initialPropId);
  const [currentProperty, setCurrentProperty] = useState(initialProperty);
  const [currentSuburb, setCurrentSuburb] = useState(initialSuburb);
  const [currentClient, setCurrentClient] = useState(initialClient);
  const [currentMode, setCurrentMode] = useState(initialMode);
  const [currentActionHref, setCurrentActionHref] = useState(initialActionHref);
  const [currentActionLabel, setCurrentActionLabel] = useState(initialActionLabel);

  const [visible, setVisible] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);

  // Sync if initial props change
  useEffect(() => {
    setCurrentPropId(initialPropId);
  }, [initialPropId]);

  useEffect(() => {
    if (initialProperty) setCurrentProperty(initialProperty);
  }, [initialProperty]);

  useEffect(() => {
    if (initialSuburb) setCurrentSuburb(initialSuburb);
  }, [initialSuburb]);

  useEffect(() => {
    if (initialClient) setCurrentClient(initialClient);
  }, [initialClient]);

  useEffect(() => {
    if (initialActionHref) setCurrentActionHref(initialActionHref);
  }, [initialActionHref]);

  useEffect(() => {
    if (initialActionLabel) setCurrentActionLabel(initialActionLabel);
  }, [initialActionLabel]);

  useEffect(() => {
    setCurrentMode(initialMode);
  }, [initialMode]);

  // Entrance timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 400);
    return () => clearTimeout(timer);
  }, [forceShow]);

  // Support interactive triggering via custom event (e.g. clicking "Live Pulse" on a project card)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleTrigger = (e: any) => {
      if (e?.detail) {
        if (e.detail.propId) setCurrentPropId(e.detail.propId);
        if (e.detail.property) setCurrentProperty(e.detail.property);
        if (e.detail.suburb) setCurrentSuburb(e.detail.suburb);
        if (e.detail.client) setCurrentClient(e.detail.client);
        if (e.detail.mode) setCurrentMode(e.detail.mode);
        if (e.detail.actionHref) setCurrentActionHref(e.detail.actionHref);
        if (e.detail.actionLabel) setCurrentActionLabel(e.detail.actionLabel);
      }
      setAnimatingOut(false);
      setVisible(true);
    };
    window.addEventListener("tph:show-pulse-popup", handleTrigger);
    return () => window.removeEventListener("tph:show-pulse-popup", handleTrigger);
  }, []);

  const handleDismiss = () => {
    setAnimatingOut(true);
    setTimeout(() => {
      setVisible(false);
      setAnimatingOut(false);
    }, 250);
  };

  const data = PROPERTY_PULSE_BRIEFS[currentPropId] || {
    property: currentProperty || currentPropId,
    suburb: currentSuburb || "QLD",
    client: currentClient || "Owner",
    consumer: `Active records verified for ${currentProperty || currentPropId}. Digital documents and maintenance items are current.`,
    pro: `Active build site · All milestone gates and statutory paperwork registered for ${currentProperty || currentPropId}.`,
    badge: "Verified",
    trustlinkId: "TL-99214-B",
    consumerTrustlink: "/trustlinks/TL-99214-B",
    proTrustlink: "/pro/trustlinks/TL-99214-B",
    items: ["Documents up to date", "No overdue notices"],
  };

  const propertyTitle = currentProperty || data.property || currentPropId;
  const suburbText = currentSuburb || data.suburb;
  const clientText = currentClient || data.client;
  const briefText = currentMode === "pro" ? data.pro : data.consumer;
  const items = data.items || [];
  const targetLink =
    currentActionHref ||
    trustlinkHref ||
    (currentMode === "pro" ? data.proTrustlink : data.consumerTrustlink) ||
    (currentMode === "pro" ? "/pro/trustlinks/TL-99214-B" : "/trustlinks/TL-99214-B");
  const actionText =
    currentActionLabel ||
    (currentMode === "pro" ? "Open Handover Workspace" : "Open TrustLink Record");

  return (
    <>
      {/* Floating Notification Box at Right Bottom Corner */}
      {visible && (
        <aside
          aria-label="Property Pulse Notification"
          className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[250] max-w-[420px] w-[calc(100%-2.5rem)] sm:w-full transition-all duration-300 transform pointer-events-auto ${
            animatingOut
              ? "opacity-0 translate-y-3 scale-95 pointer-events-none"
              : "opacity-100 translate-y-0 scale-100"
          }`}
        >
          <div className="bg-white/95 backdrop-blur-md border border-[#b8dec4] rounded-2xl shadow-2xl p-4 sm:p-5 text-[#102645] relative overflow-hidden ring-1 ring-black/5">
            {/* Top green accent strip */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#24754c] via-[#48996e] to-[#24754c]" />

            {/* Header row */}
            <div className="flex items-start justify-between gap-3 mb-2.5">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#24754c] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#24754c]" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[1.3px] text-[#24754c]">
                  Property Pulse · {currentMode === "pro" ? "Live Notification" : "Live Update"}
                </span>
              </div>

              <button
                onClick={handleDismiss}
                aria-label="Close notification"
                className="text-[#8ca395] hover:text-[#102645] text-xs p-1 rounded-md hover:bg-[#f0f4f2] transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Property & status info */}
            <div className="flex items-baseline justify-between gap-2 mb-1">
              <h4 className="text-[13px] font-bold text-[#102645] truncate">
                {propertyTitle}
              </h4>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-[#eaf5ef] text-[#24754c] rounded-md shrink-0">
                {data.badge || "Live"}
              </span>
            </div>

            <p className="text-[11px] text-[#5b6e84] mb-2.5">
              {clientText ? (
                <>
                  Client: <span className="font-semibold text-[#102645]">{clientText}</span> ·{" "}
                </>
              ) : null}
              {suburbText ? `${suburbText} ` : ""}
              <span className="text-[#8a9bb0]">({currentPropId})</span>
            </p>

            {/* Minimal brief notification box */}
            <div className="bg-[#f0f7f3] border border-[#c7e4d0] rounded-xl p-2.5 text-[11px] text-[#1e3a2f] mb-3 leading-relaxed">
              <span className="font-semibold text-[#24754c]">
                {currentMode === "pro" ? "Latest Site Pulse: " : "Latest Property Pulse: "}
              </span>
              {briefText}
            </div>

            {/* Micro highlights */}
            {items && items.length > 0 && (
              <div className="mb-3 space-y-1 text-[11px] text-[#264e3b]">
                {items.slice(0, 2).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#24754c] text-[10px] mt-0.5 font-bold">✓</span>
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Actions row */}
            <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#edf3ef]">
              <Link
                href={targetLink}
                onClick={handleDismiss}
                className="text-[11px] font-bold text-[#071d3b] hover:text-[#24754c] flex items-center gap-1 group"
              >
                <span>{actionText}</span>
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>

              <button
                onClick={handleDismiss}
                className="text-[11px] text-[#68788e] hover:text-[#102645] font-medium px-2 py-1 rounded-lg hover:bg-[#f4f6f8] cursor-pointer transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Floating Reopen Pill when Dismissed */}
      {!visible && (
        <button
          onClick={() => {
            setAnimatingOut(false);
            setVisible(true);
          }}
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[240] px-3.5 py-2 bg-white/95 backdrop-blur-md border border-[#b8dec4] hover:border-[#24754c] text-[#24754c] rounded-full shadow-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all hover:scale-105 ring-1 ring-black/5"
          title="Open Property Pulse Notification"
          aria-label="Open Property Pulse"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#24754c] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#24754c]" />
          </span>
          <span>Property Pulse</span>
        </button>
      )}
    </>
  );
}

export interface PropertyPulsePopupProps {
  propId?: string;
  property?: string;
  suburb?: string;
  client?: string;
  forceShow?: boolean;
}

export function PropertyPulsePopup({
  propId = "TPH-KEN-018",
  property = "18 Banksia Crescent",
  suburb = "Kenmore QLD 4069",
  client = "Alex & Emily",
  forceShow = false,
}: PropertyPulsePopupProps) {
  const pathname = usePathname();

  // Only render on /pro overview to prevent double popups on other /pro/* pages that mount their own PropertyPulseNotification
  if (pathname !== "/pro") return null;

  return (
    <PropertyPulseNotification
      propId={propId}
      property={property}
      suburb={suburb}
      client={client}
      mode="pro"
      forceShow={forceShow}
    />
  );
}

export interface PropertyPulseProps {
  mode: "pro" | "consumer";
  className?: string;
  filterPropId?: string;
  filterProperty?: string;
  hideFilterBar?: boolean;
  title?: string;
  subtitle?: string;
  compact?: boolean;
}

export function PropertyPulse({
  mode,
  className = "",
  filterPropId,
  filterProperty,
  hideFilterBar = false,
  title,
  subtitle,
  compact = false,
}: PropertyPulseProps) {
  const isPro = mode === "pro";
  const defaultTasks = isPro ? PRO_DEFAULT_PULSE_TASKS : CONSUMER_DEFAULT_PULSE_TASKS;

  const [tasks, setTasks] = useState<PulseTask[]>(defaultTasks);
  const [selectedPropertyFilter, setSelectedPropertyFilter] = useState<string>("all");
  const [showCompleted, setShowCompleted] = useState<boolean>(true);
  const [showAddTaskModal, setShowAddTaskModal] = useState<boolean>(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState<PulseTask["category"]>("Trade");
  const [newTaskPriority, setNewTaskPriority] = useState<PulseTask["priority"]>("Medium");
  const [newTaskDue, setNewTaskDue] = useState("Today, 5:00 PM");

  // Load custom tasks from localStorage
  useEffect(() => {
    const storageKey = isPro ? "tph_pro_tasks" : "tph_consumer_tasks";
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const mappedCustom: PulseTask[] = parsed.map((item: any) => ({
            id: item.id || `task-${Date.now()}`,
            title: item.title,
            property: item.property,
            propId: item.propId || filterPropId || "TPH-KEN-018",
            client: item.client,
            due: item.due,
            isToday: (item.due || "").toLowerCase().includes("today"),
            category: (item.category as any) || "Trade",
            priority: (item.priority as any) || "Medium",
            completed: Boolean(item.completed),
            actionLabel: item.actionLabel || (isPro ? "Open Task →" : "View →"),
            actionHref: item.actionHref || (isPro ? "/pro/tasks" : "/properties"),
            assignee: item.assignee,
            notes: item.notes,
          }));

          const customIds = new Set(mappedCustom.map((m) => m.id));
          const remainingDefaults = defaultTasks.filter((t) => !customIds.has(t.id));
          setTasks([...mappedCustom, ...remainingDefaults]);
        }
      }
    } catch {
      // Fallback
    }
  }, [isPro, filterPropId]);

  // Handle filterPropId prop
  useEffect(() => {
    if (filterPropId) {
      const match = tasks.find(
        (t) =>
          t.propId.toLowerCase() === filterPropId.toLowerCase() ||
          (filterProperty && t.property.toLowerCase().includes(filterProperty.toLowerCase()))
      );
      if (match) {
        setSelectedPropertyFilter(match.property);
      }
    }
  }, [filterPropId, filterProperty, tasks]);

  // Extract unique properties from tasks
  const properties = useMemo(() => {
    return Array.from(new Set(tasks.map((t) => t.property))).map((prop) => {
      const firstMatch = tasks.find((t) => t.property === prop);
      return {
        name: prop,
        propId: firstMatch?.propId || "",
        client: firstMatch?.client,
        pendingCount: tasks.filter((t) => t.property === prop && !t.completed).length,
      };
    });
  }, [tasks]);

  const toggleTask = (id: string) => {
    setTasks((prev) => {
      const updated = prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
      const storageKey = isPro ? "tph_pro_tasks" : "tph_consumer_tasks";
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const targetProp = properties.find((p) =>
      filterPropId ? p.propId.toLowerCase() === filterPropId.toLowerCase() : p.name === selectedPropertyFilter
    ) || properties[0] || { name: "18 Banksia Crescent, Kenmore", propId: "TPH-KEN-018" };

    const newTask: PulseTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      property: targetProp.name,
      propId: filterPropId || targetProp.propId,
      due: newTaskDue || "Today, 5:00 PM",
      isToday: (newTaskDue || "").toLowerCase().includes("today"),
      category: newTaskCategory,
      priority: newTaskPriority,
      completed: false,
      actionLabel: isPro ? "Open Task →" : "View Details →",
      actionHref: isPro ? "/pro/tasks" : `/properties/${filterPropId || targetProp.propId}`,
      assignee: isPro ? "Hart Homes Team" : "You (Owner)",
      notes: "Added via Property Pulse.",
    };

    const updated = [newTask, ...tasks];
    setTasks(updated);
    const storageKey = isPro ? "tph_pro_tasks" : "tph_consumer_tasks";
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch {
      // Ignore
    }

    setNewTaskTitle("");
    setShowAddTaskModal(false);
  };

  // Filter tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      // If scoped to a specific propId and hideFilterBar is active or filter is set
      if (filterPropId && hideFilterBar) {
        const matchesPropId = t.propId.toLowerCase() === filterPropId.toLowerCase();
        const matchesName = filterProperty && t.property.toLowerCase().includes(filterProperty.toLowerCase());
        if (!matchesPropId && !matchesName) return false;
      } else if (selectedPropertyFilter !== "all") {
        if (t.property !== selectedPropertyFilter && t.propId !== selectedPropertyFilter) {
          return false;
        }
      }

      if (!showCompleted && t.completed) {
        return false;
      }
      return true;
    });
  }, [tasks, filterPropId, filterProperty, hideFilterBar, selectedPropertyFilter, showCompleted]);

  const todayCount = filteredTasks.filter((t) => t.isToday && !t.completed).length;
  const totalCompleted = filteredTasks.filter((t) => t.completed).length;

  return (
    <section
      className={`bg-white border border-[#dfe6ef] rounded-2xl shadow-xs overflow-hidden ${className}`}
      aria-label="Property Pulse"
    >
      {/* ── Top Header with Radar Indicator ──────────────────────────── */}
      <div className="p-5 sm:p-6 border-b border-[#dfe6ef] bg-[#fafbfc] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="relative flex h-2.5 w-2.5">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isPro ? "bg-[#efbd66]" : "bg-[#24754c]"
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  isPro ? "bg-[#efbd66]" : "bg-[#24754c]"
                }`}
              />
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[1.5px] text-[#24754c]">
              Property Pulse · Live Feed
            </span>
            {filterPropId && (
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#eaf5ef] text-[#24754c] border border-[#c7e3d1]">
                {filterPropId}
              </span>
            )}
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#fff4df] text-[#8b641c]">
              {todayCount} Due Today
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#102645]">
            {title || "Property Pulse"}
          </h2>
          <p className="text-[12px] sm:text-[13px] text-[#68788e] mt-0.5">
            {subtitle ||
              (isPro
                ? "Today's site milestones, pending trade sign-offs & field tasks organized by property."
                : "Real-time updates, scheduled inspections & pending actions for this property.")}
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
          <button
            type="button"
            onClick={() => setShowAddTaskModal(true)}
            className="px-3.5 py-2 bg-[#071d3b] hover:bg-[#102d59] text-white rounded-xl text-xs font-bold transition-colors shadow-2xs inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span className="text-[#efbd66] font-bold">+</span>
            <span>Add Pulse Task</span>
          </button>

          <button
            type="button"
            onClick={() => setShowCompleted(!showCompleted)}
            className="px-3 py-2 bg-white border border-[#cbd5e2] hover:bg-[#f3f6fb] text-[#102645] rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            {showCompleted ? "Hide Done" : "Show All"}
          </button>
        </div>
      </div>

      {/* ── Optional Modal for Adding New Task ────────────────────────── */}
      {showAddTaskModal && (
        <div className="p-4 sm:p-5 bg-[#f0f4f9] border-b border-[#dfe6ef]">
          <form onSubmit={handleCreateTask} className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#102645]">
                + Add New Property Pulse Task {filterPropId ? `for ${filterPropId}` : ""}
              </span>
              <button
                type="button"
                onClick={() => setShowAddTaskModal(false)}
                className="text-xs text-[#68788e] hover:text-[#102645]"
              >
                ✕ Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="What needs to happen? (e.g. Sign waterproofing cert)"
                className="sm:col-span-2 px-3 py-2 bg-white border border-[#dfe6ef] rounded-xl text-xs text-[#102645] focus:outline-none focus:border-[#071d3b]"
                autoFocus
                required
              />

              <select
                value={newTaskCategory}
                onChange={(e) => setNewTaskCategory(e.target.value as any)}
                className="px-3 py-2 bg-white border border-[#dfe6ef] rounded-xl text-xs text-[#102645] focus:outline-none"
              >
                <option value="Trade">Trade / Site</option>
                <option value="Handover">Handover</option>
                <option value="Compliance">Compliance</option>
                <option value="Client Action">Client Action</option>
                <option value="Defect">Defect</option>
              </select>
            </div>

            <div className="flex items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2 text-xs">
                <label className="text-[#68788e]">Priority:</label>
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value as any)}
                  className="px-2 py-1 bg-white border border-[#dfe6ef] rounded-lg text-xs text-[#102645]"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <button
                type="submit"
                className="px-4 py-1.5 bg-[#071d3b] hover:bg-[#102d59] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Save Task to Pulse
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Property Filter Pills (shown unless hideFilterBar is true) ── */}
      {!hideFilterBar && (
        <div className="p-3.5 sm:p-4 bg-white border-b border-[#dfe6ef] flex items-center gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setSelectedPropertyFilter("all")}
            className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer inline-flex items-center gap-1.5 ${
              selectedPropertyFilter === "all"
                ? "bg-[#071d3b] text-white shadow-2xs"
                : "bg-[#f4f6f8] text-[#5b6e84] hover:bg-[#eaf0f6] hover:text-[#102645]"
            }`}
          >
            <span>All Properties</span>
            <span
              className={`text-[9.5px] px-1.5 py-0.2 rounded-full font-bold ${
                selectedPropertyFilter === "all" ? "bg-white/20 text-white" : "bg-[#dfe6ef] text-[#071d3b]"
              }`}
            >
              {tasks.filter((t) => !t.completed).length}
            </span>
          </button>

          {properties.map((prop) => {
            const isSelected = selectedPropertyFilter === prop.name;
            const shortName = prop.name.split(",")[0];
            return (
              <button
                key={prop.name}
                type="button"
                onClick={() => setSelectedPropertyFilter(prop.name)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer inline-flex items-center gap-1.5 border ${
                  isSelected
                    ? "border-[#071d3b] bg-[#f0f4f9] text-[#071d3b] font-bold shadow-2xs"
                    : "border-[#dfe6ef] text-[#5b6e84] hover:bg-[#f4f6f8] hover:text-[#102645]"
                }`}
              >
                <span className="font-mono text-[10px] text-[#24754c] font-bold">{prop.propId}</span>
                <span>·</span>
                <span>{shortName}</span>
                {prop.pendingCount > 0 && (
                  <span
                    className={`text-[9.5px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected ? "bg-[#071d3b] text-white" : "bg-[#fff4df] text-[#8b641c]"
                    }`}
                  >
                    {prop.pendingCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* ── Active Tasks Feed ────────────────────────────────────────── */}
      <div className="divide-y divide-[#dfe6ef] p-2 sm:p-3">
        {filteredTasks.length === 0 ? (
          <div className="py-10 text-center">
            <div className="w-10 h-10 rounded-xl bg-[#eaf5ef] text-[#24754c] flex items-center justify-center mx-auto mb-2.5">
              <svg className="w-5 h-5 text-[#24754c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <strong className="block text-[13px] text-[#102645]">All caught up for this property record!</strong>
            <p className="text-[11px] text-[#68788e] mt-0.5">
              Zero pending items or overdue tasks.
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`p-3 sm:p-4 rounded-xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                task.completed ? "bg-[#fafbfc] opacity-60" : "hover:bg-[#f8fafc]"
              }`}
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="w-4 h-4 rounded text-[#071d3b] cursor-pointer mt-1 flex-shrink-0"
                  aria-label={`Mark "${task.title}" as complete`}
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <strong
                      className={`text-[13px] font-bold ${
                        task.completed ? "line-through text-[#8a97a7]" : "text-[#102645]"
                      }`}
                    >
                      {task.title}
                    </strong>

                    {/* Today Badge */}
                    {task.isToday && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#fff4df] text-[#8b641c] border border-[#f5e3ba]">
                        Today
                      </span>
                    )}

                    {/* Category Badge */}
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#f0f4f9] text-[#071d3b]">
                      {task.category}
                    </span>

                    {/* High Priority Badge */}
                    {task.priority === "High" && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#fdf2f2] text-[#9b2c2c] border border-[#f8d7d7]">
                        Critical
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] text-[#68788e] flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-[#102645]">{task.property}</span>
                    <span>·</span>
                    <span className="font-mono text-[#24754c] font-semibold text-[10px]">{task.propId}</span>
                    <span>·</span>
                    <span className="font-medium text-[#071d3b]">Due: {task.due}</span>
                    {task.assignee && (
                      <>
                        <span>·</span>
                        <span className="text-[#556b83]">({task.assignee})</span>
                      </>
                    )}
                  </div>

                  {task.notes && (
                    <p className="text-[11px] text-[#64748b] mt-1 italic">{task.notes}</p>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center gap-2 self-start sm:self-auto flex-shrink-0 ml-7 sm:ml-0">
                <Link
                  href={task.actionHref}
                  className="px-3 py-1.5 bg-[#f3f6fb] hover:bg-[#e4ecf7] text-[#071d3b] font-bold rounded-lg text-[11px] transition-colors whitespace-nowrap"
                >
                  {task.actionLabel}
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Footer Summary Strip ─────────────────────────────────────── */}
      <div className="p-3.5 sm:p-4 border-t border-[#dfe6ef] bg-[#fafbfc] text-[11px] text-[#68788e] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-[#102645]">Pulse Status:</span>
          <span>{todayCount} active items scheduled for today</span>
          <span>·</span>
          <span>{totalCompleted} completed this cycle</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={isPro ? "/pro/tasks" : "/trustlinks"}
            className="font-bold text-[#071d3b] hover:text-[#24754c] hover:underline self-start sm:self-auto"
          >
            {isPro ? "Open All Follow-ups & Tasks →" : "View All Property Workspaces →"}
          </Link>
        </div>
      </div>
    </section>
  );
}
export default PropertyPulse;
