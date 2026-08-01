import Link from "next/link";
import { createStory } from "@/app/actions/admin";
import { RichEditor } from "@/components/admin/rich-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MediaPicker } from "@/components/admin/media-picker";

export default function NewStoryPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900">New story</h1>
        <p className="text-sm text-ink-500">Write and publish an impact story.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Story details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createStory} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug (optional)</Label>
              <Input id="slug" name="slug" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea id="excerpt" name="excerpt" rows={2} required />
            </div>
            <div className="space-y-2">
              <Label>Content</Label>
              <RichEditor name="contentRich" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" defaultValue="Impact Stories" />
              </div>
              <div className="space-y-2">
                <MediaPicker name="coverImage" label="Cover image URL" />
              </div>
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="published" className="rounded" />
                Published
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="featured" className="rounded" />
                Featured
              </label>
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit">Create story</Button>
              <Button variant="outline" asChild>
                <Link href="/admin/stories">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
