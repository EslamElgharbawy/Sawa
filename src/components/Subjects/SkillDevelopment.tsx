"use client";

import { useState } from "react";
import {
  Check,
  Circle,
  Code2,
  Palette,
  BrainCircuit,
  Database,
  ShieldCheck,
  Languages,
  Megaphone,
  Plus,
  BriefcaseBusiness,
  Calculator,
  Video,
  Smartphone,
  Info,
  X,
} from "lucide-react";

interface SkillDevelopmentProps {
  selectedSkills: string | null;
  onChange: (skills: string | null) => void;
}

const SKILL_OPTIONS = [
  {
    id: "web_development",
    title: "Web Development",
    icon: Code2,
  },
  {
    id: "mobile_development",
    title: "Mobile Development",
    icon: Smartphone,
  },
  {
    id: "ui_ux_design",
    title: "UI/UX Design",
    icon: Palette,
  },
  {
    id: "graphic_design",
    title: "Graphic Design",
    icon: Palette,
  },
  {
    id: "artificial_intelligence",
    title: "Artificial Intelligence",
    icon: BrainCircuit,
  },
  {
    id: "data_science",
    title: "Data Science",
    icon: Database,
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    icon: ShieldCheck,
  },
  {
    id: "digital_marketing",
    title: "Digital Marketing",
    icon: Megaphone,
  },
  {
    id: "languages",
    title: "Languages",
    icon: Languages,
  },
  {
    id: "business",
    title: "Business & Entrepreneurship",
    icon: BriefcaseBusiness,
  },
  {
    id: "finance",
    title: "Finance & Accounting",
    icon: Calculator,
  },
  {
    id: "video_editing",
    title: "Video Editing",
    icon: Video,
  },
];

export default function SkillDevelopment({
  selectedSkills,
  onChange,
}: SkillDevelopmentProps) {
  const [skillInput, setSkillInput] = useState("");

const addSkill = () => {
  const newSkill = skillInput.trim();

  if (!newSkill) return;

  const existingSkill = SKILL_OPTIONS.find(
    (skill) => skill.title.toLowerCase() === newSkill.toLowerCase(),
  );

  onChange(existingSkill ? existingSkill.id : newSkill);
  setSkillInput("");
};
  return (
    <div dir="rtl" className="w-full space-y-8">
      {/* Skill Options */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {SKILL_OPTIONS.map((skill) => {
          const Icon = skill.icon;
          const isSelected = selectedSkills === skill.id;

          return (
            <button
              key={skill.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onChange(isSelected ? null : skill.id)}
              className={`
                  group min-h-28 cursor-pointer space-y-4
                  rounded-[28px] border-2 p-4 text-right
                  transition-all duration-300
                  hover:border-secondary/70
                  focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-secondary
                  focus-visible:ring-offset-2
                  ${
                    isSelected
                      ? "border-secondary bg-[#DDF5FF] text-primary shadow-sm"
                      : "border-slate-300 bg-white text-primary hover:bg-slate-50"
                  }
                `}
            >
              <div className="relative flex items-center justify-between">
                <span className="absolute left-0 top-0 flex size-6 items-center justify-center">
                  {isSelected ? (
                    <span className="flex size-6 items-center justify-center rounded-full bg-secondary text-white">
                      <Check size={15} strokeWidth={3} />
                    </span>
                  ) : (
                    <Circle
                      size={24}
                      strokeWidth={1.8}
                      className="text-slate-300"
                    />
                  )}
                </span>

                <Icon size={22} strokeWidth={1.9} className="text-secondary" />
              </div>

              <span className="mt-3 block font-bold">{skill.title}</span>
            </button>
          );
        })}
      </div>

      {/* Custom Skill */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-primary">
          مش لاقي المجال اللي عايزه؟
        </h3>

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill();
              }
            }}
            placeholder="اكتب اسم المجال هنا..."
            className="
              min-w-0 flex-1 rounded-2xl border-2
              border-slate-200 bg-white px-4 py-3.5
              text-sm text-primary outline-none
              transition-colors
              placeholder:text-slate-400
              focus:border-secondary
            "
          />

          <button
            type="button"
            onClick={addSkill}
            disabled={!skillInput.trim()}
            className="
              flex shrink-0 cursor-pointer items-center
              justify-center gap-2 rounded-2xl
              bg-[#17A6D1] px-5 py-3.5
              text-sm font-bold text-white transition-all
              hover:bg-[#1395BC]
              disabled:cursor-not-allowed
              disabled:opacity-50
              disabled:hover:bg-[#17A6D1]
            "
          >
            <Plus size={20} strokeWidth={2.5} />
            إضافة
          </button>
        </div>
      </div>

      {/* Selected Skill */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#103B3E]">
            المجال المختار:
          </span>
        </div>

        <div
          className="
            flex min-h-28 flex-wrap gap-2
            rounded-2xl border border-[#CBD8E8]/50
            bg-[#F3F7FD] p-4
          "
        >
          {selectedSkills ? (
            <div
              className="
                inline-flex h-fit items-center gap-2
                rounded-xl bg-[#17A6D1]
                p-2.5 text-white
              "
            >
              <span className="text-xs font-semibold">
                {SKILL_OPTIONS.find((item) => item.id === selectedSkills)
                  ?.title ?? selectedSkills}
              </span>

              <button
                type="button"
                onClick={() => onChange(null)}
                aria-label="حذف المجال المختار"
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
          ) : (
            <span className="text-xs text-zinc-400">
              لم تختر أي مجال حتى الآن.
            </span>
          )}
        </div>

        {/* Helper Message */}
        <div className="flex items-center justify-end gap-1.5">
          <Info size={13} className="text-[#17A6D1]" />

          <p className="text-xs font-medium text-zinc-500">
             اختار مجال من القائمة أو اكتب مجال خاص بيك.
          </p>
        </div>
      </div>
    </div>
  );
}
