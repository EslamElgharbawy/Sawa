"use client";

import {
  SecondarySubject,
} from "@/src/types/StudySubjects";
import FirstSecondary from "../../Subjects/FirstSecondary";
import SecondSecondary from "../../Subjects/SecondSecondary";
import ThirdSecondary from "../../Subjects/ThirdSecondary";
import { AcademicTrack, EducationLevel, EducationSystem } from "@/src/types/StudyEducation";

interface StepSubjectsProps {
  educationLevel: EducationLevel | null;
  educationSystem: EducationSystem;
  academicTrack: AcademicTrack | null;
  selectedSubjects: SecondarySubject[];
  onChange: (subjects: SecondarySubject[]) => void;
}

export default function StepSubjects({
  educationLevel,
  educationSystem,
  academicTrack,
  selectedSubjects,
  onChange,
}: StepSubjectsProps) {
  if (educationSystem === "general") {
    switch (educationLevel) {
      case "high_school_1":
        return (
          <FirstSecondary
            selectedSubjects={selectedSubjects}
            onChange={onChange}
          />
        );

      case "high_school_2":
        if (academicTrack !== "science" && academicTrack !== "literary" && academicTrack !== "mathematics") {
          return null;
        }

        return (
          <SecondSecondary
            selectedSubjects={selectedSubjects}
            onChange={onChange}
            academicTrack={academicTrack}
          />
        );
      case "high_school_3":
        return <ThirdSecondary />;
    }
  }

  if (educationSystem === "baccalaureate") {
    // هنا هنضيف كومبوننت مواد البكالوريا
  }
}
