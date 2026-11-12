export interface ProjectActionItem {
  id: string;
  title: string;
  description: string;
  meta: string;
  ctaLabel: string;
  ctaHref: string;
  iconType: "compare" | "check" | "people";
}

export interface ProjectDocumentRecord {
  id: string;
  title: string;
  category: string;
  issuer: string;
  date: string;
  status: "Reviewed" | "Ready to check" | "Sealed to Prop ID";
}

export interface ProjectSpecification {
  label: string;
  value: string;
  detail: string;
}

export interface ProProject {
  id: string;
  name: string;
  subtitle: string;
  fullAddress: string;
  suburb: string;
  propId: string;
  trustlinkId: string;
  statusBadge: "Handover review" | "Build in progress" | "Aftercare";
  bannerType: "photo" | "house-illustration" | "trees-illustration";
  imageUrl?: string;
  ownerInitials: string;
  ownerAvatarBg: string;
  ownerName: string;
  ownerRoleLabel: string;
  ownerConnectionSub: string;
  nextMilestoneDate: string;
  nextMilestoneDay: string;
  nextMilestoneMonth: string;
  nextMilestoneTitle: string;
  nextMilestoneDetail: string;
  handoverHeadline: string;
  handoverSubline: string;
  progressPercent: number;
  currentStage: "Prepared" | "Review together" | "At home";
  metrics: {
    recordsToReview: number;
    recordsReviewedCount: number;
    itemResponses: string;
    itemResponsesSub: string;
    openFollowUps: number;
    openFollowUpsSub: string;
  };
  legalInfo: {
    lotPlan: string;
    councilApproval: string;
    certifier: string;
    siteSupervisor: string;
    warrantyStatus: string;
  };
  actionItems: ProjectActionItem[];
  specifications: ProjectSpecification[];
  documents: ProjectDocumentRecord[];
  activeTrades: { name: string; scope: string; status: string }[];
}

