"use client";

import type { ReactNode } from "react";

interface OAuthButtonProps {
  icon: ReactNode;
  label: string;
  bgColor: string;
  textColor: string;
  borderColor?: string;
  onClick: () => void;
}

export const OAuthButton = ({
  icon,
  label,
  bgColor,
  textColor,
  borderColor,
  onClick,
}: OAuthButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        border: borderColor ? `1px solid ${borderColor}` : "none",
      }}
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center">
        {icon}
      </span>
      {label}
    </button>
  );
};
