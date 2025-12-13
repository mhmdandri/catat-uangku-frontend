import {
  Car,
  Coffee,
  Home,
  Plus,
  Search,
  ShoppingBag,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import React from "react";

const AppPreview = () => {
  const transactions = [
    {
      id: 1,
      title: "Gaji Bulanan",
      amount: 8000000,
      type: "income",
      category: "Salary",
      icon: TrendingUp,
      color: "text-emerald-600 dark:text-emerald-400",
    },
    {
      id: 2,
      title: "Kopi & Snack",
      amount: -45000,
      type: "expense",
      category: "Food",
      icon: Coffee,
      color: "text-orange-600 dark:text-orange-400",
    },
    {
      id: 3,
      title: "Belanja Bulanan",
      amount: -850000,
      type: "expense",
      category: "Shopping",
      icon: ShoppingBag,
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      id: 4,
      title: "Listrik & Air",
      amount: -320000,
      type: "expense",
      category: "Bills",
      icon: Home,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      id: 5,
      title: "Bensin",
      amount: -150000,
      type: "expense",
      category: "Transport",
      icon: Car,
      color: "text-red-600 dark:text-red-400",
    },
  ];

  return (
    <section
      id="preview"
      className="bg-white dark:bg-zinc-950 transition-colors
        px-4 sm:px-6 lg:px-8
        py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="relative mx-auto w-full max-w-[20rem] sm:max-w-sm">
              <div className="rounded-[2.5rem] sm:rounded-[3rem] bg-zinc-900 p-3 sm:p-4 shadow-2xl dark:bg-zinc-800">
                <div className="relative overflow-hidden rounded-[2.1rem] sm:rounded-[2.5rem] bg-white">
                  <div className="bg-emerald-600 px-4 sm:px-6 py-2.5 sm:py-3 text-white">
                    <div className="flex items-center justify-between text-[11px] sm:text-xs">
                      <span>9:41</span>
                      <div className="flex gap-1">
                        <div className="h-3 w-3 rounded-full bg-white"></div>
                        <div className="h-3 w-3 rounded-full bg-white"></div>
                        <div className="h-3 w-3 rounded-full bg-white opacity-50"></div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-emerald-600 px-4 sm:px-6 pb-6 sm:pb-8 pt-3 sm:pt-4 text-white">
                    <div className="mb-4 sm:mb-6 flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm opacity-90">
                          Saldo Total
                        </p>
                        <p className="text-2xl sm:text-3xl">Rp 6.635.000</p>
                      </div>
                      <button className="rounded-full bg-white/20 p-2">
                        <Search className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                      <div className="rounded-xl bg-white/10 p-2.5 sm:p-3 backdrop-blur">
                        <div className="mb-1 flex items-center gap-1 text-[11px] sm:text-xs">
                          <TrendingUp className="h-3 w-3" />
                          <span>Pemasukan</span>
                        </div>
                        <p className="text-base sm:text-lg">Rp 8.000.000</p>
                      </div>
                      <div className="rounded-xl bg-white/10 p-2.5 sm:p-3 backdrop-blur">
                        <div className="mb-1 flex items-center gap-1 text-[11px] sm:text-xs">
                          <TrendingDown className="h-3 w-3" />
                          <span>Pengeluaran</span>
                        </div>
                        <p className="text-base sm:text-lg">Rp 1.365.000</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="mb-3 sm:mb-4 flex items-center justify-between">
                      <h3 className="text-sm sm:text-base text-zinc-900">
                        Transaksi Terbaru
                      </h3>
                      <button className="text-xs sm:text-sm text-emerald-600 dark:text-emerald-400">
                        Lihat Semua
                      </button>
                    </div>
                    <div className="space-y-2.5 sm:space-y-3">
                      {transactions.map((t) => (
                        <div
                          key={t.id}
                          className="flex items-center justify-between rounded-xl border
                            border-zinc-100 dark:border-zinc-800
                            p-2.5 sm:p-3 bg-white dark:bg-zinc-900"
                        >
                          <div className="flex items-center gap-2.5 sm:gap-3">
                            <div
                              className={`rounded-lg bg-zinc-100 dark:bg-zinc-800 p-2 ${t.color}`}
                            >
                              <t.icon className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm text-zinc-900 dark:text-zinc-100">
                                {t.title}
                              </p>
                              <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400">
                                {t.category}
                              </p>
                            </div>
                          </div>
                          <p
                            className={`text-xs sm:text-sm ${
                              t.type === "income"
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-red-600 dark:text-red-400"
                            }`}
                          >
                            {t.type === "income" ? "+" : "-"} Rp{" "}
                            {Math.abs(t.amount).toLocaleString("id-ID")}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 rounded-full bg-emerald-600 p-3.5 sm:p-4 shadow-lg hover:bg-emerald-700">
                    <Plus className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </button>
                </div>
              </div>
              <div className="absolute -right-3 -top-3 sm:-right-4 sm:-top-4 -z-10 h-28 w-28 sm:h-32 sm:w-32 bg-emerald-300 dark:bg-emerald-800 opacity-30 blur-2xl"></div>
              <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 -z-10 h-28 w-28 sm:h-32 sm:w-32 bg-blue-300 dark:bg-blue-900 opacity-30 blur-2xl"></div>
            </div>
          </div>
          <div className="text-center lg:text-left">
            <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl text-zinc-900 dark:text-zinc-100">
              Interface Simpel, Pengalaman Maksimal
            </h2>
            <p className="mb-5 sm:mb-6 text-base sm:text-lg lg:text-xl text-zinc-600 dark:text-zinc-400">
              Desain aplikasi yang intuitif membuat kamu bisa langsung
              menggunakan catatUangku tanpa perlu belajar rumit.
            </p>
            <div className="space-y-3 sm:space-y-4">
              {[
                [
                  "Dashboard Informatif",
                  "Lihat ringkasan keuanganmu secara sekilas di halaman utama",
                ],
                [
                  "Tambah Transaksi Cepat",
                  "Catat transaksi hanya dengan beberapa ketukan",
                ],
                [
                  "Kategorisasi Otomatis",
                  "Sistem pintar yang membantu kategorikan pengeluaranmu",
                ],
              ].map(([title, desc], i) => (
                <div key={i} className="flex gap-3 sm:gap-4 text-left">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                    <span className="text-emerald-600 dark:text-emerald-400">
                      ✓
                    </span>
                  </div>
                  <div>
                    <h4 className="mb-0.5 sm:mb-1 text-sm sm:text-base text-zinc-900 dark:text-zinc-100">
                      {title}
                    </h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPreview;
