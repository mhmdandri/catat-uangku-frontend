import { create } from "zustand";

interface BalanceVisibilityState {
  showBalances: boolean;
  toggleShowBalances: () => void;
  setShowBalances: (value: boolean) => void;
}

export const useBalanceVisibilityStore = create<BalanceVisibilityState>(
  (set) => ({
    showBalances: true,
    toggleShowBalances: () =>
      set((state) => ({ showBalances: !state.showBalances })),
    setShowBalances: (value) => set({ showBalances: value }),
  })
);
