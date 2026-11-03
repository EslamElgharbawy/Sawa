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
  | "geography"
  | "biology"
  | "history"
  | "psychology"
  | "first_language"
  | "egyptian_history"
  | "programming_ai"
  | "accounting"
  | "business_management"
  | "second_language";

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
