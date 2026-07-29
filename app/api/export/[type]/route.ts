import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function csvEscape(value: unknown) {
  const str = String(value ?? "");
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function toCsv(headers: string[], rows: string[][]) {
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(row.map(csvEscape).join(","));
  }
  return lines.join("\n");
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { type } = await params;
  const { searchParams } = req.nextUrl;
  let csv = "";
  let filename = `${type}-export.csv`;

  switch (type) {
    case "volunteers": {
      const rows = await prisma.volunteerApplication.findMany({
        orderBy: { createdAt: "desc" },
      });
      csv = toCsv(
        ["Name", "Email", "Phone", "Status", "Message", "Created"],
        rows.map((r) => [
          r.name,
          r.email,
          r.phone || "",
          r.status,
          r.message,
          r.createdAt.toISOString(),
        ])
      );
      break;
    }
    case "partners": {
      const rows = await prisma.partnerInquiry.findMany({
        orderBy: { createdAt: "desc" },
      });
      csv = toCsv(
        ["Organization", "Contact", "Email", "Status", "Message", "Created"],
        rows.map((r) => [
          r.orgName,
          r.contactName,
          r.email,
          r.status,
          r.message,
          r.createdAt.toISOString(),
        ])
      );
      break;
    }
    case "newsletter": {
      const rows = await prisma.newsletterSubscriber.findMany({
        where: { active: true },
        orderBy: { subscribedAt: "desc" },
      });
      csv = toCsv(
        ["Email", "Subscribed At"],
        rows.map((r) => [r.email, r.subscribedAt.toISOString()])
      );
      break;
    }
    case "donations": {
      const rows = await prisma.donation.findMany({
        orderBy: { createdAt: "desc" },
      });
      csv = toCsv(
        ["Donor", "Email", "Amount", "Currency", "Frequency", "Provider", "Status", "Created"],
        rows.map((r) => [
          r.donorName,
          r.donorEmail,
          String(r.amount),
          r.currency,
          r.frequency,
          r.provider,
          r.status,
          r.createdAt.toISOString(),
        ])
      );
      break;
    }
    case "event-registrations": {
      const eventId = searchParams.get("eventId");
      if (!eventId) {
        return NextResponse.json({ error: "eventId required" }, { status: 400 });
      }
      const event = await prisma.event.findUnique({ where: { id: eventId } });
      const rows = await prisma.eventRegistration.findMany({
        where: { eventId },
        orderBy: { createdAt: "desc" },
      });
      filename = `registrations-${event?.slug || eventId}.csv`;
      csv = toCsv(
        ["Name", "Email", "Phone", "Registered At"],
        rows.map((r) => [
          r.name,
          r.email,
          r.phone || "",
          r.createdAt.toISOString(),
        ])
      );
      break;
    }
    default:
      return NextResponse.json({ error: "Unknown export type" }, { status: 404 });
  }

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
