
"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Participant } from "@/src/types/Meeting";
import { MATCHED_STUDENTS } from "@/src/app/data/matchedStudents";

export function useMeetingRoom() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Session Info
  const subjectParam = searchParams.get("subject") || "كيمياء";
  const goalParam = searchParams.get("goal") || "مذاكرة";
  const styleParam = searchParams.get("style") || "تفاعل ونقاش";
  const styleIdParam = searchParams.get("styleId");
  const mediaParam = searchParams.get("media");

  const sessionTitle = `جلسة ${subjectParam}`;
  const sessionSubtitle = `${goalParam} • ${styleParam}`;

  // Session Rules
  const isQuietSession =
    styleIdParam === "quiet" || styleParam.includes("هدوء");

  const isMicOnly = mediaParam === "mic_only";

  const isMicDisabled = isQuietSession;
  const isVideoDisabled = isQuietSession || isMicOnly;

  // Media & UI States
  const [isMuted, setIsMuted] = useState(isMicDisabled);
  const [isVideoOff, setIsVideoOff] = useState(isVideoDisabled);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);

  // Timer State
  const [seconds, setSeconds] = useState(0);

  // Speaking State (Temporary - For Testing)
  const [speakingIds, setSpeakingIds] = useState<string[]>(
    isMicDisabled ? [] : ["participant-local"]
  );

  // Reset Session State & Start Timer
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

  // Format Timer
  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");

    const secs = (totalSeconds % 60)
      .toString()
      .padStart(2, "0");

    return `${mins}:${secs}`;
  };

  const timer = formatTimer(seconds);

  // Selected Students
  const studentIdsParam = searchParams.get("students");

  const selectedIds = studentIdsParam
    ? studentIdsParam.split(",")
    : ["student-1"];

  const matchedChosenStudents = MATCHED_STUDENTS.filter((student) =>
    selectedIds.includes(student.id)
  );

  // Other Participants
  const otherParticipants: Participant[] = (
    matchedChosenStudents.length > 0
      ? matchedChosenStudents
      : [MATCHED_STUDENTS[0]]
  ).map((student) => ({
    id: student.id,
    name: student.name,
    avatarLetter: student.avatarLetter,
    avatarBg: student.avatarBg,
    isMuted: isQuietSession,
    isVideoOff: isQuietSession || isMicOnly,
    isSpeaking: isQuietSession ? false : speakingIds.includes(student.id),
    isLocal: false,
  }));

  // Local Participant
  const isLocalSpeaking =
    speakingIds.includes("participant-local") && !isMuted;

  const localParticipant: Participant = {
    id: "participant-local",
    name: "مي",
    avatarLetter: "م",
    avatarBg: "bg-[#17a6d1]",
    isMuted,
    isVideoOff,
    isSpeaking: isLocalSpeaking,
    isLocal: true,
    isHandRaised,
  };

  // All Participants
  const participants: Participant[] = [
    ...otherParticipants,
    localParticipant,
  ];

  // Temporary Speaking Toggle (For Testing)
  const toggleParticipantSpeaking = (id: string) => {
    setSpeakingIds((prev) =>
      prev.includes(id)
        ? prev.filter((participantId) => participantId !== id)
        : [...prev, id]
    );
  };

  // Toggle Mute
  const handleToggleMute = () => {
    if (isMicDisabled) return;

    setIsMuted((prev) => {
      const next = !prev;

      if (next) {
        setSpeakingIds((ids) =>
          ids.filter((id) => id !== "participant-local")
        );
      } else {
        setSpeakingIds((ids) => [...ids, "participant-local"]);
      }

      return next;
    });
  };

  // Toggle Video
  const handleToggleVideo = () => {
    if (isVideoDisabled) return;

    setIsVideoOff((prev) => !prev);
  };

  // Toggle Raised Hand
  const handleToggleHandRaise = () => {
    setIsHandRaised((prev) => !prev);
  };

  // Toggle Chat
  const handleToggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  // Toggle Screen Sharing
  const handleToggleScreenShare = async () => {
    if (isScreenSharing) {
      if (screenStream) {
        screenStream.getTracks().forEach((track) => track.stop());
        setScreenStream(null);
      }
      setIsScreenSharing(false);
      return;
    }

    if (
      typeof window === "undefined" ||
      !navigator.mediaDevices?.getDisplayMedia
    ) {
      console.warn("مشاركة الشاشة غير مدعومة في هذا المتصفح.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });

      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.onended = () => {
          stream.getTracks().forEach((track) => track.stop());
          setScreenStream(null);
          setIsScreenSharing(false);
        };
      }

      setScreenStream(stream);
      setIsScreenSharing(true);
    } catch (error) {
      // User cancelled picker or permission denied
      console.log("تم إلغاء مشاركة الشاشة أو رفض الإذن:", error);
    }
  };

  // Cleanup stream on unmount
  useEffect(() => {
    return () => {
      if (screenStream) {
        screenStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [screenStream]);

  // End Meeting
  const handleEndMeeting = () => {
    if (screenStream) {
      screenStream.getTracks().forEach((track) => track.stop());
      setScreenStream(null);
    }

    setIsHandRaised(false);
    setIsChatOpen(false);
    setIsScreenSharing(false);

    router.push("/MeetingFeedback");
  };

  return {
    // Session Info
    sessionTitle,
    sessionSubtitle,
    isQuietSession,

    // Participants
    participants,

    // Timer
    timer,

    // Media States
    isMuted,
    isVideoOff,
    isMicDisabled,
    isVideoDisabled,

    // UI States
    isHandRaised,
    isChatOpen,
    isScreenSharing,
    screenStream,

    // Actions
    handleToggleMute,
    handleToggleVideo,
    handleToggleHandRaise,
    handleToggleChat,
    handleToggleScreenShare,
    handleEndMeeting,

    // Testing
    toggleParticipantSpeaking,
  };
}
