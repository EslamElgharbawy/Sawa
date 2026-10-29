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
  Clock3,
  UsersRound,
  Target,
  ArrowLeft,
} from "lucide-react";

type SessionCardProps = {
  subject: string;
  time: string;
  status: string;
  meetingType: string;
  participants: number;
  description: string;
  buttonText?: string;
};

export function SessionCard({
  subject,
  time,
  status,
  meetingType,
  participants,
  description,
  buttonText = "دخول الاجتماع",
}: SessionCardProps) {
  return (
    <Card
      dir="rtl"
      className="w-full gap-1.5 rounded-3xl border border-slate-200 bg-white shadow-md ring-0 transition-shadow hover:shadow-lg"
    >
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="space-y-1">
          <CardTitle className="text-lg font-bold text-primary sm:text-xl">
            {subject}
          </CardTitle>

          <p className="flex items-center gap-1.5 text-sm text-slate-500">
            <Clock3 size={16} />
            {time}
          </p>
        </div>

        <Badge className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-50">
          {status}
        </Badge>
      </CardHeader>

      <CardContent>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge className="gap-1 rounded-full border-0 bg-[#DDF5FF] px-3 py-1 text-xs font-medium text-[#0E3236] hover:bg-[#DDF5FF]">
            <Target size={14} />
            {meetingType}
          </Badge>

          <Badge
            variant="secondary"
            className="gap-1 rounded-full border-0 bg-[#EDF0F2] px-3 py-1 text-xs font-medium text-[#718096] hover:bg-[#EDF0F2]"
          >
            <UsersRound size={14} />
            {participants} طلاب
          </Badge>

          <Badge
            variant="secondary"
            className="rounded-full border-0 bg-[#EDF0F2] px-3 py-1 text-xs font-medium text-[#718096] hover:bg-[#EDF0F2]"
          >
            {description}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="border-0 bg-transparent">
        <Button
          className="h-12 w-full cursor-pointer gap-2 rounded-full bg-secondary text-sm font-bold text-white shadow-sm transition hover:bg-secondary-hover"
        >
          {buttonText}
          <ArrowLeft size={18} />
        </Button>
      </CardFooter>
    </Card>
  );
}
