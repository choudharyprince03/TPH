export interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  tag: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  suburb: string;
  rating: number;
  date: string;
  comment: string;
}

export interface ProfessionalBadge {
  title: string;
  subtitle: string;
  icon: string;
}

export interface ProfessionalService {
  title: string;
  desc: string;
  priceGuide?: string;
}

export interface Professional {
  id: string;
  category: "builder" | "conveyancer" | "inspector" | "agent" | "electrician" | "finance";
  initials: string;
  avatarTone: "blue" | "green" | "sand";
  name: string;
  role: string;
  business: string;
  licence: string;
  areas: string;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  desc: string;
  bio: string;
  avatarUrl: string;
  coverUrl: string;
  link: string;
  badges: ProfessionalBadge[];
  services: ProfessionalService[];
  portfolio: PortfolioItem[];
  reviews: ReviewItem[];
}

export const PROFESSIONALS_DATA: Professional[] = [
  {
    id: "welcome",
    category: "builder",
    initials: "OH",
    avatarTone: "blue",
    name: "Olivia Hart",
    role: "Licensed Custom Builder & Handover Specialist",
    business: "Hart Homes Pty Ltd",
    licence: "QBCC #150821",
    areas: "Greater Brisbane, Kenmore, Chapel Hill, Brookfield, Bardon",
    rating: 4.9,
    reviewsCount: 142,
    experienceYears: 18,
    desc: "Discuss your build, renovation or the documents for your new home. Agree the scope and appointment before sharing plans or accepting work.",
    bio: "Olivia Hart is a Master Builders Queensland accredited residential builder with over 18 years of experience designing and delivering architectural custom homes across Brisbane's western suburbs. Hart Homes specialises in complex sloping sites, contemporary cantilevered homes, and stress-free digital handovers with full QBCC Form 16 and Form 43 statutory compliance sealed directly to your Prop ID.",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    coverUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    link: "/trustlinks/welcome",
    badges: [
      { title: "Master Builders QLD", subtitle: "Accredited Active Member", icon: "🏆" },
      { title: "QBCC Licensed #150821", subtitle: "Builder Open Licence", icon: "🛡️" },
      { title: "$20M Public Liability", subtitle: "Certificate of Currency", icon: "📑" },
      { title: "Prop ID Certified", subtitle: "Digital Handover Ready", icon: "🎁" },
    ],
    services: [
      {
        title: "Architectural Custom Homes",
        desc: "Bespoke new homes designed for sub-tropical Queensland living, sloping sites, and high energy efficiency ratings.",
        priceGuide: "From $850k AUD",
      },
      {
        title: "Knockdown & Rebuild Projects",
        desc: "Complete post-war cottage demolition management, council boundary relaxations, and contemporary two-storey builds.",
        priceGuide: "From $750k AUD",
      },
      {
        title: "Digital Handover & Vault Packaging",
        desc: "Complete compilation of Form 16, Form 43 waterproofing, trade warranties, and paint registers transferred to your sovereign Prop ID.",
        priceGuide: "Included with build",
      },
      {
        title: "Sloping Site Engineering & Earthworks",
        desc: "Specialist foundations, cantilever slabs, and retaining wall engineering for high-fall blocks (2m–6m falls).",
        priceGuide: "Feasibility review available",
      },
    ],
    portfolio: [
      {
        id: "p-1",
        title: "18 Banksia Crescent",
        subtitle: "Kenmore QLD · 4 Bed, 3 Bath, Pool",
        imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
        tag: "Handover Ready",
      },
      {
        id: "p-2",
        title: "The Cantilever House",
        subtitle: "Simpsons Road, Bardon · Sloping Site Build",
        imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
        tag: "Architectural",
      },
      {
        id: "p-3",
        title: "Riverview Pavilion",
        subtitle: "Fig Tree Pocket · Outdoor Living & Kitchen",
        imageUrl: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
        tag: "Alfresco Pavilion",
      },
      {
        id: "p-4",
        title: "Sub-Tropical Kitchen Suite",
        subtitle: "Caesarstone 40mm Waterfall Island",
        imageUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
        tag: "Interior Detail",
      },
    ],
    reviews: [
      {
        id: "r-1",
        author: "Alex & Emily",
        suburb: "Kenmore QLD",
        rating: 5,
        date: "2 weeks ago",
        comment: "Olivia and the Hart Homes team made our handover effortless. Having all statutory certificates, Form 16s, and warranties sealed into our Prop ID gave us immense peace of mind.",
      },
      {
        id: "r-2",
        author: "David Chen",
        suburb: "Chapel Hill QLD",
        rating: 5,
        date: "1 month ago",
        comment: "We had a challenging 3.2m slope on our block. Other builders shied away, but Olivia provided a stepped foundation design that saved us over $40,000 on earthworks.",
      },
      {
        id: "r-3",
        author: "Sarah Jenkins",
        suburb: "Bardon QLD",
        rating: 5,
        date: "3 months ago",
        comment: "Clear communication, transparent variation management, and zero surprises. TrustLink allowed us to review drawings directly without messy email attachments.",
      },
    ],
  },
  {
    id: "TL-88301-A",
    category: "conveyancer",
    initials: "LV",
    avatarTone: "green",
    name: "Lachlan Vance",
    role: "Licensed Conveyancer & Property Lawyer",
    business: "River City Conveyancing",
    licence: "QLD Law Society #88219 · PEXA Certified",
    areas: "Brisbane & Western Suburbs, Gold Coast, Sunshine Coast",
    rating: 4.9,
    reviewsCount: 98,
    experienceYears: 14,
    desc: "Contract advice and settlement guidance for buyers and sellers across Queensland. PEXA certified and TrustLink connected.",
    bio: "Lachlan Vance has overseen more than 3,500 property settlements across Queensland. Specialising in off-the-plan contracts, council rates adjustments, body corporate reviews, and electronic settlements through PEXA. River City Conveyancing provides fixed-fee transparent legal guidance linked securely to your sovereign property passport.",
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    coverUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    link: "/trustlinks/TL-88301-A",
    badges: [
      { title: "QLD Law Society", subtitle: "Practising Solicitor", icon: "⚖️" },
      { title: "PEXA Certified", subtitle: "Electronic Settlements", icon: "💻" },
      { title: "Fixed Fee Guarantee", subtitle: "No Hidden Costs", icon: "🏷️" },
      { title: "TrustLink Connected", subtitle: "Direct Settlement Files", icon: "🛡️" },
    ],
    services: [
      {
        title: "Pre-Signing Contract Review",
        desc: "Thorough legal inspection of REIQ standard residential contract terms, special conditions, finance clauses, and building & pest terms.",
        priceGuide: "$350 AUD (Refunded at settlement)",
      },
      {
        title: "Full Residential Conveyancing",
        desc: "Complete legal title transfer, transfer duty calculation, title searches, rates adjustments, and digital settlement on PEXA.",
        priceGuide: "Fixed $1,250 + outlays",
      },
      {
        title: "Off-the-Plan Disclosure Audits",
        desc: "Comprehensive review of builder sunset dates, variation rights, and community management statements.",
        priceGuide: "Fixed $650 AUD",
      },
    ],
    portfolio: [
      {
        id: "p-201",
        title: "Graceville Riverside Settlement",
        subtitle: "7 Cedar Street · $1.4M PEXA Settlement",
        imageUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
        tag: "Settled on Time",
      },
      {
        id: "p-202",
        title: "Title & Easement Clearance",
        subtitle: "Brisbane City Council Drainage Easement",
        imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
        tag: "Title Audit",
      },
      {
        id: "p-203",
        title: "Commercial & Mixed-Use Transfer",
        subtitle: "Milton Commercial Freehold Title",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
        tag: "Commercial",
      },
    ],
    reviews: [
      {
        id: "r-201",
        author: "Sofia Nguyen",
        suburb: "Graceville QLD",
        rating: 5,
        date: "3 weeks ago",
        comment: "Lachlan caught a critical unapproved drainage easement in the vendor disclosure before our cooling-off period ended. Saved us tens of thousands in future costs.",
      },
      {
        id: "r-202",
        author: "Marcus & Kate",
        suburb: "Indooroopilly QLD",
        rating: 5,
        date: "2 months ago",
        comment: "Super smooth settlement on PEXA. Everything was shared right through our TrustLink workspace without messy faxing or paper chasing.",
      },
    ],
  },
  {
    id: "TL-76100-C",
    category: "inspector",
    initials: "CD",
    avatarTone: "sand",
    name: "Claire Dupont",
    role: "Lead Building & Timber Pest Diagnostic Inspector",
    business: "Dupont Property Inspections",
    licence: "QBCC #1089201 · Engineers Australia GradIEAust",
    areas: "Kenmore, Chapel Hill, Indooroopilly, Brookfield, Western Suburbs",
    rating: 5.0,
    reviewsCount: 184,
    experienceYears: 16,
    desc: "AS 4349.1 building, pest and thermal diagnostic reports. Objective pre-purchase clarity with reports linked directly to your Prop ID.",
    bio: "Claire Dupont is a certified structural diagnostic inspector and licensed pest technician with over 16 years investigating Queensland properties. Utilizing FLIR thermal imaging, moisture meters, and borescope cameras, Dupont Inspections produces non-invasive, objective AS 4349.1 building reports. All inspection reports and high-resolution defect photos deposit directly into your Prop ID vault.",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    coverUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    link: "/trustlinks/TL-76100-C",
    badges: [
      { title: "QBCC Certified Inspector", subtitle: "Licence #1089201", icon: "🔍" },
      { title: "Engineers Australia", subtitle: "GradIEAust Member", icon: "📐" },
      { title: "FLIR Thermal Diagnostics", subtitle: "Level 2 Certified", icon: "🌡️" },
      { title: "Same-Day Reports", subtitle: "Sealed to Prop ID", icon: "⚡" },
    ],
    services: [
      {
        title: "Pre-Purchase Building & Timber Pest (AS 4349.1)",
        desc: "Comprehensive 500-point structural check of roof cavity, subfloor, foundations, drainage, and termite barrier integrity.",
        priceGuide: "$580 AUD (Full report included)",
      },
      {
        title: "Pre-Handover Practical Completion (PCI) Audit",
        desc: "Rigorous builder handover audit checking paint finishes, joinery tolerances, plumbing fixtures, and QBCC standards & tolerances compliance.",
        priceGuide: "$690 AUD",
      },
      {
        title: "Thermal Infrared Moisture Diagnostics",
        desc: "Pinpoint hidden shower recess leaks, internal wall moisture, and thermal bridging without drywall destruction.",
        priceGuide: "Included with building inspection",
      },
    ],
    portfolio: [
      {
        id: "p-301",
        title: "Subfloor Timber & Foundation Inspection",
        subtitle: "42 Ridge Road, Brookfield · Concrete Stumps",
        imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
        tag: "Structural Audit",
      },
      {
        id: "p-302",
        title: "Thermal Imaging & Wet Area Diagnostics",
        subtitle: "Ensuite Shower Wall Moisture Verification",
        imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
        tag: "Thermal Infrared",
      },
      {
        id: "p-303",
        title: "Roof Truss & Sarking Inspection",
        subtitle: "Kenmore Timber Roof Cavity Audit",
        imageUrl: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80",
        tag: "Roof Void",
      },
    ],
    reviews: [
      {
        id: "r-301",
        author: "Noah & Mia Wilson",
        suburb: "Brookfield QLD",
        rating: 5,
        date: "1 week ago",
        comment: "Claire's PCI inspection for our new home caught 14 minor defects that the certifier missed, including unsealed tile grout in the pantry. The builder fixed everything before settlement.",
      },
      {
        id: "r-302",
        author: "Graham P.",
        suburb: "Toowong QLD",
        rating: 5,
        date: "1 month ago",
        comment: "The most thorough report I have ever seen. Clear photographs, honest risk appraisal, and delivered right into our Prop ID that same evening.",
      },
    ],
  },
  {
    id: "pro-4",
    category: "agent",
    initials: "PB",
    avatarTone: "blue",
    name: "Peter Bell",
    role: "Licensed Real Estate Agent & Property Strategist",
    business: "Bell & Co Residential",
    licence: "QLD Real Estate Licence #3991204",
    areas: "Kenmore, Chapel Hill, Brookfield, Pullenvale, Pinjarra Hills",
    rating: 4.8,
    reviewsCount: 116,
    experienceYears: 15,
    desc: "Independent property advice, marketing and sales management with verified progress reporting attached to your Prop ID.",
    bio: "Peter Bell has lived and worked in Brisbane's Western Suburbs for over two decades. Known for transparent market appraisals, high-impact architectural photography campaigns, and objective advice for sellers and buyers. Bell & Co integrates with Prop ID to provide buyers with transparent, verified property data from day one.",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    coverUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    link: "/trustlinks/welcome",
    badges: [
      { title: "REIQ Accredited", subtitle: "Real Estate Institute of QLD", icon: "🏡" },
      { title: "Western Suburbs Specialist", subtitle: "20+ Years Local Knowledge", icon: "📍" },
      { title: "Transparent Pricing", subtitle: "No Marketing Markups", icon: "📊" },
      { title: "Prop ID Ready", subtitle: "Passport Transparency", icon: "🛡️" },
    ],
    services: [
      {
        title: "Strategic Property Sales & Marketing",
        desc: "Tailored campaign strategy with architectural photography, 3D floor plans, targeted digital campaigns, and transparent negotiation.",
        priceGuide: "Commission by agreement",
      },
      {
        title: "Independent Pre-Sale Appraisal",
        desc: "Accurate, data-backed assessment of your home's current market value with recommended capital improvements to maximize sale return.",
        priceGuide: "Complimentary appraisal",
      },
      {
        title: "Off-Market Buyer Matching",
        desc: "Connect your home discreetly with pre-qualified buyers seeking acreage and premium architectural homes in Kenmore and Brookfield.",
        priceGuide: "Tailored service",
      },
    ],
    portfolio: [
      {
        id: "p-401",
        title: "Kenmore Hills Acreage Estate",
        subtitle: "Sold for $2.45M · 5 Bed, 3 Bath, Tennis Court",
        imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
        tag: "Suburban Record",
      },
      {
        id: "p-402",
        title: "Brookfield Architectural Sanctuary",
        subtitle: "Sold for $1.85M · Modern Concrete & Timber",
        imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
        tag: "Architectural Sale",
      },
    ],
    reviews: [
      {
        id: "r-401",
        author: "Richard & Joanne",
        suburb: "Kenmore QLD",
        rating: 5,
        date: "2 months ago",
        comment: "Peter was refreshing to deal with. No real estate clichés, just honest advice and a strategic sales campaign that achieved a fantastic price for our family home.",
      },
    ],
  },
  {
    id: "pro-5",
    category: "electrician",
    initials: "ME",
    avatarTone: "green",
    name: "Marcus Evans",
    role: "Master Electrician & Clean Energy Specialist",
    business: "Bright Spark Electrical QLD",
    licence: "Electrical Contractor Licence #81042 · Clean Energy Council",
    areas: "Greater Brisbane Metro, Ipswich, Moreton Bay",
    rating: 4.9,
    reviewsCount: 78,
    experienceYears: 12,
    desc: "Safety switches, solar connections, switchboard upgrades, and statutory Form 4 compliance certificates.",
    bio: "Marcus Evans leads Bright Spark Electrical, providing residential electrical engineering, switchboard modernization, and solar battery storage installations. Certified Master Electrician providing statutory Form 4 certificates with every major installation.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    coverUrl: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
    link: "/trustlinks/welcome",
    badges: [
      { title: "Master Electrician", subtitle: "Licence #81042", icon: "⚡" },
      { title: "Form 4 Certified", subtitle: "Statutory Compliance", icon: "📑" },
      { title: "Clean Energy Council", subtitle: "Solar & Battery Accredited", icon: "☀️" },
      { title: "Lifetime Workmanship", subtitle: "Full Warranty Guarantee", icon: "🛡️" },
    ],
    services: [
      {
        title: "Switchboard Upgrade & Safety Switches",
        desc: "Replace obsolete ceramic fuses with modern RCBO residual current circuit breakers to meet AS/NZS 3000 safety regulations.",
        priceGuide: "From $950 AUD",
      },
      {
        title: "EV Charger Installation",
        desc: "Dedicated 32A Level 2 electric vehicle home charging wallbox installation with load management.",
        priceGuide: "From $1,200 AUD",
      },
      {
        title: "Statutory Electrical Certificate (Form 4)",
        desc: "Official Queensland Government Form 4 compliance deposit for building handovers and insurance policies.",
        priceGuide: "Included with works",
      },
    ],
    portfolio: [
      {
        id: "p-501",
        title: "Smart Home Switchboard & Surge Protection",
        subtitle: "18 Banksia Crescent, Kenmore · 3-Phase Modernisation",
        imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
        tag: "Switchboard Form 4",
      },
      {
        id: "p-502",
        title: "Architectural LED Linear Lighting",
        subtitle: "Kitchen Island & Alfresco Ceiling Recesses",
        imageUrl: "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?auto=format&fit=crop&w=800&q=80",
        tag: "LED Lighting",
      },
    ],
    reviews: [
      {
        id: "r-501",
        author: "Emily Watson",
        suburb: "Kenmore QLD",
        rating: 5,
        date: "3 weeks ago",
        comment: "Marcus upgraded our switchboard and deposited the Form 4 certificate right into our Prop ID within an hour of finishing. Outstanding professionalism.",
      },
    ],
  },
];

export function getProfessionalById(id: string): Professional | undefined {
  return PROFESSIONALS_DATA.find((p) => p.id === id);
}

export function getAllProfessionals(): Professional[] {
  return PROFESSIONALS_DATA;
}
