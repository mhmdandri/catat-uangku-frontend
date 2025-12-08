import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function AppToastContainer() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2600}
      hideProgressBar
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      theme="auto"
      // container semua toast
      className="pointer-events-none fixed inset-x-0 top-4 z-9999 flex justify-end px-4"
      // style dasar tiap toast
      toastClassName="pointer-events-auto flex w-full max-w-sm items-start gap-3 overflow-hidden rounded-2xl border bg-white/90 p-3 shadow-lg shadow-slate-900/5 ring-1 ring-slate-200/70 backdrop-blur-md dark:bg-slate-900/95 dark:border-slate-700/80 dark:ring-slate-700/70"
    />
  );
}
