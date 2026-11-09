"use client";

import {
  Check,
  Circle,
  BookOpen,
  Languages,
  Calculator,
  Landmark,
  Globe2,
  Brain,
  FlaskConical,
  Atom,
  Dna,
  LucideIcon,
  Code,
  Briefcase,
} from "lucide-react";

import { BaccalaureateSecondLanguage, SecondarySubject } from "@/src/types/StudySubjects";
import { BaccalaureateTrack } from "@/src/types/StudyEducation";

import { BACCALAUREATE_YEAR_TWO_SUBJECTS } from "../../app/data/StudyOptions";
import useToggleSelection from "@/src/hooks/useToggleSelection";

const SUBJECT_ICONS: Partial<Record<SecondarySubject, LucideIcon>> = {
  arabic: BookOpen,
  english: Languages,
  first_language: Languages,
  math: Calculator,
  physics: Atom,
  chemistry: FlaskConical,
  biology: Dna,
  geography: Globe2,
  history: Landmark,
  egyptian_history: Landmark,
  psychology: Brain,
  programming_ai: Code,
  accounting: Calculator,
  business_management: Briefcase,
  second_language: Languages,
};

interface Props {
  academicTrack: BaccalaureateTrack;
  selectedSubjects: SecondarySubject[];
  onChange: (subjects: SecondarySubject[]) => void;
  selectedSecondLanguage?: BaccalaureateSecondLanguage;
  onSecondLanguageChange: (
    language: BaccalaureateSecondLanguage | undefined,
  ) => void;
}

export default function BaccalaureateSecondary({
  academicTrack,
  selectedSubjects,
  onChange,
  selectedSecondLanguage,
  onSecondLanguageChange,
}: Props) {
  const subjects = BACCALAUREATE_YEAR_TWO_SUBJECTS[academicTrack];

  const { toggleItem } = useToggleSelection(selectedSubjects, onChange);

  return (
    <section dir="rtl" className="w-full">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {subjects.map((subject) => {
          const isSelected = selectedSubjects.includes(subject.value);
          const SubjectIcon = SUBJECT_ICONS[subject.value] ?? BookOpen;

          return (
            <button
              key={subject.value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => {
                toggleItem(subject.value);

                if (
                  subject.value === "second_language" &&
                  selectedSubjects.includes("second_language")
                ) {
                  onSecondLanguageChange(undefined);
                }
              }}
              className={`
                group min-h-28 cursor-pointer space-y-4
                rounded-[28px] border-2 p-4 text-right
                transition-all duration-300
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
              <div className="relative flex items-center justify-between">
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

                <SubjectIcon
                  size={22}
                  strokeWidth={1.9}
                  className="text-secondary"
                />
              </div>

              <span className="mt-3 font-bold">{subject.label}</span>
            </button>
          );
        })}
      </div>
      {academicTrack === "arts" &&
        selectedSubjects.includes("second_language") && (
          <div className="mt-7 rounded-2xl border border-secondary/20 bg-[#DDF5FF]/50 p-4 lg:p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-primary">
                اختار اللغة الأجنبية الثانية:
              </h3>

              <p className="text-xs text-slate-500">اختار لغة واحدة</p>
            </div>

            <div className="grid grid-cols-1 gap-2 xl:grid-cols-2">
              {(
                [
                  ["french", "الفرنسية"],
                  ["german", "الألمانية"],
                  ["italian", "الإيطالية"],
                  ["spanish", "الإسبانية"],
                  ["chinese", "الصينية"],
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
