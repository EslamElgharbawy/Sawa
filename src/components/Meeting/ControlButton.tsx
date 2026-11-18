"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

export interface ControlButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  className?: string;
}

export default function ControlButton({
  icon: Icon,
  label,
  onClick,
  isActive = false,
  variant = "secondary",
  disabled = false,
  className = "",
}: ControlButtonProps) {
  const getButtonStyles = () => {
    if (disabled) {
      return "bg-[#163f47]/50 text-slate-500 cursor-not-allowed";
    }

    if (variant === "primary" || isActive) {
      // Cyan matching design
      return "bg-[#17a6d1] ext-white shadow-sm";
    }

    if (variant === "danger") {
      return "bg-[#ef4444] hover:bg-[#dc2626] text-white shadow-sm";
    }

    // Default dark teal circle matching screenshot
    return "bg-white/12 hover:bg-white/20 text-white";
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`flex size-11 sm:size-12 items-center justify-center rounded-full transition-all duration-200  cursor-pointer ${getButtonStyles()} ${className}`}
    >
      <Icon size={20} />
    </button>
  );
}
