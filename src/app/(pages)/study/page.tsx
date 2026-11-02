"use client";

import { useState } from "react";
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperList,
  StepperSeparator,
} from "@/components/ui/stepper";
import StepSubjects from "@/src/components/StudyMatching/Steps/StepSubjects";
import StepPeople from "@/src/components/StudyMatching/Steps/StepPeople";
import StepEducation from "@/src/components/StudyMatching/Steps/StepEducation";
import {
  AcademicTrack,
  EducationLevel,
  EducationSystem,
} from "@/src/types/StudyEducation";
import { SecondarySubject } from "@/src/types/StudySubjects";
const steps = [
  { value: "level", title: "إيه مرحلتك التعليمية؟" },
  { value: "subjects", title: "هتذاكر إيه؟" },
  { value: "people", title: "هتذاكر مع كام شخص؟" },
  { value: "schedule", title: "جدولك عامل إزاي؟" },
  { value: "preferences", title: "تفضيلاتك" },
  { value: "complete", title: "جاهزين نبدأ؟" },
];

export default function StudyStepper() {
  const [currentStep, setCurrentStep] = useState("level");
  const [selectedSubjects, setSelectedSubjects] = useState<SecondarySubject[]>(
    [],
  );
  const [peopleCount, setPeopleCount] = useState<number | null>(null);
  const [educationLevel, setEducationLevel] = useState<EducationLevel | null>(
    null,
  );
  const [educationSystem, setEducationSystem] =
    useState<EducationSystem>("general");
  const [academicTrack, setAcademicTrack] = useState<AcademicTrack | null>(
    null,
  );

  const currentIndex = steps.findIndex((step) => step.value === currentStep);

  const isLevelStepDisabled =
    educationLevel === null ||
    ((educationLevel === "high_school_2" ||
      educationLevel === "high_school_3") &&
      academicTrack === null);

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

                {index < steps.length - 1 && (
                  <StepperSeparator className="hidden" />
                )}
              </StepperItem>
            ))}
          </StepperList>

          {/* Remaining steps */}
          {steps.map((step) => (
            <StepperContent key={step.value} value={step.value}>
              <section className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
                {step.value === "subjects" ? (
                  <StepSubjects
                    educationLevel={educationLevel}
                    educationSystem={educationSystem}
                    academicTrack={academicTrack}
                    selectedSubjects={selectedSubjects}
                    onChange={setSelectedSubjects}
                  />
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
                    onEducationLevelChange={setEducationLevel}
                    onEducationSystemChange={setEducationSystem}
                    onAcademicTrackChange={setAcademicTrack}
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
                        selectedSubjects.length === 0) ||
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
