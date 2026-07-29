import Link from "next/link";
import { Plus } from "lucide-react";
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
import { BookOpen } from "lucide-react";

export default async function ProgramsPage() {
  const programs = await prisma.program.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-900">Programs</h1>
          <p className="text-sm text-ink-500">Manage foundation programs and initiatives.</p>
        </div>
        <Button asChild>
          <Link href="/admin/programs/new">
            <Plus className="h-4 w-4" />
            New program
          </Link>
        </Button>
      </div>

      {programs.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No programs yet"
          description="Create your first program to showcase on the site."
          action={
            <Button asChild>
              <Link href="/admin/programs/new">Create program</Link>
            </Button>
          }
        />
      ) : (
        <div className="rounded-2xl border border-cream-300 bg-cream-50">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {programs.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.title}</TableCell>
                  <TableCell className="text-ink-500">{p.slug}</TableCell>
                  <TableCell>{p.order}</TableCell>
                  <TableCell>
                    <Badge variant={p.published ? "success" : "outline"}>
                      {p.published ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      href={`/admin/programs/${p.id}`}
                      className="text-sm text-rose-500 hover:text-rose-600"
                    >
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
