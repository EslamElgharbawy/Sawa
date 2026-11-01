// Education Level
export type EducationLevel =
  | "high_school_1"
  | "high_school_2"
  | "high_school_3"
  | "university_student"
  | "skill_development";

// Academic Track
export type AcademicTrack =
  | "science"
  | "mathematics"
  | "literary"
  | "medical"
  | "engineering"
  | "business"
  | "arts";

// First Secondary
export type FirstSecondarySubject =
  | "arabic"
  | "english"
  | "math"
  | "integrated_science"
  | "history"
  | "philosophy"
  | "programming"
  | "religion"
  | "second_language"
  | "physical_education";

// Second Secondary
export type SecondSecondarySubject =
  | "arabic"
  | "english"
  | "math"
  | "physics"
  | "chemistry"
  | "biology"
  | "history";

// Third Secondary
export type ThirdSecondarySubject =
  | "arabic"
  | "english"
  | "math"
  | "physics"
  | "chemistry"
  | "biology";

// All Secondary Subjects
export type SecondarySubject =
  | FirstSecondarySubject
  | SecondSecondarySubject
  | ThirdSecondarySubject;
