import { Bell, Lock, PieChart, Target, TrendingUp, Wallet } from "lucide-react";
import React from "react";

const Features = () => {
  const features = [
    {
      icon: Wallet,
      title: "Catat Transaksi",
      description:
        "Catat semua pemasukan dan pengeluaran dengan cepat dan mudah dalam satu aplikasi.",
    },
    {
      icon: PieChart,
      title: "Analisis Keuangan",
      description:
        "Lihat visualisasi pengeluaran berdasarkan kategori dengan grafik yang mudah dipahami.",
    },
    {
      icon: Target,
      title: "Atur Budget",
      description:
        "Tetapkan anggaran bulanan untuk setiap kategori dan pantau pengeluaranmu.",
    },
    {
      icon: Bell,
      title: "Notifikasi Pintar",
      description:
        "Dapatkan pengingat saat anggaran hampir habis atau ada transaksi penting.",
    },
    {
      icon: Lock,
      title: "Aman & Privat",
      description:
        "Data keuanganmu tersimpan aman dengan enkripsi tingkat tinggi.",
    },
    {
      icon: TrendingUp,
      title: "Laporan Lengkap",
      description:
        "Akses laporan keuangan harian, mingguan, dan bulanan secara detail.",
    },
  ];

  return (
    <section
      id="features"
      className="bg-white dark:bg-zinc-950 transition-colors
    px-4 sm:px-6 lg:px-8
    py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 sm:mb-12 lg:mb-16 text-center">
          <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl text-zinc-900 dark:text-zinc-100">
            Fitur Lengkap untuk Mengelola Keuanganmu
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-zinc-600 dark:text-zinc-400">
            Semua yang kamu butuhkan untuk mengontrol keuangan dalam satu
            aplikasi
          </p>
        </div>
        <div className="grid gap-5 sm:gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-zinc-200 dark:border-zinc-800
            bg-white dark:bg-zinc-900
            p-5 sm:p-6 lg:p-8
            transition hover:border-emerald-300 hover:shadow-lg dark:hover:border-emerald-600"
            >
              <div
                className="mb-3 sm:mb-4 inline-block rounded-xl
              bg-emerald-100 dark:bg-emerald-900/40
              p-2.5 sm:p-3
              group-hover:bg-emerald-600 transition"
              >
                <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600 group-hover:text-white dark:text-emerald-400" />
              </div>

              <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl text-zinc-900 dark:text-zinc-100">
                {feature.title}
              </h3>

              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
