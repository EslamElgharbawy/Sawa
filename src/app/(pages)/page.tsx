import { RecommendedSessionCard } from "@/src/components/Sessions/RecommendedSessionCard";
import { SessionCard } from "@/src/components/Sessions/SessionCard";
import { CalendarClock, Sparkles } from "lucide-react";

const stats = [
  { value: 2, label: "جلسة قادمة" },
  { value: 3, label: "جلسة خلصناها" },
  { value: 2, label: "قناة مشترك فيها" },
];
export default function Home() {
  return (
    <>
      <section
        dir="rtl"
        className="relative flex min-h-80 flex-col-reverse justify-between gap-8 overflow-hidden rounded-4xl bg-linear-to-tl from-[#005966] to-[#0D383A] p-6 text-white shadow-[0_20px_50px_rgba(15,40,45,0.12)] sm:p-8 lg:flex-row lg:items-center lg:p-9 lg:mx-30"
      >
        {/* المحتوى الرئيسي */}
        <div className="flex flex-1 flex-col items-start justify-center gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-[2px]">
            <span className="text-sm font-medium leading-5 text-teal-100">
              أهلاً يا مي
            </span>
            <span className="text-base">👋</span>
          </div>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
            جاهز تذاكر؟
          </h1>

          <p className="text-base leading-relaxed text-white/75">
            اختار اللي يناسبك وإحنا هنلاقي لك ناس تذاكر معاهم في نفس مجالك وهدفك
            الدراسي.
          </p>

          <button
            type="button"
            className="mt-3 inline-flex h-14 cursor-pointer items-center justify-center gap-3 rounded-3xl bg-[#FFCA32] px-8 text-base font-bold text-[#123C3E] transition hover:bg-[#FFD65C] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFCA32]"
          >
            <Sparkles className="size-5" />
            يلا نذاكر
          </button>
        </div>

        {/* الإحصائيات */}
        <div className="grid grid-cols-3 gap-3 sm:flex sm:flex-row lg:flex-col lg:gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center rounded-3xl bg-white/10 px-6 py-3"
            >
              <span className="block text-2xl font-bold text-[#FFCA32] sm:text-3xl">
                {stat.value}
              </span>
              <span className="mt-1 text-center text-xs text-white/75">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-10 mx-30">
        <h2 className="flex items-center gap-3 text-xl font-bold text-primary mb-5">
          <CalendarClock size={22} className="text-secondary" /> جلساتك القادمة
        </h2>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <SessionCard
            subject="رياضيات"
            time="اليوم - 7:00 م"
            status="مؤكدة"
            meetingType="مذاكرة"
            participants={3}
            description="تفاعل ونقاش"
            buttonText="دخول الاجتماع"
          />
          <SessionCard
            subject="رياضيات"
            time="اليوم - 7:00 م"
            status="مؤكدة"
            meetingType="مذاكرة"
            participants={3}
            description="تفاعل ونقاش"
            buttonText="دخول الاجتماع"
          />
        </div>
      </section>
      <section className="mt-10 mx-30">
        <h2 className="flex items-center gap-3 text-xl font-bold text-primary mb-5">
          <Sparkles size={22} className="text-secondary" /> اقتراحات لك
        </h2>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <RecommendedSessionCard />

          <RecommendedSessionCard />
        </div>
      </section>
    </>
  );
}
