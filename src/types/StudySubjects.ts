import { AcademicTrack, EducationLevel, EducationSystem } from "./StudyEducation";

// First Secondary
export type FirstSecondarySubject =
  | "arabic"
  | "english"
  | "math"
  | "integrated_science"
  | "history"
  | "philosophy"
  | "programming"
  | "islamic_religion"
  | "christian_religion"
  | "second_language"

// Second Secondary
export type SecondSecondarySubject =
  | "arabic"
  | "english"
  | "math"
  | "physics"
  | "chemistry"
  | "geography"
  | "biology"
  | "history"
  | "psychology"
  | "first_language"
  | "egyptian_history"
  | "programming_ai"
  | "accounting"
  | "business_management"
  | "second_language"
  | "islamic_religion"
  | "christian_religion";

// Third Secondary
export type ThirdSecondarySubject =
  | "arabic"
  | "english"
  | "math"
  | "physics"
  | "chemistry"
  | "geography"
  | "biology"
  | "history"
  | "psychology"
  | "first_language"
  | "egyptian_history"
  | "programming_ai"
  | "accounting"
  | "business_management"
  | "second_language"
  | "islamic_religion"
  | "christian_religion"
  | "national_education"
  | "statistics";

// University Faculties
export type UniversityFaculty =
  | "computers"
  | "engineering"
  | "commerce"
  | "medicine"
  | "pharmacy"
  | "law";

// University Years
export type UniversityYear =
  | "first"
  | "second"
  | "third"
  | "fourth"
  | "fifth"
  | "sixth";

// University Subjects
export type UniversitySubject = string;

// University Subject Database
export type SubjectDatabase = Partial<
  Record<
    UniversityFaculty,
    Partial<Record<UniversityYear, string[]>>
  >
>;

export type SecondLanguage =
  | "french"
  | "german"
  | "italian"
  | "spanish"
  | "chinese";

export type FirstSecondarySecondLanguage = Exclude<
  SecondLanguage,
  "chinese"
>;

export type BaccalaureateSecondLanguage = SecondLanguage;

// Study Topics
export type StudyTopicsMap = Partial<
  Record<SecondarySubject, string[]>
>;

export interface StudyTopicsProps {
  educationLevel: EducationLevel;
  educationSystem: EducationSystem;
  academicTrack: AcademicTrack | null;
  selectedSubjects: SecondarySubject[];
  selectedTopics: StudyTopicsMap;
  onTopicsChange: (topics: StudyTopicsMap) => void;
}
export type StudyTopicsBySubject = Partial<
  Record<SecondarySubject, string[]>
>;

export type StudyTopicsState = Record<
  string,
  StudyTopicsBySubject
>;

// All Secondary Subjects
export type SecondarySubject =
  | FirstSecondarySubject
  | SecondSecondarySubject
  | ThirdSecondarySubject;
