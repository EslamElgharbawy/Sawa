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
      className={`flex items-center justify-center gap-2.5 py-3 select-none ${className}`}
    >
      {/* 1. Mic Button (Cyan by default when ON, dark or red when muted) */}
      <ControlButton
        icon={isMuted ? MicOff : Mic}
        label={isMuted ? "إلغاء كتم الصوت" : "كتم الصوت"}
        onClick={onToggleMute}
        variant={isMuted ? "secondary" : "primary"}
      />

      {/* 2. Camera Button (Cyan by default when ON, dark or red when off) */}
      <ControlButton
        icon={isVideoOff ? VideoOff : Video}
        label={isVideoOff ? "تشغيل الكاميرا" : "إيقاف الكاميرا"}
        onClick={onToggleVideo}
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
