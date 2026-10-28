import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/src/components/AppSidebar/AppSidebar";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div dir="rtl" className="flex min-h-screen w-full">
        <AppSidebar />

        <SidebarInset className="min-w-0 bg-slate-50">
          <header className="flex h-20 items-center justify-between border-b border-slate-100 bg-white/80 px-6 backdrop-blur">
            <div className="flex items-center gap-3">
              <p className="text-sm text-slate-500">
                أهلاً بيك في{" "}
                <span className="font-bold text-teal-950">سوا</span>، مكانك
                عشان تذاكر مع ناس تناسبك.
              </p>
            </div>
          </header>

          <main className="w-full p-4 sm:p-6 lg:p-8">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
