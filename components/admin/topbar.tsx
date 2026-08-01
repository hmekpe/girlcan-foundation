"use client";

import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LogOut, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Role } from "@prisma/client";

type AdminTopbarProps = {
  name?: string | null;
  email?: string | null;
  role: Role;
  title?: string;
};

export function AdminTopbar({ name, title }: AdminTopbarProps) {
  const pathname = usePathname();
  const hour = new Date().getHours();
  let greeting = "Good evening";
  if (hour < 12) greeting = "Good morning";
  else if (hour < 18) greeting = "Good afternoon";

  const paths = pathname.split('/').filter(Boolean);
  const breadcrumbs = paths.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(" / ");

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b-2 border-b-rose/10 bg-white/80 pl-14 pr-6 backdrop-blur-xl transition-all duration-200 lg:px-6">
      <div className="flex items-center gap-4">
        <div>
          <p className="text-xs font-medium text-rose mb-0.5">{greeting}{name ? `, ${name.split(" ")[0]}` : ""}</p>
          {title ? (
            <h2 className="font-display text-xl font-semibold tracking-tight text-text">
              {title}
            </h2>
          ) : (
            <h2 className="font-display text-xl font-semibold tracking-tight text-text">
              {breadcrumbs || "Dashboard"}
            </h2>
          )}
        </div>
      </div>
      <div className="flex items-center gap-5">
        <button className="relative text-muted hover:text-text transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute right-0.5 top-0.5 block h-2 w-2 rounded-full bg-rose ring-2 ring-white animate-pulse" />
        </button>
        <div className="h-6 w-px bg-rose-pale/30" />
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="border-rose/20 text-muted hover:bg-gradient-to-r hover:from-rose/10 hover:to-transparent hover:text-text hover:border-rose/40 transition-all duration-300 shadow-sm"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </div>
    </header>
  );
}
