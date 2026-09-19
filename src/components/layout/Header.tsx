"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isAuth = pathname.startsWith("/login") || pathname.startsWith("/signup");
  if (isAuth) return null;

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 glass-nav">
      <div className="h-16 max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between gap-4">

        {/* Logo + Nav */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div
              className="h-9 w-9 flex items-center justify-center font-bold text-xs text-[#061221] shadow-sm"
              style={{ background: "linear-gradient(135deg, #10b981, #16a34a)", borderRadius: "8px 8px 8px 2px" }}
            >
              TPH
            </div>
            <div className="hidden sm:block leading-tight">
              <div className="font-display text-sm font-bold text-brand-navy dark:text-white tracking-tight leading-none">
                The Property Helpline
              </div>
              <div className="text-[9px] font-bold text-green-600 dark:text-green-400 uppercase tracking-widest leading-none mt-0.5">
                Australia
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <Link href="/explore"
              className="text-slate-600 dark:text-slate-300 hover:text-brand-navy dark:hover:text-white hover:bg-slate-50 dark:hover:bg-brand-navy-dark px-3 py-1.5 rounded-lg transition-colors">
              Find a Professional
            </Link>
            <Link href="/properties"
              className="text-slate-600 dark:text-slate-300 hover:text-brand-navy dark:hover:text-white hover:bg-slate-50 dark:hover:bg-brand-navy-dark px-3 py-1.5 rounded-lg transition-colors font-semibold">
              My Property World
            </Link>
            <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-1" />
            <Link href="/pro"
              className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-verified hover:bg-green-50 dark:hover:bg-green-900/20 px-3 py-1.5 rounded-lg transition-colors font-semibold border border-slate-200 dark:border-slate-700">
              <span className="text-xs">🏗️</span>
              Pro Hub
            </Link>
          </nav>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <Link href="/explore"
            className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full text-slate-500 hover:text-brand-navy hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>

          {/* Notifications */}
          <Link href="/notifications"
            className="relative hidden sm:flex w-9 h-9 items-center justify-center rounded-full text-slate-500 hover:text-brand-navy hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-brand-emerald" />
          </Link>

          {/* Auth CTAs */}
          <Link href="/login"
            className="hidden md:inline-flex items-center px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-brand-navy dark:hover:text-white transition-colors">
            Log In
          </Link>
          <Link href="/signup"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white shadow transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #0c2340, #143865)" }}>
            Get Started
          </Link>

          {/* User avatar (logged in state demo) */}
          <Link href="/profile"
            className="hidden sm:flex w-8 h-8 rounded-full bg-brand-navy text-white text-xs font-bold items-center justify-center ring-2 ring-slate-200 dark:ring-slate-700 ml-1">
            JD
          </Link>

          {/* Mobile menu */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-brand-navy-dark border-t border-slate-200 dark:border-slate-800 px-4 py-4 space-y-1">
          {[
            { href: "/explore", label: "Find a Professional" },
            { href: "/properties", label: "My Property World" },
            { href: "/trustlinks", label: "TrustLinks" },
            { href: "/pro", label: "🏗️ Pro Hub" },
          ].map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              {label}
            </Link>
          ))}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-3 mt-3 flex gap-3">
            <Link href="/login" onClick={() => setMobileOpen(false)}
              className="flex-1 py-2.5 text-center text-xs font-bold border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300">
              Log In
            </Link>
            <Link href="/signup" onClick={() => setMobileOpen(false)}
              className="flex-1 py-2.5 text-center text-xs font-bold rounded-lg text-white"
              style={{ background: "linear-gradient(135deg, #0c2340, #143865)" }}>
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
