"use client";

import { ProfileUpdatePayload } from "@/lib/types/profile";
import { User } from "@/lib/types/user";
import { Mail, MapPin, Phone, Save, User2, X } from "lucide-react";

type Props = {
  isEditing: boolean;
  userData: User;
  profileFormData: ProfileUpdatePayload;
  setProfileFormData: (data: ProfileUpdatePayload) => void;
  onSave: (e: React.FormEvent) => void;
  onCancel: () => void;
  isSaving?: boolean;
};

const ProfileInfoTab: React.FC<Props> = ({
  isEditing,
  userData,
  profileFormData,
  setProfileFormData,
  onSave,
  onCancel,
  isSaving,
}) => {
  if (!isEditing) {
    return (
      <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm">
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex items-start gap-3">
              <User2 className="mt-1 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Nama Lengkap</p>
                <p className="text-foreground">
                  {userData.profile?.first_name || userData.name}{" "}
                  {userData.profile?.last_name || ""}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-1 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-foreground">{userData.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-1 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">No. Telepon</p>
                <p className="text-foreground">
                  {userData.profile?.phone || "-"}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Alamat</p>
                <p className="text-foreground">
                  {userData.profile?.address || "-"}
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-6">
            <p className="mb-2 text-sm text-muted-foreground">Bio</p>
            <p className="text-foreground">{userData.profile?.bio || "-"}</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <form onSubmit={onSave} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="firstname"
              className="mb-2 block text-sm text-muted-foreground"
            >
              Nama Depan
            </label>
            <input
              id="firstname"
              type="text"
              value={profileFormData.first_name || ""}
              onChange={(e) =>
                setProfileFormData({
                  ...profileFormData,
                  first_name: e.target.value,
                })
              }
              className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 text-foreground"
              required
            />
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="mb-2 block text-sm text-muted-foreground"
            >
              Nama Belakang
            </label>
            <input
              id="lastname"
              type="text"
              value={profileFormData.last_name || ""}
              onChange={(e) =>
                setProfileFormData({
                  ...profileFormData,
                  last_name: e.target.value,
                })
              }
              className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 text-foreground"
            />
          </div>
          <div>
            <label
              htmlFor="no"
              className="mb-2 block text-sm text-muted-foreground"
            >
              No. Telepon
            </label>
            <input
              id="no"
              type="tel"
              value={profileFormData.phone || ""}
              onChange={(e) =>
                setProfileFormData({
                  ...profileFormData,
                  phone: e.target.value,
                })
              }
              className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 text-foreground"
            />
          </div>
          <div>
            <label
              htmlFor="alamat"
              className="mb-2 block text-sm text-muted-foreground"
            >
              Alamat
            </label>
            <input
              id="alamat"
              type="text"
              value={profileFormData.address || ""}
              onChange={(e) =>
                setProfileFormData({
                  ...profileFormData,
                  address: e.target.value,
                })
              }
              className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 text-foreground"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="bio"
            className="mb-2 block text-sm text-muted-foreground"
          >
            Bio
          </label>
          <textarea
            id="bio"
            value={profileFormData.bio || ""}
            onChange={(e) =>
              setProfileFormData({
                ...profileFormData,
                bio: e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 text-foreground"
            rows={4}
            placeholder="Ceritakan tentang dirimu..."
          />
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onCancel}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-foreground transition hover:bg-gray-50 dark:hover:bg-white/5"
          >
            <X className="h-4 w-4" />
            <span>Batal</span>
          </button>
          <button
            type="submit"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700"
            disabled={isSaving}
          >
            <Save className="h-4 w-4" />
            <span>{isSaving ? "Menyimpan..." : "Simpan Perubahan"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileInfoTab;
