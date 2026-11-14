"use client";

import {
  Check,
  Circle,
  BookOpen,
  Target,
  FileCheck2,
  LucideIcon,
} from "lucide-react";
import { StudyGoal } from "@/src/types/StudyMatching";

interface StepGoalProps {
  goal: StudyGoal | null;
  onChange: (goal: StudyGoal | null) => void;
}

interface GoalOption {
  id: StudyGoal;
  title: string;
  description: string;
  icon: LucideIcon;
}

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
    description: "مراجعة وحل أسئلة على اللي ذاكرته",
    icon: FileCheck2,
  },
];

export default function StepGoal({ goal, onChange }: StepGoalProps) {
  return (
    <div dir="rtl" className="w-full">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {GOAL_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isSelected = goal === option.id;

          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onChange(isSelected ? null : option.id)}
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
              {/* Top Row: Radio Check & Icon */}
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

              {/* Bottom: Title & Description */}
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
  );
}
