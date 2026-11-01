
"use client";

import { UsersRound } from "lucide-react";

type StepPeopleProps = {
  peopleCount: number | null;
  onChange: (count: number) => void;
};

const PEOPLE_OPTIONS = [1, 2, 3, 4];

export default function StepPeople({
  peopleCount,
  onChange,
}: StepPeopleProps) {
  return (
    <div dir="rtl" className="flex flex-col gap-6">
      <p className="text-sm font-medium text-slate-500 sm:text-base">
        اختار عدد الأشخاص اللي حابب يذاكروا معاك.
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {PEOPLE_OPTIONS.map((count) => {
          const isSelected = peopleCount === count;

          return (
            <button
              key={count}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onChange(count)}
              className={`
                flex h-[110px] cursor-pointer flex-col items-center
                justify-center gap-2 rounded-[30px] border-2
                transition-all duration-200
                ${
                  isSelected
                    ? "border-secondary bg-[#DDF5FF] text-primary"
                    : "border-slate-300 bg-white text-slate-500 hover:border-secondary/60"
                }
              `}
            >
              <UsersRound size={24} strokeWidth={2} />

              <span className="text-2xl font-bold">{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
