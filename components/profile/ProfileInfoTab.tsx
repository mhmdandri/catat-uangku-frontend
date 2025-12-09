"use client";

import { Mail, MapPin, Phone, Save, User2, X } from "lucide-react";
import { ProfileUpdatePayload, User } from "@/lib/types";

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
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex items-start gap-3">
              <User2 className="mt-1 h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Nama Lengkap</p>
                <p className="text-gray-900">
                  {userData.profile?.first_name || userData.name}{" "}
                  {userData.profile?.last_name || ""}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="mt-1 h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{userData.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="mt-1 h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">No. Telepon</p>
                <p className="text-gray-900">
                  {userData.profile?.phone || "-"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Alamat</p>
                <p className="text-gray-900">
                  {userData.profile?.address || "-"}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <p className="mb-2 text-sm text-gray-500">Bio</p>
            <p className="text-gray-900">{userData.profile?.bio || "-"}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <form onSubmit={onSave} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-gray-700">
              Nama Depan
            </label>
            <input
              type="text"
              value={profileFormData.first_name || ""}
              onChange={(e) =>
                setProfileFormData({
                  ...profileFormData,
                  first_name: e.target.value,
                })
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-700">
              Nama Belakang
            </label>
            <input
              type="text"
              value={profileFormData.last_name || ""}
              onChange={(e) =>
                setProfileFormData({
                  ...profileFormData,
                  last_name: e.target.value,
                })
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-700">
              No. Telepon
            </label>
            <input
              type="tel"
              value={profileFormData.phone || ""}
              onChange={(e) =>
                setProfileFormData({
                  ...profileFormData,
                  phone: e.target.value,
                })
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-700">Alamat</label>
            <input
              type="text"
              value={profileFormData.address || ""}
              onChange={(e) =>
                setProfileFormData({
                  ...profileFormData,
                  address: e.target.value,
                })
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-700">Bio</label>
          <textarea
            value={profileFormData.bio || ""}
            onChange={(e) =>
              setProfileFormData({
                ...profileFormData,
                bio: e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
            rows={4}
            placeholder="Ceritakan tentang dirimu..."
          />
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50"
          >
            <X className="h-4 w-4" />
            <span>Batal</span>
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700"
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
