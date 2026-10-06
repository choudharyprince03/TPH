"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { PROPERTIES_LIST } from "@/lib/properties";

// ─── TYPES BASED ON QUEENSLAND DIGITAL KEY BRIEF ──────────────────────────

export type PackFamily =
  | "Sell a property"
  | "Appoint & lease"
  | "Build & change"
  | "Finance a home"
  | "Service & handover"
  | "My tenancy";

export type RequirementLabel =
  | "Required by law"
  | "Conditional legal requirement"
  | "Requested by professional"
  | "Optional supporting record";

export type ExecutionRoute =
  | "Approved electronic signing (ETA 2001)"
  | "External e-conveyancing (PEXA)"
  | "Witnessed / Paper (Titles QLD)";

export type PackStatus =
  | "Draft"
  | "Assembled / Partial"
  | "Ready to Issue"
  | "Sent to Client"
  | "Signed / Executed"
  | "Fully Sealed to Vault";

export type ProRole =
  | "Builder & Contractor"
  | "Solicitor / Conveyancing Team"
  | "Residential Property Manager"
  | "Mortgage Broker & Lender";

export interface PackItem {
  id: string;
  title: string;
  category: string;
  label: RequirementLabel;
  size: string;
  source: string;
  statutoryRef?: string;
  notes?: string;
  isRequired?: boolean;
}

export interface ProPack {
  id: string;
  propId: string;
  propertyAddress: string;
  clientName: string;
  issuerRole: ProRole;
  family: PackFamily;
  title: string;
  description: string;
  recipientRole: string;
  executionRoute: ExecutionRoute;
  actionRequired: "Client Signature" | "Handover Acceptance" | "Review & Signoff" | "PEXA Lodgement" | "Statutory Archival";
  status: PackStatus;
  statusColor: string;
  nextAction: string;
  items: PackItem[];
  updatedAt: string;
  trustlinkId: string;
  trustlinkHref: string;
  hash?: string;
}

export interface ExecutedReceipt {
  id: string;
  packId: string;
  packTitle: string;
  family: PackFamily;
  propId: string;
  propertyAddress: string;
  clientName: string;
  executedDate: string;
  hash: string;
  documentsCount: number;
  highlightDocs: string[];
  signers: string[];
  statutoryCertification: string;
}

// ─── PRIMARY SOURCES REGISTER [K01 - K16] ────────────────────────────────

interface PrimarySource {
  code: string;
  authority: string;
  title: string;
  summary: string;
  statutoryRule: string;
}

const PRIMARY_SOURCES: PrimarySource[] = [
  {
    code: "K01",
    authority: "Queensland Government",
    title: "Seller Disclosure Scheme (Commenced 1 Aug 2025)",
    summary: "Mandates QLD Seller Form 2 disclosure statement and prescribed certificates before buyer enters residential contract.",
    statutoryRule: "Must give completed statement & certificates prior to signing. Old handover documents cannot substitute current searches.",
  },
  {
    code: "K02",
    authority: "Office of Fair Trading (OFT)",
    title: "Appointment to Act as Property Agent (Form 6)",
    summary: "OFT Form 6 residential agency appointment establishing lawful authority and commission terms.",
    statutoryRule: "Written appointment must be executed before marketing or acting. Commercial appointments require separate distinct schedule.",
  },
  {
    code: "K03",
    authority: "Residential Tenancies Authority (RTA)",
    title: "General Tenancy Forms Register",
    summary: "RTA statutory forms numbering regime. QLD seller Form 2 differs from RTA bond Form 2; OFT Form 6 differs from RTA Form 6.",
    statutoryRule: "Strictly namespace form identifiers by issuing authority and current regulatory version.",
  },
  {
    code: "K04",
    authority: "Residential Tenancies Authority (RTA)",
    title: "General Tenancy Agreement (Form 18a)",
    summary: "Standard terms, annexures, Form 17a Information Statement and entry condition Form 1a.",
    statutoryRule: "Tenant must return agreement within 5 days; manager/owner must return fully executed copy within 14 days.",
  },
  {
    code: "K05",
    authority: "Residential Tenancies Authority (RTA)",
    title: "Rental Application Process (Form 22 Guardrails)",
    summary: "RTA limits requested documents to max 2 per identity, financial ability and suitability category.",
    statutoryRule: "Prohibits requesting bank transaction histories, disputes, or credit defaults. Minimum 2 non-restrictive submission methods.",
  },
  {
    code: "K06",
    authority: "Residential Tenancies Authority (RTA)",
    title: "Personal Information & Destruction Rules",
    summary: "Mandatory destruction periods: 3 months for unsuccessful applicants; within 7 years after tenancy termination.",
    statutoryRule: "No exception for outstanding debt. Indefinite retention of tenant identity and financial records is prohibited.",
  },
  {
    code: "K07",
    authority: "Queensland Building & Construction Commission (QBCC)",
    title: "Contract Variations (Form 7 Requirements)",
    summary: "Written variation detailing price effect, delay days, and timing must precede work.",
    statutoryRule: "Owner must receive executed copy before earlier of work starting or 5 business days. Contractor cannot demand payment before work starts.",
  },
  {
    code: "K08",
    authority: "Queensland Legislation",
    title: "Electronic Transactions (Queensland) Act 2001 s14",
    summary: "General electronic signature validity conditions requiring identity, consent, and reliable method.",
    statutoryRule: "DIY image stamps invalid. Regulated titles and witnessed deeds require approved registry verification.",
  },
  {
    code: "K09",
    authority: "Titles Queensland",
    title: "Signing and Witnessing Requirements",
    summary: "Prescribed qualified witnesses (Solicitor, Justice of the Peace, Commissioner for Declarations) for transfer instruments.",
    statutoryRule: "Titles registry instruments require verified capacity and witnessing; cannot use standard web e-sign.",
  },
  {
    code: "K10",
    authority: "Commonwealth Bank / Lenders",
    title: "Mortgage Application Evidence Architecture",
    summary: "Differentiates PAYG income, self-employed financials, and construction progress draws.",
    statutoryRule: "Borrower identity & loan documents belong to private borrower vault; never transfer with property record.",
  },
  {
    code: "K14",
    authority: "Titles Queensland",
    title: "eConveyancing & PEXA Lodgement Rules",
    summary: "Approved Electronic Lodgement Network Operator (ELNO) route for professional property settlement.",
    statutoryRule: "TPH records exchange handoff and validated settlement receipt; legal deed filed into sovereign vault.",
  },
  {
    code: "K15",
    authority: "Office of Fair Trading (OFT)",
    title: "Residential Property-Agent Appointment Form 6 Resource",
    summary: "Official state appointment instrument defining services, fees, client authority, and dispute mechanisms.",
    statutoryRule: "Both client and licensee must sign; completed executed copy returned before agency activities commence.",
  },
];

// ─── REPO ASSETS FOR DYNAMIC PACK ASSEMBLY ──────────────────────────────

interface RepoDocument {
  id: string;
  title: string;
  category: string;
  defaultLabel: RequirementLabel;
  source: string;
  size: string;
  statutoryRef: string;
  families: PackFamily[];
}

