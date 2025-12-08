import React from "react";

const IllustrationPanel: React.FC = () => (
  <div className="hidden lg:flex lg:w-1/2 lg:items-center lg:justify-center lg:bg-linear-to-br lg:from-emerald-600 lg:to-emerald-800">
    <div className="max-w-md p-12 text-white">
      <h3 className="mb-4 text-4xl">Kelola Keuangan dengan Lebih Baik</h3>
      <p className="mb-8 text-xl text-emerald-100">
        Bergabunglah dengan ribuan pengguna yang sudah merasakan kemudahan
        mengelola keuangan dengan catatUangku.
      </p>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20">
            <span className="text-sm">✓</span>
          </div>
          <div>
            <h4 className="mb-1">Catat Transaksi Otomatis</h4>
            <p className="text-sm text-emerald-100">
              Simpan semua pemasukan dan pengeluaranmu dengan mudah
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20">
            <span className="text-sm">✓</span>
          </div>
          <div>
            <h4 className="mb-1">Analisis Pengeluaran</h4>
            <p className="text-sm text-emerald-100">
              Lihat ke mana uangmu pergi dengan grafik yang jelas
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20">
            <span className="text-sm">✓</span>
          </div>
          <div>
            <h4 className="mb-1">Atur Budget & Goals</h4>
            <p className="text-sm text-emerald-100">
              Tetapkan target dan capai tujuan finansialmu
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default IllustrationPanel;
