import Link from "next/link";
import { rupiah, type Menu } from "@/data/menu";

export default function KartuMenu({ menu }: { menu: Menu }) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-violet-100 bg-white p-4 shadow-sm transition hover:scale-[1.01] hover:shadow-md">
      <span className="w-fit rounded bg-violet-100 px-2 py-1 text-sm font-semibold text-violet-700">
        {menu.kategori}
      </span>
      <h3 className="mt-2 text-lg font-semibold">{menu.nama}</h3>
      <p className="text-sm text-slate-500">{rupiah(menu.harga)}</p>
      <p
        className={
          menu.stok === 0
            ? "text-sm font-semibold text-red-600"
            : "text-sm text-violet-700"
        }
      >
        {menu.stok === 0 ? "Habis" : `Stok ${menu.stok}`}
      </p>
      <Link
        href={`/menu/${menu.id}`}
        className="mt-2 inline-block rounded bg-violet-600 px-3 py-1.5 text-center text-sm text-white hover:bg-violet-700"
      >
        Lihat detail
      </Link>
    </div>
  );
}