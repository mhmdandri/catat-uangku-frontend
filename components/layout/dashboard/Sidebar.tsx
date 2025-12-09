"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ArrowUpDown,
  Target,
  CreditCard,
  Bell,
  Wallet,
  Users,
  LogOut,
  User2,
} from "lucide-react";
import clsx from "clsx";
import { User } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Skeleton } from "../../ui/skeleton";
import { useMemo } from "react";
import Image from "next/image";

interface SidebarProps {
  userData: User | null;
  onLogout?: () => void;
  isLoading?: boolean;
}

export function Sidebar({ userData, onLogout, isLoading }: SidebarProps) {
  // const { user } = useUser();
  // const [userData] = useState<User | null>(user);
  const initial = userData?.name?.charAt(0)?.toUpperCase() ?? "?";
  const pathname = usePathname();
  const navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/dashboard/transactions",
      label: "Transaksi",
      icon: ArrowUpDown,
    },
    {
      href: "/dashboard/goals",
      label: "Goals",
      icon: Target,
    },
    {
      href: "/dashboard/accounts",
      label: "Rekening",
      icon: CreditCard,
    },
    {
      href: "/dashboard/groups",
      label: "Grup",
      icon: Users,
    },
    {
      href: "/dashboard/notifications",
      label: "Notifikasi",
      icon: Bell,
    },
  ];
  const avatar = userData?.profile?.avatar_url;
  const resolvedAvatar = useMemo(() => {
    if (!avatar) return null;
    if (avatar.startsWith("http://") || avatar.startsWith("https://")) {
      return avatar;
    }
    const apiBase =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";
    try {
      const { origin } = new URL(apiBase);
      return `${origin}${avatar}`;
    } catch {
      return avatar;
    }
  }, [avatar]);

  return (
    <aside className="hidden w-64 border-r border-b border-gray-200 bg-white lg:block">
      <div className="flex h-full flex-col">
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-emerald-600 p-2">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl text-emerald-600">catatUangku</span>
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm transition",
                  isActive
                    ? "bg-emerald-50 text-emerald-600"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        {isLoading || !userData ? (
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
              <div className="rounded-full">
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
          </div>
        ) : (
          <div className="border-t border-gray-200 p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full outline-none focus-visible:ring-0 focus:ring-0">
                  <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 cursor-pointer hover:bg-gray-100 transition">
                    {resolvedAvatar ? (
                      <Image
                        src={resolvedAvatar}
                        alt="Avatar"
                        width={40}
                        height={40}
                        priority
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white">
                        {initial}
                      </div>
                    )}
                    <div className="flex-1 text-left">
                      <p className="text-sm text-gray-900">{userData?.name}</p>
                      <p className="text-xs text-gray-500">{userData?.email}</p>
                    </div>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="start"
                className="w-52 mr-2"
              >
                <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard/profile"
                    className="cursor-pointer flex items-center"
                  >
                    <User2 />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600 cursor-pointer"
                  onClick={onLogout}
                >
                  <LogOut className="text-red-500" />
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </aside>
  );
}
