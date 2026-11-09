"use client";

import { ambilFavorit, simpanFavorit, useFavorit } from "@/data/favorit";

export default function TombolFavorit({
  id,
  kecil = false,
}: {
  id: number;
  kecil?: boolean;
}) {
  const daftar = useFavorit();
  const favorit = daftar?.includes(id) ?? false;
  const ukuran = kecil ? "px-3 py-1.5 text-sm" : "px-4 py-2";

  function ubah() {
    const sekarang = ambilFavorit();
    const baru = sekarang.includes(id)
      ? sekarang.filter((x) => x !== id)
      : [...sekarang, id];
    simpanFavorit(baru);
  }

  return (
    <button
      type="button"
      onClick={ubah}
      className={
        favorit
          ? `w-fit rounded border border-violet-600 bg-violet-600 text-white hover:bg-violet-700 ${ukuran}`
          : `w-fit rounded border border-violet-300 bg-white text-violet-700 hover:bg-violet-100 ${ukuran}`
      }
    >
      {favorit ? "♥ Favorit" : "♡ Tambah favorit"}
    </button>
  );
}