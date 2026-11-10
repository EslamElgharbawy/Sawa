import {
  BaccalaureateTrack,
  GeneralSecondaryTrack,
} from "@/src/types/StudyEducation";
import { StudyGoal, StudyStyle, StudySubject } from "@/src/types/StudyMatching";
import {
  FirstSecondarySubject,
  SecondSecondarySubject,
  SubjectDatabase,
  ThirdSecondarySubject,
} from "@/src/types/StudySubjects";

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
  { value: "islamic_religion", label: "التربية الدينية الإسلامية" },
  { value: "christian_religion", label: "التربية الدينية المسيحية" },
  { value: "second_language", label: "اللغة الأجنبية الثانية" },
  { value: "programming", label: "البرمجة والذكاء الاصطناعي" },
];

export const SECONDARY_YEAR_TWO_SUBJECTS: Record<
  GeneralSecondaryTrack,
  { value: SecondSecondarySubject; label: string }[]
> = {
  science: [
    { value: "arabic", label: "اللغة العربية" },
    { value: "first_language", label: "اللغه الإنجليزية" },
    { value: "history", label: "التاريخ" },
    { value: "math", label: "الرياضيات" },
    { value: "chemistry", label: "الكيمياء" },
    { value: "physics", label: "الفيزياء" },
    { value: "islamic_religion", label: "التربية الدينية الإسلامية" },
    { value: "christian_religion", label: "التربية الدينية المسيحية" },
  ],

  mathematics: [
    { value: "arabic", label: "اللغة العربية" },
    { value: "first_language", label: "اللغه الإنجليزية" },
    { value: "history", label: "التاريخ" },
    { value: "math", label: "الرياضيات" },
    { value: "chemistry", label: "الكيمياء" },
    { value: "physics", label: "الفيزياء" },
    { value: "islamic_religion", label: "التربية الدينية الإسلامية" },
    { value: "christian_religion", label: "التربية الدينية المسيحية" },
  ],

  literary: [
    { value: "arabic", label: "اللغة العربية" },
    { value: "first_language", label: "اللغه الإنجليزية" },
    { value: "history", label: "التاريخ" },
    { value: "geography", label: "الجغرافيا" },
    { value: "psychology", label: "علم النفس والاجتماع" },
    { value: "math", label: "الرياضيات" },
    { value: "islamic_religion", label: "التربية الدينية الإسلامية" },
    { value: "christian_religion", label: "التربية الدينية المسيحية" },
  ],
};

export const BACCALAUREATE_YEAR_TWO_SUBJECTS: Record<
  BaccalaureateTrack,
  { value: SecondSecondarySubject; label: string }[]
> = {
  medical: [
    { value: "arabic", label: "اللغة العربية" },
    { value: "first_language", label: "اللغه الإنجليزية" },
    { value: "egyptian_history", label: "التاريخ المصري" },
    { value: "physics", label: "الفيزياء" },
    { value: "math", label: "الرياضيات" },
    { value: "islamic_religion", label: "التربية الدينية الإسلامية" },
    { value: "christian_religion", label: "التربية الدينية المسيحية" },
  ],

  engineering: [
    { value: "arabic", label: "اللغة العربية" },
    { value: "first_language", label: "اللغه الإنجليزية" },
    { value: "egyptian_history", label: "التاريخ المصري" },
    { value: "chemistry", label: "الكيمياء" },
    { value: "programming_ai", label: "البرمجة والذكاء الاصطناعي" },
    { value: "islamic_religion", label: "التربية الدينية الإسلامية" },
    { value: "christian_religion", label: "التربية الدينية المسيحية" },
  ],

  business: [
    { value: "arabic", label: "اللغة العربية" },
    { value: "first_language", label: "اللغه الإنجليزية" },
    { value: "egyptian_history", label: "التاريخ المصري" },
    { value: "accounting", label: "المحاسبة" },
    { value: "business_management", label: "إدارة الأعمال" },
    { value: "islamic_religion", label: "التربية الدينية الإسلامية" },
    { value: "christian_religion", label: "التربية الدينية المسيحية" },
  ],

  arts: [
    { value: "arabic", label: "اللغة العربية" },
    { value: "first_language", label: "اللغه الإنجليزية" },
    { value: "egyptian_history", label: "التاريخ المصري" },
    { value: "psychology", label: "علم النفس" },
    { value: "second_language", label: "اللغة الأجنبية الثانية" },
    { value: "islamic_religion", label: "التربية الدينية الإسلامية" },
    { value: "christian_religion", label: "التربية الدينية المسيحية" },
  ],
};

