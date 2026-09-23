"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface BacktrackingNavProps {
  breadcrumbs: BreadcrumbItem[];
  backHref?: string;
  pageTag?: string;
  actionSlot?: React.ReactNode;
}

export function BacktrackingNav({
  breadcrumbs,
  backHref,
  pageTag,
  actionSlot,
}: BacktrackingNavProps) {
  const router = useRouter();

  const handleBack = () => {
    if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  return (
    <div className="bg-white border-b border-[#dfe6ef] sticky top-0 z-40 shadow-[0_2px_8px_rgba(7,29,59,0.02)]">
      <div className="max-w-[1512px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Back Button + Breadcrumb Trail */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f4f6f8] hover:bg-[#e6ebf2] text-[#071d3b] text-[12px] font-bold rounded-lg border border-[#cbd5e2] transition-colors shadow-2xs group"
            title="Go back to previous page"
            aria-label="Back"
          >
            <span className="transition-transform group-hover:-translate-x-0.5 font-bold">←</span>
            <span>Back</span>
          </button>

          <span className="h-4 w-px bg-[#dfe6ef] hidden sm:block" />

          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-[12px] text-[#68788e]" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <React.Fragment key={crumb.label}>
                  {idx > 0 && <span className="text-[#a4b2c2]">›</span>}
                  {crumb.href && !isLast ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-[#102645] hover:underline font-medium transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={`font-semibold ${isLast ? "text-[#102645]" : "text-[#68788e]"}`}>
                      {crumb.label}
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        </div>

        {/* Right: Active Page Tracker Chip & Action Slot */}
        <div className="flex items-center gap-3 ml-auto">
          {pageTag && (
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-[#eaf0f6] rounded-md text-[11px] font-semibold text-[#3a5370] border border-[#d8e3ee]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#24754c]" />
              <span>{pageTag}</span>
            </div>
          )}

          {actionSlot && <div>{actionSlot}</div>}
        </div>

      </div>
    </div>
  );
}
