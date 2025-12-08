import { create } from "zustand";

interface LoadingState {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  setLoading: (value: boolean) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  startLoading: () => set({ isLoading: true }),
  stopLoading: () => set({ isLoading: false }),
  setLoading: (value) => set({ isLoading: value }),
}));
