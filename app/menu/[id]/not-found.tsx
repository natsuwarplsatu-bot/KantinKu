import Link from "next/link";

export default function MenuTidakAda() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-5xl font-bold text-violet-700">404</h1>
      <h2 className="mt-2 text-2xl font-bold">Menu tidak ditemukan</h2>
      <p className="mt-2 text-slate-600">
        Menu yang kamu cari tidak ada atau sudah dihapus.
      </p>
      <Link
        href="/menu"
        className="mt-4 inline-block text-violet-600 hover:underline"
      >
        Kembali ke menu
      </Link>
    </div>
  );
}