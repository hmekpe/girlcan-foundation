import { redirect } from "next/navigation";
import { format } from "date-fns";
import { Users } from "lucide-react";
import { Role } from "@prisma/client";
import { getServerSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { inviteUser, deactivateUser } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/admin/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function UsersPage() {
  const session = await getServerSession();
  if (session?.user.role !== Role.SUPER_ADMIN) {
    redirect("/admin");
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900">Users</h1>
        <p className="text-sm text-ink-500">Invite and manage admin users. Super Admin only.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invite user</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={inviteUser} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Temporary password</Label>
              <Input id="password" name="password" type="password" required minLength={8} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <select id="role" name="role" defaultValue="EDITOR" className="flex h-11 w-full rounded-2xl border border-cream-300 bg-cream-50 px-4 text-sm">
                <option value="EDITOR">Editor</option>
                <option value="ADMIN">Admin</option>
                <option value="SUPER_ADMIN">Super Admin</option>
              </select>
            </div>
            <div className="sm:col-span-2 lg:col-span-4">
              <Button type="submit">Send invite</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {users.length === 0 ? (
        <EmptyState icon={Users} title="No users" description="Invite your first team member above." />
      ) : (
        <div className="rounded-2xl border border-cream-300 bg-cream-50">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <Badge variant="cream">{u.role.replace("_", " ")}</Badge>
                  </TableCell>
                  <TableCell className="text-ink-500">
                    {format(u.createdAt, "MMM d, yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    {u.id !== session.user.id ? (
                      <form action={deactivateUser.bind(null, u.id)}>
                        <Button type="submit" variant="ghost" size="sm" className="text-state-error">
                          Deactivate
                        </Button>
                      </form>
                    ) : (
                      <span className="text-xs text-ink-500">You</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
