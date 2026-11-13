"use client";

import { useState, KeyboardEvent } from "react";
import { BookOpen, Plus, X, Info } from "lucide-react";
import type {
  UniversityFaculty,
  UniversityYear,
} from "@/src/types/StudySubjects";
import { UNIVERSITY_SUBJECTS } from "../../app/data/StudyOptions";

interface UniversitySubjectsProps {
  selectedFaculty: UniversityFaculty;
  selectedYear: UniversityYear;
  selectedSubjects: string[];
  onChange: (subjects: string[]) => void;
}

export default function UniversitySubjects({
  selectedFaculty,
  selectedYear,
  selectedSubjects,
  onChange,
}: UniversitySubjectsProps) {
  const [subjectInput, setSubjectInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Get subjects according to faculty and year
  const availableSubjects =
    UNIVERSITY_SUBJECTS[selectedFaculty]?.[selectedYear] ?? [];

  // Filter suggestions
  const filteredSuggestions = availableSubjects.filter((subject) => {
    const matchesInput = subject
      .toLowerCase()
      .includes(subjectInput.trim().toLowerCase());

    const alreadySelected = selectedSubjects.some(
      (item) => item.toLowerCase() === subject.toLowerCase(),
    );

    return matchesInput && !alreadySelected;
  });

  // Add subject
  const addSubject = (value: string = subjectInput) => {
    const subject = value.trim();

    if (!subject) return;

    const alreadyExists = selectedSubjects.some(
      (item) => item.toLowerCase() === subject.toLowerCase(),
    );

    if (alreadyExists) {
      setSubjectInput("");
      setShowSuggestions(false);
      return;
    }

    onChange([...selectedSubjects, subject]);

    setSubjectInput("");
    setShowSuggestions(false);
  };

  // Select suggestion
  const selectSuggestion = (subject: string) => {
    addSubject(subject);
  };

  // Remove subject
  const removeSubject = (subjectToRemove: string) => {
    onChange(selectedSubjects.filter((subject) => subject !== subjectToRemove));
  };

  // Keyboard events
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (!subjectInput.trim()) return;

      // Add exact suggestion if available, otherwise add custom subject
      const exactMatch = filteredSuggestions.find(
        (subject) =>
          subject.toLowerCase() === subjectInput.trim().toLowerCase(),
      );

      addSubject(exactMatch ?? subjectInput);
    }

    if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  return (
    <section dir="rtl" className="w-full space-y-8">
      {/* Input + Add Button */}
      <div className="flex flex-col gap-3 xl:flex-row">
        {/* Input & Autocomplete */}
        <div className="relative flex-1">
          <BookOpen
            size={19}
            className="
              absolute right-4 top-1/2 z-10
              -translate-y-1/2 text-zinc-500
            "
          />

          <input
            type="text"
            value={subjectInput}
            onChange={(e) => {
              setSubjectInput(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            placeholder="اكتب اسم المادة هنا..."
            autoComplete="off"
            className="
              w-full rounded-2xl border border-[#CBD8E8]
              bg-white py-3.5 pr-12 pl-4
              text-sm text-[#103B3E]
              outline-none transition-all
              placeholder:text-zinc-500
              focus:border-[#17A6D1]
              focus:ring-2 focus:ring-[#17A6D1]/15
            "
          />

          {/* Suggestions Dropdown */}
          {showSuggestions &&
            subjectInput.trim().length > 0 &&
            filteredSuggestions.length > 0 && (
              <div
                className="
                  absolute right-0 top-full z-30 mt-2
                  max-h-60 w-full overflow-y-auto
                  rounded-2xl border border-slate-200
                  bg-white p-2 shadow-lg
                "
              >
                {filteredSuggestions.map((subject) => (
                  <button
                    key={subject}
                    type="button"
                    onClick={() => selectSuggestion(subject)}
                    className="
                      flex w-full cursor-pointer
                      items-center justify-between
                      rounded-xl px-3 py-3
                      text-right text-sm font-medium
                      text-[#103B3E]
                      transition-colors
                      hover:bg-[#DDF5FF]
                    "
                  >
                    <span>{subject}</span>

                    <Plus size={16} className="text-[#17A6D1]" />
                  </button>
                ))}
              </div>
            )}

          {/* No Suggestions */}
          {showSuggestions &&
            subjectInput.trim().length > 0 &&
            filteredSuggestions.length === 0 && (
              <div
                className="
                  absolute right-0 top-full z-30 mt-2
                  w-full rounded-2xl border
                  border-slate-200 bg-white p-4
                  text-sm text-slate-500 shadow-lg
                "
              >
                لا توجد اقتراحات مطابقة، يمكنك إضافة المادة بنفسك.
              </div>
            )}
        </div>
        {/* Add Button */}
        <button
          type="button"
          onClick={() => addSubject()}
          disabled={!subjectInput.trim()}
          className="
            flex shrink-0 cursor-pointer items-center
    justify-center gap-2 rounded-2xl 
    bg-[#17A6D1] px-6 py-3.5
    font-bold text-white transition-all text-sm
    hover:bg-[#1395BC]
    disabled:cursor-not-allowed
    disabled:opacity-50
    disabled:hover:bg-[#17A6D1]
          "
        >
          <Plus size={20} strokeWidth={2.5} />
          إضافة مادة
        </button>
      </div>

      {/* Selected Subjects */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#103B3E]">
            المواد المختارة:
          </span>

          <button
            type="button"
            onClick={() => onChange([])}
            disabled={selectedSubjects.length === 0}
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
            flex min-h-28 flex-wrap gap-2
            rounded-2xl border border-[#CBD8E8]/50
            bg-[#F3F7FD] p-4
          "
        >
          {selectedSubjects.map((subject) => (
            <div
              key={subject}
              className="
                inline-flex items-center gap-2
                rounded-xl bg-[#17A6D1]
                p-2.5 text-white h-fit
              "
            >
              <span className="text-xs font-semibold">{subject}</span>

              <button
                type="button"
                onClick={() => removeSubject(subject)}
                aria-label={`حذف مادة ${subject}`}
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
          ))}

          {selectedSubjects.length === 0 && (
            <span className="text-xs text-zinc-400">
              لم تضف أي مواد حتى الآن.
            </span>
          )}
        </div>

        {/* Helper Message */}
        <div className="flex items-center justify-end gap-1.5">
          <Info size={13} className="text-[#17A6D1]" />

          <p className="text-xs font-medium text-zinc-500">
            اكتب مادة واحدة على الأقل عشان نكمل.
          </p>
        </div>
      </div>
    </section>
  );
}
