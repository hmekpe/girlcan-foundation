import { format } from "date-fns";
import { Download, Newspaper } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/admin/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function NewsletterPage() {
  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { subscribedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-900">Newsletter</h1>
          <p className="text-sm text-ink-500">{subscribers.filter((s) => s.active).length} active subscribers</p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <a href="/api/export/newsletter" download>
            <Download className="h-4 w-4" />
            Export CSV
          </a>
        </Button>
      </div>

      {subscribers.length === 0 ? (
        <EmptyState icon={Newspaper} title="No subscribers" description="Newsletter sign-ups will appear here." />
      ) : (
        <div className="rounded-2xl border border-cream-300 bg-cream-50">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Subscribed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscribers.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.email}</TableCell>
                  <TableCell>
                    <Badge variant={s.active ? "success" : "outline"}>
                      {s.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-ink-500">
                    {format(s.subscribedAt, "MMM d, yyyy")}
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
