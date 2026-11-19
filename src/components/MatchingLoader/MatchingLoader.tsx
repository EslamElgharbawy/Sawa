"use client";

import { Search, User, RotateCw, X } from "lucide-react";

interface MatchingLoaderProps {
  matchingProgress: number;
  getSubjectDisplay: () => string;
  getStyleLabel: () => string;
  getGoalLabel: () => string;
  onCancel: () => void;
}

export default function MatchingLoader({
  matchingProgress,
  getSubjectDisplay,
  getStyleLabel,
  getGoalLabel,
  onCancel,
}: MatchingLoaderProps) {
  return (
    <main
      dir="rtl"
      className="relative w-full min-h-[90vh] py-8 px-4 sm:px-8 bg-slate-50 flex flex-col justify-between items-center overflow-hidden rounded-3xl border border-slate-200/60 shadow-xs"
    >
      {/* Background Gradients & Glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70.43%_88.04%_at_50.00%_38.00%,_rgba(19,_168,_213,_0.13)_0%,_rgba(254,_243,_199,_0.16)_42%,_rgba(254,_243,_199,_0)_75%)]" />
      <div className="pointer-events-none absolute -top-32 right-1/4 size-96 rounded-full bg-cyan-200/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-1/4 size-96 rounded-full bg-amber-100/40 blur-3xl" />

      {/* 2. Main Content Area */}
      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center my-6">
        {/* Radar & Students Visual Section */}
        <div className="relative flex size-72 items-center justify-center mb-8 select-none">
          {/* Concentric Radar Rings */}
          <div className="absolute size-72 rounded-full border border-cyan-500/20" />
          <div className="absolute size-52 rounded-full border border-slate-200/90" />
          <div className="absolute size-32 rounded-full border border-cyan-500/30" />

          {/* Radar Expanding Pulse Wave */}
          <span className="pointer-events-none absolute size-44 rounded-full border border-cyan-400/50 animate-ping opacity-30 duration-1000" />

          {/* Rotating Radar Sweep Beam (Conic Gradient) */}
          <div
            className="pointer-events-none absolute size-72 rounded-full animate-[spin_2.5s_linear_infinite]"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(6, 182, 212, 0.45) 0deg, rgba(6, 182, 212, 0.15) 60deg, transparent 90deg, transparent 360deg)",
            }}
          />

          {/* Horizontal Eye / Lens Shape behind Search Node */}
          <div className="pointer-events-none absolute w-56 h-28 flex items-center justify-center opacity-40 z-0">
            <svg viewBox="0 0 100 50" className="size-full">
              <path
                d="M 5 25 Q 50 2, 95 25 Q 50 48, 5 25 Z"
                fill="url(#lensCyanGlow)"
              />
              <defs>
                <radialGradient id="lensCyanGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
                  <stop offset="80%" stopColor="#38bdf8" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          {/* Pronounced Wave Connecting Dashed Line with Flow Animation to the Right */}
          <svg
            className="pointer-events-none absolute inset-0 size-full z-10"
            viewBox="0 0 288 288"
            fill="none"
          >
            <path
              d="M 40 162 C 78 116, 114 126, 144 138 C 174 150, 210 160, 248 142"
              stroke="#06b6d4"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              strokeLinecap="round"
              opacity="0.85"
              style={{
                animation: "flowDashesRight 0.85s linear infinite",
              }}
            />
          </svg>
          <style>{`
              @keyframes flowDashesRight {
                from {
                  stroke-dashoffset: 0;
                }
                to {
                  stroke-dashoffset: -24;
                }
              }
            `}</style>

          {/* Sparkles */}
          <span className="absolute top-6 right-16 text-amber-500 text-sm animate-pulse">
            ✨
          </span>
          <span className="absolute bottom-10 left-16 text-cyan-500 text-xs animate-bounce">
            ⚡
          </span>

          {/* Center Search Node */}
          <div className="relative z-20 size-16 bg-white rounded-2xl border-2 border-blue-50/80 flex items-center justify-center shadow-lg">
            <div className="size-12 bg-gradient-to-l from-cyan-500/20 to-cyan-500/5 rounded-xl flex items-center justify-center text-cyan-500">
              <Search className="size-6 animate-pulse" />
            </div>
          </div>

          {/* Right: "أنت" Student Node */}
          <div className="absolute right-0 sm:right-2 top-[114px] flex flex-col items-center gap-1.5 z-20">
            <div className="size-14 p-1 bg-white rounded-2xl border-2 border-[#103b3e] flex items-center justify-center shadow-md">
              <div className="size-full bg-[#103b3e] rounded-xl flex items-center justify-center text-white text-sm font-bold">
                أنت
              </div>
            </div>
            <span className="px-2.5 py-0.5 bg-white/95 rounded-full border border-slate-200 text-cyan-950 text-xs font-semibold shadow-xs">
              طالب
            </span>
          </div>

          {/* Left: "الزميل المناسب" Target Node */}
          <div className="absolute left-0 sm:left-2 top-[114px] flex flex-col items-center gap-1.5 z-20">
            <div className="size-14 p-1 bg-white rounded-2xl border-2 border-dashed border-cyan-400 flex items-center justify-center shadow-md">
              <div className="size-full bg-blue-50/60 rounded-xl flex items-center justify-center text-cyan-500">
                <User size={22} className="stroke-[2.2]" />
              </div>
            </div>
            <span className="px-2.5 py-0.5 bg-white/95 rounded-full border border-slate-200 text-slate-600 text-xs font-medium shadow-xs">
              الزميل المناسب
            </span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <h2 className="text-3xl sm:text-4xl font-black text-cyan-950">
          بندور على ناس تناسبك...
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-lg">
          بنراجع المادة ({getSubjectDisplay()}) والوقت وطريقة المذاكرة والهدف.
        </p>

        {/* Dynamic Animated Status Pill */}
        <div className="mt-4 px-5 py-2 bg-white/95 rounded-full shadow-xs border border-cyan-500/30 flex items-center gap-2.5 transition-all duration-300">
          <span className="text-cyan-950 text-xs sm:text-sm font-medium">
            {matchingProgress < 28
              ? "بنراجع المادة ونحدد أفضل المتطابقين معك الآن..."
              : matchingProgress < 58
                ? `بندور على طلاب جاهزين لـ (${getSubjectDisplay()}) في نفس الوقت...`
                : matchingProgress < 85
                  ? "جاري فحص التوافق الدراسي وأسلوب المناقشة..."
                  : "بنجهز لك غرفة المذاكرة التفاعلية مع زميلك..."}
          </span>
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-cyan-500" />
          </span>
        </div>

        {/* Dynamic Animated Progress Bar */}
        <div className="mt-4 w-72 h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-cyan-500 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${matchingProgress}%` }}
          />
        </div>

        {/* 3. Session Criteria Card (معايير جلستك المفضلة) */}
        <div className="w-full max-w-xl mt-7 p-4 sm:p-5 bg-white/85 rounded-2xl border border-white/90 backdrop-blur-md shadow-sm">
          {/* Header of Criteria Card */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/70">
            <span className="text-slate-500 text-xs font-semibold uppercase tracking-wide">
              معايير جلستك المفضلة
            </span>
            <div className="flex items-center gap-1.5 text-cyan-600 text-xs font-semibold">
              <RotateCw size={13} className="animate-spin text-cyan-500" />
              <span>فحص نشط 4/4</span>
            </div>
          </div>

          {/* 4 Criteria Boxes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* المادة */}
            <div className="p-3 bg-white/80 rounded-xl border border-slate-200/70 flex flex-col justify-between items-start h-20">
              <div className="flex items-center justify-between w-full">
                <span className="text-slate-500 text-xs">المادة</span>
                <span className="text-xs">🧪</span>
              </div>
              <div className="flex items-center gap-1.5 w-full">
                <span className="size-1.5 bg-emerald-500 rounded-full shrink-0" />
                <span className="text-cyan-950 text-xs font-bold truncate">
                  {getSubjectDisplay()}
                </span>
              </div>
            </div>

            {/* الوقت */}
            <div className="p-3 bg-white/80 rounded-xl border border-slate-200/70 flex flex-col justify-between items-start h-20">
              <div className="flex items-center justify-between w-full">
                <span className="text-slate-500 text-xs">الوقت</span>
                <span className="text-xs">⏰</span>
              </div>
              <div className="flex items-center gap-1.5 w-full">
                <span className="size-1.5 bg-emerald-500 rounded-full shrink-0" />
                <span className="text-cyan-950 text-xs font-bold truncate">
                  دلوقتي
                </span>
              </div>
            </div>

            {/* طريقة المذاكرة */}
            <div className="p-3 bg-white/80 rounded-xl border border-slate-200/70 flex flex-col justify-between items-start h-20">
              <div className="flex items-center justify-between w-full">
                <span className="text-slate-500 text-xs">طريقة المذاكرة</span>
                <span className="text-xs">💬</span>
              </div>
              <div className="flex items-center gap-1.5 w-full">
                <span className="size-1.5 bg-emerald-500 rounded-full shrink-0" />
                <span className="text-cyan-950 text-xs font-bold truncate">
                  {getStyleLabel()}
                </span>
              </div>
            </div>

            {/* الهدف */}
            <div className="p-3 bg-white/80 rounded-xl border border-slate-200/70 flex flex-col justify-between items-start h-20">
              <div className="flex items-center justify-between w-full">
                <span className="text-slate-500 text-xs">الهدف</span>
                <span className="text-xs">🎯</span>
              </div>
              <div className="flex items-center gap-1.5 w-full">
                <span className="size-1.5 bg-emerald-500 rounded-full shrink-0" />
                <span className="text-cyan-950 text-xs font-bold truncate">
                  {getGoalLabel()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sawa Tip Card */}
        <div className="mt-5 max-w-lg px-4 py-2.5 bg-amber-50/80 rounded-xl border border-amber-200/70 flex items-center justify-center gap-2 shadow-xs">
          <span className="text-base shrink-0">💡</span>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            <span className="font-bold text-slate-800 ml-1">نصيحة ساوا:</span>
            جهز كشكولك والأسئلة الصعبة بينما نلاقي الزميل المتوافق!
          </p>
        </div>

        {/* Cancel Search Button */}
        <button
          type="button"
          onClick={onCancel}
          className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 text-slate-500 hover:text-slate-800 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
        >
          <X size={15} />
          <span>إلغاء البحث والعودة</span>
        </button>
      </div>
    </main>
  );
}
