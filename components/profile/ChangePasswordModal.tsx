"use client";
import { put } from "@/lib/axios";
import { toastError, toastSuccess } from "@/lib/toast";
import { PasswordChangePayload } from "@/lib/types";
import { useLoadingStore } from "@/store/useLoadingStore";
import axios from "axios";
import { Eye, EyeOff, X } from "lucide-react";
import React, { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const ChangePasswordModal: React.FC<Props> = ({ open, onClose }) => {
  const [passwordFormData, setPasswordFormData] =
    useState<PasswordChangePayload>({
      old_password: "",
      new_password: "",
      confirm_password: "",
    });
  const { startLoading, stopLoading } = useLoadingStore();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!open) return null;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startLoading();
    try {
      const res: { message: string } = await put(
        "/users/password",
        passwordFormData
      );
      toastSuccess(res.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data as
          | { error?: string; message?: string }
          | string
          | undefined;
        const message =
          (typeof data === "object" && data?.error) ||
          (typeof data === "object" && data?.message) ||
          (typeof data === "string" ? data : null) ||
          "Terjadi kesalahan saat mengubah password.";
        toastError(message);
      } else {
        toastError("Terjadi kesalahan saat mengubah password.");
      }
      return;
    } finally {
      stopLoading();
    }
    setPasswordFormData({
      old_password: "",
      new_password: "",
      confirm_password: "",
    });
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4 py-6">
      <div className="w-full max-w-md rounded-xl bg-card p-4 sm:p-6 max-h-[85vh] overflow-auto border border-border">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl text-foreground">Ubah Password</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-white/5"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="oldpassword"
              className="mb-2 block text-sm text-muted-foreground"
            >
              Password Saat Ini
            </label>
            <div className="relative">
              <input
                id="oldpassword"
                type={showCurrentPassword ? "text" : "password"}
                value={passwordFormData.old_password}
                onChange={(e) =>
                  setPasswordFormData((prev) => ({
                    ...prev,
                    old_password: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 pr-12 text-foreground focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
            <label
              htmlFor="newpassword"
              className="mb-2 block text-sm text-muted-foreground"
            >
              Password Baru
            </label>
            <div className="relative">
              <input
                id="newpassword"
                type={showNewPassword ? "text" : "password"}
                value={passwordFormData.new_password}
                onChange={(e) =>
                  setPasswordFormData((prev) => ({
                    ...prev,
                    new_password: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 pr-12 text-foreground focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
            <label
              htmlFor="confirmpassword"
              className="mb-2 block text-sm text-muted-foreground"
            >
              Konfirmasi Password Baru
            </label>
            <div className="relative">
              <input
                id="confirmpassword"
                type={showConfirmPassword ? "text" : "password"}
                value={passwordFormData.confirm_password}
                onChange={(e) =>
                  setPasswordFormData((prev) => ({
                    ...prev,
                    confirm_password: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 pr-12 text-foreground focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-border px-4 py-2 text-foreground transition hover:bg-gray-50 dark:hover:bg-white/5"
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
