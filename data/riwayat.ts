import { simpanLokal, useDaftar } from "./penyimpanan";

export type BarisPesanan = { nama: string; jumlah: number; harga: number };

export type Pesanan = {
  id: number;
  waktu: string;
  nama: string;
  cara: "ambil" | "antar";
  kelas: string;
  baris: BarisPesanan[];
  subtotal: number;
  diskon: number;
  ongkir: number;
  total: number;
};

const KUNCI = "riwayat";

export function ambilRiwayat(): Pesanan[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KUNCI) || "[]");
  } catch {
    return [];
  }
}

export function simpanRiwayat(daftar: Pesanan[]) {
  simpanLokal(KUNCI, daftar);
}

export function useRiwayat() {
  return useDaftar<Pesanan>(KUNCI);
}

export function buatPesanan(data: Omit<Pesanan, "id" | "waktu">): Pesanan {
  const sekarang = new Date();
  return { ...data, id: sekarang.getTime(), waktu: sekarang.toISOString() };
}