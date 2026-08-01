import { format } from "date-fns";
import { ImageIcon, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { deleteMediaAsset } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/admin/empty-state";
import { MediaUploadForm } from "@/components/admin/media-upload-form";

export default async function MediaPage() {
  const assets = await prisma.mediaAsset.findMany({
    orderBy: { uploadedAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-text">Media</h1>
        <p className="text-sm text-muted">Upload and manage media assets. Alt text is required.</p>
      </div>

      <MediaUploadForm />

      {assets.length === 0 ? (
        <EmptyState
          icon={ImageIcon}
          title="No media assets"
          description="Upload images with descriptive alt text for accessibility."
        />
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {assets.map((a) => (
            <div key={a.id} className="break-inside-avoid relative group rounded-2xl overflow-hidden border border-rose/20 bg-plum/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a.url} alt={a.altText} className="w-full object-cover" />
              <div className="p-4 bg-white/95 backdrop-blur-sm border-t border-rose/10">
                <p className="text-sm font-medium text-text break-words">{a.altText}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted">
                    {a.album ? (
                      <span className="bg-rose-pale text-rose px-2 py-0.5 rounded-full mr-2">{a.album}</span>
                    ) : null}
                    {format(a.uploadedAt, "MMM d, yyyy")}
                  </span>
                </div>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <form action={deleteMediaAsset.bind(null, a.id)}>
                  <Button type="submit" variant="destructive" size="sm" className="h-8 w-8 p-0 rounded-full bg-rose hover:bg-rose-dark shadow-md">
                    <Trash2 className="w-4 h-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
