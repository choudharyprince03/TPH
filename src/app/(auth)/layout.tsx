import React from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[200] flex bg-[#fcfbf8]">
      {/* Left branding panel */}
      <div
        className="hidden lg:flex w-[42%] flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(165deg, #071d3b 0%, #041226 65%, #020b18 100%)" }}
      >
        {/* Subtle decorative brand aura glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#efbd66]/10 blur-3xl" />
        <div className="absolute bottom-20 -left-16 w-80 h-80 rounded-full bg-[#24754c]/15 blur-3xl" />

        {/* Official Brand Logo */}
        <Link href="/" className="flex items-center gap-3.5 relative z-10 group">
          <div className="bg-white rounded-2xl p-2.5 shadow-lg border border-white/20 flex-shrink-0 flex items-center justify-center">
            <img
              src="/logo.png"
              alt="The Property Helpline"
              className="h-14 sm:h-16 w-auto object-contain"
            />
          </div>
          <div>
            <div className="text-white font-bold text-lg leading-tight group-hover:text-[#efbd66] transition-colors">
              The Property Helpline
            </div>
            <div className="text-[#efbd66] text-[9px] font-bold uppercase tracking-[2px] mt-0.5">
              YOUR DIGITAL HOME
            </div>
          </div>
        </Link>

        {/* Core value props */}
        <div className="relative z-10 space-y-7">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-bold text-[#efbd66] uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#efbd66] animate-pulse" />
              Australia&apos;s Property Platform
            </div>
            <h2 className="font-display text-3xl font-bold text-white leading-tight mb-4">
              Build trust.<br />
              Hand over calmly.<br />
              <span className="text-[#efbd66]">Own with confidence.</span>
            </h2>
            <p className="text-[#b6c7db] text-sm leading-relaxed max-w-sm">
              The only platform where builders, buyers, and property professionals share one secure, permanent record — your Prop ID.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                icon: (
                  <svg className="w-5 h-5 text-[#efbd66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
                title: "For Builders & Professionals",
                desc: "CRM, TrustLink workspaces, Digital Handover, and Prop ID transfer.",
              },
              {
                icon: (
                  <svg className="w-5 h-5 text-[#efbd66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                ),
                title: "For Property Owners & Buyers",
                desc: "My Property World, permanent Vault, verified service connections.",
              },
              {
                icon: (
                  <svg className="w-5 h-5 text-[#efbd66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                title: "TrustLink Technology",
                desc: "Scoped, encrypted access — every professional sees only what they need.",
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-3.5 items-start">
                <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  {icon}
                </div>
                <div>
                  <div className="text-white text-sm font-bold">{title}</div>
                  <div className="text-[#a4b7cc] text-xs mt-0.5 leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust markers */}
        <div className="relative z-10 pt-4 border-t border-white/10">
          <div className="text-[10px] text-[#8ea4be] uppercase tracking-widest mb-3 font-semibold">
            Trusted by professionals across Australia
          </div>
          <div className="flex flex-wrap gap-2.5">
            {["Master Builders QLD", "REIQ Member", "AIBS Certified", "Australian Data Sovereignty"].map((badge) => (
              <span key={badge} className="text-[10px] font-semibold px-2.5 py-1 rounded-full border border-white/15 text-[#c1d0e2] bg-white/5">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right content panel */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-[#fcfbf8]">
        {/* Mobile top brand bar */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-[#dfe6ef] bg-white">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-white rounded-xl p-1.5 border border-[#dfe6ef] shadow-xs flex items-center justify-center">
              <img
                src="/logo.png"
                alt="The Property Helpline"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div>
              <span className="font-bold text-[#071d3b] text-sm block leading-tight">The Property Helpline</span>
              <span className="text-[8px] font-semibold uppercase tracking-wider text-[#efbd66]">YOUR DIGITAL HOME</span>
            </div>
          </Link>
          <Link href="/" className="text-xs font-semibold text-[#556b83] hover:text-[#071d3b]">
            Back to Home →
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
