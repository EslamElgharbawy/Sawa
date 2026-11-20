"use client";

import React, { useEffect, useRef } from "react";
import { Participant } from "@/src/types/Meeting";
import ParticipantInfo from "./ParticipantInfo";
import { Mic, MicOff } from "lucide-react";

export interface ParticipantVideoProps {
  participant: Participant;
  className?: string;
  isQuietSession?: boolean;
}

export default function ParticipantVideo({
  participant,
  className = "",
  isQuietSession = false,
}: ParticipantVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && participant.stream) {
      videoRef.current.srcObject = participant.stream;
    }
  }, [participant.stream]);

  const initialLetter =
    participant.avatarLetter || participant.name.trim().charAt(0) || "م";

  // In design: Local user has cyan avatar, other user has dark teal avatar
  const avatarBg =
    participant.avatarBg ||
    (participant.isLocal ? "bg-[#17a6d1]" : "bg-[#194048]");

  return (
    <div
      className={`relative flex size-full items-center justify-center overflow-hidden rounded-2xl sm:rounded-3xl bg-white/10 border border-[#1b434b]/60 shadow-lg ${className}`}
    >
      {/* 1. Video Element if camera is ON and stream exists */}
      {!participant.isVideoOff && participant.stream ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={participant.isLocal}
          className={`size-full object-cover ${
            participant.isLocal ? "scale-x-[-1]" : ""
          }`}
        />
      ) : (
        /* 2. Avatar Placeholder if camera is OFF (Google Meet speaking indicator) */
        <div className="relative flex size-full items-center justify-center">
          {/* Google Meet Speaking Halo: هالات دائرية ناعمة خلف الأفاتار تنبض مع الصوت */}
          <div
            className={`pointer-events-none absolute flex items-center justify-center transition-all duration-300 ease-out ${
              participant.isSpeaking
                ? "opacity-100 scale-100"
                : "opacity-0 scale-75"
            }`}
          >
            {/* Middle halo (دائرة الهالة المتطابقة مع جوجل ميت) */}
            <span className="absolute size-28 rounded-full bg-[#17a6d1]/25" />
          </div>

          {/* Avatar with crisp Google Meet style ring */}
          <div
            className={`relative flex size-20 items-center justify-center rounded-full text-2xl sm:text-3xl font-bold text-white shadow-md select-none transition-all duration-300 ${avatarBg} ${
              participant.isSpeaking
                ? "ring-2 ring-white/90 scale-105"
                : "ring-0 scale-100"
            }`}
          >
            {initialLetter}
          </div>
        </div>
      )}

      <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
        {/* Left */}
        <ParticipantInfo
          name={participant.name}
          isLocal={participant.isLocal}
          isHandRaised={participant.isHandRaised}
        />

        {/* Right */}
        {!isQuietSession && participant.isMuted && (
          <div className="flex items-center justify-center text-white/80 bg-[#17a6d1]/25 rounded-full size-7 ">
            <MicOff size={18} />
          </div>
        )}
      </div>
    </div>
  );
}
