"use client";
import { ActiveTab } from "./ProfilePage";

type Props = {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
};
const ProfileTabs: React.FC<Props> = ({ activeTab, onChangeTab }) => {
  return (
    <div className="mb-6 -mx-4 flex gap-2 overflow-x-auto border-b border-border px-4 sm:mx-0 sm:px-0">
      <button
        onClick={() => onChangeTab("profile")}
        className={`whitespace-nowrap border-b-2 px-3 py-2 text-sm sm:px-4 sm:text-base transition ${
          activeTab === "profile"
            ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
            : "border-transparent text-muted-foreground hover:text-foreground"
        }`}
      >
        Informasi Profil
      </button>
      <button
        onClick={() => onChangeTab("security")}
        className={`whitespace-nowrap border-b-2 px-3 py-2 text-sm sm:px-4 sm:text-base transition ${
          activeTab === "security"
            ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
            : "border-transparent text-muted-foreground hover:text-foreground"
        }`}
      >
        Keamanan
      </button>
      <button
        onClick={() => onChangeTab("preferences")}
        className={`whitespace-nowrap border-b-2 px-3 py-2 text-sm sm:px-4 sm:text-base transition ${
          activeTab === "preferences"
            ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
            : "border-transparent text-muted-foreground hover:text-foreground"
        }`}
      >
        Preferensi
      </button>
    </div>
  );
};

export default ProfileTabs;
