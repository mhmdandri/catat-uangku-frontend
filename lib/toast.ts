import { AlertCircle, Check, Lamp } from "lucide-react";
import { toast, ToastOptions } from "react-toastify";

const baseOptions: ToastOptions = {
  closeButton: true,
};

export const toastSuccess = (message: string, options?: ToastOptions) =>
  toast(message, {
    ...baseOptions,
    type: "success",
    icon: Check,
    className:
      "border-l-4 border-emerald-500 bg-emerald-50/80 text-emerald-950 " +
      "dark:bg-emerald-900/30 dark:text-emerald-50",
    ...options,
  });

export const toastError = (message: string, options?: ToastOptions) =>
  toast(message, {
    ...baseOptions,
    type: "error",
    icon: AlertCircle,
    className:
      "border-l-4 border-rose-500 bg-rose-50/85 text-rose-950 " +
      "dark:bg-rose-900/35 dark:text-rose-50",
    ...options,
  });

export const toastInfo = (message: string, options?: ToastOptions) =>
  toast(message, {
    ...baseOptions,
    type: "info",
    icon: Lamp,
    className:
      "border-l-4 border-sky-500 bg-sky-50/85 text-sky-950 " +
      "dark:bg-sky-900/35 dark:text-sky-50",
    ...options,
  });
