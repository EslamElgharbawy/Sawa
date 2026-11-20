"use client";

import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Hand,
  MessageSquare,
  MonitorUp,
} from "lucide-react";
import ControlButton from "./ControlButton";
import EndMeetingButton from "./EndMeetingButton";

export interface MeetingControlsProps {
  isMuted?: boolean;
  isVideoOff?: boolean;
  isMicDisabled?: boolean;
  isVideoDisabled?: boolean;
  isHandRaised?: boolean;
  isChatOpen?: boolean;
  isScreenSharing?: boolean;
  onToggleMute?: () => void;
  onToggleVideo?: () => void;
  onToggleHandRaise?: () => void;
  onToggleChat?: () => void;
  onToggleScreenShare?: () => void;
  onEndMeeting?: () => void;
  className?: string;
}

export default function MeetingControls({
  isMuted = false,
  isVideoOff = false,
  isMicDisabled = false,
  isVideoDisabled = false,
  isHandRaised = false,
  isChatOpen = false,
  isScreenSharing = false,
  onToggleMute,
  onToggleVideo,
  onToggleHandRaise,
  onToggleChat,
  onToggleScreenShare,
  onEndMeeting,
  className = "",
}: MeetingControlsProps) {
  return (
    <div
      dir="rtl"
      className={`flex items-center justify-center gap-2.5 py-4 select-none ${className}`}
    >
      {/* 1. Mic Button */}
      <ControlButton
        icon={isMuted ? MicOff : Mic}
        label={
          isMicDisabled
            ? "المايك مغلق في هذه الجلسة"
            : isMuted
              ? "إلغاء كتم الصوت"
              : "كتم الصوت"
        }
        onClick={isMicDisabled ? undefined : onToggleMute}
        disabled={isMicDisabled}
        variant={isMuted ? "secondary" : "primary"}
      />

      {/* 2. Camera Button */}
      <ControlButton
        icon={isVideoOff ? VideoOff : Video}
        label={
          isVideoDisabled
            ? "الكاميرا مغلقة في هذه الجلسة"
            : isVideoOff
              ? "تشغيل الكاميرا"
              : "إيقاف الكاميرا"
        }
        onClick={isVideoDisabled ? undefined : onToggleVideo}
        disabled={isVideoDisabled}
        variant={isVideoOff ? "secondary" : "primary"}
      />

      {/* 3. Hand Raise Button (Dark teal circle) */}
      <ControlButton
        icon={Hand}
        label={isHandRaised ? "خفض اليد" : "رفع اليد"}
        onClick={onToggleHandRaise}
        isActive={isHandRaised}
        variant={isHandRaised ? "primary" : "secondary"}
      />

      {/* 4. Chat Button (Dark teal circle) */}
      <ControlButton
        icon={MessageSquare}
        label="المحادثة"
        onClick={onToggleChat}
        isActive={isChatOpen}
        variant={isChatOpen ? "primary" : "secondary"}
      />

      {/* 5. Screen Share Button (Dark teal circle) */}
      <ControlButton
        icon={MonitorUp}
        label={isScreenSharing ? "إيقاف المشاركة" : "مشاركة الشاشة"}
        onClick={onToggleScreenShare}
        isActive={isScreenSharing}
        variant={isScreenSharing ? "primary" : "secondary"}
      />

      {/* 6. End Meeting Button (Red Pill Button) */}
      <EndMeetingButton
        onEndMeeting={onEndMeeting || (() => {})}
        label="إنهاء الجلسة"
      />
    </div>
  );
}
