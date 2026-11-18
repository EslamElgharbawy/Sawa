export interface MatchedStudent {
  id: string;
  name: string;
  avatarLetter: string;
  avatarBg: string;
  grade: string;
  matchRate: number;
  sameSubject: boolean;
  sameGoal: boolean;
  sameTime?: boolean;
  silentStudy?: boolean;
  audioPreference: string;
  audioIcon: "mic" | "mic-cam" | "chat";
  availability: string;
  isReadyNow: boolean;
}

export const MATCHED_STUDENTS: MatchedStudent[] = [
  {
    id: "student-1",
    name: "ملك",
    avatarLetter: "م",
    avatarBg: "bg-[#194048]",
    grade: "الصف الثاني الثانوي",
    matchRate: 95,
    sameSubject: true,
    sameGoal: true,
    audioPreference: "مايك وكاميرا مفتوحين",
    audioIcon: "mic-cam",
    availability: "جاهزة لبدء الجلسة الآن",
    isReadyNow: true,
  },
  {
    id: "student-2",
    name: "يوسف عمر",
    avatarLetter: "ي",
    avatarBg: "bg-[#0b6b88]",
    grade: "الصف الثاني الثانوي",
    matchRate: 91,
    sameSubject: true,
    sameGoal: true,
    sameTime: true,
    audioPreference: "مايك فقط",
    audioIcon: "mic",
    availability: "جاهز لبدء الجلسة الآن",
    isReadyNow: true,
  },
  {
    id: "student-3",
    name: "ندى أحمد",
    avatarLetter: "ن",
    avatarBg: "bg-[#713f12]",
    grade: "الصف الثاني الثانوي",
    matchRate: 84,
    sameSubject: true,
    sameGoal: false,
    silentStudy: true,
    audioPreference: "شات فقط",
    audioIcon: "chat",
    availability: "متاحة خلال 5 دقائق",
    isReadyNow: false,
  },
  {
    id: "student-4",
    name: "أحمد محمود",
    avatarLetter: "أ",
    avatarBg: "bg-[#0e5c68]",
    grade: "الصف الثاني الثانوي",
    matchRate: 88,
    sameSubject: true,
    sameGoal: true,
    audioPreference: "مايك فقط",
    audioIcon: "mic",
    availability: "جاهز لبدء الجلسة الآن",
    isReadyNow: true,
  },
  {
    id: "student-5",
    name: "سارة علي",
    avatarLetter: "س",
    avatarBg: "bg-[#103b3e]",
    grade: "الصف الثاني الثانوي",
    matchRate: 86,
    sameSubject: true,
    sameGoal: true,
    audioPreference: "مايك فقط",
    audioIcon: "mic",
    availability: "جاهزة لبدء الجلسة الآن",
    isReadyNow: true,
  },
];
