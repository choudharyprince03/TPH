"use client";

import React, { useState, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp } from "@/components/ui/motion";

interface SpecialistMapItem {
  id: string;
  name: string;
  role: string;
  business: string;
  category: "builder" | "conveyancer" | "inspector" | "agent" | "electrician";
  suburb: string;
  distance: string;
  rating: number;
  reviewsCount: number;
  avatarUrl: string;
  profileUrl: string;
  connectUrl: string;
  badge: string;
  status: string;
  // SVG coordinates (viewBox 0 0 1000 650)
  x: number;
  y: number;
  accent: string;
}

interface MapPropertyPin {
  id: string;
  address: string;
  type: string;
  suburb: string;
  x: number;
  y: number;
}

const SPECIALISTS_ON_MAP: SpecialistMapItem[] = [
  {
    id: "TL-76100-C",
    name: "Claire Dupont",
    role: "Lead Building & Pest Inspector",
    business: "Dupont Property Inspections",
    category: "inspector",
    suburb: "Graceville / Kenmore",
    distance: "1.2 km away",
    rating: 5.0,
    reviewsCount: 28,
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    profileUrl: "/explore/TL-76100-C",
    connectUrl: "/trustlinks/TL-76100-C",
    badge: "AS 4349.1 Timber Pest Specialist",
    status: "Available for Inspections",
    x: 640,
    y: 210,
    accent: "#c2410c",
  },
  {
    id: "TL-88301-A",
    name: "Lachlan Vance",
    role: "Licensed Conveyancer",
    business: "River City Conveyancing",
    category: "conveyancer",
    suburb: "Kenmore / Western Suburbs",
    distance: "0.8 km away",
    rating: 4.9,
    reviewsCount: 42,
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    profileUrl: "/explore/TL-88301-A",
    connectUrl: "/trustlinks/TL-88301-A",
    badge: "PEXA Certified & QLD Law Society",
    status: "Contract Review in 24h",
    x: 460,
    y: 440,
    accent: "#1e3a8a",
  },
  {
    id: "welcome",
    name: "Olivia Hart",
    role: "Custom Builder & Handover Specialist",
    business: "Hart Homes Pty Ltd",
    category: "builder",
    suburb: "Brookfield / Kenmore",
    distance: "2.4 km away",
    rating: 4.9,
    reviewsCount: 142,
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    profileUrl: "/explore/welcome",
    connectUrl: "/trustlinks/welcome",
    badge: "QBCC #150821 · Master Builders",
    status: "Handover Ready",
    x: 490,
    y: 260,
    accent: "#b45309",
  },
  {
    id: "pro-4",
    name: "Peter Bell",
    role: "Licensed Estate Agent & Strategist",
    business: "Bell & Co Western Suburbs",
    category: "agent",
    suburb: "Kenmore Village",
    distance: "1.5 km away",
    rating: 4.8,
    reviewsCount: 96,
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    profileUrl: "/explore/pro-4",
    connectUrl: "/explore/pro-4",
    badge: "REIQ Certified · 22 yrs local",
    status: "Appraisals & Off-Market",
    x: 720,
    y: 330,
    accent: "#047857",
  },
  {
    id: "pro-5",
    name: "Marcus Thorne",
    role: "Master Electrician & Solar Compliance",
    business: "Thorne Energy Systems",
    category: "electrician",
    suburb: "Indooroopilly / Toowong",
    distance: "3.1 km away",
    rating: 4.9,
    reviewsCount: 78,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    profileUrl: "/explore/pro-5",
    connectUrl: "/explore/pro-5",
    badge: "Master Electrician · Clean Energy",
    status: "Certificates & Audits",
    x: 820,
    y: 410,
    accent: "#4338ca",
  },
];

