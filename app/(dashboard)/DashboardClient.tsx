"use client";
import { useEffect, useState, type ReactNode, useCallback } from "react";
import { Navbar } from "@/components/layout/dashboard/Navbar";
import { Sidebar } from "@/components/layout/dashboard/Sidebar";
import { BottomTabs } from "@/components/layout/dashboard/mobile/BottomTabs";
import { get, post } from "@/lib/axios";
import type { User } from "@/lib/types";
import { useLoadingStore } from "@/store/useLoadingStore";
import { useRouter } from "next/navigation";
import { UserProvider } from "@/components/providers/UserProvider";
import { FloatingButton } from "@/components/layout/dashboard/mobile/FloatingButton";

export function DashboardClient({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { startLoading, stopLoading, isLoading } = useLoadingStore();
  const [user, setUser] = useState<User | null>(null);

  const redirectToLogin = useCallback(() => {
    setUser(null);
    router.replace("/auth?sign=login");
  }, [router]);

  useEffect(() => {
    let cancelled = false;
    const fetchUserData = async () => {
      startLoading();
      try {
        const response = await get<{
          data?: User | { data?: User };
          user?: User;
        }>("/auth/me");
        const resolvedUser = ((response.data && "data" in response.data
          ? (response.data as { data?: User })?.data
          : response.data) ??
          response.user ??
          (response as unknown as User)) as User;

        if (!cancelled && resolvedUser?.id) setUser(resolvedUser);
      } catch (err) {
        console.error("Gagal memuat user saat init dashboard:", err);
        if (!cancelled) redirectToLogin();
      } finally {
        if (!cancelled) stopLoading();
      }
    };
    void fetchUserData();
    return () => {
      cancelled = true;
    };
  }, [startLoading, stopLoading, redirectToLogin]);

  const handleLogout = useCallback(async () => {
    startLoading();
    try {
      await post<{ ok: boolean }>("/auth/logout");
      redirectToLogin();
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading, redirectToLogin]);

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar userData={user} onLogout={handleLogout} isLoading={isLoading} />

      <main className="flex flex-1 flex-col overflow-hidden">
        <Navbar userData={user} isLoading={isLoading} onLogout={handleLogout} />

        <UserProvider value={{ user, isLoading, setUser }}>
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-24 lg:pb-6">
            {children}
          </div>
        </UserProvider>

        {/* Mobile view components */}
        <FloatingButton />
        <BottomTabs />
      </main>
    </div>
  );
}
