"use client";

import { useState } from "react";

import {
  AcademicTrack,
  BaccalaureateTrack,
  EducationLevel,
  EducationSystem,
  GeneralSecondaryTrack,
} from "@/src/types/StudyEducation";
import {
  BaccalaureateSecondLanguage,
  SecondarySubject,
} from "@/src/types/StudySubjects";

import {
  BACCALAUREATE_SECOND_LANGUAGE_TOPICS,
  BACCALAUREATE_YEAR_TWO_TOPICS,
  FIRST_SECONDARY_SECOND_LANGUAGE_TOPICS,
  FIRST_SECONDARY_TOPICS,
  SECOND_SECONDARY_TOPICS,
  SKILL_TOPICS,
  THIRD_SECONDARY_SECOND_LANGUAGE_TOPICS,
  THIRD_SECONDARY_TOPICS,
} from "@/src/app/data/studyTopics";

import {
  BACCALAUREATE_YEAR_TWO_SUBJECTS,
  FIRST_SECONDARY_SUBJECTS,
  SECONDARY_YEAR_THREE_SUBJECTS,
  SECONDARY_YEAR_TWO_SUBJECTS,
} from "@/src/app/data/StudyOptions";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Info, X } from "lucide-react";

interface FirstSecondryProps {
  educationLevel: EducationLevel;
  educationSystem: EducationSystem;
  academicTrack: AcademicTrack | null;
  selectedSecondLanguage?: BaccalaureateSecondLanguage;
  selectedSubjects: SecondarySubject[];
  selectedTopics: Partial<Record<SecondarySubject, string[]>>;

