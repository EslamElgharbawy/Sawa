"use client";

import React, { useEffect, useRef } from "react";
import { Participant } from "@/src/types/Meeting";
import ParticipantInfo from "./ParticipantInfo";
import { Mic, MicOff } from "lucide-react";

export interface ParticipantVideoProps {
  participant: Participant;
  className?: string;
}

export default function ParticipantVideo({
  participant,
  className = "",
}: ParticipantVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && participant.stream) {
      videoRef.current.srcObject = participant.stream;
    }
  }, [participant.stream]);

  const initialLetter =
    participant.avatarLetter ||
    participant.name.trim().charAt(0) ||
    "م";

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
        /* 2. Avatar Placeholder if camera is OFF (matches screenshot) */
        <div className="flex size-full items-center justify-center">
          <div
            className={`flex size-20 items-center justify-center rounded-full text-2xl sm:text-3xl font-bold text-white shadow-md select-none transition-transform duration-300 ${avatarBg} ${
              participant.isSpeaking ? "ring-4 ring-[#17a6d1]/60 animate-pulse" : ""
            }`}
          >
            {initialLetter}
          </div>
        </div>
      )}

      {/* 3. Bottom Right: Participant Name Pill */}
      <div className="absolute bottom-4 right-4 z-10">
        <ParticipantInfo
          name={participant.name}
          isLocal={participant.isLocal}
        />
      </div>

      {/* 4. Bottom Left: Microphone status icon */}
      <div className="absolute bottom-4 left-4 z-10 flex items-center justify-center text-white/80">
        {participant.isMuted ? (
          <MicOff size={16} className="text-red-400" />
        ) : (
          <Mic size={16} className={participant.isSpeaking ? "text-[#17a6d1]" : ""} />
        )}
      </div>
    </div>
  );
}
