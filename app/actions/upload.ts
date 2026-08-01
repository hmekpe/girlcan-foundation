"use server";

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { uploadImage as cloudinaryUpload } from "@/lib/cloudinary";

export async function uploadImageAction(formData: FormData): Promise<{ success: boolean; url?: string; error?: string; size?: number; type?: string }> {
  try {
    const file = formData.get("file") as File;
    if (!file || file.size === 0) {
      return { success: false, error: "No file provided" };
    }

    if (file.size > 10 * 1024 * 1024) {
      return { success: false, error: "File exceeds 10MB limit" };
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return { success: false, error: "Invalid file type. Only JPG, PNG, WEBP, and GIF are allowed." };
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Try Cloudinary
    if (process.env.CLOUDINARY_URL || process.env.CLOUDINARY_CLOUD_NAME) {
      try {
        const result = await cloudinaryUpload(buffer, { folder: "girlcan/admin" });
        return { success: true, url: result.url, size: file.size, type: file.type };
      } catch (err) {
        console.error("Cloudinary upload failed", err);
        // Fallback to local
      }
    }

    // Fallback: public/uploads
    const uploadsDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });
    
    // Create unique filename
    const ext = file.name.split(".").pop() || "jpg";
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
    const filePath = join(uploadsDir, uniqueName);
    
    await writeFile(filePath, buffer);
    
    return { success: true, url: `/uploads/${uniqueName}`, size: file.size, type: file.type };
  } catch (error) {
    console.error("Upload error", error);
    return { success: false, error: "Upload failed" };
  }
}
