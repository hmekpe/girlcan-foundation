"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Calendar,
  CreditCard,
  Heart,
  Image,
  LayoutDashboard,
  MessageSquare,
  Newspaper,
  Settings,
  Sparkles,
  Users,
  UsersRound,
  Handshake,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Role } from "@prisma/client";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/programs", label: "Programs", icon: BookOpen },
  { href: "/admin/stories", label: "Stories", icon: Sparkles },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/team", label: "Team", icon: UsersRound },
  { href: "/admin/testimonials", label: "Testimonials", icon: Heart },
  { href: "/admin/media", label: "Media", icon: Image },
  { href: "/admin/volunteers", label: "Volunteers", icon: Users },
  { href: "/admin/partners", label: "Partners", icon: Handshake },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/newsletter", label: "Newsletter", icon: Newspaper },
  { href: "/admin/donations", label: "Donations", icon: CreditCard },
  { href: "/admin/users", label: "Users", icon: Users, superAdminOnly: true },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/admin/activity", label: "Activity", icon: Activity },
];

type AdminSidebarProps = {
  role: Role;
};

export function AdminSidebar({ role }: AdminSidebarProps) {
  const pathname = usePathname();

  const items = navItems.filter(
    (item) => !item.superAdminOnly || role === "SUPER_ADMIN"
  );

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-cream-300 bg-cream-50">
      <div className="border-b border-cream-300 px-5 py-5">
        <Link href="/admin" className="block">
          <p className="text-xs font-medium uppercase tracking-wider text-rose-500">
            The Girl Can
          </p>
          <p className="font-display text-lg font-semibold text-ink-900">
            Admin
          </p>
        </Link>
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        {items.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-rose-50 text-rose-600"
                  : "text-ink-600 hover:bg-cream-100 hover:text-ink-900"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-cream-300 p-4">
        <Link
          href="/"
          className="text-xs text-ink-500 transition-colors hover:text-rose-500"
        >
          ← View public site
        </Link>
      </div>
    </aside>
  );
}
