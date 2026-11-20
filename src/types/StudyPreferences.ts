import type { LucideIcon } from "lucide-react";
import type { StudyStyle, StudyGoal, StudyTime, MediaPreference } from "./StudyMatching";
export interface StepPreferencesProps {
  studyStyle: StudyStyle | null;
  goal: StudyGoal | null;
  peopleCount: number | null;
  mediaPreference?: MediaPreference | null;

  onStudyStyleChange: (style: StudyStyle | null) => void;
  onGoalChange: (goal: StudyGoal | null) => void;
  onPeopleCountChange: (count: number | null) => void;
  onMediaPreferenceChange?: (media: MediaPreference | null) => void;

  studyTime?: StudyTime | null;
  onStudyTimeChange?: (time: StudyTime | null) => void;
}

export interface StyleOption {
  id: StudyStyle;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface GoalOption {
  id: StudyGoal;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface MediaOption {
  id: MediaPreference;
  title: string;
  description: string;
  icon: LucideIcon;
}
