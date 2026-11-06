import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "KantinKu",
  description: "Aplikasi KantinKu untuk memesan makanan dan minuman secara online.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className="antialiased">
      <body className="min-h-screen flex flex-col bg-violet-50 text-slate-900">
        <Suspense
          fallback={<div className="h-[52px] border-b border-violet-100 bg-violet-50" />}
        >
          <Navbar />
        </Suspense>
        <main className="mx-auto w-full flex-1 px-6 py-8">{children}</main>
        <footer className="border-t border-violet-100 bg-violet-50 px-6 py-4 text-center text-sm text-slate-600">
          KantinKu · Mega Natsuwa XII RPL 1
        </footer>
      </body>
    </html>
  );
}