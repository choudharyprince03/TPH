import React from "react";
import Link from "next/link";

export default function ProOnboardingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-xl shadow-lg p-8 md:p-12">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-brand-navy rounded-2xl flex items-center justify-center font-bold text-white text-xl mx-auto mb-4">
            PRO
          </div>
          <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">Create your Professional Profile</h1>
          <p className="text-slate-600">Join the Property Helpline network to connect with high-intent property owners.</p>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Company / Professional Name</label>
              <input type="text" placeholder="e.g. Miller's Inspections" className="w-full border-slate-300 rounded-lg shadow-sm text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
              <select className="w-full border-slate-300 rounded-lg shadow-sm text-sm">
                <option>Builder</option>
                <option>Building & Pest Inspector</option>
                <option>Conveyancer</option>
                <option>Electrician</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Business Registration / License Number</label>
            <input type="text" placeholder="e.g. QBCC #1089201" className="w-full border-slate-300 rounded-lg shadow-sm text-sm" />
          </div>

          <div className="pt-6 border-t border-slate-100">
            <Link href="/pro" className="w-full block text-center py-3 bg-brand-emerald hover:bg-emerald-600 text-white font-bold rounded-lg shadow-sm transition-colors">
              Publish & Enter Pro Hub
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
