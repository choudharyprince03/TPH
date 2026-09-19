import React from "react";

export default function ProProfileManagementPage() {
  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-1">Public Profile Management</h1>
          <p className="text-sm text-slate-500">This is how your firm appears in the Explore Professionals directory.</p>
        </div>
        <div className="bg-emerald-100 text-emerald-800 font-bold text-sm px-3 py-1.5 rounded-lg border border-emerald-200">
          85% Complete
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Core Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">About Us</label>
            <textarea rows={4} className="w-full border-slate-300 dark:border-slate-600 dark:bg-slate-900 rounded-lg text-sm" defaultValue="ABC Developers is a premier residential building and development firm..."></textarea>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Services</label>
            <input type="text" className="w-full border-slate-300 dark:border-slate-600 dark:bg-slate-900 rounded-lg text-sm" defaultValue="Residential Development, Property Sales" />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button className="bg-brand-navy text-white text-sm font-bold px-6 py-2 rounded-lg">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