// Dark Property / Handover pins scattered realistically across the suburb
const PROPERTY_PINS: MapPropertyPin[] = [
  { id: "prop-1", address: "18 Banksia Crescent", type: "Handover Pack Sealed", suburb: "Kenmore", x: 530, y: 310 },
  { id: "prop-2", address: "7 Cedar Street", type: "Active Renovation", suburb: "Graceville", x: 680, y: 220 },
  { id: "prop-3", address: "42 Ridge Road", type: "Investment Vault", suburb: "Brookfield", x: 400, y: 210 },
  { id: "prop-4", address: "142 Moggill Road", type: "Registered Prop ID", suburb: "Kenmore", x: 420, y: 370 },
  { id: "prop-5", address: "24 Greentree Pocket", type: "Compliance Records", suburb: "Chapel Hill", x: 590, y: 380 },
  { id: "prop-6", address: "89 Sunset Road", type: "QBCC Form 16 Active", suburb: "Kenmore Hills", x: 550, y: 170 },
  { id: "prop-7", address: "31 Marshall Lane", type: "Registered Prop ID", suburb: "Kenmore", x: 670, y: 460 },
  { id: "prop-8", address: "112 Rafting Ground Rd", type: "Registered Prop ID", suburb: "Brookfield", x: 360, y: 480 },
  { id: "prop-9", address: "78 Harts Road", type: "Solar Compliance Certificate", suburb: "Indooroopilly", x: 860, y: 360 },
  { id: "prop-10", address: "15 Wonford Street", type: "Termite Barrier Sealed", suburb: "Kenmore", x: 760, y: 270 },
  { id: "prop-11", address: "50 Fig Tree Pocket Rd", type: "Handover Ready", suburb: "Fig Tree Pocket", x: 790, y: 520 },
];

