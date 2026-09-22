import { ProSidebar } from "@/components/layout/ProSidebar";

export default function ProLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f4f6f8] text-[#102645] w-full fixed inset-0 overflow-hidden z-[100] font-sans antialiased">
      <ProSidebar />
      <main className="flex-1 overflow-y-auto bg-[#f4f6f8] text-[#102645] flex flex-col">
        {children}
      </main>
    </div>
  );
}
