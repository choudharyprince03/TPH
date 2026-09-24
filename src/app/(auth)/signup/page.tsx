"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Role = "owner" | "pro";
type Step = "role" | "form";

const PRO_TYPES = [
  "Builder / Developer",
  "Buyer's Agent",
  "Real Estate Agent",
  "Conveyancer / Settlement Agent",
  "Property Manager",
  "Building Inspector",
  "Strata Manager",
  "Electrician / Plumber",
  "Financial Advisor (AFSL)",
  "Other Professional",
];

const AU_STATES = ["QLD", "NSW", "VIC", "SA", "WA", "TAS", "ACT", "NT"];

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("role");
  const [role, setRole] = useState<Role | null>(null);
  const [proType, setProType] = useState("");
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", password: "",
    company: "", abn: "", licence: "", state: "QLD",
    propertyAddress: "", propertySuburb: "", propertyState: "QLD",
  });

  const handleRoleSelect = (r: Role) => {
    setRole(r);
    setStep("form");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(role === "pro" ? "/pro" : "/properties");
  };

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  if (step === "role") {
    return (
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 my-auto">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f4f9] border border-[#dfe6ef] text-[11px] font-bold text-[#071d3b] uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#24754c] inline-block" />
              <span>Get Started Free</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#102645] tracking-tight mb-2">
              Join The Property Helpline
            </h1>
            <p className="text-sm text-[#556b83]">
              Australia&apos;s trusted property platform. Choose how you&apos;ll use TPH.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => handleRoleSelect("owner")}
              className="w-full flex items-start gap-4 p-5 rounded-2xl border-2 border-[#dfe6ef] hover:border-[#071d3b] hover:bg-white bg-white/70 transition-all text-left group shadow-xs hover:shadow-md cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-[#071d3b] flex items-center justify-center flex-shrink-0 shadow-sm border border-white/10 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 text-[#efbd66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-[#102645] text-base mb-1 group-hover:text-[#071d3b] transition-colors">
                  I&apos;m a Property Owner or Buyer
                </div>
                <div className="text-xs text-[#556b83] leading-relaxed">
                  Find verified professionals, manage your Prop ID, access your Property Vault, and connect via TrustLink.
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {["My Property World", "Prop ID", "Property Vault", "TrustLinks"].map((t) => (
                    <span key={t} className="text-[10px] font-bold px-2 py-0.5 bg-[#f0f4f9] text-[#071d3b] border border-[#d8e3ef] rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </button>

            <button
              onClick={() => handleRoleSelect("pro")}
              className="w-full flex items-start gap-4 p-5 rounded-2xl border-2 border-[#dfe6ef] hover:border-[#24754c] hover:bg-white bg-white/70 transition-all text-left group shadow-xs hover:shadow-md cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-[#071d3b] flex items-center justify-center flex-shrink-0 shadow-sm border border-white/10 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 text-[#efbd66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-[#102645] text-base mb-1 group-hover:text-[#24754c] transition-colors">
                  I&apos;m a Property Professional
                </div>
                <div className="text-xs text-[#556b83] leading-relaxed">
                  Grow your client base, manage TrustLink workspaces, connect with fellow tradies, and transfer Prop IDs.
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {["Pro Hub CRM", "Tradie Network", "Digital Handover", "Prop ID Transfer"].map((t) => (
                    <span key={t} className="text-[10px] font-bold px-2 py-0.5 bg-[#eaf5ef] text-[#1b4e31] border border-[#c7e3d1] rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          </div>

          <p className="text-center text-sm text-[#556b83] mt-8">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-[#071d3b] hover:text-[#efbd66] hover:underline transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center p-6 sm:p-10 py-12 my-auto">
      <div className="w-full max-w-md">
        <button
          onClick={() => setStep("role")}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#556b83] hover:text-[#071d3b] mb-6 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
          Back to role selection
        </button>

        <div className="mb-6">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-3 border ${
            role === "pro"
              ? "bg-[#eaf5ef] border-[#c7e3d1] text-[#1b4e31]"
              : "bg-[#f0f4f9] border-[#d8e3ef] text-[#071d3b]"
          }`}>
            {role === "pro" ? (
              <>
                <svg className="w-3.5 h-3.5 text-[#24754c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>Property Professional</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5 text-[#efbd66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Property Owner / Buyer</span>
              </>
            )}
          </div>
          <h1 className="text-2xl font-bold text-[#102645] tracking-tight">
            Create your {role === "pro" ? "Pro Hub" : "Property World"} account
          </h1>
          <p className="text-sm text-[#556b83] mt-1">Free to join. No credit card required.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#102645] mb-1.5">First name</label>
              <input
                required
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                placeholder={role === "pro" ? "Alex" : "Emily"}
                className="w-full px-4 py-3 border border-[#dfe6ef] rounded-xl text-sm bg-white text-[#102645] placeholder:text-[#8a9cae] focus:outline-none focus:ring-2 focus:ring-[#071d3b]/15 focus:border-[#071d3b] transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#102645] mb-1.5">Last name</label>
              <input
                required
                value={form.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                placeholder={role === "pro" ? "Morgan" : "Carter"}
                className="w-full px-4 py-3 border border-[#dfe6ef] rounded-xl text-sm bg-white text-[#102645] placeholder:text-[#8a9cae] focus:outline-none focus:ring-2 focus:ring-[#071d3b]/15 focus:border-[#071d3b] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#102645] mb-1.5">Email address</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder={role === "pro" ? "alex@banksiahomes.com.au" : "emily@email.com.au"}
              className="w-full px-4 py-3 border border-[#dfe6ef] rounded-xl text-sm bg-white text-[#102645] placeholder:text-[#8a9cae] focus:outline-none focus:ring-2 focus:ring-[#071d3b]/15 focus:border-[#071d3b] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#102645] mb-1.5">
              Mobile (Australian)
            </label>
            <div className="flex">
              <span className="flex items-center gap-1.5 px-3.5 bg-[#f0f4f9] border border-r-0 border-[#dfe6ef] rounded-l-xl text-xs text-[#071d3b] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#24754c]" />
                +61
              </span>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="4XX XXX XXX"
                className="flex-1 px-4 py-3 border border-[#dfe6ef] rounded-r-xl text-sm bg-white text-[#102645] placeholder:text-[#8a9cae] focus:outline-none focus:ring-2 focus:ring-[#071d3b]/15 focus:border-[#071d3b] transition-all"
              />
            </div>
          </div>

          {/* Pro-specific fields */}
          {role === "pro" && (
            <>
              <div>
                <label className="block text-xs font-bold text-[#102645] mb-1.5">
                  Profession / Service type
                </label>
                <select
                  required
                  value={proType}
                  onChange={(e) => setProType(e.target.value)}
                  className="w-full px-4 py-3 border border-[#dfe6ef] rounded-xl text-sm bg-white text-[#102645] focus:outline-none focus:ring-2 focus:ring-[#071d3b]/15 focus:border-[#071d3b] transition-all"
                >
                  <option value="">Select your profession...</option>
                  {PRO_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#102645] mb-1.5">
                  Company / Trading name
                </label>
                <input
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  placeholder="Banksia Homes Pty Ltd"
                  className="w-full px-4 py-3 border border-[#dfe6ef] rounded-xl text-sm bg-white text-[#102645] placeholder:text-[#8a9cae] focus:outline-none focus:ring-2 focus:ring-[#071d3b]/15 focus:border-[#071d3b] transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#102645] mb-1.5">ABN</label>
                  <input
                    value={form.abn}
                    onChange={(e) => update("abn", e.target.value)}
                    placeholder="XX XXX XXX XXX"
                    className="w-full px-4 py-3 border border-[#dfe6ef] rounded-xl text-sm bg-white text-[#102645] placeholder:text-[#8a9cae] focus:outline-none focus:ring-2 focus:ring-[#071d3b]/15 focus:border-[#071d3b] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#102645] mb-1.5">
                    Licence no.
                  </label>
                  <input
                    value={form.licence}
                    onChange={(e) => update("licence", e.target.value)}
                    placeholder="QBCC ######"
                    className="w-full px-4 py-3 border border-[#dfe6ef] rounded-xl text-sm bg-white text-[#102645] placeholder:text-[#8a9cae] focus:outline-none focus:ring-2 focus:ring-[#071d3b]/15 focus:border-[#071d3b] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#102645] mb-1.5">
                  Primary operating state
                </label>
                <select
                  value={form.state}
                  onChange={(e) => update("state", e.target.value)}
                  className="w-full px-4 py-3 border border-[#dfe6ef] rounded-xl text-sm bg-white text-[#102645] focus:outline-none focus:ring-2 focus:ring-[#071d3b]/15 focus:border-[#071d3b] transition-all"
                >
                  {AU_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </>
          )}

          {/* Owner-specific fields */}
          {role === "owner" && (
            <div>
              <label className="block text-xs font-bold text-[#102645] mb-1.5">
                Property address <span className="font-normal text-[#68788e]">(optional — we&apos;ll create your Prop ID)</span>
              </label>
              <input
                value={form.propertyAddress}
                onChange={(e) => update("propertyAddress", e.target.value)}
                placeholder="18 Banksia Crescent, Kenmore QLD 4069"
                className="w-full px-4 py-3 border border-[#dfe6ef] rounded-xl text-sm bg-white text-[#102645] placeholder:text-[#8a9cae] focus:outline-none focus:ring-2 focus:ring-[#071d3b]/15 focus:border-[#071d3b] transition-all"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#102645] mb-1.5">Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              placeholder="Min. 8 characters"
              className="w-full px-4 py-3 border border-[#dfe6ef] rounded-xl text-sm bg-white text-[#102645] placeholder:text-[#8a9cae] focus:outline-none focus:ring-2 focus:ring-[#071d3b]/15 focus:border-[#071d3b] transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3.5 rounded-xl text-sm font-bold text-white transition-all bg-[#071d3b] hover:bg-[#041226] border border-[#0f2d59] shadow-sm hover:shadow active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <span>Create {role === "pro" ? "Pro Hub" : "Property World"} Account — Free</span>
            <span>→</span>
          </button>

          <p className="text-center text-[11px] text-[#68788e] leading-relaxed mt-2">
            By signing up you agree to our <Link href="#" className="underline hover:text-[#102645]">Terms of Service</Link> and <Link href="#" className="underline hover:text-[#102645]">Privacy Policy</Link>.
            <br />Your data is stored securely in Australia (AWS ap-southeast-2).
          </p>
        </form>

        <p className="text-center text-sm text-[#556b83] mt-6">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-[#071d3b] hover:text-[#efbd66] hover:underline transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
