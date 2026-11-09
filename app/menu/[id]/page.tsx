import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { menu, rupiah } from "@/data/menu";
import FormKeranjang from "@/components/FormKeranjang";
import TombolFavorit from "@/components/TombolFavorit";

export default function DetailPage({ params }: PageProps<"/menu/[id]">) {
  return (
    <Suspense
      fallback={
        <article className="rounded-xl border border-violet-100 bg-white p-6">
          <p className="text-slate-500">Memuat detail menu...</p>
        </article>
      }
    >
      <DetailContent params={params} />
    </Suspense>
  );
}

async function DetailContent({
  params,
}: Pick<PageProps<"/menu/[id]">, "params">) {
  const { id } = await params;

  const item = menu.find((m) => m.id === Number(id));
  if (!item) notFound();

  const terkait = menu.filter(
    (m) => m.kategori === item.kategori && m.id !== item.id
  );

  return (
    <article className="rounded-xl border border-violet-100 bg-white p-6">
      <span className="rounded bg-violet-100 px-2 py-0.5 text-xs text-violet-700">
        {item.kategori}
      </span>

      <h1 className="mt-2 text-3xl font-bold">{item.nama}</h1>

      <p className="mt-4 text-xl font-semibold">{rupiah(item.harga)}</p>

      <p
        className={
          item.stok === 0 ? "mt-1 font-semibold text-red-600" : "mt-1 text-slate-600"
        }
      >
        {item.stok === 0 ? "Habis" : `Stok ${item.stok}`}
      </p>

      <div className="mt-5">
        <TombolFavorit id={item.id} />
      </div>

      {item.stok === 0 ? (
        <p className="mt-4 font-semibold text-red-600">Menu ini habis.</p>
      ) : (
        <FormKeranjang item={item} />
      )}

      <section className="mt-8 border-t border-violet-100 pt-4">
        <h2 className="text-lg font-semibold">Menu terkait</h2>

        {terkait.length === 0 ? (
          <p className="mt-2 text-slate-500">Belum ada menu terkait.</p>
        ) : (
          <ul className="mt-2 space-y-1">
            {terkait.map((m) => (
              <li key={m.id}>
                <Link
                  href={`/menu/${m.id}`}
                  className="text-violet-600 hover:underline"
                >
                  {m.nama}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
}