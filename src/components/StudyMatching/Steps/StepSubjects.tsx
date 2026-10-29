"use client";

import { StudySubject } from "@/src/types/StudyMatching";
import { BookOpen, Check, Circle } from "lucide-react";
import { SUBJECTS } from "../StudyOptions";
import { useState } from "react";

interface StepSubjectsProps {
  selectedSubjects: StudySubject[];
  onChange: (subjects: StudySubject[]) => void;
}

export default function StepSubjects({
  selectedSubjects,
  onChange,
}: StepSubjectsProps) {
  const toggleSubject = (subject: StudySubject) => {
    const isSelected = selectedSubjects.includes(subject);

    onChange(isSelected ? [] : [subject]);
  };

  return (
    <section dir="rtl" className="w-full">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {SUBJECTS.map((subject) => {
          const isSelected = selectedSubjects.includes(subject.value);

          return (
            <button
              key={subject.value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => toggleSubject(subject.value)}
              className={`
                group relative flex min-h-23 cursor-pointer
                flex-col justify-between rounded-[28px] border-2
                p-4 text-right transition-all duration-300
                hover:border-[#17a6d1]/70
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-[#17a6d1]
                focus-visible:ring-offset-2
                ${
                  isSelected
                    ? "border-[#17a6d1] bg-[#ddf4fc] text-[#103b3e] shadow-sm"
                    : "border-[#d4dce2] bg-white text-[#103b3e] hover:bg-slate-50"
                }
              `}
            >
              {/* Selection indicator */}
              <span className="absolute left-3 top-3 flex size-6 items-center justify-center">
                {isSelected ? (
                  <span className="flex size-6 items-center justify-center rounded-full bg-[#17a6d1] text-white">
                    <Check size={15} strokeWidth={3} />
                  </span>
                ) : (
                  <Circle
                    size={24}
                    strokeWidth={1.8}
                    className="text-[#d4dce2]"
                  />
                )}
              </span>

              {/* Subject icon */}
              <BookOpen
                size={22}
                strokeWidth={1.9}
                className="text-[#17a6d1]"
              />

              {/* Subject name */}
              <span className="mt-3 font-bold">{subject.label}</span>
            </button>
          );
        })}
      </div>

      {selectedSubjects.length === 0 && (
        <p className="mt-4 text-sm text-slate-500">
          اختار مادة واحدة على الأقل عشان نكمل.
        </p>
      )}
    </section>
  );
}
