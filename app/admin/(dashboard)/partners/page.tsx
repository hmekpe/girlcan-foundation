import { Handshake } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { updatePartnerStatus } from "@/app/actions/admin";
import { PipelineTable } from "@/components/admin/pipeline-table";

export default async function PartnersPage() {
  const partners = await prisma.partnerInquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900">Partners</h1>
        <p className="text-sm text-ink-500">Review partnership inquiries and update their status.</p>
      </div>

      <PipelineTable
        rows={partners.map((p) => ({
          id: p.id,
          name: p.contactName,
          email: p.email,
          status: p.status,
          createdAt: p.createdAt.toISOString(),
          subtitle: p.orgName,
        }))}
        exportPath="/api/export/partners"
        emptyIcon={Handshake}
        emptyTitle="No partner inquiries"
        onStatusChange={updatePartnerStatus}
      />
    </div>
  );
}
