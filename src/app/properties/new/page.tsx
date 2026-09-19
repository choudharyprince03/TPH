import Link from "next/link";
import React from "react";

export default function AddPropertyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-10 w-full">
      <div className="mb-8">
        <Link href="/properties" className="text-sm text-slate-500 hover:text-brand-navy flex items-center gap-1 mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to My Property World
        </Link>
        <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">Add New Property</h1>
        <p className="text-slate-600">Register a property to generate a unique Prop ID and manage its TrustLinks.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 sm:p-8">
        <form className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Property Type</label>
              <select className="w-full border-slate-300 rounded-lg shadow-sm focus:ring-brand-navy focus:border-brand-navy text-sm">
                <option>Apartment</option>
                <option>Villa</option>
                <option>Plot / Land</option>
                <option>Commercial Space</option>
                <option>Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Address / Location</label>
              <input type="text" placeholder="e.g., DLF Phase 5, Gurgaon" className="w-full border-slate-300 rounded-lg shadow-sm focus:ring-brand-navy focus:border-brand-navy text-sm" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Ownership Status</label>
                <select className="w-full border-slate-300 rounded-lg shadow-sm focus:ring-brand-navy focus:border-brand-navy text-sm">
                  <option>Owned</option>
                  <option>Under Purchase</option>
                  <option>Rented</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Purpose</label>
                <select className="w-full border-slate-300 rounded-lg shadow-sm focus:ring-brand-navy focus:border-brand-navy text-sm">
                  <option>Primary Residence</option>
                  <option>Investment</option>
                  <option>Rental Income</option>
                  <option>Sale</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Approximate Value (Optional)</label>
              <input type="text" placeholder="e.g., ₹1.5 Cr" className="w-full border-slate-300 rounded-lg shadow-sm focus:ring-brand-navy focus:border-brand-navy text-sm" />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
            <Link href="/properties" className="px-5 py-2.5 text-sm font-semibold text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
              Cancel
            </Link>
            <Link href="/properties" className="px-5 py-2.5 text-sm font-semibold text-white bg-brand-navy hover:bg-brand-navy-light rounded-lg shadow-sm transition-colors">
              Generate Prop ID & Save
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
