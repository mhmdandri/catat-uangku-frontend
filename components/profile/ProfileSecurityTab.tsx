"use client";
import { Lock, Shield, Trash2 } from "lucide-react";
type Props = {
  onOpenChangePassword: () => void;
};
const ProfileSecurityTab: React.FC<Props> = ({ onOpenChangePassword }) => {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg text-foreground">Password</h3>
            <p className="text-sm text-muted-foreground">
              Ubah password untuk keamanan akun
            </p>
          </div>
          <button
            onClick={onOpenChangePassword}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700"
          >
            <Lock className="h-4 w-4" />
            <span>Ubah Password</span>
          </button>
        </div>
      </div>
      <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <Shield className="h-6 w-6 text-emerald-600" />
          <div>
            <h3 className="text-lg text-foreground">Keamanan Akun</h3>
            <p className="text-sm text-muted-foreground">
              Status keamanan akun Anda
            </p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg bg-emerald-50 dark:bg-emerald-950/40 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600">
                <span className="text-white">✓</span>
              </div>
              <div>
                <p className="text-sm text-foreground">Email Terverifikasi</p>
                <p className="text-xs text-muted-foreground">
                  Email Anda sudah diverifikasi
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-gray-50 dark:bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 dark:bg-white/10">
                <span className="text-muted-foreground">!</span>
              </div>
              <div>
                <p className="text-sm text-foreground">
                  Autentikasi Dua Faktor
                </p>
                <p className="text-xs text-muted-foreground">
                  Tingkatkan keamanan dengan 2FA
                </p>
              </div>
            </div>
            <button className="rounded-lg border border-border px-3 py-1 text-sm text-foreground transition hover:bg-gray-50 dark:hover:bg-white/5">
              Aktifkan
            </button>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <Trash2 className="h-6 w-6 text-red-600" />
          <div>
            <h3 className="text-lg text-red-900 dark:text-red-200">
              Zona Bahaya
            </h3>
            <p className="text-sm text-red-700 dark:text-red-200/80">
              Tindakan permanen yang tidak dapat dibatalkan
            </p>
          </div>
        </div>
        <button className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600">
          <Trash2 className="h-4 w-4" />
          <span>Hapus Akun</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSecurityTab;
