import React from "react";
interface AuthToggleProps {
  isLogin: boolean;
  onToggle: () => void;
}
const AuthToggle: React.FC<AuthToggleProps> = ({ isLogin, onToggle }) => (
  <p className="mt-6 text-center text-sm sm:text-base text-gray-600 dark:text-zinc-400">
    {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
    <button
      onClick={onToggle}
      className="text-emerald-600 hover:text-emerald-700"
    >
      {isLogin ? "Daftar sekarang" : "Masuk"}
    </button>
  </p>
);
export default AuthToggle;
