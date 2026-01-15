"use client";
import { createContext, useContext } from "react";
import type { AuthMeResponse } from "@/lib/types/auth";

type UserContextValue = {
  user: AuthMeResponse | null;
  isLoading: boolean;
  setUser: (u: AuthMeResponse | null) => void;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside UserProvider");
  return ctx;
}

export function UserProvider({
  value,
  children,
}: {
  value: UserContextValue;
  children: React.ReactNode;
}) {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
