import { prisma } from "@/lib/prisma";

export async function logActivity(opts: {
  userId?: string | null;
  action: string;
  entityType: string;
  entityId?: string | null;
}) {
  try {
    await prisma.activityLog.create({
      data: {
        userId: opts.userId || undefined,
        action: opts.action,
        entityType: opts.entityType,
        entityId: opts.entityId || undefined,
      },
    });
  } catch (error) {
    console.error("[activity-log]", error);
  }
}

export async function getSiteSetting(key: string, fallback = "") {
  const setting = await prisma.siteSetting.findUnique({ where: { key } });
  return setting?.value ?? fallback;
}

export async function getSiteSettings(keys: string[]) {
  const settings = await prisma.siteSetting.findMany({
    where: { key: { in: keys } },
  });
  return Object.fromEntries(settings.map((s) => [s.key, s.value]));
}
