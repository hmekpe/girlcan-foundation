import { format, subMonths, startOfMonth } from "date-fns";
import { Download, CreditCard } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import { createOfflineDonation } from "@/app/actions/admin";
import { DonationsChart } from "@/components/admin/donations-chart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/admin/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function DonationsPage() {
  const donations = await prisma.donation.findMany({
    orderBy: { createdAt: "desc" },
  });

  const chartData = await Promise.all(
    Array.from({ length: 6 }, async (_, i) => {
      const month = startOfMonth(subMonths(new Date(), 5 - i));
      const next = startOfMonth(subMonths(new Date(), 4 - i));
      const agg = await prisma.donation.aggregate({
        where: {
          createdAt: { gte: month, lt: next },
          status: { in: ["PAID", "OFFLINE"] },
        },
        _sum: { amount: true },
      });
      return {
        month: format(month, "MMM"),
        total: Number(agg._sum.amount ?? 0),
      };
    })
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-900">Donations</h1>
          <p className="text-sm text-ink-500">Track online and offline gifts.</p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <a href="/api/export/donations" download>
            <Download className="h-4 w-4" />
            Export CSV
          </a>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Donations over time</CardTitle>
        </CardHeader>
        <CardContent>
          <DonationsChart data={chartData} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Record offline gift</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createOfflineDonation} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="donorName">Donor name</Label>
              <Input id="donorName" name="donorName" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="donorEmail">Email</Label>
              <Input id="donorEmail" name="donorEmail" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" name="amount" type="number" min={1} step="0.01" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <select id="currency" name="currency" defaultValue="GHS" className="flex h-11 w-full rounded-2xl border border-cream-300 bg-cream-50 px-4 text-sm">
                <option value="GHS">GHS</option>
                <option value="USD">USD</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <select id="frequency" name="frequency" defaultValue="ONE_TIME" className="flex h-11 w-full rounded-2xl border border-cream-300 bg-cream-50 px-4 text-sm">
                <option value="ONE_TIME">One-time</option>
                <option value="MONTHLY">Monthly</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button type="submit">Add donation</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {donations.length === 0 ? (
        <EmptyState icon={CreditCard} title="No donations" description="Donations will appear here once received." />
      ) : (
        <div className="rounded-2xl border border-cream-300 bg-cream-50">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Donor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donations.map((d) => (
                <TableRow key={d.id}>
                  <TableCell>
                    <p className="font-medium">{d.donorName}</p>
                    <p className="text-xs text-ink-500">{d.donorEmail}</p>
                  </TableCell>
                  <TableCell>{formatCurrency(Number(d.amount), d.currency)}</TableCell>
                  <TableCell className="text-ink-500">{d.provider}</TableCell>
                  <TableCell>
                    <Badge variant={d.status === "PAID" || d.status === "OFFLINE" ? "success" : "outline"}>
                      {d.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-ink-500">
                    {format(d.createdAt, "MMM d, yyyy")}
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