export const SECONDARY_YEAR_THREE_SUBJECTS: Record<
  GeneralSecondaryTrack,
  { value: ThirdSecondarySubject; label: string }[]
> = {
  science: [
    { value: "arabic", label: "اللغة العربية" },
    { value: "first_language", label: "اللغة الإنجليزية" },
    { value: "biology", label: "الأحياء" },
    { value: "chemistry", label: "الكيمياء" },
    { value: "physics", label: "الفيزياء" },
    { value: "islamic_religion", label: "التربية الدينية الإسلامية" },
    { value: "christian_religion", label: "التربية الدينية المسيحية" },
    { value: "second_language", label: "اللغة الأجنبية الثانية" },
    { value: "national_education", label: "التربية الوطنية" },
  ],

  mathematics: [
    { value: "arabic", label: "اللغة العربية" },
    { value: "first_language", label: "اللغه الإنجليزية" },
    { value: "math", label: "الرياضيات" },
    { value: "chemistry", label: "الكيمياء" },
    { value: "physics", label: "الفيزياء" },
    { value: "islamic_religion", label: "التربية الدينية الإسلامية" },
    { value: "christian_religion", label: "التربية الدينية المسيحية" },
    { value: "second_language", label: "اللغة الأجنبية الثانية" },
    { value: "national_education", label: "التربية الوطنية" },
  ],

  literary: [
    { value: "arabic", label: "اللغة العربية" },
    { value: "first_language", label: "اللغه الإنجليزية" },
    { value: "history", label: "التاريخ" },
    { value: "geography", label: "الجغرافيا" },
    { value: "statistics", label: "الإحصاء" },
    { value: "islamic_religion", label: "التربية الدينية الإسلامية" },
    { value: "christian_religion", label: "التربية الدينية المسيحية" },
    { value: "second_language", label: "اللغة الأجنبية الثانية" },
    { value: "national_education", label: "التربية الوطنية" },
  ],
};

export const BACCALAUREATE_YEAR_THREE_SUBJECTS: Record<
  BaccalaureateTrack,
  { value: ThirdSecondarySubject; label: string }[]
> = {
  medical: [
    { value: "biology", label: "الأحياء (مستوى متقدم)" },
    { value: "chemistry", label: "الكيمياء (مستوى متقدم)" },
    { value: "islamic_religion", label: "التربية الدينية الإسلامية" },
    { value: "christian_religion", label: "التربية الدينية المسيحية" },
  ],

  engineering: [
    { value: "math", label: "الرياضيات (مستوى متقدم)" },
    { value: "physics", label: "الفيزياء (مستوى متقدم)" },
    { value: "islamic_religion", label: "التربية الدينية الإسلامية" },
    { value: "christian_religion", label: "التربية الدينية المسيحية" },
  ],

  business: [
    { value: "economics", label: "الاقتصاد (مستوى متقدم)" },
    { value: "math", label: "الرياضيات" },
    { value: "islamic_religion", label: "التربية الدينية الإسلامية" },
    { value: "christian_religion", label: "التربية الدينية المسيحية" },
  ],

  arts: [
    { value: "geography", label: "الجغرافيا (مستوى متقدم)" },
    { value: "statistics", label: "الإحصاء" },
    { value: "islamic_religion", label: "التربية الدينية الإسلامية" },
    { value: "christian_religion", label: "التربية الدينية المسيحية" },
  ],
};

// ========================================
// University Subjects
// ========================================

