"use client";

import { Moon } from "lucide-react";
import Image from "next/image";
import SawaLogo from "@/src/assets/images/sawa-logo 2.svg";

export interface MeetingHeaderProps {
  title?: string;
  subtitle?: string;
  timer?: string;
  className?: string;
}

export default function MeetingHeader({
  title = "جلسة كيمياء",
  subtitle = "مذاكرة • تفاعل ونقاش",
  timer = "00:04",
  className = "",
}: MeetingHeaderProps) {
  return (
    <header
      dir="rtl"
      className={`relative flex items-center justify-between px-6 py-4 text-white select-none ${className}`}
    >
      {/* 1. Right Side (in RTL): Sawa Logo */}
      <div className="flex items-center gap-2">
        <Image
          src={SawaLogo}
          alt="سوا"
          className="size-16 object-contain"
        />
      </div>

      {/* 2. Center: Session Title & Subtitle */}
      <div className="absolute left-1/2 -translate-x-1/2 text-center">
        <h1 className="text-sm sm:text-base font-bold text-white">{title}</h1>
        <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>
      </div>

      {/* 3. Left Side (in RTL): White Timer Pill */}
      <div className="flex items-center">
        <span className="rounded-full bg-[#fff3ce] px-3 py-1 text-xs font-semibold text-[#0e3236] shadow-sm">
          {timer}
        </span>
      </div>
    </header>
  );
}
