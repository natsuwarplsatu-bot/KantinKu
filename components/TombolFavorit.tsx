"use client";

import { ambilFavorit, simpanFavorit, useFavorit } from "@/data/favorit";

export default function TombolFavorit({ id }: { id: number }) {
  const daftar = useFavorit();
  const favorit = daftar?.includes(id) ?? false;

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
          ? "w-fit rounded border border-violet-600 bg-violet-600 px-4 py-2 text-white hover:bg-violet-700"
          : "w-fit rounded border border-violet-300 px-4 py-2 text-violet-700 hover:bg-violet-100"
      }
    >
      {favorit ? "♥ Favorit" : "♡ Tambah favorit"}
    </button>
  );
}