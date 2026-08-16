"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import ShopHeader from "@/components/shop/ShopHeader";
import Footer from "@/components/shop/Footer";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CartItem {
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
  image_url: string;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const { data: session } = authClient.useSession(); // ← ajoute
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const updateCart = (updated: CartItem[]) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cart-updated"));
  };

  const handleCheckout = async () => {
  console.log("handleCheckout appelé", { session, cart });
  if (!session) {
    router.push("/login?redirect=/cart");
    return;
  }

  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart }),
    });

    const data = await res.json();

    if (data.url) {
      // Vider le panier et rediriger vers Stripe
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cart-updated"));
      window.location.href = data.url;
    } else {
      toast.error("Une erreur est survenue");
    }
  } catch {
    toast.error("Une erreur est survenue");
  }
};

  const increaseQty = (id: string) => {
    const updated = cart.map((i) =>
      i.product_id === id ? { ...i, quantity: i.quantity + 1 } : i
    );
    updateCart(updated);
  };

  const decreaseQty = (id: string) => {
    const updated = cart
      .map((i) => i.product_id === id ? { ...i, quantity: i.quantity - 1 } : i)
      .filter((i) => i.quantity > 0);
    updateCart(updated);
  };

  const removeItem = (id: string) => {
    const updated = cart.filter((i) => i.product_id !== id);
    updateCart(updated);
    toast.success("Article retire du panier");
  };

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  if (!mounted) return null;

  

  return (
    <div className="min-h-screen" style={{ background: "#F5EFE6" }}>
      <ShopHeader />

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Back link */}
        <Link
          href="/catalogue"
          className="inline-flex items-center gap-2 text-sm mb-10 transition-colors hover:opacity-70"
          style={{ color: "#7C5C42" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Continuer le shopping
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <div style={{ width: "30px", height: "1px", background: "linear-gradient(90deg, #C9A96E, transparent)" }} />
            <p
              className="text-[10px] tracking-[0.4em] uppercase"
              style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
            >
              Votre selection
            </p>
          </div>
          <h1
            className="text-3xl font-light"
            style={{ color: "#0D0D0D", fontFamily: "Georgia, Times New Roman, serif" }}
          >
            Votre panier
          </h1>
        </div>

        {/* Panier vide */}
        {cart.length === 0 ? (
          <div className="text-center py-24">
            <ShoppingBag className="w-12 h-12 mx-auto mb-6" style={{ color: "rgba(13,13,13,0.2)" }} />
            <p
              className="text-lg font-light mb-2"
              style={{ color: "rgba(13,13,13,0.4)", fontFamily: "Georgia, serif" }}
            >
              Votre panier est vide
            </p>
            <p className="text-sm mb-8" style={{ color: "rgba(13,13,13,0.3)" }}>
              Decouvrez notre collection de parfums d&apos;exception
            </p>
            <Link href="/catalogue">
              <button
                className="px-10 py-3 text-[11px] tracking-[0.4em] uppercase transition-all duration-300 hover:bg-[#6B1A2A] hover:text-[#F5EFE6]"
                style={{
                  background: "#0D0D0D",
                  color: "#C9A96E",
                  fontFamily: "Helvetica Neue, Arial, sans-serif",
                }}
              >
                Decouvrir nos parfums
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Liste articles */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product_id}
                  className="flex gap-6 p-5"
                  style={{
                    background: "rgba(13,13,13,0.03)",
                    border: "1px solid rgba(13,13,13,0.08)",
                  }}
                >
                  {/* Image */}
                  <div
                    className="w-24 h-32 flex-shrink-0 relative overflow-hidden"
                    style={{ background: "#EDE3D5" }}
                  >
                    {item.image_url && (
                      <Image
                        src={item.image_url}
                        alt={item.product_name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    )}
                  </div>

                  {/* Infos */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3
                        className="text-base font-light mb-1"
                        style={{ color: "#0D0D0D", fontFamily: "Georgia, Times New Roman, serif" }}
                      >
                        {item.product_name}
                      </h3>
                      <p
                        className="text-[10px] tracking-[0.2em] uppercase"
                        style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
                      >
                        Eau de Parfum · 50ml
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantite */}
                      <div
                        className="flex items-center"
                        style={{ border: "1px solid rgba(13,13,13,0.15)" }}
                      >
                        <button
                          onClick={() => decreaseQty(item.product_id)}
                          className="p-2 transition-colors hover:bg-black hover:bg-opacity-5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-4 text-sm" style={{ color: "#0D0D0D" }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQty(item.product_id)}
                          className="p-2 transition-colors hover:bg-black hover:bg-opacity-5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span
                          className="text-sm font-light"
                          style={{ color: "#0D0D0D", fontFamily: "Georgia, serif" }}
                        >
                          {(item.price * item.quantity).toFixed(2)} FCFA
                        </span>
                        <button
                          onClick={() => removeItem(item.product_id)}
                          className="transition-colors hover:opacity-50"
                          style={{ color: "rgba(13,13,13,0.3)" }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Resume commande */}
            <div className="lg:col-span-1">
              <div
                className="p-6 sticky top-24"
                style={{
                  background: "#0D0D0D",
                  border: "1px solid rgba(201,169,110,0.15)",
                }}
              >
                <h2
                  className="text-sm tracking-[0.3em] uppercase mb-6"
                  style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
                >
                  Resume
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-xs" style={{ color: "rgba(245,239,230,0.5)" }}>
                      Sous-total ({cartCount} article{cartCount > 1 ? "s" : ""})
                    </span>
                    <span className="text-xs" style={{ color: "#F5EFE6" }}>
                      {total.toFixed(2)} FCFA
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs" style={{ color: "rgba(245,239,230,0.5)" }}>
                      Livraison
                    </span>
                    <span className="text-xs" style={{ color: "#C9A96E" }}>
                      Gratuite
                    </span>
                  </div>
                  <div
                    className="flex justify-between"
                    style={{
                      borderTop: "1px solid rgba(201,169,110,0.15)",
                      paddingTop: "12px",
                    }}
                  >
                    <span
                      className="text-sm font-light"
                      style={{ color: "#F5EFE6", fontFamily: "Georgia, serif" }}
                    >
                      Total
                    </span>
                    <span
                      className="text-sm font-light"
                      style={{ color: "#F5EFE6", fontFamily: "Georgia, serif" }}
                    >
                      {total.toFixed(2)} FCFA
                    </span>
                  </div>
                </div>

                <button
                 onClick={handleCheckout}
                 className="w-full py-4 text-[11px] tracking-[0.4em] uppercase transition-all duration-300 hover:bg-[#6B1A2A] hover:text-[#F5EFE6] cursor-pointer"
                  style={{
                    background: "#C9A96E",
                    color: "#0D0D0D",
                    fontFamily: "Helvetica Neue, Arial, sans-serif",
                  }}
                >
                  Passer la commande
                </button>

                <Link href="/catalogue">
                  <button
                    className="w-full py-3 mt-3 text-[10px] tracking-[0.3em] uppercase transition-all duration-300 cursor-pointer"
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(201,169,110,0.2)",
                      color: "rgba(245,239,230,0.4)",
                      fontFamily: "Helvetica Neue, Arial, sans-serif",
                    }}
                  >
                    Continuer mes achats
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}