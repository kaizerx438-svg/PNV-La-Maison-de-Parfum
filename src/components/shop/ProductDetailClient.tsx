"use client";

import { useState } from "react";
import { ShoppingBag, Heart, Minus, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product, Category } from "@prisma/client";

type ProductWithCategory = Product & {
  category: Category;
};

interface ProductDetailClientProps {
  product: ProductWithCategory;
}

const categoryLabels: Record<string, string> = {
  PARFUMS_FEMME: "Parfum Femme",
  PARFUMS_HOMME: "Parfum Homme",
  PARFUMS_MIXTE: "Parfum Mixte",
};

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);

  const discountedPrice =
    product.discountPercent > 0
      ? product.price * (1 - product.discountPercent / 100)
      : null;

  const handleAddToCart = () => {
    const saved = localStorage.getItem("cart");
    const cart = saved ? JSON.parse(saved) : [];
    const existing = cart.find((i: { product_id: string }) => i.product_id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        product_id: product.id,
        product_name: product.name,
        price: product.price,
        quantity,
        image_url: product.imageUrl,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Ajouté au panier");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      {/* Back link */}
      <Link
        href="/catalogue"
        className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:opacity-70"
        style={{ color: "#7C5C42" }}
      >
        <ArrowLeft className="w-4 h-4" />
        Retour au catalogue
      </Link>

      <div className="grid md:grid-cols-2 gap-12">

        {/* Image */}
        <div
          className="aspect-[3/4] overflow-hidden relative"
          style={{ background: "#EDE3D5" }}
        >
          <Image
            src={product.imageUrl || "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          {product.discountPercent > 0 && (
            <Badge
              className="absolute top-3 left-3 rounded-none text-[9px] tracking-[0.2em] uppercase"
              style={{ background: "#6B1A2A", color: "#F5EFE6" }}
            >
              -{product.discountPercent}%
            </Badge>
          )}
        </div>

        {/* Info */}
        <div className="py-4">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
          >
            {product.category.name}
          </p>

          <h1
            className="text-3xl md:text-4xl font-light mb-4"
            style={{ color: "#0D0D0D", fontFamily: "Georgia, Times New Roman, serif" }}
          >
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            {discountedPrice ? (
              <>
                <span className="text-2xl font-medium" style={{ color: "#6B1A2A" }}>
                  {discountedPrice.toFixed(2)} FCFA
                </span>
                <span className="text-lg line-through" style={{ color: "#B0A898" }}>
                  {product.price.toFixed(2)} FCFA
                </span>
              </>
            ) : (
              <span
                className="text-2xl font-light"
                style={{ color: "#0D0D0D", fontFamily: "Georgia, serif" }}
              >
                {product.price.toFixed(2)} FCFA
              </span>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <p
              className="leading-relaxed mb-8 italic"
              style={{
                color: "rgba(13,13,13,0.6)",
                fontFamily: "Georgia, serif",
                fontSize: "0.95rem",
              }}
            >
              {product.description}
            </p>
          )}

          {/* Notes olfactives */}
          {(product.notesTete || product.notesCoeur || product.notesFond) && (
            <div className="mb-8 space-y-2">
              <p
                className="text-[10px] tracking-[0.3em] uppercase mb-3"
                style={{ color: "#C9A96E" }}
              >
                Notes olfactives
              </p>
              {product.notesTete && (
                <p className="text-xs" style={{ color: "rgba(13,13,13,0.6)" }}>
                  <span style={{ color: "#0D0D0D" }}>Tête —</span> {product.notesTete}
                </p>
              )}
              {product.notesCoeur && (
                <p className="text-xs" style={{ color: "rgba(13,13,13,0.6)" }}>
                  <span style={{ color: "#0D0D0D" }}>Cœur —</span> {product.notesCoeur}
                </p>
              )}
              {product.notesFond && (
                <p className="text-xs" style={{ color: "rgba(13,13,13,0.6)" }}>
                  <span style={{ color: "#0D0D0D" }}>Fond —</span> {product.notesFond}
                </p>
              )}
            </div>
          )}

          {/* Volume & Concentration */}
          <div className="flex gap-6 mb-8">
            {product.volumeMl && (
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase mb-1" style={{ color: "#C9A96E" }}>
                  Volume
                </p>
                <p className="text-sm" style={{ color: "#0D0D0D" }}>{product.volumeMl} ml</p>
              </div>
            )}
            {product.concentration && (
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase mb-1" style={{ color: "#C9A96E" }}>
                  Concentration
                </p>
                <p className="text-sm" style={{ color: "#0D0D0D" }}>{product.concentration.replace(/_/g, " ")}</p>
              </div>
            )}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-8">
            <div
              className="flex items-center"
              style={{ border: "1px solid rgba(13,13,13,0.15)" }}
            >
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 transition-colors hover:bg-black hover:bg-opacity-5"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 transition-colors hover:bg-black hover:bg-opacity-5"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <p
              className="text-xs"
              style={{ color: product.stock > 0 ? "rgba(13,13,13,0.4)" : "#6B1A2A" }}
            >
              {product.stock > 0 ? `${product.stock} en stock` : "Rupture de stock"}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 flex items-center justify-center gap-2 py-4 text-[11px] tracking-[0.3em] uppercase transition-all duration-300 hover:bg-[#6B1A2A] hover:text-[#F5EFE6] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              style={{
                background: "#0D0D0D",
                color: "#C9A96E",
                fontFamily: "Helvetica Neue, Arial, sans-serif",
              }}
            >
              <ShoppingBag className="w-4 h-4" />
              Ajouter au panier
            </button>
            <button
              onClick={() => setLiked(!liked)}
              className="py-4 px-4 transition-colors duration-300"
              style={{
                border: "1px solid rgba(13,13,13,0.15)",
                color: liked ? "#6B1A2A" : "#0D0D0D",
              }}
              aria-label="Ajouter aux favoris"
            >
              <Heart
                className="w-5 h-5"
                style={{ fill: liked ? "#6B1A2A" : "transparent" }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}