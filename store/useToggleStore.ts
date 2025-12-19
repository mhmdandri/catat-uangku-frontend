import { create } from "zustand";
import { persist } from "zustand/middleware";

type ToggleKey = "balanceVisibility" | "darkMode" | "sidebarCollapsed";

interface ToggleStore {
  toggles: Record<ToggleKey, boolean>;
  toggle: (key: ToggleKey) => void;
  setToggle: (key: ToggleKey, value: boolean) => void;
  isActive: (key: ToggleKey) => boolean;
}

export const useToggleStore = create<ToggleStore>()(
  persist(
    (set, get) => ({
      toggles: {
        balanceVisibility: true,
        darkMode: false,
        sidebarCollapsed: false,
      },

      toggle: (key) =>
        set((state) => ({
          toggles: { ...state.toggles, [key]: !state.toggles[key] },
        })),

      setToggle: (key, value) =>
        set((state) => ({
          toggles: { ...state.toggles, [key]: value },
        })),

      isActive: (key) => get().toggles[key],
    }),
    {
      name: "toggle-storage",
    }
  )
);
