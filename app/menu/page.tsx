"use client";

import { useState } from "react";
import { menu } from "@/data/menu";
import KartuMenu from "@/components/KartuMenu";
import MenuTidakAda from "./[id]/not-found";

export default function Katalog() {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [urutan, setUrutan] = useState("awal");

  let hasil = menu.filter((m) =>
    m.nama.toLowerCase().includes(cari.toLowerCase())
  );

  if (kategori !== "Semua") {
    hasil = hasil.filter((m) => m.kategori === kategori);
  }

  if (urutan === "termurah") {
    hasil = [...hasil].sort((a, b) => a.harga - b.harga);
  } else if (urutan === "termahal") {
    hasil = [...hasil].sort((a, b) => b.harga - a.harga);
  } else if (urutan === "nama") {
    hasil = [...hasil].sort((a, b) => a.nama.localeCompare(b.nama));
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-violet-700">Menu</h1>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={cari}
          onChange={(e) => setCari(e.target.value)}
          placeholder="Cari menu..."
          className="flex-1 rounded border border-violet-200 bg-white px-3 py-2"
        />
        <select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          className="rounded border border-violet-200 bg-white px-3 py-2"
        >
          <option value="Semua">Semua</option>
          <option value="Makanan">Makanan</option>
          <option value="Minuman">Minuman</option>
          <option value="Camilan">Camilan</option>
        </select>
        <select
          value={urutan}
          onChange={(e) => setUrutan(e.target.value)}
          className="rounded border border-violet-200 bg-white px-3 py-2"
        >
          <option value="awal">Urutan awal</option>
          <option value="termurah">Harga termurah</option>
          <option value="termahal">Harga termahal</option>
          <option value="nama">Nama A-Z</option>
        </select>
      </div>

      {hasil.length === 0 ? (
        <MenuTidakAda />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hasil.map((m) => (
            <KartuMenu key={m.id} menu={m} />
          ))}
        </div>
      )}
    </div>
  );
}