"use client";
import { Calendar, Camera, Edit } from "lucide-react";
import type { User } from "@/lib/types/user";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useLoadingStore } from "@/store/useLoadingStore";
import { get } from "@/lib/axios";
import { differenceInMonths } from "date-fns";
import { Transaction } from "@/lib/types/transaction";
import { Account } from "@/lib/types/account";
type Props = {
  userData: User;
  stats: {
    totalTransactions: number;
    totalGroups: number;
    totalAccounts: number;
    memberSince: string;
  };
  isEditingProfile: boolean;
  onEdit: () => void;
  onUploadAvatar?: (file: File) => void;
  isUploadingAvatar?: boolean;
};
const ProfileHeaderCard: React.FC<Props> = ({
  userData,
  stats,
  isEditingProfile,
  onEdit,
  onUploadAvatar,
  isUploadingAvatar,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [avatarError, setAvatarError] = useState(false);
  const [transaction, setTransaction] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const { startLoading, stopLoading } = useLoadingStore();
  const fetchTrx = useCallback(async () => {
    startLoading();
    try {
      const resTrx = await get<{ data: Transaction[] }>(
        `/transactions/user/${userData.id}`
      );
      const resAcc = await get<{ data: Account[] }>(
        `/accounts/user/${userData.id}`
      );
      setAccounts(resAcc.data);
      setTransaction(resTrx.data);
    } catch {
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading, userData.id]);
  useEffect(() => {
    console.log(userData);
    fetchTrx();
  }, [transaction.length, fetchTrx, userData]);

  const umurAkun = useMemo(() => {
    const createdAt = userData?.created_at;
    if (!createdAt) return "-";
    const createdDate = new Date(createdAt.replace(" ", "T"));
    if (Number.isNaN(createdDate.getTime())) return "-";
    const months = differenceInMonths(new Date(), createdDate);
    return months;
  }, [userData?.created_at]);
  console.log(umurAkun);

  const handlePick = () => {
    if (!onUploadAvatar) return;
    inputRef.current?.click();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onUploadAvatar) return;
    const file = e.target.files?.[0];
    if (file) {
      onUploadAvatar(file);
      e.target.value = "";
    }
  };
  const avatar = userData.profile?.avatar_url;
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
  const showAvatar = resolvedAvatar && !avatarError;
  return (
    <div className="mb-6 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="h-32 bg-linear-to-br from-emerald-600 to-emerald-700"></div>
      <div className="px-4 pb-4 sm:px-6 sm:pb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
            <div className="relative -mt-16">
              {showAvatar ? (
                <Image
                  src={resolvedAvatar}
                  alt="Avatar"
                  width={128}
                  height={128}
                  unoptimized
                  priority
                  className="h-24 w-24 sm:h-32 sm:w-32 rounded-full border-4 border-card object-cover"
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <div className="flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center rounded-full border-4 border-card bg-emerald-600 text-4xl text-white">
                  {userData.name.charAt(0)}
                </div>
              )}
              {onUploadAvatar && (
                <>
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={handlePick}
                    disabled={isUploadingAvatar}
                    className="absolute bottom-0 right-0 rounded-full bg-card p-2 shadow-lg transition hover:bg-gray-50 dark:hover:bg-white/10 disabled:opacity-60"
                  >
                    <Camera className="h-5 w-5 text-muted-foreground" />
                  </button>
                </>
              )}
            </div>
            <div className="pb-2">
              <h2 className="text-2xl text-foreground">{userData.name}</h2>
              <p className="text-sm text-muted-foreground">{userData.email}</p>
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  Bergabung sejak{" "}
                  {new Date(userData.created_at).toLocaleDateString("id-ID", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
          <div className="flex w-full sm:w-auto gap-2">
            {!isEditingProfile && (
              <button
                onClick={onEdit}
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-foreground transition hover:bg-gray-50 dark:hover:bg-white/5"
              >
                <Edit className="h-4 w-4" />
                <span>Edit Profil</span>
              </button>
            )}
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
          <div className="rounded-lg bg-gray-50 dark:bg-white/5 p-3 sm:p-4 text-center">
            <p className="text-2xl text-emerald-600">{transaction.length}</p>
            <p className="text-sm text-muted-foreground">Transaksi</p>
          </div>
          <div className="rounded-lg bg-gray-50 dark:bg-white/5 p-3 sm:p-4 text-center">
            <p className="text-2xl text-emerald-600">{accounts.length}</p>
            <p className="text-sm text-muted-foreground">Rekening</p>
          </div>
          <div className="rounded-lg bg-gray-50 dark:bg-white/5 p-3 sm:p-4 text-center">
            <p className="text-2xl text-emerald-600">{stats.totalGroups}</p>
            <p className="text-sm text-muted-foreground">Grup</p>
          </div>
          <div className="rounded-lg bg-gray-50 dark:bg-white/5 p-3 sm:p-4 text-center">
            <p className="text-2xl text-emerald-600">{umurAkun} bulan</p>
            <p className="text-sm text-muted-foreground">Member</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeaderCard;
