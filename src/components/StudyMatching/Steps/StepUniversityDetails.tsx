"use client";

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
  selectedFaculty: string;
  onFacultyChange: (faculty: string) => void;
  selectedDepartment: string;
  onDepartmentChange: (department: string) => void;
  selectedYear: string;
  onYearChange: (year: string) => void;
}

interface YearOption {
  id: string;
  title: string;
}

interface DepartmentOption {
  id: string;
  title: string;
  years: YearOption[];
}

interface FacultyOption {
  id: string;
  title: string;
  icon: LucideIcon;
  departments: DepartmentOption[];
}

const DEFAULT_YEARS: YearOption[] = [
  { id: "first", title: "أولى" },
  { id: "second", title: "تانية" },
  { id: "third", title: "تالتة" },
  { id: "fourth", title: "رابعة" },
];
const ENGINEERING_YEARS: YearOption[] = [
  { id: "first", title: "أولى" },
  { id: "second", title: "تانية" },
  { id: "third", title: "تالتة" },
  { id: "fourth", title: "رابعة" },
  { id: "fifth", title: "خامسة" },
];

const FACULTY_OPTIONS: FacultyOption[] = [
  {
    id: "computers",
    title: "حاسبات ومعلومات",
    icon: Laptop,
    departments: [
      { id: "computer_science", title: "علوم حاسب", years: DEFAULT_YEARS },
      { id: "information_systems", title: "نظم معلومات", years: DEFAULT_YEARS },
      {
        id: "information_technology",
        title: "تكنولوجيا معلومات",
        years: DEFAULT_YEARS,
      },
      {
        id: "artificial_intelligence",
        title: "ذكاء اصطناعي",
        years: DEFAULT_YEARS,
      },
    ],
  },
  {
    id: "engineering",
    title: "هندسة",
    icon: Cog,
    departments: [
      { id: "electrical", title: "هندسة كهرباء", years: ENGINEERING_YEARS },
      { id: "mechanical", title: "هندسة ميكانيكا", years: ENGINEERING_YEARS },
      { id: "civil", title: "هندسة مدني", years: ENGINEERING_YEARS },
      { id: "architecture", title: "هندسة معمارية", years: ENGINEERING_YEARS },
    ],
  },
  {
    id: "commerce",
    title: "تجارة",
    icon: BriefcaseBusiness,
    departments: [
      { id: "accounting", title: "محاسبة", years: DEFAULT_YEARS },
      { id: "business", title: "إدارة أعمال", years: DEFAULT_YEARS },
      { id: "economics", title: "اقتصاد", years: DEFAULT_YEARS },
      { id: "statistics", title: "إحصاء", years: DEFAULT_YEARS },
    ],
  },
  {
    id: "medicine",
    title: "طب بشري",
    icon: Stethoscope,
    departments: [
      {
        id: "general_medicine",
        title: "طب بشري",
        years: [
          { id: "first", title: "أولى" },
          { id: "second", title: "تانية" },
          { id: "third", title: "تالتة" },
          { id: "fourth", title: "رابعة" },
          { id: "fifth", title: "خامسة" },
          { id: "sixth", title: "سادسة" },
        ],
      },
    ],
  },
  {
    id: "pharmacy",
    title: "صيدلة",
    icon: Pill,
    departments: [
      {
        id: "clinical_pharmacy",
        title: "صيدلة إكلينيكية",
        years: [...DEFAULT_YEARS, { id: "fifth", title: "خامسة" }],
      },
    ],
  },
  {
    id: "law",
    title: "حقوق",
    icon: Scale,
    departments: [
      { id: "public_law", title: "قانون عام", years: DEFAULT_YEARS },
      { id: "private_law", title: "قانون خاص", years: DEFAULT_YEARS },
    ],
  },
];

export default function StepUniversityDetails({
  selectedFaculty,
  onFacultyChange,
  selectedDepartment,
  onDepartmentChange,
  selectedYear,
  onYearChange,
}: StepUniversityDetailsProps) {
  const currentFaculty = FACULTY_OPTIONS.find(
    (faculty) => faculty.id === selectedFaculty,
  );

  // نجمع كل السنين الموجودة في أقسام الكلية بدون تكرار
  const availableYears = currentFaculty
    ? Array.from(
        new Map(
          currentFaculty.departments
            .flatMap((department) => department.years)
            .map((year) => [year.id, year]),
        ).values(),
      )
    : [];

  const handleFacultyChange = (facultyId: string) => {
    onFacultyChange(facultyId);
    onDepartmentChange("");
    onYearChange("");
  };

  const handleDepartmentChange = (departmentId: string) => {
    onDepartmentChange(departmentId);
    onYearChange("");
  };

  return (
    <div dir="rtl" className="w-full space-y-7">
      {/* Faculty */}
      <div>
        <h3 className="mb-4 font-bold text-primary">بتدرس في كلية إيه؟</h3>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
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

                <span className="mt-3 block font-bold">{faculty.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Departments + Academic Years */}
      {currentFaculty && (
        <div className="rounded-2xl border border-secondary/20 bg-[#DDF5FF]/50 p-4 sm:p-5 space-y-6">
          {/* Departments */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-primary">
              اختار القسم أو التخصص:
            </h3>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {currentFaculty.departments.map((department) => {
                const isSelected = selectedDepartment === department.id;

                return (
                  <button
                    key={department.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => handleDepartmentChange(department.id)}
                    className={`
                      flex items-center justify-center gap-3
                      rounded-xl border-2 p-3 text-right
                      font-bold transition-all duration-300
                      ${
                        isSelected
                          ? "border-secondary bg-white text-primary"
                          : "border-slate-200 bg-white text-slate-500 hover:border-secondary/60"
                      }
                    `}
                  >
                    <span>{department.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Academic Years */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-primary">
              أنت في سنة كام؟
            </h3>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {availableYears.map((year) => {
                const isSelected = selectedYear === year.id;

                return (
                  <button
                    key={year.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => onYearChange(year.id)}
                    className={`
                      flex items-center justify-between gap-2
                      rounded-xl border-2 bg-white p-4
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
                      <Check size={20} className="shrink-0 text-secondary" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
