import { prisma } from "@/lib/prisma";
import { TeamAdminClient } from "@/components/admin/team-client";

export default async function TeamPage() {
  const members = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });

  return (
    <TeamAdminClient
      members={members.map((m) => ({
        ...m,
        socialLinks: m.socialLinks as { linkedin?: string; twitter?: string } | null,
      }))}
    />
  );
}
