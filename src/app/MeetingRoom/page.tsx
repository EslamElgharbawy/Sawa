"use client";

import { Suspense } from "react";

import MeetingHeader from "@/src/components/Meeting/MeetingHeader";
import MeetingStage from "@/src/components/Meeting/MeetingStage";
import MeetingControls from "@/src/components/Meeting/MeetingControls";
import { useMeetingRoom } from "@/src/hooks/useMeetingRoom";

function MeetingRoomContent() {
  const {
    sessionTitle,
    sessionSubtitle,
    isQuietSession,
    participants,
    timer,

    isMuted,
    isVideoOff,
    isMicDisabled,
    isVideoDisabled,

    isHandRaised,
    isChatOpen,
    isScreenSharing,
    screenStream,

    handleToggleMute,
    handleToggleVideo,
    handleToggleHandRaise,
    handleToggleChat,
    handleToggleScreenShare,
    handleEndMeeting,
  } = useMeetingRoom();

  return (
    <div
      dir="rtl"
      className="flex h-dvh flex-col justify-between bg-[#0e3236] text-white select-none overflow-hidden"
    >
      {/* Header */}
      <MeetingHeader
        title={sessionTitle}
        subtitle={sessionSubtitle}
        timer={timer}
        raisedHandParticipants={participants.filter(
          (p) => p.isHandRaised
        )}
      />

      {/* Meeting Stage */}
      <MeetingStage
        participants={participants}
        isQuietSession={isQuietSession}
        screenStream={screenStream}
        onStopScreenShare={handleToggleScreenShare}
      />

      {/* Meeting Controls */}
      <MeetingControls
        isMuted={isMuted}
        isVideoOff={isVideoOff}
        isMicDisabled={isMicDisabled}
        isVideoDisabled={isVideoDisabled}
        isHandRaised={isHandRaised}
        isChatOpen={isChatOpen}
        isScreenSharing={isScreenSharing}
        onToggleMute={handleToggleMute}
        onToggleVideo={handleToggleVideo}
        onToggleHandRaise={handleToggleHandRaise}
        onToggleChat={handleToggleChat}
        onToggleScreenShare={handleToggleScreenShare}
        onEndMeeting={handleEndMeeting}
      />
    </div>
  );
}

export default function MeetingRoomPage() {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0e3236] text-white">
          <div className="flex flex-col items-center gap-3">
            <div className="size-8 animate-spin rounded-full border-2 border-white/20 border-t-[#17a6d1]" />
            <p className="text-sm text-slate-300">
              جاري الدخول إلى الجلسة...
            </p>
          </div>
        </div>
      }
    >
      <MeetingRoomContent />
    </Suspense>
  );
}
