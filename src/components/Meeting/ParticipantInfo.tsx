"use client";

import { Hand } from "lucide-react";

export interface ParticipantInfoProps {
  name: string;
  isLocal?: boolean;
  isHandRaised?: boolean;
  className?: string;
}

export default function ParticipantInfo({
  name,
  isLocal = false,
  isHandRaised = false,
  className = "",
}: ParticipantInfoProps) {
  return (
    <div
      dir="rtl"
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] select-none transition-all duration-300 ${
        isHandRaised
          ? "bg-[#81c995] text-[#062e19] font-semibold shadow-md border border-[#81c995]/40"
          : "bg-black/40 font-medium text-white backdrop-blur-md border border-white/5"
      } ${className}`}
    >
      {isHandRaised && <Hand size={13} className="shrink-0" />}
      <div>
        {name}
        {isLocal && " (أنت)"}
      </div>
    </div>
  );
}
