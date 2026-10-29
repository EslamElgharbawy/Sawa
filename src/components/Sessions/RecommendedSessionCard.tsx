import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function RecommendedSessionCard() {
  return (
    <Card
      dir="rtl"
      className="w-full gap-0 rounded-4xl border border-amber-200 bg-[#FFF3CD] px-5 py-6 shadow-none transition-colors sm:px-6"
    >
      <CardContent className="flex flex-col gap-4 p-0">
        {/* Subject */}
        <div className="flex items-center justify-start">
          <Badge className="rounded-full border-0 bg-[#0E3236] px-3 py-4 text-xs font-semibold text-white hover:bg-[#0E3236]">
            رياضيات
          </Badge>
        </div>

        {/* Recommendation message */}
        <p className="text-sm font-medium leading-6 text-[#0E3236] sm:text-base">
          فيه 2 طلاب بيدوروا على حد يذاكر معاهم في الفيزياء دلوقتي.
        </p>

        {/* Description */}
        <p className="text-sm leading-5 text-slate-500">تفاعل ونقاش</p>

        {/* Join button */}
        <Button
          type="button"
          className="mt-1 h-12 w-full cursor-pointer rounded-full bg-[#16A6D7] text-base font-semibold text-white shadow-md transition-colors hover:bg-[#1297C4]"
        >
          انضم
        </Button>
      </CardContent>
    </Card>
  );
}
