"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable, OrderRow } from "@/components/data-table";
import ProductsManager from "@/components/dashboard/ProductManager";
import SavManager from "@/components/dashboard/SavManager";
import { Category, Product } from "@prisma/client";

type ProductWithCategory = Product & { category: Category };

interface Ticket {
  id: string;
  subject: string;
  message: string;
  status: string;
  priority: string;
  createdAt: Date;
  user: { name: string; email: string };
  order: { id: string; totalAmount: number } | null;
}

interface DashboardTabsProps {
  orderRows: OrderRow[];
  recentOrderRows: OrderRow[];
  products: ProductWithCategory[];
  categories: Category[];
  tickets: Ticket[];
  overviewContent: React.ReactNode;
}

export default function DashboardTabs({
  orderRows,
  recentOrderRows,
  products,
  categories,
  tickets,
  overviewContent,
}: DashboardTabsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || "overview";

  const handleTabChange = (value: string) => {
    router.push(`/dashboard?tab=${value}`, { scroll: false });
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="px-4 lg:px-6 pt-4">
      <TabsList>
        <TabsTrigger value="overview">Vue generale</TabsTrigger>
        <TabsTrigger value="products">Produits</TabsTrigger>
        <TabsTrigger value="orders">Commandes</TabsTrigger>
        <TabsTrigger value="sav">SAV</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4 mt-4">
        {overviewContent}
        <DataTable data={recentOrderRows} />
      </TabsContent>

      <TabsContent value="products" className="mt-4">
        <ProductsManager products={products} categories={categories} />
      </TabsContent>

      <TabsContent value="orders" className="mt-4">
        <DataTable data={orderRows} />
      </TabsContent>

      <TabsContent value="sav" className="mt-4">
        <SavManager tickets={tickets} />
      </TabsContent>
    </Tabs>
  );
}