import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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

  const albums = [
    ...new Set(assets.map((a) => a.album).filter(Boolean)),
  ] as string[];

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Moments that matter"
        description="Snapshots from classrooms, mentorship circles, and community gatherings — proof of what happens when girls are seen and supported."
      />

      <section className="section-padding bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {albums.length > 0 && (
            <Reveal className="mb-10 flex flex-wrap justify-center gap-2">
              <span className="rounded-full border border-rose-pale bg-cream px-4 py-1.5 text-sm font-semibold text-rose">
                All
              </span>
              {albums.map((album) => (
                <span
                  key={album}
                  className="rounded-full border border-rose-pale bg-cream px-4 py-1.5 text-sm text-muted transition-colors hover:border-rose hover:text-rose"
                >
                  {album}
                </span>
              ))}
            </Reveal>
          )}

          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {assets.map((asset, i) => (
              <Reveal key={asset.id} delay={(i % 6) * 0.05}>
                <figure className="mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-plum/5 shadow-brand">
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
                    <figcaption className="bg-cream px-3 py-2 text-xs font-medium text-muted">
                      {asset.album}
                    </figcaption>
                  )}
                </figure>
              </Reveal>
            ))}
          </div>

          {assets.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-muted">
                Gallery images will appear here soon.
              </p>
              <p className="mt-2 text-sm text-muted">
                Check back after our upcoming events!
              </p>
            </div>
          )}

          <Reveal className="mt-16 text-center">
            <p className="text-sm text-muted">
              Want to share photos from our events?{" "}
              <Link href="/contact" className="font-semibold text-rose hover:text-plum transition-colors">
                Send them our way →
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
