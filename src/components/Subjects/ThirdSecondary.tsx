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
  Briefcase,
  ChartNoAxesColumn,
  Church,
  Flag,
  Moon,
} from "lucide-react";
import {
  SecondarySubject,
  ThirdSecondarySubject,
} from "@/src/types/StudySubjects";
import { GeneralSecondaryTrack } from "@/src/types/StudyEducation";
import useToggleSelection from "@/src/hooks/useToggleSelection";

import { Code } from "lucide-react";
import { SECONDARY_YEAR_THREE_SUBJECTS } from "../StudyMatching/StudyOptions";

const SUBJECT_ICONS: Record<ThirdSecondarySubject, LucideIcon> = {
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
  statistics: ChartNoAxesColumn,
  islamic_religion: Moon,
  christian_religion: Church,
  national_education: Flag,
};
interface ThirdSecondaryProps {
  selectedSubjects: SecondarySubject[];
  onChange: (subject: SecondarySubject[]) => void;
  academicTrack: GeneralSecondaryTrack;
}
export default function ThirdSecondary({
  selectedSubjects,
  onChange,
  academicTrack,
}: ThirdSecondaryProps) {
  const { toggleItem } = useToggleSelection(selectedSubjects, onChange);
  const subjects = SECONDARY_YEAR_THREE_SUBJECTS[academicTrack];
  return (
    <section dir="rtl" className="w-full">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {subjects.map((subject) => {
          const isSelected = selectedSubjects.includes(subject.value);
          const SubjectIcon = SUBJECT_ICONS[subject.value];
          return (
            <button
              key={subject.value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => toggleItem(subject.value)}
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

      {selectedSubjects.length === 0 && (
        <p className="mt-4 text-sm text-slate-500">
          اختار مادة واحدة على الأقل عشان نكمل.
        </p>
      )}
    </section>
  );
}