export const INITIAL_PRO_PROJECTS: ProProject[] = [
  {
    id: "oak-residence",
    name: "Oak Residence",
    subtitle: "18 Willow Street, Kenmore",
    fullAddress: "18 Willow Street, Kenmore QLD 4069",
    suburb: "Kenmore",
    propId: "TPH-KEN-018",
    trustlinkId: "welcome",
    statusBadge: "Handover review",
    bannerType: "photo",
    imageUrl: "/images/oak-residence-clean.jpg",
    ownerInitials: "EW",
    ownerAvatarBg: "bg-[#edf1f5] text-[#13293d]",
    ownerName: "Emma Wilson",
    ownerRoleLabel: "Existing-owner build",
    ownerConnectionSub: "Current owner · Prop ID connected",
    nextMilestoneDate: "18 Sep 2026",
    nextMilestoneDay: "18",
    nextMilestoneMonth: "SEP",
    nextMilestoneTitle: "Oak Residence · review together",
    nextMilestoneDetail: "10:00 am · 18 Willow Street, Kenmore · Chris + Emma Wilson",
    handoverHeadline: "Your handover is taking shape.",
    handoverSubline: "0 item responses · 3 reviewed document records",
    progressPercent: 52,
    currentStage: "Review together",
    metrics: {
      recordsToReview: 1,
      recordsReviewedCount: 3,
      itemResponses: "0/6",
      itemResponsesSub: "Both review fields recorded",
      openFollowUps: 1,
      openFollowUpsSub: "A named next step for each",
    },
    legalInfo: {
      lotPlan: "Lot 18 on RP 88201",
      councilApproval: "BCC DA-2025-41829 · Low Density Residential",
      certifier: "Apex Building Certifiers (PCA-QLD-8910)",
      siteSupervisor: "Chris Taylor (Northline Homes)",
      warrantyStatus: "QBCC 6 Year 6 Month Structural + 12 Month Defect Liability",
    },
    actionItems: [
      {
        id: "act-1",
        title: "The cooktop delivery differs from the selection",
        description: "Approved IC90, 90 cm. Delivery docket records IC60, 60 cm.",
        meta: "Chris Taylor · Before handover",
        ctaLabel: "Compare sources",
        ctaHref: "/pro/documents",
        iconType: "compare",
      },
      {
        id: "act-2",
        title: "Waterproofing record is ready for your check",
        description: "Sam has supplied the certificate. Confirm its project and scope.",
        meta: "Clearcoat Wet Areas · Received 15 Sep",
        ctaLabel: "Review record",
        ctaHref: "/pro/documents",
        iconType: "check",
      },
      {
        id: "act-3",
        title: "A home almost ready for its welcome",
        description: "Review the standard tabs with Emma, then sign the same version.",
        meta: "18 Sep · 10:00 am · Chris + Emma",
        ctaLabel: "Prepare review",
        ctaHref: "/pro/digital-key",
        iconType: "people",
      },
    ],
    specifications: [
      {
        label: "Flooring & Joinery",
        value: "Engineered European Oak + Custom Polytec Ravine",
        detail: "Living, dining, and kitchen island mitred edge stone verified.",
      },
      {
        label: "Kitchen Appliances",
        value: "Induction Cooktop IC90 (90 cm) · Integrated Oven",
        detail: "Delivery docket discrepancy flagged (IC60 recorded; replacement requested).",
      },
      {
        label: "Wet Area Waterproofing",
        value: "AS 3740 Membrane System · Form 43",
        detail: "Supplied by Clearcoat Wet Areas (Sam) on 15 Sep · Ready for builder check.",
      },
      {
        label: "Solar & HVAC",
        value: "6.6 kW Solar + Daikin 14kW Ducted Inverter",
        detail: "AirTouch 5 zone controller commissioned and paired.",
      },
    ],
    documents: [
      {
        id: "doc-oak-1",
        title: "QBCC Form 16 · Structural Engineering Final Inspection",
        category: "Statutory Certificate",
        issuer: "Apex Engineering QLD",
        date: "14 Sep 2026",
        status: "Reviewed",
      },
      {
        id: "doc-oak-2",
        title: "AS 3740 Form 43 · Wet-Area Waterproofing Certificate",
        category: "Compliance Record",
        issuer: "Clearcoat Wet Areas",
        date: "15 Sep 2026",
        status: "Ready to check",
      },
      {
        id: "doc-oak-3",
        title: "Electrical Safety Act Form 4 · Compliance Certificate",
        category: "Trade Compliance",
        issuer: "Lachlan Electrical",
        date: "12 Sep 2026",
        status: "Reviewed",
      },
      {
        id: "doc-oak-4",
        title: "Architectural & As-Built Drawing Set (Rev D)",
        category: "Plans & Schedule",
        issuer: "Northline Design Studio",
        date: "10 Sep 2026",
        status: "Reviewed",
      },
    ],
    activeTrades: [
      { name: "Clearcoat Wet Areas (Sam)", scope: "Wet-area waterproofing & Form 43", status: "Certificate supplied" },
      { name: "Lachlan Electrical", scope: "Final fit-off & Form 4 certificate", status: "Completed" },
      { name: "Prime Finish Painters", scope: "Pre-handover touch-up inspection", status: "Scheduled 17 Sep" },
    ],
  },
  {
    id: "river-house",
    name: "River House",
    subtitle: "Example property · Indooroopilly",
    fullAddress: "44 Riverview Terrace, Indooroopilly QLD 4068",
    suburb: "Indooroopilly",
    propId: "TPH-IND-044",
    trustlinkId: "TL-88301-A",
    statusBadge: "Build in progress",
    bannerType: "house-illustration",
    ownerInitials: "ND",
    ownerAvatarBg: "bg-[#edf1f5] text-[#13293d]",
    ownerName: "Northline Developments",
    ownerRoleLabel: "Developer-owned",
    ownerConnectionSub: "Developer record · Ready for buyer transfer at settlement",
    nextMilestoneDate: "21 Sep 2026",
    nextMilestoneDay: "21",
    nextMilestoneMonth: "SEP",
    nextMilestoneTitle: "River House · internal fixing & joinery check",
    nextMilestoneDetail: "9:30 am · 44 Riverview Terrace, Indooroopilly · Site walkthrough",
    handoverHeadline: "Build record is assembling as work progresses.",
    handoverSubline: "2 stage certificates verified · 1 joinery schedule pending",
    progressPercent: 28,
    currentStage: "Prepared",
    metrics: {
      recordsToReview: 2,
      recordsReviewedCount: 4,
      itemResponses: "2/6",
      itemResponsesSub: "Stage gates verified on site",
      openFollowUps: 2,
      openFollowUpsSub: "Joinery & glazing schedules",
    },
    legalInfo: {
      lotPlan: "Lot 4 on SP 294810",
      councilApproval: "BCC DA-2025-19042 · Riverfront Precinct Overlay",
      certifier: "Brisbane Private Certifiers (PCA-QLD-4412)",
      siteSupervisor: "Chris Taylor (Northline Homes)",
      warrantyStatus: "Active Construction · Statutory QBCC Home Warranty Insured",
    },
    actionItems: [
      {
        id: "riv-1",
        title: "Verify acoustic glazing compliance certificate for river elevation",
        description: "Glazier uploaded AS 1288 compliance statement. Confirm acoustic rating matches DA condition.",
        meta: "Architectural Glazing QLD · Before lock-up sign-off",
        ctaLabel: "Review record",
        ctaHref: "/pro/documents",
        iconType: "check",
      },
      {
        id: "riv-2",
        title: "Confirm kitchen & butler's pantry joinery shop drawings",
        description: "Check integrated refrigeration clearances prior to cabinet manufacture.",
        meta: "21 Sep · 9:30 am · Chris Taylor",
        ctaLabel: "Compare sources",
        ctaHref: "/pro/documents",
        iconType: "compare",
      },
    ],
    specifications: [
      {
        label: "Structure & Envelope",
        value: "Suspended Concrete Slab + Architectural Off-Form Concrete",
        detail: "Form 16 structural frame and slab certifications on file.",
      },
      {
        label: "Windows & Glazing",
        value: "Double-Glazed Acoustic thermally broken frames",
        detail: "BAL-12.5 and river corridor acoustic rating verified.",
      },
      {
        label: "Roofing & Insulation",
        value: "Colorbond Surfmist Klip-Lok + R5.0 Acoustic Batts",
        detail: "Installed and certified by Roofline QLD.",
      },
    ],
    documents: [
      {
        id: "doc-riv-1",
        title: "QBCC Form 16 · Slab & Footing Structural Inspection",
        category: "Statutory Certificate",
        issuer: "Apex Engineering QLD",
        date: "02 Aug 2026",
        status: "Sealed to Prop ID",
      },
      {
        id: "doc-riv-2",
        title: "QBCC Form 16 · Structural Frame Stage Sign-Off",
        category: "Statutory Certificate",
        issuer: "Apex Engineering QLD",
        date: "29 Aug 2026",
        status: "Reviewed",
      },
      {
        id: "doc-riv-3",
        title: "AS 1288 Acoustic & Safety Glazing Certificate",
        category: "Compliance Record",
        issuer: "Architectural Glazing QLD",
        date: "14 Sep 2026",
        status: "Ready to check",
      },
    ],
    activeTrades: [
      { name: "Custom Joinery Brisbane", scope: "Kitchen & robe cabinetry installation", status: "On site this week" },
      { name: "Lachlan Electrical", scope: "First-fix rough-in & home automation", status: "In progress" },
      { name: "Architectural Glazing QLD", scope: "Balustrade & acoustic window certification", status: "Certificate under review" },
    ],
  },
  {
    id: "cedar-retreat",
    name: "Cedar Retreat",
    subtitle: "Example property · Chapel Hill",
    fullAddress: "12 Cedarleigh Road, Chapel Hill QLD 4069",
    suburb: "Chapel Hill",
    propId: "TPH-CHP-012",
    trustlinkId: "TL-76100-C",
    statusBadge: "Aftercare",
    bannerType: "trees-illustration",
    ownerInitials: "AP",
    ownerAvatarBg: "bg-[#efe7d8] text-[#13293d]",
    ownerName: "Ava Patel",
    ownerRoleLabel: "Owner connected",
    ownerConnectionSub: "Handed over · Living Prop ID record active",
    nextMilestoneDate: "24 Sep 2026",
    nextMilestoneDay: "24",
    nextMilestoneMonth: "SEP",
    nextMilestoneTitle: "Cedar Retreat · 90-day aftercare walk-through",
    nextMilestoneDetail: "11:00 am · 12 Cedarleigh Road, Chapel Hill · Chris + Ava Patel",
    handoverHeadline: "Handed over and settled at home.",
    handoverSubline: "6/6 item responses signed · 8 sealed document records",
    progressPercent: 100,
    currentStage: "At home",
    metrics: {
      recordsToReview: 0,
      recordsReviewedCount: 8,
      itemResponses: "6/6",
      itemResponsesSub: "Signed jointly by builder & owner",
      openFollowUps: 1,
      openFollowUpsSub: "90-day seasonal settlement check",
    },
    legalInfo: {
      lotPlan: "Lot 9 on RP 118402",
      councilApproval: "BCC DA-2024-88210 · Bushland Habitat Overlay",
      certifier: "Brisbane Private Certifiers (Form 21 Final Issued)",
      siteSupervisor: "Chris Taylor (Northline Homes)",
      warrantyStatus: "Active Aftercare · 90-Day Seasonal Review Due 24 Sep 2026",
    },
    actionItems: [
      {
        id: "ced-1",
        title: "Confirm 90-day seasonal timber & joinery adjustment visit",
        description: "Ava noted a minor laundry pocket door alignment check for the 90-day visit.",
        meta: "24 Sep · 11:00 am · Chris + Ava",
        ctaLabel: "Prepare review",
        ctaHref: "/pro/tasks",
        iconType: "people",
      },
    ],
    specifications: [
      {
        label: "Cladding & Exterior",
        value: "Western Red Cedar Shiplap + Austral Masonry",
        detail: "Annual UV oil care guide attached to owner Prop ID.",
      },
      {
        label: "Termite Management",
        value: "Termimesh Stainless Steel Physical Barrier (AS 3660.1)",
        detail: "Annual visual inspection reminder active in owner care schedule.",
      },
      {
        label: "Energy & Battery",
        value: "10.2 kW Solar Array + Tesla Powerwall 2",
        detail: "Commissioning certificate and 10-year warranty sealed.",
      },
    ],
    documents: [
      {
        id: "doc-ced-1",
        title: "QBCC Form 21 · Final Certificate of Classification",
        category: "Statutory Certificate",
        issuer: "Brisbane Private Certifiers",
        date: "18 Jun 2026",
        status: "Sealed to Prop ID",
      },
      {
        id: "doc-ced-2",
        title: "AS 3740 Form 43 · Wet-Area Waterproofing Certificate",
        category: "Statutory Certificate",
        issuer: "Clearcoat Wet Areas",
        date: "04 Jun 2026",
        status: "Sealed to Prop ID",
      },
      {
        id: "doc-ced-3",
        title: "Termimesh Physical Barrier Warranty & Care Schedule",
        category: "Warranty Record",
        issuer: "Termimesh QLD",
        date: "10 Jun 2026",
        status: "Sealed to Prop ID",
      },
      {
        id: "doc-ced-4",
        title: "Signed Joint Handover Receipt (Version 1.0)",
        category: "Handover Record",
        issuer: "Chris Taylor & Ava Patel",
        date: "24 Jun 2026",
        status: "Sealed to Prop ID",
      },
    ],
    activeTrades: [
      { name: "Northline Aftercare Team", scope: "90-day joinery & door alignment check", status: "Booked 24 Sep" },
    ],
  },
];
