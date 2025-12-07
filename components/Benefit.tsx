import React from "react";
import { ImageWithFallback } from "./ImageWithFallback";

const Benefit = () => {
  return (
    <section
      id="benefit"
      className="bg-gray-50 dark:bg-zinc-950 px-6 py-20 lg:px-8 transition-colors"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: Image */}
          <div className="order-2 lg:order-1">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80"
              alt="Money management illustration"
              className="rounded-2xl shadow-xl"
            />
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <h2 className="mb-6 text-4xl text-gray-900 dark:text-zinc-100">
              Kenapa Harus Menggunakan catatUangku?
            </h2>

            <p className="mb-8 text-xl text-gray-600 dark:text-zinc-400">
              Lebih dari sekadar mencatat transaksi, catatUangku membantu kamu
              memahami pola keuangan dan membuat keputusan finansial yang lebih
              baik.
            </p>

            <div className="space-y-6">
              {/* Item 1 */}
              <div className="flex gap-4">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center 
                rounded-full bg-emerald-600 text-white"
                >
                  1
                </div>
                <div>
                  <h4 className="mb-2 text-xl text-gray-900 dark:text-zinc-100">
                    Hemat Waktu
                  </h4>
                  <p className="text-gray-600 dark:text-zinc-400">
                    Tidak perlu lagi mencatat manual di buku atau spreadsheet
                    yang ribet. Semua otomatis dan tersinkronisasi.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex gap-4">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center 
                rounded-full bg-emerald-600 text-white"
                >
                  2
                </div>
                <div>
                  <h4 className="mb-2 text-xl text-gray-900 dark:text-zinc-100">
                    Kontrol Pengeluaran
                  </h4>
                  <p className="text-gray-600 dark:text-zinc-400">
                    Tahu persis ke mana uangmu pergi dan identifikasi
                    pengeluaran yang bisa dikurangi.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex gap-4">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center 
                rounded-full bg-emerald-600 text-white"
                >
                  3
                </div>
                <div>
                  <h4 className="mb-2 text-xl text-gray-900 dark:text-zinc-100">
                    Capai Tujuan Finansial
                  </h4>
                  <p className="text-gray-600 dark:text-zinc-400">
                    Tetapkan target tabungan dan pantau progresmu untuk mencapai
                    impian finansialmu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefit;
