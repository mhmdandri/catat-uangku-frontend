import { Facebook, Instagram, Twitter, Wallet } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer
      className="border-t border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-colors
    px-4 sm:px-6 lg:px-8
    py-10 sm:py-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="lg:col-span-2 text-center lg:text-left">
            <div className="mb-4 flex items-center justify-center lg:justify-start gap-2">
              <div className="rounded-xl bg-emerald-600 p-2">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl text-emerald-600 dark:text-emerald-400">
                catatUangku
              </span>
            </div>
            <p className="mb-5 text-sm sm:text-base text-gray-600 dark:text-zinc-400">
              Aplikasi pencatatan keuangan yang membantu kamu mengelola uang
              dengan lebih baik dan mencapai tujuan finansialmu.
            </p>
            <div className="flex justify-center lg:justify-start gap-3 sm:gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="rounded-full bg-gray-100 dark:bg-zinc-800 p-2 transition
                hover:bg-emerald-600 hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:col-span-2 lg:grid-cols-2">
            <div className="text-left">
              <h4 className="mb-3 sm:mb-4 text-gray-900 dark:text-zinc-100">
                Produk
              </h4>
              <ul className="space-y-2 text-sm sm:text-base text-gray-600 dark:text-zinc-400">
                {["Fitur", "Harga", "Tutorial", "FAQ"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="hover:text-emerald-600 dark:hover:text-emerald-400"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-left">
              <h4 className="mb-3 sm:mb-4 text-gray-900 dark:text-zinc-100">
                Kontak
              </h4>
              <ul className="space-y-2 text-sm sm:text-base text-gray-600 dark:text-zinc-400">
                {[
                  "Tentang Kami",
                  "Hubungi Kami",
                  "Kebijakan Privasi",
                  "Syarat & Ketentuan",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="hover:text-emerald-600 dark:hover:text-emerald-400"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 sm:mt-12 border-t border-gray-200 dark:border-zinc-800 pt-6 sm:pt-8 text-center text-sm sm:text-base text-gray-600 dark:text-zinc-400">
          <p>&copy; 2025 catatUangku. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
