"use client";

import { Eye, EyeOff, X } from "lucide-react";
import React, { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const ChangePasswordModal: React.FC<Props> = ({ open, onClose }) => {
  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Changing password:", passwordFormData);
    setPasswordFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl text-gray-900">Ubah Password</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-gray-700">
              Password Saat Ini
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={passwordFormData.currentPassword}
                onChange={(e) =>
                  setPasswordFormData((prev) => ({
                    ...prev,
                    currentPassword: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-12 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-700">
              Password Baru
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={passwordFormData.newPassword}
                onChange={(e) =>
                  setPasswordFormData((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-12 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-700">
              Konfirmasi Password Baru
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={passwordFormData.confirmPassword}
                onChange={(e) =>
                  setPasswordFormData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-12 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700"
            >
              Ubah Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
