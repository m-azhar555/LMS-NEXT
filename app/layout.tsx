import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from './components/Sidebar';
// 1. Provider ko import karein
import QueryProvider from './providers/QueryProvider'; 
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeVector LMS",
  description: "Advanced Management Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="bg-[#050a18] text-white min-h-screen flex overflow-x-hidden">
        
        {/* 2. Poore content ko QueryProvider ke andar wrap kar dein */}
        <QueryProvider>
          <Sidebar />
          <main className="flex-1 ml-64 p-8">
            {children}
            <Toaster position="top-right" richColors />
          </main>
        </QueryProvider>

      </body>
    </html>
  );
}