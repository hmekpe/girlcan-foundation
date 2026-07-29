import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Download } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { updateEvent, deleteEvent } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function toLocalDatetime(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      registrations: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!event) notFound();

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-900">Edit event</h1>
          <p className="text-sm text-ink-500">{event.title}</p>
        </div>
        <form action={deleteEvent.bind(null, id)}>
          <Button type="submit" variant="outline" className="text-state-error">
            Delete
          </Button>
        </form>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Event details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updateEvent.bind(null, id)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={event.title} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" defaultValue={event.slug} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" rows={4} defaultValue={event.description} required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startAt">Start</Label>
                <Input id="startAt" name="startAt" type="datetime-local" defaultValue={toLocalDatetime(event.startAt)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endAt">End</Label>
                <Input id="endAt" name="endAt" type="datetime-local" defaultValue={event.endAt ? toLocalDatetime(event.endAt) : ""} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" defaultValue={event.location} required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input id="capacity" name="capacity" type="number" defaultValue={event.capacity ?? ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover image URL</Label>
                <Input id="coverImage" name="coverImage" type="url" defaultValue={event.coverImage || ""} />
              </div>
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="registrationOpen" defaultChecked={event.registrationOpen} className="rounded" />
                Registration open
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="published" defaultChecked={event.published} className="rounded" />
                Published
              </label>
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit">Save changes</Button>
              <Button variant="outline" asChild>
                <Link href="/admin/events">Back</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Registrations ({event.registrations.length})</CardTitle>
          <Button variant="outline" size="sm" asChild>
            <a href={`/api/export/event-registrations?eventId=${event.id}`} download>
              <Download className="h-4 w-4" />
              Export CSV
            </a>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {event.registrations.length === 0 ? (
            <p className="p-6 text-sm text-ink-500">No registrations yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Registered</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {event.registrations.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell>{r.email}</TableCell>
                    <TableCell className="text-ink-500">{r.phone || "—"}</TableCell>
                    <TableCell className="text-ink-500">
                      {format(r.createdAt, "MMM d, yyyy HH:mm")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
