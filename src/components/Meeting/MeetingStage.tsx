"use client";

import { Participant } from "@/src/types/Meeting";
import ParticipantVideo from "./ParticipantVideo";

export interface MeetingStageProps {
  participants: Participant[];
  className?: string;
}

export default function MeetingStage({
  participants,
  className = "",
}: MeetingStageProps) {
  // Grid layout adapts dynamically to the exact number of participants
  const getGridConfig = (count: number) => {
    switch (count) {
      case 1:
        return "grid-cols-1 max-w-4xl";
      case 2:
        return "grid-cols-1 md:grid-cols-2 max-w-7xl";
      case 3:
        return "grid-cols-1 md:grid-cols-2 max-w-4xl"; // حجم متناسق للسطرين
      case 4:
        return "grid-cols-1 sm:grid-cols-2 max-w-5xl";
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl";
    }
  };

  return (
    <div
      dir="rtl"
      className={`flex flex-1 size-full items-center justify-center p-2 sm:p-4 overflow-hidden ${className}`}
    >
      <div
        className={`grid size-full gap-3 sm:gap-4 items-center justify-center ${getGridConfig(
          participants.length,
        )}`}
      >
        {participants.map((participant, index) => {
          // لو 3 أشخاص (اتنين معاك): الكارت التالت ينزل في  التاني في المنتصف
          const isThirdInThree = participants.length === 3 && index === 2;

          return (
            <div
              key={participant.id}
              className={`flex items-center justify-center transition-all duration-300 ${
                participants.length <= 2
                  ? "aspect-[4/3] sm:aspect-video max-h-[62vh] w-full"
                  : isThirdInThree
                    ? "aspect-video max-h-[33vh] sm:max-h-[35vh] w-full md:col-span-2 md:w-[calc(50%-0.5rem)] md:mx-auto"
                    : "aspect-video max-h-[33vh] sm:max-h-[35vh] w-full"
              }`}
            >
              <ParticipantVideo participant={participant} className="size-full" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
