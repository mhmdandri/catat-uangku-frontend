"use client";

import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAccountModalStore } from "@/store/useAccountModalStore";

export function FloatingButton() {
  const pathname = usePathname();
  const { openAddModal } = useAccountModalStore();

  const handleClick = () => {
    if (pathname.startsWith("/dashboard/accounts")) {
      openAddModal();
      return;
    }
    console.log("TODO: buka modal tambah transaksi");
  };
  const showFab =
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/transactions") ||
    pathname.startsWith("/dashboard/accounts") ||
    pathname.startsWith("/dashboard/goals") ||
    pathname.startsWith("/dashboard/groups");

  if (!showFab) return null;
  return (
    <button
      onClick={handleClick}
      aria-label="Tambah"
      className="lg:hidden fixed right-4 bottom-20 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition hover:bg-emerald-700 active:scale-95"
    >
      <Plus className="h-6 w-6" />
    </button>
  );
}
