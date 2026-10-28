"use client";
import Link from "next/link";
import SawaLogo from "@/src/assets/images/sawa-logo 2.svg";
import Image from "next/image";
import {
  BookOpen,
  Users,
  GraduationCap,
  LucideIcon,
  ArrowLeft,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEffect, useState } from "react";
export default function RegisterPage() {
  const [studyFields, setStudyFields] = useState<string[]>([]);
  const [today, setToday] = useState("");

  useEffect(() => {
    const date = new Date();
    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60_000,
    );
    setToday(localDate.toISOString().split("T")[0]);
  }, []);
  return (
    <main
      dir="ltr"
      className="relative min-h-screen overflow-hidden bg-slate-50 px-4 py-8 sm:px-6 lg:py-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-sky-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-20 size-80 rounded-full bg-amber-400/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_-20px_rgba(10,61,58,0.16)] ring-1 ring-slate-200/70 2xl:grid 2xl:grid-cols-12">
        {/* Brand panel */}
        <section
          dir="rtl"
          className="relative col-span-5 hidden 2xl:flex 2xl:flex-col 2xl:justify-between  isolate overflow-hidden bg-linear-to-br from-teal-950 via-teal-900 to-teal-950 px-6 py-8 text-white sm:max-lg:px-10 sm:max-lg:py-10 lg:min-h-190 lg:px-8 lg:py-12"
        >
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 -z-10 size-56 rounded-full bg-cyan-500/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-16 -left-16 -z-10 size-56 rounded-full bg-amber-400/15 blur-3xl"
          />

          <div className="flex flex-col">
            <Link href="/register" className="inline-flex items-center gap-3">
              <div className="flex size-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-inner">
                <Image
                  src={SawaLogo}
                  alt="Sawa Logo"
                  width={100}
                  height={100}
                  className="size-14 object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-extrabold">سوا</span>
                  <span className="text-sm font-bold uppercase tracking-wider text-cyan-400">
                    SAWA
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Study Better. Together.
                </p>
              </div>
            </Link>

            <div className="w-fit mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-bold text-cyan-300 sm:mt-12">
              <span className="size-2 rounded-full bg-cyan-400" />
              مجتمع ساوا الدراسي
            </div>

            <h1 className="mt-5 text-2xl font-extrabold leading-relaxed sm:text-3xl">
              سجل بياناتك للانضمام
            </h1>

            <p className="mt-3 max-w-md text-sm leading-7 text-slate-300">
              ادخل بياناتك بشكل صحيح وسيتم مراجعة طلبك خلال بضع ساعات إلى أيام.
            </p>

            <div className="mt-7 space-y-3 sm:mt-9">
              <Feature
                title="مجموعات دراسية بحسب صفك"
                description="تواصل وتناقش مع زملاء نفس مرحلتك التعليمية بسهولة."
                color="sky"
                icon={Users}
              />
              <Feature
                title="بيئة آمنة ومراقبة تماما"
                description="مراجعة هوية الطلاب تضمن بيئة تعليمية نظيفه محترمة."
                color="amber"
                icon={BookOpen}
              />
              <Feature
                title="جلسات تركيز واستذكار دورية"
                description="جلسات تساعدك على الالتزام والمذاكرة مع زملائك."
                color="emerald"
                icon={GraduationCap}
              />
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-slate-300 lg:mt-10">
            <span className="font-bold text-amber-400">مجاني 100%</span>
            <span>تسجيل حساب طالب</span>
          </div>
        </section>
        {/* Onboarding Form */}
        <section
          dir="rtl"
          className="col-span-7 flex flex-col justify-between px-6 py-8 lg:px-8 lg:py-10 xl:px-12 xl:py-12"
        >
          <div>
            {/* Progress Header */}

            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-2xl font-extrabold leading-relaxed text-teal-950 lg:text-3xl">
                كمّل بياناتك
              </h2>

              <p className="mt-2 max-w-lg text-sm leading-6 text-slate-600 lg:text-base lg:leading-7">
                فاضل شوية تفاصيل بسيطة عشان نجهزلك تجربتك على Sawa ونوصلك
                بزملائك المناسبين.
              </p>
            </div>

            <form className="space-y-5">
              {/* Full Name */}
              <div className="space-y-2">
                <label
                  htmlFor="fullName"
                  className="block text-xs lg:text-sm font-bold text-slate-800"
                >
                  الاسم بالكامل <span className="text-red-600">*</span>
                </label>

                <div className="relative">
                  <input
                    id="fullName"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="اكتب اسمك بالكامل"
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                    required
                    minLength={2}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm lg:text-base text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-sky-700 focus:bg-white  focus:ring-sky-700/10"
                  />
                </div>
              </div>

              {/* Birth Date */}
              <div className="space-y-2">
                <label
                  htmlFor="birth"
                  className="block text-xs lg:text-sm font-bold text-slate-800"
                >
                  تاريخ الميلاد <span className="text-red-600">*</span>
                </label>

                <div className="relative">
                  <input
                    id="birth"
                    name="birth"
                    type="date"
                    autoComplete="bday"
                    // value={birth}
                    // onChange={(e) => setBirth(e.target.value)}
                    max={today}
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm lg:text-base text-slate-700 outline-none transition hover:border-slate-300 focus:border-sky-700 focus:bg-white  focus:ring-sky-700/10"
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <label
                  htmlFor="gender"
                  className="block text-sm font-bold text-slate-800"
                >
                  النوع <span className="text-red-600">*</span>
                </label>

                <Select name="gender" required>
                  <SelectTrigger
                    id="gender"
                    className="h-12! rounded-xl border border-slate-200 bg-slate-50 px-4 text-base shadow-none focus-visible:ring-0"
                  >
                    <SelectValue placeholder="اختر النوع" />
                  </SelectTrigger>

                  <SelectContent
                    dir="rtl"
                    side="bottom"
                    align="start"
                    sideOffset={4}
                    alignItemWithTrigger={false}
                    className="rounded-xl border border-slate-200 bg-white p-1 shadow-lg"
                  >
                    <SelectGroup>
                      <SelectItem
                        value="ذكر "
                        className="cursor-pointer rounded-lg py-3 text-base"
                      >
                        ذكر
                      </SelectItem>

                      <SelectItem
                        value="انثى"
                        className="cursor-pointer rounded-lg py-3 text-base"
                      >
                        أنثى
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Study Fields */}
              <div className="space-y-5 pt-4">
                <div>
                  <label className="block text-sm font-bold text-slate-800">
                    المواد اللي عايز تذاكرها
                    <span className="mr-1 text-red-600">*</span>
                  </label>

                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    اختار المواد اللي حابب تذاكرها مع زملائك، وتقدر تختار أكتر
                    من مادة.
                  </p>
                </div>

                <ToggleGroup
                  variant="default"
                  multiple
                  value={studyFields}
                  onValueChange={setStudyFields}
                  className="flex flex-wrap justify-start gap-2"
                  aria-label="المواد الدراسية"
                >
                  {[
                    { value: "arabic", label: "اللغة العربية" },
                    { value: "english", label: "اللغة الإنجليزية" },
                    { value: "math", label: "الرياضيات" },
                    { value: "physics", label: "الفيزياء" },
                    { value: "chemistry", label: "الكيمياء" },
                    { value: "biology", label: "الأحياء" },
                    { value: "history", label: "التاريخ" },
                    { value: "geography", label: "الجغرافيا" },
                    { value: "programming", label: "البرمجة" },
                  ].map((subject) => (
                    <ToggleGroupItem
                      key={subject.value}
                      value={subject.value}
                      aria-label={subject.label}
                      className="
          h-10 rounded-xl border border-slate-200
          bg-slate-50 px-4
          text-sm font-semibold text-slate-600
          shadow-none transition
          hover:border-sky-300 hover:bg-white hover:text-sky-800
          data-pressed:border-sky-700
          data-pressed:bg-sky-50
          data-pressed:text-sky-800
          data-pressed:shadow-none cursor-pointer
        "
                    >
                      {subject.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>

                {studyFields.length === 0 && (
                  <p className="text-sm text-slate-500">
                    اختار مادة واحدة على الأقل للمتابعة.
                  </p>
                )}

                {/* Custom Subject */}
                <div className="space-y-4">
                  <label
                    htmlFor="customSubject"
                    className="block text-sm font-bold text-slate-800"
                  >
                    مش لاقي المادة اللي عايزها؟
                    <span className="mr-1 font-normal text-slate-500">
                      (اختياري)
                    </span>
                  </label>

                  <input
                    id="customSubject"
                    name="customSubject"
                    type="text"
                    placeholder="اكتب اسم المادة هنا..."
                    className="
        h-12 w-full rounded-xl border border-slate-200
        bg-slate-50 px-4 text-base text-slate-900
        outline-none transition
        placeholder:text-sm placeholder:text-slate-400
        hover:border-slate-300
        focus:border-sky-700 focus:bg-white
         focus:ring-sky-700/10
      "
                  />

                  <p className="text-xs leading-5 text-slate-500">
                    تقدر تكتب اسم أي مادة أو مجال دراسي مش موجود في القائمة.
                  </p>
                </div>
              </div>

              {/* Submit */}
              <div className="space-y-3 pt-3">
                <button
                  type="submit"
                  // disabled={isSubmitting}
                  className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-sky-700 px-6 text-sm font-bold text-white shadow-sm transition duration-300 hover:bg-sky-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-700/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {/* {isSubmitting ? (
                    <LoaderCircle size={18} className="animate-spin" />
                  ) : (
                    <> */}
                  حفظ ومتابعة
                  <ArrowLeft size={17} />
                  {/* </>
                  )} */}
                </button>

                <button
                  type="button"
                  // onClick={() => router.push("/")}
                  className="w-full rounded-full py-2.5 text-sm font-semibold cursor-pointer text-slate-600 transition duration-300 hover:text-teal-950 hover:underline"
                >
                  تخطي الآن والبدء لاحقًا
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>

      <footer className="relative mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-3 px-2 pt-6 text-center text-xs text-slate-400 sm:flex-row sm:text-right">
        <div className="flex flex-wrap justify-center gap-4 sm:justify-start">
          <a
            href="mailto:support@sawa.app"
            className="transition hover:text-slate-600"
          >
            اتصل بنا
          </a>
          <span aria-hidden="true">•</span>
          <span>مركز المساعدة</span>
          <span aria-hidden="true">•</span>
          <span>سياسة الخصوصية</span>
        </div>
        <p>© 2026 منصة ساوا التعليمية. جميع الحقوق محفوظة.</p>
      </footer>
    </main>
  );
}

function Feature({
  title,
  description,
  color,
  icon: Icon,
}: {
  title: string;
  description: string;
  color: "sky" | "amber" | "emerald";
  icon: LucideIcon;
}) {
  const colors = {
    sky: "bg-sky-400/15 text-sky-300",
    amber: "bg-amber-400/15 text-amber-300",
    emerald: "bg-emerald-400/15 text-emerald-300",
  };

  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm sm:p-4">
      <div
        className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${colors[color]}`}
        aria-hidden="true"
      >
        <Icon className="size-5" strokeWidth={1.8} />
      </div>

      <div>
        <h3 className="text-sm font-bold leading-6 text-white">{title}</h3>
        <p className="mt-0.5 text-xs leading-5 text-slate-300">{description}</p>
      </div>
    </div>
  );
}
