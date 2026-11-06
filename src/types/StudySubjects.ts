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
  | "physical_education";

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

// All Secondary Subjects
export type SecondarySubject =
  | FirstSecondarySubject
  | SecondSecondarySubject
  | ThirdSecondarySubject;
