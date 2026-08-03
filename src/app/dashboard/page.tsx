import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { OrderRow } from "@/components/data-table"
import DashboardTabs from "@/components/dashboard/DashboardTabs"

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });
  if (user?.role !== "ADMIN") redirect("/");

  const [orders, products, categories, tickets] = await Promise.all([
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: { items: true },
    }),
    prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany(),
    prisma.ticket.findMany({
      include: {
        user: { select: { name: true, email: true } },
        order: { select: { id: true, totalAmount: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const orderRows: OrderRow[] = orders.map((order) => ({
    id: order.id,
    customerName: order.customerName,
    customerEmail: order.customerEmail,
    totalAmount: order.totalAmount,
    status: order.status,
    createdAt: order.createdAt.toISOString(),
    itemCount: order.items.length,
  }));

  const recentOrderRows = orderRows.slice(0, 5);

  const overviewContent = (
    <>
      <SectionCards />
      <ChartAreaInteractive />
    </>
  );

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
   <AppSidebar 
    variant="inset" 
    user={{
      name: session.user.name || "Admin",
      email: session.user.email || "",
      avatar: session.user.image || "",
    }}
  />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <DashboardTabs
              orderRows={orderRows}
              recentOrderRows={recentOrderRows}
              products={products}
              categories={categories}
              tickets={tickets}
              overviewContent={overviewContent}
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}