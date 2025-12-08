"use client";

import { useEffect, useState } from "react";
import { get, initAuth, logout } from "@/lib/axios";
import { AuthResponse } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<AuthResponse["data"] | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await initAuth();
        const data = await get<AuthResponse>("/auth/me");
        setUser(data.data);
      } catch (err) {
        console.error("Gagal ambil user", err);
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      router.replace("/auth/login");
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? <p>Halo, {user.name}</p> : <p>Mengambil data...</p>}
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
