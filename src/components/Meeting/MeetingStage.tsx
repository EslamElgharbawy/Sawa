
"use client";

import { Participant } from "@/src/types/Meeting";
import ParticipantVideo from "./ParticipantVideo";

export interface MeetingStageProps {
  participants: Participant[];
  className?: string;
  isQuietSession?: boolean;
}

export default function MeetingStage({
  participants,
  className = "",
  isQuietSession = false,
}: MeetingStageProps) {
  const getGridConfig = (count: number) => {
    switch (count) {
      case 1:
        return "grid-cols-1 max-w-4xl";

      case 2:
        return "grid-cols-1 md:grid-cols-2 max-w-7xl";

      case 3:
        return "grid-cols-1 md:grid-cols-2 max-w-5xl";

      case 4:
        return "grid-cols-1 sm:grid-cols-2 max-w-6xl";

      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl";
    }
  };

  return (
    <div
      dir="rtl"
      className={`flex min-h-0 w-full flex-1 items-center justify-center overflow-hidden px-2 py-2 sm:p-4 ${className}`}
    >
      <div
        className={`grid h-full min-h-0 w-full content-center items-center justify-items-center gap-3 sm:gap-5 ${getGridConfig(
          participants.length
        )}`}
      >
        {participants.map((participant, index) => {
          const isThirdInThree =
            participants.length === 3 && index === 2;

          return (
            <div
              key={participant.id}
              className={`flex w-full items-center justify-center transition-all duration-300 ${
                participants.length <= 2
                  ? "aspect-4/3 sm:aspect-video max-h-[62vh]"
                  : isThirdInThree
                    ? "aspect-video max-h-[35vh] md:col-span-2 md:w-[calc(50%-0.625rem)] md:mx-auto"
                    : "aspect-video max-h-[35vh]"
              }`}
            >
              <ParticipantVideo
                participant={participant}
                className="size-full"
                isQuietSession={isQuietSession}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
