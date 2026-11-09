import { simpanLokal, useDaftar } from "./penyimpanan";

const KUNCI = "favorit";

export function ambilFavorit(): number[] {
  try {
    return JSON.parse(localStorage.getItem(KUNCI) || "[]");
  } catch {
    return [];
  }
}

export function simpanFavorit(daftar: number[]) {
  simpanLokal(KUNCI, daftar);
}

export function useFavorit() {
  return useDaftar<number>(KUNCI);
}