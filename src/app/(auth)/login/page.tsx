"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Role = "owner" | "pro";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("owner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex-1 flex items-center justify-center p-6 sm:p-10 my-auto">
      <div className="w-full max-w-md">
        
        {/* Brand Card Header */}
        <div className="mb-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f4f9] border border-[#dfe6ef] text-[11px] font-bold text-[#071d3b] uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#24754c] inline-block" />
            <span>Secure Portal Sign In</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#102645] tracking-tight mb-1.5">
            Welcome back
          </h1>
          <p className="text-sm text-[#556b83]">
            Sign in to your Australian Property Helpline account.
          </p>
        </div>

        {/* Role selector */}
        <div className="flex rounded-xl border border-[#dfe6ef] p-1 mb-6 bg-[#f0f4f9]">
          <button
            type="button"
            onClick={() => setRole("owner")}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              role === "owner"
                ? "bg-[#071d3b] text-white shadow-sm"
                : "text-[#556b83] hover:text-[#071d3b]"
            }`}
          >
            <svg className="w-4 h-4 text-[#efbd66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Property Owner</span>
          </button>
          <button
            type="button"
            onClick={() => setRole("pro")}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              role === "pro"
                ? "bg-[#071d3b] text-white shadow-sm"
                : "text-[#556b83] hover:text-[#071d3b]"
            }`}
          >
            <svg className="w-4 h-4 text-[#24754c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>Professional / Builder</span>
          </button>
        </div>

        {/* Role context notice */}
        {role === "pro" ? (
          <div className="mb-5 flex items-center gap-2.5 p-3 bg-[#eaf5ef] border border-[#c7e3d1] rounded-xl text-left">
            <span className="w-2 h-2 rounded-full bg-[#24754c] flex-shrink-0 animate-pulse" />
            <span className="text-xs font-semibold text-[#1b4e31]">
              Pro Hub · Tradie network, TrustLinks, Digital Handover &amp; Prop ID management
            </span>
          </div>
        ) : (
          <div className="mb-5 flex items-center gap-2.5 p-3 bg-[#f0f4f9] border border-[#d8e3ef] rounded-xl text-left">
            <span className="w-2 h-2 rounded-full bg-[#efbd66] flex-shrink-0" />
            <span className="text-xs font-semibold text-[#071d3b]">
              My Property World · Permanent Vault, warranties &amp; verified connections
            </span>
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); router.push(role === "pro" ? "/pro" : "/properties"); }}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#102645] mb-1.5">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === "pro" ? "alex@banksiahomes.com.au" : "emily@email.com.au"}
                className="w-full px-4 py-3 border border-[#dfe6ef] rounded-xl text-sm bg-white text-[#102645] placeholder:text-[#8a9cae] focus:outline-none focus:ring-2 focus:ring-[#071d3b]/15 focus:border-[#071d3b] transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#102645] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-[#dfe6ef] rounded-xl text-sm bg-white text-[#102645] placeholder:text-[#8a9cae] focus:outline-none focus:ring-2 focus:ring-[#071d3b]/15 focus:border-[#071d3b] transition-all pr-14"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#68788e] hover:text-[#102645] text-xs font-semibold"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div className="flex justify-end mt-1.5">
                <Link href="#" className="text-xs text-[#071d3b] hover:text-[#efbd66] font-semibold transition-colors">
                  Forgot password?
                </Link>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-3.5 rounded-xl text-sm font-bold text-white transition-all bg-[#071d3b] hover:bg-[#041226] border border-[#0f2d59] shadow-sm hover:shadow active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <span>Sign in to {role === "pro" ? "Pro Hub" : "My Property World"}</span>
            <span>→</span>
          </button>
        </form>

        {/* Or divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#dfe6ef]" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#fcfbf8] px-3 text-xs text-[#68788e] font-medium">or continue with</span>
          </div>
        </div>

        {/* Social auth */}
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              name: "Google",
              icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              ),
            },
            {
              name: "Apple",
              icon: (
                <svg className="w-4 h-4 text-[#102645]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.24 1.31-2.21 3.92.03 3.12 2.73 4.16 2.76 4.17l-.1.49zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              ),
            },
          ].map((provider) => (
            <button
              key={provider.name}
              type="button"
              className="flex items-center justify-center gap-2 py-3 border border-[#dfe6ef] rounded-xl text-sm font-semibold text-[#102645] bg-white hover:bg-[#f0f4f9] transition-colors"
            >
              {provider.icon}
              <span>{provider.name}</span>
            </button>
          ))}
        </div>

        <p className="text-center text-sm text-[#556b83] mt-8">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-bold text-[#071d3b] hover:text-[#efbd66] hover:underline transition-colors">
            Sign up free
          </Link>
        </p>

        <p className="text-center text-[11px] text-[#68788e] mt-4 leading-relaxed">
          By signing in you agree to our{" "}
          <Link href="#" className="underline hover:text-[#102645]">Terms of Service</Link> and{" "}
          <Link href="#" className="underline hover:text-[#102645]">Privacy Policy</Link>.
          <br />Your data is stored securely in Australia (AWS ap-southeast-2).
        </p>
      </div>
    </div>
  );
}
