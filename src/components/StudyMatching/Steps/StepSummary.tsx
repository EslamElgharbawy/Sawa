"use client";

import React from "react";
import { EducationLevel } from "@/src/types/StudyEducation";
import { SecondarySubject } from "@/src/types/StudySubjects";
import { StudyGoal, StudyStyle, StudyTime } from "@/src/types/StudyMatching";
import { SKILL_OPTIONS } from "@/src/components/Subjects/SkillDevelopment";
import { SUBJECT_LABELS } from "@/src/app/data/StudyOptions";

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
      return universitySubjects.map((sub) => (
        <span key={sub}>{sub}</span>
      ));
    }

    if (educationLevel === "skill_development") {
      const skill = SKILL_OPTIONS.find((s) => s.id === selectedSkills);
      return skill ? skill.title : selectedSkills;
    }

    if (selectedSubjects.length > 0) {
      return selectedSubjects.map((sub) => (
        <span key={sub}>{SUBJECT_LABELS[sub] ?? sub}</span>
      ));
    }
  };

  const getPeopleCountText = (count: number | null) => {
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
      value: studyTime && TIME_LABELS[studyTime],
    },
    {
      label: "عدد الأشخاص",
      value: getPeopleCountText(peopleCount),
    },
    {
      label: "طريقة المذاكرة",
      value: studyStyle && STYLE_LABELS[studyStyle],
    },
    {
      label: "الهدف",
      value: goal && GOAL_LABELS[goal],
    },
  ];

  return (
    <div dir="rtl" className="w-full">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white divide-y divide-slate-100">
        {summaryItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-6 py-4 "
          >
            <span className="text-sm font-medium text-slate-400 sm:text-base">
              {item.label}
            </span>
            <div className="flex flex-col items-end gap-1 text-sm font-bold text-[#103B3E] sm:text-base">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
