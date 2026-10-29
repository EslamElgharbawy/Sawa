
export type StudyGoal = "study" | "homework";

export type StudyStyle = "quiet" | "discussion";

export type StudySubject =
  | "arabic"
  | "english"
  | "math"
  | "physics"
  | "chemistry"
  | "biology"
  | "history"
  | "geography"
  | "other";

export interface StudyMatchingFormData {
  subjects: StudySubject[];
  peopleCount: number | null;
  studyStyle: StudyStyle | null;
  goal: StudyGoal | null;
}
