"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export function ProHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentScenario = searchParams.get("scenario") || "draft";

  const handleScenarioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "draft") {
      router.push("/pro");
    } else {
      router.push(`/pro?scenario=${val}`);
    }
  };

  return (
    <header className="w-full flex-shrink-0 z-40 bg-white select-none">
      {/* ── Stitch Interactive Demo Bar ── */}
      <div className="min-h-[35px] bg-[#e9e4da] px-4 sm:px-7 py-1.5 flex items-center justify-between gap-3 text-[#4f514e] text-[11px] border-b border-[#ded7c8]">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27] flex-shrink-0" />
          <strong className="text-[10px] font-bold tracking-[1.3px] uppercase text-[#343633] flex-shrink-0">
            Interactive Prototype
          </strong>
          <span className="hidden md:inline text-[10.5px] text-[#6b6e6a] truncate">
            Fictional records · actions stay in this browser · demo signatures
          </span>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <label htmlFor="scenario-select" className="text-[11px] text-[#555853] font-medium hidden sm:inline">
            Explore:
          </label>
          <select
            id="scenario-select"
            value={pathname === "/pro" ? currentScenario : "draft"}
            onChange={handleScenarioChange}
            className="border-0 bg-[#f8f6f0] text-[11px] text-[#183249] rounded-md px-2 py-0.5 max-w-[210px] font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#C59B27]"
          >
            <option value="draft">Builder's working day</option>
            <option value="review">Completed review example</option>
            <option value="delivered">Owner's delivered home</option>
          </select>
        </div>
      </div>

      {/* ── Main Topbar ── */}
      <div className="h-[74px] sm:h-[82px] px-4 sm:px-7 flex items-center justify-between gap-5 border-b border-[#e2e5e5]">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
          <div className="w-10 h-11 flex items-center justify-center flex-shrink-0">
            <img
              src="/logo.png"
              alt="The Property Helpline logo"
              className="max-h-10 w-auto object-contain"
            />
          </div>
          <div>
            <div className="text-[14px] sm:text-[15px] font-extrabold tracking-[0.25px] leading-tight text-[#0F1A2C] group-hover:text-[#C59B27] transition-colors">
              THE PROPERTY<br />HELPLINE
            </div>
            <div className="text-[9.5px] sm:text-[10px] text-[#64727e] mt-0.5 leading-tight">
              Your digital home for every property journey.
            </div>
          </div>
        </Link>

        {/* Top Links & Account */}
        <div className="flex items-center gap-4 sm:gap-6 text-[12px]">
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href="/explore"
              className="py-2 text-[#64727e] hover:text-[#0F1A2C] font-medium transition-colors"
            >
              Home Compass
            </Link>
            <Link
              href="/properties"
              className="py-2 text-[#64727e] hover:text-[#0F1A2C] font-medium transition-colors"
            >
              My Property World
            </Link>
            <Link
              href="/pro"
              className="py-2 text-[#0F1A2C] font-semibold border-b-2 border-[#C59B27] transition-colors"
            >
              I'm a Pro
            </Link>
          </nav>

          {/* Account Profile Badge */}
          <div className="flex items-center gap-3 pl-3 sm:pl-5 border-l border-[#e2e5e5]">
            <div className="w-9 h-9 rounded-full bg-[#ede3d2] text-[#755624] font-semibold text-[11.5px] flex items-center justify-center flex-shrink-0 shadow-2xs">
              CT
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <strong className="text-[12px] font-bold text-[#0F1A2C] block">
                Chris Taylor
              </strong>
              <span className="text-[10px] text-[#64727e]">
                Builder administrator
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
