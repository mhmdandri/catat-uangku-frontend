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
      className="px-6 py-20 lg:px-8 bg-white dark:bg-zinc-950 transition-colors"
    >
      <div className="mx-auto max-w-7xl">
        <div
          className="relative overflow-hidden rounded-3xl 
        bg-linear-to-br from-emerald-600 to-emerald-800 
        px-8 py-16 text-center lg:px-16"
        >
          {/* Content */}
          <div className="relative z-10">
            <div className="mb-6 flex justify-center">
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <Smartphone className="h-12 w-12 text-white" />
              </div>
            </div>

            <h2 className="mb-4 text-4xl text-white lg:text-5xl">
              Siap Mengelola Keuanganmu dengan Lebih Baik?
            </h2>

            <p className="mb-8 text-xl text-emerald-100 dark:text-emerald-200">
              Bergabunglah dengan ribuan pengguna yang sudah merasakan manfaat
              catatUangku
            </p>

            {/* Buttons */}
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button
                onClick={onGetStartedClick}
                className="flex items-center justify-center gap-2 
                rounded-full bg-white px-8 py-4 text-emerald-600 
                transition hover:bg-emerald-50"
              >
                Download Sekarang
                <ArrowRight className="h-5 w-5" />
              </button>

              <button
                className="rounded-full border-2 border-white px-8 py-4 
              text-white transition hover:bg-white/10 dark:hover:bg-white/10"
              >
                Pelajari Lebih Lanjut
              </button>
            </div>

            {/* Trust badges */}
            <div
              className="mt-12 flex flex-wrap items-center justify-center gap-8 
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

          {/* Background Decorations */}
          <div
            className="absolute -right-20 -top-20 h-64 w-64 rounded-full 
          bg-emerald-400 dark:bg-emerald-700 opacity-20 blur-3xl"
          ></div>

          <div
            className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full 
          bg-emerald-400 dark:bg-emerald-700 opacity-20 blur-3xl"
          ></div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
