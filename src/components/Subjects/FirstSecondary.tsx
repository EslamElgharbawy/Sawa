"use client";

import { Check, Church, Circle, LucideIcon, Moon } from "lucide-react";
import { FIRST_SECONDARY_SUBJECTS } from "../../app/data/StudyOptions";
import {
  FirstSecondarySubject,
  SecondarySubject,
  SecondLanguage,
} from "@/src/types/StudySubjects";
import {
  BookOpen,
  Languages,
  Calculator,
  FlaskConical,
  Landmark,
  Brain,
  Code,
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
  islamic_religion: Moon,
  christian_religion: Church,
  second_language: Globe,
};
interface FirstSecondaryProps {
  selectedSubjects: SecondarySubject[];
  onChange: (subjects: SecondarySubject[]) => void;
  selectedSecondLanguage?: SecondLanguage;
  onSecondLanguageChange: (language: SecondLanguage | undefined) => void;
}
export default function FirstSecondary({
  selectedSubjects,
  onChange,
  selectedSecondLanguage,
  onSecondLanguageChange,
}: FirstSecondaryProps) {
  const toggleSubject = (subject: FirstSecondarySubject) => {
    const isSelected = selectedSubjects.includes(subject);

    onChange(
      isSelected
        ? selectedSubjects.filter((item) => item !== subject)
        : [...selectedSubjects, subject],
    );

    if (subject === "second_language" && isSelected) {
      onSecondLanguageChange(undefined);
    }
  };

  return (
    <section dir="rtl" className="w-full">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 2xl:grid-cols-3">
        {FIRST_SECONDARY_SUBJECTS.map((subject) => {
          const isSelected = selectedSubjects.includes(subject.value);
          const SubjectIcon = SUBJECT_ICONS[subject.value];
          return (
            <button
              key={subject.value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => {
                toggleSubject(subject.value);

                if (subject.value === "second_language" && isSelected) {
                  onSecondLanguageChange(undefined);
                }
              }}
              className={`
                group min-h-28 cursor-pointer space-y-4
                rounded-[28px] border-2
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
      {selectedSubjects.includes("second_language") && (
        <div className="mt-7 rounded-2xl border border-secondary/20 bg-[#DDF5FF]/50 p-4 lg:p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-primary">
              اختار اللغة الأجنبية الثانية:
            </h3>
            <p className="text-xs text-slate-500">اختار لغة واحدة</p>
          </div>

          <div className="grid grid-cols-1 gap-2 xl:grid-cols-3">
            {(
              [
                ["french", "الفرنسية"],
                ["german", "الألمانية"],
                ["italian", "الإيطالية"],
                ["spanish", "الإسبانية"],
              ] as const
            ).map(([value, label]) => {
              const isSelected = selectedSecondLanguage === value;

              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => onSecondLanguageChange(value)}
                  className={`
              flex items-center gap-3 rounded-xl border-2 p-4
              text-right transition-all duration-300 cursor-pointer
              ${
                isSelected
                  ? "border-secondary bg-white text-primary"
                  : "border-slate-200 bg-white text-slate-500 hover:border-secondary/60"
              }
            `}
                >
                  <span className="font-bold">{label}</span>

                  {isSelected && (
                    <Check size={20} className="mr-auto text-secondary" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {selectedSubjects.length === 0 && (
        <p className="mt-4 text-sm text-slate-500">
          اختار مادة واحدة على الأقل عشان نكمل.
        </p>
      )}
    </section>
  );
}
