export type ItemKeranjang = { id: number; jumlah: number };

const KUNCI = "keranjang";

export function ambilKeranjang(): ItemKeranjang[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(KUNCI);
  return data ? JSON.parse(data) : [];
}

export function simpanKeranjang(keranjang: ItemKeranjang[]) {
  localStorage.setItem(KUNCI, JSON.stringify(keranjang));
  window.dispatchEvent(new Event("keranjang-berubah"));
}