export default function SpecialistMapSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  // Default to Claire Dupont and Lachlan Vance open, matching screenshot exactly
  const [openPopups, setOpenPopups] = useState<string[]>(["TL-76100-C", "TL-88301-A"]);
  const [activeSpecialistId, setActiveSpecialistId] = useState<string | null>("TL-76100-C");
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [mobileTab, setMobileTab] = useState<"map" | "list">("map");

  // Filter specialists based on search and category
  const filteredSpecialists = useMemo(() => {
    return SPECIALISTS_ON_MAP.filter((pro) => {
      const matchesCategory = activeCategory === "all" || pro.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        pro.name.toLowerCase().includes(q) ||
        pro.role.toLowerCase().includes(q) ||
        pro.business.toLowerCase().includes(q) ||
        pro.suburb.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const togglePopup = (id: string) => {
    setOpenPopups((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
    setActiveSpecialistId(id);
  };

  const closePopup = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setOpenPopups((prev) => prev.filter((p) => p !== id));
    if (activeSpecialistId === id) setActiveSpecialistId(null);
  };

  const handleSelectSpecialist = (pro: SpecialistMapItem) => {
    setActiveSpecialistId(pro.id);
    if (!openPopups.includes(pro.id)) {
      setOpenPopups((prev) => [...prev, pro.id]);
    }
  };

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(Math.max(0.9, prev + delta), 1.6));
  };

  const resetZoom = () => {
    setZoomLevel(1);
    setOpenPopups(["TL-76100-C", "TL-88301-A"]);
    setActiveSpecialistId("TL-76100-C");
  };

  return (
    <section className="pt-10 sm:pt-12 pb-10 sm:pb-12 w-full">
      {/* ── Section Title & Context ────────────────────────────────────────── */}
      <FadeUp className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eaf4ef] text-[10px] font-bold uppercase tracking-[1.6px] text-[#28715e] mb-2 border border-[#c7e3d1]">
            <span className="w-2 h-2 rounded-full bg-[#28715e] animate-pulse" />
            <span>Interactive Local Map</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.8px] text-[#183249]">
            Verified specialists in your area.
          </h2>
          <p className="text-[#64727e] text-[13px] mt-1.5 max-w-2xl">
            Explore independent licensed builders, certifiers, conveyancers, and trade professionals active across Brisbane&apos;s Western Suburbs.
          </p>
        </div>

        <Link
          href="/explore"
          className="text-[12px] font-semibold text-[#0F1A2C] hover:underline flex items-center gap-1 flex-shrink-0"
        >
          <span>View all directory listings</span>
          <span className="text-[#C59B27]">→</span>
        </Link>
      </FadeUp>

      {/* ── Mobile View Toggle (Map vs List) ─────────────────────────────── */}
      <div className="flex lg:hidden bg-white p-1 rounded-xl border border-[#e2e5e5] mb-4 shadow-2xs">
        <button
          onClick={() => setMobileTab("map")}
          className={`flex-1 py-2 text-[12px] font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
            mobileTab === "map"
              ? "bg-[#0F1A2C] text-white shadow-xs"
              : "text-[#64727e] hover:text-[#183249]"
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <span>Map View</span>
        </button>
        <button
          onClick={() => setMobileTab("list")}
          className={`flex-1 py-2 text-[12px] font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
            mobileTab === "list"
              ? "bg-[#0F1A2C] text-white shadow-xs"
              : "text-[#64727e] hover:text-[#183249]"
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span>Specialists ({filteredSpecialists.length})</span>
        </button>
      </div>

      {/* ── Outer Map Frame Container ──────────────────────────────────────── */}
      <div className="relative w-full rounded-3xl overflow-hidden border border-[#cbd5e2] bg-[#f8fafc] shadow-lg min-h-[580px] lg:h-[640px] flex flex-col lg:block">
        
        {/* ── MAP CANVAS (Full Background on Desktop) ────────────────────── */}
        <div
          className={`relative w-full h-[460px] sm:h-[520px] lg:absolute lg:inset-0 lg:h-full overflow-hidden select-none bg-[#f1f5f9] ${
            mobileTab === "list" ? "hidden lg:block" : "block"
          }`}
        >
          {/* Map Vector SVG with Streets, Catchment Zone & Reserve Land */}
          <div
            className="w-full h-full transition-transform duration-300 ease-out origin-center"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <svg
              viewBox="0 0 1000 650"
              className="w-full h-full object-cover"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                {/* Background Grid Pattern */}
                <pattern id="streetGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e9eef4" strokeWidth="0.8" />
                </pattern>

                {/* Suburb Zone Pattern */}
                <pattern id="diagonalHatch" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="10" stroke="#f59e0b" strokeWidth="0.6" strokeOpacity="0.25" />
                </pattern>

                {/* Pin Shadow Filter */}
                <filter id="pinShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.25" />
                </filter>
              </defs>

              {/* Base Map Fill */}
              <rect width="1000" height="650" fill="#F9F8F5" />
              <rect width="1000" height="650" fill="url(#streetGrid)" />

              {/* Nature Reserves & Green Spaces */}
              {/* Cubberla Creek Reserve */}
              <path
                d="M 360,340 C 370,300 440,320 460,370 C 470,410 430,450 380,440 Z"
                fill="#dcfce7"
                stroke="#bbf7d0"
                strokeWidth="1.5"
              />
              <text x="390" y="375" fill="#15803d" fontSize="9" fontWeight="600" opacity="0.8">
                Cubberla Reserve
              </text>

              {/* Kenmore South Reserve */}
              <path
                d="M 500,430 C 530,410 630,430 650,470 C 660,510 580,530 520,510 Z"
                fill="#dcfce7"
                stroke="#bbf7d0"
                strokeWidth="1.5"
              />
              <text x="545" y="475" fill="#15803d" fontSize="9" fontWeight="600" opacity="0.8">
                Kenmore South Parklands
              </text>

              {/* Lone Pine / Fig Tree Pocket Greenery */}
              <path
                d="M 740,470 C 780,450 840,480 850,540 C 860,600 790,620 730,580 Z"
                fill="#dcfce7"
                stroke="#bbf7d0"
                strokeWidth="1.5"
              />
              <text x="760" y="530" fill="#15803d" fontSize="9" fontWeight="600" opacity="0.8">
                Lone Pine Sanctuary
              </text>

              {/* Mt Coot-tha Forest Foothills (North) */}
              <path
                d="M 380,0 L 780,0 C 760,60 700,90 620,80 C 540,70 460,90 380,0 Z"
                fill="#dcfce7"
                stroke="#bbf7d0"
                strokeWidth="1.5"
              />
              <text x="510" y="45" fill="#15803d" fontSize="10" fontWeight="600" opacity="0.8">
                Mt Coot-tha Forest Catchment
              </text>

              {/* Brisbane River Curve (Right side) */}
              <path
                d="M 910,650 C 880,550 900,440 930,340 C 960,240 910,120 950,0"
                fill="none"
                stroke="#e0f2fe"
                strokeWidth="44"
                strokeLinecap="round"
              />
              <path
                d="M 910,650 C 880,550 900,440 930,340 C 960,240 910,120 950,0"
                fill="none"
                stroke="#bae6fd"
                strokeWidth="6"
                strokeDasharray="8 6"
              />
              <text x="915" y="270" fill="#0284c7" fontSize="10" fontWeight="600" letterSpacing="2" transform="rotate(75 915 270)">
                BRISBANE RIVER
              </text>

              {/* ── SHADED LOCAL SERVICE Catchment Area (Matching Screenshot) ── */}
              <polygon
                points="360,210 520,130 730,170 810,360 720,530 450,540 350,430 330,310"
                fill="#fbf3e4"
                fillOpacity="0.45"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeDasharray="6 3"
              />
              {/* Hatch Overlay inside Catchment */}
              <polygon
                points="360,210 520,130 730,170 810,360 720,530 450,540 350,430 330,310"
                fill="url(#diagonalHatch)"
              />
              <text
                x="560"
                y="160"
                fill="#946315"
                fontSize="11"
                fontWeight="700"
                letterSpacing="1.2"
                textAnchor="middle"
                opacity="0.85"
              >
                KENMORE CATCHMENT ZONE (4069 / 4075)
              </text>

              {/* Secondary Local Street Grid */}
              <g stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {/* Horizontal local roads */}
                <line x1="280" y1="180" x2="880" y2="180" />
                <line x1="280" y1="240" x2="840" y2="240" />
                <line x1="320" y1="300" x2="860" y2="300" />
                <line x1="300" y1="360" x2="820" y2="360" />
                <line x1="330" y1="420" x2="860" y2="420" />
                <line x1="300" y1="480" x2="840" y2="480" />
                <line x1="320" y1="540" x2="820" y2="540" />

                {/* Vertical local roads */}
                <line x1="360" y1="120" x2="360" y2="560" />
                <line x1="420" y1="120" x2="420" y2="580" />
                <line x1="480" y1="100" x2="480" y2="560" />
                <line x1="540" y1="100" x2="540" y2="580" />
                <line x1="600" y1="120" x2="600" y2="560" />
                <line x1="660" y1="120" x2="660" y2="580" />
                <line x1="720" y1="100" x2="720" y2="560" />
                <line x1="780" y1="100" x2="780" y2="560" />
              </g>

              {/* Major Arterial Roads */}
              {/* Centenary Motorway (Western Freeway) */}
              <line
                x1="810"
                y1="20"
                x2="810"
                y2="630"
                stroke="#cbd5e1"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <line
                x1="810"
                y1="20"
                x2="810"
                y2="630"
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeDasharray="8 6"
              />
              <text x="818" y="100" fill="#64748b" fontSize="9" fontWeight="600" letterSpacing="0.8">
                Centenary Motorway
              </text>

              {/* Moggill Road (Primary Spine) */}
              <path
                d="M 280,440 Q 480,400 620,310 T 890,200"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M 280,440 Q 480,400 620,310 T 890,200"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <text x="495" y="380" fill="#475569" fontSize="10" fontWeight="700" letterSpacing="0.5">
                Moggill Road
              </text>

              {/* Brookfield Road */}
              <path
                d="M 280,190 Q 400,240 500,280"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <text x="340" y="240" fill="#64748b" fontSize="9" fontWeight="600">
                Brookfield Rd
              </text>

              {/* Cedar Street */}
              <path
                d="M 620,170 L 740,250"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <text x="660" y="195" fill="#64748b" fontSize="8" fontWeight="600">
                Cedar St
              </text>

              {/* Banksia Crescent */}
              <path
                d="M 460,280 Q 520,310 560,280"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <text x="480" y="300" fill="#64748b" fontSize="8" fontWeight="600">
                Banksia Cres
              </text>

              {/* Marshall Lane */}
              <path
                d="M 630,420 L 700,490"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="3.5"
              />
              <text x="645" y="450" fill="#64748b" fontSize="8" fontWeight="600">
                Marshall Ln
              </text>

              {/* Suburb Name Labels */}
              <text x="540" y="340" fill="#94a3b8" fontSize="18" fontWeight="800" opacity="0.35" letterSpacing="4">
                KENMORE
              </text>
              <text x="360" y="210" fill="#94a3b8" fontSize="14" fontWeight="800" opacity="0.3" letterSpacing="3">
                BROOKFIELD
              </text>
              <text x="680" y="150" fill="#94a3b8" fontSize="14" fontWeight="800" opacity="0.3" letterSpacing="3">
                CHAPEL HILL
              </text>
              <text x="730" y="230" fill="#94a3b8" fontSize="14" fontWeight="800" opacity="0.3" letterSpacing="3">
                GRACEVILLE
              </text>
              <text x="825" y="350" fill="#94a3b8" fontSize="14" fontWeight="800" opacity="0.3" letterSpacing="3">
                INDOOROOPILLY
              </text>

              {/* ── BLACK PROPERTY / HANDOVER PINS (Realistic density) ── */}
              {PROPERTY_PINS.map((pin) => (
                <g
                  key={pin.id}
                  className="cursor-pointer transition-transform duration-150 hover:scale-125"
                  onMouseEnter={() => setHoveredPin(pin.id)}
                  onMouseLeave={() => setHoveredPin(null)}
                  onClick={() => alert(`${pin.address}, ${pin.suburb}\nStatus: ${pin.type}\nProtected in Prop ID Vault.`)}
                >
                  {/* Pin Teardrop Shape */}
                  <path
                    d={`M ${pin.x} ${pin.y} C ${pin.x - 7} ${pin.y - 7} ${pin.x - 7} ${pin.y - 18} ${pin.x} ${pin.y - 18} C ${pin.x + 7} ${pin.y - 18} ${pin.x + 7} ${pin.y - 7} ${pin.x} ${pin.y} Z`}
                    fill="#0F1A2C"
                    filter="url(#pinShadow)"
                  />
                  {/* House Icon Center */}
                  <circle cx={pin.x} cy={pin.y - 11} r="3" fill="#ffffff" />

                  {/* Tooltip on Hover */}
                  {hoveredPin === pin.id && (
                    <g transform={`translate(${pin.x}, ${pin.y - 28})`}>
                      <rect
                        x="-70"
                        y="-22"
                        width="140"
                        height="22"
                        rx="6"
                        fill="#0F1A2C"
                        fillOpacity="0.95"
                      />
                      <text
                        x="0"
                        y="-8"
                        fill="#ffffff"
                        fontSize="9"
                        fontWeight="600"
                        textAnchor="middle"
                      >
                        {pin.address}
                      </text>
                    </g>
                  )}
                </g>
              ))}

              {/* ── AMBER SPECIALIST PINS WITH AVATAR / ICON ── */}
              {filteredSpecialists.map((pro) => {
                const isSelected = activeSpecialistId === pro.id;
                const isOpen = openPopups.includes(pro.id);

                return (
                  <g
                    key={pro.id}
                    className="cursor-pointer"
                    onClick={() => togglePopup(pro.id)}
                  >
                    {/* Pulsing Beacon Circle under Pin */}
                    <circle
                      cx={pro.x}
                      cy={pro.y}
                      r="12"
                      fill="#C59B27"
                      fillOpacity={isSelected ? "0.45" : "0.2"}
                      className={isSelected ? "animate-ping" : ""}
                    />
                    <circle
                      cx={pro.x}
                      cy={pro.y}
                      r="6"
                      fill="#d97706"
                      fillOpacity="0.6"
                    />

                    {/* Amber Teardrop Pin */}
                    <path
                      d={`M ${pro.x} ${pro.y} C ${pro.x - 12} ${pro.y - 12} ${pro.x - 12} ${pro.y - 28} ${pro.x} ${pro.y - 28} C ${pro.x + 12} ${pro.y - 28} ${pro.x + 12} ${pro.y - 12} ${pro.x} ${pro.y} Z`}
                      fill={isSelected ? "#d97706" : "#b45309"}
                      filter="url(#pinShadow)"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />

                    {/* Specialist Badge Center */}
                    <circle
                      cx={pro.x}
                      cy={pro.y - 17}
                      r="7.5"
                      fill="#ffffff"
                    />
                    <text
                      x={pro.x}
                      y={pro.y - 14}
                      fill="#0F1A2C"
                      fontSize="8"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {pro.name.charAt(0)}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* ── FLOATING CALLOUT POPUP CARDS (Matching Screenshot Claire & Lachlan) ── */}
          <div className="absolute inset-0 pointer-events-none">
            {filteredSpecialists.map((pro) => {
              if (!openPopups.includes(pro.id)) return null;

              // Convert viewBox percentage coordinates
              const leftPct = (pro.x / 1000) * 100;
              const topPct = (pro.y / 650) * 100;

              return (
                <div
                  key={`popup-${pro.id}`}
                  className="absolute pointer-events-auto transition-all duration-200 z-30"
                  style={{
                    left: `${leftPct}%`,
                    top: `${topPct}%`,
                    transform: "translate(-50%, -100%) translateY(-22px)",
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative bg-white rounded-2xl p-4 shadow-[0_16px_35px_rgba(7,29,59,0.18)] border border-[#e2e5e5] w-[270px] sm:w-[300px]"
                  >
                    {/* Close Button */}
                    <button
                      onClick={(e) => closePopup(pro.id, e)}
                      aria-label="Close popup"
                      className="absolute top-3 right-3 text-[#94a3b8] hover:text-[#183249] hover:bg-[#f1f5f9] w-6 h-6 rounded-full flex items-center justify-center transition-colors text-[11px] font-bold"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    {/* Card Content Row */}
                    <div className="flex items-start gap-3 mb-3 pr-4">
                      {/* Avatar Image */}
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-[#e2e5e5] shadow-xs">
                        <img
                          src={pro.avatarUrl}
                          alt={pro.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info Column */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-[13px] font-bold text-[#183249] truncate">
                            {pro.name}
                          </h4>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#28715e] flex-shrink-0" />
                        </div>
                        <p className="text-[11px] font-semibold text-[#28715e] truncate">
                          {pro.role}
                        </p>
                        <p className="text-[10px] text-[#64727e] truncate mt-0.5">
                          {pro.business}
                        </p>
                        <div className="flex items-center gap-1 text-[10px] text-[#b45309] font-medium mt-1">
                          <span className="inline-flex items-center gap-0.5 font-bold">
                            <svg className="w-3 h-3 text-amber-500 fill-amber-500" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {pro.rating.toFixed(1)}
                          </span>
                          <span className="text-[#8a97a7]">({pro.reviewsCount})</span>
                          <span className="text-[#cbd5e1]">·</span>
                          <span className="text-[#64727e] truncate">{pro.suburb}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Button (Dark Navy Matching Screenshot) */}
                    <Link
                      href={pro.profileUrl}
                      className="w-full py-2 bg-[#0F1A2C] hover:bg-[#102d59] text-white font-semibold text-[11px] rounded-xl transition-colors shadow-2xs flex items-center justify-center gap-1.5 text-center"
                    >
                      <span>Connect</span>
                      <span className="text-[#C59B27]">→</span>
                    </Link>

                    {/* Downward Pointer Beak / Triangle */}
                    <div
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-white filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.06)]"
                    />
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* ── MAP CONTROLS (Bottom Right) ────────────────────────────────── */}
          <div className="absolute bottom-4 right-4 z-20 flex flex-col items-end gap-2">
            {/* Zoom Button Stack */}
            <div className="bg-white rounded-xl shadow-md border border-[#e2e5e5] overflow-hidden flex flex-col">
              <button
                onClick={() => handleZoom(0.15)}
                aria-label="Zoom in"
                className="w-8 h-8 flex items-center justify-center text-[#183249] hover:bg-[#f1f5f9] text-base font-bold transition-colors border-b border-[#e2e5e5]"
              >
                +
              </button>
              <button
                onClick={() => handleZoom(-0.15)}
                aria-label="Zoom out"
                className="w-8 h-8 flex items-center justify-center text-[#183249] hover:bg-[#f1f5f9] text-base font-bold transition-colors"
              >
                −
              </button>
            </div>

            {/* Reset / Recenter Button */}
            <button
              onClick={resetZoom}
              title="Reset View"
              className="bg-white px-2.5 py-1.5 rounded-lg shadow-md border border-[#e2e5e5] text-[10px] font-semibold text-[#64727e] hover:text-[#183249] hover:bg-[#f1f5f9] transition-colors flex items-center gap-1"
            >
              <span>⤢</span>
              <span>Reset</span>
            </button>

            {/* Map Attribution & Scale */}
            <div className="bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded text-[9px] text-[#64748b] border border-[#e2e8f0] shadow-2xs">
              Map data © The Property Helpline · Brisbane Western Corridor
            </div>
          </div>

          {/* ── MAP PIN LEGEND (Top Right) ──────────────────────────────────── */}
          <div className="hidden sm:flex absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-[#e2e5e5] shadow-xs items-center gap-3 text-[10px] text-[#475569]">
            <div className="flex items-center gap-1.5 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-[#d97706]" />
              <span>Verified Specialists</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0F1A2C]" />
              <span>Prop ID Records</span>
            </div>
          </div>
        </div>

        {/* ── LEFT DOCKED / FLOATING SIDEBAR (Matching Screenshot) ───────── */}
        <div
          className={`lg:absolute lg:top-4 lg:left-4 lg:bottom-4 lg:w-[340px] z-20 bg-white lg:bg-white/95 lg:backdrop-blur-md lg:rounded-2xl lg:border lg:border-[#e2e5e5] lg:shadow-xl flex flex-col p-4 sm:p-5 overflow-hidden ${
            mobileTab === "map" ? "hidden lg:flex" : "flex"
          }`}
        >
          {/* Header */}
          <div className="mb-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#28715e]">
                Local Area Network
              </span>
              <span className="text-[10px] bg-[#eaf4ef] text-[#28715e] font-bold px-2 py-0.5 rounded-full">
                {filteredSpecialists.length} Active
              </span>
            </div>
            <h3 className="text-base font-bold text-[#183249] mt-0.5">
              Specialists in Brisbane West
            </h3>
          </div>

          {/* Search Input Bar */}
          <div className="relative mb-3">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a97a7]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search suburb, trade or name..."
              className="w-full pl-9 pr-8 py-2 bg-[#F9F8F5] border border-[#e2e5e5] focus:border-[#0F1A2C] rounded-xl text-[12px] text-[#183249] placeholder-[#8a97a7] focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#8a97a7] hover:text-[#183249]"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Quick Filter Category Chips */}
          <div className="flex gap-1.5 overflow-x-auto pb-2 mb-2 scrollbar-none">
            {[
              { id: "all", label: "All" },
              { id: "inspector", label: "Inspectors" },
              { id: "conveyancer", label: "Legal" },
              { id: "builder", label: "Builders" },
              { id: "agent", label: "Appraisal" },
            ].map((chip) => (
              <button
                key={chip.id}
                onClick={() => setActiveCategory(chip.id)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold whitespace-nowrap transition-colors ${
                  activeCategory === chip.id
                    ? "bg-[#0F1A2C] text-white shadow-2xs"
                    : "bg-[#F9F8F5] text-[#64727e] hover:bg-[#e8edf4]"
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Scrollable Specialist Cards List */}
          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 -mr-1">
            {filteredSpecialists.length > 0 ? (
              filteredSpecialists.map((pro) => {
                const isSelected = activeSpecialistId === pro.id;
                const isCalloutOpen = openPopups.includes(pro.id);

                return (
                  <div
                    key={pro.id}
                    onClick={() => handleSelectSpecialist(pro)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer text-left flex items-start gap-3 group ${
                      isSelected
                        ? "bg-[#F9F8F5] border-[#0F1A2C] shadow-xs"
                        : "bg-white border-[#e2e5e5] hover:border-[#a0b3c6] hover:bg-[#fafbfd]"
                    }`}
                  >
                    {/* Avatar Photo */}
                    <div className="relative w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 border border-[#e2e5e5]">
                      <img
                        src={pro.avatarUrl}
                        alt={pro.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#28715e] border-2 border-white" />
                    </div>

                    {/* Specialist Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-[12px] font-bold text-[#183249] truncate group-hover:text-[#0F1A2C]">
                          {pro.name}
                        </h4>
                        <span className="inline-flex items-center gap-0.5 text-[10px] text-[#b45309] font-bold">
                          <svg className="w-2.5 h-2.5 text-amber-500 fill-amber-500" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {pro.rating.toFixed(1)}
                        </span>
                      </div>
                      <p className="text-[10.5px] font-semibold text-[#28715e] truncate mt-0.5">
                        {pro.role}
                      </p>
                      <p className="text-[10px] text-[#64727e] truncate">
                        {pro.business} · {pro.suburb}
                      </p>

                      <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-[#edf2f7] text-[10px]">
                        <span className="text-[#8a97a7] font-medium">
                          {isCalloutOpen ? (
                            <span className="inline-flex items-center gap-1">
                              <svg className="w-2.5 h-2.5 text-[#C59B27]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              Pin open on map
                            </span>
                          ) : (
                            "Click to view on map"
                          )}
                        </span>
                        <Link
                          href={pro.profileUrl}
                          onClick={(e) => e.stopPropagation()}
                          className="font-bold text-[#0F1A2C] hover:underline flex items-center gap-0.5"
                        >
                          <span>Profile</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center text-[#64727e] text-xs">
                <p>No specialists found for &ldquo;{searchQuery}&rdquo;.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  className="mt-2 text-[#0F1A2C] font-bold underline"
                >
                  Clear search filters
                </button>
              </div>
            )}
          </div>

          {/* Directory Footer Link */}
          <div className="pt-3 mt-2 border-t border-[#e2e5e5] flex items-center justify-between text-[11px]">
            <span className="text-[#64727e]">All licensed &amp; vetted</span>
            <Link
              href="/explore"
              className="font-bold text-[#0F1A2C] hover:underline flex items-center gap-1"
            >
              <span>Explore full directory</span>
              <span>→</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
