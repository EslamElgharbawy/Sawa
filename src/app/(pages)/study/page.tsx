"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
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
import StepUniversityDetails from "@/src/components/StudyMatching/Steps/StepUniversityDetails";
import UniversitySubjects from "@/src/components/Subjects/UniversitySubjects";
import SkillDevelopment from "@/src/components/Subjects/SkillDevelopment";
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
  Play,
  VolumeX,
  FlaskConical,
} from "lucide-react";
import { MatchedStudent } from "@/src/types/StudyMatching";
import useStudyMatching from "@/src/hooks/useStudyMatching";
import useStudyFlow from "@/src/hooks/useStudyFlow";
import MatchingLoader from "@/src/components/MatchingLoader/MatchingLoader";
export default function StudyStepper() {
  const router = useRouter();
  const pathname = usePathname();

  const {
    currentStep,
    setCurrentStep,

    selectedFaculty,
    setSelectedFaculty,

    selectedYear,
    setSelectedYear,

    universitySubjects,
    setUniversitySubjects,

    selectedSubjects,
    setSelectedSubjects,

    selectedTopics,
    setSelectedTopics,

    universitySelectedTopics,
    setUniversitySelectedTopics,

    skillSelectedTopics,
    setSkillSelectedTopics,

    selectedSecondLanguage,
    setSelectedSecondLanguage,

    studyStyle,
    setStudyStyle,

    goal,
    setGoal,

    peopleCount,
    setPeopleCount,

    educationLevel,
    setEducationLevel,

    selectedSkills,
    setSelectedSkills,

    educationSystem,
    setEducationSystem,

    academicTrack,
    setAcademicTrack,

    resetSubjectSelections,
    resetStudyFlow,

    steps,
    currentIndex,
    nextStep,
    previousStep,

    isLevelStepDisabled,

    topicsScopeKey,
    currentSelectedTopics,
  } = useStudyFlow();

  // Matching states and actions
  const {
    isMatching,
    setIsMatching,

    matchingDone,
    setMatchingDone,

    matchingProgress,

    selectedStudentIds,

    toggleStudent,
    handleMatching,
    resetMatching,

    targetCount,
    isThreeOrMore,
    canStart,
    isMaxReached,
  } = useStudyMatching(peopleCount, 5);

  // إعادة ضبط تدفق المذاكرة والمطابقة بالكامل عند الرجوع بعد إنهاء الاجتماع
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("resetStudyFlow") === "true") {
        sessionStorage.removeItem("resetStudyFlow");
        resetStudyFlow();
        resetMatching();
      }
    }
  }, [pathname, resetStudyFlow, resetMatching]);

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

  if (isMatching) {
    return (
      <MatchingLoader
        matchingProgress={matchingProgress}
        getSubjectDisplay={getSubjectDisplay}
        getStyleLabel={getStyleLabel}
        getGoalLabel={getGoalLabel}
        onCancel={() => setIsMatching(false)}
      />
    );
  }

  if (matchingDone) {
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
