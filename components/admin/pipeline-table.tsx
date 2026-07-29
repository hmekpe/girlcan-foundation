"use client";

import { ApplicationStatus } from "@prisma/client";
import { format } from "date-fns";
import { Download, LucideIcon } from "lucide-react";
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

type Row = {
  id: string;
  name: string;
  email: string;
  status: ApplicationStatus;
  createdAt: string;
  subtitle?: string;
};

const statuses: ApplicationStatus[] = ["NEW", "CONTACTED", "APPROVED", "DECLINED"];

const statusVariant: Record<ApplicationStatus, "default" | "gold" | "success" | "outline"> = {
  NEW: "default",
  CONTACTED: "gold",
  APPROVED: "success",
  DECLINED: "outline",
};

export function PipelineTable({
  rows,
  exportPath,
  emptyIcon: EmptyIcon,
  emptyTitle,
  onStatusChange,
}: {
  rows: Row[];
  exportPath: string;
  emptyIcon: LucideIcon;
  emptyTitle: string;
  onStatusChange: (id: string, status: ApplicationStatus) => Promise<void>;
}) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="outline" size="sm" asChild>
          <a href={exportPath} download>
            <Download className="h-4 w-4" />
            Export CSV
          </a>
        </Button>
      </div>

      {rows.length === 0 ? (
        <EmptyState icon={EmptyIcon} title={emptyTitle} description="New applications will appear here." />
      ) : (
        <div className="rounded-2xl border border-cream-300 bg-cream-50">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Update</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>
                    <p className="font-medium">{r.name}</p>
                    {r.subtitle ? <p className="text-xs text-ink-500">{r.subtitle}</p> : null}
                  </TableCell>
                  <TableCell>{r.email}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[r.status]}>{r.status}</Badge>
                  </TableCell>
                  <TableCell className="text-ink-500">
                    {format(new Date(r.createdAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <select
                      defaultValue={r.status}
                      onChange={async (e) => {
                        await onStatusChange(r.id, e.target.value as ApplicationStatus);
                      }}
                      className="rounded-xl border border-cream-300 bg-cream-50 px-2 py-1 text-xs"
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
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
