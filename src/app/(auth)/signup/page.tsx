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
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Join The Property Helpline
            </h1>
            <p className="text-sm text-slate-500">
              Australia&apos;s trusted property platform. Choose how you&apos;ll use TPH.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => handleRoleSelect("owner")}
              className="w-full flex items-start gap-4 p-5 rounded-2xl border-2 border-slate-200 hover:border-brand-navy hover:bg-slate-50 dark:border-slate-700 dark:hover:border-brand-navy dark:hover:bg-slate-800/50 transition-all text-left group"
            >
              <div className="text-3xl flex-shrink-0 mt-0.5">🏡</div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white text-base mb-1 group-hover:text-brand-navy dark:group-hover:text-white">
                  I&apos;m a Property Owner or Buyer
                </div>
                <div className="text-xs text-slate-500 leading-relaxed">
                  Find verified professionals, manage your Prop ID, access your Property Vault, and connect via TrustLink.
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {["My Property World", "Prop ID", "Property Vault", "TrustLinks"].map((t) => (
                    <span key={t} className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">{t}</span>
                  ))}
                </div>
              </div>
            </button>

            <button
              onClick={() => handleRoleSelect("pro")}
              className="w-full flex items-start gap-4 p-5 rounded-2xl border-2 border-slate-200 hover:border-verified hover:bg-green-50/50 dark:border-slate-700 dark:hover:border-verified dark:hover:bg-green-900/10 transition-all text-left group"
            >
              <div className="text-3xl flex-shrink-0 mt-0.5">🏗️</div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white text-base mb-1 group-hover:text-verified">
                  I&apos;m a Property Professional
                </div>
                <div className="text-xs text-slate-500 leading-relaxed">
                  Grow your client base, manage TrustLink workspaces, run digital handovers, and transfer Prop IDs.
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {["Pro Hub CRM", "TrustLinks", "Digital Handover", "Prop ID Transfer"].map((t) => (
                    <span key={t} className="text-[10px] font-bold px-2 py-0.5 bg-green-50 text-verified rounded-full">{t}</span>
                  ))}
                </div>
              </div>
            </button>
          </div>

          <p className="text-center text-sm text-slate-500 mt-8">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-brand-navy dark:text-brand-gold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center p-8 py-12">
      <div className="w-full max-w-md">
        <button
          onClick={() => setStep("role")}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 mb-6 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="mb-6">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-3 ${
            role === "pro" ? "bg-green-50 text-verified" : "bg-blue-50 text-blue-700"
          }`}>
            {role === "pro" ? "🏗️ Property Professional" : "🏡 Property Owner / Buyer"}
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Create your {role === "pro" ? "Pro Hub" : "Property World"} account
          </h1>
          <p className="text-sm text-slate-500 mt-1">Free to join. No credit card required.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">First name</label>
              <input
                required
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                placeholder={role === "pro" ? "Alex" : "Emily"}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Last name</label>
              <input
                required
                value={form.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                placeholder={role === "pro" ? "Morgan" : "Carter"}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Email address</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder={role === "pro" ? "alex@banksiahomes.com.au" : "emily@email.com.au"}
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Mobile (Australian)
            </label>
            <div className="flex">
              <span className="flex items-center px-3 bg-slate-50 dark:bg-slate-800 border border-r-0 border-slate-200 dark:border-slate-700 rounded-l-xl text-sm text-slate-500 font-semibold">
                🇦🇺 +61
              </span>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="4XX XXX XXX"
                className="flex-1 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-r-xl text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy"
              />
            </div>
          </div>

          {/* Pro-specific fields */}
          {role === "pro" && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Profession / Service type
                </label>
                <select
                  required
                  value={proType}
                  onChange={(e) => setProType(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy"
                >
                  <option value="">Select your profession...</option>
                  {PRO_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Company / Trading name
                </label>
                <input
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  placeholder="Banksia Homes Pty Ltd"
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">ABN</label>
                  <input
                    value={form.abn}
                    onChange={(e) => update("abn", e.target.value)}
                    placeholder="XX XXX XXX XXX"
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Licence no.
                  </label>
                  <input
                    value={form.licence}
                    onChange={(e) => update("licence", e.target.value)}
                    placeholder="QBCC ######"
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Primary operating state
                </label>
                <select
                  value={form.state}
                  onChange={(e) => update("state", e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy"
                >
                  {AU_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </>
          )}

          {/* Owner-specific fields */}
          {role === "owner" && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Property address <span className="font-normal text-slate-400">(optional — we&apos;ll create your Prop ID)</span>
              </label>
              <input
                value={form.propertyAddress}
                onChange={(e) => update("propertyAddress", e.target.value)}
                placeholder="18 Banksia Crescent, Kenmore QLD 4069"
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              placeholder="Min. 8 characters"
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.99]"
            style={{ background: role === "pro" ? "linear-gradient(135deg, #0c3d2b, #16a34a)" : "linear-gradient(135deg, #0c2340, #143865)" }}
          >
            Create {role === "pro" ? "Pro Hub" : "Property World"} Account — Free
          </button>

          <p className="text-center text-[11px] text-slate-400 leading-relaxed mt-2">
            By signing up you agree to our Terms of Service and Privacy Policy.
            <br />Your data is stored securely in Australia (AWS ap-southeast-2).
          </p>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-brand-navy dark:text-brand-gold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
