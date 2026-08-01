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
    <div className="flex min-h-screen bg-cream font-sans">
      <AdminSidebar
        role={session.user.role}
        name={session.user.name}
        email={session.user.email}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar
          name={session.user.name}
          email={session.user.email}
          role={session.user.role}
        />
        {/* pt-16 on mobile gives room for the fixed hamburger button */}
        <main className="flex-1 overflow-auto p-4 pt-16 sm:p-6 sm:pt-16 lg:p-8 lg:pt-8">{children}</main>
      </div>
    </div>
  );
}
