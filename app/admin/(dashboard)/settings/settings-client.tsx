"use client";

import { useTransition } from "react";
import { updateSiteSettings, updateSiteSetting } from "@/app/actions/admin";
import { ImageUploader } from "@/components/admin/image-uploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { DEFAULT_DONATION_TIERS } from "@/lib/constants";

type SettingsClientProps = {
  settings: Record<string, string>;
};

export function SettingsClient({ settings }: SettingsClientProps) {
  const [isPending, startTransition] = useTransition();

  const handleSave = (formData: FormData) => {
    startTransition(async () => {
      try {
        await updateSiteSettings(formData);
        toast.success("Settings saved successfully");
      } catch (_) {
        toast.error("Failed to save settings");
      }
    });
  };

  const getVal = (key: string, def = "") => settings[key] ?? def;

  const tabs = [
    {
      value: "general",
      label: "General",
      title: "General Settings",
      description: "Manage site-wide identity and contact information.",
      fields: [
        { key: "site_name", label: "Site Name", type: "text", def: "The Girl Can Foundation" },
        { key: "contact_email", label: "Contact Email", type: "email", def: "" },
        { key: "contact_phone", label: "Contact Phone", type: "text", def: "" },
        { key: "social_instagram", label: "Instagram URL", type: "url", def: "" },
        { key: "social_facebook", label: "Facebook URL", type: "url", def: "" },
        { key: "social_twitter", label: "Twitter URL", type: "url", def: "" },
        { key: "social_linkedin", label: "LinkedIn URL", type: "url", def: "" },
      ],
    },
    {
      value: "hero",
      label: "Hero Copy",
      title: "Hero Section",
      description: "Customize the copy on the home page hero section.",
      fields: [
        { key: "hero_badge_text", label: "Badge Text", type: "text", def: "" },
        { key: "hero_headline", label: "Headline", type: "textarea", def: "" },
        { key: "hero_tagline", label: "Tagline", type: "textarea", def: "" },
        { key: "hero_card_quote", label: "Card Quote", type: "textarea", def: "" },
        { key: "hero_card_body", label: "Card Body", type: "textarea", def: "" },
      ],
    },
    {
      value: "mission",
      label: "Mission & Vision",
      title: "Mission & Vision",
      description: "Edit the core mission and vision statements.",
      fields: [
        { key: "mission_intro", label: "Mission Intro", type: "textarea", def: "" },
        { key: "mission_title", label: "Mission Title", type: "text", def: "" },
        { key: "mission_text", label: "Mission Text", type: "textarea", def: "" },
        { key: "mission_body", label: "Mission Body", type: "textarea", def: "" },
        { key: "vision_text", label: "Vision Text", type: "textarea", def: "" },
      ],
    },
    {
      value: "stats",
      label: "Stats",
      title: "Impact Stats",
      description: "Update the numbers shown in the impact section.",
      fields: [
        { key: "girls_reached", label: "Girls Reached", type: "number", def: "0" },
        { key: "workshops", label: "Workshops Held", type: "number", def: "0" },
        { key: "mentors", label: "Active Mentors", type: "number", def: "0" },
        { key: "communities", label: "Communities", type: "number", def: "0" },
      ],
    },
    {
      value: "financial",
      label: "Financial Breakdown",
      title: "Financial Allocation",
      description: "Define how donations are allocated (percentages).",
      fields: [
        { key: "program_cost_pct", label: "Program Delivery (%)", type: "number", def: "80" },
        { key: "operations_pct", label: "Operations & Admin (%)", type: "number", def: "20" },
        { key: "reserve_pct", label: "Reserve / Other (%)", type: "number", def: "0" },
      ],
    },
    {
      value: "donations",
      label: "Donation Tiers",
      title: "Donation Tiers",
      description: "Edit the impact tiers shown on the donation page as JSON.",
      fields: [
        { key: "donation_tiers", label: "Tiers JSON", type: "textarea", def: JSON.stringify(DEFAULT_DONATION_TIERS, null, 2), rows: 12 },
      ],
    },
    {
      value: "images",
      label: "Site Images",
      title: "Site Images & Media",
      description: "Upload custom photos for key sections across the website. Supports uploading from device, pasting images, or entering image URLs.",
      fields: [],
    }
  ];

  return (
    <Tabs defaultValue="general" className="w-full">
      <div className="mb-8">
        <TabsList className="bg-white/50 border border-rose-pale/20 h-auto p-1.5 shadow-sm">
          {tabs.map((tab) => (
            <TabsTrigger 
              key={tab.value} 
              value={tab.value}
              className="rounded-full px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-rose data-[state=active]:shadow-sm text-muted"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="focus-visible:outline-none">
          <Card className="border-rose-pale/20 shadow-sm rounded-2xl bg-white overflow-hidden">
            <CardHeader className="bg-cream/30 border-b border-rose-pale/10 pb-6">
              <CardTitle className="text-xl text-text font-display">{tab.title}</CardTitle>
              <CardDescription className="text-muted text-sm">{tab.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {tab.value === "images" ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-text font-medium">Hero Image URL / Upload</Label>
                    <ImageUploader
                      currentUrl={getVal("image_hero")}
                      onUpload={(url) => {
                        startTransition(async () => {
                          try {
                            await updateSiteSetting("image_hero", url);
                            toast.success("Hero image updated");
                          } catch (_) {
                            toast.error("Failed to update hero image");
                          }
                        });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-text font-medium">About Page Image URL / Upload</Label>
                    <ImageUploader
                      currentUrl={getVal("image_about")}
                      onUpload={(url) => {
                        startTransition(async () => {
                          try {
                            await updateSiteSetting("image_about", url);
                            toast.success("About image updated");
                          } catch (_) {
                            toast.error("Failed to update about image");
                          }
                        });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-text font-medium">Community Section Image URL / Upload</Label>
                    <ImageUploader
                      currentUrl={getVal("image_community")}
                      onUpload={(url) => {
                        startTransition(async () => {
                          try {
                            await updateSiteSetting("image_community", url);
                            toast.success("Community image updated");
                          } catch (_) {
                            toast.error("Failed to update community image");
                          }
                        });
                      }}
                    />
                  </div>
                </div>
              ) : (
                <form action={handleSave} className="space-y-6">
                  {tab.fields.map((field) => (
                    <div key={field.key} className="space-y-2">
                      <input type="hidden" name="keys" value={field.key} />
                      <Label htmlFor={field.key} className="text-text font-medium">{field.label}</Label>
                      {field.type === "textarea" ? (
                        <Textarea 
                          id={field.key} 
                          name={field.key} 
                          rows={field.rows || 3} 
                          defaultValue={getVal(field.key, field.def)} 
                          className="bg-white border-rose-pale/30 focus-visible:ring-rose/30 rounded-xl resize-y"
                        />
                      ) : (
                        <Input 
                          id={field.key} 
                          name={field.key} 
                          type={field.type} 
                          defaultValue={getVal(field.key, field.def)} 
                          className="bg-white border-rose-pale/30 focus-visible:ring-rose/30 rounded-xl"
                        />
                      )}
                    </div>
                  ))}
                  <div className="pt-4 flex justify-end">
                    <Button type="submit" disabled={isPending} className="bg-deep hover:bg-plum text-white rounded-xl px-6">
                      {isPending ? "Saving..." : "Save Settings"}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
