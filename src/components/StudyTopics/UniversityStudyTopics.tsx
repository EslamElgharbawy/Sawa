"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookOpen, Info, X } from "lucide-react";
import { FACULTY_OPTIONS } from "../StudyMatching/Steps/StepUniversityDetails";
import { UniversityFaculty } from "@/src/types/StudySubjects";
interface UniversityStudyTopicsProps {
  selectedFaculty?: UniversityFaculty | "";
  selectedSubjects: string[];
  selectedTopics: Record<string, string[]>;
  onTopicsChange: (topics: Record<string, string[]>) => void;
}

export default function UniversityStudyTopics({
  selectedFaculty,
  selectedSubjects,
  selectedTopics,
  onTopicsChange,
}: UniversityStudyTopicsProps) {
  const [openSubject, setOpenSubject] = useState<string[]>(
    selectedSubjects.length > 0 ? [selectedSubjects[0]] : [],
  );

  const [customTopics, setCustomTopics] = useState<Record<string, string>>({});

  const facultyInfo = FACULTY_OPTIONS.find((f) => f.id === selectedFaculty);
  const SubjectIcon = facultyInfo ? facultyInfo.icon : BookOpen;
  const addCustomTopic = (subject: string) => {
    const topic = customTopics[subject]?.trim();

    if (!topic) return;

    const currentTopics = selectedTopics[subject] ?? [];

    if (currentTopics.includes(topic)) {
      setCustomTopics((prev) => ({
        ...prev,
        [subject]: "",
      }));
      return;
    }

    onTopicsChange({
      ...selectedTopics,
      [subject]: [...currentTopics, topic],
    });

    setCustomTopics((prev) => ({
      ...prev,
      [subject]: "",
    }));
  };

  const removeTopic = (subject: string, topic: string) => {
    onTopicsChange({
      ...selectedTopics,
      [subject]: (selectedTopics[subject] ?? []).filter(
        (item) => item !== topic,
      ),
    });
  };

  const subjects = selectedSubjects;

  return (
    <div dir="rtl" className="w-full">
      <Accordion
        multiple={false}
        value={openSubject}
        onValueChange={setOpenSubject}
        className="space-y-3"
      >
        {subjects.map((subject) => {
          const selected = selectedTopics[subject] ?? [];

          return (
            <AccordionItem
              key={subject}
              value={subject}
              className="overflow-hidden rounded-xl border border-[#CBD8E8] bg-white px-4"
            >
              <AccordionTrigger className="py-4 text-sm font-bold text-[#103B3E] hover:no-underline cursor-pointer items-center ">
                <div className="flex flex-1 items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-8 items-center justify-center rounded-xl bg-[#DDF5FF] text-[#17A6D1]">
                      <SubjectIcon size={18} strokeWidth={2} />
                    </span>
                    <span>{subject}</span>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="space-y-5 pb-4 mt-2">
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
                    placeholder="اكتب الموضوع اللي عايز تذاكره..."
                    className="min-w-0 flex-1 rounded-2xl border border-[#CBD8E8] px-4 py-3 text-sm outline-none focus:border-[#17A6D1]"
                  />

                  <button
                    type="button"
                    disabled={!customTopics[subject]?.trim()}
                    onClick={() => addCustomTopic(subject)}
                    className="flex shrink-0 cursor-pointer items-center justify-center rounded-2xl bg-[#17A6D1] px-4 text-sm font-bold text-white transition-all hover:bg-[#1395BC] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#17A6D1]"
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
                      className="cursor-pointer text-xs font-bold text-red-500 transition-colors hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:text-slate-400 disabled:hover:text-slate-400"
                    >
                      مسح الكل
                    </button>
                  </div>

                  <div className="flex min-h-28 flex-wrap content-start gap-2 rounded-2xl border border-[#CBD8E8]/50 bg-[#F3F7FD] p-4">
                    {selected.length > 0 ? (
                      selected.map((topic) => (
                        <div
                          key={topic}
                          className="inline-flex h-fit items-center gap-2 rounded-xl bg-[#17A6D1] p-2.5 text-white"
                        >
                          <span className="text-xs font-semibold">{topic}</span>

                          <button
                            type="button"
                            onClick={() => removeTopic(subject, topic)}
                            aria-label={`حذف ${topic}`}
                            className="flex size-5 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-white/20"
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
                      اكتب الموضوعات اللي عايز تذاكرها في المادة دي.
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
