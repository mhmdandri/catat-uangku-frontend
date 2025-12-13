import { CheckCircle, UserPlus } from "lucide-react";
import React from "react";

interface DialogRegisterProps {
  open: boolean;
  onClose: () => void;
  email?: string;
  onGoToLogin: () => void;
}
const DialogRegister: React.FC<DialogRegisterProps> = ({
  open,
  onClose,
  email,
  onGoToLogin,
}) => {
  if (!open) return null;
  const handleProceed = () => {
    onClose();
    onGoToLogin();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 sm:p-6">
      <div className="w-full max-w-sm sm:max-w-md rounded-xl bg-background text-foreground border border-border shadow-lg p-6 sm:p-8">
        <div className="text-center">
          <div className="mb-5 sm:mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
              <div className="relative rounded-full bg-emerald-500/10 p-3 sm:p-4">
                <UserPlus className="h-12 w-12 sm:h-16 sm:w-16 text-emerald-500" />
              </div>
            </div>
          </div>
          <h3 className="mb-2 text-2xl sm:text-3xl font-semibold">
            Selamat Datang!
          </h3>
          <p className="mb-4 text-sm sm:text-base text-muted-foreground">
            Akun Anda berhasil dibuat dengan email{" "}
            <span className="font-medium text-emerald-500 break-all">
              {email ?? "email Anda"}
            </span>
          </p>
          <div className="mb-5 sm:mb-6 rounded-lg bg-emerald-500/10 p-3 sm:p-4">
            <p className="text-sm sm:text-base text-emerald-500">
              Silakan masuk menggunakan akun tersebut untuk mulai mencatat
              keuangan.
            </p>
          </div>
          <div className="space-y-3 text-left">
            {[
              "Mulai catat transaksi keuanganmu",
              "Pantau budget dan pengeluaran",
              "Capai tujuan finansialmu",
            ].map((txt) => (
              <div key={txt} className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                </div>
                <p className="text-sm sm:text-base text-foreground">{txt}</p>
              </div>
            ))}
          </div>
          <button
            onClick={handleProceed}
            className="mt-6 w-full rounded-lg bg-emerald-600 px-6 py-3 text-sm sm:text-base font-medium text-primary-foreground transition hover:bg-emerald-700"
          >
            Ke Form Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogRegister;
