import React from "react";
import { Star } from "lucide-react";

export interface RecentSessionCardProps {
  subject: string;
  time: string;
  attendees: string;
  rating: number; // 1 to 5
  progress: number; // 0 to 100
}

export function RecentSessionCard({
  subject,
  time,
  attendees,
  rating,
  progress,
}: RecentSessionCardProps) {
  return (
    <div
      dir="rtl"
      className="w-full rounded-[28px] border border-slate-200 bg-white p-5 sm:p-6 shadow-xs"
    >
      {/* Top Row: Subject & Info on Right, Stars on Left */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-[#103B3E] sm:text-lg">
            {subject}
          </h3>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            {time} · مع {attendees}
          </p>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1" dir="ltr">
          {[1, 2, 3, 4, 5].map((star) => {
            const isFilled = star <= rating;
            return (
              <Star
                key={star}
                size={18}
                className={
                  isFilled
                    ? "fill-[#FFCA32] text-[#FFCA32]"
                    : "text-slate-300"
                }
                strokeWidth={1.8}
              />
            );
          })}
        </div>
      </div>

      {/* Bottom Row: Percentage and Progress Bar */}
      <div className="mt-5 flex items-center gap-3" dir="ltr">
        <span className="min-w-9 text-xs font-bold text-[#103B3E] sm:text-sm">
          {progress}%
        </span>

        <div className="relative h-2 w-full overflow-hidden rounded-full bg-[#DDF5FF]">
          <div
            className="h-full rounded-full bg-[#17A6D1] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
