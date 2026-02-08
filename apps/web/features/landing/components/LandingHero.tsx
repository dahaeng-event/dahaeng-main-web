"use client";

import { motion } from "framer-motion";

import { LandingLogoIntro } from "./LandingLogoIntro";
import {
  fadeUpTransition,
  HERO_BUTTON_DELAY_SECONDS,
  HERO_HEADING_DELAY_SECONDS,
  HERO_TEXT_DELAY_SECONDS,
} from "../model/animation";

export const LandingHero = () => {
  return (
    <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 pb-20 pt-12 text-center sm:px-10 sm:pt-20">
      <LandingLogoIntro />
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...fadeUpTransition, delay: HERO_TEXT_DELAY_SECONDS }}
        className="text-lg font-medium leading-relaxed text-slate-700 sm:text-2xl"
      >
        기획부터 운영, 마무리까지 단계별 워크플로우
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...fadeUpTransition, delay: HERO_HEADING_DELAY_SECONDS }}
        className="mt-4 text-4xl font-extrabold leading-tight sm:text-6xl"
      >
        <span className="whitespace-nowrap">
          <span className="text-[#778fed]">행사</span>
          <span className="text-slate-950">의 </span>
          <span className="text-[#778fed]">설계도</span>
        </span>
        <span className="whitespace-nowrap text-slate-950">를 만듭니다</span>
      </motion.h1>
      <motion.a
        href="#"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...fadeUpTransition, delay: HERO_BUTTON_DELAY_SECONDS }}
        className="mt-10 rounded-xl bg-[#778fed] px-6 py-3 text-base font-semibold text-white shadow-[0_16px_40px_-18px_rgba(119,143,237,0.9)] transition-colors hover:bg-[#627be4]"
      >
        템플릿 보러가기
      </motion.a>
    </main>
  );
};
