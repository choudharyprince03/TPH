import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "The Property Helpline · Your property, made simpler",
  description: "Find the right help. Keep the important things together. Stay in control, every step of the way.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className="scroll-smooth">
      <body className="font-sans antialiased min-h-screen flex flex-col bg-[#f3f6fb] text-[#102645]">
        <Header />
        <main className="w-full flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
