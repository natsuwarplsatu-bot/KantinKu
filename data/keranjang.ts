import { simpanLokal, useDaftar } from "./penyimpanan";

export type ItemKeranjang = { id: number; jumlah: number };

const KUNCI = "keranjang";

export function ambilKeranjang(): ItemKeranjang[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KUNCI) || "[]");
  } catch {
    return [];
  }
}

export function simpanKeranjang(keranjang: ItemKeranjang[]) {
  simpanLokal(KUNCI, keranjang);
  window.dispatchEvent(new Event("keranjang-berubah"));
}

export function useKeranjang() {
  return useDaftar<ItemKeranjang>(KUNCI);
}