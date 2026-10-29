"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  { title: "القنوات", url: "/channels", icon: Radio },
  { title: "الرومز", url: "/rooms", icon: UsersRound },
  { title: "حسابي", url: "/profile", icon: UserRound },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      side="right"
      collapsible="icon"
      dir="rtl"
      className="border-l border-border"
    >
      <SidebarHeader className="p-5">
        <Link href="/home" className="flex items-center gap-3">
          <Image
            src={SawaLogo}
            alt="Sawa Logo"
            width={100}
            height={100}
            className="size-20 object-cover"
          />

          <div >
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
            <Link href="/settings" className="block">
              <SidebarMenuButton tooltip="الإعدادات" className="text-[#667584] hover:bg-gray-200 h-12 cursor-pointer rounded-full transition-all duration-300">
                <Settings className="size-5" />
                <span className="font-semibold">الإعدادات</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton 
              tooltip="تسجيل الخروج"
              className="text-rose-600 hover:bg-rose-50 hover:text-rose-700 h-12 cursor-pointer rounded-full transition-all duration-300"
              onClick={() => {
                // اربط هنا وظيفة تسجيل الخروج الموجودة في مشروعك.
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
