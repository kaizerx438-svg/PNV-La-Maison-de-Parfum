import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProductsManager from "@/components/dashboard/ProductManager";

export default async function ProductsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });
  if (user?.role !== "ADMIN") redirect("/");

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany(),
  ]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1
          className="text-2xl font-light"
          style={{ color: "#F5EFE6", fontFamily: "Georgia, Times New Roman, serif" }}
        >
          Produits
        </h1>
        <p className="text-xs mt-1" style={{ color: "rgba(245,239,230,0.4)" }}>
          Gestion du catalogue — {products.length} produit{products.length > 1 ? "s" : ""}
        </p>
      </div>
      <ProductsManager products={products} categories={categories} />
    </div>
  );
}