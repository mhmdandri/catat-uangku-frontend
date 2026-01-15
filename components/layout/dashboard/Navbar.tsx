"use client";

import { usePathname } from "next/navigation";
import { Plus, Bell, LucideIcon, Eye, EyeOff } from "lucide-react";
import { Skeleton } from "../../ui/skeleton";
import { Button } from "../../ui/button";
import { useToggleStore } from "@/store/useToggleStore";
import { useModalStore } from "@/store/useModalStore";
import { ProfileDropdown } from "@/components/profile/ProfileDropdown";
import { AuthMeResponse } from "@/lib/types/auth";

interface NavbarProps {
  userData: AuthMeResponse | null;
  isLoading?: boolean;
  onLogout?: () => void;
  isLoggingOut?: boolean;
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
        id: "hide-balance",
        label: "Sembunyikan Saldo",
        icon: Eye,
        variant: "outline",
      },
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
        label: "Buat Grup Baru",
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
  outline:
    "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-transparent dark:text-zinc-100 dark:border-zinc-700 dark:hover:bg-white/5",
  danger:
    "bg-red-600 text-white hover:bg-red-700 border border-transparent dark:bg-red-500 dark:hover:bg-red-600",
};

export function Navbar({
  userData,
  isLoading,
  onLogout,
  isLoggingOut,
}: NavbarProps) {
  const { openModal } = useModalStore();
  const { isActive, toggle } = useToggleStore();
  const pathname = usePathname();

  const showBalances = isActive("balanceVisibility");
  const toggleShowBalances = () => toggle("balanceVisibility");

  const initial = userData?.userProfile.firstName || userData?.data.name || "?";

  const pageConfig: PageConfig = PAGE_CONFIG[pathname] ?? {
    title: "Dashboard",
    description: userData
      ? `Selamat datang kembali, ${initial}!`
      : "Kelola keuanganmu dengan lebih mudah",
  };

  const actions =
    pathname === "/dashboard/accounts" && pageConfig.actions
      ? pageConfig.actions.map((action) =>
          action.id === "hide-balance"
            ? {
                ...action,
                label: showBalances ? "Sembunyikan Saldo" : "Tampilkan Saldo",
                icon: showBalances ? EyeOff : Eye,
              }
            : action
        )
      : pageConfig.actions;

  const config: PageConfig = {
    ...pageConfig,
    actions,
  };

  const handleActionClick = (actionId: string) => {
    switch (actionId) {
      case "add-transaction":
        openModal("transaction");
        break;
      case "add-account":
        openModal("account");
        break;
      case "hide-balance":
        toggleShowBalances();
        break;
      case "add-group":
        console.log("TODO: buka modal buat grup");
        break;
      case "edit-profile":
        console.log("TODO: trigger mode edit profil");
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
      <header className="border-b border-border bg-card px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-start sm:items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="truncate text-lg sm:text-2xl text-foreground">
              {config.title}
            </h1>
            {isLoading || !userData ? (
              <Skeleton className="h-4 mt-2 w-40 sm:w-48" />
            ) : config.description ? (
              <p className="mt-1 line-clamp-2 text-xs sm:text-sm text-muted-foreground">
                {config.description}
              </p>
            ) : userData ? (
              <p className="mt-1 line-clamp-2 text-xs sm:text-sm text-muted-foreground">
                {`Selamat datang kembali, ${initial}!`}
              </p>
            ) : null}
          </div>
          {config.actions && config.actions.length > 0 && (
            <div className="hidden lg:flex shrink-0 items-center gap-2">
              {config.actions.map((action) => (
                <Button
                  key={action.id}
                  onClick={() => handleActionClick(action.id)}
                  aria-label={action.label}
                  title={action.label}
                  className={`inline-flex items-center justify-center rounded-lg transition ${
                    variantClass[action.variant ?? "primary"]
                  } h-10 w-10 p-0 sm:h-auto sm:w-auto sm:p-0 sm:px-4 sm:py-2`}
                >
                  <action.icon className="h-5 w-5 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">{action.label}</span>
                </Button>
              ))}
            </div>
          )}
          <div className="lg:hidden">
            {isLoading || !userData ? (
              <Skeleton className="h-10 w-10 rounded-full" />
            ) : (
              <ProfileDropdown
                user={userData}
                onLogout={onLogout}
                align="end"
                variant="icon"
                isLoggingOut={isLoggingOut}
              />
            )}
          </div>
        </div>
      </header>
    </>
  );
}
