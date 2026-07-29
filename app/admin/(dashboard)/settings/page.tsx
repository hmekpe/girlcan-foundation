import { prisma } from "@/lib/prisma";
import { updateSiteSettings } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function SettingsPage() {
  const settings = await prisma.siteSetting.findMany({ orderBy: { key: "asc" } });

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900">Settings</h1>
        <p className="text-sm text-ink-500">Edit site-wide key/value settings.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Site settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updateSiteSettings} className="space-y-4">
            {settings.map((s) => (
              <div key={s.key} className="space-y-2">
                <input type="hidden" name="keys" value={s.key} />
                <Label htmlFor={s.key}>{s.key.replace(/_/g, " ")}</Label>
                {s.value.length > 120 ? (
                  <Textarea id={s.key} name={s.key} rows={3} defaultValue={s.value} />
                ) : (
                  <Input id={s.key} name={s.key} defaultValue={s.value} />
                )}
              </div>
            ))}
            <Button type="submit">Save settings</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
