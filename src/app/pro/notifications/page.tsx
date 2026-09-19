import React from "react";

export default function ProNotificationsPage() {
  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Notifications</h1>
        <button className="text-sm font-semibold text-brand-navy dark:text-brand-gold hover:underline">Mark all as read</button>
      </div>

      <div className="space-y-4">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm flex gap-4">
          <div className="mt-1 w-2 h-2 rounded-full bg-brand-emerald"></div>
          <div>
            <div className="font-bold text-slate-900 dark:text-white text-sm mb-1">Lead Accepted</div>
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">You successfully created TrustLink TL-99214-B.</div>
            <div className="text-xs text-slate-500 font-mono">10 mins ago</div>
          </div>
        </div>
      </div>
    </div>
  );
}
