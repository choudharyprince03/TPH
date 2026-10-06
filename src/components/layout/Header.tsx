"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ReferralModal } from "@/components/features/ReferralModal";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [referralOpen, setReferralOpen] = useState(false);
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
  const isPropertyWorkspace =
    pathname.startsWith("/properties/") &&
    pathname !== "/properties" &&
    pathname !== "/properties/new";

  if (isAuth || isPro || isPropertyWorkspace) return null;

  const isWorld =
    pathname.startsWith("/properties") ||
    pathname.startsWith("/trustlinks") ||
    pathname.startsWith("/vault");
  const isFind =
    pathname.startsWith("/explore") || pathname.startsWith("/inquiry");
  const isAbout = pathname.startsWith("/about");
  const isHome = pathname === "/";
  const solid = scrolled || mobileOpen || !isHome;

  const navItems = [
    { href: "/explore", label: "Find help", active: isFind },
    { href: "/about", label: "About Us", active: isAbout },
    { href: "/properties", label: "My Property World", active: isWorld },
  ];

  return (
    <>
      {/* Main Consumer Header */}
      <header
        className={`w-full text-white z-50 transition-all duration-300 ${
          isHome ? "fixed top-0 inset-x-0" : "relative"
        } ${
          solid
            ? scrolled
              ? "bg-[#0F1A2C]/85 backdrop-blur-md shadow-[0_8px_30px_rgba(2,8,18,0.35)]"
              : "bg-[#0F1A2C]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-9 h-[76px] grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center gap-4">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group justify-self-start">
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 380, damping: 20 }}
              className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.25)] ring-1 ring-[#C59B27]/30 flex-shrink-0"
            >
              <img src="/logo.png" alt="The Property Helpline" className="h-8 w-auto object-contain" />
            </motion.div>
            <div className="leading-tight">
              <div className="font-headline font-bold text-[15px] tracking-tight text-white group-hover:text-[#C59B27] transition-colors">
                The Property Helpline
              </div>
              <div className="text-[8px] font-semibold uppercase tracking-[2.6px] text-[#C59B27] mt-1">
                Your digital home
              </div>
            </div>
          </Link>

          {/* Centre Navigation */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`h-8 px-4 rounded-full inline-flex items-center text-[12.5px] font-medium transition-all ${
                  item.active
                    ? "bg-[#C59B27] text-[#0F1A2C] font-semibold shadow-sm"
                    : "text-[#d4dce8] hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 justify-self-end">
            <Link
              href="/pro"
              className="hidden lg:inline-flex h-9 px-3 items-center gap-1 text-[12px] font-medium text-[#adbed3] hover:text-white transition-colors"
            >
              I'm a Pro <span className="text-[11px]">↗</span>
            </Link>

            <button
              onClick={() => setReferralOpen(true)}
              className="hidden sm:inline-flex h-9 px-3.5 items-center gap-1.5 rounded-full text-[12px] font-semibold text-[#C59B27] border border-[#C59B27]/40 hover:border-[#C59B27] hover:bg-[#C59B27]/10 transition-all cursor-pointer"
              title="Invite a specialist or refer friends"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V4.5a2.5 2.5 0 115 0V8h-5zm0 0H7a2.5 2.5 0 110-5 2.5 2.5 0 012.5 2.5V8H12zm-8 4h16v9a1 1 0 01-1 1H5a1 1 0 01-1-1v-9z" />
              </svg>
              <span>Refer / Invite</span>
            </button>

            <span className="hidden sm:block w-px h-5 bg-white/15 mx-1" />

            {/* Account */}
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/properties"
                className="w-9 h-9 rounded-full bg-[#1c3a54] ring-1 ring-[#C59B27]/50 hover:ring-[#C59B27] text-[#e3c46f] text-[12px] font-bold flex items-center justify-center transition-all"
                title="Alex · My account"
              >
                A
              </Link>
            </motion.div>

            {/* Log Out */}
            <Link
              href="/login"
              className="hidden sm:inline-flex w-9 h-9 rounded-full items-center justify-center text-[#adbed3] hover:text-white border border-white/15 hover:border-white/30 hover:bg-white/[0.06] transition-all"
              title="Log out"
              aria-label="Log out"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </Link>

            {/* Mobile menu trigger */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex md:hidden items-center justify-center w-9 h-9 text-white/80 hover:text-white"
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

        {/* Gold hairline — only once the page scrolls */}
        <div
          className={`h-px w-full bg-gradient-to-r from-transparent via-[#C59B27]/35 to-transparent transition-opacity duration-300 ${
            scrolled || !isHome ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Mobile Dropdown — AnimatePresence for smooth open/close */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="md:hidden bg-[#0F1A2C] border-t border-white/10 overflow-hidden"
            >
              <div className="px-5 py-4 space-y-1">
                {[
                  { href: "/explore", label: "Find help" },
                  { href: "/about", label: "About Us" },
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
                        item.gold ? "text-[#C59B27] font-semibold" : "text-[#d4dce8] hover:text-white"
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
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      setReferralOpen(true);
                    }}
                    className="w-full text-left text-xs text-[#C59B27] font-semibold py-1.5 flex items-center gap-1.5 tap-target"
                  >
                    <svg className="w-3.5 h-3.5 text-[#C59B27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V4.5a2.5 2.5 0 115 0V8h-5zm0 0H7a2.5 2.5 0 110-5 2.5 2.5 0 012.5 2.5V8H12zm-8 4h16v9a1 1 0 01-1 1H5a1 1 0 01-1-1v-9z" />
                    </svg>
                    <span>Refer a Friend or Pro</span>
                  </button>
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

      {/* Consumer Referral & Invitation Modal */}
      <ReferralModal
        isOpen={referralOpen}
        onClose={() => setReferralOpen(false)}
        mode="consumer"
      />
    </>
  );
}
