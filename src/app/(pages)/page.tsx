import { RecommendedSessionCard } from "@/src/components/Sessions/RecommendedSessionCard";
import { SessionCard } from "@/src/components/Sessions/SessionCard";
import { RecentSessionCard } from "@/src/components/Sessions/RecentSessionCard";
import { BookOpen, CalendarClock, Sparkles } from "lucide-react";
import Link from "next/link";

const stats = [
  { value: 2, label: "جلسة قادمة" },
  { value: 3, label: "جلسة خلصناها" },
  { value: 2, label: "قناة مشترك فيها" },
];

const recentSessions = [
  {
    subject: "كيمياء",
    time: "الأحد - 6:00 م",
    attendees: "ملك، عمر",
    rating: 4,
    progress: 80,
  },
  {
    subject: "English",
    time: "السبت - 4:00 م",
    attendees: "سارة، آدم، نور",
    rating: 5,
    progress: 100,
  },
  {
    subject: "رياضيات",
    time: "الخميس - 8:00 م",
    attendees: "أحمد",
    rating: 3,
    progress: 60,
  },
];
export default function Home() {
  return (
    <>
        <section
        dir="rtl"
        className="relative flex min-h-80 flex-col-reverse justify-between gap-8 overflow-hidden rounded-4xl bg-linear-to-tl from-[#005966] to-[#0D383A] p-6 text-white shadow-[0_20px_50px_rgba(15,40,45,0.12)] sm:p-8 xl:flex-row xl:items-center xl:p-9 2xl:mx-30"
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

          <Link
            type="button"
            href="/study"    
            className="mt-3 inline-flex h-14 cursor-pointer items-center justify-center gap-3 rounded-3xl bg-[#FFCA32] px-8 text-base font-bold text-[#123C3E] transition hover:bg-[#FFD65C] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFCA32]"
          >
            <Sparkles className="size-5" />
            يلا نذاكر
          </Link>
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
      <section className="mt-14 2xl:mx-30">
        <h2 className="flex items-center gap-3 text-xl font-bold text-primary mb-5">
          <CalendarClock size={22} className="text-secondary" /> جلساتك القادمة
        </h2>
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
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
      <section className="mt-14 2xl:mx-30">
        <h2 className="flex items-center gap-3 text-xl font-bold text-primary mb-5">
          <Sparkles size={22} className="text-secondary" /> اقتراحات لك
        </h2>
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <RecommendedSessionCard />

          <RecommendedSessionCard />
        </div>
      </section>
      <section className="mt-14 2xl:mx-30">
        <h2 className="flex items-center gap-3 text-xl font-bold text-primary mb-5">
          <BookOpen size={22} className="text-secondary" /> آخر جلساتك
        </h2>
        <div className="flex flex-col gap-4">
          {recentSessions.map((session, index) => (
            <RecentSessionCard key={index} {...session} />
          ))}
        </div>
      </section>
    </>
  );
}
