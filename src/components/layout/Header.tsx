"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isAuth = pathname.startsWith("/login") || pathname.startsWith("/signup");
  const isPro = pathname.startsWith("/pro");
  if (isAuth || isPro) return null;

  const isWorld = pathname.startsWith("/properties") || pathname.startsWith("/trustlinks") || pathname.startsWith("/vault");
  const isFind = pathname.startsWith("/explore") || pathname.startsWith("/inquiry");
  const isLearn = pathname.startsWith("/learn");

  return (
    <>
      {/* Prototype Demobar */}
      <div className="bg-[#eaf0f6] text-[#556b83] text-[11px] py-1.5 px-4 text-center border-b border-[#dfe6ef] flex items-center justify-center gap-2 font-medium">
        <span className="w-2 h-2 rounded-full bg-[#24754c] inline-block flex-shrink-0 animate-pulse" />
        <span>
          <strong className="text-[#102645] font-semibold">Australian English</strong> · Prototype Demonstration · Verified Prop ID &amp; TrustLink Systems
        </span>
      </div>

      {/* Main Consumer Header */}
      <header className="w-full bg-[#071d3b] text-white border-b border-[#0f2d59] relative z-30">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-10 h-[78px] flex items-center justify-between gap-6">

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="h-10 w-9 rounded-[7px] bg-[#fcfbf8] flex items-center justify-center text-[#071d3b] shadow-sm p-1.5 transition-transform group-hover:scale-105">
              <svg className="w-6 h-6 text-[#071d3b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div className="text-left">
              <div className="font-semibold text-[15px] tracking-tight leading-tight text-white">
                The Property Helpline
              </div>
              <div className="text-[8px] font-semibold uppercase tracking-[2.6px] text-[#b6c4d6] leading-tight mt-0.5">
                AUSTRALIA · INDEPENDENT
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium ml-4">
            <Link
              href="/explore"
              className={`transition-colors py-2 relative ${
                isFind ? "text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#efbd66]" : "text-[#d4dce8] hover:text-white"
              }`}
            >
              Find help
            </Link>

            <Link
              href="/learn"
              className={`transition-colors py-2 relative ${
                isLearn ? "text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#efbd66]" : "text-[#d4dce8] hover:text-white"
              }`}
            >
              Learn
            </Link>

            <Link
              href="/properties"
              className={`px-3.5 py-1.5 rounded-[7px] text-[13px] font-semibold transition-all border ${
                isWorld
                  ? "bg-[#efbd66] text-[#071d3b] border-[#efbd66] shadow-sm"
                  : "bg-white/10 text-white border-white/20 hover:bg-white/15"
              }`}
            >
              My Property World
            </Link>
          </nav>

          {/* Right Action & Account */}
          <div className="flex items-center gap-4 ml-auto">
            <Link
              href="/pro"
              className="text-[12px] text-[#adbed3] hover:text-white transition-colors flex items-center gap-1 font-medium hidden sm:flex"
            >
              I’m a Pro <span className="text-[11px]">↗</span>
            </Link>

            <Link
              href="/properties"
              className="flex items-center gap-2 border border-white/25 hover:border-white/40 text-white px-3.5 py-1.5 rounded-[8px] text-[12px] font-semibold transition-all bg-white/5 hover:bg-white/10"
            >
              <svg className="w-4 h-4 text-[#efbd66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Alex</span>
            </Link>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-white/80 hover:text-white"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="md:hidden bg-[#0a2347] border-t border-white/10 px-6 py-4 space-y-3">
            <Link
              href="/explore"
              onClick={() => setMobileOpen(false)}
              className="block text-sm py-2 text-[#d4dce8] hover:text-white"
            >
              Find help
            </Link>
            <Link
              href="/learn"
              onClick={() => setMobileOpen(false)}
              className="block text-sm py-2 text-[#d4dce8] hover:text-white"
            >
              Learn (Home Compass)
            </Link>
            <Link
              href="/properties"
              onClick={() => setMobileOpen(false)}
              className="block text-sm py-2 text-[#efbd66] font-semibold"
            >
              My Property World
            </Link>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <Link
                href="/pro"
                onClick={() => setMobileOpen(false)}
                className="text-xs text-[#adbed3]"
              >
                I’m a Pro ↗
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="text-xs text-white"
              >
                Log Out
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
