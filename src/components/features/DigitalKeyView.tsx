"use client";
import React, { useState } from "react";
import Link from "next/link";
import { PropertyData } from "@/lib/properties";

interface DigitalKeyViewProps {
  property: PropertyData;
  onOpenTrustLink?: () => void;
}

interface RecordPack {
  id: string;
  name: string;
  recipient: string;
  docCount: number;
  createdAt: string;
  status: "Draft" | "Active" | "Archived";
  type: "Required" | "Requested" | "Optional";
}

export function DigitalKeyView({ property, onOpenTrustLink }: DigitalKeyViewProps) {
  const [activeTab, setActiveTab] = useState<"action-required" | "packs" | "sent-returned">("action-required");
  const [incomingClaimed, setIncomingClaimed] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // User created packs
  const [packs, setPacks] = useState<RecordPack[]>([
    {
      id: "PACK-8902",
      name: "Pre-Sale Disclosure",
      recipient: "Draft",
      docCount: 3,
      createdAt: "2 days ago",
      status: "Draft",
      type: "Optional",
    }
  ]);

  const [newPackName, setNewPackName] = useState("");
  const [newPackRecipient, setNewPackRecipient] = useState("");
  const [selectedDocs, setSelectedDocs] = useState<string[]>(
    property.documents.slice(0, 2).map((d) => d.title)
  );

  const handleCreatePack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPackName.trim()) return;

    const newPack: RecordPack = {
      id: `PACK-${Date.now().toString().slice(-4)}`,
      name: newPackName.trim(),
      recipient: newPackRecipient.trim() || "Unassigned",
      docCount: selectedDocs.length,
      createdAt: "Just now",
      status: "Active",
      type: "Requested",
    };

    setPacks([newPack, ...packs]);
    setNewPackName("");
    setNewPackRecipient("");
    setCreateModalOpen(false);
    setActiveTab("packs");
  };

  const toggleDocSelection = (title: string) => {
    if (selectedDocs.includes(title)) {
      setSelectedDocs(selectedDocs.filter((t) => t !== title));
    } else {
      setSelectedDocs([...selectedDocs, title]);
    }
  };

  const trustlinkUrl = property.trustlinkHref || `/trustlinks/${property.trustlinkId || "TL-99214-B"}`;

  return (
    <div className="space-y-8 text-[#102645] font-sans max-w-[1040px] mx-auto pb-12">
      
      {/* Header Block */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#dfe6ef] pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#102645] mb-2">
            Digital Key
          </h1>
          <p className="text-sm text-[#64748b] max-w-2xl">
            The engine for your property deals and transfers. Track next actions, manage record packs, and securely exchange documents with verified professionals.
          </p>
        </div>
        <button
          onClick={() => setCreateModalOpen(true)}
          className="px-4 py-2 bg-[#071d3b] hover:bg-[#15345d] text-white rounded-lg text-xs font-bold transition-colors shadow-2xs whitespace-nowrap"
        >
          + Create Record Pack
        </button>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 overflow-x-auto">
        {[
          { id: "action-required", label: "Action Required", count: incomingClaimed ? 0 : 1, highlight: !incomingClaimed },
          { id: "packs", label: "Record Packs", count: packs.length },
          { id: "sent-returned", label: "Sent & Returned", count: 0 },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                isActive
                  ? "bg-white border-2 border-[#102645] text-[#102645] shadow-sm"
                  : "bg-[#f4f6f8] border border-transparent text-[#64748b] hover:text-[#102645] hover:bg-[#e2e8f0]"
              }`}
            >
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span className={`px-1.5 py-0.5 rounded text-[10px] ${isActive ? 'bg-[#102645] text-white' : 'bg-[#cbd5e1] text-[#475569]'}`}>
                  {tab.count}
                </span>
              )}
              {tab.highlight && (
                <span className="w-2 h-2 rounded-full bg-[#efbd66] animate-pulse ml-1" />
              )}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
        {/* 1. Action Required Tab */}
        {activeTab === "action-required" && (
          <div className="space-y-4">
            {!incomingClaimed ? (
              <div className="bg-white border border-[#dfe6ef] rounded-xl p-6 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#efbd66]"></div>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#b45309] bg-[#fef3c7] px-2 py-0.5 rounded">
                        Action Required
                      </span>
                      <span className="text-xs text-[#64748b]">Due: Today</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#102645] mb-2">
                      Accept Builder Handover
                    </h3>
                    <p className="text-sm text-[#64748b] mb-4">
                      Hart Homes has completed the statutory and construction handover for {property.street}. Review and accept to permanently transfer these records to your property vault.
                    </p>
                    <div className="bg-[#f8fafc] border border-[#dfe6ef] rounded-lg p-3 text-xs text-[#475569]">
                      <span className="font-semibold text-[#102645]">Includes 14 items:</span> Form 16, Architectural Drawings, Warranties, and Logbooks.
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 min-w-[160px]">
                    <button
                      onClick={() => {
                        setIncomingClaimed(true);
                        alert("Handover accepted! Records securely transferred.");
                      }}
                      className="w-full px-4 py-2.5 bg-[#24754c] hover:bg-[#1b5c3b] text-white rounded-lg text-sm font-bold transition-colors shadow-sm"
                    >
                      Accept Handover
                    </button>
                    <button
                      onClick={() => alert("Previewing handover documents...")}
                      className="w-full px-4 py-2.5 bg-white border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#102645] rounded-lg text-sm font-semibold transition-colors"
                    >
                      Review Items
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl p-8 text-center">
                <div className="w-12 h-12 bg-[#dcfce7] text-[#166534] rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
                  ✓
                </div>
                <h3 className="text-base font-bold text-[#166534] mb-1">All caught up</h3>
                <p className="text-sm text-[#15803d]">No pending actions or signature requests at this time.</p>
              </div>
            )}
          </div>
        )}

        {/* 2. Packs Tab */}
        {activeTab === "packs" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {packs.map((pack) => (
                <div key={pack.id} className="bg-white border border-[#dfe6ef] rounded-xl p-5 shadow-sm flex flex-col justify-between group hover:border-[#cbd5e1] transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        pack.status === "Active" ? "bg-[#eaf5ef] text-[#24754c]" : "bg-[#f1f5f9] text-[#64748b]"
                      }`}>
                        {pack.status}
                      </span>
                      <span className="text-[10px] font-mono text-[#94a3b8]">{pack.id}</span>
                    </div>
                    <h4 className="text-base font-bold text-[#102645] mb-1">{pack.name}</h4>
                    <p className="text-sm text-[#64748b] mb-4">
                      Type: <span className="text-[#102645]">{pack.type}</span> <br/>
                      Recipient: <span className="text-[#102645]">{pack.recipient}</span>
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#f4f6f8] flex items-center justify-between">
                    <div className="text-xs text-[#64748b] font-medium">
                      {pack.docCount} records
                    </div>
                    <button className="text-xs font-bold text-[#0284c7] hover:text-[#0369a1]">
                      Manage Pack →
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Create New Pack Card */}
              <button 
                onClick={() => setCreateModalOpen(true)}
                className="bg-[#f8fafc] border-2 border-dashed border-[#cbd5e1] rounded-xl p-5 flex flex-col items-center justify-center text-center hover:bg-[#f1f5f9] transition-colors min-h-[200px]"
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#64748b] mb-3 shadow-sm">
                  +
                </div>
                <h4 className="text-sm font-bold text-[#102645] mb-1">Create Record Pack</h4>
                <p className="text-xs text-[#64748b] max-w-[200px]">Bundle specific documents for a targeted recipient or execution route.</p>
              </button>
            </div>
          </div>
        )}

        {/* 3. Sent & Returned Tab */}
        {activeTab === "sent-returned" && (
          <div className="bg-white border border-[#dfe6ef] rounded-xl p-8 text-center">
            <p className="text-sm text-[#64748b]">No completed exchanges yet.</p>
            <p className="text-xs text-[#94a3b8] mt-2">When a pack is successfully executed and returned, it will appear here as evidence of exchange.</p>
          </div>
        )}
      </div>

      {/* TrustLink / Permissions Summary */}
      <div className="bg-[#f8fafc] border border-[#dfe6ef] rounded-xl p-5 mt-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-[#102645]">Execution Routes & Permissions</h3>
            <p className="text-xs text-[#64748b] mt-1">
              External professionals access packs via TrustLink. You maintain full ownership and can revoke access anytime.
            </p>
          </div>
          <Link
            href={trustlinkUrl}
            className="px-4 py-2 bg-white border border-[#cbd5e1] hover:bg-[#f1f5f9] text-[#102645] rounded-lg text-xs font-bold transition-colors whitespace-nowrap shadow-sm"
          >
            Manage TrustLink Settings
          </Link>
        </div>
      </div>

      {/* Create Pack Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-[#dfe6ef] flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#102645]">Create Record Pack</h2>
                <p className="text-xs text-[#64748b]">Bundle documents for a specific purpose.</p>
              </div>
              <button onClick={() => setCreateModalOpen(false)} className="text-[#64748b] hover:text-[#102645] text-xl">&times;</button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form id="create-pack-form" onSubmit={handleCreatePack} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-[#102645] uppercase tracking-wide mb-1.5">Pack Name</label>
                  <input
                    type="text"
                    required
                    value={newPackName}
                    onChange={(e) => setNewPackName(e.target.value)}
                    placeholder="e.g. Tenancy Agreement Bundle"
                    className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2.5 text-sm text-[#102645] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#071d3b]/20"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-[#102645] uppercase tracking-wide mb-1.5">Recipient / Scope</label>
                  <input
                    type="text"
                    value={newPackRecipient}
                    onChange={(e) => setNewPackRecipient(e.target.value)}
                    placeholder="e.g. Property Manager"
                    className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2.5 text-sm text-[#102645] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#071d3b]/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102645] uppercase tracking-wide mb-2">
                    Select Records ({selectedDocs.length})
                  </label>
                  <div className="border border-[#dfe6ef] rounded-lg bg-[#f8fafc] max-h-48 overflow-y-auto p-1">
                    {property.documents.map((doc) => (
                      <label key={doc.title} className="flex items-center gap-3 p-2 hover:bg-white rounded cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={selectedDocs.includes(doc.title)}
                          onChange={() => toggleDocSelection(doc.title)}
                          className="w-4 h-4 rounded border-[#cbd5e1] text-[#071d3b] focus:ring-[#071d3b]/20"
                        />
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-medium text-[#102645] truncate">{doc.title}</span>
                          <span className="text-[10px] text-[#64748b]">{doc.cat}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </form>
            </div>
            
            <div className="px-6 py-4 border-t border-[#dfe6ef] bg-[#f8fafc] flex justify-end gap-3 rounded-b-2xl">
              <button
                type="button"
                onClick={() => setCreateModalOpen(false)}
                className="px-4 py-2 text-sm font-semibold text-[#64748b] hover:text-[#102645]"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="create-pack-form"
                className="px-5 py-2 bg-[#071d3b] hover:bg-[#15345d] text-white rounded-lg text-sm font-bold shadow-sm transition-colors"
              >
                Generate Pack
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
