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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-background p-8 text-foreground border border-border shadow-lg">
        <div className="text-center">
          {/* Success Animation */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
              <div className="relative rounded-full bg-emerald-500/10 p-4">
                <UserPlus className="h-16 w-16 text-emerald-500" />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <h3 className="mb-2 text-3xl font-semibold">Selamat Datang!</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Akun Anda berhasil dibuat dengan email{" "}
            <span className="font-medium text-emerald-500">
              {email ?? "email Anda"}
            </span>
          </p>

          {/* Welcome Message */}
          <div className="mb-6 rounded-lg bg-emerald-500/10 p-4">
            <p className="text-sm text-emerald-500">
              Silakan masuk menggunakan akun tersebut untuk mulai mencatat
              keuangan.
            </p>
          </div>

          {/* Features Preview */}
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
              </div>
              <p className="text-sm text-foreground">
                Mulai catat transaksi keuanganmu
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
              </div>
              <p className="text-sm text-foreground">
                Pantau budget dan pengeluaran
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
              </div>
              <p className="text-sm text-foreground">
                Capai tujuan finansialmu
              </p>
            </div>
          </div>

          {/* Manual Continue Button */}
          <button
            onClick={handleProceed}
            className="mt-6 w-full rounded-lg bg-emerald-600 px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-emerald-700"
          >
            Ke Form Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogRegister;
