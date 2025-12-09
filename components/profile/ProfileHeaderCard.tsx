"use client";

import { Calendar, Camera, Edit } from "lucide-react";
import { User } from "@/lib/types";
import { useMemo, useRef, useState } from "react";
import Image from "next/image";

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
    <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="h-32 bg-linear-to-br from-emerald-600 to-emerald-700"></div>
      <div className="px-6 pb-6">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <div className="relative -mt-16">
              {showAvatar ? (
                <Image
                  src={resolvedAvatar}
                  alt="Avatar"
                  width={128}
                  height={128}
                  unoptimized
                  priority
                  className="h-32 w-32 rounded-full border-4 border-white object-cover"
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-emerald-600 text-4xl text-white">
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
                    className="absolute bottom-0 right-0 rounded-full bg-white p-2 shadow-lg transition hover:bg-gray-50 disabled:opacity-60"
                  >
                    <Camera className="h-5 w-5 text-gray-600" />
                  </button>
                </>
              )}
            </div>
            <div className="pb-2">
              <h2 className="text-2xl text-gray-900">{userData.name}</h2>
              <p className="text-sm text-gray-500">{userData.email}</p>
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
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
          <div className="flex gap-2">
            {!isEditingProfile && (
              <button
                onClick={onEdit}
                className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50"
              >
                <Edit className="h-4 w-4" />
                <span>Edit Profil</span>
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-lg bg-gray-50 p-4 text-center">
            <p className="text-2xl text-emerald-600">
              {stats.totalTransactions}
            </p>
            <p className="text-sm text-gray-600">Transaksi</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4 text-center">
            <p className="text-2xl text-emerald-600">{stats.totalAccounts}</p>
            <p className="text-sm text-gray-600">Rekening</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4 text-center">
            <p className="text-2xl text-emerald-600">{stats.totalGroups}</p>
            <p className="text-sm text-gray-600">Grup</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4 text-center">
            <p className="text-2xl text-emerald-600">{stats.memberSince}</p>
            <p className="text-sm text-gray-600">Member</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeaderCard;
