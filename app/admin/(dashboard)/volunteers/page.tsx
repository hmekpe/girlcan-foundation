import { Users } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { updateVolunteerStatus } from "@/app/actions/admin";
import { PipelineTable } from "@/components/admin/pipeline-table";

export default async function VolunteersPage() {
  const volunteers = await prisma.volunteerApplication.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900">Volunteers</h1>
        <p className="text-sm text-ink-500">Review and manage volunteer applications.</p>
      </div>

      <PipelineTable
        rows={volunteers.map((v) => ({
          id: v.id,
          name: v.name,
          email: v.email,
          status: v.status,
          createdAt: v.createdAt.toISOString(),
          subtitle: v.phone || undefined,
        }))}
        exportPath="/api/export/volunteers"
        emptyIcon={Users}
        emptyTitle="No volunteer applications"
        onStatusChange={updateVolunteerStatus}
      />
    </div>
  );
}
