import React from "react";

export default function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-8 w-full flex-1">
      <h1 className="text-3xl font-display font-bold text-slate-900 mb-8">My Profile</h1>
      
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-slate-100 flex items-center gap-6">
          <div className="w-20 h-20 bg-brand-navy text-white rounded-full flex items-center justify-center text-2xl font-bold">JD</div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">John Doe</h2>
            <p className="text-slate-500">Customer Account</p>
          </div>
          <button className="ml-auto px-4 py-2 border border-slate-300 rounded-lg text-sm font-semibold hover:bg-slate-50">Edit Profile</button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email</label>
              <div className="font-semibold text-slate-900">john.doe@example.com</div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Phone</label>
              <div className="font-semibold text-slate-900">+61 400 000 000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
