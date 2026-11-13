export type StudyGoal = "study" | "homework";

export type StudyStyle = "quiet" | "discussion";

export type StudyTime = "morning" | "afternoon" | "night" | "anytime";

export type StudySubject =
  | "arabic"
  | "english"
  | "math"
  | "physics"
  | "chemistry"
  | "biology"
  | "history"
  | "geography"
  | "other"
  | "integrated_science"
  | "philosophy"
  | "programming";

export interface StudyMatchingFormData {
  subjects: StudySubject[];
  peopleCount: number | null;
  studyStyle: StudyStyle | null;
  studyTime: StudyTime | null;
  goal: StudyGoal | null;
}
