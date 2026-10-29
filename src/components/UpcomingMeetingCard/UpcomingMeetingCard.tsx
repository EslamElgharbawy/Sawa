import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarClock,
  Clock3,
  UsersRound,
  Target,
  ArrowLeft,
} from "lucide-react";

export function UpcomingMeetingCard() {
  return (
    <Card
      dir="rtl"
      className="w-full rounded-3xl border border-slate-200 bg-white shadow-md transition-shadow hover:shadow-lg gap-1.5 ring-0 "
    >
      <div>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-lg font-bold text-primary sm:text-xl">
              رياضيات
            </CardTitle>

            <p className="flex items-center gap-1.5 text-sm text-slate-500">
              <Clock3 size={16} />
              اليوم - 7:00 م
            </p>
          </div>

          <Badge className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-50">
            مؤكدة
          </Badge>
        </CardHeader>

        <CardContent>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {/* Meeting Type */}
            <Badge className="gap-1 rounded-full border-0 bg-[#DDF5FF] px-3 py-1 text-xs font-medium text-[#0E3236] hover:bg-[#DDF5FF]">
              <Target size={14} />
              مذاكرة
            </Badge>

            {/* Participants */}
            <Badge
              variant="secondary"
              className="gap-1 rounded-full border-0 bg-[#EDF0F2] px-3 py-1 text-xs font-medium text-[#718096] hover:bg-[#EDF0F2]"
            >
              <UsersRound size={14} />3 طلاب
            </Badge>

            {/* Meeting Description */}
            <Badge
              variant="secondary"
              className="rounded-full border-0 bg-[#EDF0F2] px-3 py-1 text-xs font-medium text-[#718096] hover:bg-[#EDF0F2]"
            >
              تفاعل ونقاش
            </Badge>
          </div>
        </CardContent>
      </div>

      <CardFooter className="border-0 bg-transparent">
        <Button className="h-12 w-full cursor-pointer gap-2 rounded-full bg-secondary text-sm font-bold text-white shadow-sm transition hover:bg-secondary-hover">
          دخول الاجتماع
          <ArrowLeft size={18} />
        </Button>
      </CardFooter>
    </Card>
  );
}
