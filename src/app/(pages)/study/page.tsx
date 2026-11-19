"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperList,
} from "@/components/ui/stepper";
import StepSubjects from "@/src/components/StudyMatching/Steps/StepSubjects";
import StepEducation from "@/src/components/StudyMatching/Steps/StepEducation";
import StepPreferences from "@/src/components/StudyMatching/Steps/StepPreferences";
import {
  AcademicTrack,
  EducationLevel,
  EducationSystem,
} from "@/src/types/StudyEducation";
import {
  BaccalaureateSecondLanguage,
  SecondarySubject,
  StudyTopicsState,
  UniversityFaculty,
  UniversityYear,
} from "@/src/types/StudySubjects";
import { StudyGoal, StudyStyle, StudyTime } from "@/src/types/StudyMatching";
import StepUniversityDetails from "@/src/components/StudyMatching/Steps/StepUniversityDetails";
import UniversitySubjects from "@/src/components/Subjects/UniversitySubjects";
import SkillDevelopment, {
  SKILL_OPTIONS,
} from "@/src/components/Subjects/SkillDevelopment";
import StudyTopics from "@/src/components/StudyTopics/StudyTopics";
import UniversityStudyTopics from "@/src/components/StudyTopics/UniversityStudyTopics";
import SkillStudyTopics from "@/src/components/StudyTopics/SkillStudyTopics";
import StepSummary from "@/src/components/StudyMatching/Steps/StepSummary";
import { SUBJECT_LABELS } from "@/src/app/data/StudyOptions";
import {
  ArrowRight,
  Search,
  Sparkles,
  UsersRound,
  Check,
  Clock,
  BookOpen,
  Zap,
  Mic,
  MessageSquare,
  Bookmark,
  Play,
  VolumeX,
  FlaskConical,
  User,
  UserPlus,
  X,
  RotateCw,
} from "lucide-react";

interface MatchedStudent {
  id: string;
  name: string;
  avatarLetter: string;
  avatarBg: string;
  grade: string;
  matchRate: number;
  sameSubject: boolean;
  sameGoal: boolean;
  sameTime?: boolean;
  silentStudy?: boolean;
  audioPreference: string;
  audioIcon: "mic" | "mic-cam" | "chat";
  availability: string;
  isReadyNow: boolean;
}

