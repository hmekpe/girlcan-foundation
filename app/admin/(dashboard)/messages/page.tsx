import { format } from "date-fns";
import { MessageSquare } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { toggleMessageRead, markMessageReplied } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/admin/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function MessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900">Messages</h1>
        <p className="text-sm text-ink-500">Contact form submissions from the public site.</p>
      </div>

      {messages.length === 0 ? (
        <EmptyState icon={MessageSquare} title="No messages" description="Inbox is empty." />
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <Card key={m.id} className={!m.read ? "border-rose-200 bg-rose-50/30" : ""}>
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-base">{m.subject}</CardTitle>
                  <p className="text-sm text-ink-500">
                    {m.name} · {m.email} · {format(m.createdAt, "MMM d, yyyy HH:mm")}
                  </p>
                </div>
                <Badge variant={m.read ? "outline" : "default"}>
                  {m.read ? "Read" : "Unread"}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="whitespace-pre-wrap text-sm text-ink-700">{m.message}</p>
                <div className="flex flex-wrap gap-2">
                  {!m.read ? (
                    <form action={toggleMessageRead.bind(null, m.id, true)}>
                      <Button type="submit" size="sm" variant="outline">Mark read</Button>
                    </form>
                  ) : (
                    <form action={toggleMessageRead.bind(null, m.id, false)}>
                      <Button type="submit" size="sm" variant="ghost">Mark unread</Button>
                    </form>
                  )}
                  <form action={markMessageReplied.bind(null, m.id)}>
                    <Button type="submit" size="sm">Mark replied</Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
