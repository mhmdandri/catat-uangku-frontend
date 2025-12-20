"use client";
import { useEffect, useState, type ReactNode, useCallback } from "react";
import { Navbar } from "@/components/layout/dashboard/Navbar";
import { Sidebar } from "@/components/layout/dashboard/Sidebar";
import { BottomTabs } from "@/components/layout/dashboard/mobile/BottomTabs";
import { get, post } from "@/lib/axios";
import { useLoadingStore } from "@/store/useLoadingStore";
import { useRouter } from "next/navigation";
import { UserProvider } from "@/components/providers/UserProvider";
import { FloatingButton } from "@/components/layout/dashboard/mobile/FloatingButton";
import { User } from "@/lib/types/user";

export function DashboardClient({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { startLoading, stopLoading } = useLoadingStore();
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const redirectToLogin = useCallback(() => {
    setUser(null);
    router.replace("/auth?sign=login");
  }, [router]);

  useEffect(() => {
    let cancelled = false;
    const fetchUserData = async () => {
      setIsUserLoading(true);
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
        if (!cancelled) setIsUserLoading(false);
      }
    };
    void fetchUserData();
    return () => {
      cancelled = true;
    };
  }, [redirectToLogin]);

  const handleLogout = useCallback(async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    startLoading();
    try {
      await post<{ ok: boolean }>("/auth/logout");
      redirectToLogin();
    } finally {
      stopLoading();
      setIsLoggingOut(false);
    }
  }, [isLoggingOut, startLoading, stopLoading, redirectToLogin]);

  return (
    <UserProvider value={{ user, isLoading: isUserLoading, setUser }}>
      <div className="flex h-screen overflow-hidden bg-background text-foreground">
        <Sidebar
          userData={user}
          onLogout={handleLogout}
          isLoading={isUserLoading}
          isLoggingOut={isLoggingOut}
        />

        <main className="flex flex-1 flex-col overflow-hidden">
          <Navbar
            userData={user}
            isLoading={isUserLoading}
            onLogout={handleLogout}
            isLoggingOut={isLoggingOut}
          />

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-24 lg:pb-6">
            {children}
          </div>
          <FloatingButton />
          <BottomTabs />
        </main>
      </div>
    </UserProvider>
  );
}
