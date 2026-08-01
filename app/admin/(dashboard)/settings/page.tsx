import { prisma } from "@/lib/prisma";
import { SettingsClient } from "./settings-client";

export default async function SettingsPage() {
  const settingsRecords = await prisma.siteSetting.findMany();
  
  const settings = settingsRecords.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-text">Site Settings</h1>
        <p className="mt-1 text-sm text-muted">Manage all aspects of your website&apos;s content and configuration.</p>
      </div>

      <SettingsClient settings={settings} />
    </div>
  );
}
