import { BaccalaureateTrack, GeneralSecondaryTrack } from "@/src/types/StudyEducation";
import { StudyGoal, StudyStyle, StudySubject } from "@/src/types/StudyMatching";
import { FirstSecondarySubject, SecondSecondarySubject } from "@/src/types/StudySubjects";

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

export const FIRST_SECONDARY_SUBJECTS: {
  value: FirstSecondarySubject;
  label: string;
}[] = [
  { value: "arabic", label: "اللغة العربية" },
  { value: "english", label: "اللغة الأجنبية الأولى" },
  { value: "math", label: "الرياضيات" },
  { value: "integrated_science", label: "العلوم المتكاملة" },
  { value: "history", label: "التاريخ" },
  { value: "philosophy", label: "الفلسفة والمنطق" },
  { value: "religion", label: "التربية الدينية" },
  { value: "second_language", label: "اللغة الأجنبية الثانية" },
  { value: "programming", label: "البرمجة والذكاء الاصطناعي" },
];

export const GENERAL_SECONDARY_SUBJECTS: Record<
  GeneralSecondaryTrack,
  { value: SecondSecondarySubject; label: string }[]
> = {
  science: [
    { value: "arabic", label: "اللغة العربية" },
    { value: "first_language", label: "اللغة الأجنبية الأولى" },
    { value: "history", label: "التاريخ" },
    { value: "math", label: "الرياضيات" },
    { value: "chemistry", label: "الكيمياء" },
    { value: "physics", label: "الفيزياء" },
  ],
 mathematics: [
    { value: "arabic", label: "اللغة العربية" },
    { value: "first_language", label: "اللغة الأجنبية الأولى" },
    { value: "history", label: "التاريخ" },
    { value: "math", label: "الرياضيات" },
    { value: "chemistry", label: "الكيمياء" },
    { value: "physics", label: "الفيزياء" },
  ],

  literary: [
    { value: "arabic", label: "اللغة العربية" },
    { value: "first_language", label: "اللغة الأجنبية الأولى" },
    { value: "history", label: "التاريخ" },
    { value: "geography", label: "الجغرافيا" },
    { value: "psychology", label: "علم النفس والاجتماع" },
    { value: "math", label: "الرياضيات" },
  ],
};

export const BACCALAUREATE_SECONDARY_SUBJECTS: Record<
  BaccalaureateTrack,
  { value: SecondSecondarySubject; label: string }[]
> = {
  medical: [
    { value: "arabic", label: "اللغة العربية" },
    { value: "first_language", label: "اللغة الأجنبية الأولى" },
    { value: "egyptian_history", label: "التاريخ المصري" },
    { value: "physics", label: "الفيزياء" },
    { value: "math", label: "الرياضيات" },
  ],

  engineering: [
  { value: "arabic", label: "اللغة العربية" },
  { value: "first_language", label: "اللغة الأجنبية الأولى" },
  { value: "egyptian_history", label: "التاريخ المصري" },
  { value: "chemistry", label: "الكيمياء" },
  { value: "programming_ai", label: "البرمجة والذكاء الاصطناعي" },
],
  business: [
  { value: "arabic", label: "اللغة العربية" },
  { value: "first_language", label: "اللغة الأجنبية الأولى" },
  { value: "egyptian_history", label: "التاريخ المصري" },
  { value: "accounting", label: "المحاسبة" },
  { value: "business_management", label: "إدارة الأعمال" },
],
  arts: [
  { value: "arabic", label: "اللغة العربية" },
  { value: "first_language", label: "اللغة الأجنبية الأولى" },
  { value: "egyptian_history", label: "التاريخ المصري" },
  { value: "psychology", label: "علم النفس" },
  { value: "second_language", label: "اللغة الأجنبية الثانية" },
],
};

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
