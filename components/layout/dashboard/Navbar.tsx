"use client";

import { usePathname } from "next/navigation";
import { Plus, Bell, LucideIcon } from "lucide-react";
import { User } from "@/lib/types";
import { Skeleton } from "../../ui/skeleton";
import { useState } from "react";
import Modal from "../../Modal";
import { Button } from "../../ui/button";

interface NavbarProps {
  userData: User | null;
  isLoading?: boolean;
}

type ActionVariant = "primary" | "outline" | "danger";

type ActionConfig = {
  id: string;
  label: string;
  icon: LucideIcon;
  variant?: ActionVariant;
};

type PageConfig = {
  title: string;
  description?: string;
  actions?: ActionConfig[];
};

const PAGE_CONFIG: Record<string, PageConfig> = {
  "/dashboard": {
    title: "Dashboard",
    actions: [
      {
        id: "add-transaction",
        label: "Tambah Transaksi",
        icon: Plus,
        variant: "primary",
      },
    ],
  },
  "/dashboard/transactions": {
    title: "Transaksi",
    description: "Kelola dan pantau semua transaksi keuanganmu",
    actions: [
      {
        id: "add-transaction",
        label: "Tambah Transaksi",
        icon: Plus,
        variant: "primary",
      },
    ],
  },
  "/dashboard/accounts": {
    title: "Rekening",
    description: "Atur dan kelola semua rekening yang kamu miliki",
    actions: [
      {
        id: "add-account",
        label: "Tambah Rekening",
        icon: Plus,
        variant: "primary",
      },
    ],
  },
  "/dashboard/groups": {
    title: "Grup",
    description: "Kelola grup dan aktivitas keuangan bersama",
    actions: [
      {
        id: "add-group",
        label: "Buat Grup",
        icon: Plus,
        variant: "primary",
      },
    ],
  },
  "/dashboard/profile": {
    title: "Profil Saya",
    description: "Kelola informasi profil dan pengaturan akunmu",
  },
  "/dashboard/goals": {
    title: "Goals",
    description: "Tetapkan dan pantau tujuan keuanganmu",
    actions: [
      {
        id: "add-goal",
        label: "Tambah Goal",
        icon: Plus,
        variant: "primary",
      },
    ],
  },
  "/dashboard/notifications": {
    title: "Notifikasi",
    description: "Lihat dan kelola notifikasi akunmu",
    actions: [
      {
        id: "mark-all-read",
        label: "Tandai dibaca semua",
        icon: Bell,
        variant: "outline",
      },
    ],
  },
};

const variantClass: Record<ActionVariant, string> = {
  primary:
    "bg-emerald-600 text-white hover:bg-emerald-700 border border-transparent",
  outline: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50",
  danger: "bg-red-600 text-white hover:bg-red-700 border border-transparent",
};

export function Navbar({ userData, isLoading }: NavbarProps) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const pathname = usePathname();

  const initial = userData?.name ?? "?";

  const config: PageConfig = PAGE_CONFIG[pathname] ?? {
    title: "Dashboard",
    description: userData
      ? `Selamat datang kembali, ${initial}!`
      : "Kelola keuanganmu dengan lebih mudah",
  };

  const handleActionClick = (actionId: string) => {
    switch (actionId) {
      case "add-transaction":
        // contoh: buka modal tambah transaksi
        setOpenDeleteModal(true); // ganti dengan modal transaksi kamu
        break;
      case "add-account":
        console.log("TODO: buka modal tambah rekening");
        break;
      case "add-group":
        console.log("TODO: buka modal buat grup");
        break;
      case "edit-profile":
        console.log("TODO: trigger mode edit profil");
        // idealnya di-handle via context / callback dari page
        break;
      case "profile-settings":
        console.log("TODO: buka pengaturan profil");
        break;
      case "add-goal":
        console.log("TODO: buka modal tambah goal");
        break;
      case "mark-all-read":
        console.log("TODO: tandai semua notifikasi sudah dibaca");
        break;
      default:
        console.log("Action belum di-handle:", actionId);
    }
  };

  return (
    <>
      {/* contoh modal reuse, sekarang dipakai buat demo action */}
      <Modal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        title="Contoh Action"
        description="Ini contoh action dari navbar, ganti dengan modal yang kamu mau."
        footer={
          <Button variant="ghost" onClick={() => setOpenDeleteModal(false)}>
            Tutup
          </Button>
        }
      >
        <p>Isi modal action di sini.</p>
      </Modal>

      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl text-gray-900">{config.title}</h1>

            {isLoading || !userData ? (
              <Skeleton className="h-4 mt-2 w-48" />
            ) : config.description ? (
              <p className="text-sm text-gray-500 mt-1">{config.description}</p>
            ) : userData ? (
              <p className="text-sm text-gray-500 mt-1">
                {`Selamat datang kembali, ${initial}!`}
              </p>
            ) : null}
          </div>

          {/* Action per page */}
          {config.actions && config.actions.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {config.actions.map((action) => (
                <Button
                  key={action.id}
                  onClick={() => handleActionClick(action.id)}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition ${
                    variantClass[action.variant ?? "primary"]
                  }`}
                >
                  <action.icon className="h-4 w-4" />
                  <span>{action.label}</span>
                </Button>
              ))}
            </div>
          )}
        </div>
      </header>
    </>
  );
}
