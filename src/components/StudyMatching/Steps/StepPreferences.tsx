"use client";

import {
  Check,
  Circle,
  Moon,
  MessageCircle,
  BookOpen,
  Target,
  FileCheck2,
  UsersRound,
  LucideIcon,
} from "lucide-react";
import { StudyGoal, StudyStyle, StudyTime } from "@/src/types/StudyMatching";

interface StepPreferencesProps {
  studyStyle: StudyStyle | null;
  goal: StudyGoal | null;
  peopleCount: number | null;
  onStudyStyleChange: (style: StudyStyle | null) => void;
  onGoalChange: (goal: StudyGoal | null) => void;
  onPeopleCountChange: (count: number | null) => void;
  studyTime?: StudyTime | null;
  onStudyTimeChange?: (time: StudyTime | null) => void;
}

interface StyleOption {
  id: StudyStyle;
  title: string;
  description: string;
  icon: LucideIcon;
}

interface GoalOption {
  id: StudyGoal;
  title: string;
  description: string;
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

const PEOPLE_OPTIONS = [1, 2, 3, 4];

export default function StepPreferences({
  studyStyle,
  goal,
  peopleCount,
  onStudyStyleChange,
  onGoalChange,
  onPeopleCountChange,
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
                onClick={() =>
                  onStudyStyleChange(isSelected ? null : option.id)
                }
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
          {PEOPLE_OPTIONS.map((count) => {
            const isSelected = peopleCount === count;

            return (
              <button
                key={count}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onPeopleCountChange(isSelected ? null : count)}
                className={`
                  flex h-[110px] cursor-pointer flex-col items-center
                  justify-center gap-2 rounded-2xl border-2
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

                <span className="text-xl font-black">{count}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