export const UNIVERSITY_SUBJECTS: SubjectDatabase = {
  // Computers
  computers: {
    first: [
      "Programming Fundamentals",
      "Introduction to Computer Science",
      "Discrete Mathematics",
      "Calculus",
      "Digital Logic",
      "Computer Fundamentals",
      "Physics",
      "Statistics",
    ],
    second: [
      "Data Structures",
      "Algorithms",
      "Database Systems",
      "Object Oriented Programming",
      "Computer Organization",
      "Operating Systems",
      "Linear Algebra",
      "Probability",
    ],
    third: [
      "Computer Networks",
      "Software Engineering",
      "Artificial Intelligence",
      "Theory of Computation",
      "Web Development",
      "Information Systems",
      "Computer Graphics",
      "Compiler Design",
    ],
    fourth: [
      "Machine Learning",
      "Distributed Systems",
      "Information Security",
      "Cloud Computing",
      "Data Mining",
      "Mobile Application Development",
      "Graduation Project",
    ],
  },

  // Engineering
  engineering: {
    first: [
      "Engineering Mathematics I",
      "Physics",
      "Chemistry",
      "Engineering Drawing",
      "Mechanics",
      "Technical Writing",
      "Computer Programming",
      "Electrical Engineering Fundamentals",
    ],
    second: [
      "Engineering Mathematics II",
      "Thermodynamics",
      "Electrical Circuits",
      "Materials Science",
      "Fluid Mechanics",
      "Engineering Mechanics",
      "Numerical Methods",
    ],
    third: [
      "Control Systems",
      "Numerical Methods",
      "Engineering Design",
      "Electrical Machines",
      "Structural Analysis",
      "Heat Transfer",
      "Engineering Economics",
    ],
    fourth: [
      "Advanced Engineering Design",
      "Project Management",
      "Engineering Economics",
      "Engineering Applications",
      "Technical Electives",
      "Graduation Project",
    ],
    fifth: [
      "Advanced Engineering Topics",
      "Engineering Management",
      "Specialization Courses",
      "Graduation Project",
    ],
  },

  // Commerce
  commerce: {
    first: [
      "Principles of Accounting",
      "Principles of Economics",
      "Business Administration",
      "Business Mathematics",
      "Statistics",
      "Introduction to Law",
      "Computer Applications",
    ],
    second: [
      "Financial Accounting",
      "Marketing Principles",
      "Cost Accounting",
      "Business Statistics",
      "Commercial Law",
      "Microeconomics",
      "Management Principles",
    ],
    third: [
      "Financial Management",
      "Management Accounting",
      "Auditing",
      "Human Resources Management",
      "Marketing Management",
      "Macroeconomics",
      "Tax Accounting",
    ],
    fourth: [
      "Advanced Accounting",
      "Investment Management",
      "Strategic Management",
      "Tax Accounting",
      "Financial Analysis",
      "International Business",
      "Graduation Project",
    ],
  },

  // Medicine
  medicine: {
    first: [
      "Anatomy",
      "Histology",
      "Biochemistry",
      "Physiology",
      "Medical Terminology",
      "Cell Biology",
    ],
    second: [
      "Anatomy",
      "Physiology",
      "Biochemistry",
      "Pathology",
      "Microbiology",
      "Immunology",
    ],
    third: [
      "Pathology",
      "Pharmacology",
      "Microbiology",
      "Parasitology",
      "Immunology",
      "Forensic Medicine",
    ],
    fourth: [
      "Internal Medicine",
      "General Surgery",
      "Pediatrics",
      "Obstetrics and Gynecology",
      "Clinical Pharmacology",
    ],
    fifth: [
      "Internal Medicine",
      "Surgery",
      "Pediatrics",
      "Clinical Rotations",
      "Ophthalmology",
      "ENT",
    ],
    sixth: [
      "Internal Medicine",
      "Surgery",
      "Emergency Medicine",
      "Clinical Training",
      "Community Medicine",
    ],
  },

  // Pharmacy
  pharmacy: {
    first: [
      "General Chemistry",
      "Organic Chemistry",
      "Biology",
      "Physics",
      "Pharmaceutical Mathematics",
      "Pharmaceutical Terminology",
    ],
    second: [
      "Pharmaceutical Chemistry",
      "Pharmacognosy",
      "Physiology",
      "Biochemistry",
      "Microbiology",
      "Pharmaceutics",
    ],
    third: [
      "Pharmacology",
      "Pharmaceutics",
      "Medicinal Chemistry",
      "Pharmacognosy",
      "Pathophysiology",
      "Pharmaceutical Analysis",
    ],
    fourth: [
      "Clinical Pharmacy",
      "Toxicology",
      "Pharmacotherapy",
      "Drug Delivery Systems",
      "Pharmaceutical Biotechnology",
      "Hospital Pharmacy",
    ],
    fifth: [
      "Clinical Pharmacy",
      "Hospital Pharmacy",
      "Pharmacotherapy",
      "Pharmaceutical Research",
      "Clinical Toxicology",
      "Graduation Project",
    ],
  },

  // Law
  law: {
    first: [
      "Introduction to Law",
      "Constitutional Law",
      "Civil Law",
      "Criminal Law",
      "Legal History",
      "Public International Law",
    ],
    second: [
      "Administrative Law",
      "International Public Law",
      "Civil Law",
      "Criminal Law",
      "Commercial Law",
      "Islamic Jurisprudence",
    ],
    third: [
      "International Private Law",
      "Labor Law",
      "Criminal Procedure",
      "Civil Procedure",
      "Commercial Law",
      "Administrative Judiciary",
    ],
    fourth: [
      "International Law",
      "Public Finance",
      "Advanced Civil Law",
      "Criminal Procedure",
      "International Organizations",
      "Graduation Project",
    ],
  },
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
