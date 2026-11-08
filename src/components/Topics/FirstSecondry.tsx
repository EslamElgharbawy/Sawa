"use client";

import { useState } from "react";

import { EducationLevel } from "@/src/types/StudyEducation";
import {
  FirstSecondarySubject,
  SecondarySubject,
} from "@/src/types/StudySubjects";

import { FIRST_SECONDARY_TOPICS } from "@/src/app/data/study-topics";
import { FIRST_SECONDARY_SUBJECTS } from "@/src/app/data/StudyOptions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FirstSecondryProps {
  educationLevel: EducationLevel;
  selectedSubjects: SecondarySubject[];
  selectedTopics: Partial<Record<SecondarySubject, string[]>>;
  onTopicsChange: (topics: Partial<Record<SecondarySubject, string[]>>) => void;
}

export default function FirstSecondry({
  selectedSubjects,
  selectedTopics,
  onTopicsChange,
}: FirstSecondryProps) {
  const [openSubject, setOpenSubject] = useState<string[]>([]);
  const [customTopics, setCustomTopics] = useState<Record<string, string>>({});

  const subjects = selectedSubjects.filter(
    (subject): subject is FirstSecondarySubject =>
      subject in FIRST_SECONDARY_TOPICS,
  );

  const toggleTopic = (subject: FirstSecondarySubject, topic: string) => {
    const currentTopics = selectedTopics[subject] ?? [];

    const updatedTopics = currentTopics.includes(topic)
      ? currentTopics.filter((item) => item !== topic)
      : [...currentTopics, topic];

    onTopicsChange({
      ...selectedTopics,
      [subject]: updatedTopics,
    });
  };

  const addCustomTopic = (subject: FirstSecondarySubject) => {
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
          const subjectInfo = FIRST_SECONDARY_SUBJECTS.find(
            (item) => item.value === subject,
          );

          const topics = FIRST_SECONDARY_TOPICS[subject];
          const selected = selectedTopics[subject] ?? [];

          return (
            <AccordionItem
              key={subject}
              value={subject}
              className="overflow-hidden rounded-xl border border-[#CBD8E8] bg-white px-4"
            >
              <AccordionTrigger className="py-4 text-sm font-bold text-[#103B3E] hover:no-underline cursor-pointer">
                <div className="flex flex-1 items-center justify-between gap-3">
                  <span>{subjectInfo?.label ?? subject}</span>

                  <span className="ml-2 rounded-full bg-[#DDF5FF] px-3 py-1 text-xs font-semibold text-[#103B3E]">
                    {selected.length} موضوعات مختارة
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="space-y-4 pb-4">
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
                    className="min-w-0 flex-1 rounded-lg border border-[#CBD8E8] px-3 py-2 text-sm outline-none focus:border-[#17A6D1]"
                  />

                  <button
                    type="button"
                    disabled={!customTopics[subject]?.trim()}
                    onClick={() => addCustomTopic(subject)}
                    className="flex shrink-0 cursor-pointer items-center
              justify-center gap-2 rounded-lg
              bg-[#17A6D1] px-4 py-2
              text-sm font-bold text-white transition-all
              hover:bg-[#1395BC]
              disabled:cursor-not-allowed
              disabled:opacity-50
              disabled:hover:bg-[#17A6D1]"
                  >
                    إضافة
                  </button>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
