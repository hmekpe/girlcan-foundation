import Link from "next/link";
import { format } from "date-fns";
import { Plus, Sparkles } from "lucide-react";
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

export default async function StoriesPage() {
  const stories = await prisma.story.findMany({
    orderBy: { updatedAt: "desc" },
    include: { author: { select: { name: true } } },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-900">Stories</h1>
          <p className="text-sm text-ink-500">Manage blog posts and impact stories.</p>
        </div>
        <Button asChild>
          <Link href="/admin/stories/new">
            <Plus className="h-4 w-4" />
            New story
          </Link>
        </Button>
      </div>

      {stories.length === 0 ? (
        <EmptyState
          icon={Sparkles}
          title="No stories yet"
          description="Share impact stories and updates with your community."
          action={
            <Button asChild>
              <Link href="/admin/stories/new">Write a story</Link>
            </Button>
          }
        />
      ) : (
        <div className="rounded-2xl border border-cream-300 bg-cream-50">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {stories.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.title}</TableCell>
                  <TableCell className="text-ink-500">{s.category}</TableCell>
                  <TableCell>
                    <Badge variant={s.published ? "success" : "outline"}>
                      {s.published ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-ink-500">
                    {format(s.updatedAt, "MMM d, yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/admin/stories/${s.id}`} className="text-sm text-rose-500 hover:text-rose-600">
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
