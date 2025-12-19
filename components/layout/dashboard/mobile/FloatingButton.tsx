"use client";

import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { useModalStore } from "@/store/useModalStore";
import { useDeviceStore } from "@/store/useDeviceStore";

export function FloatingButton() {
  const pathname = usePathname();
  const { openModal } = useModalStore();
  const isMobile = useDeviceStore((state) => state.isMobile);

  const handleClick = () => {
    if (pathname.startsWith("/dashboard/accounts")) {
      openModal("account");
      return;
    }
    if (
      pathname.startsWith("/dashboard/transactions") ||
      pathname === "/dashboard"
    ) {
      openModal("transaction");
      return;
    }
  };
  const showFab =
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/transactions") ||
    pathname.startsWith("/dashboard/accounts") ||
    pathname.startsWith("/dashboard/goals") ||
    pathname.startsWith("/dashboard/groups");

  // Only show on mobile devices
  if (!showFab || !isMobile) return null;

  return (
    <button
      onClick={handleClick}
      aria-label="Tambah"
      className="fixed right-4 bottom-20 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition hover:bg-emerald-700 active:scale-95"
    >
      <Plus className="h-6 w-6" />
    </button>
  );
}
