
"use client";

import { UniversityFaculty, UniversityYear } from "@/src/types/StudySubjects";
import {
  Check,
  Circle,
  Laptop,
  Cog,
  BriefcaseBusiness,
  Stethoscope,
  Pill,
  Scale,
  LucideIcon,
} from "lucide-react";

interface StepUniversityDetailsProps {
  selectedFaculty: UniversityFaculty | "";
  onFacultyChange: (faculty: UniversityFaculty | "") => void;

  selectedYear: UniversityYear | "";
  onYearChange: (year: UniversityYear | "") => void;
}

interface YearOption {
  id: UniversityYear;
  title: string;
}

interface FacultyOption {
  id: UniversityFaculty;
  title: string;
  icon: LucideIcon;
  years: YearOption[];
}

const DEFAULT_YEARS: YearOption[] = [
  { id: "first", title: "أولى" },
  { id: "second", title: "تانية" },
  { id: "third", title: "تالتة" },
  { id: "fourth", title: "رابعة" },
];

const ENGINEERING_YEARS: YearOption[] = [
  ...DEFAULT_YEARS,
  { id: "fifth", title: "خامسة" },
];

const MEDICINE_YEARS: YearOption[] = [
  ...DEFAULT_YEARS,
  { id: "fifth", title: "خامسة" },
  { id: "sixth", title: "سادسة" },
];

const PHARMACY_YEARS: YearOption[] = [
  ...DEFAULT_YEARS,
  { id: "fifth", title: "خامسة" },
];

export const FACULTY_OPTIONS: FacultyOption[] = [
  {
    id: "computers",
    title: "حاسبات ومعلومات",
    icon: Laptop,
    years: DEFAULT_YEARS,
  },
  {
    id: "engineering",
    title: "هندسة",
    icon: Cog,
    years: ENGINEERING_YEARS,
  },
  {
    id: "commerce",
    title: "تجارة",
    icon: BriefcaseBusiness,
    years: DEFAULT_YEARS,
  },
  {
    id: "medicine",
    title: "طب بشري",
    icon: Stethoscope,
    years: MEDICINE_YEARS,
  },
  {
    id: "pharmacy",
    title: "صيدلة",
    icon: Pill,
    years: PHARMACY_YEARS,
  },
  {
    id: "law",
    title: "حقوق",
    icon: Scale,
    years: DEFAULT_YEARS,
  },
];

export default function StepUniversityDetails({
  selectedFaculty,
  onFacultyChange,
  selectedYear,
  onYearChange,
}: StepUniversityDetailsProps) {
  const currentFaculty = FACULTY_OPTIONS.find(
    (faculty) => faculty.id === selectedFaculty,
  );

  const handleFacultyChange = (facultyId: UniversityFaculty | "") => {
    onFacultyChange(facultyId);
    onYearChange("");
  };

  return (
    <div dir="rtl" className="w-full space-y-7">

      {/* Faculty */}
      <div>
        <h3 className="mb-4 font-bold text-primary">
          بتدرس في كلية إيه؟
        </h3>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 2xl:grid-cols-3">
          {FACULTY_OPTIONS.map((faculty) => {
            const Icon = faculty.icon;
            const isSelected = selectedFaculty === faculty.id;

            return (
              <button
                key={faculty.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => handleFacultyChange(faculty.id)}
                className={`
                  group min-h-26 cursor-pointer space-y-4
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

                  <Icon
                    size={22}
                    strokeWidth={1.9}
                    className="text-secondary"
                  />
                </div>

                <span className="mt-3 block font-bold">
                  {faculty.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Academic Years */}
      {currentFaculty && (
        <div className="rounded-2xl border border-secondary/20 bg-[#DDF5FF]/50 p-4 sm:p-5">
          <h3 className="mb-4 text-sm font-bold text-primary">
            أنت في سنة كام؟
          </h3>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-3">
            {currentFaculty.years.map((year) => {
              const isSelected = selectedYear === year.id;

              return (
                <button
                  key={year.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => onYearChange(year.id)}
                  className={`
                    flex items-center justify-between gap-2
                    rounded-xl border-2 bg-white p-4 cursor-pointer
                    font-bold transition-all duration-300
                    ${
                      isSelected
                        ? "border-secondary text-primary"
                        : "border-slate-200 text-slate-500 hover:border-secondary/60"
                    }
                  `}
                >
                  <span>{year.title}</span>

                  {isSelected && (
                    <Check
                      size={20}
                      className="shrink-0 text-secondary"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
