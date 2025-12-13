import { ArrowRight, Wallet } from "lucide-react";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-emerald-50 dark:bg-zinc-950 transition-colors
        px-4 sm:px-6 lg:px-8
        pt-24 sm:pt-28 lg:pt-32
        pb-14 sm:pb-16 lg:pb-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 sm:mb-8 flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-600 p-2.5 sm:p-3 shadow-sm">
              <Wallet className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-emerald-600 dark:text-emerald-400">
              catatUangku
            </h1>
          </div>
          <h2 className="mb-4 sm:mb-6 max-w-3xl text-3xl sm:text-4xl lg:text-6xl leading-tight sm:leading-tight text-zinc-900 dark:text-zinc-100">
            Kelola Keuangan Lebih Mudah dan Terorganisir
          </h2>
          <p className="mb-7 sm:mb-8 max-w-2xl text-base sm:text-lg lg:text-xl text-zinc-600 dark:text-zinc-400">
            Catat pemasukan dan pengeluaran, pantau anggaran, dan capai tujuan
            finansialmu dengan aplikasi yang simpel dan mudah digunakan.
          </p>
          <div className="flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:w-auto sm:flex-row sm:gap-4">
            <Link
              href="/auth?sign=register"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 sm:px-8 py-3.5 sm:py-4 text-white transition hover:bg-emerald-700"
            >
              Mulai Sekarang
              <ArrowRight className="h-5 w-5" />
            </Link>
            <button className="w-full sm:w-auto rounded-full border-2 border-emerald-600 px-6 sm:px-8 py-3.5 sm:py-4 text-emerald-600 dark:text-emerald-400 transition hover:bg-emerald-50 dark:hover:bg-zinc-900">
              Lihat Demo
            </button>
          </div>
          <div className="mt-10 sm:mt-14 lg:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl text-emerald-600 dark:text-emerald-400">
                10K+
              </div>
              <div className="mt-1.5 sm:mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                Pengguna Aktif
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl text-emerald-600 dark:text-emerald-400">
                4.8/5
              </div>
              <div className="mt-1.5 sm:mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                Rating Pengguna
              </div>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl text-emerald-600 dark:text-emerald-400">
                100%
              </div>
              <div className="mt-1.5 sm:mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                Gratis
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-0 -z-10 h-64 w-64 sm:h-80 sm:w-80 lg:h-96 lg:w-96 rounded-full bg-emerald-200 opacity-20 blur-3xl dark:bg-emerald-900 dark:opacity-30"></div>
      <div className="absolute bottom-0 left-0 -z-10 h-64 w-64 sm:h-80 sm:w-80 lg:h-96 lg:w-96 rounded-full bg-blue-200 opacity-20 blur-3xl dark:bg-emerald-800 dark:opacity-30"></div>
    </section>
  );
};

export default Hero;
