import { StudyGoal, StudyStyle, StudySubject } from "@/src/types/StudyMatching";

export const SUBJECTS: {
  value: StudySubject;
  label: string;
}[] = [
  { value: "arabic", label: "عربي" },
  { value: "english", label: "English" },
  { value: "math", label: "رياضيات" },
  { value: "physics", label: "فيزياء" },
  { value: "chemistry", label: "كيمياء" },
  { value: "biology", label: "أحياء" },
  { value: "history", label: "تاريخ" },
  { value: "geography", label: "جغرافيا" },
  { value: "other", label: "أخرى" },
];

export const STUDY_STYLES: {
  value: StudyStyle;
  label: string;
  description: string;
}[] = [
  {
    value: "quiet",
    label: "هدوء",
    description: "من غير كلام، كل واحد يذاكر مع وجود الآخرين.",
  },
  {
    value: "discussion",
    label: "تفاعل ونقاش",
    description: "نتكلم ونتناقش ونساعد بعض أثناء المذاكرة.",
  },
];

export const STUDY_GOALS: {
  value: StudyGoal;
  label: string;
  description: string;
}[] = [
  {
    value: "study",
    label: "مذاكرة",
    description: "عايز تفهم وتراجع الدروس.",
  },
  {
    value: "homework",
    label: "واجب",
    description: "عايز تخلص واجب محدد.",
  },
];

export const PEOPLE_COUNT_OPTIONS = [1, 2, 3, 4] as const;