export default function StudyStepper() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState("level");
  const [selectedFaculty, setSelectedFaculty] = useState<
    UniversityFaculty | ""
  >("");

  const [selectedYear, setSelectedYear] = useState<UniversityYear | "">("");

  const [universitySubjects, setUniversitySubjects] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<SecondarySubject[]>(
    [],
  );
  const [selectedTopics, setSelectedTopics] = useState<StudyTopicsState>({});
  const [universitySelectedTopics, setUniversitySelectedTopics] = useState<
    Record<string, string[]>
  >({});
  const [skillSelectedTopics, setSkillSelectedTopics] = useState<string[]>([]);
  const [selectedSecondLanguage, setSelectedSecondLanguage] = useState<
    BaccalaureateSecondLanguage | undefined
  >(undefined);

  const [studyStyle, setStudyStyle] = useState<StudyStyle | null>(null);
  const [goal, setGoal] = useState<StudyGoal | null>(null);

  const [peopleCount, setPeopleCount] = useState<number | null>(null);
  const [educationLevel, setEducationLevel] = useState<EducationLevel | null>(
    null,
  );
  const [selectedSkills, setSelectedSkills] = useState<string | null>(null);
  const [educationSystem, setEducationSystem] =
    useState<EducationSystem>("general");
  const [academicTrack, setAcademicTrack] = useState<AcademicTrack | null>(
    null,
  );

  const [isMatching, setIsMatching] = useState(false);
  const [matchingDone, setMatchingDone] = useState(false);
  const [matchingProgress, setMatchingProgress] = useState(0);
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);

  const UniversityStep = () => {
    if (educationLevel === "university_student") {
      return [{ value: "universityDetails", title: "عرفنا بتدرس إيه؟" }];
    }
    return [];
  };

  const TopicsStep = () => {
    const isSecondary =
      educationLevel === "high_school_1" ||
      educationLevel === "high_school_2" ||
      educationLevel === "high_school_3";

    if (
      isSecondary ||
      educationLevel === "university_student" ||
      educationLevel === "skill_development"
    ) {
      return [{ value: "topics", title: "هتذاكر إيه في كل مادة؟" }];
    }

    return [];
  };
  const topicsScopeKey = `${educationSystem}_${educationLevel}_${academicTrack ?? "default"}`;

  const currentSelectedTopics = selectedTopics[topicsScopeKey] ?? {};

  const steps = [
    { value: "level", title: "إيه مرحلتك التعليمية؟" },
    ...UniversityStep(),
    { value: "subjects", title: "هتذاكر إيه؟" },
    ...TopicsStep(),
    { value: "preferences", title: "تحب تذاكر إزاي؟" },
    { value: "complete", title: "اختياراتك" },
  ];
  const currentIndex = steps.findIndex((step) => step.value === currentStep);
  const nextStep = () => {
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].value);
    }
  };

  const previousStep = () => {
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].value);
    }
  };

  const isLevelStepDisabled =
    educationLevel === null ||
    ((educationLevel === "high_school_2" ||
      educationLevel === "high_school_3") &&
      academicTrack === null);

  const resetSubjectSelections = () => {
    setSelectedSubjects([]);
    setSelectedTopics({});
    setSelectedSecondLanguage(undefined);
    setSelectedSkills(null);
    setSkillSelectedTopics([]);
    setUniversitySubjects([]);
    setUniversitySelectedTopics({});
  };

  useEffect(() => {
    if (!isMatching) {
      setMatchingProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setMatchingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setSelectedStudentIds([]);
            setIsMatching(false);
            setMatchingDone(true);
          }, 350);
          return 100;
        }
        return prev + 1;
      });
    }, 45); // 45ms * 100 = 4.5 seconds

    return () => clearInterval(interval);
  }, [isMatching]);

  const handleMatching = () => {
    setMatchingProgress(0);
    setMatchingDone(false);
    setIsMatching(true);
  };

  // Helper texts for selected choices
  const getSubjectDisplay = () => {
    const subjects =
      educationLevel === "university_student"
        ? universitySubjects
        : selectedSubjects.map((s) => SUBJECT_LABELS[s] ?? s);

    if (subjects.length === 0) return "مذاكرة عامة";
    if (subjects.length === 1) return subjects[0];
    if (subjects.length === 2) return `${subjects[0]} ، ${subjects[1]}`;
    return `${subjects[0]} + ${subjects.length - 1} مواد أخرى`;
  };

  const getEducationLevelLabel = () => {
    switch (educationLevel) {
      case "high_school_1":
        return "الصف الأول الثانوي";
      case "high_school_2":
        return "الصف الثاني الثانوي";
      case "high_school_3":
        return "الصف الثالث الثانوي";
      case "university_student":
        return selectedFaculty ? `جامعي - ${selectedFaculty}` : "طالب جامعي";
      case "skill_development":
        return "تطوير مهارات";
      default:
        return "الصف الأول الثانوي";
    }
  };

  const getStyleLabel = () => {
    return studyStyle === "quiet" ? "هدوء وتركيز" : "تفاعل ونقاش";
  };

  const getGoalLabel = () => {
    switch (goal) {
      case "homework":
        return "واجب";
      case "revision":
        return "مراجعة";
      default:
        return "مذاكرة";
    }
  };

  const getPeopleCountLabel = () => {
    if (peopleCount === 1) return "شخص واحد";
    if (peopleCount === 2) return "شخصين";
    if (peopleCount === 3) return "3 أشخاص";
    if (peopleCount && peopleCount >= 4) return "3 أشخاص أو أكثر";
    return "شخصين";
  };

  // Mock matched students list matching the design
  const matchedStudents: MatchedStudent[] = [
    {
      id: "student-1",
      name: "ملك",
      avatarLetter: "م",
      avatarBg: "bg-[#103b3e]",
      grade: getEducationLevelLabel(),
      matchRate: 95,
      sameSubject: true,
      sameGoal: true,
      audioPreference: "مايك وكاميرا مفتوحين",
      audioIcon: "mic-cam",
      availability: "جاهزة لبدء الجلسة الآن",
      isReadyNow: true,
    },
    {
      id: "student-2",
      name: "يوسف عمر",
      avatarLetter: "ي",
      avatarBg: "bg-[#0b6b88]",
      grade: getEducationLevelLabel(),
      matchRate: 91,
      sameSubject: true,
      sameGoal: true,
      sameTime: true,
      audioPreference: "مايك فقط",
      audioIcon: "mic",
      availability: "جاهز لبدء الجلسة الآن",
      isReadyNow: true,
    },
    {
      id: "student-3",
      name: "ندى أحمد",
      avatarLetter: "ن",
      avatarBg: "bg-[#713f12]",
      grade: getEducationLevelLabel(),
      matchRate: 84,
      sameSubject: true,
      sameGoal: false,
      silentStudy: true,
      audioPreference: "شات فقط",
      audioIcon: "chat",
      availability: "متاحة خلال 5 دقائق",
      isReadyNow: false,
    },
    {
      id: "student-4",
      name: "أحمد محمود",
      avatarLetter: "أ",
      avatarBg: "bg-[#0e5c68]",
      grade: getEducationLevelLabel(),
      matchRate: 88,
      sameSubject: true,
      sameGoal: true,
      audioPreference: "مايك فقط",
      audioIcon: "mic",
      availability: "جاهز لبدء الجلسة الآن",
      isReadyNow: true,
    },
    {
      id: "student-5",
      name: "سارة علي",
      avatarLetter: "س",
      avatarBg: "bg-[#103b3e]",
      grade: getEducationLevelLabel(),
      matchRate: 86,
      sameSubject: true,
      sameGoal: true,
      audioPreference: "مايك فقط",
      audioIcon: "mic",
      availability: "جاهزة لبدء الجلسة الآن",
      isReadyNow: true,
    },
  ];

  // 1. شاشة جاري المطابقة (Loading State - التصميم الجديد)
  if (isMatching) {
    return (
      <main
        dir="rtl"
        className="relative w-full min-h-[90vh] py-8 px-4 sm:px-8 bg-slate-50 flex flex-col justify-between items-center overflow-hidden rounded-3xl border border-slate-200/60 shadow-xs"
      >
        {/* Background Gradients & Glows */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70.43%_88.04%_at_50.00%_38.00%,_rgba(19,_168,_213,_0.13)_0%,_rgba(254,_243,_199,_0.16)_42%,_rgba(254,_243,_199,_0)_75%)]" />
        <div className="pointer-events-none absolute -top-32 right-1/4 size-96 rounded-full bg-cyan-200/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/4 size-96 rounded-full bg-amber-100/40 blur-3xl" />

        {/* 2. Main Content Area */}
        <div className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center my-6">
          {/* Radar & Students Visual Section */}
          <div className="relative flex size-72 items-center justify-center mb-8 select-none">
            {/* Concentric Radar Rings */}
            <div className="absolute size-72 rounded-full border border-cyan-500/20" />
            <div className="absolute size-52 rounded-full border border-slate-200/90" />
            <div className="absolute size-32 rounded-full border border-cyan-500/30" />

            {/* Radar Expanding Pulse Wave */}
            <span className="pointer-events-none absolute size-44 rounded-full border border-cyan-400/50 animate-ping opacity-30 duration-1000" />

            {/* Rotating Radar Sweep Beam (Conic Gradient) */}
            <div
              className="pointer-events-none absolute size-72 rounded-full animate-[spin_2.5s_linear_infinite]"
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(6, 182, 212, 0.45) 0deg, rgba(6, 182, 212, 0.15) 60deg, transparent 90deg, transparent 360deg)",
              }}
            />

            {/* Horizontal Eye / Lens Shape behind Search Node */}
            <div className="pointer-events-none absolute w-56 h-28 flex items-center justify-center opacity-40 z-0">
              <svg viewBox="0 0 100 50" className="size-full">
                <path
                  d="M 5 25 Q 50 2, 95 25 Q 50 48, 5 25 Z"
                  fill="url(#lensCyanGlow)"
                />
                <defs>
                  <radialGradient id="lensCyanGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
                    <stop offset="80%" stopColor="#38bdf8" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </div>

            {/* Pronounced Wave Connecting Dashed Line with Flow Animation to the Right */}
            <svg
              className="pointer-events-none absolute inset-0 size-full z-10"
              viewBox="0 0 288 288"
              fill="none"
            >
              <path
                d="M 40 162 C 78 116, 114 126, 144 138 C 174 150, 210 160, 248 142"
                stroke="#06b6d4"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                strokeLinecap="round"
                opacity="0.85"
                style={{
                  animation: "flowDashesRight 0.85s linear infinite",
                }}
              />
            </svg>
            <style>{`
              @keyframes flowDashesRight {
                from {
                  stroke-dashoffset: 0;
                }
                to {
                  stroke-dashoffset: -24;
                }
              }
            `}</style>

            {/* Sparkles */}
            <span className="absolute top-6 right-16 text-amber-500 text-sm animate-pulse">
              ✨
            </span>
            <span className="absolute bottom-10 left-16 text-cyan-500 text-xs animate-bounce">
              ⚡
            </span>

            {/* Center Search Node */}
            <div className="relative z-20 size-16 bg-white rounded-2xl border-2 border-blue-50/80 flex items-center justify-center shadow-lg">
              <div className="size-12 bg-gradient-to-l from-cyan-500/20 to-cyan-500/5 rounded-xl flex items-center justify-center text-cyan-500">
                <Search className="size-6 animate-pulse" />
              </div>
            </div>

            {/* Right: "أنت" Student Node */}
            <div className="absolute right-0 sm:right-2 top-[114px] flex flex-col items-center gap-1.5 z-20">
              <div className="size-14 p-1 bg-white rounded-2xl border-2 border-[#103b3e] flex items-center justify-center shadow-md">
                <div className="size-full bg-[#103b3e] rounded-xl flex items-center justify-center text-white text-sm font-bold">
                  أنت
                </div>
              </div>
              <span className="px-2.5 py-0.5 bg-white/95 rounded-full border border-slate-200 text-cyan-950 text-xs font-semibold shadow-xs">
                طالب
              </span>
            </div>

            {/* Left: "الزميل المناسب" Target Node */}
            <div className="absolute left-0 sm:left-2 top-[114px] flex flex-col items-center gap-1.5 z-20">
              <div className="size-14 p-1 bg-white rounded-2xl border-2 border-dashed border-cyan-400 flex items-center justify-center shadow-md">
                <div className="size-full bg-blue-50/60 rounded-xl flex items-center justify-center text-cyan-500">
                  <User size={22} className="stroke-[2.2]" />
                </div>
              </div>
              <span className="px-2.5 py-0.5 bg-white/95 rounded-full border border-slate-200 text-slate-600 text-xs font-medium shadow-xs">
                الزميل المناسب
              </span>
            </div>
          </div>

          {/* Title & Subtitle */}
          <h2 className="text-3xl sm:text-4xl font-black text-cyan-950">
            بندور على ناس تناسبك...
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-lg">
            بنراجع المادة ({getSubjectDisplay()}) والوقت وطريقة المذاكرة والهدف.
          </p>

          {/* Dynamic Animated Status Pill */}
          <div className="mt-4 px-5 py-2 bg-white/95 rounded-full shadow-xs border border-cyan-500/30 flex items-center gap-2.5 transition-all duration-300">
            <span className="text-cyan-950 text-xs sm:text-sm font-medium">
              {matchingProgress < 28
                ? "بنراجع المادة ونحدد أفضل المتطابقين معك الآن..."
                : matchingProgress < 58
                  ? `بندور على طلاب جاهزين لـ (${getSubjectDisplay()}) في نفس الوقت...`
                  : matchingProgress < 85
                    ? "جاري فحص التوافق الدراسي وأسلوب المناقشة..."
                    : "بنجهز لك غرفة المذاكرة التفاعلية مع زميلك..."}
            </span>
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-cyan-500" />
            </span>
          </div>

          {/* Dynamic Animated Progress Bar */}
          <div className="mt-4 w-72 h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-cyan-500 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${matchingProgress}%` }}
            />
          </div>

          {/* 3. Session Criteria Card (معايير جلستك المفضلة) */}
          <div className="w-full max-w-xl mt-7 p-4 sm:p-5 bg-white/85 rounded-2xl border border-white/90 backdrop-blur-md shadow-sm">
            {/* Header of Criteria Card */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/70">
              <span className="text-slate-500 text-xs font-semibold uppercase tracking-wide">
                معايير جلستك المفضلة
              </span>
              <div className="flex items-center gap-1.5 text-cyan-600 text-xs font-semibold">
                <RotateCw size={13} className="animate-spin text-cyan-500" />
                <span>فحص نشط 4/4</span>
              </div>
            </div>

            {/* 4 Criteria Boxes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* المادة */}
              <div className="p-3 bg-white/80 rounded-xl border border-slate-200/70 flex flex-col justify-between items-start h-20">
                <div className="flex items-center justify-between w-full">
                  <span className="text-slate-500 text-xs">المادة</span>
                  <span className="text-xs">🧪</span>
                </div>
                <div className="flex items-center gap-1.5 w-full">
                  <span className="size-1.5 bg-emerald-500 rounded-full shrink-0" />
                  <span className="text-cyan-950 text-xs font-bold truncate">
                    {getSubjectDisplay()}
                  </span>
                </div>
              </div>

              {/* الوقت */}
              <div className="p-3 bg-white/80 rounded-xl border border-slate-200/70 flex flex-col justify-between items-start h-20">
                <div className="flex items-center justify-between w-full">
                  <span className="text-slate-500 text-xs">الوقت</span>
                  <span className="text-xs">⏰</span>
                </div>
                <div className="flex items-center gap-1.5 w-full">
                  <span className="size-1.5 bg-emerald-500 rounded-full shrink-0" />
                  <span className="text-cyan-950 text-xs font-bold truncate">
                    دلوقتي
                  </span>
                </div>
              </div>

              {/* طريقة المذاكرة */}
              <div className="p-3 bg-white/80 rounded-xl border border-slate-200/70 flex flex-col justify-between items-start h-20">
                <div className="flex items-center justify-between w-full">
                  <span className="text-slate-500 text-xs">طريقة المذاكرة</span>
                  <span className="text-xs">💬</span>
                </div>
                <div className="flex items-center gap-1.5 w-full">
                  <span className="size-1.5 bg-emerald-500 rounded-full shrink-0" />
                  <span className="text-cyan-950 text-xs font-bold truncate">
                    {getStyleLabel()}
                  </span>
                </div>
              </div>

              {/* الهدف */}
              <div className="p-3 bg-white/80 rounded-xl border border-slate-200/70 flex flex-col justify-between items-start h-20">
                <div className="flex items-center justify-between w-full">
                  <span className="text-slate-500 text-xs">الهدف</span>
                  <span className="text-xs">🎯</span>
                </div>
                <div className="flex items-center gap-1.5 w-full">
                  <span className="size-1.5 bg-emerald-500 rounded-full shrink-0" />
                  <span className="text-cyan-950 text-xs font-bold truncate">
                    {getGoalLabel()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sawa Tip Card */}
          <div className="mt-5 max-w-lg px-4 py-2.5 bg-amber-50/80 rounded-xl border border-amber-200/70 flex items-center justify-center gap-2 shadow-xs">
            <span className="text-base shrink-0">💡</span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              <span className="font-bold text-slate-800 ml-1">نصيحة ساوا:</span>
              جهز كشكولك والأسئلة الصعبة بينما نلاقي الزميل المتوافق!
            </p>
          </div>

          {/* Cancel Search Button */}
          <button
            type="button"
            onClick={() => {
              setIsMatching(false);
            }}
            className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 text-slate-500 hover:text-slate-800 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            <X size={15} />
            <span>إلغاء البحث والعودة</span>
          </button>
        </div>
      </main>
    );
  }

  if (matchingDone) {
    const targetCount = peopleCount ?? 1;
    const isThreeOrMore = targetCount >= 4;
    const maxAllowed = isThreeOrMore ? matchedStudents.length : targetCount;

    const toggleStudent = (id: string) => {
      setSelectedStudentIds((prev) => {
        if (prev.includes(id)) {
          return prev.filter((item) => item !== id);
        }
        if (prev.length >= maxAllowed) {
          if (maxAllowed === 1) {
            return [id];
          }
          return prev;
        }
        return [...prev, id];
      });
    };

    const canStart = selectedStudentIds.length >= 1;
    const isMaxReached = selectedStudentIds.length === maxAllowed;

    return (
      <main
        dir="rtl"
        className="py-4 overflow-y-auto flex flex-col items-center relative"
      >
        <div className="w-full px-12 lg:px-20 mb-4 flex justify-start">
          {/* Top Return link */}
          <button
            type="button"
            onClick={() => {
              setMatchingDone(false);
              setIsMatching(false);
            }}
            className="flex items-center justify-center gap-2 text-sm font-bold text-[#103b3e] transition-colors duration-300 hover:text-[#17a6d1] cursor-pointer"
          >
            <ArrowRight size={17} className="mt-0.5" />
            <span>تعديل الاختيارات</span>
          </button>
        </div>
        <div className="w-full max-w-3xl">
          {/* Header */}
          <header className="text-center mb-10">
            <h1 className="text-2xl sm:text-3xl font-black text-[#103b3e] flex items-center justify-center gap-2">
              <span>لقينا {matchedStudents.length} من الطلبة المناسبين</span>
              <span className="text-[#f59e0b]">✨</span>
            </h1>

            <p className="mt-2 text-sm font-medium text-slate-500">
              اختر{" "}
              {targetCount === 1
                ? "زميلاً واحداً"
                : targetCount === 2
                  ? "حتى زميلين"
                  : targetCount === 3
                    ? "حتى 3 زملاء"
                    : "3 زملاء أو أكثر"}{" "}
              لبدء جلسة المذاكرة معاهم.
            </p>

            {/* Filter tags pills */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {/* Subject Tag */}
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#17a6d1]/20 bg-[#ddf5ff] px-3.5 py-1.5 text-xs font-bold text-[#103b3e]">
                <FlaskConical size={14} className="text-[#17a6d1]" />
                <span>{getSubjectDisplay()}</span>
              </div>

              {/* People Count Tag */}
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#17a6d1]/20 bg-[#ddf5ff] px-3.5 py-1.5 text-xs font-bold text-[#103b3e]">
                <UsersRound size={14} className="text-[#17a6d1]" />
                <span>{getPeopleCountLabel()}</span>
              </div>

              {/* Study Style Tag */}
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#17a6d1]/20 bg-[#ddf5ff] px-3.5 py-1.5 text-xs font-bold text-[#103b3e]">
                <MessageSquare size={14} className="text-[#17a6d1]" />
                <span>{getStyleLabel()}</span>
              </div>

              {/* Goal Tag */}
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#17a6d1]/20 bg-[#ddf5ff] px-3.5 py-1.5 text-xs font-bold text-[#103b3e]">
                <BookOpen size={14} className="text-[#17a6d1]" />
                <span>{getGoalLabel()}</span>
              </div>
            </div>
          </header>

          {/* Cards List */}
          <div className="space-y-4">
            {matchedStudents.map((student) => {
              const isSelected = selectedStudentIds.includes(student.id);

              return (
                <div
                  key={student.id}
                  onClick={() => toggleStudent(student.id)}
                  className={`group relative cursor-pointer rounded-3xl border-2 p-5 sm:p-6 transition-all duration-300 ${
                    isSelected
                      ? "border-[#17a6d1] bg-white shadow-sm"
                      : "border-slate-200 bg-white hover:border-[#17a6d1]/60 "
                  }`}
                >
                  {/* Selection Radio Circle */}
                  <div
                    className={`absolute -top-3 -left-3 z-10 flex size-8 items-center justify-center rounded-full shadow-sm transition-all duration-200 ${
                      isSelected
                        ? "bg-[#17a6d1] text-white border-2 border-white ring-2 ring-[#17a6d1]"
                        : "border-2 border-slate-300 bg-white group-hover:border-[#17a6d1]/60"
                    }`}
                  >
                    {isSelected && (
                      <Check size={18} strokeWidth={3} className="text-white" />
                    )}
                  </div>

                  {/* Main Info Row */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:pl-10">
                    {/* User Profile */}
                    <div className="flex items-center gap-3.5">
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-lg font-black text-[#103b3e]">
                            {student.name}
                          </h2>
                          <span className="size-2 rounded-full bg-emerald-500" />
                        </div>
                        <p className="mt-0.5 text-xs font-semibold text-slate-400">
                          {student.grade}
                        </p>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Match Rate */}
                      <div className="inline-flex items-center gap-1 rounded-full bg-[#e7faef] px-3 py-1 text-xs font-bold text-[#16a34a]">
                        <Sparkles size={13} />
                        <span>نسبة التوافق {student.matchRate}%</span>
                      </div>

                      {/* Same Subject */}
                      {student.sameSubject && (
                        <div className="inline-flex items-center gap-1 rounded-full bg-[#e7faef] px-3 py-1 text-xs font-bold text-[#16a34a]">
                          <Check size={13} strokeWidth={2.5} />
                          <span>نفس المادة</span>
                        </div>
                      )}

                      {/* Same Goal */}
                      {student.sameGoal && (
                        <div className="inline-flex items-center gap-1 rounded-full bg-[#e7faef] px-3 py-1 text-xs font-bold text-[#16a34a]">
                          <Check size={13} strokeWidth={2.5} />
                          <span>نفس الهدف</span>
                        </div>
                      )}

                      {/* Silent Study */}
                      {student.silentStudy && (
                        <div className="inline-flex items-center gap-1 rounded-full bg-[#e0efff] px-3 py-1 text-xs font-bold text-[#2563eb]">
                          <VolumeX size={13} />
                          <span>مذاكرة صامتة</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom details row */}
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-slate-100 pt-3 text-xs gap-2">
                    {/* Audio Preference */}
                    <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                      <span>تفضيل الصوت: {student.audioPreference}</span>
                      {student.audioIcon === "chat" ? (
                        <MessageSquare size={14} className="text-slate-400" />
                      ) : (
                        <Mic size={14} className="text-slate-400" />
                      )}
                    </div>

                    {/* Availability */}
                    <div className="flex items-center gap-1.5">
                      {student.isReadyNow ? (
                        <div className="inline-flex items-center gap-1 font-bold text-[#17a6d1]">
                          <Zap size={14} className="fill-[#17a6d1]" />
                          <span>{student.availability}</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1 font-medium text-slate-500">
                          <Clock size={14} />
                          <span>{student.availability}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Bottom Action Bar */}
          <div className="mt-8 flex items-center justify-between rounded-full border border-[#cbd8e8] bg-white px-5 py-3 shadow-sm sm:px-6 sm:py-3.5">
            {/* Right side in RTL: Status text */}
            <div className="flex items-center gap-2 text-[#103b3e]">
              <UsersRound className="size-5 text-[#17a6d1]" />
              <span className="text-base font-bold">
                {selectedStudentIds.length === 0
                  ? "اختر زميلاً للبدء"
                  : `تم اختيار ${selectedStudentIds.length} من ${isThreeOrMore ? "3+" : targetCount}`}
              </span>
            </div>

            {/* Left side in RTL: Action buttons */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                disabled={!canStart}
                onClick={() => {
                  const query = new URLSearchParams({
                    students: selectedStudentIds.join(","),
                    subject: getSubjectDisplay(),
                    goal: getGoalLabel(),
                    style: getStyleLabel(),
                  }).toString();
                  router.push(`/MeetingRoom?${query}`);
                }}
                className="flex items-center gap-2 rounded-full bg-[#17a6d1] px-6 py-3 text-xs sm:text-sm font-bold text-white transition hover:bg-[#1395bc] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:opacity-60 cursor-pointer shadow-sm"
              >
                <Play size={14} className="fill-current" />
                <span>بدء الجلسة</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main dir="rtl" className="py-5 overflow-y-auto">
      <div className="mx-auto w-full max-w-190">
        {/* Header */}
        <header className="mb-7 text-center">
          <span className="inline-flex rounded-full bg-[#fff1c7] px-4 py-1.5 text-sm font-medium text-[#34545a]">
            يلا نذاكر
          </span>

          <h1 className="mt-4 text-3xl font-bold text-[#103b3e] sm:text-4xl">
            {steps[currentIndex].title}
          </h1>

          <p className="mt-2 text-base text-slate-500 sm:text-lg">
            خطوة {currentIndex + 1} من {steps.length} — إحنا بنجمع اختياراتك
            عشان نلاقي لك ناس مناسبة.
          </p>
        </header>

        {/* Stepper */}
        <Stepper
          key={steps.length}
          dir="rtl"
          value={currentStep}
          onValueChange={setCurrentStep}
          className="w-full"
        >
          <StepperList className="mb-4 flex w-fit mx-auto items-center justify-center gap-2">
            {steps.map((step, index) => (
              <StepperItem
                key={step.value}
                value={step.value}
                className="flex-none"
              >
                <div
                  aria-label={step.title}
                  onClick={() => {
                    if (index < currentIndex) {
                      setCurrentStep(step.value);
                    }
                  }}
                  className={
                    index < currentIndex
                      ? "cursor-pointer py-2"
                      : "pointer-events-none py-2"
                  }
                >
                  <StepperIndicator
                    className={`h-2 min-h-0 rounded-full border-0 p-0 transition-all duration-300 ${
                      index === currentIndex
                        ? "w-10 bg-[#17a6d1]"
                        : index < currentIndex
                          ? "w-2 bg-[#17a6d1]"
                          : "w-2 bg-[#d4dadd]"
                    }`}
                  />
                </div>
              </StepperItem>
            ))}
          </StepperList>

          {/* Remaining steps */}
          {steps.map((step) => (
            <StepperContent key={step.value} value={step.value}>
              <section className="rounded-4xl border border-slate-200 bg-white p-5 shadow-sm xl:p-9">
                {step.value === "subjects" ? (
                  educationLevel === "university_student" ? (
                    selectedFaculty && selectedYear ? (
                      <UniversitySubjects
                        selectedFaculty={selectedFaculty}
                        selectedYear={selectedYear}
                        selectedSubjects={universitySubjects}
                        onChange={setUniversitySubjects}
                      />
                    ) : null
                  ) : educationLevel === "skill_development" ? (
                    <SkillDevelopment
                      selectedSkills={selectedSkills}
                      onChange={(skill) => {
                        if (skill !== selectedSkills) {
                          setSkillSelectedTopics([]);
                          setStudyStyle(null);
                          null;
                          setGoal(null);
                          setPeopleCount(null);
                        }
                        setSelectedSkills(skill);
                      }}
                    />
                  ) : (
                    <StepSubjects
                      educationLevel={educationLevel}
                      educationSystem={educationSystem}
                      academicTrack={academicTrack}
                      selectedSubjects={selectedSubjects}
                      selectedSecondLanguage={selectedSecondLanguage}
                      onSecondLanguageChange={setSelectedSecondLanguage}
                      onChange={setSelectedSubjects}
                    />
                  )
                ) : step.value === "universityDetails" ? (
                  <StepUniversityDetails
                    selectedFaculty={selectedFaculty}
                    onFacultyChange={(faculty) => {
                      if (faculty !== selectedFaculty) {
                        setSelectedFaculty(faculty);
                        setSelectedYear("");
                        setUniversitySubjects([]);
                        setUniversitySelectedTopics({});
                        setStudyStyle(null);
                        null;
                        setGoal(null);
                        setPeopleCount(null);
                      }
                    }}
                    selectedYear={selectedYear}
                    onYearChange={(year) => {
                      if (year !== selectedYear) {
                        setSelectedYear(year);
                        setUniversitySubjects([]);
                        setUniversitySelectedTopics({});
                        setStudyStyle(null);
                        null;
                        setGoal(null);
                        setPeopleCount(null);
                      }
                    }}
                  />
                ) : step.value === "topics" ? (
                  educationLevel === "university_student" ? (
                    <UniversityStudyTopics
                      selectedFaculty={selectedFaculty}
                      selectedSubjects={universitySubjects}
                      selectedTopics={universitySelectedTopics}
                      onTopicsChange={setUniversitySelectedTopics}
                    />
                  ) : educationLevel === "skill_development" ? (
                    <SkillStudyTopics
                      selectedSkill={selectedSkills}
                      selectedTopics={skillSelectedTopics}
                      onTopicsChange={setSkillSelectedTopics}
                    />
                  ) : (
                    <StudyTopics
                      educationLevel={educationLevel!}
                      educationSystem={educationSystem}
                      academicTrack={academicTrack}
                      selectedSecondLanguage={selectedSecondLanguage}
                      selectedSubjects={selectedSubjects}
                      selectedTopics={currentSelectedTopics}
                      onTopicsChange={(topics) =>
                        setSelectedTopics((prev) => ({
                          ...prev,
                          [topicsScopeKey]: topics,
                        }))
                      }
                    />
                  )
                ) : step.value === "preferences" ? (
                  <StepPreferences
                    studyStyle={studyStyle}
                    goal={goal}
                    peopleCount={peopleCount}
                    onStudyStyleChange={setStudyStyle}
                    onGoalChange={setGoal}
                    onPeopleCountChange={setPeopleCount}
                  />
                ) : step.value === "level" ? (
                  <StepEducation
                    educationLevel={educationLevel}
                    educationSystem={educationSystem}
                    academicTrack={academicTrack}
                    onEducationLevelChange={(level) => {
                      if (level !== educationLevel) {
                        resetSubjectSelections();
                        setAcademicTrack(null);
                      }
                      setEducationLevel(level);

                      if (level !== "university_student") {
                        setSelectedFaculty("");
                        setSelectedYear("");
                        setUniversitySubjects([]);
                        setUniversitySelectedTopics({});
                      }

                      if (level !== "skill_development") {
                        setSelectedSkills(null);
                        setSkillSelectedTopics([]);
                      }
                    }}
                    onEducationSystemChange={(system) => {
                      if (system !== educationSystem) {
                        resetSubjectSelections();
                        setAcademicTrack(null);
                      }

                      setEducationSystem(system);
                    }}
                    onAcademicTrackChange={(track) => {
                      if (track !== academicTrack) {
                        resetSubjectSelections();
                      }

                      setAcademicTrack(track);
                    }}
                  />
                ) : step.value === "complete" ? (
                  <StepSummary
                    educationLevel={educationLevel}
                    selectedSubjects={selectedSubjects}
                    universitySubjects={universitySubjects}
                    selectedSkills={selectedSkills}
                    studyStyle={studyStyle}
                    goal={goal}
                    peopleCount={peopleCount}
                    selectedTopics={currentSelectedTopics}
                    universitySelectedTopics={universitySelectedTopics}
                    skillSelectedTopics={skillSelectedTopics}
                  />
                ) : (
                  <p className="mt-2 text-slate-500">
                    أضف محتوى الخطوة دي هنا.
                  </p>
                )}

                <div className="mt-8 flex gap-3">
                  {currentIndex > 0 && (
                    <button
                      type="button"
                      onClick={previousStep}
                      className="flex-1 rounded-full cursor-pointer border border-slate-200 py-3.5 font-bold text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900"
                    >
                      السابق
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={
                      currentIndex === steps.length - 1
                        ? handleMatching
                        : nextStep
                    }
                    disabled={
                      (currentStep === "level" && isLevelStepDisabled) ||
                      (currentStep === "subjects" &&
                        (educationLevel === "university_student"
                          ? universitySubjects.length === 0
                          : educationLevel === "skill_development"
                            ? !selectedSkills
                            : selectedSubjects.length === 0)) ||
                      (currentStep === "universityDetails" &&
                        (!selectedFaculty || !selectedYear)) ||
                      (currentStep === "topics" &&
                        (educationLevel === "university_student"
                          ? !universitySubjects.every(
                              (subject) =>
                                (universitySelectedTopics[subject] ?? [])
                                  .length > 0,
                            )
                          : educationLevel === "skill_development"
                            ? skillSelectedTopics.length === 0
                            : !selectedSubjects.every(
                                (subject) =>
                                  (currentSelectedTopics[subject] ?? [])
                                    .length > 0,
                              ))) ||
                      (currentStep === "preferences" &&
                        (studyStyle === null ||
                          goal === null ||
                          peopleCount === null))
                    }
                    className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#17a6d1] py-3.5 font-bold text-white transition-colors hover:bg-[#1395bc] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:opacity-60"
                  >
                    {currentIndex === steps.length - 1 ? (
                      <>
                        <span>دورلي على ناس</span>
                        <Search size={18} />
                      </>
                    ) : (
                      "التالي"
                    )}
                  </button>
                </div>
              </section>
            </StepperContent>
          ))}
        </Stepper>
      </div>
    </main>
  );
}
