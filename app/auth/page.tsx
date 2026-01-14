import Login from "@/components/auth/Login";
import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Masuk",
  description: `Masuk ke ${siteConfig.name} untuk mulai mencatat keuanganmu.`,
  robots: {
    index: false,
    follow: false,
  },
};

const LoginPage = () => {
  return (
    <>
      <Login />
    </>
  );
};

export default LoginPage;
