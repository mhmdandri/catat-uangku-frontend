"use client";
import React, { useEffect, useState } from "react";
import ProfileHeaderCard from "@/components/profile/ProfileHeaderCard";
import ProfileTabs from "@/components/profile/ProfileTabs";
import ProfileInfoTab from "@/components/profile/ProfileInfoTab";
import ProfileSecurityTab from "@/components/profile/ProfileSecurityTab";
import ProfilePreferencesTab from "@/components/profile/ProfilePreferencesTab";
import ChangePasswordModal from "@/components/profile/ChangePasswordModal";
import { useUser } from "../providers/UserProvider";
import { api, put } from "@/lib/axios";
import { toastError, toastSuccess } from "@/lib/toast";
import axios from "axios";
import ProfileSkeleton from "./ProfileSkeleton";
import { useTheme } from "next-themes";
import { AuthMeResponse } from "@/lib/types/auth";
import { Preferences, Profile, ProfileUpdatePayload } from "@/lib/types/profile";

export type ActiveTab = "profile" | "security" | "preferences";
const ProfilePage = () => {
  const { user, setUser, isLoading: isUserLoading } = useUser();
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
  const mapProfileToUserProfile = (
    profile: Profile | null | undefined,
    fallbackName: string
  ): AuthMeResponse["userProfile"] => ({
    firstName: profile?.first_name || fallbackName || "",
    lastName: profile?.last_name ?? "",
    phone: profile?.phone ?? "",
    address: profile?.address ?? "",
    bio: profile?.bio ?? "",
    avatarUrl: profile?.avatar_url ?? "",
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
      first_name: user.userProfile.firstName || user.data.name || "",
      last_name: user.userProfile.lastName || "",
      phone: user.userProfile.phone || "",
      address: user.userProfile.address || "",
      bio: user.userProfile.bio || "",
      birthdate: "",
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

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileFormData) return;
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
      const updatedProfile = await put<{ data: Profile }>(
        "/profile",
        payload
      );
      if (user) {
        setUser({
          ...user,
          userProfile: mapProfileToUserProfile(
            updatedProfile.data,
            user.data.name
          ),
        });
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
    }
  };

  const handleCancelEdit = () => {
    if (user) {
      setProfileFormData({
        first_name: user.userProfile.firstName || user.data.name || "",
        last_name: user.userProfile.lastName || "",
        phone: user.userProfile.phone || "",
        address: user.userProfile.address || "",
        bio: user.userProfile.bio || "",
        birthdate: "",
      });
    }
    setIsEditingProfile(false);
  };

  const handleUploadAvatar = async (file: File) => {
    setErrorMsg(null);
    setUploadingAvatar(true);
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const res = await api.post<{ data: Profile }>(
        "/profile/avatar",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (user) {
        setUser({
          ...user,
          userProfile: mapProfileToUserProfile(res.data.data, user.data.name),
        });
      }
      toastSuccess("Avatar berhasil diunggah");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data as
          | { error?: string; message?: string }
          | string
          | undefined;
        const message =
          (typeof data === "object" && data?.error) ||
          (typeof data === "object" && data?.message) ||
          (typeof data === "string" ? data : null);
        if (message) {
          setErrorMsg(message);
          toastError(message);
          return;
        }
      }
      setErrorMsg("Gagal mengunggah avatar. Coba lagi nanti.");
      toastError("Gagal mengunggah avatar. Coba lagi nanti.");
    } finally {
      setUploadingAvatar(false);
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

  const isPageLoading = isUserLoading;
  return (
    <>
      {isPageLoading && <ProfileSkeleton />}
      {!isPageLoading && user && (
        <>
          <ProfileHeaderCard
            userData={user}
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
              userData={user}
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
