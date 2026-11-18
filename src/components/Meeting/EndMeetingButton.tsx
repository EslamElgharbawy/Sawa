"use client";

import React from "react";
import { PhoneOff } from "lucide-react";

export interface EndMeetingButtonProps {
  onEndMeeting?: () => void;
  label?: string;
  className?: string;
}

export default function EndMeetingButton({
  onEndMeeting,
  label = "إنهاء الجلسة",
  className = "",
}: EndMeetingButtonProps) {
  return (
    <button
      type="button"
      onClick={onEndMeeting}
      aria-label={label}
      title={label}
      className={`flex items-center justify-center gap-2 rounded-full bg-[#da2a32] hover:bg-[#da2a32]/85 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md transition-all duration-200 active:scale-95 cursor-pointer ${className}`}
    >
      <PhoneOff size={16} />
      <span>{label}</span>
    </button>
  );
}
