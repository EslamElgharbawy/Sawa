
import { useState, useEffect, useCallback } from "react";

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

import { StudyGoal, StudyStyle } from "@/src/types/StudyMatching";

export default function useStudyFlow() {
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

  const [educationLevel, setEducationLevel] =
    useState<EducationLevel | null>(null);

  const [selectedSkills, setSelectedSkills] = useState<string | null>(null);

  const [educationSystem, setEducationSystem] =
    useState<EducationSystem>("general");

  const [academicTrack, setAcademicTrack] = useState<AcademicTrack | null>(
    null,
  );

  const resetSubjectSelections = useCallback(() => {
    setSelectedSubjects([]);
    setSelectedTopics({});
    setSelectedSecondLanguage(undefined);
    setSelectedSkills(null);
    setSkillSelectedTopics([]);
    setUniversitySubjects([]);
    setUniversitySelectedTopics({});
  }, []);

  const resetStudyFlow = useCallback(() => {
    setCurrentStep("level");

    setSelectedFaculty("");
    setSelectedYear("");
    setUniversitySubjects([]);
    setSelectedSubjects([]);

    setSelectedTopics({});
    setUniversitySelectedTopics({});
    setSkillSelectedTopics([]);
    setSelectedSecondLanguage(undefined);

    setStudyStyle(null);
    setGoal(null);
    setPeopleCount(null);

    setEducationLevel(null);
    setSelectedSkills(null);
    setEducationSystem("general");
    setAcademicTrack(null);
  }, []);
  
  const steps = [
    { value: "level", title: "إيه مرحلتك التعليمية؟" },

    ...(educationLevel === "university_student"
      ? [{ value: "universityDetails", title: "عرفنا بتدرس إيه؟" }]
      : []),

    { value: "subjects", title: "هتذاكر إيه؟" },
    { value: "topics", title: "هتذاكر إيه في كل مادة؟" },
    { value: "preferences", title: "تحب تذاكر إزاي؟" },
    { value: "complete", title: "اختياراتك" },
  ];

  const currentIndex = steps.findIndex(
    (step) => step.value === currentStep,
  );

  const nextStep = useCallback(() => {
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].value);
    }
  }, [currentIndex, steps]);

  const previousStep = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].value);
    }
  }, [currentIndex, steps]);

  const isLevelStepDisabled =
    educationLevel === null ||
    ((educationLevel === "high_school_2" ||
      educationLevel === "high_school_3") &&
      academicTrack === null);

  const topicsScopeKey = `${educationSystem}_${educationLevel}_${academicTrack ?? "default"}`;

  const currentSelectedTopics = selectedTopics[topicsScopeKey] ?? {};

  return {
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
  };
}
