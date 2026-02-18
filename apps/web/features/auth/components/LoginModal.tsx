"use client";

import { useEffect, useCallback } from "react";
import { signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

import { OAuthButton } from "./OAuthButton";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const KakaoIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M12 3C6.48 3 2 6.58 2 10.89c0 2.78 1.86 5.22 4.65 6.6-.18.67-.67 2.44-.77 2.82-.12.47.17.46.37.34.15-.1 2.42-1.65 3.4-2.32.74.11 1.51.17 2.35.17 5.52 0 10-3.58 10-7.89S17.52 3 12 3" />
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onClose();
            }}
            role="button"
            tabIndex={0}
            aria-label="모달 닫기"
          />

          <motion.div
            className="relative z-10 w-full max-w-sm rounded-2xl bg-white px-8 py-10 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="로그인"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 transition-colors hover:text-slate-600"
              aria-label="닫기"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-5 w-5"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            <h2 className="mb-8 text-center text-xl font-bold text-slate-900">
              로그인
            </h2>

            <div className="flex flex-col gap-3">
              <OAuthButton
                icon={<KakaoIcon />}
                label="카카오로 계속하기"
                bgColor="#FEE500"
                textColor="#191919"
                onClick={() => signIn("kakao")}
              />
              <OAuthButton
                icon={<GoogleIcon />}
                label="Google로 계속하기"
                bgColor="#ffffff"
                textColor="#1f1f1f"
                borderColor="#747775"
                onClick={() => signIn("google")}
              />
            </div>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs text-slate-400">또는</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <p className="text-center text-xs leading-relaxed text-slate-400">
              계속 진행하면 서비스 이용약관에 동의하는 것으로 간주됩니다.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
