"use client";

import React from "react";

export interface ParticipantInfoProps {
  name: string;
  isLocal?: boolean;
  className?: string;
}

export default function ParticipantInfo({
  name,
  isLocal = false,
  className = "",
}: ParticipantInfoProps) {
  return (
    <div
      dir="rtl"
      className={`inline-flex items-center rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-md border border-white/5 select-none ${className}`}
    >
      <span>
        {name}
        {isLocal && " (أنت)"}
      </span>
    </div>
  );
}
