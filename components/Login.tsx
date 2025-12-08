"use client";
import React, { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, User, Wallet } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AuthLoginRequest,
  AuthRegisterRequest,
  AuthResponse,
} from "@/lib/types";
import { api, post } from "@/lib/axios";
import { useLoadingStore } from "@/store/useLoadingStore";

const Login = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, startLoading, stopLoading } = useLoadingStore();
  const [formData, setFormData] = useState<AuthRegisterRequest>({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startLoading();
    try {
      if (isLogin) {
        const payload: AuthLoginRequest = {
          email: formData.email,
          password: formData.password,
        };
        const res = await post<AuthResponse, AuthLoginRequest>(
          "/auth/login",
          payload,
        );
        api.defaults.headers.common.Authorization = `Bearer ${res.access_token}`;
        router.push("/dashboard");
      } else {
        const payload: AuthRegisterRequest = { ...formData };
        await post<AuthResponse, AuthRegisterRequest>(
          "/auth/register",
          payload,
        );
        setIsLogin(true);
      }
    } catch (error) {
      console.error("Auth error:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-zinc-950 transition-colors">
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <Link
            href="/"
            className="mb-8 flex items-center gap-2 text-gray-600 dark:text-zinc-400 transition hover:text-emerald-600 hover:no-underline"
          >
            <ArrowLeft className="w-5" />
            Kembali ke Beranda
          </Link>

          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-600 p-3">
              <Wallet className="h-8 w-8 text-white" />
            </div>
            <span className="text-3xl text-emerald-600 dark:text-emerald-400">
              catatUangku
            </span>
          </div>

          <h2 className="mb-2 text-3xl text-gray-900 dark:text-zinc-100">
            {isLogin
              ? "Selamat Datang Kembali!"
              : "Mulai Perjalanan Finansialmu"}
          </h2>
          <p className="mb-8 text-gray-600 dark:text-zinc-400">
            {isLogin
              ? "Masuk untuk melanjutkan mengelola keuanganmu"
              : "Daftar dan mulai catat keuanganmu sekarang"}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="mb-2 block text-sm text-gray-700 dark:text-zinc-200">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-zinc-500" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 pl-10 pr-4 py-3 transition focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                    placeholder="Masukkan username"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm text-gray-700 dark:text-zinc-200">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-zinc-500" />
                <input
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
              <label className="mb-2 block text-sm text-gray-700 dark:text-zinc-200">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-zinc-500" />
                <input
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
                <label className="mb-2 block text-sm text-gray-700 dark:text-zinc-200">
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-zinc-500" />
                  <input
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
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-emerald-600 focus:ring-emerald-600"
                  />
                  <span className="text-sm text-gray-600 dark:text-zinc-400">
                    Ingat saya
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm text-emerald-600 hover:text-emerald-700"
                >
                  Lupa password?
                </a>
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

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-300 dark:bg-zinc-700" />
            <span className="text-sm text-gray-500 dark:text-zinc-400">
              atau
            </span>
            <div className="h-px flex-1 bg-gray-300 dark:bg-zinc-700" />
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 py-3 transition hover:bg-gray-50 dark:hover:bg-zinc-900/70">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-gray-700 dark:text-zinc-100">
                Lanjutkan dengan Google
              </span>
            </button>
          </div>

          {/* Toggle Login/Register */}
          <p className="mt-6 text-center text-gray-600 dark:text-zinc-400">
            {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-emerald-600 hover:text-emerald-700"
            >
              {isLogin ? "Daftar sekarang" : "Masuk"}
            </button>
          </p>
        </div>
      </div>

      {/* Right Side - Illustration */}
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
    </div>
  );
};

export default Login;