  onTopicsChange: (topics: Partial<Record<SecondarySubject, string[]>>) => void;
}
export default function StudyTopics({
  educationLevel,
  educationSystem,
  academicTrack,
  selectedSecondLanguage,
  selectedSubjects,
  selectedTopics,
  onTopicsChange,
}: FirstSecondryProps) {
  const [customTopics, setCustomTopics] = useState<Record<string, string>>({});

  const topicsMap: Partial<Record<SecondarySubject, string[]>> = (() => {
    if (educationLevel === "high_school_1") {
      return FIRST_SECONDARY_TOPICS;
    }

    if (
      educationLevel === "high_school_2" &&
      educationSystem === "general" &&
      academicTrack &&
      ["science", "mathematics", "literary"].includes(academicTrack)
    ) {
      return SECOND_SECONDARY_TOPICS[academicTrack as GeneralSecondaryTrack];
    }

    if (
      educationLevel === "high_school_2" &&
      educationSystem === "baccalaureate" &&
      academicTrack &&
      ["medical", "engineering", "business", "arts"].includes(academicTrack)
    ) {
      return BACCALAUREATE_YEAR_TWO_TOPICS[academicTrack as BaccalaureateTrack];
    }

    if (
      educationLevel === "high_school_3" &&
      educationSystem === "general" &&
      academicTrack &&
      ["science", "mathematics", "literary"].includes(academicTrack)
    ) {
      return THIRD_SECONDARY_TOPICS[academicTrack as GeneralSecondaryTrack];
    }
    return {};
  })();
  
  const subjects = selectedSubjects.filter(
    (subject) => topicsMap[subject] !== undefined,
  );
  const [openSubject, setOpenSubject] = useState<string[]>(
    subjects.length > 0 ? [subjects[0]] : [],
  );

  const subjectsOptions = (() => {
    if (educationLevel === "high_school_1") {
      return FIRST_SECONDARY_SUBJECTS;
    }

    if (
      educationLevel === "high_school_2" &&
      educationSystem === "general" &&
      academicTrack &&
      ["science", "mathematics", "literary"].includes(academicTrack)
    ) {
      return SECONDARY_YEAR_TWO_SUBJECTS[
        academicTrack as GeneralSecondaryTrack
      ];
    }
    if (
      educationLevel === "high_school_2" &&
      educationSystem === "baccalaureate" &&
      academicTrack
    ) {
      return BACCALAUREATE_YEAR_TWO_SUBJECTS[
        academicTrack as BaccalaureateTrack
      ];
    }

    if (
      educationLevel === "high_school_3" &&
      educationSystem === "general" &&
      academicTrack &&
      ["science", "mathematics", "literary"].includes(academicTrack)
    ) {
      return SECONDARY_YEAR_THREE_SUBJECTS[
        academicTrack as GeneralSecondaryTrack
      ];
    }
    return [];
  })();

  const secondLanguageTopics = (() => {
    if (!selectedSecondLanguage || selectedSecondLanguage === "chinese") {
      return [];
    }

    if (educationLevel === "high_school_1") {
      return FIRST_SECONDARY_SECOND_LANGUAGE_TOPICS[selectedSecondLanguage];
    }

    if (educationLevel === "high_school_3") {
      return THIRD_SECONDARY_SECOND_LANGUAGE_TOPICS[selectedSecondLanguage];
    }

    return BACCALAUREATE_SECOND_LANGUAGE_TOPICS[selectedSecondLanguage];
  })();

  const toggleTopic = (subject: SecondarySubject, topic: string) => {
    const currentTopics = selectedTopics[subject] ?? [];

    const updatedTopics = currentTopics.includes(topic)
      ? currentTopics.filter((item) => item !== topic)
      : [...currentTopics, topic];

    onTopicsChange({
      ...selectedTopics,
      [subject]: updatedTopics,
    });
  };

  const addCustomTopic = (subject: SecondarySubject) => {
    const topic = customTopics[subject]?.trim();

    if (!topic) return;

    const currentTopics = selectedTopics[subject] ?? [];

    if (currentTopics.includes(topic)) return;

    onTopicsChange({
      ...selectedTopics,
      [subject]: [...currentTopics, topic],
    });

    setCustomTopics((prev) => ({
      ...prev,
      [subject]: "",
    }));
  };

  return (
    <div dir="rtl" className="w-full space-y-4">
      <Accordion
        multiple={false}
        value={openSubject}
        onValueChange={(value) => setOpenSubject(value)}
        className="space-y-3"
      >
        {subjects.map((subject) => {
          const subjectInfo = subjectsOptions.find(
            (item) => item.value === subject,
          );

          const topics =
            subject === "second_language"
              ? secondLanguageTopics
              : (topicsMap[subject] ?? []);

          const selected = selectedTopics[subject] ?? [];
          return (
            <AccordionItem
              key={subject}
              value={subject}
              className="overflow-hidden rounded-xl border border-[#CBD8E8] bg-white px-4"
            >
              <AccordionTrigger className="py-4 text-sm font-bold text-[#103B3E] hover:no-underline cursor-pointer">
                <div className="flex flex-1 items-center justify-between gap-3">
                  <span>
                    {subject === "second_language" && selectedSecondLanguage
                      ? {
                          french: "اللغة الفرنسية",
                          german: "اللغة الألمانية",
                          italian: "اللغة الإيطالية",
                          spanish: "اللغة الإسبانية",
                          chinese: "اللغة الصينية",
                        }[selectedSecondLanguage]
                      : (subjectInfo?.label ?? subject)}
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="space-y-8 pb-4">
                <div className="flex flex-wrap gap-2">
                  {topics.map((topic) => {
                    const isSelected = selected.includes(topic);

                    return (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => toggleTopic(subject, topic)}
                        className={`rounded-lg border px-4 py-2 text-sm font-medium cursor-pointer transition-colors ${
                          isSelected
                            ? "border-[#17A6D1] bg-[#DDF5FF] text-[#103B3E]"
                            : "border-[#CBD8E8] bg-white text-zinc-600 hover:border-[#17A6D1]"
                        }`}
                      >
                        {topic}
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customTopics[subject] ?? ""}
                    onChange={(e) =>
                      setCustomTopics((prev) => ({
                        ...prev,
                        [subject]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addCustomTopic(subject);
                      }
                    }}
                    placeholder="أضف موضوع مخصص..."
                    className="min-w-0 flex-1 rounded-2xl border border-[#CBD8E8] px-4 py-3 text-sm outline-none focus:border-[#17A6D1]"
                  />

                  <button
                    type="button"
                    disabled={!customTopics[subject]?.trim()}
                    onClick={() => addCustomTopic(subject)}
                    className="flex shrink-0 cursor-pointer items-center
              justify-center gap-2 rounded-2xl
              bg-[#17A6D1] px-4 
              text-sm font-bold text-white transition-all
              hover:bg-[#1395BC]
              disabled:cursor-not-allowed
              disabled:opacity-50
              disabled:hover:bg-[#17A6D1]"
                  >
                    إضافة
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#103B3E]">
                      الموضوعات المختارة:
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        onTopicsChange({
                          ...selectedTopics,
                          [subject]: [],
                        })
                      }
                      disabled={selected.length === 0}
                      className="
      cursor-pointer text-xs font-bold
      text-red-500 transition-colors
      hover:text-red-700
      disabled:cursor-not-allowed
      disabled:opacity-40
       disabled:text-slate-400
    disabled:hover:text-slate-400
    "
                    >
                      مسح الكل
                    </button>
                  </div>

                  <div
                    className="
      flex min-h-28 flex-wrap content-start gap-2
      rounded-2xl border border-[#CBD8E8]/50
      bg-[#F3F7FD] p-4
    "
                  >
                    {selected.length > 0 ? (
                      selected.map((topic) => (
                        <div
                          key={topic}
                          className="
            inline-flex h-fit items-center gap-2
            rounded-xl bg-[#17A6D1]
            p-2.5 text-white
          "
                        >
                          <span className="text-xs font-semibold">{topic}</span>

                          <button
                            type="button"
                            onClick={() => toggleTopic(subject, topic)}
                            aria-label={`حذف ${topic}`}
                            className="
              flex size-5 cursor-pointer
              items-center justify-center
              rounded-full transition-colors
              hover:bg-white/20
            "
                          >
                            <X size={14} strokeWidth={2.5} />
                          </button>
                        </div>
                      ))
                    ) : (
                      <span className="text-xs text-zinc-400">
                        لم تضف أي موضوعات حتى الآن.
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-1.5">
                    <Info size={13} className="text-[#17A6D1]" />

                    <p className="text-xs font-medium text-zinc-500">
                      اختر موضوعًا أو أكثر من القائمة بالأعلى.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
