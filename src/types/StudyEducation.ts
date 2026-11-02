// Education Level
export type EducationLevel =
  | "high_school_1"
  | "high_school_2"
  | "high_school_3"
  | "university_student"
  | "skill_development";

// Education System
export type EducationSystem = "general" | "baccalaureate";

// General Secondary
export type GeneralSecondaryTrack =
  | "science"
  | "mathematics"
  | "literary";

// Baccalaureate
export type BaccalaureateTrack =
  | "medical"
  | "engineering"
  | "business"
  | "arts";

// All Academic Tracks
export type AcademicTrack =
  | GeneralSecondaryTrack
  | BaccalaureateTrack;

// Step Education Props
export interface StepEducationProps {
  educationLevel: EducationLevel | null;
  educationSystem: EducationSystem;
  academicTrack: AcademicTrack | null;
  onEducationLevelChange: (level: EducationLevel) => void;
  onEducationSystemChange: (system: EducationSystem) => void;
  onAcademicTrackChange: (track: AcademicTrack | null) => void;
}