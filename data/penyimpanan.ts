import { useMemo, useSyncExternalStore } from "react";

const KEJADIAN = "penyimpanan-berubah";

function langganan(callback: () => void) {
  window.addEventListener(KEJADIAN, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(KEJADIAN, callback);
    window.removeEventListener("storage", callback);
  };
}

function bacaMentah(kunci: string): string | null {
  try {
    return localStorage.getItem(kunci);
  } catch {
    return null;
  }
}

export function simpanLokal(kunci: string, nilai: unknown) {
  localStorage.setItem(kunci, JSON.stringify(nilai));
  window.dispatchEvent(new Event(KEJADIAN));
}

// undefined = belum siap (masih di server), [] = kosong
export function useDaftar<T>(kunci: string): T[] | undefined {
  const mentah = useSyncExternalStore<string | null | undefined>(
    langganan,
    () => bacaMentah(kunci),
    () => undefined
  );

  return useMemo(() => {
    if (mentah === undefined) return undefined;
    if (mentah === null) return [];
    try {
      return JSON.parse(mentah) as T[];
    } catch {
      return [];
    }
  }, [mentah]);
}