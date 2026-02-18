"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

import { LoginModal } from "../../auth";
import { menuItems } from "../model/constants";

export const LandingHeader = () => {
  const { data: session } = useSession();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <>
      <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
        <Image
          src="/dahaeng_icon/icon_main_full.svg"
          alt="다행 메인 로고"
          width={138}
          height={36}
          priority
          className="h-8 w-auto"
        />

        <nav className="flex items-center gap-1 text-xs font-medium text-slate-700 sm:gap-3 sm:text-sm">
          {menuItems.map((menuItem) => (
            <a
              key={menuItem}
              href="#"
              className="rounded-lg px-3 py-2 transition-colors hover:text-slate-950"
            >
              {menuItem}
            </a>
          ))}
          {session ? (
            <button
              type="button"
              onClick={() => signOut()}
              className="cursor-pointer rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-600 transition-colors hover:bg-slate-50"
            >
              로그아웃
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsLoginModalOpen(true)}
              className="cursor-pointer rounded-lg border border-[#778fed] px-4 py-2 font-semibold text-[#778fed] transition-colors hover:bg-[#778fed]/5"
            >
              로그인
            </button>
          )}
        </nav>
      </header>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};
