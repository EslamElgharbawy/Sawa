"use client";

import { useState } from "react";
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperList,
} from "@/components/ui/stepper";
import StepSubjects from "@/src/components/StudyMatching/Steps/StepSubjects";
import StepPeople from "@/src/components/StudyMatching/Steps/StepPeople";
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
import StepGoal from "@/src/components/StudyMatching/Steps/StepGoal";
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
  const [studyTime, setStudyTime] = useState<StudyTime | null>(null);
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
    { value: "goal", title: "إيه هدفك من المذاكرة؟" },
    { value: "people", title: "هتذاكر مع كام شخص؟" },
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
    setStudyStyle(null);
    setStudyTime(null);
    setGoal(null);
    setPeopleCount(null);
  };

  const handleMatching = () => {
    setIsMatching(true);
    setMatchingDone(false);

    setTimeout(() => {
      const count = peopleCount ?? 1;
      const initialIds = ["student-1", "student-2", "student-3", "student-4"].slice(
        0,
        count,
      );
      setSelectedStudentIds(initialIds);
      setIsMatching(false);
      setMatchingDone(true);
    }, 2500);
  };

  // Helper texts for selected choices
  const getSubjectDisplay = () => {
  const subjects =
    educationLevel === "university_student"
      ? universitySubjects
      : selectedSubjects.map((s) => SUBJECT_LABELS[s] ?? s);

  if (subjects.length === 0) return "مذاكرة عامة";
  if (subjects.length === 1) return subjects[0];
  if (subjects.length === 2) return `${subjects[0]}، ${subjects[1]}`;
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

  const getTimeLabel = () => {
    switch (studyTime) {
      case "morning":
        return "الصبح";
      case "afternoon":
        return "بعد الظهر";
      case "night":
        return "بالليل";
      default:
        return "دلوقتي";
    }
  };

  const getPeopleCountLabel = () => {
    if (peopleCount === 1) return "شخص واحد";
    if (peopleCount === 2) return "شخصين";
    if (peopleCount) return `${peopleCount} أشخاص`;
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
  ];

  // 1. شاشة جاري المطابقة (Loading State)
  if (isMatching) {
    return (
      <main
        dir="rtl"
        className="flex min-h-[75vh] items-center justify-center py-10 px-4"
      >
        <div className="w-full max-w-lg rounded-4xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
          {/* Animated radar effect */}
          <div className="relative mx-auto mb-6 flex size-24 items-center justify-center">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#17a6d1]/20 duration-1000" />
            <span className="absolute inline-flex size-20 rounded-full bg-[#ddf5ff]" />
            <div className="relative flex size-14 items-center justify-center rounded-full bg-[#17a6d1] text-white shadow-md">
              <Search className="size-7 animate-pulse" />
            </div>
          </div>

          <span className="inline-flex rounded-full bg-[#fff1c7] px-4 py-1.5 text-xs font-bold text-[#34545a]">
            جاري المطابقة
          </span>

          <h2 className="mt-4 text-2xl font-black text-[#103b3e] sm:text-3xl">
            بندور على ناس تناسبك...
          </h2>

          <p className="mt-2 text-sm text-slate-500 sm:text-base leading-relaxed">
            ثواني وبنطابق اختياراتك مع أفضل الزملاء المناسبين لأهدافك ومواعيدك.
          </p>

          <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-2/3 animate-[pulse_1.5s_ease-in-out_infinite] rounded-full bg-[#17a6d1]" />
          </div>
        </div>
      </main>
    );
  }

  // 2. شاشة تم العثور على الطلبة المناسبين (Matched State - المطابقة للتصميم المرفق)
  if (matchingDone) {
    const count = peopleCount ?? 1;
    const displayedStudents = matchedStudents.slice(0, count);

    const toggleStudent = (id: string) => {
      setSelectedStudentIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
      );
    };

    return (
      <main
        dir="rtl"
        className="py-4 overflow-y-auto flex flex-col justify-center items-center relative"
      >
        <div className="w-full max-w-3xl">
          {/* Top Return link */}
          <button
            type="button"
            onClick={() => {
              setMatchingDone(false);
              setIsMatching(false);
            }}
            className="flex items-center justify-center mb-4 gap-2 text-sm font-bold text-[#103b3e] transition-colors hover:text-[#17a6d1] cursor-pointer"
          >
            <ArrowRight size={17} className="mt-0.5" />
            <span>تعديل الاختيارات</span>
          </button>

          {/* Header */}
          <header className="text-center mb-10">
            <h1 className="text-2xl sm:text-3xl font-black text-[#103b3e] flex items-center justify-center gap-2">
              <span className="text-[#f59e0b]">✨</span>
              <span>
                {count === 1
                  ? "لقينا 1 من الطلبة المناسبين"
                  : `لقينا ${count} من الطلبة المناسبين`}
              </span>
            </h1>

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

              {/* Time Tag */}
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#17a6d1]/20 bg-[#ddf5ff] px-3.5 py-1.5 text-xs font-bold text-[#103b3e]">
                <Clock size={14} className="text-[#17a6d1]" />
                <span>{getTimeLabel()}</span>
              </div>
            </div>
          </header>

          {/* Cards List */}
          <div className="space-y-4">
            {displayedStudents.map((student) => {
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

                      {/* Same Time */}
                      {student.sameTime && (
                        <div className="inline-flex items-center gap-1 rounded-full bg-[#e7faef] px-3 py-1 text-xs font-bold text-[#16a34a]">
                          <Clock size={13} />
                          <span>نفس التوقيت</span>
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
                  ? "لم تختر أي زميل بعد"
                  : selectedStudentIds.length === 1
                    ? `اخترت: ${displayedStudents.find((s) => s.id === selectedStudentIds[0])?.name ?? "زميل واحد"}${count > 1 ? ` (1 من ${count})` : ""}`
                    : selectedStudentIds.length === count
                      ? `اكتملت المجموعة (${count} من ${count})`
                      : `اخترت ${selectedStudentIds.length} من ${count} زملاء`}
              </span>
            </div>

            {/* Left side in RTL: Action buttons */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-full border border-[#cbd8e8] bg-[#f3f7fd] px-5 py-3 text-xs sm:text-sm font-bold text-[#103b3e] transition hover:bg-[#e5effb] hover:text-[#0c2e30] cursor-pointer"
              >
                <Bookmark size={15} />
                <span>احفظها لبعدين</span>
              </button>

              <button
                type="button"
                disabled={selectedStudentIds.length === 0}
                className="flex items-center gap-2 rounded-full bg-[#17a6d1] px-6 py-3 text-xs sm:text-sm font-bold text-white transition hover:bg-[#1395bc] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:opacity-60 cursor-pointer shadow-sm"
              >
                <Play size={14} className="fill-current" />
                <span>
                  {selectedStudentIds.length === 1
                    ? `ابدأ الجلسة مع ${displayedStudents.find((s) => s.id === selectedStudentIds[0])?.name ?? "الزميل"}`
                    : `ابدأ الجلسة مع المجموعة (${selectedStudentIds.length})`}
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // 3. شاشة الخطوات (Stepper)
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
                <div aria-label={step.title} className="pointer-events-none">
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
                          setStudyTime(null);
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
                        setStudyTime(null);
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
                        setStudyTime(null);
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
                    studyTime={studyTime}
                    onStudyStyleChange={setStudyStyle}
                    onStudyTimeChange={setStudyTime}
                  />
                ) : step.value === "people" ? (
                  <StepPeople
                    peopleCount={peopleCount}
                    onChange={setPeopleCount}
                  />
                ) : step.value === "goal" ? (
                  <StepGoal goal={goal} onChange={setGoal} />
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
                    studyTime={studyTime}
                    studyStyle={studyStyle}
                    goal={goal}
                    peopleCount={peopleCount}
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
                      (currentStep === "goal" && goal === null) ||
                      (currentStep === "preferences" &&
                        (studyStyle === null || studyTime === null)) ||
                      (currentStep === "people" && peopleCount === null)
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
