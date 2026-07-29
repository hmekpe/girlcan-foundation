import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Moments from The Girl Can Foundation — workshops, mentorship, community, and celebration.",
};

export default async function GalleryPage() {
  const assets = await prisma.mediaAsset.findMany({
    orderBy: { uploadedAt: "desc" },
  });

  const albums = [...new Set(assets.map((a) => a.album).filter(Boolean))] as string[];

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Moments that matter"
        description="Snapshots from classrooms, mentorship circles, and community gatherings — proof of what happens when girls are seen and supported."
      />

      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {albums.length > 0 && (
            <Reveal className="mb-10 flex flex-wrap justify-center gap-2">
              {albums.map((album) => (
                <span
                  key={album}
                  className="rounded-full border border-cream-300 bg-cream-50 px-4 py-1.5 text-sm text-ink-600"
                >
                  {album}
                </span>
              ))}
            </Reveal>
          )}

          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {assets.map((asset, i) => (
              <Reveal key={asset.id} delay={(i % 6) * 0.05}>
                <figure className="mb-4 break-inside-avoid overflow-hidden rounded-2xl">
                  <div className="relative">
                    <Image
                      src={asset.url}
                      alt={asset.altText}
                      width={900}
                      height={700}
                      className="h-auto w-full object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  {asset.album && (
                    <figcaption className="bg-cream-100 px-3 py-2 text-xs text-ink-500">
                      {asset.album}
                    </figcaption>
                  )}
                </figure>
              </Reveal>
            ))}
          </div>

          {assets.length === 0 && (
            <p className="text-center text-ink-600">
              Gallery images will appear here soon.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
