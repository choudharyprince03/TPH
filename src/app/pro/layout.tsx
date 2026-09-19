import { ProSidebar } from "@/components/layout/ProSidebar";

export default function ProLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-brand-surface dark:bg-brand-navy-dark w-full fixed inset-0 overflow-hidden z-[100]">
      <ProSidebar />
      <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#0a1628]">
        {children}
      </main>
    </div>
  );
}
