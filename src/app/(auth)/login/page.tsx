import Link from "next/link";
import SawaLogo1 from "@/src/assets/images/sawa-logo 1.svg";
import SawaLogo2 from "@/src/assets/images/sawa-logo 2.svg";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";

export default function LoginPage() {
  return (
    <main
      dir="ltr"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-8 sm:px-6 lg:py-12 "
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-sky-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-20 size-80 rounded-full bg-teal-900/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/3 top-1/3 size-56 rounded-full bg-amber-200/20 blur-3xl"
      />

      <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_-20px_rgba(10,61,58,0.16)] ring-1 ring-slate-200/70 2xl:grid 2xl:grid-cols-12 xl:max-2xl:w-fit">
        {/* Brand panel */}
        <section
          dir="rtl"
          className="relative col-span-5 hidden 2xl:flex 2xl:flex-col 2xl:justify-between isolate overflow-hidden bg-linear-to-br from-teal-950 via-teal-900 to-teal-950 px-6 py-8 text-white sm:px-10 sm:py-10 lg:min-h-162.5  lg:px-8 lg:py-12"
        >
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 -z-10 size-56 rounded-full bg-sky-500/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-16 -left-16 -z-10 size-56 rounded-full bg-amber-400/15 blur-3xl"
          />

          <div className="flex flex-col">
            <Link href="/login" className="inline-flex items-center gap-3">
              <div className="flex size-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-inner">
                <Image
                  src={SawaLogo2}
                  alt="Sawa Logo"
                  width={100}
                  height={100}
                  className="size-16 object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-extrabold">سوا</span>
                  <span className="text-sm font-bold uppercase tracking-wider text-sky-400 font-mono">
                    SAWA
                  </span>
                </div>
                <p dir="ltr" className="text-xs text-slate-300 ">
                  Study Better. Together.
                </p>
              </div>
            </Link>

            <div className="w-fit mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-emerald-200 backdrop-blur-sm sm:mt-12">
              <span className="size-2 rounded-full bg-emerald-400" />
              1,428 طالب يذاكرون الآن عبر الغرف
            </div>

            <h1 className="mt-5 text-3xl font-extrabold leading-relaxed sm:leading-relaxed">
              المذاكرة لوحدك صعبة؟
              <span className="block text-sky-400">
                هنا مش هتكون لوحدك أبدًا.
              </span>
            </h1>

            <p className="mt-4 max-w-md text-sm leading-7 text-slate-300 ">
             انضم إلى مجموعات دراسية تفاعلية، وشارك زملاءك المذاكرة لتحقيق تركيز أفضل و التزام مستمر في بيئة محفزة.
            </p>

            <div className="mt-7 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm sm:mt-9">
              <div className="flex items-center justify-between gap-3">
                <div className="flex -space-x-2 ">
                  <span className="flex size-8 items-center justify-center rounded-full border-2 border-teal-900 bg-amber-400 text-xs font-bold text-teal-950">
                    ع
                  </span>
                  <span className="flex size-8 items-center justify-center rounded-full border-2 border-teal-900 bg-sky-500 text-xs font-bold text-white">
                    م
                  </span>
                  <span className="flex size-8 items-center justify-center rounded-full border-2 border-teal-900 bg-emerald-500 text-xs font-bold text-white">
                    س
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    غرفة الهندسة والرياضيات
                  </p>
                  <p className="text-xs text-slate-300">جلسة تركيز 50 دقيقة</p>
                </div>
                <span className="shrink-0 rounded-xl bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                  مفتوحة
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-slate-300 lg:mt-10">
            <span>أول منصة مذاكرة جماعية ذكية</span>
            <span dir="ltr">© 2026 Sawa.app</span>
          </div>
        </section>

        {/* Login form */}
        <section
          dir="rtl"
          className="col-span-7 flex items-center justify-center px-6 py-8 lg:px-10 lg:py-12 xl:max-2xl:px-16"
        >
          <div className="w-full max-w-md">
            <div className="mb-10">
              <div className="mb-5 flex justify-center 2xl:hidden">
                <Image
                  src={SawaLogo1}
                  alt="Sawa Logo"
                  width={100}
                  height={100}
                  className="size-44 object-contain"
                  priority
                />
              </div>
              <span className="inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-bold uppercase leading-4 tracking-tight text-sky-500">
                مرحبًا بعودتك
              </span>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 xl:text-4xl">
                يلا نذاكر سوا
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500 xl:text-base">
  ابدأ رحلتك الدراسية مع مجتمع يشاركك نفس الشغف.
              </p>
            </div>

            <p className="text-xs leading-7 text-slate-500 xl:text-sm">
              سجل دخولك أو أنشئ حسابك بأمان وسرعة وبضغطة واحدة عبر Google.
            </p>

            <button
              type="button"
              className="flex min-h-13 mt-3 cursor-pointer w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm xl:text-base font-semibold leading-6 text-slate-700 shadow-sm transition hover:bg-slate-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span>المتابعة باستخدام Google</span>

              <svg
                aria-hidden="true"
                viewBox="0 0 48 48"
                className="size-5 shrink-0"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.75 7.18l7.73 6C44.42 37.91 46.98 31.82 46.98 24.55Z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                />
              </svg>
            </button>

            <div className="mt-5 xl:mt-7 2xl:mt-10 flex items-center justify-center gap-2 text-xs text-slate-400 xl:text-sm">
              <ShieldCheck className="size-5 shrink-0 text-emerald-500" />
              <span>تسجيل آمن ومحمي 100% لبيانات الطالب</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
