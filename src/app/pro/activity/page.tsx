import React from "react";

export default function ProActivityPage() {
  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Firm Activity</h1>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm">
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="mt-1 w-2 h-2 rounded-full bg-brand-emerald"></div>
            <div>
              <div className="font-bold text-sm text-slate-900 dark:text-white mb-1">New Document Deposited</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">John Doe uploaded "Title Search QT2291/4.pdf" to TrustLink TL-99214-B.</div>
              <div className="text-xs text-slate-400 font-mono">10:48 AM</div>
            </div>
          </div>
          
          <div className="flex gap-4 opacity-70">
            <div className="mt-1 w-2 h-2 rounded-full bg-slate-300"></div>
            <div>
              <div className="font-bold text-sm text-slate-900 dark:text-white mb-1">New Lead Received</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Received a new inquiry for Pre-Purchase Inspection from Sarah Smith.</div>
              <div className="text-xs text-slate-400 font-mono">Yesterday</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
