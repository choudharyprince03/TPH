import React from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[200] flex bg-white dark:bg-[#061221]">
      {/* Left branding panel */}
      <div
        className="hidden lg:flex w-[42%] flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #061221 0%, #0c2340 55%, #0c3d2b 100%)" }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute bottom-20 -left-16 w-72 h-72 rounded-full bg-white/5" />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 relative z-10">
          <div
            className="w-10 h-11 flex items-center justify-center font-bold text-sm text-[#061221] flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#10b981,#16a34a)", borderRadius: "8px 8px 8px 2px" }}
          >
            TPH
          </div>
          <div>
            <div className="text-white font-bold text-sm leading-tight">The Property Helpline</div>
            <div className="text-green-400 text-[10px] font-bold uppercase tracking-widest">Australia</div>
          </div>
        </Link>

        {/* Core value props */}
        <div className="relative z-10 space-y-8">
          <div>
            <div className="text-[10px] font-bold text-green-400 uppercase tracking-widest mb-3">
              Australia&apos;s Property Platform
            </div>
            <h2 className="font-display text-3xl font-bold text-white leading-tight mb-4">
              Build trust.<br />
              Hand over calmly.<br />
              <span className="text-green-400">Own with confidence.</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              The only platform where builders, buyers, and property professionals share one secure, permanent record — your Prop ID.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: "🏗️", title: "For Builders & Professionals", desc: "CRM, TrustLink workspaces, Digital Handover, Prop ID transfer" },
              { icon: "🏡", title: "For Property Owners & Buyers", desc: "My Property World, permanent Vault, verified service connections" },
              { icon: "🔒", title: "TrustLink Technology", desc: "Scoped, encrypted access — every professional sees only what they need" },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-3">
                <span className="text-xl flex-shrink-0 mt-0.5">{icon}</span>
                <div>
                  <div className="text-white text-sm font-bold">{title}</div>
                  <div className="text-slate-400 text-xs mt-0.5 leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust markers */}
        <div className="relative z-10">
          <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-3">Trusted by professionals across Australia</div>
          <div className="flex flex-wrap gap-3">
            {["REIQ Member", "MBA Accredited", "AIBS Certified", "PEXA Connected"].map((badge) => (
              <span key={badge} className="text-[10px] font-bold px-2.5 py-1 rounded-full border border-slate-700 text-slate-400">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right content panel */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-3 p-6 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-2.5">
            <div
              className="w-8 h-9 flex items-center justify-center font-bold text-xs text-[#061221]"
              style={{ background: "linear-gradient(135deg,#10b981,#16a34a)", borderRadius: "6px 6px 6px 2px" }}
            >
              TPH
            </div>
            <span className="font-bold text-brand-navy dark:text-white text-sm">The Property Helpline</span>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
