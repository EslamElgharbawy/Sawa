export type EducationLevel =
  | "high_school_1"
  | "high_school_2"
  | "high_school_3"
  | "university_student"
  | "skill_development";

export type EducationSystem = "general" | "baccalaureate";

export type AcademicTrack =
  | "science"
  | "mathematics"
  | "literary"
  | "medical"
  | "engineering"
  | "business"
  | "arts";

export interface StepEducationProps {
  educationLevel: EducationLevel | null;
  educationSystem: EducationSystem;
  academicTrack: AcademicTrack | null;
  onEducationLevelChange: (level: EducationLevel) => void;
  onEducationSystemChange: (system: EducationSystem) => void;
  onAcademicTrackChange: (track: AcademicTrack | null) => void;
}
