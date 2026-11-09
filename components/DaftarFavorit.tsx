"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { rupiah, type Menu } from "@/data/menu";
import { useFavorit } from "@/data/favorit";

export default function DaftarFavorit() {
  const ids = useFavorit();
  const [semua, setSemua] = useState<Menu[]>([]);
  const [memuat, setMemuat] = useState(true);
  const [galat, setGalat] = useState("");

  useEffect(() => {
    fetch("/api/menu")
      .then((r) => {
        if (!r.ok) throw new Error("Gagal mengambil data");
        return r.json();
      })
      .then((d: Menu[]) => setSemua(d))
      .catch((e: Error) => setGalat(e.message))
      .finally(() => setMemuat(false));
  }, []);

  if (memuat || ids === undefined) return <p>Memuat...</p>;
  if (galat) return <p className="text-red-500">Galat: {galat}</p>;

  const daftar = semua.filter((m) => ids.includes(m.id));
  if (daftar.length === 0) return <p>Belum ada menu favorit.</p>;

  return (
    <ul className="space-y-3">
      {daftar.map((m) => (
        <li
          key={m.id}
          className="flex items-center justify-between rounded-lg border border-violet-100 bg-white p-3"
        >
          <Link
            href={`/menu/${m.id}`}
            className="font-semibold text-violet-600 hover:underline"
          >
            {m.nama}
          </Link>
          <span className="font-bold">{rupiah(m.harga)}</span>
        </li>
      ))}
    </ul>
  );
}