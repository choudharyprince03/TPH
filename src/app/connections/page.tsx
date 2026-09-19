import React from "react";
import Link from "next/link";

export default function ConnectionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 w-full flex-1">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">My Connections</h1>
        <p className="text-slate-600">Professionals you have connected with through TrustLinks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-xl font-bold text-slate-400 mb-4">D</div>
          <h3 className="text-lg font-bold text-slate-900">David Miller</h3>
          <p className="text-sm text-slate-500 mb-4">Miller's Building & Pest Inspections</p>
          <div className="w-full flex justify-between text-sm text-slate-600 border-t border-slate-100 pt-4 mb-4">
            <div><span className="font-bold text-slate-900">1</span> Active TrustLink</div>
            <div><span className="font-bold text-slate-900">0</span> Completed</div>
          </div>
          <Link href="/explore/pro-1" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors">
            View Connection
          </Link>
        </div>
      </div>
    </div>
  );
}
