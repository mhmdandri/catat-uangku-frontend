import React from "react";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Button } from "../ui/button";
import { AuthRegisterPayload } from "@/lib/types";

interface AuthFormProps {
  isLogin: boolean;
  formData: AuthRegisterPayload;
  setFormData: React.Dispatch<React.SetStateAction<AuthRegisterPayload>>;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onForgotPassword: () => void;
  errorMessage?: string;
  remember: boolean;
  setRemember: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthForm: React.FC<AuthFormProps> = ({
  isLogin,
  formData,
  setFormData,
  showPassword,
  setShowPassword,
  isLoading,
  onSubmit,
  onForgotPassword,
  errorMessage,
  remember,
  setRemember,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {!isLogin && (
        <div>
          <label
            htmlFor="nama"
            className="mb-2 block text-sm text-gray-700 dark:text-zinc-200"
          >
            Nama Pengguna
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-zinc-500" />
            <input
              id="nama"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 pl-10 pr-4 py-3 transition focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
              placeholder="Masukkan nama pengguna"
              required
            />
          </div>
        </div>
      )}

      <div>
        <label
          htmlFor="mail"
          className="mb-2 block text-sm text-gray-700 dark:text-zinc-200"
        >
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-zinc-500" />
          <input
            id="mail"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 py-3 pl-10 pr-4 transition focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
            placeholder="nama@email.com"
            required
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm text-gray-700 dark:text-zinc-200"
        >
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-zinc-500" />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 py-3 pl-10 pr-12 transition focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
            placeholder="Masukkan password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-zinc-500 dark:hover:text-zinc-300"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {!isLogin && (
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm text-gray-700 dark:text-zinc-200"
          >
            Konfirmasi Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-zinc-500" />
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                })
              }
              className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 py-3 pl-10 pr-4 transition focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
              placeholder="Konfirmasi password"
              required
            />
          </div>
          {errorMessage && (
            <p className="mt-2.5 text-sm text-red-500">
              <span className="font-medium">{errorMessage}</span>
            </p>
          )}
        </div>
      )}

      {isLogin && (
        <div className="flex justify-between gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label id="rememberMe" className="flex items-center gap-2">
            <input
              id="rememberMe"
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-emerald-600 focus:ring-emerald-600"
            />
            <span className="text-sm text-gray-600 dark:text-zinc-400">
              Ingat saya
            </span>
          </label>
          <Button
            variant="link"
            type="button"
            onClick={onForgotPassword}
            className="h-auto p-0 text-left sm:text-right text-sm text-emerald-600 hover:text-emerald-700 hover:no-underline cursor-pointer"
          >
            Lupa password?
          </Button>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-emerald-600 py-3 text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading
          ? isLogin
            ? "Memproses..."
            : "Mendaftar..."
          : isLogin
          ? "Masuk"
          : "Daftar"}
      </button>
    </form>
  );
};

export type { AuthFormProps };
export default AuthForm;
