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
import { StudySubject } from "@/src/types/StudyMatching";
const steps = [
  { value: "subjects", title: "هتذاكر إيه؟" },
  { value: "level", title: "مستواك إيه؟" },
  { value: "schedule", title: "جدولك عامل إزاي؟" },
  { value: "preferences", title: "تفضيلاتك" },
  { value: "complete", title: "جاهزين نبدأ؟" },
];

export default function StudyStepper() {
  const [currentStep, setCurrentStep] = useState("subjects");
  const [selectedSubjects, setSelectedSubjects] = useState<StudySubject[]>([]);

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

  return (
    <main dir="rtl" className="py-5 overflow-y-auto">
      <div className="mx-auto w-full max-w-180">
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
                    selectedSubjects={selectedSubjects}
                    onChange={setSelectedSubjects}
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
                    disabled={currentStep === "subjects" && selectedSubjects.length === 0}
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
