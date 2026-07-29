import Link from "next/link";
import { format, startOfMonth, endOfMonth, subMonths } from "date-fns";
import {
  Calendar,
  CreditCard,
  Mail,
  MessageSquare,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function AdminDashboardPage() {
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  const prevMonthStart = startOfMonth(subMonths(now, 1));
  const prevMonthEnd = endOfMonth(subMonths(now, 1));

  const [
    thisMonthDonations,
    lastMonthDonations,
    newVolunteers,
    newPartners,
    unreadMessages,
    newsletterCount,
    upcomingEvents,
    recentActivity,
  ] = await Promise.all([
    prisma.donation.aggregate({
      where: {
        createdAt: { gte: monthStart, lte: monthEnd },
        status: { in: ["PAID", "OFFLINE"] },
      },
      _sum: { amount: true },
    }),
    prisma.donation.aggregate({
      where: {
        createdAt: { gte: prevMonthStart, lte: prevMonthEnd },
        status: { in: ["PAID", "OFFLINE"] },
      },
      _sum: { amount: true },
    }),
    prisma.volunteerApplication.count({ where: { status: "NEW" } }),
    prisma.partnerInquiry.count({ where: { status: "NEW" } }),
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.newsletterSubscriber.count({ where: { active: true } }),
    prisma.event.findMany({
      where: { startAt: { gte: now }, published: true },
      orderBy: { startAt: "asc" },
      take: 3,
    }),
    prisma.activityLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
      include: { user: { select: { name: true } } },
    }),
  ]);

  const thisTotal = Number(thisMonthDonations._sum.amount ?? 0);
  const lastTotal = Number(lastMonthDonations._sum.amount ?? 0);
  const trend =
    lastTotal === 0
      ? thisTotal > 0
        ? 100
        : 0
      : Math.round(((thisTotal - lastTotal) / lastTotal) * 100);

  const stats = [
    {
      label: "Donations this month",
      value: formatCurrency(thisTotal),
      sub: `${trend >= 0 ? "+" : ""}${trend}% vs last month`,
      icon: CreditCard,
      trendUp: trend >= 0,
    },
    {
      label: "New volunteer applications",
      value: String(newVolunteers),
      sub: "Awaiting review",
      icon: Users,
    },
    {
      label: "New partner inquiries",
      value: String(newPartners),
      sub: "Awaiting review",
      icon: Users,
    },
    {
      label: "Unread messages",
      value: String(unreadMessages),
      sub: "In inbox",
      icon: MessageSquare,
    },
    {
      label: "Newsletter subscribers",
      value: String(newsletterCount),
      sub: "Active subscribers",
      icon: Mail,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900">Dashboard</h1>
        <p className="text-sm text-ink-500">
          Overview for {format(now, "MMMM yyyy")}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-ink-500">
                  {stat.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-rose-500" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold text-ink-900">{stat.value}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-ink-500">
                  {"trendUp" in stat && stat.trendUp !== undefined ? (
                    stat.trendUp ? (
                      <TrendingUp className="h-3 w-3 text-state-success" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-state-error" />
                    )
                  ) : null}
                  {stat.sub}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Upcoming events</CardTitle>
            <Link
              href="/admin/events"
              className="text-sm text-rose-500 hover:text-rose-600"
            >
              View all
            </Link>
          </CardHeader>
          <CardContent>
            {upcomingEvents.length === 0 ? (
              <p className="text-sm text-ink-500">No upcoming events scheduled.</p>
            ) : (
              <ul className="space-y-3">
                {upcomingEvents.map((event) => (
                  <li
                    key={event.id}
                    className="flex items-start justify-between rounded-xl border border-cream-300 p-3"
                  >
                    <div>
                      <Link
                        href={`/admin/events/${event.id}`}
                        className="font-medium text-ink-900 hover:text-rose-600"
                      >
                        {event.title}
                      </Link>
                      <p className="text-xs text-ink-500">{event.location}</p>
                    </div>
                    <Badge variant="cream">
                      <Calendar className="mr-1 h-3 w-3" />
                      {format(event.startAt, "MMM d")}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent activity</CardTitle>
            <Link
              href="/admin/activity"
              className="text-sm text-rose-500 hover:text-rose-600"
            >
              View all
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead>Entity</TableHead>
                  <TableHead>When</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{log.action}</TableCell>
                    <TableCell className="text-ink-500">
                      {log.entityType}
                      {log.user?.name ? ` · ${log.user.name}` : ""}
                    </TableCell>
                    <TableCell className="text-ink-500">
                      {format(log.createdAt, "MMM d, HH:mm")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
