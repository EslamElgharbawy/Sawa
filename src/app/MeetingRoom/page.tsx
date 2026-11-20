"use client";

import { useState, useEffect, Suspense } from "react";
import MeetingHeader from "@/src/components/Meeting/MeetingHeader";
import MeetingStage from "@/src/components/Meeting/MeetingStage";
import MeetingControls from "@/src/components/Meeting/MeetingControls";
import { Participant } from "@/src/types/Meeting";
import { MATCHED_STUDENTS } from "@/src/app/data/matchedStudents";
import { useRouter, useSearchParams } from "next/navigation";

function MeetingRoomContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Dynamic Subject & Subtitle from selection
  const subjectParam = searchParams.get("subject") || "كيمياء";
  const goalParam = searchParams.get("goal") || "مذاكرة";
  const styleParam = searchParams.get("style") || "تفاعل ونقاش";
  const styleIdParam = searchParams.get("styleId");
  const mediaParam = searchParams.get("media");

  const sessionTitle = `جلسة ${subjectParam}`;
  const sessionSubtitle = `${goalParam} • ${styleParam}`;

  // Session rules (Disabled & Locked state)
  const isQuietSession = styleIdParam === "quiet" || styleParam.includes("هدوء");
  const isMicOnly = mediaParam === "mic_only";

  const isMicDisabled = isQuietSession;
  const isVideoDisabled = isQuietSession || isMicOnly;

  // Local user media states
  const [isMuted, setIsMuted] = useState(isMicDisabled);
  const [isVideoOff, setIsVideoOff] = useState(isVideoDisabled);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  // Timer state
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setSeconds(0);
    setIsHandRaised(false);
    setIsChatOpen(false);
    setIsScreenSharing(false);
    setIsMuted(isMicDisabled);
    setIsVideoOff(isVideoDisabled);
    setSpeakingIds(isMicDisabled ? [] : ["participant-local"]);

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [searchParams, isMicDisabled, isVideoDisabled]);
  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (totalSeconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  // 2. Dynamic Participants based on actual user selection
  const studentIdsParam = searchParams.get("students");
  const selectedIds = studentIdsParam
    ? studentIdsParam.split(",")
    : ["student-1"];

  const matchedChosenStudents = MATCHED_STUDENTS.filter((s) =>
    selectedIds.includes(s.id),
  );

  // التحكم بحالة التحدث للتجربة الحية
  const [speakingIds, setSpeakingIds] = useState<string[]>(
    isMicDisabled ? [] : ["participant-local"],
  );

  const toggleParticipantSpeaking = (id: string) => {
    setSpeakingIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  // If none matched, fallback to the first student
  const otherParticipants: Participant[] = (
    matchedChosenStudents.length > 0
      ? matchedChosenStudents
      : [MATCHED_STUDENTS[0]]
  ).map((student) => ({
    id: student.id,
    name: student.name,
    avatarLetter: student.avatarLetter,
    avatarBg: student.avatarBg,
    isMuted: isQuietSession ? true : false,
    isVideoOff: isQuietSession || isMicOnly ? true : false,
    isSpeaking: isQuietSession ? false : speakingIds.includes(student.id),
    isLocal: false,
  }));

  // Combine with Local User ("مي (أنت)")
  const isLocalSpeaking = speakingIds.includes("participant-local") && !isMuted;

  const localParticipant: Participant = {
    id: "participant-local",
    name: "مي",
    avatarLetter: "م",
    avatarBg: "bg-[#17a6d1]",
    isMuted: isMuted,
    isVideoOff: isVideoOff,
    isSpeaking: isLocalSpeaking,
    isLocal: true,
    isHandRaised: isHandRaised,
  };

  const participants: Participant[] = [...otherParticipants, localParticipant];

  const handleEndMeeting = () => {
    setIsHandRaised(false);
    setIsChatOpen(false);
    setIsScreenSharing(false);
    router.push("/MeetingFeedback");
  };

  const handleToggleMute = () => {
    if (isMicDisabled) return;
    setIsMuted((prev) => {
      const next = !prev;
      if (next) {
        setSpeakingIds((ids) => ids.filter((id) => id !== "participant-local"));
      } else {
        setSpeakingIds((ids) => [...ids, "participant-local"]);
      }
      return next;
    });
  };

  const handleToggleVideo = () => {
    if (isVideoDisabled) return;
    setIsVideoOff((prev) => !prev);
  };

  return (
    <div
      dir="rtl"
      className="flex h-dvh flex-col justify-between bg-[#0e3236] text-white select-none overflow-hidden"
    >
      {/* 1. Header (Timer, Title, Sawa Logo) */}
      <MeetingHeader
        title={sessionTitle}
        subtitle={sessionSubtitle}
        timer={formatTimer(seconds)}
        raisedHandParticipants={participants.filter((p) => p.isHandRaised)}
      />

      {/* 2. Stage (Video Tiles dynamically rendered based on participant count) */}
      <MeetingStage
        participants={participants}
        isQuietSession={isQuietSession}
      />

      {/* 3. Controls (Mic, Video, Hand, Chat, ScreenShare, EndMeeting) */}
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
        onToggleHandRaise={() => setIsHandRaised((prev) => !prev)}
        onToggleChat={() => setIsChatOpen((prev) => !prev)}
        onToggleScreenShare={() => setIsScreenSharing((prev) => !prev)}
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
            <p className="text-sm text-slate-300">جاري الدخول إلى الجلسة...</p>
          </div>
        </div>
      }
    >
      <MeetingRoomContent />
    </Suspense>
  );
}
