"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { rupiah, type Menu } from "@/data/menu";
import { ambilKeranjang, simpanKeranjang } from "@/data/keranjang";

export default function FormKeranjang({ item }: { item: Menu }) {
  const [jumlah, setJumlah] = useState(1);
  const [pesan, setPesan] = useState("");

  const mentokBawah = jumlah <= 1;
  const mentokAtas = jumlah >= item.stok;

  function ubahJumlah(nilai: number) {
    setJumlah(nilai);
    setPesan("");
  }

  function tambah(e: FormEvent) {
    e.preventDefault();
    setPesan("");

    if (!Number.isInteger(jumlah) || jumlah < 1) {
      setPesan("Jumlah minimal 1.");
      return;
    }

    const keranjang = ambilKeranjang();
    const ada = keranjang.find((k) => k.id === item.id);
    const jumlahDiKeranjang = ada ? ada.jumlah : 0;

    if (jumlah + jumlahDiKeranjang > item.stok) {
      setPesan(
        jumlahDiKeranjang === 0
          ? `Jumlah melebihi stok. Stok tersedia ${item.stok}.`
          : `Jumlah melebihi stok. Stok tersedia ${item.stok}, sudah ada ${jumlahDiKeranjang} di keranjang.`
      );
      return;
    }

    if (ada) {
      ada.jumlah += jumlah;
    } else {
      keranjang.push({ id: item.id, jumlah });
    }

    simpanKeranjang(keranjang);
    setPesan("Ditambahkan ke keranjang.");
    setJumlah(1);
  }

  return (
    <form onSubmit={tambah} noValidate className="mt-4 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span>Jumlah</span>

        <div className="flex items-center overflow-hidden rounded border border-violet-200">
          <button
            type="button"
            onClick={() => ubahJumlah(Math.max(1, Math.min(item.stok, jumlah - 1)))}
            disabled={mentokBawah}
            className={
              mentokBawah
                ? "cursor-not-allowed bg-slate-100 px-3 py-2 text-slate-300"
                : "px-3 py-2 hover:bg-violet-100"
            }
          >
            −
          </button>

          <input
            type="number"
            min={1}
            max={item.stok}
            aria-label="Jumlah"
            value={jumlah}
            onChange={(e) => ubahJumlah(Number(e.target.value))}
            className="w-16 border-x border-violet-200 px-2 py-2 text-center outline-none"
          />

          <button
            type="button"
            onClick={() => ubahJumlah(Math.max(1, Math.min(item.stok, jumlah + 1)))}
            disabled={mentokAtas}
            className={
              mentokAtas
                ? "cursor-not-allowed bg-slate-100 px-3 py-2 text-slate-300"
                : "px-3 py-2 hover:bg-violet-100"
            }
          >
            +
          </button>
        </div>
      </div>

      <p className="font-semibold">
        Total: {rupiah(item.harga * Math.max(jumlah, 0))}
      </p>

      <button
        type="submit"
        className="w-fit rounded bg-violet-600 px-4 py-2 text-white hover:bg-violet-700"
      >
        Tambah ke keranjang
      </button>

      {pesan && (
        <p
          className={
            pesan === "Ditambahkan ke keranjang."
              ? "font-semibold text-green-600"
              : "font-semibold text-red-600"
          }
        >
          {pesan}
        </p>
      )}
    </form>
  );
}