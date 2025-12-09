"use client";

import { Lock, Shield, Trash2 } from "lucide-react";

type Props = {
  onOpenChangePassword: () => void;
};

const ProfileSecurityTab: React.FC<Props> = ({ onOpenChangePassword }) => {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg text-gray-900">Password</h3>
            <p className="text-sm text-gray-500">
              Ubah password untuk keamanan akun
            </p>
          </div>
          <button
            onClick={onOpenChangePassword}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700"
          >
            <Lock className="h-4 w-4" />
            <span>Ubah Password</span>
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <Shield className="h-6 w-6 text-emerald-600" />
          <div>
            <h3 className="text-lg text-gray-900">Keamanan Akun</h3>
            <p className="text-sm text-gray-500">Status keamanan akun Anda</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg bg-emerald-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600">
                <span className="text-white">✓</span>
              </div>
              <div>
                <p className="text-sm text-gray-900">Email Terverifikasi</p>
                <p className="text-xs text-gray-500">
                  Email Anda sudah diverifikasi
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
                <span className="text-gray-600">!</span>
              </div>
              <div>
                <p className="text-sm text-gray-900">Autentikasi Dua Faktor</p>
                <p className="text-xs text-gray-500">
                  Tingkatkan keamanan dengan 2FA
                </p>
              </div>
            </div>
            <button className="rounded-lg border border-gray-300 px-3 py-1 text-sm text-gray-700 transition hover:bg-gray-50">
              Aktifkan
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <Trash2 className="h-6 w-6 text-red-600" />
          <div>
            <h3 className="text-lg text-red-900">Zona Bahaya</h3>
            <p className="text-sm text-red-700">
              Tindakan permanen yang tidak dapat dibatalkan
            </p>
          </div>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700">
          <Trash2 className="h-4 w-4" />
          <span>Hapus Akun</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSecurityTab;
