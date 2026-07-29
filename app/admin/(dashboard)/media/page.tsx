import { format } from "date-fns";
import { ImageIcon } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { uploadMediaAsset, deleteMediaAsset } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/admin/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function MediaPage() {
  const assets = await prisma.mediaAsset.findMany({
    orderBy: { uploadedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900">Media</h1>
        <p className="text-sm text-ink-500">Upload and manage media assets. Alt text is required.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload asset</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={uploadMediaAsset} className="space-y-4" encType="multipart/form-data">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="file">Image file</Label>
                <Input id="file" name="file" type="file" accept="image/*" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">Or image URL</Label>
                <Input id="url" name="url" type="url" placeholder="https://..." />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="altText">Alt text *</Label>
                <Input id="altText" name="altText" required placeholder="Describe the image for accessibility" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="album">Album</Label>
                <Input id="album" name="album" placeholder="Programs, Events, etc." />
              </div>
            </div>
            <Button type="submit">Upload</Button>
          </form>
        </CardContent>
      </Card>

      {assets.length === 0 ? (
        <EmptyState
          icon={ImageIcon}
          title="No media assets"
          description="Upload images with descriptive alt text for accessibility."
        />
      ) : (
        <div className="rounded-2xl border border-cream-300 bg-cream-50">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Preview</TableHead>
                <TableHead>Alt text</TableHead>
                <TableHead>Album</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.url} alt={a.altText} className="h-12 w-16 rounded-lg object-cover" />
                  </TableCell>
                  <TableCell className="max-w-xs">{a.altText}</TableCell>
                  <TableCell className="text-ink-500">{a.album || "—"}</TableCell>
                  <TableCell className="text-ink-500">
                    {format(a.uploadedAt, "MMM d, yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    <form action={deleteMediaAsset.bind(null, a.id)}>
                      <Button type="submit" variant="ghost" size="sm" className="text-state-error">
                        Delete
                      </Button>
                    </form>
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
