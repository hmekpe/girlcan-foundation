"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import {
  ApplicationStatus,
  DonationFrequency,
  DonationProvider,
  DonationStatus,
  Role,
} from "@prisma/client";
import { getServerSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { logActivity } from "@/lib/site";
import { uploadImage } from "@/lib/cloudinary";
import { slugify } from "@/lib/utils";

async function requireSession(superAdminOnly = false) {
  const session = await getServerSession();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  if (superAdminOnly && session.user.role !== Role.SUPER_ADMIN) {
    throw new Error("Forbidden");
  }
  return session;
}

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function bool(formData: FormData, key: string) {
  return formData.get(key) === "on" || formData.get(key) === "true";
}

function num(formData: FormData, key: string) {
  const v = formData.get(key);
  return v ? Number(v) : undefined;
}

// ─── Programs ───────────────────────────────────────────────────────────────

export async function createProgram(formData: FormData): Promise<void> {
  const session = await requireSession();
  const title = str(formData, "title");
  if (!title) throw new Error("Title is required");

  const slug = str(formData, "slug") || slugify(title);
  const program = await prisma.program.create({
    data: {
      title,
      slug,
      summary: str(formData, "summary"),
      description: str(formData, "description"),
      icon: str(formData, "icon") || "Sparkles",
      coverImage: str(formData, "coverImage") || null,
      order: num(formData, "order") ?? 0,
      published: bool(formData, "published"),
    },
  });

  await logActivity({
    userId: session.user.id,
    action: "CREATE",
    entityType: "Program",
    entityId: program.id,
  });
  revalidatePath("/admin/programs");
  redirect(`/admin/programs/${program.id}`);
}

export async function updateProgram(id: string, formData: FormData): Promise<void> {
  const session = await requireSession();
  const title = str(formData, "title");
  if (!title) throw new Error("Title is required");

  await prisma.program.update({
    where: { id },
    data: {
      title,
      slug: str(formData, "slug") || slugify(title),
      summary: str(formData, "summary"),
      description: str(formData, "description"),
      icon: str(formData, "icon") || "Sparkles",
      coverImage: str(formData, "coverImage") || null,
      order: num(formData, "order") ?? 0,
      published: bool(formData, "published"),
    },
  });

  await logActivity({
    userId: session.user.id,
    action: "UPDATE",
    entityType: "Program",
    entityId: id,
  });
  revalidatePath("/admin/programs");
  revalidatePath(`/admin/programs/${id}`);
  return;
}

export async function deleteProgram(id: string): Promise<void> {
  const session = await requireSession();
  await prisma.program.delete({ where: { id } });
  await logActivity({
    userId: session.user.id,
    action: "DELETE",
    entityType: "Program",
    entityId: id,
  });
  revalidatePath("/admin/programs");
  redirect("/admin/programs");
}

// ─── Stories ────────────────────────────────────────────────────────────────

export async function createStory(formData: FormData): Promise<void> {
  const session = await requireSession();
  const title = str(formData, "title");
  if (!title) throw new Error("Title is required");

  const slug = str(formData, "slug") || slugify(title);
  const published = bool(formData, "published");
  const story = await prisma.story.create({
    data: {
      title,
      slug,
      excerpt: str(formData, "excerpt"),
      contentRich: str(formData, "contentRich"),
      coverImage: str(formData, "coverImage") || null,
      category: str(formData, "category") || "General",
      authorId: session.user.id,
      published,
      publishedAt: published ? new Date() : null,
      featured: bool(formData, "featured"),
    },
  });

  await logActivity({
    userId: session.user.id,
    action: "CREATE",
    entityType: "Story",
    entityId: story.id,
  });
  revalidatePath("/admin/stories");
  redirect(`/admin/stories/${story.id}`);
}

export async function updateStory(id: string, formData: FormData): Promise<void> {
  const session = await requireSession();
  const title = str(formData, "title");
  if (!title) throw new Error("Title is required");

  const existing = await prisma.story.findUnique({ where: { id } });
  const published = bool(formData, "published");

  await prisma.story.update({
    where: { id },
    data: {
      title,
      slug: str(formData, "slug") || slugify(title),
      excerpt: str(formData, "excerpt"),
      contentRich: str(formData, "contentRich"),
      coverImage: str(formData, "coverImage") || null,
      category: str(formData, "category") || "General",
      published,
      publishedAt: published && !existing?.publishedAt ? new Date() : existing?.publishedAt,
      featured: bool(formData, "featured"),
    },
  });

  await logActivity({
    userId: session.user.id,
    action: "UPDATE",
    entityType: "Story",
    entityId: id,
  });
  revalidatePath("/admin/stories");
  revalidatePath(`/admin/stories/${id}`);
  return;
}

export async function deleteStory(id: string): Promise<void> {
  const session = await requireSession();
  await prisma.story.delete({ where: { id } });
  await logActivity({
    userId: session.user.id,
    action: "DELETE",
    entityType: "Story",
    entityId: id,
  });
  revalidatePath("/admin/stories");
  redirect("/admin/stories");
}

// ─── Events ─────────────────────────────────────────────────────────────────

export async function createEvent(formData: FormData): Promise<void> {
  const session = await requireSession();
  const title = str(formData, "title");
  if (!title) throw new Error("Title is required");

  const startAt = new Date(str(formData, "startAt"));
  const endAtRaw = str(formData, "endAt");
  const slug = str(formData, "slug") || slugify(title);

  const event = await prisma.event.create({
    data: {
      title,
      slug,
      description: str(formData, "description"),
      startAt,
      endAt: endAtRaw ? new Date(endAtRaw) : null,
      location: str(formData, "location"),
      coverImage: str(formData, "coverImage") || null,
      capacity: num(formData, "capacity") ?? null,
      registrationOpen: bool(formData, "registrationOpen"),
      published: bool(formData, "published"),
    },
  });

  await logActivity({
    userId: session.user.id,
    action: "CREATE",
    entityType: "Event",
    entityId: event.id,
  });
  revalidatePath("/admin/events");
  redirect(`/admin/events/${event.id}`);
}

export async function updateEvent(id: string, formData: FormData): Promise<void> {
  const session = await requireSession();
  const title = str(formData, "title");
  if (!title) throw new Error("Title is required");

  const endAtRaw = str(formData, "endAt");
  await prisma.event.update({
    where: { id },
    data: {
      title,
      slug: str(formData, "slug") || slugify(title),
      description: str(formData, "description"),
      startAt: new Date(str(formData, "startAt")),
      endAt: endAtRaw ? new Date(endAtRaw) : null,
      location: str(formData, "location"),
      coverImage: str(formData, "coverImage") || null,
      capacity: num(formData, "capacity") ?? null,
      registrationOpen: bool(formData, "registrationOpen"),
      published: bool(formData, "published"),
    },
  });

  await logActivity({
    userId: session.user.id,
    action: "UPDATE",
    entityType: "Event",
    entityId: id,
  });
  revalidatePath("/admin/events");
  revalidatePath(`/admin/events/${id}`);
  return;
}

export async function deleteEvent(id: string): Promise<void> {
  const session = await requireSession();
  await prisma.event.delete({ where: { id } });
  await logActivity({
    userId: session.user.id,
    action: "DELETE",
    entityType: "Event",
    entityId: id,
  });
  revalidatePath("/admin/events");
  redirect("/admin/events");
}

// ─── Team ───────────────────────────────────────────────────────────────────

export async function createTeamMember(formData: FormData): Promise<void> {
  const session = await requireSession();
  const name = str(formData, "name");
  if (!name) throw new Error("Name is required");

  const member = await prisma.teamMember.create({
    data: {
      name,
      role: str(formData, "role"),
      bio: str(formData, "bio"),
      photo: str(formData, "photo") || null,
      order: num(formData, "order") ?? 0,
      socialLinks: parseSocialLinks(formData),
    },
  });

  await logActivity({
    userId: session.user.id,
    action: "CREATE",
    entityType: "TeamMember",
    entityId: member.id,
  });
  revalidatePath("/admin/team");
  return;
}

export async function updateTeamMember(id: string, formData: FormData): Promise<void> {
  const session = await requireSession();
  const name = str(formData, "name");
  if (!name) throw new Error("Name is required");

  await prisma.teamMember.update({
    where: { id },
    data: {
      name,
      role: str(formData, "role"),
      bio: str(formData, "bio"),
      photo: str(formData, "photo") || null,
      order: num(formData, "order") ?? 0,
      socialLinks: parseSocialLinks(formData),
    },
  });

  await logActivity({
    userId: session.user.id,
    action: "UPDATE",
    entityType: "TeamMember",
    entityId: id,
  });
  revalidatePath("/admin/team");
  return;
}

export async function deleteTeamMember(id: string): Promise<void> {
  const session = await requireSession();
  await prisma.teamMember.delete({ where: { id } });
  await logActivity({
    userId: session.user.id,
    action: "DELETE",
    entityType: "TeamMember",
    entityId: id,
  });
  revalidatePath("/admin/team");
  return;
}

function parseSocialLinks(formData: FormData) {
  const linkedin = str(formData, "linkedin");
  const twitter = str(formData, "twitter");
  if (!linkedin && !twitter) return undefined;
  return { linkedin: linkedin || undefined, twitter: twitter || undefined };
}

// ─── Testimonials ───────────────────────────────────────────────────────────

export async function createTestimonial(formData: FormData): Promise<void> {
  const session = await requireSession();
  const quote = str(formData, "quote");
  const name = str(formData, "name");
  if (!quote || !name) throw new Error("Quote and name are required");

  const testimonial = await prisma.testimonial.create({
    data: {
      quote,
      name,
      photo: str(formData, "photo") || null,
      programId: str(formData, "programId") || null,
      featured: bool(formData, "featured"),
    },
  });

  await logActivity({
    userId: session.user.id,
    action: "CREATE",
    entityType: "Testimonial",
    entityId: testimonial.id,
  });
  revalidatePath("/admin/testimonials");
  return;
}

export async function updateTestimonial(id: string, formData: FormData): Promise<void> {
  const session = await requireSession();
  await prisma.testimonial.update({
    where: { id },
    data: {
      quote: str(formData, "quote"),
      name: str(formData, "name"),
      photo: str(formData, "photo") || null,
      programId: str(formData, "programId") || null,
      featured: bool(formData, "featured"),
    },
  });

  await logActivity({
    userId: session.user.id,
    action: "UPDATE",
    entityType: "Testimonial",
    entityId: id,
  });
  revalidatePath("/admin/testimonials");
  return;
}

export async function deleteTestimonial(id: string): Promise<void> {
  const session = await requireSession();
  await prisma.testimonial.delete({ where: { id } });
  await logActivity({
    userId: session.user.id,
    action: "DELETE",
    entityType: "Testimonial",
    entityId: id,
  });
  revalidatePath("/admin/testimonials");
  return;
}

// ─── Media ──────────────────────────────────────────────────────────────────

export async function uploadMediaAsset(formData: FormData): Promise<void> {
  const session = await requireSession();
  const altText = str(formData, "altText");
  if (!altText) throw new Error("Alt text is required for accessibility");

  const file = formData.get("file") as File | null;
  const urlInput = str(formData, "url");

  let url = urlInput;
  if (file && file.size > 0) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploaded = await uploadImage(buffer, { folder: "girlcan/admin" });
    url = uploaded.url;
  }

  if (!url) throw new Error("Provide a file or image URL");

  const asset = await prisma.mediaAsset.create({
    data: {
      url,
      altText,
      album: str(formData, "album") || null,
    },
  });

  await logActivity({
    userId: session.user.id,
    action: "CREATE",
    entityType: "MediaAsset",
    entityId: asset.id,
  });
  revalidatePath("/admin/media");
  return;
}

