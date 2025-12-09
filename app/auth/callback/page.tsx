"use client";

import { post, setAccessToken } from "@/lib/axios";
import { toastError, toastSuccess } from "@/lib/toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const AuthCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");

    if (error) {
      toastError(error || "Login Google gagal");
      router.replace("/auth?sign=login");
      return;
    }

    const fetchToken = async () => {
      try {
        const res = await post<{ access_token: string }>("/auth/refresh");
        setAccessToken(res.access_token);
        toastSuccess("Login Google berhasil");
        router.replace("/dashboard");
      } catch {
        toastError("Login Google gagal, silakan coba lagi.");
        router.replace("/auth?sign=login");
      }
    };

    fetchToken();
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-950 px-6">
      <div className="text-center space-y-3">
        <div className="text-lg font-semibold text-gray-900 dark:text-zinc-50">
          Memproses login Google...
        </div>
        <p className="text-sm text-gray-600 dark:text-zinc-300">
          Mohon tunggu, Anda akan dialihkan ke dashboard.
        </p>
      </div>
    </div>
  );
};

export default AuthCallbackPage;
