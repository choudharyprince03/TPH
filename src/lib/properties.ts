export interface PropertyDoc {
  title: string;
  cat: string;
  size: string;
  shared: boolean;
}

export interface PropertyEvent {
  title: string;
  time: string;
  detail: string;
}

export interface PropertyData {
  id: string;
  propId: string;
  address: string;
  street: string;
  suburb: string;
  state: string;
  postcode: string;
  type: "Owned home" | "Saved space" | "Investment";
  typeColor: string;
  imageUrl: string;
  documentsCount: number;
  statusBadge: string;
  statusColor: string;
  tagline: string;
  notes: string;
  legalDna: {
    cadastral: string;
    council: string;
    easements: string;
    approval: string;
  };
  physicalDna: {
    foundation: string;
    cladding: string;
    roofing: string;
    waterproofing: string;
  };
  operationalDna: {
    hotWater: string;
    ac: string;
    pest: string;
    solar: string;
  };
  documents: PropertyDoc[];
  events: PropertyEvent[];
}

export const PROPERTIES_MAP: Record<string, PropertyData> = {
  "TPH-KEN-018": {
    id: "TPH-KEN-018",
    propId: "TPH-KEN-018",
    address: "18 Banksia Crescent, Kenmore QLD 4069",
    street: "18 Banksia Crescent",
    suburb: "Kenmore",
    state: "QLD",
    postcode: "4069",
    type: "Owned home",
    typeColor: "bg-[#eaf5ef] text-[#24754c]",
    imageUrl: "/images/hero-real-estate.jpg",
    documentsCount: 22,
    statusBadge: "Handover Ready to Review",
    statusColor: "bg-[#fff4df] text-[#8b641c]",
    tagline: "Kenmore QLD 4069 · A living memory of your property.",
    notes: "Check solar inverter wifi connection after handover walkthrough. Painter coming on Thursday.",
    legalDna: {
      cadastral: "Lot 18 on RP 88201 (Title Ref 50921844)",
      council: "Brisbane City Council · Low Density Residential (LDR)",
      easements: "Easement B on RP 88201 for stormwater drainage along rear boundary (2.5m wide).",
      approval: "BCC DA-2023-41829 · Private Certifier Approval PCA-QLD-8910",
    },
    physicalDna: {
      foundation: "Engineered Waffle Pod Slab on Class H1 Soil · Form 16 Structural by Apex Engineers",
      cladding: "Austral Bricks 'Sanctuary' + James Hardie Linea Weatherboards (Dulux Lexicon Half)",
      roofing: "Colorbond 'Monument' Custom Orb + Bradford Gold R4.1 Ceiling Batts",
      waterproofing: "AS 3740 Compliance · QBCC Form 43 Verified Certificate by HydroSeal QLD",
    },
    operationalDna: {
      hotWater: "Rheem 270L Heat Pump · 7 Year Tank Warranty (Valid to Sep 2031)",
      ac: "Daikin 14kW Inverter Ducted System with AirTouch 5 Zone Control · 5 Year Warranty",
      pest: "Termimesh Physical Barrier System · Annual Inspection Due Sep 2027",
      solar: "6.6 kW Tier 1 Panels with Sungrow 5kW Hybrid Inverter · Smart Meter enabled",
    },
    documents: [
      { title: "Certificate of Title (QT2291/4).pdf", cat: "Legal", size: "1.2 MB", shared: true },
      { title: "QBCC Form 16 Structural Engineering Final.pdf", cat: "Certificates", size: "3.4 MB", shared: true },
      { title: "Form 43 Wet-Area Waterproofing Certificate.pdf", cat: "Certificates", size: "1.8 MB", shared: true },
      { title: "Architectural Floorplans & Working Drawings.pdf", cat: "Plans", size: "8.4 MB", shared: true },
      { title: "Soil Test & Geotechnical Class H1 Report.pdf", cat: "Engineering", size: "2.1 MB", shared: false },
      { title: "Appliance Care & Warranty Schedule.pdf", cat: "Warranties", size: "4.2 MB", shared: false },
    ],
    events: [
      { title: "Practical completion handover submitted by Hart Homes", time: "Today 10:48 AM", detail: "Form 16 structural engineering and waterproofing registers deposited." },
      { title: "Client variation notice #04 signed by Alex", time: "Today 08:30 AM", detail: "Caesarstone Pure White kitchen island specification approved." },
      { title: "Cadastral boundary confirmation completed", time: "Sep 12, 2026", detail: "Surveyor certified boundary peg placements along Lot 18 RP 88201." },
      { title: "Prop ID cryptographic record initiated", time: "Sep 01, 2026", detail: "Genesis token minted for 18 Banksia Crescent, Kenmore." },
    ],
  },
  "TPH-GRV-007": {
    id: "TPH-GRV-007",
    propId: "TPH-GRV-007",
    address: "7 Cedar Street, Graceville QLD 4075",
    street: "7 Cedar Street",
    suburb: "Graceville",
    state: "QLD",
    postcode: "4075",
    type: "Saved space",
    typeColor: "bg-[#fff4df] text-[#8b641c]",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    documentsCount: 9,
    statusBadge: "Pre-Purchase Due Diligence",
    statusColor: "bg-[#eaf5ef] text-[#24754c]",
    tagline: "Graceville QLD 4075 · Saved property space for due diligence and inspection records.",
    notes: "Contract review requested with Lachlan Vance. Building & pest inspection scheduled with Claire Dupont.",
    legalDna: {
      cadastral: "Lot 12 on RP 48102 (Title Ref 41082199)",
      council: "Brisbane City Council · Character Residential (CR2)",
      easements: "Council Overland Flow Path notation along southern boundary.",
      approval: "Pre-1946 Character Building overlay requirements apply.",
    },
    physicalDna: {
      foundation: "Concrete Stumps & Hardwood Bearers on Class M Soil",
      cladding: "Original Queenslander Chamferboard Cladding (Restored 2021)",
      roofing: "Corrugated Galvanised Steel with Anti-Con Blanket",
      waterproofing: "Ensuite Renovation Waterproofing Certificate on file",
    },
    operationalDna: {
      hotWater: "Aquamax 315L Electric Storage System",
      ac: "Mitsubishi Heavy Industries Multi-Head Split Systems (3 zones)",
      pest: "Sentricon Termite Baiting Stations active along perimeter",
      solar: "5.0 kW Solar Inverter installed 2022",
    },
    documents: [
      { title: "Draft REIQ Residential Contract (Cedar St).pdf", cat: "Legal", size: "2.8 MB", shared: true },
      { title: "Pre-Purchase AS 4349.1 Building & Pest Report.pdf", cat: "Inspections", size: "6.1 MB", shared: true },
      { title: "Council Flood & Overland Flow Awareness Map.pdf", cat: "Due Diligence", size: "1.4 MB", shared: false },
      { title: "Heritage & Character Overlay Advice Notice.pdf", cat: "Planning", size: "950 KB", shared: false },
    ],
    events: [
      { title: "Building & pest diagnostic completed by Dupont Inspections", time: "Sep 18, 2026", detail: "Objective pre-purchase report sealed to workspace." },
      { title: "Conveyancing contract advice opened with Lachlan Vance", time: "Sep 15, 2026", detail: "Reviewing vendor disclosure statements and cooling-off timeline." },
      { title: "Property added to Alex's personal saved spaces", time: "Sep 10, 2026", detail: "Shortlisted for auction research." },
    ],
  },
  "TPH-BRK-042": {
    id: "TPH-BRK-042",
    propId: "TPH-BRK-042",
    address: "42 Ridge Road, Brookfield QLD 4069",
    street: "42 Ridge Road",
    suburb: "Brookfield",
    state: "QLD",
    postcode: "4069",
    type: "Investment",
    typeColor: "bg-[#eaf0f6] text-[#071d3b]",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    documentsCount: 16,
    statusBadge: "Settled · Aftercare & Warranty",
    statusColor: "bg-[#eaf5ef] text-[#24754c]",
    tagline: "Brookfield QLD 4069 · Living investment record & statutory warranty archive.",
    notes: "Annual termite inspection due in November. Tenancy agreement renewed through Bell & Co.",
    legalDna: {
      cadastral: "Lot 5 on SP 182301 (Title Ref 50192831)",
      council: "Brisbane City Council · Rural Residential Zone",
      easements: "Right of Carriageway for shared private access driveway.",
      approval: "Form 21 Final Inspection Certificate issued March 2024.",
    },
    physicalDna: {
      foundation: "Engineered Concrete Strip Footings on Stable Rock (Class S)",
      cladding: "Architectural Off-Form Concrete & Spotted Gum Timber Battening",
      roofing: "Lysaght Klip-Lok Colorbond Roof with R5.0 Insulation",
      waterproofing: "Liquid Membrane Certified across all wet areas and terrace",
    },
    operationalDna: {
      hotWater: "Sanden Eco Plus CO2 Heat Pump System",
      ac: "VRV Concealed Ducted Inverter with Individual Room Sensors",
      pest: "Kordon Physical Barrier with Termguard Replenishment System",
      solar: "10.2 kW Commercial Grade Panels with Tesla Powerwall 2 Battery",
    },
    documents: [
      { title: "QBCC Form 21 Final Certificate of Classification.pdf", cat: "Statutory", size: "1.9 MB", shared: true },
      { title: "Residential Tenancy Agreement (Form 18a).pdf", cat: "Tenancy", size: "3.2 MB", shared: false },
      { title: "Tesla Powerwall 2 Commissioning Certificate.pdf", cat: "Electrical", size: "1.1 MB", shared: false },
      { title: "Pool Safety Compliance Certificate (Form 23).pdf", cat: "Safety", size: "820 KB", shared: true },
    ],
    events: [
      { title: "Annual smoke alarm compliance verified", time: "Aug 14, 2026", detail: "Interconnected photoelectric alarms passed statutory test." },
      { title: "Handover pack archived to sovereign Prop ID", time: "Mar 20, 2024", detail: "Full warranty schedule sealed." },
    ],
  },
};

export const PROPERTIES_LIST = Object.values(PROPERTIES_MAP);

export function getPropertyById(id: string): PropertyData {
  return PROPERTIES_MAP[id] || PROPERTIES_MAP["TPH-KEN-018"];
}