export async function deleteMediaAsset(id: string): Promise<void> {
  const session = await requireSession();
  await prisma.mediaAsset.delete({ where: { id } });
  await logActivity({
    userId: session.user.id,
    action: "DELETE",
    entityType: "MediaAsset",
    entityId: id,
  });
  revalidatePath("/admin/media");
  return;
}

export async function getMediaAssets() {
  await requireSession();
  return prisma.mediaAsset.findMany({
    orderBy: { uploadedAt: "desc" },
  });
}

// ─── Volunteers & Partners ──────────────────────────────────────────────────

export async function updateVolunteerStatus(
  id: string,
  status: ApplicationStatus
): Promise<void> {
  const session = await requireSession();
  await prisma.volunteerApplication.update({ where: { id }, data: { status } });
  await logActivity({
    userId: session.user.id,
    action: "UPDATE_STATUS",
    entityType: "VolunteerApplication",
    entityId: id,
  });
  revalidatePath("/admin/volunteers");
  return;
}

export async function updatePartnerStatus(
  id: string,
  status: ApplicationStatus
): Promise<void> {
  const session = await requireSession();
  await prisma.partnerInquiry.update({ where: { id }, data: { status } });
  await logActivity({
    userId: session.user.id,
    action: "UPDATE_STATUS",
    entityType: "PartnerInquiry",
    entityId: id,
  });
  revalidatePath("/admin/partners");
  return;
}

