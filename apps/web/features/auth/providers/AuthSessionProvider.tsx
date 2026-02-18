"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

interface AuthSessionProviderProps {
  children: ReactNode;
}

export const AuthSessionProvider = ({ children }: AuthSessionProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};
