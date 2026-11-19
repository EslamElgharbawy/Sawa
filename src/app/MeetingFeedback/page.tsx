"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { PartyPopper, Star } from "lucide-react";
import SawaLogo from "@/src/assets/images/sawa-logo 1.svg";

function MeetingFeedbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Dynamic session details from query params (with fallbacks)
  const subject = searchParams.get("subject") || "كيمياء";
  const partner = searchParams.get("partner") || "ملك";

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [goalProgress, setGoalProgress] = useState(80);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (rating === 0 || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const feedback = {
      subject,
      partner,
      rating,
      goalProgress,
      notes,
    };

    console.log("Meeting feedback:", feedback);

    // توجيه المستخدم لصفحة المذاكرة بعد إرسال التقييم
    setTimeout(() => {
      router.push("/study");
    }, 400);
  };

  const handleSkip = () => {
    router.push("/study");
  };

  const activeRating = hoverRating || rating;

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#edf7fd] flex items-center justify-center px-4 py-8 select-none"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[600px] rounded-[32px] border border-[#dce5eb] bg-white px-6 py-9 shadow-[0_18px_45px_rgba(15,50,54,0.10)] sm:px-9 sm:py-10"
      >
        {/* 1. Official Sawa Logo */}
        <div className="mb-6 flex justify-center">
          <Image
            src={SawaLogo}
            alt="منصة ساوا التعليمية"
            className="h-12 w-auto object-contain"
            priority
          />
        </div>

        {/* 2. Success Icon */}
        <div className="mb-4 flex justify-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-[#fff3cd] text-[#10383b] shadow-xs">
            <PartyPopper size={31} strokeWidth={2} />
          </div>
        </div>

        {/* 3. Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-extrabold leading-relaxed text-[#10383b] sm:text-[28px]">
            الجلسة خلصت، تحب تقييمها؟
          </h1>

          <p className="mt-1 text-base font-medium text-[#8292a5]">
            جلسة {subject} مع {partner}
          </p>
        </div>

        {/* 4. Rating Stars with Hover Preview */}
        <section className="mb-8">
          <label className="mb-3 block text-center text-base font-semibold text-[#475569]">
            تقييمك للجلسة
          </label>

          <div
            dir="ltr"
            className="flex items-center justify-center gap-2"
            aria-label="تقييم الجلسة من خمس نجوم"
            onMouseLeave={() => setHoverRating(0)}
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                onMouseEnter={() => setHoverRating(value)}
                aria-label={`${value} من 5`}
                aria-pressed={rating === value}
                className="rounded-md p-1 cursor-pointer transition-transform duration-150 hover:scale-115 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#17a6d1]"
              >
                <Star
                  size={36}
                  strokeWidth={1.5}
                  className={`transition-colors duration-150 ${
                    value <= activeRating
                      ? "fill-[#ffc229] text-[#ffc229]"
                      : "fill-[#e5e7eb] text-[#e5e7eb]"
                  }`}
                />
              </button>
            ))}
          </div>
        </section>

        {/* 5. Goal Progress */}
        <section className="mb-8">
          <div className="mb-3 flex items-center justify-between gap-2">
            <label
              htmlFor="goal-progress"
              className="text-sm font-semibold text-[#475569] sm:text-base cursor-pointer"
            >
              خلصت قد إيه من هدفك؟
            </label>

            <span className="shrink-0 text-sm font-bold text-[#17a6d1]">
              ({goalProgress}%)
            </span>
          </div>

          <input
            id="goal-progress"
            type="range"
            min="0"
            max="100"
            step="5"
            value={goalProgress}
            onChange={(e) => setGoalProgress(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#d7edf5] accent-[#17a6d1]"
            style={{
              background: `linear-gradient(to left, #17a6d1 ${goalProgress}%, #d7edf5 ${goalProgress}%)`,
            }}
          />
        </section>

        {/* 6. Notes */}
        <section className="mb-9">
          <label
            htmlFor="feedback-notes"
            className="mb-2 block text-base font-semibold text-[#475569] cursor-pointer"
          >
            ملاحظات (اختياري)
          </label>

          <textarea
            id="feedback-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="إيه اللي عجبك وإيه اللي تحب نحسنه؟"
            rows={3}
            className="w-full resize-y rounded-2xl border border-[#d6e0e7] bg-white px-4 py-3 text-right text-sm text-[#334155] shadow-xs outline-none transition placeholder:text-[#94a3b8] focus:border-[#17a6d1] focus:ring-2 focus:ring-[#17a6d1]/15"
          />
        </section>

        {/* 7. Action Buttons */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleSkip}
            className="order-1 min-h-11 cursor-pointer rounded-2xl border border-[#d6e0e7] bg-[#f8fafc] px-5 font-semibold text-[#475569] shadow-xs transition hover:bg-[#eef3f6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17a6d1] sm:order-1"
          >
            تخطي
          </button>

          <button
            type="submit"
            disabled={rating === 0 || isSubmitting}
            className="order-2 min-h-11 cursor-pointer rounded-2xl bg-[#17a6d1] px-5 font-bold text-white shadow-md shadow-[#17a6d1]/20 transition hover:bg-[#1195bd] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10383b] sm:order-2"
          >
            {isSubmitting ? "جاري الإرسال..." : "إرسال التقييم"}
          </button>
        </div>
      </form>
    </main>
  );
}



export default function MeetingFeedback() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#edf7fd] flex items-center justify-center">
          <div className="size-8 animate-spin rounded-full border-2 border-slate-300 border-t-[#17a6d1]" />
        </div>
      }
    >
      <MeetingFeedbackContent />
    </Suspense>
  );
}