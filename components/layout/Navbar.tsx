"use client";

import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import { User } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";
import Modal from "../Modal";
import { Button } from "../ui/button";

interface NavbarProps {
  userData: User | null;
  isLoading?: boolean;
}

export function Navbar({ userData, isLoading }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const initial = userData?.name ?? "?";
  const pathname = usePathname();
  const titleMap: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/dashboard/transactions": "Transaksi",
    "/dashboard/accounts": "Rekening",
    "/dashboard/groups": "Grup",
    "/dashboard/profile": "Profil",
    "/dashboard/goals": "Goals",
    "/dashboard/notifications": "Notifikasi",
  };

  const title = titleMap[pathname] ?? "Dashboard";

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Hapus data?"
        description="Tindakan ini tidak bisa dibatalkan."
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive">Hapus</Button>
          </>
        }
      >
        <p>Apakah kamu yakin ingin menghapus data ini?</p>
      </Modal>
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-gray-900">{title}</h1>
            {isLoading || !userData ? (
              <Skeleton className="h-4 mt-1 w-48" />
            ) : (
              <p className="text-sm text-gray-500">
                Selamat datang kembali, {initial}!
              </p>
            )}
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm text-white transition hover:bg-emerald-700"
          >
            <Plus className="h-5 w-5" />
            <span>Tambah Transaksi</span>
          </Button>
        </div>
      </header>
    </>
  );
}