const REPO_DOCUMENTS: RepoDocument[] = [
  // Building & Variations
  { id: "d1", title: "QBCC Form 7 · Variation Notice #04", category: "Contract", defaultLabel: "Required by law", source: "Hart Homes Commercial", size: "840 KB", statutoryRef: "QBCC Act s65 [K07]", families: ["Build & change"] },
  { id: "d2", title: "QBCC Form 16 · Structural Engineering Final Inspection", category: "Statutory", defaultLabel: "Required by law", source: "Apex Engineering QLD", size: "2.4 MB", statutoryRef: "Building Act 1975 [K07]", families: ["Build & change", "Service & handover"] },
  { id: "d3", title: "AS 3740 Form 43 · Wet-Area Waterproofing Certificate", category: "Compliance", defaultLabel: "Required by law", source: "HydroSeal QLD", size: "1.8 MB", statutoryRef: "QBCC License Regs [K07]", families: ["Build & change", "Service & handover"] },
  { id: "d4", title: "Electrical Safety Act Form 4 · Compliance Certificate", category: "Compliance", defaultLabel: "Required by law", source: "Lachlan Electrical", size: "680 KB", statutoryRef: "Electrical Safety Act 2002", families: ["Build & change", "Service & handover"] },
  { id: "d5", title: "Termimesh Physical Barrier System Warranty & Notice (AS 3660.1)", category: "Warranty", defaultLabel: "Conditional legal requirement", source: "Flick Pest Control", size: "2.1 MB", statutoryRef: "BCA / AS 3660.1", families: ["Build & change", "Service & handover"] },
  { id: "d6", title: "Architectural & Engineering Drawings (As-Built Set)", category: "Plans", defaultLabel: "Requested by professional", source: "Hart Homes Studio", size: "8.4 MB", statutoryRef: "Contract Schedule [K07]", families: ["Build & change", "Service & handover"] },
  { id: "d7", title: "Caesarstone 40mm Mitred Edge Spec & Shop Drawing", category: "Specification", defaultLabel: "Requested by professional", source: "Hart Homes Selection", size: "1.1 MB", statutoryRef: "Variation Schedule #04", families: ["Build & change"] },
  { id: "d8", title: "Appliance Care & Warranty Compendium", category: "Manuals", defaultLabel: "Optional supporting record", source: "Hart Homes Handoff", size: "4.2 MB", statutoryRef: "Client Handoff Guide", families: ["Service & handover"] },
  // Seller Disclosure
  { id: "d9", title: "Queensland Seller Disclosure Statement (Form 2 Draft)", category: "Disclosure", defaultLabel: "Required by law", source: "River City Conveyancing", size: "1.4 MB", statutoryRef: "POA Act s206 / SDS [K01]", families: ["Sell a property"] },
  { id: "d10", title: "Titles Queensland Current Title Search & Registered Plan RP 88201", category: "Title", defaultLabel: "Required by law", source: "Titles Queensland Search", size: "1.1 MB", statutoryRef: "Land Title Act 1994 [K01]", families: ["Sell a property"] },
  { id: "d11", title: "Queensland Pool Safety Certificate (Form 23)", category: "Compliance", defaultLabel: "Conditional legal requirement", source: "Brisbane Pool Certifiers", size: "950 KB", statutoryRef: "Building Act 1975 Ch 8 [K01]", families: ["Sell a property"] },
  { id: "d12", title: "Body Corporate Information Certificate & Community Management Statement", category: "Strata", defaultLabel: "Conditional legal requirement", source: "BCM Strata Managers", size: "3.2 MB", statutoryRef: "BCCM Act 1997 s206 [K01]", families: ["Sell a property"] },
  { id: "d13", title: "Residential Agency Appointment (OFT Form 6)", category: "Agency", defaultLabel: "Required by law", source: "Ray White Kenmore", size: "1.3 MB", statutoryRef: "Property Occupations Act [K02]", families: ["Sell a property", "Appoint & lease"] },
  // Tenancy & Leasing
  { id: "d14", title: "RTA General Tenancy Agreement (Form 18a) + Special Terms", category: "Tenancy", defaultLabel: "Required by law", source: "Place Property Management", size: "1.9 MB", statutoryRef: "RTRA Act 2008 s61 [K04]", families: ["Appoint & lease"] },
  { id: "d15", title: "RTA Pocket Guide for Tenants (Form 17a Information Sheet)", category: "Information", defaultLabel: "Required by law", source: "RTA Queensland", size: "820 KB", statutoryRef: "RTRA Act s67 [K04]", families: ["Appoint & lease"] },
  { id: "d16", title: "RTA Entry Condition Report (Form 1a)", category: "Condition", defaultLabel: "Required by law", source: "Place Property Management", size: "2.5 MB", statutoryRef: "RTRA Act s65 [K04]", families: ["Appoint & lease"] },
  { id: "d17", title: "RTA Compliant Rental Application (Form 22)", category: "Application", defaultLabel: "Required by law", source: "Applicant Submission", size: "1.4 MB", statutoryRef: "RTRA Act s57B [K05]", families: ["My tenancy", "Appoint & lease"] },
  // Finance
  { id: "d18", title: "Lender Identity Verification & VOI Standard Certificate", category: "Finance", defaultLabel: "Requested by professional", source: "Aussie Home Loans (Broker)", size: "1.2 MB", statutoryRef: "ARNECC MPR Standard [K10]", families: ["Finance a home"] },
  { id: "d19", title: "Borrower PAYG Income Evidence (2 Consecutive Payslips + Group Cert)", category: "Borrower Vault", defaultLabel: "Requested by professional", source: "Private Borrower Vault", size: "2.1 MB", statutoryRef: "Lender Credit Policy [K10]", families: ["Finance a home"] },
];

const PACK_FAMILIES_LIST: PackFamily[] = [
  "Build & change",
  "Service & handover",
  "Sell a property",
  "Appoint & lease",
  "Finance a home",
  "My tenancy",
];

