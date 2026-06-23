import ShopHeader from "@/components/shop/ShopHeader";
import HeroSection from "@/components/shop/HeroSection";
import CategoryBanner from "@/components/shop/CategoryBanner";
import FeaturedProducts from "@/components/shop/FeaturedProducts";
import BrandManifesto from "@/components/shop/BrandManifesto";
import Footer from "@/components/shop/Footer";

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="min-h-screen">
      <ShopHeader />
      <HeroSection />
      <CategoryBanner />
      <FeaturedProducts products={products} />
      <BrandManifesto />
      <Footer />
    </div>
  );
}

async function getProducts() {
  const { prisma } = await import("@/lib/prisma");
  return prisma.product.findMany({
    where: { status: "ACTIVE" },
    include: { category: true },
  });
}