import ProductCard from "@/components/shop/ProductCard";
import { Product, Category } from "@prisma/client";

type ProductWithCategory = Product & {
  category: Category;
};

interface FeaturedProductsProps {
  products: ProductWithCategory[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const display = featured.length > 0 ? featured : products.slice(0, 4);

  if (display.length === 0) return null;

  return (
    <section style={{ background: "#F5EFE6", padding: "100px 0" }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-6 mb-6">
            <div
              style={{
                width: "60px",
                height: "1px",
                background: "linear-gradient(90deg, transparent, #C9A96E)",
              }}
            />
            <p
              className="text-[10px] tracking-[0.5em] uppercase"
              style={{
                color: "#C9A96E",
                fontFamily: "Helvetica Neue, Arial, sans-serif",
              }}
            >
              Sélection
            </p>
            <div
              style={{
                width: "60px",
                height: "1px",
                background: "linear-gradient(90deg, #C9A96E, transparent)",
              }}
            />
          </div>
          <h2
            className="text-4xl md:text-5xl font-light mb-4"
            style={{
              color: "#0D0D0D",
              fontFamily: "Georgia, Times New Roman, serif",
            }}
          >
            Coups de cœur
          </h2>
          <p
            className="text-sm italic"
            style={{ color: "#7C5C42", fontFamily: "Georgia, serif" }}
          >
            Une sélection de pièces intemporelles
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {display.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}