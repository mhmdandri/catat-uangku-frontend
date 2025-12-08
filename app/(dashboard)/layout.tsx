"use client";
import { useEffect, useState, type ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { get, initAuth, logout } from "@/lib/axios";
import { User } from "@/lib/types";
import { useLoadingStore } from "@/store/useLoadingStore";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { startLoading, stopLoading, isLoading } = useLoadingStore();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const fetchUserData = async () => {
      startLoading();
      try {
        await initAuth();
        const response = await get<{ data: User }>("/auth/me");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
      } finally {
        stopLoading();
      }
    };
    fetchUserData();
  }, [startLoading, stopLoading]);

  const handleLogout = async () => {
    startLoading();
    try {
      await logout();
      router.replace("/auth?sign=login");
      setUser(null);
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar userData={user} onLogout={handleLogout} isLoading={isLoading} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Navbar userData={user} isLoading={isLoading} />
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </main>
    </div>
  );
}
