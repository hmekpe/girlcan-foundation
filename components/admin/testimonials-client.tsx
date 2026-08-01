"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import {
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/admin/empty-state";
import { MediaPicker } from "@/components/admin/media-picker";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  photo: string | null;
  programId: string | null;
  featured: boolean;
};

type Program = { id: string; title: string };

export function TestimonialsClient({
  testimonials,
  programs,
}: {
  testimonials: Testimonial[];
  programs: Program[];
}) {
  const [editing, setEditing] = useState<Testimonial | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-text">Testimonials</h1>
        <p className="text-sm text-muted">Manage quotes from beneficiaries and partners.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{editing ? "Edit testimonial" : "Add testimonial"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action={async (fd) => {
              if (editing) {
                await updateTestimonial(editing.id, fd);
                setEditing(null);
              } else {
                await createTestimonial(fd);
              }
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="quote">Quote</Label>
              <Textarea id="quote" name="quote" rows={3} defaultValue={editing?.quote} required key={editing?.id || "q"} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" defaultValue={editing?.name} required key={editing?.id || "n"} />
              </div>
              <div className="space-y-2">
                <MediaPicker name="photo" label="Photo URL" value={editing?.photo || ""} key={editing?.id || "new-photo"} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="programId">Program (optional)</Label>
              <select
                id="programId"
                name="programId"
                defaultValue={editing?.programId || ""}
                className="flex h-11 w-full rounded-2xl border border-cream-300 bg-cream-50 px-4 text-sm"
                key={editing?.id || "prog"}
              >
                <option value="">None</option>
                {programs.map((p) => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="featured" defaultChecked={editing?.featured} className="rounded" />
              Featured
            </label>
            <div className="flex gap-3">
              <Button type="submit">{editing ? "Save" : "Add"}</Button>
              {editing ? (
                <Button type="button" variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
              ) : null}
            </div>
          </form>
        </CardContent>
      </Card>

      {testimonials.length === 0 ? (
        <EmptyState icon={Heart} title="No testimonials" description="Add your first testimonial above." />
      ) : (
        <div className="rounded-2xl border border-rose/20 bg-plum/5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Quote</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium text-text">{t.name}</TableCell>
                  <TableCell className="max-w-md truncate text-muted">{t.quote}</TableCell>
                  <TableCell>
                    {t.featured ? <Badge variant="gold">Featured</Badge> : <Badge variant="outline">—</Badge>}
                  </TableCell>
                  <TableCell className="space-x-2 text-right">
                    <button type="button" onClick={() => setEditing(t)} className="text-sm text-rose hover:text-rose-dark">Edit</button>
                    <form action={deleteTestimonial.bind(null, t.id)} className="inline">
                      <button type="submit" className="text-sm text-state-error">Delete</button>
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
