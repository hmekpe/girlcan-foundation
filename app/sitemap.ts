import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url;
  const staticRoutes = [
    "",
    "/about",
    "/programs",
    "/stories",
    "/events",
    "/get-involved",
    "/donate",
    "/gallery",
    "/impact",
    "/contact",
    "/faq",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  try {
    const [programs, stories, events] = await Promise.all([
      prisma.program.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
      prisma.story.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
      prisma.event.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
    ]);

    return [
      ...staticRoutes,
      ...programs.map((p) => ({
        url: `${base}/programs/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })),
      ...stories.map((s) => ({
        url: `${base}/stories/${s.slug}`,
        lastModified: s.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })),
      ...events.map((e) => ({
        url: `${base}/events/${e.slug}`,
        lastModified: e.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })),
    ];
  } catch {
    return staticRoutes;
  }
}
