"use client";
import React, { useEffect, useMemo, useState } from "react";
import ProfileHeaderCard from "@/components/profile/ProfileHeaderCard";
import ProfileTabs from "@/components/profile/ProfileTabs";
import ProfileInfoTab from "@/components/profile/ProfileInfoTab";
import ProfileSecurityTab from "@/components/profile/ProfileSecurityTab";
import ProfilePreferencesTab from "@/components/profile/ProfilePreferencesTab";
import ChangePasswordModal from "@/components/profile/ChangePasswordModal";
import { useUser } from "../providers/UserProvider";
import { api, put } from "@/lib/axios";
import { useLoadingStore } from "@/store/useLoadingStore";
import { toastError, toastSuccess } from "@/lib/toast";
import axios from "axios";
import ProfileSkeleton from "./ProfileSkeleton";
import { useTheme } from "next-themes";
import { Preferences, ProfileUpdatePayload } from "@/lib/types/profile";
import { User } from "@/lib/types/user";

export type ActiveTab = "profile" | "security" | "preferences";
const ProfilePage = () => {
  const { user, setUser } = useUser();
  const { isLoading, startLoading, stopLoading } = useLoadingStore();
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("profile");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const { theme, setTheme } = useTheme();
  const [profileFormData, setProfileFormData] = useState<ProfileUpdatePayload>({
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    bio: "",
  });
  useEffect(() => {
    if (!user) {
      setProfileFormData({
        first_name: "",
        last_name: "",
        phone: "",
        address: "",
        bio: "",
      });
      return;
    }
    setProfileFormData({
      first_name: user.profile?.first_name || user.name || "",
      last_name: user.profile?.last_name || "",
      phone: user.profile?.phone || "",
      address: user.profile?.address || "",
      bio: user.profile?.bio || "",
      birthdate: user.profile?.birthdate || "",
    });
  }, [user]);

  const [preferences, setPreferences] = useState<Preferences>({
    currency: "IDR",
    language: "id",
    theme: "system",
    notifications: {
      email: true,
      push: true,
      budgetAlert: true,
      transactionReminder: false,
    },
    privacy: {
      showBalance: true,
      profilePublic: false,
    },
  });

  const stats = {
    totalTransactions: 234,
    totalGroups: 4,
    totalAccounts: 5,
    memberSince: "3 bulan",
  };

  const fullProfile = useMemo<User | null>(() => {
    if (!user) return null;
    return {
      ...user,
      profile: user.profile || undefined,
    };
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileFormData) return;
    startLoading();
    try {
      setErrorMsg(null);
      setSaving(true);
      const payload: ProfileUpdatePayload = { ...profileFormData };
      if (!payload.birthdate) {
        delete payload.birthdate;
      } else {
        const parsed = new Date(payload.birthdate);
        if (Number.isNaN(parsed.getTime())) {
          delete payload.birthdate;
        } else {
          payload.birthdate = parsed.toISOString();
        }
      }
      const updatedProfile = await put<{ data: User["profile"] }>(
        "/profile",
        payload
      );
      if (user) {
        setUser({ ...user, profile: updatedProfile.data });
      }
      setIsEditingProfile(false);
      toastSuccess("Profil berhasil diperbarui");
    } catch (error) {
      if (error instanceof Error) {
        toastError(error.message);
      }
      setErrorMsg("Gagal menyimpan profil. Cek input dan coba lagi.");
    } finally {
      setSaving(false);
      stopLoading();
    }
  };

  const handleCancelEdit = () => {
    if (user) {
      setProfileFormData({
        first_name: user.profile?.first_name || user.name || "",
        last_name: user.profile?.last_name || "",
        phone: user.profile?.phone || "",
        address: user.profile?.address || "",
        bio: user.profile?.bio || "",
        birthdate: user.profile?.birthdate || "",
      });
    }
    setIsEditingProfile(false);
  };

  const handleUploadAvatar = async (file: File) => {
    setErrorMsg(null);
    setUploadingAvatar(true);
    startLoading();
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const res = await api.post<{ data: User["profile"] }>(
        "/profile/avatar",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (user) {
        setUser({ ...user, profile: res.data.data });
      }
      toastSuccess("Avatar berhasil diunggah");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const message = error.response.data.message;
        if (message) {
          setErrorMsg(message);
          toastError(message);
          return;
        }
      }
    } finally {
      setUploadingAvatar(false);
      stopLoading();
    }
  };

  const handlePreferenceChange = (
    category: keyof Preferences,
    key: string,
    value: unknown
  ) => {
    if (category === "theme" && typeof value === "string") {
      setTheme(value);
    }
    setPreferences((prev) => ({
      ...prev,
      [category]: {
        ...(prev[category] as Record<string, unknown>),
        [key]: value,
      },
    }));
  };
  useEffect(() => {
    if (theme) {
      setPreferences((prev) => ({
        ...prev,
        theme: theme as "light" | "dark" | "system",
      }));
    }
  }, [theme]);

  return (
    <>
      {(!fullProfile || isLoading) && <ProfileSkeleton />}
      {fullProfile && (
        <>
          <ProfileHeaderCard
            userData={fullProfile}
            stats={stats}
            isEditingProfile={isEditingProfile}
            onEdit={() => setIsEditingProfile(true)}
            onUploadAvatar={handleUploadAvatar}
            isUploadingAvatar={uploadingAvatar}
          />

          <ProfileTabs activeTab={activeTab} onChangeTab={setActiveTab} />
          {errorMsg && <p className="mb-3 text-sm text-red-600">{errorMsg}</p>}

          {activeTab === "profile" && (
            <ProfileInfoTab
              isEditing={isEditingProfile}
              userData={fullProfile}
              profileFormData={profileFormData}
              setProfileFormData={setProfileFormData}
              onSave={handleSaveProfile}
              onCancel={handleCancelEdit}
              isSaving={saving}
            />
          )}

          {activeTab === "security" && (
            <ProfileSecurityTab
              onOpenChangePassword={() => setShowChangePassword(true)}
            />
          )}

          {activeTab === "preferences" && (
            <ProfilePreferencesTab
              preferences={preferences}
              onPreferenceChange={handlePreferenceChange}
            />
          )}

          <ChangePasswordModal
            open={showChangePassword}
            onClose={() => setShowChangePassword(false)}
          />
        </>
      )}
    </>
  );
};

export default ProfilePage;
