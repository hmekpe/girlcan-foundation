"use client";

import { useState } from "react";
import { UsersRound } from "lucide-react";
import {
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string | null;
  order: number;
  socialLinks: { linkedin?: string; twitter?: string } | null;
};

export function TeamAdminClient({ members }: { members: TeamMember[] }) {
  const [editing, setEditing] = useState<TeamMember | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900">Team</h1>
        <p className="text-sm text-ink-500">Manage team members displayed on the site.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{editing ? "Edit member" : "Add team member"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action={async (fd) => {
              if (editing) {
                await updateTeamMember(editing.id, fd);
                setEditing(null);
              } else {
                await createTeamMember(fd);
              }
            }}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" defaultValue={editing?.name} required key={editing?.id || "new-name"} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" name="role" defaultValue={editing?.role} required key={editing?.id || "new-role"} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" name="bio" rows={3} defaultValue={editing?.bio} required key={editing?.id || "new-bio"} />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="photo">Photo URL</Label>
                <Input id="photo" name="photo" type="url" defaultValue={editing?.photo || ""} key={editing?.id || "new-photo"} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">Order</Label>
                <Input id="order" name="order" type="number" defaultValue={editing?.order ?? 0} key={editing?.id || "new-order"} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input id="linkedin" name="linkedin" defaultValue={editing?.socialLinks?.linkedin || ""} key={editing?.id || "new-li"} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter / X</Label>
              <Input id="twitter" name="twitter" defaultValue={editing?.socialLinks?.twitter || ""} key={editing?.id || "new-tw"} />
            </div>
            <div className="flex gap-3">
              <Button type="submit">{editing ? "Save changes" : "Add member"}</Button>
              {editing ? (
                <Button type="button" variant="outline" onClick={() => setEditing(null)}>
                  Cancel edit
                </Button>
              ) : null}
            </div>
          </form>
        </CardContent>
      </Card>

      {members.length === 0 ? (
        <EmptyState icon={UsersRound} title="No team members" description="Add your first team member above." />
      ) : (
        <div className="rounded-2xl border border-cream-300 bg-cream-50">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Order</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="font-medium">{m.name}</TableCell>
                  <TableCell className="text-ink-500">{m.role}</TableCell>
                  <TableCell>{m.order}</TableCell>
                  <TableCell className="space-x-2 text-right">
                    <button
                      type="button"
                      onClick={() => setEditing(m)}
                      className="text-sm text-rose-500 hover:text-rose-600"
                    >
                      Edit
                    </button>
                    <form action={deleteTeamMember.bind(null, m.id)} className="inline">
                      <button type="submit" className="text-sm text-state-error hover:underline">
                        Delete
                      </button>
                    </form>
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
