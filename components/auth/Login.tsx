"use client";
import React, { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AuthLoginRequest,
  AuthRegisterRequest,
  AuthResponse,
} from "@/lib/types";
import { api, post } from "@/lib/axios";
import { useLoadingStore } from "@/store/useLoadingStore";
import DialogRegister from "../DialogRegister";
import DialogForgetPwd from "../DialogForgetPwd";
import AuthForm from "./AuthForm";
import AuthToggle from "./AuthToggle";
import BackLink from "./BackLink";
import BrandHeader from "./BrandHeader";
import IllustrationPanel from "./IllustrationPanel";
import IntroText from "./IntroText";
import SectionDivider from "./SectionDivider";
import SocialLoginButtons from "./SocialLoginButtons";
import axios from "axios";
import { toast } from "react-toastify";
import { toastError } from "@/lib/toast";

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const signParam = searchParams.get("sign");
  const [isLogin, setIsLogin] = useState(signParam !== "register");
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, startLoading, stopLoading } = useLoadingStore();
  const [open, setOpen] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<AuthRegisterRequest>({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const setMode = useCallback(
    (mode: "login" | "register") => {
      setIsLogin(mode === "login");
      const params = new URLSearchParams(searchParams.toString());
      params.set("sign", mode);
      router.replace(`/auth?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startLoading();
    try {
      if (isLogin) {
        const payload: AuthLoginRequest = {
          email: formData.email,
          password: formData.password,
        };
        const res = await post<AuthResponse, AuthLoginRequest>(
          "/auth/login",
          payload
        );
        api.defaults.headers.common.Authorization = `Bearer ${res.access_token}`;
        router.push("/dashboard");
      } else {
        const payload: AuthRegisterRequest = { ...formData };
        if (payload.password !== formData.confirmPassword) {
          setErrorMessage("Password dan konfirmasi password tidak sesuai");
          stopLoading();
          return;
        } else if (payload.password.length < 6) {
          setErrorMessage("Password minimal 6 karakter");
          stopLoading();
          return;
        }
        await post<AuthResponse, AuthRegisterRequest>(
          "/auth/register",
          payload
        );
        setRegisteredEmail(payload.email);
        setMode("login");
        setOpen(true);
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        toastError(err.response.data?.error ?? "Login gagal");
      } else {
        toast.error("Terjadi kesalahan. Silakan coba lagi.");
      }
      stopLoading();
    } finally {
      stopLoading();
    }
  };

  return (
    <>
      <DialogForgetPwd
        open={showForgetPassword}
        onClose={() => setShowForgetPassword(false)}
      />
      <DialogRegister
        open={open}
        email={registeredEmail}
        onClose={() => setOpen(false)}
        onGoToLogin={() => setMode("login")}
      />
      <div className="flex min-h-screen bg-white dark:bg-zinc-950 transition-colors">
        <div className="flex w-full flex-col justify-center px-6 py-10 lg:w-1/2 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <BackLink />
            <BrandHeader />
            <IntroText isLogin={isLogin} />
            <AuthForm
              isLogin={isLogin}
              formData={formData}
              setFormData={setFormData}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              isLoading={isLoading}
              onSubmit={handleSubmit}
              onForgotPassword={() => setShowForgetPassword(true)}
              errorMessage={errorMessage}
            />
            <SectionDivider />
            <SocialLoginButtons />
            <AuthToggle
              isLogin={isLogin}
              onToggle={() => setMode(isLogin ? "register" : "login")}
            />
          </div>
        </div>

        {/* Right Side - Illustration */}
        <IllustrationPanel />
      </div>
    </>
  );
};

export default Login;
