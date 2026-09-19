import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "The Property Helpline",
  description: "Property Helpline connects customers with property professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`font-sans antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="w-full pt-16 flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
