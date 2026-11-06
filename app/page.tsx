import Link from "next/link";

export default function Beranda() {
  return (
    <div>
      <section className="flex flex-col items-center justify-center gap-4 bg-violet-100 py-20 text-center text-violet-900">
        <h1 className="text-4xl font-bold">Selamat Datang di KantinKu</h1>
        <p className="max-w-lg text-lg text-violet-800">
          Nikmati berbagai menu lezat dan minuman segar di KantinKu. Temukan
          favoritmu dan pesan sekarang!
        </p>
        <Link
          href="/menu"
          className="rounded bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700"
        >
          Lihat Menu
        </Link>
      </section>
    </div>
  );
}