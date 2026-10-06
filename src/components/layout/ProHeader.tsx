"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export function ProHeader() {
  const pathname = usePathname();

  return (
    <header className="w-full flex-shrink-0 z-40 bg-white select-none border-b border-[#e2e5e5]">
      {/* ── Stitch Topbar ── */}
      <div className="h-[74px] sm:h-[80px] px-4 sm:px-7 flex items-center justify-between gap-5">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
          <div className="w-10 h-11 flex items-center justify-center flex-shrink-0">
            <img
              src="/logo.png"
              alt="The Property Helpline logo"
              className="max-h-10 w-auto object-contain"
            />
          </div>
          <div>
            <div className="text-[14px] sm:text-[15px] font-extrabold tracking-[0.25px] leading-tight text-[#0F1A2C] group-hover:text-[#C59B27] transition-colors">
              THE PROPERTY<br />HELPLINE
            </div>
            <div className="text-[9.5px] sm:text-[10px] text-[#64727e] mt-0.5 leading-tight">
              Your digital home for every property journey.
            </div>
          </div>
        </Link>

        {/* Top Links & Account */}
        <div className="flex items-center gap-4 sm:gap-6 text-[12px]">
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href="/explore"
              className="py-2 text-[#64727e] hover:text-[#0F1A2C] font-medium transition-colors"
            >
              Home Compass
            </Link>
            <Link
              href="/properties"
              className="py-2 text-[#64727e] hover:text-[#0F1A2C] font-medium transition-colors"
            >
              My Property World
            </Link>
            <Link
              href="/pro"
              className={`py-2 font-semibold transition-colors ${
                pathname.startsWith("/pro")
                  ? "text-[#0F1A2C] border-b-2 border-[#C59B27]"
                  : "text-[#64727e] hover:text-[#0F1A2C]"
              }`}
            >
              I'm a Pro
            </Link>
          </nav>

          {/* Account Profile Badge */}
          <div className="flex items-center gap-3 pl-3 sm:pl-5 border-l border-[#e2e5e5]">
            <div className="w-9 h-9 rounded-full bg-[#ede3d2] text-[#755624] font-semibold text-[11.5px] flex items-center justify-center flex-shrink-0 shadow-2xs">
              OH
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <strong className="text-[12px] font-bold text-[#0F1A2C] block">
                Olivia Hart
              </strong>
              <span className="text-[10px] text-[#64727e]">
                Hart Homes · QBCC #150821
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
