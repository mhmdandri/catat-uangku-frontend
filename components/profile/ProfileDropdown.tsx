"use client";
import Image from "next/image";
import Link from "next/link";
import { LogOut, User2 } from "lucide-react";
import { resolveAvatarUrl } from "@/lib/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { User } from "@/lib/types/user";
import { Spinner } from "@/components/ui/spinner";

type Variant = "full" | "icon";
interface ProfileDropdownProps {
  user: User;
  onLogout?: () => void;
  align?: "start" | "end";
  variant?: Variant;
  isLoggingOut?: boolean;
}
export function ProfileDropdown({
  user,
  onLogout,
  align = "start",
  variant = "full",
  isLoggingOut = false,
}: ProfileDropdownProps) {
  const avatarUrl = resolveAvatarUrl(user.profile?.avatar_url);
  const initial = user.name?.charAt(0)?.toUpperCase() ?? "?";
  const [imgError, setImgError] = useState(false);
  const isLogoutDisabled = !onLogout || isLoggingOut;
  const Trigger = (
    <>
      {avatarUrl && !imgError ? (
        <Image
          key={avatarUrl}
          src={avatarUrl}
          alt="Avatar"
          width={40}
          height={40}
          sizes="40px"
          unoptimized
          className="h-10 w-10 rounded-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white">
          {initial}
        </div>
      )}
      {variant === "full" && (
        <div className="min-w-0 flex-1 text-left">
          <p className="truncate text-sm text-foreground">{user.name}</p>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
        </div>
      )}
    </>
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {variant === "icon" ? (
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card overflow-hidden disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Menu akun"
            disabled={isLoggingOut}
            aria-busy={isLoggingOut}
          >
            {Trigger}
          </button>
        ) : (
          <button
            className="flex w-full items-center gap-3 rounded-lg border border-border bg-gray-50 dark:bg-white/5 p-3 transition hover:bg-gray-100 dark:hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Menu akun"
            disabled={isLoggingOut}
            aria-busy={isLoggingOut}
          >
            {Trigger}
          </button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        className="w-52 bg-card text-foreground border border-border"
      >
        <DropdownMenuLabel className="min-w-0">
          <div className="truncate">{user.name}</div>
          <div className="truncate text-xs font-normal text-muted-foreground">
            {user.email}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild disabled={isLoggingOut}>
          <Link href="/dashboard/profile" className="flex items-center gap-2">
            <User2 className="h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:text-red-600 flex items-center gap-2"
          onClick={() => {
            if (isLogoutDisabled) return;
            onLogout?.();
          }}
          disabled={isLogoutDisabled}
        >
          {isLoggingOut ? (
            <>
              <Spinner className="text-red-500" />
              <span>Keluar...</span>
            </>
          ) : (
            <>
              <LogOut className="h-4 w-4 text-red-500" />
              <span>Keluar</span>
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
