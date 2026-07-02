import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ShopHeader from "@/components/shop/ShopHeader";
import Footer from "@/components/shop/Footer";
import ProductDetailClient from "@/components/shop/ProductDetailClient";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) notFound();

  return (
    <div className="min-h-screen" style={{ background: "#F5EFE6" }}>
      <ShopHeader />
      <ProductDetailClient product={product} />
      <Footer />
    </div>
  );
}