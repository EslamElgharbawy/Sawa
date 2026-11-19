export type StudyGoal = "study" | "revision" | "homework";

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

  export interface MatchedStudent {
  id: string;
  name: string;
  avatarLetter: string;
  avatarBg: string;
  grade: string;
  matchRate: number;
  sameSubject: boolean;
  sameGoal: boolean;
  sameTime?: boolean;
  silentStudy?: boolean;
  audioPreference: string;
  audioIcon: "mic" | "mic-cam" | "chat";
  availability: string;
  isReadyNow: boolean;
}

export interface StudyMatchingFormData {
  subjects: StudySubject[];
  peopleCount: number | null;
  studyStyle: StudyStyle | null;
  studyTime: StudyTime | null;
  goal: StudyGoal | null;
}
