"use client";

import { ActiveTab } from "./ProfilePage";

type Props = {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
};

const ProfileTabs: React.FC<Props> = ({ activeTab, onChangeTab }) => {
  return (
    <div className="mb-6 flex gap-2 border-b border-gray-200">
      <button
        onClick={() => onChangeTab("profile")}
        className={`border-b-2 px-4 py-2 transition ${
          activeTab === "profile"
            ? "border-emerald-600 text-emerald-600"
            : "border-transparent text-gray-600 hover:text-gray-900"
        }`}
      >
        Informasi Profil
      </button>
      <button
        onClick={() => onChangeTab("security")}
        className={`border-b-2 px-4 py-2 transition ${
          activeTab === "security"
            ? "border-emerald-600 text-emerald-600"
            : "border-transparent text-gray-600 hover:text-gray-900"
        }`}
      >
        Keamanan
      </button>
      <button
        onClick={() => onChangeTab("preferences")}
        className={`border-b-2 px-4 py-2 transition ${
          activeTab === "preferences"
            ? "border-emerald-600 text-emerald-600"
            : "border-transparent text-gray-600 hover:text-gray-900"
        }`}
      >
        Preferensi
      </button>
    </div>
  );
};

export default ProfileTabs;
