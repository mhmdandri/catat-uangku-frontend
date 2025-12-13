"use client";
import { ArrowRight, Smartphone } from "lucide-react";
import React from "react";

const CTA = () => {
  const onGetStartedClick = () => {
    window.location.href = "https://example.com/download";
  };
  return (
    <section
      id="download"
      className="bg-white dark:bg-zinc-950 transition-colors px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-emerald-600 to-emerald-800 text-center px-5 sm:px-8 lg:px-16 py-12 sm:py-14 lg:py-16">
          <div className="relative z-10">
            <div className="mb-5 sm:mb-6 flex justify-center">
              <div className="rounded-2xl bg-white/10 p-3 sm:p-4 backdrop-blur">
                <Smartphone className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
              </div>
            </div>
            <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-5xl text-white">
              Siap Mengelola Keuanganmu dengan Lebih Baik?
            </h2>
            <p className="mb-6 sm:mb-8 text-base sm:text-lg lg:text-xl text-emerald-100 dark:text-emerald-200">
              Bergabunglah dengan ribuan pengguna yang sudah merasakan manfaat
              catatUangku
            </p>
            <div className="mx-auto flex w-full max-w-md flex-col justify-center gap-3 sm:max-w-none sm:w-auto sm:flex-row sm:gap-4">
              <button
                onClick={onGetStartedClick}
                className="flex w-full sm:w-auto items-center justify-center gap-2
              rounded-full bg-white px-6 sm:px-8 py-3.5 sm:py-4
              text-emerald-600 transition hover:bg-emerald-50"
              >
                Download Sekarang
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                className="w-full sm:w-auto rounded-full border-2 border-white
              px-6 sm:px-8 py-3.5 sm:py-4
              text-white transition hover:bg-white/10 dark:hover:bg-white/10"
              >
                Pelajari Lebih Lanjut
              </button>
            </div>
            <div
              className="mt-8 sm:mt-10 lg:mt-12 flex flex-wrap items-center justify-center
            gap-x-6 gap-y-3 sm:gap-x-8 sm:gap-y-4
            text-sm sm:text-base
            text-emerald-100 dark:text-emerald-200"
            >
              {["100% Gratis", "Tanpa Iklan", "Data Aman"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div
            className="absolute -right-16 -top-16 sm:-right-20 sm:-top-20 h-56 w-56 sm:h-64 sm:w-64 rounded-full
          bg-emerald-400 dark:bg-emerald-700 opacity-20 blur-3xl"
          ></div>
          <div
            className="absolute -bottom-16 -left-16 sm:-bottom-20 sm:-left-20 h-56 w-56 sm:h-64 sm:w-64 rounded-full
          bg-emerald-400 dark:bg-emerald-700 opacity-20 blur-3xl"
          ></div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
