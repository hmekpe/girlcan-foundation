import Link from "next/link";
import { createEvent } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewEventPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900">New event</h1>
        <p className="text-sm text-ink-500">Schedule a new foundation event.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Event details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createEvent} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug (optional)</Label>
              <Input id="slug" name="slug" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" rows={4} required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startAt">Start</Label>
                <Input id="startAt" name="startAt" type="datetime-local" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endAt">End (optional)</Label>
                <Input id="endAt" name="endAt" type="datetime-local" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input id="capacity" name="capacity" type="number" min={1} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover image URL</Label>
                <Input id="coverImage" name="coverImage" type="url" />
              </div>
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="registrationOpen" defaultChecked className="rounded" />
                Registration open
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="published" defaultChecked className="rounded" />
                Published
              </label>
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit">Create event</Button>
              <Button variant="outline" asChild>
                <Link href="/admin/events">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
