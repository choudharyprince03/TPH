"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // ── ALL hooks must be called unconditionally at top level ──
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu whenever route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // ── Early return AFTER all hooks ──
  const isAuth = pathname.startsWith("/login") || pathname.startsWith("/signup");
  const isPro = pathname.startsWith("/pro");

  if (isAuth || isPro) return null;

  const isWorld =
    pathname.startsWith("/properties") ||
    pathname.startsWith("/trustlinks") ||
    pathname.startsWith("/vault");
  const isFind =
    pathname.startsWith("/explore") || pathname.startsWith("/inquiry");
  const isLearn = pathname.startsWith("/learn");

  return (
    <>
      {/* Prototype Demobar */}
      <div className="bg-[#eaf0f6] text-[#556b83] text-[11px] py-1.5 px-4 text-center border-b border-[#dfe6ef] flex items-center justify-center gap-2 font-medium">
        <span className="w-2 h-2 rounded-full bg-[#24754c] inline-block flex-shrink-0 animate-pulse" />
        <span>
          <strong className="text-[#102645] font-semibold">Australian English</strong>{" "}
          · Prototype Demonstration · Verified Prop ID &amp; TrustLink Systems
        </span>
      </div>

      {/* Main Consumer Header */}
      <header
        className={`w-full text-white relative z-30 transition-all duration-300 ${
          scrolled
            ? "bg-[#041226] shadow-[0_4px_24px_rgba(4,18,38,0.35)] border-b border-[#0f2040]"
            : "bg-[#071d3b] border-b border-[#0f2d59]"
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 h-[68px] sm:h-[78px] flex items-center justify-between gap-4 sm:gap-6">

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group">
            <motion.div
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 380, damping: 20 }}
              className="h-9 w-8 sm:h-10 sm:w-9 rounded-[7px] bg-[#fcfbf8] flex items-center justify-center text-[#071d3b] shadow-sm p-1.5"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#071d3b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </motion.div>
            <div className="text-left">
              <div className="font-semibold text-[13px] sm:text-[15px] tracking-tight leading-tight text-white">
                The Property Helpline
              </div>
              <div className="text-[7px] sm:text-[8px] font-semibold uppercase tracking-[2.6px] text-[#b6c4d6] leading-tight mt-0.5">
                AUSTRALIA · INDEPENDENT
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-[13px] font-medium ml-4">
            {[
              { href: "/explore", label: "Find help", active: isFind },
              { href: "/learn", label: "Learn", active: isLearn },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors py-2 relative nav-link-underline ${
                  item.active
                    ? "text-white font-semibold active"
                    : "text-[#d4dce8] hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/properties"
              className={`px-3 sm:px-3.5 py-1.5 rounded-[7px] text-[13px] font-semibold transition-all border ${
                isWorld
                  ? "bg-[#efbd66] text-[#071d3b] border-[#efbd66] shadow-sm"
                  : "bg-white/10 text-white border-white/20 hover:bg-white/15"
              }`}
            >
              My Property World
            </Link>
          </nav>

          {/* Right Action & Account */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link
              href="/pro"
              className="text-[12px] text-[#adbed3] hover:text-white transition-colors flex items-center gap-1 font-medium hidden sm:flex"
            >
              I'm a Pro <span className="text-[11px]">↗</span>
            </Link>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/properties"
                className="flex items-center gap-2 border border-white/25 hover:border-white/40 text-white px-3 py-1.5 rounded-[8px] text-[12px] font-semibold transition-all bg-white/5 hover:bg-white/10"
              >
                <svg className="w-4 h-4 text-[#efbd66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="hidden xs:inline">Alex</span>
              </Link>
            </motion.div>

            {/* Desktop Log Out Button */}
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-medium text-[#adbed3] hover:text-white px-2.5 py-1.5 rounded-[8px] border border-white/15 hover:border-white/30 hover:bg-white/10 transition-all"
              title="Sign out of account"
            >
              <svg className="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Log Out</span>
            </Link>

            {/* Mobile menu trigger */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-white/80 hover:text-white tap-target"
              aria-label="Toggle menu"
            >
              <motion.svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: mobileOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </motion.svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Dropdown — AnimatePresence for smooth open/close */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="md:hidden bg-[#0a2347] border-t border-white/10 overflow-hidden"
            >
              <div className="px-5 py-4 space-y-1">
                {[
                  { href: "/explore", label: "Find help" },
                  { href: "/learn", label: "Learn (Home Compass)" },
                  { href: "/properties", label: "My Property World", gold: true },
                ].map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.055 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block text-sm py-2.5 tap-target ${
                        item.gold ? "text-[#efbd66] font-semibold" : "text-[#d4dce8] hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.18 }}
                  className="pt-3 border-t border-white/10 flex items-center justify-between"
                >
                  <Link href="/pro" onClick={() => setMobileOpen(false)} className="text-xs text-[#adbed3] tap-target">
                    I'm a Pro ↗
                  </Link>
                  <Link href="/login" onClick={() => setMobileOpen(false)} className="text-xs text-white tap-target">
                    Log Out
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
