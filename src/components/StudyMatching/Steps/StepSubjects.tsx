"use client";

import { EducationLevel, SecondarySubject } from "@/src/types/StudySubjects";
import FirstSecondary from "../../Subjects/FirstSecondary";
import SecondSecondary from "../../Subjects/SecondSecondary";
import ThirdSecondary from "../../Subjects/ThirdSecondary";
import UniversitySubjects from "../../Subjects/UniversitySubjects";
import SkillDevelopment from "../../Subjects/SkillDevelopment";


interface StepSubjectsProps {
  educationLevel: EducationLevel | null;
  selectedSubjects: SecondarySubject[];
  onChange: (subjects: SecondarySubject[]) => void;
}

export default function StepSubjects({
  educationLevel,
  selectedSubjects,
  onChange,
}: StepSubjectsProps) {
  switch (educationLevel) {
    case "high_school_1":
      return (
        <FirstSecondary
          selectedSubjects={selectedSubjects}
          onChange={onChange}
        />
      );

    case "high_school_2":
      return (
        <SecondSecondary
        />
      );

    case "high_school_3":
      return (
        <ThirdSecondary
        />
      );

    case "university_student":
      return (
        <UniversitySubjects
        />
      );

    case "skill_development":
      return (
        <SkillDevelopment
        />
      );

    default:
      return null;
  }
}