// ─── Messages ───────────────────────────────────────────────────────────────

export async function toggleMessageRead(id: string, read: boolean): Promise<void> {
  const session = await requireSession();
  await prisma.contactMessage.update({ where: { id }, data: { read } });
  await logActivity({
    userId: session.user.id,
    action: read ? "MARK_READ" : "MARK_UNREAD",
    entityType: "ContactMessage",
    entityId: id,
  });
  revalidatePath("/admin/messages");
  return;
}

export async function markMessageReplied(id: string): Promise<void> {
  const session = await requireSession();
  await prisma.contactMessage.update({ where: { id }, data: { read: true } });
  await logActivity({
    userId: session.user.id,
    action: "MARK_REPLIED",
    entityType: "ContactMessage",
    entityId: id,
  });
  revalidatePath("/admin/messages");
  return;
}

// ─── Donations ──────────────────────────────────────────────────────────────

export async function createOfflineDonation(formData: FormData): Promise<void> {
  const session = await requireSession();
  const donorName = str(formData, "donorName");
  const donorEmail = str(formData, "donorEmail");
  const amount = num(formData, "amount");

  if (!donorName || !donorEmail || !amount || amount <= 0) {
    throw new Error("Name, email, and valid amount are required");
  }

  const donation = await prisma.donation.create({
    data: {
      donorName,
      donorEmail,
      amount,
      currency: str(formData, "currency") || "GHS",
      frequency: (str(formData, "frequency") as DonationFrequency) || DonationFrequency.ONE_TIME,
      provider: DonationProvider.OFFLINE,
      status: DonationStatus.OFFLINE,
    },
  });

  await logActivity({
    userId: session.user.id,
    action: "CREATE",
    entityType: "Donation",
    entityId: donation.id,
  });
  revalidatePath("/admin/donations");
  return;
}

