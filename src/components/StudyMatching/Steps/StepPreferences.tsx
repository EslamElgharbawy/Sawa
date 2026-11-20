"use client";

import { GoalOption, MediaOption, StepPreferencesProps, StyleOption } from "@/src/types/StudyPreferences";
import {
  Check,
  Circle,
  Moon,
  MessageCircle,
  BookOpen,
  Target,
  FileCheck2,
  UsersRound,
  Video,
  Mic,
} from "lucide-react";

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

const GOAL_OPTIONS: GoalOption[] = [
  {
    id: "study",
    title: "مذاكرة",
    description: "عايز تفهم وتراجع الدروس.",
    icon: BookOpen,
  },
  {
    id: "homework",
    title: "واجب",
    description: "عايز تخلص واجب محدد.",
    icon: Target,
  },
  {
    id: "revision",
    title: "مراجعة",
    description: "مراجعة وحل أسئلة على اللي ذاكرته.",
    icon: FileCheck2,
  },
];

const PEOPLE_OPTIONS = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4 أو أكثر" },
];

const MEDIA_OPTIONS: MediaOption[] = [
  {
    id: "mic_and_cam",
    title: "كاميرا ومايك",
    description: "تفاعل كامل بالصوت والصورة أثناء الجلسة.",
    icon: Video,
  },
  {
    id: "mic_only",
    title: "مايك فقط",
    description: "تواصل صوتي ومناقشة بدون فتح الكاميرا.",
    icon: Mic,
  },
];

export default function StepPreferences({
  studyStyle,
  goal,
  peopleCount,
  mediaPreference,
  onStudyStyleChange,
  onGoalChange,
  onPeopleCountChange,
  onMediaPreferenceChange,
}: StepPreferencesProps) {
  return (
    <div dir="rtl" className="w-full space-y-8">
      {/* 1. Study Style Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-[#103B3E] sm:text-lg">
            طريقة المذاكرة
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {STYLE_OPTIONS.map((option) => {
            const Icon = option.icon;
            const isSelected = studyStyle === option.id;

            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => {
                  const nextStyle = isSelected ? null : option.id;
                  onStudyStyleChange(nextStyle);
                  if (nextStyle !== "discussion") {
                    onMediaPreferenceChange?.(null);
                  }
                }}
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
                    className={
                      isSelected ? "text-[#17A6D1]" : "text-[#17A6D1]/80"
                    }
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

        {/* Media Preferences (Conditional on discussion) */}
        {studyStyle === "discussion" && (
          <div className="rounded-2xl border border-[#17A6D1]/20 bg-[#DDF5FF]/50 p-4 lg:p-5 transition-all duration-300">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-sm font-bold text-[#103B3E]">
                حدد وسيلة التواصل:
              </h4>
              <p className="text-xs text-slate-500">
                اختار الطريقة المناسبة ليك في النقاش
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {MEDIA_OPTIONS.map((option) => {
                const Icon = option.icon;
                const isSelected = mediaPreference === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() =>
                      onMediaPreferenceChange?.(isSelected ? null : option.id)
                    }
                    className={`
                      relative flex min-h-30 cursor-pointer flex-col justify-between
                      rounded-xl border-2 p-4 text-right transition-all duration-300 bg-white 
                      ${
                        isSelected
                          ? "border-[#17A6D1] shadow-xs"
                          : "border-slate-200 hover:border-secondary/60"
                      }
                    `}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span
                        className={
                          isSelected ? "text-[#17A6D1]" : "text-[#17A6D1]/80"
                        }
                      >
                        <Icon size={22} strokeWidth={1.8} />
                      </span>
                      <span className="flex size-5 items-center justify-center">
                        {isSelected ? (
                          <span className="flex size-5 items-center justify-center rounded-full bg-[#17A6D1] text-white">
                            <Check size={12} strokeWidth={3} />
                          </span>
                        ) : (
                          <Circle
                            size={18}
                            className="text-slate-300"
                            strokeWidth={1.8}
                          />
                        )}
                      </span>
                    </div>

                    <div className="mt-2">
                      <h5 className="text-base font-bold text-[#103B3E]">
                        {option.title}
                      </h5>
                      <p className="mt-0.5 text-[13px] leading-4 text-slate-500">
                        {option.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 2. Study Goal Section */}
      <div className="space-y-6 border-t border-slate-100 pt-8">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-[#103B3E] sm:text-lg">
            إيه هدفك من المذاكرة؟
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {GOAL_OPTIONS.map((option) => {
            const Icon = option.icon;
            const isSelected = goal === option.id;

            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onGoalChange(isSelected ? null : option.id)}
                className={`
                  relative flex min-h-[140px] cursor-pointer flex-col justify-between
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
                    className={
                      isSelected ? "text-[#17A6D1]" : "text-[#17A6D1]/80"
                    }
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

      {/* 3. People Count Section */}
      <div className="space-y-6 border-t border-slate-100 pt-8">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-[#103B3E] sm:text-lg">
            هتذاكر مع كام شخص؟
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {PEOPLE_OPTIONS.map((option) => {
            const isSelected = peopleCount === option.value;

            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onPeopleCountChange(isSelected ? null : option.value)}
                className={`
                  flex h-[110px] cursor-pointer flex-col items-center
                  justify-center gap-2 rounded-2xl border-2 px-2 text-center
                  transition-all duration-200
                  ${
                    isSelected
                      ? "border-[#17A6D1] bg-[#DDF5FF] text-[#103B3E] shadow-xs"
                      : "border-slate-200 bg-white text-slate-500 hover:border-[#17A6D1]/60 hover:bg-slate-50/50"
                  }
                `}
              >
                <UsersRound
                  size={22}
                  strokeWidth={2}
                  className={isSelected ? "text-[#17A6D1]" : "text-slate-400"}
                />

                <span
                  className={
                    option.value === 4
                      ? "text-base font-extrabold leading-tight "
                      : "text-xl font-extrabold"
                  }
                >
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
