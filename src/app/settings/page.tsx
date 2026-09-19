import React from "react";

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-8 w-full flex-1">
      <h1 className="text-3xl font-display font-bold text-slate-900 mb-8">Settings</h1>
      
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm mb-6 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Notification Preferences</h2>
        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm font-semibold text-slate-700">Email Notifications for TrustLink Updates</span>
            <input type="checkbox" defaultChecked className="rounded text-brand-navy focus:ring-brand-navy" />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm font-semibold text-slate-700">SMS Alerts for Document Requests</span>
            <input type="checkbox" defaultChecked className="rounded text-brand-navy focus:ring-brand-navy" />
          </label>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Security</h2>
        <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50">
          Change Password
        </button>
      </div>
    </div>
  );
}
