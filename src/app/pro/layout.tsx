import { Suspense } from "react";
import { ProSidebar } from "@/components/layout/ProSidebar";
import { ProHeader } from "@/components/layout/ProHeader";
import { PropertyPulsePopup } from "@/components/features/PropertyPulse";

export default function ProLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9F8F5] text-[#183249] w-full fixed inset-0 overflow-hidden z-[100] font-sans antialiased">
      <Suspense fallback={<div className="h-[115px] bg-white border-b border-[#e2e5e5]" />}>
        <ProHeader />
      </Suspense>
      <div className="flex flex-1 min-h-0 w-full overflow-hidden">
        <ProSidebar />
        <main className="flex-1 overflow-y-auto bg-[#F9F8F5] text-[#183249] flex flex-col">
          {children}
        </main>
      </div>
      <PropertyPulsePopup />
    </div>
  );
}
