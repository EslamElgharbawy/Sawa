"use client";

import {
  ArrowRight,
  FlaskConical,
  UsersRound,
  MessageSquare,
  BookOpen,
  Check,
  Sparkles,
  VolumeX,
  Mic,
  Zap,
  Clock,
  Play,
} from "lucide-react";

import { MatchedStudent } from "@/src/types/StudyMatching";

interface MatchingResultsProps {
  matchedStudents: MatchedStudent[];
  selectedStudentIds: string[];
  targetCount: number;
  canStart: boolean;

  getSubjectDisplay: () => string;
  getPeopleCountLabel: () => string;
  getStyleLabel: () => string;
  getGoalLabel: () => string;

  onBack: () => void;
  onToggleStudent: (studentId: string) => void;
  onStart: () => void;
}

export default function MatchingResults({
  matchedStudents,
  selectedStudentIds,
  targetCount,
  canStart,
  getSubjectDisplay,
  getPeopleCountLabel,
  getStyleLabel,
  getGoalLabel,
  onBack,
  onToggleStudent,
  onStart,
}: MatchingResultsProps) {
  return (
    <main
      dir="rtl"
      className="py-4 overflow-y-auto flex flex-col items-center relative"
    >
      <div className="w-full px-12 lg:px-20 mb-4 flex justify-start">
        {/* Top Return link */}
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center gap-2 text-sm font-bold text-[#103b3e] transition-colors duration-300 hover:text-[#17a6d1] cursor-pointer"
        >
          <ArrowRight size={17} className="mt-0.5" />
          <span>تعديل الاختيارات</span>
        </button>
      </div>

      <div className="w-full max-w-3xl">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-black text-[#103b3e] flex items-center justify-center gap-2">
            <span>لقينا {matchedStudents.length} من الطلبة المناسبين</span>
            <span className="text-[#f59e0b]">✨</span>
          </h1>

          <p className="mt-2 text-sm font-medium text-slate-500">
            اختر{" "}
            {targetCount === 1
              ? "زميلاً واحداً"
              : targetCount === 2
                ? "حتى زميلين"
                : targetCount === 3
                  ? "حتى 3 زملاء"
                  : "3 زملاء أو أكثر"}{" "}
            لبدء جلسة المذاكرة معاهم.
          </p>

          {/* Filter tags pills */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {/* Subject Tag */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#17a6d1]/20 bg-[#ddf5ff] px-3.5 py-1.5 text-xs font-bold text-[#103b3e]">
              <FlaskConical size={14} className="text-[#17a6d1]" />
              <span>{getSubjectDisplay()}</span>
            </div>

            {/* People Count Tag */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#17a6d1]/20 bg-[#ddf5ff] px-3.5 py-1.5 text-xs font-bold text-[#103b3e]">
              <UsersRound size={14} className="text-[#17a6d1]" />
              <span>{getPeopleCountLabel()}</span>
            </div>

            {/* Study Style Tag */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#17a6d1]/20 bg-[#ddf5ff] px-3.5 py-1.5 text-xs font-bold text-[#103b3e]">
              <MessageSquare size={14} className="text-[#17a6d1]" />
              <span>{getStyleLabel()}</span>
            </div>

            {/* Goal Tag */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#17a6d1]/20 bg-[#ddf5ff] px-3.5 py-1.5 text-xs font-bold text-[#103b3e]">
              <BookOpen size={14} className="text-[#17a6d1]" />
              <span>{getGoalLabel()}</span>
            </div>
          </div>
        </header>

        {/* Cards List */}
        <div className="space-y-4">
          {matchedStudents.map((student) => {
            const isSelected = selectedStudentIds.includes(student.id);

            return (
              <div
                key={student.id}
                onClick={() => onToggleStudent(student.id)}
                className={`group relative cursor-pointer rounded-3xl border-2 p-5 sm:p-6 transition-all duration-300 ${
                  isSelected
                    ? "border-[#17a6d1] bg-white shadow-sm"
                    : "border-slate-200 bg-white hover:border-[#17a6d1]/60 "
                }`}
              >
                {/* Selection Radio Circle */}
                <div
                  className={`absolute -top-3 -left-3 z-10 flex size-8 items-center justify-center rounded-full shadow-sm transition-all duration-200 ${
                    isSelected
                      ? "bg-[#17a6d1] text-white border-2 border-white ring-2 ring-[#17a6d1]"
                      : "border-2 border-slate-300 bg-white group-hover:border-[#17a6d1]/60"
                  }`}
                >
                  {isSelected && (
                    <Check size={18} strokeWidth={3} className="text-white" />
                  )}
                </div>

                {/* Main Info Row */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:pl-10">
                  {/* User Profile */}
                  <div className="flex items-center gap-3.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-black text-[#103b3e]">
                          {student.name}
                        </h2>
                        <span className="size-2 rounded-full bg-emerald-500" />
                      </div>
                      <p className="mt-0.5 text-xs font-semibold text-slate-400">
                        {student.grade}
                      </p>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Match Rate */}
                    <div className="inline-flex items-center gap-1 rounded-full bg-[#e7faef] px-3 py-1 text-xs font-bold text-[#16a34a]">
                      <Sparkles size={13} />
                      <span>نسبة التوافق {student.matchRate}%</span>
                    </div>

                    {/* Same Subject */}
                    {student.sameSubject && (
                      <div className="inline-flex items-center gap-1 rounded-full bg-[#e7faef] px-3 py-1 text-xs font-bold text-[#16a34a]">
                        <Check size={13} strokeWidth={2.5} />
                        <span>نفس المادة</span>
                      </div>
                    )}

                    {/* Same Goal */}
                    {student.sameGoal && (
                      <div className="inline-flex items-center gap-1 rounded-full bg-[#e7faef] px-3 py-1 text-xs font-bold text-[#16a34a]">
                        <Check size={13} strokeWidth={2.5} />
                        <span>نفس الهدف</span>
                      </div>
                    )}

                    {/* Silent Study */}
                    {student.silentStudy && (
                      <div className="inline-flex items-center gap-1 rounded-full bg-[#e0efff] px-3 py-1 text-xs font-bold text-[#2563eb]">
                        <VolumeX size={13} />
                        <span>مذاكرة صامتة</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom details row */}
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-slate-100 pt-3 text-xs gap-2">
                  {/* Audio Preference */}
                  <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                    <span>تفضيل الصوت: {student.audioPreference}</span>
                    {student.audioIcon === "chat" ? (
                      <MessageSquare size={14} className="text-slate-400" />
                    ) : (
                      <Mic size={14} className="text-slate-400" />
                    )}
                  </div>

                  {/* Availability */}
                  <div className="flex items-center gap-1.5">
                    {student.isReadyNow ? (
                      <div className="inline-flex items-center gap-1 font-bold text-[#17a6d1]">
                        <Zap size={14} className="fill-[#17a6d1]" />
                        <span>{student.availability}</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1 font-medium text-slate-500">
                        <Clock size={14} />
                        <span>{student.availability}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Action Bar */}
        <div className="mt-8 flex items-center justify-between rounded-full border border-[#cbd8e8] bg-white px-5 py-3 shadow-sm sm:px-6 sm:py-3.5">
          {/* Right side in RTL: Status text */}
          <div className="flex items-center gap-2 text-[#103b3e]">
            <UsersRound className="size-5 text-[#17a6d1]" />
            <span className="text-base font-bold">
              {selectedStudentIds.length === 0
                ? "اختر زميلاً للبدء"
                : `تم اختيار ${selectedStudentIds.length}`}
            </span>
          </div>

          {/* Left side in RTL: Action buttons */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              disabled={!canStart}
              onClick={onStart}
              className="flex items-center gap-2 rounded-full bg-[#17a6d1] px-6 py-3 text-xs sm:text-sm font-bold text-white transition hover:bg-[#1395bc] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:opacity-60 cursor-pointer shadow-sm"
            >
              <Play size={14} className="fill-current" />
              <span>بدء الجلسة</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}