export async function updateDonationAttributionNote(
  id: string,
  attributionNote: string
): Promise<void> {
  const session = await requireSession();
  await prisma.donation.update({
    where: { id },
    data: { attributionNote },
  });
  await logActivity({
    userId: session.user.id,
    action: "UPDATE_ATTRIBUTION",
    entityType: "Donation",
    entityId: id,
  });
  revalidatePath("/admin/donations");
  return;
}


// ─── Users (SUPER_ADMIN) ────────────────────────────────────────────────────

export async function inviteUser(formData: FormData): Promise<void> {
  const session = await requireSession(true);
  const name = str(formData, "name");
  const email = str(formData, "email").toLowerCase();
  const password = str(formData, "password");
  const role = str(formData, "role") as Role;

  if (!name || !email || !password) {
    throw new Error("Name, email, and password are required");
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("A user with this email already exists");

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { name, email, passwordHash, role: role || Role.EDITOR },
  });

  await logActivity({
    userId: session.user.id,
    action: "INVITE",
    entityType: "User",
    entityId: user.id,
  });
  revalidatePath("/admin/users");
  return;
}

export async function deactivateUser(id: string): Promise<void> {
  const session = await requireSession(true);
  if (session.user.id === id) {
    throw new Error("You cannot deactivate your own account");
  }

  await prisma.user.delete({ where: { id } });
  await logActivity({
    userId: session.user.id,
    action: "DEACTIVATE",
    entityType: "User",
    entityId: id,
  });
  revalidatePath("/admin/users");
  return;
}

// ─── Settings ───────────────────────────────────────────────────────────────

export async function updateSiteSetting(key: string, value: string): Promise<void> {
  const session = await requireSession();
  await prisma.siteSetting.upsert({
    where: { key },
    create: { key, value },
    update: { value },
  });
  await logActivity({
    userId: session.user.id,
    action: "UPDATE",
    entityType: "SiteSetting",
    entityId: key,
  });
  revalidatePath("/admin/settings");
  return;
}

export async function updateSiteSettings(formData: FormData): Promise<void> {
  const session = await requireSession();
  const keys = formData.getAll("keys") as string[];

  for (const key of keys) {
    const value = str(formData, key);
    await prisma.siteSetting.upsert({
      where: { key },
      create: { key, value },
      update: { value },
    });
  }

  await logActivity({
    userId: session.user.id,
    action: "UPDATE",
    entityType: "SiteSetting",
    entityId: "bulk",
  });
  revalidatePath("/admin/settings");
  return;
}
