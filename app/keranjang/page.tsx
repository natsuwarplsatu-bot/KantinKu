"use client";

import { useEffect, useState } from "react";
import { menu, rupiah } from "@/data/menu";
import {
  ambilKeranjang,
  simpanKeranjang,
  type ItemKeranjang,
} from "@/data/keranjang";

export default function Keranjang() {
  const [keranjang, setKeranjang] = useState<ItemKeranjang[]>([]);
  const [siap, setSiap] = useState(false);

  // baca localStorage sekali saat halaman dibuka
  useEffect(() => {
    setKeranjang(ambilKeranjang());
    setSiap(true);
  }, []);

  function ubah(baru: ItemKeranjang[]) {
    setKeranjang(baru);
    simpanKeranjang(baru);
  }

  function ganti(id: number, selisih: number) {
    const stok = menu.find((m) => m.id === id)?.stok ?? 0;
    const baru = keranjang.map((k) => {
      if (k.id !== id) return k;
      const jumlah = Math.min(stok, Math.max(1, k.jumlah + selisih));
      return { ...k, jumlah };
    });
    ubah(baru);
  }

  function hapus(id: number) {
    ubah(keranjang.filter((k) => k.id !== id));
  }

  if (!siap) return null;

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-violet-700">Keranjang</h1>

      {keranjang.length === 0 ? (
        <p className="text-slate-500">Keranjang masih kosong.</p>
      ) : (
        <ul className="space-y-3">
          {keranjang.map((k) => {
            const item = menu.find((m) => m.id === k.id);
            if (!item) return null;
            return (
              <li
                key={k.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-violet-100 bg-white p-4"
              >
                <div>
                  <p className="font-semibold">{item.nama}</p>
                  <p className="text-sm text-slate-500">
                    {rupiah(item.harga)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => ganti(k.id, -1)}
                    className="h-8 w-8 rounded border border-violet-200 hover:bg-violet-100"
                  >
                    −
                  </button>
                  <span className="w-8 text-center">{k.jumlah}</span>
                  <button
                    onClick={() => ganti(k.id, 1)}
                    className="h-8 w-8 rounded border border-violet-200 hover:bg-violet-100"
                  >
                    +
                  </button>
                </div>

                <p className="font-semibold">
                  {rupiah(item.harga * k.jumlah)}
                </p>

                <button
                  onClick={() => hapus(k.id)}
                  className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                >
                  Hapus
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}