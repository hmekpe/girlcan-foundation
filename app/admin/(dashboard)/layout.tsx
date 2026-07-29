import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminTopbar } from "@/components/admin/topbar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-cream-50">
      <AdminSidebar role={session.user.role} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar
          name={session.user.name}
          email={session.user.email}
          role={session.user.role}
        />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
