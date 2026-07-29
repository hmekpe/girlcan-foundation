import Link from "next/link";
import { format } from "date-fns";
import { Calendar, Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState } from "@/components/admin/empty-state";

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { startAt: "desc" },
    include: { _count: { select: { registrations: true } } },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-900">Events</h1>
          <p className="text-sm text-ink-500">Manage events and registrations.</p>
        </div>
        <Button asChild>
          <Link href="/admin/events/new">
            <Plus className="h-4 w-4" />
            New event
          </Link>
        </Button>
      </div>

      {events.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No events yet"
          description="Create an event to start accepting registrations."
          action={
            <Button asChild>
              <Link href="/admin/events/new">Create event</Link>
            </Button>
          }
        />
      ) : (
        <div className="rounded-2xl border border-cream-300 bg-cream-50">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Registrations</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="font-medium">{e.title}</TableCell>
                  <TableCell className="text-ink-500">
                    {format(e.startAt, "MMM d, yyyy")}
                  </TableCell>
                  <TableCell className="text-ink-500">{e.location}</TableCell>
                  <TableCell>{e._count.registrations}</TableCell>
                  <TableCell>
                    <Badge variant={e.published ? "success" : "outline"}>
                      {e.published ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/admin/events/${e.id}`} className="text-sm text-rose-500 hover:text-rose-600">
                      Edit
                    </Link>
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
