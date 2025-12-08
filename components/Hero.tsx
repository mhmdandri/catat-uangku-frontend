import { ArrowRight, Wallet } from "lucide-react";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden px-6 pt-32 pb-20 lg:px-8
      bg-emerald-50 dark:bg-zinc-950 transition-colors"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-600 p-3 shadow-sm">
              <Wallet className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl text-emerald-600 dark:text-emerald-400">
              catatUangku
            </h1>
          </div>

          {/* Headline */}
          <h2
            className="mb-6 max-w-3xl text-5xl lg:text-6xl
          text-zinc-900 dark:text-zinc-100"
          >
            Kelola Keuangan Lebih Mudah dan Terorganisir
          </h2>

          {/* Subheadline */}
          <p className="mb-8 max-w-2xl text-xl text-zinc-600 dark:text-zinc-400">
            Catat pemasukan dan pengeluaran, pantau anggaran, dan capai tujuan
            finansialmu dengan aplikasi yang simpel dan mudah digunakan.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/auth?sign=register"
              className="flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-4 text-white transition hover:bg-emerald-700"
            >
              Mulai Sekarang
              <ArrowRight className="h-5 w-5" />
            </Link>

            <button
              className="rounded-full border-2 border-emerald-600 px-8 py-4
            text-emerald-600 dark:text-emerald-400
            transition hover:bg-emerald-50 dark:hover:bg-zinc-900"
            >
              Lihat Demo
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl text-emerald-600 dark:text-emerald-400">
                10K+
              </div>
              <div className="mt-2 text-zinc-600 dark:text-zinc-400">
                Pengguna Aktif
              </div>
            </div>

            <div>
              <div className="text-4xl text-emerald-600 dark:text-emerald-400">
                4.8/5
              </div>
              <div className="mt-2 text-zinc-600 dark:text-zinc-400">
                Rating Pengguna
              </div>
            </div>

            <div>
              <div className="text-4xl text-emerald-600 dark:text-emerald-400">
                100%
              </div>
              <div className="mt-2 text-zinc-600 dark:text-zinc-400">
                Gratis
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Blobs */}
      <div
        className="absolute right-0 top-0 -z-10 h-96 w-96 rounded-full 
      bg-emerald-200 opacity-20 blur-3xl 
      dark:bg-emerald-900 dark:opacity-30"
      ></div>

      <div
        className="absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full 
      bg-blue-200 opacity-20 blur-3xl 
      dark:bg-emerald-800 dark:opacity-30"
      ></div>
    </section>
  );
};

export default Hero;
