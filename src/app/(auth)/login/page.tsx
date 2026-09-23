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
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Welcome back</h1>
          <p className="text-sm text-slate-500">Sign in to your Property Helpline account.</p>
        </div>

        {/* Role selector */}
        <div className="flex rounded-xl border border-slate-200 dark:border-slate-700 p-1 mb-7 bg-slate-50 dark:bg-slate-800">
          <button
            onClick={() => setRole("owner")}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all ${
              role === "owner"
                ? "bg-white dark:bg-slate-700 text-brand-navy dark:text-white shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            🏡 Property Owner
          </button>
          <button
            onClick={() => setRole("pro")}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all ${
              role === "pro"
                ? "bg-white dark:bg-slate-700 text-brand-navy dark:text-white shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            🏗️ Professional / Builder
          </button>
        </div>

        {role === "pro" && (
          <div className="mb-5 flex items-center gap-2.5 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/40 rounded-xl">
            <div className="w-2 h-2 rounded-full bg-verified flex-shrink-0" />
            <span className="text-xs font-semibold text-verified">
              Pro Hub · TrustLink workspaces, Digital Handover &amp; Prop ID management
            </span>
          </div>
        )}

        {role === "owner" && (
          <div className="mb-5 flex items-center gap-2.5 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40 rounded-xl">
            <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
            <span className="text-xs font-semibold text-blue-700 dark:text-blue-400">
              My Property World · Prop ID vault, TrustLinks &amp; verified professionals
            </span>
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); router.push(role === "pro" ? "/pro" : "/properties"); }}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === "pro" ? "alex@banksiahomes.com.au" : "emily@email.com.au"}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-semibold"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div className="flex justify-end mt-1.5">
                <Link href="#" className="text-xs text-brand-navy dark:text-brand-gold font-semibold hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.99]"
            style={{ background: "linear-gradient(135deg, #0c2340, #143865)" }}
          >
            Sign in to {role === "pro" ? "Pro Hub" : "My Property World"}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-700" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white dark:bg-[#061221] px-3 text-xs text-slate-500">or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {["Google", "Apple"].map((provider) => (
            <button
              key={provider}
              className="flex items-center justify-center gap-2 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              {provider === "Google" ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.24 1.31-2.21 3.92.03 3.12 2.73 4.16 2.76 4.17l-.1.49zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              )}
              {provider}
            </button>
          ))}
        </div>

        <p className="text-center text-sm text-slate-500 mt-8">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-bold text-brand-navy dark:text-brand-gold hover:underline">
            Sign up free
          </Link>
        </p>

        <p className="text-center text-[11px] text-slate-400 mt-4 leading-relaxed">
          By signing in you agree to our{" "}
          <Link href="#" className="underline">Terms of Service</Link> and{" "}
          <Link href="#" className="underline">Privacy Policy</Link>.
          <br />Your data is stored securely in Australia (AWS ap-southeast-2).
        </p>
      </div>
    </div>
  );
}
