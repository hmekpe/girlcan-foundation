"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Role } from "@prisma/client";

type AdminTopbarProps = {
  name?: string | null;
  email?: string | null;
  role: Role;
};

const roleLabels: Record<Role, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  EDITOR: "Editor",
};

export function AdminTopbar({ name, email, role }: AdminTopbarProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-cream-300 bg-cream-50 px-6">
      <div>
        <p className="text-sm font-medium text-ink-900">
          {name || "Administrator"}
        </p>
        <p className="text-xs text-ink-500">{email}</p>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="cream">{roleLabels[role]}</Badge>
        <Button
          variant="outline"
          size="sm"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    </header>
  );
}
