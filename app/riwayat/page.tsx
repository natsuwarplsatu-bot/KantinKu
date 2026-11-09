"use client";

import { useMemo } from "react";
import { rupiah } from "@/data/menu";
import { useRiwayat } from "@/data/riwayat";

export default function Riwayat() {
  const riwayat = useRiwayat();

  const daftar = useMemo(
    () => (riwayat ? [...riwayat].sort((a, b) => b.id - a.id) : []),
    [riwayat]
  );

  if (riwayat === undefined) return null;

  const totalBelanja = daftar.reduce((jml, p) => jml + p.total, 0);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-violet-700">Riwayat</h1>

      {daftar.length === 0 ? (
        <p className="text-slate-500">Belum ada pesanan.</p>
      ) : (
        <>
          <p className="mb-4 rounded-lg border border-violet-100 bg-white p-3 font-medium">
            {daftar.length} pesanan, total belanja {rupiah(totalBelanja)}
          </p>

          <ul className="space-y-4">
            {daftar.map((p) => (
              <li
                key={p.id}
                className="rounded-lg border border-violet-100 bg-white p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold">{p.nama}</p>
                  <p className="text-sm text-slate-500">
                    {new Date(p.waktu).toLocaleString("id-ID")}
                  </p>
                </div>

                <ul className="mt-2 space-y-1 text-sm">
                  {p.baris.map((b) => (
                    <li key={b.nama}>
                      {b.nama} x{b.jumlah} = {rupiah(b.harga * b.jumlah)}
                    </li>
                  ))}
                </ul>

                <div className="mt-3 space-y-1 border-t border-violet-100 pt-3 text-sm">
                  <p>Subtotal: {rupiah(p.subtotal)}</p>
                  {p.diskon > 0 && <p>Diskon: - {rupiah(p.diskon)}</p>}
                  <p>
                    {p.cara === "antar"
                      ? `Ongkir antar ke ${p.kelas}: ${rupiah(p.ongkir)}`
                      : "Diambil sendiri di kantin"}
                  </p>
                  <p className="font-semibold">
                    Total bayar: {rupiah(p.total)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}