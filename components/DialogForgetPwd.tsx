"use client";
import { CheckCircle, Mail } from "lucide-react";
import React, { useState } from "react";

interface DialogForgetPwdProps {
  open: boolean;
  onClose: () => void;
}

const DialogForgetPwd: React.FC<DialogForgetPwdProps> = ({ open, onClose }) => {
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const handleClose = () => {
    setResetEmailSent(false);
    setForgotPasswordEmail("");
    onClose();
  };

  if (!open) return null;

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulasi kirim email reset password
    console.log("Sending reset email to:", forgotPasswordEmail);
    setResetEmailSent(true);

    // Reset after 3 seconds
    setTimeout(() => {
      handleClose();
    }, 3000);
  };

  return (
    <>
      {/* Forgot Password Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-md rounded-xl bg-background p-6 text-foreground border border-border shadow-lg">
          {!resetEmailSent ? (
            <>
              <div className="mb-4">
                <h3 className="text-2xl font-semibold">Lupa Password?</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Masukkan email yang terdaftar dan kami akan mengirimkan link
                  untuk reset password Anda.
                </p>
              </div>

              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="email"
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      className="w-full rounded-lg border border-input bg-background py-3 pl-10 pr-4 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                      placeholder="nama@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 rounded-lg border border-input bg-background px-4 py-3 text-sm font-medium text-foreground transition hover:bg-muted"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-medium text-primary-foreground transition hover:bg-emerald-700"
                  >
                    Kirim Link Reset
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-emerald-500/10 p-3">
                  <CheckCircle className="h-12 w-12 text-emerald-500" />
                </div>
              </div>
              <h3 className="mb-2 text-2xl font-semibold">Email Terkirim!</h3>
              <p className="text-sm text-muted-foreground">
                Kami telah mengirimkan link reset password ke{" "}
                <span className="font-medium text-emerald-600">
                  {forgotPasswordEmail}
                </span>
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Silakan cek inbox atau folder spam Anda.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DialogForgetPwd;
