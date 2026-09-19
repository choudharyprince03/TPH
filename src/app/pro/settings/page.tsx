import React from "react";

export default function ProSettingsPage() {
  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto">
      <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-8">Firm Settings</h1>
      
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm mb-6 p-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Firm Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Company Name</label>
            <input type="text" defaultValue="ABC Developers" className="w-full border-slate-300 dark:border-slate-600 dark:bg-slate-900 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Registration ID</label>
            <input type="text" defaultValue="QBCC #1089201" className="w-full border-slate-300 dark:border-slate-600 dark:bg-slate-900 rounded-lg text-sm" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm mb-6 p-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Notification Routing</h2>
        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Route new leads to Admin email</span>
            <input type="checkbox" defaultChecked className="rounded text-brand-emerald focus:ring-brand-emerald" />
          </label>
        </div>
      </div>
    </div>
  );
}
