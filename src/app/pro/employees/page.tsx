import React from "react";

export default function ProEmployeesPage() {
  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Team Management</h1>
        <button className="bg-brand-navy hover:bg-brand-navy-light text-white text-sm font-bold px-4 py-2 rounded-lg shadow-sm">
          + Add Employee
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center font-bold text-slate-500 text-xl">D</div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">David Miller</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Admin • Lead Inspector</p>
              <div className="flex gap-4 text-sm border-t border-slate-100 dark:border-slate-700 pt-4">
                <div><span className="font-bold text-slate-900 dark:text-white">12</span> Active TLs</div>
                <div><span className="font-bold text-slate-900 dark:text-white">4</span> Open Tasks</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