export default function ProDigitalKeyPage() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<"studio" | "packs" | "builder-flow" | "ledger" | "rules">("studio");

  // Dropdown filters
  const [selectedPropFilter, setSelectedPropFilter] = useState<string>("all");
  const [selectedFamilyFilter, setSelectedFamilyFilter] = useState<string>("all");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("all");

  // Notification Toast
  const [bannerToast, setBannerToast] = useState<string | null>(null);
  const showBannerToast = (msg: string) => {
    setBannerToast(msg);
    setTimeout(() => setBannerToast(null), 4500);
  };

  // ── Pack Studio Interactive Request Generator ──
  const [studioRole, setStudioRole] = useState<ProRole>("Builder & Contractor");
  const [studioFamily, setStudioFamily] = useState<PackFamily>("Build & change");
  const [studioPropId, setStudioPropId] = useState<string>("TPH-KEN-018");
  const [studioTitle, setStudioTitle] = useState<string>("Priced Variation Notice #04 (Kitchen Stone)");
  const [studioDescription, setStudioDescription] = useState<string>("Priced QBCC Form 7 variation notice detailing price effect and zero delay timing for Caesarstone mitred edge island upgrade.");
  const [studioExecutionRoute, setStudioExecutionRoute] = useState<ExecutionRoute>("Approved electronic signing (ETA 2001)");
  
  // Branching Questions (Step 3 in PDF Brief)
  const [hasPool, setHasPool] = useState<boolean>(false);
  const [isBodyCorporate, setIsBodyCorporate] = useState<boolean>(false);
  const [isUrgentVariation, setIsUrgentVariation] = useState<boolean>(false);
  const [borrowerType, setBorrowerType] = useState<"PAYG" | "Self-Employed">("PAYG");
  const [isNewLease, setIsNewLease] = useState<boolean>(true);

  // Modals
  const [selectedPackModal, setSelectedPackModal] = useState<ProPack | null>(null);
  const [previewDocModal, setPreviewDocModal] = useState<PackItem | null>(null);

  // ── Existing Pro Packs List (Representing the 6 Pack Families) ──
  const [packsList, setPacksList] = useState<ProPack[]>([
    {
      id: "PACK-BLD-004",
      propId: "TPH-KEN-018",
      propertyAddress: "18 Banksia Crescent, Kenmore",
      clientName: "Alex & Emily (Homeowners)",
      issuerRole: "Builder & Contractor",
      family: "Build & change",
      title: "Statutory Variation #04 (Kitchen Island Stone)",
      description: "Priced QBCC Form 7 variation notice for 40mm Caesarstone upgrade. Includes specification, cost effect ($840 AUD incl. GST) and zero day delay impact.",
      recipientRole: "Homeowners (Alex & Emily)",
      executionRoute: "Approved electronic signing (ETA 2001)",
      actionRequired: "Client Signature",
      status: "Signed / Executed",
      statusColor: "bg-[#eaf4ef] text-[#28715e] border-[#c7e3d1]",
      nextAction: "Work authorized to proceed onsite under QBCC s65",
      updatedAt: "Today 11:20 AM",
      trustlinkId: "TL-99214-B",
      trustlinkHref: "/pro/trustlinks/TL-99214-B",
      hash: "0x89f2a7b1c3e459021a",
      items: [
        { id: "i-b1", title: "QBCC Form 7 · Variation Notice #04", category: "Contract", label: "Required by law", size: "840 KB", source: "Hart Homes Commercial", statutoryRef: "QBCC Act s65 [K07]", isRequired: true },
        { id: "i-b2", title: "Caesarstone 40mm Mitred Edge Spec & Drawing", category: "Specification", label: "Requested by professional", size: "1.1 MB", source: "Hart Homes Selection", statutoryRef: "Contract Spec Schedule", isRequired: true },
      ],
    },
    {
      id: "PACK-HO-018",
      propId: "TPH-KEN-018",
      propertyAddress: "18 Banksia Crescent, Kenmore",
      clientName: "Alex & Emily (Homeowners)",
      issuerRole: "Builder & Contractor",
      family: "Service & handover",
      title: "Practical Completion & Sovereign Digital Key Handover",
      description: "Compendium of Form 16 structural engineering, Form 43 waterproofing, Form 4 electrical and termite warranty for final handover signoff.",
      recipientRole: "Homeowners (Alex & Emily)",
      executionRoute: "Approved electronic signing (ETA 2001)",
      actionRequired: "Handover Acceptance",
      status: "Sent to Client",
      statusColor: "bg-[#fbf3e4] text-[#946315] border-[#fce3b8]",
      nextAction: "Waiting for homeowner digital receipt acceptance",
      updatedAt: "Today 10:48 AM",
      trustlinkId: "TL-99214-B",
      trustlinkHref: "/pro/trustlinks/TL-99214-B",
      items: [
        { id: "i-h1", title: "QBCC Form 16 · Structural Engineering Final Inspection", category: "Statutory", label: "Required by law", size: "2.4 MB", source: "Apex Engineering QLD", statutoryRef: "Building Act 1975 [K07]", isRequired: true },
        { id: "i-h2", title: "AS 3740 Form 43 · Wet-Area Waterproofing Certificate", category: "Compliance", label: "Required by law", size: "1.8 MB", source: "HydroSeal QLD", statutoryRef: "QBCC Regs [K07]", isRequired: true },
        { id: "i-h3", title: "Electrical Safety Act Form 4 · Electrical Compliance", category: "Compliance", label: "Required by law", size: "680 KB", source: "Lachlan Electrical", statutoryRef: "Electrical Safety Act 2002", isRequired: true },
        { id: "i-h4", title: "Termimesh Physical Barrier System Warranty & Notice (AS 3660.1)", category: "Warranty", label: "Conditional legal requirement", size: "2.1 MB", source: "Flick Pest Control", statutoryRef: "BCA AS 3660.1", isRequired: true },
        { id: "i-h5", title: "Architectural & Engineering Drawings (As-Built Set)", category: "Plans", label: "Requested by professional", size: "8.4 MB", source: "Hart Homes Studio", statutoryRef: "Contract Schedule", isRequired: false },
        { id: "i-h6", title: "Appliance Care & Warranty Compendium", category: "Manuals", label: "Optional supporting record", size: "4.2 MB", source: "Hart Homes Handoff", statutoryRef: "Client Handoff Guide", isRequired: false },
      ],
    },
    {
      id: "PACK-SEL-007",
      propId: "TPH-GRV-007",
      propertyAddress: "7 Cedar Street, Graceville",
      clientName: "Sofia Nguyen (Vendor)",
      issuerRole: "Solicitor / Conveyancing Team",
      family: "Sell a property",
      title: "Queensland Seller Disclosure Pack (Form 2 Draft)",
      description: "Mandatory statutory disclosure scheme dossier including draft Form 2, current title searches, cadastral plan, and council overlays.",
      recipientRole: "Vendor & Selling Agent",
      executionRoute: "External e-conveyancing (PEXA)",
      actionRequired: "Review & Signoff",
      status: "Ready to Issue",
      statusColor: "bg-[#eef4ff] text-[#0F1A2C] border-[#cbd5e2]",
      nextAction: "Ready to issue to vendor before contract signing",
      updatedAt: "Yesterday 4:10 PM",
      trustlinkId: "TL-88301-A",
      trustlinkHref: "/pro/trustlinks/TL-88301-A",
      items: [
        { id: "i-s1", title: "Queensland Seller Disclosure Statement (Form 2 Draft)", category: "Disclosure", label: "Required by law", size: "1.4 MB", source: "River City Conveyancing", statutoryRef: "POA Act s206 / SDS [K01]", isRequired: true },
        { id: "i-s2", title: "Titles Queensland Current Title Search & Registered Plan RP 88201", category: "Title", label: "Required by law", size: "1.1 MB", source: "Titles Queensland Search", statutoryRef: "Land Title Act 1994 [K01]", isRequired: true },
        { id: "i-s3", title: "Residential Agency Appointment (OFT Form 6)", category: "Agency", label: "Required by law", size: "1.3 MB", source: "Ray White Kenmore", statutoryRef: "Property Occupations Act [K02]", isRequired: true },
      ],
    },
    {
      id: "PACK-LSE-042",
      propId: "TPH-BRK-042",
      propertyAddress: "42 Ridge Road, Brookfield",
      clientName: "Noah & Mia Wilson (Landlords)",
      issuerRole: "Residential Property Manager",
      family: "Appoint & lease",
      title: "General Tenancy Onboarding Pack (RTA Form 18a + 17a + 1a)",
      description: "Statutory residential tenancy dossier including executed Form 18a, Pocket Guide for Tenants, Entry Condition Report, and OFT Form 6 management authority.",
      recipientRole: "Landlord & Approved Tenant",
      executionRoute: "Approved electronic signing (ETA 2001)",
      actionRequired: "Client Signature",
      status: "Ready to Issue",
      statusColor: "bg-[#eef4ff] text-[#0F1A2C] border-[#cbd5e2]",
      nextAction: "Tenant signature required within statutory 5-day window",
      updatedAt: "2 days ago",
      trustlinkId: "TL-76100-C",
      trustlinkHref: "/pro/trustlinks/TL-76100-C",
      items: [
        { id: "i-l1", title: "RTA General Tenancy Agreement (Form 18a) + Special Terms", category: "Tenancy", label: "Required by law", size: "1.9 MB", source: "Place Property Management", statutoryRef: "RTRA Act 2008 s61 [K04]", isRequired: true },
        { id: "i-l2", title: "RTA Pocket Guide for Tenants (Form 17a Information Sheet)", category: "Information", label: "Required by law", size: "820 KB", source: "RTA Queensland", statutoryRef: "RTRA Act s67 [K04]", isRequired: true },
        { id: "i-l3", title: "RTA Entry Condition Report (Form 1a)", category: "Condition", label: "Required by law", size: "2.5 MB", source: "Place Property Management", statutoryRef: "RTRA Act s65 [K04]", isRequired: true },
        { id: "i-l4", title: "Residential Agency Appointment (OFT Form 6)", category: "Agency", label: "Required by law", size: "1.3 MB", source: "Place Property Management", statutoryRef: "Property Occupations Act [K02]", isRequired: true },
      ],
    },
    {
      id: "PACK-FIN-018",
      propId: "TPH-KEN-018",
      propertyAddress: "18 Banksia Crescent, Kenmore",
      clientName: "Alex & Emily (Borrowers)",
      issuerRole: "Mortgage Broker & Lender",
      family: "Finance a home",
      title: "Construction Loan Progress Draw #05 Verification Dossier",
      description: "Private borrower financing packet including independent certifier signoff, claims invoice, and lender VOI. Kept strictly within private borrower vault.",
      recipientRole: "Named Lender Credit Team (CommBank)",
      executionRoute: "Approved electronic signing (ETA 2001)",
      actionRequired: "Review & Signoff",
      status: "Signed / Executed",
      statusColor: "bg-[#eaf4ef] text-[#28715e] border-[#c7e3d1]",
      nextAction: "Lender released final progress drawdown payment",
      updatedAt: "3 days ago",
      trustlinkId: "TL-99214-B",
      trustlinkHref: "/pro/trustlinks/TL-99214-B",
      hash: "0x44c1d2e3f4a567890b",
      items: [
        { id: "i-f1", title: "Lender Identity Verification & VOI Standard Certificate", category: "Finance", label: "Requested by professional", size: "1.2 MB", source: "Aussie Home Loans (Broker)", statutoryRef: "ARNECC MPR Standard [K10]", isRequired: true },
        { id: "i-f2", title: "Borrower PAYG Income Evidence (2 Consecutive Payslips)", category: "Borrower Vault", label: "Requested by professional", size: "2.1 MB", source: "Private Borrower Vault", statutoryRef: "CommBank Lending Policy [K10]", isRequired: true },
      ],
    },
  ]);

  // ── Executed Receipts Ledger [Page 10 of Brief] ──
  const [receiptsList, setReceiptsList] = useState<ExecutedReceipt[]>([
    {
      id: "RCPT-QLD-88201",
      packId: "PACK-BLD-004",
      packTitle: "Statutory Variation #04 (Kitchen Island Stone)",
      family: "Build & change",
      propId: "TPH-KEN-018",
      propertyAddress: "18 Banksia Crescent, Kenmore",
      clientName: "Alex & Emily",
      executedDate: "Today 11:20 AM",
      hash: "0x89f2a7b1c3e459021a6039ff012bb",
      documentsCount: 2,
      highlightDocs: ["QBCC Form 7 Variation Notice", "Mitred Stone Detail Drawing"],
      signers: ["Alex Choudhary (Owner)", "Emily Choudhary (Owner)", "Marcus Hart (Hart Homes QBCC #10892)"],
      statutoryCertification: "QBCC Act 1991 s65 compliant written variation execution before commencement of variation works.",
    },
    {
      id: "RCPT-QLD-76192",
      packId: "PACK-FIN-018",
      packTitle: "Construction Progress Draw #05 Verification Dossier",
      family: "Finance a home",
      propId: "TPH-KEN-018",
      propertyAddress: "18 Banksia Crescent, Kenmore",
      clientName: "Alex & Emily",
      executedDate: "3 days ago",
      hash: "0x44c1d2e3f4a567890b5521ef8891a",
      documentsCount: 2,
      highlightDocs: ["Lender VOI Certificate", "PAYG Verified Income Statement"],
      signers: ["Alex Choudhary", "CBA Credit Assessor #4810"],
      statutoryCertification: "Private borrower transaction envelope sealed. Excluded from transferable property history.",
    },
  ]);

  // ── Dynamic items assembly based on Branching Questions (Step 3 & 4) ──
  const dynamicallyAssembledItems = useMemo(() => {
    let items = REPO_DOCUMENTS.filter((d) => d.families.includes(studioFamily));

    // Branching rules
    if (studioFamily === "Sell a property") {
      if (!hasPool) {
        items = items.filter((d) => d.id !== "d11");
      }
      if (!isBodyCorporate) {
        items = items.filter((d) => d.id !== "d12");
      }
    }

    if (studioFamily === "Build & change") {
      if (isUrgentVariation) {
        items = items.map((d) =>
          d.id === "d1"
            ? { ...d, notes: "Urgent work exception under QBCC Act s65(4). Oral agreement verified; written copy within 5 business days." }
            : d
        );
      }
    }

    if (studioFamily === "Finance a home") {
      if (borrowerType === "Self-Employed") {
        items = items.map((d) =>
          d.id === "d19"
            ? { ...d, title: "Borrower Self-Employed Financials (2 Years Tax Returns & Notice of Assessment)", size: "3.8 MB" }
            : d
        );
      }
    }

    return items;
  }, [studioFamily, hasPool, isBodyCorporate, isUrgentVariation, borrowerType]);

  // Handle Create Pack from Studio
  const handlePublishStudioPack = (e: React.FormEvent) => {
    e.preventDefault();
    const prop = PROPERTIES_LIST.find((p) => p.id === studioPropId) || PROPERTIES_LIST[0];
    const client = studioPropId === "TPH-KEN-018" ? "Alex & Emily" : studioPropId === "TPH-GRV-007" ? "Sofia Nguyen" : "Noah & Mia Wilson";

    const assembledPackItems: PackItem[] = dynamicallyAssembledItems.map((doc, idx) => ({
      id: `itm-${Date.now()}-${idx}`,
      title: doc.title,
      category: doc.category,
      label: doc.defaultLabel,
      size: doc.size,
      source: doc.source,
      statutoryRef: doc.statutoryRef,
      isRequired: doc.defaultLabel === "Required by law" || doc.defaultLabel === "Conditional legal requirement",
    }));

    const newPackId = `PACK-${studioFamily.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    const newPack: ProPack = {
      id: newPackId,
      propId: prop.id,
      propertyAddress: `${prop.street}, ${prop.suburb}`,
      clientName: client,
      issuerRole: studioRole,
      family: studioFamily,
      title: studioTitle.trim() || `${studioFamily} pack`,
      description: studioDescription.trim(),
      recipientRole: studioFamily === "Sell a property" ? "Buyer / Solicitor" : studioFamily === "Appoint & lease" ? "Tenant / Landlord" : "Property Owner",
      executionRoute: studioExecutionRoute,
      actionRequired: studioFamily === "Sell a property" ? "Review & Signoff" : studioFamily === "Build & change" ? "Client Signature" : "Handover Acceptance",
      status: "Sent to Client",
      statusColor: "bg-[#fbf3e4] text-[#946315] border-[#fce3b8]",
      nextAction: "Pack published and sent to client via TrustLink.",
      updatedAt: "Just now",
      trustlinkId: prop.trustlinkId || "TL-99214-B",
      trustlinkHref: `/pro/trustlinks/${prop.trustlinkId || "TL-99214-B"}`,
      items: assembledPackItems,
    };

    setPacksList([newPack, ...packsList]);
    showBannerToast(`New Queensland ${studioFamily} pack published and issued to ${client}.`);
    setActiveTab("packs");
  };

  // Filter packs list based on dropdown values
  const filteredPacks = packsList.filter((p) => {
    const matchProp = selectedPropFilter === "all" || p.propId === selectedPropFilter;
    const matchFam = selectedFamilyFilter === "all" || p.family === selectedFamilyFilter;
    const matchStatus = selectedStatusFilter === "all" || p.status === selectedStatusFilter;
    return matchProp && matchFam && matchStatus;
  });

  return (
    <div className="p-6 sm:p-9 lg:p-11 max-w-[1240px] w-full font-sans text-[#183249] space-y-8">
      {/* ── Toast Notification ── */}
      {bannerToast && (
        <div className="fixed top-5 right-5 z-50 bg-[#0F1A2C] text-white px-5 py-3.5 rounded-xl shadow-xl text-sm font-medium flex items-center gap-3 max-w-md border border-[#28715e]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] flex-shrink-0 animate-pulse" />
          <span>{bannerToast}</span>
        </div>
      )}

      {/* ── Page Header Block ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#e2e5e5] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[1.6px] text-[#28715e] bg-[#eaf4ef] px-2.5 py-0.5 rounded-md border border-[#c7e3d1]">
              QUEENSLAND REGULATORY WORKFLOW
            </span>
            <span className="text-xs font-mono font-semibold text-[#64727e]">
              PRO HUB ENGINE
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#183249]">
            Digital Key
          </h1>
          <p className="text-[13.5px] text-[#64727e] mt-1 max-w-2xl leading-relaxed">
            The place where property deals, statutory variations, tenancy leases and completions close. Assemble professional packs, enforce Queensland rules, and file immutable receipts.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
          <button
            onClick={() => {
              setActiveTab("studio");
              showBannerToast("Ready to assemble a new document pack.");
            }}
            className="px-4 py-2 bg-[#0F1A2C] hover:bg-[#1c3a54] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span className="text-sm font-mono">+</span>
            <span>New Pack</span>
          </button>
          <Link
            href="/pro/tradie"
            className="px-4 py-2 bg-white border border-[#e2e5e5] hover:bg-[#F9F8F5] text-[#183249] rounded-xl text-xs font-semibold transition-colors"
          >
            Tradie Hub ↗
          </Link>
        </div>
      </div>

      {/* ── Top Navigation Tabs Bar ── */}
      <div className="flex items-center justify-between gap-4 flex-wrap border-b border-[#e2e5e5]">
        <div className="flex items-center gap-2 overflow-x-auto">
          {[
            { id: "studio", label: "Create Pack" },
            { id: "packs", label: "Active Packs", count: packsList.length },
            { id: "builder-flow", label: "Variations Guide" },
            { id: "ledger", label: "Signed History", count: receiptsList.length },
            { id: "rules", label: "Legal Rules" },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`pb-3.5 px-3 text-xs sm:text-[13px] font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "border-[#0F1A2C] text-[#0F1A2C]"
                    : "border-transparent text-[#64727e] hover:text-[#183249]"
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-[#eef4ff] text-[#0F1A2C]" : "bg-[#f1f5f9] text-[#64727e]"
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════
          TAB 1: REQUEST & PACK STUDIO (PAGES 2 - 3 OF BRIEF)
      ═════════════════════════════════════════════════════════════════ */}
      {activeTab === "studio" && (
        <div className="space-y-8">
          {/* Header Explanation Banner */}
          <div className="bg-[#f8fafc] border border-[#e2e5e5] rounded-2xl p-6 shadow-2xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#28715e] block mb-1">
                  02 / PACK GENERATION PRINCIPLE
                </span>
                <h2 className="text-lg font-bold text-[#183249]">
                  Let the Pro Hub request shape the pack.
                </h2>
                <p className="text-xs text-[#64727e] mt-1 max-w-2xl leading-relaxed">
                  Each professional publishes a scoped, versioned requirement list. Queensland statutory rules constrain what that list can demand. The consumer approves the actual manifest.
                </p>
              </div>

              {/* Requirement Labels Legend (Page 3 of Brief) */}
              <div className="flex flex-wrap gap-2 text-[10.5px]">
                <span className="px-2.5 py-1 rounded-full font-bold bg-[#fee2e2] text-[#991b1b] border border-[#fecaca]" title="Statutory rule for this workflow">
                  Required by law
                </span>
                <span className="px-2.5 py-1 rounded-full font-bold bg-[#dbeafe] text-[#1e40af] border border-[#bfdbfe]" title="Required only if stated facts apply (e.g. pool, body corp)">
                  Conditional legal
                </span>
                <span className="px-2.5 py-1 rounded-full font-bold bg-[#f1f5f9] text-[#1e293b] border border-[#cbd5e1]" title="Needed for professional service or lender policy">
                  Requested by pro
                </span>
                <span className="px-2.5 py-1 rounded-full font-bold bg-[#f8fafc] text-[#64748b] border border-[#e2e8f0]" title="Voluntary supporting evidence">
                  Optional record
                </span>
              </div>
            </div>
          </div>

          {/* Form Grid */}
          <form onSubmit={handlePublishStudioPack} className="bg-white border border-[#e2e5e5] rounded-2xl p-6 sm:p-8 shadow-sm space-y-7">
            {/* Step 1: Define Request Parameters */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-5 h-5 rounded-full bg-[#0F1A2C] text-white text-[11px] font-bold flex items-center justify-center">1</span>
                <h3 className="text-sm font-bold text-[#183249]">Define Request &amp; Professional Role</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="studio-role-select" className="block text-xs font-bold text-[#64727e] mb-1.5">
                    Your Professional Role
                  </label>
                  <select
                    id="studio-role-select"
                    value={studioRole}
                    onChange={(e) => {
                      const r = e.target.value as ProRole;
                      setStudioRole(r);
                      if (r === "Builder & Contractor") setStudioFamily("Build & change");
                      else if (r === "Solicitor / Conveyancing Team") setStudioFamily("Sell a property");
                      else if (r === "Residential Property Manager") setStudioFamily("Appoint & lease");
                      else if (r === "Mortgage Broker & Lender") setStudioFamily("Finance a home");
                    }}
                    className="w-full bg-[#f8fafc] border border-[#e2e5e5] rounded-xl px-3.5 py-2 text-xs font-semibold text-[#183249] focus:outline-none focus:border-[#0F1A2C]"
                  >
                    <option value="Builder & Contractor">Builder &amp; Contractor</option>
                    <option value="Solicitor / Conveyancing Team">Solicitor / Conveyancing Team</option>
                    <option value="Residential Property Manager">Residential Property Manager</option>
                    <option value="Mortgage Broker & Lender">Mortgage Broker &amp; Lender</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="studio-family-select" className="block text-xs font-bold text-[#64727e] mb-1.5">
                    Pack Family (6 Regulated Families)
                  </label>
                  <select
                    id="studio-family-select"
                    value={studioFamily}
                    onChange={(e) => setStudioFamily(e.target.value as PackFamily)}
                    className="w-full bg-[#f8fafc] border border-[#e2e5e5] rounded-xl px-3.5 py-2 text-xs font-semibold text-[#183249] focus:outline-none focus:border-[#0F1A2C]"
                  >
                    {PACK_FAMILIES_LIST.map((fam) => (
                      <option key={fam} value={fam}>{fam}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="studio-property-select" className="block text-xs font-bold text-[#64727e] mb-1.5">
                    Target Property &amp; Sovereign Vault
                  </label>
                  <select
                    id="studio-property-select"
                    value={studioPropId}
                    onChange={(e) => setStudioPropId(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e5e5] rounded-xl px-3.5 py-2 text-xs font-semibold text-[#183249] focus:outline-none focus:border-[#0F1A2C]"
                  >
                    {PROPERTIES_LIST.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.street}, {p.suburb} ({p.propId})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Branching Questions Engine (Page 3 Step 3 in Brief) */}
            <div className="pt-4 border-t border-[#f1f5f9]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 rounded-full bg-[#0F1A2C] text-white text-[11px] font-bold flex items-center justify-center">2</span>
                <h3 className="text-sm font-bold text-[#183249]">
                  Branching Questions (Statutory Rule Constraints)
                </h3>
              </div>
              <p className="text-xs text-[#64727e] mb-4">
                A question changes the required list. Law-required items are attached automatically; unlawful extra requests are blocked.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#f8fafc] p-4 rounded-xl border border-[#e2e5e5]">
                {studioFamily === "Sell a property" && (
                  <>
                    <label className="flex items-center gap-2 text-xs font-semibold text-[#183249] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasPool}
                        onChange={(e) => setHasPool(e.target.checked)}
                        className="rounded text-[#0F1A2C] w-4 h-4 cursor-pointer"
                      />
                      <span>Property has a regulated swimming pool (Triggers QLD Form 23 Pool Safety Cert)</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs font-semibold text-[#183249] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isBodyCorporate}
                        onChange={(e) => setIsBodyCorporate(e.target.checked)}
                        className="rounded text-[#0F1A2C] w-4 h-4 cursor-pointer"
                      />
                      <span>Community Title / Body Corporate (Triggers BCCM s206 Disclosure &amp; CMS)</span>
                    </label>
                  </>
                )}

                {studioFamily === "Build & change" && (
                  <>
                    <label className="flex items-center gap-2 text-xs font-semibold text-[#183249] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isUrgentVariation}
                        onChange={(e) => setIsUrgentVariation(e.target.checked)}
                        className="rounded text-[#0F1A2C] w-4 h-4 cursor-pointer"
                      />
                      <span>Urgent-work exception claim (QBCC s65(4) limited exception)</span>
                    </label>
                    <div className="text-xs text-[#64727e] flex items-center gap-2">
                      <span>Variation Delay Estimate:</span>
                      <span className="font-bold text-[#183249] bg-white px-2 py-0.5 rounded border border-[#e2e5e5]">0 business days</span>
                    </div>
                  </>
                )}

                {studioFamily === "Appoint & lease" && (
                  <>
                    <label className="flex items-center gap-2 text-xs font-semibold text-[#183249] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isNewLease}
                        onChange={(e) => setIsNewLease(e.target.checked)}
                        className="rounded text-[#0F1A2C] w-4 h-4 cursor-pointer"
                      />
                      <span>New tenancy commencement (Attaches Form 1a Entry Condition Report &amp; Form 17a)</span>
                    </label>
                    <div className="text-xs text-[#28715e] font-semibold">
                      ✓ RTA Form 22 Guardrails active: Max 2 docs per category enforced.
                    </div>
                  </>
                )}

                {studioFamily === "Finance a home" && (
                  <>
                    <div>
                      <span className="text-xs font-bold text-[#64727e] block mb-1">Borrower Employment Classification</span>
                      <select
                        value={borrowerType}
                        onChange={(e) => setBorrowerType(e.target.value as "PAYG" | "Self-Employed")}
                        className="w-full bg-white border border-[#e2e5e5] rounded-lg px-2.5 py-1.5 text-xs text-[#183249]"
                      >
                        <option value="PAYG">PAYG Full-time / Part-time</option>
                        <option value="Self-Employed">Self-Employed / Sole Trader (Requires 2Y Tax Returns)</option>
                      </select>
                    </div>
                    <div className="text-xs text-[#b45309] font-medium flex items-center">
                      🔒 Kept in Private Borrower Compartment. Never transfers with property record.
                    </div>
                  </>
                )}

                {(studioFamily === "Service & handover" || studioFamily === "My tenancy") && (
                  <div className="text-xs text-[#64727e] col-span-2">
                    Standard Queensland statutory baseline loaded. No special branching overrides required.
                  </div>
                )}
              </div>
            </div>

            {/* Step 3: Assembled Document Manifest (Page 3 Step 4 & 5) */}
            <div className="pt-4 border-t border-[#f1f5f9]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#0F1A2C] text-white text-[11px] font-bold flex items-center justify-center">3</span>
                  <h3 className="text-sm font-bold text-[#183249]">
                    Generated Manifest ({dynamicallyAssembledItems.length} items)
                  </h3>
                </div>
                <span className="text-[11px] font-semibold text-[#28715e]">
                  ✓ Verified against Queensland Rulebook
                </span>
              </div>

              <div className="border border-[#e2e5e5] rounded-xl overflow-hidden divide-y divide-[#f1f5f9]">
                {dynamicallyAssembledItems.map((item) => (
                  <div key={item.id} className="p-3.5 flex items-center justify-between gap-4 hover:bg-[#fafbfc] transition-colors">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-[#183249] truncate">{item.title}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          item.defaultLabel === "Required by law"
                            ? "bg-[#fee2e2] text-[#991b1b]"
                            : item.defaultLabel === "Conditional legal requirement"
                            ? "bg-[#dbeafe] text-[#1e40af]"
                            : item.defaultLabel === "Requested by professional"
                            ? "bg-[#f1f5f9] text-[#1e293b]"
                            : "bg-[#f8fafc] text-[#64748b] border border-[#e2e8f0]"
                        }`}>
                          {item.defaultLabel}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#64727e] mt-0.5 flex items-center gap-2">
                        <span>{item.category}</span>
                        <span>·</span>
                        <span>{item.size}</span>
                        <span>·</span>
                        <span className="font-mono text-[#0F1A2C]">{item.statutoryRef}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setPreviewDocModal({
                        id: item.id,
                        title: item.title,
                        category: item.category,
                        label: item.defaultLabel,
                        size: item.size,
                        source: item.source,
                        statutoryRef: item.statutoryRef,
                      })}
                      className="px-3 py-1 bg-white border border-[#cbd5e1] hover:bg-[#f8fafc] text-xs font-semibold rounded-lg text-[#183249] cursor-pointer"
                    >
                      Inspect
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 4: Signing Route & Publish (Page 8 & 10) */}
            <div className="pt-4 border-t border-[#f1f5f9]">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-5 h-5 rounded-full bg-[#0F1A2C] text-white text-[11px] font-bold flex items-center justify-center">4</span>
                <h3 className="text-sm font-bold text-[#183249]">Execution Route &amp; Issuance</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="studio-execution-route" className="block text-xs font-bold text-[#64727e] mb-1.5">
                    Execution Route (Page 8 of Brief)
                  </label>
                  <select
                    id="studio-execution-route"
                    value={studioExecutionRoute}
                    onChange={(e) => setStudioExecutionRoute(e.target.value as ExecutionRoute)}
                    className="w-full bg-[#f8fafc] border border-[#e2e5e5] rounded-xl px-3.5 py-2 text-xs font-semibold text-[#183249] focus:outline-none focus:border-[#0F1A2C]"
                  >
                    <option value="Approved electronic signing (ETA 2001)">Approved electronic signing (ETA 2001 s14)</option>
                    <option value="External e-conveyancing (PEXA)">External e-conveyancing (PEXA / ELNO)</option>
                    <option value="Witnessed / Paper (Titles QLD)">Witnessed / Paper (Titles QLD qualified witness)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#64727e] mb-1.5">
                    Pack Title
                  </label>
                  <input
                    type="text"
                    required
                    value={studioTitle}
                    onChange={(e) => setStudioTitle(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e5e5] rounded-xl px-3.5 py-2 text-xs text-[#183249] focus:outline-none focus:border-[#0F1A2C]"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-xs font-bold text-[#64727e] mb-1.5">
                  Matter Purpose / Instruction Notes
                </label>
                <textarea
                  rows={2}
                  value={studioDescription}
                  onChange={(e) => setStudioDescription(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-[#e2e5e5] rounded-xl px-3.5 py-2 text-xs text-[#183249] focus:outline-none focus:border-[#0F1A2C]"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <p className="text-[11.5px] text-[#64727e]">
                  Freezes manifest. Generates cryptographic receipt hash upon client delivery.
                </p>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0F1A2C] hover:bg-[#1c3a54] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  Publish &amp; Send to Client Pack →
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════
          TAB 2: ACTIVE DEALS & PACKS
      ═════════════════════════════════════════════════════════════════ */}
      {activeTab === "packs" && (
        <div className="space-y-6">
          {/* Dropdown Filters Bar */}
          <div className="bg-white border border-[#e2e5e5] rounded-2xl p-4 shadow-2xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* Category Dropdown (Requested by User!) */}
              <div className="flex items-center gap-2">
                <label htmlFor="pro-family-filter" className="text-xs font-bold text-[#64727e]">
                  Pack Family:
                </label>
                <div className="relative min-w-[210px]">
                  <select
                    id="pro-family-filter"
                    value={selectedFamilyFilter}
                    onChange={(e) => setSelectedFamilyFilter(e.target.value)}
                    className="w-full appearance-none bg-[#f8fafc] border border-[#e2e5e5] hover:border-[#cbd5e1] text-[#183249] font-bold text-xs rounded-xl px-3.5 py-2 pr-9 focus:outline-none focus:border-[#0F1A2C] cursor-pointer transition-colors"
                  >
                    <option value="all">All Pack Families (6)</option>
                    {PACK_FAMILIES_LIST.map((fam) => (
                      <option key={fam} value={fam}>{fam}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#64727e]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Property / Client Dropdown */}
              <div className="flex items-center gap-2">
                <label htmlFor="pro-prop-filter" className="text-xs font-bold text-[#64727e]">
                  Property:
                </label>
                <div className="relative min-w-[210px]">
                  <select
                    id="pro-prop-filter"
                    value={selectedPropFilter}
                    onChange={(e) => setSelectedPropFilter(e.target.value)}
                    className="w-full appearance-none bg-[#f8fafc] border border-[#e2e5e5] hover:border-[#cbd5e1] text-[#183249] font-bold text-xs rounded-xl px-3.5 py-2 pr-9 focus:outline-none focus:border-[#0F1A2C] cursor-pointer transition-colors"
                  >
                    <option value="all">All Properties</option>
                    {PROPERTIES_LIST.map((p) => (
                      <option key={p.id} value={p.id}>{p.street}, {p.suburb}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#64727e]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Status Dropdown */}
              <div className="flex items-center gap-2">
                <label htmlFor="pro-status-filter" className="text-xs font-bold text-[#64727e]">
                  Status:
                </label>
                <div className="relative min-w-[170px]">
                  <select
                    id="pro-status-filter"
                    value={selectedStatusFilter}
                    onChange={(e) => setSelectedStatusFilter(e.target.value)}
                    className="w-full appearance-none bg-[#f8fafc] border border-[#e2e5e5] hover:border-[#cbd5e1] text-[#183249] font-bold text-xs rounded-xl px-3.5 py-2 pr-9 focus:outline-none focus:border-[#0F1A2C] cursor-pointer transition-colors"
                  >
                    <option value="all">All Statuses</option>
                    <option value="Sent to Client">Sent to Client</option>
                    <option value="Signed / Executed">Signed / Executed</option>
                    <option value="Ready to Issue">Ready to Issue</option>
                    <option value="Fully Sealed to Vault">Fully Sealed</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#64727e]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <span className="text-xs font-semibold text-[#64727e]">
              Showing {filteredPacks.length} of {packsList.length} packs
            </span>
          </div>

          {/* Packs Cards List */}
          <div className="space-y-4">
            {filteredPacks.map((pack) => (
              <div
                key={pack.id}
                className="bg-white border border-[#e2e5e5] rounded-2xl p-6 shadow-sm hover:border-[#cbd5e1] transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-[#f1f5f9]">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#28715e] bg-[#eaf4ef] px-2 py-0.5 rounded border border-[#d2e6d9]">
                        {pack.family}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#64727e]">
                        {pack.id}
                      </span>
                      <span className="text-xs text-[#8a9bb0]">
                        · Issuer: {pack.issuerRole}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#183249]">{pack.title}</h3>
                    <p className="text-xs text-[#64727e] mt-0.5">
                      {pack.propertyAddress} · {pack.clientName}
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 flex-shrink-0">
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${pack.statusColor}`}>
                      {pack.status}
                    </span>
                    <button
                      onClick={() => setSelectedPackModal(pack)}
                      className="px-3 py-1.5 bg-[#0F1A2C] hover:bg-[#1c3a54] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      View Manifest ({pack.items.length})
                    </button>
                  </div>
                </div>

                {/* Pack items preview snippet */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {pack.items.slice(0, 4).map((item) => (
                    <div key={item.id} className="p-2.5 rounded-xl bg-[#f8fafc] border border-[#e2e5e5] flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-semibold text-[#183249] truncate">{item.title}</div>
                        <div className="text-[10.5px] text-[#64727e]">{item.category} · {item.size}</div>
                      </div>
                      <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                        item.label === "Required by law"
                          ? "bg-[#fee2e2] text-[#991b1b]"
                          : item.label === "Conditional legal requirement"
                          ? "bg-[#dbeafe] text-[#1e40af]"
                          : item.label === "Requested by professional"
                          ? "bg-[#f1f5f9] text-[#1e293b]"
                          : "bg-[#f8fafc] text-[#64748b] border border-[#e2e8f0]"
                      }`}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer Next Action Bar */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#64727e]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#0F1A2C]">Next Action:</span>
                    <span>{pack.nextAction}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-[#8a9bb0]">{pack.updatedAt}</span>
                    <Link
                      href={pack.trustlinkHref}
                      className="text-xs font-bold text-[#0F1A2C] hover:underline"
                    >
                      Open TrustLink Workspace →
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {filteredPacks.length === 0 && (
              <div className="bg-white border border-[#e2e5e5] rounded-2xl p-12 text-center text-xs text-[#64727e]">
                No digital key packs match the selected filters.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════
          TAB 3: BUILDER CHANGE LIFECYCLE (PAGE 6 OF BRIEF)
      ═════════════════════════════════════════════════════════════════ */}
      {activeTab === "builder-flow" && (
        <div className="space-y-6">
          <div className="bg-white border border-[#e2e5e5] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#28715e] block mb-1">
                05 / BUILDER PACK SPECIFICATION
              </span>
              <h2 className="text-xl font-bold text-[#183249]">
                A change request starts a controlled decision.
              </h2>
              <p className="text-xs text-[#64727e] mt-1 max-w-3xl leading-relaxed">
                QBCC requires that agreement to a written variation precedes work. The variation records its description, date, price effect, delay estimate and timing. Keep the four events strictly distinct.
              </p>
            </div>

            {/* The 4 Distinct Events in Brief */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#f8fafc] border border-[#e2e5e5] rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#64727e]">Moment 1</span>
                  <span className="text-xs">📝</span>
                </div>
                <h4 className="text-sm font-bold text-[#183249]">Requested Change</h4>
                <p className="text-[11.5px] text-[#64727e] leading-relaxed">
                  Owner requests exact proposed finish or model. Explicitly labeled <em>"Request only — not approved work"</em>.
                </p>
              </div>

              <div className="bg-[#eef4ff] border border-[#cbd5e2] rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F1A2C]">Moment 2</span>
                  <span className="text-xs">⚖️</span>
                </div>
                <h4 className="text-sm font-bold text-[#0F1A2C]">Approved Variation</h4>
                <p className="text-[11.5px] text-[#64727e] leading-relaxed">
                  Builder assesses scope &amp; returns priced QBCC Form 7 ($840 incl GST, 0 days delay). Both parties sign executed variation.
                </p>
              </div>

              <div className="bg-[#f8fafc] border border-[#e2e5e5] rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#64727e]">Moment 3</span>
                  <span className="text-xs">🔨</span>
                </div>
                <h4 className="text-sm font-bold text-[#183249]">Completed Work</h4>
                <p className="text-[11.5px] text-[#64727e] leading-relaxed">
                  Trades execute physical installation. Return serial numbers, manufacturer manuals, and revised as-built specs.
                </p>
              </div>

              <div className="bg-[#eaf4ef] border border-[#c7e3d1] rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#28715e]">Moment 4</span>
                  <span className="text-xs">🔑</span>
                </div>
                <h4 className="text-sm font-bold text-[#28715e]">Accepted Handover</h4>
                <p className="text-[11.5px] text-[#64727e] leading-relaxed">
                  Form 16/43 certificates deposit into sovereign vault. Client records receipt without releasing quality claims.
                </p>
              </div>
            </div>

            {/* Live Case Study: Kenmore Kitchen Variation */}
            <div className="pt-4 border-t border-[#f1f5f9] space-y-3">
              <h3 className="text-sm font-bold text-[#183249]">
                Active Case Study: 18 Banksia Crescent — Variation Notice #04
              </h3>
              <div className="bg-[#fcfdfe] border border-[#e2e5e5] rounded-xl p-5 space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-[#64727e] block text-[11px]">Proposed Item</span>
                    <strong className="text-[#183249]">40mm Caesarstone Mitred Island</strong>
                  </div>
                  <div>
                    <span className="text-[#64727e] block text-[11px]">Contract Price Effect</span>
                    <strong className="text-[#28715e]">+$840.00 AUD (incl. GST)</strong>
                  </div>
                  <div>
                    <span className="text-[#64727e] block text-[11px]">Estimated Delay</span>
                    <strong className="text-[#183249]">0 Business Days</strong>
                  </div>
                  <div>
                    <span className="text-[#64727e] block text-[11px]">Executed Document</span>
                    <strong className="text-[#0F1A2C]">Signed QBCC Form 7 ✓</strong>
                  </div>
                </div>
                <div className="pt-2 border-t border-[#f1f5f9] flex justify-between items-center text-xs">
                  <span className="text-[#64727e]">
                    Copy returned to client within 5 business days as mandated by QBCC Act s65.
                  </span>
                  <span className="font-bold text-[#28715e] flex items-center gap-1">
                    <span>✓</span> Compliant Statutory Execution
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════
          TAB 4: EXECUTED RECEIPTS LEDGER (PAGE 10 OF BRIEF)
      ═════════════════════════════════════════════════════════════════ */}
      {activeTab === "ledger" && (
        <div className="space-y-6">
          <div className="bg-[#f8fafc] border border-[#e2e5e5] rounded-2xl p-6 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#28715e] block mb-1">
              09 / IMPLEMENTATION CONTRACT
            </span>
            <h2 className="text-lg font-bold text-[#183249]">
              Immutable Exchange Receipts &amp; Cryptographic Ledgers
            </h2>
            <p className="text-xs text-[#64727e] mt-1 max-w-3xl leading-relaxed">
              Every completed transaction records separate send, transport delivery, viewing, acknowledgement, and validated return copy IDs. Duplicate callbacks are idempotent and never broaden access.
            </p>
          </div>

          <div className="space-y-4">
            {receiptsList.map((rcpt) => (
              <div
                key={rcpt.id}
                className="bg-white border border-[#e2e5e5] rounded-2xl p-6 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-[#f1f5f9]">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#28715e] bg-[#eaf4ef] px-2 py-0.5 rounded border border-[#d2e6d9]">
                        {rcpt.family}
                      </span>
                      <span className="font-mono text-xs font-bold text-[#0F1A2C]">
                        {rcpt.id}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#183249]">{rcpt.packTitle}</h3>
                    <p className="text-xs text-[#64727e] mt-0.5">
                      {rcpt.propertyAddress} · Client: {rcpt.clientName}
                    </p>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-xs text-[#28715e] font-bold block">Executed &amp; Filed</span>
                    <span className="text-[11px] text-[#8a9bb0] font-mono">{rcpt.executedDate}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[#64727e]">Sealed Documents:</span>
                    {rcpt.highlightDocs.map((doc, idx) => (
                      <span key={idx} className="bg-[#f8fafc] border border-[#e2e5e5] px-2.5 py-1 rounded-lg font-semibold text-[#183249]">
                        ✓ {doc}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[#64727e]">Signatory Parties:</span>
                    {rcpt.signers.map((s, idx) => (
                      <span key={idx} className="text-[11px] font-medium text-[#183249]">
                        {s}{idx < rcpt.signers.length - 1 ? " · " : ""}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 text-[11px] text-[#28715e] font-medium">
                    {rcpt.statutoryCertification}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#f1f5f9] flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] text-[#8a9bb0] truncate max-w-md">
                    SHA-256 Digest: {rcpt.hash}
                  </span>
                  <button
                    onClick={() => alert(`Opening validated cryptographic receipt: ${rcpt.id}\nDigest: ${rcpt.hash}`)}
                    className="text-xs font-bold text-[#0F1A2C] hover:underline cursor-pointer"
                  >
                    View Sealed Receipt →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════
          TAB 5: QUEENSLAND RULEBOOK [K01 - K16] (PAGES 12 - 13)
      ═════════════════════════════════════════════════════════════════ */}
      {activeTab === "rules" && (
        <div className="space-y-6">
          <div className="bg-[#f8fafc] border border-[#e2e5e5] rounded-2xl p-6 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#28715e] block mb-1">
              PRIMARY SOURCE REGISTER
            </span>
            <h2 className="text-lg font-bold text-[#183249]">
              Queensland Rules &amp; Professional Routes [K01 - K16]
            </h2>
            <p className="text-xs text-[#64727e] mt-1 max-w-3xl leading-relaxed">
              Checked 30 September 2026. The Pro Hub Digital Key enforces factual statutory workflows directly aligned with primary sources from Queensland Government, OFT, RTA, QBCC, and Titles Queensland.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRIMARY_SOURCES.map((source) => (
              <div
                key={source.code}
                className="bg-white border border-[#e2e5e5] rounded-2xl p-5 shadow-sm space-y-3 hover:border-[#cbd5e1] transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#0F1A2C] text-white">
                    {source.code}
                  </span>
                  <span className="text-[11px] font-bold text-[#28715e]">
                    {source.authority}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#183249]">{source.title}</h3>
                  <p className="text-xs text-[#64727e] mt-1 leading-relaxed">
                    {source.summary}
                  </p>
                </div>

                <div className="p-3 bg-[#f8fafc] rounded-xl border border-[#e2e5e5] text-[11.5px] text-[#0F1A2C] font-medium leading-relaxed">
                  <strong>Statutory Constraint:</strong> {source.statutoryRule}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MODAL: PACK MANIFEST DETAIL ── */}
      {selectedPackModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#e2e5e5] rounded-2xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-[#e2e5e5] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#28715e]">
                  {selectedPackModal.family}
                </span>
                <h3 className="text-lg font-bold text-[#183249]">{selectedPackModal.title}</h3>
                <p className="text-xs text-[#64727e] mt-0.5">
                  {selectedPackModal.propertyAddress} · {selectedPackModal.clientName}
                </p>
              </div>
              <button
                onClick={() => setSelectedPackModal(null)}
                className="text-[#64748b] hover:text-[#183249] p-1.5 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#64727e] leading-relaxed">
              {selectedPackModal.description}
            </p>

            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-[#183249] uppercase tracking-wider">
                Frozen Manifest Items ({selectedPackModal.items.length})
              </h4>
              <div className="border border-[#e2e5e5] rounded-xl divide-y divide-[#f1f5f9]">
                {selectedPackModal.items.map((item) => (
                  <div key={item.id} className="p-3 flex items-center justify-between gap-3 text-xs">
                    <div className="min-w-0">
                      <div className="font-semibold text-[#183249] truncate">{item.title}</div>
                      <div className="text-[10.5px] text-[#64727e]">
                        {item.category} · {item.size} · {item.source} {item.statutoryRef ? `· ${item.statutoryRef}` : ""}
                      </div>
                    </div>
                    <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                      item.label === "Required by law"
                        ? "bg-[#fee2e2] text-[#991b1b]"
                        : item.label === "Conditional legal requirement"
                        ? "bg-[#dbeafe] text-[#1e40af]"
                        : item.label === "Requested by professional"
                        ? "bg-[#f1f5f9] text-[#1e293b]"
                        : "bg-[#f8fafc] text-[#64748b] border border-[#e2e8f0]"
                    }`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs p-3 bg-[#f8fafc] rounded-xl border border-[#e2e5e5]">
              <div>
                <span className="text-[#64727e] block text-[11px]">Execution Route</span>
                <strong className="text-[#183249]">{selectedPackModal.executionRoute}</strong>
              </div>
              <div>
                <span className="text-[#64727e] block text-[11px]">Next Action</span>
                <strong className="text-[#0F1A2C]">{selectedPackModal.nextAction}</strong>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setSelectedPackModal(null)}
                className="px-4 py-2 bg-white border border-[#cbd5e1] text-[#183249] text-xs font-semibold rounded-xl hover:bg-[#f8fafc] cursor-pointer"
              >
                Close
              </button>
              <Link
                href={selectedPackModal.trustlinkHref}
                className="px-4 py-2 bg-[#0F1A2C] text-white text-xs font-bold rounded-xl hover:bg-[#1c3a54] cursor-pointer"
              >
                Open in TrustLink →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: DOCUMENT INSPECTION ── */}
      {previewDocModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#e2e5e5] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between border-b border-[#e2e5e5] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#28715e]">
                  DOCUMENT INSPECTOR
                </span>
                <h3 className="text-base font-bold text-[#183249]">{previewDocModal.title}</h3>
              </div>
              <button
                onClick={() => setPreviewDocModal(null)}
                className="text-[#64748b] hover:text-[#183249] p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#f1f5f9]">
                <span className="text-[#64727e]">Statutory Requirement</span>
                <span className="font-bold text-[#183249]">{previewDocModal.label}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#f1f5f9]">
                <span className="text-[#64727e]">Category</span>
                <span className="font-medium text-[#183249]">{previewDocModal.category}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#f1f5f9]">
                <span className="text-[#64727e]">Source Entity</span>
                <span className="font-medium text-[#183249]">{previewDocModal.source}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#f1f5f9]">
                <span className="text-[#64727e]">File Size</span>
                <span className="font-medium text-[#183249]">{previewDocModal.size}</span>
              </div>
              {previewDocModal.statutoryRef && (
                <div className="flex justify-between py-1.5 border-b border-[#f1f5f9]">
                  <span className="text-[#64727e]">Queensland Legal Reference</span>
                  <span className="font-mono font-bold text-[#0F1A2C]">{previewDocModal.statutoryRef}</span>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setPreviewDocModal(null)}
                className="px-4 py-2 bg-[#0F1A2C] text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
