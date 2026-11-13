"use client";

import { useState } from "react";
import {
  Info,
  X,
  Sparkles,
  Code2,
  Smartphone,
  Palette,
  BrainCircuit,
  Database,
  ShieldCheck,
  Megaphone,
  Languages,
  BriefcaseBusiness,
  Calculator,
  Video,
  LucideIcon,
} from "lucide-react";
import { SKILL_TOPICS } from "@/src/app/data/studyTopics";

interface SkillStudyTopicsProps {
  selectedSkill: string | null;
  selectedTopics: string[];
  onTopicsChange: (topics: string[]) => void;
}

const SKILL_TITLES: Record<string, string> = {
  web_development: "Web Development",
  mobile_development: "Mobile Development",
  ui_ux_design: "UI/UX Design",
  graphic_design: "Graphic Design",
  artificial_intelligence: "Artificial Intelligence",
  data_science: "Data Science",
  cybersecurity: "Cybersecurity",
  digital_marketing: "Digital Marketing",
  languages: "Languages",
  business: "Business & Entrepreneurship",
  finance: "Finance & Accounting",
  video_editing: "Video Editing",
};

const SKILL_ICONS: Record<string, LucideIcon> = {
  web_development: Code2,
  mobile_development: Smartphone,
  ui_ux_design: Palette,
  graphic_design: Palette,
  artificial_intelligence: BrainCircuit,
  data_science: Database,
  cybersecurity: ShieldCheck,
  digital_marketing: Megaphone,
  languages: Languages,
  business: BriefcaseBusiness,
  finance: Calculator,
  video_editing: Video,
};

export default function SkillStudyTopics({
  selectedSkill,
  selectedTopics,
  onTopicsChange,
}: SkillStudyTopicsProps) {
  const [customTopic, setCustomTopic] = useState("");

  if (!selectedSkill) return null;

  const skillTitle = SKILL_TITLES[selectedSkill] ?? selectedSkill;
  const SkillIcon = (selectedSkill && SKILL_ICONS[selectedSkill]) ? SKILL_ICONS[selectedSkill] : Sparkles;
  const suggestedTopics = SKILL_TOPICS[selectedSkill] ?? [];

  const toggleTopic = (topic: string) => {
    const isSelected = selectedTopics.includes(topic);
    if (isSelected) {
      onTopicsChange(selectedTopics.filter((item) => item !== topic));
    } else {
      onTopicsChange([...selectedTopics, topic]);
    }
  };

  const addCustomTopic = () => {
    const topic = customTopic.trim();
    if (!topic) return;

    if (selectedTopics.includes(topic)) {
      setCustomTopic("");
      return;
    }

    onTopicsChange([...selectedTopics, topic]);
    setCustomTopic("");
  };

  const removeTopic = (topicToRemove: string) => {
    onTopicsChange(selectedTopics.filter((item) => item !== topicToRemove));
  };

  return (
    <div dir="rtl" className="w-full space-y-4">
      <div className="overflow-hidden rounded-2xl border border-[#CBD8E8] bg-white p-5 space-y-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-[#DDF5FF] text-[#17A6D1]">
              <SkillIcon size={19} strokeWidth={2} />
            </span>
            <div>
              <span className="text-xs font-semibold text-slate-400">
                المجال:
              </span>
              <h3 className="text-base font-bold text-[#103B3E]">
                {skillTitle}
              </h3>
            </div>
          </div>
        </div>

        {/* Suggested Topics (Chips) */}
        {suggestedTopics.length > 0 && (
          <div className="space-y-3">
            <div className="text-xs font-semibold text-slate-500">
              الموضوعات المقترحة:
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestedTopics.map((topic) => {
                const isSelected = selectedTopics.includes(topic);
                return (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => toggleTopic(topic)}
                    className={`
                          rounded-xl border px-3 py-2 text-xs font-semibold transition-all cursor-pointer
                          ${
                            isSelected
                              ? "border-[#17A6D1] bg-[#DDF5FF] text-[#103B3E] font-bold shadow-xs"
                              : "border-slate-200 bg-white text-slate-600 hover:border-[#17A6D1]/60 hover:bg-slate-50"
                          }
                        `}
                  >
                    {topic}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Custom Topic Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCustomTopic();
              }
            }}
            placeholder={
              suggestedTopics.length > 0
                ? "أضف موضوع مخصص..."
                : "اكتب الموضوع اللي عايز تذاكره..."
            }
            className="min-w-0 flex-1 rounded-2xl border border-[#CBD8E8] px-4 py-3 text-sm outline-none transition-all focus:border-[#17A6D1] focus:ring-2 focus:ring-[#17A6D1]/15"
          />

          <button
            type="button"
            disabled={!customTopic.trim()}
            onClick={addCustomTopic}
            className="flex shrink-0 cursor-pointer items-center justify-center rounded-2xl bg-[#17A6D1] px-5 text-sm font-bold text-white transition-all hover:bg-[#1395BC] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#17A6D1]"
          >
            إضافة
          </button>
        </div>

        {/* Selected Topics List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#103B3E]">
              الموضوعات المختارة:
            </span>

            <button
              type="button"
              onClick={() => onTopicsChange([])}
              disabled={selectedTopics.length === 0}
              className="cursor-pointer text-xs font-bold text-red-500 transition-colors hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:text-slate-400 disabled:hover:text-slate-400"
            >
              مسح الكل
            </button>
          </div>

          <div className="flex min-h-28 flex-wrap content-start gap-2 rounded-2xl border border-[#CBD8E8]/50 bg-[#F3F7FD] p-4">
            {selectedTopics.length > 0 ? (
              selectedTopics.map((topic) => (
                <div
                  key={topic}
                  className="inline-flex h-fit items-center gap-2 rounded-xl bg-[#17A6D1] p-2.5 text-white"
                >
                  <span className="text-xs font-semibold">{topic}</span>

                  <button
                    type="button"
                    onClick={() => removeTopic(topic)}
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

          {/* Helper Message */}
          <div className="flex items-center justify-end gap-1.5">
            <Info size={13} className="text-[#17A6D1]" />

            <p className="text-xs font-medium text-zinc-500">
              {suggestedTopics.length > 0
                ? "اختر موضوعًا أو أكثر من القائمة بالأعلى أو اكتب موضوعاً خاصاً بك."
                : "اكتب الموضوعات اللي عايز تذاكرها في المجال ده."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
