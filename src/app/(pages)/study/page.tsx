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
import MatchingResults from "@/src/components/MatchingResults/MatchingResults";
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

    mediaPreference,
    setMediaPreference,

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
    <MatchingResults
      matchedStudents={matchedStudents}
      selectedStudentIds={selectedStudentIds}
      targetCount={targetCount}
      canStart={canStart}
      getSubjectDisplay={getSubjectDisplay}
      getPeopleCountLabel={getPeopleCountLabel}
      getStyleLabel={getStyleLabel}
      getGoalLabel={getGoalLabel}
      onBack={() => {
        setMatchingDone(false);
        setIsMatching(false);
      }}
      onToggleStudent={toggleStudent}
      onStart={() => {
        const query = new URLSearchParams({
          students: selectedStudentIds.join(","),
          subject: getSubjectDisplay(),
          goal: getGoalLabel(),
          style: getStyleLabel(),
          styleId: studyStyle || "",
          media: mediaPreference || "",
        }).toString();

        router.push(`/MeetingRoom?${query}`);
      }}
    />
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
                          setMediaPreference(null);
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
                        setGoal(null);
                        setPeopleCount(null);
                        setMediaPreference(null);
                      }
                    }}
                    selectedYear={selectedYear}
                    onYearChange={(year) => {
                      if (year !== selectedYear) {
                        setSelectedYear(year);
                        setUniversitySubjects([]);
                        setUniversitySelectedTopics({});
                        setStudyStyle(null);
                        setGoal(null);
                        setPeopleCount(null);
                        setMediaPreference(null);
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
                    mediaPreference={mediaPreference}
                    onStudyStyleChange={setStudyStyle}
                    onGoalChange={setGoal}
                    onPeopleCountChange={setPeopleCount}
                    onMediaPreferenceChange={setMediaPreference}
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
                    mediaPreference={mediaPreference}
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
                          peopleCount === null ||
                          (studyStyle === "discussion" &&
                            mediaPreference === null)))
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
