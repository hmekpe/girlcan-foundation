"use client";

import { useState } from "react";
import { uploadMediaAsset } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUploader } from "@/components/admin/image-uploader";
import { Loader2 } from "lucide-react";

export function MediaUploadForm() {
  const [url, setUrl] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSave(formData: FormData) {
    if (!url) {
      alert("Please upload or provide an image first.");
      return;
    }
    const altText = formData.get("altText") as string;
    if (!altText) {
      alert("Alt text is required for accessibility.");
      return;
    }
    setSaving(true);
    formData.set("url", url);
    // Remove the file from formData so the action doesn't try to upload it again,
    // since the url is already the uploaded version.
    formData.delete("file");
    
    try {
      await uploadMediaAsset(formData);
      setUrl("");
      const form = document.getElementById("media-upload-form") as HTMLFormElement;
      form?.reset();
    } catch (err: unknown) {
      alert((err as Error).message || "Failed to save asset");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card className="bg-plum/5 border-rose/20">
      <CardHeader>
        <CardTitle className="text-text">Upload New Image</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <ImageUploader onUpload={setUrl} currentUrl={url} />
          
          <form id="media-upload-form" action={handleSave} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="altText" className="text-text">Alt text *</Label>
                <Input id="altText" name="altText" required placeholder="Describe the image for accessibility" className="bg-white border-rose/20 focus-visible:ring-rose" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="album" className="text-text">Album</Label>
                <Input id="album" name="album" placeholder="Programs, Events, etc." className="bg-white border-rose/20 focus-visible:ring-rose" />
              </div>
            </div>
            <Button type="submit" disabled={!url || saving} className="bg-rose hover:bg-rose/90 text-white w-full sm:w-auto">
              {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : "Save to Media Library"}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
