"use client";

import React from "react";
import { EducationLevel } from "@/src/types/StudyEducation";
import { SecondarySubject } from "@/src/types/StudySubjects";
import { StudyGoal, StudyStyle, StudyTime } from "@/src/types/StudyMatching";

interface StepSummaryProps {
  educationLevel: EducationLevel | null;
  selectedSubjects: SecondarySubject[];
  universitySubjects: string[];
  selectedSkills: string | null;
  studyTime: StudyTime | null;
  studyStyle: StudyStyle | null;
  goal: StudyGoal | null;
  peopleCount: number | null;
}

const SUBJECT_LABELS: Record<string, string> = {
  arabic: "اللغة العربية",
  english: "اللغة الإنجليزية",
  math: "الرياضيات",
  integrated_science: "العلوم المتكاملة",
  history: "التاريخ",
  philosophy: "الفلسفة والمنطق",
  islamic_religion: "التربية الدينية الإسلامية",
  christian_religion: "التربية الدينية المسيحية",
  second_language: "اللغة الأجنبية الثانية",
  programming: "البرمجة والذكاء الاصطناعي",
  physics: "فيزياء",
  chemistry: "كيمياء",
  biology: "أحياء",
  geography: "جغرافيا",
  psychology: "علم النفس والاجتماع",
  first_language: "اللغة الإنجليزية",
  egyptian_history: "التاريخ المصري",
  programming_ai: "البرمجة والذكاء الاصطناعي",
  accounting: "المحاسبة",
  business_management: "إدارة الأعمال",
  pure_mathematics: "الرياضيات البحتة",
  applied_mathematics: "الرياضيات التطبيقية",
  statistics: "الإحصاء",
  geology: "الجيولوجيا",
  other: "أخرى",
};

const STYLE_LABELS: Record<StudyStyle, string> = {
  discussion: "تفاعل ونقاش",
  quiet: "هدوء",
};

const TIME_LABELS: Record<StudyTime, string> = {
  morning: "الصبح (صباحاً)",
  afternoon: "بعد الظهر",
  night: "بالليل (مساءً)",
  anytime: "أي وقت مناسب",
};

const GOAL_LABELS: Record<StudyGoal, string> = {
  study: "مذاكرة",
  homework: "واجب",
  revision: "مراجعة",
};

export default function StepSummary({
  educationLevel,
  selectedSubjects,
  universitySubjects,
  selectedSkills,
  studyTime,
  studyStyle,
  goal,
  peopleCount,
}: StepSummaryProps) {
  const getSubjectText = () => {
    if (educationLevel === "university_student") {
      return universitySubjects.length > 0
        ? universitySubjects.join("، ")
        : "—";
    }

    if (educationLevel === "skill_development") {
      return selectedSkills || "—";
    }

    if (selectedSubjects.length > 0) {
      return selectedSubjects
        .map((sub) => SUBJECT_LABELS[sub] ?? sub)
        .join("، ");
    }

    return "—";
  };

  const getPeopleCountText = (count: number | null) => {
    if (!count) return "—";
    if (count === 1) return "شخص واحد";
    if (count === 2) return "2 أشخاص";
    return `${count} أشخاص`;
  };

  const summaryItems = [
    {
      label: "المادة",
      value: getSubjectText(),
    },
    {
      label: "الوقت",
      value: studyTime ? TIME_LABELS[studyTime] ?? studyTime : "—",
    },
    {
      label: "عدد الأشخاص",
      value: getPeopleCountText(peopleCount),
    },
    {
      label: "طريقة المذاكرة",
      value: studyStyle ? STYLE_LABELS[studyStyle] ?? studyStyle : "—",
    },
    {
      label: "الهدف",
      value: goal ? GOAL_LABELS[goal] ?? goal : "—",
    },
  ];

  return (
    <div dir="rtl" className="w-full">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white divide-y divide-slate-100">
        {summaryItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-slate-50/50"
          >
            <span className="text-sm font-medium text-slate-400 sm:text-base">
              {item.label}
            </span>
             <span className="text-sm font-bold text-[#103B3E] sm:text-base">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
