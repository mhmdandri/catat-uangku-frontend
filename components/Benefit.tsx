import React from "react";
import { ImageWithFallback } from "./ImageWithFallback";

const Benefit = () => {
  return (
    <section
      id="benefit"
      className="bg-gray-50 dark:bg-zinc-950 transition-colors
    px-4 sm:px-6 lg:px-8
    py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80"
              alt="Money management illustration"
              className="w-full rounded-2xl shadow-xl
            aspect-16/10 sm:vidio object-cover"
            />
          </div>
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl text-gray-900 dark:text-zinc-100">
              Kenapa Harus Menggunakan catatUangku?
            </h2>
            <p className="mb-6 sm:mb-8 text-base sm:text-lg lg:text-xl text-gray-600 dark:text-zinc-400">
              Lebih dari sekadar mencatat transaksi, catatUangku membantu kamu
              memahami pola keuangan dan membuat keputusan finansial yang lebih
              baik.
            </p>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex gap-3 sm:gap-4 text-left">
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white text-sm sm:text-base">
                  1
                </div>
                <div>
                  <h4 className="mb-1 sm:mb-2 text-lg sm:text-xl text-gray-900 dark:text-zinc-100">
                    Hemat Waktu
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-zinc-400">
                    Tidak perlu lagi mencatat manual di buku atau spreadsheet
                    yang ribet. Semua otomatis dan tersinkronisasi.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 sm:gap-4 text-left">
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white text-sm sm:text-base">
                  2
                </div>
                <div>
                  <h4 className="mb-1 sm:mb-2 text-lg sm:text-xl text-gray-900 dark:text-zinc-100">
                    Kontrol Pengeluaran
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-zinc-400">
                    Tahu persis ke mana uangmu pergi dan identifikasi
                    pengeluaran yang bisa dikurangi.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 sm:gap-4 text-left">
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white text-sm sm:text-base">
                  3
                </div>
                <div>
                  <h4 className="mb-1 sm:mb-2 text-lg sm:text-xl text-gray-900 dark:text-zinc-100">
                    Capai Tujuan Finansial
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-zinc-400">
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
