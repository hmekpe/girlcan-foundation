import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateProgram, deleteProgram } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function EditProgramPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const program = await prisma.program.findUnique({ where: { id } });
  if (!program) notFound();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-900">Edit program</h1>
          <p className="text-sm text-ink-500">{program.title}</p>
        </div>
        <form action={deleteProgram.bind(null, id)}>
          <Button type="submit" variant="outline" className="text-state-error">
            Delete
          </Button>
        </form>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Program details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updateProgram.bind(null, id)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={program.title} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" defaultValue={program.slug} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea id="summary" name="summary" rows={2} defaultValue={program.summary} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" rows={5} defaultValue={program.description} required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="icon">Icon</Label>
                <Input id="icon" name="icon" defaultValue={program.icon} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">Order</Label>
                <Input id="order" name="order" type="number" defaultValue={program.order} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover image URL</Label>
              <Input id="coverImage" name="coverImage" type="url" defaultValue={program.coverImage || ""} />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="published" defaultChecked={program.published} className="rounded" />
              Published
            </label>
            <div className="flex gap-3 pt-2">
              <Button type="submit">Save changes</Button>
              <Button variant="outline" asChild>
                <Link href="/admin/programs">Back</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
