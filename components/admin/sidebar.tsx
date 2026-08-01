"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Calendar,
  CreditCard,
  Heart,
  Image as ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Newspaper,
  Settings,
  Sparkles,
  Users,
  UsersRound,
  Handshake,
  BookOpen,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Role } from "@prisma/client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  exact?: boolean;
  superAdminOnly?: boolean;
};

type NavGroup = {
  label: string;
  items: NavItem[];
};

const navGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
      { href: "/admin/activity", label: "Activity", icon: Activity },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/programs", label: "Programs", icon: BookOpen },
      { href: "/admin/stories", label: "Stories", icon: Sparkles },
      { href: "/admin/events", label: "Events", icon: Calendar },
      { href: "/admin/testimonials", label: "Testimonials", icon: Heart },
      { href: "/admin/media", label: "Media", icon: ImageIcon },
    ],
  },
  {
    label: "People",
    items: [
      { href: "/admin/volunteers", label: "Volunteers", icon: Users },
      { href: "/admin/team", label: "Team", icon: UsersRound },
      { href: "/admin/partners", label: "Partners", icon: Handshake },
      { href: "/admin/messages", label: "Messages", icon: MessageSquare },
      { href: "/admin/newsletter", label: "Newsletter", icon: Newspaper },
      { href: "/admin/users", label: "Users", icon: Users, superAdminOnly: true },
    ],
  },
  {
    label: "Finance",
    items: [
      { href: "/admin/donations", label: "Donations", icon: CreditCard },
    ],
  },
  {
    label: "Settings",
    items: [
      { href: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

type AdminSidebarProps = {
  role: Role;
  name?: string | null;
  email?: string | null;
};

function SidebarContent({
  role,
  name,
  pathname,
  onClose,
}: {
  role: Role;
  name?: string | null;
  pathname: string;
  onClose?: () => void;
}) {
  const userInitials = name
    ? name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()
    : "A";

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-deep via-deep to-plum/30 text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose text-white shadow-[0_0_15px_rgba(232,69,90,0.5)] animate-pulse">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
          </div>
          <span className="font-display text-lg font-semibold tracking-tight text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
            Girl Can
          </span>
        </div>
        {/* Close button — only visible on mobile */}
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-1.5 text-white/60 hover:bg-white/10 hover:text-white transition-colors lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-8 overflow-y-auto px-4 py-2 pb-6 scrollbar-hide" aria-label="Admin navigation">
        {navGroups.map((group) => {
          const visibleItems = group.items.filter(
            (item) => !item.superAdminOnly || role === "SUPER_ADMIN"
          );

          if (visibleItems.length === 0) return null;

          return (
            <div key={group.label} className="space-y-1">
              <h4 className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-widest text-white/30">
                {group.label}
              </h4>
              <ul className="space-y-0.5">
                {visibleItems.map((item) => {
                  const active = item.exact
                    ? pathname === item.href
                    : pathname.startsWith(item.href);
                  const Icon = item.icon;

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300 relative overflow-hidden",
                          active
                            ? "bg-rose/15 text-rose shadow-[inset_0_0_20px_rgba(232,69,90,0.1)] before:absolute before:left-0 before:top-0 before:h-full before:w-[3px] before:bg-gradient-to-b before:from-rose before:to-rose/30"
                            : "border-l-[3px] border-transparent text-white/60 hover:bg-white/5 hover:text-white hover:shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]"
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-[18px] w-[18px] shrink-0",
                            active ? "text-rose" : "text-white/40 group-hover:text-white/80"
                          )}
                        />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3 hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-white/10">
          <Avatar className="h-9 w-9 border border-white/20 bg-deep text-white">
            <AvatarFallback className="bg-transparent text-xs">{userInitials}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-1 flex-col">
            <p className="truncate text-sm font-medium text-white">{name || "Administrator"}</p>
            <p className="truncate text-xs text-white/50">{role}</p>
          </div>
        </div>
        <div className="mt-4 px-2">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center text-xs text-white/40 transition-colors hover:text-rose"
          >
            ← View public site
          </Link>
        </div>
      </div>
    </div>
  );
}

export function AdminSidebar({ role, name }: AdminSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger trigger — shown only on small screens */}
      <button
        onClick={() => setMobileOpen(true)}
        aria-label="Open admin menu"
        className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-xl bg-deep text-white shadow-lg lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile drawer backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[280px] transform transition-transform duration-300 ease-in-out lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Admin sidebar mobile"
      >
        <SidebarContent
          role={role}
          name={name}
          pathname={pathname}
          onClose={() => setMobileOpen(false)}
        />
      </aside>

      {/* Desktop sidebar — always visible on large screens */}
      <aside
        className="hidden h-screen w-[260px] shrink-0 sticky top-0 lg:flex lg:flex-col"
        aria-label="Admin sidebar"
      >
        <SidebarContent role={role} name={name} pathname={pathname} />
      </aside>
    </>
  );
}
