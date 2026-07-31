import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { DataTable, OrderRow } from "@/components/data-table"
import ProductsManager from "@/components/dashboard/ProductManager"
import RecentOrdersTable from "@/components/dashboard/RecentOrdersTable"

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });
  if (user?.role !== "ADMIN") redirect("/");

  const [orders, products, categories, recentOrders] = await Promise.all([
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: { items: true },
    }),
    prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany(),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { items: true },
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

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <Tabs defaultValue="overview" className="px-4 lg:px-6 pt-4">
              <TabsList>
                <TabsTrigger value="overview">Vue generale</TabsTrigger>
                <TabsTrigger value="products">Produits</TabsTrigger>
                <TabsTrigger value="orders">Commandes</TabsTrigger>
              </TabsList>

              {/* Vue generale */}
              <TabsContent value="overview" className="space-y-4 mt-4">
                <SectionCards />
                <ChartAreaInteractive />
                <DataTable data={orderRows.slice(0, 5)} />
              </TabsContent>

              {/* Produits */}
              <TabsContent value="products" className="mt-4">
                <ProductsManager products={products} categories={categories} />
              </TabsContent>

              {/* Commandes */}
              <TabsContent value="orders" className="mt-4">
                <DataTable data={orderRows} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}