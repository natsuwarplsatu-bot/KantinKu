import Link from "next/link";
import { rupiah, type Menu } from "@/data/menu";
import TombolFavorit from "@/components/TombolFavorit";

export default function KartuMenu({ menu }: { menu: Menu }) {
  const habis = menu.stok === 0;

  return (
    <div
      className={
        habis
          ? "flex flex-col gap-2 rounded-lg border border-slate-200 bg-slate-100 p-4 text-slate-400"
          : "flex flex-col gap-2 rounded-lg border border-violet-100 bg-white p-4 shadow-sm transition hover:scale-[1.01] hover:shadow-md"
      }
    >
      <span
        className={
          habis
            ? "w-fit rounded bg-slate-200 px-2 py-1 text-sm font-semibold text-slate-500"
            : "w-fit rounded bg-violet-100 px-2 py-1 text-sm font-semibold text-violet-700"
        }
      >
        {menu.kategori}
      </span>
      <h3 className="mt-2 text-lg font-semibold">{menu.nama}</h3>
      <p className={habis ? "text-sm" : "text-sm text-slate-500"}>
        {rupiah(menu.harga)}
      </p>
      <p
        className={
          habis
            ? "text-sm font-semibold text-slate-500"
            : "text-sm text-violet-700"
        }
      >
        {habis ? "Habis" : `Stok ${menu.stok}`}
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        {habis ? (
          <button
            type="button"
            disabled
            className="cursor-not-allowed rounded bg-slate-200 px-3 py-1.5 text-sm text-slate-400"
          >
            Lihat detail
          </button>
        ) : (
          <Link
            href={`/menu/${menu.id}`}
            className="rounded bg-violet-600 px-3 py-1.5 text-center text-sm text-white hover:bg-violet-700"
          >
            Lihat detail
          </Link>
        )}
        <TombolFavorit id={menu.id} kecil />
      </div>
    </div>
  );
}