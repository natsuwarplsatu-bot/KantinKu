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
  const data = localStorage.getItem(KUNCI);
  return data ? JSON.parse(data) : [];
}

export function simpanRiwayat(daftar: Pesanan[]) {
  localStorage.setItem(KUNCI, JSON.stringify(daftar));
}