import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateStory, deleteStory } from "@/app/actions/admin";
import { RichEditor } from "@/components/admin/rich-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MediaPicker } from "@/components/admin/media-picker";

export default async function EditStoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const story = await prisma.story.findUnique({ where: { id } });
  if (!story) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-900">Edit story</h1>
          <p className="text-sm text-ink-500">{story.title}</p>
        </div>
        <form action={deleteStory.bind(null, id)}>
          <Button type="submit" variant="outline" className="text-state-error">
            Delete
          </Button>
        </form>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Story details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updateStory.bind(null, id)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={story.title} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" defaultValue={story.slug} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea id="excerpt" name="excerpt" rows={2} defaultValue={story.excerpt} required />
            </div>
            <div className="space-y-2">
              <Label>Content</Label>
              <RichEditor name="contentRich" defaultValue={story.contentRich} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" defaultValue={story.category} />
              </div>
              <div className="space-y-2">
                <MediaPicker name="coverImage" label="Cover image URL" value={story.coverImage || ""} />
              </div>
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="published" defaultChecked={story.published} className="rounded" />
                Published
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="featured" defaultChecked={story.featured} className="rounded" />
                Featured
              </label>
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit">Save changes</Button>
              <Button variant="outline" asChild>
                <Link href="/admin/stories">Back</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
