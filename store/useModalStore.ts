import { create } from "zustand";

type ModalType =
  | "account"
  | "transaction"
  | "deleteAccount"
  | "deleteTransaction"
  | "editAccount"
  | "editTransaction";

interface ModalData {
  [key: string]: string | number | boolean | undefined;
}

interface ModalStore {
  modals: Record<ModalType, boolean>;
  modalData: Record<ModalType, ModalData>;

  openModal: (type: ModalType, data?: ModalData) => void;
  closeModal: (type: ModalType) => void;
  isOpen: (type: ModalType) => boolean;
  getData: <T = ModalData>(type: ModalType) => T;
  setData: (type: ModalType, data: ModalData) => void;
}

export const useModalStore = create<ModalStore>((set, get) => ({
  modals: {
    account: false,
    transaction: false,
    deleteAccount: false,
    deleteTransaction: false,
    editAccount: false,
    editTransaction: false,
  },
  modalData: {
    account: {},
    transaction: {},
    deleteAccount: {},
    deleteTransaction: {},
    editAccount: {},
    editTransaction: {},
  },

  openModal: (type, data = {}) =>
    set((state) => ({
      modals: { ...state.modals, [type]: true },
      modalData: { ...state.modalData, [type]: data },
    })),

  closeModal: (type) =>
    set((state) => ({
      modals: { ...state.modals, [type]: false },
      modalData: { ...state.modalData, [type]: {} },
    })),

  isOpen: (type) => get().modals[type],

  getData: <T = ModalData>(type: ModalType) => get().modalData[type] as T,

  setData: (type, data) =>
    set((state) => ({
      modalData: { ...state.modalData, [type]: data },
    })),
}));
