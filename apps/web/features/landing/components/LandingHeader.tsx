import Image from "next/image";

import { menuItems } from "../model/constants";

export const LandingHeader = () => {
  return (
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
        <a
          href="#"
          className="rounded-lg border border-[#778fed] px-4 py-2 font-semibold text-[#778fed]"
        >
          로그인
        </a>
      </nav>
    </header>
  );
};
