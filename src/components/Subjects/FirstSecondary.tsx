"use client";

import { Check, Circle, LucideIcon } from "lucide-react";
import { FIRST_SECONDARY_SUBJECTS } from "../../components/StudyMatching/StudyOptions";
import {
  FirstSecondarySubject,
  SecondarySubject,
} from "@/src/types/StudySubjects";
import {
  BookOpen,
  Languages,
  Calculator,
  FlaskConical,
  Landmark,
  Brain,
  Code,
  BookHeart,
  Dumbbell,
  Globe,
} from "lucide-react";

const SUBJECT_ICONS: Record<FirstSecondarySubject, LucideIcon> = {
  arabic: BookOpen,
  english: Languages,
  math: Calculator,
  integrated_science: FlaskConical,
  history: Landmark,
  philosophy: Brain,
  programming: Code,
  religion: BookHeart,
  second_language: Globe,
  physical_education: Dumbbell,
};
interface FirstSecondaryProps {
  selectedSubjects: SecondarySubject[];
  onChange: (subjects: SecondarySubject[]) => void;
}

export default function FirstSecondary({
  selectedSubjects,
  onChange,
}: FirstSecondaryProps) {
  const toggleSubject = (subject: FirstSecondarySubject) => {
    const isSelected = selectedSubjects.includes(subject);

    onChange(
      isSelected
        ? selectedSubjects.filter((item) => item !== subject)
        : [...selectedSubjects, subject],
    );
  };

  return (
    <section dir="rtl" className="w-full">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {FIRST_SECONDARY_SUBJECTS.map((subject) => {
          const isSelected = selectedSubjects.includes(subject.value);
          const SubjectIcon = SUBJECT_ICONS[subject.value];
          return (
            <button
              key={subject.value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => toggleSubject(subject.value)}
              className={`
                group min-h-25 cursor-pointer space-y-4
                flex-col rounded-[28px] border-2
                p-4 text-right transition-all duration-300
                hover:border-secondary/70
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-secondary
                focus-visible:ring-offset-2
                ${
                  isSelected
                    ? "border-secondary bg-[#DDF5FF] text-primary shadow-sm"
                    : "border-slate-300 bg-white text-primary hover:bg-slate-50"
                }
              `}
            >
              <div className="flex justify-between items-center relative">
                {/* Selection Indicator */}
              <span className="absolute left-0 top-0 flex size-6 items-center justify-center">
                {isSelected ? (
                  <span className="flex size-6 items-center justify-center rounded-full bg-secondary text-white">
                    <Check size={15} strokeWidth={3} />
                  </span>
                ) : (
                  <Circle
                    size={24}
                    strokeWidth={1.8}
                    className="text-slate-300"
                  />
                )}
              </span>

              {/* Subject Icon */}
              <SubjectIcon
                size={22}
                strokeWidth={1.9}
                className="text-secondary"
              />

              </div>
              {/* Subject Name */}
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
