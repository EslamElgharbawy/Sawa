"use client";

import {
  Check,
  Circle,
  Moon,
  MessageCircle,
  Sun,
  Sunset,
  MoonStar,
  Clock,
  LucideIcon,
} from "lucide-react";
import { StudyStyle, StudyTime } from "@/src/types/StudyMatching";

interface StepPreferencesProps {
  studyStyle: StudyStyle | null;
  studyTime: StudyTime | null;
  onStudyStyleChange: (style: StudyStyle) => void;
  onStudyTimeChange: (time: StudyTime) => void;
}

interface StyleOption {
  id: StudyStyle;
  title: string;
  description: string;
  icon: LucideIcon;
}

interface TimeOption {
  id: StudyTime;
  title: string;
  timeRange: string;
  icon: LucideIcon;
}

const STYLE_OPTIONS: StyleOption[] = [
  {
    id: "discussion",
    title: "تفاعل ونقاش",
    description: "نتكلم ونناقش ونساعد بعض أثناء المذاكرة.",
    icon: MessageCircle,
  },
  {
    id: "quiet",
    title: "هدوء",
    description: "من غير كلام، كل واحد يذاكر مع وجود الآخرين.",
    icon: Moon,
  },
];

const TIME_OPTIONS: TimeOption[] = [
  {
    id: "morning",
    title: "الصبح (صباحاً)",
    timeRange: "من 8 ص إلى 12 ظهراً",
    icon: Sun,
  },
  {
    id: "afternoon",
    title: "بعد الظهر",
    timeRange: "من 12 ظهراً إلى 6 مساءً",
    icon: Sunset,
  },
  {
    id: "night",
    title: "بالليل (مساءً)",
    timeRange: "من 6 م إلى 12 منتصف الليل",
    icon: MoonStar,
  },
  {
    id: "anytime",
    title: "أي وقت مناسب",
    timeRange: "مرن ومتاح في أي وقت",
    icon: Clock,
  },
];

export default function StepPreferences({
  studyStyle,
  studyTime,
  onStudyStyleChange,
  onStudyTimeChange,
}: StepPreferencesProps) {
  return (
    <div dir="rtl" className="w-full space-y-10">
      {/* 1. Study Style Section */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {STYLE_OPTIONS.map((option) => {
            const Icon = option.icon;
            const isSelected = studyStyle === option.id;

            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onStudyStyleChange(option.id)}
                className={`
                  relative flex min-h-[130px] cursor-pointer flex-col justify-between
                  rounded-2xl border-2 p-5 text-right transition-all duration-300
                  ${
                    isSelected
                      ? "border-[#17A6D1] bg-[#DDF5FF] text-[#103B3E] shadow-xs"
                      : "border-slate-200 bg-white text-slate-700 hover:border-[#17A6D1]/60 hover:bg-slate-50/50"
                  }
                `}
              >
                <div className="flex w-full items-center justify-between">
                  <span
                    className={isSelected ? "text-[#17A6D1]" : "text-slate-400"}
                  >
                    <Icon size={24} strokeWidth={1.8} />
                  </span>
                  <span className="flex size-6 items-center justify-center">
                    {isSelected ? (
                      <span className="flex size-6 items-center justify-center rounded-full bg-[#17A6D1] text-white">
                        <Check size={14} strokeWidth={3} />
                      </span>
                    ) : (
                      <Circle
                        size={22}
                        className="text-slate-300"
                        strokeWidth={1.8}
                      />
                    )}
                  </span>
                </div>

                <div className="mt-3">
                  <h4 className="text-base font-bold text-[#103B3E]">
                    {option.title}
                  </h4>
                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    {option.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Preferred Time Section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-sm xl:text-base font-bold text-[#103B3E]">
            الوقت المفضل للمذاكرة:
          </h3>
          <p className="text-xs xl:text-sm text-slate-500 mt-0.5">
            حدد الفترة اللي بتفضل تذاكر فيها عشان نلاقي ناس متوافقين معاك في نفس
            التوقيت.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TIME_OPTIONS.map((option) => {
            const Icon = option.icon;
            const isSelected = studyTime === option.id;

            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onStudyTimeChange(option.id)}
                className={`
                  relative flex min-h-[120px] cursor-pointer flex-col justify-between
                  rounded-2xl border-2 p-3 text-right transition-all duration-300
                  ${
                    isSelected
                      ? "border-[#17A6D1] bg-[#DDF5FF] text-[#103B3E] shadow-xs"
                      : "border-slate-200 bg-white text-slate-700 hover:border-[#17A6D1]/60 hover:bg-slate-50/50"
                  }
                `}
              >
                <div className="flex w-full items-center justify-between">
                  <span
                    className={isSelected ? "text-[#17A6D1]" : "text-slate-400"}
                  >
                    <Icon size={22} strokeWidth={1.8} />
                  </span>
                  <span className="flex size-6 items-center justify-center">
                    {isSelected ? (
                      <span className="flex size-6 items-center justify-center rounded-full bg-[#17A6D1] text-white">
                        <Check size={14} strokeWidth={3} />
                      </span>
                    ) : (
                      <Circle
                        size={22}
                        className="text-slate-300"
                        strokeWidth={1.8}
                      />
                    )}
                  </span>
                </div>

                <div className="mt-3">
                  <h4 className="text-sm font-bold text-[#103B3E]">
                    {option.title}
                  </h4>
                  <p className="mt-1 text-xs leading-4 text-slate-500">
                    {option.timeRange}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
