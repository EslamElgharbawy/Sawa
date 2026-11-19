"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Sparkles,
  Radio,
  UsersRound,
  UserRound,
  Settings,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Image from "next/image";
import SawaLogo from "@/src/assets/images/sawa-logo 1.svg";

const mainLinks = [
  { title: "الرئيسية", url: "/", icon: Home },
  { title: "يلا نذاكر", url: "/study", icon: Sparkles },
  // { title: "القنوات", url: "/channels", icon: Radio },
  // { title: "الجلسات", url: "/rooms", icon: UsersRound },
  // { title: "حسابي", url: "/profile", icon: UserRound },
  { title: "الجلسات", url: "/rooms", icon: UsersRound, comingSoon: true },
  { title: "حسابي", url: "/profile", icon: UserRound, comingSoon: true },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Sidebar
      side="right"
      collapsible="icon"
      dir="rtl"
      className="border-l border-border"
    >
      <SidebarHeader className="p-5">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={SawaLogo}
            alt="Sawa Logo"
            width={100}
            height={100}
            className="size-20 object-cover"
          />

          <div>
            <h2 className="text-xl font-black text-slate-900">سوا</h2>
            <p className="text-xs font-semibold text-slate-400">
              Study Better . Together
            </p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 pt-5">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainLinks.map((item) => {
                const isActive = pathname === item.url;
                if (item.comingSoon) {
                  return (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton
                        className="h-12 w-full rounded-full px-4 gap-3 text-slate-400 border-r-4 border-transparent cursor-not-allowed opacity-70 hover:bg-transparent hover:text-slate-400!"
                      >
                        <item.icon className="size-5! shrink-0 text-slate-400" />
                        <span className="font-semibold">{item.title}</span>
                        <span className="ms-auto rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500 border border-slate-200">
                          قريباً
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }
                return (
                  <SidebarMenuItem key={item.url}>
                    <Link href={item.url} className="block">
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={item.title}
                        className={`h-12 rounded-full px-4 gap-3 transition-all duration-300 cursor-pointer ${
                          isActive
                            ? "bg-sky-100! text-[#0e3236] border-r-4 border-amber-400"
                            : "text-[#667584] border-r-4 border-transparent hover:bg-gray-200"
                        }`}
                      >
                        <item.icon
                          className={`size-5! shrink-0 ${isActive ? "text-secondary" : ""}`}
                        />
                        <span className="font-semibold">{item.title}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <SidebarSeparator className="mb-3" />

        <SidebarMenu>
          <SidebarMenuItem>
            {/* <Link href="/settings" className="block">
              <SidebarMenuButton
                tooltip="الإعدادات"
                className="text-[#667584] hover:bg-gray-200 h-12 cursor-pointer rounded-full transition-all duration-300"
              >
                <Settings className="size-5" />
                <span className="font-semibold">الإعدادات</span>
              </SidebarMenuButton>
            </Link> */}
            <SidebarMenuButton
              className="text-slate-400 h-12 w-full cursor-not-allowed rounded-full px-4 gap-3 opacity-70 hover:bg-transparent hover:text-slate-400!"
            >
              <Settings className="size-5! shrink-0 text-slate-400" />
              <span className="font-semibold">الإعدادات</span>
              <span className="ms-auto rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500 border border-slate-200">
                قريباً
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="تسجيل الخروج"
              className="text-rose-600 hover:bg-rose-50 hover:text-rose-700 h-12 cursor-pointer rounded-full transition-all duration-300"
              onClick={() => {
                router.push("/login");
              }}
            >
              <LogOut className="size-5" />
              <span className="font-semibold">تسجيل الخروج</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
