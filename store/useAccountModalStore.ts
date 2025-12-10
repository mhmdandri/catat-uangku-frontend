import { create } from "zustand";

interface AccountModalState {
  isAddModalOpen: boolean;
  openAddModal: () => void;
  closeAddModal: () => void;
  setAddModalOpen: (value: boolean) => void;
}

export const useAccountModalStore = create<AccountModalState>((set) => ({
  isAddModalOpen: false,
  openAddModal: () => set({ isAddModalOpen: true }),
  closeAddModal: () => set({ isAddModalOpen: false }),
  setAddModalOpen: (value: boolean) => set({ isAddModalOpen: value }),
}));
