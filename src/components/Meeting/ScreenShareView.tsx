
"use client";

import { useEffect, useRef, useState } from "react";
import {
  MonitorUp,
  Maximize2,
  Minimize2,
  X,
} from "lucide-react";

export interface ScreenShareViewProps {
  stream: MediaStream;
  onStopSharing?: () => void;
  presenterName?: string;
  className?: string;
}

export default function ScreenShareView({
  stream,
  onStopSharing,
  presenterName = "مي (أنت)",
  className = "",
}: ScreenShareViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  // Attach Screen Stream & Detect Natural Aspect Ratio
  useEffect(() => {
    const video = videoRef.current;

    if (!video || !stream) return;

    video.srcObject = stream;

    const updateRatio = () => {
      if (video.videoWidth && video.videoHeight) {
        setAspectRatio(video.videoWidth / video.videoHeight);
      }
    };

    video.addEventListener("loadedmetadata", updateRatio);
    video.addEventListener("resize", updateRatio);

    video.play().catch((error) => {
      console.warn("Screen stream playback failed:", error);
    });

    return () => {
      video.removeEventListener("loadedmetadata", updateRatio);
      video.removeEventListener("resize", updateRatio);
      video.srcObject = null;
    };
  }, [stream]);

  // Fullscreen Listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        document.fullscreenElement === containerRef.current
      );
    };

    document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  // Toggle Fullscreen
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await containerRef.current?.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.warn("Fullscreen toggle failed:", error);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`
        group relative
        flex items-center justify-center
        w-full h-full
        min-w-0 min-h-0
        overflow-hidden
        ${className}
      `}
    >
      {/* Video Frame Wrapper - Fits stream aspect ratio exactly, never cropped, no empty black sides */}
      <div
        style={{ aspectRatio: aspectRatio || 16 / 9 }}
        className="relative flex items-center justify-center max-w-full max-h-full w-auto h-auto overflow-hidden rounded-xl shadow-2xl border border-[#1b434b]/60"
      >
        {/* Shared Screen */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="size-full object-contain block rounded-xl"
        />

        {/* Top Overlay - Attached directly to video frame */}
        <div
          className="
            pointer-events-none
            absolute inset-x-0 top-0 z-20
            flex items-start justify-between
            gap-3 p-3 sm:p-4
          "
        >
          {/* Presenter Info */}
          <div
            className="
              pointer-events-auto
              flex items-center gap-2
              rounded-full
              bg-[#202124]/85
              px-3.5 py-2
              text-xs sm:text-sm
              font-medium text-white
              shadow-lg
              backdrop-blur-md
              border border-white/10
            "
          >
            <MonitorUp
              size={16}
              className="text-[#17a6d1] shrink-0"
            />

            <span>
              {presenterName} يشارك الشاشة الآن
            </span>
          </div>

          {/* Actions */}
          <div
            className="
              pointer-events-auto
              flex items-center gap-2
            "
          >
            {/* Fullscreen */}
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={
                isFullscreen
                  ? "تصغير الشاشة"
                  : "تكبير الشاشة"
              }
              title={
                isFullscreen
                  ? "تصغير الشاشة"
                  : "تكبير الشاشة"
              }
              className="
                flex size-9 items-center justify-center
                rounded-full
                bg-[#202124]/85
                text-white
                border border-white/10
                backdrop-blur-md
                transition-colors
                hover:bg-white/20
                cursor-pointer
              "
            >
              {isFullscreen ? (
                <Minimize2 size={17} />
              ) : (
                <Maximize2 size={17} />
              )}
            </button>

            {/* Stop Sharing */}
            {onStopSharing && (
              <button
                type="button"
                onClick={onStopSharing}
                className="
                  flex items-center gap-2
                  rounded-full
                  bg-[#ea4335]
                  px-3.5 py-2
                  text-xs sm:text-sm
                  font-semibold text-white
                  shadow-lg
                  transition-colors
                  hover:bg-[#d93025]
                  cursor-pointer
                "
              >
                <X size={15} />
                <span>إيقاف المشاركة</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
