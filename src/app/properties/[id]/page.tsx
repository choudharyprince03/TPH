import Link from "next/link";
import React from "react";

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 w-full flex-1">
      <div className="mb-6 flex items-center gap-3 text-sm text-slate-500">
        <Link href="/properties" className="hover:text-brand-navy">My Property World</Link>
        <span>/</span>
        <span className="text-slate-800 font-semibold">{params.id || "Apartment, Gurgaon"}</span>
      </div>

      {/* Header Profile */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Apartment</span>
            <span className="bg-verified-light text-verified-dark text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Owned</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-slate-900 mb-2">Gurgaon, Sector 55</h1>
          <div className="flex items-center gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded px-2 py-1 flex items-center gap-2">
              <span className="text-[10px] font-bold text-brand-navy uppercase tracking-wider">Prop ID</span>
              <span className="font-mono text-sm font-semibold text-slate-800">TPH-2026-8F29A1</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 min-w-[200px]">
          <Link href="/inquiry/new?propId=TPH-2026-8F29A1" className="w-full text-center px-4 py-2 bg-brand-navy hover:bg-brand-navy-light text-white font-semibold rounded-lg text-sm shadow-sm transition-colors">
            Start TrustLink for Property
          </Link>
          <button className="w-full text-center px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg text-sm transition-colors">
            Upload to Vault
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-slate-200 mb-6 text-sm font-semibold">
        <button className="pb-3 border-b-2 border-brand-navy text-brand-navy">Overview</button>
        <button className="pb-3 border-b-2 border-transparent text-slate-500 hover:text-slate-800">TrustLinks (2)</button>
        <button className="pb-3 border-b-2 border-transparent text-slate-500 hover:text-slate-800">Property Vault (5)</button>
        <button className="pb-3 border-b-2 border-transparent text-slate-500 hover:text-slate-800">Property Pulse</button>
      </div>

      {/* Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Property Details</h2>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
              <div>
                <div className="text-slate-500 mb-1">Type</div>
                <div className="font-semibold text-slate-800">Apartment</div>
              </div>
              <div>
                <div className="text-slate-500 mb-1">Ownership</div>
                <div className="font-semibold text-slate-800">Owned</div>
              </div>
              <div>
                <div className="text-slate-500 mb-1">Purpose</div>
                <div className="font-semibold text-slate-800">Primary Residence</div>
              </div>
              <div>
                <div className="text-slate-500 mb-1">Approx. Value</div>
                <div className="font-semibold text-slate-800">₹1.5 Cr</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-slate-900">Active TrustLinks connected here</h2>
              <Link href="/trustlinks" className="text-sm font-semibold text-brand-navy hover:underline">View All</Link>
            </div>
            
            <div className="border border-slate-100 rounded-lg p-4 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 text-sm">ABC Developers</div>
                <div className="text-xs text-slate-500 mt-1">TL-2026-0012 • Documents Requested</div>
              </div>
              <Link href="/trustlinks/TL-2026-0012" className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded hover:bg-slate-200">Open</Link>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Property Pulse</h3>
            <div className="space-y-4">
              <div className="relative pl-4 border-l-2 border-slate-200">
                <div className="absolute w-2 h-2 bg-slate-400 rounded-full -left-[5px] top-1.5"></div>
                <div className="text-xs text-slate-500 mb-0.5">Today</div>
                <div className="text-sm font-medium text-slate-800">ABC Developers requested Property Sale Deed</div>
              </div>
              <div className="relative pl-4 border-l-2 border-slate-200">
                <div className="absolute w-2 h-2 bg-slate-400 rounded-full -left-[5px] top-1.5"></div>
                <div className="text-xs text-slate-500 mb-0.5">Oct 11, 2026</div>
                <div className="text-sm font-medium text-slate-800">TrustLink TL-2026-0012 created with ABC Developers</div>
              </div>
              <div className="relative pl-4 border-l-2 border-transparent">
                <div className="absolute w-2 h-2 bg-slate-400 rounded-full -left-[5px] top-1.5"></div>
                <div className="text-xs text-slate-500 mb-0.5">Oct 10, 2026</div>
                <div className="text-sm font-medium text-slate-800">Property added to Property Helpline</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
