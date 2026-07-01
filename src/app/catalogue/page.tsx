import { prisma } from "@/lib/prisma";
import ShopHeader from "@/components/shop/ShopHeader";
import Footer from "@/components/shop/Footer";
import CatalogueClient from "@/components/shop/CatalogueClient";

export default async function CataloguePage() {
  const products = await prisma.product.findMany({
    where: { status: "ACTIVE" },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen" style={{ background: "#F5EFE6" }}>
      <ShopHeader />
      <CatalogueClient products={products} />
      <Footer />
    </div>
  );
}