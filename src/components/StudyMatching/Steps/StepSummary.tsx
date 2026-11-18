"use client";

import { EducationLevel } from "@/src/types/StudyEducation";
import { SecondarySubject } from "@/src/types/StudySubjects";
import { StudyGoal, StudyStyle } from "@/src/types/StudyMatching";
import { SKILL_OPTIONS } from "@/src/components/Subjects/SkillDevelopment";
import { SUBJECT_LABELS } from "@/src/app/data/StudyOptions";

interface StepSummaryProps {
  educationLevel: EducationLevel | null;
  selectedSubjects: SecondarySubject[];
  universitySubjects: string[];
  selectedSkills: string | null;
  studyStyle: StudyStyle | null;
  goal: StudyGoal | null;
  peopleCount?: number | null;
  selectedTopics?: Partial<Record<SecondarySubject, string[]>> | Record<string, string[]>;
  universitySelectedTopics?: Record<string, string[]>;
  skillSelectedTopics?: string[];
}

const STYLE_LABELS: Record<StudyStyle, string> = {
  discussion: "تفاعل ونقاش",
  quiet: "هدوء",
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
  studyStyle,
  goal,
  selectedTopics,
  universitySelectedTopics,
  skillSelectedTopics,
}: StepSummaryProps) {
  const getSubjectText = () => {
    if (educationLevel === "university_student") {
      if (universitySubjects.length === 0) return "مذاكرة عامة";
      return universitySubjects.join(" ، ");
    }

    if (educationLevel === "skill_development") {
      const skill = SKILL_OPTIONS.find((s) => s.id === selectedSkills);
      return skill ? skill.title : selectedSkills ?? "تطوير مهارات";
    }

    if (selectedSubjects.length > 0) {
      return selectedSubjects
        .map((sub) => SUBJECT_LABELS[sub] ?? sub)
        .join(" ، ");
    }

    return "مذاكرة عامة";
  };

  const getTopicsText = () => {
    let topics: string[] = [];

    if (educationLevel === "university_student" && universitySelectedTopics) {
      topics = Object.values(universitySelectedTopics).flat();
    } else if (educationLevel === "skill_development" && skillSelectedTopics) {
      topics = skillSelectedTopics;
    } else if (selectedTopics) {
      topics = Object.values(selectedTopics).flat();
    }

    if (topics.length === 0) return "كل الدروس والمواضيع";
    if (topics.length === 1) return topics[0];
    if (topics.length === 2) return `${topics[0]} ، ${topics[1]}`;
    return `${topics[0]} + ${topics.length - 1} مواضيع أخرى`;
  };

  const summaryItems = [
    {
      label: "المادة",
      value: getSubjectText(),
    },
    {
      label: "الدروس / المواضيع",
      value: getTopicsText(),
    },
    {
      label: "طريقة المذاكرة",
      value: (studyStyle && STYLE_LABELS[studyStyle]) || "غير محدد",
    },
    {
      label: "الهدف",
      value: (goal && GOAL_LABELS[goal]) || "مذاكرة",
    },
  ];

  return (
    <div dir="rtl" className="w-full">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white divide-y divide-slate-100">
        {summaryItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-6 py-4"
          >
            <span className="text-sm font-medium text-slate-400 sm:text-base">
              {item.label}
            </span>
            <div className="flex flex-col items-end gap-1 text-sm font-bold text-[#103B3E] sm:text-base text-left">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
