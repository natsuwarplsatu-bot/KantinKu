"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ambilKeranjang } from "@/data/keranjang";

const daftarMenu = [
  { href: "/", teks: "Beranda" },
  { href: "/menu", teks: "Menu" },
  { href: "/favorit", teks: "Favorit" },
  { href: "/keranjang", teks: "Keranjang" },
  { href: "/riwayat", teks: "Riwayat" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [jumlah, setJumlah] = useState(0);

  useEffect(() => {
    function hitung() {
      setJumlah(ambilKeranjang().reduce((total, k) => total + k.jumlah, 0));
    }

    hitung();
    window.addEventListener("keranjang-berubah", hitung);
    return () => window.removeEventListener("keranjang-berubah", hitung);
  }, []);

  return (
    <nav className="flex items-center gap-6 border-b border-violet-100 bg-white px-6 py-3">
      <span className="text-lg font-bold text-violet-700">KantinKu</span>
      {daftarMenu.map((m) => (
        <Link
          key={m.href}
          href={m.href}
          className={
            pathname === m.href
              ? "border-b-2 border-violet-500 font-semibold text-violet-700"
              : "text-slate-600 hover:text-violet-600"
          }
        >
          {m.href === "/keranjang" && jumlah > 0
            ? `Keranjang (${jumlah})`
            : m.teks}
        </Link>
      ))}
    </nav>
  );
}