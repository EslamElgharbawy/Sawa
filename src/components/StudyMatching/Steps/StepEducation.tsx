"use client";

import {
  AcademicTrack,
  EducationLevel,
  EducationSystem,
  StepEducationProps,
} from "@/src/types/StudyEducation";
import {
  BookOpen,
  BookOpenCheck,
  Award,
  GraduationCap,
  Check,
  FlaskConical,
  Sigma,
  Globe2,
  Code,
  BriefcaseBusiness,
  Palette,
} from "lucide-react";

const EDUCATION_OPTIONS = [
  {
    id: "high_school_3",
    title: "تالتة ثانوي",
    description: "الشهادة الثانوية العامة ",
    icon: BookOpenCheck,
  },
  {
    id: "high_school_2",
    title: "تانية ثانوي",
    description: "الشعبة العلمية والأدبية",
    icon: BookOpen,
  },
  {
    id: "high_school_1",
    title: "أولى ثانوي",
    description: "التأسيس العام للمرحلة الثانوية",
    icon: BookOpen,
  },
  {
    id: "university_student",
    title: "طالب جامعي",
    description: "كليات، مشاريع تخرج، وأبحاث",
    icon: GraduationCap,
  },
  {
    id: "skill_development",
    title: "تطوير مهارة / تعلم ذاتي",
    description: "مذاكرة كورسات تقنية، إنجليزي، وتطبيقات عملية",
    icon: Award,
    badge: "برمجة ولغات",
  },
] as const;

const GENERAL_TRACK_OPTIONS = [
  {
    id: "science",
    title: "علمي علوم",
    icon: FlaskConical,
  },
  {
    id: "mathematics",
    title: "علمي رياضة",
    icon: Sigma,
  },
  {
    id: "literary",
    title: "أدبي",
    icon: Globe2,
  },
] as const;

const BACCALAUREATE_TRACK_OPTIONS = [
  {
    id: "medical",
    title: "الطب وعلوم الحياة",
    icon: FlaskConical,
  },
  {
    id: "engineering",
    title: "الهندسة وعلوم الحاسب",
    icon: Code,
  },
  {
    id: "business",
    title: "الأعمال",
    icon: BriefcaseBusiness,
  },
  {
    id: "arts",
    title: "الآداب والفنون",
    icon: Palette,
  },
] as const;

export default function StepEducation({
  educationLevel,
  educationSystem,
  academicTrack,
  onEducationLevelChange,
  onEducationSystemChange,
  onAcademicTrackChange,
}: StepEducationProps) {
  const showAcademicTrack =
    educationLevel === "high_school_2" || educationLevel === "high_school_3";

  const TRACK_OPTIONS =
    educationSystem === "baccalaureate"
      ? BACCALAUREATE_TRACK_OPTIONS
      : GENERAL_TRACK_OPTIONS;

  const handleEducationChange = (level: EducationLevel) => {
    onEducationLevelChange(level);

    if (level !== "high_school_2" && level !== "high_school_3") {
      onAcademicTrackChange(null);
      onEducationSystemChange("general");
    }
  };

  const handleSystemChange = (system: EducationSystem) => {
    onEducationSystemChange(system);
    onAcademicTrackChange(null);
  };

  const isTrackSelected = (trackId: AcademicTrack) => academicTrack === trackId;

  return (
    <div dir="rtl" className="w-full">
      {/* Education Levels */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {EDUCATION_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isSelected = educationLevel === option.id;

          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => handleEducationChange(option.id as EducationLevel)}
              className={`
                relative flex min-h-37.5 cursor-pointer flex-col
                justify-between rounded-2xl border-2 p-4 text-right
                transition-all duration-300
                ${option.id === "skill_development" ? "sm:col-span-2" : ""}
                ${
                  isSelected
                    ? "border-secondary bg-[#DDF5FF] text-primary"
                    : "border-slate-300 bg-white text-slate-500 hover:border-secondary/60"
                }
              `}
            >
              <div className="flex w-full items-center justify-between">
                <span
                  className={`
                    flex size-10 items-center justify-center rounded-xl
                    ${
                      isSelected
                        ? "bg-white text-primary"
                        : "bg-slate-100 text-slate-500"
                    }
                  `}
                >
                  <Icon size={19} strokeWidth={1.8} />
                </span>

                <span
                  className={`
                    flex size-5.5 items-center justify-center
                    rounded-full border
                    ${
                      isSelected
                        ? "border-secondary bg-secondary text-white"
                        : "border-slate-300 bg-white text-white"
                    }
                  `}
                >
                  {isSelected && <Check size={14} strokeWidth={3} />}
                </span>
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-bold">{option.title}</h3>
                </div>

                <p className="text-sm leading-6 opacity-80">
                  {option.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Academic Track */}
      {showAcademicTrack && (
        <div className="mt-7 rounded-2xl border border-secondary/20 bg-[#DDF5FF]/50 p-4 sm:p-5">
          <div className="mb-5">
            <h3 className="mb-3 text-sm font-bold text-primary">
              اختار النظام التعليمي:
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSystemChange("general")}
                aria-pressed={educationSystem === "general"}
                className={`
                  rounded-xl border-2 p-3 font-bold transition-all duration-300 cursor-pointer
                  ${
                    educationSystem === "general"
                      ? "border-secondary bg-white text-primary"
                      : "border-slate-200 bg-white text-slate-500"
                  }
                `}
              >
                الثانوية العامة
              </button>

              <button
                type="button"
                onClick={() => handleSystemChange("baccalaureate")}
                aria-pressed={educationSystem === "baccalaureate"}
                className={`
                  rounded-xl border-2 p-3 font-bold transition-all duration-300 cursor-pointer
                  ${
                    educationSystem === "baccalaureate"
                      ? "border-secondary bg-white text-primary"
                      : "border-slate-200 bg-white text-slate-500"
                  }
                `}
              >
                البكالوريا المصرية
              </button>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-primary">
              حدد الشعبة الدراسية (المسار):
            </h3>

            <p className="text-xs text-slate-500">اختار المسار المناسب ليك</p>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {TRACK_OPTIONS.map((track) => {
              const TrackIcon = track.icon;
              const isSelected = isTrackSelected(track.id);

              return (
                <button
                  key={track.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => onAcademicTrackChange(track.id)}
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
                  <TrackIcon size={20} />

                  <span className="font-bold">{track.title}</span>

                  {isSelected && (
                    <Check size={20} className="mr-auto text-secondary" />
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
