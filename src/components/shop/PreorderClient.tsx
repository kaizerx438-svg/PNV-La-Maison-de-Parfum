"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { ShoppingBag, Plus, Minus } from "lucide-react";
import { Product, Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

type ProductWithCategory = Product & { category: Category };

interface CartItem {
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
  image_url: string;
}

export default function PreorderClient({ products }: { products: ProductWithCategory[] }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const addToCart = (product: ProductWithCategory) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product_id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product_id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          product_id: product.id,
          product_name: product.name,
          price: product.price,
          quantity: 1,
          image_url: product.imageUrl || "",
        },
      ];
    });
    toast.success(`${product.name} ajoute a la precommande`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) =>
      prev
        .map((i) => i.product_id === productId ? { ...i, quantity: i.quantity - 1 } : i)
        .filter((i) => i.quantity > 0)
    );
  };

  const getQuantity = (productId: string) =>
    cart.find((i) => i.product_id === productId)?.quantity || 0;

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

 const handleCheckout = async () => {
  if (!session) {
    router.push("/login?redirect=/precommande");
    return;
  }
  if (cart.length === 0) {
    toast.error("Ajoutez au moins un produit");
    return;
  }
  // Sauvegarder le panier dans sessionStorage
  sessionStorage.setItem("preorder_cart", JSON.stringify(cart));
  router.push("/precommande/checkout");
};


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

      {/* Produits */}
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => {
          const qty = getQuantity(product.id);
          return (
            <div
              key={product.id}
              className="flex gap-4 p-4"
              style={{ background: "rgba(13,13,13,0.03)", border: "1px solid rgba(13,13,13,0.08)" }}
            >
              {/* Image */}
              <div
                className="w-24 h-32 flex-shrink-0 relative overflow-hidden"
                style={{ background: "#EDE3D5" }}
              >
                {product.imageUrl && (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p
                    className="text-[9px] tracking-[0.3em] uppercase mb-1"
                    style={{ color: "#C9A96E" }}
                  >
                    {product.category.name}
                  </p>
                  <h3
                    className="text-sm font-light mb-1"
                    style={{ color: "#0D0D0D", fontFamily: "Georgia, serif" }}
                  >
                    {product.name}
                  </h3>
                  <p className="text-sm font-medium" style={{ color: "#0D0D0D" }}>
                    {product.price.toFixed(2)} FCFA
                  </p>
                </div>

                {/* Quantite */}
                <div className="flex items-center gap-2 mt-3">
                  {qty === 0 ? (
                    <button
                      onClick={() => addToCart(product)}
                      className="flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.2em] uppercase transition-all hover:bg-[#6B1A2A] hover:text-[#F5EFE6] cursor-pointer"
                      style={{
                        background: "#0D0D0D",
                        color: "#C9A96E",
                        fontFamily: "Helvetica Neue, Arial, sans-serif",
                      }}
                    >
                      <ShoppingBag className="w-3 h-3" />
                      Precommander
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="p-1.5 cursor-pointer transition-colors hover:opacity-70"
                        style={{ border: "1px solid rgba(13,13,13,0.15)" }}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{qty}</span>
                      <button
                        onClick={() => addToCart(product)}
                        className="p-1.5 cursor-pointer transition-colors hover:opacity-70"
                        style={{ border: "1px solid rgba(13,13,13,0.15)" }}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {}
      <div className="lg:col-span-1">
        <div
          className="p-6 sticky top-24"
          style={{ background: "#0D0D0D", border: "1px solid rgba(201,169,110,0.15)" }}
        >
          <h2
            className="text-sm tracking-[0.3em] uppercase mb-6"
            style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
          >
            Ma precommande
          </h2>

          {cart.length === 0 ? (
            <p className="text-xs italic" style={{ color: "rgba(245,239,230,0.3)" }}>
              Aucun produit selectionne
            </p>
          ) : (
            <div className="space-y-3 mb-6">
              {cart.map((item) => (
                <div key={item.product_id} className="flex justify-between">
                  <span className="text-xs" style={{ color: "rgba(245,239,230,0.6)" }}>
                    {item.product_name} x{item.quantity}
                  </span>
                  <span className="text-xs" style={{ color: "#F5EFE6" }}>
                    {(item.price * item.quantity).toFixed(2)} FCFA
                  </span>
                </div>
              ))}
              <div
                className="flex justify-between pt-3"
                style={{ borderTop: "1px solid rgba(201,169,110,0.15)" }}
              >
                <span className="text-sm font-light" style={{ color: "#F5EFE6" }}>Total</span>
                <span className="text-sm font-light" style={{ color: "#F5EFE6" }}>
                  {total.toFixed(2)} FCFA
                </span>
              </div>
            </div>
          )}

          <button
            onClick={handleCheckout}
            disabled={loading || cart.length === 0}
            className="w-full py-4 text-[11px] tracking-[0.4em] uppercase transition-all duration-300 hover:bg-[#6B1A2A] disabled:opacity-50 cursor-pointer"
            style={{
              background: "#C9A96E",
              color: "#0D0D0D",
              fontFamily: "Helvetica Neue, Arial, sans-serif",
            }}
          >
            {loading ? "Chargement..." : session ? "Payer ma precommande" : "Se connecter pour precommander"}
          </button>

          <p
            className="text-[10px] text-center mt-4"
            style={{ color: "rgba(245,239,230,0.3)" }}
          >
            Paiement securise par Stripe
          </p>
        </div>
      </div>
    </div>
  );
}