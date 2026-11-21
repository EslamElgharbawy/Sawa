
"use client";

import { Participant } from "@/src/types/Meeting";
import ParticipantVideo from "./ParticipantVideo";
import ScreenShareView from "./ScreenShareView";

export interface MeetingStageProps {
  participants: Participant[];
  className?: string;
  isQuietSession?: boolean;
  screenStream?: MediaStream | null;
  onStopScreenShare?: () => void;
}

export default function MeetingStage({
  participants,
  className = "",
  isQuietSession = false,
  screenStream = null,
  onStopScreenShare,
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

  // Screen Sharing Layout
  if (screenStream) {
    const isScrollable = participants.length > 3;

    return (
      <div
        dir="rtl"
        className={`
          flex flex-1 min-h-0 min-w-0 w-full
          flex-col md:flex-row
          items-stretch justify-center
          gap-3 sm:gap-4
          overflow-hidden
          p-2 sm:p-3
          ${className}
        `}
      >
        {/* Main Presentation Area */}
        <div className="
          relative
          flex-1
          min-h-0 min-w-0
          size-full
          flex items-center justify-center
          overflow-hidden
        ">
          <ScreenShareView
            stream={screenStream}
            onStopSharing={onStopScreenShare}
            className="size-full"
          />
        </div>

        {/* Participants Filmstrip */}
        <div className={`
          flex
          w-full md:w-[260px] lg:w-[300px] xl:w-[340px]
          shrink-0
          flex-row md:flex-col
          gap-2.5 sm:gap-3
          ${
            isScrollable
              ? "overflow-x-auto md:overflow-x-hidden overflow-y-hidden md:overflow-y-auto"
              : "overflow-hidden"
          }
          h-28 sm:h-32 md:h-full
          pb-1 md:pb-0
          scrollbar-thin
          scrollbar-thumb-white/20
        `}>
          {participants.map((participant) => (
            <div
              key={participant.id}
              className={`
                relative
                w-40 sm:w-48 md:w-full
                shrink-0
                overflow-hidden
                rounded-xl sm:rounded-2xl
                ${
                  isScrollable
                    ? "h-full md:h-[180px] md:shrink-0"
                    : "h-full md:flex-1 md:min-h-0"
                }
              `}
            >
              <ParticipantVideo
                participant={participant}
                className="size-full"
                isQuietSession={isQuietSession}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default Meeting Layout
  return (
    <div
      dir="rtl"
      className={`
        flex flex-1 min-h-0 w-full
        items-center justify-center
        overflow-hidden
        px-2 py-2 sm:p-4
        ${className}
      `}
    >
      <div
        className={`
          grid
          h-full min-h-0 w-full
          content-center
          items-center
          justify-items-center
          gap-3 sm:gap-5
          ${getGridConfig(participants.length)}
        `}
      >
        {participants.map((participant, index) => {
          const isThirdInThree =
            participants.length === 3 && index === 2;

          return (
            <div
              key={participant.id}
              className={`
                flex w-full
                items-center justify-center
                transition-all duration-300
                ${
                  participants.length <= 2
                    ? "aspect-4/3 sm:aspect-video max-h-[62vh]"
                    : isThirdInThree
                      ? "aspect-video max-h-[35vh] md:col-span-2 md:w-[calc(50%-0.625rem)] md:mx-auto"
                      : "aspect-video max-h-[35vh]"
                }
              `}
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
