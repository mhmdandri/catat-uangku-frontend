import React from "react";

const IntroText = ({ isLogin }: { isLogin: boolean }) => (
  <>
    <h2 className="mb-2 text-2xl sm:text-3xl text-gray-900 dark:text-zinc-100">
      {isLogin ? "Selamat Datang Kembali!" : "Mulai Perjalanan Finansialmu"}
    </h2>
    <p className="mb-6 sm:mb-8 text-sm sm:text-base text-gray-600 dark:text-zinc-400">
      {isLogin
        ? "Masuk untuk melanjutkan mengelola keuanganmu"
        : "Daftar dan mulai catat keuanganmu sekarang"}
    </p>
  </>
);

export default IntroText;
