"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { menu, rupiah } from "@/data/menu";
import {
  ambilKeranjang,
  simpanKeranjang,
  type ItemKeranjang,
} from "@/data/keranjang";

const MIN_PROMO = 20000;
const ONGKIR = 2000;

function hitungSubtotal(daftar: ItemKeranjang[]) {
  return daftar.reduce((jml, k) => {
    const item = menu.find((m) => m.id === k.id);
    return jml + (item ? item.harga * k.jumlah : 0);
  }, 0);
}

export default function Keranjang() {
  const [keranjang, setKeranjang] = useState<ItemKeranjang[]>([]);
  const [siap, setSiap] = useState(false);

  const [kodeInput, setKodeInput] = useState("");
  const [promoAktif, setPromoAktif] = useState(false);
  const [pesanPromo, setPesanPromo] = useState("");

  const [cara, setCara] = useState<"ambil" | "antar">("ambil");
  const [kelas, setKelas] = useState("");

  useEffect(() => {
    setKeranjang(ambilKeranjang());
    setSiap(true);
  }, []);

  function ubah(baru: ItemKeranjang[]) {
    setKeranjang(baru);
    simpanKeranjang(baru);

    if (promoAktif && hitungSubtotal(baru) < MIN_PROMO) {
      setPromoAktif(false);
      setPesanPromo(
        baru.length === 0
          ? ""
          : `Promo HEMAT10 tidak berlaku lagi: belanja kurang dari ${rupiah(MIN_PROMO)}.`
      );
    }
  }

  function ganti(id: number, selisih: number) {
    const stok = menu.find((m) => m.id === id)?.stok ?? 0;
    ubah(
      keranjang.map((k) =>
        k.id === id
          ? { ...k, jumlah: Math.min(stok, Math.max(1, k.jumlah + selisih)) }
          : k
      )
    );
  }

  function hapus(id: number) {
    ubah(keranjang.filter((k) => k.id !== id));
  }

  function pakaiPromo(e: FormEvent) {
    e.preventDefault();
    const kode = kodeInput.trim().toLowerCase();

    if (kode !== "hemat10") {
      setPromoAktif(false);
      setPesanPromo("Kode promo tidak dikenal.");
      return;
    }
    if (subtotal < MIN_PROMO) {
      setPromoAktif(false);
      setPesanPromo(`Promo HEMAT10 butuh belanja minimal ${rupiah(MIN_PROMO)}.`);
      return;
    }
    setPromoAktif(true);
    setPesanPromo("Promo HEMAT10 dipakai: diskon 10%.");
  }

  const baris = keranjang
    .map((k) => ({ k, item: menu.find((m) => m.id === k.id) }))
    .filter((b) => b.item !== undefined);

  const subtotal = hitungSubtotal(keranjang);
  const diskon = promoAktif ? Math.round(subtotal * 0.1) : 0;
  const ongkir = cara === "antar" ? ONGKIR : 0;
  const total = subtotal - diskon + ongkir;

  if (!siap) return null;

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-violet-700">Keranjang</h1>

      {baris.length === 0 ? (
        <p className="text-slate-500">Keranjang masih kosong.</p>
      ) : (
        <>
          <ul className="space-y-3">
            {baris.map(({ k, item }) => {
              const mentokAtas = k.jumlah >= item!.stok;
              const mentokBawah = k.jumlah <= 1;
              return (
                <li
                  key={k.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-violet-100 bg-white p-4"
                >
                  <div>
                    <p className="font-semibold">{item!.nama}</p>
                    <p className="text-sm text-slate-500">{rupiah(item!.harga)}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => ganti(k.id, -1)}
                      disabled={mentokBawah}
                      className={
                        mentokBawah
                          ? "h-8 w-8 cursor-not-allowed rounded border border-slate-200 bg-slate-100 text-slate-300"
                          : "h-8 w-8 rounded border border-violet-200 hover:bg-violet-100"
                      }
                    >
                      −
                    </button>
                    <span className="w-8 text-center">{k.jumlah}</span>
                    <button
                      onClick={() => ganti(k.id, 1)}
                      disabled={mentokAtas}
                      className={
                        mentokAtas
                          ? "h-8 w-8 cursor-not-allowed rounded border border-slate-200 bg-slate-100 text-slate-300"
                          : "h-8 w-8 rounded border border-violet-200 hover:bg-violet-100"
                      }
                    >
                      +
                    </button>
                  </div>

                  <p className="font-semibold">{rupiah(item!.harga * k.jumlah)}</p>

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

          <section className="mt-6 rounded-lg border border-violet-100 bg-white p-4">
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{rupiah(subtotal)}</span>
              </div>
              {diskon > 0 && (
                <div className="flex justify-between text-violet-700">
                  <span>Diskon</span>
                  <span>- {rupiah(diskon)}</span>
                </div>
              )}
              {ongkir > 0 && (
                <div className="flex justify-between">
                  <span>Ongkir</span>
                  <span>{rupiah(ongkir)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-violet-100 pt-2 text-lg font-semibold">
                <span>Total</span>
                <span>{rupiah(total)}</span>
              </div>
            </div>

            <div className="mt-6 space-y-5 border-t border-violet-100 pt-4">
              <form onSubmit={pakaiPromo}>
                <label className="mb-1 block font-medium" htmlFor="promo">
                  Kode promo
                </label>
                <div className="flex gap-2">
                  <input
                    id="promo"
                    type="text"
                    value={kodeInput}
                    onChange={(e) => setKodeInput(e.target.value)}
                    placeholder="Masukkan kode promo"
                    className="flex-1 rounded border border-violet-200 px-3 py-2"
                  />
                  <button
                    type="submit"
                    className="rounded bg-violet-600 px-4 py-2 text-white hover:bg-violet-700"
                  >
                    Pakai
                  </button>
                </div>
                {pesanPromo && (
                  <p
                    className={
                      promoAktif
                        ? "mt-2 text-sm font-semibold text-green-600"
                        : "mt-2 text-sm font-semibold text-red-600"
                    }
                  >
                    {pesanPromo}
                  </p>
                )}
              </form>

              <fieldset>
                <legend className="mb-1 font-medium">Cara ambil</legend>
                <label className="mr-6 inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="cara"
                    checked={cara === "ambil"}
                    onChange={() => setCara("ambil")}
                  />
                  Ambil sendiri
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="cara"
                    checked={cara === "antar"}
                    onChange={() => setCara("antar")}
                  />
                  Diantar (+{rupiah(ONGKIR)})
                </label>
              </fieldset>

              {cara === "antar" && (
                <div>
                  <label className="mb-1 block font-medium" htmlFor="kelas">
                    Kelas
                  </label>
                  <input
                    id="kelas"
                    type="text"
                    value={kelas}
                    onChange={(e) => setKelas(e.target.value)}
                    placeholder="Contoh: XI RPL 1"
                    className="w-full rounded border border-violet-200 px-3 py-2 sm:w-64"
                  />
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}