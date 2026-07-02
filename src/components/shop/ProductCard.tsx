"use client";

import { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Product, Category } from "@prisma/client";
import { toast } from "sonner";

type ProductWithCategory = Product & {
  category: Category;
};

interface ProductCardProps {
  product: ProductWithCategory;
}

const categoryLabels: Record<string, string> = {
  PARFUMS_FEMME: "Femme",
  PARFUMS_HOMME: "Homme",
};

export default function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked] = useState(false);

  const discountedPrice =
    product.discountPercent > 0
      ? product.price * (1 - product.discountPercent / 100)
      : null;

  const isOutOfStock = product.status === "OUT_OF_STOCK" || product.stock === 0;
  const isLowStock = !isOutOfStock && product.stock <= 3;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock) return;

    const saved = localStorage.getItem("cart");
    const cart = saved ? JSON.parse(saved) : [];

    const existing = cart.find(
      (i: { product_id: string }) => i.product_id === product.id
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        product_id: product.id,
        product_name: product.name,
        price: discountedPrice ?? product.price,
        quantity: 1,
        image_url: product.imageUrl,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));
    toast.success(`${product.name} ajouté au panier`);
  };

  return (
    <div
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/product/${product.id}`}>
        <div
          className="aspect-[3/4] overflow-hidden relative"
          style={{ background: "#EDE3D5" }}
        >
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
              style={{
                transform: hovered && !isOutOfStock ? "scale(1.08)" : "scale(1)",
                transition: "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                filter: hovered ? "brightness(0.85)" : isOutOfStock ? "brightness(0.6) grayscale(0.3)" : "brightness(1)",
              }}
            />
          )}

          {/* Badge rupture */}
          {isOutOfStock && (
            <span
              className="absolute top-3 left-3 text-[9px] tracking-[0.2em] uppercase px-2 py-1"
              style={{ background: "rgba(13,13,13,0.8)", color: "rgba(245,239,230,0.7)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
            >
              Rupture de stock
            </span>
          )}

          {/* Badge remise */}
          {!isOutOfStock && product.discountPercent > 0 && (
            <span
              className="absolute top-3 left-3 text-[9px] tracking-[0.2em] uppercase px-2 py-1"
              style={{ background: "#6B1A2A", color: "#F5EFE6", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
            >
              -{product.discountPercent}%
            </span>
          )}

          {/* Badge vedette */}
          {!isOutOfStock && product.featured && (
            <span
              className="absolute top-3 right-10 text-[9px] tracking-[0.2em] uppercase px-2 py-1"
              style={{ background: "rgba(201,169,110,0.9)", color: "#0D0D0D", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
            >
              Vedette
            </span>
          )}

          {/* Badge stock faible */}
          {isLowStock && (
            <span
              className="absolute bottom-3 left-3 text-[9px] tracking-[0.2em] uppercase px-2 py-1"
              style={{ background: "rgba(107,26,42,0.85)", color: "#F5EFE6", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
            >
              Plus que {product.stock}
            </span>
          )}

          {/* Corner decorations */}
          {!isOutOfStock && (
            <>
              <div
                className="absolute top-2 left-2 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ borderTop: "1px solid rgba(201,169,110,0.7)", borderLeft: "1px solid rgba(201,169,110,0.7)" }}
              />
              <div
                className="absolute bottom-2 right-2 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ borderBottom: "1px solid rgba(201,169,110,0.7)", borderRight: "1px solid rgba(201,169,110,0.7)" }}
              />
            </>
          )}
        </div>
      </Link>

      {/* Wishlist */}
      {!isOutOfStock && (
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          className="absolute top-3 right-3 z-10 p-1.5 transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
          aria-label="Ajouter aux favoris"
        >
          <Heart
            className="w-4 h-4"
            style={{ color: liked ? "#6B1A2A" : "#F5EFE6", fill: liked ? "#6B1A2A" : "transparent" }}
          />
        </button>
      )}

      {/* Add to cart overlay */}
      <div
        className="absolute left-0 right-0 px-3"
        style={{
          bottom: "128px",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(8px)",
          transition: "all 0.3s ease",
        }}
      >
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="w-full flex items-center justify-center gap-2 py-3 text-[10px] tracking-[0.25em] uppercase transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 hover:bg-[#6B1A2A] hover:text-[#F5EFE6] cursor-pointer"
          style={{
            background: isOutOfStock ? "rgba(13,13,13,0.5)" : "rgba(13,13,13,0.92)",
            color: isOutOfStock ? "rgba(245,239,230,0.4)" : "#C9A96E",
            fontFamily: "Helvetica Neue, Arial, sans-serif",
          }}
        >
          <ShoppingBag className="w-3 h-3" />
          {isOutOfStock ? "Rupture de stock" : "Ajouter au panier"}
        </button>
      </div>

      {/* Info */}
      <div className="mt-4 space-y-1.5 px-1">
        <p
          className="text-[9px] tracking-[0.35em] uppercase"
          style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
        >
          {categoryLabels[product.category.slug.toUpperCase().replace(/-/g, "_")] ?? product.category.name}
        </p>
        <h3
          className="text-sm font-light truncate"
          style={{ color: isOutOfStock ? "rgba(13,13,13,0.4)" : "#0D0D0D", fontFamily: "Georgia, Times New Roman, serif" }}
        >
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          {isOutOfStock ? (
            <span className="text-xs" style={{ color: "rgba(13,13,13,0.35)", fontFamily: "Georgia, serif" }}>
              Indisponible
            </span>
          ) : discountedPrice ? (
            <>
              <span className="text-sm font-medium" style={{ color: "#6B1A2A" }}>
                {discountedPrice.toFixed(2)} €
              </span>
              <span className="text-xs line-through" style={{ color: "#B0A898" }}>
                {product.price.toFixed(2)} €
              </span>
            </>
          ) : (
            <span className="text-sm" style={{ color: "#0D0D0D", fontFamily: "Georgia, serif" }}>
              {product.price.toFixed(2)} €
            </span>
          )}
        </div>
      </div>
    </div>
  );
}