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
import StepUniversityDetails from "@/src/components/StudyMatching/Steps/StepUniversityDetails";
import UniversitySubjects from "@/src/components/Subjects/UniversitySubjects";
import SkillDevelopment from "@/src/components/Subjects/SkillDevelopment";
import StudyTopics from "@/src/components/StudyTopics/StudyTopics";
import UniversityStudyTopics from "@/src/components/StudyTopics/UniversityStudyTopics";
import SkillStudyTopics from "@/src/components/StudyTopics/SkillStudyTopics";

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
    { value: "preferences", title: "تفضيلاتك" },
    { value: "people", title: "هتذاكر مع كام شخص؟" },
    { value: "complete", title: "جاهزين نبدأ؟" },
  ];
  const currentIndex = steps.findIndex((step) => step.value === currentStep);
  const nextStep = () => {
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].value);
    }
  };

  const previousStep = () => {
    if (currentIndex > 0) {
      if (currentStep === "topics" && educationLevel === "skill_development") {
        setSkillSelectedTopics([]);
      }
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
  };
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
                      setSelectedFaculty(faculty);
                      setSelectedYear("");
                      setUniversitySubjects([]);
                    }}
                    selectedYear={selectedYear}
                    onYearChange={(year) => {
                      setSelectedYear(year);
                      setUniversitySubjects([]);
                    }}
                  />
                ) : step.value === "topics" ? (
                  educationLevel === "university_student" ? (
                    <UniversityStudyTopics
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
                ) : step.value === "people" ? (
                  <StepPeople
                    peopleCount={peopleCount}
                    onChange={setPeopleCount}
                  />
                ) : step.value === "level" ? (
                  <StepEducation
                    educationLevel={educationLevel}
                    educationSystem={educationSystem}
                    academicTrack={academicTrack}
                    onEducationLevelChange={(level) => {
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
                      className="flex-1 rounded-full cursor-pointer border border-slate-200 py-3.5 font-bold text-slate-600"
                    >
                      السابق
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={nextStep}
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
                                  (currentSelectedTopics[subject] ?? []).length >
                                  0,
                              ))) ||
                      (currentStep === "people" && peopleCount === null)
                    }
                    className="flex-1 rounded-full cursor-pointer bg-[#17a6d1] py-3.5 font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300 disabled:opacity-60"
                  >
                    {currentIndex === steps.length - 1
                      ? "دورلي على ناس"
                      : "التالي"}
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
